import * as RNLocalize from 'react-native-localize';
import RNLanguages from "react-native-languages";
//import I18n from 'i18n-js';
import i18n from 'i18n-js';

import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
 import { I18nManager } from 'react-native';
 import RNRestart from "react-native-restart";

import en from './en';
//import ar from './ar';
//import fil from './fil';
//import ml from './ml';
import RNFS from 'react-native-fs';




/*const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.translations = {
  default: en,
  'en-IN': en,
   ar,
  fil,
  ml,
};

I18n.fallbacks = true;*/

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;


var arabicPath = RNFS.DocumentDirectoryPath + '/ar.js';
var engPath = RNFS.DocumentDirectoryPath + '/en.js';
console.log("PAAAth :" +  engPath);
console.log("PAAAth :" +  en);


var engvl ,arabvl ;
RNFS.readFile(engPath, 'ascii').then(res => {

 engvl = JSON.parse(res)
  // i18n.translations = {en: engvl};

})
.catch(err => {
    console.log(err.message, err.code);
});

RNFS.readFile(arabicPath, 'utf8').then(res => {
//console.log(JSON.parse(res));
  arabvl = JSON.parse(res)
  i18n.translations = {en: engvl,ar: arabvl};
  //i18n.translations = {en: JSON.parse(res)};

})
.catch(err => {

    console.log(err.message, err.code);
});



export const reloadLanguage = lang => {

  var engvl ,arabvl ;
  RNFS.readFile(engPath, 'ascii').then(res => {

   engvl = JSON.parse(res)
    // i18n.translations = {en: engvl};

  })
  .catch(err => {
      console.log(err.message, err.code);
  });

  RNFS.readFile(arabicPath, 'utf8').then(res => {
  //console.log(JSON.parse(res));
    arabvl = JSON.parse(res)
    i18n.translations = {en: engvl,ar: arabvl};
    //i18n.translations = {en: JSON.parse(res)};

  })
  .catch(err => {

      console.log(err.message, err.code);
  });

}

export default i18n;
