"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const dotenv = require("dotenv");
async function main() {
    dotenv.config();
    const apiKey = process.env.JIBIT_API_KEY || '';
    const secretKey = process.env.JIBIT_SECRET_KEY || '';
    const instance = new _1.JibitIdenticatorClient(apiKey, secretKey, {
        timeout: 120000,
    });
    instance.on('login', (ac, rt, m) => {
        console.log('emitted');
        console.log(m);
    });
    // let test1Result = await instance.cardToAccount('6104337494925082');
    // console.log(test1Result);
    // console.log("-------------------------");
    // test1Result = await instance.accountToIBAN('MELLAT', '4618067200');
    // console.log(test1Result);
    // console.log("-------------------------");
    //const test1Result = await instance.accountToIBAN('TEJARAT', '745099297');
    // const test1Result = await instance.accountToIBAN('MELLAT', '4618067200');
    const test1Result = await instance.accountToIBAN('PASARGAD', '1404.115.14153339.1');
    console.log(JSON.stringify(test1Result, null, 2));
}
main()
    .then(() => {
    console.log('opration success');
})
    .catch(err => {
    console.error(err);
});
//# sourceMappingURL=dev.js.map