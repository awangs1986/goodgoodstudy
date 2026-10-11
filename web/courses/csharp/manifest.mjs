export default {
  id:'csharp',version:1,status:'available',
  title:{en:'C# · Crown Quest','zh-CN':'C# · 王冠远征'},
  description:{en:'126 exercises: lesson 0 plus 8 chapters of syntax, input, decisions, loops, methods and objects, with predict-the-output, fix-the-bug and review lessons, ending in a console RPG.', 'zh-CN':'第 0 课加八大区域，共 126 道符文委托：语法、输入、分支、循环、方法与对象，穿插读代码猜输出、改错和复习题，最后亲手造出控制台 RPG。'},
  order:{en:'Recommended first course for complete beginners.','zh-CN':'零基础推荐先学：报错更好懂，不用碰指针。'},exerciseTypes:['code','predict','fix','fill'],load:()=>import('./player.mjs')
};
