//////////////////////////////////////////初始化加载 关闭或打开各种控件方法  2024/04/15
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
// 使用示例
if (isMobileDevice()) {
    console.log('用户是移动设备');
} else {
    console.log('用户是PC设备');
}
console.log('显示区域宽', window.innerWidth);
console.log('显示区域高', window.innerHeight);
const screenWidth = window.screen.width; // 获取屏幕宽度
const screenHeight = window.screen.height; // 获取屏幕高度
console.log('屏幕分辨率', screenWidth);
console.log('屏幕分辨率', screenHeight);
if (window.innerWidth < (window.innerHeight)) {
    console.log("当前为竖屏设备");
    Device_Type = 1
} else if (window.innerWidth > window.innerHeight) {
    console.log("当前为横屏设备");
    Device_Type = 0
}
window.addEventListener("orientationchange", function () {
    if (window.orientation === 90) {
        console.log('已切换横屏')
    }
    if (window.orientation === 0) {
        console.log('已切换竖屏')
    }
    location.replace(location)
}, false);

//登陆组件
var loginbox = document.querySelector('.loginbox')
var login_username = document.querySelector('.login_username')
var login_password = document.querySelector('.login_password')
var register_button = document.querySelector('.register_button')
var password_button = document.querySelector('.password_button')

var login_button = document.querySelector('.login_button')
var place_username = document.querySelector('.place_username')
var place_password = document.querySelector('.place_password')
var local_username = localStorage.getItem('local_username');
var local_password = localStorage.getItem('local_password');


//聊天组件
var chat_dialog_box = document.querySelector('.chat_dialog_box');
var chat_dialog_box_panel = document.querySelector('.chat_dialog_box_panel');




//点击眼睛按钮 查看密码
var password_button_num = 1
password_button.onclick = () => {
    if (password_button_num == 1) {
        login_password.type = `text`
        password_button_num = 2
    } else {
        login_password.type = `password`
        password_button_num = 1
    }
}
//临时不需要登录
var currentTimestamp = new Date().getTime(); // 获取当前时间戳
var targetTimestamp = 1712287706000; // 目标时间戳
if (currentTimestamp > targetTimestamp) {

} else {
    // Landing_Page(0)
    // Agree_to_authorize()
}

//是否有本地存储的用户信息
if (local_username) {
    // Add_reminder(`local 本地已有账号信息`)
    login_username.value = local_username
    login_password.value = local_password
    login_terminal(login_username.value, () => {
        Add_reminder(`获取设备成功，开始登录`)
        setTimeout(() => {
            console.log('1---');
            username_password()
        }, 1000)
    })
}


//注册按钮点击事件
register_button.href = `${systemurl}/system?register=${true}`
register_button.onclick = () => {
    //跳转到数据管理系统页面
    window.location.href = `${systemurl}/system?register=${true}`;
}
//登录按钮点击事件
login_button.onclick = () => {
    dlpd()
}
/**
 *  同意用户协议授权后 加载提示
 * @param  null  
 * @returns null
 */
function Agree_to_authorize() {
    if (Guide_Type == 1) {
        var _User_Guide_box = document.createElement('div')
        _User_Guide_box.className = 'User_Guide_box'
        _User_Guide_box.innerHTML = ` 
        <div class="Guide_box">
            <div class="User_Guide_text ">
               小梦，身份证怎么办理
            </div>
            <div class="User_Guide_text ">
               小梦，新生儿上户口怎么办理
            </div>
            <div class="User_Guide_text ">
               小梦，护照怎么办理
            </div>
        </div>`
        document.body.appendChild(_User_Guide_box);
        var _Guide_table = document.createElement('div')
        _Guide_table.className = 'Guide_table'
        _Guide_table.innerHTML = `<span id="Guide_table_text">您可以这样问我<span>`
        document.body.appendChild(_Guide_table);
        var _User_Chat_box = document.createElement('div')
        _User_Chat_box.className = 'User_Chat_box'
        _User_Chat_box.innerHTML = ` <div class='User_Chat_box_data'></div>`
        document.body.appendChild(_User_Chat_box);
        let array = document.querySelectorAll('.User_Guide_text')
        let num = 30 //动画周期s
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            element.style.animationDuration = `${num}s`;;
            if (i > 0) {
                element.style.animationDelay = `-${num / array.length * i}s`;
            }
        }
    }
    if (Chat_Type == 1) {
        chat_dialog_box.style.opacity = 1
    }
}

////////////////////////////////////////////初始化元素大小
function load() {
    // 初始化时打印一次高度值
    if (Device_Type == 0) {

    } else if (Device_Type == 1) {

    }
}
// load()
setTimeout(load, 100)
/**
 * 切换输入框焦点
 * @param  null  
 * @returns null
 */
