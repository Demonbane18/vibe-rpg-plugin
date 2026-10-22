// Sensor field view: terrain coloured by land use plus one pin per soil sensor. See BRIEF.md.
// Prototype written against the 200-sensor demo survey.
import * as THREE from "three";

const STATUS_COLORS = {
  ok: 0x3fb950,
  warn: 0xd29922,
  alarm: 0xf85149,
  offline: 0x8b949e,
};

function buildTerrain({ cols, rows, spacing, heights, landUse }) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(rows * cols * 3);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      positions[i * 3] = c * spacing;
      positions[i * 3 + 2] = r * spacing;
    }
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const indices = new Uint16Array((rows - 1) * (cols - 1) * 6);
  let k = 0;
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const i = r * cols + c;
      indices[k++] = i;
      indices[k++] = i + cols;
      indices[k++] = i + 1;
      indices[k++] = i + 1;
      indices[k++] = i + cols;
      indices[k++] = i + cols + 1;
    }
  }
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();

  geometry.setAttribute("color", new THREE.BufferAttribute(landUse, 3));

  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 });
  const mesh = new THREE.Mesh(geometry, material);
  applyHeights(mesh, heights);
  return mesh;
}

function applyHeights(mesh, heights) {
  const position = mesh.geometry.attributes.position;
  for (let i = 0; i < heights.length; i++) position.setY(i, heights[i]);
  position.needsUpdate = true;
}

function buildPin(sensor) {
  const geometry = new THREE.ConeGeometry(0.3, 2, 12);
  geometry.translate(0, 1, 0);
  const material = new THREE.MeshStandardMaterial({ color: STATUS_COLORS[sensor.status] });
  const pin = new THREE.Mesh(geometry, material);
  pin.position.set(sensor.x, sensor.y, sensor.z);
  pin.userData.sensorId = sensor.id;
  return pin;
}

export function createSensorField(scene, { terrain, sensors }) {
  const terrainMesh = buildTerrain(terrain);
  scene.add(terrainMesh);

  let pins = new Map();
  const addPins = (list) => {
    for (const sensor of list) {
      const pin = buildPin(sensor);
      pins.set(sensor.id, pin);
      scene.add(pin);
    }
  };
  addPins(sensors);

  return {
    setStatus(id, status) {
      pins.get(id)?.material.color.setHex(STATUS_COLORS[status]);
    },
    moveSensor(id, x, y, z) {
      pins.get(id)?.position.set(x, y, z);
    },
    setSensors(list) {
      for (const pin of pins.values()) scene.remove(pin);
      pins = new Map();
      addPins(list);
    },
    pick(raycaster) {
      const hit = raycaster.intersectObjects([...pins.values()], false)[0];
      return hit ? hit.object.userData.sensorId : null;
    },
    dispose() {
      scene.remove(terrainMesh);
      for (const pin of pins.values()) scene.remove(pin);
    },
  };
}
