
	import rectImg from './Assest/rectangle.png';
	import grayrectImg from './Assest/calender.png';
	import ArrowUP from './Assest/arrowUp.png';
	import ArrowDown from './Assest/dropArrow.png';
	import React, {Component} from 'react';

	import { TouchableOpacity, StyleSheet, View, SafeAreaView,FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,Text,RefreshControl,I18nManager,ImageBackground,NativeModules,DeviceEventEmitter,Linking} from 'react-native';
	//import Panel from '../../components/Panel';
	import CustomView from '../../components/CustomView';
	import SearchList from '../../components/SearchableList';
	//import FilterList from '../../components/FilterScreen';
	//import CalenderScreen from '../../components/CalenderScreen';
  import { CustomButton } from '../../components/CustomButton.js';
	import AccessDeniedScreen from '../../components/AccessDeniedScreen';
	import { BarChart,XAxis, YAxis,Grid,Path } from 'react-native-svg-charts'
	import { Defs, LinearGradient, Stop, G,Rect,Line} from "react-native-svg";
	import Tooltip from 'react-native-walkthrough-tooltip';
	import Modal from 'react-native-modal';
	import * as scale from 'd3-scale';
	import Localized from '../../locales'
	import Carousel,{ Pagination } from 'react-native-snap-carousel';
	import API from '../../utils/API';
	const GLOBAL = require('../../utils/Globals');
	import AsyncStorage  from '@react-native-community/async-storage';
	import { format,parseISO } from 'date-fns';
  import { Text as TextSvg } from 'react-native-svg'
	import {DarkModeContext} from 'react-native-dark-mode';
	import QuickActions from "react-native-quick-actions";
	import OneSignal from "react-native-onesignal";



	import Modals, {
	  ModalTitle,
	  ModalContent,
	  ModalFooter,
	  ModalButton,
	  SlideAnimation,
	  ScaleAnimation,
	} from 'react-native-modals';

	import CalenderModals from 'react-native-modals';
	import BannerModals from 'react-native-modals';
	import { SafeAreaConsumer } from 'react-native-safe-area-context'
	import { Modalize } from 'react-native-modalize';
	import NetInfo from "@react-native-community/netinfo";
	import IllustratorModals, {} from 'react-native-modals';
	import IllustratorScreen  from '../../components/IllustratorScreen.js';
  import { KeywordsSchema, KEYWORD_SCHEMA } from '../../utils/schema.js';
	import CustomAlertComponent from '../../components/CustomAlertComponent';
	import {currencyFormat } from '../../utils/GlobalFunction';
	import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
	import DeepLinking from 'react-native-deep-linking';
	import { StackActions } from '@react-navigation/native';



	const screenWidth = Dimensions.get("window").width;
	const screenheight = Dimensions.get("window").height;

	DeviceEventEmitter.addListener("quickActionShortcut", data => {
  console.log(data.title);
  console.log(data.type);
  console.log(data.userInfo);
	console.log("LLKK :" + data.userInfo.url);
	global.DeepLinkFlag = true;
	global.DeepLinkURL = data.userInfo.url
	Linking.openURL(data.userInfo.url)
});


function doSomethingWithTheAction(data) {
	 if (data) {
  console.log(data);
  console.log("Device does not support");
//	global.DeepLinkFlag = true;
//	global.DeepLinkURL = data.userInfo.url
//	Linking.openURL(data.userInfo.url)
}
}


