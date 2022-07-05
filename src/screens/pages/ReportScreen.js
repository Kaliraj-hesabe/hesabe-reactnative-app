
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,RefreshControl,Share,I18nManager,AppState} from 'react-native';
//import Panel from '../../components/Panel';

import SearchList from '../../components/SearchableList';
//import FilterList from '../../components/FilterScreen';

import { PieChart} from 'react-native-svg-charts'
import Modal from 'react-native-modal';
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Localized from '../../locales'
import Tooltip from 'react-native-walkthrough-tooltip';
import { CustomButton } from '../../components/CustomButton.js';
import Modals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import API from '../../utils/API';
const GLOBAL = require('../../utils/Globals');
import { format,parseISO } from 'date-fns';
import AsyncStorage  from '@react-native-community/async-storage';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import RNFetchBlob from 'rn-fetch-blob'
const hesabeCrypt = require("../../utils/HesabeCrypt");
import CustomAlertComponent from '../../components/CustomAlertComponent';
import aesjs from 'aes-js';
import { showLoader, hideLoader } from '../../utils/AppLoader.js';
import IllustratorScreen  from '../../components/IllustratorScreen.js';
import IllustratorModals, {} from 'react-native-modals';
import {currencyFormat,paymentTypeID,serviceTypeID } from '../../utils/GlobalFunction';
import Shared from 'react-native-share';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';
//var FileSaver = require('file-saver');


export default class ReportScreen extends Component {
  constructor(){
    super();
    this.selectionOnPress = this.selectionOnPress.bind(this);
    this.searchReceiveData = this.searchReceiveData.bind(this);
    this.reportDetailReceiveData = this.reportDetailReceiveData.bind(this);
    this.filterReceiveData = this.filterReceiveData.bind(this);
    this.searchEndLoading = this.searchEndLoading.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._renderItem1 = this._renderItem1.bind(this);
    this.HideSearchToolTipModal = this.HideSearchToolTipModal.bind(this);
    this.illustratorReceiveData = this.illustratorReceiveData.bind(this);


    this.state = {
      isHidden:false,
      selectedButton: "PaymentList",
      modalVisible: false,
      modalFilterData:null,
      activeIndex:0,
      activeIndex1:0,
      filterVisible: false,
      FilterClear : false,
      toolTipListVisible :false,
      toolTipDownloadVisible :false,
      toolTipFilterVisible :false,
      toolTipIndexVisible :false,
      PaymentListArray : [],
      PaymentTransferArray : [],
      PaymentSearchTransferArray : [],
      PaymentRefundArray : [],
      PaymentSearchRefundArray : [],
      PaymentCaptureArray : [],
      PaymentSearchCaptureArray : [],
      Listpage : 1,
      Transferpage : 1,
      Refundpage : 1,
      Capturepage : 1,
      listLastIndex : false,
      trasnferLastIndex : false,
      refundLastIndex : false,
      captureLastIndex : false,
      listFilterPaymentStatus: "All",
      listFilterPaymentMethod: "ALL",
      listFilterServiceType: "ALL",
      listFilterFromDate : '',
      listFilterToDate : '',
      listFilterEmployeeId : '',
      listFilterSelectedFromDate : '',
      listFilterSelectedToDate : '',

      refundFilterPaymentStatus: "All",
      refundFilterPaymentMethod: "ALL",
      refundFilterServiceType: "ALL",
      refundFilterFromDate : '',
      refundFilterToDate : '',
      refundFilterEmployeeId : '',
      refundFilterSelectedFromDate : '',
      refundFilterSelectedToDate : '',

      transferFilterPaymentStatus: "All",
      transferFilterPaymentMethod: "ALL",
      transferFilterServiceType: "ALL",
      transferFilterFromDate : '',
      transferFilterToDate : '',
      transferFilterEmployeeId : '',
      transferFilterSelectedFromDate : '',
      transferFilterSelectedToDate : '',

      captureFilterPaymentStatus: "All",
      captureFilterPaymentMethod: "ALL",
      captureFilterServiceType: "ALL",
      captureFilterFromDate : '',
      captureFilterToDate : '',
      captureFilterEmployeeId : '',
      captureFilterSelectedFromDate : '',
      captureFilterSelectedToDate : '',

      searchData : '',
      refreshing : false,
      scrollRefreshing : false,
      PaymentListPermission : true,
      RefundRequestPermission : true,
      PaymentTransferPermission : true,
      CaptureRequestsPermission : true,
      showAlert : false,
      showAlertMessage : '',
      reportData : [],
      illustratorVisible: false,
      illustratorType: '',
      ref : React.createRef(),
          carouselItems: [
          {
              title:"All",
              text: "0.0",
              Unit: "KWD",
          },
          {
              title:"PaymentGateway",
              text: "0.0",
              Unit: "KWD"
          },
          {
              title:"QuickInvoice",
              text: "0.00",
              Unit: "KWD"
          },
          {
              title:"OpenInvoice",
              text: "0.0",
              Unit: "KWD"
          },
          /*{
              title:"Pos",
              text: "0.00",
          },*/


        ],

        carouselTransferItems: [
        {
            title:"All",
            text: "0.0",
            Unit: "KWD"
        },
        {
            title:"Transferred",
            text: "0.0",
            Unit: "KWD"
        },
        {
            title:"PendingtoTransfer",
            text: "0.0",
            Unit: "KWD"
        },

      ],

      carouselRefundItems: [
      {
          title:"All",
          text: "0.0",
          Unit: "KWD"
      },
      {
          title:"PendingRequest",
          text: "0.0",
          Unit: "KWD"
      },
      {
          title:"ApprovedRequest",
          text: "0.0",
          Unit: "KWD"
      },
      {
          title:"RejectedRequest",
          text: "0.0",
          Unit: "KWD"
      },

    ],

    carouselCaptureItems: [
    {
        title:"All",
        text: "0.0",
        Unit: Localized.t("DashboardPage."+ "Transaction")
    },
    {
        title:"Authorized",
        text: "0.0",
        Unit: Localized.t("DashboardPage."+ "Transaction")
    },
    {
        title:"Cancelled",
        text: "0.0",
        Unit: Localized.t("DashboardPage."+ "Transaction")
    },


  ],

    carouselRefundItems1: [
    {
        title:"All",
        text: "0.0",
        Unit: "KWD"
    },
    {
        title:"Pending",
        text: "0.0",
        Unit: "KWD"
    },
    {
        title:"Approved",
        text: "0.0",
        Unit: "KWD"
    },
    {
        title:"Rejected",
        text: "0.0",
        Unit: "KWD"
    },

  ],



            carouselItems1: [

            {
                title:"PaymentList",

            },
            {
                title:"RefundRequest",

            },
            {
                title:"PaymentTransfer",

            },
            {
                title:"CaptureRequests",
            },

          ],




    };




  }


static contextType = DarkModeContext;

  componentDidMount()
  {
    if(global.employeFlag)
    {
        this.getPermissionAccess();
    }

      this._retrieveData();
      AppState.addEventListener('change', this._handleAppStateChange);

       setTimeout(() => {
     this.getReportDetail(true);
     this.ShowCurrentDate();
     }, 500);

  }


  componentWillUnmount() {
  AppState.removeEventListener('change', this._handleAppStateChange);
}

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState);
   if ( nextAppState === 'active') {
     if(global.DeepLinkFlag == true &&  this.state.showAlert == true)
     {
       this.setState({
        showAlert : false
      })
     }

   }

 }


  _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('ReportToolTipFlag');
		console.log('ZXZX :' + value);

    if (value !== null) {
      // We have data!!

			if (value == "True") {

			 this.setState({
         toolTipListVisible :false,
         toolTipDownloadVisible :false,
         toolTipFilterVisible :false,
         toolTipIndexVisible :false,
		    })
	   }

    }
		else {
     console.log('ZYYY :' + this.state.toolTipListVisible);
			this.setState({
        toolTipListVisible :true,
        toolTipDownloadVisible :false,
        toolTipFilterVisible :false,
        toolTipIndexVisible :false,
		})
     console.log('ZYYY :' + this.state.toolTipListVisible);

		}

  } catch (error) {
		this.setState({
      toolTipListVisible :true,
      toolTipDownloadVisible :false,
      toolTipFilterVisible :false,
      toolTipIndexVisible :false,
	})
  }


};


