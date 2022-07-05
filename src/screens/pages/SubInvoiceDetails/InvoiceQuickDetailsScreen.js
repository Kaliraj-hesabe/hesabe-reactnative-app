
import React, {Component} from 'react';
import rectImg from '../Assest/rectangle.png';
import grayrectImg from '../Assest/calender.png';
import ArrowUP from '../Assest/showArrowUP.png';
import ArrowDown from '../Assest/hideArrowDown.png';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Clipboard,TextInput,Share,Platform,Linking,Keyboard} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomView from '../../../components/CustomView';
import Localized from '../../../locales'
import { CustomButton } from '../../../components/CustomButton.js';
import IllustratorScreen  from '../../../components/IllustratorScreen.js';
import ShareModal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import RefundModal, {
} from 'react-native-modals';
import IllustratorModals, {} from 'react-native-modals';
import ResendModal, {} from 'react-native-modals';

import API from '../../../utils/API';
const GLOBAL = require('../../../utils/Globals');
import { format,parseISO } from 'date-fns';
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import {Form,TextValidator}  from '../../../customTextField';
import CustomAlertComponent from '../../../components/CustomAlertComponent';
import DropDownPicker from 'react-native-dropdown-picker';
import parsePhoneNumber from 'libphonenumber-js'
import { decimalthreeDigit} from '../../../utils/GlobalFunction';
import {currencyFormat,paymentDisplayTypeID,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters} from '../../../utils/GlobalFunction';
import { BackHandler } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';
//import Modal from 'react-native-modal';



export default class InvoiceQuickDetailsScreen extends Component {
  constructor(props){
    super(props);

     this.handleChange = this.handleChange.bind(this);
     this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
    	selectedButton: 'Payment',
      clipboardContent: null,
     	isHiddenPaymentDetail:true,
      isHiddenRefundDetail : true,
      isHideRefundDetailView : true,
      isHiddenCommissionDetail : true,
      isHiddenAddressDetail : true,
      isHiddenDescription:true,
      isHiddenInvoice:true,
      isHiddenProduct:true,
      Refundamount : '',
      RefundTotalamount : '0.000',
      token : '',
      illustratorVisible: false,
      illustratorType: '',
      shareModalView: false,
      refunModalView: false,
      resendModalView : false,
      CreatedOn : '06/Apr/19, 10:30am',
      PaidOn : '06/Apr/19, 10:30am',
      descriptionText: '',
      clickedCount : '',
      invoiceLink :'',
      invoiceMobileNo :'',
      invoiceSubType :'',
      shareImage : '',
      invoiceStatus:'3',
      showAlert : false,
      showAlertMessage : '',
      mobileNumber : '',
      countryList :[],
      countryCode : '',
      emailAddress : '',
      RefundArray : [],
      InvoiceParamterSubType : this.props.route.params.subType,

      PgDetailsArray: [
      {
        PaymentSuccess :
        [
          {id: 0,name: 'CustomerDetails',subname1: '',Imge : 1},
          {id: 1,name: 'Name',subname1: '',Imge : 2},
          {id: 2,name: 'Email',subname1: '',Imge : 2},
          {id: 3,name: 'Mobile',subname1: '',Imge : 2},
        ],
        PaymentRefund :
          [
            {id: 0,name: 'PaymentDetails',subname1: 'RefundedPartly',Imge : 1},
            {id: 1,name: 'ServiceType',subname1: 'PaymentGateway',Imge : 2},
            {id: 2,name: 'TotalAmount',subname1: 'KWD 0.000',Imge : 2},
            {id: 3,name: 'Transferred',subname1: 'Yes',Imge : 2},
            {id: 4,name: 'Balance',subname1: 'KWD 0.000',Imge : 2},
        ],
        PaymentSuccessFinance :
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
         PaymentRefundFinance :
           [
             {id: 0,name:'FinancialDetails',subname1: '',Imge : 2},
             {id: 1,name: 'TransactionID',subname1: '',Imge : 2},
             {id: 2,name: 'PaymentID',subname1: '',Imge : 2},
             {id: 3,name: 'TrackID',subname1: '',Imge : 2},
             {id: 4,name: 'AuthID',subname1: '',Imge : 2},
         ],
       }

      ],


          PaymentArray :
         this.props.route.params.subType == '4' ?
         this.props.route.params.something.subname3 == Localized.t("CommanTabPage.Paid") || this.props.route.params.something.subname3 == Localized.t("CommanTabPage.Success") ? [
           {id: 0,name: 'CreatedBy',subname1: '',subType : '0'},
           {id: 1,name: 'InvoiceAmount',subname1: '',subType : '1'},
           {id: 2,name: 'IncludingDeliveryFee',subname1: '',subType : '2'},
           {id: 3,name: 'OrderId',subname1: '',subType : '0'},
           {id: 4,name: 'OrderDropID',subname1: '',subType : '0'},
           {id: 5,name: 'TrackingCode',subname1: '',subType : '0'},
           {id: 6,name: 'AdminCharge',subname1: '',subType : '0'},
           {id: 7,name: 'Transferred',subname1: '',subType : '0'},
           {id: 8,name: 'TotalPaid',subname1: '',subType : '0'},
         ] :
         [
          {id: 0,name: 'CreatedBy',subname1: '',subType : '0'},
          {id: 1,name: 'InvoiceAmount',subname1: '',subType : '1'},
          {id: 2,name: 'IncludingDeliveryFee',subname1: '',subType : '2'},
          {id: 3,name: 'OrderDropID',subname1: '',subType : '0'},
          {id: 4,name: 'AdminCharge',subname1: '',subType : '0'},
          {id: 5,name: 'Transferred',subname1: '',subType : '0'},
          {id: 6,name: 'TotalPaid',subname1: '',subType : '0'},
        ] : [
          {id: 0,name: 'CreatedBy',subname1: '',subType : '0'},
          {id: 1,name: 'InvoiceAmount',subname1: '',subType : '0'},
          {id: 2,name: 'AdminCharge',subname1: '',subType : '0'},
          {id: 3,name: 'Transferred',subname1: '',subType : '0'},
          {id: 4,name: 'TotalPaid',subname1: '',subType : '0'},
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

        CommisionArray :
        [
        //  {id: 0,name: 'Percentage',subname1: '0.0%'},
          //{id: 1,name: 'FixedValue',subname1: '0.000'},
          {id: 0,name: 'TotalCommission',subname1: 'KWD | 0.000'},
          {id: 1,name: 'NetAmount',subname1: 'KWD 0.000'},
        ],
        ProductArray :
       [
        {id: 0,name: '',subname1: '',totalvalue :''}
      ],

      AddressArray :
      [
        {id: 0,name: 'City',subname1: ''},
        {id: 1,name: 'Block',subname1: ''},
        {id: 2,name: 'Street',subname1: ''},
        {id: 3,name: 'Jadda',subname1: ''},
        {id: 4,name: 'HouseNo',subname1: ''},
      ],

      RefundTypeArray: [
      {id: 1, value: "PartialRefund", isChecked: true},
       {id: 2, value: "FullRefund", isChecked: false},
      ]

    };
        console.log("START :" + this.props.route.params.something);
        console.log("START1 :" + this.props.route.params.subType);
      this.props.route.params.fromView == 'Dashboard' ?  this.getInvoiceDetail(this.props.route.params.something.id)
      : this.getInvoiceDetail(this.props.route.params.something.id)



  }

