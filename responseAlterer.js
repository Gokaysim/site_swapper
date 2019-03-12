const getCloudFrontHeaders = require('./headerHelpers').getCloudFrontHeaders;


const outgoingSitePrefix = require('./constants').outgoingSitePrefix;
const siteName = require('./constants').siteName;
const incomingSiteUrl = require('./constants').incomingSiteUrl;

exports.getComputedResponse = function (response){
    let data = response.data;
    const fullUri = siteName+outgoingSitePrefix;

    const dataRetinaReplace = 'data-retina="'+outgoingSitePrefix+'/';
    data = data.replace(/data-retina="\//g, dataRetinaReplace);
    const srcReplace='src="'+outgoingSitePrefix+'/';
    data = data.replace(/src="\//g,srcReplace );

    data = data.replace(/mottojoy-blog-elb-1224504567.eu-central-1.elb.amazonaws.com/g, fullUri);
    const regEx = new RegExp(`/${siteName}/`,'gi');
    data = data.replace(regEx, `${fullUri}/`);

    // data = data.replace(/http:\/\/54.93.199.214/g, '/blog');
    data = data.replace(/http:/gi,'https:')


    const headers = getCloudFrontHeaders(response.headers);
    // const buffer = zlib.gzipSync(data);
    // const base64EncodedBody = buffer.toString('base64');
    const cloudFrontResponse = {
        status: response.status,
        statusDescription: 'OK',
        headers:headers,
        body: data,
        // bodyEncoding: 'base64',
    };
    return cloudFrontResponse;
}