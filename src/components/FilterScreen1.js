import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager,TextInput,Keyboard} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements'
import Localized from '../locales'
import { CustomButton } from './CustomButton.js';
import DropDownPicker from 'react-native-dropdown-picker';
import API from '../utils/API';
const GLOBAL = require('../utils/Globals');
import {CalendarList} from 'react-native-calendars';
import { format,parseISO } from 'date-fns';
import { isProperDate,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters} from '../utils/GlobalFunction';
import CustomAlertComponent from './CustomAlertComponent';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CalenderModals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

import Calender2Modals from 'react-native-modals';
import {DarkModeContext} from 'react-native-dark-mode';
//import Modal from 'react-native-modal';


export default class FilterScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
     paymentMethodSelected:this.props.route.params.example.PaymentMethod,
     selectedServiceButton: this.props.route.params.example.ServiceType,
     selectedFromDate : 'DD/MM/YYYY',
     selectedToDate : 'DD/MM/YYYY',
     afterSelectedFromDate :  this.props.route.params.example.FromDate,
     afterSelectedToDate : this.props.route.params.example.ToDate,
     selectedValue : this.props.route.params.example.PaymentStatus,
     selectedStatus : this.props.route.params.example.OpenStatus,
     selectedEmployeeId: '',
     calendarVisible : false,
     calendarListVisible : false,
     currentSelection : '',
     employeeDropdown: [],
     employeeDropdownArray: [],
     paymentMethodButtonArray: [],
     currentshowFromDate : '',
     currentshowToDate : '',
     showAlert : false,
     showAlertMessage : '',
      page: 1,
      topContraint : 20,
     languageArray: [
     {
        Dashboard :
        [

          {id: 1, value: "Successful", isChecked: false},

        ],
        OpenInvoice :
          [
          {id: 1, value: "All", isChecked: true},
          {id: 2, value: "Paid", isChecked: false},
          {id: 3, value: "UnPaid", isChecked: false},
          {id: 4, value: "Expired", isChecked: false},
          {id: 5, value: "Expiringin24hrs", isChecked: false},
          //{id: 5, value: "Cancelled", isChecked: false},
        ],
        QuickInvoice :
          [
          {id: 1, value: "All", isChecked: true},
          {id: 2, value: "Paid", isChecked: false},
          {id: 3, value: "UnPaid", isChecked: false},
          {id: 4, value: "Cancelled", isChecked: false},
          {id: 5, value: "Expiringin24hrs", isChecked: false},
        //  {id: 5, value: "Refund", isChecked: false},
        ],
         ReportPaymentList :
           [
             {id: 1, value: "All", isChecked: true},
             {id: 2, value: "Successful", isChecked: false},
             {id: 3, value: "Failure", isChecked: false},
             {id: 4, value: "Authorized", isChecked: false},
             {id: 5, value: "Cancelled", isChecked: false},
          ],
          ReportCaptureRequest :
            [
              {id: 1, value: "All", isChecked: true},
              {id: 2, value: "Authorized", isChecked: false},
              {id: 3, value: "Cancelled", isChecked: false},
           ],
          ReportRefund :
            [
              {id: 1, value: "All", isChecked: true},
              {id: 2, value: "Last Week", isChecked: false},
              {id: 3, value: "Last Month", isChecked: false},
              {id: 4, value: "Last 3 Month", isChecked: false},
              {id: 5, value: "Last 6 Month", isChecked: false},
           ],
           ReportPaymentTransfer :
             [
               {id: 1, value: "All", isChecked: true},
               {id: 2, value: "Last Week", isChecked: false},
               {id: 3, value: "Last Month", isChecked: false},
               {id: 4, value: "Last 3 Month", isChecked: false},
               {id: 5, value: "Last 6 Month", isChecked: false},
            ],
            OpenInvoiceStatus :
              [
              {id: 1, value: "All", isChecked: true},
              {id: 2, value: "Open", isChecked: false},
              {id: 3, value: "Fixed", isChecked: false},
            ],

     }

   ],



    };
     this.forceUpdateHandler = this.forceUpdateHandler.bind(this);


  }

 static contextType = DarkModeContext;

  componentDidMount() {

        this.getPaymentMethodButtonDetail(this.props.route.params.example.PaymentMethod)
     if(this.props.route.params.example.fromView === "QuickInvoice" || this.props.route.params.example.fromView === "PaymentList"  || this.props.route.params.example.fromView === "PaymentTransfer")
     {

       this.getEmployeeDetail()
     }
     this.listselectedvalue()
    // this.loadPaymenMethod( this.props.route.params.example.PaymentMethod)

  }

  listselectedvalue()
  {
    const filterFromDate =  this.props.route.params.example.FromDate.length!= 0 ? this.props.route.params.example.FromDate.split('/') : ''
    const  filterToDate = this.props.route.params.example.ToDate.length != 0 ?  this.props.route.params.example.ToDate.split('/') : ''

    this.setState({
      currentshowFromDate  : filterFromDate.length != 0 ? filterFromDate[2] + "-" + filterFromDate[1] + "-" + filterFromDate[0] : '' ,
      currentshowToDate    : filterToDate.length ? filterToDate[2] + "-" + filterToDate[1] + "-" + filterToDate[0] : '',
    })

  }


  FromcalendarOnPress(value) {
    this.setState({ currentSelection : value });
    this.toggleCalendar(true)
  }

  TocalendarOnPress(value) {
    this.setState({ currentSelection : value });
    this.toggleCalendar(true)
  }

  toggleCalendar(value)
  {

      this.props.route.params.example.fromView === 'PaymentTransfer' || this.props.route.params.example.fromView === 'RefundRequest' ?  this.setState({ calendarVisible : value }) :   this.setState({ calendarListVisible : value })
  }

  selectionOnPress(userType) {
    this.setState({ paymentMethodSelected: userType });
  }

  selectionServiceOnPress(userType) {
    this.setState({ selectedServiceButton: userType });
  }

  applyOnPress() {


  //  var date1 = new Date(this.state.afterSelectedFromDate);
   //var date2 = new Date(this.state.afterSelectedToDate);

   var fromDate = this.state.afterSelectedFromDate
     var toDate = this.state.afterSelectedToDate

   var frommonthfield = fromDate.split("/")[1];
    var fromdayfield = fromDate.split("/")[0];
    var fromyearfield = fromDate.split("/")[2];


    var tomonthfield = toDate.split("/")[1];
    var todayfield = toDate.split("/")[0];
    var toyearfield = toDate.split("/")[2];


    var fromDate = new Date(fromyearfield, frommonthfield-1, fromdayfield);
    var toDate = new Date(toyearfield, tomonthfield-1, todayfield);

   if(fromDate.getTime() > toDate.getTime())
   {
     this.setState({ showAlert: true,showAlertMessage : Localized.t('InvoiceDetailsPage.FromDatecannotbegreaterthanToDate')})
   }
   else {

      if(this.state.afterSelectedFromDate.length != 0  &&  this.state.afterSelectedToDate.length != 0)
      {
        if(!isProperDate(this.state.afterSelectedFromDate) || !isProperDate(this.state.afterSelectedToDate))
        {
            this.setState({ showAlert: true,showAlertMessage : Localized.t('InvoiceDetailsPage.Customdateformatisnotproper')})
        }
        else {

          var a = {  'Status' : this.state.selectedStatus }

          var filterData =
          {
            "PaymentMethod"  : this.state.paymentMethodSelected,
            "ServiceType" : this.state.selectedServiceButton,
            "FromDate" : this.state.afterSelectedFromDate,
            "ToDate" : this.state.afterSelectedToDate,
            "PaymentStatus" : this.state.selectedValue,
            "EmployeeID" :this.state.selectedEmployeeId == null ? '' :this.state.selectedEmployeeId
          }

          filterData =  this.props.route.params.example.fromView == "OpenInvoice" ? Object.assign({},a,filterData) : Object.assign({},filterData)
          // this.props.onSelectFilter(filterData);
          const { navigation, route } = this.props;
          route.params.onSelectFilter(filterData);
          navigation.goBack(null);

        }

      }
      else {

        if(this.state.afterSelectedFromDate.length == 0  &&  this.state.afterSelectedToDate.length == 0)
        {
        var a = {  'Status' : this.state.selectedStatus }

        var filterData =
        {
          "PaymentMethod"  : this.state.paymentMethodSelected,
          "ServiceType" : this.state.selectedServiceButton,
          "FromDate" : this.state.afterSelectedFromDate,
          "ToDate" : this.state.afterSelectedToDate,
          "PaymentStatus" : this.state.selectedValue,
          "EmployeeID" :this.state.selectedEmployeeId == null ? '' :this.state.selectedEmployeeId
        }

        filterData =  this.props.route.params.example.fromView == "OpenInvoice" ? Object.assign({},a,filterData) : Object.assign({},filterData)
        // this.props.onSelectFilter(filterData);
        const { navigation, route } = this.props;
        route.params.onSelectFilter(filterData);
        navigation.goBack(null);
      }
      else {
        this.setState({ showAlert: true,showAlertMessage : Localized.t('InvoiceDetailsPage.Customdateformatisnotproper')})
      }

      }


   }



  }


  forceUpdateHandler(){
    //  this.ShowCurrentFromDate()
    //  this.ShowCurrentToDate()
      //this.props.route.params.example.ClearAll = false
    let  arrayVal = this.props.route.params.example.fromView

    let  selMenu = (arrayVal === "Dashboard" ? this.state.languageArray[0].Dashboard : arrayVal === "OpenInvoice" ?  this.state.languageArray[0].OpenInvoice : arrayVal === "QuickInvoice" ?  this.state.languageArray[0].QuickInvoice  : arrayVal === "PaymentList" ?  this.state.languageArray[0].ReportPaymentList : arrayVal === "RefundRequest" ?  this.state.languageArray[0].ReportRefund : arrayVal === "PaymentTransfer" ?   this.state.languageArray[0].ReportPaymentTransfer  : this.state.languageArray[0].ReportCaptureRequest)
    console.log("OPOP:"+ selMenu);
    this.selectionOnPress("ALL")
    this.selectionServiceOnPress("ALL")
    this.getPaymentMethodButtonDetail("ALL")
    this.handleCheckChieldElement(selMenu[0])
    arrayVal === "OpenInvoice" ? this.handleOpenInvoiceElement(this.state.languageArray[0].OpenInvoiceStatus[0]) : null
       this.setState({
        // paymentMethodSelected: this.selectionOnPress("ALL"),//this.props.route.params.example.PaymentMethod ,
         //selectedServiceButton: this.selectionServiceOnPress("ALL"),// this.props.route.params.example.ServiceType,
         //selectedValue : this.handleCheckChieldElement(selMenu[0]),
         //selectedStatus : this.props.route.params.example.OpenStatus,
         selectedEmployeeId:  null,
         afterSelectedFromDate : '',
         afterSelectedToDate :'',
       });
    };


  handleCheckChieldElement(event){
    console.log(event.value);
    let langarray = this.state.languageArray
    let vr = this.props.route.params.example.fromView
      //console.log(vr);
    langarray.forEach(fruite => {
          let subtab = (vr === "Dashboard" ? fruite.Dashboard : vr === "OpenInvoice"  ?  fruite.OpenInvoice : vr === "QuickInvoice" ?  fruite.QuickInvoice  : vr === "PaymentList" ?  fruite.ReportPaymentList : vr === "RefundRequest" ?  fruite.ReportRefund :  vr === "PaymentTransfer" ?  fruite.ReportPaymentTransfer : fruite.ReportCaptureRequest)
          console.log("ho" + subtab);
             for (const [key, value] of Object.entries(subtab)) {
                   //console.log(key, value);
               if (value.value  === event.value)
                {

                  value.isChecked =  !event.isChecked
                  this.setState({selectedValue: value.value})

                }
                else {

                  value.isChecked =  false
                }

              }
    })
    this.setState({languageArray: langarray})


  }

  handleOpenInvoiceElement(event){
    console.log(event.value);
    let langarray = this.state.languageArray
    langarray.forEach(fruite => {

             for (const [key, value] of Object.entries(fruite.OpenInvoiceStatus)) {

               if (value.value  === event.value)
                {

                  value.isChecked =  !event.isChecked
                  this.setState({selectedStatus: value.value})
                  //console.log(key, value);
                }
                else {

                  value.isChecked =  false
                }

              }
    })
    this.setState({languageArray: langarray})


  }

  handleChange(name) {
    return (text) => {
          this.setState({[name]:text })
      }
 }

 calculateMonth() {

     console.log("CalculateMonth : " + this.state.currentshowFromDate);

  if(this.state.currentshowFromDate != 0)
  {
 var result = new Date(this.state.currentshowFromDate);
// result.setDate(result.getMonth());

//  var fromdte = format(result.getDate(), 'yyyy-MM-dd')
console.log("CalculateMonth1 : " +  result.getMonth());
console.log("CalculateMonth2 : " +  new Date().getMonth());
  console.log("CalculateMonth3 : " +  (new Date().getMonth()) - (result.getMonth()));

 //return (new Date().getMonth()) - (result.getMonth());
  return ( ((new Date().getMonth()) - (result.getMonth())) < 0 ? 1 :  ((new Date().getMonth()) - (result.getMonth())));
}
  return 1
}

