// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '192569554532674', // your App ID
        'clientSecret'    : 'f10469a12b08a03602e2ca4944562a4a', // your App Secret
        'callbackURL'     : 'http://35.166.46.140/auth/facebook/callback',
        'enableProof': true,
         'profileFields': ['emails']
    }



};
