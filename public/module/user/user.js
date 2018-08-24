function init() {
    var curPage = 1;
    $('#dg').datagrid({
        method: 'post',
        url: '/user/top',
        columns: [[
            { field: 'name', title: '用户名', width: 100, align: 'center' },
            { field: 'pwd', title: '密码', width: 100, align: 'center' },
            { field: 'phone', title: '手机号', width: 100, align: 'center' },
            { field: 'email', title: '邮箱', width: 100, align: 'center' }
        ]],
        fitColumns: true,
        toolbar: [{
            iconCls: 'icon-add',
            text: '新增用户',
            handler: addConfin
        }, {
            iconCls: 'icon-edit',
            text: '修改用户',
            handler: upDataNum
        },
        {
            iconCls: 'icon-no',
            text: '删除用户',
            handler: deleteDown
        }
        ],
        striped: true,
        rownumbers: true,
        pagination: true,

    });
    //----------------------------增加---------------------------//
    function addConfin() {
        $('#addbtn').dialog('open');
    }
    $('#addbtn').dialog({
        buttons: [{
            text: '保存',
            handler: function () {
                $.ajax({
                    type: 'get',
                    url: '/user/addConfin',
                    data: {
                        name: $('#addUser_user').textbox('getValue'),
                        pwd: $('#addUser_pwd').textbox('getValue'),
                        phone: $('#addUser_phone').textbox('getValue'),
                        email: $('#addUser_email').textbox('getValue'),

                    },
                    success: function () {

                        $('#dg').datagrid('load');
                        $.messager.alert('系统提示', '信息增加成功');
                        $('#addbtn').dialog('close')
                    }
                });
            }
        }
            , {
            text: '关闭',
            handler: function () {
                $('#addbtn').dialog('close')
            }
        }]
    });

    //----------------------------修改---------------------------//
    function upDataNum() {
        $('#uppbtn').dialog('open');
        let idNum1 = $('#dg').datagrid('getSelected')
       
        $('#dg').val(idNum1._id);
        $('#upUser_user').textbox('setValue', idNum1.name);
        $('#upUser_phone').textbox('setValue', idNum1.phone);
        $('#upUser_pwd').textbox('setValue', idNum1.pwd);
        $('#upUser_email').textbox('setValue', idNum1.email);

    }
    $('#uppbtn').dialog({
        buttons: [{
            text: '修改',
            handler: function () {
                $.ajax({
                    type: 'get',
                    url: '/user/upDataNew',
                    data: {
                        //返回所有被选中的行
                        _id: $("#dg").datagrid("getSelected")._id,
                        name: $('#upUser_user').val(),
                        phone: $('#upUser_phone').val(),
                        pwd: $('#upUser_pwd').val(),
                        email: $('#upUser_email').val(),

                    },
                    success: function (data) {
                        $('#dg').datagrid('load');
                        $.messager.alert('系统提示', '信息修改成功');
                    }
                });
                $('#uppbtn').dialog('close')
            }
        }
            , {
            text: '关闭',
            handler: function () {
                $('#uppbtn').dialog('close')
            }
        }]
    });

    //----------------------------删除---------------------------//
    // function deleteDown() {
    //     let idNum = $('#dg').datagrid('getSelected')
    //     console.log(idNum._id)
    //     $.messager.confirm('确认', '您确认想要删除记录吗？', (r) => {
    //         if (r) {
    //             $.ajax({
    //                 type: 'get',
    //                 url: '/user/delete',
    //                 data: { _id: idNum._id },
    //                 success: (data) => {
    //                     $('#dg').datagrid('load');
    //                     $.messager.alert('系统提示', '信息删除成功');
    //                 }
    //             })
    //         }
    //     });
    // }


    //----------------------------删除---------------------------//
    function deleteDown() {
        if ($('#dg').datagrid('getSelections').length != 0) {
            $.messager.confirm('确认', '你确定想要删除记录吗？', function (r) {
                if (r) {
                    let arr = [];
                    for (let obj of $('#dg').datagrid('getSelections')) {
                        arr.push(obj._id);
                    }
                    let idsArr = { ids: arr }
                    arr.length > 1 ? idsArr : idsArr = { _id: $('#dg').datagrid('getSelections')[0]._id };

                    $.post('/user/deleteDown', idsArr, function (data) {
                        $('#dg').datagrid('reload');
                    });
                }
            });
        }
    }
    //------------ -------------------  保存信息  ----------------------//


    //--------------------------------  查询  ---------------------------//
    function searchData() {
        let obj = {};
        if ($('search_name').val() != '')
            obj.name = $('seach_name').val();
        if ($('#search_sex').val() != '')
            obj.sex = $('#seach_sex').val();

        $('#dg').datagrid({
            queryParams: obj
        });
    }
    //查询输入框的样式
    $('#search_input').searchbox({
        width: 250,
        searcher: function (value) {

            let a = $('#search_input').searchbox('getName')

            let check = {}
            if ($('#search_input').val()) {
                check[a] = $('#search_input').val()
            }
            $('#dg').datagrid({
                queryParams: check,
            })
        },
        menu: '#search_btn',
        prompt: '请输入值'
    });


}
init();

export default init;