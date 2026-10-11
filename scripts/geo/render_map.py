"""Render the in-app world sea chart (PNG) from Natural Earth public-domain data.
Clean, painted 'game CG' look: hypsometric land with shaded relief, depth-graded ocean, soft surf glow, gold graticule & compass.
Usage: python3 scripts/geo/render_map.py /path/to/natural-earth-dir out.png
Extent must match web/courses/geography/map-extent.mjs."""
import sys, math, numpy as np, shapefile
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
from scipy import ndimage
Image.MAX_IMAGE_PIXELS = None
NE, OUT = sys.argv[1], sys.argv[2]
W, H = 2880, 1200
LAT_N, LAT_S = 78.0, -72.0
S = 2  # supersample for crisp masks
def xy(lon, lat, s=1): return ((lon + 180) / 360 * W * s, (LAT_N - lat) / (LAT_N - LAT_S) * H * s)

def poly_mask(path, s=S):
    m = Image.new('L', (W * s, H * s), 0); d = ImageDraw.Draw(m)
    for shp in shapefile.Reader(path).shapes():
        pts, parts = shp.points, list(shp.parts) + [len(shp.points)]
        for a, b in zip(parts[:-1], parts[1:]):
            ring = [xy(x, y, s) for x, y in pts[a:b]]
            if len(ring) > 2: d.polygon(ring, fill=255)
    return m
land_hi = poly_mask(f'{NE}/ne_50m_land.shp')
lake_hi = poly_mask(f'{NE}/ne_50m_lakes.shp')
land = np.asarray(land_hi.resize((W, H), Image.LANCZOS)).astype(np.float32) / 255
lake = np.asarray(lake_hi.resize((W, H), Image.LANCZOS)).astype(np.float32) / 255
land = np.clip(land - lake, 0, 1)

# Land: Natural Earth hypsometric tint + shaded relief, cropped to extent.
hyp = Image.open(f'{NE}/HYP_50M_SR_W.tif')
top = int((90 - LAT_N) / 180 * hyp.height); bot = int((90 - LAT_S) / 180 * hyp.height)
hyp = hyp.crop((0, top, hyp.width, bot)).resize((W, H), Image.LANCZOS)
hyp = ImageEnhance.Color(hyp).enhance(1.25); hyp = ImageEnhance.Contrast(hyp).enhance(1.12)
soft = hyp.filter(ImageFilter.GaussianBlur(1.2))
hyp = Image.blend(hyp, soft, 0.45)  # smooth painterly rendering, keep relief
landrgb = np.asarray(hyp).astype(np.float32)
# warm golden-hour grade on land
landrgb = landrgb * np.array([1.06, 1.0, 0.9]) + np.array([8, 4, 0])

# Ocean: depth by distance from coast (shallow turquoise -> deep navy), soft noise.
dist = ndimage.distance_transform_edt(land < 0.5)
t = np.clip(dist / 45.0, 0, 1) ** 0.8
shallow, mid, deep = np.array([86, 190, 196]), np.array([30, 110, 150]), np.array([14, 44, 86])
ocean = np.where(t[..., None] < 0.35, shallow + (mid - shallow) * (t[..., None] / 0.35), mid + (deep - mid) * ((t[..., None] - 0.35) / 0.65))
rng = np.random.default_rng(7)
noise = ndimage.gaussian_filter(rng.standard_normal((H, W)), 18); noise = noise / np.abs(noise).max()
ocean = ocean * (1 + 0.06 * noise[..., None])
yy = np.linspace(-1, 1, H)[:, None]; xx = np.linspace(-1, 1, W)[None, :]
ocean = ocean * (1 - 0.18 * (np.abs(yy) ** 2))[..., None]  # darker toward poles
lakec = np.array([70, 160, 185])
ocean = ocean * (1 - lake[..., None]) + lakec * lake[..., None]

img = ocean * (1 - land[..., None]) + landrgb * land[..., None]
# Surf glow: soft light band along coasts in the water.
coast = ndimage.gaussian_filter((land > 0.5).astype(np.float32), 1.6)
glow = np.clip(coast * 1.5, 0, 1) * (1 - land)
img = img + glow[..., None] * np.array([120, 120, 100]) * 0.55
# Land drop shadow / rim
edge = ndimage.gaussian_filter((land > 0.5).astype(np.float32), 1.0)
rim = np.clip((edge - 0.5) * 2, 0, 1) * (1 - np.clip(ndimage.gaussian_filter((land > 0.5).astype(np.float32), 4) * 1.4 - 0.4, 0, 1))
img = img * (1 - 0.25 * rim[..., None] * land[..., None])
# Vignette
vig = 1 - 0.28 * (np.clip(np.sqrt(xx ** 2 * 0.6 + yy ** 2), 0, 1.4) ** 2.2)
img = np.clip(img * vig[..., None], 0, 255).astype(np.uint8)
out = Image.fromarray(img, 'RGB').convert('RGBA')

