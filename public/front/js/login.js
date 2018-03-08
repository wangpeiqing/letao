;$(function (){
    $(".btn_confirm").on('click',function (e){
        e.preventDefault();
        $.ajax({
            url:'/user/login',
            type:'POST',
            data:$("form").serialize(),
            success:function (info){
                console.log(info);
                if (info.error) {
                    mui.toast(info.message, {duration: '500', type: 'div'});
                }else{
                    if (getValue('returnHref')) {
                        window.location.href = location.search.substr(12);
                    }else{
                        window.location.href = 'user.html';
                    }
                }

            }
        })
    })

})