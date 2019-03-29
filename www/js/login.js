
/*登陆*/
function login() {
    var username= $("#login-account").val();
    var password =$("#login-password").val();
    $.ajax({
        // url: "http://106.14.199.25:8080/login",
        url: "http://127.0.0.1:8080/login",
        type: "POST",
        data:{
            username:username,
            password:password,
            // gender :0,
            // email :"1005256626"
        },
        //106.14.199.25
        dataType: 'json',
        crossDomain: true,
        xhrFields: {withCredentials: true},  //一对“文件名-文件值”在本机设置XHR对象。例如，用它来设置withCredentials为true的跨域请求。 用户固定PHPSESSID不变
        success: function(data) {
            // alert(JSON.stringify(data)),
            location.href="index.html";
        },
        error: function() {
            mui.alert("账户或密码错误")
        }
    });

        // mui.ajax('http://106.14.199.25:8080/login',{
        //
        //     dataType:'json',//服务器返回json格式数据
        //     type:'post',//HTTP请求类型
        //     timeout:10000,//超时时间设置为10秒；
        //     headers:{'Content-Type':'application/json'},
        //     success:function(data){
        //         //服务器返回响应，根据响应结果，分析是否登录成功；
        //         alert("haha")
        //     },
        //     error:function(xhr,type,errorThrown){
        //         //异常处理；
        //         console.log(type);
        //     }
        // });
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
        // url: "http://106.14.199.25:8080//addUser",
        url: "http://127.0.0.1:8080/addUser",
        type: "POST",
        data:{
            username:username,
            password:password,
            gender :gender,
            email :email
        },
        //106.14.199.25
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
