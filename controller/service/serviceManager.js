/**
 * activity
 * @type {es}
 * Created by yuhua.li
 */
let $url = require('../../utils/urls');
let $logger = require('../../utils/logger');
let $code = require('../../utils/code');

let ServiceModel = require('../../models/service/service');


module.exports = {
    queryService(req, res) {
        // Get all modules
        let content = [];

        ServiceModel.find({}, function(err, docs) {
            if(err) {
                $logger.error('method: query_service, msg: ' + err);
                res.json({code: $code.FALSE, errmsg: err, content: ""});
            } else {
                if(docs.length > 0) {
                    docs.forEach(item => {
                        let result = item && item._doc ? item._doc : {};
                        content.push(result);
                    });
                }
                res.json({code: $code.SUCCESS, msg: 'success', content: content});
            }
        });
    }
};

