let fs = require('fs');

let dateUtils = require('date-utils');


export function initialize(callback){
    fs.readFile(`${__dirname}/config.json`, {encoding: 'utf8'}, function(err, config){
        callback(JSON.parse(config));
    });
}

export function sendWeather(client, fromNumber, toNumber, location){
    let date = (new Date()).toFormat('DDD MMM D');
    client.messages.create({
        from: fromNumber,
        to: toNumber,
        body: `Weather forecast for ${location.name} on ${date}.`,
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
