import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,StyleSheet,TouchableOpacity,Image } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Localized from '../locales'
const GLOBAL = require('../utils/Globals');
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
    this.makeRemoteRequest()
  }

  componentDidMount() {
    // this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    console.log("cscsc" + this.props.exampleArray);
    //this.setState({ loading: true });

    /*fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });*/

      this.setState({
        data:   this.props.exampleArray,
      });
      this.arrayholder =   this.props.exampleArray;

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
      const itemData = `${item.name.toUpperCase()}}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        lightTheme

        //backgroundColor = GLOBAL.COLOR.SHADEGRAY
        style = {{fontSize : RFValue(18)}}
        placeholder={Localized.t('DashboardPage.Search')}
        placeholderTextColor= {GLOBAL.COLOR.DARKGRAY}
        platform={Platform.OS}
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  listSelectiononPress(item) {
    var filterData = item
     this.props.onSelectSearch(filterData);
  }


  render() {



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
          padding :10,
          flexDirection: "row",
          //height : 40,
          alignItems : "center",
        }}>
          <Text style={styles.textHeaderStyle}>{Localized.t('InvoiceOpenDetailsPage.TotalCustomers')}</Text>
            <Text style={{color : GLOBAL.COLOR.ORANGE,fontFamily : 'Prompt-SemiBold',fontSize : RFValue(17)}}>{this.props.noofCount}</Text>

          </View>
        <FlatList

          data={this.state.data}

          renderItem={({ item,index }) => (
             // Single Comes here which will be repeatative for the FlatListItems
             // Single Comes here which will be repeatative for the FlatListItems
             <View
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
               backgroundColor : GLOBAL.COLOR.WHITE
               //height : 40,
               //alignItems : "flex-start",
             }}>
               <TouchableOpacity
                style = {{padding : 10}}
               onPress={() => {
                 this.listSelectiononPress(item)}}>
             <View
               style={{
                 justifyContent: 'space-between',
                 marginTop :0,
                 flexDirection: "row",
                 //height : 40,
                 alignItems : "flex-end",
               }}>

               <View
               style={{
                 justifyContent: 'space-between',
                 marginTop :0,
                 flexDirection: "row",
                 //height : 40,
                 alignItems : "center",
               }}>


              <MaterialCommunityIcons name="checkbox-blank-circle" color = { index%2 == 0 ? GLOBAL.COLOR.GREEN : GLOBAL.COLOR.RED}  size={18} />
             <Text style={styles.textStyle}>{`${item.name}` }</Text>
                </View>

            <Image  style = {{color : 'gray'}} source={require('../screens/pages/Assest/rightArrow.png')} />
             </View>
               <View style={styles.borderContainer}>
               <View style={styles.border} />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  marginTop :0,
                  flexDirection: "row",
                  //height : 40,
                  alignItems : "flex-end",
                }}>
              <View
              style={{
                justifyContent: 'space-between',
                marginTop :0,
                flexDirection: "row",
                //height : 40,
                alignItems : "center",
              }}>


               <Text style={styles.textStyle1}>{item.phone_number}</Text>
               </View>
               <Text style={styles.textStyle2}>{GLOBAL.CURRENCY + ' ' + item.amount}</Text>
              </View>
              </TouchableOpacity>
             </View>

           )}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}

        />
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
  textStyle: {
    color : GLOBAL.COLOR.DARKBLUE,
    fontFamily : 'Prompt-Medium',
    padding: 10,
    fontSize :  RFValue(15)
  },
  textHeaderStyle: {
    color : GLOBAL.COLOR.DARKBLUE,
    fontFamily : 'Prompt-Medium',
    padding: 10,
    fontSize :  RFValue(17)
  },
  textStyle1: {
    color : 'gray',
    padding:  RFValue(10),
  },
  textStyle2: {
    color : GLOBAL.COLOR.DARKBLUE,
    fontFamily : 'Prompt-SemiBold',
    padding: 10,
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
