;$(function () {
    //清空搜索框
    var text = $(".text_search").val('');
    var history_arr = [];

    //渲染查询历史
    function render_history(history_arr){
        var tem = template('search_history',{arr:history_arr});
        $(".search_history ul").html(tem);
    }

    //从localStorage获取查询历史并转换成数组
    history_arr = JSON.parse(localStorage.getItem('historyList')||'[]');
    //将历史记录渲染到页面
    render_history(history_arr);

    //点击查询后将搜索内容保存
    $(".btn_search").on('click', function () {
        var text = $(".text_search").val();
        if (text.trim()) {
            //检测新的搜索记录是否在原来的历史数组中
            if (history_arr.indexOf(text)!=-1) {
                //存在时将原纪录删除
                history_arr.splice(history_arr.indexOf(text),1);
            }
            //将新数据加入到数组最前面
            history_arr.unshift(text);

            //最多保存10条记录
            if (history_arr.length>10) {
                //删除最后一条记录
                history_arr.pop();
            }
            //转换为json字符串并保存到localStorage
            var history = JSON.stringify(history_arr);
            localStorage.setItem('historyList', history);
            // //重新渲染查询历史
            // render_history(history_arr);

            window.location.href = 'searchList.html?key='+text;
        }else{
            mui.toast('请输入有效的查询信息', {duration: '1500', type: 'div'});
        }
    })

    //点击删除查询历史
    $(".search_history ul").on('click','.btn_delete',function (){
        var index=$(this).prev().data('index')
        history_arr.splice(index, 1);
        //转换为json字符串并保存到localStorage
        var history = JSON.stringify(history_arr);
        localStorage.setItem('historyList', history);
        //重新渲染查询历史
        render_history(history_arr);
    })

    //点击清空历史记录
    $(".btn_empty").on('click',function (){
        history_arr = [];
        //转换为json字符串并保存到localStorage
        var history = JSON.stringify(history_arr);
        localStorage.setItem('historyList', history);
        //重新渲染查询历史
        render_history(history_arr);
    })
})