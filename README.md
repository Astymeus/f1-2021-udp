# F1 2021 UDP Telemetry Client

The F1 series of games support the outputting of key game data via a UDP data stream. This data can be interpreted by
external apps or connected peripherals for a range of different uses, including providing additional telemetry
information, customised HUD displays, motion platform hardware support or providing force feedback data for custom
steering wheels.

This is a TypeScript UDP client and telemetry parser for Codemaster's F1 2021 game that enables the consumption of such
information.

## Installing

```
$ npm install f1-2021-udp
```

or

```
$ yarn add f1-2021-udp
```

## Running the playground

```
$ npm run start
```

or

```
$ yarn start
```

## Usage

```
import { F1TelemetryClient, constants } from "f1-telemetry-client";
// or: const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

/*
*   'port' is optional, defaults to 20777
*   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
*                   defaults to true
*   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
*                   defaults to undefined
*   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
*                   defaults to false
*/
const client = new F1TelemetryClient({ port: 20777 });
client.on(PACKETS.event, console.log);
client.on(PACKETS.motion, console.log);
client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.lapData, console.log);
client.on(PACKETS.session, console.log);
client.on(PACKETS.participants, console.log);
client.on(PACKETS.carTelemetry, console.log);
client.on(PACKETS.carStatus, console.log);
client.on(PACKETS.finalClassification, console.log);
client.on(PACKETS.lobbyInfo, console.log);
client.on(PACKETS.history, console.log);
client.on(PACKETS.carDamage, console.log);


// to start listening:
client.start();

// and when you want to stop:
client.stop();
```

## Documentation

The following links contain information that summarises the UDP data structures so that developers of supporting
hardware or software are able to configure these to work correctly with the F1 game.

