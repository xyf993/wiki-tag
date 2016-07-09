{%*
  * Copyright (c) 2015 Baidu, All rights reseved.
  * @fileoverview 百科tag落地页 分类与筛选项组件
  * @author Guzhihui | guzhihui@baidu.com
  * @version 1.0 | 2015-02-11 | Guzhihui    // 初始版本
  **%}

<div id="category">
  <div class="category_wrap">
  <input type="hidden" name="currentTagId" id="current_tag_id" value="{%$category.currentTag.tagId%}">
  <input type="hidden" name="isUrl" id="isUrl" value="{%$isUrl%}">
  {%if $style == 0%}
  <div class="category_title">
    <div class="category_link">
      {%if $category.categoryName%}
      <span>{%$category.categoryName%}</span>
      <span class="category_link_arrow">
        <em class="cmn-icon wiki-mis-icons wiki-mis-icons_nav-right"></em>
      </span>
      {%/if%}
      <span>{%$category.currentTag.tagName%}</span>
    </div>
    <div class="lemma_num">
      (共{%$category.totalNum%}个)
    </div>
  </div>
  {%else%}
  <h2 class="headline">
    <div class="headline_content">
      {%if $category.categoryName%}
      <span class="headline_class">{%$category.categoryName%}</span>
      {%/if%}
      <span class="headline_tag">{%$category.currentTag.tagName%}</span>
    </div>
  </h2>
  {%/if%}
  {%if $filterOptions|@count neq 0%}
  <div class="filter">
  {%$index = 0%}
  {%foreach $filterOptions as $index => $filter%}
    {%if $filter.filterId != 23%}
    {%$index=$index+1%}
    {%/if%}
    <div class="nav_block {%if $index>4%}nav-block-collapse{%/if%} {%if $filter.filterId == 23%}nav-block-none{%/if%}">
      <div class="block_head"> 
        <span class="nav_title" title="{%$filter.filterName%}">{%$filter.filterName%}{%if $style%}：{%/if%}</span> 
      </div>
      <div class="block_body "> 
        <div class="params_cont">
          <span class="param_item {%if $filter.selectedTagId == 0%}selected{%/if%}"> 全部 </span>
        {%foreach $filter.tagRel as $i => $tag%}
          <span data-value="{%$tag.tagId%}" class="param_item {%if $filter.selectedTagId == $tag.tagId%}selected{%/if%}" title="{%$tag.tagName%}"> {%$tag.tagName%} </span>
        {%/foreach%}
        </div> 
      </div> 
      <div class="block_tail"> 
        <div class="more_btn">{%if $style == 0%}更多&nbsp;{%/if%}
          <em class="cmn-icon cmn-icons cmn-icons_userbar-up"></em>
          <em class="cmn-icon cmn-icons cmn-icons_userbar-down"></em>
        </div> 
      </div> 
    </div>
  {%/foreach%}
  {%if $index>4%}
    <div id="toggle-btn" data-state="show">
      <span class="expand">
        <span>展开筛选&nbsp;</span><span class="cmn-icon cmn-icons cmn-icons_userbar-up"></span>
      </span>
      <span class="collapse">
        <span>收起筛选&nbsp;</span><span class="cmn-icon cmn-icons cmn-icons_userbar-down"></span>
      </span>
    </div>
  {%/if%}
  </div>
  {%/if%}
</div>
</div>

{%script%}
  require('wiki-tag:widget/category/category.js');
{%/script%}