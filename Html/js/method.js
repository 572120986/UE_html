/////////////////////////// 全局方法  登录请求  2024/04/15
/**
 * 防抖函数  规定时间内   再次触发会重置倒计时
 * @param  timeId    定义一个变量 用于绑定计时器
 * @param  fn        要执行的方法
 * @param  time      倒计时时间(毫秒)
 * @returns null
 */
window.anti_shake = (timeId, fn, time) => {
    clearTimeout(window[timeId])
    window[timeId] = setTimeout(() => {
        if (fn instanceof Function) {
            fn()
        } else {
            console.log('fn不是一个函数');
        }
    }, time)
}

/**
 *  封装ajax 请求
 * @param  url  地址
 * @param  method  请求方法 GET/POST/PUT/DELETE
 * @param  data  内容
 * @param  successCallback  成功回调函数
 * @param  errorCallback  失败回调函数
 * @param  num  延迟发送时间
 * @returns null
 */
var xhr = new XMLHttpRequest();
function ajaxRequest(url, method, data, successCallback, errorCallback, num) {
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (method === 'GET') {

    } else if (method === 'POST') {
        data = JSON.stringify(data);
    } else if (method === 'PUT') {
        data = JSON.stringify(data);
    } else if (method === 'DELETE') {

    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            anti_shake('timeId_d', () => { }, 0)
            complete_request()
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText)
                successCallback(response);
            } else {
                errorCallback(xhr.statusText);
            }
        }
    };
    // console.log(num + '发送');
    anti_shake('timeId_c', () => {
        // console.log('发送');
        xhr.send(data);
    }, num)
    anti_shake('timeId_d', () => {
        xhr.abort();
        Add_reminder(`请求超时，未连接到服务，请检查网络`)
    }, 10000)

}

/**
 *  用户 登 录 请求
 * @param  null
 * @returns null
 */
function username_password() {
    // Landing_Page(0)
    // Agree_to_authorize()
    // return

    //这里在登录时保存一下这次选择那个设备
    var select = document.getElementById("dropdown");
    var select_val = select.options[select.selectedIndex].value;
    console.log("选中的option值为： " + select_val);
    if (select_val == '请选择设备') {

    } else {
        localStorage.setItem('local_select', select_val);
    }

    if (login_username.value && login_password.value) {
        let userip = localStorage.getItem("local_userip");
        let data = {
            username: login_username.value,
            password: login_password.value,
            userip: userip,
            terminal_id: select_val
        }
        console.log(data);
        ajaxRequest(systemurl + '/login', 'POST', data, function (response) {
            res = response
            // console.log(res);
            if (res.code == 200) {
                login_Type = 1
                localStorage.setItem("local_userid",res.data.userid);
                localStorage.setItem("local_rootid", res.data.rootid);
                localStorage.setItem('local_username', login_username.value);
                localStorage.setItem('local_password', login_password.value);
                Landing_Page(0)
                Agree_to_authorize()
                login_username.value = ''
                login_password.value = ''
                on_line_Interval_fn = setInterval(on_line, 10000)
                //登录成功后，根据rootid  请求数据
                lmkb(res.data.userid)
            } else {
                console.log(`登陆失败`, res);
                Add_reminder(`登陆失败:${res.msg}`)
                if (res.msg == "使用权限已到期") {
                    Add_reminder(`使用权限已到期,请联系售后人员`)
                }
            }
        }, function (error) {
            console.log(`未连接服务,或服务出错`, error);
            Add_reminder(`未连接服务,或服务出错`)
        }, 2000)
        send_request();
    }
}

/**
 *  用户配置信息请求
 * @param  null
 * @returns null
 */
