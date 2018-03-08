;$(function () {

    var id = getValue('productId');

    function getProduct() {
        $.ajax({
            url: '/product/queryProductDetail',
            type: 'get',
            data: {id: id},
            success: function (info) {
                console.log(info);
                var tem = template('product', info);

                setTimeout(function () {
                    $(".mui-scroll").html(tem);
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

                    //初始化轮播图
                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 800//自动轮播周期，若为0则不自动播放，默认为0；
                    });
                    //初始化数字选择框
                    mui('.mui-numbox').numbox();

                }, 500)

                //加入购物车
                $(".addToCart").on('tap',function (){
                    var size;
                    if ($(".sizeNum.current").length>0) {
                        size = $(".sizeNum.current").data('num');
                    }else{
                        mui.toast('请选择尺码', {duration: '500', type: 'div'});
                        return;
                    }
                    var num = $(".num input").val();
                    var id = $(".proName").data('id');
                    $.ajax({
                        url:'/cart/addCart',
                        type:'post',
                        data:{
                            productId:id,
                            num:num,
                            size:size
                        },
                        success:function (info){
                            console.log(info);
                            if (info.error==400) {
                                window.location.href = 'login.html?returnHref='+location.href;
                            }else{
                                mui.confirm('添加成功','温馨提示',['去购物车','再逛逛'],function (e){
                                    if (e.index==0) {
                                        window.location.href = 'cart.html';
                                    }
                                })
                            }
                        }
                    })

                })
            }
        })
    }

    getProduct();


    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    getProduct();
                }
            }
        }
    })


    $(".product_main").on('tap','.sizeNum',function (){
        $(this).addClass('current').siblings().removeClass('current');
    })


})