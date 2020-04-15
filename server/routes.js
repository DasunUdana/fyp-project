const express = require('express');
const route = express.Router();
const vehicle = require('./vehicleApi');

route.get('/test', (req, res) => {
    res.send({serverRunning: true});
});

// // Vehicle Routes
route.post('/queryAll', vehicle.queryAllVehicle);
route.post('/queryVehicle', vehicle.getVehicle);
route.post('/newVehicle', vehicle.newVehicle);
route.post('/editVehicle', vehicle.editVehicle);
route.post('/history', vehicle.getHistory);
route.post('/login', vehicle.login);
route.post('/register', vehicle.register);

module.exports = route;
