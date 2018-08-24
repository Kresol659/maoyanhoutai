function init() {

    $('#easyTable').datagrid({
        width: '100%',
        url: '/theatreMge/table',
        method: 'post',
        pagination: true,
        striped: true,
        rownumbers: true,
        columns: [
            [{
                field: '',
                title: '',
                width: 10,
                align: 'center',
                checkbox: true
            },
            {
                field: 'theatreMge_name',
                title: '院线名',
                width: 100,
                align: 'center'
            },
            {
                field: 'theatreMge_address',
                title: '地址',
                width: 100,
                align: 'center'
            },
            {
                field: 'theatreMge_phone',
                title: '电话',
                width: 100,
                align: 'center'
            },
            {
                field: 'theatreMge_url',
                title: '网址',
                width: 100,
                align: 'center'
            }

            ]
        ],
        fitColumns: true,
        checkbox: true,
        toolbar: [{
            iconCls: 'icon-add',
            text: '增加院线',
            handler: add,
        }, '-', {
            iconCls: 'icon-no',
            text: '删除院线',
            handler: del,
        }, '-', {
            iconCls: 'icon-edit',
            text: '修改院线',
            handler: updata,
        }, '-'],


    });
    // 点击添加放映厅按钮
    $('#btn').linkbutton({
        iconCls: 'icon-mini-add'
    }).bind('click', studio_btn);
    // 点击预览座位按钮
    $('#preview_btn').linkbutton({
        iconCls: 'icon-filter'
    }).bind('click', preview);
    // 点击座位改变ID和背景
    $('#seat_table').on('click', 'td', function () {
        if (event.target.dataset.id != 0) {
            event.target.dataset.id = '0';
            $(this).css({
                backgroundImage: '',
            });
        } else {
            event.target.dataset.id = '1';
            $(this).css({
                backgroundImage: 'url(./images/Screenshot.png)',
            });
        }
    })
}

// 点击预览座位按钮事件
function preview() {

    $('#seat_table').css({
        display: 'block',
    })
    let strw = '';
    for (let i = 1; i <= $('#row').val(); i++) {
        let strc = '';
        for (let j = 1; j <= $('#col').val(); j++) {
            strc += `<td data-id='1' style="width: 34px;height:31px; background-image: url(./images/Screenshot.png)"></td>`
        }
        strw += `<tr>${strc}</tr>`
    }
    $('#seat_table').html(strw);
}

// 点击添加放映厅事件
function studio_btn() {
    $('#studio').dialog({
        title: '增加放映厅',
        width: 600,
        height: 600,
        closed: false,
        modal: true,
        shadow: true,
        resizable: true,
        buttons: [{
            text: '保存放映厅',
            iconCls: 'icon-add',
            handler: seating,
        }, {
            text: '关闭',
            iconCls: 'icon-no',
            handler: function () {
                $('#studio').window('close');
            }
        }]
    });
    $('#add').css({
        display: 'block',
    })
}


// 排座位
function seating() {
    let arr = [];
    let arrNumber = [];
    arr = $('#seat_table td');
    for (let i = 0; i < arr.length; i++) {
        arrNumber.push(arr[i].dataset.id);
        $('#seat').textbox('setValue', arrNumber)
    }
    let praem = {
        sereeningName: $('#sereeningName').val(),
        seat: arrNumber
    }
    $.post('/theatreMge/seat', praem, function (data) {
        console.log(data);
    })
}

// 增加院线点击事件
function add() {
    // 清空输入狂的值
    $('#theatreMge_name').textbox('setValue', '');
    $('#theatreMge_address').textbox('setValue', '');
    $('#theatreMge_phone').textbox('setValue', '');
    $('#theatreMge_url').textbox('setValue', '');
    //弹出框
    $('#add').dialog({
        title: '增加院线',
        width: 400,
        height: 400,
        closed: false,
        modal: true,
        shadow: true,
        buttons: [{
            text: '增加',
            iconCls: 'icon-add',
            handler: confirm_btn,
        }, {
            text: '取消',
            iconCls: 'icon-no',
            handler: cancel_btn,
        }]
    });
    $('#add').css({
        display: 'block',
    })



}
// 增加到数据库以及关闭面板
function confirm_btn() {

    $.post('/theatreMge/add', {
        theatreMge_name: $('#theatreMge_name').val(),
        theatreMge_address: $('#theatreMge_address').val(),
        theatreMge_phone: $('#theatreMge_phone').val(),
        theatreMge_url: $('#theatreMge_url').val()
    }, function (data) {
        $('#easyTable').datagrid('reload');
        $.messager.alert('系统消息', '增加成功');
        $('#add').window('close');
    })

}

function cancel_btn() {
    $('#add').window('close');
}





//点击删除院线事件


function del() {
    if ($('#easyTable').datagrid('getSelections').length <= 0) {
        $.messager.alert('警告', '请选择要删除的数据');
    } else {
        $.messager.confirm('确认', '您确认想要删除记录吗？', function (r) {
            if (r) {
                for (let _id of $('#easyTable').datagrid('getSelections')) {
                    $.get('/theatreMge/remove', _id, function (data) {

                    })
                }
                $.messager.alert('系统提示', '删除成功');
                $('#easyTable').datagrid('reload');
            }
        });

    }
}

//点击修改按钮事件

function updata() {
    if ($('#easyTable').datagrid('getSelections').length <= 0) {
        $.messager.alert('警告', '请选择要修改的数据');
    } else if ($('#easyTable').datagrid('getSelections').length > 1) {
        $.messager.alert('警告', '不能同时修改多条数据');
    } else {
        //弹出修改框
        $('#updata').dialog({
            title: '修改院线',
            width: 400,
            height: 400,
            closed: false,
            modal: true,
            shadow: true,
            buttons: [{
                text: '修改',
                iconCls: 'icon-add',
                handler: updata_data,
            }, {
                text: '取消',
                iconCls: 'icon-no',
                handler: function () {
                    $('#updata').dialog('close');
                },
            }]
        });
        $('#updata').css({
            display: 'block',
        })
        // 获取要修改数据的ID
        let _id = $('#easyTable').datagrid('getSelections')[0]._id;
        $.post('/theatreMge/update', {
            _id: _id
        }, function (data) {
            $('#updata_name').textbox('setValue', data.theatreMge_name),
                $('#updata_address').textbox('setValue', data.theatreMge_address),
                $('#updata_phone').textbox('setValue', data.theatreMge_phone),
                $('#updata_url').textbox('setValue', data.theatreMge_url)
        })

        // $.messager.alert('系统提示', '修改成功');
        // $('#easyTable').datagrid('reload');
    }
}
// 修改数据到数据库
function updata_data() {
    let praem = {
        _id: $('#easyTable').datagrid('getSelections')[0]._id,
        theatreMae_name: $('#updata_name').val(),
        theatreMge_address: $('#updata_address').val(),
        theatreMge_phone: $('#updata_phone').val(),
        theatreMge_url: $('#updata_url').val()
    }
    $.post('/theatreMge/updateData', praem, function (data) {

        $.messager.alert('系统提示', '修改成功');
        $('#easyTable').datagrid('reload');
        $('#updata').window('close');
    })
}


export default init;