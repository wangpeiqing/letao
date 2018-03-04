;$(function () {
    //禁用刷新环
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
            //否则执行切换选中样式操作
            $(".page_aside li a").removeClass('current');
            $(this).addClass('current');
        }
    })
    // $(".page_aside li.parent a").on('click', function () {
    //     $(this).next().slideToggle();
    // })
})