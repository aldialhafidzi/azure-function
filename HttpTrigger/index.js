

// const {
//     parse
// } = require('querystring');


// function collectRequestData(request, callback) {
//     const FORM_URLENCODED = 'application/x-www-form-urlencoded';
//     if (request.headers['content-type'] === FORM_URLENCODED) {
//         let body = '';
//         request.on('data', chunk => {
//             body += chunk.toString();
//         });
//         request.on('end', () => {
//             callback(parse(body));
//         });
//     } else {
//         callback(null);
//         console.log('ASSUUUUPPPP');
        
//     }
// }
var multipart = require('parse-multipart');
var qs = require('qs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    console.log(req.query);
    
    if (req.method === 'POST') {
        var data = qs.parse(req.body);


          context.res = {
              status: 400,
              body: data
          };
    

    }

    // var body_buffer = Buffer.from(req.body);
    // var boundary = multipart.getBoundary(req.headers['content-type']);
    // var parts = multipart.Parse(req.body);

    // console.log(body_buffer);
    // console.log(boundary);
    // console.log(req);
    
    // console.log(data);
    
    

    // console.log(req);
    
    // var data_post = req.body;
    // console.log(data_post.toString());
    

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