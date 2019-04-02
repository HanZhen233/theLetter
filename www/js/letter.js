
/*随机发信*/
function sendLetter() {
    $.ajax({
        // url: "http://106.14.199.25:8080/sendLetter",
        url: "http://127.0.0.1:8080/sendLetter",
        type: "POST",
        data:{
            content :"你好啊"
        },
        //106.14.199.25
        dataType: 'json',
        crossDomain: true,
        xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(data) {
            alert(data),
            location.href="index.html";
        },
        error: function() {
            alert("账户或密码错误")
        }
    });

}
/*获得所有的自己发送或者收到的信件*/
function getLetterList() {
    $.ajax({
        // url: "http://106.14.199.25:8080/sendLetter",
        url: "http://127.0.0.1:8080/getLetterList",
        type: "GET",
        crossDomain: true,
        xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(letters) {
            if (letters==null)
                return;
            localStorage.setItem("letters",JSON.stringify(letters));
            // alert(JSON.stringify(letters))
        },
        error: function() {
            alert("网络错误")
        }
    });

}
/*从存储中获取信件相关信息*/
function displayLetters() {
    

}