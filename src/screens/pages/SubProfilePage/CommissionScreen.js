
import React, {Component} from 'react';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Clipboard} from 'react-native';
//import Panel from '../../components/Panel';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import Localized from '../../../locales'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const GLOBAL = require('../../../utils/Globals');
import {DarkModeContext} from 'react-native-dark-mode';

//import Modal from 'react-native-modal';



export default class CommissionScreen extends Component {
  constructor(props){
    super(props);
    this.state = {

     clipboardContent: null,
     newCommissionArray : this.props.route.params.example.newCommissionArray,
      languageModal: false,
              names: [
                 {
                    id: 0,
                    name: 'Knet',
                    subname1: 'Percentage',
                    subnamevalue1: this.props.route.params.example.CommissionKnetPerc + '%',
                    subname2: 'Value',
                    subnamevalue2:  this.props.route.params.example.CommissionKnetvalue.toFixed(3) ,
                    subname3: '',
                    subnamevalue3: '',
                    Imge : 1
                 },
                 {
                    id: 1,
                    name: 'Mpgs',
                    subname1: 'Percentage',
                    subnamevalue1: this.props.route.params.example.CommissionMpgsPerc + '%',
                    subname2: 'Value',
                    subnamevalue2: this.props.route.params.example.CommissionMpgsvalue.toFixed(3),
                    subname3: '',
                    subnamevalue3: '',
                    Imge : 1
                 },
                 {
                    id: 2,
                    name: 'Charge',
                    subname1: 'Setup',
                    subnamevalue1: this.props.route.params.example.CommissionSetupCharge,
                    subname2: 'MonthlySub',
                    subnamevalue2: this.props.route.params.example.CommissionMonthlyCharge,
                    subname3: '',
                    subnamevalue3: '',
                    Imge : 2
                 },
                /* {
                    id: 3,
                    name: 'Pos',
                    subname1: 'InitialSetupFee',
                    subnamevalue1: '000.000',
                    subname2: 'MonthlySubscription',
                    subnamevalue2: '5%',
                    subname3: '',
                    subnamevalue3: '',
                    Imge : 2
                 },
                 {
                    id: 4,
                    name: 'TransactionFee',
                    subname1: 'Knet',
                    subnamevalue1: '000.000',
                    subname2: 'Mpgs',
                    subnamevalue2: '000.000',
                    subname3: 'Gcc',
                    subnamevalue3: '000.000',
                    Imge : 2
                 },*/

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

    readFromClipboard(item) {
   // console.log(item);
   Clipboard.setString(item.subname)

     }




  render(){
    const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
  // console.log(this.state.newCommissionArray);

    return(
      <View style={{ flex: 1,  backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
      <View
      style={{
        //justifyContent: 'space-between',
        marginTop :30,
        flexDirection: "row",
        height : 50,
        alignItems : "center",
        backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
        marginBottom : 5
      }}>

      <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center',}}>
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

            //justifyContent : 'flex-start',

            //width : 40
          //  marginTop :20

      }}
      onPress={() => {
              this.applyOnPress()
          }}>

      <Image style ={{  borderRadius : 15}} source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
      </TouchableOpacity>
      </View>

      <View
      style={{
        alignItems : 'center',
          width : '60%'
        //marginLeft : -35
      }}>
      <Text style={{fontSize:  RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('CommissionPage.HesabeCommission')}</Text>
      </View>
       <Text style={{fontSize:  RFValue(17), width : '20%'}}></Text>
      </View>
 <ScrollView contentContainerStyle={{paddingBottom: 80}} style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>
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

            {/*<View style={{
              marginTop : 20,
            }} >
              {

                 this.state.names.map((item, index) => (
                   <View style={{
                  flexDirection :'column',
                   }} >


                   <View  style={{
                     flexDirection :'column',
                     justifyContent : 'center',
                    // alignItems : 'center',
                     marginLeft : 0,
                     padding : 10,
                     height : 120
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
                         {"  "+ Localized.t('CommissionPage.'+ item.name)}
                      </Text>
                    </View>


                      <View style={{
                      flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between',marginTop : 10
                      }} >

                      <View style={{
                      flexDirection : 'column',alignItems : 'flex-start',justifyContent : 'space-between'
                      }} >
                      <Text style = {{color: GLOBAL.COLOR.DARKBLUE,
                       fontSize :  RFValue(15),
                       fontFamily : 'Prompt-Regular',
                       display :  item.subname1.length === 0 ? 'none' :null}}>
                         {Localized.t('CommissionPage.'+ item.subname1)}
                      </Text>
                      <Text style = {styles.subTextValue}>
                         {item.subnamevalue1}
                      </Text>
                      </View>


                      <TouchableOpacity
                      style={{display :  item.Imge === 1 ? null : 'none'}}
                      disabled={true}
                      onPress={() => this.readFromClipboard(item)}>
                      <AntDesignIcons name="pluscircleo" color='#707070'  size={25}  />
                      </TouchableOpacity>


                      <View
                      style={{
                        backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                        width : 2,
                        height : '70%',
                        marginLeft : 10,
                        display :  item.Imge === 2 ? null :'none',
                        alignItems : 'center',
                      }}>
                      </View>

                      <View style={{
                      flexDirection : 'column', alignItems : 'flex-start',justifyContent : 'flex-start',
                      }} >
                      <Text style = { {color: GLOBAL.COLOR.DARKBLUE,
                       fontSize :  RFValue(15),
                       fontFamily : 'Prompt-Regular',


                       display :  item.subname2.length === 0 ? 'none' :null}}>
                         {Localized.t('CommissionPage.'+item.subname2)}
                      </Text>
                      <Text style = {styles.subTextValue}>
                         {item.subnamevalue2}
                      </Text>
                      </View>

                      <View
                      style={{
                        backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                        width : 2,
                        height : '70%',
                        display :  item.subname3.length === 0 ? 'none' :null,
                        alignItems : 'center'
                      }}>
                      </View>

                      <View style={{
                      flexDirection : 'column', alignItems : 'flex-start',justifyContent : 'flex-start',display :  item.subname3.length === 0 ? 'none' :null
                      }} >
                      <Text style = { {color: GLOBAL.COLOR.DARKBLUE,
                       fontSize :  RFValue(15),
                       fontFamily : 'Prompt-Regular',
                       }}>
                         {Localized.t('CommissionPage.'+item.subname3)}
                      </Text>
                      <Text style = {styles.subTextValue}>
                         {item.subnamevalue3}
                      </Text>
                      </View>


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
            </View>*/}

            {<View style={{
              marginTop : 10,
            }} >
            {
               this.state.newCommissionArray.map((item, index) => (
                 <View style={{
                flexDirection :'column',
                 }} >


                 <View  style={{
                   flexDirection :'column',
                   justifyContent : 'center',
                  // alignItems : 'center',


                  // height : 120
                   }}>

                   <View style={{
                     width : '100%',
                     height : 50,
                  alignItems : 'center',
                  backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                  marginTop : 10,
                   }} >
                   <Text style = {{fontSize :  RFValue(17),fontFamily :'Prompt-Medium',padding : 10,color : GLOBAL.COLOR.DARKGRAY}}>
                        {
                        //  item.headerName
                           Localized.t('CommanTabPage.' + item.headerName)
                        }
                   </Text>
                   </View>



                    <View style = {{flexDirection : 'column',
                    flex : 1,
                    marginLeft : 10,
                    marginRight : 10,
                    }}>
                    {
                     item.mark.map((items, index) =>{
                      // console.log('AAA :' + item.subname1);
                      return(
                      <View style = {{flexDirection : 'column'}}>
                       <View style={{
                       flexDirection : 'row',alignItems :'center',marginTop : 15
                       }} >
                       <Image
                      source={require('../Assest/rectangle.png')}
                       style={styles.ImageIconStyle}
                       />
                        <Text style = {styles.TextStyle}>
                           { item.id == 99 ? "  " + (Localized.t('CommissionPage.'+ items.subheader1)) : "  " + (Localized.t('CommissionPage.'+ items.subheader1)).toUpperCase()}
                        </Text>
                      </View>


                      <View style={{
                      flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between',marginTop : 10,
                      }} >

                      <View style={{
                      flexDirection : 'column',alignItems : 'flex-start',justifyContent : 'space-between',
                      width : '45%',
                      }} >
                      <Text style = {{color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
                       fontSize :  RFValue(15),
                       fontFamily : 'Prompt-Regular',
                       }}>
                         {Localized.t('CommissionPage.'+ items.subname1)}
                      </Text>
                      <Text style = {styles.subTextValue}>
                         {items.subnamevalue1}
                      </Text>
                      </View>


                      <TouchableOpacity
                      style={{display :  item.Imge === 1 ? null : 'none'}}
                      disabled={true}
                      onPress={() => this.readFromClipboard(item)}
                      >
                      <AntDesignIcons name="pluscircleo" color='#707070'  size={25}  />
                      </TouchableOpacity>


                      <View
                      style={{
                        backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                        width : 2,
                        height : '70%',
                        marginLeft : 10,
                        display :  item.Imge === 2 ? null :'none',
                      }}>
                      </View>

                      <View style={{
                      flexDirection : 'column', alignItems : 'flex-end',justifyContent : 'space-between',
                      width : '45%',
                      }} >
                      <Text style = { {color: isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,
                       fontSize :  RFValue(15),
                       fontFamily : 'Prompt-Regular',
                       //textAlign : 'left'
                      }}>

                         {Localized.t('CommissionPage.'+items.subname2)}
                      </Text>
                      <Text style = {styles.subTextValue}>
                         {items.subnamevalue2}
                      </Text>
                      </View>

                      </View>

                      </View>

                    );
                     })
                    }
                    </View>



                  </View>




                  <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    display : index == this.state.newCommissionArray.length-1 ? null : 'none',
                    width : '100%',
                    height : 2,
                  }}>
                  </View>


                    </View>


               ))
            }
          </View> }

              {/*  New Chnages

                 this.state.newCommissionArray.map((item, index) => (
                   <View style={{
                  flexDirection :'column',
                   }} >


                   <View  style={{
                     flexDirection :'column',
                     justifyContent : 'center',
                    // alignItems : 'center',
                     marginLeft : 0,
                     padding : 10,
                    // height : 120
                     }}>

                     <View style={{
                       width : '100%',
                       height : 50,
                    alignItems : 'center',
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    marginTop : 10,
                     }} >
                     <Text style = {{fontSize :  RFValue(17),fontFamily :'Prompt-Medium',padding : 10,color : GLOBAL.COLOR.DARKGRAY}}>
                          {
                          //  item.headerName
                             Localized.t('CommanTabPage.' + item.headerName)
                          }
                     </Text>
                     </View>

                     <View style={{
                     flexDirection : 'row',alignItems :'center',marginTop : 15
                     }} >
                     <Image
                    source={require('../Assest/rectangle.png')}
                     style={styles.ImageIconStyle}
                     />
                      <Text style = {styles.TextStyle}>
                         {"  "+ Localized.t('CommissionPage.'+ item.subheader1)}
                      </Text>
                    </View>


                      <View style={{
                      flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between',marginTop : 10
                      }} >

                      <View style={{
                      flexDirection : 'column',alignItems : 'flex-start',justifyContent : 'space-between'
                      }} >
                      <Text style = {{color: GLOBAL.COLOR.DARKBLUE,
                       fontSize :  RFValue(15),
                       fontFamily : 'Prompt-Regular',
                       }}>
                         {Localized.t('CommissionPage.'+ item.subname1)}
                      </Text>
                      <Text style = {styles.subTextValue}>
                         {item.subnamevalue1}
                      </Text>
                      </View>


                      <TouchableOpacity
                      style={{display :  item.Imge === 1 ? null : 'none'}}
                      disabled={true}
                      onPress={() => this.readFromClipboard(item)}
                      >
                      <AntDesignIcons name="pluscircleo" color='#707070'  size={25}  />
                      </TouchableOpacity>


                      <View
                      style={{
                        backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                        width : 2,
                        height : '70%',
                        marginLeft : 10,
                        display :  item.Imge === 2 ? null :'none',
                        alignItems : 'center',
                      }}>
                      </View>

                      <View style={{
                      flexDirection : 'column', alignItems : 'flex-start',justifyContent : 'flex-start',
                      }} >
                      <Text style = { {color: GLOBAL.COLOR.DARKBLUE,
                       fontSize :  RFValue(15),
                       fontFamily : 'Prompt-Regular',
                      }}>
                         {Localized.t('CommissionPage.'+item.subname2)}
                      </Text>
                      <Text style = {styles.subTextValue}>
                         {item.subnamevalue2}
                      </Text>
                      </View>






                      </View>




                    </View>

                    <View
                    style={{
                      backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                      width : '100%',
                      height : 2,
                    }}>
                    </View>

                    <View  style={{
                      flexDirection :'column',
                      justifyContent : 'center',
                     // alignItems : 'center',
                      marginLeft : 0,
                      padding : 10,
                    //  height : 120,
                      display :  item.subheader2.length === 0 ? 'none' :null
                      }}>

                      <View style={{
                      flexDirection : 'row',alignItems :'center',
                      }} >
                      <Image
                     source={require('../Assest/rectangle.png')}
                      style={styles.ImageIconStyle}
                      />
                       <Text style = {styles.TextStyle}>
                           {"  "+ Localized.t('CommissionPage.'+ item.subheader2)}
                       </Text>
                     </View>


                       <View style={{
                       flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between',marginTop : 10
                       }} >

                       <View style={{
                       flexDirection : 'column',alignItems : 'flex-start',justifyContent : 'space-between'
                       }} >
                       <Text style = {{color: GLOBAL.COLOR.DARKBLUE,
                        fontSize :  RFValue(15),
                        fontFamily : 'Prompt-Regular',}}
                        >
                          {Localized.t('CommissionPage.'+ item.subname3)}
                       </Text>
                       <Text style = {styles.subTextValue}>
                          {item.subnamevalue3}
                       </Text>
                       </View>


                       <TouchableOpacity
                       style={{display :  item.Imge === 1 ? null : 'none'}}
                       disabled={true}
                       onPress={() => this.readFromClipboard(item)}
                       >
                       <AntDesignIcons name="pluscircleo" color='#707070'  size={25}  />
                       </TouchableOpacity>


                       <View
                       style={{
                         backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                         width : 2,
                         height : '70%',
                         marginLeft : 10,
                         display :  item.Imge === 2 ? null :'none',
                         alignItems : 'center',
                       }}>
                       </View>

                       <View style={{
                       flexDirection : 'column', alignItems : 'flex-start',justifyContent : 'flex-start',
                       }} >
                       <Text style = { {color: GLOBAL.COLOR.DARKBLUE,
                        fontSize :  RFValue(15),
                        fontFamily : 'Prompt-Regular',
                        }}>
                          {Localized.t('CommissionPage.'+item.subname4)}
                       </Text>
                       <Text style = {styles.subTextValue}>
                          {item.subnamevalue4}
                       </Text>
                       </View>






                       </View>




                     </View>



                      </View>
                 ))
              }
            </View> */}


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
    marginTop : 10
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
   marginTop : 0
},

  });