getReportDetail(status) {


  if(status)
  {


      this.setState({
        Listpage: 1,
        PaymentListArray : [],
        listLastIndex : false
     }, () => {
				 this.getReportDetail1(true)
      });
  }
  else {
    this.getReportDetail1(false)
  }
}

  getReportDetail1(status) {

  var self = this;
    /*if(status)
    {
        self.setState({
          Listpage: 1,
          PaymentListArray : [],
          listLastIndex : false
        });
    }*/




  var a = {  'search' : self.state.searchData }
//  var b = { 'paymentType': self.state.listFilterPaymentMethod === "KNET" ? '1' : '2'}
  var c = {  'employee' : self.state.listFilterEmployeeId }

  var f = { 'fromDate'  :  self.state.listFilterFromDate}
  var j = { 'toDate'    : self.state.listFilterToDate}
  var z = {'paymentStatus' : self.state.listFilterPaymentStatus == 'Successful' ?  1 : self.state.listFilterPaymentStatus == 'Authorized' ? 4 : self.state.listFilterPaymentStatus == 'Cancelled' ? 5 : 0 }


  var parm1 = {
    'merchantCode' : GLOBAL.MERCHANT_CODE,
  }


  if(self.state.searchData.length != 0)
   {
     parm1 = Object.assign({},a,parm1)
   }

   if(self.state.listFilterPaymentMethod != "ALL")
   {
  // parm1 =  Object.assign({},b,parm1)

   var payValue = global.paymentType.map(function(data, idx) {
    if(data.name == self.state.listFilterPaymentMethod)
   {
     // console.log('JJJ :' + data.name);
      //console.log('JJJ :' + data.id);
      var b = { 'paymentType':  data.id}
     parm1 =  Object.assign({},b,parm1)
   }

  });
   }

   if(self.state.listFilterEmployeeId.length != 0)
    {
      parm1 = Object.assign({},c,parm1)
    }

    if(self.state.listFilterPaymentStatus != "All")
    {
    parm1 =  Object.assign({},z,parm1)
    }



   parm1 =  Object.assign({},f,j,parm1)



    API.get(GLOBAL.API_STRING.PAYMENTLIST + `?page=${self.state.Listpage}`,{

      params: parm1


    }).then(function (response) {

      const json = JSON.parse(response)
       console.log(json.response.Data);

       var pageurl;


      if(json.response.transaction_list.pagination.next_page_url != null)
      {

        let pg = json.response.transaction_list.pagination.next_page_url.split('=');
        pageurl = pg[1]
     }else {

       pageurl = self.state.Listpage
     }




    let markers = [];


    for(let i = 0; i < json.response.transaction_list.pagination.count; i++) {

  //  if(self.state.listFilterPaymentStatus != 'All' ? self.state.listFilterPaymentStatus == 'Successful' ? json.response.transaction_list.data[i].payment_status == 1 : json.response.transaction_list.data[i].payment_status == 0 : true)
  //  {
    //  if(self.state.searchData.length != 0 ?  json.response.transaction_list.data[i].merchant.code ==  GLOBAL.MERCHANT_CODE ? true : false : true)
      //{
      if(json.response.transaction_list.data[i].payment_status == 0 || json.response.transaction_list.data[i].payment_status == 1 || json.response.transaction_list.data[i].payment_status == 4 || json.response.transaction_list.data[i].payment_status == 5)
      {
     markers.push({
    id: json.response.transaction_list.data[i].id,
    name: json.response.transaction_list.data[i].service_type_id == 3 ? json.response.transaction_list.data[i].order_reference_number != null ? json.response.transaction_list.data[i].order_reference_number.length != 0 ?  json.response.transaction_list.data[i].order_reference_number : json.response.transaction_list.data[i].token : '' : json.response.transaction_list.data[i].invoice != null ? json.response.transaction_list.data[i].invoice.customer_name : '',
    nameValue: format(parseISO(json.response.transaction_list.data[i].created_at), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
    subname1 : json.response.transaction_list.data[i].payment_type.display_name,
    subnamevalue1 : Localized.t("CommanTabPage." + json.response.transaction_list.data[i].service_type.name),
    subname2 : '',
    subnamevalue2 : '',
    subname3 : json.response.transaction_list.data[i].payment_status == 0 ? Localized.t("CommanTabPage.Failure") : json.response.transaction_list.data[i].payment_status == 1 ? Localized.t("CommanTabPage.Success") : json.response.transaction_list.data[i].payment_status == 4 ? Localized.t("CommanTabPage.Authorized") : Localized.t("CommanTabPage.Cancelled"),
    subnamevalue3 : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction_list.data[i].amount)),
    Subname3Img :json.response.transaction_list.data[i].payment_status == 0 || json.response.transaction_list.data[i].payment_status == 5 ? 2 : 1 ,
    nameImg :0
    });
   }
     //}
  //  }
   }


   console.log("ReportMarker :" +markers)
    /*  self.setState({

     PaymentListArray : markers

      })
    })*/


    if(json.response.transaction_list.pagination.next_page_url == null && json.response.transaction_list.pagination.previous_page_url == null)
    {
      self.setState
          ({
         PaymentListArray: markers
        })
    }
    else {

      if(self.state.listLastIndex)
      {

      }
      else {

        if(json.response.transaction_list.pagination.next_page_url == null)
        {
           self.setState({ listLastIndex: true });
        }

        self.setState(prevState =>
            ({
           PaymentListArray: [...prevState.PaymentListArray,...markers]
          }))
      }

    }



          let newArray = [...self.state.carouselItems]
         newArray[0].text =  json.response.stats.total_transactions_amount != "-" ? currencyFormat(Number(json.response.stats.total_transactions_amount)) : '0.000'
         newArray[1].text =  json.response.stats.payment_gateway_transactions_amount != "-" ? currencyFormat(Number(json.response.stats.payment_gateway_transactions_amount)) : '0.000'
         newArray[2].text =  json.response.stats.invoice_transactions_amount != "-" ? currencyFormat(Number(json.response.stats.invoice_transactions_amount)) : '0.000'
         newArray[3].text =  json.response.stats.open_invoice_transactions_amount != "-" ? currencyFormat(Number(json.response.stats.open_invoice_transactions_amount)) : '0.000'
        // newArray[4].text =  json.response.stats.pos_transactions_amount
           self.setState({

            array: newArray,
          })




    self.setState({
      Listpage: pageurl,
    })
    self.setState({refreshing :false})
    self.setState({scrollRefreshing :false})


      })

    .catch(function (error) {
      console.log(error);
      const errorjson = JSON.parse(error)
     // console.log('final :' + errorjson);
       console.log('final :' + errorjson.message);
        self.setState({ showAlert: true,showAlertMessage : errorjson.message});
    });


  }



  ShowCurrentDate()
  {
        var today = new Date()
        var currentdate

        currentdate = new Date(today.setDate(today.getDate()))
        currentdate = format(currentdate, 'yyyy-MM-dd')
       console.log(currentdate);

        this.setState({
         transferFilterToDate:currentdate,
          transferFilterFromDate:currentdate,
         });
   }



   getPaymentTransferDetail(status) {


     if(status)
     {


         this.setState({
           Transferpage: 1,
           PaymentTransferArray : [],
           trasnferLastIndex : false,
        }, () => {
   				 this.getPaymentTransferDetail1(true)
         });
     }
     else {
       this.getPaymentTransferDetail1(false)
     }
   }

  getPaymentTransferDetail1(status) {

  /*  if(status)
    {
        this.setState({
          Transferpage: 1,
          PaymentTransferArray : [],
          trasnferLastIndex : false,
        });
    }*/
   var self = this;


    API.get(GLOBAL.API_STRING.PAYMENTTRANSFER + `?page=${self.state.Transferpage}`,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
         'toDate':self.state.transferFilterToDate,
         'fromDate':self.state.transferFilterFromDate
        }


    }).then(function (response) {

      const json = JSON.parse(response)
       console.log(json.response.Data);
       var pageurl;


      if(json.response.payment_transfer_list.pagination.next_page_url != null)
      {
       let pg = json.response.payment_transfer_list.pagination.next_page_url.split('=');
       pageurl = pg[1]
     }else {

       pageurl = self.state.Transferpage
     }




    let markers = [];

    for(let i = 0; i < json.response.payment_transfer_list.pagination.count; i++) {

     markers.push({
       id: json.response.payment_transfer_list.data[i].id,
       name: json.response.payment_transfer_list.data[i].account_number,
       nameValue: format(parseISO(json.response.payment_transfer_list.data[i].transaction_date), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
       subname1 : json.response.payment_transfer_list.data[i].document_number,
       subnamevalue1 : '',
       subname2 : '',
       subnamevalue2 : '',
       subname3 : json.response.payment_transfer_list.data[i].merchant_bank_name,
       subnamevalue3 : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.payment_transfer_list.data[i].total_amount)),
       Subname3Img : 0 ,
       nameImg :0
    });
   }


   console.log("PaymentTransferXXX " + markers)

   if(json.response.payment_transfer_list.pagination.next_page_url == null && json.response.payment_transfer_list.pagination.previous_page_url == null)
   {
     self.setState
         ({
        PaymentTransferArray: markers
       })
   }
   else {

     if(self.state.trasnferLastIndex)
     {

     }
     else {

       if(json.response.payment_transfer_list.pagination.next_page_url == null)
       {
          self.setState({ trasnferLastIndex: true });
       }

       self.setState(prevState =>
           ({
          PaymentTransferArray: [...prevState.PaymentTransferArray,...markers]
         }))
     }

   }


   let newArray = [...self.state.carouselTransferItems]
  newArray[0].text =  currencyFormat(Number(json.response.stats.total_transactions_amount))
  newArray[1].text =  currencyFormat(Number(json.response.stats.transferred_transactions_amount))
  newArray[2].text =  currencyFormat(Number(json.response.stats.pending_transactions_amount))

    self.setState({

     array: newArray,
   })



    self.setState({
      Transferpage: pageurl,
    })
    self.setState({refreshing :false})
    self.setState({scrollRefreshing :false})

    })
    .catch(function (error) {
      const errorjson = JSON.parse(error)
     // console.log('final :' + errorjson);
       console.log('final :' + errorjson.message);
        self.setState({ showAlert: true,showAlertMessage : errorjson.message});
    });


    const newData = this.state.PaymentTransferArray.filter(item => {

      //  console.log("searching text " + item.subnamevalue1);
      const itemData = `${item.name}`;
      const textData = this.state.searchData;

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      PaymentSearchTransferArray: newData,

    });


  }


  getPermissionAccess()
  {
      console.log('cvcv starting');

      var list = {};
      if(global.employeePermission != null)
      {
      global.employeePermission.map((y) => {

            if(y.id == 4)
            {
              // console.log('cvcv'+ y.title);
               list = y.list

              //console.log('cvcv'+ list);
            }
            })

            var dict = list
            var arr = [];
            for (var key in dict) {
            arr.push(dict[key]);
            }


           if(arr[0].id == 13)
           {
              arr[0].status == true ?  this.setState({ PaymentListPermission: true }) :  this.setState({ PaymentListPermission: false });
              if(arr[0].status == false)
              {
                this.setState({
                  toolTipListVisible :false,
                  toolTipDownloadVisible :false,
                  toolTipFilterVisible :false,
                  toolTipIndexVisible :false,
               })
             }
           }

           if(arr[2].id == 35)
           {
              arr[2].status == true ?  this.setState({ RefundRequestPermission: true }) :  this.setState({ RefundRequestPermission: false });
           }

           if(arr[3].id == 36)
           {
              arr[3].status == true ?  this.setState({ PaymentTransferPermission: true }) :  this.setState({ PaymentTransferPermission: false });
           }


            console.log(arr);
            //console.log(arr[1].id);
         }
         else {
           this.setState({ PaymentListPermission: false })
           this.setState({ RefundRequestPermission: false })
           this.setState({ PaymentTransferPermission: false })
           //this.setState({ CaptureRequestsPermission: false })
         }

    }




    getRefundDetails(status) {


      if(status)
      {


          this.setState({
            Refundpage: 1,
            PaymentRefundArray : [],
            refundLastIndex : false
         }, () => {
            this.getRefundDetails1(true)
          });
      }
      else {
        this.getRefundDetails1(false)
      }
    }

  getRefundDetails1(status) {

  /*  if(status)
    {
        this.setState({
          Refundpage: 1,
          PaymentRefundArray : [],
          refundLastIndex : false
        });
    }*/
   var self = this;



     //console.log("KKK :" + ServiceType[5]);

    API.get(GLOBAL.API_STRING.REFUNDS + `?page=${self.state.Refundpage}`,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
         'toDate':self.state.refundFilterToDate,
         'fromDate':self.state.refundFilterFromDate
        }


    }).then(function (response) {

      const json = JSON.parse(response)
       console.log(json.response.Data);
       var pageurl;


      if(json.response.refund_request_list.pagination.next_page_url != null)
      {
       let pg = json.response.refund_request_list.pagination.next_page_url.split('=');
       pageurl = pg[1]
     }else {

       pageurl = self.state.Refundpage
     }



    let markers = [];

    for(let i = 0; i < json.response.refund_request_list.pagination.count; i++) {

        console.log("RefundTransfer12 " + self.state.refundFilterPaymentMethod)

     //self.state.refundFilterPaymentMethod === "KNET" ? paymentTypeID(json.response.refund_request_list.data[i].transaction.payment_id) == "KNET" : paymentTypeID(json.response.refund_request_list.data[i].transaction.payment_id) == "MPGS" : true)
      if(self.state.refundFilterPaymentMethod != 'ALL' ? paymentTypeID(json.response.refund_request_list.data[i].transaction.payment_id) == self.state.refundFilterPaymentMethod :true)
      {
        console.log("RefundTransfer13 " + self.state.refundFilterServiceType)
        //  if(self.state.refundFilterServiceType != 'ALL' ? self.state.refundFilterServiceType === "PAYMENTGATEWAY" ? serviceTypeID(json.response.refund_request_list.data[i].transaction.service_id) == "Payment Gateway" : serviceTypeID(json.response.refund_request_list.data[i].transaction.service_id) == "SMS Invoice" : true)
        if(self.state.refundFilterServiceType != 'ALL' ?  serviceTypeID(json.response.refund_request_list.data[i].transaction.service_id) ==  self.state.refundFilterServiceType  : true)
        {

     markers.push({
       id: json.response.refund_request_list.data[i].id,
       name: json.response.refund_request_list.data[i].document_number,
       nameValue: format(parseISO(json.response.refund_request_list.data[i].created_at), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
       subname1 : Localized.t("CommanTabPage." + serviceTypeID(json.response.refund_request_list.data[i].transaction.service_id)),
       subnamevalue1 : json.response.refund_request_list.data[i].transaction.display_name,//PaymentType[json.response.refund_request_list.data[i].transaction.payment_id],
       subname2 : '',
       subnamevalue2 : '',
       subname3 : json.response.refund_request_list.data[i].status == 0 ? Localized.t("CommanTabPage.Pending") : json.response.refund_request_list.data[i].status == 1 ? Localized.t("CommanTabPage.Approved") : Localized.t("ReportPage.Rejected") ,
       subnamevalue3 : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.refund_request_list.data[i].amount)),
       Subname3Img : json.response.refund_request_list.data[i].status == 0 ? 4 : json.response.refund_request_list.data[i].status == 1 ? 1 : 2,
       nameImg :0
    });
       }
      }
   }


   console.log("RefundTransferXXX " + markers)

   if(json.response.refund_request_list.pagination.next_page_url == null && json.response.refund_request_list.pagination.previous_page_url == null)
   {
     self.setState
         ({
        PaymentRefundArray: markers
       })
   }
   else {

     if(self.state.refundLastIndex)
     {

     }
     else {

       if(json.response.refund_request_list.pagination.next_page_url == null)
       {
          self.setState({ refundLastIndex: true });
       }

       self.setState(prevState =>
           ({
          PaymentRefundArray: [...prevState.PaymentRefundArray,...markers]
         }))
     }

   }




   let newArray = [...self.state.carouselRefundItems]
  newArray[0].text =  currencyFormat(Number(json.response.stats.total_refund_request_amount))
  newArray[1].text =  currencyFormat(Number(json.response.stats.pending_total_refund_request_amount))
  newArray[2].text =  currencyFormat(Number(json.response.stats.approved_total_refund_request_amount))
  newArray[3].text =  currencyFormat(Number(json.response.stats.rejected_total_refund_request_amount))

    self.setState({

     array: newArray,
   })



    self.setState({
      Refundpage: pageurl,
    })
    self.setState({refreshing :false})
    self.setState({scrollRefreshing :false})

    })
    .catch(function (error) {
      const errorjson = JSON.parse(error)
     // console.log('final :' + errorjson);
       console.log('final :' + errorjson.message);
        self.setState({ showAlert: true,showAlertMessage : errorjson.message});

    });

    const newData = this.state.PaymentRefundArray.filter(item => {

      //  console.log("searching text " + item.subnamevalue1);
      const itemData = `${item.name}`;
      const textData = this.state.searchData;

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      PaymentSearchRefundArray: newData,

    });


  }



  getCaptureDetails(status) {


    if(status)
    {


        this.setState({
          Capturepage: 1,
          PaymentCaptureArray : [],
          captureLastIndex : false
       }, () => {
          this.getCaptureDetails1(true)
        });
    }
    else {
      this.getCaptureDetails1(false)
    }
  }

