const {queryAll} = require('./queryAll');
const {adminReg} = require('./enrollAdmin');
const {queryCar} = require('./queryCar');
const {newCar} = require('./createCar');
const {updateCar} = require('./updateCar');
const {getHistory} = require('./getHistory');

let adminName = 'admin';
let userName = 'user3';

const registerAdmin = async function () {
    adminName = await adminReg(adminName, userName);
}

module.exports = {
    queryAll,
    queryCar,
    newCar,
    updateCar,
    getHistory,
    registerAdmin,
    adminName,
    userName
}