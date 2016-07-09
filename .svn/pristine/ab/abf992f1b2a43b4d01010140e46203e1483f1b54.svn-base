{%*
  * Copyright (c) 2015 Baidu, All rights reseved.
  * @fileoverview 百科tag落地页
  * @author Guzhihui | guzhihui@baidu.com
  * @version 1.0 | 2015-06-11 | Guzhihui    // 初始版本
  **%}


{%extends file="wiki-common/page/layout/varWidth.tpl"%}

{%block name='body_page_class'%} {%if $fromLemma%} w-tag-lemma{%else%} w-tag{%/if%}{%/block%}

{%block name="head_title"%}{%$category.currentTag.tagName%}分类_百度百科{%/block%}

{%block name="head_start"%}
  <meta name="Keywords" content="{%$category.currentTag.tagName%} {%$category.categoryName%} 列表 名单 类别 主题 百度百科 baike" />
{%/block%}

{%block name="body_header"%}
{%if $fromLemma == 0%}
<div class="{%if $school%}large-layout{%/if%}">
  <div class="header-wrapper">
    <div class="header">
      <div class="layout">
        <div class="userbar-container">
          {%widget name="wiki-common:widget/component/userbar/userbar.tpl"%}
        </div>
        {%widget name="wiki-common:widget/component/searchbar/searchbar_simple.tpl" topic="高校百科" size="36"%}
      </div>
    </div>
  </div>
</div>
{%/if%}
{%/block%}

{%block name="body_main"%}
{%$defaultImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF9fX1AAAA0VQI3QAAAAxJREFUeNpiYAAIMAAAAgABT21Z4QAAAABJRU5ErkJggg=="%}

{%if $fromLemma == 1%}
<div>
  <div class="category-wrapper">
    <div class="layout">
      <div class="category-container">
          {%widget name="wiki-tag:widget/category/category.tpl" category=$category filterOptions=$filterOptions isUrl=0 style=1%}
      </div>
    </div>
  </div>
  <div class="waterFall-wrapper">
    <div class="layout">
      <div class="waterFall-container">
        {%widget name="wiki-tag:widget/waterfall/waterFall.tpl" fromLemma=1 page=1 limit=30%}
      </div>
    </div>
  </div>
</div>
{%else%}
<div class="large-layout">
  <div class="bg_img_wrap">
    <img class="lazy-img" src="{%$defaultImage%}" data-src="../../static/home/resource/img/bg.png" alt="">
  </div>
  <div class="about-wrapper">
    <div class="layout">
      <div class="about-container">
        {%widget name="wiki-tag:widget/header/school/schoolHeader.tpl"%}
      </div>
    </div>
  </div>
  <div class="memory-wrapper">
    <div class="layout">
      <div class="memory-container">
        {%widget name="wiki-tag:widget/memory/memory.tpl"%}
      </div>
    </div>
  </div>
  <div class="category-wrapper">
    <div class="layout">
      <div class="category-container">
          {%widget name="wiki-tag:widget/category/topicCategory.tpl" category=$category filterOptions=$filterOptions isUrl="0" topic="高校全集"%}
      </div>
    </div>
  </div>
  <div class="waterFall-wrapper">
    <div class="layout">
      <div class="waterFall-container">
        {%widget name="wiki-tag:widget/waterfall/waterFall.tpl" fromLemma=0 page=0 limit=30%}
        </dd>
      </div>
    </div>
  </div>
  {%if $fromLemma == 0%}
  <div class="sideBar-wrapper">
    <div class="layout">
      <div class="sideBar-container">
        {%widget name="wiki-tag:widget/sidebar/sidebar.tpl"%}
      </div>
    </div>
  </div>
  {%/if%}
</div>
{%/if%}
{%/block%}

{%block name="body_end"%}
  {%require name="wiki-tag:static/home/home.less"%}
  {%require name="wiki-tag:widget/waterfall/waterfall.less"%}
  {%require name="wiki-tag:static/home/home.js"%}
{%/block%}

{%block name="after_body" append%}
  {%widget name="wiki-common:widget/component/hunter/hunter.tpl"%}
  {%script%}
    require.async("wiki-tag:widget/util/lazyLoad/lazyLoad.js",function(LazyLoad){
        new LazyLoad();
    });
  {%/script%}
{%/block%}