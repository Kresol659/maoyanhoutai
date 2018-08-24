import theatreMatch from '../module/theatreMatch/theatreMatch.js';//导入院线管理
import movie from '../module/movie/movie.js';//电影管理
import theatreManage from '../module/theatreManage/theatreManage.js';//电影管理
import xiangguanzixun from '../module/xiangguanzixun/xiangguanzixun.js';//电影管理
import message from '../module/message/message.js';//资讯管理
import comingSoon from '../module/comingSoon/comingSoon.js';//即将上映
import hotBroadcast from '../module/hotBroadcast/hotBroadcast.js';//热播
import hotShowing from '../module/hotShowing/hotShowing.js';//热映
import user from '../module/user/user.js';//热映

let module_all = {};
//绑定module
module_all.theatreMatch = theatreMatch;
module_all.movie = movie;
module_all.theatreManage = theatreManage;
module_all.xiangguanzixun = xiangguanzixun;
module_all.message = message;
module_all.comingSoon = comingSoon;
module_all.hotBroadcast = hotBroadcast;
module_all.hotShowing = hotShowing;
module_all.user = user;
function init() {
    $('.manager_text').on('click', clickTree)
    $.parser.parse();
    $('.panel-title').parent().css({
        'background-color': 'rgb(145, 145, 145)'
        , 'border': '1px solid gray',
        'color':'#fff'
    })
    $('.manager_text').parent().css('padding','10px 0 10px 20px')
}
$(() => {
    init();
    $('#tabs').tabs({
        tabPosition: top
    })
    $.post('/checkadm', {}, function (data) {
        if (data != '') {
            $('#firBtn').prop('href', '#')
            $('#firBtn').html(`欢迎您，管理员<span>${data}</span>`)
        } else {
            window.location.href = '/login.html';
        }
    })
});
function clickTree() {
    let exists = $('#tabs').tabs('exists', $(this).text());
    if (exists) {
        $('#tabs').tabs('select', $(this).text()); //选中当前点击的选项卡
    } else {
        $('#tabs').tabs('add', {
            title: $(this).text(),
            href: `../module/${this.dataset.type}/${this.dataset.type}.html`,
            closable: true,
            onLoad: () => {
                module_all[this.dataset.type]();
            }
        });
    }

}
