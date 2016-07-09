/**
 * Copyright (c) 2015 Baidu, All rights reseved.
 * @fileoverview 瀑布流核心算法-core
 * @author Guzhihui(原作者：bingdian) | guzhihui@baidu.com
 * @version 1.0 | 2015-02-27 | Guzhihui    // 初始版本。
 * @version 1.1 | 2015-04-07 | Guzhihui    // 异常处理及款窄屏转换逻辑优化。
 *
 * @method Waterfall(args)          // 方法：初始化并启动瀑布流(单参数完整配置)。
 *   @param args {Object}          // 参数：瀑布流初始化属性(必选，参阅下文详述)。
 *     path {String}               // 参数：瀑布流数据分页url(必选，默认无，参阅下文详述)。
 *     tpl {String}                // 参数：需要渲染的模板(必选，默认值无，参阅下文详述)。
 *     host {String}               // 参数：瀑布流绑定父级元素(必选，默认无，参阅下文描述)。
 *     itemCls {String}            // 参数：瀑布流数据块class(可选，默认值：'waterfall-item'，参阅下文详述)。
 *     prefix {String}             // 参数：瀑布流元素前辍(可选，默认值：'waterfall'，参阅下文详述)。
 *     fitWidth {Boolean}          // 参数：是否自适应父元素宽度(可选，默认值：true，参阅下文详述)。
 *     colWidth {Number}           // 参数：瀑布流每列的宽度，单位 px(可选，默认值：240，参阅下文详述)。
 *     gutterWidth {Number}        // 参数：数据块水平间距，单位 px(可选，默认值：10，参阅下文详述)。
 *     gutterHeight {Number}       // 参数：数据块垂直间距，单位 px(可选，默认值：10，参阅下文详述)。
 *     maxPage {Number}            // 参数：最多显示多少页数据(可选，默认无，参阅下文描述)。
 *     bufferPixel {Number}        // 参数：滚动时, 窗口底部到瀑布流最小高度列的距离 > bufferPixel时, 
 *                                          自动加载新数据，单位 px(可选，默认值：-50，参阅下文详述)。
 *     resizable {Boolean}         // 参数：缩放时是否触发数据重排(可选，默认值：true，参阅下文详述)。
 *     isFadeIn {Boolean}          // 参数：新插入数据是否使用fade动画(可选，默认值：false，参阅下文详述)。
 *     isAnimated {Boolean}        // 参数：resize时数据是否显示动画(可选，默认值：false，参阅下文详述)。
 *     animationOptions {Object}   // 参数：resize动画效果，isAnimated为true时有效(可选，默认值：{}，参阅下文详述)。
 *     isAutoPrefill {Boolean}     // 参数：当文档小于窗口可见区域，自动加载数据(可选，默认值：true，参阅下文详述)。
 *     checkImagesLoaded {Boolean} // 参数：是否图片加载完成后开始排列数据块(可选，默认值：true，参阅下文描述)。
 *     dataType {String}           // 参数：瀑布流返回数据格式，'json', 'jsonp', 'html'(可选，默认值：'json'，参阅下文详述)。
 *     params {Object}             // 参数：瀑布流数据请求参数(可选，默认值：{}，参阅下文详述)。
 *     loadingMsg {Html}           // 加载提示进度条(可选，默认有，参阅下文详述)。
 *     callbacks {Object}          // ajax请求各过程中回调函数，可重写(可选，默认值有，参阅下文详述)。
 *     debug {Boolean}             // 开启debug(可选，默认值：false，参阅下文详述)。
 *   @return {Object}              // 返回：瀑布流操作句柄(参阅下文详述)。
 *
 * @method loadingStart(loading)                    // 方法：ajax请求开始之前回调函数(参阅下文详述)。
 *   @param loading {Object}                        // 参数：loading对象(可选，默认值：$('#waterfall-loading')，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method loadingFinished(loading,isBeyondMaxPage) // 方法：ajax请求加载完成回调函数(参阅下文详述)。
 *   @param loading {Object}                        // 参数：loading对象(可选，默认值：$('#waterfall-loading')，参阅下文详述)。
 *   @param isBeyondMaxPage {Boolean}               // 参数：是否超过最大页数(可选，默认无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method loadingError(message,xhr)                // 方法：ajax请求加载失败回调函数(参阅下文详述)。
 *   @param message {Object}                        // 参数：错误信息对象(可选，默认值：$('#waterfall-message')，参阅下文详述)。
 *   @param xhr {String}                            // 参数：ajax请求错误参数(可选，默认无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method renderData(data, dataType, tpl)          // 方法：ajax请求成功后渲染页面(参阅下文详述)。
 *   @param data {Object}                           // 参数：预处理过的数据(可选，默认无，参阅下文详述)。
 *   @param datatype {String}                       // 参数：ajax请求成功后返回的数据格式(可选，默认值：'json'，参阅下文详述)。
 *   @param tpl {String}                            // 参数：渲染的模板(可选，默认值无，参阅下文详述)。
 *   @return {String}                               // 返回：渲染成功后的HTML字符串。
 *
 * @method _debug()                                 // 方法：开启调试模式(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @method _init(callback)                          // 方法：瀑布流初始化(参阅下文详述)。
 *   @param callback {Function}                     // 参数：初始化后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method _initContainer()                         // 方法：初始化父级元素(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @method _getColumns()                            // 方法：宽窄屏识别，获取应该放置的列数(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return {Number}                               // 返回：应该放置的列数。
 *
 * @method _setColumns()                            // 方法：初始化当前列数(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @method _getItems(content)                       // 方法：获取每个瀑布流元素(参阅下文详述)。
 *   @param content {Object}                        // 参数：每个瀑布流元素(必选，默认值无，参阅下文详述)。
 *   @return {Array}                                // 返回：瀑布流元素列表。
 *
 * @method _resetColumnsHeightArray()               // 方法：重置每列的高度(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @method layout(content, callback)                // 方法：渲染元素(参阅下文详述)。
 *   @param content {Object}                        // 参数：每个瀑布流元素(必选，默认值无，参阅下文详述)。
 *   @param callback {Function}                     // 参数：渲染后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method reLayout(callback)                       // 方法：重渲染元素(参阅下文详述)。
 *   @param callback {Function}                     // 参数：重渲染后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method _placeItems(item, fixMarginLeft)         // 方法：算出每个元素位置并渲染(参阅下文详述)。
 *   @param item {String}                           // 参数：当前元素选择器(可选，默认值无，参阅下文详述)。
 *   @param fixMarginLeft {String}                  // 参数：校正过的误差值(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method _doLoadImage(content)                    // 方法：瀑布流中图片懒加载(参阅下文详述)。
 *   @param content {Object}                        // 参数：父级元素(必选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method prepend(content, callback)               // 方法：在前面插入新元素(参阅下文详述)。
 *   @param content {Object}                        // 参数：每个瀑布流元素(必选，默认值无，参阅下文详述)。
 *   @param callback {Function}                     // 参数：插入后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method append(content, callback)                // 方法：在后面插入新元素(参阅下文详述)。
 *   @param content {Object}                        // 参数：每个瀑布流元素(必选，默认值无，参阅下文详述)。
 *   @param callback {Function}                     // 参数：插入后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method removeItems(item, callback)              // 方法：删除元素(参阅下文详述)。
 *   @param item {Object}                           // 参数：需要被删除的元素(必选，默认值无，参阅下文详述)。
 *   @param callback {Function}                     // 参数：删除元素后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method option(opts, callback)                   // 方法：重置初始化数据，并重新加载瀑布流(参阅下文详述)。
 *   @param opts {Object}                           // 参数：需要重置的参数及值(可选，默认值无，参阅下文详述)。
 *   @param callback {String}                       // 参数：重置初始化数据的回调函数(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method pause(callback)                          // 方法：暂停ajax请求(参阅下文详述)。
 *   @param callback {Function}                     // 参数：暂停ajax请求后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method resume(callback)                         // 方法：恢复ajax请求(参阅下文详述)。
 *   @param callback {Function}                     // 参数：恢复ajax请求后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method _requestData(callback)                   // 方法：请求数据(参阅下文详述)。
 *   @param callback {Function}                     // 参数：请求数据后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method _handleResponse(data, callback)          // 方法：获取数据成功后处理函数(参阅下文详述)。
 *   @param data {Object}                           // 参数：获取的数据(可选，默认值无，参阅下文详述)。
 *   @param callback {Function}                     // 参数：获取数据成功后的回调函数，针对每个元素的处理(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method _responeseError(xhr)                     // 方法：获取数据失败后函数(参阅下文详述)。
 *   @param xhr {String}                            // 参数：请求错误信息(可选，默认值无，参阅下文详述)。
 *   @return No                                     // 返回：无。
 *
 * @method _nearbottom()                            // 方法：判断是否到设置的最低端(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return {Boolean}                              // 返回：是否到设置的最低端。
 *
 * @method _prefill()                               // 方法：预加载(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @method _scroll()                                // 方法：滚动事件触发后处理函数(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @method _doScroll()                              // 方法：监听滚动事件(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @method _resize()                                // 方法：resize事件触发后处理函数(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @method _doResize()                              // 方法：监听resize事件(参阅下文详述)。
 *   @param No                                      // 参数：无。
 *   @return No                                     // 返回：无。
 *
 * @description    // 附加说明。
 *   1) 本组件支持百科宽窄屏设计规范、自动排版。
 *   2) 本组件支持自定义动画
 *   3) 本组件支持自定义前端模板。
 *   4) 本组件支持预处理ajax数据。
 *   5) 本组件支持自定义loading动画。
 *   6) 本组件支持调试。 
 *   7) 本组件推荐直接设置图片的高宽，而不是自生成，这样性能优且可不使用imagesLoaded组件。
 *
 * @example    // 典型的调用示例。
    var Waterfall = require('wiki-common:widget/util/animation.js');

    var waterfall = Waterfall({
        itemCls: 'waterfall-item',
        prefix: 'waterfall',
        colWidth: 240,
        gutterWidth: 10,
        gutterHeight: 10,
        minCol: 1,
        maxCol: undefined,
        maxPage: undefined,
        bufferPixel: -50,
        resizable: true,
        isFadeIn: false,
        isAnimated: false,
        animationOptions: {},
        checkImagesLoaded: true,
        host: undefined,
        path: undefined,
        tpl: undefined,
        dataType: 'json',
        params: {},
        headers: {},

        loadingMsg: '<div style="text-align:center;padding:10px 0; color:#999;"><img src="data:image/gif;base64,R0lGODlhEAALAPQAAP///zMzM+Li4tra2u7u7jk5OTMzM1hYWJubm4CAgMjIyE9PT29vb6KiooODg8vLy1JSUjc3N3Jycuvr6+Dg4Pb29mBgYOPj4/X19cXFxbOzs9XV1fHx8TMzMzMzMzMzMyH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7" alt=""><br />Loading...</div>', // loading html

        state: {
            isDuringAjax: false,
            isProcessingData: false,
            isResizing: false,
            isPause: false,
            curPage: 0
        },

        callbacks: {
            loadingStart: function($loading) {
                $loading.show();
            },

            loadingFinished: function($loading, isBeyondMaxPage) {
                if (!isBeyondMaxPage) {
                    $loading.fadeOut();
                } else {
                    $loading.remove();
                }
            },

            loadingError: function($message, xhr) {
                if (xhr === 'error') {
                    $message.html('加载失败，请重试~');
                } else {
                    $message.html('暂无数据，敬请期待~');
                }
            },

            renderData: function(data, dataType, tpl) {
                var template;

                if (dataType === 'json' || dataType === 'jsonp') { // json or jsonp format
                    template = new JSmart(tpl);
                    return template.fetch(data);
                } else {
                    return data;
                }
            }
        },

        debug: false
    });

    // 可在初始化后对瀑布刘进行如下操作：
    waterfall.prepend($content, callback);      // 在瀑布流前插入元素
    waterfall.apend($content, callback);        // 在瀑布流后插入元素

    waterfall.removeItems($items, callback);    // 删除瀑布流瀑布流元素
    waterfall.reLayout($content, callback);     // 刷新布局，重渲染

    waterfall.pause($content, callback);        // 暂停ajax请求
    waterfall.resume($content, callback);       // 恢复ajax请求

    waterfall.option(options, callback);        // 重置瀑布流参数，并重新加载瀑布流
 */

