;$(function (){
    var vCode;

    $(".register").on('click',function (e){
        e.preventDefault();
        var data={};
        var arr = $("form").serialize().split('&');
        arr.forEach(function (ele,index){
            data[ele.split('=')[0]] = ele.split('=')[1];
        })
        console.log(vCode,data);
        if (!(vCode==data.vCode)) {
            mui.toast('验证码错误', {duration: '500', type: 'div'});
            return;
        }

        if (!/^\w{6,}$/.test(data.username)) {
            mui.toast('用户名长度至少6位字母', {duration: '500', type: 'div'});
            return;
        }
        if (!/^\d{6,}$/.test(data.password)) {
            mui.toast('密码长度至少6位', {duration: '500', type: 'div'});
            return;
        }
        if ($("#re_password").val()!=data.password) {
            mui.toast('输入的密码不一致', {duration: '500', type: 'div'});
            return;
        }
        if (!/^[1]\d{10}$/.test(data.mobile)) {
            mui.toast('请输入正确的手机号码', {duration: '500', type: 'div'});
            return;
        }

        if (!$(".agree").prop('checked')) {
            mui.toast('请同意会员服务协议', {duration: '500', type: 'div'});
            return;
        }
        $.ajax({
            url:'/user/register',
            type:"post",
            data:data,
            success:function (info){
                console.log(info);
                if (info.error) {
                    mui.toast(info.message, {duration: '500', type: 'div'});
                }else{
                    // mui.toast(info.success, {duration: '500', type: 'div'});
                    window.location.href = 'user.html';
                }
                
            }
        })



        
        
    })
    $(".get_vCode").on('click',function (e){
        e.preventDefault();
        $.ajax({
            url:'/user/vCode',
            type:'get',
            success:function (info){
                console.log(info);
                if (info.vCode) {
                    vCode = info.vCode;
                    mui.toast(info.vCode, {duration: '1000', type: 'div'});
                    console.log(vCode);
                }else{
                    mui.toast(info.error, {duration: '500', type: 'div'});
                }
            }
        })
    })

})