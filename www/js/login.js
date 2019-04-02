
/*登陆*/
function login() {
    var username= $("#login-account").val();
    var password =$("#login-password").val();
    $.ajax({
        url: loginURL,
        type: "POST",
        data:{
            username:username,
            password:password,
        },
        dataType: 'json',
        crossDomain: true,
        xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(data) {
            localStorage.setItem("userInfo",JSON.stringify(data));
            location.href="index.html";
        },
        error: function() {
            mui.alert("账户或密码错误")
        }
    });
}
/*注册*/
function addUser() {
    var username=$("#reg-account").val();
    var password=$("#reg-password").val();
    var password1=$("#reg-password-confirm").val();
    if (password!=password1){
        mui.alert("密码不一致！");
        return;
    }
    var gender="0";
    var email=$("#reg-email").val();

    $.ajax({
        url: addUserURL,
        type: "POST",
        data:{
            username:username,
            password:password,
            gender :gender,
            email :email
        },
        dataType: 'json',
        crossDomain: true,
        xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(data) {
            // alert(JSON.stringify(data)),
            if (data.toString()=="true"){
                mui.alert("注册成功");
                location.href="login.html";
            }
            else{   mui.alert("用户已经存在")
                return ;}
        },
        error: function() {
            mui.alert("注册失败");
        }
    });

}
