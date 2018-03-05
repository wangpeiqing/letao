;$(function () {
    $(".btn_add").on('click', function () {
        $("#operation").modal('show');

    })

    $("#addCategory").on('click',function () {
        console.log($('form').serialize());
        // $.ajax({
        //     url:'/category/addTopCategory',
        //     type:'post',
        //     data: $('form').serialize(),
        //     success:function (info) {
        //         console.log(info);
        //     }
        // })
    })
})