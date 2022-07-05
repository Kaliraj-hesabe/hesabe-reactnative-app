
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
import API from '../../../utils/API';
import IllustratorScreen  from '../../../components/IllustratorScreen.js';
import IllustratorModals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import CustomAlertComponent from '../../../components/CustomAlertComponent';
import {checkNotifications} from 'react-native-permissions';
import { isProperDate,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters} from '../../../utils/GlobalFunction';


export default class NotificationManagementScreen extends Component {
  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
    this.state = {

       	selectedButton: "OFFERS",
        selectedLanguage : '',
        showAlert : false,
        showAlertMessage : '',
        illustratorVisible: false,
        notificationOfferDisplayArray: [],
        notificationArray: [
  /*  {id: 1, value: "Invoice Success Payment", status: true},
    {id: 2, value: "Invoice Failure Payment", status: true},
    {id: 3, value: "Employee Addition", status: true},
    {id: 4, value: "Change Password", status: true},
    {id: 5, value: "Open Invoice Received", status: true},
    {id: 6, value: "Open Invoice Expired", status: true},
    {id: 7, value: "Open Invoice Cancelled", status: true},
    {id: 8, value: "Link Expiration", status: true},
    {id: 9, value: "Amount Transferred", status: true},
    {id: 10, value: "Amount Refunded", status: true},
    {id: 11, value: "Refund Rejected", status: true},
    {id: 12, value: "Quick Invoice Expired", status: true},
    {id: 13, value: "Quick Invoice Cancelled", status: true},
    {id: 14, value: "Account Status", status: true},*/

  ]


    };


  }

  static contextType = DarkModeContext;


  componentDidMount()
  {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     this.getNotificationService();
       console.log(this.state.notificationArray);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}


onPressAlertPositiveButton = () => {

  this.setState({showAlert: false}, () => {

  });
  };



getNotificationService() {
 var self = this;
  API.get(GLOBAL.API_STRING.NOTIFICATIONSERVICE + `?page=${self.state.page}` ,{

    params: {
       'merchantCode' : GLOBAL.MERCHANT_CODE,
      }


  }).then(function (response) {

    const json = JSON.parse(response)
     //console.log(json);


     var pageurl;



   let markers = [];
   let displayOfferMarkers = [];
   let displayTransactionMarkers = [];
   if(json.response.data.length != 0)
   {

     for(let i = 0; i < json.response.data.length; i++) {
      markers.push({
     notificationSubTypeId: json.response.data[i].notification_sub_type_id,
     notification_sub_type_name: I18nManager.isRTL? json.response.data[i].notification_sub_type_name_ar :json.response.data[i].notification_sub_type_name_en,
     notification_type_id : json.response.data[i].notification_type_id,
     notification_type_name : I18nManager.isRTL ? json.response.data[i].notification_type_name_ar :json.response.data[i].notification_type_name_en,
     status : json.response.data[i].status
     });


    }
  }

  var notificationArray = markers.reduce((notificationSoFar, { notification_type_id, notification_type_name,notificationSubTypeId,notification_sub_type_name,status }) => {
   if (!notificationSoFar[notification_type_name]) notificationSoFar[notification_type_name] = [];
   notificationSoFar[notification_type_name].push(
     {
     notificationSubTypeId: notificationSubTypeId,
     notification_sub_type_name: notification_sub_type_name,
     notification_type_id : notification_type_id,
     notification_type_name :  notification_type_name,
     status : status
   });
   return notificationSoFar;
 }, {});


  self.setState
      ({
     notificationArray: markers,
     notificationOfferDisplayArray : notificationArray,
    })

  console.log(self.state.notificationOfferDisplayArray);

  })
  .catch(function (error) {
    console.log(error);
  });
}



SaveNotificationCharge()
{
  var self = this;

  console.log(self.state.notificationArray);

API.post(GLOBAL.API_STRING.NOTIFICATIONSERVICE, {

"merchantCode" : GLOBAL.MERCHANT_CODE,
"notificationSettings" : self.state.notificationArray
//"smsKnetFixedAmount":   self.state.names[0].subnamevalue1,

}).then(function (response) {
  const json = JSON.parse(response)
  console.log(json.status);
 console.log(json);
  if(json.status)
  {
     self.setState({ illustratorVisible: true });
  }
  else {

  }
})
.catch(function (error) {
  const errorjson = JSON.parse(error)
    console.log('final :' + errorjson);

    var message = ''
    if(errorjson.response != null)
    {


        message = errorjson.response


    }
    else {
      message = errorjson.message
    }

   self.setState({ showAlert: true,showAlertMessage : message});

});

}

