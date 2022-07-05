import React, { Component} from 'react';
import { View, Text, FlatList, ActivityIndicator,StyleSheet,TouchableOpacity,I18nManager} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Localized from '../locales'
import Tooltip from 'react-native-walkthrough-tooltip';
import { CustomButton } from './CustomButton.js';
import AsyncStorage  from '@react-native-community/async-storage';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const GLOBAL = require('../utils/Globals');
import {DarkModeContext} from 'react-native-dark-mode';



class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      arryValue : '',
      isLoadingMore: true,
      refresh :'',
      MainMenu : '',
      SearchArray: [
      {

        Invoice :
        [
            {id: 0,name: 'Shahrukkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'KNET',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
            {id: 1,name: 'kkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'KNET',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
            {id: 2,name: 'Joharkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'MPGS',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
            {id: 3,name: 'Shkkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'MPGS',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
        ],
        PaymentGateway :
        [
            {id: 0,name: 'OrderID',nameValue: '9 APR, 09:00 AM',subname1 : '#123456789012345678891',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
            {id: 0,name: 'OrderID',nameValue: '9 APR, 09:00 AM',subname1 : '#123456789012345678891',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : 'Not Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :2,nameImg :0},
            {id: 0,name: 'OrderID',nameValue: '9 APR, 09:00 AM',subname1 : '#123456789012345678891',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
            {id: 0,name: 'OrderID',nameValue: '9 APR, 09:00 AM',subname1 : '#123456789012345678891',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : 'Not Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :2,nameImg :0},

        ],
        OpenLink :
          [
            {id: 0,name: 'Expired',nameValue: '9 APR, 09:00 AM',subname1 : 'Invoice for the purchase of a new product',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : '125 Customers Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :3},
            {id: 0,name: 'Transferred',nameValue: '9 APR, 09:00 AM',subname1 : 'New Product Invoice',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : '10 Customers Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :1},
            {id: 0,name: 'Not Transferred',nameValue: '9 APR, 09:00 AM',subname1 : 'Food Invoice',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : '0 Customers Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :2},

        ],
        InvoiceQuick :
        [
          {id: 0,name: 'Shahrukkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'sk@gmail.com',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
          {id: 0,name: 'kkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'sk@gmail.com',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Not Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :2,nameImg :0},
          {id: 0,name: 'Joharkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'sk@gmail.com',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Not Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :2,nameImg :0},
          {id: 0,name: 'Shkkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'sk@gmail.com',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
        ],
        InvoiceOpen :
        [
          {id: 0,name: 'Expired',nameValue: '9 APR, 09:00 AM',subname1 : 'Invoice for the purchase of a new product',subnamevalue1 : '',subname2 : 'Expiry Date',subnamevalue2 : '5 may, 09:00 AM',subname3 : '125 Customers Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :3},
          {id: 0,name: 'Transferred',nameValue: '9 APR, 09:00 AM',subname1 : 'New Product Invoice',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : '10 Customers Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :1},
          {id: 0,name: 'Not Transferred',nameValue: '9 APR, 09:00 AM',subname1 : 'Food Invoice',subnamevalue1 : '',subname2 : '',subnamevalue2 : '',subname3 : '0 Customers Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :2},

        ],
         PaymentList :
           [
             {id: 1,name: 'Shahrukkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'PaymentGateway',subnamevalue1 : 'MPGS',subname2 : '',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
             {id: 2,name: 'kkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'QuickInvoice',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Not Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :2,nameImg :0},
             {id: 3,name: 'Joharkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'OpenInvoice',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Not Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :2,nameImg :0},
             {id: 4,name: 'Shkkhan',nameValue: '9 APR, 09:00 AM',subname1 : 'PaymentGateway',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Transferred',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
         ],
         RefundRequest :
           [
             {id: 1,name: '<ReferenceNo>',nameValue: '9 APR, 09:00 AM',subname1 : 'PaymentGateway',subnamevalue1 : 'MPGS',subname2 : '',subnamevalue2 : '',subname3 : 'Complete',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
             {id: 2,name: '<ReferenceNo>',nameValue: '9 APR, 09:00 AM',subname1 : 'QuickInvoice',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Pending',subnamevalue3 : 'KWD 3.500',Subname3Img :4,nameImg :0},
             {id: 3,name: '<ReferenceNo>',nameValue: '9 APR, 09:00 AM',subname1 : 'OpenInvoice',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Pending',subnamevalue3 : 'KWD 3.500',Subname3Img :4,nameImg :0},
             {id: 4,name: '<ReferenceNo>',nameValue: '9 APR, 09:00 AM',subname1 : 'PaymentGateway',subnamevalue1 : 'KNET',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'Complete',subnamevalue3 : 'KWD 3.500',Subname3Img :1,nameImg :0},
         ],
         PaymentTransfer:
           [
             {id: 0,name: 'Shahrukkhan',nameValue: '9 APR, 09:00 AM',subname1 : '',subnamevalue1 : '',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'MPGS',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :0},
             {id: 0,name: 'kkhan',nameValue: '9 APR, 09:00 AM',subname1 : '',subnamevalue1 : '',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'KNET',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :0},
             {id: 0,name: 'Joharkhan',nameValue: '9 APR, 09:00 AM',subname1 : '',subnamevalue1 : '',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'KNET',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :0},
             {id: 0,name: 'Shkkhan',nameValue: '9 APR, 09:00 AM',subname1 : '',subnamevalue1 : '',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'KNET',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :0},

         ],
         CaptureRequests:
           [
             {id: 0,name: 'Shahrukkhan',nameValue: '9 APR, 09:00 AM',subname1 : '',subnamevalue1 : '',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'MPGS',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :0},
             {id: 0,name: 'kkhan',nameValue: '9 APR, 09:00 AM',subname1 : '',subnamevalue1 : '',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'KNET',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :0},
             {id: 0,name: 'Joharkhan',nameValue: '9 APR, 09:00 AM',subname1 : '',subnamevalue1 : '',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'KNET',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :0},
             {id: 0,name: 'Shkkhan',nameValue: '9 APR, 09:00 AM',subname1 : '',subnamevalue1 : '',subname2 : '#951586249548',subnamevalue2 : '',subname3 : 'KNET',subnamevalue3 : 'KWD 3.500',Subname3Img :0,nameImg :0},

         ],
       }

      ],
    };

    this.arrayholder = [];
  }

static contextType = DarkModeContext;
  componentDidMount() {
    //this.makeRemoteRequest();
    //this.intialload();
    this.readLanguageData();
  }


  readLanguageData = async () => {
    try {
      const lang = await AsyncStorage.getItem('USER_LANGUAGE_PICKED')
      console.log('MLM :' + lang);
      if (lang !== null) {
        if (lang === "ar") {
           global.selectValue =  'ar'
        }
        else {

            global.selectValue =  'en'
        }

      }
      else {

         global.selectValue =  'en'
      }

    } catch (e) {
     // alert('Failed to fetch the data from storage')
    }
    }



intialload()
{
  var selectionMenu
 var  arrayValue = this.props.example
console.log(arrayValue);

   selectionMenu = (
       arrayValue === "Invoice" ? this.state.SearchArray[0].Invoice
   : arrayValue === "PaymentGateway" ? this.state.SearchArray[0].PaymentGateway
   : arrayValue === "OpenLink" ?  this.state.SearchArray[0].OpenLink : arrayValue === "InvoiceOpen" ?  this.state.SearchArray[0].InvoiceOpen
   : arrayValue === "InvoiceQuick" ? this.state.SearchArrays[0].InvoiceQuick : arrayValue === "PaymentList" ? this.state.SearchArray[0].PaymentList
   : arrayValue === "RefundRequest" ? this.state.SearchArray[0].RefundRequest : arrayValue === "PaymentTransfer" ? this.state.SearchArray[0].PaymentTransfer  : this.state.SearchArray[0].CaptureRequests)


 this.setState({ data: selectionMenu });
 this.arrayholder = selectionMenu;

}

HideToolTipModal(visible) {
  this.props.onhideTooTip()

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

    if(this.props.example == "PaymentGateway" ||this.props.example == "Invoice" || this.props.example == "OpenLink" || (this.props.example).includes("PaymentList") || this.props.example ==='InvoiceQuick' || this.props.example === 'InvoiceOpen' || (this.props.example).includes("RefundRequest") || (this.props.example).includes("PaymentTransfer")|| (this.props.example).includes("CaptureRequests"))
    { this.props.onSearchFilter(text)}
    else {


    const newData = this.arrayholder.filter(item => {
      console.log("searching text " + text);
        console.log("searching text " + item.subnamevalue1);
      const itemData = `${item.subnamevalue1}`;
      const textData = text;

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,

    });
  }
  };

  renderHeader = () => {
    const isDarkMode = this.context === 'dark';
    return (

      <SearchBar
        lightTheme


        placeholder={Localized.t('DashboardPage.Search')}
        placeholderTextColor= {isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY}
        platform={"ios"}

        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
        extraData={this.state.refresh}
        inputStyle={{textAlign : I18nManager.isRTL == true ?'right' : 'left'}} // global.selectValue == 'ar' ? 'right' : 'left'}}
        cancelButtonTitle=  {Platform.OS === "ios" ? "Cancel" :"Cancel "}

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

    );
  };

  listSelectiononPress(item) {
    var filterData = item
     this.props.onSelectSearch(filterData);
  }

  onEndReached = (distanceFromEnd) => {
     if (!this.isLoadingMore) {
       this.props.onEndSearch('End loading');
       this.isLoadingMore = true;
     }
   };

    EmptyListMessage = () => {
      const isDarkMode = this.context === 'dark';
    return (
      // Flat List Item
      <View style = {{height : 800,backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK: GLOBAL.COLOR.WHITE}}>
      <Text
        style={[styles.emptyListStyle,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.BLACK}]}>
        {Localized.t('CommanTabPage.No Data Found')}
      </Text>
      </View>
    );
  };




    componentDidUpdate(previousProps) {

    console.log('drdr');
    console.log(previousProps.refresh);
    console.log(this.state.refresh);



    if(this.state.MainMenu !== this.props.exampleArray) {
         console.log('drdr1');
       this.setState({MainMenu: this.props.exampleArray});
      // this.forceUpdate()


    }


  }




  render() {

      //console.log("search" + this.props.example);
    const isDarkMode = this.context === 'dark';

      console.log("search" + this.props.example);
       var selectionMenu;
       var  reportfilterValue ;
       var  arrayValue ;
       if(this.props.example.indexOf('-') > -1)
       {
          reportfilterValue =  this.props.example.split('-')[1].trim()
          arrayValue =  this.props.example.split('-')[0].trim()
       }
       else {
         reportfilterValue = 'dot'
         arrayValue = this.props.example
       }

      console.log("filtersearch1 " + reportfilterValue);
      console.log("search1 " + arrayValue);
      console.log("searchRefresh " + this.props.refresh);
      console.log("POPO :" + this.props.showToolTip);



      selectionMenu = [];

        selectionMenu = (
            arrayValue === "Invoice" ? this.state.SearchArray[0].Invoice
        : arrayValue === "PaymentGateway" ? this.state.SearchArray[0].PaymentGateway
        : arrayValue === "OpenLink" ?  this.state.SearchArray[0].OpenLink : arrayValue === "InvoiceOpen" ?  this.state.SearchArray[0].InvoiceOpen
        : arrayValue === "InvoiceQuick" ? this.state.SearchArray[0].InvoiceQuick : arrayValue === "PaymentList" ? this.state.SearchArray[0].PaymentList
        : arrayValue === "RefundRequest" ? this.state.SearchArray[0].RefundRequest : arrayValue === "PaymentTransfer" ? this.state.SearchArray[0].PaymentTransfer  : this.state.SearchArray[0].CaptureRequests )


        if(arrayValue == 'PaymentList' || arrayValue == 'PaymentTransfer' || arrayValue == 'CaptureRequests' || arrayValue == 'PaymentGateway' || arrayValue == 'Invoice' || arrayValue == 'OpenLink' || arrayValue == 'RefundRequest' || arrayValue == 'InvoiceQuick' || arrayValue == 'InvoiceOpen')
        {
        selectionMenu = this.props.exampleArray
        this.arrayholder = selectionMenu;

         }





        //  console.log("arrayvalue " + this.props.exampleArray);

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1}}>
        <FlatList


          data={this.state.MainMenu}
          style={{ borderRadius:15}}
           renderItem={({item,index}) => {


            //console.log('reportValueg',Localized.t('ReportPage.'+reportfilterValue));
              //console.log('here is your thing',item.subname3);
            if( arrayValue === "PaymentList" || arrayValue === "RefundRequest" || arrayValue === "PaymentTransfer" || arrayValue === "CaptureRequests" ? reportfilterValue == 'All' ? true
            : arrayValue === "RefundRequest" ?  item.subname3 == Localized.t('ReportPage.'+reportfilterValue)
            : arrayValue === "CaptureRequests" ?  item.subname3 == Localized.t('ReportPage.'+reportfilterValue)
            : arrayValue === "PaymentTransfer" ?  Localized.t('ReportPage.'+reportfilterValue) ==  Localized.t('ReportPage.Transferred') ? item.subname1.length !=  0  : item.subname1.length ==  0
            :item.subnamevalue1 == Localized.t('ReportPage.'+reportfilterValue) : true)
            {

                //console.log('thing',item.subnamevalue1);
             // Single Comes here which will be repeatative for the FlatListItems
             // Single Comes here which will be repeatative for the FlatListItems
             if(index == 0 && arrayValue === "PaymentList")
             {
             return  <Tooltip
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
              isVisible={this.props.showToolTip}
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
                <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left'}}>{Localized.t('ToolTipPage.ReportDetails')}</Text>
                <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left'}}>{Platform.OS === "android" ? (((Localized.t('ToolTipPage.ReportMessage').replace("â", "'")).replace("â", "'")).replace('\u009c', "")).replace('\u009d',"")  : (Localized.t('ToolTipPage.ReportMessage').replace("â", "'")).replace("â", "'")}</Text>



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
                <CustomButton title=  { Localized.t('ToolTipPage.GotIt') }  onPress={() => this.HideToolTipModal()} style = {{width : 150,fontSize : RFValue(20)}}
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

              <View
             style={{
               justifyContent: 'space-between',
               marginTop :10,
               marginLeft : isDarkMode ? 10 : 15,
               marginRight : isDarkMode ? 10 : 15,
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
               borderWidth : isDarkMode ? 1 : 0,
               borderColor : GLOBAL.COLOR.WHITE,
               backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
               //height : 40,
               //alignItems : "flex-start",
             }}>

             <TouchableOpacity
              style = {{padding : 10}}
             onPress={() => {
               this.listSelectiononPress(item)}}>


           <View
             style={{
             justifyContent: 'space-between',
               marginTop :0,
               flexDirection: "row",
               //height : 40,
               alignItems : "center",
             }}>

           <View
           style={{
             marginTop :0,
             flexDirection: "row",
             alignItems : "center",
              width : '55%'
           }}>

            <MaterialCommunityIcons name="checkbox-blank-circle" color={item.nameImg == 1 ? GLOBAL.COLOR.GREEN : item.nameImg == 2 ? GLOBAL.COLOR.RED : item.nameImg == 3 ? GLOBAL.COLOR.ORANGE : 'yellow'}  size={18} style = {{ display : item.nameImg == 0 ?  'none' : null  }}/>
            <Text style={{...styles.textStyle,...{ color : arrayValue === 'InvoiceOpen' ? GLOBAL.COLOR.DARKGRAY : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE ,fontSize : arrayValue === 'InvoiceOpen' ? RFValue(13) : RFValue(15),width : '70%',  multiline:reportfilterValue == 'PaymentGateway' ? false :true}}}>{reportfilterValue == 'PaymentGateway' ? item.name : arrayValue === "PaymentList" ?item.name  :item.name }</Text>
            </View>
            <View style = {{}}>
            <Text style={{...styles.textStyleValue,...{fontSize : arrayValue === 'InvoiceOpen' ? RFValue(11) : RFValue(13)}}}>{item.nameValue}</Text>
            </View>
           </View>

           <View
             style={{
               justifyContent: 'space-between',
               marginTop :0,
               flexDirection: "row",
               //height : 40,
               alignItems : "center",
               marginBottom : item.subname2.length == 0 ? 10 : 0,
               marginRight :0,
               display :  item.subname1.length == 0 ? 'none' : null
             }}>
            <Text style = {{...styles.textStyle1 , ...{ color : arrayValue === 'Invoice' || arrayValue === 'PaymentList' || arrayValue === 'RefundRequest' ? GLOBAL.COLOR.DARKGRAY : GLOBAL.COLOR.DARKBLUE}}}>{item.subname1}</Text>
            <Text style={styles.textStyleValue1}>{item.subnamevalue1}</Text>
           </View>

           <View
             style={{
               justifyContent: arrayValue === 'InvoiceOpen' ? 'flex-start' :'space-between' ,
               marginTop :0,
               flexDirection: "row",
               //height : 40,
               alignItems : "center",
                display : item.subname2.length == 0 ? 'none' : null
             }}>
            <Text style={styles.textStyle2}> {item.subname2}</Text>
            <Text style={{...styles.textStyleValue2,...{color :arrayValue === 'InvoiceOpen' ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.DARKGRAY}}}>{item.subnamevalue2}</Text>
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
                marginTop : 10
              }}>
            <View
            style={{
              justifyContent: 'space-between',
              marginTop :5,
              flexDirection: "row",
              //height : 40,
              alignItems : "center",


            }}>

            <MaterialCommunityIcons name="checkbox-blank-circle" color={item.Subname3Img == 1 ? GLOBAL.COLOR.GREEN : item.Subname3Img == 2 ? GLOBAL.COLOR.RED : item.Subname3Img == 3 ? 'orange' : 'yellow'}  size={18} style = {{ display : item.Subname3Img == 0 ?  'none' : null ,marginRight : 5  }}/>
             <Text style={styles.textStyle3}>{item.subname3}</Text>
             </View>
             <Text style={[{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-SemiBold',
             fontSize : RFValue(15)}]}>{item.subnamevalue3}</Text>
            </View>
            </TouchableOpacity>
           </View>

              </Tooltip>
             }


                return  <View
               style={{
                 justifyContent: 'space-between',
                 marginTop :10,
                 marginLeft :  isDarkMode ? 10 : 15,
                 marginRight : isDarkMode ? 10 : 15,
                 flexDirection: "column",
                 shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                 shadowOffset: {
                   width: 0,
                   height: 7,
                 },
                 shadowOpacity: 0.1,
                 shadowRadius: 9.11,
                 borderRadius : 15,
                 borderWidth : isDarkMode ? 1 : 0,
                 borderColor : GLOBAL.COLOR.WHITE,
                 elevation: 10,
                 backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE
                 //height : 40,
                 //alignItems : "flex-start",
               }}>

               <TouchableOpacity
                style = {{padding : 10}}
               onPress={() => {
                 this.listSelectiononPress(item)}}>


             <View
               style={{
                 justifyContent: 'space-between',
                 marginTop :0,
                 flexDirection: "row",
                 //height : 40,
                 alignItems : "center",
               }}>

             <View
             style={{
               //justifyContent: 'space-between',
               marginTop :0,
               flexDirection: "row",
               alignItems : "center",
               width : '55%'
             }}>

              <MaterialCommunityIcons name="checkbox-blank-circle" color={item.nameImg == 1 ? GLOBAL.COLOR.GREEN : item.nameImg == 2 ? GLOBAL.COLOR.RED : item.nameImg == 3 ? GLOBAL.COLOR.ORANGE : 'yellow'}  size={18} style = {{ display : item.nameImg == 0 ?  'none' : null ,marginRight : item.nameImg == 0 ? 0 : 5}}/>
              <Text style={{...styles.textStyle,...{ color : arrayValue === 'InvoiceOpen' ? GLOBAL.COLOR.DARKGRAY : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE ,fontSize : arrayValue === 'InvoiceOpen' ? RFValue(13) : RFValue(15),width : '70%',  multiline:reportfilterValue == 'PaymentGateway' ? false :true}}}>{reportfilterValue == 'PaymentGateway' ? item.name : arrayValue === "PaymentList" ?item.name  :item.name }</Text>
              </View>
              <Text style={{...styles.textStyleValue,...{fontSize : arrayValue === 'InvoiceOpen' ? RFValue(11) : RFValue(13)}}}>{item.nameValue}</Text>
             </View>

             <View
               style={{
                 justifyContent: 'space-between',
                 marginTop :0,
                 flexDirection: "row",
                 //height : 40,
                 alignItems : "center",
                 marginBottom : item.subname2.length == 0 ? 10 : 0,
                 marginRight :0,
                 marginLeft :0,
                 display :  arrayValue === 'InvoiceQuick' ? item.subnamevalue1 != null ? null : 'none'  : item.subname1.length == 0 ? 'none' : null
               }}>
              <Text style = {{...styles.textStyle1 , ...{ color : arrayValue === 'Invoice' || arrayValue === 'PaymentList' || arrayValue === 'RefundRequest' ? GLOBAL.COLOR.DARKGRAY : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}}}>{item.subname1}</Text>
              <Text style={styles.textStyleValue1}>{item.subnamevalue1}</Text>
             </View>

             <View
               style={{
                 justifyContent: arrayValue === 'InvoiceOpen' ? 'flex-start' :'space-between' ,
                 marginTop :0,
                 flexDirection: "row",
                 //height : 40,
                 alignItems : "center",
                  display : item.subname2.length == 0 ? 'none' : null
               }}>
              <Text style={styles.textStyle2}> {item.subname2}</Text>
              <Text style={{...styles.textStyleValue2,...{color :arrayValue === 'InvoiceOpen' ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.DARKGRAY}}}>{item.subnamevalue2}</Text>
             </View>


               <View style={styles.borderContainer}>
               <View style={styles.border} />
              </View>

              <View
                style={{
                  justifyContent: 'space-between',
                  marginTop :0,
                  flexDirection: "row",
                  //height : 40,
                  alignItems : "center",
                  marginTop : 10
                }}>
              <View
              style={{
                justifyContent: 'space-between',
                marginTop :0,
                flexDirection: "row",
                //height : 40,
                alignItems : "center",
              }}>

              <MaterialCommunityIcons name="checkbox-blank-circle" color={item.Subname3Img == 1 ? GLOBAL.COLOR.GREEN : item.Subname3Img == 2 ? GLOBAL.COLOR.RED : item.Subname3Img == 3 ? 'orange' : 'yellow'}  size={18} style = {{ display : item.Subname3Img == 0 ?  'none' : null ,marginRight : 5 }}/>
               <Text style={styles.textStyle3}>{item.subname3}</Text>
               </View>
               <Text style={[styles.textStyleValue3,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{item.subnamevalue3}</Text>
              </View>
              </TouchableOpacity>
             </View>
           }
           }}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={this.EmptyListMessage}
          Refreshing = {this.props.refresh}
          extraData={ this.props.refresh }

        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:GLOBAL.COLOR.WHITE,
    marginTop: Platform.OS == 'ios'? 30 : 0
  },
  textStyle: {
    color : GLOBAL.COLOR.DARKBLUE,
    fontFamily : 'Prompt-Medium',
    //padding: 10,
    fontSize : RFValue(15),
    textAlign : 'left',
  },
  textStyle1: {
    color : GLOBAL.COLOR.DARKBLUE,
    fontFamily : 'Prompt-Regular',
  //  padding: 10,
    fontSize : RFValue(13)
  },
  textStyle2: {
    color : GLOBAL.COLOR.DARKGRAY,
    fontFamily : 'Prompt-Regular',
    fontSize : RFValue(13)
  },
  textStyle3: {
    color : GLOBAL.COLOR.DARKGRAY,
    fontFamily : 'Prompt-Regular',
  //  padding: 10,
    fontSize : RFValue(13)
  },
  textStyleValue: {
    color : GLOBAL.COLOR.DARKGRAY,
    fontFamily : 'Prompt-Regular',
    paddingBottom: 10,
    fontSize : RFValue(13),
    marginLeft : Platform.OS === 'android' ?  global.selectValue =  'ar' ? 0 :  -35 : -40
  },
  textStyleValue1: {
    color : GLOBAL.COLOR.DARKGRAY,
    fontFamily : 'Prompt-Regular',
    //padding: 10,
    fontSize : RFValue(13)
  },
  textStyleValue2: {
    fontFamily : 'Prompt-Regular',
    padding: 10,
    fontSize : RFValue(13)
  },
  textStyleValue3: {
    fontFamily : 'Prompt-SemiBold',
    fontSize : RFValue(15)
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
 emptyListStyle: {
   padding: 10,
   fontSize: RFValue(18),
   textAlign: 'center',
 },

});

export default FlatListDemo;
