//获取分类一级标题
$.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    success:function (info) {
        var tem = template('title',info);
        $(".category_title ul").html(tem);

        var category_id=$(".category_title ul li:first-child").data('id');
        getSecondCategory(category_id);
    }
})

//分类标题点击事件
$(".category_title ul").on('click','li',function () {
    $(this).siblings().removeClass('current');
    var id=$(this).addClass('current').data('id')
    getSecondCategory(id);
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);//100毫秒滚动到顶
})

//获取二级分类
function getSecondCategory(id) {
    $.ajax({
        url:"/category/querySecondCategory",
        type:'get',
        data:{id:id},
        success:function (info) {
            var tem = template('detail',info);
            $(".category_detail ul").html(tem);
        }
    })
}


