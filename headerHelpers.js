

'use strict'


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
]
const startWithsheaders = [
    'a-amz-cf-',
    'x-amzn-',
    'x-edge-',
]
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
    Object.keys(cloudFrontHeader).forEach(
        element =>{
            headers[cloudFrontHeader[element][0].key] = cloudFrontHeader[element][0].value;
        }
    );
    return headers;
}

exports.getCloudFrontHeaders = function (httpHeaders)
{
    const cloudFrontHeader ={}

    Object.keys(httpHeaders).forEach(element=>{
        if(!isForbiden(element)){
            cloudFrontHeader[element.toLowerCase()]=[{key:element, value:httpHeaders[element]}];
        }
    });
    return cloudFrontHeader;
}