  static contextType = DarkModeContext;


  componentDidMount()
  {
  this.readLanguageData()
   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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


 componentWillUnmount() {
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
  if(this.state.resendModalView ==  true)
  {
  this.setState({
    resendModalView: false,
  });
  return true
  }
  else {
    this.props.navigation.navigate(this.props.route.params.fromView)
    return true
  }
  // return true;
}


getAddressDetail(value) {
   var self = this;
   var cityName  = ""
  API.get(GLOBAL.API_STRING.DELICONCITYLIST,{

    params: {
       'merchantCode' : GLOBAL.MERCHANT_CODE,
      }


  }).then(function (response) {

    const json = JSON.parse(response)
    console.log(json.response);

   let freelancers = json.response

    let javascript_freelancers = freelancers.filter(function(freelancers) {
      return freelancers.city_id == value });

     console.log(javascript_freelancers);

     cityName =  javascript_freelancers[0].city_name;

       let OrderArray = [...self.state.AddressArray]
       OrderArray[0].subname1 =  cityName
       self.setState({

        array: OrderArray,

       })


    //console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}


  getInvoiceDetail(transactionID) {
   var self = this;
    API.get(GLOBAL.API_STRING.QUICK_INVOICE + '/' + transactionID,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


    }).then(function (response) {

      console.log(response);
      const json = JSON.parse(response)
       console.log(json.response.Data);

       let newArray = [...self.state.PgDetailsArray]
       if (self.props.route.params.Type == 'Success' || self.props.route.params.Type == 'Failed')
      {
        newArray[0].PaymentSuccess[0].subname1 =  json.response.invoice_status == 0 ?   self.props.route.params.fromView == 'Dashboard' ? 'Failed' :'UnPaid' : json.response.invoice_status == 1 ?  self.props.route.params.fromView == 'Dashboard' ? 'Success' :'Paid' : 'Cancelled';
        newArray[0].PaymentSuccess[1].subname1 =  json.response.customer.name;
        newArray[0].PaymentSuccess[2].subname1 =  json.response.customer.email == null ? ""  : json.response.customer.email;
        newArray[0].PaymentSuccess[3].subname1 =  json.response.customer.phone_number == null ? ""  : json.response.customer.phone_number;
      }
      else
      {
        newArray[0].RefundComplete[1].subname1 =  json.response.service_type.name;
        newArray[0].RefundComplete[2].subname1 =  json.response.payment_type.name;
        newArray[0].RefundComplete[3].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.net_amount));
        newArray[0].RefundComplete[4].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.admin_charge));

        newArray[0].RefundComplete[6].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.amount));

      }


