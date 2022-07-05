import rectImg from './Assest/rectangle.png';
import grayrectImg from './Assest/calender.png';
import ArrowUP from './Assest/arrowUp.png';
import ArrowDown from './Assest/dropArrow.png';
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,RefreshControl,I18nManager,AppState,Linking} from 'react-native';
//import Panel from '../../components/Panel';
import CustomView from '../../components/CustomView';
import SearchList from '../../components/SearchableList';
import Localized from '../../locales'
//import FilterList from '../../components/FilterScreen';
//import CalenderScreen from '../../components/CalenderScreen';

import { PieChart} from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, G,Rect } from "react-native-svg";
import Modal from 'react-native-modal';
import * as scale from 'd3-scale';
import {CalendarList} from 'react-native-calendars';
import Modals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

import CalenderModals from 'react-native-modals';
import { format,parseISO } from 'date-fns';
import { Modalize } from 'react-native-modalize';

import API from '../../utils/API';
const GLOBAL = require('../../utils/Globals');
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import {currencyFormat } from '../../utils/GlobalFunction';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';


export default class InvoiceScreen extends Component {
  constructor(props){
    super(props);
    this.selectionOnPress = this.selectionOnPress.bind(this);
    this.filterReceiveData = this.filterReceiveData.bind(this);
    this.searchReceiveData = this.searchReceiveData.bind(this);
    this.searchEndLoading = this.searchEndLoading.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.calenderReceiveData = this.calenderReceiveData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onBackSelect = this.onBackSelect.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.state = {
      isHidden:false,
      selectedButton: "QUICK",
      calenderVisible: false,
      filterVisible: false,
      selectedOpenStatus: "All",
      selectedOpenPaymentStatus: "All",
      selectedOpenPaymentMethod: "ALL",
      selectedOpenEmployeeID : "",
      selectedQuickPaymentStatus: "All",
      selectedQuickPaymentMethod: "ALL",
      selectedQuickEmployeeID : "",
      selectedOrderDetailPaymentStatus: "All",
      selectedOrderDetailPaymentMethod: "ALL",
      selectedOrderDetailEmployeeID : "",
      selectedFromDate : "",
      selectedToDate : "",
      calendarFromDate : "",
      calendarToDate :"",
      searchData : '',
      Quickpage : 1,
      OrderDetailpage : 1,
      Openpage : 1,
      OpenFilterClear : false,
      QuickFilterClear : false,
      OrderDetailFilterClear : false,
      modalFilterData:null,
      modalCalenderData:false,
      selectedDayTitle: "Today",
      selectedCurrentDate: '',
      QuickInvoiceListArray : [],
      OpenInvoiceListArray : [],
      OrderDetailInvoiceListArray : [],
      refreshing : false,
      scrollRefreshing : false,
      openLastindex : false,
      quickLastindex : false,
      OrderDetailLastindex : false,
      selectedSlice: {
        label: '',
        value: 0
      },
      graphArray : [],
      labelWidth: 0,
      searchRefresh : false,
      paidCount : '',
      unPaidCount : '',
      cancelledCount : '',
      refundCount : '',
      showQuickInvoiceFlag : false,
      showOpenInvoiceFlag : false,
      showOrderDetailInvoiceFlag : false,
    };


  }




  componentWillUnmount() {
  Linking.removeEventListener('url', this.handleOpenURL);
}

handleOpenURL(event) {
 console.log("Linking:" +  event.url);
 if(event.url.includes("OPEN"))
 {
 this.selectionOnPress("OPEN");
 }
 else {
   this.selectionOnPress("QUICK");
 }

}


  static contextType = DarkModeContext;
  calendarmodal = React.createRef();
  opencalendarModal = () => {
      if (this.calendarmodal.current) {
        this.calendarmodal.current.open();
      }
    };

  closecalendarModal = () => {
        if (this.calendarmodal.current) {
          this.calendarmodal.current.close();
        }
      };


      loadView()
      {
        global.serviceType.map((item, index) => {

          if(item.id == 2)
          {
            this.setState({
            showQuickInvoiceFlag: true
           })
          }

          if(item.id == 7)
          {
            this.setState({
            showOpenInvoiceFlag: true
           })
          }
        })
      }

