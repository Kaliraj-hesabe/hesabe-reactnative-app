
import React, {Component,useRef} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager,TextInput} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';
import Localized from '../locales';
import { CustomButton } from './CustomButton.js';
import {CalendarList,LocaleConfig} from 'react-native-calendars';
import { format,parseISO } from 'date-fns';
import CustomAlertComponent from './CustomAlertComponent';
import { isProperDate} from '../utils/GlobalFunction';
const GLOBAL = require('../utils/Globals');
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Calendar } from 'react-native-calendario';
import CalendarPicker from 'react-native-calendar-picker';
import GestureRecognizer from 'react-native-swipe-gestures';
import CalenderModals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import {DarkModeContext} from 'react-native-dark-mode';


//import Modal from 'react-native-modal';
//const initialDate = '2021-06-10';



export default class CalenderScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
     selectedButton: this.props.route.params.example.currentState,
     selectedFromDate : 'DD/MM/YYYY',
     selectedToDate : 'DD/MM/YYYY',
     afterSelectedFromDate :  this.props.route.params.example.FromDate,
     afterSelectedToDate : this.props.route.params.example.ToDate,
     currentSelection : '',
     currentshowFromDate : '',
     currentshowToDate : '',
     marked: null,
     calendarVisible : false,
     markedType: null,
     showAlert : false,
     showAlertMessage : '',
     initialDate : format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')
    };
     this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.calculateDate = this.calculateDate.bind(this);

  }

  calendarRef = React.createRef();
  static contextType = DarkModeContext;

  componentDidMount() {
//  console.log('xdf: '+ this.props.example.currentState);
     this.setState({ selectedButton : this.props.route.params.example.currentState});
     this.listselectedvalue()
  //  this.ShowCurrentDate(this.props.route.params.example.currentState);
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
    this.setState({ selectedButton : '' });
    this.toggleCalendar(true)

  }

  TocalendarOnPress(value) {
    this.setState({ currentSelection : value });
      this.setState({ selectedButton : '' });
    this.toggleCalendar(true)
  }

  toggleCalendar(value)
  {
    this.setState({ calendarVisible : value });

  }

  selectionOnPress(userType) {

    this.setState({ selectedButton: userType}, () => {
       this.setState({ currentshowFromDate : 'DD/MM/YYYY',
       currentshowToDate : 'DD/MM/YYYY',
       afterSelectedFromDate : '',
       afterSelectedToDate :'',
       })

    });


  //  this.ShowCurrentDate(userType);
  }

  applyOnPress() {

  //  var CalenderData = this.state.selectedButton;
  //var date1 = new Date(this.state.afterSelectedFromDate);
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

  console.log("Applyfromdate : "+ fromDate);
  console.log("Applytodate : "+ toDate);

 if(fromDate.getTime() > toDate.getTime())
 {
   this.setState({ showAlert: true,showAlertMessage : Localized.t('InvoiceDetailsPage.FromDatecannotbegreaterthanToDate')})
 }
 else {

   if(this.state.selectedButton.length != 0)
   {
   var CalenderData =
   {
     "Interval"  : this.state.selectedButton,
     "FromDate" : this.state.afterSelectedFromDate,
     "ToDate" : this.state.afterSelectedToDate,
   }

    const { navigation, route } = this.props;
    route.params.onSelectCalender(CalenderData);
    navigation.goBack(null);
  }
  else {
    if(this.state.afterSelectedFromDate.length != 0  &&  this.state.afterSelectedToDate.length != 0)
    {

      if(!isProperDate(this.state.afterSelectedFromDate) || !isProperDate(this.state.afterSelectedToDate))
      {
          this.setState({ showAlert: true,showAlertMessage : Localized.t('InvoiceDetailsPage.Customdateformatisnotproper')})
      }
      else {


        if(this.calculatemanualDate(this.props.route.params.example.Fromview == "Dashboard" ? this.state.currentshowFromDate : this.state.currentshowToDate ,29))
        {
        var CalenderData =
        {
          "Interval"  : this.state.selectedButton,
          "FromDate" : this.state.afterSelectedFromDate,
          "ToDate" : this.state.afterSelectedToDate,
        }

        console.log("CVCV : " + CalenderData);
         const { navigation, route } = this.props;
         route.params.onSelectCalender(CalenderData);
         navigation.goBack(null);
        }
        else {
          this.setState({ showAlert: true,showAlertMessage : Localized.t('InvoiceDetailsPage.Todatecannotbemorethan30daysorcurrentdate')})
        }



      }

    }
    else {

        this.setState({ showAlert: true,showAlertMessage : Localized.t('InvoiceDetailsPage.Pleaseselectanyoneoptioneithertimelineorcustomdates')})
    }

  }
 }


  }


  forceUpdateHandler(){
     this.setState({ selectedButton : "Today",
     afterSelectedFromDate : '',
     afterSelectedToDate :'',

     });

      // this.ShowCurrentDate("Today");
      //this.forceUpdate();

    };


    ShowCurrentDate(value)
    {
          var today = new Date()
          var startDate,endDate,currentdate
          console.log('currentselection' + value);

          currentdate = new Date(today.setDate(today.getDate()))
          currentdate = format(currentdate, 'dd/MM/yyyy')

          if(value === 'Today')
          {
              startDate = new Date(today.setDate(today.getDate()))
              endDate = new Date(today.setDate(today.getDate()))
            //  startDate = format(startDate, 'dd/MM/yyyy')
              //endDate =  format(startDate, 'dd/MM/yyyy')
          }
          else if(value === 'Last7Days')
          {
            var todayDate = new Date(today.setDate(today.getDate()))
            var newdate = new Date(today.setDate(today.getDate() - 7))
            startDate = format(newdate, 'yyyy-MM-dd')
            endDate = format(todayDate, 'yyyy-MM-dd')
          }
          else if (value === 'Last30Days')
          {
          var todayDate = new Date(today.setDate(today.getDate()))
           var newdate = new Date(today.setDate(today.getDate() - 30))
           startDate = format(newdate, 'yyyy-MM-dd')
           endDate = format(todayDate, 'yyyy-MM-dd')
          }
          else {
            var todayDate = new Date(today.setDate(today.getDate()))
           var newdate = new Date(today.setDate(today.getDate() - 60))
           startDate = format(newdate, 'yyyy-MM-dd')
           endDate = format(todayDate, 'yyyy-MM-dd')
          }



          var getDaysArray = function(start, end) {
           for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            var newdate =  new Date(dt)
            arr.push(format(newdate, 'yyyy-MM-dd'));
        }
         return arr;
         };

         var daylist = getDaysArray(new Date(startDate),new Date(endDate));
          //  daylist.map((v)=>v.toLocaleDateString('en-US').slice(0,10)).join("")


          this.setState({
           afterSelectedFromDate:currentdate,
            afterSelectedToDate:currentdate,
           });

          // console.log("StartDays" + startDate);

          // console.log("Dayslist" + daylist);




           var obj = daylist.reduce((c, v,index) =>
            value === "Today" ?
             Object.assign(c, {[v]:  {
          customStyles: {
          container: {
          backgroundColor: GLOBAL.COLOR.ORANGE
          },
          text: {
          color: GLOBAL.COLOR.WHITE,
          fontWeight: 'bold'
         }
      }
       }})

      :  Object.assign(c, {[v]: index == 0  ? {startingDay: true, color: GLOBAL.COLOR.ORANGE, textColor: GLOBAL.COLOR.WHITE} : index == daylist.length-1 ? { endingDay: true, color: GLOBAL.COLOR.ORANGE, textColor: GLOBAL.COLOR.WHITE} : {color: GLOBAL.COLOR.SHADEGRAY, textColor: GLOBAL.COLOR.DARKGRAY} })

           , {});

        var markedtype = value === "Today" ? 'custom' :'period'
             console.log("markedtype" + markedtype);

        this.setState({ marked : obj,  markedType : markedtype}, () => {
        console.log(this.state.marked);
         });



       }

       hideDatePicker(){
        //  setDatePickerVisibility(false);
        }

         handleConfirm(date){
          console.warn("A date has been picked: ", date);
          this.hideDatePicker();
        }



       handleChange(name) {
         return (text) => {
               this.setState({ selectedButton : '' ,calendarVisible : false});
               const nameRegex = new RegExp(/^[0-9/]+$/);
              if(text.length!=0)
             {
              if(nameRegex.test(text))
              {
               if(name == 'afterSelectedFromDate')
               {
                 console.log("fromenter");
                if((text.split("/")).length >2)
                console.log("fromlog");
                var filterFromDate = text.split("/")
                console.log(filterFromDate);
                this.setState({
                 currentshowFromDate  : filterFromDate.length != 0 ? filterFromDate[2] + "-" + filterFromDate[1] + "-" + filterFromDate[0] : '' ,
               })
              }
               this.setState({[name]:text })
             }
             }
             else {
               this.setState({[name]:text })
             }
           }
      }


       calculateDate(date, days) {

           console.log("CalculateDAte : " + date);
       var result = new Date(date);
       result.setDate(result.getDate() + days);

    //  var fromdte = format(result.getDate(), 'yyyy-MM-dd')
      console.log("Calculate1 : " + result);


        var date = new Date();


       if(result.getTime() > date.getTime() )
       {
         var resultime = result.getTime()
         var currenttime = date.getTime()
         console.log("Cal : " + resultime);
         console.log("Cal : " + currenttime);
         var val = (resultime) - (resultime - currenttime)
         console.log("Calculate : " + val);
        // result.setDate(val)
         result = new Date (val);
       }




      // var klvalue = format(new Date(result), 'yyyy-MM-dd')

    //   console.log("Calculate2 : " + klvalue );

       return result;

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


     calculatemanualDate(date, days) {

       if(this.props.route.params.example.Fromview == "Dashboard")
       {
         var datee =  format(new Date(date), 'yyyy-MM-dd');
         var result =  new Date(datee);
         console.log('lll1' + result);
     //var result = new Date(date);
        result.setDate(result.getDate() + days);

      var date = new Date();
      console.log('lll' + date);
      console.log('lll2' + result);

     if(result.getTime() > date.getTime() )
     {
       var resultime = result.getTime()
       var currenttime = date.getTime()
       console.log("Cal : " + resultime);
       console.log("Cal : " + currenttime);
       var val = (resultime) - (resultime - currenttime)
       console.log("Calculate : " + val);
      // result.setDate(val)
       result = new Date (val);
        console.log('lll3' + result);
     }

     var toDate1 = this.state.afterSelectedToDate
     var tomonthfield = toDate1.split("/")[1];
     var todayfield = toDate1.split("/")[0];
     var toyearfield = toDate1.split("/")[2];


     var tooDate = new Date(toyearfield, tomonthfield-1, todayfield);

    //  var date2 =  format(new Date(this.state.afterSelectedToDate), 'yyyy-dd-MM');
      var date3 =  new Date(tooDate);

       console.log(date3);
    if(date3.getTime() > result.getTime())
    {
      return false
    }

     return true;
     }

   else {

     var toDate1 = this.state.afterSelectedToDate
     var tomonthfield = toDate1.split("/")[1];
     var todayfield = toDate1.split("/")[0];
     var toyearfield = toDate1.split("/")[2];


     var tooDate = new Date(toyearfield, tomonthfield-1, todayfield);

     var result =  new Date(tooDate);
       result.setDate(result.getDate());

         console.log('bfg' + result);

        var date = new Date();
       if(result.getTime() > date.getTime() )
       {
         return false
       }

       return true

     }
   }




      passDataToCalenderModal()
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

    console.log("heelo" + this.props.route.params.example.DeeplinkStatus);
    //this.setState({ selectedButton : this.props.example.currentState});
    //const arrayValue = this.props.example;
      var selectionMenu
      var arrayValue


     var arrayValue = this.props.route.params.example.ClearAll

      console.log("clear" + this.state.ClearALL);
        console.log("clear" + this.props.route.params.example.ClearAll);
     if(arrayValue)
     {
        arrayValue = false
        this.props.example.ClearAll = false
    //  selectionMenu = (arrayValue === "Dashboard" ? this.state.languageArray[0].Dashboard : arrayValue === "OpenInvoice" ?  this.state.languageArray[0].OpenInvoice : arrayValue === "Invoice" ?  this.state.languageArray[0].Invoice  : this.state.languageArray[0].ReportPayment )
       this.forceUpdateHandler()
    }
    else {

      arrayValue = this.props.route.params.example
    // selectionMenu = (arrayValue === "Dashboard" ? this.state.languageArray[0].Dashboard : arrayValue === "OpenInvoice" ?  this.state.languageArray[0].OpenInvoice : arrayValue === "Invoice" ?  this.state.languageArray[0].Invoice  : this.state.languageArray[0].ReportPayment )

     }


    return(
   <View style={{
     backgroundColor: 'transparent',
     height : '100%'
     //opacity: 0.7
     }}>

     <View
     style={{
       justifyContent: 'space-between',
       marginTop :60,
        padding : 10,
       flexDirection: "row",
       width : '100%',
       //height : 40,
       alignItems : "center",
       backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,
       borderTopLeftRadius : 10,
       borderTopRightRadius : 10
     }} >

     <TouchableOpacity
     style={styles.button}
     onPress={() => {
       this.props.navigation.goBack(null)}}>
     <Image style={styles.icon4} source={require('../screens/pages/Assest/close.png')} />
     </TouchableOpacity>
     <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 35,fontSize : RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('CalenderPage.Dates')}</Text>
     <TouchableOpacity
     style={styles.button1}
     onPress={() =>   this.passDataToCalenderModal(true)}>
     <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize : RFValue(17)}}> {Localized.t('CalenderPage.Clearall')}</Text>
     </TouchableOpacity>
     </View>
   <ScrollView style={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE ,padding : 10}} contentContainerStyle={{paddingBottom: 70}}>

       <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}} onStartShouldSetResponder={() => true}>
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 30,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left',marginLeft : 10}}>{Localized.t('CalenderPage.PickDate')}</Text>

        <View
       style={{
         alignItems: 'center',
         justifyContent : 'space-evenly',
         flexDirection: "row",
         padding : 10,
       }} >

       <TouchableOpacity
       style={{
         justifyContent: 'center',
         marginTop :30,
         marginLeft : 0,
         flexDirection: "row",
         borderRadius : 25,
         height : 30,
         alignItems : "center",
         backgroundColor : this.state.selectedButton === "Today" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
         width : '30%'
       }}
      onPress={() => this.selectionOnPress("Today")}

      >

       <FeatherIcons name="check" color= {GLOBAL.COLOR.WHITE}  size={20} style = {{
            ...styles.icon2,...{display : this.state.selectedButton === "Today" ? null :'none'}
          }}  />
       <Text style =  {{...styles.btnText,...{color : this.state.selectedButton === "Today" ? GLOBAL.COLOR.WHITE:'#867EBD',marginLeft : this.state.selectedButton === "Today" ? 15 : 0}}}>{Localized.t('CalenderPage.Today')}</Text>
       </TouchableOpacity>

       <TouchableOpacity
       style={{
         justifyContent: 'center',
         marginTop :30,
         marginLeft : 15,
         flexDirection: "row",
         // padding : 10,
         borderRadius : 25,
         height : 30,
         alignItems : "center",
         backgroundColor : this.state.selectedButton === "Last7Days" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
          width : '35%'
       }}
      onPress={() => this.selectionOnPress("Last7Days")}

      >
      <FeatherIcons name="check" color= {GLOBAL.COLOR.WHITE}  size={20} style = {{
           ...styles.icon2,...{display : this.state.selectedButton === "Last7Days" ? null :'none'}
         }}  />
       <Text style =  {{...styles.btnText,...{color : this.state.selectedButton === "Last7Days" ? GLOBAL.COLOR.WHITE:'#867EBD',marginLeft : this.state.selectedButton === "Last7Days" ? 15 : 0}}}>{Localized.t('CalenderPage.Last7Days')}</Text>
       </TouchableOpacity>

       <TouchableOpacity
       style={{
         justifyContent: 'center',
         marginTop :30,
         marginLeft : 15,
         flexDirection: "row",
         // padding : 10,
         borderRadius : 25,
         height : 30,
         alignItems : "center",
         backgroundColor : this.state.selectedButton === "Last30Days" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
          width : '35%'
       }}
        onPress={() => this.selectionOnPress("Last30Days")}

      >
      <FeatherIcons name="check" color= {GLOBAL.COLOR.WHITE}  size={20} style = {{
           ...styles.icon2,...{display : this.state.selectedButton === "Last30Days" ? null :'none'}
         }}  />
       <Text style =  {{...styles.btnText,...{color : this.state.selectedButton === "Last30Days" ? GLOBAL.COLOR.WHITE:'#867EBD',marginLeft : this.state.selectedButton === "Last30Days" ? 15 : 0}}}>{Localized.t('CalenderPage.Last30Days')}</Text>
       </TouchableOpacity>

       <TouchableOpacity
       style={{
         justifyContent: 'center',
         marginTop :30,
         marginLeft : 15,
         flexDirection: "row",
         // padding : 10,
         borderRadius : 25,
         height : 30,
         alignItems : "center",
         backgroundColor : this.state.selectedButton === "Last60Days" ? GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE,
          width : '28%',
          display : 'none'
       }}
      onPress={() => this.selectionOnPress("Last60Days")}

      >
      <FeatherIcons name="check" color= {GLOBAL.COLOR.WHITE}  size={20} style = {{
           ...styles.icon2,...{display : this.state.selectedButton === "Last60Days" ? null :'none'}
         }}  />
       <Text style =  {{...styles.btnText,...{color : this.state.selectedButton === "Last60Days" ? GLOBAL.COLOR.WHITE:'#867EBD',marginLeft : this.state.selectedButton === "Last60Days" ? 15 : 0}}}>{Localized.t('CalenderPage.Last60Days')}</Text>
       </TouchableOpacity>


       </View>

        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 30,fontSize : RFValue(17),fontFamily : 'Prompt-Bold',textAlign : 'left',marginLeft : 10}}>{Localized.t('CalenderPage.CustomDates')}</Text>

        <View
        style={{
          justifyContent: 'space-between',
          marginTop :10,
          marginLeft :0,
          flexDirection: "row",
          width : '100%',
          backgroundColor : 'transparent',
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

        <TextInput style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,fontSize : RFValue(14)}}
        onChangeText={this.handleChange('afterSelectedFromDate')}
        placeholder = {this.state.selectedFromDate}
        placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
        returnKeyType="next"
        value = {this.state.afterSelectedFromDate}
        onSubmitEditing={() => this.toDate.focus()}
        maxLength = {10}
        >
        </TextInput>
        <TouchableOpacity
        style={styles.button5}
        onPress={() => this.FromcalendarOnPress('From')}>
        <Image style={styles.icon} source={require('../screens/pages/Assest/calendarGray.png')} />
        </TouchableOpacity>
        </View>

        <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(14),marginTop : 0,width :  global.selectValue ==  'en' ? 20 : 30 ,textAlign : 'center'}}> {Localized.t('CommanTabPage.to')} </Text>

        <View style={{
          marginTop :0,
          marginLeft : 0,
          marginRight :5,
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

        <TextInput style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,fontSize : RFValue(14)}}
        ref={(input) => { this.toDate = input; }}
        onChangeText={this.handleChange('afterSelectedToDate')}
        returnKeyType="done"
        placeholder = {this.state.selectedToDate}
        placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
        value = {this.state.afterSelectedToDate}
        maxLength = {10}
        >
        </TextInput>
        <TouchableOpacity
        style={styles.button5}
        onPress={() => this.TocalendarOnPress('To')}>
        <Image style={styles.icon} source={require('../screens/pages/Assest/calendarGray.png')} />
        </TouchableOpacity>

         </View>

        </View>

        <GestureRecognizer

        >
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
      //flexDirection: 'row',
       flexDirection:  Platform.OS === "android" ? global.selectValue ==  'en' ? 'row' : 'row-reverse' : 'row',
      justifyContent: 'space-between'
    }
  },
    'stylesheet.calendar.header': {
   header: {
  marginTop: 0,
  flexDirection: Platform.OS === "android" ? global.selectValue ==  'en' ? 'row' : 'row-reverse' : 'row',
  marginLeft :0,
  justifyContent: 'flex-start',
  alignItems : 'center'
   }
  }





        }}
          ref={this.calendarRef}
          current={this.state.initialDate}
          //initialNumToRender={1}
          hideExtraDays={true}
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
          //markingType={this.state.markedType}

          maxDate={this.props.route.params.example.Fromview == "Dashboard" ? this.state.currentSelection == 'From' ? format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd') : this.calculateDate(this.state.currentshowFromDate,29) : format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')}
          minDate = {  this.props.route.params.example.Fromview == "Dashboard" ? this.state.currentSelection == 'From' ? null : this.state.currentshowFromDate   : null}
          refreshing={true}

        //  onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          onVisibleMonthsChange={(months) => { setTimeout(() => { this.setState((state) => { return { months }; }); }, 0); }}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={Platform.OS === "android" ?  this.state.currentSelection == 'From' ?   global.selectValue == 'en' ? 6 : 6 : global.selectValue ==  'en' ? this.calculateMonth() : 1  : 10}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 6 :6 : 10}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}

          horizontal={Platform.OS === "android" ? false :true}
       // Enable paging on horizontal, default = false
          //pagingEnabled={true}
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
              selectedTextColor: GLOBAL.COLOR.WHITE,
            },

          }}
          // Enable or disable vertical scroll indicator. Default = false
          //showScrollIndicator={true}

          />

   </GestureRecognizer>

            </View>


            <CalenderModals.BottomModal
     				propagateSwipe={true}
     			  visible={Platform.OS === "android" ? this.state.calendarVisible : false}
     			  swipeableModal = {false}
     			 //visible = {this.state.modalVisible}
     			// onTouchOutside={() => this.setState({ HideModal: false })}
     			 height={0.95}
     			 width={1}
     			// onSwipeOut={() => this.setState({ HideModal: false })}
          modalTitle = {
            <TouchableOpacity
            style={{marginTop : 10,marginLeft : 10}}
            onPress={() => {
            this.toggleCalendar(false)}}>
            <Image style={styles.icon4} source={require('../screens/pages/Assest/close.png')} />
            </TouchableOpacity>
          }

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
          display : this.state.calendarVisible == true ? null : 'none'
            }}

            theme={{
           monthTextColor: GLOBAL.COLOR.DARKBLUE,
           textMonthFontWeight: 'bold',
           todayTextColor: GLOBAL.COLOR.ORANGE,
           selectedDayTextColor: GLOBAL.COLOR.DARKBLUE,


           'stylesheet.calendar.header': {
          week: {
         marginTop: 5,
         //flexDirection: 'row',
          flexDirection:  Platform.OS === "android" ? global.selectValue ==  'en' ? 'row' : 'row-reverse' : 'row',
         justifyContent: 'space-between'
       }
     },
       'stylesheet.calendar.header': {
      header: {
     marginTop: 0,
     flexDirection: Platform.OS === "android" ? global.selectValue ==  'en' ? 'row' : 'row-reverse' : 'row',
     marginLeft :0,
     justifyContent: 'flex-start'
      }
     }





           }}
             ref={this.calendarRef}
             //current={this.state.initialDate}
             current = {this.state.currentSelection == 'From' ?  this.state.currentshowFromDate : this.state.currentshowToDate.length != 0 ? this.state.currentshowToDate : this.state.currentshowFromDate}
             //initialNumToRender={1}
             hideExtraDays={true}
             hideArrows={Platform.OS === "android" ? true : false}
             //markingType={this.state.markedType}

             maxDate={this.props.route.params.example.Fromview == "Dashboard" ? this.state.currentSelection == 'From' ? format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd') : this.calculateDate(this.state.currentshowFromDate,29) : format(new Date(new Date().setDate(new Date().getDate())), 'yyyy-MM-dd')}
             minDate = {  this.props.route.params.example.Fromview == "Dashboard" ? this.state.currentSelection == 'From' ? null : this.state.currentshowFromDate   : null}
             refreshing={true}

           //  onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
             onVisibleMonthsChange={(months) => { setTimeout(() => { this.setState((state) => { return { months }; }); }, 0); }}
             // Max amount of months allowed to scroll to the past. Default = 50
             pastScrollRange={Platform.OS === "android" ?  this.state.currentSelection == 'From' ?   global.selectValue == 'en' ? this.calculatePastMonth() : this.calculatePastMonth() : global.selectValue ==  'en' ? this.calculateMonth() : 1  : 10}
             // Max amount of months allowed to scroll to the future. Default = 50
             futureScrollRange={Platform.OS === "android" ? global.selectValue ==  'en' ? 6 :6 : 10}
             // Enable or disable scrolling of calendar list
             scrollEnabled={true}

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
                 selectedTextColor: GLOBAL.COLOR.WHITE,
               },

             }}
             // Enable or disable vertical scroll indicator. Default = false
             //showScrollIndicator={true}

             />

     			 </ModalContent>
     		  </CalenderModals.BottomModal>

          <View style={{
            alignItems : 'flex-end',
            justifyContent: 'flex-end',
            marginTop : this.state.calenderVisible == true ? 10 : 30,
            marginLeft : 0,
            flexDirection: "row",
            width : '100%',
            }}>
          <CustomButton title= {Localized.t('CalenderPage.Apply')}  onPress={() => this.applyOnPress()} style = {{fontSize : RFValue(20)}}/>
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
      );
    }
  }


  const styles = StyleSheet.create({

    button4: {
       justifyContent: 'center',
       alignItems : 'center',
       backgroundColor: GLOBAL.COLOR.LIGHTPURPLE,
       padding: 5,
       height: 35,
       borderRadius : 10
       //  marginBottom: 36,
     },
     button5: {
       alignItems: 'flex-start',
       fontSize : RFValue(17),
       //  padding: 10,
       //  width: 150,
       //  marginBottom: 36,
     },
     icon:{
       width:25,
       height:25,
       marginRight : 10
     },
     icon2: {
    width: 15,
    height: 20,
    position: 'absolute',
    marginLeft : 2,
    left: 2, // Keep some space between your left border and Image
  },
  btnText: {
     textAlign: 'center',
     fontFamily : 'Prompt-Medium',
     fontSize:RFValue(12),
     color: '#867EBD',
     marginLeft : 15

   },


  });
