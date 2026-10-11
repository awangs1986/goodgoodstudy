import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { cast, villain, propNames, placeLabels } from '../web/courses/french-a1/art-manifest.mjs';

const root = new URL('../web/public/art/french-illustrations/', import.meta.url);
const assets = [
  ...Object.keys(placeLabels).map(key => ['places', key]),
  ...Object.values(cast).flatMap(person => [person.sprite, ...Object.values(person.variants ?? {})]).map(key => ['characters', key]),
  ['characters', villain.sprite], ...propNames.map(key => ['props', key])
];
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function pngInfo(bytes) {
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], 'a real PNG, not an LFS pointer or renamed format');
  assert.equal(bytes.toString('ascii', 12, 16), 'IHDR');
  const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20), colorType = bytes[25];
  let transparent = [4, 6].includes(colorType), ended = false;
  const idat = [];
  for (let offset = 8; offset + 12 <= bytes.length;) {
    const length = bytes.readUInt32BE(offset), type = bytes.toString('ascii', offset + 4, offset + 8);
    assert.ok(offset + 12 + length <= bytes.length, 'PNG chunk is complete');
    assert.equal(crc32(bytes.subarray(offset + 4, offset + 8 + length)), bytes.readUInt32BE(offset + 8 + length), 'PNG chunk CRC matches');
    if (type === 'IDAT') idat.push(bytes.subarray(offset + 8, offset + 8 + length));
    if (type === 'tRNS') transparent = true;
    if (type === 'IEND') { ended = true; break; }
    offset += length + 12;
  }
  assert.ok(ended, 'PNG ends with IEND');
  assert.ok(idat.length, 'PNG has image data');
  const decoded = inflateSync(Buffer.concat(idat));
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  assert.ok(channels, 'supported PNG color type');
  assert.equal(bytes[28], 0, 'assets use non-interlaced PNG for predictable decoding');
  const stride = Math.ceil(width * channels * bytes[24] / 8);
  assert.equal(decoded.length, (stride + 1) * height, 'IDAT decompresses to every scanline');
  for (let y = 0; y < height; y++) assert.ok(decoded[y * (stride + 1)] <= 4, 'valid scanline filter');
  return { width, height, transparent };
}

test('all French illustration keys ship independent local PNG files', () => {
  const missing = assets.filter(([group, key]) => !existsSync(new URL(`${group}/${key}.png`, root)));
  assert.deepEqual(missing, [], `Missing French PNG assets: ${missing.map(parts => parts.join('/')).join(', ')}`);
  let totalBytes = 0;
  for (const [group, key] of assets) {
    const file = `${group}/${key}.png`, bytes = readFileSync(new URL(file, root));
    totalBytes += bytes.length;
    assert.ok(bytes.length <= 600_000, `${file}: no oversized individual download`);
    const info = pngInfo(bytes);
    assert.ok(info.width >= 64 && info.height >= 64, `${file}: usable native resolution`);
    if (group === 'places') {
      assert.equal(info.width / info.height, 8 / 5, `${file}: 400:250 scene ratio`);
      assert.ok(info.width >= 400 && info.height >= 250, `${file}: full panel resolution`);
    } else {
      assert.ok(info.transparent, `${file}: transparent PNG color mode or tRNS chunk`);
    }
  }
  assert.ok(totalBytes < 10_000_000, 'all reusable French PNGs stay below 10 MB');
});
