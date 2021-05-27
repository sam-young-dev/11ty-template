exports.handler = async (event, context) => {
  const { payload } = JSON.parse(event.body);
  console.log(payload);

  return {
    statusCode: 200,
    body: payload
  };
}