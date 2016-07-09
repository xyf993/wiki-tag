{%**
  * Copyright (c) 2015 Baidu, All rights reseved.
  * @fileoverview 百科tag落地页 高校特色分类组件
  * @author Guzhihui | guzhihui@baidu.com
  * @version 1.0 | 2015-06-04 | Guzhihui    // 初始版本
  **%}

{%$memory=[
  [
    "pic" => "http://baike.bdimg.com/cms/static/gaoxiao/xueba1.jpg",
    "url" => "http://baike.baidu.com/view/5267.htm",
    "title" => "明星学霸盘点",
    "content" => "娱乐圈是卧虎藏龙的地方，其中不乏颜值和分数双爆表的学霸。"
  ],
  [
    "pic" => "http://baike.bdimg.com/cms/static/gaoxiao/lingfenzuowen.jpg",
    "url" => "http://baike.baidu.com/view/149728.htm#articleTab",
    "title" => "零分作文合集",
    "content" => "你有你的命题，我有我的主意，看看那些“怪才”们的奇葩高考作文吧。"
  ],
  [
    "pic" => "http://baike.bdimg.com/cms/static/gaoxiao/qipazhuanye.jpg",
    "url" => "http://baike.baidu.com/view/9806978.htm",
    "title" => "奇葩专业之最",
    "content" => "什么专业美女最多？什么专业最恐怖？那些看上去很美的专业其实是这样的。"
  ],
  [
    "pic" => "http://baike.bdimg.com/cms/static/gaoxiao/lvxing.jpg",
    "url" => "http://baike.baidu.com/subview/25522/14998989.htm",
    "title" => "毕业旅行去哪儿",
    "content" => "考完怎能不好好疯一场，最适合和同学去的毕业旅行地，总有一处适合你。"
  ],
  [
    "pic" => "http://baike.bdimg.com/cms/static/gaoxiao/bikaoti.png",
    "url" => "http://baike.baidu.com/subview/1284/13645654.htm",
    "title" => "高考必考考点",
    "content" => "诗词填空、牛顿定律、三角函数，这些高考必考的考点你还记得吗？"
  ],
  [
    "pic" => "http://baike.bdimg.com/cms/static/gaoxiao/gaokao.jpg",
    "url" => "http://baike.baidu.com/subview/8093/16306750.htm",
    "title" => "高考大数据解读",
    "content" => "2015年高考已经悄然结束，百科校园专题团带你解读高考大数据。"
  ],
  [
    "pic" => "http://baike.bdimg.com/cms/static/gaoxiao/xujia.jpg",
    "url" => "http://baike.baidu.com/view/14188820.htm",
    "title" => "虚假大学警示榜",
    "content" => "报志愿是件谨慎的事，一朝报错一生悔，注意这些虚假大学千万别上当。"
  ]
]
%}

<div id="memory">
  <a name="#par1" id="par1">
  <div class="school_category_title">
    <div class="school_category_link">
      高考记忆
    </div>
  </div>
  </a>
  <div class="school_memory_content">
    <div id="viewport">
      <ul>
        {%$index = 0%}
        {%foreach $memory as $category%}
          <li class="category wgt_marquee_unit">
            <a href="{%$category.url|f_escape_xml%}" target="_blank">
              <img src="{%$category.pic|f_escape_xml%}" />
              <div class="category_tit">{%$category.title|f_escape_xml%}</div>
              <div class="category_des">{%$category.content|escape:none%}</div>
            </a>  
          </li>
          {%$index = $index + 1%}
        {%/foreach%}
      </ul>
    </div>
    {%if $index > 4%}
    <div class="button prev" data-skipTo="prev"><em class="cmn-icon wiki-tag-icons wiki-tag-icons_left"></em></div>
    <div class="button next" data-skipTo="next"><em class="cmn-icon wiki-tag-icons wiki-tag-icons_right"></em></div>
    {%/if%}
  </div>
</div>
{%script%}
  require('wiki-tag:widget/memory/memory.js');
{%/script%}