///////////////////////////全局变量   2024/04/15

/**
 * 全局变量
 * @domain                        域名 
 * @httpurl                       数字人对话服务地址
 * @systemurl                     数据库服务地址
 * @Guide_Type                    提示词开关(1是开启，0是关闭)
 * @Chat_Type                     对话开关(1是开启，0是关闭)
 * @Device_Type                   设备类型(1是竖屏，0是横屏)
 * @login_Type                    登录状态(1是已登录，0是未登录)
 * @on_line_Interval_fn           定时器(定时发送在线状态)
 * @lmkb_data                     用户配置大模型数据
 * @cfg_data                      用户配置形象数据
 * @human_name                    数字人名称
 */
// 全局变量示例
var domain = '192.168.31.177'
var systemurl = 'http://218.17.7.21:2702'
var Guide_Type = 0
var Chat_Type = 1
var Device_Type = 0
var login_Type = 0
var on_line_Interval_fn
var lmkb_data = false
var cfg_data = false
var human_name = `bot`;



