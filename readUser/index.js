require('dotenv').config();

const Keyv = require('keyv');
const keyv = new Keyv('redis://'+process.env.REDIS_USER+':'+process.env.REDIS_PASSWORD+'@'+process.env.REDIS_HOST+':'+process.env.REDIS_PORT+'', {
    namespace: 'users'
});
keyv.on('error', err => console.log('Connection Error', err));


module.exports = async function (context, req) {

    if (req.query.id) {
        if (req.method == 'GET') {
            var id = req.query.id;
            var user_data = await keyv.get(id);
            if (user_data != null) {
                context.res.status(202).json(user_data);
            }
            else {
                context.res.status(400).json('Data tidak ditemukan');
            }
        }
        context.res.status(400).json('Method request tidak diizinkan');
    }
    else {
        context.res.status(400).json('Parameter id tidak ditemukan.');
    }
    
    // if (req.query.id) {
    //     if (req.method == 'GET') {
    //         var id = req.query.id;
    //         var tempData = await asyncRedisClient.hgetall(id);
    //         if (tempData != null) {
    //             context.res.status(202).json(tempData);
    //         }
    //         else {
    //             context.res.status(400).json('Data tidak ditemukan');
    //         }
    //     }
    //     context.res.status(400).json('Method request tidak diizinkan');
    // }
    // else {
    //     context.res.status(400).json('Parameter id tidak ditemukan.');
    // }
};