import cron from 'cron';
import fs from 'fs';
import twilio from 'twilio';

import { initialize, sendWeather } from './lib';

initialize(({twilio: twilioConfig, jobs: jobsConfig}) => {
  const { accountSid, authToken, from: fromNumber } = twilioConfig;
  const client = twilio(accountSid, authToken);

  jobsConfig.forEach(jobConfig => new cron.CronJob({
    start: true,
    cronTime: jobConfig.crontab,
    timeZone: jobConfig.timezone,
    onTick: () => sendWeather(client, fromNumber, jobConfig.to, jobConfig.location),
  }));
});
