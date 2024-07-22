// 渲染对话消息  展示数据库数据 语音控制  2024/04/15


/**
 *  语音控制 根据语音内容来判断 用户有什么DOM操作 然后进行打开或关闭 上一页 下一页 标签切换等内容
 * @param  msg  传入文字消息
 * @returns null
 */
function voice_control(msg) {
    if (Guide_Type == 1) {
        User_asks_to_change_title(msg)
    }
    if (Chat_Type == 1) {
        Add_Chat_Message_user(msg)
    }
}


//输入框事件
document.addEventListener('keydown', function (e) {
    //按下回车
    if (e.keyCode == 13 || e.code === "Enter" || e.code === "NumpadEnter") {
        dlpd()
    }

})
/**
 *  登录判断 是否清空缓存 是否是选择设备 是否账号密码都有
 * @param  null  
 * @returns null
 */
function dlpd() {
    if (login_username.value == 'qkhc') {
        console.log('清空缓存处理不登录');
        // 清空localStorage缓存
        localStorage.clear();
        // 清空sessionStorage缓存
        sessionStorage.clear();
        login_username.value = ''
        login_password.value = ''
    } else {
        console.log('可以登录');
        if (login_username.value && login_password.value) {
            var select = document.getElementById("dropdown");
            if (select === document.activeElement) {
                console.log("元素已获取焦点");
            } else {
                console.log("元素未获取焦点");
                login_terminal(login_username.value, () => {
                    Add_reminder(`获取设备成功，开始登录`)
                    setTimeout(() => {
                        username_password()
                    }, 1000)
                })
            }
        } else {
            if (login_username.value) {
                place_username.innerHTML = ``
            } else {
                //请输入账号提示
                place_username.innerHTML = `请输入账号`
            }
            if (login_password.value) {
                place_password.innerHTML = ``
            } else {
                //请输入密码提示词
                place_password.innerHTML = `请输入密码`
            }
        }
    }
}

var appendTextToDiv_Interval_fn
/**
 *  回答问题 打字效果
 * @param  element  渲染文字的div
 * @param  text     渲染的文字
 * @returns null
 */
function appendTextToDiv(element, text) {
    let index = 0;
    let num = 180
    let targets = ['1、', '2、', '3、', '4、', '5、', '1.', '2.', '3.', '4.', '5.', '(一', '(二', '(三', '(四', '(五'];
    function appendChar() {
        if (index < text.length) {
            let br = ''
            let target
            if (text[index + 1]) {
                target = text[index] + text[index + 1]
            }
            if (targets.includes(target)) {
                br = '<br>';
            }
            element.innerHTML += br + text[index];
            index++;
            var height = element.clientHeight
            var parent_height = element.parentElement.clientHeight
            if (height > parent_height) {
                element.parentElement.scrollTop = height - parent_height;
            }

        } else {
            clearInterval(appendTextToDiv_Interval_fn);
        }
        anti_shake('timeId_b', User_Chat_box_close, 10000)
    }
    clearInterval(appendTextToDiv_Interval_fn);
    appendTextToDiv_Interval_fn = setInterval(appendChar, num);
    User_Guide_box_close()
    User_Chat_box_open()
}
function dz(msg) {
    if (Guide_Type == 1) {
        var User_Chat_box_data = document.querySelector('.User_Chat_box_data')
        User_Chat_box_data.innerHTML = ``
        appendTextToDiv(User_Chat_box_data, msg)
    }
    if (Chat_Type == 1) {

        Add_Chat_Message_Digital_Human(msg)
    }
}

/**
 *  用户提问换标题
 * @param  msg_txt  传入文字消息
 * @returns null
 */
function User_asks_to_change_title(msg_txt) {
    // console.log(msg_txt);
    var Guide_table = document.querySelector('.Guide_table')
    let msg_data = handleStr(msg_txt);
    // console.log(msg_data);
    Guide_table.innerHTML = `<span id='Guide_table_text'>${msg_data}<span>`
    Text_scrolling()
    // anti_shake('timeId_b', User_Chat_box_close, 30000)
}
var Countdown_click_fn
/**
 *  用户提问标题很长  内容滚动
 * @param  null  
 * @returns null
 */
function Text_scrolling() {
    let num = 0
    let Guide_table_text = document.getElementById('Guide_table_text');
    let width = Guide_table_text.offsetWidth
    let parent_width = Guide_table_text.parentElement.offsetWidth
    let Width_difference = width - parent_width
    if (Width_difference > 1) {
        clearInterval(Countdown_click_fn);
        Countdown_click_fn = setInterval(() => {
            if (num > Width_difference + 10) {
                //或者 清零 重新开始
                Guide_table_text.parentElement.scrollLeft = 0
                num = 0
            }
            if (width > parent_width) {//如果文本长度大于容器就滚动
                Guide_table_text.parentElement.scrollLeft += 1;
            }
            num += 1
        }, 100);
    }
}
/**
 *  字符串去掉标点符号后 返回
 * @param  str 字符串  
 * @returns null
 */
function handleStr(str) {
    var arr = str.replace(/[`:_.~!@#$%^&*() \+ =<>?"{}|, \/ ;' \\ [ \] ·~！@#￥%……&*（）—— \+ ={}|《》？：“”【】、；‘’，。、]/g, '');
    return arr
}

//向聊天对话框中添加用户消息
function Add_Chat_Message_user(msg) {
    //获取到对话框
    var chat_dialog_panel = document.querySelector('.chat_dialog_panel')
    //创建用户消息容器
    var _chat_messages_b = document.createElement('div');
    //添加两个类名
    _chat_messages_b.className = "chat_messages_b"
    //编辑用户消息的html元素
    _chat_messages_b.innerHTML = `user: ${msg}`
    chat_dialog_panel.appendChild(_chat_messages_b);
    parent_top()
}
//向聊天对话框中添加数字人文字消息
function Add_Chat_Message_Digital_Human(msg) {
    let targets = ['1、', '2、', '3、', '4、', '5、', '6、', '7、', '8、', '9、', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '(一', '(二', '(三', '(四', '(五', '(六', '(七', '(八', '(九'];
    let newStr = '';
    for (let i = 0; i < msg.length; i++) {
        if (msg[i + 1]) {
            let target = msg[i] + msg[i + 1];
            if (targets.includes(target)) {
                newStr += '<br>';
            }
        }
        newStr += msg[i];
    }
    //获取聊天对话框内容容器
    var chat_dialog_panel = document.querySelector('.chat_dialog_panel')
    //创建数字人消息容器
    var _chat_messages_a = document.createElement('div');
    _chat_messages_a.className = "chat_messages_a"
    _chat_messages_a.innerHTML = `${human_name}: ${newStr}`
    chat_dialog_panel.appendChild(_chat_messages_a);
    parent_top()
}

function parent_top() {
    var chat_messages_a_arr = document.querySelectorAll('.chat_messages_a')
    var chat_messages_b_arr = document.querySelectorAll('.chat_messages_b')
    ele_remove(chat_messages_a_arr)
    ele_remove(chat_messages_b_arr)
}
function ele_remove(arr) {
    // 使用slice()方法获取除了最后两个元素之外的所有元素的子数组
    var elementsToRemove = Array.prototype.slice.call(arr, 0, -2);
    elementsToRemove.forEach(function (element) {
        element.parentNode.removeChild(element);
    });
}
