import * as dgram from 'dgram';

import {constants, F1TelemetryClient} from '..';

const port = Number(process.env.PORT || 20777);

const {PACKETS} = constants;

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

const client = new F1TelemetryClient({
  port,
  skipParsing: true,
});

appInsightsClient.trackTrace({message: 'Démarrage du client'});

function eventLog(eventName: string) {
  return function eventLogWithMsg(msg: string) {
    console.log(eventName, msg);
    appInsightsClient.trackTrace({message: eventName + ': ' + msg});
  };
}

client.on(PACKETS.event, eventLog('event'));
client.on(PACKETS.motion, eventLog('motion'));
client.on(PACKETS.carSetups, eventLog('carSetups'));
client.on(PACKETS.lapData, eventLog('lapData'));
client.on(PACKETS.session, eventLog('session'));
client.on(PACKETS.participants, eventLog('participants'));
client.on(PACKETS.carTelemetry, eventLog('carTelemetry'));
client.on(PACKETS.carStatus, eventLog('carStatus'));
client.on(PACKETS.finalClassification, eventLog('finalClassification'));
client.on(PACKETS.lobbyInfo, eventLog('lobbyInfo'));
client.on(PACKETS.carDamage, eventLog('carDamage'));

client.start();
