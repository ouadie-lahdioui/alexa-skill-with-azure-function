module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    /*
    const intent = req.body.request.intent.name;
    context.log(`Intent is: ${intent}`);
    
    const getInFoTraficFromRATPapi =  await axios.get('API_URL');
    switch (intent) {
        case value:
            context.res = {
                speech: "This is a response from Azure Functions"
            };  
            context.res = { // OR context.res.send();
                version: "1.1",
                sessionAttributes: {}
                response: {
                    outputSpeech: {
                        type: "SSML",
                        ssml: "Please pass a name on the query string or in the request body"
                    }
                } 
            };        
            break;
        default:
            break;
    }
    */

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }

    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};