[F1 2021 UDP Spec](https://forums.codemasters.com/topic/80231-f1-2021-udp-specification/)

## License

This project is originally a fork of [f1-telemetry-client](https://github.com/racehub-io/f1-telemetry-client).  
Licensed under the MIT License.

## Examples of packets
0. Motion
1. Session
2. Lap Data
3. Event
4. Participants
5. Car Setups
6. Car Telemetry
7. Car Status
8. Final Classification
9. Lobby Info
10. Car Damage

### 0. Motion

```
{
  m_header: {
    m_packetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_packetVersion: 1,
    m_packetId: 0,
    m_sessionUID: 9456654345384485550n,
    m_sessionTime: 11.441349029541016,
    m_frameIdentifier: 228,
    m_playerCarIndex: 0,
    m_secondaryPlayerCarIndex: 255
  },
  m_carMotionData: [
    {
      m_worldPositionX: -993.2776489257812,
      m_worldPositionY: 3.828242778778076,
      m_worldPositionZ: 534.9242553710938,
      m_worldVelocityX: 53.92681884765625,
      m_worldVelocityY: -1.928065538406372,
      m_worldVelocityZ: 28.850255966186523,
      m_worldForwardDirX: 28872,
      m_worldForwardDirY: 64472,
      m_worldForwardDirZ: 15456,
      m_worldRightDirX: 50073,
      m_worldRightDirY: 45,
      m_worldRightDirZ: 28888,
      m_gForceLateral: -0.019378576427698135,
      m_gForceLongitudinal: -0.517076313495636,
      m_gForceVertical: 0.12337321043014526,
      m_yaw: 1.0790966749191284,
      m_pitch: 0.02929556369781494,
      m_roll: -0.0013765435433015227
    },...],
    
  m_suspensionPosition: [
    -1.0038450956344604,
    -0.8956505060195923,
    11.218056678771973,
    10.869818687438965
  ],
  m_suspensionVelocity: [
    -28.209932327270508,
    -16.86701774597168,
    -21.131244659423828,
    -9.90163516998291
  ],
  m_suspensionAcceleration: [
    -811.0729370117188,
    234.0033416748047,
    681.319580078125,
    1388.462158203125
  ],
  m_wheelSpeed: [
    61.185203552246094,
    61.189022064208984,
    61.212867736816406,
    61.21332550048828
  ],
  m_wheelSlip: [
    0.00007412264676531777,
    0.00011751002602977678,
    0.00041025091195479035,
    0.00040656939381733537
  ],
  m_localVelocityX: 0.01641177199780941,
  m_localVelocityY: 0.059858083724975586,
  m_localVelocityZ: 61.189483642578125,
  m_angularVelocityX: -0.012494126334786415,
  m_angularVelocityY: 0.0004626319860108197,
  m_angularVelocityZ: 0.0240196343511343,
  m_angularAccelerationX: -0.8084712624549866,
  m_angularAccelerationY: 0.127091646194458,
  m_angularAccelerationZ: -0.6134719848632812,
  m_frontWheelsAngle: -0
}
```

### 1. Session

```
{
  m_header: {
    m_paquetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_paquetVersion: 1,
    m_paquetId: 1,
    m_sessionUID: 12528725253890588038n,
    m_sessionTime: 2.070122241973877,
    m_frameIdentifier: 40,
    m_playerCarIndex: 6,
    m_secondaryPlayerCarIndex: 255
  },
  m_weather: 0,
  m_trackTemperature: 37,
  m_airTemperature: 31,
  m_totalLaps: 6,
  m_trackLength: 5547,
  m_sessionType: 11,
  m_trackId: 14,
  m_formula: 2,
  m_sessionTimeLeft: 6837,
  m_sessionDuration: 7200,
  m_pitSpeedLimit: 60,
  m_gamePaused: 0,
  m_isSpectating: 0,
  m_spectatorCarIndex: 255,
  m_sliProNativeSupport: 0,
  m_numMarshalZones: 16,
  m_marshalZones: [
    { m_zoneStart: 0.05907190591096878, m_zoneFlag: 2 },...],
  m_safetyCarStatus: 0,
  m_networkGame: 0,
  m_numWeatherForecastSamples: 5,
  m_weatherForecastSamples: [
    {
      m_sessionType: 11,
      m_timeOffset: 0,
      m_weather: 0,
      m_trackTemperature: 38,
      m_trackTemperatureChange: 2,
      m_airTemperature: 31,
      m_airTemperatureChange: 2,
      m_rainPercentage: 1
    },...],
  m_forecastAccuracy: 0,
  m_aiDifficulty: 80,
  m_seasonLinkIdentifier: 2921491817,
  m_weekendLinkIdentifier: 2921491817,
  m_sessionLinkIdentifier: 2921491827,
  m_pitStopWindowIdealLap: 0,
  m_pitStopWindowLatestLap: 0,
  m_pitStopRejoinPosition: 12,
  m_steeringAssist: 0,
  m_brakingAssist: 0,
  m_gearboxAssist: 3,
  m_pitAssist: 0,
  m_pitReleaseAssist: 0,
  m_ERSAssist: 0,
  m_DRSAssist: 0,
  m_dynamicRacingLine: 1,
  m_dynamicRacingLineType: 1
}
```

### 2. Lap Data

```
{
  m_header: {
    m_paquetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_paquetVersion: 1,
    m_paquetId: 2,
    m_sessionUID: 115887612214300610n,
    m_sessionTime: 3.648547649383545,
    m_frameIdentifier: 69,
    m_playerCarIndex: 6,
    m_secondaryPlayerCarIndex: 255
  },
  m_lapData: [
    {
      m_lastLapTimeInMS: 112077,
      m_currentLapTimeInMS: 5508,
      m_sector1TimeInMS: 0,
      m_sector2TimeInMS: 0,
      m_lapDistance: 347.380859375,
      m_totalDistance: 16988.736328125,
      m_safetyCarDelta: -0,
      m_carPosition: 3,
      m_currentLapNum: 4,
      m_pitStatus: 0,
      m_numPitStops: 0,
      m_sector: 0,
      m_currentLapInvalid: 0,
      m_penalties: 0,
      m_warnings: 0,
      m_numUnservedDriveThroughPens: 0,
      m_numUnservedStopGoPens: 0,
      m_gridPosition: 3,
      m_driverStatus: 4,
      m_resultStatus: 2,
      m_pitLaneTimerActive: 0,
      m_pitLaneTimeInLaneInMS: 0,
      m_pitStopTimerInMS: 0,
      m_pitStopShouldServePen: 0
    },...]
}
```

### 3. Event

```
{
  m_header: {
    m_packetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_packetVersion: 1,
    m_packetId: 3,
    m_sessionUID: 0n,
    m_sessionTime: 0,
    m_frameIdentifier: 0,
    m_playerCarIndex: 255,
    m_secondaryPlayerCarIndex: 255
  },
  m_eventStringCode: 'BUTN',
  Buttons: { m_buttonStatus: 0 }
}
```

### 4. Participants

```
{
  m_header: {
    m_paquetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_paquetVersion: 1,
    m_paquetId: 4,
    m_sessionUID: 12528725253890588038n,
    m_sessionTime: 2.2263903617858887,
    m_frameIdentifier: 44,
    m_playerCarIndex: 6,
    m_secondaryPlayerCarIndex: 255
  },
  m_numActiveCars: 20,
  m_participants: [
    {
      m_aiControlled: 1,
      m_driverId: 55,
      m_networkId: 255,
      m_teamId: 46,
      m_myTeam: 0,
      m_raceNumber: 5,
      m_nationality: 9,
      m_name: 'SETTE CÂMARA',
      m_yourTelemetry: 1
    },...]
}
```

### 5. Car Setups

```
{
  m_header: {
    m_paquetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_paquetVersion: 1,
    m_paquetId: 5,
    m_sessionUID: 9756476850845114409n,
    m_sessionTime: 58.96299743652344,
    m_frameIdentifier: 1152,
    m_playerCarIndex: 6,
    m_secondaryPlayerCarIndex: 255
  },
  m_carSetups: [
    {
      m_frontWing: 8,
      m_rearWing: 8,
      m_onThrottle: 75,
      m_offThrottle: 75,
      m_frontCamber: -3,
      m_rearCamber: -1.2000000476837158,
      m_frontToe: 0.09000000357627869,
      m_rearToe: 0.4100000262260437,
      m_frontSuspension: 8,
      m_rearSuspension: 2,
      m_frontAntiRollBar: 8,
      m_rearAntiRollBar: 1,
      m_frontSuspensionHeight: 3,
      m_rearSuspensionHeight: 7,
      m_brakePressure: 95,
      m_brakeBias: 58,
      m_rearLeftTyrePressure: 23.100000381469727,
      m_rearRightTyrePressure: 23.100000381469727,
      m_frontLeftTyrePressure: 22.200000762939453,
      m_frontRightTyrePressure: 22.200000762939453,
      m_ballast: 6,
      m_fuelLoad: 20
    },...]
}
```

### 6. Car Telemetry

```
{  
  m_header: {
    m_paquetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_paquetVersion: 1,
    m_paquetId: 6,
    m_sessionUID: 12528725253890588038n,
    m_sessionTime: 4.531034469604492,
    m_frameIdentifier: 93,
    m_playerCarIndex: 6,
    m_secondaryPlayerCarIndex: 255
  },
  m_carTelemetryData: [
    {
      m_speed: 123,
      m_throttle: 0,
      m_steer: -0.21987886726856232,
      m_brake: 0,
      m_clutch: 0,
      m_gear: 2,
      m_engineRPM: 8324,
      m_drs: 0,
      m_revLightsPercent: 42,
      m_revLightsBitValue: 16128,
      m_brakesTemperature: [Array],
      m_tyresSurfaceTemperature: [Array],
      m_tyresInnerTemperature: [Array],
      m_engineTemperature: 24415,
      m_tyresPressure: [Array],
      m_surfaceType: [Array]
    },...],
  m_buttonStatus: 0,
  m_mfdPanelIndex: 0,
  m_mfdPanelIndexSecondaryPlayer: 0,
  m_suggestedGear: 0
}
```

### 7. Car Status

```
{
  m_header: {
    m_paquetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_paquetVersion: 1,
    m_paquetId: 7,
    m_sessionUID: 12528725253890588038n,
    m_sessionTime: 4.810492515563965,
    m_frameIdentifier: 99,
    m_playerCarIndex: 6,
    m_secondaryPlayerCarIndex: 255
  },
  m_carStatusData: [
    {
      m_tractionControl: 0,
      m_antiLockBrakes: 1,
      m_fuelMix: 1,
      m_frontBrakeBias: 60,
      m_pitLimiterStatus: 0,
      m_fuelInTank: 10.618309020996094,
      m_fuelCapacity: 94,
      m_fuelRemainingLaps: 0.8411729335784912,
      m_maxRPM: 9000,
      m_idleRPM: 2799,
      m_maxGears: 7,
      m_drsAllowed: 0,
      m_drsActivationDistance: 0,
      m_actualTyreCompound: 12,
      m_visualTyreCompound: 20,
      m_tyresAgeLaps: 3,
      m_vehicleFiaFlags: 0,
      m_ersStoreEnergy: 0,
      m_ersDeployMode: 0,
      m_ersHarvestedThisLapMGUK: 0,
      m_ersHarvestedThisLapMGUH: 0,
      m_ersDeployedThisLap: 0,
      m_networkPaused: 0
    },...]
}
```

### 8. Final Classification

```
{
  m_header: {
    m_packetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_packetVersion: 1,
    m_packetId: 8,
    m_sessionUID: 9847452587466169049n,
    m_sessionTime: 0,
    m_frameIdentifier: 0,
    m_playerCarIndex: 255,
    m_secondaryPlayerCarIndex: 255
  },
  m_numCars: 20,
  m_classificationData: [
    {
      m_position: 11,
      m_numLaps: 5,
      m_gridPosition: 8,
      m_points: 0,
      m_numPitStops: 1,
      m_resultStatus: 3,
      m_bestLapTimeInMS: 4110942464,
      m_totalRaceTime: 542.8074340820312,
      m_penaltiesTime: 0,
      m_numPenalties: 0,
      m_numTyreStints: 2,
      m_tyreStintsActual: [Array],
      m_tyreStintsVisual: [Array]
    }, ...]
}
```

### 9. Lobby Info

```
{
  m_header: {
    m_paquetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_paquetVersion: 1,
    m_paquetId: 9,
    m_sessionUID: 0n,
    m_sessionTime: 0,
    m_frameIdentifier: 0,
    m_playerCarIndex: 0,
    m_secondaryPlayerCarIndex: 255
  },
  m_numPlayers: 19,
  m_lobbyPlayers: [
    {
      m_aiControlled: 0,
      m_teamId: 255,
      m_nationality: 10,
      m_name: 'Joueur',
      m_carNumber: 57,
      m_readyStatus: 0
    },...]
}
```

### 10. Car Damage

```
{
  m_header: {
    m_packetFormat: 2021,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 4,
    m_packetVersion: 1,
    m_packetId: 10,
    m_sessionUID: 9456654345384485550n,
    m_sessionTime: 13.47784423828125,
    m_frameIdentifier: 269,
    m_playerCarIndex: 0,
    m_secondaryPlayerCarIndex: 255
  },
  m_carDamageData: [
    {
      m_tyresWear: [Array],
      m_tyresDamage: [Array],
      m_brakesDamage: [Array],
      m_frontLeftWingDamage: 0,
      m_frontRightWingDamage: 0,
      m_rearWingDamage: 0,
      m_floorDamage: 0,
      m_diffuserDamage: 0,
      m_sidepodDamage: 0,
      m_drsFault: 0,
      m_gearBoxDamage: 0,
      m_engineDamage: 0,
      m_engineMGUHWear: 0,
      m_engineESWear: 0,
      m_engineCEWear: 0,
      m_engineICEWear: 0,
      m_engineMGUKWear: 0,
      m_engineTCWear: 0
    },
    {
      m_tyresWear: [Array],
      m_tyresDamage: [Array],
      m_brakesDamage: [Array],
      m_frontLeftWingDamage: 0,
      m_frontRightWingDamage: 0,
      m_rearWingDamage: 0,
      m_floorDamage: 0,
      m_diffuserDamage: 0,
      m_sidepodDamage: 0,
      m_drsFault: 0,
      m_gearBoxDamage: 0,
      m_engineDamage: 0,
      m_engineMGUHWear: 0,
      m_engineESWear: 0,
      m_engineCEWear: 0,
      m_engineICEWear: 0,
      m_engineMGUKWear: 0,
      m_engineTCWear: 0
    },...]
}
```
