;$(function () {
    var user_id;//用户id
    var total_money = 0;
    mui.init({
        //下拉刷新
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    setTimeout(function (){
                        //下拉获取最新产品信息
                        getProduct(user_id);
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    },500)
                }
            }
        }
    });
    //获取用户购物车产品信息
    function getProduct(user_id){

        total_money = 0;
        $(".total_money span").html('&yen;0.00');

        $.ajax({
            url: '/cart/queryCart',
            type: 'get',
            data: {id: user_id},
            success: function (info) {
                console.log(info);
                var tem = template('product', {info: info});
                $("#OA_task_2").html(tem);

                $(".btn_edit").on('tap',function (){
                    var data = {};
                    data.id = $(this).data('id');
                    data.num = $(this).data('num');
                    data.size = $(this).data('size');
                    data.proSize = $(this).data('prosize');
                    data.proNum = $(this).data('pronum');
                    var tem = template('updateProduct',data);
                    tem = tem.replace(/\n/g, '');
                    //初始化数字选择框
                    mui.confirm(tem,'修改商品信息',['修改','取消'],function (e){
                        if (e.index==0) {
                            var num = $("#update_num").val();
                            var size = $(".sizeNum.current").html();
                            $.ajax({
                                url:'/cart/updateCart',
                                data:{
                                    id:data.id,
                                    size:size,
                                    num:num
                                },
                                type:'post',
                                success:function (info){
                                    // console.log(info);
                                    getProduct(user_id);
                                }
                            })
                        }
                    })

                    $(".sizeNum").on('tap',function (){
                        $(this).addClass('current').siblings().removeClass('current');
                    })

                    mui('.mui-numbox').numbox();
                    console.log(data);

                })


                $(".btn_delete").on('tap',function (){
                    var id = $(this).data('id');
                    console.log(id,user_id);
                    $.ajax({
                        url:'/cart/deleteCart',
                        type:'get',
                        data:{id: [id]},
                        success:function (info){
                            console.log(info);
                            getProduct(user_id);
                        }
                    })
                })
            }
        })
    }
    //获取用户信息
    $.ajax({
        url: '/user/queryUserMessage',
        type: 'get',
        success: function (info) {
            // console.log(info);
            if (info.error) {
                window.location.href = 'login.html';
            } else {
                user_id = info.id;
                //获取产品
                getProduct(user_id);
            }
        }
    })


    $("#OA_task_2").on('change','.getPrice',function (){
        var price = $(this).data('price');
        var num = $(this).data('num');
        console.log(price,num);
        if ($(this).prop('checked')) {
            total_money =parseInt((+price) * (+num))+parseInt(total_money);
            $(".total_money span").html('&yen;'+total_money.toFixed(2));
        }else{
            total_money =parseInt(total_money)-parseInt((+price) * (+num));
            $(".total_money span").html('&yen;'+total_money.toFixed(2));
        }
        
    })





})