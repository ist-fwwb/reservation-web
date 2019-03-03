let OSS = require('ali-oss');

const endpoint = 'oss-cn-shanghai.aliyuncs.com';

const faceBucket = 'face-file';
const prefix = 'http://';

const filepath = prefix + faceBucket + '.' + endpoint;
const roomImagePath = prefix + faceBucket + '.' + endpoint + '/meetingroom-file';

let ossClient = new OSS({
  endpoint: 'http://' + endpoint,
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: 'LTAIqMIT5KX4oGAT',
  accessKeySecret: 'wYwZdNHrnvAiM9GNddiXqaeHcB4xfz',
  bucket: faceBucket
});

const faceFileDir = 'face-file';

module.exports = {
    ossClient,
    faceFileDir,
    filepath,
    roomImagePath
}