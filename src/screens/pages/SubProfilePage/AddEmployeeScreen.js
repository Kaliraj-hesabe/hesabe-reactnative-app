
import React, {Component} from 'react';


import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Switch,TextInput,Keyboard} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';


import Localized from '../../../locales'
import { CustomButton } from '../../../components/CustomButton.js';
import DropDownPicker from 'react-native-dropdown-picker';
import API from '../../../utils/API';
const GLOBAL = require('../../../utils/Globals');
import IllustratorScreen  from '../../../components/IllustratorScreen.js';
import IllustratorModals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import {Form,TextValidator}  from '../../../customTextField';
import CustomAlertComponent from '../../../components/CustomAlertComponent';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';




export default class AddEmployeeScreen extends Component {
  constructor(){
    super();
    this.state = {
      UserId : '',
      UserName : '',
      Designation: 'AC',
      EmailAddress : '',
      Password : '',
      designationDropdown: [],
      designation: '',
      designationId: '',
      checkdesgFlag : false,
      showAlert : false,
      showAlertMessage : '',
      topContraint : 0,
    };
      this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
      this.getDesignationDetail();

  }
  static contextType = DarkModeContext;

  handleChange(name) {
    return (text) => {
          this.setState({[name]:text })
      }
 }

 applyOnPress() {

    this.props.onSelectEmployee('false');
 }

 toggleillustratorPress(visible) {
 this.setState({ illustratorVisible: visible });
 }

 illustratorReceiveData(searchValue)
  {
      this.toggleillustratorPress(false)
      this.applyOnPress()
   }


   employeeSubmit = () => {
        this.CreatEmployee()
    }

   employeeFormSubmit = () => {
       this.refs.form.submit();
      //this.setState({ checkdesgFlag: true });
   }

   onPressAlertPositiveButton = () => {

     this.setState({showAlert: false}, () => {

     });
     };

