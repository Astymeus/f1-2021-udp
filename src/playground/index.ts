import {constants, F1TelemetryClient} from '..';

const address = '0.0.0.0';
const port = 20777;
const ELAPSE_TIME = 10;  // seconds

const {PACKETS} = constants;

interface Data {
  [key: string]: string|number;
}

const client = new F1TelemetryClient({
  address,
  port,
  skipParsing: true,
});

const start = new Date();
let last = new Date();
const sumData: {[eventName: string]: number} = {
  'event': 0,
  'motion': 0,
  'carSetups': 0,
  'lapData': 0,
  'session': 0,
  'participants': 0,
  'carTelemetry': 0,
  'carStatus': 0,
  'finalClassification': 0,
  'lobbyInfo': 0,
  'carDamage': 0
};
let sumDataTotal = 0;

function memorySizeOf(obj: object) {
  let bytes = 0;

  function sizeOf(obj: object) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case 'number':
          bytes += 8;
          break;
        case 'string':
          const str: string = obj;
          bytes += str.length * 2;
          break;
        case 'boolean':
          bytes += 4;
          break;
        case 'object':
          const objClass = Object.prototype.toString.call(obj).slice(8, -1);
          if (objClass === 'Object' || objClass === 'Array') {
            for (const key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              // @ts-ignore
              sizeOf(obj[key]);
            }
          } else {
            bytes += obj.toString().length * 2;
          }
          break;
        default:
          break;
      }
    }
    return bytes;
  }


  return sizeOf(obj);
}

function formatByteSize(bytes: number) {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(3) + ' KiB';
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(3) + ' MiB';
  } else {
    return (bytes / 1073741824).toFixed(3) + ' GiB';
  }
}

function eventLog(eventName: string, logConsole: boolean) {
  return function eventLogWithMsg(msg: object) {
    sumData[eventName] += memorySizeOf(msg);
    sumDataTotal += memorySizeOf(msg);
    if (logConsole) {
      console.debug(eventName, ': ', msg);
    }
  };
}

client.on(PACKETS.event, eventLog('event', false));
client.on(PACKETS.motion, eventLog('motion', false));
client.on(PACKETS.carSetups, eventLog('carSetups', false));
client.on(PACKETS.lapData, eventLog('lapData', false));
client.on(PACKETS.session, eventLog('session', false));
client.on(PACKETS.participants, eventLog('participants', false));
client.on(PACKETS.carTelemetry, eventLog('carTelemetry', false));
client.on(PACKETS.carStatus, eventLog('carStatus', false));
client.on(PACKETS.finalClassification, eventLog('finalClassification', false));
client.on(PACKETS.lobbyInfo, eventLog('lobbyInfo', false));
client.on(PACKETS.carDamage, eventLog('carDamage', true));

client.start();

const dataSnifferInterval = setInterval(() => {
  const now = new Date();
  const elapsedTime: number = (now.getTime() - last.getTime()) / 1000;
  last = now;
  for (const eventName of Object.keys(sumData)) {
    console.info(
        'data (', eventName, ') received in last', elapsedTime,
        'seconds:', formatByteSize(sumData[eventName]), 'around',
        formatByteSize(sumData[eventName] / elapsedTime), 'by seconds');
    sumData[eventName] = 0;
  }
  console.info();
  console.info();
}, ELAPSE_TIME * 1000);

// stops the client
[`exit`,
 `SIGINT`,
 `SIGUSR1`,
 `SIGUSR2`,
 `uncaughtException`,
 `SIGTERM`,
].forEach((eventType) => {
  (process as NodeJS.EventEmitter).on(eventType, () => {
    const now = new Date();
    const elapsedTime: number = (now.getTime() - start.getTime()) / 1000;
    console.info(
        'data received from beginning (', elapsedTime, 'seconds)',
        'seconds:', formatByteSize(sumDataTotal), 'around',
        formatByteSize(sumDataTotal / elapsedTime), 'by seconds');
    clearInterval(dataSnifferInterval);
    client.stop();
  });
});