getCaptureDetails1(status) {

  var self = this;
    /*if(status)
    {
        self.setState({
          Listpage: 1,
          PaymentListArray : [],
          listLastIndex : false
        });
    }*/




  var a = {  'search' : self.state.searchData }
//  var b = { 'paymentType': self.state.listFilterPaymentMethod === "KNET" ? '1' : '2'}
  var c = {  'employee' : self.state.captureFilterEmployeeId }

  var f = { 'fromDate'  :  self.state.captureFilterFromDate}
  var j = { 'toDate'    : self.state.captureFilterToDate}
  var z = {'paymentStatus' : self.state.captureFilterPaymentStatus == 'Authorized' ?  4 : 5 }


  var parm1 = {
    'merchantCode' : GLOBAL.MERCHANT_CODE,
  }


  if(self.state.searchData.length != 0)
   {
     parm1 = Object.assign({},a,parm1)
   }

   if(self.state.captureFilterPaymentMethod != "ALL")
   {
  // parm1 =  Object.assign({},b,parm1)

   var payValue = global.paymentType.map(function(data, idx) {
    if(data.name == self.state.captureFilterPaymentMethod)
   {
     // console.log('JJJ :' + data.name);
      //console.log('JJJ :' + data.id);
      var b = { 'paymentType':  data.id}
     parm1 =  Object.assign({},b,parm1)
   }

  });
   }

   if(self.state.captureFilterEmployeeId.length != 0)
    {
      parm1 = Object.assign({},c,parm1)
    }

    if(self.state.captureFilterPaymentStatus != "All")
    {
    parm1 =  Object.assign({},z,parm1)
    }



   parm1 =  Object.assign({},f,j,parm1)



    API.get(GLOBAL.API_STRING.PAYMENTLIST + `?page=${self.state.Capturepage}`,{

      params: parm1


    }).then(function (response) {

      const json = JSON.parse(response)
       console.log(json.response.Data);

       var pageurl;


      if(json.response.transaction_list.pagination.next_page_url != null)
      {

        let pg = json.response.transaction_list.pagination.next_page_url.split('=');
        pageurl = pg[1]
     }else {

       pageurl = self.state.Capturepage
     }




    let markers = [];


    for(let i = 0; i < json.response.transaction_list.pagination.count; i++) {

  //  if(self.state.listFilterPaymentStatus != 'All' ? self.state.listFilterPaymentStatus == 'Successful' ? json.response.transaction_list.data[i].payment_status == 1 : json.response.transaction_list.data[i].payment_status == 0 : true)
  //  {
    //  if(self.state.searchData.length != 0 ?  json.response.transaction_list.data[i].merchant.code ==  GLOBAL.MERCHANT_CODE ? true : false : true)
      //{
      if(self.calculateDate(json.response.transaction_list.data[i].created_at,global.captureDuration))
    {
      if((json.response.transaction_list.data[i].payment_status == 4 || json.response.transaction_list.data[i].payment_status == 5) && json.response.transaction_list.data[i].auth_status != 1)
      {
     markers.push({
    id: json.response.transaction_list.data[i].id,
    name: json.response.transaction_list.data[i].service_type_id == 3 ? json.response.transaction_list.data[i].order_reference_number != null ? json.response.transaction_list.data[i].order_reference_number.length != 0 ?  json.response.transaction_list.data[i].order_reference_number : json.response.transaction_list.data[i].token : '' : json.response.transaction_list.data[i].invoice != null ? json.response.transaction_list.data[i].invoice.customer_name : '',
    nameValue: format(parseISO(json.response.transaction_list.data[i].created_at), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
    subname1 : json.response.transaction_list.data[i].payment_type.display_name,
    subnamevalue1 : Localized.t("CommanTabPage." + json.response.transaction_list.data[i].service_type.name),
    subname2 : '',
    subnamevalue2 : '',
    subname3 : json.response.transaction_list.data[i].payment_status == 4 ? Localized.t("CommanTabPage.Authorized") : Localized.t("CommanTabPage.Cancelled"),
    subnamevalue3 : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.transaction_list.data[i].amount)),
    Subname3Img :json.response.transaction_list.data[i].payment_status == 5 ? 2 : 1 ,
    nameImg :0
    });
   }
  }

     //}
  //  }
   }


   console.log("ReportMarker :" +markers)
    /*  self.setState({

     PaymentListArray : markers

      })
    })*/


    if(json.response.transaction_list.pagination.next_page_url == null && json.response.transaction_list.pagination.previous_page_url == null)
    {
      self.setState
          ({
         PaymentCaptureArray: markers
        })
    }
    else {

      if(self.state.captureLastIndex)
      {

      }
      else {

        if(json.response.transaction_list.pagination.next_page_url == null)
        {
           self.setState({ captureLastIndex: true });
        }

        self.setState(prevState =>
            ({
           PaymentCaptureArray: [...prevState.PaymentCaptureArray,...markers]
          }))

          if(markers.length == 0 && json.response.transaction_list.pagination.next_page_url != null )
          {
            self.setState({   Capturepage: pageurl,
              refreshing :false,
             scrollRefreshing :false
              }, () => {

              self.getCaptureDetails(false);
            });



          }
      }

    }



          let newArray = [...self.state.carouselCaptureItems]
         newArray[0].text =  json.response.stats.auth_total_count != "-" ? json.response.stats.auth_total_count : '0'
         newArray[1].text =  json.response.stats.auth_count != "-" ? json.response.stats.auth_count : '0'
         newArray[2].text =  json.response.stats.auth_cancelled_count != "-" ? json.response.stats.auth_cancelled_count : '0'

        // newArray[4].text =  json.response.stats.pos_transactions_amount
           self.setState({

            array: newArray,
          })




    self.setState({
      Capturepage: pageurl,
    })
    self.setState({refreshing :false})
    self.setState({scrollRefreshing :false})




      })

    .catch(function (error) {
      console.log(error);
      const errorjson = JSON.parse(error)
     // console.log('final :' + errorjson);
       console.log('final :' + errorjson.message);
        self.setState({ showAlert: true,showAlertMessage : errorjson.message});
    });


}


