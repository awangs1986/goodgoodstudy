"""Climographs (PNG) for every port from the approximate climate normals in the course data.
Usage: node -e '...dump json...' > /tmp/geo.json ; python3 scripts/geo/climographs.py /tmp/geo.json web/public/art/geography/climate"""
import sys, json, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
fp = '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
try: fm.fontManager.addfont(fp); plt.rcParams['font.family'] = fm.FontProperties(fname=fp).get_name()
except Exception: pass
data, out = json.load(open(sys.argv[1])), sys.argv[2]
months = [f'{i}月' for i in range(1, 13)]
for p in data['ports']:
    fig, ax = plt.subplots(figsize=(6.4, 3.6), dpi=150); fig.patch.set_facecolor('#0f2340'); ax.set_facecolor('#132b4d')
    if p['p']:
        ax.bar(months, p['p'], color='#4fb3e8', alpha=.9, width=.7, label='降水 (mm)')
        ax.set_ylabel('降水量 mm', color='#9fd3f5'); ax.tick_params(axis='y', colors='#9fd3f5'); ax.set_ylim(0, max(100, max(p['p']) * 1.15))
    else:
        ax.set_yticks([]); ax.text(5.5, .5, '（极地：降水以降雪为主，数据从略）', ha='center', color='#9fd3f5', transform=ax.get_xaxis_transform())
    ax2 = ax.twinx(); ax2.plot(months, p['t'], color='#ffb347', lw=3, marker='o', ms=5, label='气温 (°C)')
    lo, hi = min(p['t']), max(p['t']); ax2.set_ylim(min(-10, lo - 3), max(35, hi + 3)); ax2.axhline(0, color='#ffffff', lw=.6, alpha=.35)
    ax2.set_ylabel('气温 °C', color='#ffcf8a'); ax2.tick_params(axis='y', colors='#ffcf8a')
    ax.tick_params(axis='x', colors='#e8eef7', labelsize=8)
    for a in (ax, ax2):
        for s in a.spines.values(): s.set_color('#2f4f7a')
    ttl = f"{p['name']} · {p['zone']}" + (f"（{p['station']}）" if p.get('station') else '')
    ax.set_title(ttl, color='#f4d68c', fontsize=12, pad=8)
    fig.tight_layout(); fig.savefig(f"{out}/{p['id']}.png", facecolor=fig.get_facecolor()); plt.close(fig)
print('ok', len(data['ports']))
