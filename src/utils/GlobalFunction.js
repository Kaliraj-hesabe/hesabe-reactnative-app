

export function decimalthreeDigit(digit){
   return digit.indexOf(".")>0?
           digit.split(".").length>=2?
            digit.split(".")[0]+"."+digit.split(".")[1].substring(-1,3)
           : digit
          : digit
 }


export function isProperDate(dt){
    //var reGoodDate = /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/;
      var reGoodDate = /^(?:(0[1-9]|[12][0-9]|3[01])[\/.](0[1-9]|1[012])[\/.](19|20)[0-9]{2})$/;
    return reGoodDate.test(dt);
}

export function paymentTypeID(value)
{

  for(let i = 0;i <  global.paymentType.length;i++)
  {
      // console.log("LKLK :" + global.paymentType[i].id);
    if(global.paymentType[i].id == value)
   {
      return global.paymentType[i].name;
   }
  }
 return 0 ;

}

export function paymentDisplayTypeID(value)
{

  for(let i = 0;i <  global.paymentType.length;i++)
  {
      // console.log("LKLK :" + global.paymentType[i].id);
    if(global.paymentType[i].id == value)
   {
      return global.paymentType[i].display_name;
   }
  }
 return 0 ;

}


export function serviceTypeID(value)
{

  for(let i = 0;i <   global.serviceType.length;i++)
  {
      // console.log("LKLK :" + global.paymentType[i].id);
    if( global.serviceType[i].id == value)
   {
      return  global.serviceType[i].name;
   }
  }
 return 0 ;

}


export function currencyFormat(num) {
   return  num.toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


export function upperCaseFirstLetter(string) {
    return string.charAt(0) + string.substring(1).toLowerCase();
}

export function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\S*/g,
      function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
}
