
import React, {Component} from 'react';
import rectImg from '../Assest/rectangle.png';
import grayrectImg from '../Assest/calender.png';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,Switch,TextInput,Platform,Keyboard} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import { CheckBox } from 'react-native-elements'
import Localized from '../../../locales'
import EmployeeList from '../../../components/EmployeeList';
import { CustomButton } from '../../../components/CustomButton.js';
import DropDownPicker from 'react-native-dropdown-picker';
import API from '../../../utils/API';
const GLOBAL = require('../../../utils/Globals');
import IllustratorModals, {  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation} from 'react-native-modals';
import IllustratorScreen  from '../../../components/IllustratorScreen.js';
import Carousel from 'react-native-snap-carousel';
import {Form,TextValidator}  from '../../../customTextField';
import CustomAlertComponent from '../../../components/CustomAlertComponent';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';


export default class EditDetailScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
     	selectedButton: Localized.t('EditDetailPage.Invoice'),
      designation: '',
      designationId: '',
      EmployeeId : this.props.example.id,
      Email : this.props.example.email,
      illustratorVisible: false,
      designationsArray : [],
      designationDropdown: [],
      descriptionCarouselItems: [],
      ActiveIndex:0,
      PermissionListArray : [],
      showAlert : false,
      showAlertMessage : '',
      topContraint : 10,
      languageArray: [
      {
         Invoice :
         [
           {id: 1, value: "BulkSMS", isChecked: true},
           {id: 2, value: "CreateInvoice", isChecked: false},
           {id: 3, value: "InvoiceDashboard", isChecked: false},
           {id: 4, value: "ProcessInvoice", isChecked: false},
           {id: 5, value: "ShowInvoice", isChecked: false},
         ],
         Report :
           [
           {id: 1, value: "CreateRefund", isChecked: true},
           {id: 2, value: "DownloadPaymentTransfers", isChecked: false},
           {id: 3, value: "PaymentList", isChecked: true},
           {id: 4, value: "PaymentTransfers", isChecked: false},
           {id: 5, value: "PrintPaymentList", isChecked: false},
           {id: 6, value: "PrintPaymentTransfers", isChecked: true},
           {id: 7, value: "Refunds", isChecked: false},
           {id: 8, value: "PaymentList", isChecked: true},
           {id: 9, value: "Reports", isChecked: false},
           {id: 10, value: "SaveRefund", isChecked: false},
           {id: 11, value: "ShowPaymentList", isChecked: true},
           {id: 12, value: "ShowPaymentTransfer", isChecked: false},
           {id: 13, value: "UpdatePaymentTransfer", isChecked: false},
         ],
          Setting :
            [
              {id: 1, value: "CreateEmployeeSettings", isChecked: true},
              {id: 2, value: "DeleteEmployeeSettings", isChecked: false},
              {id: 3, value: "EditEmployeeSettings", isChecked: true},
              {id: 4, value: "EditStorePaymentSettings", isChecked: false},
              {id: 5, value: "EmployeeSettings", isChecked: false},
              {id: 6, value: "SaveEmployeeSettings", isChecked: true},
              {id: 7, value: "Settings", isChecked: false},
              {id: 8, value: "StorePaymentsSettings", isChecked: true},
              {id: 9, value: "UpdateEmployeeSettings", isChecked: false},
              {id: 10, value: "UpdateStorePaymentsSettings", isChecked: false},
          ],

      }

    ],

      ProfileArray: [
      {id: 1, value: "Active", isChecked: true},
       {id: 2, value: "Inactive", isChecked: false},
      ]


    };

      this.handleChange = this.handleChange.bind(this);
      this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
      this._renderItem = this._renderItem.bind(this);
      this.getPermissionDetail(true);
      this.getDesignationDetail();
  }

  static contextType = DarkModeContext;

  componentDidMount() {
     console.log(this.props.example);
     let newArray = [...this.state.ProfileArray]
     if(this.props.example.status == 0)
     {
       newArray[0].isChecked = false
       newArray[1].isChecked = true
     }
     else {
       newArray[0].isChecked = true
       newArray[1].isChecked = false
     }

  }

  getPermissionDetail(value) {
   var self = this;
    API.get(GLOBAL.API_STRING.EMPLOYEES + '/' + self.state.EmployeeId + GLOBAL.API_STRING.PERMISSION,{

      params: {
         'merchantCode' : GLOBAL.MERCHANT_CODE,
        }


    }).then(function (response) {

      const json = JSON.parse(response)
       console.log(json.response.Data);
        console.log(json.response.pages[0]);

       console.log("xxx " + json.response.pages[0]);

       var dict = json.response.pages[0];
       var arr = [];

       for (var key in dict) {
         if(dict[key].status == true)
         {
       arr.push(dict[key]);
        }
       }

      // global.employeePermission = arr

       var ProfileData = {
           "id": 99,
           "parent_id": 0,
           "route_name": 'Profile',
           "title": 'Profile',
           "status": false,
           "list" : {},
         };

        arr.push(ProfileData)
      console.log(arr[0]);


      self.setState({ descriptionCarouselItems: arr }, () => {
          self.listviewPermission(value == true ? 0 : self.state.ActiveIndex);
      });


    })
    .catch(function (error) {
      console.log(error);
    });


  }




  getDesignationDetail() {
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

      if (y.id == self.props.example.designation_id){
          desg = y.name
          desgid = y.id
        }
      tempticket.push({ label: y.name, value: y.id});

        })

  //  console.log('xxx ' + tempticket);
    self.setState({
   designationsArray: json.response.data ,
   designationDropdown : tempticket,
   designation: desg,
   designationId : desgid
  })


   })
   .catch(function (error) {
     console.log(error);
   });


  }



  handleCheckChieldElement(event){

    let langarray = this.state.PermissionListArray
    langarray.forEach(fruite => {

      if (fruite.title === event.title)
       {
         fruite.status =  !event.status
       }
       else {

         fruite.isChecked =  false
       }
       this.setState({PermissionListArray: langarray})


        /*  let subtab = (this.state.selectedButton === "Invoice" ? fruite.Invoice : this.state.selectedButton === "Reports" ?  fruite.Report : fruite.Setting)
          console.log("ho" + subtab);
             for (const [key, value] of Object.entries(subtab)) {

               if (value.value  === event.value)
                {
                  value.isChecked =  !event.isChecked
                  console.log(key, value);
                }

              }*/
    })
    //this.setState({languageArray: langarray})

  }


