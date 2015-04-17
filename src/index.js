let fs = require('fs');

let CronJob = require('cron').CronJob;
let twilio = require('twilio');

let {initialize, sendWeather} = require('./lib');


initialize(({twilio: twilioConfig, jobs: jobsConfig}) => {
    let {accountSid, authToken, from: fromNumber} = twilioConfig;
    let client = twilio(accountSid, authToken);

    jobsConfig.forEach(jobConfig => new CronJob({
        start: true,
        cronTime: jobConfig.crontab,
        timeZone: jobConfig.timezone,
        onTick: () => sendWeather(client, fromNumber, jobConfig.to, jobConfig.location)
    }));
});
