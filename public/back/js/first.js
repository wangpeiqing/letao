;$(function () {
    var page = 1;
    var pageSize = 5;
    //获取一级分类
    function getTopCategory(page, pageSize) {
        var page = page || 1;
        var pageSize = pageSize || 5;
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var tem = template('topCategory', info);
                $("table tbody").html(tem);
                //渲染分页
                $("#pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    numberOfPages:3,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function (e,originalEvent,type,page) {
                        getTopCategory(page,pageSize);
                    }
                })
            }
        })
    }

    getTopCategory();
    //显示添加模板
    $(".btn_add").on('click', function () {
        $("#operation").modal('show');
        $('#operation').on('shown.bs.modal', function () {
            $('form').data('bootstrapValidator').resetForm();
        })
    })
    //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }
    })
    //点击添加一级分类
    $("#addCategory").on('click', function () {
        //表单验证通过
        $("form").on('success.form.bv', function (e) {
            e.preventDefault();
            //添加一级分类
            $.ajax({
                url: '/category/addTopCategory',
                type: 'post',
                data: $('form').serialize(),
                success: function (info) {
                    if (info.success) {
                        //清空模态框并隐藏
                        $("form").data('bootstrapValidator').resetForm(true);
                        $("#operation").modal('hide');

                        //重新渲染表格
                        getTopCategory();
                    }
                }
            })
        })
    })


})