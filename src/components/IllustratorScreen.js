
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager,Platform} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Localized from '../locales'
import { CustomButton } from './CustomButton.js';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const GLOBAL = require('../utils/Globals');

//import Modal from 'react-native-modal';


export default class IllustratorScreen extends Component {
  constructor(){
    super();
    this.state = {

      SuccessItems: [
      {
          title:"Theinvoicewillbesenton",
          img : require('../screens/pages/Assest/illust1.png'),
      },
      {
          title:"Yourinvoice",
          img : require('../screens/pages/Assest/illust2.png'),
      },
      {
          title:"Yourinvoice",
          img : require('../screens/pages/Assest/illust3.png'),
      },
      {
          title:"Thefilewasdownloadedsuccessfully",
          img : require('../screens/pages/Assest/illust4.png'),
      },
      {
          title:"Thefilewasdownloadedsuccessfully",
          img : require('../screens/pages/Assest/illust5.png'),
      },
      {
          title: "The changes have been updated successfully",
          img : require('../screens/pages/Assest/illust6.png'),
      },
      {
          title: "YourRefundrequesthasbeensentsuccessfully",
          img : require('../screens/pages/Assest/illust6.png'),
      },
      {
          title: "Invoicegotcancelledsuccessfully",
          img : require('../screens/pages/Assest/illust6.png'),
      },
      {
          title: "Invoiceregeneratedsuccessfully",
          img : require('../screens/pages/Assest/illust6.png'),
      },
      {
          title: "Invoiceresendsuccessfully",
          img : require('../screens/pages/Assest/illust6.png'),
      },
      {
          title: "MakesureyoureconnectedtoaWiFiormobilenetwork",
          img : require('../screens/pages/Assest/illust7.png'),
      },
      {
          title: "WeexperiencinganinternalserverproblemPleasetryagainlater",
          img : require('../screens/pages/Assest/illust8.png'),
      },
      {
          title: "Yourcapturerequesthasbeensentprocessed",
          img : require('../screens/pages/Assest/illust6.png'),
      },
      {
          title: "YourCancelrequesthasbeensentsuccessfully",
          img : require('../screens/pages/Assest/illust6.png'),
      },




    ],

     }


    };


  applyOnPress() {
    var ilistData = 'OKbutton';
     this.props.onOKClick(ilistData);
  }




  render(){
   const isDarkMode = this.props.isDarkMode
   console.log("DDDD :" +  this.props.isDarkMode);
    const screenWidth = Dimensions.get("window").width;
    console.log("illust" + this.props.example);
    //const arrayValue = this.props.example;

       //console.log("illust1" + );
      var selectionMenu
      var arrayindex = this.props.example['index']
      var arrayName = this.props.example['Name']
      var arrayRefno = this.props.example['RefNo']


    return(


    <ScrollView contentContainerStyle={{paddingBottom: 60}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}} onStartShouldSetResponder={() => true}>


         <View
         style={{
           justifyContent: 'space-between',
           marginTop :30,
           flexDirection: "column",
           alignItems : 'center',
           width : '100%'
           //height : 40,
           //  alignItems : "stretch",
         }}>
        <Image  source={this.state.SuccessItems[arrayindex].img} style = {{width : 150,height : 150}} />
        <Text style = {{marginLeft : 0,marginTop : 10,fontSize : RFValue(28),color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-SemiBold'}}>{arrayindex == 10 ? Localized.t('IllustratorDetailsPage.NoNetworkConnection') : arrayindex == 11 ? Localized.t('IllustratorDetailsPage.Servererror') : Localized.t('IllustratorDetailsPage.Success')}</Text>

        {  arrayindex == 0 ? <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular'}}> {Localized.t('IllustratorDetailsPage.Theinvoicewillbesenton')}{arrayName} </Text>
        : arrayindex == 1  || arrayindex == 2 ?
        <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',alignItems : 'center', textAlign:'center'}}> {Localized.t('IllustratorDetailsPage.Yourinvoice')}
          <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.ORANGE,  fontFamily : 'Prompt-Regular'}}>{" #" + arrayRefno} </Text>
        {Localized.t('IllustratorDetailsPage.Hasbeensentto') + " "}
        {arrayName}
        </Text>
        :  arrayindex == 5 ? <Text style={{fontSize: RFValue(17),color : GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('IllustratorDetailsPage.changeshavebeenupdatedsuccessfully')} </Text>
        : arrayindex == 6 ? <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('IllustratorDetailsPage.YourRefundrequesthasbeensentsuccessfully')} </Text>
        : arrayindex == 7 ? <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('IllustratorDetailsPage.Invoicegotcancelledsuccessfully')} </Text>
        : arrayindex == 8 ? <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('IllustratorDetailsPage.Invoiceregeneratedsuccessfully')} </Text>
        : arrayindex == 9 ? <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('IllustratorDetailsPage.Invoiceresendsuccessfully')} </Text>
        : arrayindex == 10 ? <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Platform.OS === "android" ? (((Localized.t('IllustratorDetailsPage.MakesureyoureconnectedtoaWiFiormobilenetwork').replace("â", "'")).replace('\u00e2',"")).replace('\u0080',"")).replace('\u0099',"") : Localized.t('IllustratorDetailsPage.MakesureyoureconnectedtoaWiFiormobilenetwork').replace("â", "'")} </Text>
        : arrayindex == 11 ? <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('IllustratorDetailsPage.WeexperiencinganinternalserverproblemPleasetryagainlater')} </Text>
        : arrayindex == 12 ?   <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',alignItems : 'center', textAlign:'center'}}> {Localized.t('IllustratorDetailsPage.YourcapturerequesthasbeenprocessedforthepaymentID')}
            <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.ORANGE,  fontFamily : 'Prompt-Regular'}}>{" " + arrayRefno} </Text>
            {"\n"}
            {Localized.t('IllustratorDetailsPage.OrderReferenceNo') + " : "}
            {arrayName}
              </Text>
        : arrayindex == 13 ? <Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('IllustratorDetailsPage.YourCancelrequesthasbeensentsuccessfully')} </Text>
        :<Text style={{fontSize: RFValue(17),color :GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('IllustratorDetailsPage.Thefilewasdownloadedsuccessfully')} </Text>
        }



        </View>


          <View style={{
            alignItems : 'center',
            marginTop : 30,
            }}>
          <CustomButton title= {Localized.t('IllustratorDetailsPage.Ok')}  onPress={() => this.applyOnPress()}/>
         </View>
        </View>
          </ScrollView>
      );
    }
  }