var $ = require('wiki-common:widget/lib/jquery/jquery.js'),
    JSmart = require('wiki-common:widget/lib/jsmart/jsmart.js'),
    browser = require('wiki-common:widget/util/browser.js'),
    imagesLoaded = require('wiki-tag:widget/util/imagesLoaded/imagesLoaded.js'),
    HorPager = require('wiki-common:widget/ui/pager/horPager/horPager.js');

// 瀑布流初始化，默认参数
var $window = $(window),
    defaults = {
        itemCls: 'waterfall-item',
        prefix: 'waterfall',
        colWidth: 240,
        gutterWidth: 10,
        gutterHeight: 10,
        minCol: 1,
        maxCol: undefined,
        maxPage: undefined,
        bufferPixel: -50,
        isPage: false,
        resizable: true,
        isFadeIn: false,
        isAnimated: false,
        animationOptions: {},
        checkImagesLoaded: true,
        host: undefined,
        path: undefined,
        tpl: undefined,
        dataType: 'json',
        params: {},
        headers: {},

        loadingMsg: '<div style="text-align:center; color:#999;"><img src="data:image/gif;base64,R0lGODlhEAALAPQAAP///zMzM+Li4tra2u7u7jk5OTMzM1hYWJubm4CAgMjIyE9PT29vb6KiooODg8vLy1JSUjc3N3Jycuvr6+Dg4Pb29mBgYOPj4/X19cXFxbOzs9XV1fHx8TMzMzMzMzMzMyH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7" alt=""><br />Loading...</div>', // loading html

        state: {
            isDuringAjax: false,
            isProcessingData: false,
            isResizing: false,
            isPause: false,
            curPage: 0
        },

        callbacks: {
            loadingStart: function($loading) {
                $loading.show();
            },

            loadingFinished: function($loading, isBeyondMaxPage) {
                if (!isBeyondMaxPage) {
                    $loading.fadeOut();
                } else {
                    $loading.remove();
                }
            },

            loadingError: function($loading, $message, xhr) {
                $loading.hide();
                
                switch (xhr) {
                    case 'error':
                        $message.html('加载失败，请重试~');
                        break;
                    case 'none':
                        $message.html('暂无数据，敬请期待~');
                        break;
                    case 'end':
                        $message.html('已经没数据咯~');
                        break;
                }

                (xhr == 'end') && $message.fadeOut(2000);
            },

            renderData: function(data, dataType, tpl) {
                var template;

                if (dataType === 'json' || dataType === 'jsonp') { // json or jsonp format
                    template = new JSmart(tpl);
                    return template.fetch(data);
                } else {
                    return data;
                }
            }
        },

        debug: false
    };

