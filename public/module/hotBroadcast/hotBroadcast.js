
    function init() {
        $('#hotBroadcast_div').datagrid({              //数据表格
            url: "/hotBroadcast/show",
            method: "post",                          //方法
            checkbox: "true",                        //复选框
            rownumbers: "true",                      //行数
            fitColumns: "true",                      //列数
            striped: "true",
            pagination: "true",                      //页
            columns: [
                [{ field: 'box', checkbox: "true", width: 100 },
                { field: 'movie_name', align: "center", title: '电影名', width: 200 },
                { field: 'movie_ename', align: "center", title: '电影英文名', width: 110 },
                { field: 'movie_type', align: "center", title: '类型', width: 100 },
                { field: 'movie_imgAll', align: "center", title: '电影图片', width: 100 },
                { field: 'movie_director', align: "center", title: '导演', width: 100 },
                { field: 'movie_director_img', align: "center", title: '导演图片', width: 100 },
                { field: 'movie_actor', align: "center", title: '演员', width: 100 },
                { field: 'movie_actor_img', align: "center", title: '演员图片', width: 100 },
                { field: 'movie_want', align: "center", title: '想看', width: 100 },
                { field: 'movie_area', align: "center", title: '区域', width: 100 },
                { field: 'movie_year', align: "center", title: '年代', width: 100 },
                { field: 'movie_time', align: "center", title: '时长', width: 100 },
                { field: 'movie_show', align: "center", title: '上映时间', width: 100 },
                { field: 'movie_brief', align: "center", title: '简介', width: 100 },
                { field: 'movie_major', align: "center", title: '专业评分', width: 100 },
                { field: 'movie_user', align: "center", title: '用户评分', width: 100 },
                { field: 'movie_userComment', align: "center", title: '评论', width: 100 },
                { field: 'movie_box_office', align: "center", title: '票房', width: 100 },
                { field: 'movie_img', align: "center", title: '电影图片', width: 100 },
                { field: 'movie_related', align: "center", title: '电影资讯', width: 110 }
                ]],
            toolbar: [{      //工具栏
                iconCls: 'icon-add',
                text: "增加电影",
                handler: hotBroadcast_add
            }, '-', {
                iconCls: 'icon-remove',
                text: '删除电影',
                handler: hotBroadcast_remove
            }, '-', {
                text: `
                    <input id="hotBroadcast_one"></input>
                    <div id="hotBroadcast_two" style="width:200px">
                    <div data-options="name:'movie_type'">类型</div>
                    <div data-options="name:'movie_actor'">演员</div>
                    <div data-options="name:'movie_want'">想看</div>
                    <div data-options="name:'movie_area'">区域</div>
                    <div data-options="name:'movie_year'">年代</div>
                    <div data-options="name:'movie_brief'">简介</div>
                    </div> `,
            }, '-', {
                iconCls: 'icon-reload',   //重新加载
                text: '刷新',
                handler: hotBroadcast_reload
            }]
        });
        hotBroadcast_search();
    }
    function hotBroadcast_text(themes) {
        $.messager.show({
            title: '消息提示',
            msg: '将在3秒后自动关闭。',
            timeout: 3000,
            showType: 'slide'
        });
    };

    // -----------------------------增加------------------------------//

    function hotBroadcast_add() {
        $('#hotBroadcast_window').dialog({
            width: 800,
            height: 400,
            title: "增加电影",
            buttons: [{
                text: '保存',
                iconCls: 'icon-save',
                handler: () => {
                    let art = $("#hotBroadcast_table").datagrid("getSelected");
                    $.post('/hotBroadcast/removeRepeat', { _id: art._id, movie_isfalse: 'true' }, function (data) {
                        $("#hotBroadcast_table").datagrid("reload")
                    })
                    $.post('/hotBroadcast/addbroad', $("#hotBroadcast_table").datagrid("getSelected"), function (data) {
                        $("#hotBroadcast_div").datagrid("reload");
                    })
                }
            }],
        })
        $('#hotBroadcast_table').datagrid({
            method: "post",
            url: "/hotBroadcast/broad_add",
            checkbox: "true",
            rownumbers: "true",
            fitColumns: "true",
            striped: "true",
            pagination: "true",
            columns: [
                [{ field: 'box', checkbox: "true", width: 100 },
                { field: 'movie_name', align: "center", title: '电影名', width: 200 },
                { field: 'movie_ename', align: "center", title: '电影英文名', width: 100 },
                { field: 'movie_type', align: "center", title: '类型', width: 100 },
                { field: 'movie_imgAll', align: "center", title: '电影图片', width: 100 },
                { field: 'movie_director', align: "center", title: '导演', width: 100 },
                { field: 'movie_director_img', align: "center", title: '导演图片', width: 100 },
                { field: 'movie_actor', align: "center", title: '演员', width: 100 },
                { field: 'movie_actor_img', align: "center", title: '演员图片', width: 100 },
                { field: 'movie_want', align: "center", title: '想看', width: 100 },
                { field: 'movie_area', align: "center", title: '区域', width: 100 },
                { field: 'movie_year', align: "center", title: '年代', width: 100 },
                { field: 'movie_time', align: "center", title: '时长', width: 100 },
                { field: 'movie_show', align: "center", title: '上映时间', width: 100 },
                { field: 'movie_brief', align: "center", title: '简介', width: 100 },
                { field: 'movie_major', align: "center", title: '专业评分', width: 100 },
                { field: 'movie_user', align: "center", title: '用户评分', width: 100 },
                { field: 'movie_userComment', align: "center", title: '评论', width: 100 },
                { field: 'movie_box_office', align: "center", title: '票房', width: 100 },
                { field: 'movie_img', align: "center", title: '电影图片', width: 100 },
                { field: 'movie_related', align: "center", title: '电影资讯', width: 100 }
                ]
            ], queryParams: {
                movie_isfalse: 'false'
            },
            singleSelect: true
        });
    };

    //-------------------------------删除----------------------------//

    function hotBroadcast_remove() {
        if (!$("#hotBroadcast_div").datagrid("getSelected")) {
            $.messager.alert('消息提示', '请选择一条数据')
        } else {
            $.messager.confirm('确认', '您确认想要删除记录吗？', function (r) {
                if (r) {
                    let arr = $("#hotBroadcast_div").datagrid("getSelections");
                    for (let item of arr) {
                        $.post("/hotBroadcast/broad_remove", {
                            _id: item._id
                        }, (data) => {
                            hotBroadcast_text("删除成功")
                            $("#hotBroadcast_div").datagrid("reload")
                        })
                    }
                } else {
                    hotBroadcast_text('删除失败')
                }
            });
        }
    }

    //---------------------------------搜索----------------------------// 

    function hotBroadcast_search() {
        $("#hotBroadcast_one").searchbox({
            searcher: function (value, name) {
                $.ajax({
                    type: "post",
                    url: "/hotBroadcast/show",
                    data: {
                        name: value
                    },
                    success: (data) => {
                        $("#hotBroadcast_div").datagrid("load", {
                            [name]: value
                        });
                    }
                })
            },
            prompt: "请输入搜素内容",
            menu: '#hotBroadcast_two'
        });
    }
    function hotBroadcast_reload() {
        window.parent.location.reload();
    }
    init();
    $.parser.parse();
export default init;
