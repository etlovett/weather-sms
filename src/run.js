let twilio = require('twilio');

let {initialize, sendWeather} = require('./lib');


initialize(({twilio: twilioConfig, jobs: jobsConfig}) => {
    let {accountSid, authToken, from: fromNumber} = twilioConfig;
    let client = twilio(accountSid, authToken);

    jobsConfig.forEach(jobConfig =>
        sendWeather(client, fromNumber, jobConfig.to, jobConfig.location));
});
