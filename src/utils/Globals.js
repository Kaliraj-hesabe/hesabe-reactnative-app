
//'use strict';

module.exports = {
  STORE_KEY: 'a56z0fzrNpl^2',
  ONESIGNALKEY : 'f5ab8d32-8707-4518-9aa4-17208efaf602',
  //BASE_URL:  'http://merchantapi.hesbstck.com/api/v1', //development
  //BASE_URL: 'http://merchantapi2.hesbstck.com/api/v1', //devp2
  //BASE_URL: 'http://merchantapisandbox.hesabe.com/api/v1',//staging
  BASE_URL:  'https://testmerchantapi.hesabe.com/api/v1', //pre-production
  //BASE_URL:  'https://merchantapi.hesabe.com/api/v1', //production

  //Payment Api
  //BASEPAYMENT_URL:  'http://api.hesbstck.com/api', //development
  //BASEPAYMENT_URL:  'http://sandbox.hesabe.com/api', //staging
  BASEPAYMENT_URL:  'https://testapi.hesabe.com/api', //pre-production
  //BASEPAYMENT_URL:  'https://api.hesabe.com/api', //production


  MERCHANT_KEY : global.secretKey ,
  MERCHANT_IV : global.ivKey,
  ACESS_CODE :global.accessCode,
  MERCHANT_CODE : global.merchantCode,
  CURRENCY :'KWD',
  API_STRING: {
    QUICK_INVOICE: '/invoice',
    OPEN_INVOICE: '/open-invoice',
    LOGOUT: '/logout',
    PRODUCTS : '/products',
    EMPLOYEES : '/employees',
    PROFILE : '/profile',
    ADMINCHARGE : '/setting/admin-charges',
    PAYMENTTRANSFER : '/report/payment-transfer',
    PAYMENTLIST : '/report/transactions',
    PERMISSION : '/permissions',
    DASHBOARD : '/dashboard',
    DESIGNATION : '/designations',
    REFUNDS : '/refund',
    RESEND : '/resend',
    CUSTOMERINVOICE : '/customers',
    KEYS :'/keys',
    QUICK_DASHBOARD: '/invoice-dashboard',
    PERMISSIONS : '/permissions',
    LOGO : '/logo',
    NOTIFICATIONLIST : '/push-notifications',
    NOTIFICATIONSERVICE : '/push-notification/settings',
    NOTIFICATIONTYPES : '/notification/types',
    CAPTURE : '/capture',
    CANCEL : '/cancel',
    DELICONCITYLIST : '/delicon-city-list',
    DELICONAPI : '/delicon',
    DELHIVERY : '/delivery',
  },


  COLOR: {
    ORANGE: '#FF8056',
    DARKBLUE: '#190865',
    LIGHTBLUE: '#5D549A',
    ACCENTBLUE : '#867EBD',
    LIGHTPURPLE: '#F0EEFF',
    RED: '#FE0022',
    GREEN : '#3A9454',
    DARKGRAY: '#9795A8',
    LIGHTGRAY: '#E9E9EA',
    SHADEGRAY : '#F3F3F3',
    PURPLESHADE : '#EEF1F5',
    WHITE : '#FFFFFF',
    BLACK : '#000000',
  },

};
