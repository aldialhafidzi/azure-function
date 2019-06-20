require('dotenv').config();

var redis = require("redis"),
    client = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

const asyncRedis = require("async-redis");
const asyncRedisClient = asyncRedis.decorate(client);

const Keyv = require('keyv');
const keyv = new Keyv('redis://'+process.env.REDIS_USER+':'+process.env.REDIS_PASSWORD+'@'+process.env.REDIS_HOST+':'+process.env.REDIS_PORT+'', {
    namespace: 'users'
});
keyv.on('error', err => console.log('Connection Error', err));

// var multipart = require('parse-multipart');
var qs = require('qs');
require('dotenv').config();


module.exports = async function (context, req) {
    context.log('=======================================');
    if (req.method === 'POST') {
        var data = qs.parse(req.body);

        var key_status = await keyv.set(data.username);

        if (key_status) {
            var insert_status = await asyncRedisClient.hmset(data.username, {
                'password': data.password,
                'name': data.name,
                'email' : data.email
            });
            
            if (insert_status == "OK") {
                context.res.status(201).json('Data berhasil dimasukan.');
            }
            else{
                context.res.status(400).json('Ada kesalahan ketika memasukan data.');
            }
        }
        else {
            context.res.status(400).json('Ada kesalahan ketika memasukan keys.');
        }


    }

    // if (req.query.name || (req.body && req.body.name)) {
    //     context.res = {
    //         // status: 200, /* Defaults to 200 */
    //         body: "Hello " + (req.query.name || req.body.name)
    //     };
    // }
    // else {
    //     context.res = {
    //         status: 400,
    //         body: data
    //     };
    // }
};