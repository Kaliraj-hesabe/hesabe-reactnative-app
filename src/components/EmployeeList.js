import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,StyleSheet,TouchableOpacity,Image,Dimensions } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Localized from '../locales'
import EditDetailScreen from '../screens/pages/SubProfilePage/EditDetailScreen';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

import API from '../utils/API';
const GLOBAL = require('../utils/Globals');
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {DarkModeContext} from 'react-native-dark-mode';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      totalEmployee: '',
      activeEmployee: '',
      inactiveEmployee: '',
      error: null,
      HideModal: false,
      modalData : null,
      page: 1,
      designationsArray : [],
      isLoadingMore: true,
      multipleLoading : false,
      loadingProgress : false,
    };

    this.arrayholder = [];
  }

static contextType = DarkModeContext;

  componentDidMount() {
    this.makeRemoteRequest();
    this.getDesignationDetail();
  }

  toggleModal(visible) {
    this.setState({ HideModal: visible });

  }

passDataToModal(item)
{

   /*this.setState({
     HideModal: true,
     modalData:item
   });*/

   this.props.onEditEmployee(item);

   //you can open modal here
}


  makeRemoteRequest = () => {

        var self = this;
      API.get(GLOBAL.API_STRING.EMPLOYEES + `?page=${self.state.page}`,{

        params: {
           'merchantCode' : GLOBAL.MERCHANT_CODE,
          }
      }).then(function (response) {
        console.log('employee response:' + response);
       const json = JSON.parse(response)
        var pageurl;


       if(json.response.pagination.next_page_url != null)
       {
        let pg = json.response.pagination.next_page_url.split('=');
        pageurl = pg[1]
      }else {

        pageurl = null
      }



    self.setState(prevState =>
      ({
      data: [...prevState.data,...json.response.data]
       }))




    self.setState({
      totalEmployee : json.response.pagination.total,
      error: json.response.error || null,
      page: pageurl,
    //  multipleLoading : pageurl != null ? true : false
   }, () => {

    /* if(self.state.multipleLoading == true)
     {
       pageurl != null ? self.makeRemoteRequest()
       :  self.setState({
           multipleLoading: false
         });
     }*/

    });





      self.arrayholder = self.state.data;

       console.log('hi')

      const activeEmployee =
      self.arrayholder.filter(movie => movie.status === 1);

      const inactiveEmployee =
      self.arrayholder.filter(movie => movie.status === 0);



      self.setState({
        activeEmployee: activeEmployee.length,
        inactiveEmployee : inactiveEmployee.length,
        loadingProgress : false
      });




      })


      .catch(function (error) {
    //  this.setState({ error});
      });

  };


  getDesignationDetail() {
   var self = this;
   API.get(GLOBAL.API_STRING.DESIGNATION,{

     params: {
        'merchantCode' : GLOBAL.MERCHANT_CODE,
       }


   }).then(function (response) {

     const json = JSON.parse(response)
    //  console.log(json);

      let newArray = json.response.data



     self.setState({
      designationsArray: newArray
     })


          console.log(self.state.designationsArray);

   })
   .catch(function (error) {
     console.log(error);
   });


 }


  onEndReached = (distanceFromEnd) => {
     if (!this.isLoadingMore) {
       if(this.state.page != null)
       {
         this.makeRemoteRequest();
       }

       this.isLoadingMore = true;
     }
   };



  renderSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: '100%',
          backgroundColor: 'rgba(243,243,243,0.7)',
          marginLeft: '0%',
          shadowColor: GLOBAL.COLOR.LIGHTPURPLE,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,

          elevation: 12,
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.username.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    const isDarkMode = this.context === 'dark';
    return (
      <SearchBar
        lightTheme

        //backgroundColor = GLOBAL.COLOR.SHADEGRA
        placeholder={Localized.t('DashboardPage.Search')}
        placeholderTextColor= {isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY}
        //platform={Platform.OS}
        platform={"ios"}
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
        inputStyle={{textAlign : global.selectValue == 'en' ? 'left' : 'right'}}
        cancelButtonTitle=  {Platform.OS === "ios" ? "Cancel" :"Cancel "}

        style = {{fontSize : RFValue(18),color : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.DARKGRAY}}
        inputContainerStyle={{backgroundColor: 'transparent'}}
        containerStyle={{backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK  : GLOBAL.COLOR.SHADEGRAY,
          borderWidth: isDarkMode ? 1  : 0,
          borderRadius: 20,
          marginLeft : 10,
          marginRight : 10,
          height : 55,
          borderColor : isDarkMode ? GLOBAL.COLOR.WHITE  : GLOBAL.COLOR.WHITE,
          borderTopColor: isDarkMode ? GLOBAL.COLOR.WHITE  :GLOBAL.COLOR.WHITE,
          borderBottomColor :isDarkMode ? GLOBAL.COLOR.WHITE  :GLOBAL.COLOR.WHITE
         }}
      />
    );
  };

  render() {
      const isDarkMode = this.context === 'dark';
      const {height} = Dimensions.get('window');
     console.log('drdd :' + this.props.example.ClearAll);

      if(this.props.example.ClearAll)
      {
        if(this.state.loadingProgress == false)
        {
              this.setState({
                            data: [],
                            page : 1,
                            loadingProgress: true,
                         }, () => {
                           this.makeRemoteRequest();
                           this.props.onRefresh();
                          });
          }

      }

      if(this.props.example.ScrollDownRefresh)
      {
        console.log("PPPP" + this.state.page);
        if(this.state.page != null)
        {
            if(this.state.loadingProgress == false)
            {
              this.setState({
                loadingProgress: true,
              });
            this.makeRemoteRequest();
            }
            this.props.onScrollRefresh();

          }

      }

     var selectedValue = this.props.example.selectedTab == 'All' ? 2 : this.props.example.selectedTab == 'Active' ? 1 : 0
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>

      <View
      style={{
        justifyContent: 'space-between',
        marginTop :20,
        flexDirection: "row",
        //height : 40,
        alignItems : "flex-start",
        height : 50
      }} >
      <Text style =  {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginLeft : 10,fontSize :  RFValue(17),fontFamily : 'Prompt-Medium'}}>
      {this.props.example.selectedTab === "Active" ? Localized.t('ManagePermissionPage.ActiveUser')
      : this.props.example.selectedTab === "Inactive" ? Localized.t('ManagePermissionPage.InactiveUser') : Localized.t('ManagePermissionPage.AllUser')}
      </Text>
      <Text style =  {{color : GLOBAL.COLOR.ORANGE,fontSize :  RFValue(17),fontFamily : 'Prompt-Medium',marginRight :20 }}>{ this.props.example.selectedTab == 'All' ? this.state.totalEmployee : this.props.example.selectedTab == 'Active' ? this.state.activeEmployee : this.state.inactiveEmployee}</Text>
      </View>

      <Modal.BottomModal
      propagateSwipe={true}
      modalData={this.state.modalData}
     visible={this.state.HideModal}
     swipeableModal = {false}
     //visible = {this.state.modalVisible}
    // onTouchOutside={() => this.setState({ HideModal: false })}
     height={0.95}
     width={1}
    // onSwipeOut={() => this.setState({ HideModal: false })}
     modalTitle={



       <View
        style={{
          //justifyContent: 'center',
          marginTop :20,
          marginLeft : 0,
          flexDirection: "row",
          width : '100%',
          //height : 40,
          alignItems : "center",
          backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE
        }} >

        <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          this.toggleModal(!this.state.HideModal)}}>
        <Image style={styles.icon4} source={require('../screens/pages/Assest/close.png')} />
        </TouchableOpacity>

        <Text style = {{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,alignItems : 'center',fontSize :  RFValue(22),fontFamily : 'Prompt-Medium'}}>{Localized.t('EditDetailPage.EditDetails')}</Text>
        </View>

     }
   >
     <ModalContent
       style={{
         flex: 1,
         backgroundColor: isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE,
       }}
     >

     <EditDetailScreen example = {this.state.modalData}/>

     </ModalContent>
   </Modal.BottomModal>

       <View style={{flex:1}}>
        <FlatList

          data = {this.state.data}
          renderItem={({item}) => {
          if(item.status == selectedValue || selectedValue == 2)
          {

          // console.log('here is your thing',item);
           //console.log('thing',item.MerchantUserName);
             // Single Comes here which will be repeatative for the FlatListItems
             // Single Comes here which will be repeatative for the FlatListItems
            return <View
            style={{
              justifyContent: 'space-between',
              marginTop :10,
              marginLeft : 10,
              marginRight : 10,
              flexDirection: "column",
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
              borderColor : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.WHITE
              //height : 40,
              //alignItems : "flex-start",
            }}>

             <View
               style={{
                 justifyContent: 'space-between',
                 marginTop :0,
                 flexDirection: "row",
                 //height : 40,
                 alignItems : "center",
               }}>
             <Text style={[styles.textStyle, {color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{item.username}</Text>

              <TouchableOpacity
            //  style={styles.button1}
              onPress={() => {
                this.passDataToModal(item)
              }}>
               <Text style={[styles.textStyle,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE}]}>{Localized.t('EmployerSearchPage.Edit')}</Text>
              </TouchableOpacity>

             </View>
             <View
               style={{
                 justifyContent: 'space-between',
                 marginTop :0,
                 flexDirection: "row",
                 //height : 40,
                 alignItems : "center",
               }}>
               <Text style={styles.textStyle1}>{item.email}</Text>
                 <Text style={styles.textStyle1}>

                 </Text>
                </View>
               <View style={styles.borderContainer}>
               <View style={styles.border} />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  marginTop :0,
                  flexDirection: "row",
                  alignItems : "center",
                  marginLeft : 10,
                  marginBottom : 10
                }}>

                <TouchableOpacity
                style={{...styles.button,...{backgroundColor : item.status == 0 ? GLOBAL.COLOR.SHADEGRAY  :GLOBAL.COLOR.LIGHTBLUE}}}
                disabled = {true}
                /*onPress={() => {
                      this.props.navigation.navigate('EditDetailScreen')
                    }}*/
                  >

                 {item.status == 0 ? <Text style={{...styles.textStyle3,...{color :item.status == 0 ? GLOBAL.COLOR.DARKGRAY  :GLOBAL.COLOR.WHITE }}}> {Localized.t('EmployerSearchPage.InActive')}</Text> : <Text style={styles.textStyle3}>{Localized.t('EmployerSearchPage.Active')}</Text> }
                </TouchableOpacity>

             <View>
              {
                this.state.designationsArray.map((item1, index) =>
                {
                  if (item1.id == item.designation_id){
                   return (
                    <Text style={[styles.textStyle2,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,marginRight : 10}]}>{item1.name}</Text>
                   )
                    }

                    return null;
               })
              }
              </View>

              </View>
             </View>
           }
         }}

          keyExtractor={item => item.id}
        //  ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
           //  onRefresh={this.makeRemoteRequest()}
          onEndReachedThreshold={0.5}
        //  onEndReached={this.onEndReached.bind(this)}


          //onMomentumScrollBegin={() => {this.isLoadingMore = false;}}



        />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:GLOBAL.COLOR.WHITE,
    marginTop: Platform.OS == 'ios'? 30 : 0
  },
  button: {
   backgroundColor : GLOBAL.COLOR.LIGHTBLUE,
   borderRadius : 15,
   width : 100,
   height : 35,
   alignItems : 'center',
   marginTop : 10
  },
  button1: {
   backgroundColor : GLOBAL.COLOR.WHITE,
   borderRadius : 15,
   marginLeft : 15,
   width : 100,
   height : 35,
   alignItems : 'flex-start'
  },
  textStyle: {
    fontFamily : 'Prompt-Medium',
    padding: 10,
    fontSize :  RFValue(15)
  },
  textStyle1: {
    color : 'gray',
    padding: 10,
    width : '100%'
  },
  textStyle2: {
    fontFamily : 'Prompt-SemiBold',
  //  padding: 10,
  },
  textStyle3: {
    color : GLOBAL.COLOR.WHITE,
    fontFamily : 'Prompt-Medium',
    padding: 5,
    fontSize :  RFValue(15),
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

export default FlatListDemo;
