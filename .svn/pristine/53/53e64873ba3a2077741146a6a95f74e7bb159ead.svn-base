/**
 * Copyright (c) 2015 Baidu, All rights reseved.
 * @fileoverview 百科首页 特色分类组件脚本
 * @author LiJijun | lijijun@baidu.com
 * @version 1.0 | 2014-08-30 | LiJijun    // 初始版本
 **/

var $ = require('wiki-common:widget/lib/jquery/jquery.js'),
    Marquee = require('wiki-common:widget/ui/marquee/marquee.js');

function renderFancyCategories() {
    var fancyCategories = new Marquee({
        container: $('#memory #viewport ul'),
        viewportCap: 4,
        isContinuous: true,
        scrollStep: 1,
        unitSize: {
            width: 300,
            height: 258
        },
        autoScrollInterval: 0,
        duration: 500
    });
    return fancyCategories;
}

var fancyCategories = renderFancyCategories();
$('#memory #viewport').width(1180);

$('#memory').on('click', '.button', function () {
    switch ($(this).attr('data-skipTo')) {
        case 'prev':
            fancyCategories.scroll(-1);
            break;
        case 'next':
            fancyCategories.scroll();
            break;
    }
});

$(document.body).on('resize.cmnEvt', function () {
    fancyCategories.destroy();
    fancyCategories = renderFancyCategories();
});