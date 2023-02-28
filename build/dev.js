"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("./src");
const dotenv = require("dotenv");
const helpers_1 = require("./src/helpers");
async function main() {
    dotenv.config();
    const apiKey = process.env.JIBIT_API_KEY || '';
    const secretKey = process.env.JIBIT_SECRET_KEY || '';
    const instance = new src_1.JibitIdenticatorClient(apiKey, secretKey, {
        timeout: 120000,
    });
    // instance.on('login', (ac, rt, m) => {
    //   console.log(m + '\n');
    // });
    // instance.on('error', error => {
    //   const errHandler = new JibitErrorHandler(error);
    //   console.log('⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕\n');
    //   console.error(errHandler.getErrorDetails());
    //   console.error(errHandler.getRequestURL());
    //   console.log('⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕\n');
    // });
    //کارت به حساب
    try {
        const cardToAccountResult = await instance.cardToAccount('6104337494925083');
        console.log(cardToAccountResult);
    }
    catch (error) {
        console.log(new helpers_1.JibitErrorHandler(error).getErrorDetails());
        console.log(111111111111111111111111111111111111111111111111111);
    }
    // حساب به شبا
    // let accountToIBANResult = await instance.accountToIBAN(
    //   'MELLAT',
    //   '4618067200'
    // );
    // console.log(JSON.stringify(accountToIBANResult, null, 1));
    // استعلام شبا
    // let inquiryIBANResult = await instance.inquiryIBAN(
    //   'IR150120000000004618067200'
    // );
    // console.log(JSON.stringify(inquiryIBANResult, null, 1));
    //استعلام کارت
    // let inquiryCardResult = await instance.inquiryCard('6104337494925082');
    // console.log(JSON.stringify(inquiryCardResult, null, 1));
    //کارت به حساب
    // let cardToAccountResult = await instance.cardToAccount('6104337494925082');
    // console.log(JSON.stringify(cardToAccountResult, null, 1));
    //کارت به شبا
    //await instance.cardToIBAN('6104337494925082');
    //شبا به کارت سرویس بودن دسترس در بررسی
    // const aaaa = await instance.isCardToIBANAccessible();
    // console.log('بانک دی: ', aaaa['DAY']);
    //تطابق شبا با کد ملی
    // console.log(
    //   'MMMM: ',
    //   await instance.matchingIBANWithNationalCode(
    //     'IR150120000000004618067200',
    //     '2360037064',
    //     '13680606'
    //   )
    // );
    //تطابق شبا با نام و نام خانوادگی
    // console.log(
    //   'MMMM: ',
    //   await instance.matchingIBANWithFirstLastName(
    //     'IR150120000000004618067200',
    //     'صفاری امیرحسین',
    //   )
    // );
    //تطابق شماره کارت با نام و نام خانوادگی
    // console.log(
    //   'MMMM: ',
    //   await instance.matchingCardWithFirstLastName(
    //     '6104337494925082',
    //     'صفاری امیرحسین',
    //   )
    // );
    //تطابق شماره حساب با نام و نام خانوادگی
    // console.log(
    //   'MMMM: ',
    //   await instance.matchingAccountWithFirstLastName(
    //     '4618067200',
    //     'MELLAT',
    //     'صفاری امیرحسین'
    //   )
    // );
    //تطابق شماره کارت با کد ملی
    // console.log(
    //   'MMMM: ',
    //   await instance.matchingCardWithNationalCode(
    //     '6104337494925082',
    //     '2360037064',
    //     '13680606'
    //   )
    // );
    // تطابق کد ملی با شماره موبایل
    // console.log(
    //   'MMMM: ',
    //   await instance.matchingNationalCodeWithMobileNo('09174061800', '2360037064')
    // );
    // استعلام کد پستی
    //await instance.inqueryPostalCode('7177636567');
    // await instance.identitySimilarity('2360037064', '13680606', 'امیر حسین', 'صفاری',"امیرحسین صفاری",'محمد جواد');
}
main()
    .then(() => {
    console.log('opration success');
})
    .catch(err => {
    console.log(11111111111111111111111111111111111111111111111111);
    console.error(err.message);
});
//# sourceMappingURL=dev.js.map