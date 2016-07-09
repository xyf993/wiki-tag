/**
 * Copyright (c) 2015-2016 Baidu, All rights reseved.
 * @fileOverview 分步导入词条
 * @author  yuhui | yuhui06@baidu.com
 * @version  1.0 | 2015-10-14 | yuhui //初始版本
 *
 * @method lemmaImport(args)                    // 构造函数
 *   @param args {Object}                       // 构造函数参数（必选）
 *     @lemmas {Array}                          // 要导入的词条，准确的说是待拆分的数据，一般是词条id数组
 *     @span {Number}                           // 每次向后台发送的词条个数（默认为500）
 *     @url {String}                            // ajax请求的url
 *     @extAjaxData {Object}                    // ajax传入的额外参数（默认传入lemmaIds）
 *     @onStepComplete {Function}               // 每次请求完成时回调（无论成功与否）
 *
 * @description
 *   1) 此插件是为了解决后台难以处理一次过多的词条，前端分步导入并实时显示结果
 *   2) 当某阶段有词条导入失败时，点击重试按钮会重新导入那几个失败的词条
 *   3）由于词条导入一般来说需拆扥的大数据就是lemmaIds,所以我这里直接将拆分后的lemmas的值，作为ajax中的lemmaIds的值了
 *   4）本来想改版：1.优化逻辑； 2.增加UI； 3.支持文件上传
 *   5）但是没时间了Orz
 **/
var $ = require('wiki-common:widget/lib/jquery/jquery.js');
var Dialog = require('wiki-common:widget/ui/dialog/dialog.js');

// var infoDialog = new Dialog({
//  classNames: 'wgt_lemmaImport_info',
//  title: '词条处理中，请稍等...' ,
//  hasCloseBtn: false
// });

var errMsg = {};
var loader; //
// var hasBind = false;

function handleArgs(args) {
    // 此处可以添加对参数的验证等
    if ($(args.host)[0]) {
        this.host = $(args.host);
    } else {
        throw new Error('[lemmaImport error]: host 应该是个jQuery对象或选择器字符串');
    }
    this.lemmas = args.lemmas;
    this.span = args.span || 1;
    this.url = args.url;
    this.btns = args.btns ? [].concat(args.btns) : null;
    this.extAjaxData = args.extAjaxData;
    this.onStepComplete = args.onStepComplete;
}

// 处理词条列表
function handleLemmaList(step, res, btmElem) {
    errMsg[step] = [];
    errMsg[step] = res.invalidLemmas;

    if (errMsg[step].length > 0) {
        var failedLemmaStr = '';
        $.each(errMsg[step], function(index, value) {
            failedLemmaStr = failedLemmaStr + value.lemmaTitle + '(' + value.lemmaId + ') : ' + value.reason + '\n';
        });

        btmElem.before('<dt>Step ' + (step + 1) + ': </dt>');
        btmElem.before('<dd class="errColor resultInfo">操作失败词条：\n' + failedLemmaStr + '</dd>');
        btmElem.before('<dd><a href="javascript:;" ' + 'class="cmn-btn cmn-btn-25 reImport" step="' + step + '">重试</a></dd>');
    } else {
        btmElem.before('<dt>Step ' + (step + 1) + ': </dt>');
        btmElem.before('<dd class="scsColor resultInfo">操作成功</dd>');
    }

    $('.stepInfo strong').eq(1).text(parseInt($('.stepInfo strong').eq(1).text()) || 0 + res.taskLemmaIds.length);
}

function makeAjaxData(curStep) {
    var ajaxData = this.extAjaxData || {};
    var lemmaIds = [];

    // 创建lemmaIds
    if (errMsg[curStep] && errMsg[curStep].length > 0) {
        $.each(errMsg[curStep], function(index, item) {
            lemmaIds.push(item.lemmaTitle + '###' + item.lemmaId);
        });
    } else {
        lemmaIds = this.dividedLemmas[curStep];
    }

    $.extend(ajaxData, {
        lemmaIds: lemmaIds
    });

    return ajaxData;
}