      if(json.response.transaction != null)
      {

      newArray[0].PaymentSuccessFinance[1].subname1 = json.response.transaction.token;
      newArray[0].PaymentSuccessFinance[2].subname1 = json.response.transaction.transaction_payment_id;
      //newArray[0].PaymentSuccessFinance[2].name =  json.response.transaction.payment_type_id == 2 ?  'MpgsReferenceID':  'KnetReferenceID';
      newArray[0].PaymentSuccessFinance[2].name =   upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(json.response.transaction.payment_type.display_name)) + 'ReferenceID';
      newArray[0].PaymentSuccessFinance[3].subname1 = json.response.transaction.auth;
      newArray[0].PaymentSuccessFinance[4].subname1 = json.response.transaction.transaction_reference_number;
      newArray[0].PaymentSuccessFinance[5].subname1 = json.response.transaction.transaction_id;
      newArray[0].PaymentSuccessFinance[6].subname1 = json.response.transaction.payment_card_detail != null ? json.response.transaction.payment_card_detail.card_number : '';
      newArray[0].PaymentSuccessFinance[7].subname1 = json.response.transaction.reconciliation != null ? json.response.transaction.reconciliation.reconciled_at  : '';
      newArray[0].PaymentSuccessFinance[8].subname1 = json.response.transaction.reconciliation != null ? json.response.transaction.reconciliation.document_number  : '';
      newArray[0].PaymentSuccessFinance[9].subname1 = json.response.transaction.payment_transfer != null ? json.response.transaction.payment_transfer.transferred_at  : '';
      newArray[0].PaymentSuccessFinance[10].subname1 = json.response.transaction.payment_transfer_document_number;

     }

    const phoneNumber = parsePhoneNumber('+' + json.response.customer.phone_number)

     self.setState({

      array: newArray,
      CreatedOn :   format(parseISO(json.response.created_at), 'dd/MMM/yy, hh:mm a'),
      PaidOn :  json.response.invoice_status == 0 || json.response.invoice_status == 3 ? '' : format(parseISO(json.response.updated_at), 'dd/MMM/yy, hh:mm a'),
      descriptionText : json.response.description,
      invoiceLink : json.response.url,
      clickedCount : json.response.visited_count,
      referenceNo : json.response.reference_number,
      invoiceMobileNo : json.response.customer.phone_number,
      token : json.response.token,
      invoiceStatus : json.response.invoice_status,
      mobileNumber : json.response.customer.phone_number != null ? phoneNumber.nationalNumber : '',
      countryCode : json.response.customer.phone_number != null ? phoneNumber.countryCallingCode :'',
      invoiceSubType : json.response.invoice_sub_type,
      InvoiceParamterSubType : json.response.invoice_sub_type,
      emailAddress : json.response.customer.email == null ? ""  : json.response.customer.email,
      isHideRefundDetailView : json.response.transaction != null ? json.response.transaction.refund.length > 0 ? false : true : true
     })

      let ComArray = [...self.state.CommisionArray]

      if(json.response.transaction != null)
      {
    /*  if(json.response.transaction.payment_type.id == 1)
      {
        ComArray[0].subname1 = json.response.transaction.knet_percentage.toFixed(1) + '%';
        ComArray[1].subname1 =  GLOBAL.CURRENCY + ' ' +  currencyFormat(Number(json.response.transaction.knet_value));

      }
      else
      {
      ComArray[0].subname1 = json.response.transaction.mpgs_percentage.toFixed(1) + '%';
      ComArray[1].subname1 = GLOBAL.CURRENCY + ' ' +  currencyFormat(Number(json.response.transaction.mpgs_value));
    }*/
     ComArray[0].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.commission));
     ComArray[1].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.net_amount));


      self.setState({

       array: ComArray,

      })
    }


            let payArray = [...self.state.PaymentArray]

            console.log(json.response.created_by_merchant.name);

             payArray[0].subname1 = json.response.created_by_merchant.name;
             payArray[1].subname1 = GLOBAL.CURRENCY + ' ' +  currencyFormat(Number(json.response.amount));
             if(self.state.InvoiceParamterSubType == '4')
             {

              if(self.props.route.params.something.subname3 == Localized.t("CommanTabPage.Paid") || self.props.route.params.something.subname3 == Localized.t("CommanTabPage.Success"))
               {
                    payArray[2].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.service_charge));
                    payArray[3].subname1 = json.response.order.order_id;
                    payArray[4].subname1 = json.response.order.order_drop_id;
                    payArray[5].subname1 = json.response.order.tracking_code;

               }
               else {

                 payArray[2].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.service_charge));
                 payArray[3].subname1 = json.response.order.order_drop_id;

               }

             }
            if(json.response.transaction != null)
            {
             if(self.state.InvoiceParamterSubType == '4')
             {
               if(self.props.route.params.something.subname3 == Localized.t("CommanTabPage.Paid") || self.props.route.params.something.subname3 == Localized.t("CommanTabPage.Success"))
                {
               payArray[6].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.admin_charge));
               payArray[7].subname1 = json.response.transaction.payment_transfer_status == 1 ? "Yes" : "No" ;
               payArray[8].subname1 = GLOBAL.CURRENCY + ' '+ currencyFormat(Number(json.response.transaction.amount));
              }
              else {

                payArray[4].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.admin_charge));
                payArray[5].subname1 = json.response.transaction.payment_transfer_status == 1 ? "Yes" : "No" ;
                payArray[6].subname1 = GLOBAL.CURRENCY + ' '+ currencyFormat(Number(json.response.transaction.amount));
              }

             }
             else {

               payArray[2].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.admin_charge));
               payArray[3].subname1 = json.response.transaction.payment_transfer_status == 1 ? "Yes" : "No" ;
               payArray[4].subname1 = GLOBAL.CURRENCY + ' '+ currencyFormat(Number(json.response.transaction.amount));

             }
             self.setState({
               RefundTotalamount : json.response.transaction.amount,
             })

          }

          self.setState({
           array: payArray,
          })



           let refMarkers = [];
             let refArray = [...self.state.TempRefundArray]

             if(json.response.transaction != null)
             {
          if(json.response.transaction.refund.length != 0)
          {
            for(let j = 0; j < json.response.transaction.refund.length; j++)
            {
            let markers = [];
              for(let i = 0; i < self.state.TempRefundArray.length; i++)
              {

               markers.push({
              id: refArray[i].id,
              name1: refArray[i].name1,
              subname1 : i == 0 ? json.response.transaction.refund[j].refund_method == "2" ? json.response.transaction.refund[j].balance_amount == "0.000" ? "Complete" :"Partial" : "Complete"
                       : i == 1 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.amount))
                       : i == 2 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.refund[j].amount))
                       : i == 3 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.refund[j].balance_amount))
                       : i == 4 ? format(parseISO(json.response.transaction.refund[j].created_at), 'dd/MMM/yy, hh:mm a')
                       : i == 5 ? json.response.transaction.refund[j].approved_by
                       :  json.response.transaction.refund[j].remark,
              name2: refArray[i].name2,
              subname2 : i == 4 || 5 ? json.response.transaction.refund[j].refund_at != null ?  format(parseISO(json.response.transaction.refund[j].refund_at), 'dd/MMM/yy, hh:mm a') : '' : '',
               img : json.response.transaction.refund[j].status
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
        }



          let markers = [];
          if(json.response.products.length != 0)
          {

            for(let i = 0; i < json.response.products.length; i++) {
             markers.push({
            id: json.response.products[i].id,
            name: json.response.products[i].name,
            subname1 : GLOBAL.CURRENCY + ' ' + json.response.products[i].amount + ' x ' + json.response.products[i].quantity + ' Units',
            totalvalue : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.products[i].final_amount)),
            });
           }


         }



         self.setState(
             {
            ProductArray: markers
           })


           let OrderArray = [...self.state.AddressArray]

           if(self.state.InvoiceParamterSubType == '4' )
           {


           self.getAddressDetail(json.response.order.city_id);
          OrderArray[1].subname1 = json.response.order.block_no;
          OrderArray[2].subname1 = json.response.order.street;
          OrderArray[3].subname1 = json.response.order.jaddah;
          OrderArray[4].subname1 = json.response.order.house_no;


           self.setState({

            array: OrderArray,

           })
         }


      //console.log('dddd :' + format(parseISO(json.response.transaction.created_at), 'dd/MMM/yy, hh:mm a'));




      })

    .catch(function (error) {
      console.log(error);
    });


  }



  selectionOnPress(userType) {
    this.setState({ selectedButton: userType });
  }



   alertItemName(item) {
  // console.log(item);

    }





    illustratorReceiveData(searchValue)
     {

      this.toggleillustratorPress(false)
      this.setState({ refunModalView: false });
      this.getInvoiceDetail(this.props.route.params.something.id)
        //this.setState({filterType: filterValue});
     }

      toggleillustratorPress(visible) {
      this.setState({ illustratorVisible: visible });

      }

    toggleShareModal(visible) {
      this.setState({ shareModalView: visible });

    }

    toggleRefundModal(visible) {
      this.setState({ refunModalView: visible });
    }

    handleChange(name) {
      return (text) => {

        if(name == 'Refundamount')
        {
          if(Number(text) > Number(this.state.RefundTotalamount) ? false : true )
          {
          this.setState({[name]:decimalthreeDigit(text) })
           }

           if(Number(text) > Number(this.state.RefundTotalamount) ?   this.setState({ showAlert: true,showAlertMessage : Localized.t('InvoiceDetailsPage.Partialrefundamountcannotbegreaterthantotalamount')}) : true )
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



    refundSubmit = () => {
         this.SendRefundDetail()
     }

    refundFormSubmit = () => {
        this.refs.form.submit();
    }

    onPressAlertPositiveButton = () => {

      this.setState({showAlert: false}, () => {

      });


      };

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
           self.setState({ illustratorVisible: true,illustratorType : 1 });
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
          if(errorjson.response.refundAmount != null)
          {
            message = errorjson.response.refundAmount[0]
          }

          self.setState({ showAlert: true,showAlertMessage : message});

        }
        else {
          message = errorjson.message
          self.setState({ showAlert: true,showAlertMessage : message,refunModalView: false});
        }
      //  console.log('final :' + errorjson.message);

      });


    }




    toggleResendModal(visible) {

      this.setState({
      shareModalView: false
     }, () => {

       if(this.state.invoiceSubType == 0)
       {
          this.setState({ resendModalView: visible });
          this.getcountryList()
        }
        else {

          setTimeout(() => {

            this.state.invoiceSubType == 1 ?   this.shareToWhatsApp() : this.state.invoiceSubType == 2 ? this.sharetoEmail(this.state.emailAddress, 'Invoice details', this.state.invoiceLink) : this.shareTextApp()

        }, 300);

        }

      });

    }

    getcountryList()
    {
      const tempticket = [];
      global.countries.map((y) => {
        tempticket.push({ label: '+' + y.code, value: y.code});
        })

       this.setState({countryList : tempticket,
         //countryCode : '965'
        })
       console.log(this.state.countryList);
    }

    shareTextApp = () =>{

        let  text = 'Invoice details \n\n'
        if(Platform.OS === 'android')
            text = text.concat(this.state.invoiceLink)
        else
            text = text.concat(this.state.invoiceLink)

        Share.share({
            subject: 'Share Invoice',
            title: 'Share Invoice',
            message: text,
          //  url:'app://',
            //  url: `data:image/png;base64,${this.state.base64}`,

        }, {
            // Android only:
            dialogTitle: 'Hesabe Merchant',
            // iOS only:
            excludedActivityTypes: []
        })
    }



    shareToWhatsApp = () => {
     let msg = this.state.invoiceLink;

     //const phoneNumber = parsePhoneNumber("+" + this.state.mobileNumber)
     console.log(this.state.mobileNumber);


     var demourl


    //let phoneWithCountryCode = this.state.mobileNumber;
     let phoneWithCountryCode = this.state.countryCode + this.state.mobileNumber;
     const phoneNumber = parsePhoneNumber("+" + phoneWithCountryCode)
      console.log(phoneNumber);

     let mobile = Platform.OS == 'ios' ? '+' + phoneWithCountryCode : '+' + phoneWithCountryCode;

    if(phoneNumber != null)
    {
     if(phoneNumber.countryCallingCode != null)
     {
      demourl = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
     }
     else {
        demourl = 'whatsapp://send?text=' + msg;
     }
     }
     else {
         demourl = 'whatsapp://send?text=' + msg;
     }



     if (mobile) {
       if (msg) {
         let url = demourl
         Linking.openURL(url).then((data) => {
           console.log('WhatsApp Opened');
         }).catch(() => {
           alert(Localized.t('TextValidationPage.WhatsAppnotinstalledonyourdevice'));
         });
       } else {
         alert('Please insert message to send');
       }
     } else {
       alert(Localized.t('TextValidationPage.Entervalidmobilenumber'));
     }
   }


   sharetoEmail = (toMailId, subject, body) => {

   Linking.openURL(`mailto:${toMailId}?subject=${subject}&body=${body}`).then((data) => {
     console.log('WhatsApp Opened');
   }).catch(() => {
     alert(Localized.t('TextValidationPage.mailisnotconfigureonyourdevice'));
   });
  };


    resendSubmit = () => {
         this.SendResendInvoice()
     }

    resendFormSubmit = () => {
        this.refs.form.submit();
    }



    SendResendInvoice()
     {
        var self = this;

      API.post(GLOBAL.API_STRING.QUICK_INVOICE + GLOBAL.API_STRING.RESEND, {

        "merchantCode" : GLOBAL.MERCHANT_CODE,
        "mobileNumber": self.state.mobileNumber,
        "resendId": this.props.route.params.something.id,
        "countryCode": self.state.countryCode

      }).then(function (response) {
        const json = JSON.parse(response)
        console.log(json.status);
       console.log(json);
        if(json.status)
        {
           self.setState({ illustratorVisible: true,illustratorType : 3 });
        }
        else {

        }
      })
      .catch(function (error) {
        console.log('finalzzz :' + error);

        const errorjson = JSON.parse(error)
      console.log('final :' + errorjson);

      var message = ''
      if(errorjson.response != null)
      {
        if(errorjson.response.mobileNumber != null)
        {
          message = errorjson.response.mobileNumber[0]
        }

        self.setState({ showAlert: true,showAlertMessage : message});

      }
      else {
        message = errorjson.message
        self.setState({ showAlert: true,showAlertMessage : message,refunModalView: false});
      }

      });



    }


    CancelInvoice() {

        var self = this;
          console.log('XYXY :'  + self.state.token);

      API.put(GLOBAL.API_STRING.QUICK_INVOICE + '/' + self.state.token, {

        "merchantCode" : GLOBAL.MERCHANT_CODE,
        "statusId": '3',

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
        const errorjson = JSON.parse(error)
      console.log('final :' + errorjson);

      var message = ''
      if(errorjson.response != null)
      {
        if(errorjson.response.statusId != null)
        {
          message = errorjson.response.statusId[0]
        }

        self.setState({ showAlert: true,showAlertMessage : message});

      }
      else {
        message = errorjson.message
        self.setState({ showAlert: true,showAlertMessage : message,refunModalView: false});
      }

      });

    }


