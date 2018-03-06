;$(function () {
    var currentPage = 1;
    var ppageSize = 3;

    function getProduct(page, ppageSize) {
        var page = page || 1;
        var pageSize = pageSize || 3;
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {page: page, pageSize: pageSize},
            success: function (info) {
                // console.log(info);
                var tem = template('product_detail', info);
                $("table tbody").html(tem);

                $("#pagination").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    // currentPage:1,
                    numberOfPages: pageSize,
                    totalPages: Math.ceil(info.total / info.size),
                    itemTexts:function (type, page, current){
                        switch (type) {
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            case 'page':
                                return page;
                        }
                    },
                    tooltipTitles:function (type, page, current){
                        return '';
                    },
                    onPageClicked: function (e, originalEvent, type, page) {
                        getProduct(page, pageSize);
                    }
                })
            }
        })
    }

    getProduct();


    $("form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [],
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '商品库存不能为空'
                    },
                    regexp: {
                        regexp: /^[^0]\d*$/,
                        message: '请输入有效的商品库存'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺码不能为空'
                    },
                    regexp: {
                        regexp: /^[3-4][2-9]-[4][0-6]$/,
                        message: '请输入有效的商品尺码,例如 32-46'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入有效的商品原价,例如 99'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '商品价格不能为空'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入有效的价格,例如 99'
                    }
                }
            },
            images: {
                validators: {
                    notEmpty: {
                        message: '请上传3张图片'
                    },
                    regexp: {
                        regexp: /^$/,
                        message: '请上传3张图片'
                    }
                }
            }
        }
    })


    //点击添加商品
    $(".btn_add").on('click', function () {
        $("#addModal").on('show.bs.modal', function () {
            $('form').data('bootstrapValidator').resetForm();
        })

        //获取一级分类
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                // console.log(info);
                var tem = template('product_topCategory', info);
                // console.log(tem);
                $(".dropdown:first-child ul.dropdown-menu").html(tem);
            }
        })
        //一级分类选项框点击事件
        $(".dropdown:first-child .dropdown-menu").on('click', 'li', function () {
            var secondId = $(this).data('id');

            //获取二级分类
            $.ajax({
                url: '/category/querySecondCategoryPaging',
                type: 'get',
                data: {page: 1, pageSize: 1000, secondId: secondId},
                success: function (info) {
                    var tem = template('product_secondCategory', info);
                    // console.log(tem);
                    $(".dropdown:last-of-type ul.dropdown-menu").html(tem);

                    $(".dropdown:last-of-type .dropdown-menu").on('click', 'li', function () {
                        $(".dropdown:last-of-type button").html($(this).find('a').html() + '<span class="caret"></span>');
                        $("#brandId").attr('value', $(this).data('id'));
                        //点击后修改brandId的验证结果为通过
                        $("form").data('bootstrapValidator').updateStatus('brandId', 'VALID');
                    })
                }
            })
            $(".dropdown:first-child button").html($(this).find('a').html() + '<span class="caret"></span>');

        })


        //显示模态框
        $("#addModal").modal('show');
    })
    var images = [];

    $('#uploadFile').fileupload({
        dataType: 'json',
        done: function (e, data) {
            images.push(data.result);

            if (images.length == 3) {
                $("form").data('bootstrapValidator').updateStatus('images', 'VALID');
            } else {
                if (images.length > 3) {
                    images.shift();
                } else {
                    $("form").data('bootstrapValidator').updateStatus('images', 'INVALID', 'regexp');
                }
            }
            images.forEach(function (ele, index) {
                $("#uploadPic" + (index + 1)).attr('src', ele.picAddr).attr('data-name', ele.picName);
            })
        }
    });

    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        var tem;
        images.forEach(function (ele, index) {
            tem += '&picName' + (index + 1) + '=' + ele.picName + '&picAddr' + (index + 1) + '=' + ele.picAddr;
        })
        var data = $("form").serialize() + tem;
        console.log(data);
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: data,
            success: function (info) {
                getProduct();
                $("#addModal").on('hide.bs.modal', function () {
                    $('form').data('bootstrapValidator').resetForm(true);
                })
                $("#addModal").modal('hide');
                images = [];
                $(".uploadPic").attr('src', './images/none.png').attr('data-name','');
                $(".dropdown:first-child button").html('选择一级分类' + '<span class="caret"></span>');
                $(".dropdown:last-of-type button").html('选择二级分类' + '<span class="caret"></span>');
            }
        })
    })


})