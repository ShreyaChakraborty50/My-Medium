const js2xmlparser = require('js2xmlparser');

const sendResponse = (res,data,statusCode) => {
    res.format({
        json: function () {
            console.log(statusCode, ' ', data)
            return res.status(statusCode).json({data})
        },
        xml: function () {
            const xmlData = js2xmlparser.parse("data", {data});
            return res.status(statusCode).send(xmlData);
        },
    });
}

module.exports= {
    sendResponse
}