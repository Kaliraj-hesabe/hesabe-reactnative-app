
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager,NativeModules,Alert,TextInput,AppState} from 'react-native';
//import Panel from '../../components/Panel';
import CustomView from '../../components/CustomView';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { CheckBox } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
//import * as ImagePicker from "react-native-image-picker"
import Localized from '../../locales'
import AsyncStorage  from '@react-native-community/async-storage';
import RNRestart from "react-native-restart";
import API from '../../utils/API';
const GLOBAL = require('../../utils/Globals');
import BankDetailsScreen from './SubProfilePage/BankDetailScreen';
import CommissionScreen from './SubProfilePage/CommissionScreen';
import IntegrationScreen from './SubProfilePage/IntegrationScreen';
import ManagePermissionScreen from './SubProfilePage/ManagePermissionScreen';
import AdminChargesScreen from './SubProfilePage/AdminChargesScreen';
import { CustomButton } from '../../components/CustomButton.js';
import {Form,TextValidator}  from '../../customTextField';
import RNFetchBlob from 'rn-fetch-blob'
//import Modal from 'react-native-modal';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

import ProfileModals from 'react-native-modals';
import { Modalize } from 'react-native-modalize';
import CustomAlertComponent from '../../components/CustomAlertComponent';
import IllustratorScreen  from '../../components/IllustratorScreen.js';
import IllustratorModals, {} from 'react-native-modals';
import axios from 'axios';
import OpenNativeScreen from "react-native-open-native-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';
import OneSignal from "react-native-onesignal";
import {paymentDisplayTypeID,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters} from '../../utils/GlobalFunction';


export default class ProfileScreen extends Component {
  constructor(props){
    super(props);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.profileReceiveData = this.profileReceiveData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
    this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
    this.illustratorReceiveData = this.illustratorReceiveData.bind(this);

    this.state = {
      avatarSource: null,
      bottomModalAndTitle: false,
      profileModalVisible: false,
      currentIndexSelected : '',
      EditEmails : false,
      profName : '',
      profMobile : '',
      profMobileCountryCode : '',
      profEmail : '',
      intMerchantCode : '',
      intAccessCode : '',
      intSecretKey : '',
      intIvKey : '',
      bankName : '',
      bankAccountNo : '',
      bankBeneficiaryName : '',
      bankIban : '',
      commissionKnetPerc : '',
      commissionKnetvalue : '',
      commissionMpgsPerc : '',
      commissionMpgsvalue : '',
      commissionSetupCharge : '',
      commissionMonthlyCharge : '',
      ProfLogo : './Assest/Profilelogo.png',
      emailArray: [],
      serviceTypeArray: [],
      paymentTypeArray: [],
      commissionTypeArray : [],
      primaryEmailtext : '',
      secondaryEmailtext : '',
      tertiaryEmailtext : '',
      showLogoutAlert : false,
      showAlert : false,
      showAlertMessage : '',
      selectedLanguage : '',
      selectFaceData : '',
      illustratorVisible: false,

      settingModal: false,

              merchantMenunames: [
                 {
                    id: 0,
                    name: 'Language',
                 },
                 {
                    id: 1,
                    name: 'BankDetails',
                 },
                 {
                    id: 2,
                    name: 'HesabeCommission',
                 },
                 {
                    id: 3,
                    name: 'AdministrativeCharges',
                 },
                 {
                    id: 4,
                    name: 'IntegrationKeys',
                 },
                 {
                    id: 5,
                    name: 'ManageUsers',
                 },
                 /*{
                    id: 6,
                    name: 'Notification',
                 },*/
                 {
                    id: 7,
                    name: 'Settings',
                 },

              ],


              employeeMenunames: [
                 {
                    id: 0,
                    name: 'Language',
                 },
                 {
                    id: 5,
                    name: 'ManageUsers',
                 },

              ],


              languageArray: [
          {id: 1, value: "English", isChecked: true,key:'en'},
          {id: 2, value: "عربى", isChecked: false,key:'ar'},
        //  {id: 2, value: "Filipino", isChecked: false,key:'fil'},
        //  {id: 4, value: "മലയാളം", isChecked: false,key:'ml'}
      ],

      settingArray: [
  {id: 1, value: "EnableFingerprintandFaceID", isChecked: true},
  //{id: 2, value: "Notification", isChecked: false},

]





    };
    this.getProfileDetail()
    //this.readData()

  }

 static contextType = DarkModeContext;

  profilemodal = React.createRef();
  openProfileModal = () => {
 		 if (this.profilemodal.current) {
 			 this.profilemodal.current.open();
 		 }
 	 };

  closeProfileModal = () => {
 			 if (this.profilemodal.current) {
 				 this.profilemodal.current.close();
 			 }
 		 };

     settingModal = React.createRef();
     openSettingModal = () => {
    		 if (this.settingModal.current) {
    			 this.settingModal.current.open();
    		 }
    	 };

     closeSettingModal = () => {
    			 if (this.settingModal.current) {
    				 this.settingModal.current.close();
    			 }
    		 };


   readData = async () => {
     try {
       const lang = await AsyncStorage.getItem('USER_LANGUAGE_PICKED')
       console.log('MLM :' + lang);

       let newArray = [...this.state.languageArray]
       var selectlanguage = ''

       if (lang !== null) {
         if (lang === "ar") {
           newArray[0].isChecked = false
           newArray[1].isChecked = true
          selectlanguage = newArray[1].value
            global.selectValue =  'ar'
         }
         else {
           newArray[0].isChecked = true
           newArray[1].isChecked = false
           selectlanguage = newArray[0].value
             global.selectValue =  'en'
         }

       }
       else {
         newArray[0].isChecked = true
         newArray[1].isChecked = false
         selectlanguage = newArray[0].value
          global.selectValue =  'en'
       }

       this.setState({

        array: newArray,
        selectedLanguage : selectlanguage
      })

     } catch (e) {
      // alert('Failed to fetch the data from storage')
     }
     }



