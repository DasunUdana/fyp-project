const smartContract = require('./smartContracts');

module.exports = {
    queryAllVehicle: async function (req, res) {
        let result = await smartContract.queryAll(smartContract.userName);
        res.status(200).send(JSON.parse(result));
    },

    getVehicle: async function (req, res) {
        let carId = req.body.carId;
        let result = await smartContract.queryCar(smartContract.userName, carId);
        res.status(200).send(JSON.parse(result));
    },

    newVehicle: async function (req, res) {
        let carObj = req.body.carObj;
        let result = await smartContract.newCar(smartContract.userName, carObj.lincenseNo, carObj);

        if (Buffer.isBuffer(result)) {
            res.status(200).send(carObj);
        } else {
            res.status(200).send('Error adding vehicle');
        }
    },

    editVehicle: async function (req, res) {
        let carObj = req.body.carObj;
        let result = await smartContract.updateCar(smartContract.userName, carObj.lincenseNo, carObj);

        if (Buffer.isBuffer(result)) {
            res.status(200).send(carObj);
        } else {
            res.status(200).send('Error updating vehicle');
        }
    },

    getHistory: async function (req, res) {
        let carId = req.body.carId;
        let result = await smartContract.getHistory(smartContract.userName, carId);

        res.status(200).send(JSON.parse(result));
    },

    login: async function (req, res) {

    },

    register: async function (req, res) {

    }
}