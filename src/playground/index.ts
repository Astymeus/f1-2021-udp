import {constants, F1TelemetryClient} from '..';

const address = '0.0.0.0';
const port = 20777;
const ELAPSE_TIME = 10;  // seconds

const {PACKETS} = constants;

const client = new F1TelemetryClient({
  address,
  port,
  skipParsing: true,
});

let last = new Date();
let sumData = 0;

function roughSizeOfObject(data: object) {
  return Object.keys(data).length;
}

function eventLog(eventName: string) {
  return function eventLogWithMsg(msg: object) {
    const now = new Date();
    if (now.getTime() - last.getTime() > ELAPSE_TIME) {
      last = now;
      console.log('data receive in last ', ELAPSE_TIME, 'seconds: ', sumData);
      sumData = 0;
    }

    sumData += roughSizeOfObject(msg);

    console.trace(eventName, ': ', msg);
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
