export default {
  id: 'geography-voyage', version: 1, status: 'available',
  title: { en: 'Voyage Geography · Sail the World', 'zh-CN': '大航海地理 · 环游世界' },
  description: { en: 'Sail a ship between 42 real ports across 10 sea regions. At each port learn its location, landforms, climate (real climographs), people and specialties, then pass the quiz to unlock the next port. Trade goods, manage food and water, ride monsoons and trade winds, and fill your discovery log.', 'zh-CN': '驾驶帆船航行 10 大海区、42 个真实港口。每到一港先学位置、地形、气候（真实气候图）、人文与特产，再通过港口测验解锁下一站。贩卖特产、管理粮食和淡水、乘季风与信风，收集发现物，写满航海日志。适合小学到初中。' },
  exerciseTypes: ['choice'], load: () => import('./player.mjs')
};
