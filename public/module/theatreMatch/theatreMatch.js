
//初始化
function init() {
    $('#suit_tab').datagrid({
        url: '/theatreMatch/suitMovie',
        method: 'post',
        height: '390%',
        columns: [[
            { field: 'check_box', title: '复选框', width: 100, align: 'center', checkbox: true },
            { field: 'theatreMch_movie_name', title: '电影名称', width: 100, align: 'center' },
            { field: 'theatreMch_movie_ename', title: '英文名', width: 100, align: 'center' },
            { field: 'theatreMch_movie_type', title: '类型', width: 100, align: 'center' }
        ]],
        pageSize: 12,
        pageList: [12, 24, 36, 52],
        pagination: true,
        fitColumns: true,
        rownumbers: true,
        striped: true,
        toolbar: [{
            iconCls: 'icon-other_add',
            handler: add_movie_name,
            text: '增加电影'
        }, '-', {
            iconCls: 'icon-other_edit',
            handler: change_movie,
            text: '修改电影'
        }, '-', {
            iconCls: 'icon-other_remove',
            handler: removeMovie,
            text: '删除电影'
        }],
    });
    //搜索框
    $('#search_input').searchbox({
        searcher: function (value, type) {
            let newType = {};
            newType[type] = value;
            $.post('/theatreMatch/searchAny', newType, function (data) {
                $('#suit_tab').datagrid({
                    queryParams: newType
                })
            })
        },
        menu: '#search_menu',
        prompt: '请输入值',
        width: 400
    });
    //搜索框样式
    $('#search_position').css({
        position: 'absolute',
        left: 300,
        top: 5
    })

    //增加的弹出框
    $('#add_window').dialog({
        title: '增加电影',
        width: 600,
        height: 545,
        closed: true,
        buttons: [{
            text: '下一步',
            iconCls: 'icon-ok',
            handler: addOk
        }, {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#add_window').dialog('close');
            }
        }]

    });
    //增加影院的弹出框
    $('#cinema_window').dialog({
        title: '增加电影院',
        width: 600,
        height: 545,
        closed: true,
        buttons: [{
            text: '下一步',
            iconCls: 'icon-ok',
            handler: addCinema
        }, {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#cinema_window').dialog('close');
            }
        }]

    });
    //增加放映厅的弹出框
    $('#show_window').dialog({
        title: '增加放映厅',
        width: 600,
        height: 545,
        closed: true,
        buttons: [{
            text: '下一步',
            iconCls: 'icon-ok',
            handler: addShow
        }, {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#show_window').dialog('close');
            }
        }]

    });
    //增加时间和票价
    $('#show_price').dialog({
        title: '增加放映厅，时间，票价',
        width: 400,
        height: 300,
        closed: true,
        buttons: [{
            text: '下一步',
            iconCls: 'icon-ok',
            handler: addTP
        }, {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#show_price').dialog('close');
            }
        }]

    });
    //初始化添加票价
    $.post('/theatreMatch/addSelect', {}, function (data) {
        let str = '';

        for (let e of data) {
            str += `<option>${e.screenName}</option>`
        }
        $('#showName').html(str);
        $('#showName').addClass('easyui-combobox');
        $('#showName').combobox({
            label: '放映厅',
            valueField: 'id',
            textField: 'text',
        });
    })
    $('#showTime').textbox({
        label: '时间',
        width: 210,
        iconAlign: 'left'
    })
    $('#showPrice').textbox({
        label: '票价',
        width: 210,
        iconAlign: 'left'
    })



}


