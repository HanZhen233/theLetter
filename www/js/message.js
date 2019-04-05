/*展示所有的消息*/
function displayMessages() {
    //当前用户的名字
    var userInfo=JSON.parse(localStorage.getItem("userInfo"));
    var userName=userInfo["name"];
    var userId=userInfo["userId"];
    //传递过来信件的id
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var letterId=decodeURI(loc.substr(n2+1,n1-n2));
    var letter;
    var letters=JSON.parse(localStorage.getItem("letters"));
    for(var i in letters){
        if(letters[i]["letterId"]==letterId){
            letter=letters[i];
            break;
        }
    }
    /*如果发信者的id与发消息的id*/
    var letterSenderId=letter["senderId"];
    var letterReceiverId=letter["receiverId"];
    var letterSender=letter["senderName"];
    var letterReceiver=letter["receiverName"];
    var _messages=letter["messages"]
    var messageSender;
    var messageReceiver;
   for (var j in _messages ){

        var _message=_messages[j];
        if(_message["senderId"]==letterSenderId){
            messageSender=letterSender;
            messageReceiver=letterReceiver;
        }else{
            messageSender=letterReceiver;
            messageReceiver=letterSender;
        }
       listMessage(_message,messageSender,messageReceiver);
   }

}
/*展示每条消息*/
function listMessage(_message,_sender,_receiver) {
    // var _date = new Date(parseInt(_message["timestamp"])).toLocaleDateString();
    var _date=_message["timestamp"].substring(0,10);
    var _time=_message["timestamp"].substring(11,16)
    var messageInfo="<p class=\"dynamic\" class='address-from'>亲爱的"+_receiver+"：</p>\n" +
        "        <textarea class=\"letterdef-from\">"+_message["content"]+"</textarea>\n" +
        "        <p class=\"dynamic\"id=\"sender-from\">"+_sender+"</p>\n" +
        "        <p class=\"dynamic\"id=\"time-from\">"+_date+"</p>" +
        "<p class=\"dynamic\"id=\"time-from\">"+_time+"</p>";
    $("#messagesInfo").append(messageInfo);
}

function turnToReply() {
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var letterId=decodeURI(loc.substr(n2+1,n1-n2-9));
    location.href="letter-reply.html?"+"letterId="+encodeURI(letterId);
}

function replyMessage () {
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var letterId=decodeURI(loc.substr(n2+1,n1-n2));
    var contentString=document.getElementById("letterdef-to1").value;
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
        url: sentMessageURL,
        type: "POST",
        data:{
            letterId:letterId,
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