
import React, {Component} from 'react';
import rectImg from '../Assest/rectangle.png';
import grayrectImg from '../Assest/calender.png';
import ArrowUP from '../Assest/showArrowUP.png';
import ArrowDown from '../Assest/hideArrowDown.png';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Clipboard,Share,Platform,RefreshControl,TextInput,Keyboard} from 'react-native';
  //import Panel from '../../components/Panel';
  import FeatherIcons from 'react-native-vector-icons/Feather';
  import IonicIcons from 'react-native-vector-icons/Ionicons';
  import AntDesignIcons from 'react-native-vector-icons/AntDesign';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import CustomView from '../../../components/CustomView';
  import Localized from '../../../locales'
  import { CustomButton } from '../../../components/CustomButton.js';
  import CustomerList from '../../../components/CustomerSearchableList';
  import QRCode from 'react-native-qrcode-svg';
  import { ListItem, SearchBar } from 'react-native-elements';
  import {CalendarList} from 'react-native-calendars';


  import CustomAlertComponent from '../../../components/CustomAlertComponent';
  import ShareModal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-modals';

  import CalenderModals from 'react-native-modals';


  import InvoiceOpenModal, {
  }from 'react-native-modals';
  import RefundModal, {
  } from 'react-native-modals';
  import API from '../../../utils/API';
  const GLOBAL = require('../../../utils/Globals');
  import ViewShot from "react-native-view-shot";
  import CameraRoll from "@react-native-community/cameraroll";
  import IllustratorScreen  from '../../../components/IllustratorScreen.js';
  import IllustratorModals, {} from 'react-native-modals';
  import { format,parseISO } from 'date-fns';
  import SendLaterModal, {} from 'react-native-modals';
  import {Form,TextValidator}  from '../../../customTextField';
  import Shared from 'react-native-share';

  import { Modalize } from 'react-native-modalize';
  import { decimalthreeDigit} from '../../../utils/GlobalFunction';
  import {currencyFormat,paymentDisplayTypeID,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters } from '../../../utils/GlobalFunction';
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
  import {DarkModeContext} from 'react-native-dark-mode';
  //import Modal from 'react-native-modal';



  export default class InvoiceOpenDetailsScreen extends Component {
    constructor(props){
      super(props);
      this.searchReceiveData = this.searchReceiveData.bind(this);
      this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
      this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
      this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.selectionOnPress = this.selectionOnPress.bind(this);
         this.arrayholder = [];

      this.state = {
        selectedButton: 'Payment',
        isHiddenPaymentDetail:true,
        isHiddenShowLink:true,
        isHiddenShowQR:true,
        isHideRefundDetailView : true,
        isHiddenRefundDetail : true,
         RefundArray : [],
        shareModalView: false,
        openInvoiceModalView: false,
        refunModalView: false,
        showAlert : false,
        showRefundAlert : false,
        showRefundAlertMessage : '',
        illustratorVisible: false,
        illustratorType: '',
        invoiceTitle : '',
        description: '',
        minAmount : '',
        maxAmount : '',
        createdDate : '',
        expiryDate :'',
        totalCustomer : '',
        totalPaidAmt :'',
        urlLink :'',
        customerArray :[],
        Listpage : 1,
        invoiceOpenTitle : '',
        Refundamount : '',
        RefundTotalamount : '0.000',
        token : '',
        shareImage : '',
        openLastindex : false,
        selectedName : '',
        openType : '',
        Amount : '',
        Status : '',
        sendLaterModalView: false,
        calendarVisible : false,
        regenrateDate :format(new Date(new Date().setDate(new Date().getDate()+1)), 'dd/MM/yyyy'),
        expiryRegenrateDate : format(new Date(new Date().setDate(new Date().getDate()+1)), 'yyyy-MM-dd'),
        paidStatus : '',
        regenerateId : '',
        transaction_Type : '',
        PaymentArray :
        [
          {id: 0,name: 'Status',subname1: '',Imge : ''},
        ],
        paidCustomerArray :
        [
          {id: 0,name: 'CustomerDetails',subname1: ''},
          {id: 1,name: 'Mobile',subname1: ''},
          {id: 2,name: 'Email',subname1: ''},
        ],

        paidPaymentArray :
        [
          {id: 0,name: 'PaymentDetails',subname1: ''},
          {id: 1,name: 'Type',subname1: 'Open'},
          {id: 2,name: 'AdminCharges',subname1: ''},
          {id: 3,name: 'AmountPaid',subname1: ''},
          {id: 4,name: 'PaidOn',subname1: ''},
        ],

        paidInvoiceArray :
        [
          {id: 0,name: 'FinancialDetails',subname1: ''},
          {id: 1,name: 'ReferenceID',subname1: ''},
          {id: 2,name: 'KnetReferenceID',subname1: ''},
          {id: 3,name: 'AuthID',subname1: ''},
          {id: 4,name: 'BankReferenceID',subname1: ''},
          {id: 5,name: 'TrackID',subname1: ''},
          {id: 6,name: 'PaymentID',subname1: ''},
          {id: 7,name: 'TransactionID',subname1: ''},
          {id: 8,name: 'RefNo',subname1: ''},
        ],

        TempRefundArray :
       [
        {id: 0,name1: 'RequestType',subname1: '',name2 : '',subname2: '', img : ''},
        {id: 1,name1: 'TotalAmount',subname1: '',name2 : '',subname2: '',img : ''},
        {id: 2,name1: 'RefundAmount',subname1: '',name2 : '',subname2: '',img : ''},
        {id: 3,name1: 'Balance',subname1: '',name2 : '',subname2: '',img : ''},
        {id: 4,name1: 'RequestedOn',subname1: '',name2: 'RefundedOn',subname2: '',img : ''},
        {id: 5,name1: 'ApprovedBy',subname1: '',name2: 'ApprovedOn',subname2: '',img : ''},
        {id: 6,name1: 'Remark',subname1: '',name2 : '',subname2: '',img : ''},
      ],

        RefundTypeArray: [
        {id: 1, value: "PartialRefund", isChecked: true},
         {id: 2, value: "FullRefund", isChecked: false},
        ]



      };

       this.getOpenInvoiceDetail()
      // this.getCustomerInvoiceDetail(true)
    }

   static contextType = DarkModeContext;
    invoiceOpenModal = React.createRef();
    openinvoiceOpenModal = () => {
        if (this.invoiceOpenModal.current) {
          this.invoiceOpenModal.current.open();
        }
      };

    closeinvoiceOpenModal= () => {
          if (this.invoiceOpenModal.current) {
            this.invoiceOpenModal.current.close();
          }
        };


        regenerateOpenModal = React.createRef();
        openRegenerateOpenModal = () => {
            if (this.regenerateOpenModal.current) {
              this.regenerateOpenModal.current.open();
            }
          };

        closeRegenerateOpenModal= () => {
              if (this.regenerateOpenModal.current) {
                this.regenerateOpenModal.current.close();
              }
            };

            HideRefundView = () => {
                  this.setState(state => ({
                    isHiddenRefundDetail: !state.isHiddenRefundDetail
                  }));
            };

    getOpenInvoiceDetail() {

     var self = this;
     console.log("LOLO : " +  this.state.regenerateId);
     console.log("LOL1 : " +  this.props.route.params.id);
      API.get(GLOBAL.API_STRING.OPEN_INVOICE + '/' +  (self.state.regenerateId.length != 0 ? self.state.regenerateId  :  this.props.route.params.something.id),{

        params: {
           'merchantCode' : GLOBAL.MERCHANT_CODE,
          }


      }).then(function (response) {

        const json = JSON.parse(response)


         let newArray = [...self.state.PaymentArray]

          //newArray[0].subname1 =  json.response.status == 0 ?  json.response.paid_status == 0 ? Localized.t('InvoiceOpenDetailsPage.UnPaid') : Localized.t('InvoiceOpenDetailsPage.Paid')  : Localized.t('InvoiceOpenDetailsPage.'+'Expired') ;
          //newArray[0].Imge =  json.response.status == 0 ? json.response.paid_status == 0 ? 0 : 1 : 3

          newArray[0].subname1 =   json.response.paid_status == 0 ? Localized.t('InvoiceOpenDetailsPage.UnPaid') : Localized.t('InvoiceOpenDetailsPage.Paid');
          newArray[0].Imge =  json.response.paid_status == 0 ? 0 : 1




       console.log("txtx "+ json.response);

       self.setState({

        array: newArray,
        invoiceTitle : json.response.title,
        createdDate :   format(parseISO(json.response.created_at), 'dd/MMM/yy, hh:mm a'),
        expiryDate :  json.response.expiry_date == null ? '' : format(parseISO(json.response.expiry_date), 'dd/MMM/yy, hh:mm a'),
        minAmount : currencyFormat(Number(json.response.min_amount)),
        maxAmount : currencyFormat(Number(json.response.max_amount)),
        totalCustomer : json.response.total_customer_paid_count,
        totalPaidAmt : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.total_amount_customer_paid)),
        urlLink : json.response.url,
        openType : json.response.type,
        Amount : currencyFormat(Number(json.response.fixed_amount)),
        Status : json.response.status,
        paidStatus : json.response.paid_status,
        description : json.response.description,
       })





        //console.log('dddd :' + format(parseISO(json.response.transaction.created_at), 'dd/MMM/yy, hh:mm a'));




        })

      .catch(function (error) {
        console.log(error);
      });


    }



    getCustomerInvoiceDetail(status) {

      if(status)
      {
          this.setState({
            Listpage: 1,
            customerArray : [],
            openLastindex : false
          });
      }
     var self = this;
      API.get(GLOBAL.API_STRING.OPEN_INVOICE + GLOBAL.API_STRING.CUSTOMERINVOICE +'/' + this.props.route.params.something.id + `?page=${self.state.Listpage}`,{

        params: {
           'merchantCode' : GLOBAL.MERCHANT_CODE,
          }


      }).then(function (response) {

        const json = JSON.parse(response)
         console.log(json.response);

         var pageurl;
         let markers = [];

        if(json.response.customer_details.pagination.next_page_url != null)
        {

          let pg = json.response.customer_details.pagination.next_page_url.split('=');
          pageurl = pg[1]
       }else {

         pageurl = self.state.Listpage
       }



       if(json.response.customer_details.pagination.next_page_url == null && json.response.customer_details.pagination.previous_page_url == null)
       {
         self.setState
             ({
            customerArray: json.response.customer_details.data
           })
       }
       else {

         if(self.state.openLastindex)
         {

         }
         else {

           if(json.response.customer_details.pagination.next_page_url == null)
           {
              self.setState({ openLastindex: true });
           }

         self.setState(prevState =>
             ({
            customerArray: [...prevState.customerArray,...json.response.customer_details.data]
           }))

         }
       }


     console.log('dddd :' + self.state.customerArray);
      self.arrayholder =   self.state.customerArray;

      self.setState({
        Listpage: pageurl,
      })


        })

      .catch(function (error) {
        console.log('final :'+error);
      });


    }

    componentDidMount()
    {
     this.readLanguageData();
   }


   readLanguageData = async () => {

     try {
       const lang = await AsyncStorage.getItem('USER_LANGUAGE_PICKED')
       console.log('MLM :' + lang);
       if (lang !== null) {
         if (lang === "ar") {
            global.selectValue =  'ar'
            I18nManager.forceRTL(true)
         }
         else if(lang === "en") {

             global.selectValue =  'en'
             I18nManager.forceRTL(false)
               Localized.locale  =  'en'
         }
         else {
           if (I18nManager.isRTL) {
              global.selectValue =  'ar'
               Localized.locale  =  'ar'
           }
           else {
            global.selectValue =  'en'
             Localized.locale  =  'en'
           }
         }

       }
       else {
            if (I18nManager.isRTL) {
               global.selectValue =  'ar'
            }
            else {
             global.selectValue =  'en'
            }

          //I18nManager.forceRTL(false)
       }

     } catch (e) {

       if (I18nManager.isRTL) {
          global.selectValue =  'ar'
       }
       else {
        global.selectValue =  'en'
       }
      // alert('Failed to fetch the data from storage')
     }
     }


    illustratorReceiveData(searchValue)
     {

      this.toggleillustratorPress(false)
      this.setState({ refunModalView: false });
      this.state.illustratorType == 1 ? this.getCustomerInvoiceDetail(true) : this.getOpenInvoiceDetail()
        //this.setState({filterType: filterValue});
     }

      toggleillustratorPress(visible) {
      this.setState({ illustratorVisible: visible });

      }




    selectionOnPress(userType) {

      this.setState({ selectedButton: userType }, () => {
          this.state.selectedButton === 'Payment' ? this.getOpenInvoiceDetail() :  this.getCustomerInvoiceDetail(true)
      });
    }



    alertItemName() {
       console.log('Custome');
       this.setState({
     showAlert: true
   });

    }

    readFromClipboard(item) {
    // console.log(item);
    Clipboard.setString(item)

     }

    toggleShareModal(visible) {
      this.setState({ shareModalView: visible });

    }

    toggleInvoiceOpenModal(visible) {
      this.setState({ openInvoiceModalView: visible });
    }

    toggleRefundModal(visible) {
      this.setState({ refunModalView: visible });
    }


    toggleSendLaterModal(visible) {
      this.setState({ sendLaterModalView: visible });
    }




    handleChange(name) {
      return (text) => {
          //  console.log(Number(text));
            //console.log( Number(this.state.RefundTotalamount));
            if(name == 'Refundamount')
            {
              if(Number(text) > Number(this.state.RefundTotalamount) ? false : true )
              {
              this.setState({[name]:decimalthreeDigit(text) })
               }
               if(Number(text) > Number(this.state.RefundTotalamount) ?   this.setState({ showRefundAlert: true,showRefundAlertMessage : Localized.t('InvoiceDetailsPage.Partialrefundamountcannotbegreaterthantotalamount')}) : true )
               {

                }
            }else {

              this.setState({[name]:text })
            }

        }
    }

    CheckRefundElement(event){

      let refundtypearray = this.state.RefundTypeArray
      refundtypearray.forEach(fruite => {
         if (fruite.value === event.value)
          {
            fruite.isChecked =  !event.isChecked
          }
          else {

            fruite.isChecked =  false
          }
      })
      this.setState({RefundTypeArray: refundtypearray})

    }



    HidePaymentView = () => {
      this.setState(state => ({
        isHiddenPaymentDetail: !state.isHiddenPaymentDetail
      }));
    };

    HideDescriptionView = () => {
      this.setState(state => ({
        isHiddenShowLink: !state.isHiddenShowLink
      }));
    };

    HideProductView = () => {
      this.setState(state => ({
        isHiddenShowQR: !state.isHiddenShowQR
      }));
    };

    dashedNumber(value){

      var mobnumber = '',countryCode = ''
       global.countries.map((y) => {
         if(value.includes(y.code))
         {

              mobnumber = value.replace(y.code, "")
              countryCode  = '(+'+ y.code+') '
         }
         })

    let val =  mobnumber.length != 0 ?  mobnumber  : value

   const afterIndices = [3,6,8];
   const length = val.length;
   let newValue = ''
   for(let i=0; i<length; i++){
     if(afterIndices.includes(i))
       newValue+='-'
     newValue+=val[i];
   }
   return (countryCode + newValue);
 }

    searchReceiveData(searchValue)
    {

      console.log(searchValue);
    this.state.paidCustomerArray.splice(3, 1);
    this.state.paidCustomerArray.splice(4, 1);
    this.state.paidCustomerArray.splice(5, 1);
      let newArray = [...this.state.paidCustomerArray]

      newArray[1].subname1 = this.dashedNumber(searchValue.phone_number) ;
      newArray[2].subname1 =  searchValue.email;


     this.setState({
     array: newArray,
     invoiceOpenTitle : searchValue.name
     })


     const copyOfImages = [...this.state.paidCustomerArray];


     const JSONString = searchValue.additional_fields;
     let  object = JSON.parse(JSONString);
     const result = Object.keys(object).map(key => ({[key]: object[key]}));
     console.log(result);




     for(let i = 0; i < result.length; i++)
     {
       Object.entries(result[i])
        .map( ([key, value]) =>
        {
          let vr = {
              'id': i+3,
              'name':  key.slice(0,1).toUpperCase() + key.slice(1, key.length),
              'subname1': value
          }

          copyOfImages[i+3] = vr

       })
     }


     this.setState({paidCustomerArray: copyOfImages});


     let payArray = [...this.state.paidPaymentArray]


     payArray[2].subname1 =  GLOBAL.CURRENCY + ' ' + currencyFormat(Number(searchValue.admin_charge)) ;
     payArray[3].subname1 =   searchValue.transaction != null ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number( searchValue.transaction.amount)) : GLOBAL.CURRENCY + ' ' + currencyFormat(Number( searchValue.amount) + Number(searchValue.admin_charge));
     payArray[4].subname1 =  searchValue.paid_on != null ? format(parseISO(searchValue.paid_on), 'dd MMM yy, hh:mm a').toLocaleUpperCase() : ''

    this.setState({
    array: payArray,
    RefundTotalamount : Number( searchValue.amount) + Number(searchValue.admin_charge),
     transaction_Type : searchValue.invoice_status,
     isHideRefundDetailView : searchValue.transaction != null ? searchValue.transaction.refund.length > 0 ? false : true : true
    })

    let invoiceArray = [...this.state.paidInvoiceArray]

   if(searchValue.transaction != null)
   {
    invoiceArray[1].subname1 = searchValue.reference_number;
    invoiceArray[2].subname1 = searchValue.transaction.transaction_payment_id;
  //  invoiceArray[2].name = searchValue.transaction.transaction_payment_id == 2 ?  'MpgsReferenceID':  'KnetReferenceID';
    invoiceArray[2].name =  upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters( searchValue.transaction.payment_type.display_name)) + 'ReferenceID';
    invoiceArray[3].subname1 = searchValue.transaction.auth;
    invoiceArray[4].subname1 = searchValue.transaction.track_id;
    invoiceArray[5].subname1 = searchValue.transaction.track_id;
    invoiceArray[6].subname1 = searchValue.transaction.transaction_id;
    invoiceArray[7].subname1 = searchValue.transaction.transaction_id;
    invoiceArray[8].subname1 = searchValue.transaction.order_reference_number;


   this.setState({
   array: invoiceArray,
   token : searchValue.transaction.token,
   })
  }


     this.setState({
     selectedName : searchValue.name,
     })

    /*  this.setState(state => ({
        openInvoiceModalView: !state.openInvoiceModalView
      }));*/

      this.openinvoiceOpenModal()



      let refMarkers = [];
        let refArray = [...this.state.TempRefundArray]
      if(searchValue.transaction != null)
      {
     if(searchValue.transaction.refund.length != 0)
     {

       for(let j = 0; j < searchValue.transaction.refund.length; j++)
       {
       let markers = [];
         for(let i = 0; i < this.state.TempRefundArray.length; i++)
         {

          markers.push({
         id: refArray[i].id,
         name1: refArray[i].name1,
         subname1 : i == 0 ? searchValue.transaction.refund[j].refund_method == "2" ? searchValue.transaction.refund[j].balance_amount == "0.000" ? "Complete" :"Partial" : "Complete"
                  : i == 1 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(searchValue.transaction.amount))
                  : i == 2 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(searchValue.transaction.refund[j].amount))
                  : i == 3 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(searchValue.transaction.refund[j].balance_amount))
                  : i == 4 ? format(parseISO(searchValue.transaction.refund[j].created_at), 'dd/MMM/yy, hh:mm a')
                  : i == 5 ? searchValue.transaction.refund[j].approved_by
                  :  searchValue.transaction.refund[j].remark,
         name2: refArray[i].name2,
         subname2 : i == 4 || 5 ? searchValue.transaction.refund[j].refund_at != null ? format(parseISO(searchValue.transaction.refund[j].refund_at), 'dd/MMM/yy, hh:mm a') : '' : '',
          img : searchValue.transaction.refund[j].status
         });

        }

        console.log(markers);
         refMarkers.push(
           markers
         );

      }



      console.log(" MMM" + refMarkers);

       this.setState({

        RefundArray: refMarkers,

       })


     }
   }


    }


    onPressAlertPositiveButton = () => {
      this.setState(state => ({
        showAlert: false
      }));
      this.CancelInvoice()
      };

      onPressAlertNegativeButton = () => {
        this.setState(state => ({
          showAlert: false
        }));
      };

      onPressRefundButton = () => {

        this.setState({showRefundAlert: false}, () => {

        });

        };



      refundSubmit = () => {
           this.SendRefundDetail()
       }

      refundFormSubmit = () => {
          this.refs.form.submit();
      }

      SendRefundDetail() {

        this.setState({
          refunModalView: false,
        });

          var self = this;

          var parm1 = {
            "merchantCode" : GLOBAL.MERCHANT_CODE,
            "token": this.state.token,
            "refundMethod":  self.state.RefundTypeArray[1].isChecked == true ? "1" : "2",
          }


          if(self.state.RefundTypeArray[1].isChecked != true)
          {
            var a = {"refundAmount": self.state.Refundamount}
            parm1 = Object.assign({},a,parm1)
          }

          API.post(GLOBAL.API_STRING.REFUNDS,parm1,{
          }).then(function (response) {
          const json = JSON.parse(response)
          console.log(json.status);
         console.log(json);
          if(json.status)
          {
             self.setState({ illustratorVisible: true ,illustratorType : 1});
          }
          else {

          }
        })
        .catch(function (error) {
          const errorjson = JSON.parse(error)
        console.log('final :' + errorjson);
      //  console.log('final :' + errorjson.message);
      var message = ''
      if(errorjson.response != null)
      {
        if(errorjson.response.refundAmount != null)
        {
          message = errorjson.response.refundAmount[0]
        }

        self.setState({ showRefundAlert: true,showRefundAlertMessage : message});

      }
      else {
        message = errorjson.message
        self.setState({ showRefundAlert: true,showRefundAlertMessage : message,refunModalView: false});
      }

        });


      }


      RegenerateInvoice() {
          var self = this;

        API.put(GLOBAL.API_STRING.OPEN_INVOICE + '/' + self.props.route.params.something.id, {

          "merchantCode" : GLOBAL.MERCHANT_CODE,
          "expiryDate": this.state.expiryRegenrateDate,


        }).then(function (response) {
          const json = JSON.parse(response)
          console.log(json.status);
         console.log(json);
          if(json.status)
          {
            self.setState({regenerateId : json.response.id});
             self.setState({ illustratorVisible: true ,illustratorType : 3});
          }
          else {

          }
        })
        .catch(function (error) {
          const errorjson = JSON.parse(error)
            console.log('final :' + errorjson);

            var message = ''
            if(errorjson.response != null)
            {
              if(errorjson.response.expiryDate != null)
              {
                message = errorjson.response.expiryDate[0]
              }
            }
            else {
              message = errorjson.message
            }
           self.setState({ showRefundAlert: true,showRefundAlertMessage : message});

        });

      }

      toggleCalendar(value)
      {
        this.setState({ calendarVisible : value });
      }

      backPress()
      {

        const { navigation, route } = this.props;
        route.params.onSelectBack();
        navigation.goBack(null);

      }


      CancelInvoice() {

          var self = this;
          //  console.log('XYXY :'  + self.state.token);
          var parms  = {
           "merchantCode" : GLOBAL.MERCHANT_CODE,
          }

        API.delete(GLOBAL.API_STRING.OPEN_INVOICE + '/' + self.props.route.params.something.id, {

         data: parms

        }).then(function (response) {
          const json = JSON.parse(response)
          console.log(json.status);
         console.log(json);
          if(json.status)
          {
             self.setState({ illustratorVisible: true,illustratorType : 2 });
          }
          else {

          }
        })
        .catch(function (error) {
          console.log('final :' + error);

        });

      }


      getPermissionAndroid = async() => {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Image Download Permission',
                message: 'Your permission is required to save images to your device',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              return true;
            }
            Alert.alert(
              'Save remote Image',
              'Grant Me Permission to save Image',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          } catch (err) {
            Alert.alert(
              'Save remote Image',
              'Failed to save Image: ' + err.message,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }
        };


       onCapture = (value) => {
         this.refs.viewShot.capture().then(uri => {
           console.log("do something with ", uri);
           this.setState({ shareImage: uri }, () => {

           if(value == "Share")
           {
              this.shareApp();
           }
           else {

             if (Platform.OS === 'android') {
             const granted =  this.getPermissionAndroid();
             if (!granted) {
               return;
             }
              }

             CameraRoll.save(this.state.shareImage)
           .then(

             this.setState({
             shareModalView : false
            }, () => {
       				   this.setState({ showRefundAlert: true,showRefundAlertMessage : Localized.t('IllustratorDetailsPage.Thefilewasdownloadedsuccessfully')})
             })


           )
           .catch(err => console.log('err:', err))

           }





           });

         })
       };


       shareApp = () =>{

           let  text = 'Hesabe Merchant Details \n\n'
           if(Platform.OS === 'android')
               text = text.concat('http://demo.hesabe.com')
           else
               text = text.concat('http://demo.hesabe.com')

           Share.share({
               subject: 'Share Invoice',
               title: 'Share Invoice',
               url:this.state.shareImage,
               //url: `data:image/png;base64,${this.state.shareImage}`,

           }, {
               // Android only:
               dialogTitle: 'Share Invoice App',
               // iOS only:
               excludedActivityTypes: []
           })

       }


       renderSeparator = () => {
         return (
           <View
           style={{
             height: 10,
             width: '100%',
             backgroundColor: 'rgba(243,243,243,0.7)',
             marginLeft: '0%',
             shadowColor: GLOBAL.COLOR.LIGHTPURPLE,
             shadowOffset: {
               width: 0,
               height: 6,
             },
             shadowOpacity: 0.37,
             shadowRadius: 7.49,

             elevation: 12,
           }}
           />
         );
       };

       searchFilterFunction = text => {
         this.setState({
           value: text,
         });

         const newData = this.arrayholder.filter(item => {
           const itemData = `${item.name.toUpperCase()}}`;
           const textData = text.toUpperCase();

           return itemData.indexOf(textData) > -1;
         });
         this.setState({
           customerArray: newData,
         });
       };

       getDataURL() {
         this.svg.toDataURL(this.callback);
       }

       callback(dataURL) {
        // console.log(dataURL);
        if(Platform.OS === 'android')
        {
          var shareOptions = {
            title: 'Share file',
            message: 'Hesabe QR Code',
            subject: 'Hesabe QR Code ',
            url: `data:image/png;base64,${dataURL}`,
            failOnCancel: false,
          };

          Shared.open(shareOptions)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });

        }
    else {

      Share.share({
           subject: 'Share Invoice',
           title: 'Share Invoice',
           message: 'Hesabe QR Code',
           url: `data:image/png;base64,${dataURL}`,

       }, {
           // Android only:
           dialogTitle: 'Hesabe Merchant App',
           // iOS only:
           excludedActivityTypes: []
       })
    }


       }

       renderHeader = () => {
           const isDarkMode = this.context === 'dark';
         return (
           <View>
           <SearchBar
             lightTheme
              platform={"ios"}
             placeholderTextColor= {isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY}
             //containerStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
            // inputContainerStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.LIGHTGRAY,borderWidth : 1,borderColor : 'white',borderRadius :15}}
             placeholder={Localized.t('DashboardPage.Search')}
             placeholderTextColor= {GLOBAL.COLOR.DARKGRAY}
             platform={Platform.OS}
             onChangeText={text => this.searchFilterFunction(text)}
             autoCorrect={false}
             value={this.state.value}

             style = {{fontSize : RFValue(18),color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY}}
             inputContainerStyle={{backgroundColor: 'transparent'}}
             containerStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK  : GLOBAL.COLOR.SHADEGRAY,
               borderWidth: isDarkMode ? 1  : 0,
               borderRadius: 20,
               marginLeft : 10,
               marginRight : 10,
               height : 55,
               borderColor : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.WHITE,
               borderTopColor: isDarkMode ? GLOBAL.COLOR.WHITE  :GLOBAL.COLOR.WHITE,
               borderBottomColor :isDarkMode ? GLOBAL.COLOR.WHITE  :GLOBAL.COLOR.WHITE
              }}
           />

           <View
           style={{
             marginTop :5,
             marginLeft : 10,
             marginRight : 10,
             height : 50,
             shadowColor: GLOBAL.COLOR.LIGHTBLUE,
             shadowOffset: {
               width: 0,
               height: 7,
             },
             shadowOpacity: 0.1,
             shadowRadius: 9.11,
             borderRadius : 10,
             elevation: 10,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             borderWidth : isDarkMode ? 1 : 0 ,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
             justifyContent: 'space-between',
             flexDirection: "row",
             //height : 40,
             alignItems : "center",
           }}>
             <Text style={[styles.textHeaderStyle,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft :10}]}>{Localized.t('InvoiceOpenDetailsPage.TotalCustomers')}</Text>
             <Text style={{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-SemiBold',fontSize :RFValue(17),marginRight : 10}}>{this.state.totalCustomer }</Text>

             </View>
             </View>

         );
       };



       isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
      };

      isCloseToTop = ({layoutMeasurement, contentOffset, contentSize})  => {
      return contentOffset.y == 0;
     };

      onRefresh = () =>
      {
            console.log('refresh started');
           this.setState({refreshing :true})
           this.state.selectedButton === 'Payment' ? '' : this.getCustomerInvoiceDetail(true)
           this.setState({refreshing :false})

       }

    render(){
        const isDarkMode = this.context === 'dark';
      const screenWidth = Dimensions.get("window").width;
       const screenheight = Dimensions.get("window").height;

      const text = this.props.route.params;
      console.log("CreateGuildStack param:" + this.props.route.params)
      console.log("param:" + text.Type)
      //  const selectionMenu = (this.state.selectedButton === "Payment" ? text.Type === "Refund" ?  this.state.PgDetailsArray[0].PaymentRefund :this.state.PgDetailsArray[0].PaymentSuccess : text.Type === "Refund" ? this.state.PgDetailsArray[0].PaymentRefundFinance : this.state.PgDetailsArray[0].PaymentSuccessFinance)
      return(

        <>
          <ViewShot ref="viewShot" style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
          <View
          style={{
            justifyContent: 'space-between',
            marginTop :30,
            flexDirection: "row",
            height : 70,
            alignItems : "center",
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            marginBottom : 5
          }}>

              <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center'}}>
          <TouchableOpacity
          onPress={() => {

            //this.props.navigation.navigate(text.fromView)
            this.backPress()
          }}

          style = {{  shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 1,
                shadowRadius: 9.11,
                borderRadius : 20,
                elevation: 14,

              }}
          >

          <Image style = {{borderRadius : 15}} source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
          </TouchableOpacity>
          </View>

          <View
          style={{
            justifyContent: 'space-between',
            flexDirection: "column",
            alignItems : "center",
            backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            width : '60%'
          }}>
          <Text style={{fontSize: RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE, fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceOpenDetailsPage.InvoiceDetails')}</Text>
          <Text style={{fontSize: RFValue(15),color :GLOBAL.COLOR.DARKGRAY, fontFamily : 'Prompt-Medium'}}>{ Localized.t('InvoiceOpenDetailsPage.Open') }  {this.state.Status == 0 ? '' :<Text style={{fontSize: RFValue(15),color :GLOBAL.COLOR.RED, fontFamily : 'Prompt-Medium'}}>{'(' + Localized.t('InvoiceOpenDetailsPage.Expired') + ')'}</Text>}</Text>
          </View>

          <TouchableOpacity
          style = {{marginTop :0,height :70,width : '20%' ,justifyContent : 'center',alignItems : 'flex-end'}}
          onPress={() => {
            this.setState({
              shareModalView: true,
            });
          }}
          >
          <Image  source={require('../Assest/menuVertical.png')} style = {{marginRight : -40,marginTop :10}}/>
          </TouchableOpacity>


          </View>

          <View
          style={{
            justifyContent: 'space-around',
            marginTop :10,
            flexDirection: "row",
            height : 60,
            padding : 10,
            alignItems : "center",
            backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
          }}>
          <TouchableOpacity
          style={styles.button3}
          onPress={() => this.selectionOnPress("Payment")}>
          <Text style =  {{color : this.state.selectedButton === "Payment"
          ? GLOBAL.COLOR.ORANGE
          :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceOpenDetailsPage.Payment')}</Text>
          <Image
          style={styles.icon1}
          source = { this.state.selectedButton === "Payment" ?
          rectImg :
          null} />
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button3}
          onPress={() => this.selectionOnPress("Customer")}>
          <Text style =  {{color : this.state.selectedButton === "Customer"
          ? GLOBAL.COLOR.ORANGE
          : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceOpenDetailsPage.Customer')}</Text>
          <Image
          style={styles.icon1}
          source = { this.state.selectedButton === "Customer" ?
          rectImg :
          null} />
          </TouchableOpacity>
          </View>

        <ScrollView contentContainerStyle={{paddingBottom: 250}}
         style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,height : screenheight}}
        refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
         onRefresh={this.onRefresh}
         title="Loading..."
       />
        }
        onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent)) {
            console.log("Reached end of page");
          this.state.selectedButton === 'Payment' ? '' : this.getCustomerInvoiceDetail(false)
          }

          if(this.isCloseToTop(nativeEvent)){
             console.log("Top of page");
             //this.getQuickInvoiceDetail(true)
            }
        }}
        scrollEventThrottle={400}
        >

        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>

        <View  style={{
          //flexDirection : 'column',
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,

        }}>



        <View style = {{
          marginTop :0,
          marginLeft : 10,
          marginRight : 10,
          shadowColor: GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderRadius : 10,
          elevation: 10,
          backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          borderWidth : isDarkMode ? 1 : 0,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
          flexDirection: "column",
          justifyContent: 'space-between',
          display : this.state.selectedButton === "Payment" ? null :'none'}}>
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 0,padding : 10,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',height : 50,textAlign : 'left'}}>{Localized.t('OpenInvoicePage.InvoiceTitleandDescription')}</Text>
        <View
        style={{
          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
          width : '97%',
          height : 2,
          marginLeft : 5
        }}>
        </View>
        <View style={{
          padding : 5,
          alignItems: 'flex-start',
          flexDirection: "column",
          justifyContent: 'space-between',
        //  height : 40
        }} >
        <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft :0,marginTop : 5,width : '100%'}}>{this.state.invoiceTitle}</Text>

        <View
        style={{
          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
          width : '100%',
          height : 2,
          marginTop : 10,
          display : this.state.description.length != 0 ? null : 'none'
        }}>
          </View>
         <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(13),fontFamily : 'Prompt-Regular',marginTop : 5,display : this.state.description.length != 0 ? null : 'none'}}>{this.state.description}</Text>
        </View>

        </View>



        <CustomView
        style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none' ,  marginLeft : 10,
          marginRight : 10,}}
        >
        <View
        style={{
          marginTop :10,
          height : 50,
          shadowColor: this.state.isHiddenPaymentDetail === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderTopLeftRadius : 10,
          borderTopRightRadius : 10,
          borderBottomLeftRadius : this.state.isHiddenPaymentDetail === false ? 0 :10,
          borderBottomRightRadius : this.state.isHiddenPaymentDetail === false ? 0 :10,
          elevation: 10,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
        }} >
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 10,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('InvoiceDetailsPage.PaymentDetails')}</Text>
        <TouchableOpacity
        style={styles.button3}
        onPress={ this.HidePaymentView }
        >
        <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
        source={this.state.isHiddenPaymentDetail === false ?
          ArrowUP :
          ArrowDown} />
          </TouchableOpacity>

          </View>

          <CustomView hide={this.state.isHiddenPaymentDetail}>
          <View style={{
            marginTop :0,
            marginLeft : 0,
            marginRight : 0,
            shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderBottomLeftRadius :10,
            borderBottomRightRadius :10,
            elevation: 10,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            borderWidth : isDarkMode ? 1 : 0 ,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE

          }} >
          {
            this.state.PaymentArray.map((item, index) => (
              <View style={{
                flexDirection :'column',
                // justifyContent : 'space-between'
              }} >
              <View
              style={{
                display : index == 0 ? 'none' : null,
                backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                width : '100%',
                height : 2,
              }}>
              </View>

              <View  style={{
                flexDirection :'row',
                justifyContent : 'space-between',
                alignItems : 'center',
                marginLeft : 5,
                marginRight : 10,
                padding : 5,
                height : 50
              }}>

              <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,
              fontSize : RFValue(15),
              fontFamily : 'Prompt-Medium'}}>
              {Localized.t('InvoiceOpenDetailsPage.'+ item.name)}
              </Text>


              <View style={{
                flexDirection : 'row',alignItems :'center'
              }} >

              <MaterialCommunityIcons name="checkbox-blank-circle" color={item.Imge === 0  ? GLOBAL.COLOR.RED : item.Imge === 1  ? GLOBAL.COLOR.GREEN : item.Imge.length == 0 ? 'transparent'  : GLOBAL.COLOR.ORANGE}  size={18}  style={{display :  item.Imge === 2 ? 'none' :null}} />
              <Text style = {{color: this.state.selectedButton === "Payment" && index === this.state.PaymentArray.length ? GLOBAL.COLOR.ORANGE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
              fontSize : this.state.selectedButton === "Payment" && index === this.state.PaymentArray.length ? RFValue(20) :RFValue(15),
              marginLeft : 10,
              fontFamily : 'Prompt-Medium',
            }}>
            {this.state.selectedButton === "Payment"  && index == 0 ? item.subname1 != null ? item.subname1.length !=0 ?  item.subname1 : '' : ''
            : item.subname1}
            </Text>
            </View>


            </View>


            <View
            style={{
              backgroundColor : GLOBAL.COLOR.SHADEGRAY,
              width : '100%',
              height : 2,
            }}>
            </View>
            </View>
          ))
        }

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "row",
          //height : 40,
          padding : 10,
          alignItems : "flex-start",
            display : this.state.selectedButton === "Payment" && this.state.openType == 1 ? null : 'none'
        }}>

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "column",
          //height : 40,
          alignItems : "flex-start",
          width : '50%'
        }}>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceOpenDetailsPage.MinAmount')}</Text>
        <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{this.state.minAmount}</Text>
        </View>

        <View
        style={{
          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
          width : 2,
          height : '100%',
        }}>
        </View>


        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "column",
          //height : 40,
          alignItems : "flex-start",
          width : '50%',
          marginLeft : 10
        }}>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceOpenDetailsPage.MaxAmount')}</Text>
        <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontSize : RFValue(15),fontFamily : 'Prompt-SemiBold'}}>{this.state.maxAmount}</Text>
        </View>

        </View>


        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "row",
          //height : 40,
          padding : 10,
          alignItems : "flex-start",
          display : this.state.selectedButton === "Payment" && this.state.openType == 0 ? null : 'none'
        }}>

        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceOpenDetailsPage.Amount')}</Text>
        <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{GLOBAL.CURRENCY + " " + this.state.Amount}</Text>
        </View>

        <View
        style={{
          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
          width : '100%',
          height : 2,
        }}>
        </View>


        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "row",
          //height : 40,
          padding : 10,
          alignItems : "flex-start",
        }}>

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "column",
          //height : 40,
          alignItems : "flex-start",
          width : '50%'
        }}>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceOpenDetailsPage.CreatedDate')}</Text>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{this.state.createdDate}</Text>
        </View>

        <View
        style={{
          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
          width : 2,
          height : '100%',
        }}>
        </View>


        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "column",
          //height : 40,
          alignItems : "flex-start",
          marginLeft : 10,
          width : '50%'
        }}>
        <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceOpenDetailsPage.ExpiryDate')}</Text>
        <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{this.state.expiryDate}</Text>
        </View>

        </View>

        <View
        style={{
          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
          width : '100%',
          height : 2,
        }}>
        </View>


        <View
        style={{
          justifyContent: 'space-between',
          marginTop :20,
          flexDirection: "row",
          //height : 40,
          alignItems : "center",
          height : 40
        }} >
        <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,fontSize : RFValue(15),fontFamily : 'Prompt-SemiBold',marginTop : 5}}>{Localized.t('InvoiceOpenDetailsPage.TotalPaidCustomers')}</Text>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,marginRight : 20,fontSize : RFValue(15),fontFamily : 'Prompt-Medium',marginTop : 5}}>{this.state.totalCustomer}</Text>
        </View>

        <Image  source={require('../Assest/lineSeparator.png')} style = {{width : '99%',resizeMode : 'contain',marginTop : 20}} />
        <View
        style={{
          justifyContent: 'space-between',
          marginTop :20,
          flexDirection: "row",
          //height : 40,
          alignItems : "center",
          height : 40,
          marginBottom : 10,
        }} >
        <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,fontSize : RFValue(15),fontFamily : 'Prompt-SemiBold',marginTop : 5}}>{Localized.t('InvoiceOpenDetailsPage.TotalPaid')}</Text>
        <Text style =  {{color : GLOBAL.COLOR.ORANGE,marginRight : 10,fontSize : RFValue(20),fontFamily : 'Prompt-Medium',marginTop : 5}}>{this.state.totalPaidAmt} </Text>
        </View>

        </View>

        </CustomView>
        </CustomView>



        <CustomView  style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none' ,  marginLeft : 10,
          marginRight : 10,}}>
        <View
        style={{
          marginTop :10,
          height : 50,
          shadowColor: this.state.isHiddenShowLink === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderTopLeftRadius : 10,
          borderTopRightRadius : 10,
          borderBottomLeftRadius : this.state.isHiddenShowLink === false ? 0 :10,
          borderBottomRightRadius : this.state.isHiddenShowLink === false ? 0 :10,
          elevation: 10,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',
        }} >
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,marginLeft : 10,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 5}}>{Localized.t('InvoiceOpenDetailsPage.ShowLink')}</Text>
        <TouchableOpacity
        style={styles.button3}
        onPress={ this.HideDescriptionView}
        >
        <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
        source={this.state.isHiddenShowLink === false ?
          ArrowUP :
          ArrowDown} />
          </TouchableOpacity>

          </View>

          <CustomView hide={this.state.isHiddenShowLink}>

          <View style={{
            marginTop :0,
            marginLeft : 0,
            marginRight : 0,
            shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderBottomLeftRadius :10,
            borderBottomRightRadius :10,
            elevation: 10,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            borderWidth : isDarkMode ? 1 : 0 ,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
          }} >
          <View
          style={{
            backgroundColor : isDarkMode ? 'transparent' :  GLOBAL.COLOR.SHADEGRAY,
            width : '100%',
            height : 2,
            marginLeft : 0,

          }}>
          </View>

          <View style={{
          flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between',marginLeft : 0,marginRight :0
          }}>
          <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,fontSize : RFValue(13),fontFamily : 'Prompt-Regular',marginTop : 10,height :50,width : '85%'}}>{this.state.urlLink}</Text>
          <TouchableOpacity
          style={styles.button4}
          onPress={() => this.readFromClipboard(this.state.urlLink)}>

          <Image
         source={require('../Assest/copy.png')}
          style={styles.ImageIconStyle1}
          />
          </TouchableOpacity>
          </View>

          </View>

          </CustomView>
          </CustomView>



          <CustomView  style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none' ,marginLeft : 10,
              marginRight : 10}}>
          <View
          style={{
            marginTop :10,

            height : 50,
            shadowColor: this.state.isHiddenShowQR === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderTopLeftRadius : 10,
            borderTopRightRadius : 10,
            borderBottomLeftRadius : this.state.isHiddenShowQR === false ? 0 :10,
            borderBottomRightRadius : this.state.isHiddenShowQR === false ? 0 :10,
            elevation: 10,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            alignItems: 'center',
            flexDirection: "row",
            justifyContent: 'space-between',
            borderWidth : isDarkMode ? 1 :  0 ,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE

          }} >
          <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 10,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 5}}>{Localized.t('InvoiceOpenDetailsPage.ShowQRCode')}</Text>
          <TouchableOpacity
          style={styles.button3}
          onPress={ this.HideProductView }
          >
          <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
          source={this.state.isHiddenShowQR === false ?
            ArrowUP :
            ArrowDown} />
            </TouchableOpacity>

            </View>

            <CustomView hide={this.state.isHiddenShowQR}>
            <View style={{
              marginTop :0,
              marginLeft : 0,
              marginRight : 0,
              shadowColor: GLOBAL.COLOR.LIGHTBLUE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.1,
              shadowRadius: 9.11,
              borderBottomLeftRadius :10,
              borderBottomRightRadius :10,
              elevation: 10,
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
              borderWidth : isDarkMode ? 1 :  0 ,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
            }} >
            <View
            style={{
              backgroundColor : isDarkMode ? 'transparent' : GLOBAL.COLOR.SHADEGRAY,
              width : '100%',
              height : 2,
              marginLeft : 0,

            }}>
            </View>

            <View style = {{flexDirection : 'column',height : 150}}>
             <View style = {{alignItems : 'center',justifyContent : 'center',marginTop : 20}}>
            <QRCode
             color  = {GLOBAL.COLOR.DARKBLUE}
             value= {this.state.urlLink}
             getRef={(c) => (this.svg = c)}
             />
             </View>

             <View style = {{alignItems : 'flex-end',marginTop : -20,marginLeft : -5}}>
             <TouchableOpacity
             style={styles.button4}
             onPress={() => this.getDataURL()}>


              <FeatherIcons name="upload" color={isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}  size={20} style = {styles.ImageIconStyle1} />
             </TouchableOpacity>
             </View>
             </View>


             </View>

            </CustomView>
            </CustomView>



            <View style = {{display : this.state.selectedButton === "Payment" ? 'none' :null }}>


              <FlatList

                data={this.state.customerArray}

                renderItem={({ item,index }) => (
                   // Single Comes here which will be repeatative for the FlatListItems
                   // Single Comes here which will be repeatative for the FlatListItems
                   <View
                   style={{
                     justifyContent: 'space-between',
                     marginTop :20,
                     marginLeft : 10,
                     marginRight : 10,
                     flexDirection: "column",
                     shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                     shadowOffset: {
                       width: 0,
                       height: 7,
                     },
                     shadowOpacity: 0.1,
                     shadowRadius: 9.11,
                     borderRadius : 15,
                     elevation: 10,
                     backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                     borderWidth : isDarkMode ? 1 : 0 ,
                     borderColor :isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.WHITE
                     //height : 40,
                     //alignItems : "flex-start",
                   }}>
                     <TouchableOpacity
                      style = {{}}
                     onPress={() => {
                       this.searchReceiveData(item)}}>
                   <View
                     style={{
                       justifyContent: 'space-between',
                       flexDirection: "row",
                       //height : 40,
                       alignItems : "center",
                        padding :10,
                     }}>

                     <View
                     style={{
                      // justifyContent: 'space-between',
                       flexDirection: "row",
                       //height : 40,
                       alignItems : "center",
                     }}>
                    <MaterialCommunityIcons name="checkbox-blank-circle" color = {`${item.invoice_status}` == 0 ? GLOBAL.COLOR.RED : GLOBAL.COLOR.GREEN}  size={18} />
                   <Text style={[styles.FlattextStyle, {color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{`${item.name}` }</Text>
                      </View>


                  <Image  style = {{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}} source={global.selectValue == 'en' ?  require('../Assest/rightArrow1.png') : require('../Assest/leftArrow1.png')} />
                   </View>

                     <View style={styles.borderContainer}>
                     <View style={styles.border} />
                    </View>

                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: "row",
                        //height : 40,
                        alignItems : "center",
                        padding : 10
                      }}>
                    <View
                    style={{
                      justifyContent: 'space-between',
                      marginTop :0,
                      flexDirection: "row",
                      //height : 40,
                      alignItems : "center",

                    }}>


                     <Text style={[styles.FlattextStyle1 , {color : isDarkMode ? GLOBAL.COLOR.DARKGRAY : GLOBAL.COLOR.DARKGRAY }]}>{this.dashedNumber(item.phone_number)}</Text>
                     </View>
                     <Text style={[styles.FlattextStyle2 , {color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{GLOBAL.CURRENCY + ' ' + currencyFormat(Number( item.transaction != null ? item.transaction.amount : (Number(item.amount) + Number(item.admin_charge))))}</Text>
                    </View>
                    </TouchableOpacity>
                   </View>

                 )}
                keyExtractor={item => item.id}
                ListHeaderComponent={this.renderHeader}

              />

            </View>

            <View style={{
              alignItems : 'flex-end',
              marginTop : 50,
              padding : 10,
              display :  this.state.selectedButton === "Payment"  ?  null :'none'
            }}>
            <CustomButton
            style = {{display : this.state.Status == 0 ?  null  : 'none' ,fontSize : RFValue(20)}}
            title= {Localized.t('InvoiceOpenDetailsPage.Cancel') }
            onPress={() => {this.alertItemName()}}
            />

            <CustomButton
            style = {{ display : this.state.Status == 0 ? 'none' : null ,fontSize : RFValue(20)}}
            title= {Localized.t('InvoiceOpenDetailsPage.Regenerate')}
            onPress={() => {this.openRegenerateOpenModal()  }}
            />


            <CustomAlertComponent
                displayAlert={this.state.showAlert}
                displayAlertIcon={false}
                alertTitleText={Localized.t('TextValidationPage.AreYouSure?')}
                alertMessageText={Localized.t('TextValidationPage.TheinvoiceisactiveandunpaidIfyoucanceltheinvoicewillexpire')}
                displayPositiveButton={true}
                positiveButtonText={Localized.t('TextValidationPage.Cancel')}
                displayNegativeButton={true}
                negativeButtonText={Localized.t('TextValidationPage.KeepActive')}
                onPressPositiveButton={this.onPressAlertPositiveButton}
                onPressNegativeButton={this.onPressAlertNegativeButton}
              />
            </View>

            </View>

            </View>



            <ShareModal.BottomModal
            visible={this.state.shareModalView}
            //visible = {this.state.modalVisible}
            onTouchOutside={() => this.setState({ shareModalView: false })}
            height={(200/screenheight)}
            width={1}
            onSwipeOut={() => this.setState({ shareModalView: false })}
            modalTitle={



              <View
              style={{
                justifyContent: 'space-between',
                padding :15,
                marginLeft : 0,
                flexDirection: "row",
                //  width : '100%',
                //height : 40,
                alignItems : "center",
                backgroundColor : GLOBAL.COLOR.WHITE
              }} >

              <TouchableOpacity
              onPress={() => {
                this.toggleShareModal(!this.state.shareModalView)}}>
                <Image  source={require('../Assest/close.png')} />
                </TouchableOpacity>

                <View
                style={{flexDirection : 'column',justifyContent : 'center',alignItems : 'center',marginLeft :-20}}
                >
                <Text style = {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceDetailsPage.ShareInvoice')}</Text>
                </View>

                <Text></Text>
                </View>

              }
              >
              <ModalContent
              style={{
                flex: 1,
                backgroundColor: 'fff',
              }}
              >
              <View
              style={{
                justifyContent: 'space-between',
                marginTop :10,
                flexDirection: "column",
                //height : 40,
                //  alignItems : "stretch",
              }}>


              <View
             style={{
               justifyContent: 'center',
               marginTop :30,
               marginLeft : 0,
               flexDirection: "row",
               // padding : 10,
               borderRadius : 10,
               height : 55,
               alignItems : "center",
               backgroundColor : GLOBAL.COLOR.LIGHTPURPLE
             }} >

             <TouchableOpacity
              onPress={() => {this.onCapture("Download")}}
             >
             <Image  style = {styles.icon} source={require('../Assest/choosePhotos.png')} />
             <Text style =  {styles.btnText}>{Localized.t('InvoiceDetailsPage.DownloadAsImage')}</Text>
             </TouchableOpacity>
             </View>

             {/*<View
            style={{
              justifyContent: 'center',
              marginTop :30,
              marginLeft : 0,
              flexDirection: "row",
              // padding : 10,
              borderRadius : 10,
              height : 55,
              alignItems : "center",
              backgroundColor : GLOBAL.COLOR.LIGHTPURPLE
            }} >

            <TouchableOpacity
            onPress={() => {this.onCapture("Share")}}>
             <FeatherIcons name="share" color='#867EBD'  size={20} style = {styles.icon} />
            <Text style =  {styles.btnText}>{Localized.t('InvoiceDetailsPage.Share')}</Text>
            </TouchableOpacity>


             </View>*/}
              </View>


                </ModalContent>
                </ShareModal.BottomModal>




                {/*<InvoiceOpenModal.BottomModal
                visible={this.state.openInvoiceModalView}
                //visible = {this.state.modalVisible}
                onTouchOutside={() => this.setState({ openInvoiceModalView: false })}
                height={0.95}
                width={1}
                onSwipeOut={() => this.setState({ openInvoiceModalView: false })}
                modalTitle={



                  <View
                  style={{
                    justifyContent: 'space-between',
                    padding :15,
                    marginLeft : 0,
                    flexDirection: "row",
                    //  width : '100%',
                    //height : 40,
                    alignItems : "center",
                    backgroundColor : GLOBAL.COLOR.WHITE
                  }} >

                  <TouchableOpacity
                  onPress={() => {
                    this.toggleInvoiceOpenModal(!this.state.openInvoiceModalView)}}>
                    <Image  source={require('../Assest/close.png')} />
                    </TouchableOpacity>

                    <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: "column",
                      alignItems : "center",
                      backgroundColor : GLOBAL.COLOR.WHITE
                    }}>
                    <Text style={{fontSize: RFValue(22),color :GLOBAL.COLOR.DARKBLUE, fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceOpenDetailsPage.InvoiceDetails')}</Text>
                    <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY, fontFamily : 'Prompt-Regular'}}>{this.state.selectedName}</Text>
                    </View>

                    <Text></Text>
                    </View>

                  }
                  >
                  <ModalContent
                  style={{
                    flex: 1,
                    backgroundColor: 'fff',
                  }}
                  >

                  <ScrollView contentContainerStyle={{paddingBottom: 60}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>

                 <View   onStartShouldSetResponder={() => true}>


                  <View style={{
                    marginTop : 20,
                    marginTop :10,
                    marginLeft : 10,
                    marginRight : 10,
                    shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 9.11,
                    borderRadius : 10,
                    elevation: 10,
                    backgroundColor : GLOBAL.COLOR.WHITE,
                  }}

                  >
                  {
                    this.state.paidCustomerArray.map((item, index) => (

                      <View style={{
                        flexDirection :'column',
                        // justifyContent : 'space-between'
                      }} >


                      <View  style={{
                        flexDirection :'row',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginLeft : 10,
                        marginRight : 10,
                        padding : 5,
                        height : 50
                      }}>

                      <Text style = {{ color: item.subname1 != null ? item.subname1.length !=0 ? GLOBAL.COLOR.DARKGRAY :GLOBAL.COLOR.DARKBLUE : 'transparent',
                      fontSize : RFValue(15),
                      fontFamily : 'Prompt-Medium'}}>

                      {index > 2 ? item.name : Localized.t('InvoiceOpenDetailsPage.'+ item.name)}
                      </Text>


                      <View style={{
                        flexDirection : 'row',alignItems :'center'
                      }} >


                      <Text style = {{color: GLOBAL.COLOR.LIGHTBLUE  ,
                      fontSize : RFValue(15),
                      marginLeft : 10,
                      fontFamily : 'Prompt-Medium',
                    }}>
                    {item.subname1}
                    </Text>
                    </View>


                    </View>


                    <View
                    style={{
                      backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                      width : '100%',
                      height : 2,
                    }}>
                    </View>
                    </View>
                  ))
                }
                    </View>



                    <View style={{
                      marginTop : 20,
                      marginTop :10,
                      marginLeft : 10,
                      marginRight : 10,
                      shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 9.11,
                      borderRadius : 10,
                      elevation: 10,
                      backgroundColor : GLOBAL.COLOR.WHITE,
                    }}

                    >
                    {
                      this.state.paidPaymentArray.map((item, index) => (

                        <View style={{
                          flexDirection :'column',
                          // justifyContent : 'space-between'
                        }} >


                        <View  style={{
                          flexDirection :'row',
                          justifyContent : 'space-between',
                          alignItems : 'center',
                          marginLeft : 10,
                          marginRight : 10,
                          padding : 5,
                          height : 50
                        }}>

                        <Text style = {{ color: item.subname1 != null ? item.subname1.length !=0 ? GLOBAL.COLOR.DARKGRAY :GLOBAL.COLOR.DARKBLUE : 'transparent',
                        fontSize : RFValue(15),
                        fontFamily : 'Prompt-Medium'}}>

                        {Localized.t('InvoiceOpenDetailsPage.'+ item.name)}
                        </Text>


                        <View style={{
                          flexDirection : 'row',alignItems :'center'
                        }} >


                        <Text style = {{color:  index === this.state.paidPaymentArray.length-2 ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.LIGHTBLUE  ,
                        fontSize :  index === this.state.paidPaymentArray.length-2 ? RFValue(20) :RFValue(15),
                        marginLeft : 10,
                        fontFamily : 'Prompt-Medium',
                      }}>
                      {item.subname1}
                      </Text>
                      </View>


                      </View>


                      <View
                      style={{
                        backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                        width : '100%',
                        height : 2,
                      }}>
                      </View>
                      </View>
                    ))
                  }
                      </View>



                      <View style={{
                        marginTop : 20,
                        marginTop :10,
                        marginLeft : 10,
                        marginRight : 10,
                        shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                        shadowOffset: {
                          width: 0,
                          height: 7,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 9.11,
                        borderRadius : 10,
                        elevation: 10,
                        backgroundColor : GLOBAL.COLOR.WHITE,
                      }}

                      >
                      {
                        this.state.paidInvoiceArray.map((item, index) => (

                          <View style={{
                            flexDirection :'column',
                            // justifyContent : 'space-between'
                          }} >


                          <View  style={{
                            flexDirection :'row',
                            justifyContent : 'space-between',
                            alignItems : 'center',
                            marginLeft : 10,
                            marginRight : 10,
                            padding : 5,
                            height : 50
                          }}>

                          <Text style = {{ color: index != 0 ? GLOBAL.COLOR.DARKGRAY :GLOBAL.COLOR.DARKBLUE,
                          fontSize : RFValue(15),
                          fontFamily : 'Prompt-Medium'}}>

                          {Localized.t('InvoiceOpenDetailsPage.'+ item.name)}
                          </Text>


                          <View style={{
                            flexDirection : 'row',alignItems :'center'
                          }} >


                          <Text style = {{color: GLOBAL.COLOR.LIGHTBLUE  ,
                          fontSize : RFValue(15),
                          marginLeft : 10,
                          fontFamily : 'Prompt-Medium',
                        }}>
                        {item.subname1}
                        </Text>
                        </View>


                        </View>


                        <View
                        style={{
                          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                          width : '100%',
                          height : 2,
                        }}>
                        </View>
                        </View>
                      ))
                    }
                        </View>


                    <View style={{
                      alignItems : 'flex-end',
                      marginTop : 50,
                      padding : 10,
                      }}>
                    <CustomButton title= {Localized.t('InvoiceOpenDetailsPage.Refund')} style = {{fontSize : RFValue(20)}}
                    onPress={() => {
                          this.setState({
                            refunModalView: true,
                          });
                        }}
                    />
                   </View>

                    </View>
                    </ScrollView>

                    </ModalContent>
                    </InvoiceOpenModal.BottomModal>*/}


                    <RefundModal.BottomModal
                   visible={this.state.refunModalView}
                   //visible = {this.state.modalVisible}
                   onTouchOutside={() => this.setState({ refunModalView: false })}
                   height={0.7}
                   width={1}
                   onSwipeOut={() => this.setState({ refunModalView: false })}
                   modalTitle={



                     <View
                     style={{
                       backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
                     }} >

                     <View style = {{
                       justifyContent: 'space-between',
                   //  padding :15,
                     marginTop : 10,
                     flexDirection: "row",

                     //height : 40,
                     alignItems : "center",}}>
                     <TouchableOpacity
                      style = {{width : '10%',alignItems : 'center'}}
                     onPress={() => {
                       this.toggleRefundModal(!this.state.refunModalView)}}>
                     <Image  source={require('../Assest/close.png')} />
                     </TouchableOpacity>

                     <View
                     style={{flexDirection : 'column',justifyContent : 'center',alignItems : 'center',width : '80%'}}
                     >
                     <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize : RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceDetailsPage.Refund')}</Text>
                     <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,alignItems : 'center',fontSize : RFValue(17),fontFamily : 'Prompt-Regular'}}>{Localized.t('InvoiceDetailsPage.PleaseChooseRefundType')}</Text>
                     </View>
                     <Text style = {{width : '10%'}}></Text>
                     </View>
                      </View>

                   }
                 >
                   <ModalContent
                     style={{
                       flex: 1,
                      backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                     }}
                   >
                   <View
                   style={{
                     justifyContent: 'space-between',
                     marginTop :10,
                     flexDirection: "column",
                     //height : 40,
                     //  alignItems : "stretch",
                   }}>

                   <Form
                         ref="form"
                         onSubmit={this.refundSubmit}
                    >

                    <View
                   style={{
                     backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                     height : 2,marginTop : 10,width : '100%'
                   }}>
                   </View>

                   <View style={{ flexDirection: "row",marginTop : 5,marginBottom : 5 }}>


                                       {
                                         this.state.RefundTypeArray.map((item, index) => (


                                         <TouchableOpacity
                                           style = {{
                                             flexDirection: "row",
                                             margin: 10,
                                             flex: 3,
                                             justifyContent: "space-evenly",
                                             alignItems : "center"
                                           }}
                                           onPress={() => this.CheckRefundElement(item)}
                                         >
                                         <MaterialCommunityIcons
                                           name={
                                             item.isChecked === true
                                               ? "circle"
                                               : "checkbox-blank-circle-outline"
                                           }
                                           size={25}
                                           color={isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
                                         />
                                         <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceDetailsPage.'+ item.value)}</Text>
                                         </TouchableOpacity>
                                       ))
                                     }
                   </View>
                   <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    height : 2,
                    marginTop : 10
                  }}>
                  </View>

                  <View  style={{
                    flexDirection :'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginLeft : 10,
                    marginRight : 10,
                    padding : 5,
                    height : 50
                    }}>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(17),
                     fontFamily : 'Prompt-Regular'}}>
                       {   this.state.RefundTypeArray[1].isChecked == true ?  Localized.t('InvoiceDetailsPage.RefundAmount') :  Localized.t('InvoiceDetailsPage.TotalAmount') }
                    </Text>

                    <Text style = {{ color:isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,
                     fontSize : RFValue(17),
                     fontFamily : 'Prompt-Regular'}}>
                     {GLOBAL.CURRENCY +' ' +   Number(this.state.RefundTotalamount).toFixed(3)}
                    </Text>

                   </View>


                     <View
                     style={{
                       backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                       width : '100%',
                       height : 2,
                     }}>
                     </View>
                  <Text style = {{marginTop : 10,fontSize : RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-SemiBold', display : this.state.RefundTypeArray[1].isChecked == true ? 'none' : null,textAlign :'left'}}>
                  {Localized.t('InvoiceDetailsPage.RefundAmount')}
                  </Text>


                    <View style={{
                      marginTop :10,
                      marginLeft : 0,
                      marginRight : 0,
                      height : 50,
                      shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 9.11,
                      borderRadius : 10,
                      elevation: 10,
                      backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                      alignItems: 'center',
                      flexDirection: "row",
                      justifyContent: 'space-between',
                       display : this.state.RefundTypeArray[1].isChecked == true ? 'none' : null,
                       borderWidth : isDarkMode ? 1 : 0,
                       borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
                    }} >

                 <TextValidator
                              style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize : RFValue(20),marginLeft:10,width :screenWidth*.5,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                              name="Amount"
                              label="Amount"
                              validators={['required','matchRegexp:^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$']}
                              errorMessages={[Localized.t('TextValidationPage.Amountfieldisrequired'), Localized.t('TextValidationPage.Entervalidamount')]}
                              errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                              placeholder="0.000"
                              //placeholderTextColor = {GLOBAL.COLOR.ORANGE}
                              type="Amount"
                              keyboardType="numeric"
                              value={this.state.Refundamount}
                              onChangeText={this.handleChange('Refundamount')}
                              returnKeyLabel='Done'
                              returnKeyType='done'
                              onSubmitEditing={Keyboard.dismiss}
                            //  ref={(input) => { this.amtTextInput = input; }}
                             // onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                            //  returnKeyType="done"
                              maxLength={50}
                              blurOnSubmit={false}
                      />

                    <View style={{flexDirection: "row",justifyContent: 'space-between'}}>
                    <View
                    style={{
                      backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                      width : 2,
                      //height : '100%',
                    }}>
                    </View>

                      <Text style =  {{color : GLOBAL.COLOR.ORANGE,marginLeft : 20,fontFamily : 'Prompt-SemiBold',fontSize : RFValue(17),marginRight : 10}}>KWD</Text>
                    </View>

                   </View>

                   <View style={{
                     alignItems : 'flex-end',
                     marginTop : 50,
                     padding : 10,
                     }}>

                   <CustomButton title= {Localized.t('InvoiceDetailsPage.Confirm')} style = {{fontSize : RFValue(20)}}
                   onPress={() => {
                         this.state.RefundTypeArray[1].isChecked == true ? this.SendRefundDetail() : this.refundFormSubmit()
                       }}
                   />
                  </View>

                    </Form>
                   </View>

                   </ModalContent>
                 </RefundModal.BottomModal>

                 <CustomAlertComponent
                     displayAlert={this.state.showRefundAlert}
                     displayAlertIcon={false}
                     alertTitleText={Localized.t('TextValidationPage.Message')}
                     alertMessageText={this.state.showRefundAlertMessage}
                     displayPositiveButton={true}
                     positiveButtonText={Localized.t('TextValidationPage.Ok')}
                     displayNegativeButton={false}
                     onPressPositiveButton={this.onPressRefundButton}
                   />



                 <IllustratorModals.BottomModal
                 overlayBackgroundColor = {GLOBAL.COLOR.LIGHTPURPLE}
                 overlayOpacity = {1}
                  propagateSwipe={true}
                  visible={this.state.illustratorVisible}
                  swipeableModal = {false}
                 height={0.75}
                 width={1}

                >
                 <ModalContent
                   style={{
                     flex: 1,
                     backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
                   }}
                 >
                  <IllustratorScreen example = {{'index' : this.state.illustratorType == 1 ? 6 : this.state.illustratorType == 3 ? 8 : 7,'value' : ''}} isDarkMode = {isDarkMode}  onOKClick={this.illustratorReceiveData}/>
                 </ModalContent>
                </IllustratorModals.BottomModal>



                    </ScrollView>
                    </ViewShot>

                    <Modalize
                      ref={this.invoiceOpenModal}
                      scrollViewProps={{ showsVerticalScrollIndicator: false ,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
                       HeaderComponent={

                         <View
                         style={{
                           justifyContent: 'space-between',
                           padding :0,
                           marginLeft : 0,
                           flexDirection: "row",
                           //  width : '100%',
                           //height : 40,
                           alignItems : "center",
                           backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                           borderTopLeftRadius : 10,borderTopRightRadius : 10
                         }} >

                         <TouchableOpacity
                         style = {{width : '10%',padding : 5}}
                         onPress={() => {
                           this.closeinvoiceOpenModal()}}>
                           <Image  source={require('../Assest/close.png')} />
                           </TouchableOpacity>

                           <View
                           style={{
                             justifyContent: 'space-between',
                             flexDirection: "column",
                             alignItems : "center",
                             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                             width : '80%'

                           }}>
                           <Text style={{fontSize: RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE, fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{Localized.t('PGDetailsPage.OpenInvoiceDetails')}</Text>
                           <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY, fontFamily : 'Prompt-Regular',textAlign : 'center'}}>{this.state.selectedName}</Text>
                           </View>

                           <Text  style = {{width : '10%'}}></Text>
                           </View>
                       }
                     >
                     <ScrollView contentContainerStyle={{paddingBottom: 60}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>

                    <View   onStartShouldSetResponder={() => true}>


                     <View style={{
                       marginTop : 20,
                       marginTop :10,
                       marginLeft : 10,
                       marginRight : 10,
                       shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                       shadowOffset: {
                         width: 0,
                         height: 7,
                       },
                       shadowOpacity: 0.1,
                       shadowRadius: 9.11,
                       borderRadius : 10,
                       elevation: 10,
                       backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                       borderWidth : isDarkMode ? 1 : 0 ,
                       borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
                     }}

                     >
                     {
                       this.state.paidCustomerArray.map((item, index) => (

                         <View style={{
                           flexDirection :'column',
                           // justifyContent : 'space-between'
                         }} >


                         <View  style={{
                           flexDirection :'row',
                           justifyContent : 'space-between',
                           alignItems : 'center',
                           marginLeft : 10,
                           marginRight : 10,
                           padding : 5,
                           height : 50
                         }}>

                         <Text style = {{ color: index == 0 ? item.subname1 != null ? item.subname1.length !=0 ? isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE : 'transparent' : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY,
                         fontSize : RFValue(15),
                         fontFamily : 'Prompt-Medium'}}>

                         {index > 2 ? item.name : Localized.t('InvoiceOpenDetailsPage.'+ item.name)}
                         </Text>


                         <View style={{
                           flexDirection : 'row',alignItems :'center'
                         }} >


                         <Text style = {{color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE  ,
                         fontSize : RFValue(15),
                         marginLeft : 10,
                         fontFamily : 'Prompt-Medium',
                       }}>
                       {item.subname1}
                       </Text>
                       </View>


                       </View>


                       <View
                       style={{
                         display : index == this.state.paidCustomerArray.length -1 ? 'none' : null ,
                         backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                         marginLeft : 5 ,
                         marginRight : 5 ,
                         height : 2,
                       }}>
                       </View>
                       </View>
                     ))
                   }
                       </View>



                       <View style={{
                         marginTop : 20,
                         marginTop :10,
                         marginLeft : 10,
                         marginRight : 10,
                         shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                         shadowOffset: {
                           width: 0,
                           height: 7,
                         },
                         shadowOpacity: 0.1,
                         shadowRadius: 9.11,
                         borderRadius : 10,
                         elevation: 10,
                         backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                         borderWidth : isDarkMode ? 1 : 0 ,
                         borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
                       }}

                       >
                       {
                         this.state.paidPaymentArray.map((item, index) => (

                           <View style={{
                             flexDirection :'column',
                             // justifyContent : 'space-between'
                           }} >


                           <View  style={{
                             flexDirection :'row',
                             justifyContent : 'space-between',
                             alignItems : 'center',
                             marginLeft : 10,
                             marginRight : 10,
                             padding : 5,
                             height : 50
                           }}>

                           <Text style = {{ color: item.subname1 != null ? item.subname1.length !=0 ? isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE : 'transparent',
                           fontSize : RFValue(15),
                           fontFamily : 'Prompt-Medium'}}>

                           {Localized.t('InvoiceOpenDetailsPage.'+ item.name)}
                           </Text>


                           <View style={{
                             flexDirection : 'row',alignItems :'center'
                           }} >


                           <Text style = {{color:  index === this.state.paidPaymentArray.length-2 ? GLOBAL.COLOR.ORANGE :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE  ,
                           fontSize :  index === this.state.paidPaymentArray.length-2 ? RFValue(20) :RFValue(15),
                           marginLeft : 10,
                           fontFamily : 'Prompt-Medium',
                         }}>
                         {item.subname1}
                         </Text>
                         </View>


                         </View>


                         <View
                         style={{
                           display : this.state.paidPaymentArray.length - 1 == index ? 'none' : null  ,
                           backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                           marginLeft : 5 ,
                           marginRight : 5 ,
                           height : 2,
                         }}>
                         </View>
                         </View>
                       ))
                     }
                         </View>


                         <View style={{
                           marginTop : 20,
                           marginTop :10,
                           marginLeft : 10,
                           marginRight : 10,
                           shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                           shadowOffset: {
                             width: 0,
                             height: 7,
                           },
                           shadowOpacity: 0.1,
                           shadowRadius: 9.11,
                           borderRadius : 10,
                           elevation: 10,
                           backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                           borderWidth : isDarkMode ? 1 : 0 ,
                           borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
                         }}

                         >
                         {
                           this.state.paidInvoiceArray.map((item, index) => (

                             <View style={{
                               flexDirection :'column',
                               // justifyContent : 'space-between'
                             }} >


                             <View  style={{
                               flexDirection :'row',
                               justifyContent : 'space-between',
                               alignItems : 'center',
                               marginLeft : 5,
                               marginRight : 5,
                               padding : 10,
                               height : 'auto'
                             }}>

                             <Text style = {{ color: index != 0 ?isDarkMode ? GLOBAL.COLOR.WHITE :   GLOBAL.COLOR.DARKGRAY : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
                             fontSize : RFValue(15),
                             fontFamily : 'Prompt-Medium',
                             width : '45%',
                             textAlign : 'left'
                           }}>

                             {Localized.t('InvoiceOpenDetailsPage.'+ item.name)}
                             </Text>


                             <View style={{
                               flexDirection : 'row',alignItems :'center',width : '55%',justifyContent : 'flex-end'
                             }} >


                             <Text style = {{color: isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.LIGHTBLUE  ,
                             fontSize : RFValue(15),
                             marginLeft : 10,
                             fontFamily : 'Prompt-Medium',
                               textAlign : 'right'
                           }}>
                           {item.subname1}
                           </Text>
                           </View>


                           </View>


                           <View
                           style={{
                             display :this.state.paidInvoiceArray.length -1 == index ? 'none' : null  ,
                             backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                             marginLeft : 5 ,
                             marginRight : 5 ,
                             height : 2,
                           }}>
                           </View>
                           </View>
                         ))
                       }
                           </View>

                           <CustomView
                           style={{display :  this.state.isHideRefundDetailView == false ? null :'none',  marginLeft : 10,
                               marginRight : 10, }}
                           >
                           <View
                           style={{
                             marginTop :10,
                             marginLeft :0,
                             marginRight : 0,
                             height : 50,
                             shadowColor: this.state.isHiddenRefundDetail === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
                             shadowOffset: {
                               width: 0,
                               height: 7,
                             },
                             shadowOpacity: 0.1,
                             shadowRadius: 9.11,
                             borderTopLeftRadius : 10,
                             borderTopRightRadius : 10,
                             borderBottomLeftRadius : this.state.isHiddenRefundDetail === false ? 0 :10,
                             borderBottomRightRadius : this.state.isHiddenRefundDetail === false ? 0 :10,
                             elevation: 10,
                             backgroundColor : GLOBAL.COLOR.WHITE,
                             alignItems: 'flex-start',
                             flexDirection: "row",
                             justifyContent: 'space-between',
                           }} >
                           <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 20,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 10}}>{Localized.t('ReportDetailPage.RefundDetails')}</Text>
                           <TouchableOpacity
                           style={styles.button3}
                           onPress={ this.HideRefundView }
                           >
                           <Text></Text>
                           <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
                           source={this.state.isHiddenRefundDetail === false ?
                           ArrowUP :
                           ArrowDown} />
                           </TouchableOpacity>

                           </View>

                           <CustomView hide={this.state.isHiddenRefundDetail} style = {{ shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                            shadowOffset: {
                              width: 0,
                              height: 7,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 9.11,
                            marginTop : 10
                            }}>
                           <View style={{
                             marginTop :10,
                             marginLeft : 5,
                             marginRight : 5,
                             shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                             shadowOffset: {
                               width: 0,
                               height: 7,
                             },
                             shadowOpacity: 0.1,
                             shadowRadius: 9.11,
                             borderBottomLeftRadius :10,
                             borderBottomRightRadius :10,
                             elevation: 10,
                             backgroundColor : GLOBAL.COLOR.WHITE,
                           }} >
                             {

                               this.state.RefundArray.map((items) => {
                               return <View style = {{
                                   marginTop :10,
                                  shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                                  shadowOffset: {
                                    width: 0,
                                    height: 7,
                                  },
                                  shadowOpacity: 0.1,
                                  shadowRadius: 9.11,
                                  borderRadius :10,
                                  elevation: 10,
                                  backgroundColor : GLOBAL.COLOR.WHITE}}>
                               {
                              items.map((item, index) => {


                                   return <View style={{
                                flexDirection :'column',
                               // justifyContent : 'space-between'
                                 }} >



                                 <View  style={{
                                   flexDirection :'row',
                                   justifyContent : 'space-between',
                                   alignItems : 'center',
                                   marginLeft : 10,
                                   marginRight : 10,
                                   padding : 5,
                                   height : 50,
                                   display : index < 4 ? null : 'none'
                                   }}>

                                   <Text style = {{ color: index === 0 ? GLOBAL.COLOR.DARKBLUE :GLOBAL.COLOR.DARKGRAY,
                                    fontSize : RFValue(15),
                                    fontFamily : 'Prompt-Medium'}}>
                                      {Localized.t('ReportDetailPage.'+ item.name1)}
                                   </Text>


                                   <View style={{
                                   flexDirection : 'row',alignItems :'center'
                                   }} >

                                   <MaterialCommunityIcons name="checkbox-blank-circle" color={item.img === 0 ? 'yellow' : item.img === 1 ? GLOBAL.COLOR.GREEN :  GLOBAL.COLOR.RED}  size={18}  style={{...styles.ImageIconStyle,...{display :  index === 0 ? null : 'none'}}} />

                                    <Text style = {{color: index === 3 ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.DARKBLUE  ,
                                     fontSize : index === 3 ? RFValue(20) :RFValue(15),
                                     marginLeft : 10,
                                     fontFamily : 'Prompt-Medium',
                                       }}>
                                        {index == 0 ? Localized.t('ReportDetailPage.'+ item.subname1) : item.subname1}
                                     </Text>
                                   </View>


                                    </View>


                                    <View
                                    style={{
                                      backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                                      width : '100%',
                                      height : 2,
                                        display : index < 4 ? null : 'none'
                                    }}>
                                    </View>

                                    <View
                                   style={{
                                     justifyContent: 'space-between',
                                     marginTop :0,
                                     flexDirection: "row",
                                     //height : 40,
                                      padding : 15,
                                     alignItems : "flex-start",
                                      display : index == 4 ? null : 'none'
                                   }}>

                                   <View
                                   style={{
                                     justifyContent: 'space-between',
                                     marginTop :0,
                                     flexDirection: "column",
                                     //height : 40,
                                     alignItems : "center",

                                   }}>
                                   <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{ Localized.t('ReportDetailPage.'+ item.name1) }</Text>
                                   <Text style =  {{color : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{ item.subname1}</Text>
                                   </View>

                                   <View
                                   style={{
                                     backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                                     width : 2,
                                     height : '100%',
                                   }}>
                                   </View>


                                   <View
                                   style={{
                                     justifyContent: 'space-between',
                                     marginTop :0,
                                     flexDirection: "column",
                                     //height : 40,
                                     alignItems : "center",
                                   }}>
                                   <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{Localized.t('ReportDetailPage.'+item.name2)}</Text>
                                   <Text style =  {{color : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{ item.subname2}</Text>
                                   </View>

                                   </View>

                                   <View
                                   style={{
                                     backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                                     width : '90%',
                                     height : 2,
                                     marginLeft : '5%',
                                     marginRight :'5%',
                                      display : index == 5 ? null : 'none'
                                   }}>
                                   </View>

                                   <View
                                  style={{
                                    justifyContent: 'space-between',
                                    marginTop :0,
                                    flexDirection: "row",
                                    //height : 40,
                                     padding : 15,
                                    alignItems : "flex-start",
                                     display : index == 5 ? null : 'none'
                                  }}>

                                  <View
                                  style={{
                                    justifyContent: 'space-between',
                                    marginTop :0,
                                    flexDirection: "column",
                                    //height : 40,
                                    alignItems : "center",
                                  }}>
                                  <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{  Localized.t('ReportDetailPage.'+item.name1)}</Text>
                                  <Text style =  {{color : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{item.subname1}</Text>
                                  </View>

                                  <View
                                  style={{
                                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                                    width : 2,
                                    height : '100%',
                                  }}>
                                  </View>


                                  <View
                                  style={{
                                    justifyContent: 'space-between',
                                    marginTop :0,
                                    flexDirection: "column",
                                    //height : 40,
                                    alignItems : "center",
                                  }}>
                                  <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{ Localized.t('ReportDetailPage.' + item.name2)}</Text>
                                  <Text style =  {{color : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{item.subname2}</Text>
                                  </View>

                                  </View>

                                  <View
                                  style={{
                                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                                    width : '90%',
                                    height : 2,
                                    marginLeft : '5%',
                                    marginRight :'5%',
                                    display : index == 6 ? null : 'none'
                                  }}>
                                  </View>


                                  <View style = {{}}>
                                   <View
                                            style={{
                                              justifyContent: 'space-between',
                                              flexDirection: "column",
                                              height : 45,
                                              marginTop : 10,
                                              marginLeft : 10,
                                              marginRight :10,
                                               display : index == 6 ? null : 'none'
                                            }}>
                                            <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',padding : 10,fontSize : RFValue(15),fontFamily : 'Prompt-Medium',textAlign : 'left'}}>{Localized.t('ReportDetailPage.'+ item.name1)}</Text>
                                     </View>

                                     <View style={{
                                       marginTop :0,
                                       marginLeft : 10,
                                       marginRight : 0,
                                       height : 50,
                                       display : index == 6 ? null : 'none'
                                     }} >
                                  <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 20,fontSize : RFValue(13),fontFamily : 'Prompt-Regular',marginTop : 5,textAlign : 'left'}}>{item.subname1}</Text>
                                  </View>
                                 </View>

                                    </View>

                               })



                              }
                             </View>
                             })


                            }



                          </View>

                           </CustomView>
                           </CustomView>

                       {<View style={{
                         alignItems : 'flex-end',
                         marginTop : 50,
                         padding : 10,
                          display : this.state.transaction_Type == 0 ? 'none' : null
                         }}>
                       <CustomButton title= {Localized.t('InvoiceOpenDetailsPage.Refund')} style = {{fontSize : RFValue(20)}}
                       onPress={() => {
                             this.setState({
                               refunModalView: true,
                             });
                           }}
                       />
                      </View>}

                       </View>
                       </ScrollView>
                     </Modalize>


                     <Modalize
           						ref={this.regenerateOpenModal}
                        scrollViewProps={{ showsVerticalScrollIndicator: false ,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
                      modalHeight ={this.state.calendarVisible == true ? 650 : 300}
                      panGestureEnabled={false}
           						HeaderComponent={

                          <View
                          style={{
                            justifyContent: 'space-between',
                            padding :15,
                            marginLeft : 0,
                            flexDirection: "row",

                            //height : 40,
                            alignItems : "center",
                            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
                          }} >

                          <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center'}}>
                          <TouchableOpacity
                          style = {{ shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
                                shadowOffset: {
                                  width: 0,
                                  height: 7,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 9.11,
                                borderRadius : 20,
                                elevation: 14}}
                          onPress={() => {
                            this.closeRegenerateOpenModal()}}>
                          <Image style = {{borderRadius : 15}} source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
                          </TouchableOpacity>
                          </View>

                          <View
                          style={{flexDirection : 'column',justifyContent : 'center',alignItems : 'center',width : '60%'}}
                          >
                          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize : RFValue(22),fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{Localized.t('InvoicePreviewPage.PleaseSelect')}</Text>
                          </View>
                          <Text style = {{width : '20%'}}></Text>
                           </View>
           						 }
           						 //scrollViewProps={{ showsVerticalScrollIndicator: false }}
           					//	 onClosed={this.closecalendarModal()}
           						// snapPoint={screenheight}
           					 >

                      <ScrollView contentContainerStyle={{paddingBottom: 90}} style = {{padding : 10,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
                     <View
                     style={{
                       justifyContent: 'space-between',
                       marginTop :10,
                       flexDirection: "column",
                     }}>

                     <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 0,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoicePreviewPage.Date')}</Text>
                     <View
                     style={{
                       justifyContent: 'space-between',
                       marginTop :10,
                       marginLeft : 0,
                       flexDirection: "row",
                       alignItems : "center",
                       height : 50,
                       width : '100%',
                       borderWidth : isDarkMode ? 1 : 0 ,
                       borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
                       borderRadius : 15

                     }} >
                     <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : '70%'}}>{this.state.regenrateDate}</Text>
                     <TouchableOpacity
                     style = {{justifyContent : 'flex-end'}}
                     onPress={() => this.toggleCalendar(true)}>
                     <Image style = {{marginRight :10}} source={require('../Assest/calendarGray.png')}/>
                     </TouchableOpacity>
                     </View>

                     <CalendarList
                     style={{
                   // height: 350,
                    marginLeft : 0,
                    marginTop : 10,
                    width : '100%',
                    display : Platform.OS === "android" ? 'none' : this.state.calendarVisible == true ? null : 'none'
                      }}

                      theme={{
                     monthTextColor: GLOBAL.COLOR.DARKBLUE,
                     textMonthFontWeight: 'bold',
                     todayTextColor: GLOBAL.COLOR.ORANGE,
                     selectedDayTextColor: GLOBAL.COLOR.DARKBLUE,

                     'stylesheet.calendar.header': {
                    week: {
                   marginTop: 5,
                   flexDirection: 'row',
                   justifyContent: 'space-between'
                 }
                },
                  'stylesheet.calendar.header': {
                 header: {
                 marginTop: 0,
                 flexDirection: 'row',
                 marginLeft :0,
                 justifyContent: 'flex-start'
                }
               }

                     }}

                       //markingType={this.state.markedType}

                     //  maxDate={format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')}
                       minDate={format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd')}
                     //  markedDates={this.state.marked}
                       // Callback which gets executed when visible months change in scroll view. Default = undefined
                       onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                       // Max amount of months allowed to scroll to the past. Default = 50
                       pastScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 0 :1 : 10}
                       // Max amount of months allowed to scroll to the future. Default = 50
                       futureScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 10 :1 : 10}
                       // Enable or disable scrolling of calendar list
                       //scrollEnabled={true}
                       horizontal={true}
                    // Enable paging on horizontal, default = false
                     // pagingEnabled={true}
                      // Set custom calendarWidth.
                       calendarWidth={320}

                      //current={this.state.regenrateDate}
                       selected={this.state.expiryRegenrateDate}
                       onDayPress={(day) => {
                          this.setState({ regenrateDate : format(parseISO(day.dateString), 'dd/MM/yyyy') })
                          this.setState({ expiryRegenrateDate : format(parseISO(day.dateString), 'yyyy-MM-dd') })
                         console.log('selected day', day)
                         this.toggleCalendar(false)
                       }}


                       markedDates={{
                         [this.state.expiryRegenrateDate]: {
                           selected: true,
                           disableTouchEvent: true,
                           selectedColor: 'orange',
                           selectedTextColor: GLOBAL.COLOR.WHITE
                         },

                       }}


                       />

                       <CalenderModals.BottomModal
                        propagateSwipe={true}
                        visible={Platform.OS === "android" ? this.state.calendarVisible : false}
                        swipeableModal = {false}
                       //visible = {this.state.modalVisible}
                      // onTouchOutside={() => this.setState({ HideModal: false })}
                       height={0.95}
                       width={1}
                       modalTitle = {
                         <TouchableOpacity
                         style={{marginTop : 10,marginLeft : 10}}
                         onPress={() => {
                         this.toggleCalendar(false)}}>
                         <Image style={styles.icon4} source={require('../Assest//close.png')} />
                         </TouchableOpacity>
                       }

                      // onSwipeOut={() => this.setState({ HideModal: false })}

                     >
                       <ModalContent
                         style={{
                           flex: 1,
                           backgroundColor: 'fff',
                         }}
                       >

                       <CalendarList
                       style={{
                     // height: 350,
                      marginLeft : 0,
                      marginTop : 10,
                      width : '100%',
                      display :  this.state.calendarVisible == true ? null : 'none'
                        }}

                        theme={{
                       monthTextColor: GLOBAL.COLOR.DARKBLUE,
                       textMonthFontWeight: 'bold',
                       todayTextColor: GLOBAL.COLOR.ORANGE,
                       selectedDayTextColor: GLOBAL.COLOR.DARKBLUE,

                       'stylesheet.calendar.header': {
                      week: {
                     marginTop: 5,
                     flexDirection: 'row',
                     justifyContent: 'space-between'
                   }
                  },
                    'stylesheet.calendar.header': {
                   header: {
                   marginTop: 0,
                   flexDirection: 'row',
                   marginLeft :0,
                   justifyContent: 'flex-start'
                  }
                 }

                       }}

                         //markingType={this.state.markedType}

                       //  maxDate={format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')}
                         minDate={format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd')}
                       //  markedDates={this.state.marked}
                         // Callback which gets executed when visible months change in scroll view. Default = undefined
                         onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                         // Max amount of months allowed to scroll to the past. Default = 50
                         pastScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 0 :1 : 10}
                         // Max amount of months allowed to scroll to the future. Default = 50
                         futureScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 10 :1 : 10}
                         // Enable or disable scrolling of calendar list
                         //scrollEnabled={true}
                         horizontal={Platform.OS === "android" ? false :true}
                      // Enable paging on horizontal, default = false
                       // pagingEnabled={true}
                        // Set custom calendarWidth.
                         calendarWidth={320}

                        //current={this.state.regenrateDate}
                         selected={this.state.expiryRegenrateDate}
                         onDayPress={(day) => {
                            this.setState({ regenrateDate : format(parseISO(day.dateString), 'dd/MM/yyyy') })
                            this.setState({ expiryRegenrateDate : format(parseISO(day.dateString), 'yyyy-MM-dd') })
                           console.log('selected day', day)
                           this.toggleCalendar(false)
                         }}


                         markedDates={{
                           [this.state.expiryRegenrateDate]: {
                             selected: true,
                             disableTouchEvent: true,
                             selectedColor: 'orange',
                             selectedTextColor: GLOBAL.COLOR.WHITE
                           },

                         }}


                         />

                       </ModalContent>
                      </CalenderModals.BottomModal>



                     <View style={{
                       alignItems : 'flex-end',
                       marginTop : 50,
                       padding : 10,
                       }}>

                     <CustomButton title= {Localized.t('InvoiceDetailsPage.Confirm')} style = {{fontSize : RFValue(20)}}
                     onPress={() => {
                           this.closeRegenerateOpenModal(),
                           this.RegenerateInvoice()
                         }}
                     />
                    </View>
                     </View>
                      </ScrollView>
           					 </Modalize>
                     </>
                  );
                }
              }

              const styles = StyleSheet.create({

                container: {
                  padding: 10,
                  marginTop: 3,
                  backgroundColor: GLOBAL.COLOR.WHITE,
                  alignItems: 'center',
                  //  justifyContent : 'center',
                  height : 60,
                },
                text: {
                  color: '#4f603c'
                },
                TextStyle: {
                  color: GLOBAL.COLOR.DARKBLUE,
                  fontSize : RFValue(17),
                  fontFamily : 'Prompt-SemiBold',
                },
                subTextStyle: {
                  color: GLOBAL.COLOR.DARKBLUE,
                  fontSize : RFValue(15),
                  fontFamily : 'Prompt-Regular',
                },
                ProductTextStyle: {
                  color: GLOBAL.COLOR.DARKGRAY,
                  fontSize : RFValue(13),
                  fontFamily : 'Prompt-Regular',
                },
                subTextValue: {
                  color: GLOBAL.COLOR.DARKGRAY,
                  fontSize : RFValue(15),
                  fontFamily : 'Prompt-Regular',
                  marginTop : 20
                },
                button: {
                  alignItems: 'flex-start',
                  //  padding: 10,
                  //  width: 150,
                  //  marginTop: 20,
                  //  marginLeft : 15,

                },
                button2: {
                  marginRight : -20
                  //  alignItems: 'flex-end',
                  //  padding: 10,
                  //  width: 150,
                  //  marginBottom: 36,
                },
                button3: {
                  alignItems: 'center',
                  //  padding: 10,
                  //  width: 150,
                  //  marginBottom: 36,
                },
                icon: {
                  // transform: [{ rotate: '180deg'}],
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  marginLeft : -30,
                  left: 2, // Keep some space between your left border and Image
                },
                icon3:{
                  width:25,
                  height: 25,
                  marginTop : 0,
                  marginRight : 10
                },
                icon4:{
                  width:30,
                  height:30,
                  justifyContent : 'flex-start',
                  marginLeft : 20
                },
                btnText: {
                  textAlign: 'center',
                  fontFamily : 'Prompt-Medium',
                  fontSize: RFValue(15),
                  color: '#867EBD',
                  //  height:50,
                  width:'100%'
                },
                ImageIconStyle: {
                  marginTop : 10,
                  tintColor : GLOBAL.COLOR.DARKGRAY,
                },
                viewStyle: {
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor:GLOBAL.COLOR.WHITE,
                  marginTop: Platform.OS == 'ios'? 30 : 0
                },
                ImageIconStyle1: {
                 marginRight :10,
                },
                FlattextStyle: {
                  fontFamily : 'Prompt-Medium',
                  fontSize : RFValue(15),
                  width : '80%',
                  marginLeft : 5,
                  textAlign : 'left'
                },
                textHeaderStyle: {
                  fontFamily : 'Prompt-Medium',
                  fontSize : RFValue(17)
                },
                FlattextStyle1: {
                  fontFamily : 'Prompt-SemiBold',
                  fontSize : RFValue(15)
                },
                FlattextStyle2: {
                  fontFamily : 'Prompt-SemiBold',
                  fontSize : RFValue(15)
                },
                borderContainer:{
                 flexDirection:'row',
                 alignItems:'center',
                 justifyContent:'center',
                 marginLeft : 5,
                 marginRight : 5,

               },
               border:{
                 flex:0.98,
                 borderBottomWidth: 1,
                 borderBottomColor: GLOBAL.COLOR.SHADEGRAY,

               },


              });
