/**
  * Copyright (c) 2015 Baidu, All rights reseved.
  * @fileoverview 百科tag落地页 分类与筛选项组件
  * @author Guzhihui | guzhihui@baidu.com
  * @version 1.0 | 2015-02-11 | Guzhihui    // 初始版本
  **/

var $ = require('wiki-common:widget/lib/jquery/jquery.js'),
    createWaterFall = require('wiki-tag:widget/waterfall/createWaterFall.js'),
    nsLog = require('wiki-common:widget/component/nslog/nslog.js');

// 显示或隐藏“更多”按钮逻辑
// 加逻辑，如果选中的筛选项resize后隐藏，则自动展开
function showMoreBtn() {
    $('#category .nav_block').each(function() {
        var listHeight = $(this).find('.params_cont').height();
        var $moreBtn = $(this).find('.more_btn');
        listHeight > 45 ? $moreBtn.show() : $moreBtn.hide();
    });
    $('#category .selected').each(function() {
        var selectTop = $(this).position().top;
        var $navBlock = $(this).closest('.nav_block');
        selectTop ? $navBlock.addClass('block_expand') : $navBlock.removeClass('block_expand');
    });
}

// 展开、收起筛选逻辑
$('#toggle-btn').on('click', function() {
    switch ($(this).attr('data-state')) {
        case 'show':
            toggleAll(true);
            $(this).attr('data-state', 'hide');
            $(this).find('.expand').hide();
            $(this).find('.collapse').show();
            break;
        case 'hide':
            toggleAll(false);
            $(this).attr('data-state', 'show');
            $(this).find('.expand').show();
            $(this).find('.collapse').hide();
            break;
    }
    
    showMoreBtn();
});

function toggleAll(state) {
    if (state) {
        var handlerArr = $('.nav-block-collapse');
        $.each(handlerArr, function(i, item) {
            $(item).addClass('nav-block-expand').removeClass('nav-block-collapse');
        });
    } else {
        var handlerArr = $('.nav-block-expand');
        $.each(handlerArr, function(i, item) {
            $(item).addClass('nav-block-collapse').removeClass('nav-block-expand');
        });
    }
}

// 筛选项展开收起逻辑
$('#category .block_tail').on('click', '.more_btn', function() {
    $(this).closest('.nav_block').toggleClass('block_expand');
});

// 筛选项选中后的逻辑
$('#category .params_cont').on('click', 'span', function() {
    var isUrl = $('#isUrl').val();
    $(this).parent().find('.selected').removeClass('selected');
    $(this).addClass('selected');

    if (isUrl === '1') {
        var tagIds = [];
        var currentTagId = $('#current_tag_id').val();
        var url = '/wikitag/' + currentTagId;
        var flag = false;
        var location;
        tagIds.push(url);

        $('#category .selected').each(function () {
            var tagId = $(this).attr('data-value') || 0;

            tagId && (flag = true);
            tagIds.push(tagId);
        });

        if (flag) {
            location = tagIds.join('-');
        } else {
            location = url;
        }
        window.location.href = location + '.html#par2';
    } else {
        var currentParams = createWaterFall.prepareParams();
        createWaterFall.changeParams({
            params: currentParams,
            state: {
                isDuringAjax: false,
                isProcessingData: false,
                isResizing: false,
                isPause: false,
                curPage: 0
            }
        });
    }

    nsLog({
        type: 8998
    });
});

$(document).ready(function() {
    showMoreBtn();
});
$(document.body).on('resize.cmnEvt', showMoreBtn);