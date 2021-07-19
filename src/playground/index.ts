import * as dgram from 'dgram';

import {constants, F1TelemetryClient} from '..';

const address = '0.0.0.0';
const port = 20777;

const {PACKETS} = constants;

const client = new F1TelemetryClient({
  address,
  port,
  skipParsing: true,
});

function eventLog(eventName: string) {
  return function eventLogWithMsg(msg: string) {
    console.log(eventName, msg);
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