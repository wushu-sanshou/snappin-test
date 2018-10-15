const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let ShippingInfo = require('./models/shippingInfo');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

let db = mongoose.connection;

db.on('open', function () {
    console.log('DB connected');
});

// Check on connection error
db.on('error', function (error) {
    console.log(error);
});

const port = 5000;
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/snappinDB',options,function(error) {
  console.log(error);
});

app.use((req,res,next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/admin', function(req, res) {
        ShippingInfo.find(function (err,data) {
           res.send(data);
        });
});

app.post('/user', function(req, res) {
    const {firstName, lastName, address, city, zipCode, phone, comment, email} = req.body;
    const userInfo = new ShippingInfo({
        firstName,
        lastName,
        address,
        city,
        zipCode,
        phone,
        comment,
        email
    });

  if(firstName && firstName !==''
      && lastName && lastName !== ''
      && address && address !==''
      && city && city !== ''
      && zipCode && zipCode !== ''
      && phone && phone !==''
      && email && email !== '') {
      userInfo.save(function (error) {
          console.log('Saving error', error);
      });
      res.sendStatus(200);
  }

});

app.listen(port);