calculateDate(date, days) {

 console.log(days);
    console.log("CalculateDAte : " + format(parseISO(date), 'yyyy-MM-dd hh:mm:ss'));

var result = new Date(format(parseISO(date), 'yyyy-MM-dd'));
console.log("Calculate1 : " + result);
result.setDate(result.getDate() + days + 1);

//  var fromdte = format(result.getDate(), 'yyyy-MM-dd')
console.log("Calculate1 : " + result);


 var date = new Date();


if(result.getTime() >= date.getTime() )
{
   return true
}




// var klvalue = format(new Date(result), 'yyyy-MM-dd')

//   console.log("Calculate2 : " + klvalue );

return false;

}

  downloadReport() {

    var self = this;
   var parm1 = {}
   var url = ''
    if(this.state.activeIndex1 === 0)
    {
   var a = {  'search' : self.state.searchData }
   var b = { 'paymentType': self.state.listFilterPaymentMethod === "KNET" ? '1' : '2'}
   var c = {  'employee' : self.state.listFilterEmployeeId}

   var f = { 'fromDate'  :  self.state.listFilterFromDate}
   var j = { 'toDate'    : self.state.listFilterToDate}


   parm1 = {
     'merchantCode' : GLOBAL.MERCHANT_CODE,
     'exportAs' : 'csv'
   }


   if(self.state.searchData.length != 0)
    {
      parm1 = Object.assign({},a,parm1)
    }

    if(self.state.listFilterPaymentMethod != "ALL")
    {
    parm1 =  Object.assign({},b,parm1)
    }

    if(self.state.listFilterEmployeeId.length != 0)
     {
       parm1 = Object.assign({},c,parm1)
     }

     parm1 =  Object.assign({},f,j,parm1)
     url = GLOBAL.API_STRING.PAYMENTLIST + '?data='

  }
  else if (this.state.activeIndex1 === 1) {

    parm1 = {
      'merchantCode' : GLOBAL.MERCHANT_CODE,
      'toDate':self.state.refundFilterToDate,
      'fromDate':self.state.refundFilterFromDate,
      'exportAs' : 'csv'
    }
    url = GLOBAL.API_STRING.REFUNDS + '?data='
  }
  else {

     parm1 = {
       'merchantCode' : GLOBAL.MERCHANT_CODE,
       'toDate':self.state.transferFilterToDate,
       'fromDate':self.state.transferFilterFromDate,
       'exportAs' : 'csv'
     }
      url =  GLOBAL.API_STRING.PAYMENTTRANSFER  + '?data='

  }

      console.log(parm1);
     let key = aesjs.utils.utf8.toBytes(GLOBAL.MERCHANT_KEY);
     let iv = aesjs.utils.utf8.toBytes(GLOBAL.MERCHANT_IV);

     const payment = new hesabeCrypt(key, iv);

     let val = payment.encryptAes(JSON.stringify(parm1))

    // console.log(parm1);
     //console.log(val);
     let dirs = RNFetchBlob.fs.dirs

     showLoader()
     RNFetchBlob
    .config({
      fileCache : true,
      appendExt : 'csv',
    //  path : dirs.DocumentDir + '/demo.csv'
      //path :  dirs.DownloadDir
    })
    .fetch('GET',
    GLOBAL.BASE_URL + url+ val,
    {
        'Content-Type': 'application/json',
        'Authorization' :  global.TokenType +" "+ global.Token,
        'Accept': 'application/json',
        'accessCode': GLOBAL.ACESS_CODE,
    },

    )
    .then((res) => {
      // the temp file path
      hideLoader()
      let status = res.info().status;
      if(status == 200) {
      console.log(res.info())
      console.log(res.text())
      console.log(res.json())
      console.log('The file saved to ', res)


         setTimeout(() => {
      Platform.OS === 'android' ? self.shareApp(res.data) : self.shareApp(res.data)
    }, 300);


    }
    else {
      hideLoader()

        if(status == 422) {
          self.setState({ showAlert: true,showAlertMessage : Localized.t('ReportPage.Pleaseentercustomdatesfordownload')});
        }
        else {
          self.setState({ showAlert: true,showAlertMessage : Localized.t('ReportPage.Please try after some time')});
        }
      console.log("MCVC :" +res)
      console.log(res.info())
      console.log(res.text())

    }
      //console.log('The file saved to ', res.path())
    })


  }

  shareApp = (path) =>{

      let  text = 'Hesabe Merchant Details \n\n'

      if(Platform.OS === 'android')
      {
        var shareOptions = {
          title: 'title.csv',
          message: 'Share Invoice',
          subject: 'Share Invoice',
          url: "file://" + path,
          type: "text/csv",
          saveToFiles: true,
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
        //  message: text,
          url:  path,
          type: "text/csv"
          //  url: `data:image/png;base64,${this.state.base64}`,

      }, {
          // Android only:
          dialogTitle: 'Hesabe Merchant App',
          // iOS only:
          excludedActivityTypes: []
      })
    }
  }

  onPressAlertPositiveButton = () => {

    this.setState({showAlert: false}, () => {

    });


    };


    illustratorReceiveData(searchValue)
     {

      this.toggleillustratorPress(false)

     }

      toggleillustratorPress(visible) {
      this.setState({ illustratorVisible: visible });

      }



  HideToolTipModal(visible) {
   AsyncStorage.setItem('ReportToolTipFlag',"True")
    this.setState({
      toolTipListVisible :false,
      toolTipDownloadVisible :false,
      toolTipFilterVisible :false,
      toolTipIndexVisible :false,
     });
  }
   toggleToolTipModal(visible) {
    this.setState({
       toolTipListVisible :  visible == 'List' ? false : false ,
       toolTipDownloadVisible : visible == 'Download'  ? true : false  ,
       toolTipFilterVisible : visible == 'Filter' ? true : false,
       toolTipIndexVisible : visible == 'Index' ? true : false
     });

  }


  selectionOnPress(userType) {
    this.setState({ selectedButton: userType });
  }




  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  toggleFilterModal(visible) {
    //this.setState({ filterVisible: visible });
    //this.passDataToFilterModal("ReportPayment")

    if(this.state.activeIndex1 === 0)
    {
      this.props.navigation.navigate('FilterScreen',{onSelectFilter:this.filterReceiveData,
       example : {"PaymentStatus":this.state.listFilterPaymentStatus,"PaymentMethod" :
         this.state.listFilterPaymentMethod,"ServiceType" :this.state.listFilterServiceType,"FromDate" : this.state.listFilterSelectedFromDate  ,"ToDate" : this.state.listFilterSelectedToDate,
         "fromView" : 'PaymentList',"ClearAll" : this.state.FilterClear,"SubType" : this.state.carouselItems[this.state.activeIndex].title}})
    }
    else if (this.state.activeIndex1 === 1) {

      this.props.navigation.navigate('FilterScreen',{onSelectFilter:this.filterReceiveData,
       example : {"PaymentStatus":this.state.refundFilterPaymentStatus,"PaymentMethod" :
         this.state.refundFilterPaymentMethod,"ServiceType" :this.state.refundFilterServiceType,"FromDate" : this.state.refundFilterSelectedFromDate  ,"ToDate" : this.state.refundFilterSelectedToDate,
         "fromView" : 'RefundRequest',"ClearAll" : this.state.FilterClear}})

    }
    else if (this.state.activeIndex1 === 2) {
      this.props.navigation.navigate('FilterScreen',{onSelectFilter:this.filterReceiveData,
       example : {"PaymentStatus":this.state.transferFilterPaymentStatus,"PaymentMethod" :
         this.state.transferFilterPaymentMethod,"ServiceType" :this.state.transferFilterServiceType,"FromDate" : this.state.transferFilterSelectedFromDate  ,"ToDate" : this.state.transferFilterSelectedToDate,
         "fromView" : 'PaymentTransfer',"ClearAll" : this.state.FilterClear}})
    }
    else {
      this.props.navigation.navigate('FilterScreen',{onSelectFilter:this.filterReceiveData,
       example : {"PaymentStatus":this.state.captureFilterPaymentStatus,"PaymentMethod" :
         this.state.captureFilterPaymentMethod,"ServiceType" :this.state.captureFilterServiceType,"FromDate" : this.state.captureFilterSelectedFromDate  ,"ToDate" : this.state.captureFilterSelectedToDate,
         "fromView" : 'CaptureRequests',"ClearAll" : this.state.FilterClear,"SubType" : this.state.carouselCaptureItems[this.state.activeIndex].title}})
    }


  }

