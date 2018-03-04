;$(function () {
    $("form").bootstrapValidator({
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度需要在2到6位'
                    },
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度需要在6到12位'
                    }
                    ,
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        },
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        }
    })

    $("form").on('success.form.bv',function (e) {
        e.preventDefault();
        $.ajax({
            url:"/employee/employeeLogin",
            type:'post',
            data: $("form").serialize(),
            dataType:'json',
            success:function (result) {
                console.log(result);
                if (result.error==1000) {
                    $("form").data('bootstrapValidator').updateStatus('username', 'INVALID','callback');
                }
                if (result.error==1001) {
                    $("form").data('bootstrapValidator').updateStatus('password', 'INVALID','callback');
                }
                if (result.success) {
                    window.location.href = 'index.html';
                }
            }
        })
    })
    $('[type=reset]').on('click',function () {
        console.log(111);
        $("form").data('bootstrapValidator').resetForm(true);
    })
})