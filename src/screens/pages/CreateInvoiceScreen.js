
import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager,Animated} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';
import Localized from '../../locales';
import { CustomButton } from '../../components/CustomButton.js';
import {CalendarList} from 'react-native-calendars';
import  OpenScreen  from './OpenInvoiceScreen';
import FilterList from '../../components/FilterScreen';
const GLOBAL = require('../../utils/Globals');


//import Modal from 'react-native-modal';
import Modals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';


export default class CreateInvoiceScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarOnPress: (tab, jumpTo) => {
                           //!!!! never called if showLabel is set to false !
			console.log("nav to add obs");
			navigation.navigate("AddObservation");
		  }
      /*tabBarOnPress({ navigation, defaultHandler }) {
        navigation.state.params.onTabFocus();
        defaultHandler();
      }*/
    };
  };

  constructor(props){
    super(props);
    props.navigation.setParams({
     onTabFocus: this.handleTabFocus
   });

    this.state = {
     selectedButton: Localized.t('CalenderPage.Today'),
     	filterVisible: true,
    };

  }




 componentDidMount()
 {

   this.props.navigation.setParams({
     tapOnTabNavigator: this.tapOnTabNavigator
   })


 }

 tapOnTabNavigator = () => {
     console.log('lauch');
      this.setState({ filterVisible: true });
  }

 handleTabFocus = () => {
  // perform your logic here
    this.setState({ filterVisible: true });
}



    toggleModal(visible) {
    this.setState({ filterVisible: visible });

  //  this.props.navigation.navigate('Dashboard')
    }




  render(){

    const screenWidth = Dimensions.get("window").width;
    //const arrayValue = this.props.example;

    return(
    	<View style={{ flex: 1,  backgroundColor: GLOBAL.COLOR.WHITE }}>

      <Modals.BottomModal
       propagateSwipe={true}
       modalData={this.state.modalFilterData}
      visible={this.state.filterVisible}
      swipeableModal = {true}

      swipeDirection={null}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
        useNativeDriver : true
       })}


      //visible = {this.state.modalVisible}
     // onTouchOutside={() => this.setState({ HideModal: false })}
      height={0.95}
      width={1}
     // onSwipeOut={() => this.setState({ HideModal: false })}
      modalTitle={

         <View
         style={{
           justifyContent: 'space-between',
           marginTop :10,
            padding : 10,
           flexDirection: "row",
          // width : '100%',
           //height : 40,
           alignItems : "center",
           backgroundColor : GLOBAL.COLOR.WHITE
         }} >

         <TouchableOpacity
         style={styles.button}
         onPress={() => {
         this.toggleModal(!this.state.filterVisible)}}>
         <Image style={styles.icon4} source={require('./Assest/close.png')} />
         </TouchableOpacity>
         <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 0,fontSize : 22,fontFamily : 'Prompt-Medium'}}>{Localized.t('OpenInvoicePage.CreateInvoice')}</Text>
         <Text> </Text>
         </View>

      }
    >
      <ModalContent
        style={{
          flex: 1,
          backgroundColor: 'fff',
        }}
      >

      <OpenScreen />

      </ModalContent>
    </Modals.BottomModal>
      </View>


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
       //  padding: 10,
       //  width: 150,
       //  marginBottom: 36,
     },
     icon:{
       width:40,
       height:40,
     },
     icon2: {
    width: 20,
    height: 20,
    position: 'absolute',
    marginLeft : 5,
    left: 2, // Keep some space between your left border and Image
  },
  btnText: {
     textAlign: 'center',
     fontFamily : 'Prompt-Medium',
     fontSize: 15,
     color: '#867EBD',
     marginLeft : 10

   },


  });
