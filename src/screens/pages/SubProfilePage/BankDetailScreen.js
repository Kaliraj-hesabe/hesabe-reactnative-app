
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager} from 'react-native';
//import Panel from '../../components/Panel';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import Localized from '../../../locales'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const GLOBAL = require('../../../utils/Globals');
import {DarkModeContext} from 'react-native-dark-mode';
//import Modal from 'react-native-modal';



export default class BankDetailScreen extends Component {
  constructor(props){
    super(props);
    this.state = {


      languageModal: false,
              names: [
                 {
                    id: 0,
                    name: 'BankName',
                    subname: this.props.route.params.example.BankName,
                 },
                 {
                    id: 1,
                    name: 'BeneficiaryName',
                    subname: this.props.route.params.example.BeneficiaryName,
                 },
                 {
                    id: 2,
                    name: 'IBAN',
                      subname: this.props.route.params.example.BankIban,
                 },
                 {
                    id: 3,
                    name: 'AccountNumber',
                      subname: this.props.route.params.example.BankAccountNo,
                 },


              ],






    };


  }

static contextType = DarkModeContext;


  toggleModal(visible) {
    this.setState({ bottomModalAndTitle: visible });

  }

  applyOnPress() {

    // this.props.onProfileReturn('false');
     this.props.navigation.navigate('Profile')
  }



   alertItemName(item) {
  // console.log(item);

    }

  render(){
      const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;

    return(
      <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
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

      <Image style = {{borderRadius : 15}} source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
      </TouchableOpacity>
      </View>

      <View
      style={{
        alignItems : 'center',
        width : '60%'
      //  marginLeft : -30
      }}>
      <Text style={{fontSize:  RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('BankDetailsPage.BankDetails')}</Text>
      </View>
       <Text style={{width : '20%'}}></Text>
      </View>
       <ScrollView contentContainerStyle={{paddingBottom: 60}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
        <View>

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
              marginTop : 20,
            }} >
              {

                 this.state.names.map((item, index) => (
                   <View style={{
                  flexDirection :'column',
                   }} >


                   <View  style={{
                     flexDirection :'column',
                     justifyContent : 'flex-start',
                    // alignItems : 'center',
                     marginLeft : 10,
                     padding : 10,
                     height : 70
                     }}>

                      <Text style = {[styles.TextStyle,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>
                         {Localized.t('BankDetailsPage.'+ item.name)}
                      </Text>


                    <Text style = {{color : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),textAlign : "left"}}>
                       {item.subname}
                    </Text>




                    </View>

                      <View
                      style={{
                        backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                        width : '100%',
                        height : 2,
                      }}>
                      </View>
                      </View>
                 ))
              }
            </View>

            </View>

        </View>
          </ScrollView>
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
