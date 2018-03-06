;$(function () {
    //检测用户是否登录
    if (window.location.href.indexOf("login.html")==-1) {
        $.ajax({
            url: '/employee/checkRootLogin',
            type: 'get',
            success: function (info) {
                // console.log(info);
                if (info.error == 400) {
                    window.location.href = "login.html";
                }
            }
        })
    }

    //进度条禁用刷新环
    NProgress.configure({
        showSpinner: false
    })
    //ajax开始执行时
    $(document).ajaxStart(function () {
        NProgress.start();
    })
    //全部ajax结束时
    $(document).ajaxStop(function () {
        NProgress.done();
    })

    //aside菜单点击样式
    $(".page_aside li a").on('click', function () {
        if ($(this).parent().hasClass('parent')) {
            //如果点击的是父级菜单,执行展开或者收缩操作
            $(this).next().slideToggle();
        } else {
            //否则执行切换页面操作
            //切换样式
            $(".page_aside li a").removeClass('current');
            $(this).addClass('current');
            //加载页面
            $(".page_main .page_info").load($(this).data('href'));
            $.getScript('js/'+ $(this).data('js'));
        }
    })

    //点击隐藏左侧aside
    $(".menu_icon").on('click', function () {
        $(".page_aside").toggleClass('aside_hide');
        $(".page_main").toggleClass('mgl_0');
    })

    //显示退出模态框
    $(".quit_icon").on('click', function () {
        $('#quit').modal('show');
    })
    //退出后台管理系统
    $("#quit_confirm").on('click', function () {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function (info) {
                if (info.success) {
                    window.location.href = "login.html";
                }
            }
        })
    })

})