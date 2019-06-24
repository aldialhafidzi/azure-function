
var fs = require('fs');
var Fuse = require("fuse.js");
var options = {
    shouldSort: true,
    matchAllTokens: true,
    findAllMatches: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      "p_name",
      "p_another_name_1",
      "p_another_name_12"
    ]
  };

  var path_json = __dirname + '/kamus.json';

  var data_kamus = [];

  fs.readFile(path_json, 'utf8', function(err, data){
    if (err) {
      context.log.error(err);
    }
    data_kamus = JSON.parse(data);
  });



module.exports = async function (context, req) {
    if (req.query.cari) {
      var fuse = new Fuse(data_kamus, options);
      var result = fuse.search(req.query.cari);
        context.res = {
            body: result[0]
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Masukan parameter cari . . ."
        };
    }
};