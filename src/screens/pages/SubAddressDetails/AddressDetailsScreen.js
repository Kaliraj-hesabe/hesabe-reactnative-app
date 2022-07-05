
import React, {Component} from 'react';
import rectImg from '../Assest/rectangle.png';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager,TextInput,Keyboard} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Localized from '../../../locales';
import { CustomButton } from '../../../components/CustomButton.js';
import DropDownPicker from 'react-native-dropdown-picker';
import API from '../../../utils/API';
const GLOBAL = require('../../../utils/Globals');
import {Form,TextValidator}  from '../../../customTextField';
import { decimalthreeDigit} from '../../../utils/GlobalFunction';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




//import Modal from 'react-native-modal';


export default class AddressDetailsScreen extends Component {
  constructor(props){
    super(props);

    this.state = {

     addressData: [],
     addressDropdown: [],
     selectedCity: this.props.AddressPassingData.length != 0 ? this.props.AddressPassingData[0].cityName  : '',
     selectedCityID: this.props.AddressPassingData.length != 0 ? this.props.AddressPassingData[0].cityID  : '' ,
     addUnitCost : '',
     addressBlock : this.props.AddressPassingData.length != 0 ? this.props.AddressPassingData[0].block  : '' ,
     addressStreet : this.props.AddressPassingData.length != 0 ? this.props.AddressPassingData[0].street  : '' ,
     addressJadda: this.props.AddressPassingData.length != 0 ? this.props.AddressPassingData[0].jadda  : '' ,
     addressHouse : this.props.AddressPassingData.length != 0 ? this.props.AddressPassingData[0].houseno  : '' ,
     addressQuantity : '',
     addressTotalCost : '',
     topContraint : 5,
     checkCityFlag : false,
    };

  }

  componentDidMount()
  {
    setTimeout(() => {
     this.getAddressDetail()

    }, 500);
  }


