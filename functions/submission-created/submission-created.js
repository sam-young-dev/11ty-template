const fetch = require('node-fetch'); 

exports.handler = async (event, context) => {
  const { payload } = JSON.parse(event.body);
  console.log(payload);

  const email = payload.email;
  const baseUrl = process.env.URL;
  console.log(baseUrl);

  const response = await fetch(`${baseUrl}/.netlify/functions/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email })
  });

  const json = await response.json();
  console.log(json);

  return {
    statusCode: 200,
    body: JSON.stringify(payload.data)
  };
}