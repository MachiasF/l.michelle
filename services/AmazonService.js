var AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'us-west-2'
});

var s3bucket = new AWS.S3({params: {Bucket: 'l.michelle-photography'}})


module.exports.uploadToS3 = function(fileObj, callback) {
    
    var params = {
        Key: fileObj.name,
        Body: fileObj.body,
        ContentType: fileObj.type,
        ACL: 'public-read'
    }
    s3bucket.upload(params, callback)
}
