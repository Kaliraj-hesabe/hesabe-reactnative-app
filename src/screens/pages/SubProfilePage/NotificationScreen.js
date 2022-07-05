
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
import API from '../../../utils/API';
import { CustomButton } from '../../../components/CustomButton.js';
//import Modal from 'react-native-modal';
import { BackHandler } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import rectImg from '../Assest/rectangle.png';
import { isProperDate,upperCaseFirstLetter,lowerCaseAllWordsExceptFirstLetters} from '../../../utils/GlobalFunction';
import moment from 'moment'

import { format,parseISO,formatDuration, intervalToDuration,formatDistance,subDays } from 'date-fns';
import ar from 'date-fns/locale/ar-SA'
import en from 'date-fns/locale/en-US'


export default class NotificationScreen extends Component {
  constructor(props){
    super(props);

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.state = {

       	selectedButton: global.DeepLinkFlag == true ? global.NotificationParamter == '2' ? "TRANSACTION" : "OFFERS" :  "OFFERS",
        selectedLanguage : '',
        notificationArray: [],
        descriptionCarouselItems: [],
        ActiveIndex: global.NotificationParamter != 0  ? global.NotificationParamter != null ? Number(global.NotificationParamter)-1 : 0  : 0,
  /*  {id: 1, HeaderValue: "",SubValue: "Lorem ipsum is a dummy text. Lorem ipsum is a dummy text. Lorem ipsum is a dummy text. Lorem ipsum is a dummy text. Lorem ipsum is a dummy text. ",},
    {id: 2, HeaderValue: "Notification Title",SubValue: "Lorem ipsum is a dummy text. Lorem ipsum is a dummy text. Lorem ipsum is a dummy text. Lorem ipsum is a dummy text. Lorem ipsum is a dummy text. ",},
  //  {id: 2, value: "Filipino", isChecked: false,key:'fil'},
  //  {id: 4, value: "മലയാളം", isChecked: false,key:'ml'}
]*/


    };


  }

  static contextType = DarkModeContext;


  componentDidMount()
  {


     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     if(global.Token != null)
     {
     this.getNotificationTypeList();

     if(global.NotificationParamter != 0)
     {
       console.log("LInkNot :" + global.NotificationParamter);
      console.log("notificationClicked");
       this.slideNext(Number(global.NotificationParamter)-1)
        global.NotificationParamter = 0
     }
     global.NotificationDeepLinkFlag = false
    }


  }