// 瀑布类
function Waterfall(args) {

    this.$element = $(args.host);
    this.options = $.extend(true, {}, defaults, args);
    this.colHeightArray = [];
    this.styleQueue = [];

    this._init();
}

Waterfall.prototype = {
    constructor: Waterfall,

    // 开启测试
    _debug: function() {
        if (true !== this.options.debug) {
            return;
        }

        if (typeof console !== 'undefined' && typeof console.log === 'function') {
            // 高级浏览器
            if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
                console.log((Array.prototype.slice.call(arguments)).toString());
            } else {
                console.log(Array.prototype.slice.call(arguments));
            }
        } else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
            // IE8及以下
            Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
        }
    },

    // 初始化函数
    _init: function(callback) {
        var options = this.options,
            path = options.path,
            host = options.host,
            isPage = options.isPage;

        this._clearBody();
        this._setColumns();
        this._initContainer();
        this._resetColumnsHeightArray();
        //this.reLayout(callback);

        if (!path) {
            this._debug('Invalid path');
            return;
        }

        if (!host) {
            this._debug('Invalid host');
            return;
        }

        if (isPage) {
            this._pageAjax();
            return;
        }

        // 自动请求数据加载瀑布流
        this._prefill();

        // 绑定resize事件监听
        if (options.resizable) {
            this._doResize();
        }

        // 绑定scroll事件监听
        this._doScroll();
    },

    // 清除已有的瀑布流页面元素

    _clearBody: function() {
        var options = this.options,
            prefix = options.prefix,
            host = options.host;

        $(host).html('');
        $('#' + prefix + '-loading').remove();
        $('#' + prefix + '-message').remove();
        $('#' + prefix + '-horPagerBox').remove();
    },

    // 初始化父级元素
    _initContainer: function() {
        var options = this.options,
            prefix = options.prefix;

        // fix fixMarginLeft bug
        $('body').css({
            'overflow-y': 'scroll'
        });

        this.$element.addClass(prefix + '-container');
        this.$element.after('<div style="text-align:center;margin-bottom:20px;" class="hor-pager-box" id="' + prefix + '-horPagerBox"><div class="pager"></div></div>');
        this.$element.after('<div id="' + prefix + '-loading">' + options.loadingMsg + '</div><div id="' + prefix + '-message" style="text-align:center;color:#999;"></div>');

        this.$loading = $('#' + prefix + '-loading');
        this.$message = $('#' + prefix + '-message');
        this.$pageBox = $('#' + prefix + '-horPagerBox .pager');
        this.$loading.css({
            "position":"absolute",
            "top":"20px",
            "left":"50%",
            "margin-left":"-20px"
        });
    },

    // 宽窄屏识别，获取应该放置的列数
    _getColumns: function() {
        var options = this.options,
            $container = this.$element,
            containerWidth = $container[0].tagName === 'BODY' ? $container.width() - 20 : $container.width(), // if $container[0].tagName === 'BODY', fix browser scrollbar
            colWidth = options.colWidth,
            gutterWidth = options.gutterWidth;

        containerWidth = containerWidth + gutterWidth;
        return Math.floor(containerWidth / (colWidth + gutterWidth));
    },

    // 初始化当前列数
    _setColumns: function() {
        this.cols = this._getColumns();
    },

    // 获取每个瀑布流元素
    _getItems: function($content) {
        var $items = $content.filter('.' + this.options.itemCls).css({
            'position': 'absolute'
        });

        return $items;
    },

    // 重置每列的高度
    _resetColumnsHeightArray: function() {
        var cols = this.cols,
            i;

        this.colHeightArray.length = cols;

        for (i = 0; i < cols; i++) {
            this.colHeightArray[i] = 0;
        }
    },

    // 渲染元素
    layout: function($content, callback) {
        var options = this.options,
            $items = this.options.isFadeIn ? this._getItems($content).css({ opacity: 0 }).animate({ opacity: 1 }) : this._getItems($content),
            styleFn = (this.options.isAnimated && this.options.state.isResizing) ? 'animate' : 'css',
            animationOptions = options.animationOptions,
            colWidth = options.colWidth,
            gutterWidth = options.gutterWidth,
            len = this.colHeightArray.length,
            align = options.align,
            fixMarginLeft,
            obj,
            i, j, itemsLen, styleLen;

        // append $items
        this.$element.append($items);


        this._doLoadImage(this.$element);

        // fixMarginLeft
        fixMarginLeft = (this.$element.width() - colWidth * len - gutterWidth * (len - 1)) / 2;
        fixMarginLeft = fixMarginLeft > 0 ? fixMarginLeft : 0;

        // place items
        for (i = 0, itemsLen = $items.length; i < itemsLen; i++) {
            this._placeItems($items[i], fixMarginLeft);
        }

        // set style
        for (j = 0, styleLen = this.styleQueue.length; j < styleLen; j++) {
            obj = this.styleQueue[j];
            obj.$el[styleFn](obj.style, animationOptions);
        }

        // update waterfall container height
        this.$element.height(Math.max.apply({}, this.colHeightArray));

        // clear style queue
        this.styleQueue = [];

        // update status
        this.options.state.isResizing = false;
        this.options.state.isProcessingData = false;

        // callback
        if (callback) {
            callback.call($items);
        }
    },

    // 重渲染
    reLayout: function(callback) {
        var $content = this.$element.find('.' + this.options.itemCls);

        this._resetColumnsHeightArray();
        this.layout($content, callback);
    },

    // 算出每个元素位置并渲染
    _placeItems: function(item, fixMarginLeft) {

        var $item = $(item),
            options = this.options,
            colWidth = options.colWidth,
            gutterWidth = options.gutterWidth,
            gutterHeight = options.gutterHeight,
            colHeightArray = this.colHeightArray,
            len = colHeightArray.length,
            minColHeight = Math.min.apply({}, colHeightArray),
            minColIndex = $.inArray(minColHeight, colHeightArray),
            colIndex,
            position;

        if ($item.hasClass(options.prefix + '-item-fixed-left')) {
            colIndex = 0;
        } else if ($item.hasClass(options.prefix + '-item-fixed-right')) {
            colIndex = (len > 1) ? (len - 1) : 0;
        } else {
            colIndex = minColIndex;
        }

        position = {
            left: (colWidth + gutterWidth) * colIndex + fixMarginLeft,
            top: colHeightArray[colIndex]
        };

        // push to style queue
        this.styleQueue.push({
            $el: $item,
            style: position
        });

        // update column height
        colHeightArray[colIndex] += $item.outerHeight() + gutterHeight;
    },

    // 内部方法，添加节点时的并行方法，加载单元内的图片
    _doLoadImage: function($content) {
        // 设置了 srcd 的情况下
        $content.find('img[srcd]').each(function(index, element) {
            var $element = $(element),
                or = $element.attr('srcd');

            //如果事先设置了 srcd 取代图片 src
            if (or) {
                $element.css("display", "none")
                .one('load', function() {
                    $(this).css({
                        "visibility": "visible"
                    }).fadeIn(400);
                }).one('error', function() {
                    var $this = $(this);

                    window.setTimeout(function() {
                        $this.one('error', function() {
                            $this.attr('src', or);
                        }).attr('src', or);
                    }, 1000);
                })
                .attr('src', or).removeAttr('srcd');
            }
        });
    },

    // 在前面插入新元素
    prepend: function($content, callback) {
        this.$element.prepend($content);
        this.reLayout(callback);
    },

    // 在后面插入新元素
    append: function($content, callback) {
        this.$element.append($content);
        this.reLayout(callback);
    },

    // 删除元素
    removeItems: function($items, callback) {
        this.$element.find($items).remove();
        this.reLayout(callback);
    },

    // 重置初始化数据，并重新加载瀑布流
    option: function(opts, callback) {
        if ($.isPlainObject(opts)) {
            this.options = $.extend(true, this.options, opts);

            if (typeof callback === 'function') {
                callback();
            }

            // re init
            this._init();
        }
    },

    // 暂停ajax请求
    pause: function(callback) {
        this.options.state.isPause = true;

        if (typeof callback === 'function') {
            callback();
        }
    },

    // 恢复ajax请求
    resume: function(callback) {
        this.options.state.isPause = false;

        if (typeof callback === 'function') {
            callback();
        }
    },

    _pageAjax: function(curIndex){
        var self = this,
            options = this.options,
            path = options.path,
            dataType = options.dataType,
            params = options.params,
            headers = options.headers;


        curIndex = curIndex || 0;
        // loading start
        options.callbacks.loadingStart(this.$loading);

        // update state status
        options.state.isDuringAjax = true;
        options.state.isProcessingData = true;
        params['page'] = curIndex;

        $.ajax({
            url: path,
            data: params,
            headers: headers,
            type: 'POST',
            dataType: dataType,
            success: function(data) {
                self._handlePageResponse(data, curIndex);
            },
            error: function(jqXHR) {
                self._responeseError('error');
            },
            complete: function() {
                self.options.state.isDuringAjax = false;
            }
        });
    },

    // 请求数据
    _requestData: function(callback) {
        var self = this,
            options = this.options,
            maxPage = options.maxPage,
            curPage = options.state.curPage++,
            path = options.path,
            dataType = options.dataType,
            params = options.params,
            headers = options.headers;

        if (maxPage !== undefined && curPage > maxPage) {
            options.state.isBeyondMaxPage = true;
            options.callbacks.loadingFinished(this.$loading, options.state.isBeyondMaxPage);
            return;
        }

        this._debug('heading into ajax', path + $.param(params));

        // loading start
        options.callbacks.loadingStart(this.$loading);

        // update state status
        options.state.isDuringAjax = true;
        options.state.isProcessingData = true;
        params['page'] = curPage;

        $.ajax({
            url: path,
            data: params,
            headers: headers,
            type: 'POST',
            dataType: dataType,
            success: function(data) {
                self._handleResponse(data, callback);
            },
            error: function(jqXHR) {
                self._responeseError('error');
            },
            complete: function() {
                self.options.state.isDuringAjax = false;
            }
        });
    },

    // 获取数据成功后函数
    _handleResponse: function(data, callback) {
        var $content,
            self = this,
            options = this.options,
            checkImagesLoaded = options.checkImagesLoaded,
            content = options.callbacks.renderData(data, options.dataType, options.tpl);

        if (content) {
            $content = $($.trim(content));
        } else {
            options.state.curPage > 1 ? self._responeseError('end') : self._responeseError('none');
            return;
        }

        if (!checkImagesLoaded) {
            self.append($content, callback);
            self.options.callbacks.loadingFinished(self.$loading, self.options.state.isBeyondMaxPage);
        } else {
            imagesLoaded(content, function() {
                self.append($content, callback);
                self.options.callbacks.loadingFinished(self.$loading, self.options.state.isBeyondMaxPage);
            });
        }
    },

    // 获取分页数据成功后函数
    _handlePageResponse: function(data, curIndex) {
        var $content,
            self = this,
            options = this.options,
            checkImagesLoaded = options.checkImagesLoaded,
            content = options.callbacks.renderData(data, options.dataType, options.tpl);


        self.$element.html('');
        if (content) {
            $content = $($.trim(content));
        } else {
            self._responeseError('none');
            return;
        }

        if (!checkImagesLoaded) {
            self.append($content);
            !curIndex && self._pageShow(data, curIndex);
            self.options.callbacks.loadingFinished(self.$loading, self.options.state.isBeyondMaxPage);
        } else {
            imagesLoaded(content, function() {
                self.append($content);
                !curIndex && self._pageShow(data, curIndex);
                self.options.callbacks.loadingFinished(self.$loading, self.options.state.isBeyondMaxPage);
            });
        }
    },

    _pageShow: function(data, curIndex) {
        var self = this,
            options = this.options,
            params = options.params;

        if (data.totalPage > 1) {
            pager_default = new HorPager({
                pContainer: self.$pageBox,
                conTotalCount: data.total,
                conPerPage: params.limit,
                containsEndTags: false,
                curIndex: curIndex,
                pMaxCount: 7,
                onIndexChange: function(curIndex, evt) {
                    self._pageAjax(curIndex-1);
                }
            });
            pager_default.show();
        }
    },

    // 获取数据失败后函数
    _responeseError: function(xhr) {
        this.options.callbacks.loadingError(this.$loading, this.$message, xhr);

        if (xhr !== 'end' && xhr !== 'error') {
            xhr = 'unknown';
        }

        this._debug('Error', xhr);
    },

    // 判断是否到设置的最低端
    _nearbottom: function() {
        var options = this.options;
        var minColHeight = Math.min.apply({}, this.colHeightArray);
        var windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.offsetHeight;
        var bottom = $window.scrollTop() + windowHeight - this.$element.offset().top - minColHeight;

        this._debug('math:', bottom);

        return (bottom > options.bufferPixel);
    },

    // 预加载
    _prefill: function() {
        this._requestData();
    },

    // 滚动事件触发后处理函数
    _scroll: function() {
        var options = this.options,
            state = options.state,
            self = this;

        if (state.isProcessingData || state.isDuringAjax || state.isInvalidPage || state.isPause) {
            return;
        }

        if (!this._nearbottom()) {
            return;
        }

        this._requestData(function() {
            var timer = setTimeout(function() {
                self._scroll();
            }, 100);
        });
    },

    // 监听滚动事件
    _doScroll: function() {
        var self = this,
            scrollTimer;

        $window.bind('scroll', function() {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }

            scrollTimer = setTimeout(function() {
                self._scroll();
            }, 100);
        });
    },

    // resize事件触发后处理函数
    _resize: function() {
        var cols = this.cols,
            newCols = this._getColumns();

        if (newCols !== cols) {
            this.options.state.isResizing = true;
            this.cols = newCols;
            this.reLayout();
            this._prefill();
        }
    },

    // 监听resize事件
    _doResize: function() {
        var self = this,
            resizeTimer;

        $window.bind('resize', function() {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }

            resizeTimer = setTimeout(function() {
                self._resize();
            }, 200);
        });
    }
};

// 瀑布流类代理。
function WaterfallProxy() {
    return Waterfall.apply(this, arguments[0]);
}
WaterfallProxy.prototype = Waterfall.prototype;

module.exports = function() {
    if (arguments.length < 1) {
        throw new Error('[Waterfall Exception]: No arguments.');
    } else {
        return new WaterfallProxy(arguments);
    }
};

/*! waterfall - v0.1.72 - 2014-06-24
 * http://wlog.cn/waterfall/
 * Copyright (c) 2014 bingdian; Licensed MIT */
/*global Handlebars: false, console: false */