 CreatEmployee() {
     var self = this;

     var a = {  'designationId' : this.state.designationId }

     var parm1 = {

       "merchantCode" : GLOBAL.MERCHANT_CODE,
       "employeeId": this.state.UserId,
       "userName": this.state.UserName,
       "email": this.state.EmailAddress,
       "password": this.state.Password,
       "status":  '1',

     }

      if(this.state.designationId.length != 0)
      {
      parm1 =  Object.assign({},a,parm1)
    }

   API.post(GLOBAL.API_STRING.EMPLOYEES,parm1).then(function (response) {
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
         if(errorjson.response.userName != null)
         {
           message = errorjson.response.userName[0]
         }
         else if(errorjson.response.designationId != null)
         {
           message = errorjson.response.designationId[0]
         }
       }
       else {
         message = errorjson.message
       }
      self.setState({ showAlert: true,showAlertMessage : message});
   });


 }


 getDesignationDetail() {
  console.log( Localized.t('AddEmployeePage.Pleaseclickonbelowtoaddtheemployee'));
  var self = this;
  API.get(GLOBAL.API_STRING.DESIGNATION,{

    params: {
       'merchantCode' : GLOBAL.MERCHANT_CODE,
      }


  }).then(function (response) {

    const json = JSON.parse(response)
    const tempticket = [];

     let newArray = json.response.data
     let desg = ''
     let desgid = ''

    newArray.map((y) => {

     tempticket.push({ label: y.name, value: y.id});

       })

 //  console.log('xxx ' + tempticket);
   self.setState({
  designationDropdown : tempticket,
  designation: desg,
  designationId : desgid
 })


  })
  .catch(function (error) {
    console.log(error);
  });


 }

  render(){
    const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
   const screenheight = Dimensions.get("window").height;
   console.log(screenheight);

    return(
  <ScrollView  nestedScrollEnabled={true} contentContainerStyle={{paddingBottom: 60}}>
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK: GLOBAL.COLOR.WHITE,padding : 10}} onStartShouldSetResponder={() => true}>


        <Form
          ref="form"
          onSubmit={this.employeeSubmit}
         >
          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
          //  backgroundColor : GLOBAL.COLOR.WHITE,
          //  marginTop : 100,
          //  height :'100%',
            //borderRadius : 12

            ...(Platform.OS !== 'android' && {
               zIndex: 99999
           })
          }}>



           <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('AddEmployeePage.UserID')}</Text>
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
             borderRadius : 15,
             elevation: 10,
             borderWidth : isDarkMode ? 1 : 0 ,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.WHITE ,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK: GLOBAL.COLOR.WHITE,
             justifyContent :'center'
           }} >

           <TextValidator
                    style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                    name="userId"
                    label="userId"
                    validators={['required']}
                    errorMessages={[Localized.t('TextValidationPage.UserIdfieldisrequired')]}
                    errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                    placeholder={Localized.t('AddEmployeePage.UserID')}
                    placeholderTextColor  = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY }
                    type="userId"
                    keyboardType="email-address"
                    value={this.state.UserId}
                    onChangeText={this.handleChange('UserId')}
                    onSubmitEditing={() => { this.userNameInput.focus()}}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    maxLength={50}

            />
          </View>



            <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('AddEmployeePage.UserName')}</Text>
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
              borderRadius : 15,
              elevation: 10,
              borderWidth : isDarkMode ? 1 : 0 ,
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
              justifyContent :'center'
            }} >

            <TextValidator
                     style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                     name="userName"
                     label="userName"
                     validators={['required','matchRegexp:^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s ]{0,}$']}
                     errorMessages={[Localized.t('TextValidationPage.Usernamefieldisrequired'), Localized.t('TextValidationPage.Entervalidusername'),'']}
                     errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                     placeholder = {Localized.t('AddEmployeePage.PleaseEnterUserName')}
                     placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                     type="userName"
                     keyboardType="email-address"
                     value={this.state.UserName}
                     onChangeText={this.handleChange('UserName')}
                     onSubmitEditing={() => {this.emailTextInput.focus() }}
                     blurOnSubmit={false}
                     returnKeyType="next"
                     ref={(r) => this.userNameInput = r}
                     //multiline = {true}
                     //numberOfLines={2}
                     maxLength={50}

             />
           </View>


           <View  style={{ flexDirection: "row",alignItems : 'center'}}>
           <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('EditDetailPage.Designation')}</Text>
             <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
           </View>


             <View style={{

               ...Platform.select({
        ios: {
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
          borderRadius : 15,
          elevation: 10,
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE ,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,

          ...(Platform.OS !== 'android' && {
             zIndex: 99999
         })
        },
        android: {
          marginTop :0,
          marginLeft : 10,
          marginRight : 0,
          height : 50,
        /*  shadowColor: GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderRadius : 15,
          elevation: 10,
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE ,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE*/
          //
        },
    }),

             }} >
             <DropDownPicker
             onOpen={() => { Keyboard.dismiss(), this.setState({

              topContraint: Platform.OS === "android" ? 300 :0,
            })   }}

            onClose={() => this.setState({

             topContraint: Platform.OS === "android" ? 0 :0,
           }) }
             items={this.state.designationDropdown}
            defaultValue={this.state.designationId}
           inputContainerStyle={{ borderWidth: 1, borderColor:  GLOBAL.COLOR.WHITE  }}
           underlineColor= 'transparent'
           placeholder = {Localized.t('AddEmployeePage.SelectDesignationofEmployee')}
           containerStyle={{padding : 5,height : '100%'}}
           placeholderStyle = {{marginLeft : -5,fontSize :  RFValue(17),fontFamily : 'Prompt-Regular'}}
           dropDownStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
            arrowColor={ isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
            arrowStyle = {{height : 20,width : 20,alignItems : 'center'}}
            arrowSize = {20}

            style={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,borderColor:"transparent",  borderRadius : 15}}
             itemStyle={{
             justifyContent: 'flex-start',
              }}
          labelStyle={{
           color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : 'Prompt-Regular',textAlign : 'left',
           marginLeft : 5
          }}

          onChangeItem={ item =>
            {
           console.log(item.value)
             this.setState({
           designationId: item.value,
          // checkdesgFlag : false
         })
         }
         }

           />
             <Text style = {{color : GLOBAL.COLOR.RED,alignItems : 'flex-start',marginTop : -5,marginLeft : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular',display : this.state.checkdesgFlag == true ? this.state.designationId.length == 0 ? null : 'none' : 'none'}}>{'Please select designation is required '}</Text>
           </View>


          </View>

          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left',marginTop :this.state.topContraint}}>{Localized.t('AddEmployeePage.EmailAddress')}</Text>
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
            borderRadius : 15,
            elevation: 10,
            borderWidth : isDarkMode ? 1 : 0 ,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE ,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            justifyContent :'center'
          }} >
          <TextValidator
                   style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                   name="EmailAddress"
                   label="EmailAddress"
                   validators={['required','isEmail']}
                   errorMessages={[Localized.t('TextValidationPage.Emailfieldisrequired'), Localized.t('TextValidationPage.Entervalidemail')]}
                   errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                   placeholder={Localized.t('AddEmployeePage.Entervalidemployeeemailaddress')}
                   placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                   type="EmailAddress"
                   keyboardType="email-address"
                   value={this.state.EmailAddress}
                   onChangeText={this.handleChange('EmailAddress')}
                   ref={(input) => { this.emailTextInput = input; }}
                   onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                   returnKeyType="next"
                   maxLength={50}
                   blurOnSubmit={false}
           />
         </View>


           <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('AddEmployeePage.SetPassword')}</Text>
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
             borderRadius : 15,
             elevation: 10,
             borderWidth : isDarkMode ? 1 : 0 ,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             justifyContent :'center'
           }} >

           <TextValidator
                    style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                    name="Password"
                    label="Password"
                    secureTextEntry
                    validators={['required','matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})']}
                    errorMessages={[Localized.t('TextValidationPage.Passwordfieldisrequired'),Localized.t('TextValidationPage.Entervalidpassword')]}
                    errorStyle = {{'container': { top: Platform.OS === "android" ? -10 :5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                    placeholder={Localized.t('AddEmployeePage.Minimum6characters')}
                    placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY}
                    type="Password"
                    keyboardType="email-address"
                    value={this.state.Password}
                    onChangeText={this.handleChange('Password')}
                    ref={(input) => { this.passwordTextInput = input; }}
                  //  onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                    returnKeyType="done"
                    returnKeyLabel='Done'
                   onSubmitEditing={Keyboard.dismiss}
                    maxLength={12}
                    blurOnSubmit={false}
            />
          </View>
          <Text style = {{color : GLOBAL.COLOR.DARKGRAY ,alignItems : 'flex-start',marginLeft : 10,fontSize :  RFValue(12),fontFamily : 'Prompt-Regular',textAlign : 'left'}}>{Localized.t('AddEmployeePage.' + "Mustcontainuppercase,lowercase,numberandspecialcharacter")}</Text>


          <View style={{

               marginTop : (screenheight-600)/2,
               //flex: 1,
              // justifyContent: 'flex-end',
               marginBottom: 36,
              // position: 'absolute',
            //  backgroundColor : 'black'
           }}>
           <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{ Platform.OS === "android" ? ((Localized.t('AddEmployeePage.Pleaseclickonbelowtoaddtheemployee').replace("â", "'")).replace("â", "'").replace("\u0098", "'")).replace("\u0099", "'")  :  (Localized.t('AddEmployeePage.Pleaseclickonbelowtoaddtheemployee').replace("â", "'")).replace("â", "'")}</Text>

          <View style={{
            alignItems : 'center',
            marginTop : 30,
            padding : 0,
            justifyContent:  'space-evenly',
            flexDirection : 'row'
            }}>
          <CustomButton title= {Localized.t('AddEmployeePage.Cancel')}  onPress={() => this.applyOnPress()} style = {{width : 150,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,borderColor : GLOBAL.COLOR.ORANGE,borderWidth :1.0,fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}/>
          <CustomButton title= {Localized.t('AddEmployeePage.Enable')} onPress={() => this.employeeFormSubmit()} style = {{width : 150,fontSize : RFValue(20)}}/>
         </View>
         </View>

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
          <IllustratorScreen example = {{'index' : 5 ,'value' : ''}}  isDarkMode = {isDarkMode} onOKClick={this.illustratorReceiveData}/>
         </ModalContent>
        </IllustratorModals.BottomModal>

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


          </Form>
        </View>
          </ScrollView>
      );
    }
  }


  const styles = StyleSheet.create({


     text: {
        color: '#4f603c'
     },


  });
