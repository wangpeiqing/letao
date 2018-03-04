;$(function () {
    var page=1;
    var pagesize=5;

    //渲染数据
    function getUsers() {
        // var page = page || 1;
        // var pagesize = pagesize || 5;
        $.ajax({
            url:'/user/queryUser',
            type:'get',
            data:{
                page:page,
                pageSize:pagesize
            },
            success:function (result) {
                console.log(result);
                var tem = template('userinfo',result);
                $("tbody").html(tem);
                //渲染分页
                $("#pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:result.page,
                    totalPages:Math.ceil(result.total/result.size),
                    numberOfPages:5,
                    onPageClicked:function (event, originalEvent, type,p) {
                        page=p;
                        //页码点击时出发
                        getUsers(page);
                    }
                })
            }
        })
    }

    getUsers();
})