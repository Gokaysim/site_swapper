

'use strict';

const equalsHeaders=[
    'content-length',
    'host',
    'transfer-Encoding',
    'via',
    'connection',
    'expect',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'proxy-connection',
    'trailer',
    'upgrade',
    'x-accel-buffering',
    'x-accel-charset',
    'x-accel-limit-rate',
    'x-accel-redirect',
    'x-forwarded-proto',
    'x-real-ip',
    'x-cache',
];
const startWithsheaders = [
    'a-amz-cf-',
    'x-amzn-',
    'x-edge-',
];
const htmlEqualsHeaders=[
    'host',
    'content-length'
];
function htmlIsForbiden(headerKey) {
    const loweredHeaderKey= headerKey.toLowerCase();
    return htmlEqualsHeaders.includes(loweredHeaderKey);
}
function isForbiden(headerKey){
    const loweredHeaderKey= headerKey.toLowerCase();
    if(equalsHeaders.includes(loweredHeaderKey))
    {
        return true;
    }
    for(let index=0;index<startWithsheaders.length;index++)
    {
        let startWithH = startWithsheaders[index];
        if(loweredHeaderKey.startsWith(startWithH))
        {
            return true;
        }
    }
    return false;
}
exports.getHtmlHeadersFromRequest = function (cloudFrontHeader){
    const headers={};
    Object.keys(cloudFrontHeader).forEach(element =>{
            if(!htmlIsForbiden(element))
            {
                headers[exports.capitalizeHeaders(element)] = cloudFrontHeader[element][0].value;
            }
        }
    );
    return headers;
};

exports.getCloudFrontHeaders = function (httpHeaders)
{
    const cloudFrontHeader ={};
    Object.keys(httpHeaders).forEach(element=>{
        if(!isForbiden(element)){
            cloudFrontHeader[element.toLowerCase()]=[{key:element, value:httpHeaders[element]}];
        }
    });
    return cloudFrontHeader;
};

exports.capitalizeHeaders = function(header) {
    const parts = header.split('-');

    let result='';
    parts.forEach(
        part=>{
            if(result)
            {
                result += '-'+part.charAt(0).toUpperCase() + part.slice(1);
            }
            else{
                result += part.charAt(0).toUpperCase() + part.slice(1);
            }
        }
    );
    return result;
};