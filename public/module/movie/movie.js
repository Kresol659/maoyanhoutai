function init() {
    $('#add p').css('margin-top','15px');
    $('#alter p').css('margin-top','15px');
    $('#movie').datagrid({
     method: 'post',
        url: '/routes_movie/movie',
       nowrap:true,
        pagination: true,
        fitColumns: true,
        rownumbers:true,
        columns: [[
            { field: 'box', checkbox:true, width: 100},
            { field: 'movie_name', title: '电影名', width: 500 },
            { field: 'movie_ename', title: '电影英文名', width: 100 },
            { field: 'movie_type', title: '类型', width: 100 },
            // { field: 'movie_reing', title: '', width: 100 },
            { field: 'movie_imgAll', title: '电影图片', width: 100 },
            { field: 'movie_director', title: '导演', width: 100 },
            { field: 'movie_director_img', title: '导演图片', width: 100 },
            { field: 'movie_actor', title: '演员', width: 100 },
            { field: 'movie_actor_img', title: '演员图片', width: 100 },
            { field: 'movie_want', title: '想看', width: 100 },
            { field: 'movie_area', title: '区域', width: 100 },
            { field: 'movie_year', title: '年代', width: 100 },
            { field: 'movie_time', title: '时长', width: 100 },
            { field: 'movie_show', title: '上映时间', width: 100 },
            { field: 'movie_brief', title: '简介', width: 100 },
            { field: 'movie_major', title: '专业评分', width: 100 },
            { field: 'movie_user', title: '用户评分', width: 100 },
            { field: 'movie_userComment', title: '评论', width: 100 },
            { field: 'movie_box_office', title: '票房', width: 100 },
            { field: 'movie_img', title: '电影图片', width: 100 },
            { field: 'movie_related', title: '电影资讯', width: 100 }
        ]],
      toolbar: [{
            iconCls: 'icon-add',
            text: "增加电影",
            handler: add,
        }, '-', {
            iconCls: 'icon-remove',
            text: "删除电影",
            handler: remove,
        }, '-', {
            iconCls: 'icon-edit',
            text: "修改电影",
            handler: alter,
        }, '-', {
            text: `<input id="search" style="width:300px;"></input> 
            <div id="searchNum" style="width:120px;"> 
            <div data-options="name:'movie_name'">电影名</div> 
            <div data-options="name:'movie_type'">类型</div>
            <div data-options="name:'movie_director'">导演</div> 
        </div> `,
        }, {
            iconCls: 'icon-reload',
            handler: function () {
                $('#movie').datagrid('load', {});
            }
        }, '-', {
            iconCls: 'icon-add',
            text: "添加电影资讯",
            handler: add_xixun,

        }]

    });
    // ---------------查找--------------------  
    $('#search').searchbox({
        searcher: function (value, name) {
            $.get('/routes_movie/name', {
                name: value
            }, function (data) {
                $('#movie').datagrid('load', {
                    [name]: value,
                })
            })
        },
        menu: '#searchNum',
        prompt: '请输入值'
    });
    //弹出增加框
    $('#add').dialog({
        title: '增加电影',
        width: 400,
        height: 400,
        closed: true,
        cache: false,
        modal: true,
        buttons: [{
            text: '保存',
            handler: add_save
        }, {
            text: '关闭',
            handler: function () {
                $('#add').dialog('close');
                $('#add').form('clear');
            }
        }]
    });
    //连接label
    function labels(movie,text){
       $(movie).textbox({
        label:text, 
        width:'300px',             
        height:35,
        labelAlign:'right',
        labelWidth:'100px',
    });  
}
//增加框连接label
    labels(`#movie_name`,'电影名：');
    labels(`#movie_ename`,'电影英文名：');
    labels(`#movie_type`,'类型：');
    labels(`#movie_director`,'导演：');
    labels(`#movie_actor`,'演员：');
    labels(`#movie_want`,'想看：');
    labels(`#movie_area`,'区域：');
    labels(`#movie_year`,'年代：');
    labels(`#movie_time`,'时长：');
    labels(`#movie_year`,'年代：');
    labels(`#movie_show`,'上映时间：');
    labels(`#movie_brief`,'简介：');
    labels(`#movie_major`,'专业评分：');
    labels(`#movie_user`,'用户评分：');
    labels(`#movie_box_office`,'票房：');
// 修改框连接label
    labels(`#alter_name`,'电影名：');
    labels(`#alter_ename`,'电影英文名：');
    labels(`#alter_type`,'类型：');
    labels(`#alter_director`,'导演：');
    labels(`#alter_actor`,'演员：');
    labels(`#alter_want`,'想看：');
    labels(`#alter_area`,'区域：');
    labels(`#alter_year`,'年代：');
    labels(`#alter_time`,'时长：');
    labels(`#alter_year`,'年代：');
    labels(`#alter_show`,'上映时间：');
    labels(`#alter_brief`,'简介：');
    labels(`#alter_major`,'专业评分：');
    labels(`#alter_user`,'用户评分：');
    labels(`#alter_box_office`,'票房：');
   //弹出修改框
    $('#alter').dialog({
        title: '修改电影',
        width: 400,
        height: 400,
        closed: true,
        cache: false,
        modal: true,
        buttons: [{
            text: '保存',
            handler: alter_save
        }, {
            text: '关闭',
            handler: function () { $('#alter').dialog('close'); }
        }]
    });
    // ---------------增加电影--------------------
   function add() {
       $('#add').dialog('open');
 }
    //点击增加评论
    $('#userComment_Btn').on('click', function () {
         $('#manyComment').append(`<textarea name="" class="userComment" cols="30" rows="5" style="margin-left:39px;"></textarea>`);
    })
    //点击增加保存按钮
    function add_save() {
        let arr = [];
        let manyComments = document.querySelectorAll('.userComment')
        for (let item of manyComments) {
            arr.push(item.value)
        }
        let art = arr.join('/')
        //上传电影的图片用
        let image1 = [];
        $.ajaxFileUpload({//电影图片
            url: "/routes_movie/add_imgAll",
            fileElementId: $('#movie_imgAll').parent().find('input[type=file]').attr('id'),
            dataType: "string",
            success: function (data) {
                image1.push(data);
            }
        });
        let image2 = [];
        $.ajaxFileUpload({//导演图片
            url: "/routes_movie/add_director",
            fileElementId: $('#movie_director_img').parent().find('input[type=file]').attr('id'),
            dataType: "string",
            success: function (data) {
                image2.push(data);
            }
        });
        let image3 = [];
        $.ajaxFileUpload({//演员图片
            url: "/routes_movie/add_actor",
            fileElementId: $('#movie_actor_img').parent().find('input[type=file]').attr('id'),
            dataType: "string",
            success: function (data) {
                image3.push(data);
            }
        });
        let image4 = [];
        $.ajaxFileUpload({
            url: "/routes_movie/add_save",
            fileElementId: $('#movie_img').parent().find('input[type=file]').attr('id'),
            dataType: "string",
            success: function (data) {
                image4.push(data);
            }
        });
        let movie_isfalse='false';
        let movie_select='false';
        setTimeout(() => {
            $.ajax({
                type: "post",
                url: "/routes_movie/add",
                data: {
                    movie_name: $('#movie_name').val(),
                    movie_ename: $('#movie_ename').val(),
                    movie_type: $('#movie_type').val(),
                    movie_imgAll: image1,
                    movie_director: $('#movie_director').val(),
                    movie_director_img: image2,
                    movie_actor: $('#movie_actor').val(),
                    movie_actor_img: image3,
                    movie_want: $('#movie_want').val(),
                    movie_area: $('#movie_area').val(),
                    movie_year: $('#movie_year').val(),
                    movie_time: $('#movie_time').val(),
                    movie_show: $('#movie_show').val(),
                    movie_brief: $('#movie_brief').val(),
                    movie_major: $('#movie_major').val(),
                    movie_user: $('#movie_user').val(),
                    movie_userComment: art,
                    movie_box_office: $('#movie_box_office').val(),
                    movie_img: image4,
                    movie_isfalse:movie_isfalse,
                    movie_select:movie_select
                },
               success: function (data) {
                    $('#add').dialog('close');
                    $('#movie').datagrid('reload');
                     }
            })
            $('#add').form('clear');
        }, 1000)
        messager("增加电影成功！");
    }
    // ---------------删除电影--------------------
    function remove() {
        if (!$('#movie').datagrid('getSelected')) {
            $.messager.alert('消息提示', '请选择一条数据');
    }else{
              $.messager.confirm('确认', '您确认想要删除记录吗？', function (r) {
            if (r) {
                let arr = $('#movie').datagrid('getSelections');
                for (let item of arr) {
                    $.get('/routes_movie/remove', {
                        _id: item._id
                    }, function (data) {
                        $('#movie').datagrid('reload');
                    })
                }
                messager("删除电影成功！");
            }
        });
        }
 }
    // ---------------修改电影,图片修改假的--------------------   
    function alter() {
        if (!$('#movie').datagrid('getSelected')) {
            $.messager.alert('消息提示', '请选择一条数据');
        }
        else if ($('#movie').datagrid('getSelections').length > 1) {
            $.messager.alert('消息提示', '只能选择一条数据');
        }else{
         $('#alter').dialog('open');
        let node = $('#movie').datagrid('getSelected');
        let art = node.movie_userComment.split('/');
        let arr='';
        for (let i = 0; i < art.length; i++) {
            arr+=`<textarea name="" id="i" cols="30" rows="10"></textarea>`;
         }
        $('#alter_userComment').html(arr);
        let alter_userComments = document.querySelectorAll('#alter_userComment textarea')
        let i = 0;
        for (let item of alter_userComments) {
            while (i < art.length) {
                item.value = art[i];
                break;
            }
            i++;
        }
        $('#alter_name').textbox('setValue', `${node.movie_name}`);
        $('#alter_ename').textbox('setValue', `${node.movie_ename}`);
        $('#alter_type').textbox('setValue', `${node.movie_type}`);
        $('#alter_director').textbox('setValue', `${node.movie_director}`);
        $('#alter_actor').textbox('setValue', `${node.movie_actor}`);
        $('#alter_want').textbox('setValue', `${node.movie_want}`);
        $('#alter_area').textbox('setValue', `${node.movie_area}`);
        $('#alter_year').textbox('setValue', `${node.movie_year}`);
        $('#alter_time').textbox('setValue', `${node.movie_time}`);
        $('#alter_show').textbox('setValue', `${node.movie_show}`);
        $('#alter_brief').textbox('setValue', `${node.movie_brief}`);
        $('#alter_major').textbox('setValue', `${node.movie_major}`);
        $('#alter_user').textbox('setValue', `${node.movie_user}`);
        $('#alter_box_office').textbox('setValue', `${node.movie_box_office}`);
        // $('#alter_img').textbox('setValue',`${node.movie_img}`);
    } 
 }
//点击保存修改
    function alter_save() {
        let node = $('#movie').datagrid('getSelected');
        let alter_userComments = document.querySelectorAll('#alter_userComment textarea');
        let arr = [];
        for (let item of alter_userComments) {
            arr.push(item.value);
        }
        let art = arr.join('/');
        $.ajaxFileUpload({
            url: "/routes_movie/alter_save",
            fileElementId: $('#movie_img').parent().find('input[type=file]').attr('id'),
            dataType: "json",
            success: function (data) {
                $.post('/routes_movie/alter', {
                    _id: `${node._id}`,
                    movie_name: $('#alter_name').textbox('getValue'),
                    movie_ename: $('#alter_ename').textbox('getValue'),
                    movie_type: $('#alter_type').textbox('getValue'),
                    movie_director: $('#alter_director').textbox('getValue'),
                    movie_actor: $('#alter_actor').textbox('getValue'),
                    movie_want: $('#alter_want').textbox('getValue'),
                    movie_area: $('#alter_area').textbox('getValue'),
                    movie_year: $('#alter_year').textbox('getValue'),
                    movie_time: $('#alter_time').textbox('getValue'),
                    movie_show: $('#alter_show').textbox('getValue'),
                    movie_brief: $('#alter_brief').textbox('getValue'),
                    movie_major: $('#alter_major').textbox('getValue'),
                    movie_user: $('#alter_user').textbox('getValue'),
                    movie_userComment: art,
                    movie_box_office: $('#alter_box_office').textbox('getValue'),
                    movie_img: JSON.stringify(data),
                }, function (data) {
                    $('#movie').datagrid('reload');
                    $('#alter').dialog('close');
                })
            }
        })
        messager("修改电影成功！");
    }
    //增加资讯
    $('#zixun').dialog({
        title: '增加资讯',
        width: 400,
        height: 400,
        closed: true,
        cache: false,
        modal: true,
        buttons: [{
            text: '保存',
            handler: add_xixun1
        }, {
            text: '关闭',
            handler: function () { $('#zixun').dialog('close'); }
        }]
    });
    function add_xixun() {
        if (!$('#movie').datagrid('getSelected')) {
            $.messager.alert('消息提示', '请选择一条数据');
        }
        else if ($('#movie').datagrid('getSelections').length > 1) {
            $.messager.alert('消息提示', '只能选择一条数据');
        }
        else {
            $('#zixun').dialog('open');
            $('#zixun').datagrid({
                method: 'get',
                url: '/routes_movie/zixun_zhanshi',
                pagination: true,
                fitColumns: true,
                rownumbers:true,
                columns: [[
                    { field: 'box', checkbox:true, width: 100},
                    { field: 'related_img', title: '图片', width: 100 },
                    { field: 'related_title', title: '标题', width: 100 },
                    { field: 'related_want', title: '想看', width: 100 },
                    { field: 'related_say', title: '评论', width: 100 },
                ]]
            })
        }
    }
    //点击保存
    function add_xixun1() {
        let art = [];
        let arr = $('#zixun').datagrid('getSelections');
        for (let item of arr) {
            art.push(item._id);
        }
        let movie_related = $('#movie').datagrid('getSelected').movie_related;
        let id = $('#movie').datagrid('getSelected')._id;
        $.post('/routes_movie/add_zixun', {
            _id: id,
            movie_related: JSON.stringify(art)
        }, function (data) {
            $('#movie').datagrid('reload');
            $('#zixun').dialog('close');
        })
        messager("资讯增加成功！");
    }
function messager(xinxi){
       $.messager.show({
            title:'我的消息',
            msg:xinxi,
            timeout:500,
            showType:'slide'
        });
}
    
}
export default init;
