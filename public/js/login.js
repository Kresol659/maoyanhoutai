
$(window).on('load', function () {
    function init() {
        $('#loginTab input').on('change', checkForm);
        $('#login_panel').on('submit', checkLogin);
    }
    let reg;//正则
    let state = {     //状态
        uname: false,
        upwd: false
    };
    //用户名
    function checkForm() {
        let id = event.target.id;
        switch (id) {
            case 'uname':
                reg = /^\w{8,14}$/;
                error = `✖ 用户名格式错误，应为8-14位数字字母`;
                break;
            case 'upwd':
                reg = /^[a-zA-Z0-9@!#]{8,16}$/;
                error = `✖ 密码格式错误，由8-16位数字字母@#！组成`;
                break;
        }
        let td = $('#' + id).parent().next();
        if (reg.test(event.target.value)) {
            td.html('✔').css({ color: 'green', fontWeight: 600 });
            state[id] = true;
        } else {
            td.html(error).css({ color: 'red', fontWeight: 600 })
            state[id] = false;
        }
    }
    //登录验证
    function checkLogin() {
        for (every in state) {
            if (!state[every]) {
                return false;
            }
        }
        return true;
    }
    if (location.search) {
        $('#errorValue').css('display', 'inline-block');
    }

    init();
})


