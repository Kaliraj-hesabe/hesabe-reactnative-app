
import React, {Component} from 'react';
const GLOBAL = require('../utils/Globals');
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Localized from '../locales'
import { CustomButton } from './CustomButton.js';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';

//import Modal from 'react-native-modal';


export default class AcessDeniedScreen extends Component {
  constructor(){
    super();
    this.state = {

     }


    };



  applyOnPress() {
    var ilistData = 'OKbutton';
     this.props.onOKDeniedClick(ilistData);
  }



 static contextType = DarkModeContext;
  render(){
     const isDarkMode = this.context === 'dark';
    const screenWidth = Dimensions.get("window").width;
    const screenheight = Dimensions.get("window").height;
    console.log("access" + this.props.example);
    //const arrayValue = this.props.example;

       //console.log("illust1" + );
      var selectionMenu
      var arrayindex = this.props.example['Flag']



    return(


    <ScrollView contentContainerStyle={{paddingBottom: 60}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE}}>
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,height : screenheight}} onStartShouldSetResponder={() => true}>

         <View
         style={{
           justifyContent: 'space-between',
           marginTop :30,
           flexDirection: "column",
           alignItems : 'center',
           //height : 40,
           //  alignItems : "stretch",
         }}>
        <Image  source={require('../screens/pages/Assest/AccessDenied.png')} />
        <Text style = {{marginLeft : 0,marginTop : 10,fontSize :  RFValue(28),color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-SemiBold'}}>{Localized.t('AccessDeniedPage.AccessDenied')}</Text>
        <Text style={{fontSize:  RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,  fontFamily : 'Prompt-Regular',textAlign : 'center'}}> {Localized.t('AccessDeniedPage.Youdonothavepermissionforthisservice')} </Text>
        </View>


          <View style={{
            alignItems : 'center',
            marginTop : 30,
            display : this.props.example == true ?  'none' : null
            }}>
          <CustomButton title= {Localized.t('AccessDeniedPage.Ok')}  onPress={() => this.applyOnPress()}/>
         </View>
        </View>
          </ScrollView>
      );
    }
  }
