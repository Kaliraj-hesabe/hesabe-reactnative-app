
import React, {Component} from 'react';
import rectImg from '../Assest/rectangle.png';
import grayrectImg from '../Assest/calender.png';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Clipboard,Share,Linking,} from 'react-native';
//import Panel from '../../components/Panel';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Localized from '../../../locales'
import { CustomButton } from '../../../components/CustomButton.js';
import API from '../../../utils/API';
const GLOBAL = require('../../../utils/Globals');
import IllustratorModals, {} from 'react-native-modals';
import IllustratorScreen  from '../../../components/IllustratorScreen.js';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomAlertComponent from '../../../components/CustomAlertComponent';
import {DarkModeContext} from 'react-native-dark-mode';
import parsePhoneNumber from 'libphonenumber-js'
import { decimalthreeDigit,currencyFormat,paymentDisplayTypeID,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters} from '../../../utils/GlobalFunction';



import SendLaterModal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

//import Modal from 'react-native-modal';



export default class PreviewDetailsScreen extends Component {
  constructor(props){
    super(props);

      this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
    this.state = {
        sendLaterModalView: false,
        ProfLogo : global.Logo,
        illustratorVisible: false,
        illustratorRefNo :'',
        illustratorName :'',
        shareURL : '',
        showAlert : false,
        showAlertMessage : '',
      InvoiceDetailsArray:
      [
          {id: 0,name: 'RefNo',subname1: '12345667890000'},
          {id: 1,name: 'Name',subname1: 'PramodYadav'},
          {id: 2,name: 'MobileNumber',subname1: '(+965) 949-483-94'},
          {id: 3,name: 'SendVia',subname1: 'SMS'},
          {id: 4,name: 'Amount',subname1: '4000.0000'},
      ],

      ProductArray :
     [
      {id: 0,name: '',subname1: '',totalvalue :''},
      {id: 1,name: '',subname1: '',totalvalue :''},
      {id: 2,name: '',subname1: '',totalvalue :''},
    ],

    AddressArray :
   [
    {id: 0,name: 'City',subname1: '',totalvalue :''},
    {id: 1,name: 'Block',subname1: '',totalvalue :''},
    {id: 2,name: 'Street',subname1: '',totalvalue :''},
    {id: 3,name: 'Jadda',subname1: '',totalvalue :''},
    {id: 4,name: 'House No',subname1: '',totalvalue :''},

  ],

    };
  console.log('AddressArray :'+this.props.AddressArray);

  }

  static contextType = DarkModeContext;

  selectionOnPress(userType) {
    this.setState({ selectedButton: userType });
  }

  toggleSendLaterModal(visible) {
    this.setState({ sendLaterModalView: visible });
  }

