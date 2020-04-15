
'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                lincenseNo: 'Gb-2356',
                make: 'Toyota',
                model: 'Prius',
                color: 'White',
                engineNo: '256864133',
                ownerName: 'Dasun Manathunga',
                ownerNationalId: '942101840v',
                registeredProvince: 'Central',
                accidents: [],
                modifications: [],
            }
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState(cars[i].lincenseNo, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, carObj) {
        console.info('============= START : Create Car ===========');
        console.info(carObj);
        await ctx.stub.putState(carNumber, Buffer.from(carObj));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async updateCar(ctx, carNumber, carObj) {
        console.info('============= START : changeCarOwner ===========');
        let carFromApp;

        try {
            carFromApp = JSON.parse(carObj);
        } catch (error) {
            throw new Error(`Json parse error object car from app`);
        }

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state

        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }

        const car = JSON.parse(carAsBytes.toString());
        let newCar = { ...car, ...carFromApp };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(newCar)));
        console.info('============= END : changeCarOwner ===========');
    }

    async getHistory(ctx, carNumber) {
        console.info('============= START : History ===========');

        try {
            const iterator = await ctx.stub.getHistoryForKey(carNumber);

            let result = [];
            let res = await iterator.next();

            while (!res.done) {
                if (res.value) {
                    console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
                    const obj = JSON.parse(res.value.value.toString('utf8'));
                    result.push(obj);
                }
                res = await iterator.next();
            }

            await iterator.close();
            return result;
        } catch (error) {
            return { carNumber: carNumber, error: error.toString() };
        }

        console.info('============= END : History ===========');
    }

}

module.exports = FabCar;
