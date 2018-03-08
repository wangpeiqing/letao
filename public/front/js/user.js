;$(function (){
    $.ajax({
        url:'/user/queryUserMessage',
        type:'get',
        success:function (info){
            // console.log(info);
            var tem = template('userTem',info);
            $(".user_info").html(tem);
        }
    })
    $(".btn_quit").on('click',function (){
        $.ajax({
            url:'/user/logout',
            type:'get',
            success:function (info){
                console.log(info);
                if (info.success) {
                    window.location.href = 'login.html';
                }else{
                    mui.toast(info.message, {duration: '500', type: 'div'});
                }
            }
        })
    })
})