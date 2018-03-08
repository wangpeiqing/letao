;$(function (){

    $(".register").on('click',function (){
        var data={};
        var arr = $("form").serialize().split('&');
        arr.forEach(function (ele,index){
            data[ele.split('=')[0]] = ele.split('=')[1];
        })
        console.log(data);
        if (!/^\w{6,}$/.test(data.username)) {
            mui.toast('用户名长度至少6位字母', {duration: '500', type: 'div'});
            return;
        }
        if (!/^\d{6,}$/.test(data.password)) {
            mui.toast('密码长度至少6位', {duration: '500', type: 'div'});
            return;
        }
        if (!/^[1]\d{10}$/.test(data.mobile)) {
            mui.toast('请输入正确的手机号码', {duration: '500', type: 'div'});
            return;
        }
        if (!/^\d{4}$/.test(data.username)) {
            mui.toast('请输入验证码', {duration: '500', type: 'div'});
        }
        
    })

})