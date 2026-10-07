function createCube() {
  const positions = new Float32Array([
    // Front face 
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
     1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,

    // Top face
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
    -1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0,  1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ]);

  const texCoords = new Float32Array([
    // Front
    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,
    // Back
    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,
    // Top
    0.05, 0.05,   0.05, 0.05,   0.05, 0.05,   0.05, 0.05,
    // Bottom
    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,
    // Right
    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,
    // Left
    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0
  ]);

  const colors = new Float32Array(24 * 3).fill(1.0);

  // 12 Triangles (6 faces * 2 triangles)
  const indices = new Uint16Array([
     0,  1,  2,    0,  2,  3,  // Front
     4,  5,  6,    4,  6,  7,  // Back
     8,  9, 10,    8, 10, 11,  // Top
    12, 13, 14,   12, 14, 15,  // Bottom
    16, 17, 18,   16, 18, 19,  // Right
    20, 21, 22,   20, 22, 23   // Left
  ]);

  return { positions, colors, texCoords, indices };
}


function createPrism() {
  const positions = new Float32Array([
    // Front triangular face
     0.0,  1.0,  1.0,  // 0: Front top
    -1.0, -1.0,  1.0,  // 1: Front bottom-left
     1.0, -1.0,  1.0,  // 2: Front bottom-right

    // Back triangular face
     0.0,  1.0, -1.0,  // 3: Back top
    -1.0, -1.0, -1.0,  // 4: Back bottom-left
     1.0, -1.0, -1.0   // 5: Back bottom-right
  ]);

  const colors = new Float32Array([
    1.0, 0.2, 0.2,
    0.2, 1.0, 0.2,
    0.2, 0.2, 1.0,
    1.0, 1.0, 0.2,
    0.2, 1.0, 1.0,
    1.0, 0.2, 1.0
  ]);

  const indices = new Uint16Array([
    // Front triangle
    0, 1, 2,
    // Back triangle
    3, 5, 4,
    // Bottom
    1, 4, 5,
    1, 5, 2,
    // Left
    0, 3, 4,
    0, 4, 1,
    // Right
    0, 2, 5,
    0, 5, 3
  ]);

  return { positions, colors, indices };
}

function createPyramid() {
  const positions = new Float32Array([
     0.0,  1.0,  0.0,  // Top point
    -1.0, -1.0,  1.0,  // Front-left
     1.0, -1.0,  1.0,  // Front-right
     1.0, -1.0, -1.0,  // Back-right
    -1.0, -1.0, -1.0   // Back-left
  ]);

  const colors = new Float32Array([
    1.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    1.0, 0.0, 1.0
  ]);

  const indices = new Uint16Array([
    // Front
    0, 1, 2,
    // Right
    0, 2, 3,
    // Back
    0, 3, 4,
    // Left
    0, 4, 1,
    // Base (square = 2 triangles)
    1, 3, 2,
    1, 4, 3
  ]);

  return { positions, colors, indices };
}

function createTorus(R = 0.9, r = 0.35, segR = 24, segr = 16) {
  const positions = [];
  const colors = [];
  const indices = [];

  for (let i = 0; i < segR; i++) {
    const u = (i / segR) * 2 * Math.PI;
    for (let j = 0; j < segr; j++) {
      const v = (j / segr) * 2 * Math.PI;

      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = r * Math.sin(v);
      const z = (R + r * Math.cos(v)) * Math.sin(u);

      positions.push(x, y, z);
      colors.push(
        0.5 + 0.5 * Math.cos(u),
        0.5 + 0.5 * Math.sin(v),
        0.5 + 0.5 * Math.sin(u + v)
      );
    }
  }

  for (let i = 0; i < segR; i++) {
    const nextI = (i + 1) % segR;
    for (let j = 0; j < segr; j++) {
      const nextJ = (j + 1) % segr;

      const p0 = i * segr + j;
      const p1 = nextI * segr + j;
      const p2 = nextI * segr + nextJ;
      const p3 = i * segr + nextJ;

      indices.push(p0, p1, p2);
      indices.push(p0, p2, p3);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
}