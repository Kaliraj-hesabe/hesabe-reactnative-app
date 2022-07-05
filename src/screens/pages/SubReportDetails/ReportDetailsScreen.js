
import React, {Component} from 'react';
import rectImg from '../Assest/rectangle.png';
import grayrectImg from '../Assest/calender.png';
import ArrowUP from '../Assest/arrowUp.png';
import ArrowDown from '../Assest/dropArrow.png';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Clipboard,TextInput,Share,Keyboard} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomView from '../../../components/CustomView';
import Localized from '../../../locales'
import { CustomButton } from '../../../components/CustomButton.js';
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
import CaptureModal, {
} from 'react-native-modals';
import IllustratorModals, {} from 'react-native-modals';
import IllustratorScreen  from '../../../components/IllustratorScreen.js';

import API from '../../../utils/API';
const GLOBAL = require('../../../utils/Globals');
import { format,parseISO } from 'date-fns';
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import {Form,TextValidator}  from '../../../customTextField';
import { ListItem, SearchBar } from 'react-native-elements';
import CustomAlertComponent from '../../../components/CustomAlertComponent';
import { decimalthreeDigit} from '../../../utils/GlobalFunction';
import {currencyFormat,paymentTypeID,serviceTypeID,paymentDisplayTypeID,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters} from '../../../utils/GlobalFunction';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';


//import Modal from 'react-native-modal';