      getPermissionAccess()
      {
          console.log('cvcv starting');

          var list = {};
          if(global.employeePermission != null)
          {
          global.employeePermission.map((y) => {

                if(y.id == 2)
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


               if(arr[0].id == 9)
               {
                  arr[0].status == true ?  this.setState({ showQuickInvoiceFlag: true }) :  this.setState({ showQuickInvoiceFlag: false });
               }

         }
         else {
           this.setState({ showQuickInvoiceFlag: false });
         }


                console.log(arr);
                //console.log(arr[1].id);


        }



        getQuickInvoiceDetail(status) {


          if(status)
          {


              this.setState({
                Quickpage: 1,
                QuickInvoiceListArray : [],
                quickLastindex : false,
                searchRefresh : true
             }, () => {
                this.getQuickInvoiceDetail1(true)
              });
          }
          else {
            this.getQuickInvoiceDetail1(false)
            this.setState({ searchRefresh : false})
          }
        }

      getQuickInvoiceDetail1(status) {

      /*  if(status)
        {
            this.setState({
              Quickpage: 1,
              QuickInvoiceListArray : [],
              quickLastindex : false,
              searchRefresh : true
            });
        }
        else {
           this.setState({ searchRefresh : false})
        }*/

        var self = this;

        var a = {  'search' : self.state.searchData }
        var b = { 'status':   self.state.selectedQuickPaymentStatus === "UnPaid" ? '0' : self.state.selectedQuickPaymentStatus === "Paid" ? '1' : '3'}
        var c = { 'employee':  self.state.selectedQuickEmployeeID}
        var e = { 'timeline'  : self.state.selectedDayTitle == 'Today' ? '1' : self.state.selectedDayTitle == 'Last7Days' ? '2' : self.state.selectedDayTitle.length != 0 ? '3' : ''}
        var f = { 'fromDate'  : self.state.selectedDayTitle.length != 0 ? '' : self.state.calendarFromDate}
        var j = { 'toDate'    : self.state.selectedDayTitle.length != 0 ? '' : self.state.calendarToDate}


        //var z = { 'paymentTypeId': self.state.selectedQuickPaymentMethod === "KNET" ? '1' : '2'}


        var parm1 = {
          'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


        if(self.state.searchData.length != 0)
        {
          parm1 = Object.assign({},a,parm1)
        }

        if(self.state.selectedQuickPaymentStatus != "All")
        {
        parm1 =  Object.assign({},b,parm1)
        }

        if(self.state.selectedQuickEmployeeID.length != 0)
        {
        parm1 =  Object.assign({},c,parm1)
        }

        if(self.state.selectedQuickPaymentMethod != "ALL")
        {
      //  parm1 =  Object.assign({},z,parm1)

        var payValue = global.paymentType.map(function(data, idx) {
         if(data.name == self.state.selectedQuickPaymentMethod)
        {
          // console.log('JJJ :' + data.name);
           //console.log('JJJ :' + data.id);
           var z = { 'paymentTypeId':  data.id}
          parm1 =  Object.assign({},z,parm1)
        }

       });

        }

        if(self.state.selectedDayTitle.length != 0 )
       {
        parm1 =  Object.assign({},e,parm1)

       }
       else {
        parm1 =  Object.assign({},f,j,parm1)
      }

         //parm1 =  Object.assign({},f,j,parm1)


         API.get(GLOBAL.API_STRING.QUICK_DASHBOARD + `?page=${self.state.Quickpage}`,{

           params: parm1


         }).then((response) => {


       // Success
       const json = JSON.parse(response);

       var pageurl;


      if(json.response.invoices.pagination.next_page_url != null)
      {
       let pg = json.response.invoices.pagination.next_page_url.split('=');
       pageurl = pg[1]
       }
    else {

       pageurl = self.state.Quickpage
     }
    console.log(pageurl)

      let markers = [];
      if(json.response.invoices.data.length != 0)
      {

        for(let i = 0; i < json.response.invoices.pagination.count; i++) {
          if(json.response.invoices.data[i].invoice_type != 4)
          {
         markers.push({
        id: json.response.invoices.data[i].id,
        name: json.response.invoices.data[i].customer.name,
        nameValue: format(parseISO(json.response.invoices.data[i].created_at), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
        subname1 : json.response.invoices.data[i].customer.email,
        subnamevalue1 : json.response.invoices.data[i].transaction.payment_type,
        subname2 : '',
        subnamevalue2 : '',
        subname3 : json.response.invoices.data[i].invoice_status == 0 ? Localized.t("CommanTabPage.UnPaid") :json.response.invoices.data[i].invoice_status == 1 ? Localized.t("CommanTabPage.Paid") : Localized.t("CommanTabPage.Cancelled"),
        subnamevalue3 : json.response.invoices.data[i].invoice_status == 1 ? GLOBAL.CURRENCY + ' ' + currencyFormat((Number(json.response.invoices.data[i].amount) + Number(json.response.invoices.data[i].transaction.admin_charge))).toString() : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.invoices.data[i].amount)).toString(),
        Subname3Img :json.response.invoices.data[i].invoice_status == 1 ? 1 : json.response.invoices.data[i].invoice_status == 0  ? 2 : 4 ,
        nameImg :0
        });
        }
      }
     }


        let graphmarkers = []

        graphmarkers = [
             {
                 key: 'Paid',
                 value:  json.response.stats.invoice_paid != null ? Number(json.response.stats.invoice_paid): 100,
                 svg: { fill:  json.response.stats.invoice_paid != null ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.SHADEGRAY, onPress: () => json.response.stats.invoice_paid != null ? this.barOnPress(0) :  null},
             },
             {
                 key: 'UnPaid',
                 value:  json.response.stats.invoice_not_paid != null ? Number(json.response.stats.invoice_not_paid) : 100,
                 svg: { fill: GLOBAL.COLOR.SHADEGRAY,onPress: () => json.response.stats.invoice_not_paid != null ? this.barOnPress(1) : null}
             },
             {
                 key: 'Cancelled',
                 value:  json.response.stats.invoice_cancelled != null ? Number(json.response.stats.invoice_cancelled) :100,
                 svg: { fill: GLOBAL.COLOR.SHADEGRAY ,onPress: () =>  json.response.stats.invoice_cancelled != null ? this.barOnPress(2) : null}
             },

         ]


       if(json.response.invoices.pagination.next_page_url == null && json.response.invoices.pagination.previous_page_url == null)
       {
         self.setState
             ({
            QuickInvoiceListArray: markers
           })
       }
       else {

         if(self.state.quickLastindex)
         {

         }
         else {

           if(json.response.invoices.pagination.next_page_url == null)
           {
              self.setState({ quickLastindex: true });
           }

           self.setState(prevState =>
               ({
              QuickInvoiceListArray: [...prevState.QuickInvoiceListArray,...markers]
             }))
         }

       }



       self.setState({
         Quickpage: pageurl ,
         paidCount : json.response.stats.invoice_paid != null ? json.response.stats.invoice_paid :0,
         unPaidCount : json.response.stats.invoice_not_paid != null ? json.response.stats.invoice_not_paid :0,
         cancelledCount : json.response.stats.invoice_cancelled != null ? json.response.stats.invoice_cancelled :0,
         refundCount : json.response.stats.total_invoice_count,
         graphArray : graphmarkers,
         selectedSlice: json.response.stats.total_invoice_count == 0 ? { label:'', value:0} : { label:Localized.t("CommanTabPage.Paid"), value: json.response.stats.invoice_paid}
       });
       self.setState({refreshing :false})
        self.setState({scrollRefreshing :false})




      })
    .catch((error) => {
       // Error
       if (error.response) {

             console.log('zxd'+error.response.data);
       } else if (error.request) {
           // The request was made but no response was received
           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
           // http.ClientRequest in node.js
           console.log(error.request);
       } else {
           // Something happened in setting up the request that triggered an Error
           console.log('Error', error.message);
       }
       console.log(error.config);
    });


   }


   getOrderDetailInvoiceDetail(status) {


     if(status)
     {


         this.setState({
          OrderDetailpage: 1,
           OrderDetailInvoiceListArray : [],
           OrderDetailLastindex : false,
           searchRefresh : true
        }, () => {
           this.getOrderDetailInvoiceDetail1(true)
         });
     }
     else {
       this.getOrderDetailInvoiceDetail1(false)
       this.setState({ searchRefresh : false})
     }
   }

 getOrderDetailInvoiceDetail1(status) {

 /*  if(status)
   {
       this.setState({
         Quickpage: 1,
         QuickInvoiceListArray : [],
         quickLastindex : false,
         searchRefresh : true
       });
   }
   else {
      this.setState({ searchRefresh : false})
   }*/

   var self = this;

   var a = {  'search' : self.state.searchData }
   var b = { 'status':   self.state.selectedOrderDetailPaymentStatus === "UnPaid" ? '0' : self.state.selectedOrderDetailPaymentStatus === "Paid" ? '1' : '3'}
   var c = { 'employee':  self.state.selectedOrderDetailEmployeeID}
   var e = { 'timeline'  : self.state.selectedDayTitle == 'Today' ? '1' : self.state.selectedDayTitle == 'Last7Days' ? '2' : self.state.selectedDayTitle.length != 0 ? '3' : ''}
   var f = { 'fromDate'  : self.state.selectedDayTitle.length != 0 ? '' : self.state.calendarFromDate}
   var j = { 'toDate'    : self.state.selectedDayTitle.length != 0 ? '' : self.state.calendarToDate}


   //var z = { 'paymentTypeId': self.state.selectedQuickPaymentMethod === "KNET" ? '1' : '2'}


   var parm1 = {
     'merchantCode' : GLOBAL.MERCHANT_CODE,
   }


   if(self.state.searchData.length != 0)
   {
     parm1 = Object.assign({},a,parm1)
   }

   if(self.state.selectedOrderDetailPaymentStatus != "All")
   {
   parm1 =  Object.assign({},b,parm1)
   }

   if(self.state.selectedOrderDetailEmployeeID.length != 0)
   {
   parm1 =  Object.assign({},c,parm1)
   }

   if(self.state.selectedOrderDetailPaymentMethod != "ALL")
   {
 //  parm1 =  Object.assign({},z,parm1)

   var payValue = global.paymentType.map(function(data, idx) {
    if(data.name == self.state.selectedOrderDetailPaymentMethod)
   {
     // console.log('JJJ :' + data.name);
      //console.log('JJJ :' + data.id);
      var z = { 'paymentTypeId':  data.id}
     parm1 =  Object.assign({},z,parm1)
   }

  });

   }

   if(self.state.selectedDayTitle.length != 0 )
  {
   parm1 =  Object.assign({},e,parm1)

  }
  else {
   parm1 =  Object.assign({},f,j,parm1)
 }

    //parm1 =  Object.assign({},f,j,parm1)


    API.get(GLOBAL.API_STRING.QUICK_DASHBOARD + `?page=${self.state.OrderDetailpage}`,{

      params: parm1


    }).then((response) => {


  // Success
  const json = JSON.parse(response);

  var pageurl;


 if(json.response.invoices.pagination.next_page_url != null)
 {
  let pg = json.response.invoices.pagination.next_page_url.split('=');
  pageurl = pg[1]
  }
else {

  pageurl = self.state.OrderDetailpage
}
console.log(pageurl)

 let markers = [];
 if(json.response.invoices.data.length != 0)
 {


   for(let i = 0; i < json.response.invoices.pagination.count; i++) {
     if(json.response.invoices.data[i].invoice_type == 4)
     {
    markers.push({
   id: json.response.invoices.data[i].id,
   name: json.response.invoices.data[i].customer.name,
   nameValue: format(parseISO(json.response.invoices.data[i].created_at), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
   subname1 : json.response.invoices.data[i].customer.email,
   subnamevalue1 : json.response.invoices.data[i].transaction.payment_type,
   subname2 : '',
   subnamevalue2 : '',
   subname3 : json.response.invoices.data[i].invoice_status == 0 ? Localized.t("CommanTabPage.UnPaid") :json.response.invoices.data[i].invoice_status == 1 ? Localized.t("CommanTabPage.Paid") : Localized.t("CommanTabPage.Cancelled"),
   subnamevalue3 : json.response.invoices.data[i].invoice_status == 1 ? GLOBAL.CURRENCY + ' ' + currencyFormat((Number(json.response.invoices.data[i].amount) + Number(json.response.invoices.data[i].transaction.admin_charge))).toString() : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.invoices.data[i].amount)).toString(),
   Subname3Img :json.response.invoices.data[i].invoice_status == 1 ? 1 : json.response.invoices.data[i].invoice_status == 0  ? 2 : 4 ,
   nameImg :0
   });
   }
  }
}


   let graphmarkers = []

   graphmarkers = [
        {
            key: 'Paid',
            value:  json.response.stats.invoice_paid != null ? Number(json.response.stats.invoice_paid): 100,
            svg: { fill:  json.response.stats.invoice_paid != null ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.SHADEGRAY, onPress: () => json.response.stats.invoice_paid != null ? this.barOnPress(0) :  null},
        },
        {
            key: 'UnPaid',
            value:  json.response.stats.invoice_not_paid != null ? Number(json.response.stats.invoice_not_paid) : 100,
            svg: { fill: GLOBAL.COLOR.SHADEGRAY,onPress: () => json.response.stats.invoice_not_paid != null ? this.barOnPress(1) : null}
        },
        {
            key: 'Cancelled',
            value:  json.response.stats.invoice_cancelled != null ? Number(json.response.stats.invoice_cancelled) :100,
            svg: { fill: GLOBAL.COLOR.SHADEGRAY ,onPress: () =>  json.response.stats.invoice_cancelled != null ? this.barOnPress(2) : null}
        },

    ]


  if(json.response.invoices.pagination.next_page_url == null && json.response.invoices.pagination.previous_page_url == null)
  {
    self.setState
        ({
       OrderDetailInvoiceListArray: markers
      })
  }
  else {

    if(self.state.OrderDetailLastindex)
    {

    }
    else {

      if(json.response.invoices.pagination.next_page_url == null)
      {
         self.setState({ OrderDetailLastindex: true });
      }

      self.setState(prevState =>
          ({
         OrderDetailInvoiceListArray: [...prevState.OrderDetailInvoiceListArray,...markers]
        }))
    }

  }



  self.setState({
    OrderDetailpage: pageurl ,
    paidCount : json.response.order_stats.invoice_paid != null ? json.response.order_stats.invoice_paid :0,
    unPaidCount : json.response.order_stats.invoice_not_paid != null ? json.response.order_stats.invoice_not_paid :0,
    cancelledCount : json.response.order_stats.invoice_cancelled != null ? json.response.order_stats.invoice_cancelled :0,
    refundCount : json.response.order_stats.total_invoice_count,
    graphArray : graphmarkers,
    selectedSlice: json.response.order_stats.total_invoice_count == 0 ? { label:'', value:0} : { label:Localized.t("CommanTabPage.Paid"), value: json.response.order_stats.invoice_paid}
  });
  self.setState({refreshing :false})
   self.setState({scrollRefreshing :false})




 })
.catch((error) => {
  // Error
  if (error.response) {

        console.log('zxd'+error.response.data);
  } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
  } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
  }
  console.log(error.config);
});


}


   getOpenInvoiceDetail(status) {


     if(status)
     {

         this.setState({
           Openpage: 1,
           OpenInvoiceListArray : [],
           openLastindex : false,
           searchRefresh : true
        }, () => {
           this.getOpenInvoiceDetail1(true)
         });
     }
     else {
       this.getOpenInvoiceDetail1(false)
       this.setState({ searchRefresh : false})
     }
   }


   getOpenInvoiceDetail1(status) {

    /* if(status)
     {
         this.setState({
           Openpage: 1,
           OpenInvoiceListArray : [],
           openLastindex : false,
           searchRefresh : true
         });
     }
     else {
        this.setState({ searchRefresh : false})
     }*/

     var self = this;

     var a = {  'search'   : self.state.searchData }
     var b = { 'paidStatus': self.state.selectedOpenPaymentStatus === "UnPaid" ? '0' : self.state.selectedOpenPaymentStatus === "Paid" ? '1' : '3'}
     var c = { 'status'    : self.state.selectedOpenPaymentStatus === "Cancelled" ? '3' : self.state.selectedOpenPaymentStatus === "Expired" ? '1' : '2'}
     var e = { 'timeline'  : self.state.selectedDayTitle == 'Today' ? '1' : self.state.selectedDayTitle == 'Last7Days' ? '2' : self.state.selectedDayTitle.length != 0 ? '3' : ''}
     var f = { 'fromDate'  : self.state.selectedDayTitle.length != 0 ? '' : self.state.calendarFromDate}
     var j = { 'toDate'    : self.state.selectedDayTitle.length != 0 ? '' : self.state.calendarToDate}

     var k = { 'openInvoiceType' : self.state.selectedOpenStatus === "Open" ? '1' : self.state.selectedOpenStatus === "Fixed" ? '0' : '2'}

     var z = { 'paymentTypeId': self.state.selectedOpenPaymentMethod === "KNET" ? '1' : '2'}


     var parm1 = {
       'merchantCode' : GLOBAL.MERCHANT_CODE
     }


     if(self.state.searchData.length != 0)
     {
       parm1 = Object.assign({},a,parm1)
     }

     if(self.state.selectedOpenPaymentStatus != "All" )
     {
      parm1 =  self.state.selectedOpenPaymentStatus === "Cancelled" || self.state.selectedOpenPaymentStatus === "Expired" ? Object.assign({},c,parm1) : Object.assign({},b,parm1)
     }


     if(self.state.selectedOpenStatus != "All")
     {
     parm1 =  Object.assign({},k,parm1)
     }

  /*   if(self.state.selectedDayTitle.length != 0 )
    {
     parm1 =  Object.assign({},e,parm1)

    }
    else {
     parm1 =  Object.assign({},f,j,parm1)
   }*/
   if(self.state.selectedDayTitle.length != 0 )
  {
  parm1 =  Object.assign({},e,parm1)
  }
  else {
   parm1 =  Object.assign({},f,j,parm1)
 }

    //  parm1 =  Object.assign({},f,j,parm1)

      API.get(GLOBAL.API_STRING.OPEN_INVOICE + `?page=${self.state.Openpage}`,{

        params: parm1


      }).then((response) => {


    // Success
    const json = JSON.parse(response);

    var pageurl;


   if(json.response.pagination.next_page_url != null)
   {
    let pg = json.response.pagination.next_page_url.split('=');
    pageurl = pg[1]
    }
 else {

    pageurl = self.state.Openpage
  }
 console.log(pageurl)

   let markers = [];
   if(json.response.data.length != 0)
   {

     for(let i = 0; i < json.response.pagination.count; i++) {
      markers.push({
     id: json.response.data[i].id,
     name: json.response.data[i].status == 0 ?  json.response.data[i].paid_status == 0 ? Localized.t('InvoiceOpenDetailsPage.UnPaid') : Localized.t('InvoiceOpenDetailsPage.Paid')  : Localized.t('InvoiceOpenDetailsPage.'+'Expired'),
     nameValue: format(parseISO(json.response.data[i].created_at), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
     subname1 :  json.response.data[i].title,
     subnamevalue1 : '',
     subname2 : json.response.data[i].expiry_date == null ? '' : Localized.t("CommanTabPage.Expiry Date"),
     subnamevalue2 : json.response.data[i].expiry_date == null ? '' : format(parseISO(json.response.data[i].expiry_date), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
     subname3 : json.response.data[i].total_customer_paid_count + " " + Localized.t("CommanTabPage.Customers Paid"),
     subnamevalue3 : GLOBAL.CURRENCY + ' ' + currencyFormat(Number(json.response.data[i].total_amount_customer_paid)).toString(),
     Subname3Img :0 ,
     nameImg : json.response.data[i].status == 0 ?  json.response.data[i].paid_status == 0 ? 2 : 1  : 3,
     });
    }
  }


  if(json.response.pagination.next_page_url == null && json.response.pagination.previous_page_url == null)
  {
    self.setState
        ({
       OpenInvoiceListArray: markers
      })
  }
  else {

    if(self.state.openLastindex)
    {

    }
    else {

      if(json.response.pagination.next_page_url == null)
      {
         self.setState({ openLastindex: true });
      }

    self.setState(prevState =>
        ({
       OpenInvoiceListArray: [...prevState.OpenInvoiceListArray,...markers]
      }))

    }
  }



    self.setState({ Openpage: pageurl });
    self.setState({refreshing :false})
    self.setState({scrollRefreshing :false})


   })
 .catch((error) => {
    // Error
    if (error.response) {

          console.log('zxd'+error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('request Error' + error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('request Error' + error.message);
    }
    console.log(error.config);
 });


}


  selectionOnPress(userType) {

    this.setState({ selectedButton: userType}, () => {
        this.state.selectedButton === 'OPEN' ? this.getOpenInvoiceDetail(true) : this.state.selectedButton === 'ORDERDETAIL' ? this.getOrderDetailInvoiceDetail(true)  :  this.getQuickInvoiceDetail(true)

    });
  }

  toggleCalenderModal(visible) {
    //this.setState({ calenderVisible: visible });
    //this.passDataToCalenderModal("Dashboard")

    this.props.navigation.navigate('CalendarScreen',{onSelectCalender:this.calenderReceiveData,
       example : {'currentState' : this.state.selectedDayTitle,'ClearAll' : this.state.modalCalenderData,"FromDate" : this.state.selectedFromDate  ,"ToDate" :  this.state.selectedToDate,"Fromview" : "Invoice"}})
  }

  passDataToCalenderModal(item)
  {
    console.log(item);
     this.setState({
       modalCalenderData:item
    });
  }

   calenderReceiveData(calenderValue)
   {
        this.toggleCalenderModal(!this.state.calenderVisible)
       //this.closecalendarModal()

            var today = new Date()
           var todayDate = new Date(today.setDate(today.getDate()))
           var currentdate  = format(todayDate, 'dd/MM/yyyy')
           var priordate = ''

           var calFromDate = '',calToDate = ''
           console.log(calenderValue.FromDate);
            console.log(calenderValue.ToDate);

             if(calenderValue.FromDate.length !=0 )
						 {
             const  cFromDate = calenderValue.FromDate.split('/')
             const  cToDate = calenderValue.ToDate.split('/')
             calFromDate =  cFromDate[2] + "-" + cFromDate[1] + "-" + cFromDate[0]
             calToDate = cToDate[2] + "-" + cToDate[1] + "-" + cToDate[0]

             priordate = format(parseISO(cFromDate[2] +"-"+ cFromDate[1] +"-"+ cFromDate[0]), 'dd MMM yyyy') + '-' + format(parseISO(cToDate[2] +"-"+ cToDate[1] +"-"+ cToDate[0]), 'dd MMM yyyy')
           }

       this.setState(
         {
            selectedDayTitle: calenderValue.Interval,
            calendarFromDate : calFromDate,
            calendarToDate : calToDate ,
						selectedFromDate : calenderValue.FromDate,
						selectedToDate : calenderValue.ToDate,

         }, () => {
         console.log('Receivedcalnder Data' + calFromDate);
          if(this.state.selectedDayTitle.length != 0 )
         {
           this.ShowCurrentDate(this.state.selectedDayTitle)
         }
         else {


             this.setState({ selectedCurrentDate: priordate.toLocaleUpperCase() }, () => {
                 this.state.selectedButton === 'OPEN' ? this.getOpenInvoiceDetail(true) : this.state.selectedButton === 'QUICK' ?  this.getQuickInvoiceDetail(true) : this.getOrderDetailInvoiceDetail(true)
             });

         }

        });



    //  this.state.selectedButton === 'OPEN' ? this.getOpenInvoiceDetail(true) :  this.getQuickInvoiceDetail(true)

      //this.setState({filterType: filterValue});
      console.log('Received Data' + calenderValue);
  }


  toggleFilterModal(visible) {
  //  this.setState({ filterVisible: visible });


    this.props.navigation.navigate('FilterScreen',{onSelectFilter:this.filterReceiveData,
      example : {"PaymentStatus": this.state.selectedButton === 'OPEN' ?  this.state.selectedOpenPaymentStatus : this.state.selectedButton === 'QUICK' ? this.state.selectedQuickPaymentStatus : this.state.selectedOrderDetailPaymentStatus ,
      "PaymentMethod" : this.state.selectedButton === 'OPEN' ? this.state.selectedOpenPaymentMethod :this.state.selectedButton === 'QUICK' ? this.state.selectedQuickPaymentMethod : this.state.selectedOrderDetailPaymentMethod,
      'OpenStatus' : this.state.selectedOpenStatus,"ServiceType" :"","FromDate" : "" ,"ToDate" : "","fromView" : this.state.selectedButton === 'OPEN' ?   "OpenInvoice" : this.state.selectedButton === 'QUICK' ? "QuickInvoice" : "QuickInvoice",
      "ClearAll" : this.state.selectedButton === 'OPEN' ? this.state.OpenFilterClear :this.state.selectedButton === 'QUICK' ? this.state.QuickFilterClear : this.state.OrderDetailFilterClear}})

  }



  onBackSelect()
  {

      console.log('BAckReceived Data');
      this.getOpenInvoiceDetail(true)

  }



  filterReceiveData(filterValue)
  {

    	this.toggleFilterModal(!this.state.filterVisible)


      if(this.state.selectedButton === 'OPEN')
      {

        this.setState({
          selectedOpenPaymentMethod: filterValue.PaymentMethod ,
          selectedOpenPaymentStatus : filterValue.PaymentStatus,
          selectedOpenEmployeeID : filterValue.EmployeeID,
          selectedOpenStatus : filterValue.Status
        }, () => {
           this.getOpenInvoiceDetail(true);
         });
      }
      else if(this.state.selectedButton === 'QUICK')
      {
        this.setState({
          selectedQuickPaymentMethod: filterValue.PaymentMethod ,
          selectedQuickPaymentStatus : filterValue.PaymentStatus,
          selectedQuickEmployeeID : filterValue.EmployeeID
        }, () => {
            this.getQuickInvoiceDetail(true);
         });
      }
      else
      {
        this.setState({
          selectedOrderDetailPaymentMethod: filterValue.PaymentMethod ,
          selectedOrderDetailPaymentStatus : filterValue.PaymentStatus,
          selectedOrderDetailEmployeeID : filterValue.EmployeeID
        }, () => {
            this.getOrderDetailInvoiceDetail(true);
         });
      }

     //this.setState({filterType: filterValue});
     console.log('Received Data ' + filterValue.EmployeeID);
 }

 searchReceiveData(searchValue)
  {

      console.log("KLKL " + searchValue.name);
      this.state.selectedButton === 'OPEN' ?
      this.props.navigation.navigate('InvoiceOpenDetailsScreen',{something:searchValue,Type :"Success",fromView :'Invoice' ,onSelectBack : this.onBackSelect})
    :  searchValue.subname3 == "Refund" ? this.props.navigation.navigate('InvoiceDetailsScreen',{something:searchValue,Type :"Refund",RefundType :"Partly",fromView :'Invoice' })
    :    this.state.selectedButton === 'QUICK' ? this.props.navigation.navigate('InvoiceQuickDetailsScreen',{something:searchValue,Type :  "Success",fromView :'Invoice',subType : '' })
    :   this.props.navigation.navigate('InvoiceQuickDetailsScreen',{something:searchValue,Type :  "Success",fromView :'Invoice',subType : '4'})


     //this.setState({filterType: filterValue});

   }

   searchEndLoading(searchValue)
  {
        console.log("End Reached" + searchValue);
          //this.getQuickInvoiceDetail();

  }

  searchFilter(searchValue)
 {
   console.log("SSSs" + searchValue);
   this.setState({
     searchData: searchValue
   }, () => {

    this.state.selectedButton === 'OPEN' ? this.getOpenInvoiceDetail(true) : this.state.selectedButton === 'QUICK' ? this.getQuickInvoiceDetail(true) : this.getOrderDetailInvoiceDetail(true);
    });


 }

 componentDidMount() {

   this.loadView()
     Linking.addEventListener('url', this.handleOpenURL);
   if(global.employeFlag)
   {
       this.getPermissionAccess();
   }

   if(global.Token != null)
   {
     global.DeepLinkFlag = false
  this.ShowCurrentDate(this.state.selectedDayTitle)

 }

console.log("global.NotificationInvoiceParamter :" + global.NotificationInvoiceParamter);


  /* this.focusListener = this.props.navigation.addListener('focus', () => {
          this.ShowCurrentDate(this.state.selectedDayTitle)

        });*/

 }




 barOnPress(index)
 {
   console.log("Index :" + index);


    let newArray = [...this.state.graphArray]

    for(let i = 0; i < this.state.graphArray.length; i++) {

     if(i == index)
     {
       newArray[i].svg.fill = GLOBAL.COLOR.ORANGE

       this.setState({ selectedSlice: { label:Localized.t("CommanTabPage."+ newArray[i].key), value: newArray[i].value}})
      }
      else {
      newArray[i].svg.fill = GLOBAL.COLOR.SHADEGRAY
      }
    }

    this.setState({
     array: newArray,
    })



 }


 ShowCurrentDate(value)
 {
       var today = new Date()
       var priorDate,fromDate ,toDate
       console.log('currentselection' + value);
       if(value === 'Today')
       {
            var todayDate  = new Date(today.setDate(today.getDate()))
            priorDate = format(todayDate, 'dd MMM yyyy')
           fromDate =  format(todayDate, 'yyyy-MM-dd')
            toDate =  format(todayDate, 'yyyy-MM-dd')


       }
       else if(value === 'Last7Days')
       {
         var todayDate = new Date(today.setDate(today.getDate()))
         var newdate = new Date(today.setDate(today.getDate() - 6))
         priorDate = format(newdate, 'dd MMM yyyy') + '-' + format(todayDate, 'dd MMM yyyy')
         fromDate =  format(newdate, 'yyyy-MM-dd')
          toDate =  format(todayDate, 'yyyy-MM-dd')
       }
       else if(value === 'Last30Days')
       {
         var todayDate = new Date(today.setDate(today.getDate()))
        var newdate = new Date(today.setDate(today.getDate() - 29))
         priorDate = format(newdate, 'dd MMM yyyy') + '-' + format(todayDate, 'dd MMM yyyy')
         fromDate =  format(newdate, 'yyyy-MM-dd')
          toDate =  format(todayDate, 'yyyy-MM-dd')
       }
       else {

         var todayDate = new Date(today.setDate(today.getDate()))
        var newdate = new Date(today.setDate(today.getDate() - 60))
         priorDate = format(newdate, 'dd MMM yyyy') + '-' + format(todayDate, 'dd MMM yyyy')
       }


        this.setState(
          {
              selectedCurrentDate:priorDate.toLocaleUpperCase(),
              //selectedFromDate : fromDate,
              //selectedToDate : toDate

          }, () => {

          this.state.selectedButton === 'OPEN' ? this.getOpenInvoiceDetail(true) : this.state.selectedButton === 'QUICK' ? this.getQuickInvoiceDetail(true) : this.getOrderDetailInvoiceDetail(true);
         });


    }

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
        this.state.selectedButton === 'OPEN' ? this.getOpenInvoiceDetail(true) : this.state.selectedButton === 'QUICK' ? this.getQuickInvoiceDetail(true) : this.getOrderDetailInvoiceDetail(true)


    }


  render(){

      const isDarkMode = this.context === 'dark';
      const { labelWidth, selectedSlice } = this.state;
     const { label, value } = selectedSlice;

     const deviceWidth = Dimensions.get('window').width
     const screenWidth = Dimensions.get("window").width;
   	const screenheight = Dimensions.get("window").height;



    return(
      <View style={{ flex: 1,  backgroundColor: GLOBAL.COLOR.LIGHTBLUE}}>
      <View
      style={{
        justifyContent: 'space-between',
        marginTop :'5%',
        flexDirection: "row",
        padding: 16,
        //height : 40,
        alignItems : "stretch",
      }}>

      <View
      style={{
        justifyContent: 'space-between',
        marginTop :10,
        flexDirection: "column",
        //height : 40,
        //  alignItems : "stretch",
        width : '60%'
      }}>
      <Text style =  {{color : GLOBAL.COLOR.WHITE,fontFamily : 'Prompt-bold',fontSize :  RFValue(17),textAlign : 'left'}}>{this.state.selectedDayTitle != 0 ? Localized.t('CalenderPage.'+this.state.selectedDayTitle) : ''}</Text>
      <Text style =  {{color : GLOBAL.COLOR.WHITE,textAlign :'left'}}>{this.state.selectedCurrentDate}</Text>
      </View>

        <View style = {{width : 40,	alignItems: 'flex-end',marginRight  :0}}>
        <TouchableOpacity
        style={styles.button1}
        onPress={() => this.toggleCalenderModal(true)}>
        <Text style =  {{color : 'blue'}}></Text>
        <Image style={styles.icon} source={require('./Assest/calender.png')} />
        </TouchableOpacity>
        </View>
        </View>

        <View style={{ backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE, marginTop : 20,width : '100%',borderTopLeftRadius : 20,borderTopRightRadius : 20 ,height : 50}}>
            <View
            style={{
              justifyContent: 'space-between',
              marginTop :10,
              flexDirection: "row",
            //  marginLeft : '1%',
              //marginRight : '1%',
              //height : 40,
              //alignItems : "flex-start",
              backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
            }}>
            <TouchableOpacity
            style={[styles.button3,{width : global.OrderDetailFlag == true ? screenWidth/3 :screenWidth/2-10}]}
            onPress={() => this.selectionOnPress("QUICK")}>
            <Text style =  {{color : this.state.selectedButton === "QUICK"
            ? GLOBAL.COLOR.ORANGE
            : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily:'Prompt-Regular'}}>{Localized.t('InvoicePage.Quick')}</Text>
            <Image
            style={styles.icon1}
            source = { this.state.selectedButton === "QUICK" ?
            rectImg :
            null} />
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.button3,{display : global.OrderDetailFlag == true ? null  : 'none',width : global.OrderDetailFlag == true ? screenWidth/2.6 :screenWidth/2-10,height : '100%' }]}
            onPress={() => this.selectionOnPress("ORDERDETAIL")}>
            <Text style =  {{color : this.state.selectedButton === "ORDERDETAIL"
            ? GLOBAL.COLOR.ORANGE
            : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily:'Prompt-Regular' }}>{"+" + Localized.t('OpenInvoicePage.Delivery')}</Text>
            <Image
            style={styles.icon1}
            source = { this.state.selectedButton === "ORDERDETAIL" ?
            rectImg :
            null} />
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.button3,{width : global.OrderDetailFlag == true ? screenWidth/3 :screenWidth/2-10}]}
            onPress={() => this.selectionOnPress("OPEN")}>
            <Text style =  {{color : this.state.selectedButton === "OPEN"
            ? GLOBAL.COLOR.ORANGE
            : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily:'Prompt-Regular'}}>{Localized.t('InvoicePage.Open')}</Text>
            <Image
            style={styles.icon1}
            source = { this.state.selectedButton === "OPEN" ?
            rectImg :
            null} />
            </TouchableOpacity>
            </View>
            </View>

         <ScrollView contentContainerStyle={{paddingBottom: 90}}
         style ={{marginTop : -10,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
         refreshControl={
         <RefreshControl
         refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          title={ I18nManager.isRTL ? "جار التحميل..." : "Loading..."}
        />
         }
         onScroll={({ nativeEvent }) => {
           if (this.isCloseToBottom(nativeEvent)) {
             console.log("Reached end of page");
             if(this.state.scrollRefreshing == false)
             {
                 this.setState({scrollRefreshing :true})
               if(this.state.selectedButton === 'OPEN')
               {
                  if(this.state.OpenInvoiceListArray.length > 1 ) {this.getOpenInvoiceDetail(false)}
               }
               else if(this.state.selectedButton === 'QUICK') {
                 if(this.state.QuickInvoiceListArray.length > 1 ) {this.getQuickInvoiceDetail(false)}
               }
               else {
                  if(this.state.OrderDetailInvoiceListArray.length > 1 ) {this.getOrderDetailInvoiceDetail(false)}
               }


             }
           }

           if(this.isCloseToTop(nativeEvent)){
              console.log("Top of page");
              //this.getQuickInvoiceDetail(true)
             }
         }}
         scrollEventThrottle={400}
         >
      <View
      style={{
        //  flex: 1,
        //alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop : 10,
      }}>






        <View style = {{height : '120%',backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,}}>
        <View  style  = {{display : this.state.selectedButton === "QUICK" ? this.state.showQuickInvoiceFlag == true ? null : 'none'
                         :  this.state.selectedButton === "OPEN" ?  this.state.showOpenInvoiceFlag == true ? null : 'none' : null
         }}>

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :30,
          flexDirection: "row",
          //height : 40,
          alignItems : "flex-start",
          display : this.state.selectedButton === "OPEN" ? 'none' : null
        }}>
      <View style={{ height: 200, width : '50%'}}>
      <View style={{ justifyContent: 'center'}}>
      <PieChart
        style={{ height: 200 }}
        spacing={0}
       outerRadius={'80%'}
        //outerRadius={'65%'}
        //innerRadius={'45%'}
        data={this.state.graphArray}
      />
      <Text
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          this.setState({ labelWidth: width });
        }}
        style={{
          //position: 'absolute',
          //left: deviceWidth / 2 - labelWidth / 2,
         marginTop : -120,
          textAlign: 'center',
          color :GLOBAL.COLOR.DARKGRAY,
          fontFamily :'Prompt-Regular',
          fontSize : RFValue(15),
          display : label.length == 0  ? 'none' : null
        }}>
        {`${label} \n ${value}`}
      </Text>
    </View>

        </View>





        <View
        style={{
          justifyContent: 'space-between',
          flexDirection: "column",
          //height : 40,
        //  alignItems : "flex-start",
          height: 200, width : '50%',
          padding : 10,marginBottom : 20
        }}>

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          flexDirection: "row",
          //height : 40,
          alignItems : "center",
            marginRight : 10,
        }}>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY,fontFamily:'Prompt-Regular',fontSize :  RFValue(13)}}>{Localized.t('InvoicePage.TotalCount')}</Text>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontFamily:'Prompt-SemiBold',fontSize :  RFValue(13)}}>{this.state.refundCount}</Text>
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
          alignItems : "center",
            marginRight : 10,
        }}>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,fontFamily:'Prompt-Regular',fontSize :  RFValue(13)}}>{Localized.t('InvoicePage.Paid')}</Text>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontFamily:'Prompt-SemiBold',fontSize :  RFValue(13)}}>{this.state.paidCount}</Text>
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
          marginRight : 10,
          alignItems : "center",
        }}>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontFamily:'Prompt-Regular',fontSize :  RFValue(13)}}>{Localized.t('InvoicePage.UnPaid')}</Text>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontFamily:'Prompt-SemiBold',fontSize :  RFValue(13)}}>{this.state.unPaidCount}</Text>
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
          marginRight : 10,
          alignItems : "center",
        }}>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontFamily:'Prompt-Regular',fontSize :  RFValue(13)}}>{Localized.t('InvoicePage.Cancelled')}</Text>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.LIGHTBLUE,fontFamily:'Prompt-SemiBold',fontSize :  RFValue(13)}}>{this.state.cancelledCount}</Text>
        </View>

       </View>
        </View>






       <View
        style={{
          justifyContent: 'space-between',
          marginTop :30,
          flexDirection: "row",
          //height : 40,
          alignItems : "flex-start",
          height : 50
        }} >
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(17),marginLeft : 20}}>{Localized.t('InvoicePage.InvoiceHistory')}</Text>
        <TouchableOpacity
        onPress={() => this.toggleFilterModal(true)}>
        <Image style={styles.icon2} source={require('./Assest/slider.png')} />
        </TouchableOpacity>
        </View>

        <SearchList example = {this.state.selectedButton === "QUICK" ? 'InvoiceQuick' :'InvoiceOpen'} refresh = {this.state.searchRefresh} onSelectSearch={this.searchReceiveData} exampleArray = {this.state.selectedButton === 'OPEN' ? this.state.OpenInvoiceListArray : this.state.selectedButton === 'QUICK' ? this.state.QuickInvoiceListArray : this.state.OrderDetailInvoiceListArray } onEndSearch={this.searchEndLoading} onSearchFilter={this.searchFilter}/>
          </View>

          <View style  = {{display : this.state.selectedButton === "QUICK" ? this.state.showQuickInvoiceFlag == true ? 'none' : null
                            :   this.state.showOpenInvoiceFlag == true ? 'none' : null
  													}}>
 					<AccessDeniedScreen example = {true}/>
 					</View>

          </View>
          </View>

          </ScrollView>



       <CalenderModals.BottomModal
        propagateSwipe={true}
        modalData={this.state.modalCalenderData}
        visible={this.state.calenderVisible}
        swipeableModal = {false}
       //visible = {this.state.modalVisible}
      // onTouchOutside={() => this.setState({ HideModal: false })}
       height={0.95}
       width={1}
      // onSwipeOut={() => this.setState({ HideModal: false })}
       modalTitle={

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :10,
             padding : 10,
            flexDirection: "row",
            width : '100%',
            //height : 40,
            alignItems : "center",
            backgroundColor : GLOBAL.COLOR.WHITE
          }} >

          <TouchableOpacity
          style={styles.button}
          onPress={() => {
          this.toggleCalenderModal(!this.state.calenderVisible)}}>
          <Image style={styles.icon4} source={require('./Assest/close.png')} />
          </TouchableOpacity>
          <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 35,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('CalenderPage.Dates')}</Text>
          <TouchableOpacity
          style={styles.button1}
          onPress={() =>   this.passDataToCalenderModal(true)}>
          <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize :  RFValue(17)}}> {Localized.t('CalenderPage.Clearall')}</Text>
          </TouchableOpacity>
          </View>

       }
     >
       <ModalContent
         style={{
           flex: 1,
           backgroundColor: 'fff',
         }}
       >
       {/*<CalenderScreen example = {{'currentState' : this.state.selectedDayTitle,'ClearAll' : this.state.modalCalenderData}}  onSelectCalender={this.calenderReceiveData}/>*/}
       </ModalContent>
      </CalenderModals.BottomModal>

          <Modalize
            ref={this.calendarmodal}
             HeaderComponent={

               <View
              style={{
                justifyContent: 'space-between',
                marginTop :10,
                 padding : 10,
                flexDirection: "row",
                width : '100%',
                //height : 40,
                alignItems : "center",
                backgroundColor : GLOBAL.COLOR.WHITE
              }} >

              <TouchableOpacity
              style={styles.button}
              onPress={() => {
              this.closecalendarModal()}}>
              <Image style={styles.icon4} source={require('./Assest/close.png')} />
              </TouchableOpacity>
              <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 35,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('CalenderPage.Dates')}</Text>
              <TouchableOpacity
              style={styles.button1}
              onPress={() =>   this.passDataToCalenderModal(true)}>
              <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize :  RFValue(17)}}> {Localized.t('CalenderPage.Clearall')}</Text>
              </TouchableOpacity>
              </View>
             }
             //scrollViewProps={{ showsVerticalScrollIndicator: false }}
            // onClosed={this.closecalendarModal()}
            // snapPoint={screenheight}
           >
           {/*<CalenderScreen example = {{'currentState' : this.state.selectedDayTitle,'ClearAll' : this.state.modalCalenderData}}  onSelectCalender={this.calenderReceiveData}/>*/}
           </Modalize>
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
      marginRight : 10,
    },
    icon1:{
      width:8,
      height:8,
      alignItems: 'center',
      justifyContent : 'center',
    },
    icon2:{
      width:50,
      height:40,
      marginTop : -5,
      //  alignItems: 'center',
      //  justifyContent : 'center',
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
