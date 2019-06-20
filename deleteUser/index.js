require('dotenv').config();

const Keyv = require('keyv');
const keyv = new Keyv('redis://'+process.env.REDIS_USER+':'+process.env.REDIS_PASSWORD+'@'+process.env.REDIS_HOST+':'+process.env.REDIS_PORT+'', {
    namespace: 'users'
});
keyv.on('error', err => console.log('Connection Error', err));


module.exports = async function (context, req) {
    const id = req.params.id;
    if (id) {
        if (req.method == 'DELETE') {
            var delete_key = await keyv.delete(id);
            if (delete_key == true) {
                context.res.json('Data berhasil dihapus');
            }
            else {
                context.res.status(500).json('Ada kesalahan ketika menghapus data atau data tidak ada.');
            }
        }
    }
    else {
        context.res.status(500).json('Parameter tidak ditemukan');
    }

    // if (id) {
    //     if (req.method == 'DELETE') {
    //         var delete_key = await asyncRedisClient.del('users:'+id);
    //         console.log('==========================');
    //         if (delete_key == 1) {
    //             var delete_user = await asyncRedisClient.del(id);
    //             if (delete_user == 1) {
    //                 context.res.status(204).json('Data berhasil dihapus');
    //             }
    //             else{
    //                 context.res.status(500).json('Ada kesalahan ketika menghapus data atau data tidak ada.');
    //             }
    //         }
    //         else {
    //             context.res.status(500).json('Ada kesalahan ketika menghapus data atau data tidak ada.');
    //         }
    //     }
    // }
    // else {
    //     context.res.status(500).json('Parameter tidak ditemukan');
    // }
};