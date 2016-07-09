{%**
  * Copyright (c) 2015 Baidu, All rights reseved.
  * @fileoverview 百科tag落地页 大牌广告位组件
  * @author Guzhihui | guzhihui@baidu.com
  * @version 1.0 | 2015-08-14 | Guzhihui    // 初始版本
  **%}

{%$about=[
  [
    "pic" => "http://baike.baidu.com/cms/rc/diwudadao.jpg",
    "url" => "http://baike.baidu.com/subview/134594/6689977.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "纽约第五大道:拥有全球所有最顶级的品牌店，以齐全、更新速度快著称。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/xiangxielishe.jpg",
    "url" => "http://baike.baidu.com/view/74661.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "巴黎香榭丽舍大道:充满法式浪漫风情的顶级商业街，日均流量超10万。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/niujinjie.jpg",
    "url" => "http://baike.baidu.com/view/599813.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "伦敦牛津街：云集超过300家的大型商场，店铺建筑也是靓丽风景。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/mengtelier.jpg",
    "url" => "http://baike.baidu.com/view/1125679.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "蒙特利尔地下城：30公里的地下通道与室内广场、大型商场相连。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/keendun.jpg",
    "url" => "http://baike.baidu.com/view/1843401.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "维也纳克恩顿大街：国际名牌与维也纳风情融洽共存的金色U形大街。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/xinsudajie.jpg",
    "url" => "http://baike.baidu.com/view/11578921.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "东京新宿大街：900米长的大街两边布满日本本土和全球大牌。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/kudamu.jpg",
    "url" => "http://baike.baidu.com/view/3538411.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "柏林库达姆大街：随处可见剧场、戏院、咖啡屋等，文化氛围浓厚。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/huangjinsijiao.jpg",
    "url" => "http://baike.baidu.com/view/3538411.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "米兰黄金四角区：由4条名品街围成，所有世界品牌一网打尽。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/aerbate.jpg",
    "url" => "http://baike.baidu.com/view/197037.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "莫斯科阿尔巴特大街：莫斯科最古老的街道，曾是艺术家的天堂。"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/wujielu.jpg",
    "url" => "http://baike.baidu.com/view/1007195.htm",
    "title" => "世界十大奢侈品朝圣地",
    "content" => "新加坡乌节路：东西方潮流交融之地，还能体会浓郁的热带风情。"
  ]
]
%}
{%$list=[
  [
    "pic" => "http://baike.baidu.com/cms/rc/feizhouzhixing.jpg",
    "url" => "http://baike.baidu.com/subview/3467/5060730.htm",
    "title" => "世界十大名钻"
  ],
  [
    "pic" => "http://baike.baidu.com/cms/rc/shizhuangzhou.jpg",
    "url" => "http://baike.baidu.com/view/870874.htm",
    "title" => "全球四大时装周"
  ]
]
%}

{%$text=[
  "title" => "大牌百科",
  "content" => "它不仅拥有国内大学中最完美的西洋风格建筑群，它不仅拥有国内大学中最完美的西洋风格建筑群，还拥有独立的海上小岛研究中心。",
  "lemmaNum" => "2000",
  "tradeNum" => "14"
]
%}

{%$defaultImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF9fX1AAAA0VQI3QAAAAxJREFUeNpiYAAIMAAAAgABT21Z4QAAAABJRU5ErkJggg=="%}

<div id="brand_advertise">
	<div class="brand_advertise_now"></div>
	<div class="brand_advertise_last"></div>
	<div class="clear"></div>
</div>