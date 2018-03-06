var currentPage = 1;
var pageSize = 5;

//获取二级分类
function getSecondCategory(page, pageSize) {
    var page = page || 1;
    var pageSize = pageSize || 5;
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {page: page, pageSize: pageSize},
        success: function (info) {
            var tem = template('secondCategory', info);
            $("table tbody").html(tem);

            //渲染分页
            $("#pagination").bootstrapPaginator({
                bootstrapMajorVersion: 3,
                // currentPage:1,
                numberOfPages: pageSize,
                totalPages: Math.ceil(info.total / info.size),
                onPageClicked: function (e, originalEvent, type, page) {
                    getSecondCategory(page, pageSize);
                }
            })
        }
    })
}

getSecondCategory();

//点击添加二级分类
$(".btn_add").on('click', function () {
    //渲染一级分类下拉选项
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (info) {
            console.log(info);
            var tem = template('topCategory', info);
            $("ul.dropdown-menu").html(tem);
        }
    })
    $("#operation").modal('show');
    $('#operation').on('hide.bs.modal', function () {
        $('form').data('bootstrapValidator').resetForm();
    })
})

$("form").bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    excluded: [],
    fields: {
        categoryId: {
            validators: {
                notEmpty: {
                    message: '请选择分类'
                }
            }
        },
        brandName: {
            validators: {
                notEmpty: {
                    message: '品牌名称不能为空'
                }
            }
        },
        brandLogo: {
            validators: {
                notEmpty: {
                    message: '请选择品牌图片'
                }
            }
        }
    }
})

//一级分类选项框点击事件
$(".dropdown-menu").on('click', 'li', function () {
    $(".dropdown button").html($(this).find('a').html() + '<span class="caret"></span>');
    $("#categoryId").attr('value', $(this).data('id'));
    //点击后修改categoryId的验证结果为通过
    $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
})

//上传图片
$('#uploadFile').fileupload({
    dataType: 'json',
    done: function (e, data) {
        $("#uploadPic").attr('src', data.result.picAddr);
        $("#brandLogo").attr('value', data.result.picAddr);
        //上传图片完成后修改brandlogo的验证结果为通过
        $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
});


$("form").on('success.form.bv', function (e) {
    e.preventDefault();
    // console.log($("form").serialize());
    $.ajax({
        url: '/category/addSecondCategory',
        type: 'post',
        data: $("form").serialize(),
        success: function (info) {
            console.log(info);
            getSecondCategory();
            $("#uploadPic").attr('src', './images/none.png');
            $('form').data('bootstrapValidator').resetForm(true);
            $("#operation").modal('hide');
        }
    })
})