  componentDidUpdate(prevProps){

    if(global.NotificationParamter != 0)
    {
     console.log("notificationClicked");
       this.carousel.snapToItem(Number(global.NotificationParamter)-1)
       global.NotificationParamter = 0

    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

 humanDuration(time)
 {



    const duration = intervalToDuration({start: new Date(), end: time * 1000});
    const duration1 = intervalToDuration({start: new Date(), end: new Date()});
    console.log(time);
    //console.log(duration);
    //console.log(duration1);
    //console.log(formatDistance(new Date(duration1.years,duration1.months,duration1.days,duration1.hours,duration1.minutes,duration1.seconds), new Date(duration.years,duration.months,duration.days,duration.hours,duration.minutes,duration.seconds)));

    const formatted = formatDistance(new Date(duration1.years,duration1.months,duration1.days,duration1.hours,duration1.minutes,duration1.seconds), new Date(duration.years,duration.months,duration.days,duration.hours,duration.minutes,duration.seconds),{ addSuffix: true ,locale: I18nManager.isRTL ? ar :en} );

    return (formatted);

 }

getNotificationDetails() {
 var self = this;
  API.get(GLOBAL.API_STRING.NOTIFICATIONLIST,{

    params: {
       'merchantCode' : GLOBAL.MERCHANT_CODE,
      }


  }).then(function (response) {

    const json = JSON.parse(response)
     console.log(json);
      console.log(json.response.data.contents);

     let markers = [];


  	 for(let i = 0; i < json.response.data.length; i++)
     {
     var timestemp = new Date(json.response.data[i].completed_at);
  	 	console.log("hhh " + json.response.data[i].contents.en)
     //if(self.state.selectedButton == "OFFERS" ? json.response.data[i].data.notification_type_name == 'news' ? true : json.response.data[i].data.notification_type_name == 'Offers & Promotions'  ? true : false  : json.response.data[i].data.notification_type_name == 'Transactions' )
      if(self.state.descriptionCarouselItems[self.state.ActiveIndex].notification_type_id == json.response.data[i].data.notification_type_id )
     {
  	 markers.push({
  	 id: i,
  	 HeaderValue: I18nManager.isRTL? json.response.data[i].headings.ar :  json.response.data[i].headings.en,
  	 SubValue:  I18nManager.isRTL? json.response.data[i].contents.ar :  json.response.data[i].contents.en,
     TimeValue :  self.humanDuration(json.response.data[i].completed_at)
  	 });
    }

  	}
    self.setState({ notificationArray : markers })


     console.log(markers);


  })
  .catch(function (error) {
    console.log(error);
  });


}


getNotificationTypeList() {
 var self = this;
  API.get(GLOBAL.API_STRING.NOTIFICATIONTYPES,{

    params: {
       'merchantCode' : GLOBAL.MERCHANT_CODE,
       "listType":"all",
       "category":"push"
      }


  }).then(function (response) {

    const json = JSON.parse(response)
     console.log(json);
     console.log(json.response.data);


    self.setState({ descriptionCarouselItems : json.response.data })

    self.getNotificationDetails();



  })
  .catch(function (error) {
    console.log(error);
  });


}



_renderItem({item,index}){
//  console.log(item)
   //console.log(upperCaseFirstLetter(item.notification_type_name.toUpperCase()))
    const isDarkMode = this.context === 'dark';
  const { ActiveIndex } = this.state;
  console.log("KKK : " + ActiveIndex);
      return (
          <TouchableOpacity
           style = {{marginRight : 0,height : '100%'}}
          >

          <View
           style={{
         justifyContent: 'space-evenly',
           flexDirection: "row",
           height : '100%',
           alignItems : "center",
         }}>
          <View
           style={{
           justifyContent: 'flex-start',
           flexDirection: "column",
           //height : 40,
          // padding : 10,
           alignItems : "center",
           //width : 10,

         }}>

         <TouchableOpacity
         style={styles.button3}
         onPress={() => this.slideNext(index)}
         >
          <View style = {{ flexDirection: 'row'}}>
         <Text style =  {{color : ActiveIndex === index
         ? GLOBAL.COLOR.ORANGE
         : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',width : '100%',textAlign : 'center'}}>{I18nManager.isRTL ?  item.notification_type_name_ar : lowerCaseAllWordsExceptFirstLetters(item.notification_type_name_en.toUpperCase())}</Text>
         <View
         style={{
           backgroundColor : GLOBAL.COLOR.SHADEGRAY,
           width : '2%',
           height : '100%',
           alignItems: 'center',
           justifyContent: 'center',
           display : index == this.state.descriptionCarouselItems.length-1 ? 'none' : null
         //	marginLeft  : -15

         }}>
         </View>
         </View>
         <Image
         style={styles.icon1}
         source = { ActiveIndex === index ?
         rectImg :
         null} />
         </TouchableOpacity>

         </View>


        </View>
        </TouchableOpacity>
      )
  }

 slideNext = (index) =>
 {
   console.log("OOO :" + index);
  // this.carousel.snapToItem(index)
   Platform.OS === 'android' ? I18nManager.isRTL ?
   this.setState({ ActiveIndex: index,

    }, () => {
      this.carousel.snapToItem(index)
   })  : this.carousel.snapToItem(index) : this.carousel.snapToItem(index)
}


get pagination () {
        const { descriptionCarouselItems, ActiveIndex } = this.state;


        return (
            <Pagination
              dotsLength={descriptionCarouselItems.length}
              activeDotIndex={ActiveIndex}
              //containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 15,
                  height: 10,
                  borderRadius: 3,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 128, 86, 1)',
                  borderColor : 'rgba(255, 128, 86, 1)',
              }}
              inactiveDotStyle={{

                    width: 15,
                    height: 10,
                    borderWidth : 2,
                    borderRadius: 3,
                    marginHorizontal: 8,
                    borderColor : 'rgba(93, 84, 154, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'


                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.92}
              inactiveDotScale={1}
            />
        );
    }




handleBackButtonClick() {
   console.log('backclick');
      this.toggleback(false)

    return true;

}


toggleNavigationManagement(visible) {

  this.props.navigation.navigate('NotificationManagementScreen')

}




  selectionOnPress(userType) {
     //this.setState({ selectedButton: userType });

     this.setState({ selectedButton: userType,
        notificationArray : [],
      }, () => {

       this.getNotificationDetails();
     });


   }

  applyOnPress() {

    // this.props.onProfileReturn('false');
     this.props.navigation.navigate('Profile')

}

  toggleback(visible) {

    //this.props.navigation.navigate('Profile')
    this.props.navigation.reset({
     index: 0,
     routes: [{ name: 'Profile' }]
})


  }



   alertItemName(item) {
  // console.log(item);

    }

  render(){
    const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
   const screenHeight = Dimensions.get("window").height;

    return(
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>


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

          <Image style ={{borderRadius :15}} source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
          </TouchableOpacity>
          </View>

          <View
          style={{
            alignItems : 'center',
            width : '60%'
            //marginLeft : -30
          }}>
          <Text style={{fontSize: RFValue(22),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',  fontFamily : 'Prompt-Medium'}}>{Localized.t('NotificationPage.NotificationList')}</Text>
          </View>


          <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center',}}>
        <TouchableOpacity
        style={{
            }}
        onPress={() => {

              this.toggleNavigationManagement(true)

            }}>

        <Image style ={{borderRadius :15,tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}} source={ require('../Assest/administration.png')} />
        </TouchableOpacity>
        </View>

          </View>


        { /* <View
 					style={{
 						justifyContent: 'space-between',
 						marginTop :10,
 						flexDirection: "row",
 						//height : 40,
 						padding : 10,
 						alignItems : "flex-start",
 					}}>
 					<TouchableOpacity
 					style={{...styles.button3}}
 					onPress={() => this.selectionOnPress("OFFERS")}>
 					<Text style =  {{color : this.state.selectedButton === "OFFERS"
 					? GLOBAL.COLOR.ORANGE
 					: isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : this.state.selectedButton === "OFFERS"? 'Prompt-SemiBold' :'Prompt-Regular'}}>{Localized.t('NotificationPage.Offerspromotions')}</Text>
 					<Image
 					style={styles.icon1}
 					source = { this.state.selectedButton === "OFFERS" ?
 					rectImg :
 					null} />
 					</TouchableOpacity>
 					<TouchableOpacity
 					style={styles.button3}
 					onPress={() => this.selectionOnPress("TRANSACTION")}>
 					<Text style =  {{color : this.state.selectedButton === "TRANSACTION"
 					? GLOBAL.COLOR.ORANGE
 					:isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : this.state.selectedButton === "TRANSACTION" ? 'Prompt-SemiBold' :'Prompt-Regular' }}>{Localized.t('NotificationPage.Transactions')}</Text>
 					<Image
 					style={styles.icon1}
 					source = { this.state.selectedButton === "TRANSACTION" ?
 					rectImg :
 					null} />
 					</TouchableOpacity>

 					</View>*/}

          <View style  =
          {{
            marginTop : 10,
            height: 60,
          //  width: '97%',
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,

            shadowColor: GLOBAL.COLOR.LIGHTPURPLE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: isDarkMode ? 0 : 0.41,
            shadowRadius: 9.11,
            borderRadius : 15,
            elevation: 14}}>
            <Carousel activeSlideAlignment='start'

                  layout={"default"}
                  
                  ref={ref => this.carousel = ref}
                  data={this.state.descriptionCarouselItems}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth/2}
                  renderItem={this._renderItem}
                  scrollEnabled={true}
                  useScrollView={I18nManager.isRTL? true: false}
                  firstItem={ Platform.OS === 'android' ? I18nManager.isRTL? this.state.ActiveIndex  : this.state.ActiveIndex : this.state.ActiveIndex}
                  onSnapToItem = { index =>
                    {

                  console.log(index);
                  this.setState({ ActiveIndex: index
                   }, () => {
                  console.log("LLLL " + this.state.ActiveIndex);
                  this.getNotificationDetails();
                  });




                }}
                     />
            </View>
            <View style={{justifyContent: 'center',	 alignItems : 'center'}}>
             <View style={{height : 30,width : 70,marginTop : -10,marginLeft : 0}}>
            { this.pagination }
            </View>
            </View>

        <ScrollView contentContainerStyle={{paddingBottom: 200}}>
          <View
          style={{
            justifyContent: 'space-between',
            marginTop :10,
            flexDirection: "column",

            //  alignItems : "stretch",
          }}>


          <View style={{
          // height : screenHeight,
          }} >
            {

               this.state.notificationArray.map((item, index) => (
                 <View style={{
                flexDirection :'column',
                 }} >


                 <View  style={{
                   flexDirection :'column',
                   justifyContent : 'space-between',
                   marginLeft : 15,
                   marginRight : 15,
                   marginTop : 10,
                   backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,

                   shadowColor: GLOBAL.COLOR.LIGHTPURPLE,
                   shadowOffset: {
                     width: 0,
                     height: 7,
                   },
                   shadowOpacity: isDarkMode ? 0 : Platform.OS == "android" ? 0.41 : 1,
                   shadowRadius: Platform.OS == "android" ? 9.11 : 10,
                   borderRadius : 15,
                   elevation: 14,
                   padding : 10,
                   borderWidth : isDarkMode ? 1 : 0,
                   borderColor : GLOBAL.COLOR.WHITE
                  // width : '100%',
                   }}>

                   <Text style = {{fontSize : RFValue(17),fontFamily : 'Prompt-Medium',color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft :10,textAlign : 'left',marginRight :10}} >{item.HeaderValue}</Text>

                   <View
                  style={{
                    backgroundColor : GLOBAL.COLOR.SHADEGRAY,
                    width : '94%',
                    height : isDarkMode ? 0 :  2,
                    marginLeft : 10,
                    marginTop : 10
                  }}>
                  </View>

                   <Text style = {{fontSize : RFValue(13),fontFamily : 'Prompt-Regular',color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft :10,textAlign : 'left',marginTop : 5}} >{item.SubValue}</Text>
                   <Text style = {{fontSize : RFValue(10),fontFamily : 'Prompt-Regular',color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft :10,textAlign : 'left',marginTop : 5}} >{item.TimeValue}</Text>

                    </View>
                    </View>
               ))
            }


          </View>


          </View>

            </ScrollView>

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
