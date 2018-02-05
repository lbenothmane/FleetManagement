var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Manager Schema
var ManagerSchema = new Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	name: {
		type: String
	},
	vehicles: [{
		uid: Number
	}]
});

module.exports = mongoose.model('Managers', ManagerSchema);

