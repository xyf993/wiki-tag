{%**
* Copyright (c) 2015 Baidu, All rights reseved.
* fileoverview 任务列表（tag任务系统）
* author xiangyufei | xiangyufei@baidu.com
* version 1.0 | 2016-05-11 | xiangyufei   // Initial version
**%}

{%extends file="wiki-common/page/layout/varWidth.tpl"%}

{%block name="head_title"%}任务列表-tag任务系统管理后台{%/block%}
{%block name="head_end"%}
{%require name="wiki-tag:static/mis/taglist/taglist.less"%}
{%/block%}

{%block name="body_header"%}
<div class="header-wrapper">
    <div class="userbar-wrapper">
        {%widget name="wiki-common:widget/component/userbar/userbar.tpl"%}
    </div>
    {%widget name="wiki-common:widget/component/searchbar/searchbar_simple.tpl" topic="后台管理" size="36"%}
</div>
{%/block%}

{%block name="body_main"%}
<div class="main-wrapper">
    <a href="/tagtask/mis/createtask" target="_blank" class="cmn-btn-dark cmn-btn-30 createTask">创建任务</a>
    <table class="listContent">
        <thead>
        <tr>
            <th>任务ID</th>
            <th>任务名称</th>
            <th>参与资格</th>
            <th>发起人</th>
            <th>发起时间</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>操作时间</th>
            <th>状态</th>
            <th>完成情况</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
            {%foreach $data as $i=>$item%}
            <tr>
            <td>{%$item.taskId%}</td>
            <td>
                <a href="/tagtask/?taskId={%$item.taskId%}" target="_blank">{%$item.name%}</a>
            </td>
           
            <td> 
                {%if $item.groupType == 1%}
                核心任务组    
                {%else%} 
                校园组
                {%/if%}
            </td>
            <td>
                <a  href="http://www.baidu.com/p/{%$item.creater|escape:none%}?from=wk" target="_blank">{%$item.creater%}</a>
            </td>
            <td>{%$item.createTime|date_format:"%Y-%m-%d %H:%M:%S"|default:"-"%}</td>
            <td>{%$item.startTime|date_format:"%Y-%m-%d %H:%M:%S"|default:"-"%}</td>
            <td>{%$item.endTime|date_format:"%Y-%m-%d %H:%M:%S"|default:"-"%}</td>
            <td>{%$item.updateTime|date_format:"%Y-%m-%d %H:%M:%S"|default:'-'%}</td>
            <td>{%$item.statusDesc%}</td>
            <td>{%$item.finishProgress%}</td>
            <td class="operation">
                <a target="_blank" href="/tagtask/mis/updatetask?taskId={%$item.taskId%}" class="cmn-btn-white-blue cmn-btn-25">修改任务</a>
                <a target="_blank" href="/tagtask/mis/lemmamanager?taskId={%$item.taskId%}" class="cmn-btn-white-blue cmn-btn-25">批量导入/删除</a>
                <a target="_blank" href="/tagtask/mis/export?taskId={%$item.taskId%}&type=userFinish" class="cmn-btn-white-blue cmn-btn-25" target="_blank">导出用户完成词条</a>
                <a target="_blank" href="/tagtask/mis/export?taskId={%$item.taskId%}&type=dayFinish" class="cmn-btn-white-blue cmn-btn-25" target="_blank">导出每日完成词条</a>
            </td>
            </tr>
            {%/foreach%}
        </tbody>
    </table>
    <div id="pager"></div>    
</div>
{%/block%}

{%block name="body_end"%}
<script>
    window.tplData = {
        total: {%$total|default:0%}
    };
</script>
{%require name="wiki-tag:static/mis/taglist/taglist.js"%}
{%/block%}