export default class ReportDetailsScreen extends Component {
  constructor(props){
    super(props);
     this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
     this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
     this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
      this.arrayholder = [];
    this.state = {
    	selectedButton: 'Payment',
      shareModalView: false,
      refunModalView: false,
      captureModalView: false,
      CreatedOn : '',
      PaidOn : '',
      RequestedOn : '',
      RefundedOn : '',
      ApprovedOn : '',
      ApprovedBy : '',
      TransactionOn : '',
      TransferredOn : '',
      shareImage : '',
      Refundamount : '',
      RefundTotalamount : '0.000',
      Captureamount : '',
      CaptureTotalamount : '0.000',
      PendingAuthorizedAmount : '0.000',
      CaptureCheckID : global.captureType == 1 ? 2 :1,
      token : '',
      illustratorVisible: false,
      illustratorRefNo :'',
      illustratorValue :'',
      illustratorIndex :0,
      referenceNo :'',
      Remark : '',
      PaymentTransferArray :[],
      PaymentTransferAmount : '',
      PaymentTransferCommission : '',
      PaymentTransferAdmin : '',
      PaymentStatus : '',
      showRefundAlert : false,
      showRefundAlertMessage : '',
      showCancelAlert : false,
      serviceType : '',
      PgDetailsArray: [
      {
        PaymentSuccess :
          this.props.route.params.ReportType == "CaptureRequests" ? [ {id: 0,name: 'PaymentListDetails',subname1: '',Imge : 1},
            {id: 1,name: 'ServiceType',subname1: '',Imge : 2},
            {id: 2,name: 'PaymentType',subname1: '',Imge : 2},
            {id: 3,name: 'AuthorizedOn',subname1: '',Imge : 2},
            {id: 4,name: 'TransactionAmount',subname1: '',Imge : 2}]
            :  [
          {id: 0,name: 'PaymentListDetails',subname1: '',Imge : 1},
          {id: 1,name: 'ServiceType',subname1: '',Imge : 2},
          {id: 2,name: 'PaymentType',subname1: '',Imge : 2},
          {id: 3,name: 'InvoiceAmount',subname1: '',Imge : 2},
          {id: 4,name: 'AdminCharge',subname1: '',Imge : 2},
          {id: 5,name: 'Commission',subname1: '',Imge : 2},
          {id: 6,name: 'NetAmount',subname1: '',Imge : 2},
        ],

        PaymentFailed :
        [
          {id: 0,name: 'PaymentListDetails',subname1: 'Failed',Imge : 1},
          {id: 1,name: 'InvoiceAmount',subname1: '',Imge : 2},
          {id: 2,name: 'AdminCharge',subname1: '',Imge : 2},
          {id: 3,name: 'UnpaidAmount',subname1: '',Imge : 2},
          {id: 4,name: 'CreatedOn',subname1: '',Imge : 2},
        ],
        RefundPending :
        [
          {id: 0,name: 'RefundRequest',subname1: '',Imge : 1},
          {id: 1,name: 'ServiceType',subname1: '',Imge : 2},
          {id: 2,name: 'PaymentType',subname1: '',Imge : 2},

          {id: 3,name: 'RefundAmount',subname1: '',Imge : 2},
          {id: 4,name: 'RefundCharge',subname1: '',Imge : 2},
          {id: 5,name: 'Transferred',subname1: '',Imge : 2},
          {id: 6,name: 'TransactionAmount',subname1: '',Imge : 2},
          {id: 7,name: 'RequestedOn',subname1: '',Imge : 2},
        ],

        RefundComplete :
        [
          {id: 0,name: 'RefundRequest',subname1: '',Imge : 1},
          {id: 1,name: 'ServiceType',subname1: '',Imge : 2},
          {id: 2,name: 'PaymentType',subname1: '',Imge : 2},
          {id: 3,name: 'TransactionAmount',subname1: '',Imge : 2},
          {id: 4,name: 'RefundAmount',subname1: '',Imge : 2},
          {id: 5,name: 'RefundCharge',subname1: '',Imge : 2},
          {id: 6,name: 'Transferred',subname1: '',Imge : 2},
          {id: 7,name: 'Balance',subname1: '',Imge : 2},
        ],

        PaymentFinance :
          [
            {id: 0,name:'PaymentListDetails',subname1: '',Imge : 2},
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




      RefundTypeArray: [
      {id: 1, value: "PartialRefund", isChecked: true},
       {id: 2, value: "FullRefund", isChecked: false},
     ],


     CaptureTypeArray:   global.captureType == 1 ? [
      {id: 2, value:  "FullCapture", isChecked: true},
     ]  : [
     {id: 1, value:  "PartialCapture", isChecked: true},
      {id: 2, value:  "FullCapture", isChecked: false},
     ]
    };

    this.gettransactionReportDetail(this.props.route.params.something.id,this.props.route.params.ReportType)
  }


  static contextType = DarkModeContext;

  gettransactionReportDetail(transactionID,ApiString) {

    var ServiceType;
  (function (ServiceType) {
    ServiceType[ServiceType["SMS Invoice"] = 2] = "SMS Invoice";
    ServiceType[ServiceType["Payment Gateway"] = 3] = "Payment Gateway";
    ServiceType[ServiceType["Prepaid"] = 4] = "Prepaid";
    ServiceType[ServiceType["POS Terminal"] = 6] = "POS Terminal";
    ServiceType[ServiceType["Open Invoice"] = 7] = "Open Invoice";
  })(ServiceType|| (ServiceType= {}));


  var PaymentType;
  (function (PaymentType) {
  PaymentType[PaymentType["KNET"] = 1] = "KNET";
  PaymentType[PaymentType["MPGS"] = 2] = "MPGS";
  })(PaymentType|| (PaymentType= {}));

  var self = this;
  var url =   ApiString === 'PaymentList' || ApiString === 'CaptureRequests' ? GLOBAL.API_STRING.PAYMENTLIST : ApiString === 'RefundRequest' ? GLOBAL.API_STRING.REFUNDS  : GLOBAL.API_STRING.PAYMENTTRANSFER

  API.get(url + '/' + transactionID,{
      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


    }).then(function (response) {

      const json = JSON.parse(response)
       console.log(json.response.Data);

       let newArray = [...self.state.PgDetailsArray]
       if(self.props.route.params.Type == 'Failed')
       {
         let invoiceAmt = json.response.service_type.id == 2 ? currencyFormat(Number(json.response.invoice.amount)) : currencyFormat(Number(json.response.amount - json.response.admin_charge));

        newArray[0].PaymentFailed[1].subname1 = GLOBAL.CURRENCY + ' ' + invoiceAmt;
        newArray[0].PaymentFailed[2].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.admin_charge));
        newArray[0].PaymentFailed[3].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.amount));
        newArray[0].PaymentFailed[4].subname1 = format(parseISO(json.response.created_at), 'dd/MMM/yy, hh:mm a');

        newArray[0].PaymentFinance[0].name =  ApiString === 'PaymentList' ? 'PaymentListDetails' : ApiString === 'RefundRequest' ? 'RefundRequestDetails'  : ApiString === 'PaymentTransferDetails' ? 'PaymentTransferDetails' : 'CaptureRequestDetails'

        newArray[0].PaymentFinance[1].subname1 = json.response.token;
        newArray[0].PaymentFinance[2].subname1 = json.response.transaction_payment_id;
        //newArray[0].PaymentFinance[2].name = json.response.payment_type_id == 2 ?  'MpgsReferenceID':  'KnetReferenceID';
        newArray[0].PaymentFinance[2].name = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(json.response.payment_type.display_name)) + 'ReferenceID';
        newArray[0].PaymentFinance[3].subname1 = json.response.auth;
        newArray[0].PaymentFinance[4].subname1 = json.response.transaction_reference_number;
        newArray[0].PaymentFinance[5].subname1 = json.response.transaction_id;
        newArray[0].PaymentFinance[6].subname1 = json.response.payment_card_detail != null ? json.response.payment_card_detail.card_number : '';;
        newArray[0].PaymentFinance[7].subname1 = json.response.reconciliation != null ? json.response.reconciliation.reconciled_at  : '';
        newArray[0].PaymentFinance[8].subname1 = json.response.reconciliation != null ? json.response.reconciliation.document_number  : '';
        newArray[0].PaymentFinance[9].subname1 = ApiString === 'PaymentList' ? '' : json.response.updated_at;
        newArray[0].PaymentFinance[10].subname1 = json.response.payment_transfer_document_number;

        self.setState({

         array: newArray,
       })


      }
      else if (self.props.route.params.Type == 'Success')
      {

         if(self.props.route.params.ReportType == "PaymentTransfer")
         {
            var amount = 0
            var commission = 0
            var admincharge = 0
           for(let i = 0; i < json.response.transactions.length; i++)
           {
              amount += json.response.transactions[i].amount
              commission += json.response.transactions[i].commission
              admincharge += json.response.transactions[i].admin_charge
           }


           self.setState
               ({
              PaymentTransferArray: json.response.transactions,
              PaymentTransferAmount : amount,
              PaymentTransferAdmin : admincharge,
              PaymentTransferCommission : commission,
             })

          newArray[0].PaymentFinance[0].name =  ApiString === 'PaymentList' ? 'PaymentListDetails' : ApiString === 'RefundRequest' ? 'RefundRequestDetails'  : ApiString === 'PaymentTransferDetails' ? 'PaymentTransferDetails' : 'CaptureRequestDetails'
           newArray[0].PaymentFinance[1].subname1 = json.response.token;
           newArray[0].PaymentFinance[2].subname1 = json.response.transaction_payment_id;
           newArray[0].PaymentFinance[2].name = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(json.response.payment_type.display_name)) + 'ReferenceID';
           newArray[0].PaymentFinance[3].subname1 = json.response.auth;
           newArray[0].PaymentFinance[4].subname1 = json.response.transaction_reference_number;
           newArray[0].PaymentFinance[5].subname1 = json.response.transaction_id;
           newArray[0].PaymentFinance[6].subname1 = json.response.payment_card_detail != null ? json.response.payment_card_detail.card_number : '';;
           newArray[0].PaymentFinance[7].subname1 = json.response.reconciliation != null ? json.response.reconciliation.reconciled_at  : '';
           newArray[0].PaymentFinance[8].subname1 = json.response.reconciliation != null ? json.response.reconciliation.document_number  : '';
           newArray[0].PaymentFinance[9].subname1 = json.response.updated_at;
           newArray[0].PaymentFinance[10].subname1 = json.response.payment_transfer_document_number;



           self.setState({

            array: newArray,
          })

         }
         else {


        let invoiceAmt = json.response.service_type.id == 2 ? currencyFormat(Number(json.response.invoice.amount)) : currencyFormat(Number(json.response.amount - json.response.admin_charge));
        if(ApiString === 'CaptureRequests')
        {
          newArray[0].PaymentSuccess[0].subname1 =  json.response.payment_status == 2 ? "Refund" :  json.response.payment_status == 1 ? "Success" : json.response.payment_status == 4 ? "Authorized" : json.response.payment_status == 5 ? "Cancelled" : "Failed"
          newArray[0].PaymentSuccess[0].name =  ApiString === 'PaymentList' ? 'PaymentListDetails' : ApiString === 'RefundRequest' ? 'RefundRequestDetails' : ApiString === 'PaymentTransferDetails' ? 'PaymentTransferDetails' : 'CaptureRequestDetails'
          newArray[0].PaymentSuccess[1].subname1 =  Localized.t("CommanTabPage." +json.response.service_type.name);
          newArray[0].PaymentSuccess[2].subname1 =  json.response.payment_type.display_name;
          newArray[0].PaymentSuccess[3].subname1 = format(parseISO(json.response.created_at), 'dd/MMM/yy, hh:mm a') ;
          newArray[0].PaymentSuccess[4].subname1 = GLOBAL.CURRENCY + ' ' + json.response.amount ;

        }
        else {


        newArray[0].PaymentSuccess[0].subname1 =  json.response.payment_status == 2 ? "Refund" :  json.response.payment_status == 1 ? "Success" : json.response.payment_status == 4 ? "Authorized" : json.response.payment_status == 5 ? "Cancelled" : "Failed"
        newArray[0].PaymentSuccess[0].name =  ApiString === 'PaymentList' ? 'PaymentListDetails' : ApiString === 'RefundRequest' ? 'RefundRequestDetails' : ApiString === 'PaymentTransferDetails' ? 'PaymentTransferDetails' : 'CaptureRequestDetails'
        newArray[0].PaymentSuccess[1].subname1 =  Localized.t("CommanTabPage." +json.response.service_type.name);
        newArray[0].PaymentSuccess[2].subname1 =  json.response.payment_type.display_name;
        newArray[0].PaymentSuccess[3].subname1 = GLOBAL.CURRENCY + ' ' + invoiceAmt ;
        newArray[0].PaymentSuccess[4].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.admin_charge));
        newArray[0].PaymentSuccess[5].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.commission));
        newArray[0].PaymentSuccess[6].subname1 = GLOBAL.CURRENCY + ' ' + (json.response.payment_status == 4 || json.response.payment_status == 5 ? currencyFormat(Number(json.response.amount))  : currencyFormat(Number((invoiceAmt - json.response.commission) + json.response.admin_charge)) );

         if(json.response.payment_status == 4 || json.response.payment_status == 5 )
         {
         newArray[0].PaymentSuccess[6].name = "TotalPaid"
         newArray[0].PaymentSuccess.splice(5, 1);

         }
      }

        newArray[0].PaymentFinance[0].name =  ApiString === 'PaymentList' ? 'PaymentListDetails' : ApiString === 'RefundRequest' ? 'RefundRequestDetails' : ApiString === 'PaymentTransferDetails' ? 'PaymentTransferDetails' : 'CaptureRequestDetails'
        newArray[0].PaymentFinance[1].subname1 = json.response.token;
        newArray[0].PaymentFinance[2].subname1 = json.response.transaction_payment_id;
        newArray[0].PaymentFinance[2].name =  upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(json.response.payment_type.display_name)) + 'ReferenceID';
        newArray[0].PaymentFinance[3].subname1 = json.response.auth;
        newArray[0].PaymentFinance[4].subname1 = json.response.transaction_reference_number;
        newArray[0].PaymentFinance[5].subname1 = json.response.transaction_id;
        newArray[0].PaymentFinance[6].subname1 = json.response.payment_card_detail != null ? json.response.payment_card_detail.card_number : '';;
        newArray[0].PaymentFinance[7].subname1 = json.response.reconciliation != null ? json.response.reconciliation.reconciled_at  : '';
        newArray[0].PaymentFinance[8].subname1 = json.response.reconciliation != null ? json.response.reconciliation.document_number  : '';
        newArray[0].PaymentFinance[9].subname1 = json.response.payment_transfer_status == 0 ? "" :json.response.updated_at;
        newArray[0].PaymentFinance[10].subname1 = json.response.payment_transfer_document_number;



        self.setState({

         array: newArray,
         TransactionOn :   format(parseISO(json.response.created_at), 'dd/MMM/yy, hh:mm a'),
         TransferredOn :  json.response.payment_transfer_status == 0 ? '' :format(parseISO(json.response.updated_at), 'dd/MMM/yy, hh:mm a'),
         RefundTotalamount : json.response.amount,
         CaptureTotalamount : json.response.amount,
         PendingAuthorizedAmount : json.response.pending_auth_amount,
         token : json.response.token,
         referenceNo : json.response.order_reference_number,
         serviceType : json.response.service_type.id,
         PaymentStatus : json.response.payment_status,
         illustratorValue : json.response.order_reference_number.length != 0 ? json.response.order_reference_number : '',
         illustratorRefNo : json.response.transaction_payment_id

        })

        }

      }
      else if (self.props.route.params.Type == 'RefundPending')
      {
        newArray[0].RefundPending[0].subname1 =  json.response.status == 0 ? 'Pending' : json.response.status == 1 ? 'Approved' : 'Rejected' ,
        //newArray[0].RefundPending[0].Imge =  json.response.status == 0 ? 4 : json.response.status == 1 ? 1 : 2
        newArray[0].RefundPending[1].subname1 =  serviceTypeID(json.response.transaction.service_id);
        newArray[0].RefundPending[2].subname1 = json.response.transaction.display_name;
        newArray[0].RefundPending[3].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.amount));
        newArray[0].RefundPending[4].subname1 = GLOBAL.CURRENCY + ' ' + "0.000"////json.response.transaction.admin_charge;
        newArray[0].RefundPending[5].subname1 = json.response.document_number != null ? json.response.document_number.length == 0 ? 'No' : 'Yes' : '' ;
        newArray[0].RefundPending[6].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.amount));
        newArray[0].RefundPending[7].subname1 = format(parseISO(json.response.created_at), 'dd/MMM/yy, hh:mm a');


        newArray[0].PaymentFinance[0].name =  ApiString === 'PaymentList' ? 'PaymentListDetails' : ApiString === 'RefundRequest' ? 'RefundRequestDetails' :  ApiString === 'PaymentTransferDetails' ? 'PaymentTransferDetails' : 'CaptureRequestDetails'
        newArray[0].PaymentFinance[1].subname1 = json.response.transaction.token;
        newArray[0].PaymentFinance[2].subname1 = json.response.transaction.transaction_payment_id;
        newArray[0].PaymentFinance[2].name = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(json.response.transaction.display_name)) + 'ReferenceID';
        newArray[0].PaymentFinance[3].subname1 = json.response.transaction.auth;
        newArray[0].PaymentFinance[4].subname1 = json.response.transaction.transaction_reference_number;
        newArray[0].PaymentFinance[5].subname1 = json.response.transaction.transaction_id;
        newArray[0].PaymentFinance[6].subname1 = json.response.payment_card_detail != null ? json.response.payment_card_detail.card_number : '';
        newArray[0].PaymentFinance[7].subname1 = json.response.transaction.reconciliation != null ? json.response.transaction.reconciliation.reconciled_at  : '';
        newArray[0].PaymentFinance[8].subname1 = json.response.transaction.reconciliation != null ? json.response.transaction.reconciliation.document_number  : '';
        newArray[0].PaymentFinance[9].subname1 = json.response.transaction.payment_transfer != null ? json.response.transaction.payment_transfer.transferred_at  : '';
        newArray[0].PaymentFinance[10].subname1 = json.response.transaction.payment_transfer_document_number;


        self.setState({

         array: newArray,
         referenceNo : json.response.document_number,

        })

      }
      else
      {
        newArray[0].RefundComplete[0].subname1 =  json.response.status == 0 ? 'Pending' : json.response.status == 1 ? 'Approved' : 'Rejected' ,
        newArray[0].RefundComplete[0].Imge =  json.response.status == 0 ? 4 : json.response.status == 1 ? 1 : 2
        newArray[0].RefundComplete[1].subname1 = Localized.t("CommanTabPage." + serviceTypeID(json.response.transaction.service_id));
        newArray[0].RefundComplete[2].subname1 =  json.response.transaction.display_name;
        newArray[0].RefundComplete[3].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction.amount));
        newArray[0].RefundComplete[4].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.total_refunded_amount));
        newArray[0].RefundComplete[5].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(0));
        newArray[0].RefundComplete[6].subname1 = json.response.document_number != null ? 'Yes' : 'No' ;
        newArray[0].RefundComplete[7].subname1 = GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.total_balance_amount));

        newArray[0].PaymentFinance[0].name =  ApiString === 'PaymentList' ? 'PaymentListDetails' : ApiString === 'RefundRequest' ? 'RefundRequestDetails'  : ApiString === 'PaymentTransferDetails' ? 'PaymentTransferDetails' : 'CaptureRequestDetails'
        newArray[0].PaymentFinance[1].subname1 = json.response.transaction.token;
        newArray[0].PaymentFinance[2].subname1 = json.response.transaction.transaction_payment_id;
        newArray[0].PaymentFinance[2].name = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(json.response.transaction.display_name)) + 'ReferenceID';
        newArray[0].PaymentFinance[3].subname1 = json.response.transaction.auth;
        newArray[0].PaymentFinance[4].subname1 = json.response.transaction.transaction_reference_number;
        newArray[0].PaymentFinance[5].subname1 = json.response.transaction.transaction_id;
        newArray[0].PaymentFinance[6].subname1 = json.response.payment_card_detail != null ? json.response.payment_card_detail.card_number : '';
        newArray[0].PaymentFinance[7].subname1 = json.response.transaction.reconciliation != null ? json.response.transaction.reconciliation.reconciled_at  : '';
        newArray[0].PaymentFinance[8].subname1 = json.response.transaction.reconciliation != null ? json.response.transaction.reconciliation.document_number  : '';
        newArray[0].PaymentFinance[9].subname1 = json.response.transaction.payment_transfer != null ? json.response.transaction.payment_transfer.transferred_at  : '';
        newArray[0].PaymentFinance[10].subname1 = json.response.transaction.payment_transfer_document_number;


        self.setState({

         array: newArray,
         RequestedOn :   format(parseISO(json.response.created_at), 'dd/MMM/yy, hh:mm a'),
         RefundedOn :  json.response.refund_at != null ? format(parseISO(json.response.refund_at), 'dd/MMM/yy, hh:mm a') : '',
         ApprovedBy : json.response.approved_by,
        ApprovedOn : json.response.refund_at != null ? format(parseISO(json.response.refund_at), 'dd/MMM/yy, hh:mm a') : '',
         referenceNo : json.response.document_number,
         Remark : json.response.remarks != null ? json.response.remarks  : ''

        })

      }


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

    toggleShareModal(visible) {
      this.setState({ shareModalView: visible });

    }

    illustratorReceiveData(searchValue)
     {

      this.toggleillustratorPress(false)
      this.setState({ refunModalView: false,captureModalView : false });
      this.gettransactionReportDetail(this.props.route.params.something.id,this.props.route.params.ReportType)
      if(this.props.route.params.ReportType == "CaptureRequests" )
      {
        const { navigation, route } = this.props;
        route.params.onSelectReport("CaptureRequests");
        this.props.navigation.navigate(this.props.route.params.fromView)
      }
        //this.setState({filterType: filterValue});
     }

      toggleillustratorPress(visible) {
      this.setState({ illustratorVisible: visible });

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

    toggleCaptureModal(visible) {
      this.setState({ captureModalView: visible });
    }

    handleCaptureChange(name) {
      return (text) => {
        if(name == 'Captureamount')
        {
          if(Number(text) > Number(this.state.CaptureTotalamount) ? false : true )
          {
          this.setState({[name]:decimalthreeDigit(text) })
           }

           if(Number(text) > Number(this.state.CaptureTotalamount) ?   this.setState({ showRefundAlert: true,showRefundAlertMessage : Localized.t('ReportDetailPage.CaptureamountisgreaterthantheAuthorizedamount')}) : true )
           {

            }
        }else {

          this.setState({[name]:text })
        }

        }
   }



    CheckCaptureElement(event){

      let capturetypearray = this.state.CaptureTypeArray
      var capture_id ;
      capturetypearray.forEach(fruite => {
         if (fruite.value === event.value)
          {
            if(global.captureType != 1)
            {
            fruite.isChecked =  !event.isChecked
            }
            capture_id = event.id
          }
          else {

            fruite.isChecked =  false
          }
      })
      this.setState({CaptureTypeArray: capturetypearray,CaptureCheckID : capture_id})

    }





    renderHeader = () => {
        const isDarkMode = this.context === 'dark';
      return (
        <View>
        <SearchBar
          lightTheme

          //backgroundColor = GLOBAL.COLOR.SHADEGRAY

          placeholder={Localized.t('DashboardPage.Search')}
          placeholderTextColor= {isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY}
          //platform={Platform.OS}
          containerStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
          inputContainerStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.LIGHTGRAY,borderWidth : 1,borderColor : 'white',borderRadius :15}}
          platform={Platform.OS}
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
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
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,
          borderWidth : isDarkMode ? 1 :0,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.WHITE,
          justifyContent: 'space-between',
          flexDirection: "row",
          //height : 40,
          alignItems : "center",
        }}>
          <Text style={[styles.textHeaderStyle, {color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE}]}>{Localized.t('ReportDetailPage.TotalTransaction')}</Text>
          <Text style={{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-SemiBold',fontSize : RFValue(17),marginRight : 10}}>{this.state.PaymentTransferArray.length }</Text>

          </View>
          </View>

      );
    };

    searchFilterFunction = text => {
      this.setState({
        value: text,
      });

      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.token}}`;
        const textData = text;

        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        PaymentTransferArray: newData,
      });
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
           self.setState({illustratorIndex : 6, illustratorVisible: true });
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


    onPressAlertPositiveButton = () => {

      this.setState(state => ({
        showCancelAlert: false
      }));
      this.CancelledDetail();
    }

    onPressAlertNegativeButton = () => {
      this.setState(state => ({
        showCancelAlert: false
      }));

    };

    toggleCancelAlert()
    {
        this.setState({ showCancelAlert: true})
    }


    captureSubmit = () => {
         this.SendCaptureDetail()
     }

    captureFormSubmit = () => {
        this.refs.form.submit();
    }

    SendCaptureDetail() {

        var self = this;

        self.setState({ shareModalView: false })

          var parm1 = {
            "merchantCode" : GLOBAL.MERCHANT_CODE,
            "paymentToken": this.state.token,
          }


          if(self.state.CaptureCheckID != 2)
          {
            var a = {"amount": self.state.Captureamount}
            parm1 = Object.assign({},a,parm1)
          }
          else {
            var a = {"amount": self.state.CaptureTotalamount}
            parm1 = Object.assign({},a,parm1)
          }


          API.post(GLOBAL.API_STRING.CAPTURE,parm1,{
          }).then(function (response) {
          const json = JSON.parse(response)
          console.log(json.status);
         console.log(json);
          if(json.status)
          {
             self.setState({illustratorIndex :12,illustratorRefNo :self.state.illustratorRefNo,illustratorValue : self.state.illustratorValue,illustratorVisible: true });
          }
          else {
            var message = ''
            if(json.response != null)
            {
                message = json.response.data

              self.setState({ showRefundAlert: true,showRefundAlertMessage : message});

            }
            else {
              message = json.message
              self.setState({ showRefundAlert: true,showRefundAlertMessage : message});
            }
          }
        })
        .catch(function (error) {
          const errorjson = JSON.parse(error)
        console.log('final :' + errorjson);
      //  console.log('final :' + errorjson.message);
      var message = ''
      if(errorjson.response != null)
      {
        if(errorjson.response.captureAmount != null)
        {
          message = errorjson.response.captureAmount[0]
        }

        self.setState({ showRefundAlert: true,showRefundAlertMessage : message});

      }
      else {
        message = errorjson.message
        self.setState({ showRefundAlert: true,showRefundAlertMessage : message,captureModalView: false});
      }

        });





    }


    CancelledDetail() {

        var self = this;


          API.delete(GLOBAL.API_STRING.CANCEL + '/' + self.state.token, {
          }).then(function (response) {
          const json = JSON.parse(response)
          console.log(json.status);
         console.log(json);
          if(json.status)
          {
             self.setState({illustratorIndex : 13,illustratorVisible: true });
          }
          else {
            var message = ''
            if(json.response != null)
            {
                message = json.response.data

              self.setState({ showRefundAlert: true,showRefundAlertMessage : message});

            }
            else {
              message = json.message
              self.setState({ showRefundAlert: true,showRefundAlertMessage : message});
            }
          }
        })
        .catch(function (error) {
          const errorjson = JSON.parse(error)
        console.log('final :' + errorjson);
      //  console.log('final :' + errorjson.message);
      var message = ''
      if(errorjson.response != null)
      {
          message = errorjson.response

        self.setState({ showRefundAlert: true,showRefundAlertMessage : message});

      }
      else {
        message = errorjson.message
        self.setState({ showRefundAlert: true,showRefundAlertMessage : message});
      }

        });


    }


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






  render(){
      const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
   const screenheight = Dimensions.get("window").height;

   const text = this.props.route.params;
     //console.log("CreateGuildStack param:" + text.something.name.first)
      console.log("param:" + text.Type)
  const selectionMenu = (this.state.selectedButton === "Payment" ? text.Type === "RefundPending" ?  this.state.PgDetailsArray[0].RefundPending : text.Type === "RefundComplete" ? this.state.PgDetailsArray[0].RefundComplete : text.Type === "Failed" ? this.state.PgDetailsArray[0].PaymentFailed :this.state.PgDetailsArray[0].PaymentSuccess : this.state.PgDetailsArray[0].PaymentFinance)
    return(
      <ViewShot ref="viewShot" style = {{backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
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
            this.props.navigation.navigate(text.fromView)
          }}

      style = {{
        shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
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
      <Text style={{fontSize:  RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE, fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{this.props.route.params.ReportType == "CaptureRequests" ? Localized.t('ReportDetailPage.TransactionDetails') :Localized.t('ReportDetailPage.ReportDetails')}</Text>
      <Text style={{fontSize:  RFValue(17),color :GLOBAL.COLOR.DARKGRAY, fontFamily : 'Prompt-Regular',textAlign : 'center'}}>{this.state.referenceNo}</Text>
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
      : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('ReportDetailPage.Payment')}</Text>
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
      : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('ReportDetailPage.Finance')}</Text>
      <Image
      style={styles.icon1}
      source = { this.state.selectedButton === "Finance" ?
      rectImg :
      null} />
      </TouchableOpacity>
      </View>

 <ScrollView contentContainerStyle={{paddingBottom: 180}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE ,height : text.Type === "Failed" || text.Type === "RefundPending" ? screenheight : 'auto' }}>

        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE}}>

          <View  style={{
            //flexDirection : 'column',
            backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,

          }}>

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
              borderRadius : 10,
              elevation: 10,
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
              borderWidth : isDarkMode ? 1 : 0 ,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
              display : this.props.route.params.ReportType == 'PaymentTransfer' ? this.state.selectedButton === "Finance" ? null :'none' : null }}>

            <View style={{


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

                    <Text style = {{ color: index === 0 ? isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY,
                     fontSize : index === 0 ?  RFValue(17) : RFValue(15),
                     fontFamily : 'Prompt-Medium',
                     width : index == 0 ? '70%' :'45%',
                     textAlign : 'left'
                   }}>
                       {Localized.t('ReportDetailPage.'+ item.name)}
                    </Text>


                    <View style={{
                    flexDirection : 'row',alignItems :'center',width : index == 0 ? '30%' :'55%',justifyContent : 'flex-end'
                    }} >

                    <MaterialCommunityIcons name="checkbox-blank-circle" color={text.Type === "RefundPending" ? item.subname1 == 'Pending' ?"yellow":GLOBAL.COLOR.RED : text.Type === "Failed" ? GLOBAL.COLOR.RED :  item.subname1 != null ? item.subname1.length!= 0 ? this.props.route.params.ReportType === 'CaptureRequests' ? this.state.PaymentStatus == 4 ? GLOBAL.COLOR.GREEN : GLOBAL.COLOR.RED : this.props.route.params.ReportType === 'PaymentList' ? this.state.PaymentStatus == 5 ? GLOBAL.COLOR.RED :  GLOBAL.COLOR.GREEN : GLOBAL.COLOR.GREEN : 'transparent' : ''}  size={18}  style={{display :  item.Imge === 2 ? 'none' :null}} />
                     <Text style = {{color: this.state.selectedButton === "Payment" ?
                      text.Type === "Failed" ||  text.Type === "RefundPending" ? index === selectionMenu.length-2 ? GLOBAL.COLOR.ORANGE : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE
                       : index === selectionMenu.length-1 ? GLOBAL.COLOR.ORANGE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
                      fontSize : this.state.selectedButton === "Payment" ?
                      text.Type === "Failed" ||  text.Type === "RefundPending" ? index === selectionMenu.length-2 ?  RFValue(20) : RFValue(15)
                       : index === selectionMenu.length-1 ?  RFValue(20) :  RFValue(15)  :  RFValue(15) ,

                      marginLeft : 10,
                      fontFamily : 'Prompt-Medium',
                      textAlign : 'right'
                        }}>
                         {this.state.selectedButton === "Payment"  && index == 0 ? item.subname1.length != 0 ?  Localized.t('ReportDetailPage.'+ item.subname1) : ''

                       : item.subname1}
                      </Text>
                   </View>


                     </View>


                     <View
                     style={{
                       backgroundColor : isDarkMode ? selectionMenu.length -1 == index ? this.state.selectedButton === "Payment" ? text.Type === "Success" || text.Type === "RefundComplete" ? GLOBAL.COLOR.SHADEGRAY : 'transparent' :'transparent' : GLOBAL.COLOR.SHADEGRAY : GLOBAL.COLOR.SHADEGRAY ,
                       marginLeft : 10,
                       marginRight : 10,
                       height : 2,
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
            alignItems : "center",
            display : this.state.selectedButton === "Payment"  ? text.Type === "Success" || text.Type === "RefundComplete" ? this.props.route.params.ReportType ==  'CaptureRequests' ? 'none' : null :'none'  :'none'
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
          <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{ text.Type === "RefundComplete" ? Localized.t('ReportDetailPage.RequestedOn') : Localized.t('ReportDetailPage.TransactionOn')}</Text>
          <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize :  RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{text.Type === "RefundComplete" ? this.state.RequestedOn : this.state.TransactionOn}</Text>
          </View>

          <View
          style={{
            backgroundColor : GLOBAL.COLOR.SHADEGRAY,
            width : 2,
            height : '90%',
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
          <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{text.Type === "RefundComplete" ? Localized.t('ReportDetailPage.RefundedOn') : Localized.t('ReportDetailPage.TransferredOn')}</Text>
          <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.LIGHTBLUE,fontSize :  RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{text.Type === "RefundComplete" ? this.state.RefundedOn : this.state.TransferredOn}</Text>
          </View>

          </View>

          <View
          style={{
            backgroundColor :  isDarkMode ?  text.Type === "RefundComplete" ? GLOBAL.COLOR.SHADEGRAY :'transparent' : GLOBAL.COLOR.SHADEGRAY ,
            height : 2,
            marginLeft : 10,
            marginRight :10
          }}>
          </View>

          <View
         style={{
           justifyContent: 'space-between',
           marginTop :0,
           flexDirection: "row",
           //height : 40,
            padding : 15,
           alignItems : "center",
           display : this.state.selectedButton === "Payment"  ? text.Type === "RefundComplete" ? null :'none'  :'none'
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
         <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{ text.Type === "RefundComplete" ? Localized.t('ReportDetailPage.ApprovedBy') : Localized.t('ReportDetailPage.CreatedOn')}</Text>
         <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize :  RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{ text.Type === "RefundComplete" ? this.state.ApprovedBy : this.state.CreatedOn}</Text>
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
           justifyContent: 'space-between',
           marginTop :0,
           flexDirection: "column",
           //height : 40,
           alignItems : "center",
             width : '49%'
         }}>
         <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{text.Type === "RefundComplete" ? Localized.t('ReportDetailPage.ApprovedOn') : Localized.t('ReportDetailPage.PaidOn')}</Text>
         <Text style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontSize :  RFValue(13),fontFamily : 'Prompt-SemiBold'}}>{text.Type === "RefundComplete" ? this.state.ApprovedOn : this.state.PaidOn}</Text>
         </View>

         </View>

         <View
         style={{
           backgroundColor : this.state.selectedButton === "Payment"  ? text.Type === "RefundComplete" ? GLOBAL.COLOR.SHADEGRAY :'transparent'  :'transparent' ,
           height : 2,
           marginLeft : 10,
           marginRight :10
         }}>
         </View>


         <View style = {{display : text.Type === "RefundComplete" && this.state.selectedButton === "Payment" ?  null :'none'}}>
          <View
                   style={{
                     justifyContent: 'space-between',
                     flexDirection: "column",
                     height : 45,
                     marginTop : 10,
                     marginLeft : 10,
                     marginRight :10
                   }}>
                   <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',padding : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Medium',textAlign : 'left'}}>{Localized.t('ReportDetailPage.Remark')}</Text>
            </View>

            <View style={{
              marginTop :0,
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

            }} >
         <Text style =  {{color : isDarkMode ?  GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 20,fontSize :  RFValue(13),fontFamily : 'Prompt-Regular',marginTop : 5,textAlign : 'left'}}>{this.state.Remark}</Text>
         </View>
        </View>




           </View>

           <View style={{
             alignItems : 'flex-end',
             justifyContent : this.props.route.params.ReportType === 'CaptureRequests' ? 'space-evenly' : 'flex-end',
             flexDirection : 'row',
             marginTop : 50,
             padding : 10,
             display : this.props.route.params.ReportType == 'PaymentTransfer' ?  'none' :   text.Type === "Success"  ? this.props.route.params.ReportType == 'PaymentList' ? this.state.serviceType == 8 || this.state.PaymentStatus == 4 ||this.state.PaymentStatus == 5  ? 'none' : null : this.props.route.params.ReportType === 'CaptureRequests' ? this.state.PaymentStatus == 4 ? null : 'none' : null : 'none'

             }}>
           <CustomButton title= {this.props.route.params.ReportType === 'CaptureRequests' ?  Localized.t('ReportDetailPage.Capture')  :  Localized.t('ReportDetailPage.Refund')} style = {{fontSize : RFValue(20),width : (screenWidth/2)-30}}
             onPress={() => { this.props.route.params.ReportType === 'CaptureRequests' ? this.toggleCaptureModal(!this.state.captureModalView) : this.toggleRefundModal(!this.state.refunModalView)}}
           />
           <CustomButton title= {Localized.t('InvoiceOpenDetailsPage.Cancel')} style = {{fontSize : RFValue(20),width : (screenWidth/2)-30,display : this.props.route.params.ReportType === 'CaptureRequests' ? null : 'none'}}
             onPress={() => {  this.toggleCancelAlert()}}
           />
          </View>
           </View>

           <View style = {{display : this.props.route.params.ReportType == 'PaymentTransfer' ?  this.state.selectedButton === "Payment" ? null : 'none' :'none' }}>


             <FlatList

               data={this.state.PaymentTransferArray}

               renderItem={({ item,index }) => (
                  // Single Comes here which will be repeatative for the FlatListItems
                  // Single Comes here which will be repeatative for the FlatListItems
                  <View
                  style={{
                    justifyContent: 'space-between',
                    marginTop :10,
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
                    backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE ,
                    borderWidth : isDarkMode ? 1 : 0 ,
                    borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
                    //height : 40,
                    //alignItems : "flex-start",
                  }}>
                    <TouchableOpacity
                     style = {{padding : 0}}
                     disabled={true}
                    onPress={() => {}}>


                  <View
                    style={{
                      justifyContent: 'space-between',
                      marginTop :0,
                      flexDirection: "row",
                      //height : 40,
                      alignItems : "flex-end",
                      padding : 10
                    }}>

                    <View
                    style={{
                     // justifyContent: 'space-between',
                      marginTop :0,
                      flexDirection: "row",
                      //height : 40,
                      alignItems : "center",
                    }}>
                   <MaterialCommunityIcons name="checkbox-blank-circle" color = {`${item.payment_status}` == 0 ? GLOBAL.COLOR.RED : GLOBAL.COLOR.GREEN}  size={18} />
                  <Text style={[styles.FlattextStyle,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{Localized.t("CommanTabPage."+ item.service_type.name)}</Text>
                     </View>

                    <Text style={styles.textStyleValue}>{format(parseISO(item.created_at), 'dd MMM yy, hh:mm a').toLocaleUpperCase()}</Text>
                  </View>




                   <View
                   style={{
                     justifyContent: 'space-between',
                     marginTop :0,
                     flexDirection: "row",
                     //height : 40,
                     alignItems : "center",
                   }}>


                    <Text style={[styles.FlattextStyle1,{width : '80%' }]}>{item.token}</Text>
                    <Text style={[styles.FlattextStyle1,{textAlign : 'right',width : '20%'}]}>{item.payment_type.display_name}</Text>

                   </View>

                   <View
                   style={{
                     justifyContent: 'space-between',
                     marginTop :0,
                     flexDirection: "row",
                     //height : 40,
                     alignItems : "center",
                   }}>


                    <Text style={styles.FlattextStyle1}>{Localized.t('ReportDetailPage.NetAmount')}</Text>
                    <Text style={[styles.FlattextStyle2, {color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{GLOBAL.CURRENCY + ' '+item.net_amount.toFixed(3)}</Text>

                   </View>

                   <View style={styles.borderContainer}>
                   <View style={styles.border} />
                  </View>

                   <View
                   style={{
                     justifyContent: 'space-between',
                     marginTop :10,
                     flexDirection: "row",
                     //height : 40,
                     alignItems : "center",
                       marginLeft :10,
                       marginRight : 10,
                       marginBottom : 10
                   }}>
                   <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{GLOBAL.CURRENCY + ' ' + item.amount.toFixed(3)}</Text>
                  <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{GLOBAL.CURRENCY + ' ' + item.admin_charge.toFixed(3)}</Text>
                   <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{GLOBAL.CURRENCY + ' ' + item.commission.toFixed(3)}</Text>
                  </View>



                   </TouchableOpacity>
                  </View>

                )}
               keyExtractor={item => item.id}
               ListHeaderComponent={this.renderHeader}

             />
           </View>
       </View>

       <View
       style={{
         justifyContent: 'space-between',
         marginTop :10,
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
         backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,
         alignItems : "center",
         display : this.props.route.params.ReportType == 'PaymentTransfer' ?  this.state.selectedButton === "Payment" ? null : 'none' : 'none',
         borderWidth : isDarkMode ? 1 : 0 ,
         borderColor :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE

         //height : 40,
         //alignItems : "flex-start",
       }}>



       <View
       style={{
         justifyContent: 'space-between',
         marginTop :10,
         flexDirection: "row",
         //height : 40,
        //   width : '100%',
         alignItems : "center",
         marginLeft :10,
         marginRight : 10,
         marginBottom : 10
       }}>
       <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,width : '33%'}]}>{Localized.t('ReportDetailPage.TotalAmount')}</Text>
      <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,width : '33%'}]}>{Localized.t('ReportDetailPage.TotalAdminCharge')}</Text>
      <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,width : '33%'}]}>{Localized.t('ReportDetailPage.TotalCommission')}</Text>
      </View>

      <View style={styles.borderContainer}>
      <View style={styles.border} />
     </View>


      <View
      style={{
        justifyContent: 'space-between',
        marginTop :10,
        flexDirection: "row",
        //height : 40,
      //  width : '100%',
        alignItems : "center",
        marginLeft :10,
        marginRight : 10,
        marginBottom : 10
      }}>
      <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,width : '33%'}]}>{GLOBAL.CURRENCY + ' ' + Number(this.state.PaymentTransferAmount).toFixed(3)}</Text>
      <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,width : '33%'}]}>{GLOBAL.CURRENCY + ' ' + Number(this.state.PaymentTransferAdmin).toFixed(3)}</Text>
      <Text style={[styles.FlattextStyle3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,width : '33%'}]}>{GLOBAL.CURRENCY + ' ' + Number(this.state.PaymentTransferCommission).toFixed(3)}</Text>
     </View>

       </View>

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

        marginTop : 10,
        flexDirection: "row",
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
        <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize :  RFValue(22),fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{ Localized.t('InvoiceDetailsPage.Refund')}</Text>
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,alignItems : 'center',fontSize :  RFValue(17),fontFamily : 'Prompt-Regular',textAlign : 'center'}}>{ Localized.t('InvoiceDetailsPage.PleaseChooseRefundType')}</Text>
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
                              color= {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
                            />
                            <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontSize :  RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceDetailsPage.'+ item.value)}</Text>
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
        fontSize :  RFValue(17),
        fontFamily : 'Prompt-Regular'}}>
          {   this.state.RefundTypeArray[1].isChecked == true ?  Localized.t('InvoiceDetailsPage.RefundAmount') :  Localized.t('InvoiceDetailsPage.TotalAmount') }
       </Text>

       <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
        fontSize :  RFValue(17),
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
     <Text style = {{marginTop : 10,fontSize :  RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-SemiBold', display : this.state.RefundTypeArray[1].isChecked == true ? 'none' : null,textAlign : 'left'}}>
     { Localized.t('InvoiceDetailsPage.RefundAmount')}
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
                     style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:10,width :screenWidth*.5,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
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

         <Text style =  {{color : GLOBAL.COLOR.ORANGE,marginLeft : 20,fontFamily : 'Prompt-SemiBold',fontSize :  RFValue(17),marginRight : 10}}>KWD</Text>
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


    <CaptureModal.BottomModal
   visible={this.state.captureModalView}
   //visible = {this.state.modalVisible}
   onTouchOutside={() => this.setState({ captureModalView: false })}
   height={0.7}
   width={1}
   onSwipeOut={() => this.setState({ captureModalView: false })}
   modalTitle={



     <View
     style={{

       backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
     }} >

     <View style = {{
       justifyContent: 'space-between',

     marginTop : 10,
     flexDirection: "row",
     alignItems : "center",}}>
     <TouchableOpacity
      style = {{width : '10%',alignItems : 'center'}}
     onPress={() => {
       this.toggleCaptureModal(!this.state.captureModalView)}}>
     <Image  source={require('../Assest/close.png')} />
     </TouchableOpacity>

     <View
     style={{flexDirection : 'column',justifyContent : 'center',alignItems : 'center',width : '80%'}}
     >
     <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize :  RFValue(22),fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{  Localized.t('ReportDetailPage.Capture')}</Text>
     <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,alignItems : 'center',fontSize :  RFValue(17),fontFamily : 'Prompt-Regular',textAlign : 'center',display : global.captureType == 1 ? 'none' : null}}>{ Localized.t('ReportDetailPage.PleasechooseCaptureType')}</Text>
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
         onSubmit={this.captureSubmit}
    >

    <View
   style={{
     backgroundColor : GLOBAL.COLOR.SHADEGRAY,
     height : 2,marginTop : 10,width : '100%'
   }}>
   </View>

   <View style={{ flexDirection: "row",marginTop : 5,marginBottom : 5 }}>


                       {
                         this.state.CaptureTypeArray.map((item, index) => (


                         <TouchableOpacity
                           style = {{
                             flexDirection: "row",
                             margin: 10,
                             flex: 3,
                             justifyContent: global.captureType == 1 ? "flex-start" :"space-evenly",
                             alignItems : "center"
                           }}
                           onPress={() => this.CheckCaptureElement(item)}
                         >
                         <MaterialCommunityIcons
                           name={
                             item.isChecked === true
                               ? "circle"
                               : "checkbox-blank-circle-outline"
                           }
                           size={25}
                           color= {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
                         />
                         <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontSize :  RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('ReportDetailPage.'+ item.value)}</Text>
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
    //marginLeft : 10,
    //marginRight : 10,
    //padding : 5,
    height : 50
    }}>

    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
     fontSize :  RFValue(16),
     fontFamily : 'Prompt-Regular'}}>
       {   this.state.CaptureCheckID == 2 ?  Localized.t('ReportDetailPage.AuthorizedAmount')  :  Localized.t('ReportDetailPage.AuthorizedAmount') }
    </Text>

    <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
     fontSize :  RFValue(16),
     fontFamily : 'Prompt-Regular'}}>
     {GLOBAL.CURRENCY +' ' +   Number(this.state.CaptureTotalamount).toFixed(3)}
    </Text>

   </View>

   <View  style={{
     flexDirection :'row',
     justifyContent : 'space-between',
     alignItems : 'center',
    // marginLeft : 10,
     //marginRight : 10,
    // padding : 5,
     height : 50,
     display : this.state.CaptureCheckID == 1 ? null : 'none'
     }}>

     <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
      fontSize :  RFValue(16),
      fontFamily : 'Prompt-Regular'}}>
        {   Localized.t('ReportDetailPage.PendingAuthorizedAmount') }
     </Text>

     <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
      fontSize :  RFValue(16),
      fontFamily : 'Prompt-Regular'}}>
      {GLOBAL.CURRENCY +' ' +   Number(this.state.PendingAuthorizedAmount).toFixed(3)}
     </Text>

    </View>


     <View
     style={{
       backgroundColor : GLOBAL.COLOR.SHADEGRAY,
       height : 2,
     }}>
     </View>
  <Text style = {{marginTop : 10,fontSize :  RFValue(16),color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-SemiBold', display : this.state.CaptureCheckID == 2 ? 'none' : null,textAlign : 'left'}}>
  {Localized.t('ReportDetailPage.EnterCaptureAmount') }
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
       display : this.state.CaptureCheckID == 2 ? 'none' : null,
       borderWidth : isDarkMode ? 1 : 0,
       borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
    }} >

     <TextValidator
                  style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:10,width :screenWidth*.5,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                  name="Amount"
                  label="Amount"
                  validators={['required','matchRegexp:^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$']}
                  errorMessages={[Localized.t('TextValidationPage.Amountfieldisrequired'), Localized.t('TextValidationPage.Entervalidamount')]}
                  errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                  placeholder="0.000"
                  //placeholderTextColor = {GLOBAL.COLOR.ORANGE}
                  type="Amount"
                  keyboardType="numeric"
                  value={this.state.Captureamount}
                  onChangeText={this.handleCaptureChange('Captureamount')}
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

      <Text style =  {{color : GLOBAL.COLOR.ORANGE,marginLeft : 20,fontFamily : 'Prompt-SemiBold',fontSize :  RFValue(17),marginRight : 10}}>KWD</Text>
    </View>

   </View>

   <View style={{
     alignItems : 'flex-end',
     marginTop : 50,
     padding : 10,
     }}>

   <CustomButton title= {Localized.t('ReportDetailPage.Confirm')} style = {{fontSize : RFValue(20)}}
   onPress={() => {
       this.state.CaptureCheckID == 2 ? this.SendCaptureDetail() : this.captureFormSubmit()
       }}
   />
  </View>
  </Form>
   </View>

   </ModalContent>
 </CaptureModal.BottomModal>

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

      <CustomAlertComponent
          displayAlert={this.state.showCancelAlert}
          displayAlertIcon={false}
          alertTitleText={Localized.t('TextValidationPage.AreYouSure?')}
          alertMessageText={Localized.t('TextValidationPage.Therequestisnotcapturedwouldyouliketocancel')}
          displayPositiveButton={true}
          positiveButtonText={Localized.t('TextValidationPage.Yes')}
          displayNegativeButton={true}
          negativeButtonText={  Localized.t('TextValidationPage.No')}
          onPressPositiveButton={this.onPressAlertPositiveButton}
          onPressNegativeButton={this.onPressAlertNegativeButton}
        />



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
     <Text style = {{color : GLOBAL.COLOR.DARKBLUE,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoiceDetailsPage.ShareInvoice')}</Text>
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
  <IllustratorScreen example = {{'index' : this.state.illustratorIndex ,'Name' : this.state.illustratorValue,'RefNo' : this.state.illustratorRefNo}} isDarkMode = {isDarkMode}  onOKClick={this.illustratorReceiveData}/>
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
     fontSize :  RFValue(17),
     fontFamily : 'Prompt-SemiBold',
   },
   subTextStyle: {
    color: GLOBAL.COLOR.DARKBLUE,
    fontSize :  RFValue(15),
    fontFamily : 'Prompt-Regular',
  },
  ProductTextStyle: {
   color: GLOBAL.COLOR.DARKGRAY,
   fontSize :  RFValue(13),
   fontFamily : 'Prompt-Regular',
 },
  subTextValue: {
   color: GLOBAL.COLOR.DARKGRAY,
   fontSize :  RFValue(15),
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
  width:50,
  height:50,
  marginTop : -25,
  marginLeft : 10

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
   fontSize:  RFValue(15),
   color: '#867EBD',
 //  height:50,
   width:'100%'
 },
 ImageIconStyle: {
  marginTop : 10,
  tintColor : GLOBAL.COLOR.DARKGRAY,
},
textStyleValue: {
  color : GLOBAL.COLOR.DARKGRAY,
  fontFamily : 'Prompt-Regular',
  fontSize :  RFValue(13),
  marginLeft :0
},
FlattextStyle: {
  color : GLOBAL.COLOR.DARKBLUE,
  fontFamily : 'Prompt-Medium',
  padding: 0,
  fontSize :  RFValue(15),
  marginLeft : 5
},
textHeaderStyle: {
  color : GLOBAL.COLOR.DARKBLUE,
  fontFamily : 'Prompt-Medium',
  padding: 10,
  fontSize :  RFValue(17)
},
FlattextStyle1: {
  color : 'gray',
  padding: 10,
},
FlattextStyle2: {
  color : GLOBAL.COLOR.DARKBLUE,
  fontFamily : 'Prompt-SemiBold',
  padding: 10,
},
FlattextStyle3: {
  color : GLOBAL.COLOR.DARKBLUE,
  fontFamily : 'Prompt-SemiBold',
  textAlign : 'center',
//  width :'33%'
},
borderContainer:{
 flexDirection:'row',
 alignItems:'center',
 justifyContent:'center',

},
border:{
 flex:0.98,
 borderBottomWidth: 1,
 borderBottomColor: GLOBAL.COLOR.SHADEGRAY,

},
 });