//添加的信息
let add_all = {
    theatreMch_movie_name: '',
    theatreMch_movie_ename: '',
    theatreMch_movie_type: ''

};
function add_movie_name() {
    $('#add_window').dialog('open');

    add_movie();
}
//增加的弹出框表格
function add_movie() {
    $('#add_movie').datagrid({
        height: 455,
        url: '/theatreMatch/showMovie',
        method: 'post',
        columns: [[
            { field: 'check_box', title: '复选框', width: 100, align: 'center', checkbox: true },
            { field: 'movie_name', title: '电影名称', width: 100, align: 'center' },
            { field: 'movie_ename', title: '英文名', width: 100, align: 'center' },
            { field: 'movie_type', title: '类型', width: 100, align: 'center' },
            { field: 'movie_show', title: '上映时间', width: 100, align: 'center' }
        ]],
        pagination: true,
        fitColumns: true,
        rownumbers: true,
        striped: true,
        singleSelect: true
    });
}
//确认添加
function addOk() {
    if (!$('#add_movie').datagrid('getSelected')) {
        $.messager.alert('消息提示', '请先选中数据');
    }
    else {

        $.post('/theatreMatch/rmovieRepeat', { _id: $('#add_movie').datagrid('getSelected')._id, movie_select: 'true' }, function (data) {
            $('#add_movie').datagrid('reload');
        })
        let amovie = $('#add_movie').datagrid('getSelected');
        cinema_mname = amovie.movie_name;

        add_all = {         //第一部分，增加电影，类型，英文名
            "theatreMch_movie_name": amovie.movie_name,
            "theatreMch_movie_ename": amovie.movie_ename,
            "theatreMch_movie_type": amovie.movie_type,
            'movie_id': $('#add_movie').datagrid('getSelected')._id
        }
        $('#add_window').dialog('close');
        $('#cinema_window').dialog('open');
        //判断是否重名
        $.post('/theatreMatch/rMovie', { theatreMch_movie_name: amovie.movie_name }, function (data) {

            if (data.length == 0) {
                $.post('/theatreMatch/addMovie', add_all, function (data) {

                })
            }

            //找到没有排此片的影院
            $.post('/theatreMatch/filterCinema', { theatreMch_movie_name: amovie.movie_name }, function (data) {
                $('#suit_tab').datagrid('reload');
                let filterName = [];
                if (data.length != 0) {
                    filterName.push(data[0].theatreMch_movie_name);

                }
                //增加的电影院表格
                $('#add_cinema').datagrid({
                    title: '当前没有排此影片的影院',
                    height: 455,
                    url: '/theatreMatch/addCinema',
                    method: 'post',
                    columns: [[
                        { field: 'check_box', title: '复选框', width: 100, align: 'center', checkbox: true },
                        { field: 'theatreMge_name', title: '影院名称', width: 100, align: 'center' },
                        { field: 'theatreMge_address', title: '地址', width: 100, align: 'center' },
                        { field: 'theatreMge_phone', title: '电话', width: 100, align: 'center' },
                        { field: 'theatreMge_url', title: '官网', width: 100, align: 'center' }
                    ]],
                    pagination: true,
                    fitColumns: true,
                    rownumbers: true,
                    striped: true,
                    loadFilter: function (data) {    //加载过滤后的影院
                        if (filterName) {
                            let arr = [];
                            for (let i of data) {
                                for (let k of filterName) {
                                    if (i.theatreMge_name != k) {
                                        arr.push(i);
                                    }
                                }
                            }
                            return arr;
                        }
                        else {
                            return data;
                        }
                    },

                });
            })

        })




    }
    $('#suit_tab').datagrid('reload');
}
let cinemaName;//找到影院表中screening的变量
let cinema_name;//绑定影院到影院匹配表变量
let cinema_mname;//绑定影院到影院匹配表变量

