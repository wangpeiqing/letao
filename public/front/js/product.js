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
        console.log($(this).data('num'));
    })
})