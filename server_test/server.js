var express = require('express'),
	app = express(),
	ports = process.env.PORT || 8080,
	mongoose = require('mongoose'),
	Example = require('./api/models/exampleModel'),
	Manager = require('./api/models/managerModel'),
	Vehicle = require('./api/models/vehicleModel'),
	bodyParser = require('body-parser'),
	mongodb = require('mongodb'),
	nconf = require('nconf');
server = false;

if(server)
{
nconf.argv().env().file('keys.json');
}
/*
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');


let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
	  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);
*/
uri = 'mongodb://fleet:manager@ds259855.mlab.com:59855/fleetdb'
urilocal = 'mongodb://localhost/exampledb'
mongoose.Promise = global.Promise;
if(server)
{
	mongoose.connect(uri, { useMongoClient: true });
}
else{
	mongoose.connect(urilocal, { useMongoClient: true });
}
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/exampleRoute');
routes(app);

app.listen(ports);
