const js2xmlparser = require("js2xmlparser");

const sendResponse = (req, res, data, statusCode) => {
  if (req.headers.accept === 'application/xml') {
    const xmlData = js2xmlparser.parse("data", { data });
    res.status(statusCode).send(xmlData);
  }
  else {
    res.status(statusCode).json({ data });
  }
  //  res.format({
  //   json: function () {
  //      return res.status(statusCode).json({ data });
  //   },
  //   xml: function () {
  //     const xmlData = js2xmlparser.parse("data", { data });
  //      return res.status(statusCode).send(xmlData);
  //   },
  // });
};

module.exports = {
  sendResponse
};
