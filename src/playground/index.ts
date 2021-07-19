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

let last = new Date();
let sumData = 0;

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

function eventLog(eventName: string) {
  return function eventLogWithMsg(msg: object) {
    const now = new Date();
    if (now.getTime() - last.getTime() > ELAPSE_TIME) {
      last = now;
      console.info(
          'data received in last', ELAPSE_TIME,
          'seconds:', formatByteSize(sumData), 'around',
          formatByteSize(sumData / ELAPSE_TIME), 'by seconds');
      sumData = 0;
    }

    sumData += memorySizeOf(msg);

    // console.debug(eventName, ': ', msg);
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
