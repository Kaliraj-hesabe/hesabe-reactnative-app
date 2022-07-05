
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Clipboard,TextInput} from 'react-native';
//import Panel from '../../components/Panel';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import Localized from '../../../locales'
import { CustomButton } from '../../../components/CustomButton.js';
import API from '../../../utils/API';
const GLOBAL = require('../../../utils/Globals');
import { Keyboard } from 'react-native'

import IllustratorScreen  from '../../../components/IllustratorScreen.js';
import IllustratorModals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
//import Modal from 'react-native-modal';
import CustomAlertComponent from '../../../components/CustomAlertComponent';
import AccessDeniedScreen from '../../../components/AccessDeniedScreen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';


const screenWidth = Dimensions.get("window").width;
export default class AdminChargesScreen extends Component {
  constructor(){
    super();
      this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
    this.state = {

     clipboardContent: null,
      languageModal: false,
      showAlert : false,
      showAlertMessage : '',
      showAdminScreen : true,
      illustratorVisible: false,

      names: [
         {
            id: 0,
            name: 'KNETCharges',
            subname1: 'Fixed',
            subnamevalue1: '',
            subname2: 'Inpercentage',
            subnamevalue2: '',
            Imge : 1
         },
         {
            id: 1,
            name: 'VisaMasterCardAmex',
            subname1: 'Fixed',
            subnamevalue1: '',
            subname2: 'Inpercentage',
            subnamevalue2: '',
            Imge : 1
         },
         {
            id: 2,
            name: 'KNETCharges',
            subname1: 'Fixed',
            subnamevalue1: '',
            subname2: 'Inpercentage',
            subnamevalue2: '',
            Imge : 1
         },
         {
            id: 3,
            name: 'VisaMasterCardAmex',
            subname1: 'Fixed',
            subnamevalue1: '',
            subname2: 'Inpercentage',
            subnamevalue2: '',
            Imge : 1
         },

        /* {
            id: 4,
            name: 'KNETCharges',
            subname1: 'Fixed',
            subnamevalue1: '000.000',
            subname2: 'Inpercentage',
            subnamevalue2: '000.000',
            Imge : 1
         },
         {
            id: 5,
            name: 'MPGSCharges',
            subname1: 'Fixed',
            subnamevalue1: '000.000',
            subname2: 'Inpercentage',
            subnamevalue2: '000.000',
            Imge : 1
         },*/


      ],






    };

    this.getAdminChargeDetail()


  }

static contextType = DarkModeContext;
  getAdminChargeDetail() {
   var self = this;
    API.get(GLOBAL.API_STRING.ADMINCHARGE,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


    }).then(function (response) {

      const json = JSON.parse(response)
       console.log(json);

       /*let dict = json.response

        for (var key in dict) {

            console.log(key);
            for (let item in dict[key]) {
               console.log(dict[key][item]);

            }

        }*/

       let newArray = [...self.state.names]
        newArray[0].subnamevalue1 = json.response.sms.knet_fixed_amount;
        newArray[0].subnamevalue2 = json.response.sms.knet_percentage_rate;
        newArray[1].subnamevalue1 = json.response.sms.mpgs_fixed_amount;
        newArray[1].subnamevalue2 = json.response.sms.mpgs_percentage_rate;

        newArray[2].subnamevalue1 = json.response.web.knet_fixed_amount;
        newArray[2].subnamevalue2 = json.response.web.knet_percentage_rate;
        newArray[3].subnamevalue1 = json.response.web.mpgs_fixed_amount;
        newArray[3].subnamevalue2 = json.response.web.mpgs_percentage_rate;


      /*  newArray[4].subnamevalue1 = json.response.sms.knet_fixed_amount;
        newArray[4].subnamevalue2 = json.response.sms.knet_percentage_rate;
        newArray[5].subnamevalue1 = json.response.sms.mpgs_fixed_amount;
        newArray[5].subnamevalue2 = json.response.sms.mpgs_percentage_rate;*/
      self.setState({

       array: newArray,
       showAdminScreen  : true
    // profName:  json.response.contact_name,
     //profMobile: json.response.mobile,
     //profEmail : json.response.email,


      })
    })
    .catch(function (error) {
      const errorjson = JSON.parse(error)
        console.log('final :' + errorjson.message);

        var message = ''

          message = errorjson.message
        if(message == "This action is unauthorized.")
        {
        self.setState({ showAdminScreen  : false});
       }
       else {
         self.setState({ showAlert: true,showAlertMessage : message});
       }

    });


  }

  toggleModal(visible) {
    this.setState({ bottomModalAndTitle: visible });

  }

  applyOnPress() {

     //this.props.onProfileReturn('false');
     this.props.navigation.navigate('Profile')
  }

  onPressAlertPositiveButton = () => {

    this.setState({showAlert: false}, () => {

    });
    };


   alertItemName(item) {
   //console.log(item);

    }

    readFromClipboard(item) {
   // console.log(item);
  // Clipboard.setString(item.subname)

     }

     updateCharge(newName, index,value) {
       console.log(newName);
    const { names } = this.state;
    const newCharge = [...names];
    value == 'subnamevalue1' ? newCharge[index].subnamevalue1 = newName : newCharge[index].subnamevalue2 = newName;
    this.setState({ names: newCharge });

    console.log(this.state.names);

  }


  SaveAdminCharge() {


      var self = this;

    API.post(GLOBAL.API_STRING.ADMINCHARGE, {

    "merchantCode" : GLOBAL.MERCHANT_CODE,
    "knetRemark": "Test remark",
    "mpgsRemark": "Test remark",
    "smsKnetFixedAmount":   self.state.names[0].subnamevalue1,
    "smsKnetPercentageRate": self.state.names[0].subnamevalue2,
    "smsMpgsFixedAmount":   self.state.names[1].subnamevalue1,
    "smsMpgsPercentageRate": self.state.names[1].subnamevalue2,
    "webKnetFixedAmount":self.state.names[2].subnamevalue1,
    "webKnetPercentageRate": self.state.names[2].subnamevalue2,
    "webMpgsFixedAmount": self.state.names[3].subnamevalue1,
    "webMpgsPercentageRate":self.state.names[3].subnamevalue2,
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
          if(errorjson.response.smsKnetFixedAmount != null)
          {
            message = errorjson.response.smsKnetFixedAmount[0]
          }
          else if(errorjson.response.smsKnetPercentageRate != null)
          {
            message = errorjson.response.smsKnetPercentageRate[0]
          }
          else if(errorjson.response.smsMpgsFixedAmount != null)
          {
            message = errorjson.response.smsMpgsFixedAmount[0]
          }
          else if(errorjson.response.smsMpgsPercentageRate != null)
          {
            message = errorjson.response.smsMpgsPercentageRate[0]
          }
          else if(errorjson.response.smsKnetPercentageRate != null)
          {
            message = errorjson.response.smsKnetPercentageRate[0]
          }
          else if(errorjson.response.webKnetFixedAmount != null)
          {
            message = errorjson.response.webKnetFixedAmount[0]
          }
          else if(errorjson.response.webKnetPercentageRate != null)
          {
            message = errorjson.response.webKnetPercentageRate[0]
          }
          else if(errorjson.response.webMpgsFixedAmount != null)
          {
            message = errorjson.response.webMpgsFixedAmount[0]
          }
          else if(errorjson.response.webMpgsPercentageRate != null)
          {
            message = errorjson.response.webMpgsPercentageRate[0]
          }

        }
        else {
          message = errorjson.message
        }

       self.setState({ showAlert: true,showAlertMessage : message});

    });



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
    return(
     <View style={{ flex: 1,  backgroundColor :  isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE}}>
      <View
      style={{
      //  justifyContent: 'space-between',
        marginTop :30,
        flexDirection: "row",
        height : 50,
        alignItems : "center",
        backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
        marginBottom : 5
      }}>

          <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center'}}>
      <TouchableOpacity
      style={{
        shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
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

      <Image style ={{borderRadius : 15}} source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
      </TouchableOpacity>
      </View>

      <View
      style={{
        alignItems : 'center',
        width : '60%'
        //marginLeft : -35
      }}>
      <Text style={{fontSize:  RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('AdminChargePage.AdminCharges')}</Text>
      </View>
       <Text style={{width : '20%'}}></Text>
      </View>
  <ScrollView contentContainerStyle={{paddingBottom: 80}} style = {{display :  this.state.showAdminScreen == false ? 'none' : null,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
        <View >

          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          //  marginTop : 100,
          //  height :'100%',
            borderRadius : 12
          }}>


            <View style={{
              marginTop : 0,
            }} >
              {
                this.state.names.map((item, index) => (
                  <View style={{
                 flexDirection :'column',
                  }} >


                  <View style={{
                    width : '100%',
                    height : 50,
                 alignItems : 'center',
                 backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                 marginTop : 10,
                 display :  item.id === 0 || item.id === 2  || item.id === 6 ?  null :'none'
                  }} >
                  <Text style = {{fontSize :  RFValue(17),fontFamily :'Prompt-Medium',padding : 10,color : GLOBAL.COLOR.DARKGRAY}}>
                       { item.id === 0 ?
                          Localized.t('AdminChargePage.InvoicePay')
                        : item.id === 2 ? Localized.t('AdminChargePage.PaymentGateway') :  Localized.t('AdminChargePage.OpenInvoice')

                       }
                  </Text>
                  </View>
                  <TouchableOpacity
                     key = {item.id}
                     disabled={true}
                   //  style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                  <View  style={{
                    flexDirection :'column',
                    justifyContent : 'flex-start',
                   // alignItems : 'center',
                    marginLeft : 0,
                    padding : 10,
                  //  height : 120
                    }}>

                    <View style={{
                    flexDirection : 'row',alignItems :'center',
                     display :  item.name.length === 0 ? 'none' :null
                    }} >
                    <Image
                   source={require('../Assest/rectangle.png')}
                    style={styles.ImageIconStyle}
                    />
                     <Text style = {styles.TextStyle}>
                        { "  " + Localized.t('AdminChargePage.'+ item.name)}
                     </Text>
                   </View>


                     <View style={{
                     flexDirection : 'row',justifyContent : 'space-between',alignItems : 'center',marginTop : 10,marginRight : 10
                     }} >

                     <View style={{
                     flexDirection : 'column',alignItems : 'flex-start',justifyContent : 'space-between',width : '50%'
                     }} >
                     <Text style = {{color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
                      fontSize :  RFValue(15),
                      fontFamily : 'Prompt-Regular',
                      display :  item.subname1.length === 0 ? 'none' :null}}>
                        {Localized.t('AdminChargePage.'+ item.subname1)}
                     </Text>

                     <View style={{
                       marginTop :0,
                       marginLeft : 0,
                       marginRight : 0,
                       height : 50,
                       shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                       shadowOffset: {
                         width: 0,
                         height: 7,
                       },
                       shadowOpacity: 0.1,
                       shadowRadius: 9.11,
                       borderRadius : 10,
                       elevation: 10,
                       backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                       borderWidth : isDarkMode ? 1 : 0 ,
                       borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
                       width : '90%',
                       flexDirection: "column",justifyContent: 'space-between',alignItems : 'flex-start'}}>

                     <TextInput style =  {styles.subTextValue}
                     onChangeText={(e) => this.updateCharge(e, index,'subnamevalue1')}
                     placeholder = {this.state.UserId}

                     blurOnSubmit={false}
                     keyboardType={'numeric'}
                     maxLength = {25}
                     multiline = {true}
                     returnKeyLabel='Done'
                     returnKeyType='done'
                     onSubmitEditing={Keyboard.dismiss}
                    //  ref={(input) => { this[`roll-${index}`] = input; }}
                    // onSubmitEditing={() => { this[`roll-${index}`].focus()}}// this.state.names[index].subnamevalue2.focus()}}
                     >
                       {item.subnamevalue1}
                     </TextInput>
                     </View>
                     </View>


                     <TouchableOpacity
                     style={{display :  item.Imge === 1 ? null : 'none',marginTop : 30}}
                     disabled={true}
                    // onPress={() => this.readFromClipboard(item)}
                     >
                     <AntDesignIcons name="plus" color='#707070'  size={18}  />
                     </TouchableOpacity>


                     <View style={{
                     flexDirection : 'column',alignItems : 'flex-start',justifyContent : 'space-between',width : '50%',marginLeft : 10
                     }} >
                     <Text style = { {color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
                      fontSize :  RFValue(15),
                      fontFamily : 'Prompt-Regular',
                      display :  item.subname2.length === 0 ? 'none' :null}}>
                        {Localized.t('AdminChargePage.'+item.subname2)}
                     </Text>


                     <View style={{
                       marginTop :0,
                       marginLeft : 0,
                       marginRight : 10,
                       height : 50,
                       shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                       shadowOffset: {
                         width: 0,
                         height: 7,
                       },
                       shadowOpacity: 0.1,
                       shadowRadius: 9.11,
                       borderRadius : 10,
                       elevation: 10,
                       backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,
                       borderWidth : isDarkMode ? 1 : 0 ,
                       borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
                       width : '90%',
                       flexDirection: "column",justifyContent: 'space-between',alignItems : 'flex-start'}}>
                     <TextInput style =  {styles.subTextValue}
                     onChangeText={(e) => this.updateCharge(e, index,'subnamevalue2')}
                     placeholder = {this.state.UserId}
                     //returnKeyType= {this.state.names.length-1 == index ? "done" : "next"}
                     blurOnSubmit={false}
                     keyboardType={'numeric'}
                        maxLength = {25}
                        multiline = {true}
                        returnKeyLabel='Done'
                        returnKeyType='done'
                        onSubmitEditing={Keyboard.dismiss}
                    // ref={(input) => { this[`roll-${index}`] = input; }}
                  //  onSubmitEditing={() => { this[`roll-${index+1}`].focus()}}//this.state.names.length-1 == index ? Keyboard.dismiss() : this.state.names[index+1].subnamevalue1.focus()}}
                     >
                       {item.subnamevalue2}
                     </TextInput>
                     </View>
                     </View>


                     </View>




                     </View>
                     </TouchableOpacity>

                     </View>
                ))
             }
           </View>

           <View style={{
             alignItems : 'flex-end',
             marginTop : 50,
             padding : 10
             }}>
           <CustomButton title= {Localized.t('EditDetailPage.Save')} onPress={() => this.SaveAdminCharge()} style = {{fontSize : RFValue(20)}}/>
          </View>
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

         <View style  = {{display :  this.state.showAdminScreen == true ? 'none' : null}}>
         <AccessDeniedScreen example = {true}/>
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
     color: GLOBAL.COLOR.ORANGE,
     fontSize :  RFValue(17),
     fontFamily : 'Prompt-SemiBold',
   },
   subTextStyle: {
    color: GLOBAL.COLOR.DARKBLUE,
    fontSize :  RFValue(15),
    fontFamily : 'Prompt-Regular',
  },
  subTextValue: {
   color: GLOBAL.COLOR.DARKGRAY,
   fontSize :  RFValue(15),
   fontFamily : 'Prompt-Regular',
   marginTop : 10,
   marginLeft :10,
   width :'100%',
   textAlign :  I18nManager.isRTL == true ? 'right' : 'left'
  // backgroundColor :'black'
   //width :screenWidth*.5
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
 ImageIconStyle: {
  marginTop : 20
},

 });
