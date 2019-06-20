require('dotenv').config();
const uuid = require('uuid/v1');

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


var qs = require('qs');
require('dotenv').config();

async function getValue(key_users, data) {
    var acceptd = true;
    for (const i of key_users) {
        var splt_key_user = i.split(':');
        var user_data = await keyv.get(splt_key_user[1]);
        if (data.username == user_data.username) {
            acceptd = false;
            break;
        }
    }
    return acceptd;
}

module.exports = async function (context, req) {
    var id_ = uuid();

    if (req.method === 'POST') {

        var data = qs.parse(req.body);
        var key_users = await asyncRedisClient.keys('*users:*');
        var cek_data = await getValue(key_users, data);

        if (cek_data) {
            var insert_data = await keyv.set(id_, data);
            if (insert_data) {
                context.res.status(201).json('Data berhasil ditambahkan.');
            }
            else{
                context.res.status(400).json('Gagal ! Ada kesalahan ketika memasukan data.');
            }
        }
        else {
            context.res.status(400).json('Gagal menambahkan data! Username tidak boleh sama.');
        }

    
        // WITH_ASYNC_REDIS_CLIENT
        // var key_status = await keyv.set(id_, data);
        // if (key_status) {
        //     var insert_status = await asyncRedisClient.hmset(id_, {
        //         'username': data.username,
        //         'password': data.password,
        //         'name': data.name,
        //         'email' : data.email
        //     });
            
        //     if (insert_status == "OK") {
        //         context.res.status(201).json('Data berhasil dimasukan.');
        //     }
        //     else{
        //         context.res.status(400).json('Ada kesalahan ketika memasukan data.');
        //     }
        // }
        // else {
        //     context.res.status(400).json('Ada kesalahan ketika memasukan keys.');
        // }
    }
};