CheckChieldElement(event){

  let profilearray = this.state.ProfileArray
  profilearray.forEach(fruite => {
     if (fruite.value === event.value)
      {
        fruite.isChecked =  !event.isChecked
      }
      else {

        fruite.isChecked =  false
      }
  })
  this.setState({ProfileArray: profilearray})


}

handleChange(name) {
  return (text) => {
        this.setState({[name]:text })
    }
}

onOkPressButton = () => {

  this.setState({showAlert: false}, () => {

  });
  };

SavePermission()
{

  let truemarkers = [];
  let falsemarkers = [];
  console.log(this.state.PermissionListArray);
  for(let i = 0; i < this.state.PermissionListArray.length; i++) {
   if(this.state.PermissionListArray[i].status)
   {
    truemarkers.push(
       this.state.PermissionListArray[i].id
    );
   }
   else {
     falsemarkers.push(
        this.state.PermissionListArray[i].id
     );

   }
  }

  console.log(truemarkers);
  console.log(falsemarkers);

  var self = this;
  API.post(GLOBAL.API_STRING.EMPLOYEES + '/'+this.state.EmployeeId + GLOBAL.API_STRING.PERMISSIONS, {

    "merchantCode" : GLOBAL.MERCHANT_CODE,
    "grantedPermissionsIds": truemarkers,
    "revokedPermissionsIds": falsemarkers,

  }).then(function (response) {
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
    console.log('final :' + error);

  });
}

profileSubmit = () => {
     this.SaveProfileDetail()
 }

profileFormSubmit = () => {
    this.refs.form.submit();
}

SaveProfileDetail() {


    var self = this;
  API.put(GLOBAL.API_STRING.EMPLOYEES + '/'+this.props.example.id, {

"merchantCode" : GLOBAL.MERCHANT_CODE,
"employeeId": this.props.example.id,
"email": this.state.Email,
"password": 'Test@321',
"status": this.state.ProfileArray[0].isChecked == true ? 1 : 0 ,
"designationId": this.state.designationId,

  }).then(function (response) {
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
    console.log('final :' + error);

    const errorjson = JSON.parse(error)
      console.log('final :' + errorjson);


      var message = message = errorjson.message

     self.setState({ showAlert: true,showAlertMessage : message});

  });


}

toggleillustratorPress(visible) {
this.setState({ illustratorVisible: visible });

}

