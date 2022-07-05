
import React, {Component,useState,useRef,Fragment} from 'react';
import rectImg from './Assest/rectangle.png';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,I18nManager,Alert,Share,Linking,TextInput,Keyboard} from 'react-native';
//import Panel from '../../components/Panel';
import FeatherIcons from 'react-native-vector-icons/Feather';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';
import Localized from '../../locales';
import { CustomButton } from '../../components/CustomButton.js';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomView from '../../components/CustomView';
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import PreviewDetailsScreen from './SubPreviewDetails/PreviewDetailsScreen';
import ProductDetailsScreen from './SubProductDetails/ProductDetailsScreen';
import AddressDetailsScreen from './SubAddressDetails/AddressDetailsScreen';
import ContactListScreen from './ContactList/ContactListScreen';
import IllustratorScreen  from '../../components/IllustratorScreen.js';
import PreviewModals, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

import ProductModals, {} from 'react-native-modals';
import AddressModals, {} from 'react-native-modals';
import ContactModals, {} from 'react-native-modals';
import IllustratorModals, {} from 'react-native-modals';
import Tooltip,{ TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import DocumentPicker from 'react-native-document-picker';
import { Modalize } from 'react-native-modalize';
import API from '../../utils/API';
const GLOBAL = require('../../utils/Globals');
import AsyncStorage  from '@react-native-community/async-storage';
import QRCode from 'react-native-qrcode-svg';
import RNQRGenerator from 'rn-qr-generator';
import { Button } from 'react-native';
import {CalendarList} from 'react-native-calendars';
import { format,parseISO } from 'date-fns';
import {Form,TextValidator}  from '../../customTextField';
import parsePhoneNumber from 'libphonenumber-js'
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { decimalthreeDigit,currencyFormat} from '../../utils/GlobalFunction';
import CustomAlertComponent from '../../components/CustomAlertComponent';
import { BackHandler } from 'react-native';
import Shared from 'react-native-share';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';
//import Modal from 'react-native-modal';

export default class OpenInvoiceScreen extends Component {

modal = React.createRef();
previewmodal = React.createRef();



  constructor(props){
    super(props);
      this._renderProductItem = this._renderProductItem.bind(this);
      this._renderDescriptionItem = this._renderDescriptionItem.bind(this);
      this._renderOpenDescriptionItem = this._renderOpenDescriptionItem.bind(this);
      this.contactReceiveData = this.contactReceiveData.bind(this);
      this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
      this.ProductReceiveData = this.ProductReceiveData.bind(this);
      this.AddressReceiveData  = this.AddressReceiveData.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.togglePreviewScreen = this.togglePreviewScreen.bind(this);
      this.previewReceiveData = this.previewReceiveData.bind(this);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);



    this.state = {
     isQuickHidden:false,
     isOrderDetailHidden:true,
     isOpenHidden:true,
     selectedButton: "Quick",
     shareSelectedButton: 'Payment Link',
     tabselectedButton: Localized.t('OpenInvoicePage.Sms'),
     previewVisible: false,
     contactVisible: false,
     illustratorVisible: false,
     illustratorRefNo :'',
     illustratorName :'',
     modalPreviewData:null,
     productVisible: false,
     addressVisible : false,
     modalProductData:null,
     modalAddressData : null,
     productActiveIndex:0,
     descriptionActiveIndex:0,
     descriptionOpenActiveIndex:0,
     toolTipShareVisible :false,
     toolTipContactVisible :false,
     toolTipAttachVisible :false,
     toolTipAddVisible :false,
     toolTipPreviewVisible :false,
     toolTipSendVisible :false,
     customerName : '',
     mobileNumber : '',
     amount : "",
     emailAddress : '',
     customerEmailAddress : '',
     ProductArray : [],
     AddressArray : [],
     countryCode : '',
     description :'',
     openDescription : '',
     invoiceno : '',
     shareURL : '',
     shareOpenURL : 'test',
     minAmount : '',
     maxAmount : '',
     fixedAmount:'',
     expiryDate : '',
     invoiceTitleName : '',
     descriptionCarouselItems: [],
     descriptionOpenCarouselItems: [],
     openInvoiceSelectedValue : 'Fixed',
     calendarVisible : false,
     setPreviewAttachemnt : {},
     countryList :[],
     whatsappCountryList :[],
     showQuickInvoiceFlag : true,
     showOpenInvoiceFlag : true,
     showOrderDetailInvoiceFlag : true,
     showAlert : false,
     showAlertMessage : '',
     initalAmountFlag : true,
     intialAmount : '',
     previewFlag : false,
     topContraint : 0,
     orderDeliveryFee : '',
     orderDeliveryID : '',
     orderDropID : '',
     orderDeliveryDate : '',
     orderDeliveryTime : '',
     checkOrderFlag : false,
     productCarouselItems: [
     {
         title:"Refrigerator Vestfrost CWW 286 New…",
     },
     {
         title:"Notebook Igrovy Acer Nitro 5 AN515-43 ",
     },
     {
         title:"Notebook Igrovy Acer Nitro 5 AN515-43 ",
     },
     {
         title:"Notebook Igrovy Acer Nitro 5 AN515-43 ",
     },
   ],

   descriptionCarouselItems1: [
   {
       title:"Delivery note from 20.04.12",
       img : require('./Assest/descriptionImage1.png'),
   },
   {
       title:"Sales Report for client",
       img : require('./Assest/descriptionImage2.png'),
   },

 ],


 InvoiceTypeArray: [
 {id: 1, value: "Fixed", isChecked: true},
  {id: 2, value: "Open", isChecked: false},
  ]
    };
     this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

  }

 static contextType = DarkModeContext;

  openModal = () => {
      if (this.modal.current) {
        this.modal.current.open();
      }
    };

  closeModal = () => {
        if (this.modal.current) {
          this.modal.current.close();
        }
      };

      openPreviewModal = () => {
          if (this.previewmodal.current) {
            this.previewmodal.current.open();
          }
        };

      closePreviewModal = () => {
            if (this.previewmodal.current) {
              this.previewmodal.current.close();
            }
          };


      callparentfunction(){
           this.props.onSelectInvoice()
         }



  componentDidMount()
  {
   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    setTimeout(() => {
    this.readLanguageData()
    this.loadView()

  //  this.toggleToolTipModal('ShareInvoice');
    this.getcountryList()
    this.getwhatsappcountryList()

     if(global.employeFlag)
     {
         this.getPermissionAccess();
     }
       this._retrieveData()

    }, 500);

  }


  readLanguageData = async () => {
		try {
			const lang = await AsyncStorage.getItem('USER_LANGUAGE_PICKED')
			console.log('MLM :' + lang);
			if (lang !== null) {
				if (lang === "ar") {
					 global.selectValue =  'ar'
				}
				else {

						global.selectValue =  'en'
				}

			}
			else {

				 global.selectValue =  'en'
			}

		} catch (e) {
		 // alert('Failed to fetch the data from storage')
		}
		}


  loadView()
  {
    var quickflag = '',openflag = ''
    if(global.serviceType != null)
    {
    global.serviceType.map((item, index) => {

      if(item.id == 2)
      {
         quickflag = 'true'
      }

      if(item.id == 7)
      {

        openflag = 'true'

      }
    })
  }


    quickflag.length != 0 ?   this.setState({  showQuickInvoiceFlag: true })  : this.setState({  showQuickInvoiceFlag: false })
    openflag.length != 0 ?   this.setState({  showOpenInvoiceFlag: true })  : this.setState({  showOpenInvoiceFlag: false })

    if(quickflag.length == 0 )
    {
      this.setState({
     toolTipShareVisible :false,
     toolTipContactVisible :false,
     toolTipAttachVisible :false,
     toolTipAddVisible :false,
     toolTipPreviewVisible :false,
     toolTipSendVisible :false,
     })
   }

  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   console.log('backclick');
      this.callparentfunction();
    return true;
}


  getPermissionAccess()
  {
      console.log('cvcv starting');

      var list = {};

      if(global.employeePermission != null)
      {
      global.employeePermission.map((y) => {

            if(y.id == 2)
            {
              // console.log('cvcv'+ y.title);
               list = y.list

              //console.log('cvcv'+ list);
            }
            })

            var dict = list
            var arr = [];
            for (var key in dict) {
            arr.push(dict[key]);
            }


           if(arr[1].id == 10)
           {
              arr[1].status == true ?  this.setState({ showQuickInvoiceFlag: true }) :  this.setState({ showQuickInvoiceFlag: false });

           }


            console.log(arr);
          }
          else {

            this.setState({ showQuickInvoiceFlag: false })
          }
            //console.log(arr[1].id);


    }


  getcountryList()
  {
    const tempticket = [];
    global.countries.map((y) => {
      tempticket.push({ label: '+' + y.code, value: y.code});
    })

     this.setState({countryList : tempticket,
       countryCode : '965'
      })
     console.log(this.state.countryList);
  }

  getwhatsappcountryList()
  {
    const tempticket = [];
    if((global.FetchCountryList) != null)
    {
    global.FetchCountryList.map((y) => {
      tempticket.push({ label: '+' + y.code, value: y.code});
      })

     this.setState({whatsappCountryList : tempticket,
       countryCode : '965'
      })
     console.log(this.state.whatsappCountryList);
   }
  }


  _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('OpenToolTipFlag');
		console.log('ZXZX :' + value);
    if (value !== null) {
      // We have data!!

			if (value == "True") {

			 this.setState({
         toolTipShareVisible :false,
         toolTipContactVisible :false,
         toolTipAttachVisible :false,
         toolTipAddVisible :false,
         toolTipPreviewVisible :false,
         toolTipSendVisible :false,
		 })
	 }

    }
		else {

			this.setState({
        toolTipShareVisible : this.state.showQuickInvoiceFlag == false ? false :true,
        toolTipContactVisible :false,
        toolTipAttachVisible :false,
        toolTipAddVisible :false,
        toolTipPreviewVisible :false,
        toolTipSendVisible :false,
		})
		}

  } catch (error) {
		this.setState({
      toolTipShareVisible :true,
      toolTipContactVisible :false,
      toolTipAttachVisible :false,
      toolTipAddVisible :false,
      toolTipPreviewVisible :false,
      toolTipSendVisible :false,
	})
  }
};

  illustratorReceiveData(searchValue)
   {

      this.toggleillustratorPress(false)
      this.callparentfunction()
      //this.setState({filterType: filterValue});

    }

    previewReceiveData()
    {
        this.closePreviewModal()
        this.callparentfunction()
    }



    ProductReceiveData(productValue)
    {
        console.log('Received Data' + productValue);
      //var joined = this.state.ProductArray.concat(productValue)

      //   console.log('Received Data' + joined);
      this.setState({
         productVisible: false ,
        // ProductArray :[joined]
       });

         this.setState(prevState => ({
        ProductArray: [...prevState.ProductArray, productValue]
   }), () => {
    this.addPaymentAmount()
  });


   }


   AddressReceiveData(addressValue)
   {
      // console.log('Received Data' + addressValue);
     //var joined = this.state.ProductArray.concat(productValue)

     //   console.log('Received Data' + joined);
     this.setState({
        addressVisible: false,
      });

      this.setState(prevState => ({
     AddressArray: [addressValue]
   }), () => {
   //this.addPaymentAmount()
   });

    //console.log('Received Data' + this.state.AddressArray[0].block);

  }


  selectionOnPress(userType) {
    this.setState({ selectedButton : userType });

   userType  === "Quick" ?  this.setState(state => ({

     isQuickHidden: false,
     isOpenHidden: true,
     isOrderDetailHidden : true,

   }))

   : userType  === "Open" ?  this.setState(state => ({

      isQuickHidden: true,
      isOpenHidden: false,
      isOrderDetailHidden : true,

    }))

    : this.setState(state => ({

       isQuickHidden: true,
       isOpenHidden: true,
       isOrderDetailHidden : false,

     }));

  }


  whatsappContact(contactDetail) {

      console.log(contactDetail.phoneNumbers[0].number);
      var mobNum;
      if(contactDetail.phoneNumbers[0].number.includes(" "))
      {
         console.log(contactDetail.phoneNumbers[0].number.replace(" " ,''));

         var val = contactDetail.phoneNumbers[0].number.replace(" " ,'')
         if(contactDetail.phoneNumbers[0].number.charAt(0) == 0)
         {
           val = val.replace("0" ,'')
         }

          mobNum = val
      }
      else if(contactDetail.phoneNumbers[0].number.includes("-"))
      {
        // console.log(contactDetail.phoneNumbers[0].number.replace("-" ,''));

         var val = contactDetail.phoneNumbers[0].number.replace("-" ,'')
         if(contactDetail.phoneNumbers[0].number.charAt(0) == 0)
         {
           val = val.replace("0" ,'')
         }

          mobNum = val
      }
      else if (contactDetail.phoneNumbers[0].number.charAt(0) == 0) {

       console.log(contactDetail.phoneNumbers[0].number.replace("0" ,''));
        mobNum = contactDetail.phoneNumbers[0].number.replace("0" ,'')

      }
      else {
         mobNum = contactDetail.phoneNumbers[0].number
      }

   const  phoneNumber = parsePhoneNumber(mobNum)
    console.log(phoneNumber);

    if (phoneNumber != null) {
      if(phoneNumber.countryCallingCode != null)
      {
        this.setState({mobileNumber: phoneNumber.nationalNumber})
        this.setState({customerName: contactDetail.givenName})
        this.setState({countryCode: phoneNumber.countryCallingCode})
      }
      else {

        this.setState({mobileNumber:   phoneNumber.nationalNumber})
        this.setState({customerName: contactDetail.givenName})

      }
      console.log('mmm'+phoneNumber.countryCallingCode);
       console.log('mmm'+phoneNumber.nationalNumber);

     }
     else {
       this.setState({mobileNumber:  mobNum })
       this.setState({customerName: contactDetail.givenName})
     }
   }


   emailContact(contactDetail) {

       console.log(contactDetail.emailAddresses[0].email);
       var emailNum;
       if(contactDetail.emailAddresses[0].email.includes(" "))
       {
          console.log(contactDetail.emailAddresses[0].email.replace(" " ,''));

          var val = contactDetail.emailAddresses[0].email.replace(" " ,'')


           emailNum = val
       }
       else {
          emailNum = contactDetail.emailAddresses[0].email
       }

       this.setState({emailAddress:  emailNum })
       this.setState({customerName: contactDetail.givenName})

    }

  updateText(contactDetail) {

    const phoneNumber = parsePhoneNumber(contactDetail.phoneNumbers[0].number)


    if (phoneNumber) {
      console.log('mmm'+phoneNumber.countryCallingCode);
       console.log('mmm'+phoneNumber.nationalNumber);
  var code = ''

   global.countries.map((y) => {
     if(phoneNumber.countryCallingCode.includes(y.code))
     {
          code = y.code
     }
     })

     if(code.length !=0)
     {
       this.setState({mobileNumber: phoneNumber.nationalNumber})
       this.setState({customerName: contactDetail.givenName})
       this.setState({countryCode: code})

     }
     else {
       alert("Above country contact detail not allowed")
     }



    }
    else {

     var mobno = '',code = '',name = ''

      global.countries.map((y) => {
        if(contactDetail.phoneNumbers[0].number.includes(y.code))
        {

             mobno = contactDetail.phoneNumbers[0].number.replace(y.code, "")
             code = y.code
             name = contactDetail.givenName
        }
        })

        if(mobno.length !=0)
        {
          this.setState({mobileNumber:mobno})
          this.setState({countryCode:code})
          this.setState({customerName: name})

        }else {

            if (contactDetail.phoneNumbers[0].number.match(/^[1-9][0-9]{7,15}$/)) {

              this.setState({mobileNumber:contactDetail.phoneNumbers[0].number})
              this.setState({countryCode:'965'})
              this.setState({customerName: contactDetail.givenName})

            }
            else {
              alert("Please select proper contact detail")
            }

        }








    }


   }

  shareSelectionOnPress(userType) {
    this.setState({ shareSelectedButton : userType });
  }

  tabselectionOnPress(userType) {
    this.setState({ tabselectedButton : userType });
  }

  applyOnPress() {
    var CalenderData = this.state.selectedButton;
     this.props.onSelectCalender(CalenderData);
  }

  togglecontactPress(visible) {
  this.setState({ contactVisible: visible });
  }

  toggleillustratorPress(visible) {
  this.setState({ illustratorVisible: visible });

  }




  togglePreviewScreen = () => {

    if(this.state.selectedButton === "OrderDetail")
    {
      if(this.state.AddressArray.length != 0)
      {
        this.setState({
          previewFlag : true
       }, () => {

       });
        setTimeout(() => {
        this.quickFormSubmit()
     }, 300);
      }
    }

    else {

      this.setState({
        previewFlag : true
     }, () => {

     });
      setTimeout(() => {
      this.quickFormSubmit()
   }, 300);

    }






  }

  showPreviewScreen() {

      this.setState({ previewFlag : false });

      setTimeout(() => {
       this.state.selectedButton === "OrderDetail"  ?   this.fetchdeliveryApi() :   this.openPreviewModal();


   }, 300);

  }



  forceUpdateHandler(){
      this.forceUpdate();

    };





  togglePreviewModal() {

   //this.uploadAttachement()

   var attachment = {}
 if(this.state.descriptionCarouselItems[this.state.descriptionActiveIndex] != null)
 {
   var fileUrl =  this.state.descriptionCarouselItems[this.state.descriptionActiveIndex][0]


   attachment = {

    "uri": Platform.OS === 'android' ? fileUrl.uri : fileUrl.uri,
    "type": fileUrl.type,
    "name": fileUrl.name,
  }


 }

 this.setState({ setPreviewAttachemnt: attachment }, () => {

     console.log('wwww'+ attachment.uri);

});


}



  toggleProductModal(visible) {
      this.setState({ productVisible: visible });
      this.setState({
        modalProductData:"Product"
     });
  }


  toggleAddressModal(visible) {
      this.setState({ addressVisible: visible });
      this.setState({
        modalAddressData:"Address"
     });
  }

  HideToolTipModal(visible) {

     AsyncStorage.setItem('OpenToolTipFlag',"True")
    this.setState({
      toolTipShareVisible :false,
      toolTipContactVisible :false,
      toolTipAttachVisible :false,
      toolTipAddVisible :false,
      toolTipPreviewVisible :false,
      toolTipSendVisible :false,
     });
  }

   toggleToolTipModal(visible) {



     if(visible == 'AttachFiles')
     {
        console.log(visible);
        this.props.onScroll()
      // this.scroll.scrollToEnd({animated: true})
      setTimeout(() => {
       //this.setState({  toolTipAttachVisible : visible == 'AttachFiles' ? true :false,})
       this.setState({  toolTipAddVisible : visible == 'AttachFiles' ? true :false,})

      }, 500);
     }
     else {

      //  this.setState({  toolTipAttachVisible : visible == 'AttachFiles' ? true :false,})
        this.setState({  toolTipAddVisible : visible == 'AttachFiles' ? true :false,})
     }


  //  this.scroll.scrollTo({x: 1 * 220, y: 0, animated: true})
    this.setState({

      toolTipShareVisible : visible == 'ShareInvoice' ? true :false,
      toolTipContactVisible : visible == 'SyncContact' ? true :false,
    //  toolTipAddVisible : visible == 'AddProducts' ? true :false,

      toolTipPreviewVisible :visible == 'PreviewInvoice' ? true :false,
      toolTipSendVisible : visible == 'SendInvoice' ? true :false,

     });


  }

  handleCheckChieldElement(event){
    console.log(event.value);
    let langarray = this.state.languageArray
    let vr = this.props.example
    langarray.forEach(fruite => {
          let subtab = (vr === "Dashboard" ? fruite.Dashboard : vr === "OpenInvoice" ?  fruite.OpenInvoice : vr === "Invoice" ?  fruite.Invoice  : fruite.ReportPayment )
          console.log("ho" + subtab);
             for (const [key, value] of Object.entries(subtab)) {

               if (value.value  === event.value)
                {
                  value.isChecked =  !event.isChecked
                  console.log(key, value);
                }
                else {

                  value.isChecked =  false
                }

              }
    })
    this.setState({languageArray: langarray})


  }

  CheckInvoicelement(event){

    let invoicetypearray = this.state.InvoiceTypeArray
    invoicetypearray.forEach(fruite => {
       if (fruite.value === event.value)
        {
          fruite.isChecked =  !event.isChecked
          this.setState({openInvoiceSelectedValue: fruite.value})
        }
        else {

          fruite.isChecked =  false
        }
    })
    this.setState({InvoiceTypeArray: invoicetypearray})

  }

  contactReceiveData(contactData)
  {

  console.log("pppp :" +contactData.phoneNumbers);

  //this.togglecontactPress(!this.state.contactVisible)
  this.closeModal()
  this.state.tabselectedButton === "WhatsApp" ? this.whatsappContact(contactData) : this.state.tabselectedButton === "Email" ? this.emailContact(contactData): this.updateText(contactData)


  }


  _renderProductItem({item,index}){
       const isDarkMode = this.context === 'dark';
     const { productActiveIndex } = this.state.productActiveIndex;
         return (
            <TouchableOpacity>
           <View style={{
               backgroundColor:GLOBAL.COLOR.SHADEGRAY,
               borderRadius: 10,
               padding : 10,
               height: 50,
               width : 230,
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center'
             }}>

            <Text style={{fontSize:  RFValue(17),  color :GLOBAL.COLOR.DARKGRAY,marginTop  : 5,width : 180,height : 50}}>{(item.itemTitle)}</Text>
             <TouchableOpacity
               style = {{backgroundColor : GLOBAL.COLOR.SHADEGRAY}}
             onPress={() => this.removeProductData(index)}>

            <Image
            source = {require('./Assest/close.png')} />
             </TouchableOpacity>

           </View>
           </TouchableOpacity>
         )
     }


  _renderDescriptionItem({item,index}){
      const isDarkMode = this.context === 'dark';
     console.log(item)
      console.log(item[0].name)
     const { descriptionActiveIndex } = this.state.descriptionActiveIndex;
         return (
           <TouchableOpacity>
           <View style={{
               backgroundColor:GLOBAL.COLOR.WHITE,
               borderRadius: 10,
               height: 50,
               width : 220,
               padding:5,
               flexDirection : 'row',
             }}>

           <View style={{ flexDirection : 'row'}} >

             <Image
              style={{marginTop : 0,height : 50,width : 50,transform: [{ scale: 2 }]}}
             source =  {item[0].type == 'image/png' ? require('./Assest/descriptionImage2.png') : require('./Assest/descriptionImage1.png')} />
             <TouchableOpacity
               style = {{height : 25,width : 25,marginTop : -6,marginLeft : -25}}
             onPress={() => this.removeDescriptionData(index)}>
             <Image
             style={{}}
             source = {require('./Assest/close.png')}/>
             </TouchableOpacity>
              </View>

            <Text style={{fontSize:  RFValue(17),  color :GLOBAL.COLOR.DARKGRAY,marginLeft : 5 ,justifyContent : 'center',alignItems : 'center',width : 100,height : 50}}>{(item[0].name)}</Text>

           </View>
           </TouchableOpacity>
         )
     }

     _renderOpenDescriptionItem({item,index}){
         const isDarkMode = this.context === 'dark';
        console.log(item)
         console.log(item[0].name)
        const { descriptionOpenActiveIndex } = this.state.descriptionOpenActiveIndex;
            return (
                <TouchableOpacity>
              <View style={{
                  backgroundColor:GLOBAL.COLOR.WHITE,
                  borderRadius: 10,
                  height: 50,
                  width : 220,
                  padding:5,
                  flexDirection : 'row',
                }}>

              <View style={{ flexDirection : 'row'}} >

                <Image
                 style={{marginTop : 0,height : 50,width : 50,transform: [{ scale: 2 }]}}
                source =  {item[0].type == 'image/png' ? require('./Assest/descriptionImage2.png') : require('./Assest/descriptionImage1.png')} />
                <TouchableOpacity
                  style = {{backgroundColor : GLOBAL.COLOR.SHADEGRAY}}
                onPress={() => this.removeOpenDescriptionData(index)}>
                <Image
                style={{marginTop : -5,marginLeft : -20,height : 25,width : 25}}
                source = {require('./Assest/close.png')}/>
                </TouchableOpacity>
                 </View>

               <Text style={{fontSize:  RFValue(17),  color :GLOBAL.COLOR.DARKGRAY,marginLeft : 0 ,justifyContent : 'center',alignItems : 'center',width : 100,height : 50}}>{(item[0].name)}</Text>

              </View>
              </TouchableOpacity>
            )
        }


     removeProductData(index) {
     var array = [...this.state.ProductArray]; // make a separate copy of the array
     //var index = array.indexOf(e.target.value)
     let removedValue = array[index].amount
    if (index !== -1) {
    array.splice(index, 1);


    this.setState({ ProductArray: array
      }, () => {
       this.removePaymentAmount(removedValue)
    });

    }



  }



  addPaymentAmount()
  {


    var totalAmt = '0.0' ;
     this.state.ProductArray.map((y) => {
                    totalAmt = parseFloat(totalAmt) + parseFloat(y.amount)
                       })


    if(this.state.initalAmountFlag)
    {

       this.setState({
         initalAmountFlag: false ,
         intialAmount :   this.state.amount.length == 0 ? "0.0" : this.state.amount,
         }, () => {
           console.log("PPP :" + this.state.intialAmount);
            totalAmt =  totalAmt + parseFloat(this.state.intialAmount)

            this.setState({
               amount: (totalAmt.toFixed(3)).toString() ,
             });

       });


    }
    else {
        totalAmt += parseFloat(this.state.intialAmount)

        this.setState({
           amount: (totalAmt.toFixed(3)).toString() ,
         });
    }




  }


  removePaymentAmount(value)
  {

    var totalAmt = (parseFloat(this.state.amount) -  parseFloat(value)).toFixed(3);


      this.setState({
         amount: totalAmt.toString() ,
         initalAmountFlag : this.state.ProductArray.length == 0 ? true :false
       });
  }



    removeDescriptionData(index) {
    var array = [...this.state.descriptionCarouselItems]; // make a separate copy of the array
    //var index = array.indexOf(e.target.value)
   if (index !== -1) {
   array.splice(index, 1);

   this.setState({ descriptionCarouselItems: array }, () => {

       this.togglePreviewModal();
  });

   }


  }

  removeOpenDescriptionData(index) {
  var array = [...this.state.descriptionOpenCarouselItems]; // make a separate copy of the array
  //var index = array.indexOf(e.target.value)
 if (index !== -1) {
 array.splice(index, 1);
 this.setState({descriptionOpenCarouselItems: array});
 }
}


   selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      //setMultipleFile(results);
      this.state.selectedButton === "Quick" ?    this.setState(prevState => ({
       descriptionCarouselItems: [...prevState.descriptionCarouselItems, results]
        }))

        :  this.setState(prevState => ({
         descriptionOpenCarouselItems: [...prevState.descriptionOpenCarouselItems, results]
          }))


    this.togglePreviewModal();



    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
      //  alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
      //  alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  shareApp = () =>{

      let  text = 'Invoice details \n\n'
      if(Platform.OS === 'android')
          text = text.concat(this.state.shareURL)
      else
          text = text.concat(this.state.shareURL)

      Share.share({
          subject: 'Share Invoice',
          title: 'Share Invoice',
          message: text,
        //  url:'app://',
          //  url: `data:image/png;base64,${this.state.base64}`,

      }, {
          // Android only:
          dialogTitle: 'Hesabe Merchant App',
          // iOS only:
          excludedActivityTypes: []
      })
  }



  shareToWhatsApp = () => {
   let msg = this.state.shareURL;

   //const phoneNumber = parsePhoneNumber("+" + this.state.mobileNumber)
   console.log(this.state.mobileNumber);


   var demourl


  //let phoneWithCountryCode = this.state.mobileNumber;
   let phoneWithCountryCode = this.state.countryCode + this.state.mobileNumber;
   const phoneNumber = parsePhoneNumber("+" + phoneWithCountryCode)
    console.log(phoneNumber);

   let mobile = Platform.OS == 'ios' ? '+' + phoneWithCountryCode : '+' + phoneWithCountryCode;

  if(phoneNumber != null)
  {
   if(phoneNumber.countryCallingCode != null)
   {
    demourl = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
   }
   else {
      demourl = 'whatsapp://send?text=' + msg;
   }
   }
   else {
       demourl = 'whatsapp://send?text=' + msg;
   }



   if (mobile) {
     if (msg) {
       let url = demourl
       Linking.openURL(url).then((data) => {
         console.log('WhatsApp Opened');
       }).catch(() => {
         alert(Localized.t('TextValidationPage.WhatsAppnotinstalledonyourdevice'));
       });
     } else {
       alert('Please insert message to send');
     }
   } else {
     alert(Localized.t('TextValidationPage.Entervalidmobilenumber'));
   }
 }


 sharetoEmail = (toMailId, subject, body) => {

 Linking.openURL(`mailto:${toMailId}?subject=${subject}&body=${body}`).then((data) => {
   console.log('WhatsApp Opened');
 }).catch(() => {
   alert(Localized.t('TextValidationPage.mailisnotconfigureonyourdevice'));
 });
};




    quickSubmit = () => {
         this.SendInvoiceDetail();
     }

     previewSubmit = () => {
       if(this.state.selectedButton == "OrderDetail")
       {
         if(this.state.AddressArray.length != 0)
         {
         this.showPreviewScreen();
        }
       }
       else {
         this.showPreviewScreen();
       }


      }

     openSubmit = () => {
          this.SendOpenInvoiceDetail();
      }

     quickFormSubmit = () => {
       this.refs.form.submit();
         if(this.state.selectedButton == "OrderDetail")
         {
          this.setState({ checkOrderFlag: true });
        }
     }

     openFormSubmit = () => {
         this.refs.form.submit();
     }

     toggleCalendar(value)
     {
       this.setState({ calendarVisible : value });
     }


     convertStringToByteArray(str){
 String.prototype.encodeHex = function () {
 var bytes = [];
 for (var i = 0; i < this.length; ++i) {
  bytes.push(this.charCodeAt(i));
 }
 return bytes;
 };

 var byteArray = str.encodeHex();
 return byteArray
 }

     SendInvoiceDetail() {
         var attachment = {}
         var a = {  'mobileNumber' : this.state.mobileNumber}
    	   var b = { 'countryCode': this.state.tabselectedButton === "SMS" ||this.state.tabselectedButton === "WhatsApp" ? this.state.countryCode : ''}

         if(this.state.descriptionCarouselItems[this.state.descriptionActiveIndex] != null)
         {
           var fileUrl =  this.state.descriptionCarouselItems[this.state.descriptionActiveIndex][0]


           attachment = {

            "uri": Platform.OS === 'android' ? `${fileUrl.uri}` : fileUrl.uri,
            "type": fileUrl.type,
            "name": fileUrl.name,
          }
         }



        //console.log(utf8.encode(this.convertStringToByteArray(this.state.customerName)));


    		 var parm1 = {
           "merchantCode" : GLOBAL.MERCHANT_CODE,
           "referenceNumber": this.state.invoiceno,
           "customerName": this.state.customerName,
           "amount": this.state.amount,
           "invoiceType": this.state.tabselectedButton === "SMS" ? '1' : '0',
           "invoiceSubType" : this.state.tabselectedButton === "SMS" ? '0': this.state.tabselectedButton === "WhatsApp"  ? '1' :  this.state.tabselectedButton === "Email" ? '2' : '3',
           "knetFixedCharges": global.knetFixedCharges,
           "knetPercentageCharges": global.knetPercentageCharges,
           "mpgsFixedCharges": global.mpgsFixedCharges,
           "mpgsPercentageCharges": global.mpgsPercentageCharges,
           "knetChargesRemark": "Testing Knet Remark",
           "mpgsChargesRemark": "Testing Mpgs Remark",
           "serviceCharge": "0",
           "discount": "0",
           "description": this.state.description,
           "customerEmail": this.state.tabselectedButton === "Email" ? this.state.emailAddress : this.state.customerEmailAddress ,
           "itemsList": JSON.stringify(this.state.ProductArray)
    		 }

          var self = this;
    		 parm1 =  self.state.tabselectedButton === "SMS" || self.state.tabselectedButton === "WhatsApp"? Object.assign({},a,b,parm1) : Object.assign({},parm1)


       API.post(GLOBAL.API_STRING.QUICK_INVOICE,
            parm1,
            {
              attachment :   Platform.OS === 'android' ? self.state.descriptionCarouselItems[self.state.descriptionActiveIndex] != null ? attachment : "" : attachment
            }
          ).then(function (response) {
         const json = JSON.parse(response)
         console.log(json.status);
        console.log(json);
         if(json.status)
         {

            if((self.state.tabselectedButton === "SMS")  && self.state.selectedButton === "Quick")
            {
            self.setState({
              illustratorRefNo : json.response.reference_number,
              illustratorName :  json.response.customer.name,
              illustratorVisible: true
            });
           }
           else {

             self.setState({ shareURL: json.response.url }, () => {

               setTimeout(() => {

                 self.state.tabselectedButton === "WhatsApp" ?   self.shareToWhatsApp() : self.state.tabselectedButton === "Email" ? self.sharetoEmail(self.state.emailAddress, 'Invoice details', self.state.shareURL) : self.shareApp()

             }, 300);
               self.callparentfunction()

              });


           }
         }
         else {

         }
       })
       .catch(function (error) {

         console.log("LLLL L :" + error) ;
         const errorjson = JSON.parse(error)
        // console.log('final :' + errorjson);
       console.log('final :' + errorjson.message);
         var message = ''
         if(errorjson.response != null)
         {
           if(errorjson.response.amount != null)
           {
             message = errorjson.response.amount[0]
           }
           else if(errorjson.response.customerName != null)
           {
             message = errorjson.response.customerName[0]
           }
           else if(errorjson.response.customerEmail != null)
           {
             message = errorjson.response.customerEmail[0]
           }
           else if(errorjson.response.mobileNumber != null)
           {
             message = errorjson.response.mobileNumber[0]
           }
         }
         else {
           message = errorjson.message
         }
        self.setState({ showAlert: true,showAlertMessage : message});

       });


     }



     SendOpenInvoiceDetail() {

        const  expDate =  this.state.expiryDate.length != 0 ?  this.state.expiryDate.split('/') : ''

    		 var parm1 = {
           "merchantCode" : GLOBAL.MERCHANT_CODE,
           "title": this.state.invoiceTitleName,
           "amountType": this.state.openInvoiceSelectedValue == 'Fixed' ? '0' : '1',
           "expiryDate": this.state.expiryDate.length != 0 ? expDate[2] + "-" + expDate[0] + "-" + expDate[1] : '',
           "minAmount": this.state.minAmount,
           "maxAmount": this.state.maxAmount,
           "fixAmount": this.state.fixedAmount,
           "description": this.state.openDescription,

    		 }

          var self = this;
    		 parm1 =  Object.assign({},parm1)


       API.post(GLOBAL.API_STRING.OPEN_INVOICE,parm1).then(function (response) {
         const json = JSON.parse(response)
         console.log(json.status);
        console.log(json);
         if(json.status)
         {
              setTimeout(() => {

                self.state.shareSelectedButton == "Payment Link" ?
                  self.setState({ shareURL: json.response.url }, () => {
                       self.shareApp();
                   })

                 :  self.setState({ shareOpenURL: json.response.url }, () => {
                 //  self.getDataURL()
                    self.generateQrcode();
                   })

            }, 300);
            self.callparentfunction()

         }
         else {

         }
       })
       .catch(function (error) {
         const errorjson = JSON.parse(error)
        // console.log('final :' + errorjson);
       console.log('final :' + errorjson.message);
         var message = ''
         if(errorjson.response != null)
         {
           if(errorjson.response.fixAmount != null)
           {
             message = errorjson.response.fixAmount[0]
           }
           else if(errorjson.response.expiryDate != null)
           {
             message = errorjson.response.expiryDate[0]
           }
           else if(errorjson.response.title != null)
           {
             message = errorjson.response.title[0]
           }
           else if(errorjson.response.minAmount != null)
           {
             message = errorjson.response.minAmount[0]
           }
           else if(errorjson.response.maxAmount != null)
           {
             message = errorjson.response.maxAmount[0]
           }

         }
         else {
           message = errorjson.message
         }
        self.setState({ showAlert: true,showAlertMessage : message});

       });


     }



     fetchdeliveryApi() {

         var attachment = {}
         var a = {  'mobileNumber' : this.state.mobileNumber}
         var b = { 'countryCode': this.state.tabselectedButton === "SMS" ||this.state.tabselectedButton === "WhatsApp" ? this.state.countryCode : ''}

         if(this.state.descriptionCarouselItems[this.state.descriptionActiveIndex] != null)
         {
           var fileUrl =  this.state.descriptionCarouselItems[this.state.descriptionActiveIndex][0]


           attachment = {

            "uri": Platform.OS === 'android' ? `${fileUrl.uri}` : fileUrl.uri,
            "type": fileUrl.type,
            "name": fileUrl.name,
          }
         }



        //console.log(utf8.encode(this.convertStringToByteArray(this.state.customerName)));


         var parm1 = {
           "merchantCode" : GLOBAL.MERCHANT_CODE,
           "referenceNumber": this.state.invoiceno,
           "customerName": this.state.customerName,
           "amount": this.state.amount,
           "invoiceType": this.state.tabselectedButton === "SMS" ? '1' : '0',
           "invoiceSubType" : this.state.tabselectedButton === "SMS" ? '0': this.state.tabselectedButton === "WhatsApp"  ? '1' :  this.state.tabselectedButton === "Email" ? '2' : '3',
           "knetFixedCharges": global.knetFixedCharges,
           "knetPercentageCharges": global.knetPercentageCharges,
           "mpgsFixedCharges": global.mpgsFixedCharges,
           "mpgsPercentageCharges": global.mpgsPercentageCharges,
           "knetChargesRemark": "Testing Knet Remark",
           "mpgsChargesRemark": "Testing Mpgs Remark",
           "serviceCharge": "0",
           "discount": "0",
           "description": this.state.description,
           "customerEmail": this.state.tabselectedButton === "Email" ? this.state.emailAddress : this.state.customerEmailAddress ,
           "itemsList": JSON.stringify(this.state.ProductArray),
           "deliveryPhone":this.state.mobileNumber,
           "deliveryBlock": this.state.AddressArray[0].block,
           "deliveryStreet":this.state.AddressArray[0].street,
           "deliveryHose": this.state.AddressArray[0].houseno,
           "deliveryCity":this.state.AddressArray[0].cityID,
           "jaddah" : this.state.AddressArray[0].jadda
         }

          var self = this;
         parm1 =  self.state.tabselectedButton === "SMS" || self.state.tabselectedButton === "WhatsApp"? Object.assign({},a,b,parm1) : Object.assign({},parm1)


       API.post(GLOBAL.API_STRING.DELICONAPI,
            parm1,
            {
              attachment :   Platform.OS === 'android' ? self.state.descriptionCarouselItems[self.state.descriptionActiveIndex] != null ? attachment : "" : attachment
            }
          ).then(function (response) {
         const json = JSON.parse(response)
         console.log(json.status);
        console.log(json);
         if(json.status)
         {
           self.setState({
            orderDeliveryFee : json.response.amount,
            orderDeliveryID : json.response.id,
            orderDeliveryDate : json.response.delivery_date,
            orderDeliveryTime : json.response.delivery_time,
            orderDropID : json.response.order_drop_id
          }, () => {

            setTimeout(() => {
               self.openPreviewModal();
         }, 300);

            })

         }
         else {
            self.setState({ showAlert: true,showAlertMessage : json.message});
         }
       })
       .catch(function (error) {

         console.log("LLLL L :" + error) ;
         const errorjson = JSON.parse(error)
        // console.log('final :' + errorjson);
       console.log('final :' + errorjson.message);
         var message = ''
         if(errorjson.response != null)
         {
           if(errorjson.response.amount != null)
           {
             message = errorjson.response.amount[0]
           }
           else if(errorjson.response.customerName != null)
           {
             message = errorjson.response.customerName[0]
           }
           else if(errorjson.response.customerEmail != null)
           {
             message = errorjson.response.customerEmail[0]
           }
           else if(errorjson.response.mobileNumber != null)
           {
             message = errorjson.response.mobileNumber[0]
           }
           else {
             message = errorjson.message
           }
         }
         else {
           message = errorjson.message
         }
        self.setState({ showAlert: true,showAlertMessage : message});

       });


     }


    handleChange(name) {
      //  let validNumber = /^[0-9]+(\.[0-9]{1,3})?$/;

      return (text) => {

          if(name == 'amount' || name == 'maxAmount' || name == 'minAmount' || name == 'fixedAmount')
          {
            this.setState({[name]:decimalthreeDigit(text) })

           }
           else {
             this.setState({[name]:text })
           }

        }
   }


   getDataURL() {
     this.svg.toDataURL(this.callback);
   }

   callback(dataURL) {
    // console.log(dataURL);


    Share.share({
        subject: 'Share Invoice',
        title: 'Share Invoice',
        message: 'Hesabe QR Code',
        url: `data:image/png;base64,${dataURL}`,

    }, {
        // Android only:
        dialogTitle: 'Hesabe Merchant App',
        // iOS only:
        excludedActivityTypes: []
    })

   }


