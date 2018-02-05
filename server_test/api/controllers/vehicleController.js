var mongoose = require('mongoose'),
	Vehicle = mongoose.model('Vehicles');

exports.listAll = function(req, res) {
	Vehicle.find({}, function(err, vehicle) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err)
		res.json(vehicle);
	});
};

exports.create = function(req, res) {
	var newVehicle = new Vehicle(req.body);
	Vehicle.findOne({uid: req.body.uid}, function(err, vehicle) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err);
		if(!vehicle){
			result = new Vehicle(req.body);
		}
		result.save(function(err, vehiclen) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			if(err)
				res.send(err);
			res.json(vehiclen);
		});
	});
	
};

exports.getByUid = function(req, res) {
	Vehicle.findOne({uid: req.params.uid}, function(err, vehicle) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err);
		res.json(vehicle);
	});
};
//{speed: req.params.speed, gas: req.params.gas, longitude: req.params.longitude, latitude: req.params.latitude}
exports.updateVehicle = function(req, res) {
	Vehicle.findOneAndUpdate({uid: req.params.uid}, {$push: {"data": req.body }, $set: {"mrLat": req.body.latitude, "mrLong": req.body.longitude, "mrSpeed": req.body.speed, "mrGas": req.body.gas}}, {safe: true, upsert: true}, function(err, vehicle) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err)
		Vehicle.findOne({uid: vehicle.uid}, function(err, vehicleu) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err);
		res.json(vehicleu);
	});
	});
};

exports.deleteByUid = function(req, res) {
	Vehicle.remove({uid: req.params.uid}, function(err, vehicle) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err)
		res.json(vehicle);
	});
};
