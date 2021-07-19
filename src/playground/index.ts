// import {constants, F1TelemetryClient} from '..';
const port = Number(process.env.PORT || 20777);
// const {PACKETS} = constants;
const appInsights = require('applicationinsights');

appInsights.setup('7d1aecfe-f159-4a69-ac00-12d6436453de')
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start();

const appInsightsClient = appInsights.defaultClient;

console.log('Client !');
appInsightsClient.trace({message: 'Client !'});