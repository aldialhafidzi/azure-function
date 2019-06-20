var redis = require("redis"),
    client = redis.createClient({
        port: '6379',
        host: 'localhost',
        password: 'redis'
    });

const asyncRedis = require("async-redis");
const asyncRedisClient = asyncRedis.decorate(client);

const Keyv = require('keyv');
const keyv = new Keyv('redis://root:redis@localhost:6379', {
    namespace: 'wilayah_2018'
});
keyv.on('error', err => console.log('Connection Error', err));


async function cariData(kode) {
    var data_wilayah = [];
    var keys = [];

    if (kode == "*") {
        keys = await asyncRedisClient.keys("*wilayah_2018*");
    } else {
        keys = await asyncRedisClient.keys("*wilayah_2018:" + kode + "*");   
    }

    keys.sort();
    for (let index = 0; index < keys.length; index++) {
        const key_ = keys[index].split(':');
        var nama = await keyv.get(key_[1]);

        if (nama != undefined) {
            var obj = {
                'kode': key_[1],
                'nama': nama
            }
            data_wilayah.push(obj);
        }
    }    
    return data_wilayah;
}

module.exports = async function (context, req) {
    context.log('Start ItemUpdate');
    var data = await cariData(req.params.id);
    context.res.status(202).json(data);
};