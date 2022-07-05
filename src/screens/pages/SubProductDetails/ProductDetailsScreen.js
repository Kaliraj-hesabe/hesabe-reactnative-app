
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


export default class ProductDetailsScreen extends Component {
  constructor(props){
    super(props);

    this.state = {

     productData: [],
     productDropdown: [],
     Product: '',
     ProdUnitCost : '',
     ProdDescription : '',
     ProdQuantity : '',
     ProdTotalCost : '',
    };
    //this.getProductDetail()
  }


  getProductDetail() {
     var self = this;
    API.get(GLOBAL.API_STRING.PRODUCTS,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


    }).then(function (response) {

      const json = JSON.parse(response)
      console.log(json.response.data);
       const tempticket = [];
      json.response.data.map((y) => {
        tempticket.push({ label: y.name, value: y.id,unitCost: y.sale_cost,description : y.description});

              })

    console.log(tempticket);
   self.setState({
     productData:  json.response.data,
     productDropdown : tempticket,
   })
      //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  productSave = () => {
       this.applyOnPress()
   }

  productFormSubmit = () => {
      this.refs.form.submit();
     //this.setState({ checkdesgFlag: true });
  }

  applyOnPress() {
    var filterData = {
        "itemTitle": this.state.Product,
        "rate": this.state.ProdUnitCost,
        "quantity": this.state.ProdQuantity,
        "amount": this.state.ProdTotalCost,
      };
     this.props.onProductReturn(filterData);
  }

  handleChange(name) {


    return (text) => {
      var totalCost;

      if(name == 'ProdQuantity')
      {
        totalCost = this.state.ProdUnitCost * text

        console.log(this.state.ProdUnitCost);
        console.log(this.state.ProdQuantity);
        console.log(totalCost);
         this.setState({[name]:text,ProdTotalCost : Number(totalCost).toFixed(3)})
      }
      else if(name == 'ProdUnitCost')
      {
          totalCost = this.state.ProdQuantity * text
        this.setState({[name]:decimalthreeDigit(text),ProdTotalCost : Number(totalCost).toFixed(3) })

       }
       else {
        // this.setState({[name]:text,ProdTotalCost : Number(totalCost).toFixed(3)})
         this.setState({[name]:text})
       }


      }
   }
  render()
  {
    const isDarkMode = this.props.darkModeStatus;
  //  console.log("LK : " + );
    const screenWidth = Dimensions.get("window").width;
    const screenheight = Dimensions.get("window").height;
    return(
     <ScrollView contentContainerStyle={{paddingBottom: 60}} style = {{marginLeft : -10,marginRight : -10,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
   	<View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
    <Form
      ref="form"
      onSubmit={this.productSave}
     >
       <View style={{ flexDirection : 'column',marginLeft : 5,marginRight : 5,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}} onStartShouldSetResponder={() => true}>


        <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('ProductDetailsPage.ProductTitle')}</Text>


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
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',

        //  zIndex : 99999
        }} >
      {/*  <DropDownPicker
        items={this.state.productDropdown}

         placeholder = 'Please Select Item'
       underlineColor= 'gray'
       dropDownStyle={{backgroundColor: GLOBAL.COLOR.WHITE}}
       containerStyle={{height: 50,marginTop : 0}}

       style={{backgroundColor: GLOBAL.COLOR.WHITE,borderColor:GLOBAL.COLOR.WHITE}}
        itemStyle={{
        justifyContent: 'center',
      }}

       labelStyle={{
       color : GLOBAL.COLOR.DARKGRAY,fontSize : 15,fontFamily : 'Prompt-Regular'
      }}

      onChangeItem={item =>
         this.setState({
         Product: item.label,
         ProdUnitCost : item.unitCost,
         ProdDescription : item.description,
       })}

       searchable={true}
       searchablePlaceholderTextColor="gray"
       seachableStyle={{}}
       searchableError={() => <Text>Not Found</Text>}

      />*/}
      <TextValidator
               style =  {{color : GLOBAL.COLOR.DARKGRAY,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),marginLeft : 10,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
               name="ProductTitle"
               label="ProductTitle"
               validators={['required']}
               errorMessages={[Localized.t('TextValidationPage.ProductTitlefieldisrequired')]}
               errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
               placeholder={Localized.t('ProductDetailsPage.ProductTitle')}
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

       />
      </View>



      <View  style={{ flexDirection: "row",alignItems : 'center'}}>
      <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('ProductDetailsPage.ProductDescription')}</Text>
        <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('ProductDetailsPage.Optional') + ")"}</Text>
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
                name="Description"
                label="Description"
                validators={[]}
                errorMessages={[]}
                errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                placeholder={ Localized.t('ProductDetailsPage.AddProductDescription')}
                placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                type="Description"
                keyboardType="email-address"
                value={this.state.ProdDescription}
                onChangeText={this.handleChange('ProdDescription')}
                ref={(input) => { this.descTextInput = input; }}
                 onSubmitEditing={() => { this.unitCostTextInput.focus()}}
                returnKeyType="next"
               blurOnSubmit={true}
               maxLength={250}
               multiline = {true}
               numberOfLines={4}
               multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
        />
      </View>



        <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left'}}>{Localized.t('ProductDetailsPage.UnitCost')}</Text>
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
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE ,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',
        }} >
        {/*<Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize : 20,marginLeft :10}}>{this.state.ProdUnitCost}</Text>*/}

        <TextValidator
                 style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:10,width :screenWidth*.7, textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                 name="Amount"
                 label="Amount"
                 validators={['required','matchRegexp:^[0-9]+(\.[0-9]{1,3})?$']}
                 errorMessages={[Localized.t('TextValidationPage.Unitcostfieldisrequired'), Localized.t('TextValidationPage.Entervalidunitcost')]}
                 errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                 placeholder="0.000"
                 placeholderTextColor  = {GLOBAL.COLOR.ORANGE}
                 type="Amount"
                 keyboardType="numeric"
                 value={this.state.ProdUnitCost}
                 onChangeText={this.handleChange('ProdUnitCost')}
                 ref={(input) => { this.unitCostTextInput = input; }}
                 onSubmitEditing={() => { this.quanitityTextInput.focus(); }}
                 returnKeyType="next"
                  maxLength={50}
                blurOnSubmit={false}
         />

        <View style={{flexDirection: "row",justifyContent: 'space-between'}}>
        <View
        style={{
          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
          width : 2,
          //height : '100%',
        }}>
        </View>

          <Text style =  {{color : GLOBAL.COLOR.ORANGE,marginLeft : 20,fontFamily : 'Prompt-SemiBold',fontSize :  RFValue(17),marginRight : 5}}>KWD</Text>
        </View>
       </View>



       <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left'}}>{Localized.t('ProductDetailsPage.Quantitiy')}</Text>
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
         borderWidth : isDarkMode ? 1 : 0 ,
         borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
         backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
         alignItems: 'center',
         flexDirection: "row",
         justifyContent: 'space-between',
       }} >

        <TextValidator
                 style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:10,width :screenWidth*.7, textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                 name="Quantity"
                 label="Quantity"
                 validators={['required','matchRegexp:^[0-9]*$']}
                 errorMessages={[Localized.t('TextValidationPage.Quantityfieldisrequired'), Localized.t('TextValidationPage.Entervalidquantity')]}
                 errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                 placeholder="0"
                 placeholderTextColor = {GLOBAL.COLOR.DARKGRAY}
                 type="Quantity"
                 keyboardType="numeric"
                 value={this.state.ProdQuantity}
                 onChangeText={this.handleChange('ProdQuantity')}
                 ref={(input) => { this.quanitityTextInput = input; }}
                 onSubmitEditing={() => { Keyboard.dismiss }}
                  maxLength={50}
                blurOnSubmit={false}
         />

       <View style={{flexDirection: "row",justifyContent: 'space-between'}}>
       <View
       style={{
         backgroundColor : GLOBAL.COLOR.SHADEGRAY,
         width : 2,
         //height : '100%',
       }}>
       </View>

         <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 20,fontFamily : 'Prompt-Medium',fontSize :  RFValue(15),marginRight :5}}>Units</Text>
       </View>
      </View>

      <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left'}}>{Localized.t('ProductDetailsPage.TotalCost')}</Text>
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
        borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
        backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
      }} >
      <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft :10}}>{this.state.ProdTotalCost}</Text>

      <View style={{flexDirection: "row",justifyContent: 'space-between'}}>
      <View
      style={{
        backgroundColor : GLOBAL.COLOR.SHADEGRAY,
        width : 2,
        //height : '100%',
      }}>
      </View>

        <Text style =  {{color : GLOBAL.COLOR.ORANGE,marginLeft : 20,fontFamily : 'Prompt-SemiBold',fontSize :  RFValue(17),marginRight :5}}>KWD</Text>
      </View>
     </View>


     <View style={{
       marginTop :10,
       marginLeft : 0,
       marginRight : 0,
       height : 50,
       padding : 10,
       shadowColor: GLOBAL.COLOR.LIGHTBLUE,
       shadowOffset: {
         width: 0,
         height: 7,
       },
       shadowOpacity: 0.1,
       shadowRadius: 9.11,
       borderRadius : 15,
       elevation: 10,
       borderWidth : isDarkMode ? 1 : 0,
       borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE ,
       backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
       alignItems: 'center',
       justifyContent: 'space-between',
     }} >
       <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-SemiBold',fontSize :  RFValue(17)}}> {this.state.ProdUnitCost} {'KWD'} {'x'} {this.state.ProdQuantity} {'Units'}</Text>
       </View>


         </View>

         <View style={{
             alignItems: 'flex-end',
             marginTop : 30
          }}>

         <CustomButton title= {Localized.t('ProductDetailsPage.Save')}  onPress={() => this.productFormSubmit()} style = {{fontSize : RFValue(20)}}
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
