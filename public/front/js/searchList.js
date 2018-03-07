;$(function () {

    //获取浏览器中的参数,不传值时返回一个对象,该对象包含所有的参数属性
    function getValue(key) {
        var key = key || '';
        var tem = window.location.search.substring(1).split('&');
        var obj = {};
        tem.forEach(function (ele, index) {
            var keyName = ele.split('=')[0];
            var value = ele.split('=')[1];
            obj[keyName] = value;
        })
        if (key.trim()) {
            return obj[key];
        } else {
            return obj;
        }
    }

    var value = getValue('key');
    $(".text_search").val(value);

    function getProduct() {
        $(".products ul").html('<div class="loading"></div>');
        //初始化查询参数
        var parameter =
            {
                proName: value,
                page: 1,
                pageSize: 100
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
        console.log(parameter);
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: parameter,
            success: function (info) {
                var tem = template('product', info);
                setTimeout(function () {
                    $(".products ul").html(tem);
                }, 500)

            }
        })
    }


    getProduct();

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

})