     readFaceData = async () => {
       try {
         const faceData = await AsyncStorage.getItem('FaceDataFlag')



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


        /* NotificationManager.areNotificationsEnabled().then((e)=>{
  console.log("BBBB" + e); //true or false
     newArray[1].isChecked = true
     OneSignal.disablePush(false)
}).catch((e)=>{
   newArray[1].isChecked = false
   OneSignal.disablePush(true)
})*/

         this.setState({

          array: newArray,
          selectFaceData : selectFaceData
        })

       } catch (e) {
        // alert('Failed to fetch the data from storage')
       }
       }

       state = {
        appState: AppState.currentState
      }

    componentDidMount()
    {
      console.log("MMMM :" +  global.DarkMode);
      this.readLanguageData()
      this.initialLanguageLoad()
      this.readFaceData()
      AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState);
   if ( nextAppState === 'active') {
     if(global.DeepLinkFlag == true &&  this.state.showLogoutAlert == true)
     {
       this.setState({
        showLogoutAlert : false
      })
     }
     if(global.DeepLinkFlag == true &&  this.state.bottomModalAndTitle == true)
     {
       this.setState({
         bottomModalAndTitle : false
      })
     }



   }

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

  		} catch (e) {
  		 // alert('Failed to fetch the data from storage')
  		}
  		}

  initialLanguageLoad()
  {

  }





  getProfileDetail() {
   var self = this;
    API.get(GLOBAL.API_STRING.PROFILE,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


    }).then(function (response) {

      const json = JSON.parse(response)

     let emailMark = [];
      emailMark.push(
        json.response.email,
      json.response.email_1 != null ? json.response.email_1 : '',
        json.response.email_2 != null ?  json.response.email_2 : '' ,

       )

       let markers = [];

       console.log(json.response.commission.service_payment_charges);
       console.log(json.response.payment_type);
      let dict = json.response.commission.service_payment_charges

       for (var key in dict) {
        // console.log( 'mkmk :'+ dict.length)
        //  console.log(dict[key])
        //  console.log(Object.keys(dict[key]).length)

         global.serviceType.map((item, index) => {
           if(item.id == key && item.id != 6)
          {
        /*  markers.push({

            id: key,
            headerName : item.name,
            subheader1: 'Knet',
            subname1: 'Percentage',
            subnamevalue1: dict[key].KNET.percentage + '%',
            subname2: 'Value',
            subnamevalue2: dict[key].KNET.fixed,
            subheader2: 'Mpgs',
            subname3: 'Percentage',
            subnamevalue3: dict[key].MPGS.percentage + '%',
            subname4: 'Value',
            subnamevalue4: dict[key].MPGS.fixed,
            Imge : 1
       	 }); */

            const refFixedString = 'fixed';
             const refPercentageString = 'percentage';

            let mark = [];
          for (let item in dict[key]) {

             //console.log("MKMKM  :" + (dict[key][item][refPercentageString]))
             if(item != "KFAST")
             {
              mark.push( {

                subheader1: upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters((dict[key][item]['display_name']))),
                subname1: 'Percentage',
                subnamevalue1: (dict[key][item][refPercentageString]) + '%',
                subname2: 'Value',
                subnamevalue2: dict[key][item][refFixedString],
              });
            }
          }


           markers.push({

              id: key,
              headerName : item.name,
              mark,
              Imge : 1
           });





        }
      })
    }



     let mark = [];


         mark.push( {

           subheader1: 'Charge',
           subname1: 'Setup',
           subnamevalue1: global.employeFlag == true ? '' : json.response.commission.setup_charge.toFixed(3),
           subname2: 'MonthlySub',
           subnamevalue2: global.employeFlag == true ? '':json.response.commission.monthly_subscription_charge.toFixed(3),
         });



        markers.push({

          id: 99,
          headerName : 'Additional Charges',
          mark,
          Imge : 2
       });

  /*  markers.push({

      id: 99,
      headerName : 'Additional Charges',
      subheader1: 'Charge',
      subname1: 'Setup',
      subnamevalue1: json.response.commission.setup_charge.toFixed(3),
      subname2: 'MonthlySub',
      subnamevalue2: json.response.commission.monthly_subscription_charge.toFixed(3),
      subheader2: '',
      subname3: '',
      subnamevalue3: '',
      subname4: '',
      subnamevalue4: '',
      Imge : 2
   });*/


   console.log(markers)

    	 //	console.log("hhh " + json.response.recent_transactions.data[i].amount)






       console.log(json);
      self.setState({

     profName:  global.employeFlag == true ?json.response.merchant_name : json.response.contact_name,
     profMobile: json.response.mobile,
     profEmail : json.response.email,
     intMerchantCode : json.response.merchant_code,
     intAccessCode : json.response.access_code,
     intSecretKey : json.response.secret_key,
     intIvKey : json.response.iv_key,
     bankName : json.response.bank.name,
     bankAccountNo : json.response.bank.account_number,
     bankBeneficiaryName : json.response.bank.beneficiary_name,
     bankIban : json.response.bank.iban_number,
     commissionKnetPerc : json.response.commission.knet_percentage_rate != null ? json.response.commission.knet_percentage_rate : 0,
     commissionKnetvalue : json.response.commission.knet_fixed_amount != null ? json.response.commission.knet_fixed_amount : 0,
     commissionMpgsPerc : json.response.commission.mpgs_percentage_rate != null ? json.response.commission.mpgs_percentage_rate : 0,
     commissionMpgsvalue : json.response.commission.mpgs_fixed_amount != null ? json.response.commission.mpgs_fixed_amount : 0,
     commissionSetupCharge : json.response.commission.setup_charge != null ? json.response.commission.setup_charge : 0,
     commissionMonthlyCharge : json.response.commission.monthly_subscription_charge != null ? json.response.commission.monthly_subscription_charge : 0,
     ProfLogo : json.response.company_logo,
     emailArray : emailMark,
     paymentTypeArray : json.response.payment_type,
     serviceTypeArray : json.response.service_type,
     commissionTypeArray : markers,
     profMobileCountryCode : json.response.mobile_country_code,
     primaryEmailtext : emailMark[0],
     secondaryEmailtext : emailMark[1],
     tertiaryEmailtext : emailMark[2],

      })
    })
    .catch(function (error) {
      console.log(error);
    });


  }


  selectPhotoTapped() {
     const options = {
       quality: 1.0,
       maxWidth: 300,
       maxHeight: 160,
       mediaType : 'photo',
       tintColor : GLOBAL.COLOR.ORANGE,
       storageOptions: {
         skipBackup: true,
       },
     };

     ImagePicker.showImagePicker(options, response => {
       console.log('Response = ', response);

       if (response.didCancel) {
         console.log('User cancelled photo picker');
       } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
       } else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       } else {
         let source = {uri: response.uri};

         // You can also display the image using data:
         // let source = { uri: 'data:image/jpeg;base64,' + response.data };

         this.setState({avatarSource: response, }, () => {

           this.uploadLogo();

          });
       }
     });
   }




   uploadLogo() {

        var attachment = {}
       if(this.state.avatarSource != null)
       {
         var fileUrl =  this.state.avatarSource


         attachment = {
           "uri": Platform.OS === 'android' ? fileUrl.uri : fileUrl.uri,
           "type": fileUrl.type,
           "name": fileUrl.name != null ? fileUrl.name : 'test.jpg',
        }
       }

    var self = this;
    var parm1 = {}
     API.post(GLOBAL.API_STRING.PROFILE + GLOBAL.API_STRING.LOGO,
       parm1,
       {
         logo : attachment
       }

        ).then(function (response) {
          console.log(response);
       const json = JSON.parse(response)
       console.log(json.status);
      console.log(json);
       if(json.status)
       {
         self.toggleModal(false)
         self.setState({ illustratorVisible: true });
       }
       else {

       }
     })
     .catch(function (error) {
       const errorjson = JSON.parse(error)
       console.log('final :' + error);
    // console.log('final :' + errorjson.message);
       var message = ''
       if(errorjson.response != null)
       {
         if(errorjson.response.logo != null)
         {
           message = errorjson.response.logo[0]
         }

       }
       else {
         message = errorjson.message
       }
      self.setState({ showAlert: true,showAlertMessage : message});

    });


   }




  toggleModal(visible) {
    this.setState({ bottomModalAndTitle: visible });

  }

  toggleEditEmailModal(flag)
  {
    this.setState({
      bottomModalAndTitle: false,
      EditEmails : flag
    });

  }




  toggleSettingModal(visible) {
    this.setState({ settingModal: visible });

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
          // !event.isChecked == true ?   OneSignal.disablePush(false) :   OneSignal.disablePush(true)

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

  profileReceiveData(Value)
  {
  //this.closeProfileModal()
  this.setState({profileModalVisible: false})
 }

 handleChange(name) {
   return (text) => {
         this.setState({[name]:text })
     }
 }


 onOkPressButton = () => {

   this.setState({showAlert: false}, () => {

   });
   };

 onPressAlertPositiveButton = () => {

   this.setState(state => ({
     showLogoutAlert: false
   }));
   API.delete(GLOBAL.API_STRING.LOGOUT,{
  }).then(function (response) {
  console.log('profileResponse:' + response);
  global.Token = null
  if (Platform.OS === "android")
  {
  OpenNativeScreen.startActivity("com.hesabemerchant.LoginActivity", {
  name: global.selectValue == 'en' ? 'en' : 'ar',
})
  .then(response => {
    console.log("response is: ", response);
  })
  .catch(error => {
    console.log("error is: ", error);
  });
  /*    NativeModules.ActivityStarter.getDeviceName((err ,name) => {
  console.log(err, name);
});*/
  }
  else {
    NativeModules.ChangeViewBridge.changeToNativeView();
  }


})
.catch(function (error) {
 console.log(error);
    });

   };

   onPressAlertNegativeButton = () => {
     this.setState(state => ({
       showLogoutAlert: false
     }));
   };


 logoutAlert()
 {
   this.setState(state => ({
     showLogoutAlert: true
   }));
  // console.log(item);


              /*  NativeModules.ActivityStarter.getDeviceName((err ,name) => {
           console.log(err, name);
         });*/


 }



 emailSubmit = () => {
      this.updateEmail()
  }

 emailFormSubmit = () => {
     this.refs.form.submit();
 }

 updateEmail() {
     var self = this;

   API.put(GLOBAL.API_STRING.PROFILE, {
      "merchantCode" : GLOBAL.MERCHANT_CODE,
     "email1" : this.state.secondaryEmailtext,
     "email2": this.state.tertiaryEmailtext,


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
         if(errorjson.response.email1 != null)
         {
           message = errorjson.response.email1[0]
         }
         else if(errorjson.response.email2 != null)
         {
           message = errorjson.response.email2[0]
         }
       }
       else {
         message = errorjson.message
       }
      self.setState({ showAlert: true,showAlertMessage : message});


   });

 }


 illustratorReceiveData(searchValue)
  {

   this.toggleillustratorPress(false)
   this.toggleEditEmailModal(false)
   this.getProfileDetail()
     //this.setState({filterType: filterValue});
  }

   toggleillustratorPress(visible) {
   this.setState({ illustratorVisible: visible });

   }


   alertItemName(item) {
  // console.log(item);

         this.setState({currentIndexSelected: item.id})
          if (item.id == 0)
          {
            /*this.setState({
              languageModal: true,
            });*/

            this.props.navigation.navigate('LanguageScreen',
           {
             example : {"BankName":this.state.bankName,
              "BankAccountNo":this.state.bankAccountNo,"BankBeneficiaryName" : this.state.bankBeneficiaryName,"BankIban" : this.state.bankIban}
           })
          }
          else if(item.id == 1)
          {
            //this.openProfileModal()

              //this.setState({profileModalVisible: true})

          this.props.navigation.navigate('BankDetails',
         {
           example : {"BankName":this.state.bankName,
            "BankAccountNo":this.state.bankAccountNo,"BankBeneficiaryName" : this.state.bankBeneficiaryName,"BankIban" : this.state.bankIban}
         })

          }
          else if(item.id == 2)
          {
              //this.setState({profileModalVisible: true})
          this.props.navigation.navigate('CommissionScreen',
          {
          example : {"CommissionKnetPerc":this.state.commissionKnetPerc,
           "CommissionKnetvalue":this.state.commissionKnetvalue,"CommissionMpgsPerc" : this.state.commissionMpgsPerc,"CommissionMpgsvalue" : this.state.commissionMpgsvalue,"CommissionSetupCharge" : this.state.commissionSetupCharge,"CommissionMonthlyCharge" : this.state.commissionMonthlyCharge,"newCommissionArray" : this.state.commissionTypeArray}
         })

         }
          else if(item.id == 3)
          {
            //  this.setState({profileModalVisible: true})
            //  this.openProfileModal()
          this.props.navigation.navigate('AdminChargesScreen')

          }
          else if(item.id == 4)
          {
            //  this.setState({profileModalVisible: true})
          this.props.navigation.navigate('IntegrationKeyScreen',{

            example : {"MerchantCode":this.state.intMerchantCode,
              "AccessCode":this.state.intAccessCode,
              "SecretKey":this.state.intSecretKey,
              "IVkey":this.state.intIvKey}
            })

          }
          else if(item.id == 5)
          {
            //  this.setState({profileModalVisible: true})
          this.props.navigation.navigate('ManagePermissionScreen')

          }
          else if(item.id == 6)
          {
            //  this.setState({profileModalVisible: true})
          this.props.navigation.navigate('NotificationScreen')

          }
          else if(item.id == 7)
          {
            //  this.setState({profileModalVisible: true})
            //this.toggleSettingModal(true)
              this.props.navigation.navigate('FaceSettingScreen')
        //  this.props.navigation.navigate('NotificationScreen')

          }


    }




  render(){

     const isDarkMode = this.context === 'dark';
    const screenWidth = Dimensions.get("window").width;

    const menuNameArray = global.employeFlag == true ? this.state.employeeMenunames : this.state.merchantMenunames


    return(
   <>

        <View style={{ flex: 1,backgroundColor : GLOBAL.COLOR.DARKBLUE}}>


        <View
        style={{
          padding: 0,
          alignItems : "center",
        //  backgroundColor: 'transparent'
        }}>
        <Image
          source= {{uri: `data:image/gif;base64,${this.state.ProfLogo}`}} //{require('./Assest/Profilelogo.png')}
          style={{
            width: 140,
            height: 140,
            borderRadius: 140/2,
            marginTop : 40,
           overflow: "hidden",
           borderWidth: 3,
           borderColor: GLOBAL.COLOR.WHITE,
           resizeMode:  Platform.OS === 'android' ? 'cover' :'contain',
           backgroundColor : GLOBAL.COLOR.WHITE
          }}
        />
        </View>


        <View
        style={{
          justifyContent: 'space-between',
          marginTop :-50,
          flexDirection: "row",
          height : 50,
          alignItems : "center",
        }}>

        <TouchableOpacity
        style={ {marginLeft  : global.selectValue == 'en' ? 0 : -20}}
        onPress={() => {
               this.logoutAlert()
            }}
            >

        <Image  source={require('./Assest/backSquare.png')} />
        </TouchableOpacity>


        <CustomAlertComponent
            displayAlert={this.state.showLogoutAlert}
            displayAlertIcon={false}
            alertTitleText={Localized.t('TextValidationPage.Alert')}
            alertMessageText={Localized.t('TextValidationPage.LogoutMessage')}
            displayPositiveButton={true}
            positiveButtonText={Localized.t('TextValidationPage.Yes')}
            displayNegativeButton={true}
            negativeButtonText={Localized.t('TextValidationPage.No')}
            onPressPositiveButton={this.onPressAlertPositiveButton}
            onPressNegativeButton={this.onPressAlertNegativeButton}
          />

        <TouchableOpacity
        style={styles.button2}
        onPress={() => {
              this.setState({
                bottomModalAndTitle: global.employeFlag == true ? false : true,

              });
              // this.openSettingModal()
                //this.props.navigation.navigate('SettingScreen')

            }}>
        <Image  source={require('./Assest/menuVertical.png')} style = {{display : global.employeFlag == true ? 'none' : null}} />
        </TouchableOpacity>
        </View>


          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            marginTop : 20,
          //  height :'100%',
            borderTopLeftRadius : 12,
            borderTopRightRadius : 12
          }}>



    <ScrollView contentContainerStyle={{paddingBottom: 300}}>

   <View style={{display : this.state.EditEmails == true ? 'none' : null}}>
    <View
      style={{

        marginTop :20,
        marginLeft : 20,
        marginRight : 20,
        flexDirection: "row",
        shadowColor: GLOBAL.COLOR.LIGHTBLUE,
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.1,
        shadowRadius: 9.11,
        borderTopLeftRadius : 15,
        borderTopRightRadius : 15,
        elevation: 10,
        backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
        borderWidth : isDarkMode ? 1 : 0,
        borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.WHITE,
        padding : 15,

      //  height : 50,
        //alignItems : "flex-start",
      }}>


          <Text style={{fontSize:  RFValue(15),color :GLOBAL.COLOR.DARKGRAY,marginLeft : 0,width :60}}>{Localized.t('ProfilePage.Name')}</Text>

          <View
          style={{
            backgroundColor : GLOBAL.COLOR.SHADEGRAY,
            width : 3,
            height : '100%',
            marginLeft : 20
          }}>
          </View>

            <Text style={{fontSize:  RFValue(15),color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,marginLeft : 20,width : '70%',textAlign : 'left',height : '115%'}}>{this.state.profName}</Text>
          </View>



          <View
            style={{

              marginTop :20,
              marginLeft : 20,
              marginRight : 20,
              padding : 15,
              flexDirection: "row",
              shadowColor: GLOBAL.COLOR.LIGHTBLUE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.1,
              shadowRadius: 9.11,
              elevation: 10,
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
              //height : 50,
                padding : 15,
              borderWidth : isDarkMode ? 1 : 0,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
              //alignItems : "flex-start",
            }}>

          <Text style={{fontSize:  RFValue(15),color : GLOBAL.COLOR.DARKGRAY,marginLeft : 0,width : 60,height : '100%'}}>{Localized.t('ProfilePage.Mobile')}</Text>

          <View
          style={{
            backgroundColor : GLOBAL.COLOR.SHADEGRAY,
            width : 3,
            height : '100%',
            marginLeft : 20
          }}>
          </View>

            <Text style={{fontSize:  RFValue(15),color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 20,width : '100%',textAlign : 'left'}}>{ "(+" + this.state.profMobileCountryCode + ") " + this.state.profMobile}</Text>
          </View>



          <View
            style={{

              marginTop :20,
              marginLeft : 20,
              marginRight : 20,
              padding : 15,
              flexDirection: "row",
              shadowColor: GLOBAL.COLOR.LIGHTBLUE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.1,
              shadowRadius: 9.11,
              elevation: 10,
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
              alignItems : "center",
              borderWidth : isDarkMode ? 1 : 0 ,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
            }}>


           <Text style={{fontSize:  RFValue(15),color :GLOBAL.COLOR.DARKGRAY,marginLeft : 0,width : 60}}>{Localized.t('ProfilePage.Email')}</Text>

          <View
          style={{
            backgroundColor : GLOBAL.COLOR.SHADEGRAY,
            width : 3,
            height : '100%',
            marginLeft : 20
          }}>
          </View>




          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
           //backgroundColor : GLOBAL.COLOR.WHITE,
        //  width : '85%'

          }}>

          {
          this.state.emailArray.map((item, index) => {
           if(item.length != 0)
           {
          return <View style={{
          flexDirection : 'row',alignItems :'center',marginLeft : 10,marginTop : 5,
          }} >
          <Image
          source={require('./Assest/rectangle.png')}
          style={styles.ImageIconStyle}
          />
          <Text style={{fontSize:  RFValue(15),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 10,width : '75%',textAlign : 'left',marginTop : 5,height: '110%'}}>{item}</Text>
         </View>
          }
          })}


         </View>

          </View>




          <View
            style={{

              marginTop :20,
              marginLeft : 20,
              marginRight : 20,
              padding : 15,
              flexDirection: "row",
              shadowColor: GLOBAL.COLOR.LIGHTBLUE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.1,
              shadowRadius: 9.11,
              elevation: 10,
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
              borderWidth : isDarkMode ? 1 : 0,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
              alignItems : "center",
            }}>


              <Text style={{fontSize:  RFValue(15),color :GLOBAL.COLOR.DARKGRAY,marginLeft : 0, width : 60,height : '100%'}}>{Localized.t('ProfilePage.Services')}</Text>

             <View
             style={{
               backgroundColor : GLOBAL.COLOR.SHADEGRAY,
               width : 3,
               height : '100%',
               marginLeft : 20
             }}>
             </View>




             <View  style={{
               flexDirection : 'column',
               //justifyContent: 'center',
             //  alignItems: 'center',
               backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
               width : '65%',
             }}>

             {
               this.state.serviceTypeArray.map((item, index) => (

             <View style={{
             flexDirection : 'row',alignItems :'center',marginLeft : 10,marginTop : 10
             }} >
             <Image
             source={require('./Assest/rectangle.png')}
             style={styles.ImageIconStyle}
             />
             <Text style={{fontSize:  RFValue(15),color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,marginLeft : 10,width : '100%',textAlign : 'left'}}>{item.name}</Text>
            </View>


              ))}

            </View>

             </View>




             <View
               style={{

                 marginTop :20,
                 marginLeft : 20,
                 marginRight : 20,
                 padding : 15,
                 flexDirection: "row",
                 shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                 shadowOffset: {
                   width: 0,
                   height: 7,
                 },
                 shadowOpacity: 0.1,
                 shadowRadius: 9.11,
                 borderBottomLeftRadius : 15,
                 borderBottomRightRadius : 15,
                 elevation: 10,
                 backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                 borderWidth : isDarkMode ? 1 : 0 ,
                 borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
                 alignItems : "center",
               }}>


                 <Text style={{fontSize:  RFValue(15),color :GLOBAL.COLOR.DARKGRAY,marginLeft : 0, width : 60,height :50}}>{Localized.t('ProfilePage.PaymentType')}</Text>

                <View
                style={{
                  backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                  width : 3,
                  height : '100%',
                  marginLeft : 20
                }}>
                </View>




                <View  style={{
                  flexDirection : 'column',
                  //justifyContent: 'center',
                //  alignItems: 'center',
                  backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                  width : '65%',
                }}>

                {
                this.state.paymentTypeArray.map((item, index) => (

                <View style={{
                flexDirection : 'row',alignItems :'center',marginLeft : 10,marginTop : 5,
                }} >
                <Image
                source={require('./Assest/rectangle.png')}
                style={styles.ImageIconStyle}
                />
                <Text style={{fontSize:  RFValue(15),color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE,marginLeft : 10,width : '100%',textAlign : 'left'}}>{item.display_name}</Text>
               </View>
               ))}



               </View>

                </View>



            <View style={{
              marginTop :20,
              marginLeft : 15,
              marginRight : 15,
              shadowColor: GLOBAL.COLOR.LIGHTBLUE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.1,
              shadowRadius: 9.11,
              borderRadius : 15,
              //borderBottomRightRadius : 15,
              borderWidth : isDarkMode ? 1 : 0 ,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
              elevation: 10,
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
            }} >
              {

                 menuNameArray.map((item, index) => (
                   <View style={{
                  flexDirection :'column',
                   }} >


                   <TouchableOpacity
                      key = {item.id}
                    //  style = {styles.container}
                      onPress = {() =>

                        this.alertItemName(item)

                      }>
                   <View  style={{
                     flexDirection :'row',
                     justifyContent : 'space-between',
                     alignItems : 'center',
                     marginLeft : 10,
                     marginRight : 10,
                     height : 50,

                     }}>

                      <Text style = {[styles.TextStyle,{color: isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE, width : '70%',textAlign: 'left'}]}>
                         {Localized.t('ProfilePage.'+item.name)}
                      </Text>

                    <View style={{
                    flexDirection : 'row',alignItems : 'center',marginRight : 10 ,justifyContent : 'flex-end' , width : '30%'
                    }} >

                    <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,display :  index == 0 ? null : 'none',fontSize :  RFValue(15),justifyContent: "center",
                      textAlign: global.selectValue == 'en' ? 'left' :'right',width :'70%'
                      }}>
                       {this.state.selectedLanguage}
                    </Text>


                       <Image
                      source={global.selectValue == 'en' ?  require('./Assest/rightArrow1.png') : require('./Assest/leftArrow1.png')}
                       style={{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}}
                       />

                    </View>
                    </View>
                      </TouchableOpacity>
                      <View
                      style={{
                        backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                        display : index == menuNameArray.length-1 ? 'none' : null,
                      //  width : '100%',
                      marginLeft : 10,
                      marginRight : 10,
                        height : 2,
                      }}>
                      </View>
                      </View>
                 ))
              }
            </View>

            </View>

            <View style={{display : this.state.EditEmails == true ? null : 'none',backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}} >

            <View
            style={{
              justifyContent : 'center',
              alignItems :'center',
              marginTop :10,
              height : 50
            }}>
              <Text style={{fontSize:  RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 0,fontFamily : 'Prompt-Medium'}}>{Localized.t('ProfilePage.EditEmails').toUpperCase()}</Text>
            </View>


            <Form
                  ref="form"
                  onSubmit={this.emailSubmit}
             >
            <View
              style={{

                marginTop :20,
                marginLeft : 20,
                marginRight : 20,
                //flexDirection: "row",
                shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9.11,
                borderTopLeftRadius : 15,
                borderTopRightRadius : 15,
                elevation: 10,
                backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                borderWidth : isDarkMode ? 1 : 0 ,
                borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
              //  height : 50,
                alignItems : "center",
                justifyContent : 'space-between',
              }}>


                   <View style = {{
                      alignItems : 'center',
                     justifyContent : 'space-between' ,
                      padding : 10,
                     flexDirection: 'row',
                  //   backgroundColor : 'orange',
                     width : '100%'

                   }}>
                  <Text style={{fontSize:  RFValue(15),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,textAlign : 'left',width : '40%',height : '100%'}}>{Localized.t('ProfilePage.PrimaryEmail')}</Text>

                  <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    width : 2,
                    height : '100%',

                  }}>
                  </View>

                  <TextInput style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
                    marginLeft : 10,fontSize:  RFValue(15),
                    textAlign: global.selectValue == 'en' ? 'left' : 'right',
                    width : '60%',
                    alignItems : 'center',
                    height : '100%'
                  }}
                  onChangeText={this.handleChange('primaryEmailtext')}
                  placeholder = {'Primary Email Address'}
                  returnKeyType="next"
                  onSubmitEditing={() => {this.secondEmailTextInput.focus()}}
                  blurOnSubmit={false}
                  editable={false}
                  selectTextOnFocus={false}
                  multiline = {true}
                  >
                  {this.state.primaryEmailtext}
                  </TextInput>
                  </View>

                  </View>



                  <View
                    style={{

                      marginTop :20,
                      marginLeft : 20,
                      marginRight : 20,
                      padding : 10,
                      flexDirection: "row",
                      shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 9.11,
                      elevation: 10,
                      backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                      borderWidth : isDarkMode ? 1 : 0 ,
                      borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,

                    //  height : 50,
                      //alignItems : "flex-start",
                        alignItems : "center",
                    }}>


                  <Text style={{fontSize:  RFValue(15),color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY,width : '40%',height : '100%'}}>{Localized.t('ProfilePage.SecondaryEmail')}</Text>

                  <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    width : 3,
                    height : '100%',
                    //marginLeft : 10
                  }}>
                  </View>

                  <TextValidator
                           style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE  :GLOBAL.COLOR.DARKGRAY,width : screenWidth*.5,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                           name="SecondaryEmailAddress"
                           label="SecondaryEmailAddress"
                           validators={['isEmail']}
                           errorMessages={[Localized.t('TextValidationPage.Entervalidemail')]}
                           errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                           placeholder="Secondary Email Address"
                           placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY}
                           type="SecondaryEmailAddress"
                           keyboardType="email-address"
                           value={this.state.secondaryEmailtext}
                           onChangeText={this.handleChange('secondaryEmailtext')}
                           ref={(input) => { this.secondEmailTextInput = input; }}
                           onSubmitEditing={() => { this.thirdEmailTextInput.focus(); }}
                           returnKeyType="next"
                           maxLength={50}
                           blurOnSubmit={true}
                           multiline = {true}
                           numberOfLines={4}
                           multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY, maxHeight:  Platform.OS === 'android' ? 40 : 80,marginLeft : 10,width : screenWidth*.5,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                   />
                  </View>


                  <View
                    style={{

                      marginTop :20,
                      marginLeft : 20,
                      marginRight : 20,
                      padding : 10,
                      flexDirection: "row",
                      shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 9.11,
                      borderBottomLeftRadius : 15,
                      borderBottomRightRadius : 15,
                      elevation: 10,
                      backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                      borderWidth : isDarkMode ? 1 : 0 ,
                      borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
                    //  height : 50,
                      //alignItems : "flex-start",
                        alignItems : "center",
                    }}>

                  <Text style={{fontSize:  RFValue(15),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,width : '40%',height : '100%'}}>{Localized.t('ProfilePage.TertiaryEmail')}</Text>

                  <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    width : 3,
                    height : '100%',
                  //  marginLeft : 20
                  }}>
                  </View>

                  <TextValidator
                           style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                           name="tertiaryEmailAddress"
                           label="tertiaryEmailAddress"
                           validators={['isEmail']}
                           errorMessages={[Localized.t('TextValidationPage.Entervalidemail')]}
                           errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                           placeholder="tertiary Email Address"
                           placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY}
                           type="tertiaryEmailAddress"
                           keyboardType="email-address"
                           value={this.state.tertiaryEmailtext}
                           onChangeText={this.handleChange('tertiaryEmailtext')}
                           ref={(input) => { this.thirdEmailTextInput = input; }}
                          // onSubmitEditing={() => { this.thirdEmailTextInput.focus(); }}
                           returnKeyType="done"
                           maxLength={50}
                           blurOnSubmit={true}
                           multiline = {true}
                           numberOfLines={4}
                           multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY , maxHeight:  Platform.OS === 'android' ? 40  :80,marginLeft : 10,width : screenWidth*.5,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                   />

                  </View>

                  <View style={{
                      justifyContent: 'space-evenly',
                      flexDirection : 'row',
                      marginTop : 100,
                      marginBottom : 20,
                   }}>
                    <CustomButton title= {Localized.t('ProfilePage.Cancel')}  onPress={() => this.toggleEditEmailModal(false)} style = {{width : 150,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,fontSize : RFValue(20),borderWidth : isDarkMode ? 1 :  0 ,borderColor : isDarkMode ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.WHITE}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}/>
                    <CustomButton title= {Localized.t('ProfilePage.Save')}  onPress={() => this.emailFormSubmit()} style = {{width : 150,fontSize : RFValue(20)}}
                      imgStyle = {styles.icon2}
                    />
                  </View>
                  </Form>


            </View>

             </ScrollView>

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
            onPressPositiveButton={this.onOkPressButton}
          />


        <ProfileModals.BottomModal
         propagateSwipe={true}
         visible={this.state.profileModalVisible}
         swipeableModal = {false}
        //visible = {this.state.modalVisible}
       // onTouchOutside={() => this.setState({ HideModal: false })}
        height={1}
        width={1}
       // onSwipeOut={() => this.setState({ HideModal: false })}

      >
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: 'fff',
          }}
        >
        {this.state.currentIndexSelected == 1 ?
        <BankDetailsScreen example = {{"BankName":this.state.bankName,
         "BankAccountNo":this.state.bankAccountNo,"BankBeneficiaryName" : this.state.bankBeneficiaryName,"BankIban" : this.state.bankIban}}  onProfileReturn={this.profileReceiveData}/> :
         this.state.currentIndexSelected == 2 ? <CommissionScreen example = {{"CommissionKnetPerc":this.state.commissionKnetPerc,
          "CommissionKnetvalue":this.state.commissionKnetvalue,"CommissionMpgsPerc" : this.state.commissionMpgsPerc,"CommissionMpgsvalue" : this.state.commissionMpgsvalue,"CommissionSetupCharge" : this.state.commissionSetupCharge,"CommissionMonthlyCharge" : this.state.commissionMonthlyCharge}}  onProfileReturn={this.profileReceiveData}/> :
         this.state.currentIndexSelected == 3 ? <AdminChargesScreen  onProfileReturn={this.profileReceiveData}/> :
        this.state.currentIndexSelected == 4 ? <IntegrationScreen example = {{"MerchantCode":this.state.intMerchantCode,
          "AccessCode":this.state.intAccessCode,
          "SecretKey":this.state.intSecretKey,
          "IVkey":this.state.intIvKey}} onProfileReturn={this.profileReceiveData}/> :
         <ManagePermissionScreen  onProfileReturn={this.profileReceiveData}/>
        }
        </ModalContent>
       </ProfileModals.BottomModal>

        <Modal.BottomModal
       visible={this.state.settingModal}
       //visible = {this.state.modalVisible}
       //onTouchOutside={() => this.setState({ settingModal: false })}
       height={0.5}
       width={1}
       onSwipeOut={() => this.setState({ settingModal: false })}
       modalTitle={



         <View
          style={{
            //justifyContent: 'center',
            marginTop :10,
            marginLeft : 0,
            flexDirection: "row",
            width : '100%',
            //height : 40,
            alignItems : "space-between",
            backgroundColor : GLOBAL.COLOR.WHITE
          }} >

          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.toggleSettingModal(!this.state.settingModal)}}>
          <Image style={styles.icon4} source={require('./Assest/close.png')} />
          </TouchableOpacity>

          <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize :  RFValue(22),fontFamily : 'Prompt-Bold',width : '80%',textAlign : 'center'}}>{Localized.t('ProfilePage.Settings')}</Text>
          <Text></Text>
          </View>

       }
     >
       <ModalContent
         style={{
           flex: 1,
           backgroundColor:  isDarkMode ? GLOBAL.COLOR.BLACK  : GLOBAL.COLOR.WHITE,
         }}

       >
       <View
       style={{
         justifyContent: 'space-between',
         marginTop :10,
         flexDirection: "column",
         //height : 40,
         //  alignItems : "stretch",
       }}>



      <View style={{

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
               marginLeft : 0,
               height : 60,
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

       </ModalContent>
     </Modal.BottomModal>



     <Modal.BottomModal
    visible={this.state.bottomModalAndTitle}
    //visible = {this.state.modalVisible}
    onTouchOutside={() => this.setState({ bottomModalAndTitle: false })}
    height={0.42}
    width={1}
    onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
    modalTitle={



      <View
       style={{
         //justifyContent: 'center',

         width : '100%',
         //height : 40,
         alignItems : "center",
         backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
       }} >


       <View style = {{ flexDirection: "row",marginTop : 10,justifyContent: 'center',padding : 10}}>
       <TouchableOpacity
       style={{width : '20%'}}
       onPress={() => {
         this.toggleModal(!this.state.bottomModalAndTitle)}}>
       <Image style={styles.icon4} source={require('./Assest/close.png')} />
       </TouchableOpacity>

       <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE: GLOBAL.COLOR.DARKBLUE,textAlign : 'center',fontSize :  RFValue(22),fontFamily : 'Prompt-Bold',width : '60%'}}>{Localized.t('ProfilePage.Settings')}</Text>
       <Text style = {{width : '20%' }}></Text>
       </View>
       </View>

    }
  >
    <ModalContent
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
      }}
    >
    <ScrollView keyboardShouldPersistTaps='handled'>
    <View
    style={{
      justifyContent: 'space-between',
      marginTop :10,
      flexDirection: "column",
      //height : 40,
      //  alignItems : "stretch",
    }}>


    <View
   style={{
     justifyContent: 'center',
     marginTop :30,
     marginLeft : 0,
     flexDirection: "row",
     // padding : 10,
     borderRadius : 10,
     height : 55,
     alignItems : "center",
     backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.LIGHTPURPLE,
     borderWidth : isDarkMode ? 1 : 0 ,
     borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
   }} >

   <TouchableOpacity
   style={{zIndex: 1}}
  onPress={this.selectPhotoTapped.bind(this)}>
   <Image  style = {styles.icon} source={require('./Assest/choosePhotos.png')} />
   <Text style =  {styles.btnText}>{Localized.t('ProfilePage.ChoosePhoto')}</Text>
   </TouchableOpacity>

   </View>


  <View
 style={{
   justifyContent: 'center',
   marginTop :30,
   marginLeft : 0,
   flexDirection: "row",
   // padding : 10,
   borderRadius : 10,
   height : 55,
   alignItems : "center",
   backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.LIGHTPURPLE,
   display : 'none'
 }} >

 <TouchableOpacity
 style={{zIndex: 1}}
 onPress={() => {
   this.toggleModal(!this.state.modalVisible)}}>

  <Image
  source={require('./Assest/passwordLock.png')}
  style={styles.icon}
  />
 <Text style =  {styles.btnText}>{Localized.t('ProfilePage.ChangePassword')}</Text>
 </TouchableOpacity>
 </View>

 <View
