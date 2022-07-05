import React,{ useEffect,useState,useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View ,Image,TouchableOpacity, Text,Dimensions,I18nManager} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { TabBarAdvancedButton } from '../components';
import { IS_IPHONE_X } from '../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FondIcons from 'react-native-vector-icons/Foundation';
import FeatherIcons from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/pages/HomeScreen';
import DetailsScreen from '../screens/pages/DetailsScreen';
import ProfileScreen from '../screens/pages/ProfileScreen';
import ReportScreen from '../screens/pages/ReportScreen';
import InvoicScreen from '../screens/pages/InvoiceScreen';
import CreateInvoiceScreen from '../screens/pages/CreateInvoiceScreen';
import BankDetailScreen from '../screens/pages/SubProfilePage/BankDetailScreen';
import IntegrationKeyScreen from '../screens/pages/SubProfilePage/IntegrationScreen';
import CommissionScreen from '../screens/pages/SubProfilePage/CommissionScreen';
import AdminChargesScreen from '../screens/pages/SubProfilePage/AdminChargesScreen';
import ManagePermissionScreen from '../screens/pages/SubProfilePage/ManagePermissionScreen';
import LanguageScreen from '../screens/pages/SubProfilePage/LanguageScreen';
import NotificationScreen from '../screens/pages/SubProfilePage/NotificationScreen';
import FaceSettingScreen from '../screens/pages/SubProfilePage/FaceSettingScreen';
import NotificationManagementScreen from '../screens/pages/SubProfilePage/NotificationManagementScreen';
import SettingScreen from '../screens/pages/SubProfilePage/SettingScreen';
import PGDetailsScreen from '../screens/pages/SubPGDetails/PGDetailsScreen';
import InvoiceQuickDetailsScreen from '../screens/pages/SubInvoiceDetails/InvoiceQuickDetailsScreen';
import InvoiceOpenDetailsScreen from '../screens/pages/SubInvoiceDetails/InvoiceOpenDetailsScreen';
import ReportDetailsScreen from '../screens/pages/SubReportDetails/ReportDetailsScreen';
import CalendarScreen from '../components/CalenderScreen1';
import FilterScreen from '../components/FilterScreen1';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage  from '@react-native-community/async-storage';
const GLOBAL = require('../utils/Globals');
import {useDarkMode} from 'react-native-dark-mode';
import { NavigationActions, StackActions } from 'react-navigation';




import Localized from '../locales'
import  OpenScreen  from '../screens/pages/OpenInvoiceScreen';
import Modals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import { Modalize } from 'react-native-modalize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const Stack = createStackNavigator();
const ProfileName  = "الملف الشخصي";


const modalOptions = {
headerShown: false,
cardStyle: { backgroundColor: GLOBAL.COLOR.LIGHTPURPLE },
cardOverlayEnabled: true,
cardStyleInterpolator: ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0,1],
      outputRange: [0,1]
    })
  },
  overlayStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.7],
      extrapolate: "extend"
    })
  }

})
};

const modalOptions1 = {
headerShown: false,
cardStyle: { backgroundColor: GLOBAL.COLOR.LIGHTPURPLE },
cardOverlayEnabled: true,
cardStyleInterpolator: ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0,1],
      outputRange: [0,1]
    })
  },
  overlayStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.7],
      extrapolate: "extend"
    })
  }
})
};

const modalOptions2 = {
headerShown: false,
cardStyle: { backgroundColor: 'transparent' },
cardOverlayEnabled: true,
cardStyleInterpolator: ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0,1],
      outputRange: [0,1]
    })
  },
  overlayStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: "extend"
    })
  }

})
};



function DashboardStack({ navigation, route }) {

  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });
  global.fglag = route.state ? route.state.index > 0 ? "false" : "true" : "true"
  console.log("yuyuy :" +   global.fglag)



  return (
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PGDetailsScreen" component={PGDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="InvoiceQuickDetailsScreen" component={InvoiceQuickDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="InvoiceOpenDetailsScreen" component={InvoiceOpenDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={modalOptions}/>
        <Stack.Screen name="FilterScreen" component={FilterScreen} options={modalOptions}/>
      </Stack.Navigator>
  );
}


