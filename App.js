/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ useEffect,Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from 'react-navigation-tabs'
//import LiquidSwipe from "./LiquidSwipe";
import { View, Text, PlatformColor, TouchableHighlight, StyleSheet, TouchableOpacity,I18nManager,Linking,DeviceEventEmitter} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { TabBar } from './src/navigation';
import AsyncStorage  from '@react-native-community/async-storage';

import i18n, { reloadLanguage } from './src/locales/index.js';
import Icon from 'react-native-vector-icons/MaterialIcons'
const Stack = createStackNavigator<>();
import * as Keychain from 'react-native-keychain';
import AppLoader, { loaderRef,showLoader, hideLoader} from './src/utils/AppLoader.js';
import {reloadRef } from './src/utils/AppLoader.js';
import { KeywordsSchema, KEYWORD_SCHEMA } from './src/utils/schema.js';
import axios from 'axios';
const GLOBAL = require('./src/utils/Globals');
import RNRestart from "react-native-restart";
import OneSignal from "react-native-onesignal";
import { format,parseISO } from 'date-fns';
import QuickActions from "react-native-quick-actions";
import { eventEmitter, initialMode,DarkModeProvider } from 'react-native-dark-mode';
	let realm;


/*const App: () => React$Node = () => {
  useEffect( () => {
    readData()


  }, []);*/



  const Realm = require('realm');
  const databaseOptions = {
    path: 'realmT4.realm',
    schema: [KeywordsSchema],
    schemaVersion: 0
  };


  //OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId(GLOBAL.ONESIGNALKEY);


//END OneSignal Init Code


//Prompt for push on iOS

OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log("Prompt response:", response);
});

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);

});

OneSignal.setInAppMessageClickHandler(event => {
           this.OSLog("OneSignal IAM clicked:", event);
       });


//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(openedEvent => {
  console.log("OneSignal: notification opened:", openedEvent);

  const { action, notification } = openedEvent;


  console.log("additiona: ", notification.additionalData.notification_type_id);
  //console.log("additionalDa: ", data.notification_type);
	//	Linking.openURL(data.userInfo.url)
    global.NotificationDeepLinkFlag =  notification.additionalData.notification_sub_type_id == '12' || notification.additionalData.notification_sub_type_id == '16' ? false : true;
    global.DeepLinkFlag = notification.additionalData.notification_sub_type_id == '12' || notification.additionalData.notification_sub_type_id == '16' ? true : false;
    global.DeepLinkURL = notification.additionalData.notification_sub_type_id == '12' || notification.additionalData.notification_sub_type_id == '16' ? "hesabe://home/invoice/cal"  :"hesabe://home/Profile/notification/cal"
    global.NotificationParamter = notification.additionalData.notification_type_id;
    global.NotificationInvoiceParamter = notification.additionalData.notification_sub_type_id;
    if(Platform.OS === 'android')
    {
    setTimeout(() => {


      //notification.additionalData.notification_sub_type_id == '12' || notification.additionalData.notification_sub_type_id == '16'? Linking.openURL("hesabe://home/invoice/cal")  :	Linking.openURL("hesabe://home/Profile/notification/cal")


 }, 500);

 }
 else {
   //notification.additionalData.notification_sub_type_id == '12' || notification.additionalData.notification_sub_type_id == '16'? Linking.openURL("hesabe://home/invoice/cal")  :	Linking.openURL("hesabe://home/Profile/notification/cal")
 }

});



const globalData = async () => {
  const username = 'zuck';
  const password = 'poniesRgr8';
  const Token = this.props.LoginToken;
  const RefreshToken = this.props.LoginRefreshToken;
 const TokenExpires = this.props.LoginTokenExpires;
  const TokenType = this.props.LoginTokenType;

  // Store the credentials
  await Keychain.setGenericPassword(username, password);

  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'hhh' + credentials.username
      );
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
  await Keychain.resetGenericPassword();
};





class App extends Component {

  constructor(props) {
    super(props);
    this.state = { events: null,
       size: 0,
       text: '',
       loadflag:false,
       lastSync : '',
       fileWritten : false,
       oneTimeRestart : '',
       startLanguageCheck : '',
			 systemDarkMode: initialMode,
     };
		 eventEmitter.on('currentModeChanged', newMode =>
		 this.setState({ systemDarkMode: newMode })
		 )
  }


  fetchCountry() {
  var self = this;
  let url =  GLOBAL.BASE_URL +'/countries'
  console.log("NMN"+ url);
  axios.get(url)
   .then(response => {
     //console.log(response.request._response);


      const json = JSON.parse(response.request._response)
      global.FetchCountryList = json.response

      //console.log(json);
        console.log(json.response);
  });


  }