//增加影院
function addCinema() {

    if (!$('#add_cinema').datagrid('getSelected')) {
        $.messager.alert('消息提示', '请先选中数据');
    }
    else if ($('#add_cinema').datagrid('getSelections').length > 1) {
        $.messager.alert('消息提示', '只能选一条哦~');
    }
    else {
        cinema_name = $('#add_cinema').datagrid('getSelected').theatreMge_name//绑定影院到影院匹配表
        $.post('/theatreMatch/addCinema_inName', { theatreMch_movie_name: cinema_mname }, function (data) {
            if (!data[0].theatreMch_cinema) {
                $.get('/theatreMatch/updateCinema_inName', { _id: data[0]._id, theatreMch_cinema: [cinema_mname] }, function (data) {

                })
            }
            else {
                let arr = data[0].theatreMch_cinema;
                arr.push(cinema_name);
                $.get('/theatreMatch/updateCinema_Name', { _id: data[0]._id, theatreMch_cinema: arr }, function (data) {

                })

            }
        })
        $('#cinema_window').dialog('close');
        cinemaName = $('#add_cinema').datagrid('getSelected').theatreMge_name;
        $('#show_window').dialog('open');
        //增加的放映厅表格
        $('#add_show').datagrid({
            height: 455,
            url: '/theatreMatch/addShow',
            method: 'post',
            columns: [[
                { field: 'check_box', title: '复选框', width: 100, align: 'center', checkbox: true },
                { field: 'screenName', title: '放映厅名称', width: 100, align: 'center' },
                { field: 'showTime', title: '时间', width: 100, align: 'center' },
                { field: 'price', title: '票价', width: 100, align: 'center' },

            ]],
            pagination: true,
            fitColumns: true,
            rownumbers: true,
            striped: true,
            queryParams: {
                _id: $('#add_cinema').datagrid('getSelected')._id
            },
            toolbar: [{
                text: '增加放映厅',
                iconCls: 'icon-add',
                handler: addTime
            }]

        });

    }

}
//增加放映厅
function addShow() {
    $('#show_window').dialog('close');

}
//添加时间和票价的弹出窗口
function addTime() {
    $('#show_price').dialog('open');

}
//添加时间和票价
function addTP() {
    let screening = {};
    screening.screenName = $('#showName').combobox('getValue');
    screening.showTime = $('#showTime').textbox('getValue');
    screening.price = $('#showPrice').textbox('getValue');
    $.post('/theatreMatch/addtime', screening, function (data) {
        let id = data;

        $.post('/theatreMatch/findTime', { theatreMge_name: cinemaName }, function (data) {
            let arr = data[0]['screening[]'];
            // console.log(data)
            arr.push(id);
            $.post('/theatreMatch/updateTime', { _id: data[0]._id, 'screening[]': arr }, function (data) { //更新放映厅
                $('#add_show').datagrid('reload');
                $('#show_price').dialog('close');
            })

        })

    })
}

//删除
function removeMovie() {
    if (!$('#suit_tab').datagrid('getSelected')) {
        $.messager.alert('消息提示', '请先选择数据');
    }
    else {
        let arr = $('#suit_tab').datagrid('getSelections');
        let ids = [];
        let str = '';
        for (let i of arr) {
            ids.push(i._id);
            str += i.theatreMch_movie_name + ',';
        }
        $.messager.confirm('确认', `您确认想要删除  ${str}  吗？`, function (r) {
            if (r) {
                $.get('/theatreMatch/removeMovie', { ids }, function (data) {
                    $.messager.alert('消息提示', '删除成功');
                })
                $('#suit_tab').datagrid('reload');
            }
        });


    }
}
let sendCinemaId;//修改影院时传送的id
// 修改
function change_movie() {
    if (!$('#suit_tab').datagrid('getSelected')) {
        $.messager.alert('消息提示', '请先选择数据', 'warning');
    } else if ($('#suit_tab').datagrid('getSelections').length > 1) {
        $.messager.alert('消息提示', '只能修改一条数据哦~', 'warning');
    } else {
        sendCinemaId = $('#suit_tab').datagrid('getSelected')._id;
        $('#change_window').dialog({
            title: '修改',
            width: 500,
            height: 400,
            closed: false,
            buttons: [{
                text: '下一步',
                iconCls: 'icon-ok',
                handler: changeMovieName
            }, {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#change_window').dialog('close');
                }
            }]

        });
        //修改的电影信息
        $('#change_now_movie').datagrid({
            title: '当前修改的电影的信息',
            url: '/theatreMatch/changeShowMovie',
            method: 'post',
            columns: [[
                { field: 'theatreMch_movie_name', title: '电影名', width: 100, align: 'center' },
                { field: 'theatreMch_movie_ename', title: '英文名', width: 100, align: 'center' },
                { field: 'theatreMch_movie_type', title: '类型', width: 100, align: 'center' },
                { field: 'theatreMch_cinema', title: '影院', width: 100, align: 'center' },

            ]],
            fitColumns: true,
            rownumbers: true,
            queryParams: {
                theatreMch_movie_name: $('#suit_tab').datagrid('getSelected').theatreMch_movie_name
            }

        });
        //列出当前的影院
        $.post('/theatreMatch/changeSelectCinema', { theatreMch_movie_name: $('#suit_tab').datagrid('getSelected').theatreMch_movie_name }, function (data) {
            let arr = [data[0].theatreMch_cinema];
            if (arr.length > 1) {          //为修改影院准备
                $('#tempCinemaArr').val(arr.join(','))
            }
            else {
                $('#tempCinemaArr').val(arr.join(''))
            }
            let str = '';
            for (let e of arr) {
                str += `<option>${e}</option>`
            }
            $('#change_cinema_name').html(str);
            $('#change_cinema_name').addClass('easyui-combobox');
            $('#change_cinema_name').combobox({
                label: '当前修改的影院',
                width: 200,
                valueField: 'id',
                textField: 'text',
            });
        })
        //添加所有影院到下拉列表提供选择
        $.post('/theatreMatch/addSelectCinema', {}, function (data) {
            let str = '';
            for (let e of data) {
                str += `<option>${e.theatreMge_name}</option>`
            }
            $('#add_cinema_name').html(str);
            $('#add_cinema_name').addClass('easyui-combobox');
            $('#add_cinema_name').combobox({
                label: '选择修改的影院',
                width: 200,
                valueField: 'id',
                textField: 'text',
            });

        })

    }
}