reportDetailReceiveData(ReportValue)
{
   console.log('Received Data ' + ReportValue)
   this.getCaptureDetails(true);
}

  filterReceiveData(filterValue)
  {
     console.log('Received Data ' + filterValue.ServiceType)

     const filterFromDate =  filterValue.FromDate.length != 0 ? filterValue.FromDate.split('/') : ''
     const  filterToDate = filterValue.ToDate.length != 0 ?  filterValue.ToDate.split('/') : ''


     if(this.state.activeIndex1 === 0)
     {

       this.setState({
         listFilterFromDate  : filterFromDate.length != 0 ? filterFromDate[2] + "-" + filterFromDate[1] + "-" + filterFromDate[0] : '' ,
         listFilterToDate    : filterToDate.length !=0 ? filterToDate[2] + "-" + filterToDate[1] + "-" + filterToDate[0] : '',
         listFilterPaymentMethod : filterValue.PaymentMethod ,
         listFilterPaymentStatus  : filterValue.PaymentStatus,
         listFilterServiceType  : filterValue.ServiceType,
         listFilterEmployeeId : filterValue.EmployeeID,
         listFilterSelectedFromDate  : filterValue.FromDate,
         listFilterSelectedToDate  : filterValue.ToDate,

         filterVisible: false ,
        }, () => {
            this.getReportDetail(true)
            })
     }
     else if (this.state.activeIndex1 === 1) {

       this.setState({
         refundFilterFromDate  : filterFromDate.length != 0 ? filterFromDate[2] + "-" + filterFromDate[1] + "-" + filterFromDate[0] : '' ,
         refundFilterToDate    : filterToDate.length !=0  ? filterToDate[2] + "-" + filterToDate[1] + "-" + filterToDate[0] : '',
         refundFilterPaymentMethod : filterValue.PaymentMethod ,
         refundFilterPaymentStatus  : filterValue.PaymentStatus,
         refundFilterServiceType  : filterValue.ServiceType,
         refundFilterEmployeeId : filterValue.EmployeeID,
         refundFilterSelectedFromDate  : filterValue.FromDate,
         refundFilterSelectedToDate  : filterValue.ToDate,

         filterVisible: false ,
        }, () => {
            this.getRefundDetails(true)
            })

     }
     else if (this.state.activeIndex1 === 2) {
       this.setState({
         transferFilterFromDate   : filterFromDate.length != 0 ? filterFromDate[2] + "-" + filterFromDate[1] + "-" + filterFromDate[0] : '' ,
         transferFilterToDate    : filterToDate.length !=0  ? filterToDate[2] + "-" + filterToDate[1] + "-" + filterToDate[0] : '',
         transferFilterPaymentMethod : filterValue.PaymentMethod ,
         transferFilterPaymentStatus  : filterValue.PaymentStatus,
         transferFilterServiceType  : filterValue.ServiceType,
         transferFilterEmployeeId : filterValue.EmployeeID,
         transferFilterSelectedFromDate  : filterValue.FromDate,
         transferFilterSelectedToDate  : filterValue.ToDate,

         filterVisible: false ,
        }, () => {
            this.getPaymentTransferDetail(true)
            })
     }
     else {

       this.setState({
         captureFilterFromDate  : filterFromDate.length != 0 ? filterFromDate[2] + "-" + filterFromDate[1] + "-" + filterFromDate[0] : '' ,
         captureFilterToDate    : filterToDate.length !=0 ? filterToDate[2] + "-" + filterToDate[1] + "-" + filterToDate[0] : '',
         captureFilterPaymentMethod : filterValue.PaymentMethod ,
         captureFilterPaymentStatus  : filterValue.PaymentStatus,
         captureFilterServiceType  : filterValue.ServiceType,
         captureFilterEmployeeId : filterValue.EmployeeID,
         captureFilterSelectedFromDate  : filterValue.FromDate,
         captureFilterSelectedToDate  : filterValue.ToDate,

         filterVisible: false ,
        }, () => {
            this.getCaptureDetails(true)
            })
     }


     //this.setState({filterType: filterValue});
   }

 searchReceiveData(searchValue)
  {
     var screenValue = this.state.activeIndex1 === 0 ? 'PaymentList'  :
       this.state.activeIndex1 === 1 ? 'RefundRequest'  : this.state.activeIndex1 === 2 ? 'PaymentTransfer' : 'CaptureRequests'
      console.log(searchValue);
     if(this.state.activeIndex1 === 2)
     {
       this.props.navigation.navigate('ReportDetailsScreen',{something:searchValue,Type :"Success",fromView :'Report' ,ReportType :screenValue})
     }
     else {

       searchValue.subname3 == Localized.t("CommanTabPage.Success") || searchValue.subname3 == Localized.t("CommanTabPage.Authorized") || searchValue.subname3 == Localized.t("CommanTabPage.Cancelled") ? this.props.navigation.navigate('ReportDetailsScreen',{something:searchValue,Type :"Success",fromView :'Report' ,ReportType :screenValue,onSelectReport:this.reportDetailReceiveData})
       : searchValue.subname3 == Localized.t("CommanTabPage.Failure")  ?  this.props.navigation.navigate('ReportDetailsScreen',{something:searchValue,Type :"Failed",fromView :'Report' ,ReportType :screenValue })
       : searchValue.subname3 == Localized.t("CommanTabPage.Pending") || searchValue.subname3 == Localized.t("ReportDetailPage.Rejected") ?  this.props.navigation.navigate('ReportDetailsScreen',{something:searchValue,Type :"RefundPending",fromView :'Report' ,ReportType :screenValue })
        :  this.props.navigation.navigate('ReportDetailsScreen',{something:searchValue,Type :"RefundComplete",fromView :'Report' ,ReportType :screenValue })
     }


     //this.setState({filterType: filterValue});

   }

   searchFilter(searchValue)
  {
     console.log('mkmkm :' + searchValue);
    this.setState({
      searchData: searchValue
    }, () => {



      this.state.activeIndex1 === 0 ?  this.getReportDetail(true) : this.state.activeIndex1 === 1 ?  this.getRefundDetails(true) : this.state.activeIndex1 === 2 ? this.getPaymentTransferDetail(true) :this.getCaptureDetails(true) ;
     });


  }

   searchEndLoading(searchValue)
  {
        console.log(searchValue);
      //  this.getReportDetail();

  }

  HideSearchToolTipModal()
  {
    this.HideToolTipModal()
  }



  _renderItem({item,index}){
     const isDarkMode = this.context === 'dark';
     const { activeIndex } = this.state;
         return (
           <View style={{
               backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK  : GLOBAL.COLOR.WHITE,
               borderRadius: 10,
               height: 80,
               padding:0,
               marginLeft: 15,
               marginRight: 15,
               borderWidth : isDarkMode ? 1  : 0,
               borderColor : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.WHITE
             }}>

               <View
               style={{
                 justifyContent: 'space-between',
                 flexDirection: "row",
                 padding: 0,
                 height : '100%',
                 alignItems : "center",
               }}>

               <View
               style={{
                 justifyContent: 'space-between',
                 flexDirection: "column",
                 padding: 0,
                 //height : 40,
                 width : '95%',
                 alignItems : "flex-start",
               }}>

             <Text style={{fontSize:  RFValue(17),  color : activeIndex === index
   					? GLOBAL.COLOR.ORANGE
   					: GLOBAL.COLOR.DARKGRAY,padding : 10,width :'100%',textAlign : 'left'}}>{Localized.t('ReportPage.'+(item.title))}</Text>

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
               flexDirection: "row",
               padding: 10,
               width : '100%',
               alignItems : "center",

             }}>
               <Text style={{fontSize:  RFValue(15),color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY,textAlign : 'left'}}>{item.Unit + " "}</Text>
              <Text style={{fontSize:  RFValue(15),color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKBLUE,alignSelf: 'flex-end'}}>{item.text + " "}</Text>
           </View>

            </View>

            <Image
            style={styles.icon1}
            source = {require('./Assest/reportSideBG.png')} />
            </View>
           </View>
         )
     }


     get pagination () {
             const { carouselItems,carouselTransferItems,carouselRefundItems,carouselCaptureItems,activeIndex } = this.state;
             return (
                 <Pagination
                   dotsLength={this.state.activeIndex1 === 0 ? carouselItems.length : this.state.activeIndex1 === 1 ? carouselRefundItems.length : this.state.activeIndex1 === 2  ?  carouselTransferItems.length : carouselCaptureItems.length}
                   activeDotIndex={activeIndex}
                   //containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                   dotStyle={{
                       width: 15,
                       height: 10,
                       borderRadius: 2,
                       marginHorizontal: 8,
                       backgroundColor: 'rgba(255, 128, 86, 1)'
                   }}
                   inactiveDotStyle={{

                         width: 15,
                         height: 10,
                         borderRadius: 2,
                         marginHorizontal: 8,
                         backgroundColor: 'rgba(255, 255, 255, 0.92)'


                       // Define styles for inactive dots here
                   }}
                   inactiveDotOpacity={0.92}
                   inactiveDotScale={1}
                 />
             );
         }

         _renderItem1({item,index}){
           const isDarkMode = this.context === 'dark';
            const { activeIndex1 } = this.state;
            console.log(item.index);
                return (
                  <View style={{
                      //borderRadius: 10,
                      height: 50,
                      //marginTop : 10,
                     //padding:10,
                      marginLeft: -10,
                      //marginRight: 15,\
                    justifyContent : 'center',
                    alignItems : 'center' }}>
                  <Text style={{fontSize:  RFValue(17),fontFamily : 'Prompt-SemiBold',color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,textAlign :'center' }}>{Localized.t('ReportPage.'+(item.title)).toUpperCase()}</Text>

                  </View>
                )
            }



    slideNext = () =>
    {
      this.carouselRef.snapToNext()
      this.carousel.snapToItem (0, animated = true, fireCallback = true)
      //this.state.activeIndex1 === 0 ?  this.getReportDetail(true) :  this.state.activeIndex1 === 1 ?  this.getRefundDetails(true) : this.getPaymentTransferDetail(true)
    }

    slidePrev = () =>
    {
      this.carouselRef.snapToPrev()
        this.carousel.snapToItem (0, animated = true, fireCallback = true)
      //this.state.activeIndex1 === 0 ?  this.getReportDetail(true) :  this.state.activeIndex1 === 1 ?  this.getRefundDetails(true) : this.getPaymentTransferDetail(true)
    }


    _onRefresh = () =>{
         console.log('refresh started');
        this.setState({refreshing :true})
        this.state.activeIndex1 === 0 ?  this.getReportDetail(true) :  this.state.activeIndex1 === 1 ?  this.getRefundDetails(true) : this.state.activeIndex1 === 2 ? this.getPaymentTransferDetail(true) : this.getCaptureDetails(true)


    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
     return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
   };


  render(){
     const screenWidth = Dimensions.get("window").width;
     const isDarkMode = this.context === 'dark';
    return(
      <View style={{ flex: 1,  backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.PURPLESHADE}}>
      <View
      style={{
          flex: 1,
        //alignItems: 'center',
      //  justifyContent: 'center',
        marginTop : 10,
      }}>


      <Tooltip
      animated={true}
      // (Optional) When true, tooltip will animate
      // in/out when showing/hiding
      arrowSize={{ width: 16, height: 8 }}
      // (Optional) Dimensions of arrow bubble pointing to
      // the highlighted element
      backgroundColor="rgba(0,0,0,0.5)"
      contentStyle = {{borderRadius : 15}}

      arrowStyle = {{marginLeft : 30,alignItems : 'flex-start'}}
      // (Optional) Color of the fullscreen background
      isVisible={this.state.toolTipListVisible}
      showChildInTooltip = {true}
      //(Must) When true, tooltip is displayed
      content={

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "column",
          //	padding : 15,
          //height : 40,
          //	alignItems : "center",
        }}>
        <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.SelectReport')}</Text>
        <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.ListMessage')}</Text>



        <View style={{
          alignItems : 'center',
          marginTop :30,
          marginLeft : 0,
          flexDirection: "row",
          justifyContent:  'space-evenly' ,
          //  width : '100%',
        }}>

        <View style={{
          justifyContent: 'flex-start',

        }}>

        <CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
        />
        </View>

        <View style={{
          justifyContent: 'flex-end',
        }}>
        <CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('Download')} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}
        />
        </View>
        </View>
        </View>


      }
      //(Must) This is the view displayed in the tooltip
      placement="bottom"
      //(Must) top, bottom, left, right, auto.
      //(Optional) Callback fired when the user taps the tooltip
      >


      <View
      style={{
        justifyContent: 'space-between',
        marginTop :'5%',
        flexDirection: "row",
        padding: 10,
        //height : 40,
        backgroundColor : this.state.toolTipListVisible == true ? GLOBAL.COLOR.WHITE : 'transparent',
        borderRadius : 20,
        alignItems : "center",

      }}>
      <View >
      <TouchableOpacity
      style={[styles.button3]}
      disabled={this.state.activeIndex1 == 0 ? true :false}
      onPress={() => this.state.activeIndex1 == 0 ? null : this.slidePrev()}>
      <Image style={{...styles.icon,...{opacity: this.state.activeIndex1 == 0 ? 0.3 : 1,borderRadius : 5}}} source={global.selectValue == 'en' ? require('./Assest/leftArrow.png') : require('./Assest/rightArrow.png')} />
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'column', justifyContent: 'center',alignItems : 'center'}}>
          <Carousel
            layout={"default"}
            ref={ref => this.carouselRef = ref}
            data={this.state.carouselItems1}
            sliderWidth={screenWidth-100}
            itemWidth={250}
            renderItem={this._renderItem1}
            scrollEnabled={false}
            onSnapToItem={(index) => {
            this.setState({activeIndex1:index,activeIndex : 0})
            index === 0 ? this.state.PaymentListPermission == true ? this.getReportDetail(true) : null :  index === 1 ? this.state.RefundRequestPermission == true ? this.getRefundDetails(true) : null : index === 2 ? this.state.PaymentTransferPermission == true ? this.getPaymentTransferDetail(true) : null :  this.state.CaptureRequestsPermission == true ? this.getCaptureDetails(true) : null
          }}

          />

      </View>



      <TouchableOpacity
      style={styles.button3}
      disabled={this.state.activeIndex1 == this.state.carouselItems1.length-1 ? true :false}
      onPress={() => this.state.activeIndex1 == this.state.carouselItems1.length-1 ? null : this.slideNext()}>
      <Image style={{...styles.icon,...{opacity: this.state.activeIndex1 == this.state.carouselItems1.length-1 ? 0.3 : 1}}} source={global.selectValue == 'en' ? require('./Assest/rightArrow.png') : require('./Assest/leftArrow.png')} />
      </TouchableOpacity>
      </View>
      </Tooltip>


      <SafeAreaView style={{ backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.PURPLESHADE, paddingTop: 50,
      display : this.state.activeIndex1 === 0 ? this.state.PaymentListPermission == true ? null : 'none'
              : this.state.activeIndex1 === 1 ? this.state.RefundRequestPermission == true ? null : 'none'
               : this.state.activeIndex1 === 2 ?this.state.PaymentTransferPermission == true ? null : 'none'
               : this.state.CaptureRequestsPermission == true ? null : 'none'
         }}>
              <View style={{flexDirection:'column', justifyContent: 'center', }}>
                  <Carousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.activeIndex1 === 0 ? this.state.carouselItems :  this.state.activeIndex1 === 1 ? this.state.carouselRefundItems : this.state.activeIndex1 === 2 ?  this.state.carouselTransferItems : this.state.carouselCaptureItems}
                    sliderWidth={390}
                    itemWidth={250}
                    renderItem={this._renderItem}
                    onSnapToItem = { index => this.setState({activeIndex:index}) } />

            { this.pagination }

              </View>

              <View style={{ backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE, marginTop : 0,width : '100%',borderRadius : 20 }}>

              <ScrollView  contentContainerStyle={{paddingBottom: 500}}
              refreshControl ={
              <RefreshControl
               refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
               title={ I18nManager.isRTL ? "جار التحميل..." : "Loading..."}
               />
              }
              onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  console.log("Reached end of page");
                  if(this.state.scrollRefreshing == false)
                  {
                      this.setState({scrollRefreshing :true})

                    if(this.state.activeIndex1 === 0 )
                    { if(this.state.PaymentListArray.length > 1 ) {this.getReportDetail(false)} }
                    else if(this.state.activeIndex1 === 1 )
                    { if(this.state.PaymentRefundArray.length > 1 ){ this.getRefundDetails(false)} }
                    else if(this.state.activeIndex1 === 2 )
                    {if(this.state.PaymentTransferArray.length > 1 ){this.getPaymentTransferDetail(false)}}
                    else
                    {if(this.state.PaymentCaptureArray.length > 1 ){this.getCaptureDetails(false)}}
                  }

                }
              }}
              scrollEventThrottle={400}
              >
                 <View
                  style={{
                    justifyContent: 'space-between',
                    marginTop :20,
                    flexDirection: "row",
                    //height : 40,
                    alignItems : "flex-start",
                    height : 50
                  }} >

                    {

                       this.state.carouselItems1.map((item, index) => (
                          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(17),marginLeft : 20,marginTop : 5,display :  index == this.state.activeIndex1 ? null : 'none'}}>
                             {Localized.t('ReportPage.'+item.title)}
                          </Text>

                       ))
                    }

                    <View
                     style={{
                       justifyContent: 'space-evenly',
                       flexDirection: "row",
                       alignItems : "center",
                     }} >


                     <Tooltip
                     animated={true}
                     // (Optional) When true, tooltip will animate
                     // in/out when showing/hiding
                     arrowSize={{ width: 16, height: 8 }}
                     // (Optional) Dimensions of arrow bubble pointing to
                     // the highlighted element
                     backgroundColor="rgba(0,0,0,0.5)"
                     contentStyle = {{borderRadius : 15}}
                     arrowStyle = {{marginLeft : 0}}
                     showChildInTooltip = {true}

                     // (Optional) Color of the fullscreen background
                     isVisible={this.state.toolTipDownloadVisible}
                     //(Must) When true, tooltip is displayed
                     content={

                       <View
                       style={{
                         justifyContent: 'space-between',
                         marginTop :0,
                         flexDirection: "column",
                         	//padding : 15,
                          backgroundColor : GLOBAL.COLOR.WHITE
                         //height : 40,
                         //	alignItems : "center",
                       }}>
                       <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.Allinformationinonefile')}</Text>
                       <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.DownloadMessage')}</Text>



                       <View style={{
                         alignItems : 'center',
                         marginTop :30,
                         marginLeft : 0,
                         flexDirection: "row",
                         justifyContent:  'space-evenly' ,
                         //  width : '100%',
                       }}>

                       <View style={{
                         justifyContent: 'flex-start',

                       }}>

                       <CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
                       />
                       </View>

                       <View style={{
                         justifyContent: 'flex-end',
                       }}>
                       <CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('Filter')} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}
                       />
                       </View>
                       </View>
                       </View>


                     }
                     //(Must) This is the view displayed in the tooltip
                     placement="bottom"
                     //(Must) top, bottom, left, right, auto.
                     //(Optional) Callback fired when the user taps the tooltip
                     >

                  <View style = {{backgroundColor : this.state.toolTipDownloadVisible == true ? GLOBAL.COLOR.WHITE : 'transparent'  ,borderRadius : 10,width : 35,height : 35,padding : 5,marginRight  : global.selectValue == 'en' ? 5 :10}}>
                  <TouchableOpacity
                  onPress={() => this.downloadReport()}
                  >
                  <FeatherIcons name="download" color=  {this.state.toolTipDownloadVisible == true ? 'black' : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE } size={25} style={styles.icon5}/>
                  </TouchableOpacity>
                  </View>
                  </Tooltip>


                  <Tooltip
                  animated={true}
                  // (Optional) When true, tooltip will animate
                  // in/out when showing/hiding
                  arrowSize={{ width: 16, height: 8 }}
                  // (Optional) Dimensions of arrow bubble pointing to
                  // the highlighted element
                  backgroundColor="rgba(0,0,0,0.5)"
                  contentStyle = {{borderRadius : 15}}
                  arrowStyle = {{marginLeft : 0}}
                  showChildInTooltip = {true}
                  // (Optional) Color of the fullscreen background
                  isVisible={this.state.toolTipFilterVisible}
                    //isVisible={false}
                  //(Must) When true, tooltip is displayed
                  content={

                    <View
                    style={{
                      justifyContent: 'space-between',
                      marginTop :0,
                      flexDirection: "column",
                      	//padding : 15
                      //height : 40,
                      //	alignItems : "center",
                    }}>
                    <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.FilterOption')}</Text>
                    <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.FilterMessage')}</Text>



                    <View style={{
                      alignItems : 'center',
                      marginTop :30,
                      marginLeft : 0,
                      flexDirection: "row",
                      justifyContent:  'space-evenly' ,
                      //  width : '100%',
                    }}>

                    <View style={{
                      justifyContent: 'flex-start',

                    }}>

                    <CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
                    />
                    </View>

                    <View style={{
                      justifyContent: 'flex-end',
                    }}>
                    <CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('Index')} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}
                    />
                    </View>
                    </View>
                    </View>


                  }
                  //(Must) This is the view displayed in the tooltip
                  placement="bottom"
                  //(Must) top, bottom, left, right, auto.
                  //(Optional) Callback fired when the user taps the tooltip
                  >
                  <TouchableOpacity
                  onPress={() => this.toggleFilterModal(true)}>
                  <Image style={styles.icon2} source={require('./Assest/slider.png')} />
                  </TouchableOpacity>
                  </Tooltip>

                  </View>
                  </View>



               <Tooltip
               animated={true}
               // (Optional) When true, tooltip will animate
               // in/out when showing/hiding
               arrowSize={{ width: 16, height: 8 }}
               // (Optional) Dimensions of arrow bubble pointing to
               // the highlighted element
               backgroundColor="rgba(0,0,0,0.5)"
               contentStyle = {{borderRadius : 15}}
               showChildInTooltip = {true}
               arrowStyle = {{marginLeft : 0}}
               // (Optional) Color of the fullscreen background
              // isVisible={this.state.toolTipIndexVisible}
              //  isVisible={this.state.toolTipIndexVisible}
                  isVisible={false}
               //(Must) When true, tooltip is displayed
               content={

                 <View
                 style={{
                   justifyContent: 'space-between',
                   marginTop :0,
                   flexDirection: "column",
                   	padding : 15
                   //height : 40,
                   //	alignItems : "center",
                 }}>
                 <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left'}}>{Localized.t('ToolTipPage.ReportDetails')}</Text>
                 <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left'}}>{(Localized.t('ToolTipPage.ReportMessage').replace("â", "'")).replace("â", "'")}</Text>



                 <View style={{
                   alignItems : 'center',
                   marginTop :30,
                   marginLeft : 0,
                   flexDirection: "row",
                   justifyContent:  'space-evenly' ,
                   //  width : '100%',
                 }}>



                 <View style={{
                   justifyContent: 'center',
                 }}>
                 <CustomButton title=  { Localized.t('ToolTipPage.GotIt') }  onPress={() => this.HideToolTipModal()} style = {{width : 150}}
                 />
                 </View>
                 </View>
                 </View>


               }
               //(Must) This is the view displayed in the tooltip
               placement="top"
               //(Must) top, bottom, left, right, auto.
               //(Optional) Callback fired when the user taps the tooltip
               >

                  <SearchList example = {this.state.activeIndex1 === 0 ? 'PaymentList' + "-" + (this.state.activeIndex == 2 ? 'SMSPayment' : this.state.carouselItems[this.state.activeIndex].title) :
                    this.state.activeIndex1 === 1 ? 'RefundRequest' + "-" + this.state.carouselRefundItems1[this.state.activeIndex].title : this.state.activeIndex1 === 2 ?  'PaymentTransfer' + "-" + this.state.carouselTransferItems[this.state.activeIndex].title : 'CaptureRequests' + "-" + this.state.carouselCaptureItems[this.state.activeIndex].title}
                    exampleArray = {this.state.activeIndex1 === 0 ? this.state.PaymentListArray
                      : this.state.activeIndex1 === 1 ? this.state.PaymentSearchRefundArray.length != 0 ? this.state.PaymentSearchRefundArray : this.state.PaymentRefundArray
                       : this.state.activeIndex1 === 2 ? this.state.PaymentSearchTransferArray.length != 0  ? this.state.PaymentSearchTransferArray   :this.state.PaymentTransferArray
                         : this.state.PaymentSearchCaptureArray.length != 0 ? this.state.PaymentSearchCaptureArray : this.state.PaymentCaptureArray} showToolTip = {this.state.toolTipIndexVisible} onSelectSearch={this.searchReceiveData} onEndSearch={this.searchEndLoading} onSearchFilter={this.searchFilter}  onhideTooTip = {this.HideSearchToolTipModal}/>

                 </Tooltip>

                  </ScrollView>
                    </View>
      </SafeAreaView>
      <View style  = {{display : this.state.activeIndex1 === 0 ? this.state.PaymentListPermission == true ? 'none' : null
                               : this.state.activeIndex1 === 1 ? this.state.RefundRequestPermission == true ? 'none' : null
                               : this.state.PaymentTransferPermission == true ? 'none' : null,
                        height : '100%'
            }}>
      <AccessDeniedScreen example = {true}/>
      </View>
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
        </View>

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
         <IllustratorScreen example = {{'index' :  3 ,'value' : ''}} isDarkMode = {isDarkMode} onOKClick={this.illustratorReceiveData}/>
        </ModalContent>
       </IllustratorModals.BottomModal>
        </View>

      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      //flex: 2,
      backgroundColor: '#EEEEEE',
      paddingTop:0,
    },
    icon:{
      width:40,
      height:40,
    },
    icon1:{
      width:10,
      height:'100%',
      alignItems: 'center',
      justifyContent : 'flex-end',
    },
    icon2:{
      width:50,
      height:40,
      marginTop : -5,

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
    },
    icon5:{
      width:35,
      height:35,
      marginTop : 0,
      //  alignItems: 'center',
    },
    image: {
      width: 100,
      height:100,
      marginTop : 20,
      marginLeft : 10,
    },
    box: {
      marginTop:10,
      backgroundColor: GLOBAL.COLOR.WHITE,
      flexDirection: 'row',
      shadowColor: 'black',
      shadowOpacity: .2,
      shadowOffset: {
        height:1,
        width:-2
      },
      elevation:2
    },
    button: {
      alignItems: 'flex-start',
      color : GLOBAL.COLOR.RED,
      width: 100,
      //  marginBottom: 36,
    },
    button1: {
      alignItems: 'flex-end',
      //backgroundColor: '#DDDDDD',
      //  padding: 10,
      width: 150,
      //  marginBottom: 36,
    },
    button2: {
      alignItems: 'center',
      backgroundColor: '#0098E1',
      padding: 10,
      width: '100%',
      //  marginBottom: 36,
    },
    button3: {
      alignItems: 'center',
      //  padding: 10,
      //  width: 150,
      //  marginBottom: 36,
    },
    button4: {
      justifyContent: 'center',
      alignItems : 'center',
      backgroundColor: GLOBAL.COLOR.LIGHTPURPLE,
      padding: 5,
      width: '32%',
      height: 35,
      borderRadius : 10
      //  marginBottom: 36,
    },
    button5: {
      alignItems: 'flex-start',
      //  padding: 10,
      //  width: 150,
      //  marginBottom: 36,
    },
    button6: {
      justifyContent: 'center',
      alignItems : 'center',
      backgroundColor: GLOBAL.COLOR.ORANGE,
      padding: 5,
      width: '40%',
      height: 45,
      borderRadius : 20

      //  marginBottom: 36,
    },
    info: {
      flex:1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft : 20,
      justifyContent: 'center',
    },
    name: {
      fontSize: RFValue(20),
      marginTop:10,
      color: '#333'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 0,
      marginTop:0
    },
    iconContainer: {
      flex: 1,
      alignItems:'flex-end',
      marginRight:20,

    },
    iconFonts: {
      color: 'gray',
    },
    red: {
      color: '#FF4500',
    },
    modal: {
      flex: 1,
    //	alignItems: 'center',
      backgroundColor: GLOBAL.COLOR.WHITE,
      padding: 0,
    },
  });
