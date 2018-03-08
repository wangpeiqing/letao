;$(function () {
    var value = getValue('key');
    $(".text_search").val(value);
    var page = 1;
    var pageSize = 4;

    function getProduct(page, pageSize, callBack) {
        var page = page || 1;
        var pageSize = pageSize || 4;
        // $(".products ul").html('<div class="loading"></div>');
        //初始化查询参数
        var parameter =
            {
                proName: value,
                page: page,
                pageSize: pageSize
            }

        var text = $(".text_search").val();
        parameter.proName = text;

        if ($(".parameter.current").length > 0) {
            for (var i = 0; i < $(".parameter.current").length; i++) {
                var sortValue = $(".parameter.current span").hasClass('fa-angle-up') ? 1 : 2;
                var sortKey = $(".parameter.current").attr('data-key');
                parameter[sortKey] = sortValue;
            }
        }
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: parameter,
            success: function (info) {
                callBack(info);
            }
        })
    }


    getProduct(page, pageSize, function (info) {
        // console.log(info);
        var tem = template('product', info);
        setTimeout(function () {
            $(".products ul").html(tem);
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }, 500)
    });

    //点击查询按钮查询商品
    $(".btn_search").on('click', function () {
        $('.parameter').removeClass('current').find('span').addClass('fa-angle-down').removeClass('fa-angle-up');
        getProduct();
    })

    $(".sort li").on('click', function () {
        if ($(this).hasClass('parameter')) {
            $(this).siblings().removeClass('current');
            if ($(this).hasClass('current')) {
                $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
            } else {
                $(this).addClass('current');
            }
            getProduct();
        }
    })

    //下拉刷新,上拉加载
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    page = 1;
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    getProduct(page, pageSize, function (info) {
                        var tem = template('product', info);
                        setTimeout(function () {
                            $(".products ul").html(tem);
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        }, 500)
                    });
                }
            },
            up: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    page++;
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    getProduct(page, pageSize, function (info) {
                        // console.log(page,info);
                        if (info.data.length > 0) {
                            var tem = template('product', info);
                            setTimeout(function () {
                                $(".products ul").append(tem);
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            }, 500)
                        }else{
                            page--;
                            mui.toast('没有更多数据了', {duration: '500', type: 'div'});
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                        }
                    });


                }
            }
        }
    });

})