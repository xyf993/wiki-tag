/**
 * @file create
 */
var $ = require('wiki-common:widget/lib/jquery/jquery.js');
require('wiki-tag:widget/datePicker/js/jquery-ui.js')($);
require('wiki-tag:widget/datePicker/js/jquery-ui-timepicker.js')($);

var Dialog = require('wiki-common:widget/ui/dialog/dialog.js');
var PicUploader = require('wiki-common:widget/component/picUploader/picUploader.js');
var PicCrop = require('wiki-common:widget/component/picUploader/picCropper.js');

//  开始、结束时间
$('.startTime').datetimepicker({
    timeFormat: 'hh:mm:ss'
});
$('.endTime').datetimepicker({
    timeFormat: 'hh:mm:ss'
});


// 上传图片
var feature = null;
var picCrop = null;
var originalInfo = null;
var defaultPicInfo = window.tplData.defaultPicInfo;
var cropDialog = $('.crop-dialog');

var picUploader = new PicUploader({
    uploadBtn: '#poster-edit',
    previewWidth: 240,
    previewHeight: 160,
    onUploadSuccess: function (picInfo) {
        $('.crop-container').html('loading...');
        cropDialog.show();
        originalInfo = picInfo;
        setTimeout(function () {
            $('.crop-container').html('');
            picCrop = new PicCrop({
                container: '.crop-container',
                picUrl: picInfo.picUrl,
                boxWidth: 450,
                boxHeight: 300,
                cropWidth: 240,
                cropHeight: 160,
                selectArr: [0, 0, picInfo.width, picInfo.height],
                originalWidth: picInfo.width,
                originalHeight: picInfo.height
            });
            cropDialog.find('.crop-btn').on('click', showResult);
        }, 1000);
    },
    onUploadError: function (err) {
        if (err.errno === 2003) {
            alert('超过上传最大尺寸');
        } else if (err.errno === 2004) {
            alert('上传格式错误');
        } else {
            alert(err.errmsg);
        }
    }
});
// 图片预览
function showResult() {

    feature = picCrop.getHiphotoFeature();
    var cropInfo = picCrop.getcropInfo();
    var ratioX = 240 / cropInfo.width;
    var ratioY = 160 / cropInfo.height;
    var cropResult = $('<img src="' + originalInfo.picUrl + '"  alt="" />');
    $('.poster-wrap').html(cropResult);
    $('.poster-wrap img').css({
        width: originalInfo.width * ratioX,
        height: originalInfo.height * ratioY,
        marginLeft: '-' + Math.round(ratioX * cropInfo.x1) + 'px',
        marginTop: '-' + Math.round(ratioY * cropInfo.y1) + 'px'
    });
    cropDialog.hide();
}

// 关闭裁剪框
cropDialog.find('em').on('click', function () {
    cropDialog.hide();
});


// 添加标签输入框
var addNum = $('.input-wrap li').length + 1;
$('.tagName span').on('click', function () {
    var newInput = $('<li><span>标签' + addNum + '</span><input type="text" name="tags"></li>');
    $('.input-wrap').append(newInput);
    addNum++;
});

// 提交
$('.submitBtn').on('click', function () {
    var action = $(this).attr('data-action');
    var taskName = $('.taskName').val();
    var startTime = $('.startTime').val();
    var endTime = $('.endTime').val();
    var groupType = $('.limit input:checked').val();
    var tags = [];
    var desc = $('textarea[name="description"]').val();
    var tagInput = $('.tagName input');

    for (var i = 0; i < tagInput.length; i++) {
        tags.push(tagInput.eq(i).val());
    }
    if (!taskName) {
        Dialog.alert({
            icon: 'ERROR',
            mainMsg: '请输入任务名称'
        });
        return;
    }
    if (!groupType) {
        Dialog.alert({
            icon: 'ERROR',
            mainMsg: '请选择参与资格'
        });
        return;
    }
    if (!desc) {
        Dialog.alert({
            icon: 'ERROR',
            mainMsg: '请填写任务介绍'
        });
        return;
    }

    var params = {
        name: taskName,
        startTime: startTime ? startTime : 0,
        endTime: endTime ? endTime : 0,
        groupType: groupType,
        tags: tags,
        description: desc
    };
    if (feature) {
        var uploadImgInfo = $.extend({
            'crop': feature.split(';')[0].split('=')[1],
            'eWH': feature.split(';')[1].split('=')[1]
        }, originalInfo);
        params.uploadImgInfo = uploadImgInfo;
        params.image = defaultPicInfo;
    } else {
        params.image = defaultPicInfo;
    }


    if (window.tplData.taskId) {
        params.taskId = window.tplData.taskId;
    }
    $.ajax({
        type: 'POST',
        url: '/api/tagtask/' + action,
        data: params,

        success: function () {
            Dialog.alert({
                mainMsg: '操作成功',
                onConfirm: function () {
                    window.location.reload();
                }
            });
        },
        error: function () {
            Dialog.alert({
                icon: 'Error',
                mainMsg: '系统错误，请稍候重试'
            });
        }
    });
});
