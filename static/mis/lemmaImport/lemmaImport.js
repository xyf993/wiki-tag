/**
 * @file import
 */
var $ = require('wiki-common:widget/lib/jquery/jquery.js');
var Dialog = require('wiki-common:widget/ui/dialog/dialog.js');
var lemmaImport = require('wiki-tag:widget/mis/lemmaImport.js');


// 词条批量、分步操作
var $importArea = $('#importArea');

lemmaImport.init({
    host: $('.result'),
    span: 500,
    url: '/api/tagtask/submitmanagerlemma',
    extAjaxData: {
        taskId: window.tplData.taskId,
        type: 'add',
        tk: window.tplData.tk
    }
});

$('#add').on('click', function () {
    var lemmaIds = $.trim($importArea.val()).split('\n');
    lemmaImport.reset({
        lemmas: lemmaIds,
        extAjaxData: {
            type: 'add'
        }
    });
    Dialog.confirm({
        mainMsg: '确认导入？',
        onConfirm: function () {
            lemmaImport.start();
        }
    });
});

$('#delete').on('click', function () {
    var lemmaIds = $.trim($importArea.val()).split('\n');
    lemmaImport.reset({
        lemmas: lemmaIds,
        extAjaxData: {
            type: 'delete'
        }
    });
    Dialog.confirm({
        mainMsg: '确认删除？',
        onConfirm: function () {
            lemmaImport.start();
        }
    });
});
