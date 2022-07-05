
import React, {Component} from 'react';
import rectImg from '../Assest/rectangle.png';
import grayrectImg from '../Assest/calender.png';
import ArrowUP from '../Assest/showArrowUP.png';
import ArrowDown from '../Assest/hideArrowDown.png';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Clipboard,TextInput,Share,Platform,Keyboard} from 'react-native';
//import Panel from '../../components/Panel';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Localized from '../../../locales'
import { CustomButton } from '../../../components/CustomButton.js';
import CustomView from '../../../components/CustomView';
import RefundModal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';


import ShareModal, {} from 'react-native-modals';
import IllustratorScreen  from '../../../components/IllustratorScreen.js';
import IllustratorModals, {} from 'react-native-modals';
//import Modal from 'react-native-modal';
import API from '../../../utils/API';
const GLOBAL = require('../../../utils/Globals');
import { format,parseISO } from 'date-fns';
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import {Form,TextValidator}  from '../../../customTextField';
import CustomAlertComponent from '../../../components/CustomAlertComponent';
import { decimalthreeDigit,currencyFormat,paymentDisplayTypeID,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters} from '../../../utils/GlobalFunction';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';


export default class PGDetailsScreen extends Component {
  constructor(props){
    super(props);
    this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
     this.handleChange = this.handleChange.bind(this);

    this.state = {
    	selectedButton: 'Payment',
     clipboardContent: null,
      languageModal: false,
      isHiddenCommissionDetail : true,
      isHideRefundDetailView : true,
      isHiddenRefundDetail : true,
      refunModalView: false,
      Refundamount : '',
      RefundTotalamount : '0.000',
      token : '',
      referenceNo :'',
      illustratorVisible: false,
      shareModalView: false,
      serviceType :'',
      showRefundAlert : false,
      showRefundAlertMessage : '',
      RefundArray : [],
      PgDetailsArray: [
      {
        PaymentSuccess :
        [
          {id: 0,name: 'PaymentDetails',subname1: 'Success',Imge : 1},
          {id: 1,name: 'ServiceType',subname1: '',Imge : 2},
          {id: 2,name: 'PaymentType',subname1: '',Imge : 2},
          {id: 3,name: 'TimeStamp',subname1: '',Imge : 2},
          {id: 4,name: 'OrderID',subname1: '',Imge : 2},
          {id: 5,name: 'Transferred',subname1: '',Imge : 2},
          {id: 6,name: 'Amount',subname1: 'KWD | 0.000',Imge : 2},
          {id: 7,name: 'AdminstrativeCharges',subname1: 'KWD | 0.000',Imge : 2},
          {id: 8,name: 'TotalPaid',subname1: '',Imge : 2},
        ],
        PaymentRefund :
          [
            {id: 0,name: 'PaymentDetails',subname1: 'RefundedPartly',Imge : 1},
            {id: 1,name: 'ServiceType',subname1: 'PaymentGateway',Imge : 2},
            {id: 2,name: 'TotalAmount',subname1: 'KWD 0.000',Imge : 2},
            {id: 3,name: 'RefundAmount',subname1: 'KWD 0.000',Imge : 2},
            {id: 4,name: 'RefundedAt',subname1: '07/APR/19 10.30 am',Imge : 2},
            {id: 5,name: 'Transferred',subname1: 'Yes',Imge : 2},
            {id: 6,name: 'Balance',subname1: 'KWD 3000.000',Imge : 2},
        ],

         PaymentFinance :
           [
             {id: 0,name:'FinancialDetails',subname1: '',Imge : 2},
             {id: 1,name: 'ReferenceID',subname1: '',Imge : 2},
             {id: 2,name: 'KnetReferenceID',subname1: '',Imge : 2},
             {id: 3,name: 'AuthID',subname1: '',Imge : 2},
             {id: 4,name: 'BankReferenceID',subname1: '',Imge : 2},
             {id: 5,name: 'TransactionID',subname1: '',Imge : 2},
             {id: 6,name: 'CardNumber',subname1: '',Imge : 2},
             {id: 7,name: 'ReconcileDate',subname1: '',Imge : 2},
             {id: 8,name: 'ReconcileDoc',subname1: '',Imge : 2},
             {id: 9,name: 'PaymentTransferDate',subname1: '',Imge : 2},
             {id: 10,name: 'PaymentTransferDoc',subname1: '',Imge : 2},

         ],
       }

      ],

      CommisionArray :
      [
      //  {id: 0,name: 'Percentage',subname1: '0.0%'},
      //  {id: 1,name: 'FixedValue',subname1: '0.000'},
        {id: 0,name: 'TotalCommission',subname1: 'KWD | 4.000'},
        {id: 1,name: 'NetAmount',subname1: 'KWD 18.000'},
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
      this.gettransactionReportDetail(this.props.route.params.something.id)

  }

 static contextType = DarkModeContext;
  selectionOnPress(userType) {
    this.setState({ selectedButton: userType });
  }


  gettransactionReportDetail(transactionID) {
   var self = this;
    API.get(GLOBAL.API_STRING.PAYMENTLIST + '/' + transactionID,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


    }).then(function (response) {

      const json = JSON.parse(response)
       console.log(json.response.Data);

       let newArray = [...self.state.PgDetailsArray]
       if (self.props.route.params.Type == 'Success')
      {
        newArray[0].PaymentSuccess[1].subname1 =  json.response.service_type.name;
        newArray[0].PaymentSuccess[2].subname1 =  json.response.payment_type.display_name;
        newArray[0].PaymentSuccess[3].subname1 =  format(parseISO(json.response.created_at), 'dd/MMM/yy, hh:mm a');
        newArray[0].PaymentSuccess[4].subname1 =   json.response.order_reference_number;
        newArray[0].PaymentSuccess[5].subname1 =  json.response.payment_transfer_document_number.length != 0 ? 'Yes' : 'No'
        newArray[0].PaymentSuccess[6].subname1 = GLOBAL.CURRENCY + ' ' +  currencyFormat(Number((json.response.amount.toFixed(3) - json.response.admin_charge.toFixed(3))));
        newArray[0].PaymentSuccess[7].subname1 =  GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.admin_charge));
        newArray[0].PaymentSuccess[8].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.amount));
      }
      else
      {
        newArray[0].RefundComplete[1].subname1 =  json.response.service_type.name;
        newArray[0].RefundComplete[2].subname1 =  json.response.payment_type.display_name;
        newArray[0].RefundComplete[3].subname1 = GLOBAL.CURRENCY + ' ' + json.response.net_amount;
        newArray[0].RefundComplete[4].subname1 = GLOBAL.CURRENCY + ' ' +json.response.admin_charge;

        newArray[0].RefundComplete[6].subname1 = GLOBAL.CURRENCY + ' ' +json.response.amount;

      }

