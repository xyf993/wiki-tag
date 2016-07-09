var $ = require('wiki-common:widget/lib/jquery/jquery.js');

/**
 * @description 延迟加载图片. 默认只加载可见高度以上的图片, 随着窗口滚动加载剩余图片.注意: 仅支持垂直方向.
 * @name baidu.page.lazyLoadImage
 * @function
 * @grammar baidu.page.lazyLoadImage([options])
 * @param {Object} options
 * @param {String} [options.className] 延迟加载的IMG的className,如果不传入该值将延迟加载所有IMG.
 * @param {Number} [options.preloadHeight] 预加载的高度, 可见窗口下该高度内的图片将被加载.
 * @param {String} [options.placeHolder] 占位图url.
 * @param {Function} [options.onLazyLoad] 延迟加载回调函数,在实际加载时触发.
 * @author rocy
 */
var LazyLoad = function(options) {
    options = options || {};
    options.preloadHeight = options.preloadHeight || 0;
    options.className = options.className || "lazy-img";
    options.placeHolder = options.placeHolder || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF9fX1AAAA0VQI3QAAAAxJREFUeNpiYAAIMAAAAgABT21Z4QAAAABJRU5ErkJggg==";
    options.srcAttribute=options.srcAttribute || "data-src";
    var self=this;

    //计算需要加载图片的页面高度
    var getLoadOffset=function() {
        return $(window).scrollTop() + $(window).height() + options.preloadHeight;
    };
    //处理延迟加载
    var loadImage = function() {
        var imageList= $("img."+options.className);
        imageList.attr("src",options.placeHolder);
        var viewOffset = getLoadOffset();
        for (var i=0; i < imageList.length; i++) {
            target = imageList.eq(i);
            imgSrc = target.attr(options.srcAttribute);
            if (target.offset().top < viewOffset) {
                target.attr("src",imgSrc).removeClass(options.className).removeAttr(options.srcAttribute);
                !! options.onLazyLoad && options.onLazyLoad(target);
            }
        }
        $("img."+options.className).length<=0 && $(window).off("scroll resize",loadImage);
    };
    var initialize=function(){
        $(document).ready(function() {
            loadImage();      
            $(window).on('scroll resize', loadImage);
        });
    };
    initialize();    
};

module.exports = LazyLoad;