illustratorReceiveData(searchValue)
 {

     this.toggleillustratorPress(false)
      //this.setState({ActiveIndex:0})
      //this.carousel.snapToItem(this.state.ActiveIndex)
     this.getPermissionDetail(false)

  }

  _renderItem({item,index}){
  //  console.log(item)
    // console.log(item.route_name)
      const isDarkMode = this.context === 'dark';
    const { ActiveIndex } = this.state;
        return (
            <TouchableOpacity
             style = {{marginRight : 10}}
            >

            <View
             style={{
           justifyContent: 'space-evenly',
             flexDirection: "row",
             //height : 40,
             alignItems : "center",
           }}>
            <View
             style={{
             justifyContent: 'flex-start',
             flexDirection: "column",
             //height : 40,
             padding : 10,
             alignItems : "center",
             //width : 10,

           }}>
           <TouchableOpacity
           style={styles.button3}
           onPress={() => this.slideNext(index)}>
           <Text style =  {{color : ActiveIndex === index
           ? GLOBAL.COLOR.ORANGE
           : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',width : '100%'}}>{Localized.t('EditDetailPage.'+item.route_name)}</Text>
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
   this.carousel.snapToItem(index)
  }

   listviewPermission(currentindex)
   {
     var dict = this.state.descriptionCarouselItems[currentindex].list
     var arr = [];
     for (var key in dict) {

        arr.push(dict[key]);

     }


  //  console.log(arr);
     this.setState({ PermissionListArray: arr });

     if(this.state.descriptionCarouselItems[currentindex].title === 'Profile')
     {
       this.setState({ selectedButton: 'Profile' });
     }
     else {
       this.setState({ selectedButton: 'Any' });
     }
   }

  render(){
    const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;
  const selectionMenu = (this.state.selectedButton === "Invoice" ? this.state.languageArray[0].Invoice : this.state.selectedButton === "Reports" ?  this.state.languageArray[0].Report : this.state.languageArray[0].Setting  )

    return(
 <ScrollView nestedScrollEnabled={true} contentContainerStyle={{paddingBottom: 60}}>
        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,padding : 10}} onStartShouldSetResponder={() => true}>
        <Form
              ref="form"
              onSubmit={this.profileSubmit}
         >
          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK  : GLOBAL.COLOR.WHITE,
          //  marginTop : 100,
          //  height :'100%',
            //borderRadius : 12
          }}>

          <View
          style={{
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
            borderWidth : isDarkMode ? 1  : 0 ,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.WHITE ,
            backgroundColor :isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            alignItems: 'center',
            flexDirection: "row",
            justifyContent: 'space-between',
          }} >
          <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-Regular'}}>
          {this.props.example.username}
          </Text>
          <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : 'Prompt-Regular',marginRight :20 }}>{this.state.designation}</Text>
          </View>

          <View style  =
          {{
            marginTop : 10,
            height: 60,
            width: '97%',
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
                  itemWidth={screenWidth/3}
                  renderItem={this._renderItem}
                  scrollEnabled={true}
                  useScrollView={I18nManager.isRTL? true: false}
                  firstItem={I18nManager.isRTL? this.state.descriptionCarouselItems.length-1: 0}
                  onSnapToItem = { index =>
                    {

                //  console.log(this.state.descriptionCarouselItems[index].list);

                   this.listviewPermission(index)
                   this.setState({ActiveIndex:index})
                    console.log("LLLL " + this.state.ActiveIndex);

                }}
                     />
            </View>


          <View style={{
            display :  this.state.selectedButton  === 'Profile'  ?  'none' :null
          }} >

            {
               this.state.PermissionListArray.map((item, index) => (
                 <View style={{
                flexDirection :'column',
                 }} >

                 <View  style={{
                   flexDirection :'row',
                   justifyContent : 'space-between',
                   alignItems : 'center',
                   marginLeft : 10,
                   height : 60
                   }}>

                   <Text style = {{fontSize :  RFValue(17),color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,width :'80%'}} >

                   {Localized.t('EditDetailPage.'+item.title)}

                   </Text>

                   <Switch
                   value={item.status}
                   onValueChange={() => this.handleCheckChieldElement(item)}
                   trackColor={{true: GLOBAL.COLOR.ORANGE, false: GLOBAL.COLOR.SHADEGRAY}}
                   style={{  height: "55%",
    transform:[{ scaleX: 1.0 }, { scaleY: 1.0 }]}}
                   thumbColor={GLOBAL.COLOR.WHITE}
                   />
                    </View>
                    </View>
               ))
            }
          </View>

         <View
          style={{

            marginTop :20,
            flexDirection: "column",
            display :  this.state.selectedButton  === 'Profile'  ?  null :'none'

          }} >
          <View style={styles.borderContainer}>
          <View style={styles.border} />
          </View>

          <View style={{ flexDirection: "row",marginTop : 5,marginBottom : 5 }}>


                              {
                                this.state.ProfileArray.map((item, index) => (


                                <TouchableOpacity
                                  style = {{
                                    flexDirection: "row",
                                    margin: 10,
                                    flex: 3,
                                    justifyContent: "space-evenly",
                                    alignItems : "center"
                                  }}
                                  onPress={() => this.CheckChieldElement(item)}
                                >
                                <MaterialCommunityIcons
                                  name={
                                    item.isChecked === true
                                      ? "circle"
                                      : "checkbox-blank-circle-outline"
                                  }
                                  size={25}
                                  color={isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
                                />
                                <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontSize :  RFValue(17),fontFamily : 'Prompt-Medium'}}>{Localized.t('EditDetailPage.'+ item.value)}</Text>
                                </TouchableOpacity>
                              ))
                            }
          </View>

          <View style={styles.borderContainer}>
          <View style={styles.border} />
          </View>
          <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',marginRight :20,textAlign : 'left',  marginTop :10,}}>{Localized.t('EditDetailPage.Designation')}</Text>

          <View style={{


             ...Platform.select({
      ios: {
        marginTop :10,
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
         zIndex :99999
      },
      android: {
       marginLeft : 10,
        marginTop :10,
          height : 50,
       //backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
        //
      },
  }),

          }} >
          <DropDownPicker
          onOpen={() => { Keyboard.dismiss(), this.setState({

           topContraint: Platform.OS === "android" ? 300 : 10,
         })   }}

         onClose={() => this.setState({

          topContraint: Platform.OS === "android" ? 0 : 10,
        }) }
            items={this.state.designationDropdown}

         defaultValue={this.state.designationId}

        underlineColor= 'transparent'
         inputContainerStyle={{ borderWidth: 1, borderColor: GLOBAL.COLOR.WHITE  }}
         containerStyle={{padding : 5,height : '100%'}}
         placeholderStyle = {{marginLeft : -5,fontSize :  RFValue(17),fontFamily : 'Prompt-Regular'}}
         dropDownStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,width : '100%'}}
         arrowColor={ isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
         arrowStyle = {{height : 20,width : 20,alignItems : 'center'}}
         arrowSize = {20}
         style={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,borderColor:"transparent"}}
          itemStyle={{
          justifyContent: 'flex-start',
           }}
       labelStyle={{
         color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : 'Prompt-Regular',textAlign : 'left',
         marginLeft : 5
       }}

       onChangeItem={item =>{
          console.log(item.value);
         this.setState({
        designationId: item.value
      })
    }
    }

        />
        </View>



          <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',marginTop  : 10,textAlign : 'left' ,marginTop :this.state.topContraint}}>{Localized.t('EditDetailPage.Email')}</Text>

          <View style={{
            marginTop :10,
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
            alignItems: 'center',
            justifyContent : 'space-between',
            flexDirection: "row",

          }} >

          <TextValidator
                   style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 15,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),height :40,alignItems : 'center',marginTop : 0,backgroundColor :GLOBAL.COLOR.WHITE}}
                   name="EmailAddress"
                   label="EmailAddress"
                   validators={['required','isEmail']}
                   errorMessages={[Localized.t('TextValidationPage.Emailfieldisrequired'), Localized.t('TextValidationPage.Entervalidemail')]}
                   errorStyle = {{'container': { top: 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                   placeholder="Email Address"
                   placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                   type="EmailAddress"
                   keyboardType="email-address"
                   value={this.state.Email}
                   onChangeText={this.handleChange('Email')}
                   //ref={(input) => { this.secondEmailTextInput = input; }}
                   //onSubmitEditing={() => { this.thirdEmailTextInput.focus(); }}
                   returnKeyType="done"
                   maxLength={50}
                   blurOnSubmit={true}
                   multiline = {true}
                   numberOfLines={4}
                   multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,maxHeight: 80,marginLeft : 10,textAlign: global.selectValue == 'en' ? 'left' : 'right',width :screenWidth*.9}}
           />
          </View>
          </View>



          <View style={{
            alignItems : 'flex-end',
            marginTop : 30,
            padding : 10
            }}>
          <CustomButton title= {Localized.t('EditDetailPage.Save')} style = {{fontSize : RFValue(20)}} onPress={() => this.state.selectedButton  === 'Profile'  ? this.profileFormSubmit() : this.SavePermission()}/>
         </View>
        </View>

        </Form>
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
         <IllustratorScreen example = {{'index' : 5 ,'value' : ''}} isDarkMode = {isDarkMode}  onOKClick={this.illustratorReceiveData}/>
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
           onPressPositiveButton={this.onOkPressButton}
         />
          </ScrollView>
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
      fontSize :  RFValue(17),
      fontFamily : 'Prompt-SemiBold',
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
    button1: {
      //alignItems: 'center',
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
 icon1:{
    width:8,
    height:8,
    alignItems: 'center',
    justifyContent : 'center',
  },
 icon4:{
    width:30,
    height:30,
    justifyContent : 'flex-start',
    marginLeft : 20
  },
  icon5:{
     width:40,
     height:40,
    // justifyContent : 'flex-start',
    // marginLeft : 20
   },
 btnText: {
    textAlign: 'center',
    fontFamily : 'Prompt-Medium',
    fontSize:  RFValue(15),
    color: '#867EBD',
  //  height:50,
    width:'100%'
  },
  borderContainer:{
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'center',

 },
 border:{
   flex:0.98,
   borderBottomWidth: 1,
   borderBottomColor: GLOBAL.COLOR.SHADEGRAY,

 },


  });
