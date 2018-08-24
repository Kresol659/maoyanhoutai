
    function init() {
        $('#hotShowing_div').datagrid({              //数据表格
            url: "/hotShowing/show",
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
                handler: hotShowing_add
            }, '-', {
                iconCls: 'icon-remove',
                text: '删除电影',
                handler: hotShowing_remove
            }, '-', {
                text: `
                    <input id="hotShowing_one"></input>
                    <div id="hotShowing_two" style="width:200px">
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
                handler: hotShowing_reload
            }]
        });
        hotShowing_search();
    }
    function hotShowing_text(themes) {
        $.messager.show({
            title: '消息提示',
            msg: '将在3秒后自动关闭。',
            timeout: 3000,
            showType: 'slide'
        });
    };

    // -----------------------------增加------------------------------//

    function hotShowing_add() {
        $('#hotShowing_window').dialog({
            width: 800,
            height: 400,
            title: "增加电影",
            buttons: [{
                text: '保存',
                iconCls: 'icon-save',
                handler: () => {
                    let art = $("#hotShowing_table").datagrid("getSelected");
                    $.post('/hotShowing/removeRepeat', { _id: art._id, movie_isfalse: 'true' }, function (data) {
                        $("#hotShowing_table").datagrid("reload")
                    })
                    $.post('/hotShowing/addshow', $("#hotShowing_table").datagrid("getSelected"), function (data) {
                        $("#hotShowing_div").datagrid("reload");
                    })
                }
            }],
        })
        $('#hotShowing_table').datagrid({
            method: "post",
            url: "/hotShowing/show_add",
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

    function hotShowing_remove() {
        if (!$("#hotShowing_div").datagrid("getSelected")) {
            $.messager.alert('消息提示', '请选择一条数据')
        } else {
            $.messager.confirm('确认', '您确认想要删除记录吗？', function (r) {
                if (r) {
                    let arr = $("#hotShowing_div").datagrid("getSelections");
                    for (let item of arr) {
                        $.post("/hotShowing/show_remove", {
                            _id: item._id
                        }, (data) => {
                            hotShowing_text("删除成功")
                            $("#hotShowing_div").datagrid("reload")
                        })
                    }
                } else {
                    hotShowing_text('删除失败')
                }
            });
        }
    }

    //---------------------------------搜索----------------------------// 

    function hotShowing_search() {
        $("#hotShowing_one").searchbox({
            searcher: function (value, name) {
                $.ajax({
                    type: "post",
                    url: "/hotShowing/show",
                    data: {
                        name: value
                    },
                    success: (data) => {
                        $("#hotShowing_div").datagrid("load", {
                            [name]: value
                        });
                    }
                })
            },
            prompt: "请输入搜素内容",
            menu: '#hotShowing_two'
        });
    }
    function hotShowing_reload() {
        window.parent.location.reload();
    }
    init();
    $.parser.parse();

export default init;