generateQrcode()
{
   RNQRGenerator.generate({
  value: this.state.shareOpenURL, // required
  height: 200,
  width: 200,
  base64: false,            // default 'false'
  backgroundColor: 'black', // default GLOBAL.COLOR.WHITE
  color: GLOBAL.COLOR.WHITE,           // default 'black'
  fileName: 'My Profile',   // (optional), name of the image file to store in FileSystem.
  correctionLevel: 'L',     // default is 'H', also available 'M' and 'Q'.
})
  .then(response => {
    const { uri, width, height, base64 } = response;

    if(Platform.OS === 'android')
    {
      var shareOptions = {
        title: 'Share file',
        message: 'Hesabe QR Code',
        subject: 'Hesabe QR Code ',
        url: uri,
        failOnCancel: false,
      };

      Shared.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });

    }
    else
    {
    Share.share({
        subject: 'Share Invoice',
        title: 'Share Invoice',
      //  message: 'Hesabe QR Code',
        url: uri,

    }, {
        // Android only:
        dialogTitle: 'Hesabe Merchant App',
        // iOS only:
        excludedActivityTypes: []
    })
  }
    //this.setState({ imageUri: uri });

  })
  .catch(error => console.log('Cannot create QR code', error));
}


onPressAlertPositiveButton = () => {

  this.setState({showAlert: false}, () => {

  });


  };




  render(){




     // This is the same for all of the below, and
    // you probably won't need it except for debugging
    // in most cases.


      const isDarkMode = this.context === 'dark';
      //  console.log("LKLK : " + this.context);
    const screenWidth = Dimensions.get("window").width;
    const screenheight = Dimensions.get("window").height +200;


    //const arrayValue = this.props.example;

    return(
      <>
     <ScrollView nestedScrollEnabled={true} contentContainerStyle={{paddingBottom: 60}}
     style = {{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
      // ref={ref => { this.scrollView = ref }}
       ref={ref => { scrollView = ref }}
      onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
    //  onContentSizeChange={() => this.state.toolTipAddVisible == true ? this.scroll.scrollToEnd({animated: true}) :null}
     >

   	<View style={{ flex: 1,  backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,padding :10}}onStartShouldSetResponder={() => true}>




       <View style={{
         marginTop :0,
         marginLeft : 0,
         marginRight : 0,
         height : 60,
         shadowColor: GLOBAL.COLOR.LIGHTBLUE,
         shadowOffset: {
           width: 0,
           height: 7,
         },
         shadowOpacity: 0.1,
         shadowRadius: 9.11,
         borderRadius : 20,
         elevation: 10,
         backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,
         alignItems: 'center',
         justifyContent : 'space-evenly',
         flexDirection: "row",
         borderWidth : isDarkMode ? 1 : 0 ,
         borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
       }} >


       <TouchableOpacity
       style={{
         justifyContent: 'center',
         marginTop :0,
         marginLeft : 0,
         flexDirection: "row",
         borderRadius : 20,
         height : 50,
         alignItems : "center",
         fontSize : RFValue(17),
         backgroundColor : this.state.selectedButton === "Quick" ? GLOBAL.COLOR.LIGHTPURPLE : 'transparent',
         width : global.OrderDetailFlag == true ? '33%' : '40%'
       }}
      onPress={() => this.selectionOnPress("Quick")}

      >

       <Text style =  {{...styles.btnText,...{color : this.state.selectedButton === "Quick" ? '#867EBD':GLOBAL.COLOR.DARKGRAY}}}>{Localized.t('OpenInvoicePage.Quick')}</Text>
       </TouchableOpacity>

       <TouchableOpacity
       style={{
         justifyContent: 'center',
         marginTop :0,
         marginLeft : 0,
         flexDirection: "row",
         borderRadius : 20,
         height : 50,
         alignItems : "center",
         fontSize : RFValue(17),
         display : global.OrderDetailFlag == true ? null : 'none',
         backgroundColor : this.state.selectedButton === "OrderDetail" ? GLOBAL.COLOR.LIGHTPURPLE : 'transparent',
         width : '33%'
       }}
      onPress={() => this.selectionOnPress("OrderDetail")}

      >

       <Text style =  {{...styles.btnText,...{color : this.state.selectedButton === "OrderDetail" ? '#867EBD':GLOBAL.COLOR.DARKGRAY}}}>{"+" + Localized.t('OpenInvoicePage.Delivery')}</Text>
       </TouchableOpacity>

       <TouchableOpacity
       style={{
         justifyContent: 'center',
         marginTop :0,
         marginLeft : 15,
         flexDirection: "row",
         // padding : 10,
         borderRadius : 20,
         height : 50,
         alignItems : "center",
          fontSize : RFValue(17),
         backgroundColor : this.state.selectedButton === "Open" ? GLOBAL.COLOR.LIGHTPURPLE : 'transparent',
          width : global.OrderDetailFlag == true ? '33%' : '40%'
       }}
      onPress={() => this.selectionOnPress("Open")}

      >

       <Text style =  {{...styles.btnText,...{color : this.state.selectedButton === "Open" ? '#867EBD':GLOBAL.COLOR.DARKGRAY}}}>{Localized.t('OpenInvoicePage.Open')}</Text>
       </TouchableOpacity>

       </View>

        <View style={{ flex: 1,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,display : this.state.selectedButton === "Quick" ? this.state.showQuickInvoiceFlag == true ? null : 'none'
                         :  this.state.selectedButton === "OrderDetail" ? this.state.showOrderDetailInvoiceFlag == true ? null : 'none' : this.state.showOpenInvoiceFlag == true ? null : 'none',marginTop : 20}} >

       <CustomView hide={this.state.isQuickHidden}>

       <Tooltip
       animated={true}
       // (Optional) When true, tooltip will animate
       // in/out when showing/hiding
       arrowSize={{ width: 16, height: 8 }}
       // (Optional) Dimensions of arrow bubble pointing to
       // the highlighted element
       backgroundColor="rgba(0,0,0,0.5)"
       contentStyle = {{borderRadius : 15}}

       arrowStyle = {{marginLeft : 0}}
       // (Optional) Color of the fullscreen background
       isVisible={this.state.toolTipShareVisible}
       showChildInTooltip = {true}
       useReactNativeModal = {true}


       //(Must) When true, tooltip is displayed
       content={

         <View
         style={{
           justifyContent: 'space-between',
           marginTop :0,
           flexDirection: "column",
           //	padding : 15,
           //height : 40,
           //	alignItems : "center",
         }}>
         <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.ShareQuickInvoice')}</Text>
         <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',textAlign :'left',marginTop : 20,marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.ShareMessage')}</Text>



         <View style={{
           alignItems : 'center',
           marginTop :30,
           marginLeft : 0,
           flexDirection: "row",
           justifyContent:  'space-evenly' ,
           //  width : '100%',
         }}>

         <View style={{
           justifyContent: 'flex-start',

         }}>

         <CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
         />
         </View>

         <View style={{
           justifyContent: 'flex-end',
         }}>
         <CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('SyncContact')} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}
         />
         </View>
         </View>
         </View>


       }
       //(Must) This is the view displayed in the tooltip
       placement="bottom"
       //(Must) top, bottom, left, right, auto.
       //(Optional) Callback fired when the user taps the tooltip
       >

       <View
       style={{
         justifyContent: 'space-around',
         marginTop :0,
         flexDirection: "row",
         height : 60,
         padding : 0,
         width : '100%',
         alignItems : "center",
         backgroundColor :this.state.toolTipShareVisible == true ? GLOBAL.COLOR.WHITE : 'transparent',
         borderRadius : 15
       }}>
       <TouchableOpacity
       style={styles.button3}
       onPress={() => this.tabselectionOnPress("SMS")}>
       <Text style =  {{color : this.state.tabselectedButton === "SMS"
       ? GLOBAL.COLOR.ORANGE
       : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Sms')}</Text>
       <Image
       style={styles.icon1}
       source = { this.state.tabselectedButton === "SMS" ?
       rectImg :
       null} />
       </TouchableOpacity>
       <TouchableOpacity
       style={styles.button3}
       onPress={() => this.tabselectionOnPress("WhatsApp")}>
       <Text style =  {{color : this.state.tabselectedButton === "WhatsApp"
       ? GLOBAL.COLOR.ORANGE
       : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Whatsapp')}</Text>
       <Image
       style={styles.icon1}
       source = { this.state.tabselectedButton === "WhatsApp" ?
       rectImg :
       null} />
       </TouchableOpacity>
       <TouchableOpacity
       style={styles.button3}
       onPress={() =>this.tabselectionOnPress("Email")}>
       <Text style =  {{color : this.state.tabselectedButton === "Email"
       ? GLOBAL.COLOR.ORANGE
       : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Email')}</Text>
       <Image
       style={styles.icon1}
       source = { this.state.tabselectedButton === "Email" ?
       rectImg :
       null} />
       </TouchableOpacity>
       <TouchableOpacity
       style={styles.button3}
       onPress={() =>this.tabselectionOnPress("Url")}>
       <Text style =  {{color : this.state.tabselectedButton === "Url"
       ? GLOBAL.COLOR.ORANGE
       : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Url')}</Text>
       <Image
       style={styles.icon1}
       source = { this.state.tabselectedButton === "Url" ?
       rectImg :
       null} />
       </TouchableOpacity>
       </View>

       </Tooltip>


         <Form
              ref="form"
              onSubmit={this.state.previewFlag == true ? this.previewSubmit : this.quickSubmit}
          >
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.CustomerName')}</Text>
        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          marginLeft : 10,
          flexDirection: "row",
          alignItems : "center",
          height : 50,
        }} >
        <View style={{
          marginTop :0,
          marginLeft : 0,
          marginRight : 0,
          height : 50,
          width : '90%',
          shadowColor: GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderRadius : 15,
          elevation: 10,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          justifyContent : 'space-between',
          flexDirection: "row",
        }} >

          <TextValidator
                   style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                   name="customerName"
                   label="customerName"
                   validators={['required','matchRegexp:^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_ ]*$']}
                   errorMessages={[ Localized.t('TextValidationPage.Customernamefieldisrequired'),Localized.t('TextValidationPage.Entervalidcustomername'),'']}
                   placeholder={Localized.t('OpenInvoicePage.CustomerName')}
                   placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                   type="text"
                   keyboardType="email-address"
                   value={this.state.customerName}
                   onChangeText={this.handleChange('customerName')}
                   onSubmitEditing={() => {this.state.tabselectedButton === "Email" ? this.emailTextInput.focus() : this.state.tabselectedButton === "Url" ? this.customerEmailTextInput.focus() : this.secondTextInput.focus();}}
                   blurOnSubmit={true}
                   returnKeyType="next"
                   multiline = {true}
                   numberOfLines={4}
                   multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY ,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                   maxLength={50}
                   errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
           />

        </View>

        <Tooltip
        animated={true}
        // (Optional) When true, tooltip will animate
        // in/out when showing/hiding
        arrowSize={{ width: 16, height: 8 }}
        // (Optional) Dimensions of arrow bubble pointing to
        // the highlighted element
        backgroundColor="rgba(0,0,0,0.5)"
        contentStyle = {{borderRadius : 15}}

        arrowStyle = {{marginLeft : 0}}
        // (Optional) Color of the fullscreen background
        isVisible={this.state.toolTipContactVisible}
        showChildInTooltip = {true}
        // allowChildInteraction =  {true}
        //useReactNativeModal = {true}
        //(Must) When true, tooltip is displayed
        content={

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :0,
            flexDirection: "column",
            //	padding : 15
            //height : 40,
            //	alignItems : "center",
          }}>
          <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.SyncyourContactList')}</Text>
          <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.SyncContactMessage')}</Text>


          <View style={{
            alignItems : 'center',
            marginTop :30,
            marginLeft : 0,
            flexDirection: "row",
            justifyContent:  'space-evenly' ,
            //  width : '100%',
          }}>

          <View style={{
            justifyContent: 'flex-start',

          }}>

          <CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
          />
          </View>

          <View style={{
            justifyContent: 'flex-end',
          }}>
          <CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('AttachFiles')} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}


          />
          </View>
          </View>
          </View>


        }
        //(Must) This is the view displayed in the tooltip
        placement="bottom"
        //(Must) top, bottom, left, right, auto.
        //(Optional) Callback fired when the user taps the tooltip
        >
        <View style = {{backgroundColor : this.state.toolTipContactVisible == true ? GLOBAL.COLOR.WHITE : 'transparent'  ,borderRadius : 5,width : 30,height : 30,padding : 4}}>
        <TouchableOpacity
        onPress={() => this.openModal()}
        >
        <Image  source={require('./Assest/contact.png')} style = {{tintColor : this.state.toolTipContactVisible == true ? GLOBAL.COLOR.DARKBLUE : GLOBAL.COLOR.DARKGRAY}} />
        </TouchableOpacity>
        </View>
        </Tooltip>

        </View>


        <View
         style = {{  display : this.state.tabselectedButton === "SMS" ||  this.state.tabselectedButton === "WhatsApp" ? null : 'none', ...(Platform.OS !== 'android' && {
          zIndex: 99999
        })}}
        >
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.MobileNumber')}</Text>


        <View style={{
          marginTop :0,
          marginLeft : 10,
          marginRight : 0,
          height : 50,
        /*  shadowColor: GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderRadius : 10,
          backgroundColor : GLOBAL.COLOR.WHITE,
          elevation: 10,*/
          alignItems: 'center',
          flexDirection: "row",

        //  zIndex :10

        ...Platform.select({
        ios: {
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
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          elevation: 10,
          alignItems: 'center',
          flexDirection: "row",
          borderWidth : isDarkMode ? 1 : 0,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
           zIndex :10
        },
        android: {
          marginTop :0,
          marginLeft : 10,
          marginRight : 0,
          height : 50,
        /*  shadowColor: GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderRadius : 10,
          backgroundColor : GLOBAL.COLOR.WHITE,
          elevation: 10,*/
          alignItems: 'center',
          flexDirection: "row",
        //  zIndex :10
        },
    }),
        }} >


        <View style = {{display : this.state.tabselectedButton === "WhatsApp" ? null : null}}>
      {  <DropDownPicker
        onOpen={() => { Keyboard.dismiss(), this.setState({

         topContraint: Platform.OS === "android" ? 300 :0,
       })   }}

       onClose={() => this.setState({

        topContraint: Platform.OS === "android" ? 0 :0,
      }) }
        items={this.state.tabselectedButton === "WhatsApp" ? this.state.whatsappCountryList : this.state.countryList}
        defaultValue={this.state.countryCode}
       //inputContainerStyle={{ backgroundColor: GLOBAL.COLOR.BLACK}}
       placeholder = {Localized.t('DashboardPage.Search')}
       underlineColor= 'transparent'
       dropDownStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,width : 100}}
       containerStyle={{height: isDarkMode ? 40 : 50,marginTop : 0,width : 100,marginLeft : 5}}
    //  arrowStyle={{backgroundColor : isDarkMode ? GLOBAL.COLOR.WHITE :  'transparent'}}
      arrowColor={ isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
      arrowStyle = {{height : 20,width : 20,alignItems : 'center'}}
      arrowSize = {20}
       style={{borderColor:"transparent",backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE}}
        itemStyle={{
        justifyContent: 'center',
      }}

       labelStyle={{
       color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular',
      }}

      onChangeItem={item =>

        this.setState({

         countryCode: item.value,
       })}

       dropDownMaxHeight={150}
       searchable={true}
       searchablePlaceholder = {Localized.t('DashboardPage.Search')}
       searchablePlaceholderTextColor= {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
       searchableStyle={{textAlign : 'center'}}
       searchableError={() => <Text>  {Localized.t('CommanTabPage.No Data Found')}</Text>}
      />}
      </View>


      <View
      style={{
        backgroundColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.SHADEGRAY,
        width : 2,

        height : '60%',
        display : this.state.tabselectedButton === "WhatsApp" ? null : null
      }}>
      </View>


      <View style = {{...Platform.select({
        ios: {
            //
        },
        android: {
          marginLeft : 10,
          shadowColor: GLOBAL.COLOR.LIGHTBLUE,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.1,
          shadowRadius: 9.11,
          borderRadius : 15,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          elevation: 10,
          //alignItems: 'center',
          width : Platform.OS === "android" ? screenWidth - 145 : '72%'
        },
    })
  }}>
      <TextValidator
               style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : Platform.OS === "android" ? 5 : 20,width : Platform.OS === "android" ? '100%' :screenWidth*.8 ,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
               name="mobileNumber"
               label="mobileNumber"
               placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
               validators={this.state.tabselectedButton === "SMS" || this.state.tabselectedButton === "URL" || this.state.tabselectedButton === "WhatsApp" ? ['required','matchRegexp:^[1-9][0-9]{7,15}$'] : []}
               errorMessages={[Localized.t('TextValidationPage.MobileNumberfieldisrequired'), Localized.t('TextValidationPage.Entervalidmobilenumber')]}
               errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: Platform.OS === "android" ? 20:10},'text': { color: GLOBAL.COLOR.RED}}}
               placeholder= {Localized.t('OpenInvoicePage.MobileNumber')}
               type="MobileNumber"
               keyboardType="numeric"
               value={this.state.mobileNumber}
              maxLength={15}
               onChangeText={this.handleChange('mobileNumber')}
                 ref={(r) => this.secondTextInput = r}

       />
       </View>
      </View>



      </View>



      <View
       style = {{  display : this.state.tabselectedButton === "Email" ? null : 'none'}}
      >
      <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.CustomerEmailAddress')}</Text>

      <View style={{
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
        backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
        borderWidth : isDarkMode ? 1 : 0 ,
        borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
      }} >

      <TextValidator
               style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
               name="EmailAddress"
               label="EmailAddress"
               validators= {this.state.tabselectedButton === "Email" ? ['required','isEmail'] : []}
               errorMessages={[Localized.t('TextValidationPage.Emailfieldisrequired'), Localized.t('TextValidationPage.Entervalidemail')]}
               errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
               placeholder={Localized.t('OpenInvoicePage.CustomerEmailAddress')}
               placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
               type="EmailAddress"
               keyboardType="email-address"
               value={this.state.emailAddress}
               onChangeText={this.handleChange('emailAddress')}
               ref={(input) => { this.emailTextInput = input; }}
               onSubmitEditing={() => { this.thirdTextInput.focus(); }}
               returnKeyType="next"
               maxLength={50}
               blurOnSubmit={true}
               multiline = {true}
               numberOfLines={4}
               multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY ,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
       />
      </View>
      </View>


         <View
          style = {{display : this.state.tabselectedButton === "Email" ? 'none' : null,marginTop : this.state.tabselectedButton === "Email" || this.state.tabselectedButton === "Url" ? 0 : this.state.topContraint}}
         >
         <View  style={{ flexDirection: "row",alignItems : 'center'}}>
         <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.CustomerEmailAddress')}</Text>
           <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
         </View>

         <View style={{
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
           borderWidth : isDarkMode ? 1 : 0,
           borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
           backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
           alignItems: 'center',
           flexDirection: "row",
           justifyContent: 'space-between',
         }} >

         <TextValidator
                  style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                  name="CustomerEmailAddress"
                  label="CustomerEmailAddress"
                  validators={['isEmail']}
                  errorMessages={[ Localized.t('TextValidationPage.Entervalidemail')]}
                  errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                  placeholder={Localized.t('OpenInvoicePage.CustomerEmailAddress')}
                  placeholderTextColor = { isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY }
                  type="CustomerEmailAddress"
                  keyboardType="email-address"
                  value={this.state.customerEmailAddress}
                  onChangeText={this.handleChange('customerEmailAddress')}
                  ref={(input) => { this.customerEmailTextInput = input; }}
                  onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                  returnKeyType="next"
                  maxLength={50}
                 blurOnSubmit={true}
                 multiline = {true}
                 numberOfLines={4}
                 multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY, maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
          />
         </View>
         </View>



        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.PaymentAmount')}</Text>
        <View style={{
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
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE ,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',
        }} >

         <TextValidator
                  style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:10,width :screenWidth*.7, textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                  name="Amount"
                  label="Amount"
                  validators={['required','matchRegexp:^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$']}
                  errorMessages={[Localized.t('TextValidationPage.Amountfieldisrequired'), Localized.t('TextValidationPage.Entervalidamount')]}
                  errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                  placeholder="0.000"
                  placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.DARKGRAY}
                  type="Amount"
                  keyboardType="numeric"
                  value={this.state.amount}
                  onChangeText={this.handleChange('amount')}
                  ref={(input) => { this.thirdTextInput = input; }}
                  onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                  returnKeyType="next"
                   maxLength={50}
                 blurOnSubmit={false}
                 editable  =  {this.state.ProductArray.length != 0 ? false : true}
                 selectTextOnFocus={this.state.ProductArray.length != 0 ? false : true}

          />

        <View style={{flexDirection: "row",justifyContent: 'space-between'}}>
        <View
        style={{
          backgroundColor : GLOBAL.COLOR.SHADEGRAY,
          width : 2,
          //height : '100%',
        }}>
        </View>

          <Text style =  {{color : GLOBAL.COLOR.ORANGE,marginLeft : 20,fontFamily : 'Prompt-SemiBold',fontSize :  RFValue(17),marginRight : 10}}>KWD</Text>
        </View>

       </View>


       <View  style={{ flexDirection: "row",alignItems : 'center'}}>
       <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Invoice') + ' #'}</Text>
         <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
       </View>


       <View style={{
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
         borderWidth : isDarkMode ? 1 : 0 ,
         borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
         backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
         alignItems: 'center',
         justifyContent : 'space-between',
         flexDirection: "row",
       }} >
       <TextValidator
                style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                name="InvoiceNo"
                label="InvoiceNo"
                validators={[]}
                errorMessages={[]}
                errorStyle = {{'container': { top:Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                placeholder={ Localized.t('OpenInvoicePage.InvoiceNo')}
                placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                type="InvoiceNo"
                keyboardType="email-address"
                value={this.state.invoiceno}
                onChangeText={this.handleChange('invoiceno')}
                returnKeyType="next"
                blurOnSubmit={false}
                ref={(input) => { this.fourthTextInput = input; }}
                onSubmitEditing={() => { this.fifthTextInput.focus(); }}
              //  multiline={true}
                maxLength={25}
        />
       </View>


        <View  style={{ flexDirection: "row",alignItems : 'center'}}>
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Description')}</Text>
          <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
        </View>
        <View
        style={{
          justifyContent: 'space-between',
          marginTop :0,
          marginLeft : 10,
          flexDirection: "row",
        //  alignItems : "center",
          //height : 70,
        }} >


        <View style={{
          marginTop :0,
          marginLeft : 0,
          marginRight : 0,
          height : 50,
          width : '100%',
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
                 style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                 name="Description"
                 label="Description"
                 validators={[]}
                 errorMessages={[]}
                 errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                 placeholder={ Localized.t('OpenInvoicePage.Addyourdescription')}
                 placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                 type="Description"
                 keyboardType="email-address"
                 value={this.state.description}
                 onChangeText={this.handleChange('description')}
                 ref={(input) => { this.fifthTextInput = input; }}
                 returnKeyType="next"
                blurOnSubmit={true}
                maxLength={250}
                multiline = {true}
                numberOfLines={4}
                multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY, maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
         />

        </View>
        <Tooltip
        animated={true}
        // (Optional) When true, tooltip will animate
        // in/out when showing/hiding
        arrowSize={{ width: 16, height: 8 }}
        // (Optional) Dimensions of arrow bubble pointing to
        // the highlighted element
        backgroundColor="rgba(0,0,0,0.5)"
        contentStyle = {{borderRadius : 15}}

        arrowStyle = {{marginLeft : 0}}
        // (Optional) Color of the fullscreen background
        isVisible = {this.state.toolTipAttachVisible}
        showChildInTooltip = {true}
        allowChildInteraction = {false}

        //useReactNativeModal = {false}
        //(Must) When true, tooltip is displayed
        content={

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :0,
            flexDirection: "column",
            //	padding : 15
            //height : 40,
            //	alignItems : "center",
          }}>
          <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.AttachFiles')}</Text>
          <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.AttachFileMessage')}</Text>



          <View style={{
            alignItems : 'center',
            marginTop :30,
            marginLeft : 0,
            flexDirection: "row",
            justifyContent:  'space-evenly' ,
            //  width : '100%',
          }}>

          <View style={{
            justifyContent: 'flex-start',

          }}>

          <CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
          />
          </View>

          <View style={{
            justifyContent: 'flex-end',
          }}>


          <CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => {this.toggleToolTipModal('AddProducts')}} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}
          />
          </View>
          </View>
          </View>


        }
        //(Must) This is the view displayed in the tooltip
        placement="top"
        //(Must) top, bottom, left, right, auto.
        //(Optional) Callback fired when the user taps the tooltip
        >
        <View style = {{backgroundColor : this.state.toolTipAttachVisible == true ? GLOBAL.COLOR.WHITE : 'transparent',justifyContent : 'center',alignItems : 'center',width : 30 ,height :35,borderRadius : 5,display : 'none'}}>
        <TouchableOpacity
        style = {{marginTop : this.state.toolTipAttachVisible == true ? 5 : 15}}
        onPress={() => this.selectMultipleFile()}>
        <Image  source={require('./Assest/addFiles.png')} style = {{tintColor : this.state.toolTipAttachVisible == true ? GLOBAL.COLOR.DARKBLUE : GLOBAL.COLOR.DARKGRAY ,backgroundColor : this.state.toolTipAttachVisible == true ? GLOBAL.COLOR.WHITE : 'transparent'}}/>
        </TouchableOpacity>
        </View>
       </Tooltip>

        </View>


        <View style={{flexDirection:'column', justifyContent: 'center',marginTop : 10,display : this.state.descriptionCarouselItems[this.state.descriptionActiveIndex] != null ? null  : 'none'}}>
            <Carousel activeSlideAlignment='start'
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.state.descriptionCarouselItems}
              sliderWidth={380}
              itemWidth={200}
              renderItem={this._renderDescriptionItem}
              scrollEnabled={true}
              onSnapToItem = { index => this.setState({descriptionActiveIndex:index}) } />

        </View>

        </Form>




        <View  style={{ flexDirection: "row",alignItems : 'center'}}>
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Product')}</Text>
          <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
        </View>


        <Tooltip
        animated={true}
        // (Optional) When true, tooltip will animate
        // in/out when showing/hiding
        arrowSize={{ width: 16, height: 8 }}
        // (Optional) Dimensions of arrow bubble pointing to
        // the highlighted element
        backgroundColor="rgba(0,0,0,0.5)"
        contentStyle = {{borderRadius : 15}}

        arrowStyle = {{marginLeft : 0}}
        // (Optional) Color of the fullscreen background
        isVisible={this.state.toolTipAddVisible}
        showChildInTooltip = {true}
        allowChildInteraction = {false}

        //useReactNativeModal = {false}
        //(Must) When true, tooltip is displayed
        content={

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :0,
            flexDirection: "column",
              //padding : 15
            //height : 40,
            //	alignItems : "center",
          }}>
          <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.AddProducts')}</Text>
          <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.AddProductMessage')}</Text>



          <View style={{
            alignItems : 'center',
            marginTop :30,
            marginLeft : 0,
            flexDirection: "row",
            justifyContent:  'space-evenly' ,
            //  width : '100%',
          }}>

          <View style={{
            justifyContent: 'flex-start',

          }}>

          <CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
          />
          </View>

          <View style={{
            justifyContent: 'flex-end',
          }}>
          <CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('PreviewInvoice')} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}
          />
          </View>
          </View>
          </View>


        }
        //(Must) This is the view displayed in the tooltip
        placement="top"
        //(Must) top, bottom, left, right, auto.
        //(Optional) Callback fired when the user taps the tooltip
        >
        <View style={{
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
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',
        }} >

        <TouchableOpacity
          style = {{justifyContent: 'space-between',  width : '100%',  height : 50,alignItems : 'center',flexDirection : 'row'}}
        onPress={() => {
        this.toggleProductModal(!this.state.productVisible)}}>
        <View style = {{justifyContent : 'flex-start',width : '70%'}}>
        <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,textAlign : 'left',fontFamily : 'Prompt-Regular',fontSize : RFValue(15),marginLeft : 10}}>{Localized.t('OpenInvoicePage.Addyourproduct')} </Text>
        </View>

        <View style = {{alignItems : 'flex-end',marginRight :0,width : '30%'}}>
        <Image style = {{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginRight : this.state.toolTipAddVisible == true ? 5 : 10}} source={global.selectValue == 'en' ?   require('./Assest/rightArrow1.png') :require('./Assest/leftArrow1.png')}/>
        </View>
        </TouchableOpacity>



        </View>
         </Tooltip>


         </CustomView>

         <CustomView hide={this.state.isOrderDetailHidden}>

         <View
         style={{
           justifyContent: 'space-around',
           marginTop :0,
           flexDirection: "row",
           height : 60,
           padding : 0,
           width : '100%',
           alignItems : "center",
           backgroundColor :this.state.toolTipShareVisible == true ? GLOBAL.COLOR.WHITE : 'transparent',
           borderRadius : 15
         }}>
         <TouchableOpacity
         style={styles.button3}
         onPress={() => this.tabselectionOnPress("SMS")}>
         <Text style =  {{color : this.state.tabselectedButton === "SMS"
         ? GLOBAL.COLOR.ORANGE
         : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Sms')}</Text>
         <Image
         style={styles.icon1}
         source = { this.state.tabselectedButton === "SMS" ?
         rectImg :
         null} />
         </TouchableOpacity>
         <TouchableOpacity
         style={styles.button3}
         onPress={() => this.tabselectionOnPress("WhatsApp")}>
         <Text style =  {{color : this.state.tabselectedButton === "WhatsApp"
         ? GLOBAL.COLOR.ORANGE
         : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Whatsapp')}</Text>
         <Image
         style={styles.icon1}
         source = { this.state.tabselectedButton === "WhatsApp" ?
         rectImg :
         null} />
         </TouchableOpacity>
         <TouchableOpacity
         style={styles.button3}
         onPress={() =>this.tabselectionOnPress("Email")}>
         <Text style =  {{color : this.state.tabselectedButton === "Email"
         ? GLOBAL.COLOR.ORANGE
         : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Email')}</Text>
         <Image
         style={styles.icon1}
         source = { this.state.tabselectedButton === "Email" ?
         rectImg :
         null} />
         </TouchableOpacity>
         <TouchableOpacity
         style={styles.button3}
         onPress={() =>this.tabselectionOnPress("Url")}>
         <Text style =  {{color : this.state.tabselectedButton === "Url"
         ? GLOBAL.COLOR.ORANGE
         : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Url')}</Text>
         <Image
         style={styles.icon1}
         source = { this.state.tabselectedButton === "Url" ?
         rectImg :
         null} />
         </TouchableOpacity>
         </View>


           <Form
                ref="form"
                onSubmit={this.state.previewFlag == true ? this.previewSubmit : this.quickSubmit}
            >
          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.CustomerName')}</Text>
          <View
          style={{
            justifyContent: 'space-between',
            marginTop :0,
            marginLeft : 10,
            flexDirection: "row",
            alignItems : "center",
            height : 50,
          }} >
          <View style={{
            marginTop :0,
            marginLeft : 0,
            marginRight : 0,
            height : 50,
            width : '90%',
            shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderRadius : 15,
            elevation: 10,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            borderWidth : isDarkMode ? 1 : 0 ,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
            alignItems: 'center',
            justifyContent : 'space-between',
            flexDirection: "row",
          }} >

            <TextValidator
                     style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                     name="customerName"
                     label="customerName"
                     validators={['required','matchRegexp:^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_ ]*$']}
                     errorMessages={[ Localized.t('TextValidationPage.Customernamefieldisrequired'),Localized.t('TextValidationPage.Entervalidcustomername'),'']}
                     placeholder={Localized.t('OpenInvoicePage.CustomerName')}
                     placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                     type="text"
                     keyboardType="email-address"
                     value={this.state.customerName}
                     onChangeText={this.handleChange('customerName')}
                     onSubmitEditing={() => {this.state.tabselectedButton === "Email" ? this.emailTextInput.focus() : this.state.tabselectedButton === "Url" ? this.customerEmailTextInput.focus() : this.secondTextInput.focus();}}
                     blurOnSubmit={true}
                     returnKeyType="next"
                     multiline = {true}
                     numberOfLines={4}
                     multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY ,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                     maxLength={50}
                     errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
             />

          </View>


          <View style = {{backgroundColor : this.state.toolTipContactVisible == true ? GLOBAL.COLOR.WHITE : 'transparent'  ,borderRadius : 5,width : 30,height : 30,padding : 4}}>
          <TouchableOpacity
          onPress={() => this.openModal()}
          >
          <Image  source={require('./Assest/contact.png')} style = {{tintColor : this.state.toolTipContactVisible == true ? GLOBAL.COLOR.DARKBLUE : GLOBAL.COLOR.DARKGRAY}} />
          </TouchableOpacity>
          </View>

          </View>


          <View
           style = {{  display :  null , ...(Platform.OS !== 'android' && {
            zIndex: 99999
          })}}
          >
          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.MobileNumber')}</Text>


          <View style={{
            marginTop :0,
            marginLeft : 10,
            marginRight : 0,
            height : 50,
          /*  shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderRadius : 10,
            backgroundColor : GLOBAL.COLOR.WHITE,
            elevation: 10,*/
            alignItems: 'center',
            flexDirection: "row",

          //  zIndex :10

          ...Platform.select({
          ios: {
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
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            elevation: 10,
            alignItems: 'center',
            flexDirection: "row",
            borderWidth : isDarkMode ? 1 : 0,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
             zIndex :10
          },
          android: {
            marginTop :0,
            marginLeft : 10,
            marginRight : 0,
            height : 50,
          /*  shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderRadius : 10,
            backgroundColor : GLOBAL.COLOR.WHITE,
            elevation: 10,*/
            alignItems: 'center',
            flexDirection: "row",
          //  zIndex :10
          },
      }),
          }} >


          <View style = {{display : this.state.tabselectedButton === "WhatsApp" ? null : null}}>
        {  <DropDownPicker
          onOpen={() => { Keyboard.dismiss(), this.setState({

           topContraint: Platform.OS === "android" ? 300 :0,
         })   }}

         onClose={() => this.setState({

          topContraint: Platform.OS === "android" ? 0 :0,
        }) }
          items={this.state.tabselectedButton === "WhatsApp" ? this.state.whatsappCountryList : this.state.countryList}
          defaultValue={this.state.countryCode}
         //inputContainerStyle={{ backgroundColor: GLOBAL.COLOR.BLACK}}
         placeholder = {Localized.t('DashboardPage.Search')}
         underlineColor= 'transparent'
         dropDownStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,width : 100}}
         containerStyle={{height: isDarkMode ? 40 : 50,marginTop : 0,width : 100,marginLeft : 5}}
      //  arrowStyle={{backgroundColor : isDarkMode ? GLOBAL.COLOR.WHITE :  'transparent'}}
        arrowColor={ isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
        arrowStyle = {{height : 20,width : 20,alignItems : 'center'}}
        arrowSize = {20}
         style={{borderColor:"transparent",backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE}}
          itemStyle={{
          justifyContent: 'center',
        }}

         labelStyle={{
         color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular',
        }}

        onChangeItem={item =>

          this.setState({

           countryCode: item.value,
         })}

         dropDownMaxHeight={150}
         searchable={true}
         searchablePlaceholder = {Localized.t('DashboardPage.Search')}
         searchablePlaceholderTextColor= {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
         searchableStyle={{textAlign : 'center'}}
         searchableError={() => <Text>  {Localized.t('CommanTabPage.No Data Found')}</Text>}
        />}
        </View>


        <View
        style={{
          backgroundColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.SHADEGRAY,
          width : 2,

          height : '60%',
          display : this.state.tabselectedButton === "WhatsApp" ? null : null
        }}>
        </View>


        <View style = {{...Platform.select({
          ios: {
              //
          },
          android: {
            marginLeft : 10,
            shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderRadius : 15,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            elevation: 10,
            //alignItems: 'center',
            width : Platform.OS === "android" ? screenWidth - 145 : '72%'
          },
      })
    }}>
        <TextValidator
                 style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : Platform.OS === "android" ? 5 : 20,width : Platform.OS === "android" ? '100%' :screenWidth*.8 ,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                 name="mobileNumber"
                 label="mobileNumber"
                 placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                 validators={ ['required','matchRegexp:^[1-9][0-9]{7,15}$']}
                 errorMessages={[Localized.t('TextValidationPage.MobileNumberfieldisrequired'), Localized.t('TextValidationPage.Entervalidmobilenumber')]}
                 errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: Platform.OS === "android" ? 20:10},'text': { color: GLOBAL.COLOR.RED}}}
                 placeholder= {Localized.t('OpenInvoicePage.MobileNumber')}
                 type="MobileNumber"
                 keyboardType="numeric"
                 value={this.state.mobileNumber}
                maxLength={15}
                 onChangeText={this.handleChange('mobileNumber')}
                   ref={(r) => this.secondTextInput = r}

         />
         </View>
        </View>



        </View>



        <View
         style = {{  display : this.state.tabselectedButton === "Email" ? null : 'none'}}
        >
        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.CustomerEmailAddress')}</Text>

        <View style={{
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
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          borderWidth : isDarkMode ? 1 : 0 ,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
          alignItems: 'center',
          flexDirection: "row",
          justifyContent: 'space-between',
        }} >

        <TextValidator
                 style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                 name="EmailAddress"
                 label="EmailAddress"
                 validators= {this.state.tabselectedButton === "Email" ? ['required','isEmail'] : []}
                 errorMessages={[Localized.t('TextValidationPage.Emailfieldisrequired'), Localized.t('TextValidationPage.Entervalidemail')]}
                 errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                 placeholder={Localized.t('OpenInvoicePage.CustomerEmailAddress')}
                 placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                 type="EmailAddress"
                 keyboardType="email-address"
                 value={this.state.emailAddress}
                 onChangeText={this.handleChange('emailAddress')}
                 ref={(input) => { this.emailTextInput = input; }}
                 onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                 returnKeyType="next"
                 maxLength={50}
                 blurOnSubmit={true}
                 multiline = {true}
                 numberOfLines={4}
                 multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY ,maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
         />
        </View>
        </View>


           <View
            style = {{display : this.state.tabselectedButton === "Email" ? 'none' : null,marginTop : this.state.tabselectedButton === "Email" || this.state.tabselectedButton === "Url" ? 0 : this.state.topContraint}}
           >
           <View  style={{ flexDirection: "row",alignItems : 'center'}}>
           <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.CustomerEmailAddress')}</Text>
             <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
           </View>

           <View style={{
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
             borderWidth : isDarkMode ? 1 : 0,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
           }} >

           <TextValidator
                    style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft : 10,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                    name="CustomerEmailAddress"
                    label="CustomerEmailAddress"
                    validators={['isEmail']}
                    errorMessages={[ Localized.t('TextValidationPage.Entervalidemail')]}
                    errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                    placeholder={Localized.t('OpenInvoicePage.CustomerEmailAddress')}
                    placeholderTextColor = { isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY }
                    type="CustomerEmailAddress"
                    keyboardType="email-address"
                    value={this.state.customerEmailAddress}
                    onChangeText={this.handleChange('customerEmailAddress')}
                    ref={(input) => { this.customerEmailTextInput = input; }}
                    onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                    returnKeyType="next"
                    maxLength={50}
                   blurOnSubmit={true}
                   multiline = {true}
                   numberOfLines={4}
                   multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY, maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
            />
           </View>
           </View>



          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.PaymentAmount')}</Text>
          <View style={{
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
            borderWidth : isDarkMode ? 1 : 0 ,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE ,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            alignItems: 'center',
            flexDirection: "row",
            justifyContent: 'space-between',
          }} >

           <TextValidator
                    style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:10,width :screenWidth*.7, textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                    name="Amount"
                    label="Amount"
                    validators={['required','matchRegexp:^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$']}
                    errorMessages={[Localized.t('TextValidationPage.Amountfieldisrequired'), Localized.t('TextValidationPage.Entervalidamount')]}
                    errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                    placeholder="0.000"
                    placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.DARKGRAY}
                    type="Amount"
                    keyboardType="numeric"
                    value={this.state.amount}
                    onChangeText={this.handleChange('amount')}
                    ref={(input) => { this.thirdTextInput = input; }}
                    onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                    returnKeyType="next"
                     maxLength={50}
                   blurOnSubmit={false}
                   editable  =  {this.state.ProductArray.length != 0 ? false : true}
                   selectTextOnFocus={this.state.ProductArray.length != 0 ? false : true}

            />

          <View style={{flexDirection: "row",justifyContent: 'space-between'}}>
          <View
          style={{
            backgroundColor : GLOBAL.COLOR.SHADEGRAY,
            width : 2,
            //height : '100%',
          }}>
          </View>

            <Text style =  {{color : GLOBAL.COLOR.ORANGE,marginLeft : 20,fontFamily : 'Prompt-SemiBold',fontSize :  RFValue(17),marginRight : 10}}>KWD</Text>
          </View>

         </View>


         <View  style={{ flexDirection: "row",alignItems : 'center'}}>
         <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Invoice') + ' #'}</Text>
           <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
         </View>


         <View style={{
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
           borderWidth : isDarkMode ? 1 : 0 ,
           borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
           backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
           alignItems: 'center',
           justifyContent : 'space-between',
           flexDirection: "row",
         }} >
         <TextValidator
                  style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                  name="InvoiceNo"
                  label="InvoiceNo"
                  validators={[]}
                  errorMessages={[]}
                  errorStyle = {{'container': { top:Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                  placeholder={ Localized.t('OpenInvoicePage.InvoiceNo')}
                  placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                  type="InvoiceNo"
                  keyboardType="email-address"
                  value={this.state.invoiceno}
                  onChangeText={this.handleChange('invoiceno')}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  ref={(input) => { this.fourthTextInput = input; }}
                  onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                //  multiline={true}
                  maxLength={25}
          />
         </View>


          <View  style={{ flexDirection: "row",alignItems : 'center'}}>
          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Description')}</Text>
            <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
          </View>
          <View
          style={{
            justifyContent: 'space-between',
            marginTop :0,
            marginLeft : 10,
            flexDirection: "row",
          //  alignItems : "center",
            //height : 70,
          }} >


          <View style={{
            marginTop :0,
            marginLeft : 0,
            marginRight : 0,
            height : 50,
            width : '100%',
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
                   style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                   name="Description"
                   label="Description"
                   validators={[]}
                   errorMessages={[]}
                   errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                   placeholder={ Localized.t('OpenInvoicePage.Addyourdescription')}
                   placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                   type="Description"
                   keyboardType="email-address"
                   value={this.state.description}
                   onChangeText={this.handleChange('description')}
                   ref={(input) => { this.fifthTextInput = input; }}
                   returnKeyType="next"
                  blurOnSubmit={true}
                  maxLength={250}
                  multiline = {true}
                  numberOfLines={4}
                  multiline style={{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY, maxHeight: 80,marginLeft : 10,width : screenWidth*.8,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
           />

          </View>

          <View style = {{backgroundColor : this.state.toolTipAttachVisible == true ? GLOBAL.COLOR.WHITE : 'transparent',justifyContent : 'center',alignItems : 'center',width : 30 ,height :35,borderRadius : 5,display : 'none'}}>
          <TouchableOpacity
          style = {{marginTop : this.state.toolTipAttachVisible == true ? 5 : 15}}
          onPress={() => this.selectMultipleFile()}>
          <Image  source={require('./Assest/addFiles.png')} style = {{tintColor : this.state.toolTipAttachVisible == true ? GLOBAL.COLOR.DARKBLUE : GLOBAL.COLOR.DARKGRAY ,backgroundColor : this.state.toolTipAttachVisible == true ? GLOBAL.COLOR.WHITE : 'transparent'}}/>
          </TouchableOpacity>
          </View>


          </View>


          <View style={{flexDirection:'column', justifyContent: 'center',marginTop : 10,display : this.state.descriptionCarouselItems[this.state.descriptionActiveIndex] != null ? null  : 'none'}}>
              <Carousel activeSlideAlignment='start'
                layout={"default"}
                ref={ref => this.carousel = ref}
                data={this.state.descriptionCarouselItems}
                sliderWidth={380}
                itemWidth={200}
                renderItem={this._renderDescriptionItem}
                scrollEnabled={true}
                onSnapToItem = { index => this.setState({descriptionActiveIndex:index}) } />

          </View>

          </Form>




          <View  style={{ flexDirection: "row",alignItems : 'center'}}>
          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Product')}</Text>
            <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
          </View>



          <View style={{
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
            borderWidth : isDarkMode ? 1 : 0 ,
            borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            alignItems: 'center',
            flexDirection: "row",
            justifyContent: 'space-between',
          }} >

          <TouchableOpacity
            style = {{justifyContent: 'space-between',  width : '100%',  height : 50,alignItems : 'center',flexDirection : 'row'}}
          onPress={() => {
          this.toggleProductModal(!this.state.productVisible)}}>
          <View style = {{justifyContent : 'flex-start',width : '70%'}}>
          <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,textAlign : 'left',fontFamily : 'Prompt-Regular',fontSize : RFValue(15),marginLeft : 10}}>{Localized.t('OpenInvoicePage.Addyourproduct')} </Text>
          </View>

          <View style = {{alignItems : 'flex-end',marginRight :0,width : '30%'}}>
          <Image style = {{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginRight : this.state.toolTipAddVisible == true ? 5 : 10}} source={global.selectValue == 'en' ?   require('./Assest/rightArrow1.png') :require('./Assest/leftArrow1.png')}/>
          </View>
          </TouchableOpacity>



          </View>

           </CustomView>
           <View style={{flexDirection:'column', justifyContent: 'center', display :this.state.selectedButton === "Quick" || this.state.selectedButton === "OrderDetail" ? null : 'none',marginTop : 10}}>
               <Carousel activeSlideAlignment='start'
                 layout={"default"}
                 ref={ref => this.carousel = ref}
                 data={this.state.ProductArray}
                 sliderWidth={350}
                 itemWidth={250}
                 renderItem={this._renderProductItem}
                 onSnapToItem = { index => this.setState({productActiveIndex:index}) } />

           </View>

           <View style={{ flexDirection: "column",display : this.state.selectedButton === "OrderDetail" ? null : 'none'}}>
           <View  style={{ flexDirection: "row",alignItems : 'center'}}>
           <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Address')}</Text>
           </View>

           <View style={{
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
             borderWidth : isDarkMode ? 1 : 0 ,
             borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
             alignItems: 'center',
             flexDirection: "row",
             justifyContent: 'space-between',
           }} >

           <TouchableOpacity
             style = {{justifyContent: 'space-between',  width : '100%',  height : 50,alignItems : 'center',flexDirection : 'row'}}
           onPress={() => {
           this.toggleAddressModal(!this.state.addressVisible)}}>
           <View style = {{justifyContent : 'flex-start',width : '70%'}}>
           <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,textAlign : 'left',fontFamily : 'Prompt-Regular',fontSize : RFValue(15),marginLeft : 10}}>{ this.state.AddressArray.length != 0 ? this.state.AddressArray[0].cityName : Localized.t('OpenInvoicePage.Addyouraddress')} </Text>
           </View>

           <View style = {{alignItems : 'flex-end',marginRight :0,width : '30%'}}>
           <Image style = {{tintColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginRight : this.state.toolTipAddVisible == true ? 5 : 10}} source={global.selectValue == 'en' ?   require('./Assest/rightArrow1.png') :require('./Assest/leftArrow1.png')}/>
           </View>
           </TouchableOpacity>
             </View>

             <Text style = {{color : GLOBAL.COLOR.RED,alignItems : 'flex-start',marginTop : -5,marginLeft : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular',display : this.state.checkOrderFlag == true ? this.state.AddressArray.length == 0 ? null : 'none' : 'none'}}>{Localized.t('OpenInvoicePage.AddressfieldisRequired')}</Text>
           </View>

         <CustomView hide={this.state.isOpenHidden}>
         <Form
               ref="form"
               onSubmit={this.openSubmit}
          >
          <Text style = {{color :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.InvoiceTitle')}</Text>

          <View style={{
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
            borderWidth :  isDarkMode ? 1 : 0,
            borderColor :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
            backgroundColor :  isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,

          //  flexDirection: "row",
            justifyContent: 'center',

          }} >


          <TextValidator
                   style =  {{color : GLOBAL.COLOR.DARKGRAY,width : screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15),marginLeft : 10,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                   name="invoiceTitle"
                   label="invoiceTitle"
                   validators={['required']}
                   errorMessages={[Localized.t('TextValidationPage.InvoiceTitlefieldisrequired')]}
                   errorStyle = {{'container': { top: Platform.OS === "android" ? -30 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                   placeholder={Localized.t('OpenInvoicePage.InvoiceTitle')}
                   placeholderTextColor = {  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                   type="text"
                   keyboardType="email-address"
                   value={this.state.invoiceTitleName}
                   onChangeText={this.handleChange('invoiceTitleName')}
                   maxLength={50}
                   onSubmitEditing={() => {this.state.openInvoiceSelectedValue == 'Fixed' ?  this.amtTextInput.focus() : this.minAmtTextInput.focus();}}
                   returnKeyType="next"
                   blurOnSubmit = {true}
                   multiline = {true}
                   numberOfLines={4}
                   multiline style={{color :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY ,maxHeight: 80,marginLeft : 10,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                  // multiline = {true}

           />

          </View>


          <View style={{ flexDirection: "row",marginTop : 5,marginBottom : 5 }}>


                              {
                                this.state.InvoiceTypeArray.map((item, index) => (


                                <TouchableOpacity
                                  style = {{
                                    flexDirection: "row",
                                    margin: 10,
                                    flex: 3,
                                    justifyContent: "space-evenly",
                                    alignItems : "center"
                                  }}
                                  onPress={() => this.CheckInvoicelement(item)}
                                >
                                <MaterialCommunityIcons
                                  name={
                                    item.isChecked === true
                                      ? "circle"
                                      : "checkbox-blank-circle-outline"
                                  }
                                  size={25}
                                  color= { isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}
                                />
                                <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,fontSize :  RFValue(15),fontFamily : 'Prompt-Medium'}}>{Localized.t('OpenInvoicePage.'+ item.value)}</Text>
                                </TouchableOpacity>
                              ))
                            }
          </View>

          <Text style = {{color :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.Amount')}</Text>

          <View style={{
          //  alignItems: 'center',
            flexDirection: "column",
            justifyContent: 'space-between',
          }}>


          <View style={{
            alignItems: 'center',
            flexDirection: "row",
            justifyContent: 'space-between',
            display :this.state.openInvoiceSelectedValue == 'Fixed' ? 'none' : null
          }} >
            <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize :  RFValue(17),marginLeft : 10,width : '50%',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.Min')}</Text>
            <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize :  RFValue(17),marginLeft : 5,width : '50%',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.Max')}</Text>
          </View>


          <View style={{
            alignItems: 'center',
            flexDirection: "row",
            width : '100%',
            justifyContent: 'space-between',
            display :this.state.openInvoiceSelectedValue == 'Fixed' ? 'none' : null
          }} >

          <View style={{
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
            borderWidth :  isDarkMode ? 1 : 0 ,
            borderColor :  isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.WHITE,
            elevation: 10,
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
              width : '46%',
            flexDirection: "column",justifyContent: 'space-between'}}>

          <TextValidator
                   style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:10,width :'100%',padding : 5, textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                   name="MinAmount"
                   label="MinAmount"
                   validators={this.state.openInvoiceSelectedValue == 'Fixed' ? [] :['required','matchRegexp:^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$']}
                   errorMessages={[Localized.t('TextValidationPage.MinAmtfieldisrequired'), Localized.t('TextValidationPage.Entervalidamount')]}
                   errorStyle = {{'container': { top: -10, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                   placeholder="0.000"
                   placeholderTextColor = {GLOBAL.COLOR.ORANGE}
                   type="MinAmount"
                   keyboardType="numeric"
                   value={this.state.minAmount}
                   onChangeText={this.handleChange('minAmount')}
                   ref={(input) => { this.minAmtTextInput = input; }}
                  // onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                   //returnKeyType="next"
                   returnKeyLabel='Done'
                   returnKeyType='done'
                   onSubmitEditing={Keyboard.dismiss}
                   maxLength={50}
                   blurOnSubmit={false}
                   multiline = {true}
           />
          </View>


          <View style={{
            marginTop :0,
            marginLeft : 0,
            marginRight : 5,
            height : 50,
            shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderRadius : 15,
            borderWidth :  isDarkMode ? 1 : 0 ,
            borderColor :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
            elevation: 10,
            backgroundColor :  isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            width : '46%',
            flexDirection: "column",justifyContent: 'space-between'}}>

            <TextValidator
                     style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:5,width :'100%',padding : 5, textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                     name="MaxAmount"
                     label="MaxAmount"
                     validators={this.state.openInvoiceSelectedValue == 'Fixed' ? [] :['required','matchRegexp:^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$']}
                     errorMessages={[Localized.t('TextValidationPage.MaxAmtfieldisrequired'), Localized.t('TextValidationPage.Entervalidamount')]}
                     errorStyle = {{'container': { top:-10, left: 5},'text': { color: GLOBAL.COLOR.RED }}}
                     placeholder="0.000"
                     placeholderTextColor = {GLOBAL.COLOR.ORANGE}
                     type="MaxAmount"
                     keyboardType="numeric"
                     value={this.state.maxAmount}
                     onChangeText={this.handleChange('maxAmount')}
                     ref={(input) => { this.maxAmtTextInput = input; }}
                     returnKeyLabel='Done'
                     returnKeyType='done'
                    onSubmitEditing={Keyboard.dismiss}
                    // onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                     //returnKeyType="next"
                     maxLength={50}
                     blurOnSubmit={false}
                     multiline = {true}
             />
         </View>
          </View>

         <View style={{
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
           borderWidth :  isDarkMode ? 1 : 0,
           borderColor :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
           elevation: 10,
           backgroundColor :  isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          // alignItems: 'center',
           justifyContent: 'space-between',
           display :this.state.openInvoiceSelectedValue == 'Fixed' ? null : 'none'
         }}>

         <TextValidator
                  style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Medium',fontSize :  RFValue(20),marginLeft:5,width :screenWidth*.8,padding : 5, textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                  name="Amount"
                  label="Amount"
                  validators={this.state.openInvoiceSelectedValue == 'Fixed' ? ['required','matchRegexp:^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$'] : []}
                  errorMessages={[Localized.t('TextValidationPage.Amountfieldisrequired'), Localized.t('TextValidationPage.Entervalidamount')]}
                  errorStyle = {{'container': { top: -10, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                  placeholder="0.000"
                  placeholderTextColor =  {GLOBAL.COLOR.ORANGE}
                  //placeholderTextColor = {GLOBAL.COLOR.ORANGE}
                  type="Amount"
                  keyboardType="numeric"
                  value={this.state.fixedAmount}
                  onChangeText={this.handleChange('fixedAmount')}
                  ref={(input) => { this.amtTextInput = input; }}
                  returnKeyLabel='Done'
                  returnKeyType='done'
                  onSubmitEditing={Keyboard.dismiss}
                 // onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                  //returnKeyType="next"
                  maxLength={50}
                  blurOnSubmit={false}

          />
         </View>

         </View>


         <View  style={{ flexDirection: "row",alignItems : 'center',marginTop : 0}}>
         <Text style = {{color :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.DateOfExpiry')}</Text>
           <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
         </View>

         <View style={{
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
           borderWidth :  isDarkMode ? 1 : 0 ,
           borderColor :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
           elevation: 10,
           backgroundColor :  isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
           alignItems: 'center',
           flexDirection: "row",
           justifyContent: 'space-between',
         }} >

         <TextValidator
                  style =  {{color : GLOBAL.COLOR.DARKGRAY,fontFamily : 'Prompt-Regular',fontSize :  RFValue(17),marginLeft:5,width :screenWidth*.8,padding : 10,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
                  name="expiryDate"
                  label="expiryDate"
                  validators={['matchRegexp:^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$']}
                  errorMessages={[Localized.t('TextValidationPage.Entervaliddate')]}
                  errorStyle = {{'container': { top: Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor = { isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                  type="expiryDate"
                  keyboardType="email-address"
                  value={this.state.expiryDate}
                  onChangeText={this.handleChange('expiryDate')}
                //  ref={(input) => { this.amtTextInput = input; }}
                  onSubmitEditing={() => { this.descTextInput.focus(); }}
                  returnKeyType="next"
                  maxLength={50}
                  blurOnSubmit={false}
          />
         <TouchableOpacity
         onPress={() => this.toggleCalendar(true)}>
         <FeatherIcons name  = {'calendar'} color = {GLOBAL.COLOR.DARKGRAY} size  = {20} style = {{marginRight : 10}}/>
         </TouchableOpacity>

         </View>

         <CalendarList
         style={{
       // height: 350,
        marginLeft : 0,
        marginTop : 10,
        width : '100%',
        display : this.state.calendarVisible == true ? null : 'none'
          }}

          theme={{
         monthTextColor: GLOBAL.COLOR.DARKBLUE,
         textMonthFontWeight: 'bold',
         todayTextColor: GLOBAL.COLOR.ORANGE,
         selectedDayTextColor: GLOBAL.COLOR.DARKBLUE,

         'stylesheet.calendar.header': {
        week: {
       marginTop: 5,
       flexDirection: 'row',
       justifyContent: 'space-between'
     }
    },
      'stylesheet.calendar.header': {
     header: {
     marginTop: 0,
     flexDirection: 'row',
     marginLeft :0,
     justifyContent: 'flex-start',
       alignItems : 'center'
    }
   }

         }}

           //markingType={this.state.markedType}
           hideArrows={Platform.OS === "android" ? true : false}
           renderArrow={(direction) => direction === 'left' ? <FeatherIcons name = {global.selectValue ==  'en' ? 'chevron-left' : 'chevron-right'}
 size = {
 30
 }
 color = 'blue'
 /> : < FeatherIcons name = {global.selectValue ==  'en' ? 'chevron-right' : 'chevron-left'}
 size = {
 30
 }
 color = 'blue'
 />}

           minDate={format(new Date(new Date().setDate(new Date().getDate()+1)), 'yyyy-MM-dd')}
         //  markedDates={this.state.marked}
           // Callback which gets executed when visible months change in scroll view. Default = undefined
           onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
           // Max amount of months allowed to scroll to the past. Default = 50
           pastScrollRange={0}
           // Max amount of months allowed to scroll to the future. Default = 50
           futureScrollRange={global.selectValue == 'en' ? 10 : 10}
           // Enable or disable scrolling of calendar list
           //scrollEnabled={true}
          // horizontal={true}
           horizontal={Platform.OS === "android" ? false :true}
        // Enable paging on horizontal, default = false
         // pagingEnabled={true}
          // Set custom calendarWidth.
           calendarWidth={320}


           //selected={this.state.regenrateDate}
           onDayPress={(day) => {
              this.setState({ expiryDate : format(parseISO(day.dateString), 'MM/dd/yyyy') })
             console.log('selected day', day)
             this.toggleCalendar(false)
           }}

           markedDates={{
             [this.state.regenrateDate]: {
               selected: true,
               disableTouchEvent: true,
               selectedColor: 'orange',
               selectedTextColor: GLOBAL.COLOR.WHITE
             },

           }}


           />


          <View  style={{ flexDirection: "row",alignItems : 'center',marginTop : 0}}>
          <Text style = {{color :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold'}}>{Localized.t('OpenInvoicePage.Description')}</Text>
            <Text style = {{color : GLOBAL.COLOR.DARKGRAY,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(15),fontFamily : 'Prompt-Regular'}}>{"  " +  "(" + Localized.t('OpenInvoicePage.Optional') + ")"}</Text>
          </View>
          <View
          style={{
            justifyContent: 'space-between',
            marginTop :10,
            marginLeft : 10,
            flexDirection: "row",
            alignItems : "center",
            height : 50
          }} >

          <View style={{
            marginTop :0,
            marginLeft : 0,
            marginRight : 0,
            height : 50,
            width : '100%',
            shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderRadius : 15,
            elevation: 10,
            borderWidth :  isDarkMode ? 1 : 0 ,
            borderColor :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE ,
            backgroundColor :  isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
            alignItems: 'center',
            justifyContent : 'space-between',
            flexDirection: "row",
          }} >

          <TextValidator
                   style =  {{color : GLOBAL.COLOR.DARKGRAY,marginLeft:10,width :screenWidth*.8,fontFamily : 'Prompt-Regular',fontSize :  RFValue(15)}}
                   name="Description"
                   label="Description"
                   validators={[]}
                   errorMessages={[]}
                   errorStyle = {{'container': { top:Platform.OS === "android" ? -10 : 5, left: 10},'text': { color: GLOBAL.COLOR.RED }}}
                   placeholder={ Localized.t('OpenInvoicePage.Addyourdescription')}
                   placeholderTextColor = { isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
                   type="Description"
                   keyboardType="email-address"
                   value={this.state.openDescription}
                   onChangeText={this.handleChange('openDescription')}
                   ref={(input) => { this.descTextInput = input; }}
                   returnKeyType="next"
                  maxLength={250}
                  multiline = {true}
                  numberOfLines={4}
                  multiline style={{ color :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,maxHeight: 80,marginLeft : 10,width :screenWidth*.8 ,textAlign: global.selectValue == 'en' ? 'left' : 'right'}}
           />

         </View>

          <TouchableOpacity
          style = {{  display : 'none'}}
          onPress={() => this.selectMultipleFile()}>
          <Image  source={require('./Assest/addFiles.png')} />
          </TouchableOpacity>

          </View>
          <View style={{flexDirection:'column', justifyContent: 'center'}}>
              <Carousel activeSlideAlignment='start'
                layout={"default"}
                ref={ref => this.carousel = ref}
                data={this.state.descriptionOpenCarouselItems}
                sliderWidth={380}
                itemWidth={200}
                renderItem={this._renderOpenDescriptionItem}
                scrollEnabled={true}
                onSnapToItem = { index => this.setState({descriptionOpenActiveIndex:index}) } />

          </View>


          <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'flex-start',marginTop : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign : 'left'}}>{Localized.t('OpenInvoicePage.ChooseHowtoShare')}</Text>
          <View
          style={{
            justifyContent: 'space-between',
            marginTop :10,
            marginLeft : 0,
            flexDirection: "row",
            alignItems : "center",
          //  height : 50
          }} >

          <View style={{
            shadowColor: GLOBAL.COLOR.LIGHTBLUE,
            width : '45%',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderRadius : 10,
            elevation: 10,
          //  backgroundColor : 'black'
          }} >
          <TouchableOpacity
            style = {[styles.btnText1 ,
              {backgroundColor : this.state.shareSelectedButton === 'Payment Link' ? GLOBAL.COLOR.DARKBLUE : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
              width : '100%',borderWidth :  isDarkMode ? 1 : 0 ,borderColor :  this.state.shareSelectedButton === 'Payment Link' ?  isDarkMode ? GLOBAL.COLOR.DARKBLUE : GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.WHITE
            }
            ]}
          onPress={() => this.shareSelectionOnPress("Payment Link")}>
          <Text style =  {{color :this.state.shareSelectedButton === 'Payment Link' ? GLOBAL.COLOR.WHITE : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 15,width : '100%',textAlign: 'left'}}>{Localized.t('OpenInvoicePage.PaymentLink')} </Text>
          <FeatherIcons name  = {'link'} style={styles.icon3} color= {this.state.shareSelectedButton === 'Payment Link' ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY} size ={20} />
          </TouchableOpacity>
          </View>

          <View style={{
            shadowColor: GLOBAL.COLOR.LIGHTBLUE,
              width : '45%',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,
            borderRadius : 10,
            elevation: 10,
          }} >
          <TouchableOpacity
            style = {[styles.btnText1 ,
              {backgroundColor : this.state.shareSelectedButton === 'QR Code' ? GLOBAL.COLOR.DARKBLUE :  isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE ,
              width : '100%',borderWidth :  isDarkMode ? 1 : 0 ,borderColor :  this.state.shareSelectedButton === 'QR Code' ?  isDarkMode ? GLOBAL.COLOR.DARKBLUE : GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.WHITE
              }
            ]}
          onPress={() => this.shareSelectionOnPress("QR Code")}>
          <Text style =  {{color : this.state.shareSelectedButton === 'QR Code' ? GLOBAL.COLOR.WHITE :  isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,marginLeft : 15,width : '100%',textAlign: 'left'}}>{Localized.t('OpenInvoicePage.QrCode')} </Text>
           <Image  source={require('./Assest/qrCodeScan.png')} style={{...styles.icon3,...{tintColor : this.state.shareSelectedButton === 'QR Code' ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY}}}  size ={20}/>
          </TouchableOpacity>
          </View>
          </View>

          </Form>
           </CustomView>



          <View style={{
            alignItems : 'center',
            marginTop :30,
            marginLeft : 0,
            flexDirection: "row",
            justifyContent: this.state.tabselectedButton === "SMS"  && this.state.selectedButton === "Quick" ? 'space-evenly' : 'flex-end',
          //  width : '100%',
            }}>

          <View style={{
              justifyContent: 'flex-start',
              display :  this.state.selectedButton === "OrderDetail" ? null  : this.state.tabselectedButton === "SMS"  && this.state.selectedButton === "Quick" ? null : 'none'
           }}>


           <Tooltip
           animated={true}
           // (Optional) When true, tooltip will animate
           // in/out when showing/hiding
           arrowSize={{ width: 16, height: 8 }}
           // (Optional) Dimensions of arrow bubble pointing to
           // the highlighted element
           backgroundColor="rgba(0,0,0,0.5)"
           contentStyle = {{borderRadius : 15}}

           arrowStyle = {{marginLeft : 0}}
           // (Optional) Color of the fullscreen background
           isVisible={this.state.toolTipPreviewVisible}
           showChildInTooltip = {true}
           allowChildInteraction = {false}

           //useReactNativeModal = {false}
           //(Must) When true, tooltip is displayed
           content={

             <View
             style={{
               justifyContent: 'space-between',
               marginTop :0,
               flexDirection: "column",
               	//padding : 15
               //height : 40,
               //	alignItems : "center",
             }}>
             <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.PreviewInvoice')}</Text>
             <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Platform.OS === "android" ? (((((((Localized.t('ToolTipPage.PreviewMessage').replace("â", "'")).replace("â", "'")).replace('\u009c', "")).replace('\u009d',"")).replace("â", "'")).replace("â", "'")).replace('\u009c', "")).replace('\u009d',"")  : (((Localized.t('ToolTipPage.PreviewMessage').replace("â", "'")).replace("â", "'").replace("â", "'")).replace("â", "'"))}</Text>



             <View style={{
               alignItems : 'center',
               marginTop :30,
               marginLeft : 0,
               flexDirection: "row",
               justifyContent:  'space-evenly' ,
               //  width : '100%',
             }}>

             <View style={{
               justifyContent: 'flex-start',

             }}>

             <CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(20)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
             />
             </View>

             <View style={{
               justifyContent: 'flex-end',
             }}>
             <CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('SendInvoice')} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}
             />
             </View>
             </View>
             </View>


           }
           //(Must) This is the view displayed in the tooltip
           placement="top"
           //(Must) top, bottom, left, right, auto.
           //(Optional) Callback fired when the user taps the tooltip
           >
           <View style = {{width : 155,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,padding : 2,borderRadius: 25,height : 55}}>
          <CustomButton title= {Localized.t('OpenInvoicePage.Preview')}  onPress={this.togglePreviewScreen} style = {{width : 150,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,borderColor : this.state.selectedButton === "OrderDetail" ? this.state.AddressArray.length != 0 ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.DARKGRAY :GLOBAL.COLOR.ORANGE,borderWidth :1.0,fontSize : RFValue(20)}} textStyle = {{color : this.state.selectedButton === "OrderDetail" ? this.state.AddressArray.length != 0 ? GLOBAL.COLOR.ORANGE : GLOBAL.COLOR.DARKGRAY : GLOBAL.COLOR.ORANGE}}
          />
          </View>

          </Tooltip>

          </View>

          <View style={{
              justifyContent: 'flex-end',
           }}>

           <Tooltip
           animated={true}
           // (Optional) When true, tooltip will animate
           // in/out when showing/hiding
           arrowSize={{ width: 16, height: 8 }}
           // (Optional) Dimensions of arrow bubble pointing to
           // the highlighted element
           backgroundColor="rgba(0,0,0,0.5)"
           contentStyle = {{borderRadius : 15}}

           arrowStyle = {{marginLeft : 0}}
           // (Optional) Color of the fullscreen background
           isVisible={this.state.toolTipSendVisible}
           showChildInTooltip = {true}
           allowChildInteraction = {false}

           //useReactNativeModal = {false}
           //(Must) When true, tooltip is displayed
           content={

             <View
             style={{
               justifyContent: 'space-between',
               marginTop :0,
               flexDirection: "column",
               	padding : 0
               //height : 40,
               //	alignItems : "center",
             }}>
             <Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 10}}>{Localized.t('ToolTipPage.SendInvoice')}</Text>
             <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 10}}>{Localized.t('ToolTipPage.SendInvoiceMessage')}</Text>



             <View style={{
               alignItems : 'center',
               marginTop : Platform.OS === "android" ? 10 : 30,
               marginLeft : 0,
               flexDirection: "row",
               justifyContent:  'space-evenly' ,
               //  width : '100%',
             }}>

             <View style={{
               justifyContent: 'center',
             }}>
             <CustomButton title=  { Localized.t('ToolTipPage.GotIt') }  onPress={() => this.HideToolTipModal()} style = {{width : 150,fontSize : RFValue(20)}}
             />
             </View>
             </View>
             </View>


           }
           //(Must) This is the view displayed in the tooltip
           placement="top"
           //(Must) top, bottom, left, right, auto.
           //(Optional) Callback fired when the user taps the tooltip
           >

            <CustomButton title= {(this.state.tabselectedButton === "SMS" || this.state.tabselectedButton === "Email")  && (this.state.selectedButton === "Quick"  )? Localized.t('OpenInvoicePage.Send') :Localized.t('OpenInvoicePage.Share') }  onPress={() => this.state.selectedButton === "Quick" ? this.quickFormSubmit() : this.openFormSubmit()} style = {{width : 150,borderWidth: this.state.toolTipSendVisible == true ? 4 : 0,borderColor : GLOBAL.COLOR.WHITE,fontSize : RFValue(20),display : this.state.selectedButton === "OrderDetail" ? 'none' : null}}
               source = {(this.state.tabselectedButton === "SMS" || this.state.tabselectedButton === "Email")  && (this.state.selectedButton === "Quick" || this.state.selectedButton === "OrderDetail" )?  require('./Assest/plane.png') : require('./Assest/upload.png')}
               //imagename =  {this.state.tabselectedButton === "SMS"  && this.state.selectedButton === "Quick"?  "md-paper-plane" : "share-outline"}
              // imageColorname = GLOBAL.COLOR.WHITE
              imgStyle = {styles.icon2}
            />

            </Tooltip>

             </View>
          </View>

          <PreviewModals.BottomModal
           propagateSwipe={true}
           modalData={this.state.modalPreviewData}
           visible={this.state.previewVisible}
           swipeableModal = {false}
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
               backgroundColor :  GLOBAL.COLOR.WHITE
             }} >

             <TouchableOpacity
             style={styles.button}
             onPress={() => {
             this.togglePreviewModal(!this.state.previewVisible)}}>
             <Image style={styles.icon4} source={require('./Assest/close.png')} />
             </TouchableOpacity>

             <View
             style={{
               justifyContent: 'space-between',
               flexDirection: "column",
               alignItems : "center",
               backgroundColor :   GLOBAL.COLOR.WHITE
             }}>
             <Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 0,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('InvoicePreviewPage.InvoicePreview')}</Text>
             <Text style={{fontSize:  RFValue(17),color :GLOBAL.COLOR.DARKGRAY, fontFamily : 'Prompt-Regular'}}></Text>
             </View>

             <Text></Text>
             </View>

          }
        >
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: GLOBAL.COLOR.LIGHTPURPLE,
            }}
          >
          <PreviewDetailsScreen example = {this.state.modalPreviewData}/>
          </ModalContent>
         </PreviewModals.BottomModal>


         <ProductModals.BottomModal
          propagateSwipe={true}
          modalData={this.state.modalProductData}
          visible={this.state.productVisible}
          swipeableModal = {false}
          overlayStyle={{backgroundColor: GLOBAL.COLOR.LIGHTPURPLE}}
         //visible = {this.state.modalVisible}
        // onTouchOutside={() => this.setState({ HideModal: false })}
         height={0.95}
         width={1}
        // onSwipeOut={() => this.setState({ HideModal: false })}
         modalTitle={

            <View
            style={{
              //justifyContent: 'stretch',
              marginTop :0,
              // padding : 10,
              flexDirection: "row",
             // width : '100%',
              //height : 40,
              alignItems : "center",
              backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,
            }} >

             <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center'}}>
            <TouchableOpacity
            style = {{
              shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 9.11,
                  borderRadius : 20,
                  elevation: 14,
                  marginBottom : 10,
                  marginTop : 10
                }}
            onPress={() => {
            this.toggleProductModal(!this.state.productVisible)}}>
            <Image style = {{borderRadius : 15}} source={global.selectValue == 'en' ?  require('./Assest/leftArrow.png') : require('./Assest/rightArrow.png')} />
            </TouchableOpacity>
            </View>

           <View style = {{alignItems : 'center',width : '60%'}}>
            <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,marginLeft : 0,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('ProductDetailsPage.Product')}</Text>
            </View>

            <Text style = {{width : '20%'}}></Text>
            </View>

         }
       >
         <ModalContent
           style={{
             flex: 1,
             backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
           }}
         >
         <ProductDetailsScreen darkModeStatus = {isDarkMode} onProductReturn={this.ProductReceiveData}/>
         </ModalContent>
        </ProductModals.BottomModal>


        <AddressModals.BottomModal
         propagateSwipe={true}
         modalData={this.state.modalAddressData}
         visible={this.state.addressVisible}
         swipeableModal = {false}
         overlayStyle={{backgroundColor: GLOBAL.COLOR.LIGHTPURPLE}}
        //visible = {this.state.modalVisible}
       // onTouchOutside={() => this.setState({ HideModal: false })}
        height={0.95}
        width={1}
       // onSwipeOut={() => this.setState({ HideModal: false })}
        modalTitle={

           <View
           style={{
             //justifyContent: 'stretch',
             marginTop :0,
             // padding : 10,
             flexDirection: "row",
            // width : '100%',
             //height : 40,
             alignItems : "center",
             backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :GLOBAL.COLOR.WHITE,
           }} >

            <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center'}}>
           <TouchableOpacity
           style = {{
             shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
                 shadowOffset: {
                   width: 0,
                   height: 7,
                 },
                 shadowOpacity: 1,
                 shadowRadius: 9.11,
                 borderRadius : 20,
                 elevation: 14,
                 marginBottom : 10,
                 marginTop : 10
               }}
           onPress={() => {
           this.toggleAddressModal(!this.state.addressVisible)}}>
           <Image style = {{borderRadius : 15}} source={global.selectValue == 'en' ?  require('./Assest/leftArrow.png') : require('./Assest/rightArrow.png')} />
           </TouchableOpacity>
           </View>

          <View style = {{alignItems : 'center',width : '60%'}}>
           <Text style = {{color :isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKBLUE,marginLeft : 0,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('AddressDetailsPage.Address')}</Text>
           </View>

           <Text style = {{width : '20%'}}></Text>
           </View>

        }
      >
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          }}
        >
        <AddressDetailsScreen darkModeStatus = {isDarkMode} onAddressReturn={this.AddressReceiveData} AddressPassingData = {this.state.AddressArray}/>
        </ModalContent>
       </AddressModals.BottomModal>


       <CustomAlertComponent
           displayAlert={this.state.showAlert}
           displayAlertIcon={false}
           alertTitleText={Localized.t('TextValidationPage.Message')}
           alertMessageText={this.state.showAlertMessage}
           displayPositiveButton={true}
           positiveButtonText={Localized.t('TextValidationPage.Ok')}
           displayNegativeButton={false}
           onPressPositiveButton={this.onPressAlertPositiveButton}
         />


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
        <IllustratorScreen example = {{'index' : 1 ,'Name' : this.state.illustratorName,'RefNo' : this.state.illustratorRefNo }} isDarkMode = {isDarkMode} onOKClick={this.illustratorReceiveData}/>
       </ModalContent>
      </IllustratorModals.BottomModal>




        </View>
        <View style  = {{display : this.state.selectedButton === "Quick" ? this.state.showQuickInvoiceFlag == true ? 'none' : null
                          :  this.state.selectedButton === "OrderDetail" ? this.state.showOrderDetailInvoiceFlag == true ? 'none' : null : this.state.showOpenInvoiceFlag == true ? 'none' : null,
                          }}>
        <AccessDeniedScreen example = {true}/>
        </View>

        </View>
        </ScrollView>

        <Modalize
           ref={this.modal}
            panGestureEnabled={Platform.OS === "android" ? true : false}
            scrollViewProps={{ showsVerticalScrollIndicator: false ,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
            withReactModal = {true}
            HeaderComponent={

              <View
              style={{
                //justifyContent: 'stretch',
                marginTop :0,
                // padding : 10,
                flexDirection: "row",
               // width : '100%',
                //height : 40,
                alignItems : "center",
                backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK :  GLOBAL.COLOR.WHITE
              }} >

                 <View style = {{ width : '20%',  alignItems : 'center',flexDirection : 'row',justifyContent : 'center',marginBottom : 10,marginTop : 10}}>
              <TouchableOpacity
              style = {{  shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
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
               this.closeModal()}}>
              <Image  style = {{borderRadius : 15}} source={global.selectValue == 'en' ?  require('./Assest/leftArrow.png') : require('./Assest/rightArrow.png')} />
              </TouchableOpacity>
              </View>

             <View style = {{alignItems : 'center',width : '60%'}}>
              <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 0,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('OpenInvoicePage.ContactList')}</Text>
              </View>

              <Text style = {{width : '20%'}}></Text>
              </View>
            }
            //scrollViewProps={{ showsVerticalScrollIndicator: false }}
            onClosed={this.closeModal()}
           // snapPoint={screenheight}
          >
          <ContactListScreen example = {this.state.tabselectedButton === "Email" ? "email" : "other"} onContactSelect={this.contactReceiveData}/>
          </Modalize>

        <Modalize
           ref={this.previewmodal}
           scrollViewProps={{ showsVerticalScrollIndicator: false ,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
            panGestureEnabled={ Platform.OS === "android" ? true : false}
            withReactModal = {false}
            HeaderComponent={

              <View
              style={{
                justifyContent: 'space-between',
                marginTop :10,
                 padding : 10,
                flexDirection: "row",
                width : '100%',
                //height : 40,
                alignItems : "center",
                backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
              }} >

              <TouchableOpacity
              style={{width : '20%',marginTop : 10}}
              onPress={() => {
              this.closePreviewModal()}}>
              <Image style={styles.icon4} source={require('./Assest/close.png')} />
              </TouchableOpacity>

              <View
              style={{
                justifyContent: 'space-between',
                flexDirection: "column",
                alignItems : "center",
                width : '60%',
                marginTop : 10,
                backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
              }}>
              <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 0,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium',textAlign : 'center'}}>{Localized.t('InvoicePreviewPage.InvoicePreview')}</Text>
              </View>

              <Text style = {{width : '20%'}}></Text>
              </View>
            }
            //scrollViewProps={{ showsVerticalScrollIndicator: false }}
            onClosed={this.closePreviewModal()}

          >

         <PreviewDetailsScreen Invoice = {
          this.state.selectedButton == "OrderDetail" ? [
             {id: 0,name: 'Invoice',subname1: this.state.invoiceno},
             {id: 1,name: 'Name',subname1: this.state.customerName},
             {id: 2,name: 'MobileNumber',subname1: '(+' + this.state.countryCode + ') ' + this.state.mobileNumber},
             {id: 3,name: 'SendVia',subname1: this.state.tabselectedButton === "SMS" ? 'SMS' :  this.state.tabselectedButton === "WhatsApp" ? 'WhatsApp' : this.state.tabselectedButton === "Email" ? "Email" : "URL"},
             {id: 4,name: 'CustomerEmail',subname1: this.state.tabselectedButton === "Email" ? this.state.emailAddress : this.state.customerEmailAddress},
             {id: 5,name: 'DeliveryFee',subname1: this.state.orderDeliveryFee},
             {id: 6,name: 'DeliveryDate',subname1: this.state.orderDeliveryDate},
             {id: 7,name: 'DeliveryTime',subname1: this.state.orderDeliveryTime},
             {id: 8,name: 'OrderDropID',subname1: this.state.orderDropID},
             {id: 9,name: 'Amount',subname1: this.state.amount},

           ]  : [
             {id: 0,name: 'Invoice',subname1: this.state.invoiceno},
             {id: 1,name: 'Name',subname1: this.state.customerName},
             {id: 2,name: 'MobileNumber',subname1: '(+' + this.state.countryCode + ') ' + this.state.mobileNumber},
             {id: 3,name: 'SendVia',subname1: this.state.tabselectedButton === "SMS" ? 'SMS' :  this.state.tabselectedButton === "WhatsApp" ? 'WhatsApp' : this.state.tabselectedButton === "Email" ? "Email" : "URL"},
             {id: 4,name: 'CustomerEmail',subname1: this.state.tabselectedButton === "Email" ? this.state.emailAddress : this.state.customerEmailAddress},
             {id: 5,name: 'Amount',subname1: this.state.amount},

           ]}

           DeliveryOrderId = {this.state.orderDeliveryID}

           Description = {this.state.description}

           ProductArray = {this.state.ProductArray}
           AddressArray = {this.state.selectedButton == "OrderDetail" ? this.state.AddressArray : []}

           Attachment = { Platform.OS === 'android' ? this.state.descriptionCarouselItems[this.state.descriptionActiveIndex] != null ? this.state.setPreviewAttachemnt : "" : this.state.setPreviewAttachemnt}

            onPreviewOkclick={this.previewReceiveData}
           />
          </Modalize>
        </>


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
    productIcon: {
   width: 20,
   height: 20,
   position: 'absolute',
   marginLeft : 0,
   right: 15, // Keep some space between your left border and Image
  },

  });
