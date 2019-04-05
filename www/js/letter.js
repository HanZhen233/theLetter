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
    var contentString=document.getElementById("letterdef-to").value;
    // mui.toast(contentString);
    if (contentString==null||contentString==""||contentString==
        "第一封信总是很难，不如聊一聊你最近看过的一本书，或者一部印象深刻的电影，说不定TA也看过呢？")
    {
        alert("请输入内容");
        return null;
    }else if (contentString.length<20){
        alert("输入内容长度应该超过20");
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
            alert("发送失败");
        }
    });
}


function getALetter() {
    $.ajax({
        url: receiverLetterURL,
        type: "GET",
        crossDomain: true,
        xhrFields: {withCredentials: true},
        success: function (letter) {
            if (letter == null||letter=="")
                mui.toast("当前没有信件");
            else {
                mui.confirm('存在新信件，是否收取？', '', ['拒收','接收'], function(e) {
                    if(e.index == 0) {
                        var _letterId=letter["letterId"];
                        var isOK=unlockLetter(_letterId);
                        if(isOK==true)
                            mui.toast("已拒收");
                    }else{
                        var letters = JSON.parse(localStorage.getItem("letters"));
                        letters.push(letter);
                        localStorage.setItem("letters", JSON.stringify(letters));
                        mui.toast("已接收");

                    }
                });

            }

        },
        error: function () {
            mui.toast("网络错误")
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    });

}
function unlockLetter(_letterId) {
    $.ajax({
        url: unlockLetterURL,
        type: "POST",
        data:{
            letterId:_letterId
        },
        dataType: 'json',
        crossDomain: true,
        xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(data) {
            return true;
        },
        error: function() {
            mui.toast("网络错误");
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
/*属于自己发送并且接受者为为0（没有接受者）
* 如果对方发送，显示对方id，
* 如果自己发送，显示对方id
*
* */
function displayLetters() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var userId = userInfo["userId"];

    var letters = JSON.parse(localStorage.getItem("letters"));
    if(letters==null||letters==[]||letters=={}){
        $("#letterList").append("<p style=‘text-align:center;’>当前无信件</p>");
        return;
    }
    for (var index in letters) {
        var letter = letters[index];//信件
        var messages = letter["messages"];
        // alert(JSON.stringify(letters[index]))
        var senderId = letter["senderId"];
        var receiverId = letter["receiverId"];
        var letterId = letter["letterId"]
        if (senderId == userId && receiverId != 0 || senderId != userId) {
            var _simpleMessage = simpleMessage(messages);
            listLetterInfo(letterId, _simpleMessage);
        }

    }
}

/*返回新建的简略信息*/
function simpleMessage(messages) {
    if(messages==null||messages==[]||messages=="")
        return;
   var _content=messages[messages.length-1]["content"];
   if (_content!=null)
    if (_content.length>15)
    return _content.substring(0,16);
   else
       return _content;
}
/*展示相关的信息*/
function listLetterInfo(letterId,_simpleMessage) {
    var letterInfo='<li id='+letterId+' class=\"mui-table-view-cell\" onclick="toLetter(this.id)">\n' +
        "\t\t\t\t\t<img class=\"mui-media-object mui-pull-left\"src=\"img/envelope-male.png\"/>\n" +
        "\t\t\t\t\t<div class=\"mui-media-body\">\n" +
        "\t\t\t\t\t\t<span>信客·"+letterId+"</span>\n" +
        "\t\t\t\t\t\t<p>"+_simpleMessage+"</p>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t</a>\n" +
        "\t\t\t</li>";

    $("#letterList").append(letterInfo);
}
/*跳转页面*/
function toLetter(_letterId) {
    location.href="letter-receive.html?"+"letterId="+encodeURI(_letterId);
}

/*加载个人中心信息*/
function load_person_info() {
    var userInfo=JSON.parse(localStorage.getItem("userInfo"));
    $("#person-name").text(userInfo["name"]);
    $("#person-email").text(userInfo["email"]);
    var gend = userInfo["gender"];
    if(gend==1){
        $("#person-icon") .attr("src","img/user3.png");
    }else {
        $("#person-icon") .attr("src","img/user4.png");
    }
}