  SendInvoiceDetail() {
      var self = this;
      var mobno = self.props.Invoice[2].subname1.split(' ')
      var countryCode = mobno[0].split('+')

      var url =  this.props.AddressArray.length != 0 ? GLOBAL.API_STRING.QUICK_INVOICE + GLOBAL.API_STRING.DELHIVERY  : GLOBAL.API_STRING.QUICK_INVOICE

      var parm1 = this.props.AddressArray.length != 0 ? {

        "merchantCode" : GLOBAL.MERCHANT_CODE,
        "mobileNumber": mobno[1],
        "referenceNumber": self.props.Invoice[0].subname1,
        "customerName": self.props.Invoice[1].subname1,
        "amount": self.props.Invoice[9].subname1,
        "countryCode": countryCode[1].replace(')', ''),
        "invoiceType": self.props.Invoice[3].subname1 === "SMS" ? '1' : '0',
        "invoiceSubType" : self.props.Invoice[3].subname1 === "SMS" ? '0': self.props.Invoice[3].subname1 === "WhatsApp"  ? '1' :  self.props.Invoice[3].subname1 === "Email" ? '2' : '3',
        "knetFixedCharges": global.knetFixedCharges,
        "knetPercentageCharges": global.knetPercentageCharges,
        "mpgsFixedCharges": global.mpgsFixedCharges,
        "mpgsPercentageCharges": global.mpgsPercentageCharges,
        "knetChargesRemark": "Testing Knet Remark",
        "mpgsChargesRemark": "Testing Mpgs Remark",
        "serviceCharge": "0",
        "discount": "0",
        "description": self.props.Description,
        "customerEmail": self.props.Invoice[4].subname1,
        "orderId" : self.props.DeliveryOrderId,
        "itemsList": JSON.stringify(self.props.ProductArray)//"[{\"itemTitle\":\"test order\",\"rate\":\"10\",\"quantity\":\"2\",\"amount\":\"20.000\"},{\"itemTitle\":\"test order 2\",\"rate\":\"20\",\"quantity\":\"2\",\"amount\":\"40.000\"}]"
      } : {

        "merchantCode" : GLOBAL.MERCHANT_CODE,
        "mobileNumber": mobno[1],
        "referenceNumber":  self.props.Invoice[0].subname1,
        "customerName": self.props.Invoice[1].subname1,
        "amount": self.props.Invoice[5].subname1,
        "countryCode": countryCode[1].replace(')', ''),
        "invoiceType": self.props.Invoice[3].subname1 === "SMS" ? '1' : '0',
        "invoiceSubType" : self.props.Invoice[3].subname1 === "SMS" ? '0': self.props.Invoice[3].subname1 === "WhatsApp"  ? '1' :  self.props.Invoice[3].subname1 === "Email" ? '2' : '3',
        "knetFixedCharges": global.knetFixedCharges,
        "knetPercentageCharges": global.knetPercentageCharges,
        "mpgsFixedCharges": global.mpgsFixedCharges,
        "mpgsPercentageCharges": global.mpgsPercentageCharges,
        "knetChargesRemark": "Testing Knet Remark",
        "mpgsChargesRemark": "Testing Mpgs Remark",
        "serviceCharge": "0",
        "discount": "0",
        "description": self.props.Description,
        "customerEmail": self.props.Invoice[4].subname1,
        "itemsList": JSON.stringify(self.props.ProductArray)//"[{\"itemTitle\":\"test order\",\"rate\":\"10\",\"quantity\":\"2\",\"amount\":\"20.000\"},{\"itemTitle\":\"test order 2\",\"rate\":\"20\",\"quantity\":\"2\",\"amount\":\"40.000\"}]"
      }

    API.post(url,parm1,
      {
        attachment :  self.props.Attachment
      }).then(function (response) {
      const json = JSON.parse(response)
      console.log(json.status);
     console.log(json);
      if(json.status)
      {
         if(self.props.Invoice[3].subname1 === "SMS")
         {
         self.setState({
           illustratorRefNo : json.response.reference_number,
           illustratorName :  json.response.customer.name,
           illustratorVisible: true
         });
        }
        else {

          self.setState({ shareURL: json.response.url }, () => {

            setTimeout(() => {

              self.props.Invoice[3].subname1 === "WhatsApp" ?   self.shareToWhatsApp() : self.props.Invoice[3].subname1 === "Email" ? self.sharetoEmail(self.props.Invoice[4].subname1, 'Invoice details', self.state.shareURL) : self.shareApp()

          }, 300);
          self.props.onPreviewOkclick()

           });


        }
      }
      else {
          this.setState({ showRefundAlert: true,showRefundAlertMessage : json.message})
      }
    })
    .catch(function (error) {
      console.log('final :' + error);
      const errorjson = JSON.parse(error)
     // console.log('final :' + errorjson);
    console.log('final :' + errorjson.message);
      var message = ''
      if(errorjson.response != null)
      {
        if(errorjson.response.amount != null)
        {
          message = errorjson.response.amount[0]
        }
        else if(errorjson.response.customerName != null)
        {
          message = errorjson.response.customerName[0]
        }
        else if(errorjson.response.customerEmail != null)
        {
          message = errorjson.response.customerEmail[0]
        }
        else if(errorjson.response.mobileNumber != null)
        {
          message = errorjson.response.mobileNumber[0]
        }
        else if(errorjson.response.orderId != null)
        {
          message = errorjson.response.orderId[0]
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
      //console.log('huhu');
       this.toggleillustratorPress(false)
       this.props.onPreviewOkclick()
      //this.setState({filterType: filterValue});

    }


    shareToWhatsApp = () => {
     let msg = this.state.shareURL;

     var mobno = this.props.Invoice[2].subname1.split(' ')
     var countryCode = mobno[0].split('+')
     //const phoneNumber = parsePhoneNumber("+" + this.state.mobileNumber)
     console.log(mobno[1]);


     var demourl


    //let phoneWithCountryCode = this.state.mobileNumber;
     let phoneWithCountryCode = countryCode[1].replace(')', '') + mobno[1];
     const phoneNumber = parsePhoneNumber("+" + phoneWithCountryCode)
      console.log(phoneNumber);

     let mobile = Platform.OS == 'ios' ? '+' + phoneWithCountryCode : '+' + phoneWithCountryCode;

    if(phoneNumber != null)
    {
     if(phoneNumber.countryCallingCode != null)
     {
      demourl = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
     }
     else {
        demourl = 'whatsapp://send?text=' + msg;
     }
     }
     else {
         demourl = 'whatsapp://send?text=' + msg;
     }



     if (mobile) {
       if (msg) {
         let url = demourl
         Linking.openURL(url).then((data) => {
           console.log('WhatsApp Opened');
         }).catch(() => {
           alert(Localized.t('TextValidationPage.WhatsAppnotinstalledonyourdevice'));
         });
       } else {
         alert('Please insert message to send');
       }
     } else {
       alert(Localized.t('TextValidationPage.Entervalidmobilenumber'));
     }
   }



   sharetoEmail = (toMailId, subject, body) => {

   Linking.openURL(`mailto:${toMailId}?subject=${subject}&body=${body}`).then((data) => {
     console.log('WhatsApp Opened');
   }).catch(() => {
     alert(Localized.t('TextValidationPage.mailisnotconfigureonyourdevice'));
   });
  };


  shareApp = () =>{

      let  text = 'Invoice details \n\n'
      if(Platform.OS === 'android')
          text = text.concat(this.state.shareURL)
      else
          text = text.concat(this.state.shareURL)

      Share.share({
          subject: 'Share Invoice',
          title: 'Share Invoice',
          message: text,
        //  url:'app://',
          //  url: `data:image/png;base64,${this.state.base64}`,

      }, {
          // Android only:
          dialogTitle: 'Hesabe Merchant App',
          // iOS only:
          excludedActivityTypes: []
      })
  }

    onPressButton = () => {

      this.setState({showAlert: false}, () => {

      });

      };



  render(){
      const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;

   console.log("heelo" + this.props.Invoice);
   console.log("heelo" + this.props.Attachment.uri);


    return(
 <ScrollView contentContainerStyle={{paddingBottom: 80}} style = {{backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}} onStartShouldSetResponder={() => true}>

          <View  style={{
            flexDirection : 'column',
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,

          }}>


          <View style={{
            marginTop :10,
            marginLeft : 10,
            marginRight : 10,
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
            justifyContent: 'center',
          }} >
           <Image source =  { global.Logo == null ? require('../Assest/previewLogo.png') : { uri: `data:image/gif;base64,${global.Logo}`}} style={{
               width: '80%',
               height: 70,resizeMode: 'contain',}} />
          </View>


          <View
          style={{
            justifyContent: 'space-between',
            flexDirection: "column",
            alignItems : "center",
            backgroundColor : GLOBAL.COLOR.LIGHTPURPLE,
            height : 45,
            marginTop : 20,
            borderTopLeftRadius : 25,
            borderTopRightRadius : 25,
            marginLeft : 10,
            marginRight : 10,
          }}>
          <Text style = {{color : '#867EBD',alignItems : 'center',padding : 10,fontSize : RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoicePreviewPage.QuickInvoice')}</Text>
          </View>
            <View style={{
              marginTop :0,
              marginLeft : 10,
              marginRight : 10,
              shadowColor: GLOBAL.COLOR.LIGHTBLUE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.1,
              shadowRadius: 9.11,
              borderBottomLeftRadius : 15,
              borderBottomRightRadius : 15,
            //  borderRadius : 15,
              elevation: 10,
              borderWidth : isDarkMode ? 1 : 0 ,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
              backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            }} >
              {
                this.props.Invoice.map((item, index) => (
                  <View style={{
                 flexDirection :'column',

                // justifyContent : 'space-between'
                  }} >


                  <View  style={{
                    flexDirection :'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginLeft : 0,
                    padding : 10,
                    height : 60
                    }}>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(15),
                     fontFamily : 'Prompt-Medium'}}>
                       {Localized.t('InvoicePreviewPage.'+ item.name)}
                    </Text>



                    <View style={{
                    flexDirection : 'row',alignItems :'center'
                    }} >


                     <Text style = {{color: index === this.props.Invoice.length-1 ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.LIGHTBLUE ,
                      fontSize :  index === this.props.Invoice.length-1 ? RFValue(20) :RFValue(15),
                      marginLeft : 10,
                      fontFamily : 'Prompt-Medium',
                        }}>
                         {index === this.props.Invoice.length-1 ?  "KWD " + item.subname1 : this.props.AddressArray.length != 0 ? index == 5 ? GLOBAL.CURRENCY + ' ' + currencyFormat(Number(item.subname1)) : item.subname1 : item.subname1}
                      </Text>
                   </View>


                     </View>

                     <View style = {{marginLeft : 10,marginRight : 10,marginTop :20,display : this.props.Invoice.length-2 == index? null :'none'}}>
                     <Image style = {{width : '99%',resizeMode : 'contain'}} source={require('../Assest/lineSeparator.png')} />
                     </View>
                     <View
                     style={{
                       backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                       marginLeft : 10,
                       marginRight : 10,
                       height : 2,
                       display : this.props.Invoice.length-2 == index ? 'none' :  this.props.Invoice.length-1 == index ? 'none' :null
                     }}>
                     </View>
                     </View>
                ))
             }
           </View>


           <View style = {{display : this.props.Description.length != 0 ? null : 'none'}}>
            <View
                     style={{
                       justifyContent: 'space-between',
                       flexDirection: "column",
                       alignItems : "center",
                       backgroundColor : GLOBAL.COLOR.LIGHTPURPLE,
                       height : 45,
                       marginTop : 30,
                       borderTopLeftRadius : 25,
                       borderTopRightRadius : 25,
                       marginLeft : 10,
                       marginRight :10
                     }}>
                     <Text style = {{color : '#867EBD',alignItems : 'center',padding : 10,fontSize : RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoicePreviewPage.Description')}</Text>
              </View>

              <View style={{
                marginTop :0,
                marginLeft : 10,
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
                backgroundColor : GLOBAL.COLOR.WHITE,
              }} >
           <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 20,fontSize : RFValue(13),fontFamily : 'Prompt-Regular',marginTop : 5}}>{this.props.Description}</Text>
           </View>
          </View>

          <View style = {{display : this.props.ProductArray.length != 0 ? null : 'none'}}>
           <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: "column",
                      alignItems : "center",
                      backgroundColor : GLOBAL.COLOR.LIGHTPURPLE,
                      height : 45,
                      marginTop : 30,
                      borderTopLeftRadius : 25,
                      borderTopRightRadius : 25,
                      marginLeft :10,
                      marginRight :10
                    }}>
                    <Text style = {{color : '#867EBD',alignItems : 'center',padding : 10,fontSize : RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoicePreviewPage.Product')}</Text>
             </View>

             <View style={{
               marginTop : 0,
               marginLeft : 10,
               marginRight : 10,
               shadowColor: GLOBAL.COLOR.LIGHTBLUE,
               shadowOffset: {
                 width: 0,
                 height: 7,
               },
               shadowOpacity: 0.1,
               shadowRadius: 9.11,
                elevation: 10,


               backgroundColor : 'transparent',
             }} >
               {
                 this.props.ProductArray.map((item, index) => (
                   <View style={{
                  flexDirection :'column',
                  marginTop : index == 0 ? 0 :10,
                  shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 9.11,
                   elevation: 10,
                   backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                   borderBottomLeftRadius : index == this.props.ProductArray.length - 1 ? 15 : 0,
                   borderBottomRightRadius : index == this.props.ProductArray.length - 1 ? 15 : 0,
                   borderWidth : isDarkMode ? 1 : 0 ,
                   borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
                 // justifyContent : 'space-between'
                   }} >

                   <View style={{
                   flexDirection : 'row',alignItems :'center',marginLeft : 10,marginTop : 10
                   }} >
                   <Image
                   source={require('../Assest/rectangle.png')}
                   style={styles.ImageIconStyle}
                   />
                    <Text style = {styles.ProductTextStyle}>
                       { "  " + item.itemTitle}
                    </Text>
                  </View>


                   <Text style = {{ color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE  ,
                    fontSize :RFValue(15),
                    marginLeft : 30,
                    marginTop : 10,
                    fontFamily : 'Prompt-SemiBold',
                      }}>
                    {'KWD'} {item.rate}{'x'}{item.quantity} {'Units'}
                    </Text>

                    <View
                   style={{
                     backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                     //width : '94%',
                     height : 2,
                     marginLeft : 10,
                     marginRight : 10,
                     marginTop : 10
                   }}>
                   </View>

                   <View  style={{
                     flexDirection :'row',
                     justifyContent : 'space-between',
                     alignItems : 'center',
                     marginLeft : 10,
                     marginRight : 10,
                     padding : 5,
                     height : 50
                     }}>

                     <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                      fontSize : RFValue(15),
                      fontFamily : 'Prompt-Regular'}}>
                       {Localized.t('PGDetailsPage.TotalAmount')}
                     </Text>

                     <Text style = {{ color: GLOBAL.COLOR.ORANGE,
                      fontSize : RFValue(17),
                      fontFamily : 'Prompt-Regular'}}>
                       {item.amount}
                     </Text>

                    </View>

                      </View>
                 ))
               }
               </View>
         </View>

         <View style = {{display : this.props.AddressArray.length != 0 ? null : 'none'}}>
          <View
                   style={{
                     justifyContent: 'space-between',
                     flexDirection: "column",
                     alignItems : "center",
                     backgroundColor : GLOBAL.COLOR.LIGHTPURPLE,
                     height : 45,
                     marginTop : 30,
                     borderTopLeftRadius : 25,
                     borderTopRightRadius : 25,
                     marginLeft :10,
                     marginRight :10
                   }}>
                   <Text style = {{color : '#867EBD',alignItems : 'center',padding : 10,fontSize : RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoicePreviewPage.Address')}</Text>
            </View>

            <View style={{
              marginTop : 0,
              marginLeft : 10,
              marginRight : 10,
              shadowColor: GLOBAL.COLOR.LIGHTBLUE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.1,
              shadowRadius: 9.11,
               elevation: 10,


              backgroundColor : 'transparent',
            }} >
              {
                this.props.AddressArray.map((item, index) => (
                  <View style={{
                 flexDirection :'column',
                 marginTop : index == 0 ? 0 :10,
                 shadowColor: GLOBAL.COLOR.LIGHTBLUE,
                 shadowOffset: {
                   width: 0,
                   height: 7,
                 },
                 shadowOpacity: 0.1,
                 shadowRadius: 9.11,
                  elevation: 10,
                  backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
                  borderBottomLeftRadius : index == this.props.AddressArray.length - 1 ? 15 : 0,
                  borderBottomRightRadius : index == this.props.AddressArray.length - 1 ? 15 : 0,
                  borderWidth : isDarkMode ? 1 : 0 ,
                  borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
                // justifyContent : 'space-between'
                  }} >


                  <View  style={{
                    flexDirection :'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginLeft : 10,
                    marginRight : 10,
                    padding : 5,
                    height : 50
                    }}>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(15),
                     fontFamily : 'Prompt-Regular'}}>
                      {Localized.t('AddressDetailsPage.City')}
                    </Text>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(17),
                     fontFamily : 'Prompt-Regular'}}>
                      {item.cityName}
                    </Text>

                   </View>

                   <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    //width : '94%',
                    height : 2,
                    marginLeft : 10,
                    marginRight : 10,
                    marginTop : 10
                  }}>
                  </View>

                  <View  style={{
                    flexDirection :'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginLeft : 10,
                    marginRight : 10,
                    padding : 5,
                    height : 50
                    }}>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(15),
                     fontFamily : 'Prompt-Regular'}}>
                      {Localized.t('AddressDetailsPage.Block')}
                    </Text>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(17),
                     fontFamily : 'Prompt-Regular'}}>
                      {item.block}
                    </Text>

                   </View>

                   <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    //width : '94%',
                    height : 2,
                    marginLeft : 10,
                    marginRight : 10,
                    marginTop : 10
                  }}>
                  </View>

                  <View  style={{
                    flexDirection :'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginLeft : 10,
                    marginRight : 10,
                    padding : 5,
                    height : 50
                    }}>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(15),
                     fontFamily : 'Prompt-Regular'}}>
                      {Localized.t('AddressDetailsPage.Street')}
                    </Text>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(17),
                     fontFamily : 'Prompt-Regular'}}>
                      {item.street}
                    </Text>

                   </View>

                   <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    //width : '94%',
                    height : 2,
                    marginLeft : 10,
                    marginRight : 10,
                    marginTop : 10
                  }}>
                  </View>

                  <View  style={{
                    flexDirection :'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginLeft : 10,
                    marginRight : 10,
                    padding : 5,
                    height : 50
                    }}>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(15),
                     fontFamily : 'Prompt-Regular'}}>
                      {Localized.t('AddressDetailsPage.Jadda')}
                    </Text>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(17),
                     fontFamily : 'Prompt-Regular'}}>
                      {item.jadda}
                    </Text>

                   </View>

                   <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    //width : '94%',
                    height : 2,
                    marginLeft : 10,
                    marginRight : 10,
                    marginTop : 10
                  }}>
                  </View>

                  <View  style={{
                    flexDirection :'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginLeft : 10,
                    marginRight : 10,
                    padding : 5,
                    height : 50
                    }}>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(15),
                     fontFamily : 'Prompt-Regular'}}>
                      {Localized.t('AddressDetailsPage.HouseNo')}
                    </Text>

                    <Text style = {{ color: GLOBAL.COLOR.DARKGRAY,
                     fontSize : RFValue(17),
                     fontFamily : 'Prompt-Regular'}}>
                      {item.houseno}
                    </Text>

                   </View>

                     </View>
                ))
              }
              </View>
        </View>


           <View style = {{alignItems : 'center',marginTop : 20}}>
            <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY,alignItems : 'center',fontSize : RFValue(15),fontFamily : 'Prompt-Regular'}}>{'Powered By'}</Text>
           </View>
           <View
           style={{
             shadowColor: GLOBAL.COLOR.LIGHTBLUE,
             shadowOffset: {
               width: 0,
               height: 7,
             },
             shadowOpacity: 0.1,
             shadowRadius: 9.11,
             elevation: 10,
             justifyContent: 'center',
             alignItems : "center",
             backgroundColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
             borderWidth : isDarkMode ? 1 : 0 ,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
             marginTop : 20,
             marginLeft : 10,
             marginRight : 10,
             borderRadius : 15
           }}>
            <Image source =  {require('../Assest/logohesabe.png') }    style={{
              //  width: 150,
              //  height: 140,
                //backgroundColor : 'white',
                resizeMode : 'contain'
              }} />
           </View>


           <View style={{
             alignItems : 'center',
             marginTop :20,
             marginLeft : 0,
             flexDirection: "row",
             justifyContent: 'space-between',
             marginRight : 10,
             }}>

           <View style={{
               justifyContent: 'flex-start',
            }}>

           <CustomButton title= {Localized.t('InvoicePreviewPage.SendLater')} onPress={() => {
                 this.setState({
                   sendLaterModalView: true,
                 });
               }}
              style = {{width : 150,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : GLOBAL.COLOR.ORANGE,borderWidth :1.0,fontFamily : 'Prompt-Regular',  display : 'none',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
           />
           </View>

           <View style={{
               justifyContent: 'flex-end',
            }}>


            <CustomButton title= {this.props.AddressArray.length != 0 ? ( this.props.Invoice[3].subname1 === "SMS" || this.props.Invoice[3].subname1 === "Email") ? Localized.t('OpenInvoicePage.Send') : Localized.t('OpenInvoicePage.Share') : Localized.t('OpenInvoicePage.Send')}  onPress={() =>  this.SendInvoiceDetail()} style = {{width : 150,borderWidth: this.state.toolTipSendVisible == true ? 4 : 0,borderColor : GLOBAL.COLOR.WHITE,fontSize : RFValue(20)}}
               source = {(this.props.AddressArray.length != 0 ? (this.props.Invoice[3].subname1 === "SMS" || this.props.Invoice[3].subname1 === "Email") ?  require('../Assest/plane.png') : require('../Assest/upload.png') : require('../Assest/plane.png'))}
               //imagename =  {this.state.tabselectedButton === "SMS"  && this.state.selectedButton === "Quick"?  "md-paper-plane" : "share-outline"}
              // imageColorname = GLOBAL.COLOR.WHITE
              imgStyle = {styles.icon2}
            />

           </View>
           </View>


           </View>

          </View>

        <SendLaterModal.BottomModal
         visible={this.state.sendLaterModalView}
         onTouchOutside={() => this.setState({ sendLaterModalView: false })}
         height={0.7}
         width={1}
         onSwipeOut={() => this.setState({ sendLaterModalView: false })}
         modalTitle={



           <View
           style={{
             justifyContent: 'space-between',
             padding :15,
             marginLeft : 0,
             flexDirection: "row",

             //height : 40,
             alignItems : "center",
             backgroundColor : GLOBAL.COLOR.WHITE
           }} >

           <TouchableOpacity
           onPress={() => {
             this.toggleSendLaterModal(!this.state.sendLaterModalView)}}>
           <Image  source={global.selectValue == 'en' ? require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
           </TouchableOpacity>

           <View
           style={{flexDirection : 'column',justifyContent : 'center',alignItems : 'center',marginLeft :-20}}
           >
           <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize : RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoicePreviewPage.PleaseSelect')}</Text>
           </View>
           <Text></Text>
            </View>

         }
       >
         <ModalContent
           style={{
             flex: 1,
             backgroundColor: 'fff',
           }}
         >
         <View
         style={{
           justifyContent: 'space-between',
           marginTop :10,
           flexDirection: "column",
         }}>

         <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('InvoicePreviewPage.Date')}</Text>
         <View
         style={{
           justifyContent: 'space-between',
           marginTop :10,
           marginLeft : 10,
           flexDirection: "row",
           alignItems : "center",
           height : 50
         }} >
         <Text style =  {{color : GLOBAL.COLOR.DARKGRAY}}>DD/MM</Text>
         <TouchableOpacity
        // onPress={() => this.toggleModal(true)}
         >
         <Image  source={require('../Assest/calendarGray.png')}/>
         </TouchableOpacity>
         </View>

         <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('InvoicePreviewPage.Time')}</Text>
         <View
         style={{
           justifyContent: 'space-between',
           marginTop :10,
           marginLeft : 10,
           flexDirection: "row",
           alignItems : "center",
           height : 50
         }} >
         <Text style =  {{color : GLOBAL.COLOR.DARKGRAY}}>00:00</Text>
         <TouchableOpacity
         //onPress={() => this.toggleModal(true)}
         >
         <Image  source={require('../Assest/clockTimer.png')} />
         </TouchableOpacity>
         </View>


         <View style={{
           alignItems : 'flex-end',
           marginTop : 50,
           padding : 10,
           }}>

         <CustomButton title= {Localized.t('InvoiceDetailsPage.Create')} style = {{fontSize : RFValue(20)}}
         onPress={() => {
               this.setState({
                 sendLaterModalView: false,
               });
             }}
         />
        </View>
         </View>

         </ModalContent>
       </SendLaterModal.BottomModal>

       <CustomAlertComponent
           displayAlert={this.state.showAlert}
           displayAlertIcon={false}
           alertTitleText={Localized.t('TextValidationPage.Message')}
           alertMessageText={this.state.showAlertMessage}
           displayPositiveButton={true}
           positiveButtonText={Localized.t('TextValidationPage.Ok')}
           displayNegativeButton={false}
           onPressPositiveButton={this.onPressButton}
         />

       <IllustratorModals.BottomModal
       overlayBackgroundColor = {GLOBAL.COLOR.LIGHTPURPLE}
        overlayOpacity = {1}
        propagateSwipe={true}
        visible={this.state.illustratorVisible}
        swipeableModal = {false}
        containerStyle = {{zIndex: 10}}
       height={0.75}
       width={1}

     >
       <ModalContent
         style={{
           flex: 1,
           backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
         }}
       >

        <IllustratorScreen example = {{'index' : 1 ,'Name' : this.state.illustratorName,'RefNo' : this.state.illustratorRefNo }} isDarkMode = {isDarkMode} onOKClick={this.illustratorReceiveData}/>
       </ModalContent>
      </IllustratorModals.BottomModal>
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
     fontSize : RFValue(17),
     fontFamily : 'Prompt-SemiBold',
   },
   subTextStyle: {
    color: GLOBAL.COLOR.DARKBLUE,
    fontSize : RFValue(15),
    fontFamily : 'Prompt-Regular',
  },
  subTextValue: {
   color: GLOBAL.COLOR.DARKGRAY,
   fontSize :  RFValue(15),
   fontFamily : 'Prompt-Regular',
   marginTop : 20
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
   marginTop : 10,
   tintColor : GLOBAL.COLOR.DARKGRAY,
},
icon2: {
width: 20,
height: 20,
position: 'absolute',
marginLeft : 15,
left: 2, // Keep some space between your left border and Image
},

ProductTextStyle: {
 color: GLOBAL.COLOR.DARKGRAY,
 fontSize :  RFValue(13),
 fontFamily : 'Prompt-Regular',
},


 });
