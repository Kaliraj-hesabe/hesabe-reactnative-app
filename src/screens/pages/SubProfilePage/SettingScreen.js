
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager} from 'react-native';
//import Panel from '../../components/Panel';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements'

import AsyncStorage  from '@react-native-community/async-storage';
import RNRestart from "react-native-restart";
import Localized from '../../../locales'
const GLOBAL = require('../../../utils/Globals');
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';
//import Modal from 'react-native-modal';



export default class SettingScreen extends Component {
  constructor(props){
    super(props);
    this.state = {


        selectedLanguage : '',
        languageArray: [
    {id: 1, value: "English", isChecked: true,key:'en'},
    {id: 2, value: "عربى", isChecked: false,key:'ar'},
  //  {id: 2, value: "Filipino", isChecked: false,key:'fil'},
  //  {id: 4, value: "മലയാളം", isChecked: false,key:'ml'}
  ]


    };


  }

  static contextType = DarkModeContext;
  componentDidMount()
  {
    this.initialLanguageLoad()
  }


  initialLanguageLoad()
  {
    let newArray = [...this.state.languageArray]
    var selectlanguage = ''
    if (global.selectValue  === "ar") {
      newArray[0].isChecked = false
      newArray[1].isChecked = true
     selectlanguage = newArray[1].value

    }
    else {
      newArray[0].isChecked = true
      newArray[1].isChecked = false
      selectlanguage = newArray[0].value

    }
  console.log('MLM :' + selectlanguage);
    this.setState({

     array: newArray,
     selectedLanguage : selectlanguage
   })
  }



  handleCheckChieldElement(event){
    console.log('checkpressed');

    let langarray = this.state.languageArray
     var selectLanguage = ''
    langarray.forEach((fruite,index) => {
       if (fruite.value === event.value)
        {
          fruite.isChecked =  !event.isChecked
           console.log('currentkey  ' + event.key);
           if(index == 0)
           {
             if(langarray[index+1].isChecked == false)
             {
               fruite.isChecked =  true
             }
           }
           else {
             if(langarray[index-1].isChecked == false)
             {
               fruite.isChecked =  true
             }
           }
        //  console.log(await AsyncStorage.getItem('USER_LANGUAGE_PICKED'));
          Localized.locale = event.key
        //  AsyncStorage.setItem('USER_LANGUAGE_PICKED', event.key)
         selectLanguage = event.value
        }
        else {

          fruite.isChecked =  false
        }
    })
    this.setState({languageArray: langarray,selectedLanguage : selectLanguage})

  }


  applyOnPress() {

    // this.props.onProfileReturn('false');
     this.props.navigation.navigate('Profile')
  }

  toggleback(visible) {

    this.props.navigation.navigate('Profile')

    let selectLang = this.state.selectedLanguage == 'English' ?  "en" : "ar"
    if(global.selectValue == selectLang)
    {

    }
    else {

      global.selectValue = selectLang
      console.log(global.selectValue);
      let vr =   global.selectValue

         AsyncStorage.setItem('TEMP_LANGUAGE_PICKED', global.selectValue)

         if (Platform.OS != "android")
         {
        NativeModules.ChangeViewBridge.updateLanguage(global.selectValue);
      }

        setTimeout(() => {

        this.state.selectedLanguage == 'English' ?  I18nManager.forceRTL(false) : I18nManager.forceRTL(true);
        RNRestart.Restart();
        global.selectedLang = vr

     }, 500);

    }


  }



   alertItemName(item) {
  // console.log(item);

    }

  render(){
      const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
   const screenHeight = Dimensions.get("window").height;

    return(
 <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <View style={{ flex: 1,backgroundColor : GLOBAL.COLOR.WHITE}}>

          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
            backgroundColor : GLOBAL.COLOR.WHITE,
          //  marginTop : 100,
          //  height :'100%',
            borderRadius : 12
          }}>

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :30,
            flexDirection: "row",
            height : 50,
            alignItems : "center",
          }}>

          <TouchableOpacity
          style={styles.button1}
          onPress={() => {

                this.toggleback(false)

              }}>

          <Image  source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
          </TouchableOpacity>

          <View
          style={{
            alignItems : 'center',
            marginLeft : -30
          }}>
          <Text style={{fontSize:  RFValue(22),color :GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('ProfilePage.Chooselanguage')}</Text>
          </View>
           <Text style={{fontSize:  RFValue(17),color :GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}></Text>
          </View>


          <View
          style={{
            justifyContent: 'space-between',
            marginTop :10,
            flexDirection: "column",

            //  alignItems : "stretch",
          }}>

         <Text style = {{marginLeft : 10,marginTop : 10,fontSize :  RFValue(17),color : GLOBAL.COLOR.DARKBLUE,marginRight :20}}>{Localized.t('ProfilePage.Languages')}</Text>

          <View style={{
        //   height : screenHeight,
          }} >
            {

               this.state.languageArray.map((item, index) => (
                 <View style={{
                flexDirection :'column',
                 }} >


                 <View  style={{
                   flexDirection :'row',
                   justifyContent : 'space-between',
                   alignItems : 'center',
                   marginLeft : 0,
                   height : 60
                   }}>

                   <Text style = {{fontSize :  RFValue(17),color : GLOBAL.COLOR.DARKGRAY,marginLeft :10,width : index == 0 ? 100 : 35,textAlign : 'left',marginRight :10}} >{item.value}</Text>



                     <CheckBox
                     checkedIcon={<AntDesignIcons name="checkcircle" size={25} style = {{color : GLOBAL.COLOR.ORANGE}}  />}
                     uncheckedIcon={<FeatherIcons name="circle" color='#867EBD'  size={25}  />}
                     checked={item.isChecked}
                     onPress={() => 	this.handleCheckChieldElement(item)}
                     key={index}

                    //  handleCheckChieldElement ={this.handleCheckChieldElement(item)}
                     />


                    </View>
                    </View>
               ))
            }
          </View>
          </View>

            </View>

        </View>
          </ScrollView>
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
      textAlign : 'left'
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
    icon: {
  // transform: [{ rotate: '180deg'}],
   width: 20,
   height: 20,
   position: 'absolute',
   marginLeft : -30,
   left: 2, // Keep some space between your left border and Image
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


  });
