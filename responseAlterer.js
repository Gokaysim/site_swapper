const fs = require('fs');

exports.getComputedResponse = async function (outgoingSitePrefix,siteName,rawData){
    let data = rawData;
    const fullUri = siteName+outgoingSitePrefix;
    const dataRetinaReplace = 'data-retina="'+outgoingSitePrefix+'/';
    data = data.replace(/data-retina="\//g, dataRetinaReplace);
    const srcReplace='src="'+outgoingSitePrefix+'/';
    data = data.replace(/src="\//g,srcReplace );

    data = data.replace(/mottojoy-blog-elb-1224504567.eu-central-1.elb.amazonaws.com/g, fullUri);
    // const regEx = new RegExp(siteName,'gi');
    // data = data.replace(regEx, fullUri);

    data = data.replace(/http:\/\/54.93.199.214/g, '/blog');
    data = data.replace(/http:/gi,'https:');

    // const filePromise = new Promise(function(resolve, reject) {
    //     fs.writeFile('./test.html',data,function (err) {
    //         if (err) reject(err);
    //         else resolve(data);
    //     })
    // });
    // await filePromise;

    // const buffer = zlib.gzipSync(data);
    // const base64EncodedBody = buffer.toString('base64');

    return data;
};