function lmkb(userid) {

    ajaxRequest(systemurl + '/lmkb?userid='+userid, 'GET', null, function (response) {
        res = response
        if (res.code == 200) {
            console.log(res.data);
            lmkb_data = res.data
            cfg_data = res.cfg_obj
        } else {
            console.log(`请求失败`, res);
        }
    }, function (error) {
        console.log(`未连接服务,或服务出错`, error);
        Add_reminder(`未连接服务,或服务出错`)
    }, 0)
    send_request();

}

/**
 *  向后台发送下线请求
 * @param null  
 * @returns null
 */
function logout() {
    if (login_Type == 1) {
        var select_value = localStorage.getItem('local_select');
        let userip = localStorage.getItem("local_userip");
        let local_username = localStorage.getItem("local_username");
        let userid = localStorage.getItem("local_userid");
        if (local_username) {
            //这里的请求无需做处理，响应返回前网页已关闭
            ajaxRequest(systemurl + '/logout', 'POST', {
                username: `${local_username}`,
                userid,
                userip,
                terminal_id: select_value
            }, function (response) {
            }, function (error) {
            }, 0)
        }
    }
}
window.onbeforeunload = function () {//刷新和关闭时都会触发
    logout()
};

/**
 *  获取本地ip
 * @param  null  
 * @returns null
 */
function getLocalIP(callback) {
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
    pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) return;
        const localIP = ice.candidate.candidate.split(' ')[4];
        callback(localIP);
        pc.close();
    };
}
getLocalIP((ip) => {
    console.log(`本地IP地址:${ip}`)
    localStorage.setItem("local_userip", ip);
});
/**
 *  获取公网ip
 * @param  null  
 * @returns null
 */
function getUserIP(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", "https://api.ipify.org?format=json", true);
    xhr.send();
}
getUserIP(function (ip) {
    console.log("用户的公网IP地址是:", ip);
});

/**
 *  向后台发送在线请求
 * @param null  
 * @returns null
 */
function on_line() {
    var select_value = localStorage.getItem('local_select');
    let userip = localStorage.getItem("local_userip");
    let local_username = localStorage.getItem("local_username");
    let userid = localStorage.getItem("local_userid");
    if (userip && local_username && userid) {
        //这里的请求无需做处理，
        ajaxRequest(systemurl + '/on_line', 'POST', {
            username: `${local_username}`,
            userid,
            userip,
            terminal_id: select_value
        }, function (response) {

        }, function (error) {
        }, 0)
    }
}
/**
 * 获取设备
 * @param  val 用户账号  
 * @returns null
 */
function login_terminal(val, fn) {
    let fun = false
    ajaxRequest(systemurl + '/login_terminal', 'POST', { username: val }, function (response) {
        res = response
        if (res.code == 200) {
            console.log(res.data);
            // 定义一个数组，用于存储下拉菜单的选项数据
            var data = res.data;
            // 获取<select>标签
            var dropdown = document.getElementById('dropdown');
            while (dropdown.firstChild) {
                dropdown.removeChild(dropdown.firstChild);
            }
            // 使用for循环遍历数组，为每个数组元素创建一个<option>标签，并将其添加到<select>标签中
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement('option');
                option.value = data[i].terminal_id;
                option.text = data[i].terminal_name;
                dropdown.add(option);
            }
            var select_value = localStorage.getItem('local_select');
            if (select_value) {
                if (select_value == '请选择设备') {

                } else {
                    // 遍历所有选项
                    for (var i = 0; i < dropdown.options.length; i++) {
                        // 如果选项的值为123
                        if (dropdown.options[i].value == select_value) {
                            // 设置该选项为默认选中
                            dropdown.options[i].selected = true;
                            // 设置默认选中的选项值
                            // dropdown.value = "123";
                            break;
                        }
                    }
                }
            }
            fun = fn
            // console.log(fun);
            if (fun) {
                fun()
            } else {
                // Add_reminder(`请输入密码`)
            }

        } else {
            Add_reminder(`${res.msg}`)

        }
    }, function (error) {
        Add_reminder(`${error}`)
    }, 10)
    send_request();
}