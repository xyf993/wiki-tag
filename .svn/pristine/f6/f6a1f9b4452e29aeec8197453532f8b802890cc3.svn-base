/**
 * @file usertag
 */
var $ = jQuery = require('wiki-common:widget/lib/jquery/jquery.js');
var timeFormater = require('wiki-common:widget/util/timeFormater.js');
var userLogin = require('wiki-common:widget/component/userLogin/userLogin.js');
var HorPager = require('wiki-common:widget/ui/pager/horPager/horPager.js');
var Dialog = require('wiki-common:widget/ui/dialog/dialog.js');
var JSmart = require('wiki-common:widget/lib/jsmart/jsmart.js');

document.title = window.tplData.taskName;

// 剩余时间
var taskId = window.tplData.taskId;
var leftTime = window.tplData.endTime * 1000 - new Date().getTime();
var $activityCountArea = $('#activity_count_area');
var restTime = $activityCountArea.find('.num');
var $activityEndTip = $('#activity_end_tip');
var $activityEditArea = $('#activity_edit_tag');

function countRestTime() {
    if (leftTime <= 0) {
        $activityCountArea.hide();
        $activityEndTip.show();
        $activityEditArea.hide();
        return;
    }
    var diff = timeFormater.diff(leftTime, 'd:h:m:s', false, true);
    var timeArr = diff.split(':');
    for (var i = 0; i < restTime.length; i++) {
        restTime.eq(i).html(timeArr[i]);
    }
    leftTime = leftTime - 1000;
    setTimeout(countRestTime, 1000);
}
countRestTime();


// 开始任务
$('#startTask').on('click', function () {
    $(this).hide();
    getLemma();
    setTimeout(function () {
        $('#tag-content').show();
    }, 500);
});

//  任务词条
var taskLemmaId;
var tagLemmaTpl = new JSmart(__inline('./tagLemma.tpl'));
var lemmaIntro = $('.lemmaIntro');
var tk = window.tplData.tk;
// 换一换
$('#change-lemma').on('click', getLemma);

function getLemma() {
    $.ajax({
        type: 'GET',
        url: '/api/tagtask/getlemma?taskId=' + taskId + '&tk=' + tk,
        cache: false,
        dataType: 'json',
        success: function (json) {
            if (json.errno === 10000) {
                Dialog.alert({
                    icon: 'ERROR',
                    mainMsg: '您没有权限！'
                });
                $('#tag-content')
                .html('<span class="cmn-btn-32" style="background: #ccc;color: #fff;">您没有权限</span>');
                return;
            }
            if (!json.errno) {
                var tmpTpl = tagLemmaTpl.fetch({
                    data: json.data
                });
                taskLemmaId = json.data.taskLemmaId;
                lemmaIntro.html(tmpTpl);
            } else {
                Dialog.alert({
                    icon: 'Error',
                    mainMsg: '已经是最后一个词条了'
                });
            }
        },
        error: function () {
            Dialog.alert({
                icon: 'Error',
                mainMsg: '系统错误，请稍候重试~'
            });
        }
    });
}

var submitBtn = $('#submitBtn');
var tagList = $('#tag-list');
var tagCheck = tagList.find('input');
var hasChoose = false;
var index;
var tagId;
// 只能选择一个tag
tagList.on('click', 'input[type="checkbox"]', function (e) {
    if ($(e.target).prop('checked') === false) {
        $(e.target).prop('checked', false);
        hasChoose = false;
    } else {
        tagCheck.prop('checked', false);
        hasChoose = true;
        index = $(this).parent().index();
        tagCheck.eq(index).prop('checked', 'true');
        tagId = $(this).attr('data-tag');
    }

});
// 提交选择的tag

submitBtn.on('click', function () {
    if (hasChoose) {
        $.ajax({
            url: '/api/tagtask/submittag',
            type: 'POST',
            data: {
                taskLemmaId: taskLemmaId,
                tagId: tagId,
                tk: tk
            },
            success: function (json) {
                if (json.errno === 10000) {
                    Dialog.alert({
                        icon: 'ERROR',
                        mainMsg: '您没有权限！'
                    });
                    return;
                }
                Dialog.alert({
                    mainMsg: '提交成功！'
                });
                getLemma();
                tagCheck.eq(index).prop('checked', false);
                hasChoose = false;
            }
        });
    } else {
        Dialog.alert({
            icon: 'ERROR',
            mainMsg: '您还未选择tag！'
        });
    }
});


// 未完成和已完成的切换
$('#progress-menu').on('click', '.progress', function () {
    $(this).removeClass('no-active').addClass('active')
    .siblings('.progress').removeClass('active').addClass('no-active');
    if ($(this).hasClass('unpass')) {
        $('#unpass').show();
        $('#pass').hide();
    } else {
        $('#unpass').hide();
        $('#pass').show();
    }
});

// 已通过
var doneTpl = new JSmart(__inline('./done.tpl'));
var passTable = $('#pass tbody');
var unpassTable = $('#unpass tbody');
var initPass = false;
var initUnpass = false;
var passCount = window.tplData.passCount;
var unpassCount = window.tplData.submitCount - window.tplData.passCount;

function getPass(curIndex) {
    if (!initPass) {
        initPass = true;
        if (passCount > 5) {
            var pager = new HorPager({
                pContainer: '#pass-pager',
                conTotalCount: passCount,
                conPerPage: 5,
                pMaxCount: 4,
                showSinglePage: false,
                onIndexChange: function (curIndex) {
                    getPass(curIndex);
                }
            });
            pager.show();
        }
        getPass(1);
    } else {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/tagtask/donelist?taskId='
                  + window.tplData.taskId
                  + '&type=passed&limit=5&offset='
                  + (curIndex - 1) * 5,
            success: function (json) {
                var tmpTpl = doneTpl.fetch({
                    data: json
                });
                passTable.html(tmpTpl);
            },
            error: function () {
                passTable.html('暂无数据！');
            }
        });
    }
}
getPass(1);

// 未完成
function getUnpass(curIndex) {
    if (!initUnpass) {
        initUnpass = true;
        if (unpassCount > 5) {
            var pager = new HorPager({
                pContainer: '#unpass-pager',
                conTotalCount: unpassCount,
                conPerPage: 5,
                onIndexChange: function (curIndex) {
                    getUnpass(curIndex);
                }
            });
            pager.show();
        }
        getUnpass(1);
    } else {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/tagtask/donelist?taskId='
             + window.tplData.taskId
             + '&type=notpass&limit=5&offset='
             + (curIndex - 1) * 5,
            success: function (json) {
                var tmpTpl = doneTpl.fetch({
                    data: json
                });
                unpassTable.html(tmpTpl);
            },
            error: function () {
                unpassTable.html('暂无数据！');
            }
        });
    }
}
getUnpass(1);

//  用户排行榜
var rankCount = window.tplData.rankCount;
var userList = $('.user-list');
if (rankCount > 10) {
    var pager = new HorPager({
        pContainer: '#rank-pager',
        conTotalCount: rankCount,
        conPerPage: 10,
        onIndexChange: function (curIndex) {
            userList.hide();
            userList.eq(curIndex - 1).show();
        }
    });
    pager.show();
}
