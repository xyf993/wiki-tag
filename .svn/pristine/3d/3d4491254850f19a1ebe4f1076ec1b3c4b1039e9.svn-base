/**
 * Copyright (c) 2014-2015 Baidu, All rights reseved.
 * @fileoverview 返回页首组件
 * @author GuZhihui | guzhihui@baidu.com
 * @version 1.0 | 2015-4-25 | GuZhihui    // 初始版本。
 *
 * @method constructor()           // 方法：注册返回页首按钮(参阅下文附加说明)。
 *   @param btn {Element}          // 参数：要注册的返回页首按钮(可选，默认为空)。
 *   @param parent {Element}       // 参数：要注册的返回页首按钮父元素(可选，默认为空)。
 *   @param callback {Function}    // 参数：按钮被点击，在返回页首行为完成后的回调(可选，默认无，调用时无传参)。
 *   @return No                    // 返回：无。
 *
 * @description    // 附加说明。
 *   1) 本组件对外只有一个开放接口，用于注册要被添加“返回页首”行为的按钮，注册后点击该按钮，即可触发返回页首行为。
 *   2) 被注册的按钮会被添加 'wgt_scrollToTop' 的样式名；在“返回页首”行为发生并达成时，还会被添加 'top-arrived' 样式名。
 *      您可以使用这些样式名来操作按钮在不同状态下的样式，典型地，您可以在 'top-arrived' 样式下隐藏“返回页首”按钮。
 *      注：在注册初始(通常认为此时页面垂直卷动距离为 0)及页面垂直卷动距离 scrollTop 小于 800 时，被注册按钮也会被添加 'top-arrived' 样式。
 *
 * @example    // 典型的调用示例。
    var scrollToTop = require('wiki-common:widget/util/scrollToTop.js');

    scrollToTop('#someBtnId', function(){    // 注册“返回页首”按钮
      console.log('已返回页首');
    });
 */

var $ = require('wiki-common:widget/lib/jquery/jquery.js'),
  scrollTo = require('wiki-common:widget/util/scrollTo.js'),
  browser = require('wiki-common:widget/util/browser.js'),
  safeCall = require('wiki-common:widget/util/safeCall.js');

var scrollHost = (browser.ie() || browser.firefox()) ? document.documentElement : document.body,
  isScrolling = false;

$(window).on('scroll', function(){
  if (!isScrolling) {
    var toTopBtnsParent = $('.wgt_parent_scrollToTop');

    if (scrollHost.scrollTop > 800) {
      toTopBtnsParent.removeClass('top-arrived');
    } else {
      toTopBtnsParent.addClass('top-arrived');
    }
  }
});

$('body').on('click', '.wgt_scrollToTop', function(){
  var btn = $(this);
  var toTopBtnsParent = $(this).closest('.wgt_parent_scrollToTop');

  isScrolling = true;
  scrollTo(null, null, function(){
    isScrolling = false;
    toTopBtnsParent.addClass('top-arrived');
    safeCall(btn.data('scrollToTopCallback'));
  });
});

module.exports = function(btn, parent, callback){
  $(btn).addClass('wgt_scrollToTop')
    .data('scrollToTopCallback', callback);

  if(!parent){
    parent = btn;
  }
  $(parent).addClass('wgt_parent_scrollToTop top-arrived');
};