function changeMovieName() {
    let nowArr; //当前修改的影院值
    if ($('#tempCinemaArr').val().length > 1) {
        nowArr = $('#tempCinemaArr').val().split(',');
    } else {
        nowArr = [$('#tempCinemaArr').val()];
    }
    let finl = [];
    nowArr.map((e) => {
        if (e == $('#change_cinema_name').combobox('getValue')) {
            e = $('#add_cinema_name').combobox('getValue');
        }
        finl.push(e);
        return finl; //返回修改后的数组
    })

    $.post('/theatreMatch/changeInCinema', { _id: sendCinemaId, theatreMch_cinema: finl }, function (data) {
        $('#change_now_movie').datagrid('reload');
    })




    //显示当前的电影匹配的影院
    $('#showNow_window').dialog({
        title: '选择一个影院',
        width: 500,
        height: 400,
        closed: false,
        buttons: [{
            text: '下一步',
            iconCls: 'icon-ok',
            handler: changeShow
        }, {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#showNow_window').dialog('close');
            }
        }]
    });
    let str = '';
    for (let i of finl) {
        str += `<option>${i}</option>`
    }
    $('#showNow_Cinema').html(str);
    $('#showNow_Cinema').addClass('easyui-combobox');
    $('#showNow_Cinema').combobox({
        label: '该电影匹配的所有影院',
        width: 250,
        valueField: 'id',
        textField: 'text',
        onChange: function () {
            $('#selectShow').datagrid({
                queryParams: {
                    theatreMge_name: $('#showNow_Cinema').combobox('getValue')
                }
            });

        }

    });
    $('#selectShow').datagrid({
        title: '当前影院的放映厅',
        url: '/theatreMatch/selectShow',
        method: 'post',
        columns: [[
            { field: 'check_box', title: '复选框', width: 100, align: 'center', checkbox: true },
            { field: 'screenName', title: '放映厅名称', width: 100, align: 'center' },
            { field: 'showTime', title: '时间', width: 100, align: 'center' },
            { field: 'price', title: '票价', width: 100, align: 'center' },

        ]],
        toolbar: [{
            iconCls: 'icon-other_remove',
            text: '删除放映厅',
            handler: removeShow
        }],
        fitColumns: true,
        rownumbers: true,
        // singleSelect: true,
        queryParams: {
            theatreMge_name: $('#showNow_Cinema').combobox('getValue')
        }


    })
    $('#getcinemaName').val($('#showNow_Cinema').combobox('getValue'));//影院名

}


