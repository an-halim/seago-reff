const axios = require('axios');
const chance = require('chance');
const { Console } = require('console');
const Chance = new chance();
const delay = require('delay');

async function reg(reff){
    var nope = Chance.integer({min: 1000, max: 9999});
    var Nope = '0851515' + nope;
    var config = {
        method: 'post',
        url: 'http://seago666.com/index.php/Home/Public/reg.html',
        headers: { 
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://seago666.com',
            'Referer': 'http://seago666.com/index.php/Home/Public/reg.html',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie': 'BJYADMIN=imfhuq2jof33n7m4rg42jnhi8j'
        },
        data: `mobile=${Nope}&password=P12345678&apsw=P12345678&invite_code=${reff}&verify=54646&code=`
    };
    var response = await axios(config)


    try {
        console.log("[?] Register using -> " +Nope);
        await console.log(response.data);
        var data = JSON.stringify(response.headers);
        var Data = data.match('set-cookie(.*)path=')[1];
        var cookie = Data.replace('":["', '');
        var cookie = cookie.replace(';', '');
        return cookie;
        
    } catch (error) {
        return console.log(error);
    }
}

async function SaveBank(cookie){
    var no = Chance.integer({min: 10000000, max: 99999999});
    var bank = ['Bank+BCA', 'Bank+BRI', 'Bank+BNI', 'Bank+Bukopin', 'Bank+Muamalat', 'Bank+Mandiri'];
    bank[Chance.integer({min: 0, max: 5})];
    var config = {
        method: 'post',
        url: 'http://seago666.com/index.php/Home/Member/banksave',
        headers: { 
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://seago666.com',
            'Referer': 'http://seago666.com/',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie': `BJYADMIN=imfhuq2jof50n7m4rg42jnhi8j; ${cookie}`
        },
        data: `bname=${bank}&bnum=${no}&ming=${Chance.first({nationality: 'en'})}+${Chance.last({nationality: 'en'})}`
    };
    var response = await axios(config)


    try {
        await console.log(response.data);
    
    } catch (error) {
        return console.log(error);
    }
    
}

async function getSN(cookie){
    var config = {
        method: 'post',
        url: 'http://seago666.com/index.php/Home/Pdorder/porder',
        headers: { 
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://seago666.com',
            'Referer': 'http://seago666.com/',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie': `BJYADMIN=imfhuq2jof50n7m4rg42jnhi8j; ${cookie}`
        },
    };
    var response = await axios(config)


    try {
        await console.log(`Nama barang: ${response.data.goods.goods_name}\nKomisi: Rp. ${response.data.data.commission}\nOrder id: ${response.data.data.order_sn}`);
        return response.data.data.order_sn;
    } catch (error) {
        return console.log(error);
    }
    
}


async function Pay(cookie, sn){
    var config = {
        method: 'post',
        url: 'http://seago666.com/index.php/Home/Pdorder/pay',
        headers: { 
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://seago666.com',
            'Referer': 'http://seago666.com/',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie': `BJYADMIN=imfhuq2jof50n7m4rg42jnhi8j; ${cookie}`
        },
        data: `order_sn=${sn}`
    };
    var response = await axios(config)
    try {
        await console.log(response.data);
        return response.data;
    } catch (error) {
        return console.log(error);
    }
}

async function utama(rep){
    let j = 1;
    while(true){
        try {
            var cok = await reg(rep);
            await delay(2000)
            await SaveBank(cok);
            for (let i = 1; i <= 30; i++) {
                console.log("========================================")
                console.log(`[Order-${i} Reff ke-${j}]`);
                var sn = await getSN(cok);
                var p = await Pay(cok, sn);
                var p = JSON.stringify(p);
                console.log("========================================\n")
                await delay(1000);
            }
        } catch (error) {
            console.log("" +error);
            await delay(10000);
        }
        j++;
    }
    
}
    


utama(7757682);