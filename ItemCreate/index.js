
const uuid = require('uuid/v1');

var bodyParser = require('body-parser');


module.exports = function (context, req) {

    if (req.body) {
        const item = req.body;
        // item['PartitionKey'] = 'Partition';
        // item['RowKey'] = uuid();
        
        var json_data = JSON.stringify(item);
        console.log(json_data);
        console.log(context.header);
        context.log('Start ItemCreate');
        context.res.status(201).json('ROW INSERTED');
    }
};