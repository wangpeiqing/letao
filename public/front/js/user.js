;$(function (){
    $.ajax({
        url:'/user/queryUserMessage',
        type:'get',
        success:function (info){
            console.log(info);
            var tem = template('userTem',info);
            $(".user_info").html(tem);
        }
    })
})