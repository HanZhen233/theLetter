
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
            localStorage.removeItem("letters");
            location.href="index.html";
        },
        error: function() {
            mui.alert("账号或密码错误")
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
    var gender=$("input[name='radio1']:checked").val();
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
                location.href="login.html";
                mui.toast("注册成功");
            }
            else{   mui.alert("用户已经存在")
                return ;}
        },
        error: function() {
            mui.alert("注册失败");
        }
    });

}
function logout() {
    // localStorage.removeItem("userInfo");
    $.ajax({
        url: logoutURL,
        type: "GET",
        crossDomain: true,
        // xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(_data) {
            location.href="login.html";
        },
        error: function() {
            alert("网络错误")
        }
    });


    
}