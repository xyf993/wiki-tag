{%**
* Copyright (c) 2015 Baidu, All rights reseved.
* fileoverview tag编辑页（tag任务系统）
* author xiangyufei | xiangyufei@baidu.com
* version 1.0 | 2016-05-11 | xiangyufei   // Initial version
**%}

{%extends file="wiki-common/page/layout/varWidth.tpl"%}

{%block name="head_title"%}任务配置-tag任务系统管理后台{%/block%}
{%block name="head_end"%}
{%require name="wiki-tag:widget/datePicker/css/jquery-ui.css"%}
{%require name="wiki-tag:static/mis/createTask/createTask.less"%}
{%/block%}


{%block name="body_header"%}
<div class="header">
    <div class="layout">
        <h1>任务管理页</h1>
    </div>
</div>
{%/block%}

{%block name="body_main"%}
<div class="layout">
    <div class="mainCnt">
        <div class="line">
            <label for="" >任务名称：</label>
            <input type="text" class="taskName" name="name" value="{%$name%}">
        </div>
        <div class="line timePicker">
            <label for="">开始时间：</label>
            <input type="text" class="startTime" name="startTime" value="{%$startTime|date_format:'%Y-%m-%d %H:%M:%S'%}">
        </div>
        <div class="line timePicker">
            <label for="" class="l">结束时间：</label>
            <input type="text" class="endTime" name="endTime" value="{%$endTime|date_format:'%Y-%m-%d %H:%M:%S'%}">
        </div>

        <div class="line tagName">
            <label for="">标签名称：</label>
            <ul class='input-wrap'>
                {%if $tags%}
                    {%foreach $tags as $i => $tag%}
                     <li><span>标签{%$i+1%}</span><input type="text" value="{%$tag%}"></li>
                    {%/foreach%}
                {%else%}
                    {%foreach [1,2,3,4,5,6,7,8,9,10] as $i%}
                     <li><span>标签{%$i%}</span><input type="text" name="tags"></li>
                    {%/foreach%}
                {%/if%}
            </ul>
            <span class="cmn-btn-blue  cmn-btn-25">添加+</span>
        </div>

        <div class="line">
            <div class="limit">
                <label>参与资格：</label>
                <input type="radio" name="groupType" value="1"  {%if $groupType==1%}checked{%/if%}>
                <label>TAG任务—核心用户组</label>
                <input type="radio" name="groupType" value="2" {%if $groupType==2%}checked{%/if%}>
                <label>TGA任务——校园组</label>
            </div>
        </div>

        <div class="line">
            <label for="" class="poster">
                任务海报：
                <a href="javascript:;" id="poster-edit" class="cmn-btn-dark cmn-btn-28">编辑</a>
            </label>
            <div class="poster-wrap">
                <img src="{%$imageUrl%}" alt="任务海报">
            </div>
        </div>
        <div class="line">
            <label>任务介绍：</label>
            <textarea name="description" id="" cols="30" rows="10">{%$description%}</textarea>
        </div>
        {%if $taskId%}
        <a href="javascript:;" class="cmn-btn-blue cmn-btn-40 btn-40-padding  submitBtn" data-action="submitupdatetask">保存</a>
        {%else%}
        <a href="javascript:;" class="cmn-btn-blue cmn-btn-40 btn-40-padding  submitBtn" data-action="submitaddtask">发布任务</a>
        {%/if%}
    </div>
</div>


<div class="crop-dialog">
    <h3>裁剪图片</h3>
    <div class="crop-container"></div>
    <a href="javascript:;" class="crop-btn cmn-btn-blue cmn-btn-30">确认裁剪</a>
    <em class="cmn-icon cmn-icons cmn-icons_close"></em>
</div>

{%/block%}

{%block name="body_end"%}
<script>
    window.tplData = {
        taskId: {%$taskId|default: 0%},
        defaultPicInfo:"{%$image%}"
    }
</script>
{%require name="wiki-tag:static/mis/createTask/createTask.js"%}
{%/block%}
