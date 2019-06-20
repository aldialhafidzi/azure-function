require('dotenv').config();

// var redis = require("redis"),
//     client = redis.createClient({
//         port: process.env.REDIS_PORT,
//         host: process.env.REDIS_HOST,
//         password: process.env.REDIS_PASSWORD
//     });

// const asyncRedis = require("async-redis");
// const asyncRedisClient = asyncRedis.decorate(client);

const Keyv = require('keyv');
const keyv = new Keyv('redis://'+process.env.REDIS_USER+':'+process.env.REDIS_PASSWORD+'@'+process.env.REDIS_HOST+':'+process.env.REDIS_PORT+'', {
    namespace: 'users'
});
keyv.on('error', err => console.log('Connection Error', err));


var qs = require('qs');
require('dotenv').config();


module.exports = async function (context, req) {

    if (req.method === 'PUT') {
        var data = qs.parse(req.body);
        var id = data.id;
        var data_user = await keyv.get(id);
        if (data_user != undefined) {
            var update_data = await keyv.set(id, data);
            if (update_data) {
                context.res.status(201).json('Data berhasil diupdate.');
            }
            else {
                context.res.status(400).json('Ada kesalahan ketika update data.');
            }
        }  
        context.res.status(201).json('Data tidak ditemukan');ß
    }
    

    // WITH_ASYNC_REDIS
    // if (req.method === 'PUT') {
    //     var data = qs.parse(req.body);
    //     var id = data.id;
    //     var tempData = await asyncRedisClient.hgetall(id);

    //     if (tempData != null) {
    //         var update_status = await asyncRedisClient.hmset(id, {
    //             'username': data.username,
    //             'password': data.password,
    //             'name': data.name,
    //             'email' : data.email
    //         });
             
    //         if (update_status == "OK") {
    //             context.res.status(201).json('Data berhasil diupdate.');
    //         }
    //         else{
    //             context.res.status(400).json('Ada kesalahan ketika update data.');
    //         }
    //     }
    //     context.res.status(201).json('Data tidak ditemukan');ß
    // }
};