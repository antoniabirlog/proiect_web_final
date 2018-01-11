var GoogleContacts = require("google-contacts-crud");
var OAuth2Data=require('./key.json');

var CLIENT_ID=OAuth2Data.client.id;
var CLIENT_SECRET=OAuth2Data.client.secret;
var googleContacts = new GoogleContacts(CLIENT_ID, CLIENT_SECRET);
var credentials    = OAuth2Data.credentials

googleContacts.setUserCredentials(credentials);




googleContacts.getContacts(function (error,contact) {

  for (var i = 0; i < contact.length; i++) {
    
    var parsator = JSON.parse(JSON.stringify(contact[i].shortmetadata))

    var prs = JSON.parse(JSON.stringify(contact[i].shortmetadata.phoneNumber))
    console.log(JSON.parse(JSON.stringify(prs))[0].$t)

  }
});

