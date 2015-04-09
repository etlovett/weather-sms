let fs = require('fs');

let twilio = require('twilio');


fs.readFile(`${__dirname}/config.json`, {encoding: 'utf8'}, function(err, config){
    sendWeather(JSON.parse(config));
});

function sendWeather({twilio: twilioConfig, phoneNumbers, location}){
    let {accountSid, authToken} = twilioConfig;
    let {from: fromNumber, to: toNumber} = phoneNumbers;

    let client = twilio(accountSid, authToken);
    client.messages.create({
        from: fromNumber,
        to: toNumber,
        body: 'Your morning weather forecast.',
        mediaUrl: buildURL(location)
    }, function(err, message) {
        console.log(err || message.sid)
    });
}

function buildURL(location){
    return `http://forecast.weather.gov/meteograms/Plotter.php?` +
        `lat=${location.lat}&lon=${location.long}&wfo=MTR&zcode=${location.zcode}&gset=18&` +
        `gdiff=3&unit=0&tinfo=PY8&ahour=0&` +
        `pcmd=11011111111000100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&` +
        `dd=&bw=&hrspan=30&pqpfhr=6&psnwhr=6`
}
