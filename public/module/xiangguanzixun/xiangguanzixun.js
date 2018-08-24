function init(){
$('#addr>p').css('margin-top', '20px');
$('#alter_r>p').css('margin-top', '20px');
$('#related_information').datagrid({
    method: 'post',
    url: '/routesRelated/related',
    pagination: true,
    fitColumns: true,
    rownumbers:true,
    columns: [[
        { field: 'box', checkbox:true, width: 100},
        { field: 'related_img', title: '图片', width: 100 },
        { field: 'related_title', title: '标题', width: 100 },
        { field: 'related_want', title: '想看', width: 100 },
        { field: 'related_say', title: '评论', width: 100 },
    ]],
    toolbar: [{
        iconCls: 'icon-add',
        text: "增加资讯",
        handler: add_related,
    }, '-', {
        iconCls: 'icon-remove',
        text: "删除资讯",
        handler: remove_r,
    }, '-', {
        iconCls: 'icon-edit',
        text: "修改资讯",
        handler: alter_r,
    }, '-', {
        text: `<input id="searchs" style="width:300px;"></input> 
            <div id="searchNums" style="width:50px;"> 
            <div data-options="name:'related_title'">标题</div> 
           </div> `,
    }, {
        iconCls: 'icon-reload',
        handler: function () {
            $('#related_information').datagrid('load', {});
        },
    }]
});
// ---------------查找--------------------  
$('#searchs').searchbox({
    searcher: function (value, name) {
        $.post('/routesRelated/title', {
            related_title: value
        }, function (data) {
            $('#related_information').datagrid('load', {
               related_title: value
                })
            }
        )
    },
    menu: '#searchNums',
    prompt: '请输入值'
});
//弹出增加框
$('#addr').dialog({
    title: '增加资讯',
    width: 400,
    height: 400,
    closed: true,
    cache: false,
    modal: true,
    buttons: [{
        text: '保存',
        handler: addr
    }, {
        text: '关闭',
        handler: function () {
             $('#addr').dialog('close');
             $('#addr').form('clear');
            }
    }]
});
//连接label
function labels_two(movie, text) {
    $(movie).textbox({
        label: text,
        width: '300px',
        height: 35,
        labelAlign: 'right',
        labelWidth: '60px',
    });
}
//增加框连接label
labels_two(`#related_title`, '标题：');
labels_two(`#related_want`, '想看：');
labels_two(`#related_say`, '评论：');
//修改框连接label
labels_two(`#alter_r_title`, '标题：');
labels_two(`#alter_r_want`, '想看：');
labels_two(`#alter_r_say`, '评论：');
// 弹出修改框
$('#alter_r').dialog({
    title: '修改资讯',
    width: 400,
    height: 400,
    closed: true,
    cache: false,
    modal: true,
    buttons: [{
        text: '保存',
        handler: alter_r2
    }, {
        text: '关闭',
        handler: function () { $('#alter_r').dialog('close'); }
    }]
});
// ---------------增加资讯--------------------
function add_related() {
    $('#addr').dialog('open');
}
//   上传图片
function addr() {
    $.ajaxFileUpload({
        url: "/routesRelated/related_img",
        fileElementId: $('#related_img').parent().find('input[type=file]').attr('id'),
        dataType: "string",
        success: function (data) {
            setTimeout(() => {
                $.ajax({
                    type: "post",
                    url: "/routesRelated/add_r",
                    data: {
                        related_img: data,
                        related_title: $('#related_title').textbox('getValue'),
                        related_want: $('#related_want').textbox('getValue'),
                        related_say: $('#related_say').textbox('getValue'),
                    },
                    success: function (data) {
                        $('#addr').dialog('close');
                        $('#related_information').datagrid('reload');
                    }
                })
                $('#addr').form('clear'); 
            }, 500)
        }
    })
}


// ---------------删除资讯--------------------
function remove_r() {
    if (!$('#related_information').datagrid('getSelected')) {
        $.messager.alert('消息提示', '请选择一条数据');
    } else {
        $.messager.confirm('确认', '您确认想要删除记录吗？', function (r) {
            if (r) {
                let arr = $('#related_information').datagrid('getSelections');
                for (let item of arr) {
                    $.get('/routesRelated/remove_r', {
                        _id: item._id
                    }, function (data) {
                        $('#related_information').datagrid('reload');
                    })
                }

            }
        });
    }
}
// ---------------修改资讯--------------------   
function alter_r() {
    if (!$('#related_information').datagrid('getSelected')) {
        $.messager.alert('消息提示', '请选择一条数据');
    }
    else if ($('#related_information').datagrid('getSelections').length > 1) {
        $.messager.alert('消息提示', '只能选择一条数据');
    } else {
        $('#alter_r').dialog('open');
        let node1 = $('#related_information').datagrid('getSelected');
        //    console.log(node1)
        $('#alter_r_title').textbox('setValue', `${node1.related_title}`);
        $('#alter_r_want').textbox('setValue', `${node1.related_want}`);
        $('#alter_r_say').textbox('setValue', `${node1.related_say}`);
    }
}
//点击保存修改
function alter_r2() {
    let node = $('#related_information').datagrid('getSelected');
    $.get('/routesRelated/alter_r', {
        _id: `${node._id}`,
        related_title: $('#alter_r_title').textbox('getValue'),
        related_want: $('#alter_r_want').textbox('getValue'),
        related_say: $('#alter_r_say').textbox('getValue')
    }, function (data) {
        $('#related_information').datagrid('reload');
        $('#alter_r').dialog('close');
    })
}
}

export default init;