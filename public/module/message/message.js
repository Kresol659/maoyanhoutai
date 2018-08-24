// 初始化
function init() {
    //    初始化数据表格里的内容
    $('#message_table').datagrid({
        url: '/message/getTableData',
        method: 'post',
        pagination: true,
        rownumbers: true,
        columns: [[
            { field: 'new_title', title: '标题', width: 150, align: 'center' },
            { field: 'new_time', title: '发稿时间', width: 150, align: 'center' },
            { field: 'new_picture', title: '配图', width: 150, align: 'center' },
            { field: 'new_word', title: '文段', width: 150, align: 'center' },
            { field: 'new_criticism', title: '评论', width: 150, align: 'center' },

        ]],
        toolbar: [{
            text: '增加资讯',
            iconCls: 'icon-add',
            handler: addData
        }, '-', {
            text: '移除资讯',
            iconCls: 'icon-remove',
            handler: removeData
        }, '-', {
            text: '修改资讯',
            iconCls: 'icon-edit',
            handler: upData
        }, '-', {
            text: ` <input id="message_searchbox"  style="width: 250px "></input>
            <div id="message_search" style="width:120px">
            <div data-options="name:'new_title'">标题</div>
            <div data-options="name:'new_time'">发稿时间</div>
            <div data-options="name:'new_picture'">配图</div>
            <div data-options="name:'new_wore'">文段</div>
            <div data-options="name:'new_criticism'">评论</div>
            </div>`,
        }, '-', {
            iconCls: 'icon-edit',
            text: '刷新',
            handler: function () {
                $('#message_table').datagrid('load', {})
            }
        }
        ]
    })



    // ·····················增加···························
    $('#dd').dialog({
        title: '新增资讯',
        width: 400,
        height: 400,
        closed: true,
        cache: false,
        modal: true,
    });
    function addData() {
        $('#dd').dialog({
            closed: false,
        });
    }

    let num = 1;
    $('#add_documentBtn').on('click', function () {
        let str = `<div id='addfather' style="margin-left: 55px">`
        str += `<p> 配图：<input id="${num++}" class="new_img" type='File' name="inputFile" multiple ></p>
        <p>字段  <textarea name="" class="new_word" cols="30" rows="10"></textarea></p>
        </div>`
        $('#add_up').append(str);

    })

    $('#btn_criticismBtn').on('click', function () {
        let str = `<div>`
        str += `<p>字段  <textarea name="" class="new_criticism" cols="30" rows="10"></textarea></p>
        </div>`
        $('#add_middli').append(str)
    })


    // 点击新增上传图片
    $('#add_upload').on('click', function () {
        let arr = [];//多行文本框
        let ary = [];//图文
        let arz = [];//评论的数组
        let arr_word = document.getElementsByClassName('new_word')
        let arr_img = document.querySelectorAll('#addfather input')
        let arr_criticism = document.getElementsByClassName("new_criticism")

        //循环评论
        for (let a = 0; a < arr_criticism.length; a++) {
            arz.push(arr_criticism[a].value)
        }
        // console.log(arz)
        // 循环多行文本框
        for (let m = 0; m < arr_word.length; m++) {
            ary.push(arr_word[m].value);//将多行文本的值转成字符串，push进一个数组
        }
        //循环图片
        for (let item of arr_img) {
            // console/log(item);
            $.ajaxFileUpload({
                url: "/message/upFile",
                fileElementId: $("#" + item.id).parent().find("input[type=file]").attr("id"),
                dataType: "string",
                success: function (data) {
                    arr.push(data)
                }
            })
        }
        setTimeout(() => {
            $.ajax({
                type: 'post',
                url: '/message/addBtn',
                data: {
                    new_picture: arr,//图片
                    new_title: $('#new_title').val(),//标题
                    new_time: $('#new_time').val(),//上映时间
                    new_criticism: JSON.stringify(arz),//评论
                    new_word: JSON.stringify(ary),//字段
                },
                success: function (data) {
                    $('#message_table').datagrid('reload')
                }
            })
        }, 2000)
        $('#dd').dialog({ closed: true })
    })



    // ·····················移除···························
    function removeData() {
        $.messager.confirm('确认', '您确认想要删除记录吗？', function (data) {
            //  if (r){    
            $.get('/message/removeData', {
                _id: $('#message_table').datagrid('getSelected')._id
            }, function (data) {
                $('#message_table').datagrid('reload');
                //    $('#remove').dialog({closed:true});
            })
            //  }    
        });
    }

    // ·····················修改···························
    // 弹出修改的弹窗
    $('#new_change').dialog({
        title: '修改资讯',
        width: 400,
        height: 500,
        closed: true,
        cache: false,
        modal: true,
    })

    //在修改弹窗中显示点击的数据信息
    function upData() {

        let checkChangeSelected = $('#message_table').datagrid('getSelected');
        console.log(checkChangeSelected)
        if (checkChangeSelected == null) {
            console.log(1)
            $('#new_change').dialog('close')
            // $('#new_change').css("display",'none')
            console.log(1)
        }

        $('#new_change').dialog({
            closed: false,
            buttons: [{
                text: '保存',
                handler: updataData,

            }, {
                text: '关闭',
                handler: function () {
                    $('#new_change').dialog('close')
                }
            }]
        });

        function updata_alert() {
            $('#new_change').dialog({ closed: false });

            let node = $('#message_table').datagrid('getSelected');
            for (let b = 0; b < node.new_word.length; b++) {
                let str = `<div id='updatafather'>`
                str += `
                      <p>标题 <input type='File' name="inputFile" class="updataword_input" style="width:50px" ></p>
                      <p>文段 <textarea  class="updataword" id="" name="" id="" cols="30" rows="10"  style="width:300px" ></textarea></p>
                      </div>
                      `
                $('#addtextarea').append(str) //将拼接的输入框等push进一个标签进行展示。
                let search_textarea = document.getElementsByClassName('updataword')
                let search_input = document.getElementsByClassName('updataword_input')
                //     // 遍历拼接的字符串里面的多行文本框，将值填充进弹框
                for (let c = 0; c < search_textarea.length; c++) {
                    if ([b] = [c]) {
                        search_textarea[c].value = node.new_word[b];
                    }
                }

                $('#new_changeTitle').textbox('setText', node.new_title);
                $('#new_changeTime').textbox('setText', node.new_time);
                // $('#show_picture').attr("src", node.new_picture);
            }
            // $('#new_change').dialog({ closed: true });

        }
        updata_alert()
        //  新建修改的页面

        // 将在修改框里用户修改的信息更新进数据库
        function updataData() {
            let updataarr = [];//修改后的文本框的值
            let updataarea_textarea = document.getElementsByClassName('updataword')
            for (let d = 0; d < updataarea_textarea.length; d++) {
                updataarr.push(updataarea_textarea[d].value)
            }
            // console.log(updataarr)
            $.post('/message/updataData', {
                _id: $('#message_table').datagrid('getSelected')._id,
                new_title: $('#new_changeTitle').textbox('getText'),
                new_time: $('#new_changeTitle').textbox('getText'),
                new_word: JSON.stringify(updataarr),//图文
                // new_picture: data.join('')
            }, function () {
                $('#message_table').datagrid('reload')
            })
            $('#new_change').dialog('close')//修改点击保存后关闭当前对话框
        }
        // $('#new_change').dialog({ closed: true });
    }

    // 搜索框
    $('#message_searchbox').searchbox({
        searcher: function (value, name) {
            // console.log(name, value);
            // value:入户输入的搜索的值
            // name：选择的下拉菜单
            // let obj = {};
            // obj[name] = value;
            //     name:value
            //     $.post('/message/search', obj, function (data) {
            //         $('#message_table').datagrid('load',{
            //             queryParams: obj
            //         })

            //     })
            // },
            $.post('/message/search', { name: value }, function (data) {
                $('#message_table').datagrid('load', {
                    [name]: value
                })
            })
        },
        menu: '#message_search',
        prompt: '请输入值'

    })
    // }
}
$(function () {
    init()
})


export default init;

