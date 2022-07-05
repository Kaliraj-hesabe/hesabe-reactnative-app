import axios from "axios";

//import hesabeCrypt from 'hesabe-crypt';

import aesjs from 'aes-js';
import { showLoader, hideLoader } from './AppLoader.js';
import {Alert,NativeModules} from 'react-native';

const GLOBAL = require('./Globals');
const hesabeCrypt = require("./HesabeCrypt");

import IllustratorModals, {} from 'react-native-modals';
import IllustratorScreen  from '../components/IllustratorScreen.js';
import OpenNativeScreen from "react-native-open-native-screen";



const instance = axios.create({
  baseURL:  GLOBAL.BASE_URL,
  responseType: "json",
   //timeout: 8000,
   maxRedirects: 5,
   maxContentLength: 2000,
   maxBodyLength: 2000,

});






instance.interceptors.request.use(request => {

  showLoader()
//  instance.defaults.timeout = Number(global.TokenExpires);
//  instance.defaults.headers.post['Authorization'] = global.TokenType +" "+ global.Token;
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.post['Accept-Type'] = 'application/json';
  //instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  //instance.defaults.headers.post['accessCode'] = GLOBAL.ACESS_CODE;
  request.headers['Authorization'] =  global.TokenType +" "+ global.Token;
  request.headers['accessCode'] =  GLOBAL.ACESS_CODE;
  request.headers['locale'] =  global.selectValue;



  let key = aesjs.utils.utf8.toBytes(GLOBAL.MERCHANT_KEY);
  let iv = aesjs.utils.utf8.toBytes(GLOBAL.MERCHANT_IV);

  const payment = new hesabeCrypt(key, iv);

  console.log('request started');
  console.log('Token :'+global.Token);
  console.log('Key :' + global.merchantCode);
  console.log('Key1 :' + GLOBAL.MERCHANT_KEY);
  console.log('Key2 :' + GLOBAL.MERCHANT_IV);
  console.log('Key3 :' + GLOBAL.ACESS_CODE);
    console.log('Key4 :' + request.url);

  if(request.url.includes('/cancel')  || request.url.includes('/capture'))
  {
     request.url = GLOBAL.BASEPAYMENT_URL + request.url
    // request.baseURL =  GLOBAL.BASEPAYMENT_URL
  }


  if(request.url != '/logout' && request.url != '/keys')
  {
    if(request.method == 'get')
    {
    console.log(request.params);

     var qs = require('qs')
      request.paramsSerializer = (params) => {
        params = {"data":payment.encryptAes(JSON.stringify(request.params))}
          console.log("yyy" +qs.stringify(params, { arrayFormat: 'brackets' }));
        return qs.stringify(params, { arrayFormat: 'brackets' })
      }

    }
      else {

        console.log(request);
        console.log(request.params);
        console.log(request.data);
        console.log('data '+ payment.encryptAes(JSON.stringify(request.data)))
        if(request.url == '/invoice')
        {
        var formData = new FormData()
        formData.append('data', payment.encryptAes(JSON.stringify(request.data)));
        formData.append('attachment',request.attachment);
        request.data = formData
        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
       }
       else if (request.url == '/profile/logo')
       {
         var formData = new FormData()
         formData.append('logo',request.logo);
         request.data = formData
         instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
       }
      else
       {
        request.data = {"data":payment.encryptAes(JSON.stringify(request.data))}
      }
      console.log("BHN :" + request.data);
    }

 }

  console.log(request);
  // Edit request config
  return request;
}, error => {
  hideLoader()
  console.log('Errorresponse:' +error);
  return Promise.reject(error);
});



instance.interceptors.response.use(response => {
console.log('response started');
console.log(response);
let key = aesjs.utils.utf8.toBytes(GLOBAL.MERCHANT_KEY);
let iv = aesjs.utils.utf8.toBytes(GLOBAL.MERCHANT_IV);

const payment = new hesabeCrypt(key, iv);

 hideLoader()
  if ( response.status === 204 ) {
            var warningMsg = response.statusText
            console.warn ( warningMsg )
            return
         }
      else if ( response.status === 404 || response.status === 400 || response.status === 401)
      {
            var errorMsg = response.statusText // + ": "  + response.data.msg // this is my api
            console.error('ZYD ' + errorMsg )
            return ;
        }
        else {
            var data = response.data
            var dataType = (typeof data)
            if ( dataType === 'undefined' ) {
               var msg = 'unexpected error occurred while fetching data !!!'
               // pass here to the ui change method the msg aka
               // showMyMsg ( msg , "error")
            } else {
               //var items = data.dat

              // console.log(response.request._response);

               if(response.config.url != '/logout')
               {
                  if(response.config.url == '/keys')
                  {
                    response =  response.request._response;
                  }
                  else if(response.config.url.includes('logo'))
                  {
                    response = response.request._response
                  }
                  else if(response.config.url.includes('cancel'))
                  {
                    response = response.request._response
                  }
                  else if(response.config.url.includes('get-city-list'))
                  {
                    response = response.request._response
                  }
                  else if (response.config.params != null) {
                    if (response.config.params.exportAs != null) {
                    response =  response.request._response;
                     }
                     else {
                       let vr =  payment.decryptAes(response.request._response);
                       response = vr

                         console.log('Decrypt :' + vr);
                     }
                  }
                  else {

                    let vr =  payment.decryptAes(response.request._response);


                    console.log('Decrypt :' + vr);
                    response = vr
                  }

              }
            }
          }
  // Edit response config

  return response;
}, error => {

  let key = aesjs.utils.utf8.toBytes(GLOBAL.MERCHANT_KEY);
  let iv = aesjs.utils.utf8.toBytes(GLOBAL.MERCHANT_IV);

  const payment = new hesabeCrypt(key, iv);
  var value = ''
  hideLoader()
    console.log('Response eroor :'+ error);
    console.log('Response eroor :'+ error.request);
    console.log('Response eroor :'+ error.request.data);
    console.log('Response eroor :'+ error.request._response);
  console.log(error.response.data);
  console.log(error.response.status);
  console.log(error.response.headers);
  console.log(error.request);
  console.log(error.request._response);


  /*if (error.response) {

          ///The request was made and the server responded with a
          ///status code that falls out of the range of 2xx

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
          console.log(error.request);

    } else if (error.request) {

       ///The request was made but no response was received, `error.request`
         /// is an instance of XMLHttpRequest in the browser and an instance
      /// of http.ClientRequest in Node.js
         ///
        console.log(error.request);
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
    }*/



  if(error == "Error: timeout of 9000ms exceeded" || error.response.status == 401)
  {
    //console.log('iii :');

    setTimeout(()=>{
      Alert.alert(
        'Logout',
        'Session Timeout',
        [
          {
            text: 'OK',
            onPress: () => {
                console.log('logout');

                if (Platform.OS === "android")
                {
                OpenNativeScreen.startActivity("com.hesabemerchant.LoginActivity", {
                name: global.selectValue == 'en' ? 'en' : 'ar',
              })
               }
              else {
                 NativeModules.ChangeViewBridge.changeToNativeView();
              }


            },
          },
        ],
        { cancelable: false }
      );
       }, 300)

  }
  else {
    if(error.request._url.includes('logo'))
    {
      value = error.request._response
    }
    else {

      console.log('eroor :'+ payment.decryptAes(error.request._response));
      value = payment.decryptAes(error.request._response)
    }

  }
  return Promise.reject(value);
});




export default instance;
