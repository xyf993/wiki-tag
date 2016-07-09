/**
 * Copyright (c) 2015 Baidu, All rights reseved.
 * @file 百科tag落地页 宣贯栏组件脚本
 * @author Guzhihui | guzhihui@baidu.com
 * @version 1.0 | 2015-02-11 | Guzhihui    // 初始版本
 **/

var $ = require('wiki-common:widget/lib/jquery/jquery.js');
var Carousel = require('wiki-common:widget/ui/carousel/carousel.js');

var carouselSlidesConfig = {
    container: $('#carousel_viewport ul'),
    aniUnitSize: {
        width: 678,
        height: 360
    },
    aniConfig: {
        duration: 1250
    },
    pausingTriggers: [$('#carousel_viewport')]
};

// Slide Carousel
var carouselSlides = new Carousel(carouselSlidesConfig);

var beautySlidesConfig = {
    container: $('#beauty_viewport ul'),
    aniUnitSize: {
        width: 500,
        height: 200
    },
    aniConfig: {
        duration: 500
    },
    autoPlayInterval: 0,
    pausingTriggers: [$('#beauty_viewport')]
};

// Slide Carousel
var beautySlides = new Carousel(beautySlidesConfig);

// Slide Carousel
var handsomeSlidesConfig = {
    container: $('#handsome_viewport ul'),
    aniUnitSize: {
        width: 340,
        height: 200
    },
    aniConfig: {
        duration: 500
    },
    autoPlayInterval: 0,
    pausingTriggers: [$('#handsome_viewport')]
};
var handsomeSlides = new Carousel(handsomeSlidesConfig);

function bindEvt() {
    $('#about').on('click', '.button', function () {
        var slide;
        var self = $(this);
        self.parent().find('.category_content').removeClass('category_content_hover');
        switch (self.attr('data-viewport')) {
            case 'carousel':
                slide = carouselSlides;
                break;
            case 'beauty':
                slide = beautySlides;
                break;
            case 'handsome':
                slide = handsomeSlides;
                break;
        }
        switch (self.attr('data-skipTo')) {
            case 'prev':
                slide.play(-1);
                break;
            case 'next':
                slide.play();
                break;
        }
        return false;
    });
    $('#about').on('mouseenter', '.button', function () {
        var self = $(this);
        var left = self.parent().find('.category_content')[0];
        var right = self.parent().find('.category_content')[1];
        var wrap;

        switch (self.attr('data-skipTo')) {
            case 'prev':
                wrap = left;
                break;
            case 'next':
                wrap = right;
                break;
        }
        wrap = wrap || left;
        var timer1 = setTimeout(function () {
            $(wrap).addClass('category_content_hover');
        }, 100);

        // 若移出 $card 则杀死 timer
        self.on('mouseleave', function () {
            clearTimeout(timer1);
        });
    });

    $('#about').on('mouseleave', '.category_content', function () {
        var self = $(this);

        var timer1 = setTimeout(function () {
            self.removeClass('category_content_hover');
        }, 100);

        // 若移出 $card 则杀死 timer
        self.on('mouseenter', function () {
            clearTimeout(timer1);
        });
    });
    $('#about').on('mouseenter', '.category_content', function () {
        var self = $(this);

        var timer1 = setTimeout(function () {
            self.addClass('category_content_hover');
        }, 100);

        // 若移出 $card 则杀死 timer
        self.on('mouseleave', function () {
            clearTimeout(timer1);
        });
    });
}
bindEvt();