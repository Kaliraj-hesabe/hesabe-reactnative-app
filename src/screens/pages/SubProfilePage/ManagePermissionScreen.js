
import React, {Component} from 'react';
import rectImg from '../Assest/rectangle.png';
import grayrectImg from '../Assest/calender.png';

import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Dimensions,TouchableHighlight,I18nManager,RefreshControl} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import Localized from '../../../locales'
import EmployeeList from '../../../components/EmployeeList';
import AddEmployeeScreen from './AddEmployeeScreen';
import { Modalize } from 'react-native-modalize';
import EditDetailScreen from './EditDetailScreen';
import AccessDeniedScreen from '../../../components/AccessDeniedScreen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const GLOBAL = require('../../../utils/Globals');
import {DarkModeContext} from 'react-native-dark-mode';
//import Modal from 'react-native-modal';



export default class ManagePermissionScreen extends Component {
  constructor(){
    super();
    this.addReceiveData = this.addReceiveData.bind(this);
    this.AcceddDeniedReceiveData = this.AcceddDeniedReceiveData.bind(this);
    this.editReceiveData = this.editReceiveData.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.ScrollRefreshData = this.ScrollRefreshData.bind(this);

    this.state = {
     	selectedButton: "All",
      editData : '',
      addEmployeePermission : true,
      editEmployeePermission : true,
      viewEmployeePermission : true,
      employeeClear :false,
      refreshing : false,
      scrollRefreshing : false,
    };



  }

static contextType = DarkModeContext;

  componentDidMount() {

    if(global.employeFlag)
    {
        this.getPermissionAccess();
    }
  }

  addemployModal = React.createRef();
  openAddemployModal = () => {
      if (this.addemployModal.current) {
        this.addemployModal.current.open();
      }
    };

  closeAddemployModal= () => {
        if (this.addemployModal.current) {
          this.addemployModal.current.close();
        }
      };


      editemployModal = React.createRef();
      openEditemployModal = () => {
          if (this.editemployModal.current) {
            this.editemployModal.current.open();
          }
        };

      closeEditemployModal= () => {
            if (this.editemployModal.current) {
              this.editemployModal.current.close();
            }
          };


