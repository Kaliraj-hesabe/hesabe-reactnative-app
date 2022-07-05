
import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,
  FlatList,Image,ScrollView,Switch,Dimensions,TouchableHighlight,PermissionsAndroid,TextInput,Keyboard} from 'react-native';


import { CustomButton } from '../../../components/CustomButton.js';
import Contacts from 'react-native-contacts';
import Localized from '../../../locales';
import ListItem from "./ListItem";
const GLOBAL = require('../../../utils/Globals');
import {DarkModeContext} from 'react-native-dark-mode';



//import Modal from 'react-native-modal';


export default class ContactListScreen extends Component {
  constructor(){
     super();
    this.state = {

      contacts: [],
       loading: true
    };

     Contacts.iosEnableNotesUsage(false);
  }

  async componentDidMount() {

    if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Choose your contact',
              message: 'Authorize access to your contact information',
              buttonNeutral: "Authorized access",
              buttonNegative: "Refuse",
              buttonPositive: "agree"
            }
          )

            // alert('contactGrant :' + granted);
             //alert('contactGrant :' + PermissionsAndroid.RESULTS.GRANTED);

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //  resolve()
          //  alert('contactGrant :' + granted);
            this.loadContacts();
          } else {
            toast('You have denied access to the address book, please go to settings to open')
            reject()
          }
        } catch (error) {
          //toast('Permission acquisition failed')
          reject()
        }
      }

    /*  if (Platform.OS === "android") {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: "Contacts",
          message: "This app would like to view your contacts."
        }).then(() => {
          this.loadContacts();
        });
      }*/
      else {
        this.loadContacts();
      }
    }

 static contextType = DarkModeContext;

    loadContacts() {
    Contacts.getAll()
      .then(contacts => {
         //console.log('contacts -> ', contacts);

      //  console.log('filContact :' + contacts.length);
     console.log("cfcf :" +  this.props.example);
     var filterContacts = [];
     if(this.props.example == "email")
     {
       for(let i = 0 ; i < contacts.length ; i++)
       {

            if(contacts[i].emailAddresses.length != 0)
            {
             //console.log('filContact : ' + contacts[i].phoneNumbers);
                filterContacts.push(contacts[i])
            }
       }
     }
     else {
       for(let i = 0 ; i < contacts.length ; i++)
       {

            if(contacts[i].phoneNumbers.length != 0)
            {
             //console.log('filContact : ' + contacts[i].phoneNumbers);
                filterContacts.push(contacts[i])
            }
       }



     }

     contacts = filterContacts
      this.setState({ contacts, loading: false });


      })
      .catch(e => {
        this.setState({ loading: false });
      });

    Contacts.getCount().then(count => {
      this.setState({ searchPlaceholder: `Search ${count} contacts` });
    });


  }




  render()
  {
    const isDarkMode = this.context === 'dark';

    const search = (text) => {
      const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
       const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
       if (text === "" || text === null) {
         this.loadContacts();
       }
       /*else if (phoneNumberRegex.test(text)) {
         Contacts.getContactsByPhoneNumber(text).then(contacts => {
          // this.setState({ contacts });

          var filterContacts = [];
          if(this.props.example == "email")
          {
            for(let i = 0 ; i < contacts.length ; i++)
            {

                 if(contacts[i].emailAddresses.length != 0)
                 {
                  //console.log('filContact : ' + contacts[i].phoneNumbers);
                     filterContacts.push(contacts[i])
                 }
            }
          }
          else {
            for(let i = 0 ; i < contacts.length ; i++)
            {

                 if(contacts[i].phoneNumbers.length != 0)
                 {
                  //console.log('filContact : ' + contacts[i].phoneNumbers);
                     filterContacts.push(contacts[i])
                 }
            }



          }

          contacts = filterContacts
           this.setState({ contacts});

         });
       } else if (emailAddressRegex.test(text)) {
         Contacts.getContactsByEmailAddress(text).then(contacts => {

           var filterContacts = [];
           if(this.props.example == "email")
           {
             for(let i = 0 ; i < contacts.length ; i++)
             {

                  if(contacts[i].emailAddresses.length != 0)
                  {
                   //console.log('filContact : ' + contacts[i].phoneNumbers);
                      filterContacts.push(contacts[i])
                  }
             }
           }
           else {
             for(let i = 0 ; i < contacts.length ; i++)
             {

                  if(contacts[i].phoneNumbers.length != 0)
                  {
                   //console.log('filContact : ' + contacts[i].phoneNumbers);
                      filterContacts.push(contacts[i])
                  }
             }



           }

           contacts = filterContacts
            this.setState({ contacts});
         });
       }*/
        else {
         Contacts.getContactsMatchingString(text).then(contacts => {
          // this.setState({ contacts });

          var filterContacts = [];
          if(this.props.example == "email")
          {
            for(let i = 0 ; i < contacts.length ; i++)
            {

                 if(contacts[i].emailAddresses.length != 0)
                 {
                  //console.log('filContact : ' + contacts[i].phoneNumbers);
                     filterContacts.push(contacts[i])
                 }
            }
          }
          else {
            for(let i = 0 ; i < contacts.length ; i++)
            {

                 if(contacts[i].phoneNumbers.length != 0)
                 {
                  //console.log('filContact : ' + contacts[i].phoneNumbers);
                     filterContacts.push(contacts[i])
                 }
            }



          }

          contacts = filterContacts
           this.setState({ contacts});
         });
       }
  }

  const openContact = (contact) => {

   this.props.onContactSelect(contact);

  }

    return(


      <SafeAreaView style={[styles.container,{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}]} >
        <View style={[styles.container]}>

          <TextInput
            onChangeText={search}
            placeholder='Search'
            placeholderTextColor = {isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKGRAY}
            style={[styles.searchBar,{background :  isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.DARKGRAY,color  : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.BLACK}]}
          />
          <FlatList
            data={this.state.contacts}
            renderItem={(contact) => {
              {console.log('contact -> ' + JSON.stringify(contact))}
              return (<ListItem
                key={contact.item.recordID}
                item={contact.item}
                onPress={openContact}
              />)
            }}
            keyExtractor={item => item.recordID}
          />
        </View>
      </SafeAreaView>
      );
    }
  }


  const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4591ed',
    color: GLOBAL.COLOR.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20
  },
  searchBar: {
    //backgroundColor: '#f0eded',
    paddingHorizontal: 30,
    paddingVertical: (Platform.OS === "android") ? undefined: 15,
  }
});
