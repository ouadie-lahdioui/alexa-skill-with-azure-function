module.exports = async function (context, req) {

    if (req.query.name) {
        context.res = {
            body: "Hello " + (req.query.name || req.body.name)
        };
    } else {
        context.log(`>>>>>>`);
        context.log(`${JSON.stringify(req.body.request)}`);
        context.log(`>>>>>>`);
    
        context.res = {
            status: 200,
            body: {
                version: "1.1",
                response: {
                    outputSpeech: {
                        type: "SSML", //PlainText or SSML
                        ssml: `
                            <speak>
                                I want to tell you a secret. 
                                <voice name="Kendra">
                                    <amazon:emotion name="disappointed" intensity="medium">
                                    This is a response from Azure Functions
                                    </amazon:emotion>
                                </voice>
                            </speak>
                        `
                    }
                }
            }
        }
    }
};

