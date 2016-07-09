{%**
* Copyright (c) 2015 Baidu, All rights reseved.
* fileoverview 用户领取词条（tag任务系统）
* author xiangyufei | xiangyufei@baidu.com
* version 1.0 | 2016-05-11 | xiangyufei  
**%}

{%extends file="wiki-common/page/layout/varWidth.tpl"%}

{%block name="head_title"%}{%/block%}
{%block name="head_end"%}
{%require name="wiki-tag:static/userTag/userTag.less"%}
{%require name="wiki-tag:static/layout/layout.less"%}
{%/block%}


{%block name="body_header"%}
<div class="header-wrapper">
    <div class="userbar-wrapper">
        {%widget name="wiki-common:widget/component/userbar/userbar.tpl"%}
    </div>
    {%widget name="wiki-common:widget/component/searchbar/searchbar_simple.tpl" topic="tag任务" %}
</div>
{%/block%}

{%block name="body_main"%}
<div class="activity-status cmn-clearfix">
        <div class="layout">
        <!-- 任务状态 -->
        <div class="activity-info ">
            <img width="200" height="150" src="{%$taskInfo.image%}">
            <div class="info-content">
                <h2>{%$taskInfo.name%}</h2>
                {%if $taskInfo.endTime-$taskInfo.startTime > 0%}
                <span class="restTime" id="activity_count_area">
                    <em class="layout-icons layout-icons_time icon-time"></em>
                    还有
                    <span class="num"></span>
                    <span class="text">天</span>
                    <span class="num"></span>
                    <span class="text">小时</span>
                    <span class="num"></span>
                    <span class="text">分</span>
                    <span class="num"></span>
                    <span class="text">秒</span>
                    结束
                </span>
                {%/if%}
                <div id="activity_end_tip" class="long-time" {%if $taskInfo.endTime-$taskInfo.startTime <= 0%}style="display: block;" {%/if%}>任务已结束</div>
                <p><em class="layout-icons layout-icons_ok icon-ok"></em>
                    已有{%$joinCount%}人参加</p>
                <p>本任务仅限<span class="limitUser">指定用户</span>参与</p>
            </div>
        </div>
        <!--  用户 -->
        <div class="activity-user">
            <div class="user-info">
                <img width="80" height="80" src="{%$userInfo.portrait%}">
                <span class="name">
                    hi,{%$userInfo.uname%}</br>
                </span>
            </div>
            <div class="user-condition">
                <span>{%$submitCount%}</br>已提交</span>
                <span>{%$passCount%}</br>已通过</span>
                <span>{%$userRank%}</br>排名</span>
            </div>
        </div>
     </div>
</div>

<div class="activity-content cmn-clearfix">
    <div class="content-left">
    <!--任务规则-->
        <div class="common task-rule">
            <h2>任务规则</h2>
            <div class="task-desc">{%$taskInfo.description|escape:none%}</div>
        </div>

        <!--编辑tag-->
        <div class="common edit-tag" id="activity_edit_tag">
            <h2>编辑词条标签</h2>
            <a href="javascript:;" class="cmn-btn-32 cmn-btn-blue" id="startTask">开始任务</a>
            <div id="tag-content">
                <div class="lemmaIntro">
                </div>
                <ul id="tag-list">
                    {%foreach $taskInfo.tags as $key=>$tag%}
                    <li><input type="checkbox" data-tag="{%$key%}"><label>{%$tag%}</label></li>
                    {%/foreach%}
                </ul>
                <div class="btn-wrapper">
                    <span class="cmn-btn-32 cmn-btn-blue" id="submitBtn"  href="javascript:;">提交</span>
                    <span class="cmn-btn-32 cmn-btn-blue" id="change-lemma" href="javascript:;">更换</span>
                </div>
            </div>  
        </div>
        <!-- 我的进度 -->
        <div class="common my-progress">
            <h2>我的进度</h2>
            <ul id="progress-menu" class="progress-menu">
                <li class="progress pass active">已通过({%$passCount%})</li>
                <li class="progress unpass no-active">未通过({%$submitCount-$passCount%})</li>
            </ul>
            
            <div id="pass" >
                <table class="task-list" id="pass-list" >
                    <thead>
                    <th>词条名</th>
                    <th>状态</th>
                    <th>完成时间</th>
                    <th>操作</th>
                    </thead>
                    <tbody></tbody>
                </table>
                <div id="pass-pager" class="pager"></div>
            </div>
            <div id="unpass" style="display: none;">
                <table class="task-list" id="unpass-list" >
                    <thead>
                    <th>词条名</th>
                    <th>状态</th>
                    <th>截止时间</th>
                    <th>操作</th>
                    </thead>
                    <tbody></tbody>
                </table>
                <div id="unpass-pager" class="pager"></div>
            </div>

            <div class="notice">
                <p>1.  您提交的词条将同时被其他网友进行判定。至少1名网友与您判定一致时词条方可通过。</p>
                <p>2.  您的未通过版本将被即时回收。</p>
            </div>
        </div>
</div>

    <div class="common user-rank">
        <h2>用户排行榜</h2>
        {%foreach $rankList as $item%}
        {%if $item@index % 10 == 0%}
        <ul class="user-list" {%if $item@index > 0%} style="display:none;"{%/if%}>
        {%/if%}
            <li class="user-list-li">
                <span class="rank">{%$item@index+1%}</span>
                <a target="_blank" class="user-name" href="http://www.baidu.com/p/{%$item.uname|escape:none%}?from=wk">{%$item.uname%}</a>
                <span class="count">{%$item.count%}</span>
            </li>
        {%if ($item@index - 9) % 10 == 0 || $item@last%}
        </ul>
        {%/if%}
        {%/foreach%}
        <div id="rank-pager" class="pager"></div>
    </div>
</div>
    <div class="shareBar">
        {%widget name="wiki-common:widget/component/share/sideShare.tpl"%}
    </div>
{%/block%}

{%block name="body_footer"%}
{%widget name="wiki-common:widget/component/footer/footer_main.tpl"%}
{%/block%}
{%block name="body_end"%}
<script>
    window.tplData = {
        startTime: {%$taskInfo.startTime|default: 0%},
        endTime: {%$taskInfo.endTime|default: 0%},
        taskId: {%$taskInfo.taskId|default: 0%},
        rankCount:  {%$rankList|count%},
        passCount: {%$passCount|default: 0%},
        submitCount: {%$submitCount|default: 0%},
        tk: "{%$tk%}",
        taskName: "{%$taskInfo.name%}"
    };
</script>
{%require name="wiki-tag:static/userTag/userTag.js"%}
{%/block%}