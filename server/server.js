var express = require("express")
var Sequelize = require("sequelize")
var axios = require("axios")
//connect to mysql database
var sequelize = new Sequelize('contactmanager', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var Departments = sequelize.define('departments', {
    depName: Sequelize.STRING,
    manager: Sequelize.STRING,
    phone: Sequelize.STRING
})

var Positions = sequelize.define('positions', {
    posName: Sequelize.STRING,
    depId: Sequelize.INTEGER
})

var Contacts = sequelize.define('contacts', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    posId: Sequelize.INTEGER
})

var express = require("express")
var bodyParser = require('body-parser')

var app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin ? req.headers.origin : "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
});




app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'))

app.get('/hello', function(request, response){
    response.status(200).send("Hello world")
})

//contacts
Contacts.belongsTo(Positions, {foreignKey:"posId", targetKey:"id"})
Positions.belongsTo(Departments, {foreignKey:"depId", targetKey:"id"})

app.get('/contacts/all',function(request, response) {
    Contacts.findAll().then(function(contacts){
        response.status(200).send(contacts)
    })
})

app.get('/contacts/:id',function(request, response) {
    Contacts.findOne({where: {id:request.params.id}}).then(function(contact) {
        if(contact) {
            response.status(200).send(contact)
        }
        else{
            response.status(404).send()
        }
    })
})





app.post('/contacts',function(request,response){
    Contacts.create(request.body).then(function(contact){
        response.status(201).send(contact)
    })
})


app.put('/contacts/:id', function(request, response) {
    Contacts.findById(request.params.id).then(function(contact) {
        if(contact) {
            contact.update(request.body).then(function(contact){
                response.status(201).send(contact)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})



app.get('/positions/dep', function(request, response) {
    Positions.findAll(
        {
            include: [{
                model: Departments,
                where: { id: Sequelize.col('positions.depId') }
            }]
        }).then(
            function(positions) {
                response.status(200).send(positions)
            }
        )
})






app.get('/contacts', function(request, response) {
    Contacts.findAll(
        {
            include: [{
                model: Positions,
                where: { id: Sequelize.col('contacts.posId') }
            }]
        }).then(
            function(contacts) {
                response.status(200).send(contacts)
            }
        )
})






app.delete('/contacts/:id', function(request, response) {
    Contacts.findById(request.params.id).then(function(contact) {
        if(contact) {
            contact.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/contacts/:id/positions', function(request, response) {
    Contacts.findAll({where:{posId: request.params.id}}).then(
            function(contacts) {
                response.status(200).send(contacts)
            }
        )
})









//departments

app.get('/departments',function(request, response) {
    Departments.findAll().then(function(departments){
        response.status(200).send(departments)
    })
})


app.post('/departments',function(request,response){
    Departments.create(request.body).then(function(department){
        response.status(201).send(department)
    })
})

app.get('/departments/:id',function(request, response) {
    Departments.findOne({where: {id:request.params.id}}).then(function(department) {
        if(department) {
            response.status(200).send(department)
        }
        else{
            response.status(404).send()
        }
    })
})


app.put('/departments/:id', function(request, response) {
    Departments.findById(request.params.id).then(function(department) {
        if(department) {
            department.update(request.body).then(function(department){
                response.status(201).send(department)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/departments/:id', function(request, response) {
    Departments.findById(request.params.id).then(function(department) {
        if(department) {
            department.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

//positions

app.get('/positions',function(request, response) {
    Positions.findAll().then(function(positions){
        response.status(200).send(positions)
    })
})

app.get('/positions/:id',function(request, response) {
    Positions.findOne({where: {id:request.params.id}}).then(function(position) {
        if(position) {
            response.status(200).send(position)
        }
        else{
            response.status(404).send()
        }
    })
})

app.post('/positions',function(request,response){
    Positions.create(request.body).then(function(position){
        response.status(201).send(position)
    })
})

app.put('/positions/:id', function(request, response) {
    Positions.findById(request.params.id).then(function(position) {
        if(position) {
            position.update(request.body).then(function(position){
                response.status(201).send(position)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/positions/:id', function(request, response) {
    Positions.findById(request.params.id).then(function(position) {
        if(position) {
            position.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

        
        var rezultate = []

        var GoogleContacts = require("google-contacts-crud");
        var OAuth2Data=require('./key.json');
        
        var CLIENT_ID=OAuth2Data.client.id;
        var CLIENT_SECRET=OAuth2Data.client.secret;
        var googleContacts = new GoogleContacts(CLIENT_ID, CLIENT_SECRET);
        var credentials    = OAuth2Data.credentials
        //var token = credentials.refresh_token
        googleContacts.setUserCredentials(credentials);
        
        
        
        
        googleContacts.getContacts(function (error,contact) {
        
          for (var i = 0; i < contact.length; i++) {
            
            var parsator = JSON.parse(JSON.stringify(contact[i].shortmetadata))
            console.log(JSON.parse(JSON.stringify(contact[i].shortmetadata)))
            var prs = JSON.parse(JSON.stringify(contact[i].shortmetadata.phoneNumber))
            console.log(JSON.parse(JSON.stringify(prs))[0].$t)
            rezultate.push(JSON.parse(JSON.stringify(contact[i].shortmetadata)))
        
          }
        });
        
        // googleContacts.refreshToken(function(err,token){
        //   console.log("error",err);
        //   console.log("Data " + token);
        // })
        
        app.get('/google',function(request, response) {

        
            response.status(200).send(rezultate)
        
})

        



app.listen(8080)