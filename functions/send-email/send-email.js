const SparkPost = require('sparkpost');
// const client = new SparkPost(process.env.SPARKPOST);
const client = new SparkPost('41ad488ce9759e8db6a1842c520468b50b650555');

exports.handler = function(event, context, callback) {
  client.transmissions
    .send({
      content: {
        from: 'sam.young@email.com',
        subject: 'Howdy',
        html:
          "<html><body><p>My cool email.</p></body></html>"
      },
    recipients: [{ address: 'syoung5@gmail.com' }]
  })
  .then(data => {
    callback(null, {
      statusCode: 200,
      body: 'ok'
    })
  });
}