  downloadEvents() {
    var self = this;
  let url = self.state.loadflag == false ? (GLOBAL.BASE_URL +'/locale-labels' + '?lastSyncedAt=' + self.state.lastSync ) : GLOBAL.BASE_URL +'/locale-labels'
  console.log("MNMN"+ url);
  axios.get(url)
   .then(response => {
     console.log(response.request._response);


      const json = JSON.parse(response.request._response)
      //console.log(json);
        console.log(json.response.en);

     Realm.open(databaseOptions).then(realm => {
       realm.write(() => {
         if(json.response.en != null)
         {
         json.response.en.forEach(obj => {

           realm.create(KEYWORD_SCHEMA, obj);

         });
         json.response.ar.forEach(obj => {

           realm.create(KEYWORD_SCHEMA, obj);

         });
       }

       this.fetchEnglishRecord()

          self.setState({ size: realm.objects(KEYWORD_SCHEMA).length });
          var today = new Date()
          var priorDate =new Date(today.setDate(today.getDate()))
          console.log(priorDate);
          priorDate = format(priorDate, 'yyyy-MM-dd hh:mm:ss')
            console.log(priorDate);
         AsyncStorage.setItem('Firsttimeload',priorDate)
       });
     });


});


}


getPermissionAndroid = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    /*  alert(
        'Grant Permission to write',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},

      );*/
      return true;
    } catch (err) {
    /*  alert(
        'Failed to save Image: ' + err.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );*/
      return true;
    }
  };

fetchArabicRecord() {

Realm.open(databaseOptions).then(realm => {
const res = realm.objects(KEYWORD_SCHEMA).filtered(`locale="${'ar'}"`)
//	console.log('txft ' + res);
 console.log('txft ' + res[0].page);

 var RNFS = require('react-native-fs');

var path = RNFS.DocumentDirectoryPath + '/ar.js';
console.log(path);
let page = res[0].page
var result = {};
var dict = {};
  for(i = 0;i<res.length;i++)
  {
    if(page == res[i].page)
    {
      result[res[i].key] = res[i].value;
      if(i == res.length-1)
      {
         var val = false,existValue = {}

           for (const [ key, value ] of Object.entries(dict)) {

             if(key == page)
             {
               val = true
               existValue = value
             }
             // do something with `key` and `value`
         }

          if(val == true)
          {
            val = false
            dict[page] = Object.assign({}, result, existValue);
          }
          else {
            dict[page] = result;
          }

      }
    }
    else {
      var val = false,existValue = {}

        for (const [ key, value ] of Object.entries(dict)) {

          if(key == page)
          {
            val = true
            existValue = value
          }
          // do something with `key` and `value`
      }




       if(val == true)
       {
         val = false
         dict[page] = Object.assign({}, result, existValue);
       }
       else {
         dict[page] = result;
       }


       result = {}
       page =  res[i].page
       result[res[i].key] = res[i].value;

       if(i == (res.length - 1))
       {
         console.log("Lastvalll :" + page);

         var val = false,existValue = {}

           for (const [ key, value ] of Object.entries(dict)) {

             //console.log("LastPageValue :" + value)
             if(key == page)
             {
               val = true
               existValue = value
             }
             // do something with `key` and `value`
         }

          if(val == true)
          {
            val = false
            dict[page] = Object.assign({}, result, existValue);
          }
          else {
            dict[page] = result;
          }


       }


    }
  }


// write the file
//console.log(result);
//console.log(dict);


RNFS.writeFile(path, JSON.stringify(dict), 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');

    reloadLanguage();
  })
  .catch((err) => {
    console.log(err.message);
  });




})
.catch((error) => {
console.log(error);
});

}