QuickActions.popInitialAction()
  .then(doSomethingWithTheAction)
  .catch(console.error);


	QuickActions.isSupported((error, supported) => {
	  if (!supported) {
		//	alert("Device does not support 3D Touch or 3D Touch is disabled.")
	    console.log("Device does not support 3D Touch or 3D Touch is disabled.");
	  }
	});



	if(Platform.OS === 'ios')
	{

		QuickActions.setShortcutItems([
	   {
	     type: "CreateInvoice", // Required
	     title: "Create Invoice", // Optional, if empty, `type` will be used instead
	     subtitle: "",
	     icon: "create_invoice", // Icons instructions below
	     userInfo: {

	 			 url: "hesabe://openInvoice/cal" // Provide any custom data like deep linking URL
	     }
	   },
	 	{
	     type: "Invoices", // Required
	     title: "Invoices", // Optional, if empty, `type` will be used instead
	     subtitle: "",
	     icon: "invoice", // Icons instructions below
	     userInfo: {
	       url: "hesabe://home/invoice/cal"
	 			//url: "hesabe://home/invoice/OPEN"
	 			// Provide any custom data like deep linking URL
	 			//url : "hesabe://home/Profile/notification/cal"
	     }
	   }
	 ]);
	}






	export default class HomeScreen extends Component {
		constructor(){
			super();
			this.selectionOnPress = this.selectionOnPress.bind(this);
			this.filterReceiveData = this.filterReceiveData.bind(this);
			this.searchReceiveData = this.searchReceiveData.bind(this);
			this.searchEndLoading = this.searchEndLoading.bind(this);
			this.searchFilter = this.searchFilter.bind(this);
			this.calenderReceiveData = this.calenderReceiveData.bind(this);
			this._renderItem = this._renderItem.bind(this);
			this.onRefresh = this.onRefresh.bind(this);
			 this.illustratorReceiveData = this.illustratorReceiveData.bind(this);
			 this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
			 this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
			//this.ShowCurrentDate = this.ShowCurrentDate.bind(this);
			this.state = {
				isHidden:true,
				isDark : '',
				selectedButton: "INVOICES",
				selectedDayTitle: "Today",
				selectedPaymentStatus: "Successful",
				selectedPaymentMethod: "ALL",
				selectedFromDate :'',
				selectedToDate :'',
				searchData : '',
				FilterClear : false,
				selectedCurrentDate: '',
				calenderVisible: false,
				bannerVisible : false,
				toolTipCalendarVisible : false,
				toolTipStatisticVisible :false,
				toolTipAddVisible :false,
				filterVisible: false,
				 modalFilterData:null,
				 modalCalenderData:false,
        addtooltipTopMargin : 0,
				ActiveIndex:  Platform.OS === 'android' ? I18nManager.isRTL? 1: 0 : 0,
        Token :'',
				DashboardListArray : [],
				graphYArray : [],
				graphXArray : [],
				graphArray : [],
				refreshing : false,
				 scrollRefreshing : false,
				calendarFromDate : "",
				calendarToDate :"",
				showInvoiceFlag :true,
				showPaymentGatewayFlag : true,
				showOpenLinkFlag :true,
				showFaceAlert : false,
				illustratorVisible: false,
				illustratorType: '',
				 Listpage : 1,
				 listLastIndex : false,
				descriptionCarouselItems: [
				{
						title:"Transaction",
						value:"0",

						title1:"Amount",
						value1:"0.0",
				},

				{
						title:"Transferred",
						value:"0",

						title1:"Pending",
						value1:"0",
				},


			  ],
			};


		}

 calendarmodal = React.createRef();
 opencalendarModal = () => {
		 if (this.calendarmodal.current) {
			 this.calendarmodal.current.open();
		 }
	 };

 closecalendarModal = () => {
			 if (this.calendarmodal.current) {
				 this.calendarmodal.current.close();
			 }
		 };


		 onPressAlertPositiveButton = () => {

		 	this.setState(state => ({
		 		showFaceAlert: false
		 	}));
			 AsyncStorage.setItem('FaceDataFlag','true')
			   AsyncStorage.setItem('FirstTimeFaceFlag','true')
			 this._retrieveData();
			 if (Platform.OS != "android")
			 {
			NativeModules.ChangeViewBridge.faceData("true");
	    	}
				else {
        NativeModules.ExampleModule.MinimizeExample("true");
				//	const { ExampleModule } = NativeModules;
    /*  const ExampleDetail = ({ navigation }) => {
      const onButtonPressed = () => {
        NativeModules.MinimizeExample("passing params to native android");
      };
    };*/
				}

		 	};

		 onPressAlertNegativeButton = () => {
	     this.setState(state => ({
	       showFaceAlert: false
	     }));
			 AsyncStorage.setItem('FaceDataFlag','false')
			  AsyncStorage.setItem('FirstTimeFaceFlag','true')
			  this._retrieveData();

	   };



		 getProfileDetail() {


 	    var self = this;
 	    API.get(GLOBAL.API_STRING.PROFILE,{

 	      params: {
 	         'merchantCode' : GLOBAL.MERCHANT_CODE,
 	        }


 	    }).then(function (response) {

 	      const json = JSON.parse(response)
 	       //console.log(json);

				 global.Logo = json.response.company_logo
				 global.countries = json.response.countries
				 global.serviceType = json.response.service_type
				 global.id = json.response.employee_id
				 global.employeFlag=json.response.is_employee
				 global.paymentType=json.response.payment_type
				 global.merchantID = json.response.id.toString()
				 global.captureType =  json.response.capture_type != null ? json.response.capture_type : ""
				 global.captureDuration =  json.response.capture_duration != null ? json.response.capture_duration : ""
				 global.OrderDetailArray =  json.response.integrations.count != 0 ? json.response.integrations : [];


				 console.log("OOOO :" + global.merchantID);
        console.log("OOO1 :" + global.OrderDetailArray);

           global.OrderDetailFlag = false
				  global.OrderDetailArray.map((item, index) => {

						 console.log(item);


						if(item.integration_id == 3 && item.status == 1)
						{
							 global.OrderDetailFlag = true
							   console.log(item);
						}

					})

           var invoiceflag = '',pgflag = '',openflag = ''
				  global.serviceType.map((item, index) => {

						if(item.id == 2)
						{

		 				  invoiceflag = 'true'

						}

						if(item.id == 3)
						{

		 				  pgflag = 'true'

						}

						if(item.id == 7)
						{

		 				  openflag =  'true'

						}
					})

					invoiceflag.length != 0 ?   self.setState({  showInvoiceFlag: true })  : self.setState({  showInvoiceFlag: false })
			    pgflag.length != 0 ?   self.setState({  showPaymentGatewayFlag: true })  : self.setState({  showPaymentGatewayFlag: false })
					openflag.length != 0 ?   self.setState({  showOpenLinkFlag: true })  : self.setState({  showOpenLinkFlag: false })

         if(invoiceflag.length == 0 )
				 { self.setState({
	 			  toolTipCalendarVisible: false,
	 				toolTipStatisticVisible : false,
	 				toolTipAddVisible: false
	 			}) }

				let externalUserId = global.merchantID; // You will supply the external user id to the OneSignal SDK

				// Setting External User Id with Callback Available in SDK Version 3.9.3+
				OneSignal.setExternalUserId(externalUserId, (results) => {
					// The results will contain push and email success statuses
					console.log('Results of setting external user id');
					console.log(results);

					// Push can be expected in almost every situation with a success status, but
					// as a pre-caution its good to verify it exists
					if (results.push && results.push.success) {
						console.log('Results of setting external user id push status:');
						console.log(results.push.success);
					}

					// Verify the email is set or check that the results have an email success status
					if (results.email && results.email.success) {
						console.log('Results of setting external user id email status:');
						console.log(results.email.success);
					}

					// Verify the number is set or check that the results have an sms success status
					if (results.sms && results.sms.success) {
						console.log('Results of setting external user id sms status:');
						console.log(results.sms.success);
					}
				});

				 //global.merchantCode = json.response.merchant_code
       console.log("FFFF " + Localized.t('CalenderPage.'+self.state.selectedDayTitle));
        self.getAdminChargeDetail();
			 if(global.employeFlag == true)
			 {
			 self.getEmployeePermissionDetail()
			 }
			 else {
				 self.getDashboardDetail(true);

			 }

 	    })
 	    .catch(function (error) {
 	      console.log(error);

				global.Logo = ""
				global.countries = nil
				global.serviceType = []
				global.id = ""
				global.employeFlag=""
				global.paymentType=[]
				global.merchantID = ""
				global.captureType =  ""
				global.captureDuration =  ""
 	    });


 	  }


		CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {

			NetInfo.addEventListener(state => {
		console.log("Connection type", state.type);
		console.log("Is connected?", state.isConnected);
		 if(state.isConnected)
		 {
		 this.setState({ illustratorVisible: false ,illustratorType : 10});
		 }
		 else {
			 this.setState({ illustratorVisible: true ,illustratorType : 10});
		 }

	});

    } else {
      // For iOS devices
			NetInfo.addEventListener(state => {
	  console.log("Connection type", state.type);
	  console.log("Is connected?", state.isConnected);
     if(state.isConnected)
		 {
		 this.setState({ illustratorVisible: false ,illustratorType : 10});
	   }
		 else {
		 	 this.setState({ illustratorVisible: true ,illustratorType : 10});
		 }

	});
    }
  };


	getAdminChargeDetail() {
	 var self = this;
		API.get(GLOBAL.API_STRING.ADMINCHARGE,{

			params: {
				 'merchantCode' : GLOBAL.MERCHANT_CODE,
				}


		}).then(function (response) {

			const json = JSON.parse(response)
			 console.log(json);

			 global.knetFixedCharges = json.response.sms.knet_fixed_amount;
			 global.knetPercentageCharges = json.response.sms.knet_percentage_rate;
			 global.mpgsFixedCharges = json.response.sms.mpgs_fixed_amount;
			 global.mpgsPercentageCharges = json.response.sms.mpgs_percentage_rate;

		})
		.catch(function (error) {
			console.log(error);
		});


	}





		getKeyDetail() {
		 var self = this;
		 API.get(GLOBAL.API_STRING.KEYS,{

		 }).then(function (response) {

			 const json = JSON.parse(response)
			 console.log(json);

				global.merchantCode = json.response.merchant_code
				global.accessCode = json.response.access_code
				global.secretKey = json.response.secret_key
				global.ivKey = json.response.iv_key

				GLOBAL.MERCHANT_KEY = global.secretKey
			  GLOBAL.MERCHANT_IV =  global.ivKey
			  GLOBAL.ACESS_CODE  = global.accessCode
			  GLOBAL.MERCHANT_CODE  = global.merchantCode

				 	 self.getProfileDetail()



				  self.CheckConnectivity();

		 })
		 .catch(function (error) {
			 console.log(error);
		 });


	 }



	 getEmployeePermissionDetail() {
		var self = this;
		//API.get(GLOBAL.API_STRING.EMPLOYEES + '/' + global.id + GLOBAL.API_STRING.PERMISSION,{

    API.get(GLOBAL.API_STRING.PERMISSION,{
			params: {
				 'merchantCode' : GLOBAL.MERCHANT_CODE,
				}

		}).then(function (response) {

			const json = JSON.parse(response)
     if(json.response.pages != null)
		 {
			var dict = json.response.pages[0];
			var arr = [];

			for (var key in dict) {
			arr.push(dict[key]);
			}

		 console.log(arr[0]);

     global.employeePermission = arr

		 self.getPermissionAccess()

	 }
	 else {
		  global.employeePermission = null
	 	  self.setState({ showInvoiceFlag: false });
	 }


		/*	 global.merchantCode = json.response.merchant_code
			 global.accessCode = json.response.access_code
			 global.secretKey = json.response.secret_key
			 global.ivKey = json.response.iv_key

			 GLOBAL.MERCHANT_KEY = global.secretKey
			 GLOBAL.MERCHANT_IV =  global.ivKey
			 GLOBAL.ACESS_CODE  = global.accessCode
			 GLOBAL.MERCHANT_CODE  = global.merchantCode*/

		})
		.catch(function (error) {
			console.log(error);
		});


	}


	getPermissionAccess()
  {
      console.log('cvcv starting');

      var list = {};
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


           if(arr[0].id == 9)
           {
              arr[0].status == true ?  this.setState({ showInvoiceFlag: true }) :  this.setState({ showInvoiceFlag: false });
							  arr[0].status == true ?  this.getDashboardDetail(true) : ''
           }




            console.log(arr);
            //console.log(arr[1].id);


    }



	illustratorReceiveData(searchValue)
	 {
		this.toggleillustratorPress(false)
	 }

		toggleillustratorPress(visible) {
		this.setState({ illustratorVisible: visible });

		}

		calculateDiffDates()
   {
		 var date1 = new Date(this.state.calendarToDate);
     var date2 = new Date(this.state.calendarFromDate);

      // To calculate the time difference of two dates
      var Difference_In_Time = date1.getTime() - date2.getTime();
      console.log("LOLOL :" + Difference_In_Time);


     // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
			return(Difference_In_Days)
	 }

		getDashboardDetail(status) {


			if(status)
			{

					this.setState({
						Listpage: 1,
 					 DashboardListArray : [],
 					 listLastIndex : false
				 }, () => {
						this.getDashboardDetail1(true)
					});
			}
			else {
				this.getDashboardDetail1(false)
			}
		}

		getDashboardDetail1(status) {
			if(status)
	    {
	        this.setState({
	          Listpage: 1,
	          DashboardListArray : [],
	          listLastIndex : false
	        });
	    }
	   var self = this;



		 var a = {  'search' : this.state.searchData }


	   //self.state.selectedPaymentMethod === "KNET" ? '1' : '2'}
		 var c = { 'timeline' : self.state.selectedDayTitle == 'Today' ? '1' : self.state.selectedDayTitle == 'Last7Days' ? '2' : self.state.selectedDayTitle.length != 0 ? '3' : ''}


		 var f = { 'fromDate'  : self.state.selectedDayTitle.length != 0 ? '' : self.state.calendarFromDate}
		 var j = { 'toDate'    : self.state.selectedDayTitle.length != 0 ? '' : self.state.calendarToDate}


		 var parm1 = {
			 'merchantCode' : GLOBAL.MERCHANT_CODE,
			 'paymentStatus': '1',
			 'serviceTypeId': self.state.selectedButton === "INVOICES" ? '2' : self.state.selectedButton === "PAYMENT GATEWAY" ? '3' : '7',
			 //'transactionsCount': '20'
		 }


		 if(self.state.searchData.length != 0)
 		{
 			parm1 = Object.assign({},a,parm1)
 		}

 		if(self.state.selectedPaymentMethod != "ALL")
 		{

			var payValue = global.paymentType.map(function(data, idx) {
       if(data.name == self.state.selectedPaymentMethod)
 			{
 				 var b = { 'paymentTypeId':  data.id}
				parm1 =  Object.assign({},b,parm1)
 			}

     });


 		}




 	  if(self.state.selectedDayTitle.length != 0 )
 	 {


 	 }
 	 else {
 		parm1 =  Object.assign({},f,j,parm1)
 	}
   parm1 =  Object.assign({},c,parm1)


		// parm1 =  this.state.searchData.length == 0 ? self.state.selectedPaymentMethod === "ALL" ? Object.assign({},parm1) : Object.assign({},b,parm1) : self.state.selectedPaymentMethod === "ALL" ? Object.assign({},a,parm1) : Object.assign({},a,b,parm1)
	    API.get(GLOBAL.API_STRING.DASHBOARD + `?page=${self.state.Listpage}`,{

	      params: parm1


	    }).then((response) => {
    // Success



		const json = JSON.parse(response);


		var pageurl;


	 if(json.response.recent_transactions.pagination.next_page_url != null)
	 {

		 let pg = json.response.recent_transactions.pagination.next_page_url.split('=');
		 pageurl = pg[1]
	}else {

		pageurl = self.state.Listpage
	}



		let newArray = [...self.state.descriptionCarouselItems]
	 	newArray[0].value = json.response.stats.total_transactions_count;
	 	newArray[0].value1 = currencyFormat(Number(json.response.stats.total_transactions_amount));
	 	newArray[1].value = currencyFormat(Number(json.response.stats.transferred_transactions_amount));
	 	newArray[1].value1 = currencyFormat(Number(json.response.stats.pending_transactions_amount));

	 self.setState({
	  array: newArray
	 })

	 let markers = [];


	 for(let i = 0; i < json.response.recent_transactions.pagination.count; i++) {

	 //	console.log("hhh " + json.response.recent_transactions.data[i].amount)
		 var iid = (self.state.selectedButton === "INVOICES" ? json.response.recent_transactions.data[i].invoice_id : json.response.recent_transactions.data[i].id)
	 markers.push({

	 id: iid,
	 name: self.state.selectedButton === "PAYMENT GATEWAY" ?  json.response.recent_transactions.data[i].order_reference_number  :json.response.recent_transactions.data[i].name,
	 nameValue:format(parseISO(json.response.recent_transactions.data[i].created_at), 'dd MMM yy, hh:mm a').toLocaleUpperCase(),
	 subname1 :  self.state.selectedButton === "PAYMENT GATEWAY" ? "Token : " +json.response.recent_transactions.data[i].token :json.response.recent_transactions.data[i].payment_display_name,
	 subnamevalue1 : self.state.selectedButton === "PAYMENT GATEWAY" ? ''  :  Localized.t("CommanTabPage."+json.response.recent_transactions.data[i].service_type),
	 subname2 : '',
	 subnamevalue2 : '',
	 subname3 :  Localized.t("CommanTabPage.Success"),
	 subnamevalue3 : GLOBAL.CURRENCY + ' ' + currencyFormat(json.response.recent_transactions.data[i].amount),
	 Subname3Img : 1,
	 nameImg :0,
	 nameSubtype : json.response.recent_transactions.data[i].invoice_sub_id == 4 ? '4' :'',
	 });

	}



	    if(json.response.recent_transactions.pagination.next_page_url == null && json.response.recent_transactions.pagination.previous_page_url == null)
	    {
	      self.setState
	          ({
	         DashboardListArray:  I18nManager.isRTL == true  ? markers.reverse() : markers
	        })
	    }
	    else {

	      if(self.state.listLastIndex)
	      {

	      }
	      else {

	        if(json.response.recent_transactions.pagination.next_page_url == null)
	        {
	           self.setState({ listLastIndex: true });
	        }

	        self.setState(prevState =>
	            ({
	           DashboardListArray:  [...prevState.DashboardListArray,... markers]
	          }))
	      }

	    }

			self.setState({
				Listpage: pageurl,
			})
			self.setState({refreshing :false})
			self.setState({scrollRefreshing :false})


	//console.log(markers)

	 let chardata = json.response.chart_data
	 console.log("yyyy " + chardata.datasets[0].data[1]);
	 let graphmarkers = [];
	 let amountmarkers = [];
   let xmarkers = [];
   var ymarkers = [];

	var max_of_array = Math.max.apply(Math, chardata.datasets[0].data);
	var min_of_Array = Math.min.apply(Math, chardata.datasets[0].data);

	console.log('MAx:'+ max_of_array)
	console.log('Min:'+ min_of_Array)
	let jj = Math.round(max_of_array/5)
	var amount = 0

	ymarkers.push(
		 amount = amount
	)
  for(let y = 0; y < 3 ;y++)
	{
		ymarkers.push(
		   amount += jj
		)
	}
	ymarkers.push(
		 max_of_array + jj
	)

   console.log(ymarkers);

	 /*if(self.state.selectedDayTitle.length == 0 )
	{

		 console.log("LOLOL :" + self.calculateDiffDates());
	}*/

if(self.state.selectedDayTitle.length == 0 ? self.calculateDiffDates() == 0 :self.state.selectedDayTitle == 'Today' )
{
	let j=12;
	graphmarkers.push({
		value: chardata.datasets[0].data[chardata.xAxisLabels.length-1],
		XAxisData : j ,
		svg : {fill: 'rgba(240, 238, 255, 1)',onPress: () => this.barOnPress(0)}
	})
	 for(let i = 0; i < chardata.xAxisLabels.length-1; i++) {

   j++
	 graphmarkers.push({
		 value: chardata.datasets[0].data[i],
		 XAxisData : j > 12 ? j = 1 : j ,
		 svg : {fill: 'rgba(240, 238, 255, 1)',onPress: () => this.barOnPress(i+1)}
	 })


	 }
 }
 else if(self.state.selectedDayTitle.length == 0 ? (self.calculateDiffDates() > 0 && self.calculateDiffDates() <7) : self.state.selectedDayTitle == 'Last7Days')
 {

	 let k = 7
	 for(let i = 0; i < chardata.xAxisLabels.length; i++) {
    let today = new Date()
		 //console.log(new Date(today.setDate(today.getDate() - k)));
		// console.log(k);

	 graphmarkers.push({
		 value: chardata.datasets[0].data[i],
		 XAxisData : chardata.xAxisLabels[i] +'/' +  format(new Date(today.setDate(today.getDate() - k)), 'MM'),
		 svg : {fill: 'rgba(240, 238, 255, 1)',onPress: () => this.barOnPress(i)}
	 })
	  --k
   }

 }
 else {

	 let today = new Date()
	 var k = 30
	 var j = 0
	 var temp = 0
	 var amount = 0


	 for(let i = 0; i < chardata.xAxisLabels.length; i++) {
   let today = new Date()
	 let today1 = new Date()
   amount += Number(chardata.datasets[0].data[i])
	 j++

	  if(j>5)
	  {
			 console.log('tempvalue :' + temp)
	   graphmarkers.push({
		 value: amount.toFixed(3).toString(),
		 XAxisData : chardata.xAxisLabels[i-5] +'/' + format(new Date(today.setDate(today.getDate() - k)), 'MM') + '-' + chardata.xAxisLabels[i] +'/' +  format(new Date(today1.setDate(today1.getDate() - k)), 'MM'),
		 svg : {fill: 'rgba(240, 238, 255, 1)', onPress: () => this.barOnPress(parseInt(i/5)-1)}
	   })

		 amountmarkers.push(
			 amount.toFixed(3)
		 )

	  	j=0
			amount = 0
			temp++
	  }
		--k


   }

	 console.log(amountmarkers)
 	var max_of_array = Math.max.apply(Math, amountmarkers);
 	var min_of_Array = Math.min.apply(Math, amountmarkers);

 	console.log('MAX:'+ max_of_array)
 	console.log('MIN:'+ min_of_Array)

	let jj = Math.round(max_of_array/5)
	var amount = 0
 ymarkers = []
	ymarkers.push(
		 amount = amount
	)
  for(let y = 0; y < 3 ;y++)
	{
		ymarkers.push(
		   amount += jj
		)
	}
	ymarkers.push(
		 max_of_array + jj
	)


 }
  console.log(graphmarkers)






		self.setState(prevState =>
			({
			//DashboardListArray: [...prevState.DashboardListArray,...markers]
			 graphArray : Platform.OS === 'android' ? I18nManager.isRTL == true  ? graphmarkers.reverse() : graphmarkers : global.selectValue == "ar" ? graphmarkers.reverse() : graphmarkers,
			 graphXArray : Platform.OS === 'android' ? I18nManager.isRTL == true  ? markers.reverse() : markers : global.selectValue == "ar" ? markers.reverse() : markers,
			 graphYArray : Platform.OS === 'android' ? I18nManager.isRTL == true ? ymarkers.reverse() : ymarkers : global.selectValue == "ar" ? ymarkers.reverse() : ymarkers
		}))

		 self._retrieveFaceData();


   })
.catch((error) => {
    // Error
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
					console.log('zxd'+error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('CCcError', error.message);
				this.setState({ illustratorVisible: false,illustratorType : 12 });

    }
  //  console.log(error.config);
});








	  /*  .catch(function (error) {
	      console.log(error);
	    });*/


	  }


	barOnPress(index)
	{
    console.log("Index :" + index);


		 let newArray =  Platform.OS === 'android' ?  I18nManager.isRTL == true ?  [...this.state.graphArray].reverse() : [...this.state.graphArray] : global.selectValue == "ar" ? [...this.state.graphArray].reverse() : [...this.state.graphArray]
		 console.log(newArray);

		 for(let i = 0; i < this.state.graphArray.length; i++) {
			  //for(let i = this.state.graphArray.length-1; i <= 0; i--) {

      if(i == index)
			{
		  newArray[i].svg.fill = 'rgba(93, 84, 154, 1)'
		   }
			 else {
			 	 newArray[i].svg.fill = 'rgba(240, 238, 255, 1)'
			 }
		 }

		 this.setState({
			array: newArray.reverse(),
		 })

	}


   HideToolTipModal(visible) {

		   AsyncStorage.setItem('HomeToolTipFlag',"True")
		 this.setState({
			  toolTipCalendarVisible: false,
				toolTipStatisticVisible : false,
				toolTipAddVisible: false
			});

			if(global.DeepLinkFlag == true)
			{
			 console.log("HHHH :" + global.DeepLinkURL );
			Linking.openURL(global.DeepLinkURL)
		 }
		 if(global.NotificationDeepLinkFlag == true)
		 {
			console.log("HHHH :" + global.DeepLinkURL );
		 Linking.openURL(global.DeepLinkURL)
		}
	 }

		toggleToolTipModal(visible) {
 		 this.setState({

			  toolTipCalendarVisible :  visible == 'Calendar' ? false : false ,
				toolTipStatisticVisible : visible == 'Statistic'  ? true : false  ,
				toolTipAddVisible : visible == 'Add' ? true : false
			});

 	 }


		selectionOnPress(userType) {
			//this.setState({ selectedButton: userType });

			this.setState({ selectedButton: userType,
				Listpage: 1,
 			 DashboardListArray : [],
 			 listLastIndex : false }, () => {
				 this.forceUpdate()
      	this.getDashboardDetail(true);
      });

		}


		HideView = () => {

			this.setState(state => ({

				isHidden: !state.isHidden

			}));

		};

		toggleCalenderModal(visible) {
		//	this.setState({ calenderVisible: visible });
			//this.passDataToCalenderModal(false)

			this.props.navigation.navigate('CalendarScreen',{onSelectCalender:this.calenderReceiveData,
	       example : {'currentState' : this.state.selectedDayTitle,'ClearAll' : this.state.modalCalenderData,"FromDate" : this.state.selectedFromDate  ,"ToDate" :  this.state.selectedToDate,"Fromview" : "Dashboard"}})

		}

		toggleBannerModal(visible) {

			this.setState({
				bannerVisible: visible,
			 }, () => {
			 this._retrieveData()
			});



			//this.passDataToCalenderModal(false)

		}

		passDataToCalenderModal(value)
		{
		//	console.log('zzz' +value);
		   this.setState({
		     modalCalenderData:value
		  })
    }

		 calenderReceiveData(calenderValue)
		 {

      console.log('klkl :' + calenderValue.FromDate);
				this.toggleCalenderModal(!this.state.calenderVisible)
       //this.closecalendarModal()

            var today = new Date()
           var todayDate = new Date(today.setDate(today.getDate()))
           var currentdate  = format(todayDate, 'dd/MM/yyyy')
           var priordate = ''

           var calFromDate = '',calToDate = ''
           /*if(currentdate == calenderValue.FromDate)
           {
             calFromDate = ""
             calToDate = ""
           }
           else {*/
             if(calenderValue.FromDate.length !=0 )
						 {
             const  cFromDate = calenderValue.FromDate.split('/')
             const  cToDate = calenderValue.ToDate.split('/')
             calFromDate =  cFromDate[2] + "-" + cFromDate[1] + "-" + cFromDate[0]
             calToDate = cToDate[2] + "-" + cToDate[1] + "-" + cToDate[0]

             priordate = format(parseISO(cFromDate[2] +"-"+ cFromDate[1] +"-"+ cFromDate[0]), 'dd MMM yyyy') + '-' + format(parseISO(cToDate[2] +"-"+ cToDate[1] +"-"+ cToDate[0]), 'dd MMM yyyy')
					    //}
					 }

       this.setState(
         {
            selectedDayTitle: calenderValue.Interval,
            calendarFromDate : calFromDate,
            calendarToDate : calToDate ,
						selectedFromDate : calenderValue.FromDate,
						selectedToDate : calenderValue.ToDate,

         }, () => {
         console.log('Receivedcalnder Data' + calenderValue);
          if(this.state.selectedDayTitle.length != 0 )
         {
           this.ShowCurrentDate(this.state.selectedDayTitle)
					  this.getDashboardDetail(true);
         }
         else {


             this.setState({ selectedCurrentDate: priordate.toLocaleUpperCase() }, () => {
                  this.getDashboardDetail(true);
             });

         }

        });


				 /*this.setState(
					 {
						  selectedDayTitle: calenderValue.Interval,
							selectedFromDate : calenderValue.FromDate,
							selectedToDate : calenderValue.ToDate,

					 }, () => {
					 console.log('Receivedcalnder Data' + calenderValue);
					 this.ShowCurrentDate(calenderValue.Interval)
					 this.getDashboardDetail();
				 });*/

        //this.setState({filterType: filterValue});

    }


		toggleFilterModal(visible) {
			//this.setState({ filterVisible: visible });

			this.props.navigation.navigate('FilterScreen',{onSelectFilter:this.filterReceiveData,
       example : {"PaymentStatus":this.state.selectedPaymentStatus,"PaymentMethod" :
				 this.state.selectedPaymentMethod,"ServiceType" :"","FromDate" : "" ,"ToDate" : "","fromView" :'Dashboard',"ClearAll" :
				 this.state.FilterClear}})
			//this.passDataToFilterModal("Dashboard")
		}

		passDataToFilterModal(value)
		{
			//console.log(item);
		   this.setState({
				 selectedPaymentStatus: "All",
				 selectedPaymentMethod: "ALL",
				 FilterClear : value
		  });
    }

		 filterReceiveData(filterValue)
		 {
			  console.log('Received Data ' + filterValue.PaymentStatus)

				this.setState({
					selectedPaymentMethod: filterValue.PaymentMethod ,
					selectedPaymentStatus : filterValue.PaymentStatus
				}, () => {

           this.getDashboardDetail(true);
				 });


			  	this.toggleFilterModal(!this.state.filterVisible)
        //this.setState({filterType: filterValue});
				console.log('Received Data' + filterValue);
    }


		searchReceiveData(searchValue)
		{

				console.log("KLKL:" + searchValue.nameSubtype);
				let valueSubtype  = searchValue.nameSubtype == '4' ? '4' : ''
				this.state.selectedButton === "INVOICES" ?
				this.props.navigation.navigate('InvoiceQuickDetailsScreen',{something:searchValue,Type :"Success",fromView :'Dashboard', subType : valueSubtype})
			  : 	this.state.selectedButton === "PAYMENT GATEWAY" ? 	this.props.navigation.navigate('PGDetailsScreen',{something:searchValue,Type :"Success",fromView :'Dashboard' })
				 :	this.props.navigation.navigate('PGDetailsScreen',{something:searchValue,Type :"Success",fromView :'Dashboard' })
			 //this.setState({filterType: filterValue});



	   }

		 searchEndLoading(searchValue)
 		{
        	console.log(searchValue);

		}

		searchFilter(searchValue)
	 {
     console.log('mkmkm :' + searchValue);
		 this.setState({
			 searchData: searchValue
		 }, () => {

				this.getDashboardDetail(true);
			});


	 }



		 //you can open modal here

    componentDidMount() {

		DeepLinking.addScheme('hesabe://');


    Linking.addEventListener('url', this.handleUrl);


  /*  Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));*/

			this.ShowCurrentDate('Today')
			console.log('HomeScreen :'+global.Token);



			if(global.Token != null)
 		 {
			 this.readLanguageData()

			 //this._retrieveBannerData()
			 //this._retrieveData()
			 if( Platform.OS === 'ios')
			 {

				 	this.getKeyDetail();

			 }
			 else {

				 setTimeout(() => {

				 if(Platform.OS === 'android')
				 {
					 	this.getKeyDetail();
				 }

	 		}, 500);

			 }


 		}
  }



	handleUrl = ({ url }) => {
	    Linking.canOpenURL(url).then((supported) => {
	      if (supported) {
	        DeepLinking.evaluateUrl(url);
	      }
	    });
	  }

	readLanguageData = async () => {
		try {
			const lang = await AsyncStorage.getItem('USER_LANGUAGE_PICKED')
			console.log('MLM :' + lang);
			if (lang !== null) {
				if (lang === "ar") {
					 global.selectValue =  'ar'
					 I18nManager.forceRTL(true)
				}
				else if(lang === "en") {

						global.selectValue =  'en'
						I18nManager.forceRTL(false)
						  Localized.locale  =  'en'
				}
				else {
					if (I18nManager.isRTL) {
						 global.selectValue =  'ar'
						  Localized.locale  =  'ar'
					}
					else {
					 global.selectValue =  'en'
					  Localized.locale  =  'en'
					}
				}

			}
			else {
           if (I18nManager.isRTL) {
						  global.selectValue =  'ar'
					 }
					 else {
					 	global.selectValue =  'en'
					 }

				 //I18nManager.forceRTL(false)
			}

		} catch (e) {
		 // alert('Failed to fetch the data from storage')
		}
		}


	_retrieveData = async () => {
  try {
			console.log("HHHH :" + global.DeepLinkURL );
    const value = await AsyncStorage.getItem('HomeToolTipFlag');
	//	console.log('ZXZX :' + value);
    if (value !== null) {
      // We have data!!

			if (value == "True") {

			 this.setState({
			 toolTipCalendarVisible: false,
			 toolTipStatisticVisible : false,
			 toolTipAddVisible: false
		 })

		 if(global.DeepLinkFlag == true)
		 {
			 //alert("Deeplinkingfired")
      //this.getKeyDetail();
			 setTimeout(() => {
				 console.log("HHHH :" + global.DeepLinkURL );
	 		 Linking.openURL(global.DeepLinkURL)

 		}, 500);

		}
		if(global.NotificationDeepLinkFlag == true)
		{
		 console.log("HHHH :" + global.DeepLinkURL );
		Linking.openURL(global.DeepLinkURL)
	 }
	 }

    }
		else {

			this.setState({
			toolTipCalendarVisible: true,
			toolTipStatisticVisible : false,
			toolTipAddVisible: false
		})
		}

  } catch (error) {
		this.setState({
		toolTipCalendarVisible: true,
		toolTipStatisticVisible : false,
		toolTipAddVisible: false
	})
  }
};