calculatePastMonth() {

    console.log("CalculateMonth : " + this.state.currentshowFromDate);
 if(this.state.currentshowFromDate.length != 0)
 {
var result = new Date(this.state.currentshowFromDate);
// result.setDate(result.getMonth());

//  var fromdte = format(result.getDate(), 'yyyy-MM-dd')
console.log("CalculateMonth1 : " +  result.getMonth());
console.log("CalculateMonth2 : " +  new Date().getMonth());
 console.log("CalculateMonth3 : " +  (new Date().getMonth()) - (result.getMonth()));

return (result.getMonth()) - (new Date().getMonth() - 6);
}
 return 6
}

 ShowCurrentFromDate()
 {
       var today = new Date()
       var currentdate

       currentdate = new Date(today.setDate(today.getDate()))
       currentdate = format(currentdate, 'dd/MM/yyyy')
      console.log(currentdate);

       this.setState({
        selectedFromDate:currentdate,
        });
  }

  ShowCurrentToDate()
  {
        var today = new Date()
        var currentdate

        currentdate = new Date(today.setDate(today.getDate()))
        currentdate = format(currentdate, 'dd/MM/yyyy')
       console.log(currentdate);

        this.setState({
          selectedToDate:currentdate,
         });
   }


  getEmployeeDetail() {
   var self = this;
   API.get(GLOBAL.API_STRING.EMPLOYEES  + `?page=${self.state.page}`,{

     params: {
        'merchantCode' : GLOBAL.MERCHANT_CODE,
       }


   }).then(function (response) {

     const json = JSON.parse(response)
     const tempticket = [];

     var pageurl;


      let newArray = json.response.data

   if(json.response.data.length != 0)
   {
     console.log('fgfg');
     newArray.map((y) => {
      if(  y.status == 1)
      {
    //  tempticket.push({ label: y.MerchantUserName, value: y.id});
      tempticket.push({ label: y.username, value: y.employee_merchant_id});
      }

      })
      if(tempticket.length == 0)
      {
         tempticket.push({ label: Localized.t('CommanTabPage.No Data Found'), value: 1,disabled: true});
      }

  }
  else {
    tempticket.push({ label: Localized.t('CommanTabPage.No Data Found'), value: 1,disabled: true});
  }

    //console.log('xxx ' + tempticket);

  self.setState(prevState =>
    ({
    employeeDropdown: [...prevState.employeeDropdown,...tempticket]
     }))

     self.setState({
       employeeDropdownArray :  json.response.data
     })


     if(json.response.next_page_url != null)
     {

      pageurl = json.response.next_page_url.split('=');

      self.setState({
        //data : json.response.data,
        page: pageurl[1],

      })

      self.getEmployeeDetail()
     }else {

        pageurl = self.state.page
     }




   })
   .catch(function (error) {
     console.log(error);
   });


  }


  getPaymentMethodButtonDetail(name) {

    let markers = [];
    let markers1 = [];

   markers.push({
   id :0,
   name : "ALL",
   dis_Name : "ALL",
   isChecked : name == "ALL" ? true :false
 })

 	 for(let i = 0; i < global.paymentType.length; i++) {

    if(global.paymentType[i].id != 6)
    {

    if(markers.length == 3)
    {

     markers1.push(markers)
       markers = [];
      markers.push({
        id :i + 1,
        name : global.paymentType[i].name,
        dis_Name : global.paymentType[i].display_name,
        isChecked : name == global.paymentType[i].name ? true :false
      });
       console.log("BBB1 : " + global.paymentType[i].name);

       if(i == (global.paymentType.length-1))
       {
         markers1.push(markers)
       }



   }else {

        console.log("BBB2 : " + global.paymentType[i].name);
     if(i == (global.paymentType.length-1))
     {
       markers.push({
         id : i + 1,
         name : global.paymentType[i].name,
         dis_Name : global.paymentType[i].display_name,
         isChecked : name == global.paymentType[i].name ? true :false
       });
        markers1.push(markers)

     }
     else {
       markers.push({
         id : i+1,
         name : global.paymentType[i].name,
         dis_Name : global.paymentType[i].display_name,
         isChecked : name == global.paymentType[i].name ? true :false
       });
     }

   }

   }
 }

     //console.log("BBB : " + markers1[0]);
   this.setState({
	  paymentMethodButtonArray: markers1
	 })
//  console.log("BBB : " + markers);

  }


  handlePaymenMethodButtonClick(event){
    console.log(event.name);
    let langarray = this.state.paymentMethodButtonArray
    langarray.forEach(fruite => {

             for (const [key, value] of Object.entries(fruite)) {

               if (value.name  === event.name)
                {

                  value.isChecked =  !event.isChecked
                  this.setState({paymentMethodSelected: value.name})
                  console.log(key, value);
                }
                else {

                  value.isChecked =  false
                }

              }
    })
    this.setState({paymentMethodButtonArray: langarray})


  }

  passDataToFilterModal()
  {
    this.forceUpdateHandler()
  }

  onPressAlertPositiveButton = () => {

    this.setState({showAlert: false}, () => {

    });


    };




  render(){
    const isDarkMode = this.context === 'dark';
    const screenWidth = Dimensions.get("window").width;
    console.log("heelo" + this.props.route.params.example.SubType);
      console.log("heel11o" + this.props.route.params.example.ClearAll);

    //const arrayValue = this.props.example;
      var selectionMenu
      var arrayValue

    if(this.props.route.params.example.ClearAll)
    {
     this.forceUpdateHandler()

   }

     arrayValue = this.props.route.params.example.fromView
     selectionMenu = (arrayValue === "Dashboard" ? this.state.languageArray[0].Dashboard : arrayValue === "OpenInvoice" ?  this.state.languageArray[0].OpenInvoice : arrayValue === "QuickInvoice" ?  this.state.languageArray[0].QuickInvoice  : arrayValue === "PaymentList" ?  this.state.languageArray[0].ReportPaymentList : arrayValue === "RefundRequest" ?  this.state.languageArray[0].ReportRefund : arrayValue === "PaymentTransfer" ? this.state.languageArray[0].ReportPaymentTransfer : this.state.languageArray[0].ReportCaptureRequest )




    return(

      <View style={{
        backgroundColor: 'transparent',
      //  height : '100%'
        //opacity: 0.7
        }}>



        <View
        style={{
          marginTop :'50%',
          height : '100%',
          //padding : 10,
        //  marginLeft : '6%',
          //marginRight : '6%',
        //  alignItems : "center",
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          borderTopLeftRadius : 10,
          borderTopRightRadius : 10
        }} >

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
           padding : 10,
          flexDirection: "row",
          width : '100%',
          //height : 40,
          alignItems : "center",
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
        }} >

        <TouchableOpacity
        style={{...styles.button}}
        onPress={() => {
        this.props.navigation.goBack(null)}}>
        <Image style={styles.icon4} source={require('../screens/pages/Assest/close.png')} />
        </TouchableOpacity>
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 0,fontSize : RFValue(22),fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{Localized.t('FilterPage.Filter')}</Text>

        <TouchableOpacity
        disabled={arrayValue === "Dashboard" ? true : false}
        style={{...styles.button1}}
        onPress={() =>   this.passDataToFilterModal()}>
        <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize : RFValue(17)}}> {arrayValue === "Dashboard" ? "       " : Localized.t('FilterPage.Clearall')}</Text>
        </TouchableOpacity>
        </View>


       <View style={{flex: 1,
        marginLeft : '6%',
        marginRight : '6%',
       }}>
       <ScrollView nestedScrollEnabled={true} contentContainerStyle={{
        paddingBottom: 500
        }}
        showsVerticalScrollIndicator={false}
        >

         <Text style = {{marginLeft : 0,marginTop : 10,fontSize : RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-Medium',
          display : arrayValue === 'PaymentTransfer' ||  arrayValue === 'RefundRequest' ||arrayValue === 'Dashboard' ? 'none'  : null,textAlign : 'left'
       }}>{arrayValue === 'OpenInvoice'? Localized.t('FilterPage.Status') :Localized.t('FilterPage.PaymentStatus')}</Text>

         <View
         style={{
           justifyContent: 'space-between',
           marginTop :10,
           flexDirection: "column",
           display : arrayValue === 'PaymentTransfer' ||  arrayValue === 'RefundRequest' || arrayValue === 'Dashboard' ? 'none'  : null
           //height : 40,
           //  alignItems : "stretch",
         }}>

        <View style={{

        }} >
          {

             selectionMenu.map((item, index) => (
               <View style={{
              flexDirection :'column',
               }} >

               <View  style={{
                 flexDirection :'row',
                 justifyContent : 'space-between',
                 alignItems : 'center',
                 marginLeft : 0,
                 height : 40,
                 width : '100%',
                 }}>

                 <Text style = {{fontSize : RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY,width : '50%',textAlign : 'left'}} >{Localized.t('CommanTabPage.' + item.value)}</Text>

                 <CheckBox
                 checkedIcon={<AntDesignIcons name="checkcircle" size={27} style = {{color : GLOBAL.COLOR.ORANGE, marginTop : -17,marginRight : -20}}  />}
                 uncheckedIcon={<FeatherIcons name="circle" color = {isDarkMode ? GLOBAL.COLOR.DARKGRAY  : GLOBAL.COLOR.ACCENTBLUE}  size={27} style = {{marginTop : -16,marginRight : -20}}/>}
                 checked={item.value == this.state.selectedValue ? true : false}
                 onPress={() => this.handleCheckChieldElement(item)}
                 key={index}
                 disabled={arrayValue === "Dashboard" ? true : false}
                //  handleCheckChieldElement ={this.handleCheckChieldElement(item)}
                 />
                  </View>
                  </View>
             ))
          }
        </View>
        </View>


        <Text style = {{marginLeft : 0,marginTop : 10,fontSize : RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-Medium',
         display : arrayValue === 'OpenInvoice' ?  null : 'none',textAlign : 'left'
      }}>{Localized.t('FilterPage.PaymentType')}</Text>

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :10,
          flexDirection: "column",
          display :arrayValue === 'OpenInvoice' ?  null : 'none'
          //height : 40,
          //  alignItems : "stretch",
        }}>

       <View style={{

       }} >
         {

            this.state.languageArray[0].OpenInvoiceStatus.map((item, index) => (
              <View style={{
             flexDirection :'column',
              }} >

              <View  style={{
                flexDirection :'row',
                justifyContent : 'space-between',
                alignItems : 'center',
                marginRight : -20,
                height : 40,
                }}>

                <Text style = {{fontSize : RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,width : '50%',textAlign : 'left'}} >{Localized.t('CommanTabPage.' + item.value)}</Text>

                <CheckBox
                checkedIcon={<AntDesignIcons name="checkcircle" size={27} style = {{color : GLOBAL.COLOR.ORANGE,marginTop : -17}}  />}
                uncheckedIcon={<FeatherIcons name="circle" color= {isDarkMode ? GLOBAL.COLOR.DARKGRAY  : GLOBAL.COLOR.ACCENTBLUE}  size={27} style = {{marginTop : -16 }} />}
                checked={item.value == this.state.selectedStatus ? true : false}
                onPress={() => this.handleOpenInvoiceElement(item)}
                key={index}
               //  handleCheckChieldElement ={this.handleCheckChieldElement(item)}
                />
                 </View>
                 </View>
            ))
         }
       </View>
       </View>


        <View
        style={{
          flexDirection: "column",
          display : arrayValue === 'RefundRequest' || arrayValue === 'PaymentTransfer' ? null  : 'none'
        }}
       >
       <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 30,fontSize : RFValue(17),fontFamily : 'Prompt-Bold',textAlign : 'left'}}>{Localized.t('FilterPage.CustomDates')}</Text>

       <View
       style={{
         justifyContent: 'space-between',
         marginTop :10,
         marginLeft : 0,
         flexDirection: "row",
         width : '100%',
         //height : 40,
         alignItems : "center",
       }} >
       <View style={{
         marginTop :0,
         marginLeft : 5,
         marginRight : 0,
         height : 50,
         width : '40%',
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
         alignItems: 'center',
         flexDirection: "row",
         justifyContent: 'space-between',
       }} >

       <TextInput style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10}}
       onChangeText={this.handleChange('afterSelectedFromDate')}
       placeholder = {this.state.selectedFromDate}
       placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
       returnKeyType="next"
       onSubmitEditing={() => this.toDate.focus()}
       value = {this.state.afterSelectedFromDate}
       >
       </TextInput>
       <TouchableOpacity
       style={styles.button5}
       onPress={() => this.FromcalendarOnPress('From')}>
       <Image style={styles.icon2} source={require('../screens/pages/Assest/calendarGray.png')} />
       </TouchableOpacity>
       </View>
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(14),marginTop : 0,width :  global.selectValue ==  'en' ? 20 : 30 ,textAlign : 'center'}}> {Localized.t('CommanTabPage.to')} </Text>
       <View style={{
         marginTop :0,
         marginLeft : 0,
         marginRight : 5,
         height : 50,
           width : '40%',
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
         alignItems: 'center',
         flexDirection: "row",
         justifyContent: 'space-between',
       }} >

       <TextInput style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10}}
       ref={(input) => { this.toDate = input; }}
       onChangeText={this.handleChange('afterSelectedToDate')}
       returnKeyType="done"
       placeholder = {this.state.selectedToDate}
        placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
       value = {this.state.afterSelectedToDate}
       >
       </TextInput>
       <TouchableOpacity
       style={styles.button5}
       onPress={() => this.TocalendarOnPress('To')}>
       <Image style={styles.icon2} source={require('../screens/pages/Assest/calendarGray.png')} />
       </TouchableOpacity>

        </View>
        </View>
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
  justifyContent: 'flex-start',
  alignItems : 'center'
   }
  }





        }}

          //markingType={this.state.markedType}
           current = {this.state.currentSelection == 'From' ?  this.state.currentshowFromDate : this.state.currentshowToDate.length != 0 ? this.state.currentshowToDate : this.state.currentshowFromDate}
          maxDate={format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')}

          hideArrows={Platform.OS === "android" ? true : false}
          renderArrow={(direction) => direction === 'left' ? <FeatherIcons name = {global.selectValue ==  'en' ? 'chevron-left' : 'chevron-right'}
size = {
30
}
color = 'blue'
/> : < FeatherIcons name = {global.selectValue ==  'en' ? 'chevron-right' : 'chevron-left'}
size = {
30
}
color = 'blue'
/>}
        //  markedDates={this.state.marked}
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={Platform.OS === "android" ?  this.state.currentSelection == 'From' ?  global.selectValue == 'en' ? 6 : 6 :  global.selectValue == 'en' ? this.calculateMonth() : 1 : 10}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 6 :6 : 10}
          // Enable or disable scrolling of calendar list
          //scrollEnabled={true}
          horizontal={Platform.OS === "android" ? false :true}

       // Enable paging on horizontal, default = false
        // pagingEnabled={true}
         // Set custom calendarWidth.
          calendarWidth={320}


          selected={  this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate}
          onDayPress={(day) => {
            this.state.currentSelection == 'From' ? this.setState({ afterSelectedFromDate : format(parseISO(day.dateString), 'dd/MM/yyyy') }) : this.setState({ afterSelectedToDate : format(parseISO(day.dateString), 'dd/MM/yyyy') })
            console.log('selected day', day)
            this.state.currentSelection == 'From' ? this.setState({ currentshowFromDate : format(parseISO(day.dateString), 'yyyy-MM-dd') }) : this.setState({ currentshowToDate : format(parseISO(day.dateString), 'yyyy-MM-dd') })

            this.toggleCalendar(false)
          }}

          markedDates={{
            [this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'orange',
              selectedTextColor: GLOBAL.COLOR.WHITE
            },

          }}
          // Enable or disable vertical scroll indicator. Default = false
          //showScrollIndicator={true}

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
           <Image style={styles.icon4} source={require('../screens/pages/Assest/close.png')} />
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
            current = {this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate.length != 0 ? this.state.currentshowToDate : this.state.currentshowFromDate}
           maxDate={format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')}

           hideArrows={Platform.OS === "android" ? true : false}
         //  markedDates={this.state.marked}
           // Callback which gets executed when visible months change in scroll view. Default = undefined
           onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
           // Max amount of months allowed to scroll to the past. Default = 50
           pastScrollRange={Platform.OS === "android" ?  this.state.currentSelection == 'From' ?  global.selectValue == 'en' ? this.calculatePastMonth() : this.calculatePastMonth() :  global.selectValue == 'en' ? this.calculateMonth() : 1 : 10}
           // Max amount of months allowed to scroll to the future. Default = 50
           futureScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 6 :6 : 10}
           // Enable or disable scrolling of calendar list
           //scrollEnabled={true}
           horizontal={Platform.OS === "android" ? false :true}

        // Enable paging on horizontal, default = false
         // pagingEnabled={true}
          // Set custom calendarWidth.
           calendarWidth={320}


           selected={  this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate}
           onDayPress={(day) => {
             this.state.currentSelection == 'From' ? this.setState({ afterSelectedFromDate : format(parseISO(day.dateString), 'dd/MM/yyyy') }) : this.setState({ afterSelectedToDate : format(parseISO(day.dateString), 'dd/MM/yyyy') })
             console.log('selected day', day)
             this.state.currentSelection == 'From' ? this.setState({ currentshowFromDate : format(parseISO(day.dateString), 'yyyy-MM-dd') }) : this.setState({ currentshowToDate : format(parseISO(day.dateString), 'yyyy-MM-dd') })

             this.toggleCalendar(false)
           }}

           markedDates={{
             [this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate]: {
               selected: true,
               disableTouchEvent: true,
               selectedColor: 'orange',
               selectedTextColor: GLOBAL.COLOR.WHITE
             },

           }}
           // Enable or disable vertical scroll indicator. Default = false
           //showScrollIndicator={true}

           />


         </ModalContent>
        </CalenderModals.BottomModal>


          <View
          style={{
            alignItems : 'flex-start',
            marginTop : 10,
          //  marginLeft : '8%',
            display : arrayValue === 'PaymentTransfer'  || arrayValue === 'OpenInvoice'   ? 'none' : null,
          }}>
          <Text style={{fontSize: RFValue(17),color :isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKBLUE,justifyContent : 'flex-start',alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('FilterPage.PaymentMethod')}</Text>
          </View>


          <View
         style={{
          // alignItems: 'flex-start',
           justifyContent : 'space-between',
           flexDirection: "column",

             display : arrayValue === 'PaymentTransfer' ||  arrayValue === 'OpenInvoice' ? 'none' : null
         }} >

        {/* <TouchableOpacity
         style={{
           justifyContent: 'center',
           marginTop :30,
           marginLeft : 0,
           flexDirection: "row",
           borderRadius : 10,
           height : 50,
           alignItems : "center",
           backgroundColor : this.state.paymentMethodSelected === "ALL" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
           width : '30%'
         }}
        onPress={() => this.selectionOnPress("ALL")}

        >

         <FeatherIcons name="check" color=GLOBAL.COLOR.WHITE  size={20} style = {{
              ...styles.icon,...{display : this.state.paymentMethodSelected === "ALL" ? null :'none'}
            }}  />
         <Text style =  {{...styles.btnText,...{color : this.state.paymentMethodSelected === "ALL" ? GLOBAL.COLOR.WHITE:'#867EBD'}}}>{Localized.t('FilterPage.All')}</Text>
         </TouchableOpacity>*/}

         <View style = {{flexDirection : 'column'}}>
         {

         this.state.paymentMethodButtonArray.map((items, index) =>{
        //   console.log('AAA :' + items.name);

          return(
                <View style = {{flexDirection : 'row',justifyContent : 'flex-start',alignItems : 'center'}}>
            {

            items.map((item, index) =>{
            //  console.log('AAA :' + item);

             return(
           <TouchableOpacity
           style={{
             justifyContent: 'center',
             marginTop :30,
             marginLeft : index == 0 ? 0 : '5%',
             flexDirection: "row",
            // padding : 10,
             borderRadius : 10,
             height : 50,
             alignItems : "center",
             backgroundColor : item.isChecked === true ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
            width : '30%'
           }}
            onPress={() => this.handlePaymenMethodButtonClick(item)}

          >
          <FeatherIcons name="check" color= {GLOBAL.COLOR.WHITE}  size={20} style = {{
               ...styles.icon,...{display : item.isChecked === true ? null :'none'}
             }}  />
           <Text style =  {{...styles.btnText,...{color : item.isChecked === true ? GLOBAL.COLOR.WHITE:'#867EBD'}}}>{(Localized.t('FilterPage.' + upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(item.dis_Name)))).toUpperCase()}</Text>
           </TouchableOpacity>


           );})

         }

         {/*<TouchableOpacity
         style={{
           justifyContent: 'center',
           marginTop :30,
           marginLeft : 0,
           flexDirection: "row",
           // padding : 10,
           borderRadius : 10,
           height : 50,
           alignItems : "center",
           backgroundColor : this.state.paymentMethodSelected === "KNET" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
            width : '30%'
         }}
        onPress={() => this.selectionOnPress("KNET")}

        >
        <FeatherIcons name="check" color=GLOBAL.COLOR.WHITE  size={20} style = {{
             ...styles.icon,...{display : this.state.paymentMethodSelected === "KNET" ? null :'none'}
           }}  />
         <Text style =  {{...styles.btnText,...{color : this.state.paymentMethodSelected === "KNET" ? GLOBAL.COLOR.WHITE:'#867EBD'}}}>{Localized.t('FilterPage.Knet')}</Text>
         </TouchableOpacity>

         <TouchableOpacity
         style={{
           justifyContent: 'center',
           marginTop :30,
           marginLeft : 0,
           flexDirection: "row",
           // padding : 10,
           borderRadius : 10,
           height : 50,
           alignItems : "center",
           backgroundColor : this.state.paymentMethodSelected === "MPGS" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
            width : '30%'
         }}
          onPress={() => this.selectionOnPress("MPGS")}

        >
        <FeatherIcons name="check" color=GLOBAL.COLOR.WHITE  size={20} style = {{
             ...styles.icon,...{display : this.state.paymentMethodSelected === "MPGS" ? null :'none'}
           }}  />
         <Text style =  {{...styles.btnText,...{color : this.state.paymentMethodSelected === "MPGS" ? GLOBAL.COLOR.WHITE:'#867EBD'}}}>{Localized.t('FilterPage.Mpgs')}</Text>
         </TouchableOpacity>*/}
         </View>

       );})
     }
       </View>

         </View>


         <View
         style={{
           alignItems : 'flex-start',
           marginTop :20,
             display : arrayValue === 'RefundRequest' ? null  : 'none'
         }}>
         <Text style={{fontSize: RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE,justifyContent : 'flex-start',alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('FilterPage.ServiceType')}</Text>
         </View>


         <View
        style={{
          alignItems: 'center',
          justifyContent : 'space-between',
          flexDirection: "row",
            display : arrayValue === 'RefundRequest'  ? null  : 'none'
        }} >

        <TouchableOpacity
        style={{
          justifyContent: 'center',
          marginTop :30,
          marginLeft : 0,
          flexDirection: "row",
          borderRadius : 10,
          height : 50,
          alignItems : "center",
          backgroundColor : this.state.selectedServiceButton === "ALL" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
          width : '30%'
        }}
       onPress={() => this.selectionServiceOnPress("ALL")}

       >

        <FeatherIcons name="check" color= {GLOBAL.COLOR.WHITE}  size={20} style = {{
             ...styles.icon,...{display : this.state.selectedServiceButton === "ALL" ? null :'none'}
           }}  />
        <Text style =  {{...styles.btnText,...{color : this.state.selectedServiceButton === "ALL" ? GLOBAL.COLOR.WHITE:'#867EBD'}}}>{Localized.t('FilterPage.All')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={{
          justifyContent: 'center',
          marginTop :30,
          marginLeft : 0,
          flexDirection: "row",
          // padding : 10,
          borderRadius : 10,
        //  height : 50,
          alignItems : "center",
          backgroundColor : this.state.selectedServiceButton === "Payment Gateway" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
           width : '30%'
        }}
       onPress={() => this.selectionServiceOnPress("Payment Gateway")}

       >
       <FeatherIcons name="check" color= {GLOBAL.COLOR.WHITE}  size={20} style = {{
            ...styles.icon,...{display : this.state.selectedServiceButton === "Payment Gateway" ? null :'none'}
          }}  />
        <Text style =  {{...styles.btnText,...{color : this.state.selectedServiceButton === "Payment Gateway" ? GLOBAL.COLOR.WHITE:'#867EBD'}}}>{Localized.t('FilterPage.PaymentGateway')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={{
          justifyContent: 'center',
          marginTop :30,
          marginLeft : 0,
          flexDirection: "row",
          // padding : 10,
          borderRadius : 10,
          //height : 50,
          alignItems : "center",
          backgroundColor : this.state.selectedServiceButton === "SMS Payment" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
           width : '30%'
        }}
         onPress={() => this.selectionServiceOnPress("SMS Payment")}

       >
       <FeatherIcons name="check" color= {GLOBAL.COLOR.WHITE}  size={20} style = {{
            ...styles.icon,...{display : this.state.selectedServiceButton === "SMS Payment" ? null :'none'}
          }}  />
        <Text style =  {{...styles.btnText,...{color : this.state.selectedServiceButton === "SMS Payment" ? GLOBAL.COLOR.WHITE:'#867EBD'}}}>{Localized.t('FilterPage.QuickInvoice')}</Text>
        </TouchableOpacity>

        </View>



         <View
         style={{
           marginTop : 20,
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
           display : arrayValue === 'Dashboard' || arrayValue === 'Clearall' || arrayValue === 'RefundRequest'|| arrayValue === 'OpenInvoice' || arrayValue === 'QuickInvoice'  || arrayValue === 'PaymentTransfer'?  'none' : arrayValue === 'PaymentList' ? this.props.route.params.example.SubType == "PaymentGateway" ? null :"none" :  arrayValue === 'CaptureRequests' ? 'none' :null
         }}>
           <TouchableOpacity  style={{flexDirection : 'row', justifyContent : 'space-between',height : 50,alignItems:'center'}} >
          <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKBLUE,justifyContent : 'flex-start',alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('FilterPage.Employee')}</Text>
           <FeatherIcons
            name   = {  arrayValue === 'PaymentTransfer' ? "chevron-right" : arrayValue === 'PaymentList' ? this.props.route.params.example.SubType == "PaymentGateway" ? "lock" :"chevron-right" :"lock"}
            color= {GLOBAL.COLOR.DARKGRAY}  size={24} />
          </TouchableOpacity>
         </View>

         <View
         style={{


            ...Platform.select({
     ios: {
       marginTop : 10,
      flexDirection: "column",
       display :  arrayValue === 'QuickInvoice' || arrayValue === 'PaymentTransfer' ?  null  : arrayValue === 'PaymentList' ? this.props.route.params.example.SubType == "PaymentGateway" ? "none" : null : 'none',
       shadowColor: GLOBAL.COLOR.LIGHTBLUE,
       shadowOffset: {
         width: 0,
         height: 7,
       },
       shadowOpacity: 0.1,
       shadowRadius: 9.11,
       borderRadius : 10,
       elevation: 10,
       backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK  :  GLOBAL.COLOR.WHITE,
        zIndex :99999
     },
     android: {
       marginTop : 10,
        display :  arrayValue === 'QuickInvoice' || arrayValue === 'PaymentTransfer' ?  null  : arrayValue === 'PaymentList' ? this.props.route.params.example.SubType == "PaymentGateway" ? "none" : null : 'none',
       //
     },
 }),
         }}>

           <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 30,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',textAlign : 'left',marginBottom : 10}}>{Localized.t('FilterPage.CreatedBy')}</Text>

           <DropDownPicker
           onOpen={() => { Keyboard.dismiss(), this.setState({

            topContraint: Platform.OS === "android" ? 500 :20,
          })   }}

          onClose={() => this.setState({

           topContraint: Platform.OS === "android" ? 20 :20,
         }) }

             items={this.state.employeeDropdown}
            placeholder = {Localized.t('FilterPage.SelectUserName')}

          defaultValue={this.state.selectedEmployeeId}
         inputContainerStyle={{ borderWidth: 1, borderColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,}}
         underlineColor= 'transparent'

          containerStyle={{height: 50,marginTop : 0,}}
           dropDownStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,width : '100%'}}
           arrowColor={ isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
           arrowStyle = {{height : 20,width : 20,alignItems : 'center'}}
           arrowSize = {20}

          placeholderStyle = {{width :'100%'}}
          style={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,borderColor:"transparent",borderWidth : isDarkMode ? 1 : 0 ,borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE }}
           itemStyle={{
           justifyContent:  'flex-start' ,
            }}
        labelStyle={{
         color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-Regular',textAlign : 'left',width : '100%'
        }}

        onChangeItem={item =>
          {

          this.setState({
         selectedEmployeeId: item.value
       })
     }
     }

         />

         </View>


         <View
         style={{
           marginTop : this.state.topContraint,
           alignItems : 'center',
           flexDirection : 'row',
            display : arrayValue === 'Dashboard' || arrayValue === 'Clearall' || arrayValue === 'RefundRequest' || arrayValue === 'PaymentTransfer'  || arrayValue === 'OpenInvoice' || arrayValue === 'QuickInvoice' || arrayValue === 'CaptureRequests' ?  'none' : arrayValue === 'PaymentList' ? this.props.route.params.example.SubType == "PaymentGateway" ? null :"none" : null
         }}>
          <AntDesignIcons name="exclamationcircleo" color = {GLOBAL.COLOR.DARKGRAY}  size={24} />
          <Text style={{fontSize: RFValue(13),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',marginLeft : 10}}>{Localized.t('FilterPage.FilterMessage')}</Text>
         </View>

         <View
         style={{
           flexDirection: "column",
           display : arrayValue === 'PaymentList' || arrayValue === 'CaptureRequests'  ?  null : 'none'
         }}
        >
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : this.state.topContraint,fontSize : RFValue(17),fontFamily : 'Prompt-Bold',textAlign : 'left'}}>{Localized.t('FilterPage.CustomDates')}</Text>

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :10,
          marginLeft : 0,
          flexDirection: "row",
          width : '100%',
          //height : 40,
          alignItems : "center",
        }} >
        <View style={{
          marginTop :0,
          marginLeft : 5,
          marginRight : 0,
          height : 50,
          width : '40%',
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
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',
        }} >

        <TextInput style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10}}
        onChangeText={this.handleChange('afterSelectedFromDate')}
        placeholder = {this.state.selectedFromDate}
        placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
        returnKeyType="next"
        onSubmitEditing={() => this.toDate.focus()}
        value = {this.state.afterSelectedFromDate}
        >
        </TextInput>
        <TouchableOpacity
        style={styles.button5}
        onPress={() => this.FromcalendarOnPress('From')}>
        <Image style={styles.icon2} source={require('../screens/pages/Assest/calendarGray.png')} />
        </TouchableOpacity>
        </View>

        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(14),marginTop : 0,width :  global.selectValue ==  'en' ? 20 : 30 ,textAlign : 'center'}}> {Localized.t('CommanTabPage.to')} </Text>

        <View style={{
          marginTop :0,
          marginLeft : 0,
          marginRight : 5,
          height : 50,
            width : '40%',
          shadowColor: GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderRadius : 10,
          elevation: 10,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',
        }} >

        <TextInput style =  {{color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,marginLeft : 10}}
        ref={(input) => { this.toDate = input; }}
        onChangeText={this.handleChange('afterSelectedToDate')}
        returnKeyType="done"
        placeholder = {this.state.selectedToDate}
        placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
        value = {this.state.afterSelectedToDate}

        >
        </TextInput>
        <TouchableOpacity
        style={styles.button5}
        onPress={() => this.TocalendarOnPress('To')}>
        <Image style={styles.icon2} source={require('../screens/pages/Assest/calendarGray.png')} />
        </TouchableOpacity>

         </View>
         </View>
         </View>

         <CalendarList
         style={{
       // height: 350,
        marginLeft : 0,
        marginTop : 10,
        width : '100%',
        display : Platform.OS === "android" ? 'none' : this.state.calendarListVisible == true ? null :'none'
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
   justifyContent: 'flex-start',
   alignItems : 'center'
    }
   }





         }}

           //markingType={this.state.markedType}
            current = {this.state.currentSelection == 'From' ?  this.state.currentshowFromDate : this.state.currentshowToDate.length != 0 ? this.state.currentshowToDate : this.state.currentshowFromDate}
           maxDate={format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')}
         //  markedDates={this.state.marked}
           // Callback which gets executed when visible months change in scroll view. Default = undefined
           onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
           // Max amount of months allowed to scroll to the past. Default = 50
           pastScrollRange={Platform.OS === "android" ?  this.state.currentSelection == 'From' ? global.selectValue ==  'en' ? 6 :6 : global.selectValue ==  'en' ? this.calculateMonth() :1 : 10}
           // Max amount of months allowed to scroll to the future. Default = 50
           futureScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 6 :6 : 10}
           // Enable or disable scrolling of calendar list
           //scrollEnabled={true}
            horizontal={Platform.OS === "android" ? false :true}
            hideArrows={Platform.OS === "android" ? true : false}
            renderArrow={(direction) => direction === 'left' ? <FeatherIcons name = {global.selectValue ==  'en' ? 'chevron-left' : 'chevron-right'}
  size = {
  30
  }
  color = 'blue'
  /> : < FeatherIcons name = {global.selectValue ==  'en' ? 'chevron-right' : 'chevron-left'}
  size = {
  30
  }
  color = 'blue'
  />}
        // Enable paging on horizontal, default = false
         // pagingEnabled={true}
          // Set custom calendarWidth.
           calendarWidth={320}


           selected={  this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate}
           onDayPress={(day) => {
             this.state.currentSelection == 'From' ? this.setState({ afterSelectedFromDate : format(parseISO(day.dateString), 'dd/MM/yyyy') }) : this.setState({ afterSelectedToDate : format(parseISO(day.dateString), 'dd/MM/yyyy') })
             console.log('selected day', day)
             this.state.currentSelection == 'From' ? this.setState({ currentshowFromDate : format(parseISO(day.dateString), 'yyyy-MM-dd') }) : this.setState({ currentshowToDate : format(parseISO(day.dateString), 'yyyy-MM-dd') })

             this.toggleCalendar(false)
           }}

           markedDates={{
             [this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate]: {
               selected: true,
               disableTouchEvent: true,
               selectedColor: 'orange',
               selectedTextColor: GLOBAL.COLOR.WHITE
             },

           }}
           // Enable or disable vertical scroll indicator. Default = false
           //showScrollIndicator={true}

           />


           <CalenderModals.BottomModal
           propagateSwipe={true}
           visible={Platform.OS === "android" ? this.state.calendarListVisible : false}
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
            <Image style={styles.icon4} source={require('../screens/pages/Assest/close.png')} />
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
         display :  this.state.calendarListVisible == true ? null :'none'
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
             current = {this.state.currentSelection == 'From' ?  this.state.currentshowFromDate : this.state.currentshowToDate.length != 0 ? this.state.currentshowToDate : this.state.currentshowFromDate}
            maxDate={format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')}
          //  markedDates={this.state.marked}
            // Callback which gets executed when visible months change in scroll view. Default = undefined
            onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={Platform.OS === "android" ?  this.state.currentSelection == 'From' ? global.selectValue ==  'en' ? this.calculatePastMonth() :this.calculatePastMonth() : global.selectValue ==  'en' ? this.calculateMonth() :1 : 10}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 6 :6 : 10}
            // Enable or disable scrolling of calendar list
            //scrollEnabled={true}
             horizontal={Platform.OS === "android" ? false :true}
             hideArrows={Platform.OS === "android" ? true : false}
         // Enable paging on horizontal, default = false
          // pagingEnabled={true}
           // Set custom calendarWidth.
            calendarWidth={320}


            selected={  this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate}
            onDayPress={(day) => {
              this.state.currentSelection == 'From' ? this.setState({ afterSelectedFromDate : format(parseISO(day.dateString), 'dd/MM/yyyy') }) : this.setState({ afterSelectedToDate : format(parseISO(day.dateString), 'dd/MM/yyyy') })
              console.log('selected day', day)
              this.state.currentSelection == 'From' ? this.setState({ currentshowFromDate : format(parseISO(day.dateString), 'yyyy-MM-dd') }) : this.setState({ currentshowToDate : format(parseISO(day.dateString), 'yyyy-MM-dd') })

              this.toggleCalendar(false)
            }}

            markedDates={{
              [this.state.currentSelection == 'From' ?  this.state.currentshowFromDate :  this.state.currentshowToDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: 'orange',
                selectedTextColor: GLOBAL.COLOR.WHITE
              },

            }}
            // Enable or disable vertical scroll indicator. Default = false
            //showScrollIndicator={true}

            />


          </ModalContent>
         </CalenderModals.BottomModal>

          <View style={{
            alignItems : 'flex-end',
            marginTop : 30,
            }}>
          <CustomButton title= {Localized.t('FilterPage.Apply')} style = {{fontSize : RFValue(20)}}  onPress={() => this.applyOnPress()}/>
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
          </ScrollView>
          </View>
          </View>
          </View>
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
      fontFamily : 'Prompt-Medium',
    //  marginBottom: 4,
    //  marginRight: 20,
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
    button5: {
      alignItems: 'flex-end',
      //  padding: 10,
      //  width: 150,
      //  marginBottom: 36,
    },
    icon: {
  // transform: [{ rotate: '180deg'}],
   width: 20,
   height: 20,
   position: 'absolute',
   marginLeft : 5,
   left: 2, // Keep some space between your left border and Image
 },
 icon4:{
    width:30,
    height:30,
    justifyContent : 'flex-start',
    marginLeft : 10
  },
  icon2:{
    width:25,
    height:25,
    marginRight : 10
  },
 btnText: {
    textAlign: 'center',
    fontFamily : 'Prompt-Medium',
    fontSize: RFValue(15),
    color: '#867EBD',
    marginLeft : 10
  //  height:50,
    //width:'100%'
  },


  });
