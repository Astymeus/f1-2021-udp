import appInsights from 'applicationinsights';
import * as dgram from 'dgram';

import {constants, F1TelemetryClient} from '..';

const {PACKETS} = constants;

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

const client = new F1TelemetryClient({
  port: 20777,
  forwardAddresses: [{port: 5550}],
  skipParsing: true,
});

const socket = dgram.createSocket('udp4');
socket.bind(5550);

socket.on('message', (msg) => {
  const parsedmsg = F1TelemetryClient.parseBufferMessage(msg);

  if(parsedmsg?.packetData?.data===undefined){
  } else {
    console.clear();
  console.log(parsedmsg?.packetData?.data);
  }
});

client.start();

// stops the client
[`exit`,
 `SIGINT`,
 `SIGUSR1`,
 `SIGUSR2`,
 `uncaughtException`,
 `SIGTERM`,
].forEach((eventType) => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