style={{
  justifyContent: 'center',
  marginTop :30,
  marginLeft : 0,
  flexDirection: "row",
  // padding : 10,
  borderRadius : 10,
  height : 55,
  alignItems : "center",
  backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.LIGHTPURPLE,
  borderWidth : isDarkMode ? 1 : 0 ,
  borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
}} >

<TouchableOpacity
onPress={() => {
  this.toggleEditEmailModal(true)}}>
 <EntypoIcons name="email" color='#867EBD'  size={20} style = {styles.icon} />
<Text style =  {styles.btnText}>{Localized.t('ProfilePage.EditEmails')}</Text>
</TouchableOpacity>
</View>


    </View>
   </ScrollView>
    </ModalContent>
  </Modal.BottomModal>

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
         <IllustratorScreen example = {{'index' : 5 ,'value' : ''}} isDarkMode = {isDarkMode} onOKClick={this.illustratorReceiveData}/>
        </ModalContent>
       </IllustratorModals.BottomModal>

          <Modalize
           ref={this.profilemodal}

            //scrollViewProps={{ showsVerticalScrollIndicator: false }}
            onClosed={this.closeProfileModal()}
           // snapPoint={screenheight}
          >
          {this.state.currentIndexSelected == 1 ?
          <BankDetailsScreen example = {{"BankName":this.state.bankName,
           "BankAccountNo":this.state.bankAccountNo}}  onProfileReturn={this.profileReceiveData}/> :
           this.state.currentIndexSelected == 2 ? <CommissionScreen  onProfileReturn={this.profileReceiveData}/> :
           this.state.currentIndexSelected == 3 ? <AdminChargesScreen  onProfileReturn={this.profileReceiveData}/> :
          this.state.currentIndexSelected == 4 ? <IntegrationScreen example = {{"MerchantCode":this.state.intMerchantCode,
            "AccessCode":this.state.intAccessCode,
            "SecretKey":this.state.intSecretKey,
            "IVkey":this.state.intIvKey}} onProfileReturn={this.profileReceiveData}/> :
           <ManagePermissionScreen  onProfileReturn={this.profileReceiveData}/>
          }

          </Modalize>

          <Modalize
             ref={this.settingModal}
              panGestureEnabled={ Platform.OS === "android" ? true : false}
              withReactModal = {false}
              modalHeight={400}
              HeaderComponent={

                <View
                 style={{
                   //justifyContent: 'center',
                   marginTop :10,
                   marginLeft : 0,
                   flexDirection: "row",
                   width : '100%',
                   //height : 40,
                   alignItems : "center",
                   backgroundColor : GLOBAL.COLOR.WHITE
                 }} >

                 <TouchableOpacity
                 style={styles.button}
                 onPress={() => {
                                 this.closeSettingModal()}}>
                 <Image style={styles.icon4} source={require('./Assest/close.png')} />
                 </TouchableOpacity>

                 <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize :  RFValue(22),fontFamily : 'Prompt-Bold',marginLeft : screenWidth/2-100}}>{Localized.t('ProfilePage.Settings')}</Text>
                 </View>
              }
              //scrollViewProps={{ showsVerticalScrollIndicator: false }}
              onClosed={this.closeSettingModal()}

            >

            <View
            style={{
              justifyContent: 'space-between',
              marginTop :10,
              flexDirection: "column",
              //height : 40,
              //  alignItems : "stretch",
            }}>


            <View
           style={{
             justifyContent: 'center',
             marginTop :30,
             marginLeft : 0,
             flexDirection: "row",
             // padding : 10,
             borderRadius : 10,
             height : 55,
             alignItems : "center",
             backgroundColor : GLOBAL.COLOR.LIGHTPURPLE
           }} >

           <TouchableOpacity
          onPress={this.selectPhotoTapped.bind(this)}>
           <Image  style = {styles.icon} source={require('./Assest/choosePhotos.png')} />
           <Text style =  {styles.btnText}>{Localized.t('ProfilePage.ChoosePhoto')}</Text>
           </TouchableOpacity>

           </View>


          <View
         style={{
           justifyContent: 'center',
           marginTop :30,
           marginLeft : 0,
           flexDirection: "row",
           // padding : 10,
           borderRadius : 10,
           height : 55,
           alignItems : "center",
           backgroundColor : GLOBAL.COLOR.LIGHTPURPLE,
           display : 'none'
         }} >

         <TouchableOpacity
         onPress={() => {
           this.toggleModal(!this.state.modalVisible)}}>

          <Image
          source={require('./Assest/passwordLock.png')}
          style={styles.icon}
          />
         <Text style =  {styles.btnText}>{Localized.t('ProfilePage.ChangePassword')}</Text>
         </TouchableOpacity>
         </View>

         <View
        style={{
          justifyContent: 'center',
          marginTop :30,
          marginLeft : 0,
          flexDirection: "row",
          // padding : 10,
          borderRadius : 10,
          height : 55,
          alignItems : "center",
          backgroundColor : GLOBAL.COLOR.LIGHTPURPLE
        }} >

        <TouchableOpacity
        onPress={() => {
          this.toggleEditEmailModal(true)}}>
         <EntypoIcons name="email" color='#867EBD'  size={20} style = {styles.icon} />
        <Text style =  {styles.btnText}>{Localized.t('ProfilePage.EditEmails')}</Text>
        </TouchableOpacity>
        </View>


            </View>
            </Modalize>
           </>
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
      fontSize :  RFValue(17),
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
        marginRight : -20,
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
    marginTop : 0,
    tintColor : GLOBAL.COLOR.DARKGRAY,
 },


  });