function sliceLemmas() {
    // 将词条数组分隔，形式为[[0,...4], [5,...9], ...]
    var lemmasCount = this.lemmas.length;
    this.totalSteps = Math.ceil(lemmasCount / this.span);
    this.dividedLemmas = [];

    for (var i = 0; i < this.totalSteps; i++) {
        var startPos = this.span * i;
        var endPos = this.span * (i + 1);
        if (endPos > lemmasCount) {
            endPos = lemmasCount;
        }
        this.dividedLemmas.push(this.lemmas.slice(startPos, endPos));
    }

    // 初始化弹框内容
    if (this.totalSteps > 1) {
        this.infoContent = '<dl class="stepInfo"><dt>共 ' + this.lemmas.length + ' 个词条，分<strong> ' + this.totalSteps + ' </strong>次操作，每次<strong> ' + this.span + ' </strong>个，成功操作 <strong class="success-num">0</strong> 个</dt><dt class="loader">' + '<div class="st-loader"><span class="equal"></span></div></dt></dl>';
    } else {
        this.infoContent = '<dl class="stepInfo"><dt>共<strong> ' + this.lemmas.length + ' </strong>个词条，成功操作 <strong>0</strong> 个</dt><dt class="loader">' + '<div class="st-loader"><span class="equal"></span></div></dt></dl>';
    }
}

function doJob(ajaxData) {
    var self = this;

    if (this.stepCounter >= this.totalSteps) {
        loader.hide();
        return;
    }

    loader.show();

    $.ajax({
        type: 'POST',
        url: self.url,
        data: ajaxData,
        cache: false,
        dataType: 'json',
        success: function(res) {
            if (!res.errno) {
                loader.fadeOut(100);
                handleLemmaList(self.stepCounter, res, loader);
            } else {
                loader.fadeOut(100);
                loader.before('<dd>出现异常：' + res.errmsg + ' <a href="javascript:;" ' + 'class="cmn-btn cmn-btn-25 reImport" step="' + stepCounter + '">重试</a></dd>');
            }
            self.stepCounter++;
            doJob.call(self, makeAjaxData.call(self, self.stepCounter));
        },
        error: function(error) {
            loader.fadeOut(100);
            loader.before('<dd>请求发送失败 <a href="javascript:;" ' + 'class="cmn-btn cmn-btn-25 reImport" step="' + self.stepCounter + '">重试</a></dd>');

            self.stepCounter++;
            doJob.call(self, makeAjaxData.call(self, self.stepCounter));
        }
    });
}

var lemmaImport = {
    init: function(args) {
        handleArgs.call(this, args);

        var self = this;

        if (this.lemmas) {
            sliceLemmas.call(this);
        }

        $('body').on('click', '.reImport', function () {
            if (self.host) {
                self.host.html(self.infoContent);
            }

            loader = $('.loader');

            self.stepCounter = 0;

            doJob.call(self, makeAjaxData.call(self, self.stepCounter));
        });
    },
    start: function () {
        if (this.host) {
            this.host.html(this.infoContent);
        }

        loader = $('.loader');

        var self = this;
        this.stepCounter = 0;

        doJob.call(this, makeAjaxData.call(this, this.stepCounter));
    },
    reset: function(args) {
        this.host = $(args.host)[0] ? $(args.host) : this.host;
        this.lemmas = args.lemmas ? args.lemmas : this.lemmas;
        this.span = args.span ? args.span : this.span;
        this.url = args.url ? args.url : this.url;
        $.extend(this.extAjaxData, args.extAjaxData);
        this.onStepComplete = args.onStepComplete ? args.onStepComplete : this.onStepComplete;

        errMsg = {};

        if (this.lemmas) {
            sliceLemmas.call(this);
        }
    }
}


module.exports = lemmaImport;