      newArray[0].PaymentFinance[1].subname1 = json.response.token;
      newArray[0].PaymentFinance[2].subname1 = json.response.transaction_payment_id;
      //newArray[0].PaymentFinance[2].name = json.response.payment_type_id == 2 ?  'MpgsReferenceID':  'KnetReferenceID';
      newArray[0].PaymentFinance[2].name =  upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(json.response.payment_type.display_name)) + 'ReferenceID';
      newArray[0].PaymentFinance[3].subname1 = json.response.auth;
      newArray[0].PaymentFinance[4].subname1 = json.response.transaction_reference_number;
      newArray[0].PaymentFinance[5].subname1 = json.response.transaction_id;
      newArray[0].PaymentFinance[6].subname1 = json.response.payment_card_detail != null ? json.response.payment_card_detail.card_number : '';
      newArray[0].PaymentFinance[7].subname1 = json.response.reconciliation != null ? json.response.reconciliation.reconciled_at  : '';
      newArray[0].PaymentFinance[8].subname1 = json.response.reconciliation != null ? json.response.reconciliation.document_number  : '';
      newArray[0].PaymentFinance[9].subname1 = json.response.payment_transfer != null ? json.response.payment_transfer.transferred_at  : '';
      newArray[0].PaymentFinance[10].subname1 = json.response.payment_transfer_document_number;




      self.setState({

       array: newArray,
       RefundTotalamount : json.response.amount,
       token : json.response.token,
       referenceNo : json.response.order_reference_number,
       serviceType : json.response.service_type.id,
       isHideRefundDetailView : json.response.refund.length > 0 ? false : true

      })

      let ComArray = [...self.state.CommisionArray]
    /*  if(json.response.payment_type.id == 1)
      {
        ComArray[0].subname1 = json.response.knet_percentage.toFixed(1) + '%';
        ComArray[1].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.knet_value));

      }
      else
      {
      ComArray[0].subname1 = json.response.mpgs_percentage.toFixed(1) + '%';
      ComArray[1].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.mpgs_value));
    }*/
    ComArray[0].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.commission));
    ComArray[1].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.net_amount));

      self.setState({

       array: ComArray,

      })


      let refMarkers = [];
        let refArray = [...self.state.TempRefundArray]
     if(json.response.refund.length != 0)
     {

       for(let j = 0; j < json.response.refund.length; j++)
       {
       let markers = [];
         for(let i = 0; i < self.state.TempRefundArray.length; i++)
         {

          markers.push({
         id: refArray[i].id,
         name1: refArray[i].name1,
         subname1 : i == 0 ? json.response.refund[j].refund_method == "2" ? json.response.refund[j].balance_amount == "0.000" ? "Complete" :"Partial"  : "Complete"
                  : i == 1 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.amount))
                  : i == 2 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.refund[j].amount))
                  : i == 3 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.refund[j].balance_amount))
                  : i == 4 ? format(parseISO(json.response.refund[j].created_at), 'dd/MMM/yy, hh:mm a')
                  : i == 5 ? json.response.refund[j].approved_by
                  :  json.response.refund[j].remark,
         name2: refArray[i].name2,
         subname2 : i == 4 || 5 ? json.response.refund[j].refund_at != null ? format(parseISO(json.response.refund[j].refund_at), 'dd/MMM/yy, hh:mm a') : '' : '',
         img : json.response.refund[j].status
         });

        }

        console.log(markers);
         refMarkers.push(
           markers
         );

      }



      console.log(" MMM" + refMarkers);

       self.setState({

        RefundArray: refMarkers,

       })


     }

      })

    .catch(function (error) {
      console.log(error);
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


   alertItemName(item) {
  // console.log(item);

    }


    HideCommisionView = () => {
          this.setState(state => ({
            isHiddenCommissionDetail: !state.isHiddenCommissionDetail
          }));
    };

    HideRefundView = () => {
          this.setState(state => ({
            isHiddenRefundDetail: !state.isHiddenRefundDetail
          }));
    };

    illustratorReceiveData(searchValue)
     {

      this.toggleillustratorPress(false)
      this.setState({ refunModalView: false });
      this.gettransactionReportDetail(this.props.route.params.something.id)
        //this.setState({filterType: filterValue});
     }

      toggleillustratorPress(visible) {
      this.setState({ illustratorVisible: visible });

      }


    toggleRefundModal(visible) {
      this.setState({ refunModalView: visible });
    }

    toggleShareModal(visible) {
      this.setState({ shareModalView: visible });
    }


    handleChange(name) {
      return (text) => {
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
        this.setState({ shareModalView: false })
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
           self.setState({ illustratorVisible: true });
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
             dialogTitle: 'Share TagWag App',
             // iOS only:
             excludedActivityTypes: []
         })
     }





  render(){
      const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
    const screenheight = Dimensions.get("window").height;

   const text = this.props.route.params;
   //console.log("CreateGuildStack param:" + text.something.name)
     console.log("CreateGuildStack param:" + text.something.name.first)

      console.log("param:" + text.Type)
  const selectionMenu = (this.state.selectedButton === "Payment" ? text.Type === "Refund" ?  this.state.PgDetailsArray[0].PaymentRefund :this.state.PgDetailsArray[0].PaymentSuccess : this.state.PgDetailsArray[0].PaymentFinance)
    return(
   <ViewShot ref="viewShot" style = {{ backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,}}>

   <View
   style={{
     justifyContent: 'space-between',
     marginTop :30,
     flexDirection: "row",
     height : 70,
     alignItems : "center",
     backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
   }}>

       <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center'}}>
   <TouchableOpacity
   onPress={() => {
     this.props.navigation.navigate('Dashboard')
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
     backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
     width : '60%'
   }}>
   <Text style={{fontSize: RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE, fontFamily : 'Prompt-Medium'}}>{this.state.serviceType == 7 ?  Localized.t('PGDetailsPage.OpenInvoiceDetails')  : this.state.serviceType.length != 0 ? Localized.t('PGDetailsPage.PGDetails') : ''}</Text>
   <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY, fontFamily : 'Prompt-Regular'}}>{this.state.referenceNo}</Text>
   </View>

   <TouchableOpacity
   style = {{marginTop :0,height :70,width : '20%' ,justifyContent : 'center',alignItems : 'flex-end'}}
   onPress={() => {
           this.toggleShareModal(!this.state.shareModalView)
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
     backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
   }}>
   <TouchableOpacity
   style={styles.button3}
   onPress={() => this.selectionOnPress("Payment")}>
   <Text style =  {{color : this.state.selectedButton === "Payment"
   ? GLOBAL.COLOR.ORANGE
   : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('PGDetailsPage.Payment')}</Text>
   <Image
   style={styles.icon1}
   source = { this.state.selectedButton === "Payment" ?
   rectImg :
   null} />
   </TouchableOpacity>
   <TouchableOpacity
   style={styles.button3}
   onPress={() => this.selectionOnPress("Finance")}>
   <Text style =  {{color : this.state.selectedButton === "Finance"
   ? GLOBAL.COLOR.ORANGE
   : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('PGDetailsPage.Finance')}</Text>
   <Image
   style={styles.icon1}
   source = { this.state.selectedButton === "Finance" ?
   rectImg :
   null} />
   </TouchableOpacity>
   </View>

 <ScrollView contentContainerStyle={{paddingBottom: 180}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>

        <View style={{ flex: 1,backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>

          <View  style={{
            //flexDirection : 'column',
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,

          }}>

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
              borderWidth : isDarkMode ? 1 : 0 ,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            }} >
              {
                selectionMenu.map((item, index) => (
                  <View style={{
                 flexDirection :'column',
                // justifyContent : 'space-between'
                  }} >


                  <View  style={{
                    flexDirection :'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginLeft : 0,
                    padding : 10,
                    height : 'auto',

                    }}>

                    <Text style = {{ color: index === 0 ? isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,
                     fontSize : index === 0 ? RFValue(17) :RFValue(15),
                     fontFamily : 'Prompt-Medium',
                     width : '45%',
                     textAlign : 'left'
                   }}>
                       {Localized.t('PGDetailsPage.'+ item.name)}
                    </Text>


                    <View style={{
                    flexDirection : 'row',alignItems :'center',width : '55%',justifyContent : 'flex-end'
                    }} >

                    <MaterialCommunityIcons name="checkbox-blank-circle" color={text.Type === "Refund" ? "#36C4F0" :GLOBAL.COLOR.GREEN}  size={18}  style={{...styles.ImageIconStyle,...{display :  item.Imge === 2 ? 'none' :null}}} />
                     <Text style = {{color: this.state.selectedButton === "Payment" && index === selectionMenu.length-1 ? GLOBAL.COLOR.ORANGE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
                      fontSize : this.state.selectedButton === "Payment" && index === selectionMenu.length-1 ? RFValue(20) :RFValue(15),
                      marginLeft : 10,
                      fontFamily : 'Prompt-Medium',
                      textAlign : 'right'
                        }}>
                         {this.state.selectedButton === "Payment"  && index == 0 ? Localized.t('PGDetailsPage.'+ item.subname1) : item.subname1}
                      </Text>
                   </View>


                     </View>

                        <View style = {{marginLeft : 10,marginRight : 10,marginTop :5,display : selectionMenu.length-2 == index ?  this.state.selectedButton === "Payment" ? null : 'none' :'none'}}>
                      <Image  source={require('../Assest/lineSeparator.png')} style = {{width : '99%',resizeMode : 'contain'}} />
                      </View>
                     <View
                     style={{
                       backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                       marginLeft : 10,
                       marginRight : 10,
                       height : 2,
                       display : selectionMenu.length-2 == index ? this.state.selectedButton === "Payment" ? 'none' : null :  selectionMenu.length-1 == index ? 'none' : null
                     }}>
                     </View>
                     </View>
                ))
             }
           </View>

           <CustomView
           style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none',  marginLeft : 10,
               marginRight : 10,marginTop : 10}}
           >
           <View
           style={{
             marginTop :10,
             marginLeft :0,
             marginRight : 0,
             height : 50,
             shadowColor: this.state.isHiddenCommissionDetail === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
             shadowOffset: {
               width: 0,
               height: 7,
             },
             shadowOpacity: 0.1,
             shadowRadius: 9.11,
             borderTopLeftRadius : 15,
             borderTopRightRadius : 15,
             borderBottomLeftRadius : this.state.isHiddenCommissionDetail === false ? 0 :15,
             borderBottomRightRadius : this.state.isHiddenCommissionDetail === false ? 0 :15,
             elevation: 10,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
             borderWidth : isDarkMode ? 1 : 0 ,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
           <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 10,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('InvoiceDetailsPage.HesabeCommission')}</Text>
           <TouchableOpacity
           style={styles.button3}
           onPress={ this.HideCommisionView }
           >
           <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
           source={this.state.isHiddenCommissionDetail === false ?
           ArrowUP :
           ArrowDown} />
           </TouchableOpacity>

           </View>

           <CustomView hide={this.state.isHiddenCommissionDetail}>
           <View style={{
             marginTop : 0,
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
               this.state.CommisionArray.map((item, index) => (
                 <View style={{
                flexDirection :'column',
               // justifyContent : 'space-between'
                 }} >

                 <View
                style={{
                  backgroundColor : GLOBAL.COLOR.SHADEGRAY,

                  height : 2,
                  marginLeft : 10,
                  marginRight : 10,
                 display : index == 0 ? isDarkMode ? 'none' :  null : 'none'
                }}>
                </View>

                 <View  style={{
                   flexDirection :'row',
                   justifyContent : 'space-between',
                   alignItems : 'center',
                   marginLeft : 10,
                   marginRight : 10,
                   //padding : 5,
                   height : 50
                   }}>

                   <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                    fontSize : RFValue(15),
                    fontFamily : 'Prompt-Medium'}}>
                      {Localized.t('InvoiceDetailsPage.'+ item.name)}
                   </Text>


                   <View style={{
                   flexDirection : 'row',alignItems :'center'
                   }} >


                    <Text style = {{color: index === this.state.CommisionArray.length-1 ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.DARKBLUE  ,
                     fontSize : index === this.state.CommisionArray.length-1 ? RFValue(20) :RFValue(15),
                     marginLeft : 10,
                     fontFamily : 'Prompt-Medium',
                       }}>
                        {/*index == 0 ? item.name == "Percentage" ? item.subname1 :Localized.t('InvoiceDetailsPage.'+ item.subname1) : item.subname1*/}
                        {item.subname1}
                     </Text>
                   </View>


                    </View>


                    <View
                    style={{
                      backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                      marginLeft :10,marginRight :10,
                      height : 2,
                      display : index == this.state.CommisionArray.length -1 ? 'none' : null
                    }}>
                    </View>
                    </View>
               ))
            }


          </View>

           </CustomView>
           </CustomView>

           <CustomView
           style={{display : this.state.selectedButton === "Payment" ?  this.state.isHideRefundDetailView == false ? null :'none'  :'none',  marginLeft : 10,
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
             borderTopLeftRadius : 15,
             borderTopRightRadius : 15,
             borderBottomLeftRadius : this.state.isHiddenRefundDetail === false ? 0 :15,
             borderBottomRightRadius : this.state.isHiddenRefundDetail === false ? 0 :15,
             elevation: 10,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
             borderWidth : isDarkMode ? 1 : 0,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
           <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 10,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('ReportDetailPage.RefundDetails')}</Text>
           <TouchableOpacity
           style={styles.button3}
           onPress={ this.HideRefundView }
           >
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
            marginTop : 0
            }}>
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
           }} >
             {

               this.state.RefundArray.map((items,index) => {
               return <View style = {{
                   marginTop :index == 0 ? 0 :10,
                  shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 9.11,
                  borderTopLeftRadius : index == 0 ? 0 : 10,
                  borderTopRightRadius :index == 0 ? 0 : 10,
                  borderBottomLeftRadius :10,
                  borderBottomRightRadius :10,
                  elevation: 10,
                  borderWidth : isDarkMode ? 1 : 0 ,
                  borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
                  backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}

                >
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

                   <Text style = {{ color: index === 0 ? isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY,
                    fontSize : RFValue(15),
                    fontFamily : 'Prompt-Medium'}}>
                      {Localized.t('ReportDetailPage.'+ item.name1)}
                   </Text>


                   <View style={{
                   flexDirection : 'row',alignItems :'center'
                   }} >

                   <MaterialCommunityIcons name="checkbox-blank-circle" color={item.img === 0 ? 'yellow' : item.img === 1 ? GLOBAL.COLOR.GREEN :  GLOBAL.COLOR.RED}  size={18}  style={{...styles.ImageIconStyle,...{display :  index === 0 ? null : 'none'}}} />

                    <Text style = {{color: index === 3 ? GLOBAL.COLOR.ORANGE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
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
                    //  width : '100%',
                     marginLeft :10,
                     marginRight : 10,
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

                     alignItems : "center",
                      display : index == 4 ? null : 'none'
                   }}>

                   <View
                   style={{
                     justifyContent: 'center',
                     marginTop :0,
                     flexDirection: "column",
                     //height : 40,
                     alignItems : "center",
                     width : '49%',
                     padding : 10


                   }}>
                   <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{ Localized.t('ReportDetailPage.'+ item.name1) }</Text>
                   <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{ item.subname1}</Text>
                   </View>

                   <View
                   style={{
                     backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                     width : 2,
                     height : '80%',
                   }}>
                   </View>


                   <View
                   style={{
                     justifyContent: 'center',
                     marginTop :0,
                     flexDirection: "column",
                     //height : 40,
                     alignItems : "center",
                      width : '49%',
                      padding : 10
                   }}>
                   <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{Localized.t('ReportDetailPage.'+item.name2)}</Text>
                   <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{ item.subname2}</Text>
                   </View>

                   </View>

                   <View
                   style={{
                     backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                     height : 2,
                     marginLeft : 10,
                     marginRight :10,
                      display : index == 5 ? null : 'none'
                   }}>
                   </View>

                   <View
                  style={{
                    justifyContent: 'space-between',
                    marginTop :0,
                    flexDirection: "row",
                    //height : 40,
                    alignItems : "center",
                     display : index == 5 ? null : 'none'
                  }}>

                  <View
                  style={{
                    justifyContent: 'center',
                    marginTop :0,
                    flexDirection: "column",
                    //height : 40,
                    alignItems : "center",
                    width : '49%',
                    padding : 10
                  }}>
                  <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{  Localized.t('ReportDetailPage.'+item.name1)}</Text>
                  <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{item.subname1}</Text>
                  </View>

                  <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    width : 2,
                    height : '80%',
                  }}>
                  </View>


                  <View
                  style={{
                    justifyContent: 'center',
                    marginTop :0,
                    flexDirection: "column",
                    //height : 40,
                    alignItems : "center",
                    width : '49%',
                    padding : 10
                  }}>
                  <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{ Localized.t('ReportDetailPage.' + item.name2)}</Text>
                  <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{item.subname2}</Text>
                  </View>

                  </View>

                  <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    height : 2,
                    marginLeft : 10,
                    marginRight :10,
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
                            <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',padding : 10,fontSize : RFValue(15),fontFamily : 'Prompt-Medium',textAlign : 'left'}}>{Localized.t('ReportDetailPage.'+ item.name1)}</Text>
                     </View>

                     <View style={{
                       marginTop :0,
                       marginLeft : 10,
                       marginRight : 0,
                       height : 50,
                       display : index == 6 ? null : 'none'
                     }} >
                  <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 20,fontSize : RFValue(13),fontFamily : 'Prompt-Regular',marginTop : 5,textAlign : 'left'}}>{item.subname1}</Text>
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

           <View style={{
             alignItems : 'flex-end',
             marginTop : 50,
             padding : 10,
             display : this.state.selectedButton === "Payment" ? text.Type === "Refund" ? 'none' :null : null
             }}>
           <CustomButton title= {Localized.t('PGDetailsPage.Refund')} style = {{fontSize : RFValue(20)}}
           onPress={() => {
                 this.setState({
                   refunModalView: true,
                 });
               }}
           />
          </View>
           </View>

       </View>


       <ShareModal.BottomModal
       visible={this.state.shareModalView}
       //visible = {this.state.modalVisible}
       onTouchOutside={() => this.setState({ shareModalView: false })}
       height={200/screenheight}
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
           <Text style = {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceDetailsPage.Sharing')}</Text>
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
       <Text style =  {styles.btnText}>{Localized.t('InvoiceDetailsPage.Share') + '...'}</Text>
       </TouchableOpacity>


        </View>*/}
         </View>


           </ModalContent>
           </ShareModal.BottomModal>



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
        <Text style = {{color : isDarkMode ?  GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize : RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceDetailsPage.Refund')}</Text>
        <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'center',fontSize : RFValue(17),fontFamily : 'Prompt-Regular'}}>{Localized.t('InvoiceDetailsPage.PleaseChooseRefundType')}</Text>
        </View>
        <Text style = {{width : '10%'}} ></Text>
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
        marginTop :20,
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
                            <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceDetailsPage.'+ item.value)}</Text>
                            </TouchableOpacity>
                          ))
                        }
      </View>
      <View
     style={{
       backgroundColor : GLOBAL.COLOR.SHADEGRAY,
       height : 2,
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

       <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
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
     <Text style = {{marginTop : 10,fontSize : RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-SemiBold', display : this.state.RefundTypeArray[1].isChecked == true ? 'none' : null,textAlign : 'left'}}>
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
     <IllustratorScreen example = {{'index' : 6 ,'value' : ''}} isDarkMode = {isDarkMode} onOKClick={this.illustratorReceiveData}/>
    </ModalContent>
   </IllustratorModals.BottomModal>

        </ScrollView>
       </ViewShot>

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
//  marginTop : 20
},

 });
