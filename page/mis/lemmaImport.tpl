{%**
* Copyright (c) 2015 Baidu, All rights reseved.
* fileoverview 词条导入
* author xiangyufei | xiangyufei@baidu.com
* version 1.0 | 2016-05-11 | xiangyufei   // Initial version
**%}

{%extends file="wiki-common/page/layout/varWidth.tpl"%}

{%block name="head_title"%}词条批量导入、删除-tag任务系统管理后台{%/block%}
{%block name="head_end"%}
    {%require name="wiki-tag:static/mis/lemmaImport/lemmaImport.less"%}
{%/block%}

{%block name="body_main"%}
<div class="layout">
    <div class="header">
        <span class="name">{%$name%}({%$taskId%})</span> | 词条批量导入、删除
    </div>
    <div class="mainCnt">
        <div class="cnt">
            <textarea id="importArea" placeholder="lemmaTitle###lemmaId（不存在词条lemmaId为0），以回车分隔"></textarea>
            <div class="btnArea">
                <a href="javascript:;" class="cmn-btn-dark cmn-btn-32 mr30" id="add">导入</a>
                <a href="javascript:;" class="cmn-btn-dark cmn-btn-32" id="delete">删除</a>
            </div>
        </div>
        <div class="resultWrap">
            <div class="resultHeadline">词条导入结果：</div>
            <div class="result"></div>
        </div>
    </div>
</div>
{%/block%}

{%block name="body_end"%}
<script>
   window.tplData = {
        taskId: {%$taskId|default: 15000022%},
        tk: "{%$tk%}"
   }
</script>
    {%require name="wiki-tag:static/mis/lemmaImport/lemmaImport.js"%}
{%/block%}