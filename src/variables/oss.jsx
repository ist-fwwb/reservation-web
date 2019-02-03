let OSS = require('ali-oss');

let ossClient = new OSS({
  region: 'http://oss-cn-shanghai.aliyuncs.com',
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: 'LTAIqMIT5KX4oGAT',
  accessKeySecret: 'wYwZdNHrnvAiM9GNddiXqaeHcB4xfz',
  bucket: 'face-file'
});

const faceFileDir = 'face-file';

module.exports = {
    ossClient,
    faceFileDir
}