  getAddressDetail() {
     var self = this;
    API.get(GLOBAL.API_STRING.DELICONCITYLIST,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


    }).then(function (response) {

      const json = JSON.parse(response)
      console.log(json.response);
       const tempticket = [];
      json.response.map((y) => {
        tempticket.push({ label:  I18nManager.isRTL == true  ? y.city_name_arabic : y.city_name , value: y.city_id,stateId: y.city_id});

      })

    console.log(tempticket);
   self.setState({
     addressData:  json.response.data,
     addressDropdown : tempticket,
   })
      //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  addressSave = () => {
    if(this.state.selectedCityID.length != 0)
     {
       this.applyOnPress()
     }
   }

  addressFormSubmit = () => {

       this.refs.form.submit();
     this.setState({ checkCityFlag: true });
  }

  applyOnPress() {
    var filterData = {
        "cityID": this.state.selectedCityID,
        "cityName": this.state.selectedCity,
        "block": this.state.addressBlock,
        "street": this.state.addressStreet,
        "jadda": this.state.addressJadda,
        "houseno": this.state.addressHouse,
      };
     this.props.onAddressReturn(filterData);
  }

  handleChange(name) {


    return (text) => {
      var totalCost;

        // this.setState({[name]:text,addressTotalCost : Number(totalCost).toFixed(3)})
         this.setState({[name]:text})



      }
   }
  render()
  {
    const isDarkMode = this.props.darkModeStatus;
    console.log("LK : " + this.state.selectedCityID );
    const screenWidth = Dimensions.get("window").width;
    const screenheight = Dimensions.get("window").height;
    return(
     <ScrollView contentContainerStyle={{paddingBottom: 60}} style = {{marginLeft : -10,marginRight : -10,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
   	<View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
    <Form
      ref="form"
      onSubmit={this.addressSave}
     >
       <View style={{ flexDirection : 'column',marginLeft : 5,marginRight : 5,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}} onStartShouldSetResponder={() => true}>


        <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('AddressDetailsPage.City')}</Text>


        <View style={{


           ...Platform.select({
    ios: {
      marginTop :10,
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
      borderRadius : 15,
      elevation: 10,
      borderWidth : isDarkMode ? 1 : 0 ,
      borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
      backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
       zIndex :99999
    },
    android: {
     marginLeft : 0,
      marginTop :10,
        height : 50,
     //backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
      //
    },
}),

        }} >
      {  <DropDownPicker
        onOpen={() => { Keyboard.dismiss(), this.setState({

         topContraint: Platform.OS === "android" ? 300 :5,
       })   }}

       onClose={() => this.setState({

        topContraint: Platform.OS === "android" ? 5 :5,
      }) }
        items={this.state.addressDropdown}
        defaultValue={this.state.addressDropdown.length != 0 ? this.state.selectedCityID : ''}
        inputContainerStyle={{ borderWidth: 1, borderColor:  GLOBAL.COLOR.WHITE  }}
        underlineColor= 'transparent'
        placeholder = {Localized.t('AddressDetailsPage.PleaseSelectCity')}
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

      onChangeItem={item =>
         this.setState({
         selectedCity: item.label,
         selectedCityID : item.value,
          checkCityFlag : false
       })}

       searchable={true}
       searchablePlaceholder = {Localized.t('AddressDetailsPage.SearchforCity')}
       searchablePlaceholderTextColor="gray"
       seachableStyle={{}}
       searchableError={() => <Text>Not Found</Text>}

      />}
      {/*<TextValidator
               style =  {{color : GLOBAL.COLOR.DARKGRAY,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),marginLeft : 10,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
               name="ProductTitle"
               label="ProductTitle"
               validators={['required']}
               errorMessages={[Localized.t('TextValidationPage.ProductTitlefieldisrequired')]}
               errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
               placeholder={Localized.t('AddressDetailsPage.ProductTitle')}
               placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
               type="text"
               keyboardType="email-address"
               value={this.state.Product}
               onChangeText={this.handleChange('Product')}
               maxLength={50}
               onSubmitEditing={() => { this.descTextInput.focus()}}
               returnKeyType="next"
               blurOnSubmit = {true}
               multiline = {true}
               numberOfLines={4}
               multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY , maxHeight: 80,marginLeft : 10,textAlign: global.selectValue == 'en' ? 'left' : 'right',width : screenWidth*.8}}
              // multiline = {true}

       />*/}
        <Text style = {{color : GLOBAL.COLOR.RED,alignItems : 'flex-start',marginTop : -2,marginLeft : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular',display : this.state.checkCityFlag == true ? this.state.selectedCityID.length == 0 ? null : 'none' : 'none'}}>{Localized.t('AddressDetailsPage.PleaseSelectCity')}</Text>
      </View>



      <View  style={{ flexDirection: "row",alignItems : 'center',marginTop :this.state.topContraint}}>
      <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('AddressDetailsPage.Block')}</Text>
      </View>
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
        borderRadius : 15,
        elevation: 10,
        borderWidth : isDarkMode ? 1 :  0 ,
        borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.WHITE,
        backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
      }} >

       <TextValidator
                style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                name="Block"
                label="Block"
                validators={['required','matchRegexp:^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9\s,-. #@]*$']}
                errorMessages={[ Localized.t('TextValidationPage.Blockfieldisrequired'),Localized.t('TextValidationPage.Entervalidblock'),'']}
                errorStyle = {{'container': { top:Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                placeholder={ Localized.t('AddressDetailsPage.Block')}
                placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                type="Block"
                keyboardType="email-address"
                value={this.state.addressBlock}
                onChangeText={this.handleChange('addressBlock')}
                ref={(input) => { this.descTextInput = input; }}
                 onSubmitEditing={() => { this.streetTextInput.focus()}}
                returnKeyType="next"
               blurOnSubmit={true}
               maxLength={250}
               multiline = {true}
               numberOfLines={1}
               multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
        />
      </View>

      <View  style={{ flexDirection: "row",alignItems : 'center'}}>
      <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 15,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('AddressDetailsPage.Street')}</Text>
      </View>
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
        borderRadius : 15,
        elevation: 10,
        borderWidth : isDarkMode ? 1 :  0 ,
        borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.WHITE,
        backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
      }} >

       <TextValidator
                style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                name="Street"
                label="Street"
                validators={['required',"matchRegexp:^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9\s,-. #@]*$"]}
                errorMessages={[ Localized.t('TextValidationPage.Streetfieldisrequired'),Localized.t('TextValidationPage.Entervalidstreet'),'']}
                errorStyle = {{'container': { top:Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                placeholder={ Localized.t('AddressDetailsPage.Street')}
                placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                type="Street"
                keyboardType="email-address"
                value={this.state.addressStreet}
                onChangeText={this.handleChange('addressStreet')}
                ref={(input) => { this.streetTextInput = input; }}
                 onSubmitEditing={() => { this.jaddaTextInput.focus()}}
                returnKeyType="next"
               blurOnSubmit={true}
               maxLength={250}
               multiline = {true}
               numberOfLines={1}
               multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
        />
      </View>

      <View  style={{ flexDirection: "row",alignItems : 'center'}}>
      <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 15,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('AddressDetailsPage.Jadda')}</Text>
      </View>
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
        borderRadius : 15,
        elevation: 10,
        borderWidth : isDarkMode ? 1 :  0 ,
        borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.WHITE,
        backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
      }} >

       <TextValidator
                style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                name="Jadda"
                label="Jadda"
                validators={[]}
                errorMessages={[]}
                errorStyle = {{'container': { top:Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                placeholder={ Localized.t('AddressDetailsPage.Jadda')}
                placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                type="Jadda"
                keyboardType="email-address"
                value={this.state.addressJadda}
                onChangeText={this.handleChange('addressJadda')}
                ref={(input) => { this.jaddaTextInput = input; }}
                 onSubmitEditing={() => { this.houseTextInput.focus()}}
                returnKeyType="next"
               blurOnSubmit={true}
               maxLength={250}
               multiline = {true}
               numberOfLines={4}
               multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
        />
      </View>

      <View  style={{ flexDirection: "row",alignItems : 'center'}}>
      <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 15,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('AddressDetailsPage.HouseNo')}</Text>
      </View>
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
        borderRadius : 15,
        elevation: 10,
        borderWidth : isDarkMode ? 1 :  0 ,
        borderColor : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.WHITE,
        backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
      }} >

       <TextValidator
                style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                name="House"
                label="House"
                validators={['required','matchRegexp:^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9\s,-. #@]*$']}
                errorMessages={[ Localized.t('TextValidationPage.HouseNofieldisrequired'),Localized.t('TextValidationPage.EntervalidHouseNo'),'']}
                errorStyle = {{'container': { top:Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                placeholder={ Localized.t('AddressDetailsPage.HouseNo')}
                placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                type="House"
                keyboardType="numeric"
                value={this.state.addressHouse}
                onChangeText={this.handleChange('addressHouse')}
                ref={(input) => { this.houseTextInput = input; }}
                 //onSubmitEditing={() => { this.unitCostTextInput.focus()}}
                 returnKeyLabel='Done'
                 returnKeyType='done'
                 onSubmitEditing={Keyboard.dismiss}
               blurOnSubmit={true}
               maxLength={250}
               multiline = {true}
               numberOfLines={1}
               multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
        />
      </View>





         </View>

         <View style={{
             alignItems: 'flex-end',
             marginTop : 30
          }}>

         <CustomButton title= {Localized.t('AddressDetailsPage.Save')}  onPress={() => this.addressFormSubmit()} style = {{fontSize : RFValue(20)}}
         />
         </View>
        </Form>
        </View>
        </ScrollView>
      );
    }
  }


  const styles = StyleSheet.create({

    button4: {
       justifyContent: 'center',
       alignItems : 'center',
       backgroundColor: GLOBAL.COLOR.LIGHTPURPLE,
       padding: 5,
       height: 35,
       borderRadius : 10
       //  marginBottom: 36,
     },
     button5: {
       alignItems: 'flex-start',
       width : 24,
       height : 24
     },
     button3: {
       alignItems: 'center',
       //  padding: 10,
       //  width: 150,
       //  marginBottom: 36,
     },
     icon:{
       width:34,
       height:34,
     },
     icon2: {
    width: 20,
    height: 20,
    position: 'absolute',
    marginLeft : 15,
    left: 2, // Keep some space between your left border and Image
  },

  icon3: {
 width: 20,
 height: 20,
 position: 'absolute',
 marginLeft : 0,
 right: 15, // Keep some space between your left border and Image
},
  btnText: {
     textAlign: 'center',
     fontFamily : 'Prompt-Medium',
     fontSize:  RFValue(15),
     color: '#867EBD',
     marginLeft : 10

   },
   btnText1: {
      textAlign: 'center',
      fontFamily : 'Prompt-Medium',
      fontSize:  RFValue(15),
      color: '#867EBD',
      width :'48%',
      height : 60,
     alignItems : 'flex-start',
     justifyContent : 'center',
     borderRadius : 10
    },
   icon1:{
      width:8,
      height:8,
      alignItems: 'center',
      justifyContent : 'center',
    },


  });
