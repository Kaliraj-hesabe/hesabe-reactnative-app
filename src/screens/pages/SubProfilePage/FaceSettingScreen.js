
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager,NativeModules} from 'react-native';
//import Panel from '../../components/Panel';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements'

import AsyncStorage  from '@react-native-community/async-storage';
import RNRestart from "react-native-restart";
import Localized from '../../../locales'
const GLOBAL = require('../../../utils/Globals');
import { CustomButton } from '../../../components/CustomButton.js';
//import Modal from 'react-native-modal';
import { BackHandler } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';
import rectImg from '../Assest/rectangle.png';
//import NotificationManager from 'react-native-check-notification-enable'
import {checkNotifications} from 'react-native-permissions';
import OneSignal from "react-native-onesignal";
import CustomAlertComponent from '../../../components/CustomAlertComponent';


export default class FaceSettingScreen extends Component {
  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {

       	selectedButton: "OFFERS",
        selectedLanguage : '',
        showAlert : false,
        showAlertMessage : '',
        settingArray: [
    {id: 1, value: "EnableFingerprintandFaceID", isChecked: true},
    {id: 2, value: "Notification", isChecked: false},
  ],


    };


  }

  static contextType = DarkModeContext;


  componentDidMount()
  {
    this.readFaceData();
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   console.log('backclick');


     // this.props.onProfileReturn('false');
      this.props.navigation.navigate('Profile')

    return true;
}

onPressAlertPositiveButton = () => {

  this.setState({showAlert: false}, () => {

  });
  };

