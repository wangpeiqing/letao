//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval:800//自动轮播周期，若为0则不自动播放，默认为0；
});

//初始化scroll控件
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //indicators: true
});

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

