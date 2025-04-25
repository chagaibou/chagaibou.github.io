// netlify/functions/get-env-vars.js
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      publicKey: process.env.publicKey,
      serviceID: process.env.serviceID,
      templateID: process.env.templateID,
    }),
  };
};
