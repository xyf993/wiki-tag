{%*
  * Copyright (c) 2015 Baidu, All rights reseved.
  * @fileoverview 百科tag落地页
  * @author Guzhihui | guzhihui@baidu.com
  * @version 1.0 | 2015-02-11 | Guzhihui    // 初始版本
  **%}


{%extends file="wiki-common/page/layout/varWidth.tpl"%}

{%block name='body_page_class'%} {%if $fromLemma%} w-tag-lemma{%else%} w-tag{%/if%}{%/block%}

{%block name="head_title"%}{%$category.currentTag.tagName%}分类_百度百科{%/block%}

{%block name="head_start"%}
  <meta name="Keywords" content="{%$category.currentTag.tagName%} {%$category.categoryName%} 列表 名单 类别 主题 百度百科 baike" />
{%/block%}

{%block name="body_header"%}
{%if $fromLemma == 0%}
<div>
  <div class="header-wrapper">
    <div class="header">
      <div class="layout">
        <div class="userbar-container">
          {%widget name="wiki-common:widget/component/userbar/userbar.tpl"%}
        </div>
        {%widget name="wiki-common:widget/component/searchbar/searchbar_simple.tpl" topic="分类" size="36"%}
      </div>
    </div>
  </div>
</div>
{%/if%}
{%/block%}

{%block name="body_main"%}
{%$style = 0%}
{%$isUrl = 1%}
{%$page = 0%}
{%$limit = 24%}
{%if $fromLemma == 1%}
  {%$style = 1%}
  {%$isUrl = 0%}
  {%$page = 1%}
  {%$limit = 30%}
{%/if%}

<div>
  <div class="category-wrapper">
    <div class="layout">
      <div class="category-container">
          {%widget name="wiki-tag:widget/category/category.tpl" category=$category filterOptions=$filterOptions isUrl=$isUrl style=$style%}
      </div>
    </div>
  </div>
  <div class="waterFall-wrapper">
    <div class="layout">
      <div class="waterFall-container">
        {%widget name="wiki-tag:widget/waterfall/waterFall.tpl" fromLemma=$fromLemma page=$page limit=$limit%}
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
{%/block%}

{%block name="body_end"%}
  {%require name="wiki-tag:static/home/home.less"%}
  {%require name="wiki-tag:widget/waterfall/waterfall.less"%}
  {%require name="wiki-tag:static/home/home.js"%}
{%/block%}