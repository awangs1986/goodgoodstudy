"""Placeholder raster art (WebP/PNG) until the painted illustrations arrive. Each is a soft-focus crop of the
Natural Earth sea chart around the subject, with a caption. Real art overwrites these files at the same paths."""
import sys, json
from PIL import Image, ImageDraw, ImageFilter, ImageFont
data = json.load(open(sys.argv[1])); root = sys.argv[2]
chart = Image.open(f'{root}/ui/world-chart.png').convert('RGB'); W, H = chart.size
font = lambda s: ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', s)
def card(lat, lon, title, sub, size, path, zoom=1.0):
    cx, cy = (lon + 180) / 360 * W, (78 - lat) / 150 * H
    w, h = 320 / zoom, 180 / zoom
    box = (int(max(0, min(W - w, cx - w / 2))), int(max(0, min(H - h, cy - h / 2)))); box = box + (int(box[0] + w), int(box[1] + h))
    im = chart.crop(box).resize(size, Image.BICUBIC).filter(ImageFilter.GaussianBlur(size[0] / 220))
    ov = Image.new('RGBA', size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for i in range(size[1]):
        a = int(170 * max(0, (i / size[1] - .45) / .55)); d.line([(0, i), (size[0], i)], fill=(8, 18, 40, a))
    d.text((size[0] * .03, size[1] * .04), f'{title} · {sub}', font=font(int(size[1] * .04)), fill=(255, 236, 190, 200))
    Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB').save(path, quality=82)
for p in data['ports']:
    card(p['lat'], p['lon'], p['name'], '港口插画生成中（占位图）', (1280, 720), f"{root}/ports/{p['id']}.webp", 1.6)
for r in data['regions']:
    card(r['lat'], r['lon'], r['title'], '海区横幅（占位图）', (1600, 500), f"{root}/regions/{r['id']}.webp", 0.7)
card(20, 30, '大航海地理', '标题图（占位图）', (1920, 1080), f'{root}/ui/title.webp', 0.25)
card(-30, -20, '船长', '船长立绘（占位图）', (768, 1024), f'{root}/ui/captain.webp', 1)
for i, n in enumerate(['小帆船', '双桅船', '三桅帆船'], 1):
    card(0, -30 + i * 30, n, f'船只 {i} 级（占位图）', (1280, 720), f'{root}/ui/ship-{i}.webp', 0.8)
print('ok')