    getPermissionAccess()
    {
        console.log('cvcv starting');

        var list = {};
        if(global.employeePermission != null)
        {
        global.employeePermission.map((y) => {

              if(y.id == 1)
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


             if(arr[0].id == 5)
             {
                arr[0].status == true ?  this.setState({ viewEmployeePermission: true }) :  this.setState({ viewEmployeePermission: false });
             }

             if(arr[1].id == 6)
             {
                arr[1].status == true ?  this.setState({ addEmployeePermission: true }) :  this.setState({ addEmployeePermission: false });
             }

             if(arr[2].id == 7)
             {
                arr[2].status == true ?  this.setState({ editEmployeePermission: true }) :  this.setState({ editEmployeePermission: false });
             }
              console.log(arr);
            }
            else {
              this.setState({ viewEmployeePermission: false });
              this.setState({ addEmployeePermission: false });
              this.setState({ editEmployeePermission: false });
            }
              //console.log(arr[1].id);


      }

  applyOnPress() {

    // this.props.onProfileReturn('false');
     this.props.navigation.navigate('Profile')
  }


  refreshData()
  {
     this.setState({refreshing :false})
     this.setState({ employeeClear: false });
  }

  ScrollRefreshData()
  {
    this.setState({ scrollRefreshing: false });
  }

    addReceiveData(calenderValue)
    {
       //	this.toggleCalenderModal(!this.state.calenderVisible)
       this.closeAddemployModal()
       this.setState({ employeeClear: true });
     }

     AcceddDeniedReceiveData(Value)
     {
        //	this.toggleCalenderModal(!this.state.calenderVisible)
        this.closeAddemployModal()

      }

     toggleModal(visible) {
         this.setState({ bottomModalAndTitle: visible });

       }

       selectionOnPress(userType) {
         this.setState({ selectedButton: userType });
       }


       editReceiveData(filterValue)
  		 {
         this.setState({ editData: filterValue });
  			  this.openEditemployModal()
      }

      afterEditRefresh()
      {
        this.setState({ employeeClear: true });
      }


      isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    };


    onRefresh = () =>
    {
          console.log('refresh started');
         this.setState({refreshing :true})
         this.setState({ employeeClear: true });
      //  this.getDashboardDetail(false)

     }

  render(){
    const isDarkMode = this.context === 'dark';
   const screenWidth = Dimensions.get("window").width;

    return(
      <>
        <View style={{ flex: 1,backgroundColor :  isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}>

          <View  style={{
            flexDirection : 'column',
            //justifyContent: 'center',
          //  alignItems: 'center',
            backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
          //  marginTop : 100,
          //  height :'100%',
            //borderRadius : 12
          }}>

          <View
          style={{
            justifyContent: 'space-between',
            marginTop :20,
            flexDirection: 'row',
            //width : '100%',
            height : 80,
            alignItems : 'center',
            padding : 20,
          }}>


          <TouchableOpacity
        style={{   shadowColor: isDarkMode ? 'transparent' : GLOBAL.COLOR.LIGHTPURPLE,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 1,
              shadowRadius: 9.11,
              borderRadius : 20,
              elevation: 14,
              //marginLeft :10,
              justifyContent : 'flex-start',

            }}
          onPress={() => {
                  this.applyOnPress()
              }}>

          <Image style ={{borderRadius : 15}}  source={global.selectValue == 'en' ?  require('../Assest/leftArrow.png') : require('../Assest/rightArrow.png')} />
          </TouchableOpacity>

          <View   style={{width : '70%'}} >
          <Text style={{fontSize:  RFValue(22),color :isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,fontFamily : 'Prompt-Medium',marginLeft : 20,textAlign : 'center'}}>{Localized.t('ManagePermissionPage.ManageUsers')}</Text>
          </View>


          <TouchableOpacity
          style={{marginTop : 10,marginLeft : global.selectValue == 'en' ? -30 : -50}}
          onPress={() => this.openAddemployModal()}>
          <Image  source={require('../Assest/plus.png')} />
          </TouchableOpacity>
          </View>

          <View  style = {{display :  this.state.viewEmployeePermission == true ?  null : 'none'}}>
          <View style  =
          {{
            justifyContent: 'space-around',
            marginTop :10,
            marginLeft :5,
            marginRight :5,
            flexDirection: "row",
            height : 60,
            padding : 10,
            alignItems : "center",
            backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,

            shadowColor: GLOBAL.COLOR.LIGHTPURPLE,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: isDarkMode ? 0 : 0.41,
            shadowRadius: 9.11,
            borderRadius : 15,
            elevation: 14
          }}>
          <TouchableOpacity
          style={styles.button3}
          onPress={() => this.selectionOnPress("All")}>
          <Text style =  {{color : this.state.selectedButton === "All"
          ? GLOBAL.COLOR.ORANGE
          : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : this.state.selectedButton === "All" ? 'Prompt-SemiBold' : 'Prompt-Regular'}}>{Localized.t('ManagePermissionPage.All')}</Text>
          <Image
          style={styles.icon1}
          source = { this.state.selectedButton === "All" ?
          rectImg :
          null} />
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button3}
          onPress={() => this.selectionOnPress("Active")}>
          <Text style =  {{color : this.state.selectedButton === "Active"
          ? GLOBAL.COLOR.ORANGE
          : isDarkMode ? GLOBAL.COLOR.WHITE :GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily : this.state.selectedButton === "Active" ? 'Prompt-SemiBold' : 'Prompt-Regular'}}>{Localized.t('ManagePermissionPage.Active')}</Text>
          <Image
          style={styles.icon1}
          source = { this.state.selectedButton === "Active" ?
          rectImg :
          null} />
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button3}
          onPress={() =>this.selectionOnPress("Inactive")}>
          <Text style =  {{color : this.state.selectedButton === "Inactive"
          ? GLOBAL.COLOR.ORANGE
          : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY,fontSize :  RFValue(17),fontFamily :  this.state.selectedButton === "Inactive" ? 'Prompt-SemiBold' : 'Prompt-Regular'}}>{Localized.t('ManagePermissionPage.Inactive')}</Text>
          <Image
          style={styles.icon1}
          source = { this.state.selectedButton === "Inactive" ?
          rectImg :
          null} />
          </TouchableOpacity>
          </View>


          <ScrollView contentContainerStyle={{paddingBottom: 500}}

          refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
           onRefresh={this.onRefresh}
           title={ I18nManager.isRTL ? "جار التحميل..." : "Loading..."}
            />
          }
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              console.log("Reached end of page");
              if(this.state.scrollRefreshing == false)
              {
                  this.setState({scrollRefreshing :true})
                  //if(this.state.DashboardListArray.length > 1 ) { this.getDashboardDetail(false) }
              }
            }

          }}
          scrollEventThrottle={400}
          >
         	<EmployeeList  example = {{selectedTab : this.state.selectedButton === "All" ? 'All' :
				   	this.state.selectedButton === "Active" ? 'Active' : 'Inactive',ClearAll : this.state.employeeClear,ScrollDownRefresh : this.state.scrollRefreshing}} onEditEmployee={this.editReceiveData} onRefresh={this.refreshData}  onScrollRefresh={this.ScrollRefreshData}/>
            </ScrollView>

        </View>

        <View style  = {{display :  this.state.viewEmployeePermission == true ? 'none' : null}}>
        <AccessDeniedScreen example = {true}/>
        </View>

        </View>

        </View>


          <Modalize
            ref={this.addemployModal}
            scrollViewProps={{ showsVerticalScrollIndicator: false ,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
             HeaderComponent={

               <View
              style={{
              //  justifyContent: 'center',
                marginTop :0,
                // padding : 10,
              //  width : '100%',
                //height : 40,

                backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE

              }} >

               <View style = {{marginTop : 20 ,alignItems : "center",marginBottom : 10,  flexDirection: "row",justifyContent : 'space-between'}}>
              <TouchableOpacity
              style={{width : '20%'}}
              onPress={() => {
              this.closeAddemployModal()}}>
              <Image style={styles.icon4} source={require('../Assest/close.png')} />
              </TouchableOpacity>
              <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,textAlign : 'center',fontSize :  RFValue(22),fontFamily : 'Prompt-Medium',width : '60%'}}>{Localized.t('AddEmployeePage.AddnewEmployee')}</Text>
              <Text style = {{ width : '20%'}}></Text>
              </View>
              </View>
             }
           >
          {this.state.addEmployeePermission == true ?  <AddEmployeeScreen onSelectEmployee={this.addReceiveData}/>
           : <AccessDeniedScreen example = {false} onOKDeniedClick={this.AcceddDeniedReceiveData} /> }
           </Modalize>


           <Modalize
             ref={this.editemployModal}
             scrollViewProps={{ showsVerticalScrollIndicator: false ,backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}}
              HeaderComponent={

                <View
                 style={{

                   backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
                 }} >

                   <View style = {{marginTop : 20 ,alignItems : "center",marginBottom : 10,  flexDirection: "row",justifyContent : 'space-between'}}>
                 <TouchableOpacity
                 style={{width : '20%'}}
                 onPress={() => {
                   this.closeEditemployModal(),this.afterEditRefresh()}}>
                 <Image style={styles.icon4} source={require('../Assest/close.png')} />
                 </TouchableOpacity>

                 <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize :  RFValue(22),fontFamily : 'Prompt-Medium',textAlign : 'center',width : '60%'}}>{Localized.t('EditDetailPage.EditDetails')}</Text>
                 <Text style = {{width : '20%'}}></Text>
                 </View>
                 </View>
              }
            >
             <EditDetailScreen example = {this.state.editData}/>
            </Modalize>
           </>
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


  });
