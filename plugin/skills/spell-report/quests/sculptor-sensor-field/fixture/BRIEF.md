# Sensor field view

The Fieldwatch dashboard shows a farm survey in 3D: the ground as a terrain mesh coloured by land use, and one pin for every soil sensor, coloured by its status. `src/field.mjs` builds that part of the scene. The app owns the renderer, camera, lights and render loop and calls the field through the API below.

## Platform

- three.js r186 with `WebGLRenderer`. Import it as `import * as THREE from "three"`.
- Core `three` only. The app bundle does not include `three/addons`.
- Plain ES module, no other dependencies.

## API

`createSensorField(scene, survey)` adds the field to `scene` and returns a handle:

| Member | What it does |
|---|---|
| `setStatus(id, status)` | Recolours one sensor's pin. |
| `moveSensor(id, x, y, z)` | Moves one sensor's pin so its base sits on the new point. |
| `setSensors(sensors)` | Replaces the whole sensor list. The new list can be longer or shorter and has new ids. |
| `pick(raycaster)` | Returns the id of the nearest sensor pin the raycaster's ray hits, or `null`. Called on click with a `THREE.Raycaster`. |
| `dispose()` | Removes the field from the scene and frees everything it created. |

`survey` is `{ terrain, sensors }`:

- `terrain`: `{ cols, rows, spacing, heights, landUse }`. Grid point `(row r, column c)` sits at `x = c * spacing`, `z = r * spacing`, `y = heights[r * cols + c]`. `heights` is a `Float32Array` of `rows * cols` values. `landUse` is a `Uint8Array` of RGB bytes (0 to 255) straight from the GIS export, three bytes per grid point in the same order.
- `sensors`: an array of `{ id, x, y, z, status }`. `(x, y, z)` is the point the pin's base stands on.

## Look

- Terrain: one surface through every grid point, lit by the app's lights, each grid point showing its land-use colour.
- Pins: a small upright marker about 0.6 units across and 2 units tall with its base on the sensor point, coloured by status:

| Status | Colour |
|---|---|
| `ok` | `#3fb950` |
| `warn` | `#d29922` |
| `alarm` | `#f85149` |
| `offline` | `#8b949e` |

## Real data

- Survey grids go up to 400 by 300 points.
- A survey has between a few hundred and 40,000 sensors.
- Sensors on vehicles and drones report new positions all the time.
- Status updates arrive every few seconds.

## Performance and memory

- The terrain plus all pins must stay within three draw calls in total, whatever the sensor count.
- Users open and close the field view many times in a session. After `dispose()` nothing the field created may keep GPU memory, and the scene must hold exactly what it held before `createSensorField` was called. The app's own objects in the scene are not the field's to touch.
- Replacing the sensor list must not leak GPU memory either.