function InvoiceStack({ navigation, route }) {

  console.log("InvoicePressed");
    console.log(global.DeepLinkFlag);
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false :   true : null });
  global.fglag = route.state ? route.state.index > 0 ? "false" : "true" : "true"
  var selectedButton = "QUICK"
  global.currentSelectonButton = selectedButton
  if(global.DeepLinkFlag == true)
  {
     global.DeepLinkFlag = false
     console.log(route.params.id);
    // global.currentSelectonButton =  route.params.id
        selectedButton = route.params.id
    // const currentRoute = state.routes.find(route => route.name === state.routeNames[index]);
  if (route?.state)
    if (route.state.index !== 0)
    {
       navigation.popToTop();
    }
  }


  return (
      <Stack.Navigator>
        <Stack.Screen name="Invoice" component={InvoicScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="InvoiceQuickDetailsScreen" component={InvoiceQuickDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="InvoiceOpenDetailsScreen" component={InvoiceOpenDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={modalOptions}/>
        <Stack.Screen name="FilterScreen" component={FilterScreen} options={modalOptions}/>
      </Stack.Navigator>
  );
}




function ReportStack({ navigation, route }) {
    navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });
    global.fglag = route.state ? route.state.index > 0 ? "false" : "true" : "true"
  return (
    <Stack.Navigator>
      <Stack.Screen name="Report" component={ReportScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReportDetailsScreen" component={ReportDetailsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="FilterScreen" component={FilterScreen} options={modalOptions}/>
    </Stack.Navigator>
  );
}

function ProfileStack({ navigation, route }) {
  console.log(route.state);
  console.log("ProfilePressed");
    console.log(global.DeepLinkFlag);

  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : global.NotificationDeepLinkFlag == true ? false : true : global.NotificationDeepLinkFlag == true ? false :  null });
  global.fglag = route.state ? route.state.index > 0 ? "false" :  global.NotificationDeepLinkFlag == true ? "false" : "true" :  global.NotificationDeepLinkFlag == true ? "false" : "true"

  if(global.NotificationDeepLinkFlag == true)
  {
     global.NotificationDeepLinkFlag = false
    // const currentRoute = state.routes.find(route => route.name === state.routeNames[index]);
  if (route?.state)
    if (route.state.index !== 0)
    {
       navigation.popToTop();
    }
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="BankDetails" component={BankDetailScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="IntegrationKeyScreen" component={IntegrationKeyScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="CommissionScreen" component={CommissionScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AdminChargesScreen" component={AdminChargesScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ManagePermissionScreen" component={ManagePermissionScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={modalOptions1}/>
      <Stack.Screen name="NotificationManagementScreen" component={NotificationManagementScreen} options={modalOptions}/>
      <Stack.Screen name="FaceSettingScreen" component={FaceSettingScreen} options={modalOptions2}/>

    </Stack.Navigator>
  );
}



const BottomBar = createBottomTabNavigator();




type Props = {
  barColor: string;
};







const CreateNew = ({ navigation }) =>
{

  const isDarkMode = useDarkMode()
  const contentRef = useRef(null);

  const renderHeader = () => (
    <View
    style={{
      justifyContent: 'space-between',
      marginTop :0,
      // padding : 10,
      flexDirection: "row",
     // width : '100%',
      //height : 40,
      alignItems : "center",
      backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
    }} >

    <TouchableOpacity
    style={{marginTop : 20,marginBottom : 10,width : '20%',marginLeft : 10}}
    onPress={() => {handleClose,navigation.pop()}}>
    <Image style={styles.icon4} source={require('../screens/pages/Assest/close.png')} />
    </TouchableOpacity>
    <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,textAlign : 'center',fontSize : RFValue(22),fontFamily : 'Prompt-Medium',width : '60%'}}>{Localized.t('OpenInvoicePage.CreateInvoice')}</Text>
    <Text style = {{width : '20%'}}> </Text>
    </View>
  );

  const performSearch = () => {
      contentRef.current.getNode().scrollToEnd({animated: true, index: 0});
  }

 const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

   const invoiceReceiveData = () => {
   handleClose,navigation.pop()
  };

  const scrollingView = () => {
   performSearch()
 };


   useEffect(() => {
    onOpen();
  }, []);

  return(
<Modalize
    ref={modalizeRef}

    scrollViewProps={{ showsVerticalScrollIndicator: false ,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
    onClosed={handleClose}
    panGestureEnabled={false}
    contentRef={contentRef}
    withHandle={false}
    closeOnOverlayTap = {false}
  //  HeaderComponent={renderHeader}
    //withReactModal = {true}

    overlayStyle={{backgroundColor: GLOBAL.COLOR.LIGHTPURPLE}}
  //  onLayout={handleLayout}
  >
  <View
  style={{
    justifyContent: 'space-between',
    marginTop :0,
    // padding : 10,
    flexDirection: "row",
   // width : '100%',
    //height : 40,
    alignItems : "center",
    backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
  }} >

  <TouchableOpacity
  style={{marginTop : 20,marginBottom : 10,width : '20%',marginLeft : 10}}
  onPress={() => {handleClose,navigation.pop()}}>
  <Image style={styles.icon4} source={require('../screens/pages/Assest/close.png')} />
  </TouchableOpacity>
  <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,textAlign : 'center',fontSize : RFValue(22),fontFamily : 'Prompt-Medium',width : '60%'}}>{Localized.t('OpenInvoicePage.CreateInvoice')}</Text>
  <Text style = {{width : '20%'}}> </Text>
  </View>
  <OpenScreen  onSelectInvoice={invoiceReceiveData} onScroll={scrollingView}/>
  </Modalize>

);
}

const CreatePlaceholder = () => (
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
);




 const TabBar1: React.FC<Props> = ({ barColor,props,navigation,jumpToIndex,route}) => {

  const [value, setValue] = useState("true");
  console.log(route.state);

  var lang = false

  const readData = async () => {
  try {
    let langed = await AsyncStorage.getItem('SUBTAB')
    console.log("ooo "+langed);
     if(langed == 'false')
     {
       lang = false
     }
     else
     {
       lang = true
     }

  }catch
  {

  }
}


  return  <BottomBar.Navigator
      tabBar={(props) => {
        return <View style={styles.navigatorContainer}>
        <View style={{backgroundColor:"transparent",marginTop : 20, height: 10} }>


         {/*console.log("XXX " + global.fglag)*/}

        <Image
            style={{ width:'100%',marginTop : 0 , height : 100 ,display :  global.fglag == "true"  ? null : 'none'}}
            source={ require('../screens/pages/Assest/tabbackground.png')} />
        </View>


        {   global.fglag == "true"  ?  <BottomTabBar
            {...props}

          /> : null}
          {IS_IPHONE_X && (
            <View style={[styles.xFillLine, {
              backgroundColor: barColor
            }]}/>
          )}

        </View>
      }}

      lazy =  {true}
      tabBarOptions={{
        showIcon: true,
        style: {...styles.navigator,...{}},//{height:    global.fglag == "true"  ? null : '0%' }},  //commented for tab not working in android
        keyboardHidesTabBar: true,
        activeTintColor: GLOBAL.COLOR.WHITE,
        inactiveTintColor:GLOBAL.COLOR.LIGHTBLUE,
        labelStyle:{fontSize: RFValue(12),width :250 },
        tabStyle: {


        //  backgroundColor: barColor
      },

      }}

    >
      <BottomBar.Screen
        name = {I18nManager.isRTL ? "لوحة القيادة" : "Dashboard"}
        component={DashboardStack}
        listeners={({ navigation,route }) => ({
          tabPress: e => {
            console.log('DASHBOARDPressed');
            global.fglag = route.state ? route.state.index > 0 ? "false" : "true" : "true"

          },
        })}
        options={{
          tabBarIcon: ({ color, size  }) => (
          <FeatherIcons name="bar-chart-2" color={color}  size={size} />
        ),
          tabBarVisible: true,
        }}
      />
      <BottomBar.Screen
        name={I18nManager.isRTL ? "فاتورة" : "Invoice"}
        component={InvoiceStack}

        options={{
          tabBarIcon: ({ color, size  }) => (
          <MaterialCommunityIcons name="file-document-outline" color={color}  size={size} />
        ),
          tabBarVisible: true,

        }}


      />



      <BottomBar.Screen
        name="Add"
        component={CreatePlaceholder}

     listeners={({ navigation }) => ({
       tabPress: e => {
         e.preventDefault();
         navigation.navigate('CreateNew');
         console.log('Pressed');

       },
     })}
        options={{
          tabBarButton: (props) => (
            <TabBarAdvancedButton
              bgColor={barColor}
              {...props}
            />

          ),
        }}

      />

      <BottomBar.Screen
        name= {I18nManager.isRTL ? "تقرير " : "Reports"}
        component={ReportStack}
        listeners={({ navigation,route }) => ({
          tabPress: e => {
            console.log('ReportPressed');
            global.fglag = route.state ? route.state.index > 0 ? "false" : "true" : "true"

          },
        })}
        options={{
          tabBarIcon: ({color, size  }) => (
          <FondIcons name="graph-pie" color={color}  size={size} />
        ),
        tabPress: ({navigation,route}) => {
              console.log('tab press triggered')
          },
          tabBarVisible: true

        }}
      />
      <BottomBar.Screen
        name={I18nManager.isRTL ? ProfileName : "Profile"}
        component={ProfileStack}
        listeners={({ navigation,route }) => ({
          tabPress: e => {
            console.log('ProfilePressed12');
            global.fglag = route.state ? route.state.index > 0 ? "false" : "true" : "true"

          },
        })}
        options={{
          tabBarIcon: ({ color,size  }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
          tabBarVisible: true
        }}
      />
    </BottomBar.Navigator>
};



 const RootStack = createStackNavigator();
 export const TabBar = () => {
  const [user, setUser] = React.useState(null);
  const [showModal, setShowModal] = useState(false);

  const [value, setValue] = useState("true");


/*  const config = {
  screens: {
    Home: {
      path: 'home',
      screens: {
         Invoice : {
          path: 'invoice/:id',
        },
        Profile: {
          path: 'Profile',
          screens: {
            NotificationScreen: {
              path: 'notification/:id',
            },
          }

        },
      },
    },
    CreateNew: {
      path: 'openInvoice/:id',
    },

  },

};*/

const config = I18nManager.isRTL ? {
screens: {
  Home: {
    path: 'home',
    screens: {
      فاتورة: {
        path: 'invoice/:id',
        screens: {
          InvoiceQuickDetailsScreen: {
            path: 'InvoiceQuickDetailsScreen/:id',
          },
          InvoiceOpenDetailsScreen: {
            path: 'InvoiceOpenDetailsScreen/:id',
          },
        }
      },
    "الملف الشخصي" : {
        path: 'Profile',
        screens: {
          NotificationScreen: {
            path: 'notification/:id',
          },
        }

      },
    },
  },
  CreateNew: {
    path: 'openInvoice/:id',
  },

},

} : {
screens: {
  Home: {
    path: 'home',
    screens: {
      Invoice: {
        path: 'invoice/:id',
        screens: {
          InvoiceQuickDetailsScreen: {
            path: 'InvoiceQuickDetailsScreen/:id',
          },
          InvoiceOpenDetailsScreen: {
            path: 'InvoiceOpenDetailsScreen/:id',
          },
        }
      },
      Profile: {
        path: 'Profile',
        screens: {
          NotificationScreen: {
            path: 'notification/:id',
          },
        }

      },
    },
  },
  CreateNew: {
    path: 'openInvoice/:id',
  },

},

}

  /*const linking = {
    prefixes: ['hesabe://'],
     config,
  };*/

  const linkingArab = {
    prefixes: ['hesabe://'],
    config,
  };


  React.useEffect(() => {
    setTimeout(() => {

      setUser({});


    }, 500);
  }, []);
return (
  <NavigationContainer linking={linkingArab}>
  <RootStack.Navigator
    headerMode="none"
    screenOptions={{ animationEnabled: false }}
    mode="modal"
  >
  <RootStack.Screen
       name="Home"
       component={TabBar1}
       options={{ animationEnabled: true }}
     />
    <RootStack.Screen
       name="CreateNew"
       component={CreateNew}
       options={{ animationEnabled: true }}
     />
   </RootStack.Navigator>
   </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor : 'transparent'
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30
  }
});