# Rivers (major) and coast line.
ov = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
rv = shapefile.Reader(f'{NE}/ne_50m_rivers_lake_centerlines.shp')
fields = [f[0] for f in rv.fields[1:]]; ri = fields.index('scalerank')
for sr in rv.shapeRecords():
    if sr.record[ri] > 5: continue
    pts, parts = sr.shape.points, list(sr.shape.parts) + [len(sr.shape.points)]
    for a, b in zip(parts[:-1], parts[1:]):
        d.line([xy(x, y, S) for x, y in pts[a:b]], fill=(70, 150, 190, 200), width=2 * S // 2 + 1)
for shp in shapefile.Reader(f'{NE}/ne_50m_land.shp').shapes():
    pts, parts = shp.points, list(shp.parts) + [len(shp.points)]
    for a, b in zip(parts[:-1], parts[1:]):
        d.line([xy(x, y, S) for x, y in pts[a:b]], fill=(40, 52, 48, 150), width=2)
# Gold graticule: every 30°, plus equator/tropics/polar circles dashed.
def dashed(p0, p1, col, w, dash=14):
    x0, y0 = p0; x1, y1 = p1; L = math.hypot(x1 - x0, y1 - y0); n = int(L // dash)
    for i in range(0, n, 2):
        a, b = i / n, min((i + 1) / n, 1); d.line([(x0 + (x1 - x0) * a, y0 + (y1 - y0) * a), (x0 + (x1 - x0) * b, y0 + (y1 - y0) * b)], fill=col, width=w)
for lon in range(-180, 181, 30): d.line([xy(lon, LAT_N, S), xy(lon, LAT_S, S)], fill=(230, 200, 120, 55), width=2)
for lat in range(-60, 76, 30): d.line([xy(-180, lat, S), xy(180, lat, S)], fill=(230, 200, 120, 55), width=2)
for lat in (23.44, -23.44, 66.56, -66.56): dashed(xy(-180, lat, S), xy(180, lat, S), (240, 205, 120, 120), 3)
d.line([xy(-180, 0, S), xy(180, 0, S)], fill=(255, 214, 120, 150), width=4)
ov = ov.resize((W, H), Image.LANCZOS); out = Image.alpha_composite(out, ov)

# Compass rose (bottom-left, over the South Pacific-ish west edge).
cr = Image.new('RGBA', (440, 440), (0, 0, 0, 0)); c = ImageDraw.Draw(cr); C = 220
def star(r1, r2, n, rot, fills):
    for i in range(n):
        a = rot + i * 2 * math.pi / n
        tip = (C + r1 * math.sin(a), C - r1 * math.cos(a))
        l = (C + r2 * math.sin(a - math.pi / n), C - r2 * math.cos(a - math.pi / n)); r = (C + r2 * math.sin(a + math.pi / n), C - r2 * math.cos(a + math.pi / n))
        c.polygon([tip, l, (C, C)], fill=fills[0]); c.polygon([tip, r, (C, C)], fill=fills[1])
c.ellipse((C - 170, C - 170, C + 170, C + 170), outline=(244, 214, 140, 210), width=5)
c.ellipse((C - 150, C - 150, C + 150, C + 150), outline=(244, 214, 140, 120), width=2)
for i in range(32):
    a = i * math.pi / 16; r0 = 150 if i % 4 else 136
    c.line([(C + r0 * math.sin(a), C - r0 * math.cos(a)), (C + 170 * math.sin(a), C - 170 * math.cos(a))], fill=(244, 214, 140, 170), width=2)
star(120, 26, 8, math.pi / 8, [(190, 150, 80, 230), (120, 90, 50, 230)])
star(196, 34, 4, 0, [(255, 226, 150, 255), (200, 150, 70, 255)])
c.polygon([(C, C - 205), (C - 14, C - 180), (C + 14, C - 180)], fill=(220, 70, 60, 255))
c.ellipse((C - 16, C - 16, C + 16, C + 16), fill=(255, 236, 180, 255), outline=(150, 110, 60, 255), width=3)
shadow = cr.split()[3].filter(ImageFilter.GaussianBlur(8)).point(lambda v: v * 0.5)
sh = Image.new('RGBA', cr.size, (0, 0, 0, 0)); sh.putalpha(shadow)
cx, cy = int(xy(-135, -40)[0]) - 220, int(xy(-135, -40)[1]) - 220
out.alpha_composite(sh, (cx + 6, cy + 8)); out.alpha_composite(cr, (cx, cy))
out = out.convert('RGB')
out.save(OUT, optimize=True)
out.resize((1440, 600), Image.LANCZOS).save(OUT.replace('.png', '-small.png'), optimize=True)
print('ok', out.size)