handleBackButtonClick() {
   console.log('backclick');
      this.toggleback(false)
    return true;
}





  handleCheckChieldElement(event){
    console.log('checkpressed');
    console.log(event);
    checkNotifications().then(({status, settings}) => {
      console.log("BBBB1" + status);
     if(status == 'granted')
     {
       let langarray = this.state.notificationArray
        var selectLanguage = ''
       langarray.forEach((fruite,index) => {
          if (fruite.notificationSubTypeId === event.notificationSubTypeId)
           {
             fruite.status =  event.status == 0 ? 1 : 0
              console.log('currentkey  ' + event.status);

           }

       })
       this.setState({notificationArray: langarray})


       let offerArray = this.state.notificationOfferDisplayArray

        Object.keys(offerArray).map((item, index) => {

          offerArray[item].forEach((fruite,index) => {

             if (fruite.notificationSubTypeId === event.notificationSubTypeId)
              {
                fruite.status =  event.status == 0 ? 1 : 0
                 console.log('Offercurrentkey  ' + event.notificationSubTypeId);

              }

          })

        })


       this.setState({notificationOfferDisplayArray: offerArray})



     }
     else {
         this.setState({ showAlert: true,showAlertMessage : "Please enable notifications from device settings"});
     }

    });

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

    toggleillustratorPress(visible) {
    this.setState({ illustratorVisible: visible });
    }

    illustratorReceiveData(searchValue)
     {
         this.toggleillustratorPress(false)

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
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,marginTop: '40%',borderTopLeftRadius : 15,borderTopRightRadius : 15}}>

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

                this.toggleback(false)

              }}>

          <Image style ={{borderRadius :15}} source={ require('../Assest/close.png')} />
          </TouchableOpacity>
          </View>

          <View
          style={{
            alignItems : 'center',
            width : '70%'
            //marginLeft : -30
          }}>
          <Text style={{fontSize: RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('NotificationPage.ManageNotification')}</Text>
          </View>


          </View>

        <ScrollView contentContainerStyle={{paddingBottom: 100}} style = {{height : screenHeight-200}}>

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :10,
            flexDirection: "column",

            //  alignItems : "stretch",
          }}>


          <View style={{
           //height : screenHeight,

          }} >
            {
               Object.keys(this.state.notificationOfferDisplayArray).map((item, index) => (

                 <View style={{
                flexDirection :'column',
                 }} >


                  <Text style = {{fontSize : RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.ORANGE,marginLeft :10,width : '70%',textAlign : 'left',marginRight :10}} >{I18nManager.isRTL ? item : lowerCaseAllWordsExceptFirstLetters(item.toUpperCase())}</Text>

                  {
                     Object.values(this.state.notificationOfferDisplayArray[item]).map((items, secondindex) => (

                 <View  style={{
                   flexDirection :'row',
                   justifyContent : 'space-between',
                   alignItems : 'center',
                   marginLeft : 10,
                   marginRight : 10,
                  // width : '100%',
                   height : 60
                   }}>

                   <Text style = {{fontSize : RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft :10,width : '70%',textAlign : 'left',marginRight :10}} >{ I18nManager.isRTL ? items.notification_sub_type_name:lowerCaseAllWordsExceptFirstLetters(items.notification_sub_type_name.toUpperCase())}</Text>


                     <Switch
                     value={items.status == 0 ? false : true}
                     onValueChange={() => this.handleCheckChieldElement(items)}
                     trackColor={{true: GLOBAL.COLOR.ORANGE, false: GLOBAL.COLOR.SHADEGRAY}}
                     style={{  height: "55%",
                      transform:[{ scaleX: 1.0 }, { scaleY: 1.0 }]}}
                     thumbColor={GLOBAL.COLOR.WHITE}
                     />


                    </View>
                  ))
                   }

                    </View>

               ))
            }


          </View>


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
           <IllustratorScreen example = {{'index' : 5 ,'value' : 'hi'}} isDarkMode = {isDarkMode}  onOKClick={this.illustratorReceiveData}/>
          </ModalContent>
         </IllustratorModals.BottomModal>

           </ScrollView>

            </View>

        </View>

        <View style={{
          alignItems : 'flex-end',
          marginTop : 50,
          padding : 10,
          paddingBottom : 20
          }}>
        <CustomButton title= {Localized.t('EditDetailPage.Save')} onPress={() => this.SaveNotificationCharge()} style = {{fontSize : RFValue(20)}}/>
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
