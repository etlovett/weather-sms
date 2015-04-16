let fs = require('fs');

let CronJob = require('cron').CronJob;
let twilio = require('twilio');


fs.readFile(`${__dirname}/config.json`, {encoding: 'utf8'}, function(err, config){
    startJobs(JSON.parse(config));
});

function startJobs({twilio: twilioConfig, jobs: jobsConfig}){
    let {accountSid, authToken, from: fromNumber} = twilioConfig;
    let client = twilio(accountSid, authToken);

    jobsConfig.forEach(jobConfig => new CronJob({
        start: true,
        cronTime: jobConfig.crontab,
        timeZone: jobConfig.timezone,
        onTick: () => sendWeather(client, fromNumber, jobConfig.to, jobConfig.location)
    }));
}

function sendWeather(client, fromNumber, toNumber, location){
    client.messages.create({
        from: fromNumber,
        to: toNumber,
        body: `Your morning weather forecast for ${location.name}.`,
        mediaUrl: buildURL(location)
    }, function(err, message) {
        if (err){
            console.error('Got error sending weather:', err);
        } else {
            console.log('Sent weather:', message.sid)
        }
    });
}

function buildURL({lat, long, zcode}){
    return `http://forecast.weather.gov/meteograms/Plotter.php?` +
        `lat=${lat}&lon=${long}&wfo=MTR&zcode=${zcode}&gset=18&gdiff=3&unit=0&tinfo=PY8&ahour=0&` +
        `pcmd=11011111111000100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&` +
        `dd=&bw=&hrspan=30&pqpfhr=6&psnwhr=6`
}