fetchEnglishRecord() {

Realm.open(databaseOptions).then(realm => {
const res = realm.objects(KEYWORD_SCHEMA).filtered(`locale="${'en'}"`)
//	console.log('txft ' + res);
/*for(i = 0;i<res1.length;i++)
{

}*/


  if (Platform.OS === 'android') {
    const granted =  this.getPermissionAndroid();
             if (!granted) {
               return;
       }
    }

 var RNFS = require('react-native-fs');

var path = RNFS.DocumentDirectoryPath + '/en.js';
console.log(path);
let page = res[0].page
var result = {};
var dict = {};
//var totallenght =   res.length
//var lastpage  =  res[totallenght].page
    console.log("LastIndex :" + res.length);
    console.log("LastInd :" + (res.length - 1));
for(i = 0; i < res.length; i++)
{

  if(page == res[i].page)
  {
    result[res[i].key] = res[i].value;
    console.log("LastI :" + i);
    console.log("LastPage :" + page)

    if(i == (res.length - 1))
    {

       var val = false,existValue = {}

         for (const [ key, value ] of Object.entries(dict)) {

           //console.log("LastPageValue :" + value)
           if(key == page)
           {
             val = true
             existValue = value
           }
           // do something with `key` and `value`
       }

        if(val == true)
        {
          val = false
          dict[page] = Object.assign({}, result, existValue);
        }
        else {
          dict[page] = result;
        }

    }
  }
  else {
    var val = false,existValue = {}



      for (const [ key, value ] of Object.entries(dict)) {

        if(key == page)
        {
          val = true
          existValue = value
        }
        // do something with `key` and `value`
    }




     if(val == true)
     {
       val = false
       dict[page] = Object.assign({}, result, existValue);
     }
     else {
       dict[page] = result;
     }


     console.log("Lastfg :" + i);
     console.log("Lastvalll :" + page);

     result = {}
     page =  res[i].page
     result[res[i].key] = res[i].value;

     if(i == (res.length - 1))
     {
       console.log("Lastvalll :" + page);

       var val = false,existValue = {}

         for (const [ key, value ] of Object.entries(dict)) {

           //console.log("LastPageValue :" + value)
           if(key == page)
           {
             val = true
             existValue = value
           }
           // do something with `key` and `value`
       }

        if(val == true)
        {
          val = false
          dict[page] = Object.assign({}, result, existValue);
        }
        else {
          dict[page] = result;
        }


     }


  }
}

// write the file
console.log("LKKL "+ result);
console.log(dict);


RNFS.writeFile(path,  JSON.stringify(dict), 'utf8')
 .then((success) => {
   console.log('FILE WRITTEN!');
    this.fetchArabicRecord()
 })
 .catch((err) => {
   console.log(err.message);
 });




})
.catch((error) => {
console.log(error);
});

}





_retrieveData = async () => {
try {
  const value = await AsyncStorage.getItem('Firsttimeload')

  if (value != null) {
    // We have data!!
      this.setState({ loadflag: false });
      this.setState({ lastSync: value });
  //  console.log(JSON.parse(value));
   }
  else {
    this.setState({ loadflag: true });
  }


   this.downloadEvents()
} catch (e) {
    this.setState({ loadflag: false });
  alert('Failed to download event')
}
};


checkLanguage = async (currentLang) => {
try {
    this.setState({ startLanguageCheck: false });
  console.log('LoginLanguage :' +currentLang);
 const lang = await AsyncStorage.getItem('TEMP_LANGUAGE_PICKED')
  console.log('ProfileSetLang  :' +lang);

  if(lang != currentLang)
  {
 if (lang !== null) {

     if(lang == 'NONE')
     {

       try {

        const selectlanguage = await AsyncStorage.getItem('USER_LANGUAGE_PICKED')
      //  console.log("TXTXT: " + selectlanguage);

        if(selectlanguage != lang)
         {
       if (selectlanguage !== null) {

         global.selectValue  = currentLang
       AsyncStorage.setItem('USER_LANGUAGE_PICKED', global.selectValue)
         this.readData(true)
        }
        else {
          global.selectValue  = currentLang
        AsyncStorage.setItem('USER_LANGUAGE_PICKED', global.selectValue)
          this.readData(true)
        }
       }

       }
       catch (e) {
        alert('Failed to fetch the data from storage')
         }


     }
     else {


      AsyncStorage.setItem('TEMP_LANGUAGE_PICKED', 'NONE')
        console.log('LangSelec  :' +lang);
       global.selectValue  = lang
       AsyncStorage.setItem('USER_LANGUAGE_PICKED', global.selectValue)
        this.readData(false)
     }

 }
   else {



       try {

        const selectlanguage = await AsyncStorage.getItem('USER_LANGUAGE_PICKED')
        console.log("TXTXT: " + selectlanguage);

        if(selectlanguage != currentLang)
         {
       if (selectlanguage !== null) {

         global.selectValue  = currentLang
       AsyncStorage.setItem('USER_LANGUAGE_PICKED', global.selectValue)
         this.readData(true)
        }
        else {
          global.selectValue  = currentLang
          console.log("TXTXT3: " + global.selectValue);
        AsyncStorage.setItem('USER_LANGUAGE_PICKED', global.selectValue)
          this.readData(true)
        }
       }
       else {
           console.log("TXTXT1: " + selectlanguage);
         i18n.locale = selectlanguage;
         global.selectValue  = selectlanguage
         console.log("TXTXT2: " + global.selectValue);

       }

       }
       catch (e) {
        alert('Failed to fetch the data from storage')
         }


   }
 }
  else {
    i18n.locale = currentLang;
    global.selectValue  = currentLang
    AsyncStorage.setItem('USER_LANGUAGE_PICKED', global.selectValue)
      this.readData(true)

  }
    this.setState({ startLanguageCheck: true });

} catch (e) {
 alert('Failed to fetch the data from storage')
  }
}


 readData = async (value) => {
try {
   console.log('olllStart');
//const lang =  await AsyncStorage.getItem('USER_LANGUAGE_PICKED').then(item => {return item})
  const lang = await AsyncStorage.getItem('USER_LANGUAGE_PICKED')
   console.log('olll' +lang);
  if (lang !== null) {
    if (lang === "ar") {
      global.selectValue = 'ar'


      //  I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
         console.log("arabicloading");
      if (!I18nManager.isRTL) {
      if(value)
      {
        reloadRef()
      }

      value == true ?   RNRestart.Restart() : null;

      }
    }
    else {
      global.selectValue = 'en'

      //I18nManager.allowRTL(false);
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
       console.log("englishloading");
      if (I18nManager.isRTL) {
          if(value == true)
          {
            //if(this.state.oneTimeRestart == false)
            //{

              reloadRef()

              AsyncStorage.setItem('Reload', "true")
              RNRestart.Restart()
            // }

          }


      }
    }
  i18n.locale = lang;
  console.log("TXTXT4 :" + global.selectValue);
  //  alert(lang)
  }
  else {
    i18n.locale = 'en'
    global.selectValue = 'en'
  }
} catch (e) {
  alert('Failed to fetch the data from storage')
}
}


