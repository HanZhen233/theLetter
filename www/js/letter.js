/*显示当前用户名及本地时间*/
function load_sender_name() {
    var userInfo=JSON.parse(localStorage.getItem("userInfo"));
;    $("#sender-to").text(userInfo["name"]);
    var mydate = new Date();
    var time=mydate.toLocaleString();
    $("#time-to").text(time);
}

/*随机发信*/
function sendLetter() {
    var contentString=$("#letterdef-to").text();
    if (contentString==null||contentString==""||contentString==
        "第一封信总是很难，不如聊一聊你最近看过的一本书，或者一部印象深刻的电影，说不定TA也看过呢？")
    {
        mui.alert("请输入内容");
        return null;
    }else if (contentString.length<20){
        mui.alert("s输入内容长度应该超过20");
        return null;
    }
    $.ajax({
        url: sendLetterURL,
        type: "POST",
        data:{
            content :contentString
        },
        dataType: 'json',
        crossDomain: true,
        xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(data) {
           // mui.alert("发送成功");
           alert("发送成功");
            location.href="index.html";
        },
        error: function() {
            alert("发送失败")
        }
    });

}
/*获得所有的自己发送或者收到的信件*/
function getLetterList() {
    $.ajax({
        url: getLetterListURL,
        type: "GET",
        crossDomain: true,
        xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(letters) {
            if (letters==null)
                return;
            localStorage.setItem("letters",JSON.stringify(letters));
        },
        error: function() {
            alert("网络错误")
        }
    });

}
/*从存储中获取信件相关信息*/
function displayLetters() {
    var letters=JSON.parse(localStorage.getItem("letters"));
    for (var index in letters){
        alert(JSON.stringify(letters[index]))
    }
    // $("#")
    

}