import twilio from 'twilio';

import { initialize, sendWeather } from './lib';

initialize(({ twilio: twilioConfig, jobs: jobsConfig }) => {
  const { accountSid, authToken, from: fromNumber } = twilioConfig;
  const client = twilio(accountSid, authToken);

  jobsConfig.forEach(
    jobConfig => sendWeather(client, fromNumber, jobConfig.to, jobConfig.location)
  );
});