_retrieveBannerData = async () => {
try {
	const val = await AsyncStorage.getItem('BannerFlag');
	const value = Number(val)
//	console.log('ZXZX :' + value);
	if (value !== null) {
		// We have data!!

		if (value == 3) {

	 this.setState({
			bannerVisible: false,
		 }, () => {
		 this._retrieveData()
		});


   }
	 else {
	 	AsyncStorage.setItem('BannerFlag', (value + 1).toString())
		this.setState({
		bannerVisible: true,
	  })

	 }

	}
	else {
    AsyncStorage.setItem('BannerFlag','1')
		this.setState({
		bannerVisible: true,

	})
	}

} catch (error) {
	this.setState({
   bannerVisible: true,
})
}
};

_retrieveFaceData = async () => {
	try {
		const val = await AsyncStorage.getItem('FirstTimeFaceFlag');
	if (val == null) {

try {
	const value = await AsyncStorage.getItem('FaceDataFlag');
	console.log('ZXZX :' + value);
	console.log('ZXZX1 :' + this.state.showFaceAlert);
	if (value !== null) {
		// We have data!!
   if(value == 'false')
	 {
		 if(this.state.showFaceAlert != true)
		 {
		 this.setState({
				showFaceAlert: false,
			 }, () => {
				 this.setState({showFaceAlert : true})
			 //this._retrieveData()
			});
		}

	 }
	 else {

	 this.setState({
			showFaceAlert: false,
		 }, () => {
		 this._retrieveData()
		});
	 }

	}
	else {
    AsyncStorage.setItem('FaceDataFlag','false')
			console.log('ZXZXEkse :' + value);


	this.setState({
		 showFaceAlert: true,
		}, () => {
	//	this.getKeyDetail();

	 });

	}

} catch (error) {
	this.setState({
   showFaceAlert: true,
})
}

}
else {
	 this._retrieveData();
}


}
catch (error) {
	this.setState({
   showFaceAlert: true,
})
}


};




		ShowCurrentDate(value)
		{
          var today = new Date()
          var priorDate
					console.log('currentselection' + value);
					if(value === 'Today')
					{
						  priorDate = new Date(today.setDate(today.getDate()))
							priorDate = format(priorDate, 'dd MMM yyyy')
			   	}
					else if(value === 'Last7Days')
					{
            var todayDate = new Date(today.setDate(today.getDate()))
						var newdate = new Date(today.setDate(today.getDate() - 6))
						priorDate = format(newdate, 'dd MMM yyyy') + '-' + format(todayDate, 'dd MMM yyyy')
				  }
					else if(value === 'Last30Days')
					{
						var todayDate = new Date(today.setDate(today.getDate()))
					 var newdate = new Date(today.setDate(today.getDate() - 29))
						priorDate = format(newdate, 'dd MMM yyyy') + '-' + format(todayDate, 'dd MMM yyyy')
					}
					else {

						var todayDate = new Date(today.setDate(today.getDate()))
 					 var newdate = new Date(today.setDate(today.getDate() - 60))
						priorDate = format(newdate, 'dd MMM yyyy') + '-' + format(todayDate, 'dd MMM yyyy')
					}

					this.setState({
	 		     selectedCurrentDate:priorDate.toLocaleUpperCase()
	 		     });

		   }


			 _renderItem({item,index}){
	 	     console.log(item)
	 	      console.log("JJJ : " + Localized.t('DashboardPage.'+item.title1))
	 	     const { descriptionActiveIndex } = this.state.ActiveIndex;
	 	         return (
	 	             <TouchableOpacity
                  //style = {{	backgroundColor : 'black'}}
								 >

								 <View
			 				  	style={{
			 				//	justifyContent: 'space-evenly',
			 						flexDirection: "row",
			 						height : '100%',
			 						alignItems : "center",
                  width : '100%',

			 					}}>
								 <View
			 				  	style={{
			 						justifyContent: 'flex-start',
			 						flexDirection: "column",
			 						//height : 40,
								//	padding : 10,
			 						alignItems : "center",
									//backgroundColor : 'black',
									width : '49%',

			 					}}>
			 					<Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(13),fontFamily : 'Prompt-Regular',textAlign :'left'}}>{"\u200E"+Localized.t('DashboardPage.'+item.title)}</Text>
			 					<Text style =  {{color : GLOBAL.COLOR.LIGHTBLUE,fontSize :  RFValue(13),fontFamily : 'Prompt-SemiBold',textAlign :'left'}}>{item.value}</Text>
			 					</View>

			 					<View
			 					style={{
			 						backgroundColor : GLOBAL.COLOR.SHADEGRAY,
			 						width : '1%',
			 						height : '70%',
									alignItems: 'center',
									justifyContent: 'center',
								//	marginLeft  : -15

			 					}}>
			 					</View>

								<View
								 style={{
								 justifyContent: 'space-evenly',
								 marginTop :0,
								 flexDirection: "column",
								 //height : 40,
								 alignItems : "center",
								 //	backgroundColor : 'black',
								 //	width : 150,
									width : '49%',
							 }}>
							 <Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(13),fontFamily : 'Prompt-Regular',textAlign :'center',width : '100%'}}>{"\u200E"+ Localized.t('DashboardPage.'+item.title1)}</Text>
							 <Text style =  {{color : GLOBAL.COLOR.LIGHTBLUE,fontSize :  RFValue(13),fontFamily : 'Prompt-SemiBold',textAlign :'center',width : '100%'}}>{item.value1}</Text>
							 </View>

							 </View>
	 	           </TouchableOpacity>
	 	         )
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

						 isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
 				     return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
 				   };

 				   isCloseToTop = ({layoutMeasurement, contentOffset, contentSize})  => {
 				   return contentOffset.y == 0;
 				 };

 				   onRefresh = () =>
 				   {
 				         console.log('refresh started');
 				        this.setState({refreshing :true})
 				       this.getDashboardDetail(false)


 				    }

						/*	onRefresh = () =>
			 		   {
			 		         console.log('refresh started');
			 		        this.setState({refreshing :true})
			 		        this.getDashboardDetail()
			 		        this.setState({refreshing :false})

			 		    }*/
		static contextType = DarkModeContext;


		render(){
		//	const [ theme, toggleTheme  ] = useDarkMode();

     const isDarkMode = this.context === 'dark';

			const data45 = [
				{
					value: 1,
					svg: {
						fill: 'rgba(240, 238, 255,1)',
					},
				},
				{
					value: 4,
					svg: {
						fill: 'rgba(240, 238, 255,1)',
					},
				},
				{
					value: 2,
					svg: {
						fill: 'rgba(93, 84, 154, 1)',
					},
				},
				{
					value: 4,
					svg: {
						fill: 'rgba(240, 238, 255,1)',
					},
				},
				{
					value:5,
					svg: {
						fill: 'rgba(240, 238, 255,1)',
					},
				},
				{
					value: 3,
					svg: {
						fill: 'rgba(240, 238, 255, 1)',
					},
				},
				{
					value: 7,
					svg: {
						fill: 'rgba(240, 238, 255,1)',
					},
				},
			]



			const contentInset = { top: 20, bottom: 20}
			const data1 = [1, 5, 10, 15, 20]
			const data2 = [0,1,2,3,4,5]

			const HorizontalLine1 = ({ y }) =>
		       <Line key={'zero-axis'} x1={'0%'} x2={'100%'} y1={y(0)} y2={y(0)} stroke={GLOBAL.COLOR.LIGHTPURPLE} strokeDasharray={[4, 8]} strokeWidth={2}/>
		  const HorizontalLine2 = ({ y }) =>
		       <Line key={'zero-axis1'} x1={'0%'} x2={'100%'} y1={y(100)} y2={y(100)} stroke={GLOBAL.COLOR.LIGHTPURPLE} strokeDasharray={[4, 8]} strokeWidth={2} />
			const HorizontalLine3 = ({ y }) =>
					  <Line key={'zero-axis2'} x1={'0%'} x2={'100%'} y1={y(200)} y2={y(200)} stroke={GLOBAL.COLOR.LIGHTPURPLE} strokeDasharray={[4, 8]} strokeWidth={2} />
      const HorizontalLine4 = ({ y }) =>
					 	<Line key={'zero-axis3'} x1={'0%'} x2={'100%'} y1={y(300)} y2={y(300)} stroke={GLOBAL.COLOR.LIGHTPURPLE} strokeDasharray={[4, 8]} strokeWidth={2} />
			const HorizontalLine5= ({ y }) =>
						<Line key={'zero-axis4'} x1={'0%'} x2={'100%'} y1={y(400)} y2={y(400)} stroke={GLOBAL.COLOR.LIGHTPURPLE} strokeDasharray={[4, 8]} strokeWidth={2} />
			const HorizontalLine6= ({ y }) =>
			      <Line key={'zero-axis5'} x1={'0%'} x2={'100%'} y1={y(500)} y2={y(500)} stroke={GLOBAL.COLOR.LIGHTPURPLE} strokeDasharray={[4, 8]} strokeWidth={2} />
			const HorizontalLine7= ({ y }) =>
						 <Line key={'zero-axis6'} x1={'0%'} x2={'100%'} y1={y(600)} y2={y(600)} stroke={GLOBAL.COLOR.LIGHTPURPLE} strokeDasharray={[4, 8]} strokeWidth={2} />

						 const Clips = ({ x, width,xValue }) => (
		 <Defs key={"clips"}>
		 <ClipPath id="clip-path-1">
		   <Rect x={"0"} y={"0"} width={x(xValue)} height={"100%"} />
		 </ClipPath>
		 <ClipPath id={"clip-path-2"}>
		   <Rect
		     x={x(xValue)}
		     y={"0"}
		     width={width - x(xValue)}
		     height={"100%"}
		   />
		 </ClipPath>
		 </Defs>
		 );


			const Labels = ({ x, y, bandwidth}) => (


			  this.state.graphArray.map((element, index) => {
				if(element.value > 0)
				{
        console.log(element.value);
					return<TextSvg
					key={ index }
					x={ x(index) + (bandwidth / 2) + (index == 0 ? 3 :  index == this.state.graphArray.length-1 ? -5 : 0)}
				  y={ y(element.value/1000.0) - 10}
					fontSize={  RFValue(14) }
					fill={element.svg.fill }
				//	alignmentBaseline={ 'middle' }
					textAnchor={ 'middle' }
					>
					{parseFloat((element.value/1000.0).toFixed(3)) + 'k'}
					</TextSvg>

				}
				})
			)

			const RoundedLabels = ({ x, y, bandwidth}) => (

			 this.state.graphArray.map((element, index) => {
				 console.log("index:" + index);
						if(element.value > 0)
 					{
				 	return	<G
					key={index}
          onPress={() => Platform.OS === 'android' ? I18nManager.isRTL == true ? this.barOnPress((this.state.graphArray.length-1) - index) : this.barOnPress(index) : global.selectValue == "ar" ? this.barOnPress((this.state.graphArray.length-1) - index) : this.barOnPress(index) }
					>
					<Rect
	 					x={x(index)}
	 					y={y(element.value/1000.0) - 5 } // Subtract Height / 2 to make half of the Rect above the bar
	 					rx={8} // Set to Height / 2
	 					ry={8} // Set to Height / 2
	 					width={bandwidth}
	 					height={10} // Height of the Rect
	 					fill  = {element.svg.fill} //{index == 2 ?GLOBAL.COLOR.LIGHTBLUE :GLOBAL.COLOR.LIGHTPURPLE}
	 					/>
					</G>
			   	}
				})
			)

			return(

			/*	<View style={{ flex: 1}} onLayout={(event) => {


						 var {x, y, width, height} = event.nativeEvent.layout;


          console.log('currentHeight :' + height);
						 // use height as viewableWindowHeight
			}} >*/
			<>
      	<View style={{ flex: 1,  backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK  : GLOBAL.COLOR.WHITE }}>
				<View
				style={{
					//  flex: 1,
					//alignItems: 'center',
					justifyContent: 'flex-start',
					marginTop : 10,
					padding: 0,
				}}>
				<View
				style={{
					justifyContent: 'space-between',
					marginTop :'5%',
					flexDirection: "row",
					//height : 40,
				//	padding : 10,
					alignItems : "center",
				}}>

				<View
				style={{
					justifyContent: 'space-between',
					marginTop :10,
					flexDirection: "column",
					width : '60%',
					//height : 40,
					marginLeft : 10,
				  alignItems : "flex-start",
				}}>
				<Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-bold',fontSize : RFValue(17),textAlign : 'left'}}>{this.state.selectedDayTitle != 0 ? Localized.t('CalenderPage.'+this.state.selectedDayTitle) : ''}</Text>
				<Text style =  {{color : isDarkMode  ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKBLUE,textAlign :'left',fontSize : RFValue(15)}}>{this.state.selectedCurrentDate}</Text>
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
				isVisible={this.state.toolTipCalendarVisible}


				//(Must) When true, tooltip is displayed
				content={

					<View
					style={{
						justifyContent: 'space-between',
						marginTop :0,
						flexDirection: "column",
						//height : 40,
						//	alignItems : "center",
					}}>
					<Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.CalendarOption')}</Text>
					<Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 , marginRight : 5}}>{Localized.t('ToolTipPage.ViewStatisticsforanyperiodoftimeorchoosepreferedtimeinterval')}</Text>



					<View style={{
						alignItems : 'center',
						marginTop :30,
						marginLeft : 0,
						flexDirection: "row",
						justifyContent:  'space-evenly' ,
						//  width : '100%',
					}}>

					<View style={{
						//justifyContent: 'flex-start',

					}}>

					<CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular'}} textStyle = {{color : GLOBAL.COLOR.ORANGE,fontSize : RFValue(20)}}
					/>
					</View>


					<View style={{
						//justifyContent: 'flex-end',
					}}>
					<CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('Statistic')} style = {{width :(screenWidth/2)-30,fontSize : RFValue(20)}}
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
				  <View style = {{width : 40,	alignItems: 'center',justifyContent : 'center',marginRight  :10,flexDirection : 'row'}}>
					<TouchableOpacity
					style={{		shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
							shadowOffset: {
								width: 0,
								height: 7,
							},
							shadowOpacity: 1,
							shadowRadius: 9.11,
					   	borderRadius :  15,
							elevation: 14,
						}}
					onPress={() => this.toggleCalenderModal(true)}>
					<Image style={styles.icon3} source={require('./Assest/calender.png')} />
					</TouchableOpacity>
					</View>

					</Tooltip>
					</View>

					<View
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
					onPress={() => this.selectionOnPress("INVOICES")}>
					<Text style =  {{color : this.state.selectedButton === "INVOICES"
					? GLOBAL.COLOR.ORANGE
					: isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : this.state.selectedButton === "INVOICES"? 'Prompt-SemiBold' :'Prompt-Regular'}}>{Localized.t('DashboardPage.Invoices')}</Text>
					<Image
					style={styles.icon1}
					source = { this.state.selectedButton === "INVOICES" ?
					rectImg :
					null} />
					</TouchableOpacity>
					<TouchableOpacity
					style={styles.button3}
					onPress={() => this.selectionOnPress("PAYMENT GATEWAY")}>
					<Text style =  {{color : this.state.selectedButton === "PAYMENT GATEWAY"
					? GLOBAL.COLOR.ORANGE
					:isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily : this.state.selectedButton === "PAYMENT GATEWAY" ? 'Prompt-SemiBold' :'Prompt-Regular' }}>{Localized.t('DashboardPage.PayementGateway')}</Text>
					<Image
					style={styles.icon1}
					source = { this.state.selectedButton === "PAYMENT GATEWAY" ?
					rectImg :
					null} />
					</TouchableOpacity>
					<TouchableOpacity
					style={styles.button3}
					onPress={() =>this.selectionOnPress("OPEN LINK")}>
					<Text style =  {{color : this.state.selectedButton === "OPEN LINK"
					? GLOBAL.COLOR.ORANGE
					:isDarkMode ? GLOBAL.COLOR.WHITE :  GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(17),fontFamily :this.state.selectedButton === "OPEN LINK" ? 'Prompt-SemiBold' : 'Prompt-Regular'}}>{Localized.t('PGDetailsPage.OpenInvoice')}</Text>
					<Image
					style={styles.icon1}
					source = { this.state.selectedButton === "OPEN LINK" ?
					rectImg :
					null} />
					</TouchableOpacity>
					</View>
         	</View>


         <View  style  = {{display : this.state.selectedButton === "INVOICES" ? this.state.showInvoiceFlag == true ? null : 'none'
                          :  this.state.selectedButton === "PAYMENT GATEWAY" ? this.state.showPaymentGatewayFlag == true ? null : 'none'
													:   this.state.showOpenLinkFlag == true ? null : 'none'
			    }}>

					<View style  =
					{{
						marginTop : 10,
						height: 60,
						marginRight: 10,
						marginLeft: 10,
						backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
						shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
						shadowOffset: {
							width: 0,
							height: 7,
						},
						shadowOpacity: 1,
						shadowRadius: 9.11,
						borderRadius : 15,
						borderWidth : isDarkMode ? 1 : 0,
						borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE,
						elevation: 14
					}}>
						<Carousel activeSlideAlignment='start'
									layout={"default"}
									ref={ref => this.carousel = ref}
									data={this.state.descriptionCarouselItems}
									sliderWidth={Platform.OS === 'android' ? 400 : 380}
									itemWidth={Platform.OS === 'android' ? screenWidth : screenWidth-20}
									renderItem={this._renderItem}
									scrollEnabled={true}
								 	firstItem={ Platform.OS === 'android' ? I18nManager.isRTL? this.state.descriptionCarouselItems.length-1: 0 : 0}
									containerCustomStyle={{marginRight : Platform.OS === 'android' ?   I18nManager.isRTL == true  ?  -40 : 0 : 0 }}
									onSnapToItem = { index =>
										{
												this.setState({ActiveIndex: index})
											console.log(index);

									}
								}
									/>
						</View>

         <View style={{justifyContent: 'center',	 alignItems : 'center'}}>
					<View style={{justifyContent: 'center',	 alignItems : 'center',height : 20,width : 70,marginTop : 10,marginLeft : 12}}>
				 { this.pagination }
				 </View>
				 </View>

					<ScrollView contentContainerStyle={{paddingBottom: 400}}
					refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
           onRefresh={this.onRefresh}
           title=  { I18nManager.isRTL ? "جار التحميل..." : "Loading..."}
            />
          }
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              console.log("Reached end of page");
              if(this.state.scrollRefreshing == false)
              {
                  this.setState({scrollRefreshing :true})
                  if(this.state.DashboardListArray.length > 1 ) { this.getDashboardDetail(false) }
              }
            }

            if(this.isCloseToTop(nativeEvent)){
               console.log("Top of page");
               //this.getQuickInvoiceDetail(true)
              }
          }}
          scrollEventThrottle={400}

					>

					<CustomView style = {{display : this.state.selectedDayTitle.length != 0 ? null : 'none'}}>
					<View
					style={{
						justifyContent: 'space-between',
						marginTop :10,
						flexDirection: "row",
						//height : 40,
						alignItems : "center",
						height : 40,
					  marginLeft :20,
						marginRight :10
					}} >
					<Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('DashboardPage.Statistic')}</Text>

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
	isVisible={this.state.toolTipStatisticVisible}
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
		<Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left',marginLeft : 5 ,marginRight : 5}}>{Localized.t('ToolTipPage.TrackStatisticswithGraph')}</Text>
		<Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left',marginLeft : 5 ,marginRight : 5}}>{Platform.OS === "android" ? (((Localized.t('ToolTipPage.YoucanvisuallytrackyourFinanceInformation').replace("â", "'")).replace("â", "'")).replace('\u009c', "")).replace('\u009d',"")  : (Localized.t('ToolTipPage.YoucanvisuallytrackyourFinanceInformation').replace("â", "'")).replace("â", "'")}</Text>



							<View style={{
								alignItems : 'center',
								marginTop :10,
								marginLeft : 0,
								flexDirection: "row",
								justifyContent:  'space-evenly' ,
							//  width : '100%',
								}}>

							<View style={{
									justifyContent: 'flex-start',

							 }}>

							<CustomButton title= {Localized.t('ToolTipPage.LearnLater')}  onPress={() => this.HideToolTipModal()} style = {{width : (screenWidth/2)-30,backgroundColor : GLOBAL.COLOR.WHITE,borderColor : 'transparent',fontFamily : 'Prompt-Regular',fontSize : RFValue(15)}} textStyle = {{color : GLOBAL.COLOR.ORANGE}}
							/>
							</View>

							<View style={{
									justifyContent: 'flex-end',
							 }}>
								<CustomButton title=  { Localized.t('ToolTipPage.Next') }  onPress={() => this.toggleToolTipModal('Add')} style = {{width : (screenWidth/2)-30,fontSize : RFValue(20)}}
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
					<TouchableOpacity
					style={{
						shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
								shadowOffset: {
									width: 0,
									height: 7,
								},
								shadowOpacity: 1,
								shadowRadius: 9.11,
								borderRadius : 15,
								elevation: 14,
					}}
					onPress={ this.HideView }
					>
					<Image style={styles.icon3}
					source={this.state.isHidden === false ?
					ArrowUP :
					ArrowDown} />
					</TouchableOpacity>

					</Tooltip>

					</View>

					<CustomView hide={this.state.isHidden}>
					<View style = {{marginLeft : 20,backgroundColor : isDarkMode ? GLOBAL.COLOR.DARKBLUE :GLOBAL.COLOR.SHADEGRAY ,width : 80,height : 25,alignItems : 'center',borderRadius : 15}}>
					<Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(13),fontFamily : 'Prompt-SemiBold',marginTop : 3}}>KWD/TIME</Text>
					</View>
					<View style={{ height: 220, padding: 5,flexDirection: 'row'}}>


					<YAxis
					data={this.state.graphYArray}
					style={{width :35,multiline : true}}
					contentInset={contentInset}
					svg={{
						fill: GLOBAL.COLOR.DARKGRAY,
						fontSize:  RFValue(10),
					}}
					numberOfTicks={5}
					formatLabel={(value) => `${(value)/1000}K`}
					/>


          <View style = {{flexDirection: 'column',width : '96%'}}>
					 <View style={{ flexDirection: 'row', height: 200 ,width :'94%'}}>
					<BarChart
					style={{ flex: 1,borderRadius : 0}}
					data={this.state.graphArray}
					gridMin={0}
					yAccessor={({ item }) => { return parseFloat(item.value/1000.0)}}
					contentInset={{ top: 45, bottom: 20,borderRadius : 4 ,marginLeft : 5}}
					spacingInner = { 0.4 }
					borderRadius = { 10 }

					>

         <Labels/>
				 <RoundedLabels/>

				</BarChart>
				</View>
				<XAxis
				 data={this.state.graphArray}
				 style={{ marginTop: 0,height: 20 ,marginLeft : this.state.selectedDayTitle.length != 0 ? 0 : (this.calculateDiffDates() > 6 && this.calculateDiffDates() <11) ? '42%' : 0 ,width :'94%'}}
				 formatLabel={(value, index) => this.state.graphArray[index].XAxisData}
				 contentInset={{ left:  this.state.selectedDayTitle.length != 0 ? this.state.selectedDayTitle == 'Last30Days' ? 30 : this.state.selectedDayTitle == 'Last7Days' ? 20 : 6   : this.calculateDiffDates() >= 7 ? 30 : (this.calculateDiffDates() > 0 && this.calculateDiffDates() <7 )  ? 20 : 6 ,
				                right:  this.state.selectedDayTitle.length != 0 ? this.state.selectedDayTitle == 'Last30Days'  ? 30 : this.state.selectedDayTitle == 'Last7Days' ? 20 : 6  : this.calculateDiffDates() >= 7  ? 30 : (this.calculateDiffDates() > 0 && this.calculateDiffDates() <7 ) ? 20 : 6
			                                                                     }}
				 spacingInner = {0.4}
				 spacingOuter = {0}
				 numberOfTicks= {  this.state.selectedDayTitle == 'Today' ? this.state.graphArray.count : this.state.selectedDayTitle == 'Last7Days' ? this.state.graphArray.count : this.state.graphArray.count}
			    	svg={{ stroke: GLOBAL.COLOR.DARKGRAY,
						strokeWidth: 0.2,
						fontSize:   this.state.selectedDayTitle.length != 0 ? this.state.selectedDayTitle == 'Last30Days' ?  RFValue(10) :  RFValue(12)
						 : this.calculateDiffDates() >= 7 ?  RFValue(10) :  RFValue(12),
            fontWeight: '500',
					}}


				 />

				</View>


					</View>


					</CustomView>

					</CustomView>



					<View
					style={{
						justifyContent: 'space-between',
						marginTop :30,
						flexDirection: "row",
						//height : 40,
						alignItems : "center",
						marginLeft : 20,
						marginRight : 10,
						height : 50
					}} >
					<Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-Medium',marginTop : 0}}>{Localized.t('DashboardPage.RecentTransactions')}</Text>
					<TouchableOpacity
					 style = {{
						 shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
 								shadowOffset: {
 									width: 0,
 									height: 7,
 								},
 								shadowOpacity: 1,
 								shadowRadius: 9.11,
 								borderRadius : 15,
 								elevation: 14,
					 }}
					onPress={() => this.toggleFilterModal(true)}>
					<Image style={styles.icon3} source={require('./Assest/slider.png')} />
					</TouchableOpacity>

					<Modals.BottomModal
					propagateSwipe={true}
					modalData={this.state.modalFilterData}
				 visible={this.state.filterVisible}
				 swipeableModal = {false}
				 //visible = {this.state.modalVisible}
				// onTouchOutside={() => this.setState({ HideModal: false })}
				 height={0.75}
				 width={1}
				// onSwipeOut={() => this.setState({ HideModal: false })}
				 modalTitle={

						<View
						style={{
							justifyContent: 'space-between',
						 	marginTop :10,
							 padding : 10,
							flexDirection: "row",
							width : '100%',
							//height : 40,
							alignItems : "center",
							backgroundColor : GLOBAL.COLOR.WHITE
						}} >

						<TouchableOpacity
						style={styles.button}
						onPress={() => {
						this.toggleFilterModal(!this.state.filterVisible)}}>
						<Image style={styles.icon4} source={require('./Assest/close.png')} />
						</TouchableOpacity>
						<Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 35,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('FilterPage.Filter')}</Text>
						<TouchableOpacity
						style={styles.button1}
						onPress={() =>   this.passDataToFilterModal(true)}>
						<Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize :  RFValue(17)}}> {Localized.t('FilterPage.Clearall')}</Text>
						</TouchableOpacity>
		        </View>

				 }
			 >
				 <ModalContent
					 style={{
						 flex: 1,
						 backgroundColor: 'fff',
					 }}
				 >

				 {/*<FilterList example = {{PaymentStatus:this.state.selectedPaymentStatus,PaymentMethod :this.state.selectedPaymentMethod,ServiceType :"",FromDate : "" ,ToDate : "",fromView :'Dashboard',ClearAll : this.state.FilterClear}}   onSelectFilter={this.filterReceiveData}/>*/}

				 </ModalContent>
			 </Modals.BottomModal>


			 <CalenderModals.BottomModal
				propagateSwipe={true}
				modalData={this.state.modalCalenderData}
			  visible={this.state.calenderVisible}
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
						width : '100%',
						//height : 40,
						alignItems : "center",
						backgroundColor : GLOBAL.COLOR.WHITE
					}} >

					<TouchableOpacity
					style={styles.button}
					onPress={() => {
					this.toggleCalenderModal(!this.state.calenderVisible)}}>
					<Image style={styles.icon4} source={require('./Assest/close.png')} />
					</TouchableOpacity>
					<Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 35,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('CalenderPage.Dates')}</Text>
					<TouchableOpacity
					style={styles.button1}
					onPress={() =>   this.passDataToCalenderModal(true)}>
					<Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize :  RFValue(17)}}> {Localized.t('CalenderPage.Clearall')}</Text>
					</TouchableOpacity>
					</View>

			 }
		 >
			 <ModalContent
				 style={{
					 flex: 1,
					 backgroundColor: 'fff',
				 }}
			 >
			{ /*<CalenderScreen example = {{'currentState' : this.state.selectedDayTitle,'ClearAll' : this.state.modalCalenderData}}  onSelectCalender={this.calenderReceiveData}/>*/}
			 </ModalContent>
		  </CalenderModals.BottomModal>

			<CustomAlertComponent
					displayAlert={this.state.showFaceAlert}
					displayAlertIcon={false}
					alertTitleText={Localized.t('TextValidationPage.Hesabewouldliketoaccessfingerprint/FaceIDdata')}
					alertMessageText={Localized.t('TextValidationPage.Youwouldbeabletologinusingyoursavedbiometricdata')}
					displayPositiveButton={true}
					positiveButtonText={Localized.t('TextValidationPage.Allow')}
					displayNegativeButton={true}
					negativeButtonText={ Platform.OS === "android" ? (Localized.t('TextValidationPage.DontAllow').replace("â", "'")).replace("\u0099", ""):Localized.t('TextValidationPage.DontAllow').replace("â", "'")}
					onPressPositiveButton={this.onPressAlertPositiveButton}
					onPressNegativeButton={this.onPressAlertNegativeButton}
				/>

			<BannerModals
			 propagateSwipe={true}
			 //modalData={this.state.modalCalenderData}
			 visible={this.state.bannerVisible}
			 overlayOpacity={0.5}
			 swipeableModal = {false}
			//visible = {this.state.modalVisible}
		 // onTouchOutside={() => this.setState({ HideModal: false })}
			height={0.90}
			width={0.90}
		 // onSwipeOut={() => this.setState({ HideModal: false })}


		>
			<ModalContent
				style={{
				 flex : 1,
				//backgroundColor : 'transparent',
				marginHorizontal: -20,
			 marginVertical: -24,
				}}
			>


			<ImageBackground style={{ width: '100%',
        height: '100%',
      }}
								resizeMode='cover'
								source={require('./Assest/banner.png')}>
			 <View
			 style={{
				 justifyContent: 'flex-end',
				 marginTop :10,
				 flexDirection: "row",
				 width : '100%',

				 //height : 40,
				 alignItems : "center",
			 }} >

			 <TouchableOpacity
			 style={{ marginRight : 10,}}
			 onPress={() => {
			 this.toggleBannerModal(!this.state.bannerVisible)}}>
			 <Image style={styles.icon4} source={require('./Assest/close.png')} />
			 </TouchableOpacity>
			 </View>

				</ImageBackground>

			</ModalContent>
		 </BannerModals>


					</View>

					<Tooltip


					animated={true}
					// (Optional) When true, tooltip will animate
					// in/out when showing/hiding
					arrowSize={{ width: 16, height: 8 }}
					// (Optional) Dimensions of arrow bubble pointing to
					// the highlighted element
					backgroundColor="rgba(0,0,0,0.5)"

					contentStyle = {{borderRadius : 15,marginTop : screenheight > 667 ? (screenheight/2)-120 : screenheight/2 -150}}

					arrowStyle = {{marginLeft : 0,marginTop : screenheight > 667 ? (screenheight/2)-120 : screenheight/2 - 150}}
					// (Optional) Color of the fullscreen background
					isVisible={this.state.toolTipAddVisible}
					//(Must) When true, tooltip is displayed
					content={

						<View
						style={{
							justifyContent: 'space-between',
							marginTop :0,
							flexDirection: "column",
							 padding : 15
							//height : 40,
							//	alignItems : "center",
						}}>
						<Text style =  {{color : GLOBAL.COLOR.DARKBLUE,fontSize : RFValue(17),fontFamily : 'Prompt-SemiBold',textAlign :'left'}}>{Localized.t('ToolTipPage.CreateInvoicein3Steps')}</Text>
						<Text style =  {{color : GLOBAL.COLOR.DARKGRAY,fontSize : RFValue(15),fontFamily : 'Prompt-Regular',marginTop : 20,textAlign :'left'}}>{ Platform.OS === "android" ? (((((((Localized.t('ToolTipPage.CreateInvoiceMess').replace("â", "'")).replace("â", "'")).replace('\u009c', "")).replace('\u009d',"")).replace('â',"'")).replace("â", "'")).replace('\u009c', "")).replace('\u009d',"")  :  (((Localized.t('ToolTipPage.CreateInvoiceMess').replace("â", "'")).replace("â", "'")).replace("â", "'")).replace("â", "'")}</Text>



						<View style={{
							alignItems : 'center',
							marginTop :30,
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
					<SafeAreaConsumer >
				{insets => (

           console.log('height'+screenheight),

				<TouchableOpacity
					style={{
							 paddingBottom: 0,
					}}

					>
		  	</TouchableOpacity>
			 )}
		 </SafeAreaConsumer>

					</Tooltip>

					<SearchList example = {this.state.selectedButton === "INVOICES" ? 'Invoice' :
				   	this.state.selectedButton === "PAYMENT GATEWAY" ? 'PaymentGateway' : 'OpenLink'}  onSelectSearch={this.searchReceiveData} exampleArray = {this.state.DashboardListArray} onEndSearch={this.searchEndLoading} onSearchFilter={this.searchFilter} />


					</ScrollView>
					</View>

					<View style  = {{display : this.state.selectedButton === "INVOICES" ? this.state.showInvoiceFlag == true ? 'none' : null
                           :  this.state.selectedButton === "PAYMENT GATEWAY" ? this.state.showPaymentGatewayFlag == true ? 'none' : null
 													:   this.state.showOpenLinkFlag == true ? 'none' : null }}>
					<AccessDeniedScreen example = {true}/>
					</View>

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
					 <IllustratorScreen example = {{'index' : this.state.illustratorType}} isDarkMode = {isDarkMode}  onOKClick={this.illustratorReceiveData}/>
					</ModalContent>
				 </IllustratorModals.BottomModal>

					<Modalize
						ref={this.calendarmodal}
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
								backgroundColor : GLOBAL.COLOR.WHITE
							}} >

							<TouchableOpacity
							style={styles.button}
							onPress={() => {
							this.closecalendarModal()}}>
							<Image style={styles.icon4} source={require('./Assest/close.png')} />
							</TouchableOpacity>
							<Text style = {{color : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',marginLeft : 35,fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('CalenderPage.Dates')}</Text>
							<TouchableOpacity
							style={styles.button1}
							onPress={() =>   this.passDataToCalenderModal(true)}>
							<Text style =  {{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-Regular',fontSize :  RFValue(17)}}> {Localized.t('CalenderPage.Clearall')}</Text>
							</TouchableOpacity>
							</View>
						 }
						 //scrollViewProps={{ showsVerticalScrollIndicator: false }}
					//	 onClosed={this.closecalendarModal()}
						// snapPoint={screenheight}
					 >
					 {/*<CalenderScreen example = {{'currentState' : this.state.selectedDayTitle,'ClearAll' : this.state.modalCalenderData}}  onSelectCalender={this.calenderReceiveData}/>*/}
					 </Modalize>
          </>

				);
			}
		}

		const styles = StyleSheet.create({
			container: {
				//flex: 2,
				backgroundColor: '#EEEEEE',
				paddingTop:0,
			},
			icon:{
				width:40,
				height:40,
			},
			icon1:{
				width:8,
				height:8,
				alignItems: 'center',
				justifyContent : 'center',
			},
			icon2:{
				width:50,
				height:40,
				marginTop : -5,
				//  alignItems: 'center',
				//  justifyContent : 'center',
			},
			icon3:{
				width:40,
				height:40,
				//marginTop : -25,
				marginRight : 0

			},
			icon4:{
				width:30,
				height:30,
			},
			image: {
				width: 100,
				height:100,
				marginTop : 20,
				marginLeft : 10,
			},
			box: {
				marginTop:10,
				backgroundColor: GLOBAL.COLOR.WHITE,
				flexDirection: 'row',
				shadowColor: 'black',
				shadowOpacity: .2,
				shadowOffset: {
					height:1,
					width:-2
				},
				elevation:2
			},
			button: {
				alignItems: 'flex-start',
				color : GLOBAL.COLOR.RED,
				width: 100,
				//  marginBottom: 36,
			},
			button1: {
				alignItems: 'flex-end',
				//backgroundColor: '#DDDDDD',
				//  padding: 10,
				width: 150,
				//  marginBottom: 36,
			},
			button2: {
				alignItems: 'center',
				backgroundColor: '#0098E1',
				padding: 10,
				width: '100%',
				//  marginBottom: 36,
			},
			button3: {
				alignItems: 'center',
				//  padding: 10,
				//  width: 150,
				//  marginBottom: 36,
			},
			button4: {
				justifyContent: 'center',
				alignItems : 'center',
				backgroundColor: GLOBAL.COLOR.LIGHTPURPLE,
				padding: 5,
				width: '32%',
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
			button6: {
				justifyContent: 'center',
				alignItems : 'center',
				backgroundColor: GLOBAL.COLOR.ORANGE,
				padding: 5,
				width: '40%',
				height: 45,
				borderRadius : 20

				//  marginBottom: 36,
			},
			info: {
				flex:1,
				flexDirection: 'column',
				alignItems: 'flex-start',
				marginLeft : 20,
				justifyContent: 'center',
			},
			name: {
				fontSize: RFValue(20),
				marginTop:10,
				color: '#333'
			},
			row: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginHorizontal: 0,
				marginTop:0
			},
			iconContainer: {
				flex: 1,
				alignItems:'flex-end',
				marginRight:20,

			},
			iconFonts: {
				color: 'gray',
			},
			red: {
				color: '#FF4500',
			},
			modal: {
				flex: 1,
			//	alignItems: 'center',
				backgroundColor: GLOBAL.COLOR.WHITE,
				padding: 0,
			},
			buttonContainer: {
				backgroundColor: '#fff',
			        //width: 300,
			        //height: 60,
			        shadowColor: '#000',
			        shadowOffset: { width: 1, height: 1 },
			        shadowOpacity:  0.4,
			        shadowRadius: 3,
			        elevation: 5,
  },
		});