function handleKeyDown_a(event) {
    if (event.key === 'Tab') {
        login_username.blur();
        login_password.focus();
    }
}
function handleKeyDown_b(event) {
    if (event.key === 'Tab') {
        var select = document.getElementById("dropdown");
        login_password.blur();
        select.focus();
    }
}
function handleKeyDown_c(event) {
    if (event.key === 'Tab') {
        var select = document.getElementById("dropdown");
        var login_button = document.querySelector(".login_button");
        select.blur();
        login_button.focus();
    }
}
function handleKeyDown_d(event) {
    if (event.key === 'Tab') {
        var login_button = document.querySelector(".login_button");
        login_button.blur();
        login_username.focus();
    }
}


//阻止默认的tab事件
document.addEventListener('keydown', function (event) {
    var key = event.keyCode || event.which;
    if (key === 9) {
        // console.log('阻止默认事件');
        event.preventDefault();
        var select = document.getElementById("dropdown");
        if (select === document.activeElement || login_username === document.activeElement || login_password === document.activeElement || login_button === document.activeElement) {
            // console.log("元素已获取焦点");
        } else {
            console.log('都没有就给账号');
            login_username.focus();
        }
    }
});
/**
 * 打开提示框
 * @param  null  
 * @returns null
 */
function User_Guide_box_open() {
    var User_Guide_box = document.querySelector('.User_Guide_box')
    User_Guide_box.style.opacity = 1
}
/**
 * 关闭提示框
 * @param  null  
 * @returns null
 */
function User_Guide_box_close() {
    var User_Guide_box = document.querySelector('.User_Guide_box')
    User_Guide_box.style.opacity = 0
}
/**
 * 打开文字框
 * @param  null  
 * @returns null
 */
function User_Chat_box_open() {
    var User_Chat_box = document.querySelector('.User_Chat_box')
    User_Chat_box.style.opacity = 1
}
/**
 * 关闭文字框
 * @param  null  
 * @returns null
 */
function User_Chat_box_close() {
    console.log('倒计时结束关闭文字框  重置标题');
    clearInterval(Countdown_click_fn);
    var User_Chat_box = document.querySelector('.User_Chat_box')
    User_Chat_box.style.opacity = 0
    var Guide_table = document.querySelector('.Guide_table')
    Guide_table.innerHTML = `<span id="Guide_table_text">您可以这样问我<span>`
    User_Guide_box_open()
}




/**
   * 设置登录页面
   * @param num       参数为0跳过登录 为1需要登录
   * @returns null
*/
function Landing_Page(num) {
    if (num == 0) {
        loginbox.style.cssText = `width:0px; height: 0px;`
    } else if (num == 1) {
        loginbox.style.cssText = `width:100%; height: 100vh;`
    }
}
/**
   * 添加消息提醒
   * @param msg       参数为提醒的文本
   * @returns null
*/
function Add_reminder(msg) {
    var _reminder = document.createElement('div')
    _reminder.className = `reminder`
    _reminder.innerHTML = `<div class="reminder_msg">${msg}</div>`
    playerUI.appendChild(_reminder);
    setTimeout(function () {
        var element = document.querySelector(".reminder");
        element.remove();
    }, 3000);
}
/**
   * 请求发送后，显示转圈等待
   * @param null     
   * @returns null
*/
function send_request() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('loader_cancellation').style.display = 'block';
}
/**
   * 请求完成后，不显示转圈等待
   * @param null
   * @returns null
*/
function complete_request() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('loader_cancellation').style.display = 'none';
}
/**
   * 点击取消发送，不显示转圈等待
   * @param null
   * @returns null
*/
document.getElementById('loader_cancellation').onclick = function () {
    anti_shake('timeId_c', () => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('loader_cancellation').style.display = 'none';
    }, 0)
    anti_shake('timeId_d', () => { }, 0)
}
/**
   * 切换语音唤醒显示
   * @param num 
   * @returns null
*/
function ak(num) {
    var ak_dom = document.querySelector('.ak')
    var ak_img = ak_dom.firstElementChild;
    if (num == 1) {
        ak_dom.classList.add("ak_op");
        ak_img.src = `./imgs/AK1.png`
    } else if (num == 2) {
        ak_img.src = `./imgs/AK2.png`
    } else if (num == 3) {
        ak_img.src = `./imgs/AK3.png`

    }
}

//获取当前时间
function getNowTime() {
    let date = new Date();
    //年 getFullYear()：四位数字返回年份
    let year = date.getFullYear();  //getFullYear()代替getYear()
    //月 getMonth()：0 ~ 11
    let month = date.getMonth() + 1;
    //日 getDate()：(1 ~ 31)
    let day = date.getDate();
    //时 getHours()：(0 ~ 23)
    let hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    let minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    let second = date.getSeconds();
    let time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return time;
}
//小于10的拼接上0字符串
function addZero(s) {
    return s < 10 ? ('0' + s) : s;
}