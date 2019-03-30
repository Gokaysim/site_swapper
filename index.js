const getComputedResponse = require("./responseAlterer").getComputedResponse;
const getHtmlHeadersFromRequest = require('./headerHelpers').getHtmlHeadersFromRequest;
const capitalizeHeaders = require('./headerHelpers').capitalizeHeaders;
const fetch = require('node-fetch');

const incomingSiteUrl = require('./constants').incomingSiteUrl;
const outgoingSitePrefix = require('./constants').outgoingSitePrefix;
exports.handler = async (event) => {
    const request = event.Records[0].cf.request;
    console.log(JSON.stringify(request));
    const siteName = "mottojoy.com";
    // const incomingSiteUrl =request.headers['host'][0].value;

    if(request.uri === outgoingSitePrefix)
    {
        request.uri = '/';
    }
    else{
        request.uri = request.uri.substring(outgoingSitePrefix.length);
    }
    request.headers['host'] = [{ key: 'host', value: siteName}];
    if(request.uri.includes('.') && !request.uri.includes('.php'))
    {
        return request;
    }

    const url = 'http://'+incomingSiteUrl ;
    let body=null;
    if(request.body && request.body.data)
    {
        body=Buffer.from(request.body.data, 'base64').toString('utf8')
    }
    let queryString='';
    if(request.querystring)
    {
        queryString=`?${request.querystring}`;
    }
    const response = await fetch(
        `${url}${request.uri}${queryString}`,
        {
            method : request.method,
            headers : getHtmlHeadersFromRequest(request.headers),
            body: body
        }
    );
    const data = await response.text();
    const headers={};
    response.headers.forEach(
        function(val, key)
        {
            headers[capitalizeHeaders(key)]=val;
        }
    );
    const finalResponse= await getComputedResponse(outgoingSitePrefix,siteName,
        data,response.status,response.statusText,
        headers);
    console.log(finalResponse);

    return finalResponse;
};
