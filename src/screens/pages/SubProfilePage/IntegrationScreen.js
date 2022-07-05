
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Clipboard,Share,Platform,AppState} from 'react-native';
//import Panel from '../../components/Panel';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { CustomButton } from '../../../components/CustomButton.js';
import Localized from '../../../locales'
const GLOBAL = require('../../../utils/Globals');
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';
//import Modal from 'react-native-modal';



export default class IntegrationScreen extends Component {
  constructor(props){
    super(props);

    //console.log(this.props.route.params.MerchantCode);
    this.state = {

     clipboardContent: null,
      languageModal: false,
              names: [
                 {
                    id: 0,
                    name: 'MerchantCode',
                    subname: GLOBAL.MERCHANT_CODE,
                 },
                 {
                    id: 1,
                    name: 'AccessCode',
                    subname: GLOBAL.ACESS_CODE ,
                 },
                 {
                    id: 2,
                    name: 'SecretKey',
                      subname: GLOBAL.MERCHANT_KEY ,
                 },
                 {
                    id: 3,
                    name: 'IVKey',
                      subname: GLOBAL.MERCHANT_IV,
                 },


              ],






    };


  }


static contextType = DarkModeContext;

  toggleModal(visible) {
    this.setState({ bottomModalAndTitle: visible });

  }


  applyOnPress() {

     //this.props.onProfileReturn('false');
     this.props.navigation.navigate('Profile')
  }

   alertItemName(item) {
  // console.log(item);

    }

    componentDidMount()
    {
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

   }

 }

    readFromClipboard(item) {
   // console.log(item);
   Clipboard.setString(item.subname)

     }

     shareApp()
     {
         let  text = 'Hesabe Merchant Details \n\n'
         + 'Merchant Code : ' + this.props.route.params.example.MerchantCode + "\n"
         + 'Access Code : ' + this.props.route.params.example.AccessCode + "\n"
         + 'Secret Key : ' + this.props.route.params.example.SecretKey + "\n"
         + 'IV Key : ' + this.props.route.params.example.IVkey + "\n"

         Share.share({
             message: text,
             title: 'Hesabe Merchant'
             //  url: `data:image/png;base64,${this.state.base64}`,

         }, {
             // Android only:
             dialogTitle: 'Share TagWag App',
             // iOS only:
             excludedActivityTypes: []
         })
     }




  render(){
    const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
   const screenheight = Dimensions.get("window").height;

    return(
        <View style={{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,height : '100%'}}>
        <View
        style={{
          //justifyContent: 'space-between',
          marginTop :30,
          flexDirection: "row",
          height : 50,
          alignItems : "center",
          marginBottom : 5
        }}>

           <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center'}}>
        <TouchableOpacity
        style={{  shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
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

        <Image style ={{borderRadius : 15}}  source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
        </TouchableOpacity>
        </View>

        <View
        style={{
          alignItems : 'center',
          width : '60%'
          //marginLeft : -30
        }}>
        <Text style={{fontSize:  RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('IntegrationKeyPage.IntegrationKeys')}</Text>
        </View>
         <Text style={{width : '20%'}}></Text>
        </View>
         <ScrollView style={{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          //  marginTop : 100,
          //  height :screenheight,
          //  borderRadius : 12
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
                     //marginLeft : 10,
                     padding : 10,
                    // height : 80
                     }}>

                      <Text style = {[styles.TextStyle,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>
                         {Localized.t('IntegrationKeyPage.'+ item.name)}
                      </Text>


                      <View style={{
                      flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between',width :'100%'
                      }} >
                      <Text style = {{color : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),width : '90%',textAlign : 'left' }}>
                         {item.subname}
                      </Text>

                      <TouchableOpacity
                      style={styles.button4}
                      onPress={() => this.readFromClipboard(item)}>

                      <Image
                     source={require('../Assest/copy.png')}
                      style={styles.ImageIconStyle}
                      />
                      </TouchableOpacity>


                      </View>




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

            <View style={{
                alignItems: 'flex-end',
                // justifyContent: 'flex-end',
                 //height : '50%',
                 marginTop : (screenheight-480)-50,
                 marginRight : 10
              //  backgroundColor : 'black'
             }}>

             <CustomButton title= {Localized.t('IntegrationKeyPage.ShareAll')}  onPress={() => this.shareApp()} style = {{width : 150,fontSize : RFValue(20)}}
                source = {require('../Assest/upload.png')}
                //imagename =  {this.state.tabselectedButton === "SMS"  && this.state.selectedButton === "Quick"?  "md-paper-plane" : "share-outline"}
               // imageColorname = GLOBAL.COLOR.WHITE
               imgStyle = {styles.icon2}
             />
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
  icon2: {
 width: 20,
 height: 20,
 position: 'absolute',
 marginLeft : 5,
 left: 2, // Keep some space between your left border and Image
},


  });
