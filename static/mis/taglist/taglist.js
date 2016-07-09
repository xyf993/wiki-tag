/**
 * @file list
 */
var $ = require('wiki-common:widget/lib/jquery/jquery.js');
var HorPager = require('wiki-common:widget/ui/pager/horPager/horPager.js');

var pager = new HorPager({
    pContainer: '#pager',
    conTotalCount: window.tplData.total,
    conPerPage: 20,
    pMaxCount: 5,
    onIndexChange: function (curIndex) {
        var url = window.location.pathname + '?page=' + curIndex;
        window.location.href = url;
    }
});
pager.show();
