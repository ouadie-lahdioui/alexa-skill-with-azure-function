const Alexa = require('ask-sdk-core');
const axios = require('axios');

const RATP_MOCK_API = "http://demo6708552.mockable.io/ratp/trafic";

const GetInfoTraficIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'getInfoTrafic';
    },
    async handle(handlerInput) {

        const response = await axios.get(RATP_MOCK_API);
        let body = response.body
        console.log(`>>> RAT API response body\n ${JSON.stringify(body)}`);
        
        /*

        if (metroLine) {
            transportInfo = body.status.metro.lines[metroLine.toLowerCase()];
        } else if (rerLine) {
            transportInfo = body.status.rer.lines[rerLine.toUpperCase()];
        } else if (tramLine) {
            transportInfo = body.status.tram.lines[tramLine.toUpperCase()];
        }

        let speechOutput = getSpeechOutFromTransportInfo(transportInfo);
        */
      const speechText = "l'état du trafic du métro 1 est fluide";
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
  };
  
const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speechText = 'Bonjour et bienvenue dans la skill info trafic, comment je peux vous aidez?';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
  };

  const HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = "Vous pouvez me demandez des information sur le trafic du métro, RER et tram. Par exemple, c'est qui l'état du trafic du métro ligne 1";
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
  };

  const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
          || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      const speechText = 'Au revoir!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(true)
        .getResponse();
    }
  };
  
  const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak("Je suis navré, je n\'arrive pas à comprendre cette fois, mais j\'apprend rapidement!. Pouvez-vous me la redemander autrement?")
        .reprompt("Je suis navré, je n\'arrive pas à comprendre cette fois, mais j\'apprend rapidement!. Pouvez-vous me la redemander autrement?")
        .getResponse();
    },
  };

module.exports = async function (context, req) {

    if (req.query.name) {
        context.res = {
            body: "Hello " + (req.query.name || req.body.name)
        };
    } else {
        context.log(`>>>>>>`);
        context.log(`${JSON.stringify(req.body.request)}`);
        context.log(`>>>>>>`);
    
        const skill = Alexa.SkillBuilders
                .custom()
                .addRequestHandlers(
                    LaunchRequestHandler,
                    HelpIntentHandler,
                    CancelAndStopIntentHandler,
                    GetInfoTraficIntentHandler
                )
                .addErrorHandlers(ErrorHandler)
                .withCustomUserAgent('azure-function/get-info-trafic')
                .create();

        const response = await skill.invoke(req.body, context);
        console.log(`RESPONSE >>>> \n${JSON.stringify(response)}`);

        context.res = {
            status: 200,
            body: response
        }
    }
};