componentWillUnmount() {

}

handleOpenURL(event) {
console.log("Linking:" +  event);

}


  componentDidMount(){

		// Linking.addEventListener('url', this.handleOpenURL);
     SplashScreen.hide();
    this.setState({ startLanguageCheck: false })
    globalData()
    console.log('nativedata :'+ this.props.LoginToken);
    console.log('native :'+ global.selectValue);
    global.Token = this.props.LoginToken;
    global.TokenType = this.props.LoginTokenType;
    global.TokenExpires = this.props.LoginTokenExpires;

    Realm.open(databaseOptions).then(realm => {
      this.setState({ size: realm.objects(KEYWORD_SCHEMA).length });
    });

  this.checkLanguage(this.props.CurrentLanguage)
   if(global.Token!= null)
   {

     //this._retrieveData()
    this.fetchCountry()
     //this.forceUpdate()
      console.log('loader :'+ loaderRef);
     if(loaderRef != null)
     {
       reloadRef()
      // AsyncStorage.setItem('Ref',JSON.stringify(loaderRef))
     }
     else {
       console.log("calllef red");
    //  this.reloadRef()
    }
   }
   else {
        this._retrieveData()
   }




  }




  render() {
		 const {systemDarkMode} = this.state
		 global.DarkMode = systemDarkMode
		 console.log("DarkMode :" + systemDarkMode);
    return (

         <DarkModeProvider>

         <View style={{ flex: 1 ,backgroundColor : GLOBAL.COLOR.WHITE}}>
            {global.Token != null  ? this.state.startLanguageCheck == true ? <AppLoader ref={loaderRef}/>  : null  : null}
            {global.Token != null  ?  this.state.startLanguageCheck == true ? <TabBar
              barColor = {GLOBAL.COLOR.DARKBLUE}
             />   : null : null }
          </View>

        </DarkModeProvider>

    );
  }
}





var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFCCCC'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    alignSelf: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7
  }
});


export default App;

/*  return (
   /* <NavigationContainer>
   <Stack.Navigator>
        <Stack.Screen name="LiquidSwipe" component={LiquidSwipe} options={{ headerShown:    false }} />

      </Stack.Navigator>
  </NavigationContainer>

   <View style={styles.container}>
       <TouchableHighlight onPress={() => {
      NativeModules.ChangeViewBridge.changeToNativeView();}}>
            <Text color="#336699">
              Press to Change to Native View
            </Text>
          </TouchableHighlight>
      </View> */


/*<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabViewr" component={TabView} />
         </Stack.Navigator>
</NavigationContainer>*/
/*<TabBar
 barColor=GLOBAL.COLOR.DARKBLUE
/>
  );
};*/
//export default createAppContainer(App);