function changeShow() {
    if (!$('#selectShow').datagrid('getSelected')) {
        $.messager.alert('消息提示', '请选择一个放映厅')
    }
    else {
        $('#getShowTime').val($('#selectShow').datagrid('getSelected').showTime);//放映厅id
        //修改放映厅窗口
        $('#changeShow_window').dialog({
            title: '修改放映厅',
            width: 400,
            height: 400,
            closed: false,
            buttons: [{
                text: '下一步',
                iconCls: 'icon-ok',
                handler: updateShow

            }, {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#changeShow_window').dialog('close')
                }
            }]
        });
        // 存储修改信息
        $('#nowShow_id').val($('#selectShow').datagrid('getSelected')._id);//存储修改项id
        $.post('/theatreMatch/addChange_show', {}, function (data) {
            let str = '';
            let num = 0;
            for (let e of data) {
                str += `<option value="${e.screenName}"">${e.screenName}</option>`
            }
            $('#changeShow_name').html(str);
            $('#changeShow_name').combobox({
                label: '当前的所有放映厅',
                width: 220,
                valueField: 'id',
                textField: 'text',
            });
            $('#changeShow_name').combobox('select', $('#selectShow').datagrid('getSelected').screenName);//默认选中当前修改的放映厅
        })
        $('#changeShow_time').textbox({
            label: '时间',
            width: 220,
            iconAlign: 'left'
        })
        $('#changeShow_price').textbox({
            label: '票价',
            width: 220,
            iconAlign: 'left'
        })
        $('#changeShow_time').textbox('setValue', $('#selectShow').datagrid('getSelected').showTime)
        $('#changeShow_price').textbox('setValue', $('#selectShow').datagrid('getSelected').price)
    }

}
//添加更改后的放映厅
function updateShow() {
    let obj = {
        _id: $('#nowShow_id').val(),
        screenName: $('#changeShow_name').combobox('getValue'),
        showTime: $('#changeShow_time').textbox('getValue'),
        price: $('#changeShow_price').textbox('getValue'),
    }
    let oldTime = $('#getShowTime').val();//旧的时间
    let newTime = $('#changeShow_time').textbox('getValue');//改动的
    let newArr = newTime.split(':');
    let oldArr = oldTime.split(':');
    let preNum = newArr[0] - oldArr[0];
    let lastNum = newArr[1] - oldArr[1];
    console.log(preNum, lastNum)
    if (Math.abs(preNum) < 2 && lastNum <= 0) {
        $.messager.alert('消息提示', '注意哦,时间间隔为2小时');
    }
    else {
        $.get('/theatreMatch/updateShow', obj, function (data) {
            $('#selectShow').datagrid('reload');
        })
        $('#changeShow_window').dialog('close');
    }
}

//删除放映厅
function removeShow() {
    if (!$('#selectShow').datagrid('getSelected')) {
        $.messager.alert('消息提示', '请选中数据！', 'info');
    }
    else {
        let ids = [];
        let arr = $('#selectShow').datagrid('getSelections');
        for (let i of arr) {
            ids.push(i._id);
        }

        $.post('/theatreMatch/findShow', { theatreMge_name: $('#cinemaID').val() }, function (data) {
            let arr = data[0]['screening[]'];
            let newArr = [];
            let str = '';
            for (let i of arr) {
                for (let k of ids) {
                    if (i != k) {
                        newArr.push(i); //得到不相等的id
                    }
                }
            }
            if (newArr.length > 1) {
                str = newArr.join(',');
            } else {
                str = newArr.join('');
            }
            let obj = { _id: data[0]._id, 'screening[]': str }
            $.post('/theatreMatch/deleteShow', obj, function (data) {    //修改原来的放映厅表
                $('#selectShow').datagrid('reload');
            })
        })
    }
}

export default init;