readFaceData = async () => {
  try {
    const faceData = await AsyncStorage.getItem('FaceDataFlag')
    const notificationData = await AsyncStorage.getItem('NotificationDataFlag')



    console.log('SettingMLM :' + faceData);

    let newArray = [...this.state.settingArray]
    var selectFaceData = ''

    if (faceData !== null) {
      if (faceData === "false") {
        newArray[0].isChecked = false
       // newArray[1].isChecked = false
       //selectFaceData = newArray[1].value


      }
      else {
        newArray[0].isChecked = true
       // newArray[1].isChecked = true
        //selectFaceData = newArray[0].value

      }

    }
    else {
      newArray[0].isChecked = false
     // newArray[1].isChecked = false
      //selectFaceData = newArray[0].value

    }


    let notification_status = false
  /*  NotificationManager.areNotificationsEnabled().then((e)=>{
console.log("BBBB" + e); //true or false
notification_status = true
newArray[1].isChecked = e

  this.setState({

   array: newArray,
   selectFaceData : selectFaceData
 })
OneSignal.disablePush(false)
}).catch((e)=>{
notification_status = false
newArray[1].isChecked = e

  this.setState({

   array: newArray,
   selectFaceData : selectFaceData
 })
OneSignal.disablePush(true)
})*/
checkNotifications().then(({status, settings}) => {
  console.log("BBBB1" + status);
 if(status == 'granted')
 {
  // newArray[1].isChecked = true




  if (notificationData !== null) {
    if (notificationData === "false") {
      newArray[1].isChecked = false
      OneSignal.disablePush(true)
    }
    else {
      newArray[1].isChecked = true
      OneSignal.disablePush(false)
    }

  }
  else {
    newArray[1].isChecked = true
       OneSignal.disablePush(false)
  }

  this.setState({

   array: newArray,
   selectFaceData : selectFaceData
 })

 }
 else {
   newArray[1].isChecked = false
   this.setState({

    array: newArray,
    selectFaceData : selectFaceData
  })
  OneSignal.disablePush(true)
 }

});




  } catch (e) {
   // alert('Failed to fetch the data from storage')
  }
  }



  handleCheckChieldElement(event){
    console.log('checkpressed');

    let langarray = this.state.settingArray
     var selectLanguage = ''
    langarray.forEach(fruite => {
       if (fruite.value === event.value)
        {
          fruite.isChecked =  !event.isChecked
           console.log('currentkey  ' + event.key);
           if(fruite.id == 1)
           {
           AsyncStorage.setItem('FaceDataFlag', !event.isChecked == true ? 'false' :'true')
           if (Platform.OS != "android")
           {
          NativeModules.ChangeViewBridge.faceData(!event.isChecked == true ? 'false' :'true');
            }
            else {
             NativeModules.ExampleModule.MinimizeExample(!event.isChecked == true ? 'false' :'true');
           }
         }
         else {

           checkNotifications().then(({status, settings}) => {
             console.log("BBBB1" + status);
            if(status == 'granted')
            {
             // newArray[1].isChecked = true



             AsyncStorage.setItem('NotificationDataFlag', !event.isChecked == true ? 'false' :'true')
             !event.isChecked == true ?   OneSignal.disablePush(false) :   OneSignal.disablePush(true)


            }
            else {
              fruite.isChecked =  !event.isChecked
                this.setState({ showAlert: true,showAlertMessage : "Please enable notifications from device settings"});
            }

           });


         }

        //  console.log(await AsyncStorage.getItem('USER_LANGUAGE_PICKED'));
          //Localized.locale = event.key
        //  AsyncStorage.setItem('USER_LANGUAGE_PICKED', event.key)

        }
      /*  else {

          fruite.isChecked =  false
        }*/
    })
    this.setState({settingArray: langarray})

  }

  selectionOnPress(userType) {
     //this.setState({ selectedButton: userType });

     this.setState({ selectedButton: userType,

      // this.getDashboardDetail(true);
     });

   }

  applyOnPress() {

    // this.props.onProfileReturn('false');
     this.props.navigation.navigate('Profile')
  }

  toggleback(visible) {

    this.props.navigation.navigate('NotificationScreen')

  }



   alertItemName(item) {
  // console.log(item);

    }

  render(){
    const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
   const screenHeight = Dimensions.get("window").height;

    return(
      <View style={{
        backgroundColor: 'transparent',
        height : '100%'
        //opacity: 0.7
        }}>
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,marginTop: '70%',borderTopLeftRadius : 15,borderTopRightRadius : 15}}>

          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          //  marginTop : 100,
          //  height :'100%',
            borderRadius : 12
          }}>

          <View
          style={{
            //justifyContent: 'space-between',
            marginTop :30,
            flexDirection: "row",
            height : 50,
            alignItems : "center",
            marginBottom : 5
          }}>

            <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center',}}>
          <TouchableOpacity
          style={{shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 1,
              shadowRadius: 9.11,
              borderRadius : 20,
              elevation: 14,

              }}
          onPress={() => {

                this.applyOnPress()

              }}>

          <Image style ={{borderRadius :15}} source={ require('../Assest/close.png')} />
          </TouchableOpacity>
          </View>

          <View
          style={{
            alignItems : 'center',
            width : '60%'
            //marginLeft : -30
          }}>
          <Text style={{fontSize: RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('ProfilePage.Settings')}</Text>
          </View>


          </View>

        <ScrollView contentContainerStyle={{paddingBottom: 150}}>

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :10,
            flexDirection: "column",

            //  alignItems : "stretch",
          }}>


          <View style={{
           height : screenHeight,
          }} >
            {

               this.state.settingArray.map((item, index) => (
                 <View style={{
                flexDirection :'column',
                 }} >


                 <View  style={{
                   flexDirection :'row',
                   justifyContent : 'space-between',
                   alignItems : 'center',
                   marginLeft : 10,
                   marginRight : 10,
                  // width : '100%',
                   height : 60
                   }}>

                   <Text style = {{fontSize :  RFValue(17),color :  isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY,marginLeft :10,textAlign : 'left',width : '80%'}} >{Localized.t('ProfilePage.'+item.value)}</Text>





                     <Switch
                     value={item.isChecked}
                     onValueChange={() => this.handleCheckChieldElement(item)}
                     trackColor={{true: GLOBAL.COLOR.ORANGE, false: GLOBAL.COLOR.SHADEGRAY}}
                     style={{  height: "55%",
                      transform:[{ scaleX: 1.0 }, { scaleY: 1.0 }]}}
                     thumbColor={GLOBAL.COLOR.WHITE}
                     />


                    </View>
                    </View>
               ))
            }


          </View>


          </View>

           </ScrollView>

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
    button3: {
      alignItems: 'center',
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
    fontSize: RFValue(15),
    color: '#867EBD',
  //  height:50,
    width:'100%'
  },


  });
