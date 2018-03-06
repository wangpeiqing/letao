;$(function () {
    var currentPage = 1;
    var pagesize = 5;

    //渲染数据
    function getUsers(page,pagesize) {
        var page = page || 1;
        var pagesize = pagesize || 5;
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: page,
                pageSize: pagesize
            },
            success: function (result) {
                console.log(result);
                var tem = template('userinfo', result);
                $("tbody").html(tem);
                //渲染分页
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
                    onPageClicked: function (event, originalEvent, type, p) {
                        currentPage = p;
                        //页码点击时出发
                        getUsers(p,pagesize);
                    }
                })
            }
        })
    }

    getUsers();

    //用户启用和停用
    function updateUser(id,isDelete){
        if (id&&(isDelete!=1&&isDelete!=0)) {
            return;
        }
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {id: id, isDelete: isDelete},
            success: function (info) {
                console.log(info);
                getUsers(currentPage,5);
            }
        })
    }

    $("table").on('click', '.enable', function () {
        console.log($(this).data('id'));
        updateUser($(this).data('id'),1);
    })
    $("table").on('click', '.disable', function () {
        console.log($(this).data('id'));
        updateUser($(this).data('id'),0);
    })
})