HidePaymentView = () => {
      this.setState(state => ({
        isHiddenPaymentDetail: !state.isHiddenPaymentDetail
      }));
};

HideRefundView = () => {
      this.setState(state => ({
        isHiddenRefundDetail: !state.isHiddenRefundDetail
      }));
};

HideCommisionView = () => {
      this.setState(state => ({
        isHiddenCommissionDetail: !state.isHiddenCommissionDetail
      }));
};

HideDescriptionView = () => {
      this.setState(state => ({
        isHiddenDescription: !state.isHiddenDescription
      }));
};

HideInvoiceView = () => {
      this.setState(state => ({
        isHiddenInvoice: !state.isHiddenInvoice
      }));
};

HideProductView = () => {
      this.setState(state => ({
        isHiddenProduct: !state.isHiddenProduct
      }));
};

HideAddressView = () => {
      this.setState(state => ({
        isHiddenAddressDetail: !state.isHiddenAddressDetail
      }));
};


readFromClipboard(item) {
// console.log(item);
Clipboard.setString(item)

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
            this.setState({ showAlert: true,showAlertMessage : Localized.t('IllustratorDetailsPage.Thefilewasdownloadedsuccessfully')})
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
    // console.log("CreateGuildStack param:" + text.something.name.first)
      //console.log("param:" + text.Type)
  const selectionMenu = (this.state.selectedButton === "Payment" ? text.Type === "Refund" ?  this.state.PgDetailsArray[0].PaymentRefund :this.state.PgDetailsArray[0].PaymentSuccess : text.Type === "Refund" ? this.state.PgDetailsArray[0].PaymentRefundFinance : this.state.PgDetailsArray[0].PaymentSuccessFinance)
   console.log(selectionMenu);
    return(

 <ViewShot ref="viewShot" style = {{backgroundColor :  isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE}}>
 <View
 style={{
   //justifyContent: 'space-between',
   marginTop :30,
   flexDirection: "row",
   height : 90,
   alignItems : "center",
   backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
 }}>

     <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center'}}>
 <TouchableOpacity
 onPress={() => {

       this.props.navigation.navigate(text.fromView)
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

 <Image style = {{borderRadius : 15}} source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')}/>
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
 <Text style={{fontSize: RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE, fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{Localized.t('InvoiceDetailsPage.QuickInvoiceDetails')}</Text>
 <Text style={{fontSize: RFValue(17),color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY, fontFamily : 'Prompt-Regular'}}> {this.state.referenceNo}</Text>
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
   backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE
 }}>
 <TouchableOpacity
 style={styles.button3}
 onPress={() => this.selectionOnPress("Payment")}>
 <Text style =  {{color : this.state.selectedButton === "Payment"
 ? GLOBAL.COLOR.ORANGE
 : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceDetailsPage.Payment')}</Text>
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
 : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('InvoiceDetailsPage.Finance')}</Text>
 <Image
 style={styles.icon1}
 source = { this.state.selectedButton === "Finance" ?
 rectImg :
 null} />
 </TouchableOpacity>
 </View>

     <ScrollView contentContainerStyle={{paddingBottom: this.state.invoiceStatus == 3 ? 220 :180}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>

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
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
              borderWidth : isDarkMode ? 1 : 0,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
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
                    marginLeft : 10,
                    marginRight : 10,
                    padding : 10,
                    height : 'auto'
                    }}>

                    <Text style = {{ color: index === 0 ? isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE : GLOBAL.COLOR.DARKGRAY,
                     fontSize : index === 0 ? RFValue(17) :RFValue(15),
                     fontFamily : 'Prompt-Medium',
                     width : '45%',
                     textAlign : 'left'
                   }}>
                       { Localized.t('InvoiceDetailsPage.'+ item.name)}
                    </Text>


                    <View style={{
                    flexDirection : 'row',alignItems :'center',width : '55%',justifyContent : 'flex-end'
                    }} >

                    <MaterialCommunityIcons name="checkbox-blank-circle" color={text.Type === "Refund" ? "#36C4F0" : text.Type === "Success" && (item.subname1 == "Paid" ||item.subname1 == "Success" ) ? GLOBAL.COLOR.GREEN : item.subname1 == "UnPaid" ||item.subname1 == "Failed" ? GLOBAL.COLOR.RED : item.subname1 != null ? item.subname1.length != 0  ? 'yellow' : 'transparent' : 'transparent'}  size={18}  style={{display :  item.Imge === 2 ? 'none' :null}} />
                     <Text style = {{color: this.state.selectedButton === "Payment" && index === selectionMenu.length-1 ? GLOBAL.COLOR.ORANGE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
                      fontSize : this.state.selectedButton === "Payment" && index === selectionMenu.length-1 ? RFValue(20) :RFValue(15),
                      marginLeft : 10,
                      fontFamily : 'Prompt-Medium',
                      textAlign : 'right'
                        }}>
                         {this.state.selectedButton === "Payment"  && index == 0 ?  text.Type === "Refund" ? text.RefundType === 'Partly' ?  Localized.t('InvoiceDetailsPage.'+'RefundedPartly') : Localized.t('InvoiceDetailsPage.'+'Refundedfully') :
                        item.subname1 != null ? item.subname1.length !=0 ?  Localized.t('InvoiceDetailsPage.'+ item.subname1) :'' : ''
                         : item.subname1}
                      </Text>
                   </View>


                     </View>


                     <View
                     style={{
                       backgroundColor :  GLOBAL.COLOR.SHADEGRAY,
                      // width : '90%',
                       marginLeft : 10,
                       marginRight : 10,
                       height : isDarkMode ? index  == selectionMenu.length -1 ? 0 : 2 : 2,
                     }}>
                     </View>
                     </View>
                ))
             }
           </View>

           <View
          style={{
            justifyContent: 'space-between',
            marginTop :0,
            flexDirection: "row",
            //height : 40,
             padding : 15,
            alignItems : "flex-start",
            display : this.state.selectedButton === "Payment" ? text.Type === "Refund" ? null :'none'  :'none'
          }}>

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :0,
            flexDirection: "column",
            //height : 40,
            alignItems : "center",
          }}>
          <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{Localized.t('InvoiceDetailsPage.CreatedOn')}</Text>
          <Text style =  {{color : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{this.state.CreatedOn}</Text>
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
          <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{Localized.t('InvoiceDetailsPage.PaidOn')}</Text>
          <Text style =  {{color : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{this.state.PaidOn}</Text>
          </View>

          </View>


          <CustomView  style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none',marginLeft : 10,
              marginRight : 10,marginTop : 10 }}>
          <View
          style={{
            marginTop :10,
            height : 50,
            shadowColor: this.state.isHiddenInvoice === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderTopLeftRadius : 10,
            borderTopRightRadius : 10,
            borderBottomLeftRadius : this.state.isHiddenInvoice === false ? 0 :10,
            borderBottomRightRadius : this.state.isHiddenInvoice === false ? 0 :10,
            elevation: 10,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
            alignItems: 'center',
            flexDirection: "row",
            justifyContent: 'space-between',
            borderWidth : isDarkMode ? 1 : 0,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
          }} >
          <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 15,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('InvoiceDetailsPage.InvoiceLink')}</Text>
          <TouchableOpacity
          style={styles.button3}
          onPress={ this.HideInvoiceView}
          >
          <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
          source={this.state.isHiddenInvoice === false ?
          ArrowUP :
          ArrowDown} />
          </TouchableOpacity>

          </View>

          <CustomView hide={this.state.isHiddenInvoice}>
          <View style={{
            marginTop :0,
            marginLeft : 0,
            marginRight : 0,
          //  height : 50,
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
            borderWidth : isDarkMode ? 1 : 0,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
          }} >
           <View
          style={{
            backgroundColor : GLOBAL.COLOR.SHADEGRAY,
            width : '94%',
            height : isDarkMode ? 0 :  2,
            marginLeft : 10,

          }}>
          </View>

          <View style={{
          flexDirection : 'column',justifyContent : 'space-between'
          }} >
           <View style={{
           flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between',marginLeft : 10,marginRight : 10
           }} >
           <Text style = {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 20,fontSize : RFValue(13),fontFamily : 'Prompt-Regular',marginTop : 5,multiline : true,width : '80%'}}>
            {this.state.invoiceLink}
           </Text>

           <TouchableOpacity
           style={styles.button4}
           onPress={() => this.readFromClipboard(this.state.invoiceLink)}>

           <Image
          source={require('../Assest/copy.png')}
           style={styles.ImageIconStyle1}
           />
           </TouchableOpacity>
           </View>

           <View style={{
           flexDirection : 'row',justifyContent : 'space-between',marginLeft : 0,marginBottom : 10
           }} >
           <Text style = {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 20,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 5}}>
            {Localized.t('InvoiceDetailsPage.NumberofInvoiceClicks')}
           </Text>

           <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,marginRight : 20,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 5}}>
            {this.state.clickedCount}
           </Text>

           </View>




           </View>
           </View>
          </CustomView>
          </CustomView>


           <CustomView
           style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none',  marginLeft : 10,
               marginRight : 10,marginTop : 10 }}
           >
           <View
           style={{
             marginTop :10,
             marginLeft :0,
             marginRight : 0,
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
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
             borderWidth : isDarkMode ? 1 : 0 ,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
           <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,marginLeft : 15,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('InvoiceDetailsPage.PaymentDetails')}</Text>
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
             borderWidth : isDarkMode ? 1 : 0,
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
                  backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                  width : '94%',
                  height : 2,
                  marginLeft : 10,
                 display : index == 0 ? isDarkMode ? 'none' : null : 'none'
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

                   <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,
                    fontSize : item.subType == 2 ? RFValue(12)  :RFValue(15),
                    fontFamily : item.subType == 2 ? 'Prompt-Italic' :'Prompt-Medium'}}>
                      {item.subType == 1 ? ( Localized.t('InvoiceDetailsPage.'+ item.name) + "*") : item.subType == 2 ?  ("*" + Localized.t('InvoiceDetailsPage.'+ item.name))  : Localized.t('InvoiceDetailsPage.'+ item.name)}
                   </Text>


                   <View style={{
                   flexDirection : 'row',alignItems :'center'
                   }} >


                    <Text style = {{color: index === this.state.PaymentArray.length-1 ? GLOBAL.COLOR.ORANGE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
                     fontSize : index === this.state.PaymentArray.length-1 ?  RFValue(20) : item.subType == 2 ? RFValue(12)  : RFValue(15),
                     marginLeft : 10,
                     fontFamily : item.subType == 2 ? 'Prompt-Italic'  : 'Prompt-Medium',
                       }}>
                        {index == 0 ? item.name == "CreatedBy" ? item.subname1 :Localized.t('InvoiceDetailsPage.'+ item.subname1) : item.subname1}
                     </Text>
                   </View>


                    </View>


                    <View
                    style={{
                      backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                      marginLeft : 10,
                      marginRight : 10,
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
              padding : 15,
  						alignItems : "flex-start",
  					}}>

  					<View
  					style={{
  						justifyContent: 'space-between',
  						marginTop :0,
  						flexDirection: "column",
  						//height : 40,
  						alignItems : "center",
  					}}>
  					<Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{Localized.t('InvoiceDetailsPage.CreatedOn')}</Text>
  					<Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{this.state.CreatedOn}</Text>
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
  					<Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{Localized.t('InvoiceDetailsPage.PaidOn')}</Text>
  					<Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{this.state.PaidOn}</Text>
  					</View>

  					</View>


          </View>

           </CustomView>
           </CustomView>


           <CustomView
           style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none',  marginLeft : 10,
               marginRight : 10,marginTop : 10 }}
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
             borderTopLeftRadius : 10,
             borderTopRightRadius : 10,
             borderBottomLeftRadius : this.state.isHiddenCommissionDetail === false ? 0 :10,
             borderBottomRightRadius : this.state.isHiddenCommissionDetail === false ? 0 :10,
             elevation: 10,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
             borderWidth : isDarkMode ? 1 : 0,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
           <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 15,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('InvoiceDetailsPage.HesabeCommission')}</Text>
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
             borderWidth : 1,
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
                  width : '94%',
                  height : 2,
                  marginLeft : 10,
                 display : index == 0 ? isDarkMode ? 'none' : null : 'none'
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

                   <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,
                    fontSize : RFValue(15),
                    fontFamily : 'Prompt-Medium'}}>
                      {Localized.t('InvoiceDetailsPage.'+ item.name)}
                   </Text>


                   <View style={{
                   flexDirection : 'row',alignItems :'center'
                   }} >


                    <Text style = {{color: index === this.state.CommisionArray.length-1 ? GLOBAL.COLOR.ORANGE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
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
                      marginLeft : 10,
                      marginRight : 10,
                      height : index == this.state.CommisionArray.length - 1 ? 0 : 2,
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
               marginRight : 10,marginTop : 10 }}
           >
           <View
           style={{
             marginTop :0,
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
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
             borderWidth : isDarkMode ? 1 : 0,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
           <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 15,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('ReportDetailPage.RefundDetails')}</Text>
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
                   marginTop : index == 0 ? 0 :10,
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
                  backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
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

                   <Text style = {{ color: index === 0 ? isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE :GLOBAL.COLOR.DARKGRAY,
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
                     width : '49%'

                   }}>
                   <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{ Localized.t('ReportDetailPage.'+ item.name1) }</Text>
                   <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{ item.subname1}</Text>
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
                     width : '49%'
                   }}>
                   <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{Localized.t('ReportDetailPage.'+item.name2)}</Text>
                   <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{ item.subname2}</Text>
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
                    width : '49%'
                  }}>
                  <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{  Localized.t('ReportDetailPage.'+item.name1)}</Text>
                  <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{item.subname1}</Text>
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
                    width : '49%'
                  }}>
                  <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{ Localized.t('ReportDetailPage.' + item.name2)}</Text>
                  <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{item.subname2}</Text>
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


           <CustomView  style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none', marginLeft : 10,
            marginRight : 10, marginTop : 10}}>
           <View
           style={{
             marginTop :0,
             height : 50,
             shadowColor: this.state.isHiddenDescription === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
             shadowOffset: {
               width: 0,
               height: 7,
             },
             shadowOpacity: 0.1,
             shadowRadius: 9.11,
             borderTopLeftRadius : 10,
             borderTopRightRadius : 10,
             borderBottomLeftRadius : this.state.isHiddenDescription === false ? 0 :10,
             borderBottomRightRadius : this.state.isHiddenDescription === false ? 0 :10,
             elevation: 10,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
             borderWidth : isDarkMode ? 1 : 0,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
           <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 15,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('InvoiceDetailsPage.Description')}</Text>
           <TouchableOpacity
           style={styles.button3}
           onPress={ this.HideDescriptionView}
           >
           <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
           source={this.state.isHiddenDescription === false ?
           ArrowUP :
           ArrowDown} />
           </TouchableOpacity>

           </View>

           <CustomView hide={this.state.isHiddenDescription}>

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
             borderWidth : isDarkMode ? 1: 0,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.WHITE
           }} >
            <View
           style={{
             backgroundColor : GLOBAL.COLOR.SHADEGRAY,
             width : '94%',
             height : isDarkMode ? 0 : 2,
             marginLeft : 10,

           }}>
           </View>
            <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,fontSize : RFValue(13),fontFamily : 'Prompt-Regular',marginTop : 5}}>{this.state.descriptionText}</Text>
            </View>
           </CustomView>
           </CustomView>


           <CustomView  style={{display : this.state.selectedButton === "Payment" ? text.Type === "Success" ? null :'none'  :'none' , marginLeft : 15,
            marginRight : 10,marginTop : 10}}>
           <View
           style={{
             marginTop :10,
             height : 50,
             shadowColor:  this.state.isHiddenProduct === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
             shadowOffset: {
               width: 0,
               height: 7,
             },
             shadowOpacity: 0.1,
             shadowRadius: 9.11,
             borderTopLeftRadius : 10,
             borderTopRightRadius : 10,
             borderBottomLeftRadius : this.state.isHiddenProduct === false ? 0 :10,
             borderBottomRightRadius : this.state.isHiddenProduct === false ? 0 :10,
             elevation: 10,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
             borderWidth : isDarkMode ? 1 : 0 ,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
           <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 10,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('InvoiceDetailsPage.Product')}</Text>
           <TouchableOpacity
           style={styles.button3}
           onPress={ this.HideProductView }
           >
           <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
           source={this.state.isHiddenProduct === false ?
           ArrowUP :
           ArrowDown} />
           </TouchableOpacity>

           </View>

           <CustomView hide={this.state.isHiddenProduct}>

           <View
          style={{
            backgroundColor : GLOBAL.COLOR.SHADEGRAY,
            width : '94%',
            height : isDarkMode ? 0 : 2,
            marginLeft : 10,

          }}>
          </View>

          <View style={{
          flexDirection : 'row',alignItems :'center',marginLeft : 5,marginTop : 10,justifyContent : 'center',display : this.state.ProductArray.length == 0 ? null : 'none',
          color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.BLACK
          }} >
           <Text>
              {Localized.t("InvoiceDetailsPage.NoProductsAvailable")}
           </Text>
         </View>

           <View style={{
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
             borderBottomLeftRadius :10,
             borderBottomRightRadius :10,
             elevation: 10,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
           }} >
             {
               this.state.ProductArray.map((item, index) => (

                 <View style={{
                flexDirection :'column',
               // justifyContent : 'space-between'
                 }} >

                 <View style={{
                 flexDirection : 'row',alignItems :'center',marginLeft : 5,marginTop : 10
                 }} >
                 <Image
                 source={require('../Assest/rectangle.png')}
                 style={styles.ImageIconStyle}
                 />
                  <Text style = {styles.ProductTextStyle}>
                     { "  " + item.name}
                  </Text>
                </View>


                 <Text style = {{color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
                  fontSize :RFValue(15),
                  marginLeft : 30,
                  marginTop : 10,
                  fontFamily : 'Prompt-SemiBold',
                    }}>
                     {item.subname1}
                  </Text>

                  <View
                 style={{
                   backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                   width : '94%',
                   height : 2,
                   marginLeft : 10,
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
                    fontSize : RFValue(15),
                    fontFamily : 'Prompt-Regular'}}>
                     {Localized.t('ReportDetailPage.Total')}
                   </Text>

                   <Text style = {{ color: GLOBAL.COLOR.ORANGE,
                    fontSize : RFValue(17),
                    fontFamily : 'Prompt-Regular'}}>
                     {item.totalvalue}
                   </Text>

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

           </CustomView>
           </CustomView>


           <CustomView
           style={{display : text.subType == '4' ?  this.state.selectedButton === "Payment" ?  text.Type === "Success" ? null :'none'  :'none' : 'none',  marginLeft : 10,
               marginRight : 10,marginTop : 10 }}
           >
           <View
           style={{
             marginTop :10,
             marginLeft :0,
             marginRight : 0,
             height : 50,
             shadowColor: this.state.isHiddenAddressDetail === false ? "transparent" : GLOBAL.COLOR.LIGHTBLUE,
             shadowOffset: {
               width: 0,
               height: 7,
             },
             shadowOpacity: 0.1,
             shadowRadius: 9.11,
             borderTopLeftRadius : 10,
             borderTopRightRadius : 10,
             borderBottomLeftRadius : this.state.isHiddenAddressDetail === false ? 0 :10,
             borderBottomRightRadius : this.state.isHiddenAddressDetail === false ? 0 :10,
             elevation: 10,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
             borderWidth : isDarkMode ? 1 : 0,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
           <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 15,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('AddressDetailsPage.Address')}</Text>
           <TouchableOpacity
           style={styles.button3}
           onPress={ this.HideAddressView }
           >
           <Image style={[styles.icon3,{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}
           source={this.state.isHiddenAddressDetail === false ?
           ArrowUP :
           ArrowDown} />
           </TouchableOpacity>

           </View>

           <CustomView hide={this.state.isHiddenAddressDetail}>
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
             borderWidth : 1,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
           }} >
             {
               this.state.AddressArray.map((item, index) => (
                 <View style={{
                flexDirection :'column',
               // justifyContent : 'space-between'
                 }} >

                 <View
                style={{
                  backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                  width : '94%',
                  height : 2,
                  marginLeft : 10,
                 display : index == 0 ? isDarkMode ? 'none' : null : 'none'
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

                   <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,
                    fontSize : RFValue(15),
                    fontFamily : 'Prompt-Medium'}}>
                      {Localized.t('AddressDetailsPage.'+ item.name)}
                   </Text>


                   <View style={{
                   flexDirection : 'row',alignItems :'center'
                   }} >


                    <Text style = {{color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
                     fontSize : RFValue(15),
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
                      marginLeft : 10,
                      marginRight : 10,
                      height : index == this.state.AddressArray.length - 1 ? 0 : 2,
                    }}>
                    </View>
                    </View>
               ))
            }


          </View>

           </CustomView>
           </CustomView>


           <View style={{
             alignItems : 'flex-end',
             marginTop : 50,
             padding : 10,
             display :  text.Type === "Refund" ||text.Type === "Failed" || this.state.invoiceStatus == 0 ||  this.state.invoiceStatus == 3 ? 'none' : null
             }}>
           <CustomButton title= {Localized.t('PGDetailsPage.Refund')} style = {{fontSize : RFValue(20)}}
           onPress={() => {
                 this.setState({
                   refunModalView: true,
                 });
               }}
           />

          </View>

          <View style={{
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'space-evenly',
            marginTop : 50,
            padding  :10,
            display : this.state.invoiceStatus == 0 ? null : 'none'
            }}>


            <View style = {{width : 175,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,padding : 2,borderRadius: 25,height : 55}}>

            <CustomButton title= {Localized.t('InvoiceDetailsPage.ResendInvoice')}
              onPress={() => {this.toggleResendModal(true)}}
              style = {{width : 170,fontSize : RFValue(20)}}
            />

           </View>

           <View style = {{width : 175,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,padding : 2,borderRadius: 25,height : 55}}>

           <CustomButton title= {Localized.t('InvoiceDetailsPage.CancelInvoice')}
             onPress={() => {this.CancelInvoice()}}
             style = {{width : 170,fontSize : RFValue(20)}}
           />

          </View>


         </View>

           </View>

       </View>
        </ScrollView>
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
        style={{flexDirection : 'column',justifyContent : 'space-between',alignItems : 'center',width : '80%'}}
        >
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize : RFValue(22),fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{Localized.t('InvoiceDetailsPage.Refund')}</Text>
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,alignItems : 'center',fontSize : RFValue(17),fontFamily : 'Prompt-Regular',textAlign : 'center'}}>{Localized.t('InvoiceDetailsPage.PleaseChooseRefundType')}</Text>
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
        marginTop :20,
        width : '100%',
        //flexDirection: "column",
      //  backgroundColor : 'black'
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
        displayAlert={this.state.showAlert}
        displayAlertIcon={false}
        alertTitleText={Localized.t('TextValidationPage.Message')}
        alertMessageText={this.state.showAlertMessage}
        displayPositiveButton={true}
        positiveButtonText={Localized.t('TextValidationPage.Ok')}
        displayNegativeButton={false}
        onPressPositiveButton={this.onPressAlertPositiveButton}
      />



    <ShareModal.BottomModal
   visible={this.state.shareModalView}
   //visible = {this.state.modalVisible}
   onTouchOutside={() => this.setState({ shareModalView: false })}
   height={ this.state.invoiceStatus == 0 ? (200/screenheight) : (200/screenheight)}
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
     <Text style = {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(22),fontFamily : 'Prompt-Medium'}}>{ this.state.invoiceStatus == 0 ? Localized.t('InvoiceDetailsPage.InvoiceAction') : Localized.t('InvoiceDetailsPage.ShareInvoice')}</Text>
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
    backgroundColor : GLOBAL.COLOR.LIGHTPURPLE,
    display :  this.state.invoiceStatus == 0 ? null : 'none'
  }} >

  <TouchableOpacity
    onPress={() => {this.toggleResendModal(true)}}
  >
  <IonicIcons name="refresh" color='#867EBD'  size={20} style = {styles.icon} />
  <Text style =  {styles.btnText}>{Localized.t('InvoiceDetailsPage.ResendInvoice')}</Text>
  </TouchableOpacity>
  </View>*/}

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
   backgroundColor : GLOBAL.COLOR.LIGHTPURPLE,
   display : this.state.invoiceStatus == 0 ? null : 'none'
 }} >

 <TouchableOpacity
  onPress={() => {this.setState({ shareModalView: false }),this.CancelInvoice()}}
 >
 <IonicIcons name="close-circle-sharp" color='#867EBD'  size={20} style = {styles.icon} />
 <Text style =  {styles.btnText}>{Localized.t('InvoiceDetailsPage.CancelInvoice')}</Text>
 </TouchableOpacity>
 </View>*/}


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


 <ResendModal.BottomModal
  visible={this.state.resendModalView}
  onTouchOutside={() => this.setState({ resendModalView: false })}
  height={0.5}
  width={1}
  onSwipeOut={() => this.setState({ resendModalView: false })}
  modalTitle={

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
    style = {{shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 1,
        shadowRadius: 9.11,
        borderRadius : 20,
        elevation: 14}}
    onPress={() => {
      this.toggleResendModal(!this.state.resendModalView)}}>
    <Image  style = {{borderRadius : 15}} source= { global.selectValue == 'en' ? require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
    </TouchableOpacity>
    </View>

    <View
    style={{flexDirection : 'column',justifyContent : 'center',alignItems : 'center',width : '60%'}}
    >
    <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize : RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoicePreviewPage.ResendDetail')}</Text>
    </View>
    <Text style = {{width : '20%'}}></Text>
     </View>

  }
>
  <ModalContent
    style={{
      flex: 1,
      backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
    }}
  >

  <Form
        ref="form"
        onSubmit={this.resendSubmit}
   >
  <View
  style={{
    justifyContent: 'space-between',
    marginTop :10,
    flexDirection: "column",
    zIndex: 99999,
  }}>

  <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.MobileNumber')}</Text>


  <View style={{
    marginTop :10,
    marginLeft : 10,
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
    backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
    borderWidth : isDarkMode ? 1 : 0 ,
    borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
    alignItems: 'center',
    flexDirection: "row",
  }} >



  <DropDownPicker
  style={{zIndex: 50}}
  items={this.state.countryList}
  defaultValue={this.state.countryCode}
 //inputContainerStyle={{ borderWidth: 1, borderColor: GLOBAL.COLOR.WHITE}}
 underlineColor= 'transparent'

 dropDownStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,width : 100}}
 containerStyle={{height: isDarkMode ? 40 : 50,marginTop : 0,width : 100,marginLeft : 5}}
 arrowColor={ isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
 arrowStyle = {{height : 20,width : 20,alignItems : 'center'}}
 arrowSize = {20}

  style={{borderColor:"transparent",backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE}}
  itemStyle={{
  justifyContent: 'center',
}}

 labelStyle={{
 color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',
}}

onChangeItem={item =>

  this.setState({

   countryCode: item.value,
 })}
 dropDownMaxHeight={100}
/>


<View
style={{
  backgroundColor : GLOBAL.COLOR.SHADEGRAY,
  width : 2,
  height : '100%',
}}>
</View>


<TextValidator
         style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 20,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize : RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
         name="mobileNumber"
         label="mobileNumber"
         validators={['matchRegexp:^[1-9][0-9]{7,15}$']}
         errorMessages={[Localized.t('TextValidationPage.Entervalidmobilenumber')]}
         errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
         placeholder={Localized.t('OpenInvoicePage.MobileNumber')}
         placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
         type="MobileNumber"
         keyboardType="numeric"
         value={this.state.mobileNumber}
        maxLength={15}
         onChangeText={this.handleChange('mobileNumber')}
          // ref={(r) => this.secondTextInput = r}

 />
</View>

  <View style={{
    alignItems : 'flex-end',
    marginTop : 50,
    padding : 10,
    }}>

  <CustomButton title= {Localized.t('InvoiceDetailsPage.Confirm')} style = {{fontSize : RFValue(20)}}
  onPress={() => {
        this.setState({
          resendModalView: false,
        });
        this.resendFormSubmit()

      }}
  />
 </View>
  </View>
  </Form>
  </ModalContent>
</ResendModal.BottomModal>

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
  <IllustratorScreen example = {{'index' : this.state.illustratorType == 1 ? 6 : this.state.illustratorType == 2 ? 7 : 9 ,'value' : ''}} isDarkMode = {isDarkMode}  onOKClick={this.illustratorReceiveData}/>
 </ModalContent>
</IllustratorModals.BottomModal>
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
ImageIconStyle1: {
 marginTop : 10,
 marginRight :10,
 tintColor : GLOBAL.COLOR.DARKGRAY,
},

 });
