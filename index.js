const getComputedResponse = require("./responseAlterer").getComputedResponse;
const getHtmlHeadersFromRequest = require('./headerHelpers').getHtmlHeadersFromRequest;
const axios = require('axios');

const outgoingSitePrefix = require('./constants').outgoingSitePrefix;
const siteName = require('./constants').siteName;
const incomingSiteUrl = require('./constants').incomingSiteUrl;

exports.handler = async (event) => {
    const request = event.Records[0].cf.request;
    if(request.uri === outgoingSitePrefix)
    {
        request.uri = '/';
    }
    else{
        request.uri = request.uri.substring(outgoingSitePrefix.length);
    }
    request.headers['host'] = [{ key: 'host', value: siteName}];
    if(request.uri.includes('.'))
    {
        return request;
    }

    const url = 'http://'+incomingSiteUrl ;

    var response = await axios({
        method : request.method,
        url : `${url}${request.uri}`,
        data : request.body&&request.body.data?request.body.data:null,
        headers : getHtmlHeadersFromRequest(request.headers),
    });
    return getComputedResponse(response);
};
