// ==UserScript==
// @name         CSDN 去广告沉浸阅读模式
// @namespace    http://tampermonkey.net/
// @version      3.0.14
// @license      GPL-3.0
// @description  沉浸式阅读 🌈 使用随机背景图片 🎬 重构页面布局 🎯 净化剪切板 🎨 屏蔽一切影响阅读的元素 🎧
// @description  背景图片取自 https://www.baidu.com/home/skin/data/skin
// @icon         https://avatar.csdn.net/D/7/F/3_nevergk.jpg
// @author       SublimeCT
// @note         v3.0.14 修复文章内容部分显示多余的 margin-right 的问题; 修复文章顶部多余高度的问题
// @note         v3.0.13 修复与 dark reader 一起使用时背景图片被遮挡的问题; 修复目录高度异常导致的无法滚动的问题
// @note         v3.0.12 隐藏文章左侧顶部的推广, 隐藏右下角工的提问元素
// @note         v3.0.11 隐藏文章底部的创作提示框及提问推广元素
// @note         v3.0.10 隐藏文章底部和右下角工具栏中影响阅读的提示元素; 修复原文链接图标位置样式; 更新设置弹窗中的按钮样式
// @note         v3.0.9  隐藏右下角登录提示弹窗
// @note         v3.0.8  移除包含黑色样式的 skin css 文件; 固定背景图始终覆盖可视区域显示
// @note         v3.0.7  修复复制功能无法使用的问题
// @note         v3.0.6  自动展开被折叠的代码块内容
// @note         v3.0.5  将设置按钮图标替换为 SVG; 修复部分失效样式; 增加右下角广告屏蔽规则
// @note         v3.0.4  文中代码块解除选择禁用
// @note         v3.0.3  文章正文底部作者信息 footer fixed 定位改回 relative; 屏蔽打赏 box
// @note         v3.0.2  增加红包入口浮窗屏蔽规则
// @note         v3.0.1  增加目录是否存在的判断, 只在存在文章目录时才显示, 避免显示空白 sidebar 的问题
// @note         v3.0.0  增加目录显示功能, 修复 `firefox` 下 `fixed` 定位失效的问题
// @note         v2.7.7  屏蔽小店模块, 修复 bbs.csdn.net 下的样式问题, 感谢 `独自等待` 的反馈
// @note         v2.7.6  修复某些页面复制按钮依然显示登陆后复制的问题, 感谢 `JayYoung2021` 的反馈
// @note         v2.7.5  修复未登录状态下某些页面的一键复制无法使用的问题
// @note         v2.7.4  显示一键复制按钮, 未登录时已将登录后复制改为一键复制
// @note         v2.7.3  修改 interceptCSDN 中 `csdn` 取值逻辑, 修复刷新背景图片时图片名称不变的问题
// @note         v2.7.2  移除外链拦截行为; 增加部分元素的过渡效果;
// @note         v2.7.1  修复文章宽度 `<1320px` 时宽度设置无效的问题
// @note         v2.7.0  增加隐藏底部推荐文章和 footer 信息功能; 屏蔽 csdn skin css 文件; 修复设置弹窗 HTML 语法错误导致的标签解析异常;
// @note         v2.6.3  屏蔽 red pack 全屏红包广告
// @note         v2.6.2  屏蔽一键三连 tips, 屏蔽文章列表中的 `.recommend-item-box.type_other` 广告
// @note         v2.6.1  增加文章宽度设置, 引入 round-slider 组件
// @note         v2.6.0  增加纯色背景设置功能, 引入 a color picker 组件; 增加刷新背景图片功能; 增加设置弹窗内按钮样式
// @note         v2.5.10 修复在内容区时显示横向滚动条的问题, 修复原文链接的贪婪匹配(href)问题
// @note         v2.5.9  可以设置是否显示原文链接, 修复设置弹窗无法关闭的 bug, 调整评论区透明度并增加 hover 效果
// @note         v2.5.8  增加原文链接(从顶部折叠栏或文中提取原文链接), 显示在顶部 info-box 中; 屏蔽固定在页面底部的 toolbox; 底部作者信息右侧按钮只显示关注; 评论区输入框交叉轴对齐
// @note         v2.5.7  防止文章内容被黑白化处理(文中的图片被灰度处理后严重影响阅读), 适用于特殊日期; *2020-04-04 向疫情中付出努力的所有医务工作者及志愿者致敬!*
// @note         v2.5.6  覆盖所有 media query 样式以防止原有的自适应样式导致布局错乱; 评论区评论内容强制换行以保持一致性
// @note         v2.5.5  监听数据层变化并控制分页组件显示; 优化评论区样式
// @note         v2.5.4  显示评论列表分页组件; 继续更新广告屏蔽规则
// @note         v2.5.3  更新文章内容区域顶部的巨幅广告图屏蔽规则
// @note         v2.5.2  屏蔽 **的顶部巨幅广告图; 隐藏底部 more-toolbox 按钮组; 修改脚本描述
// @note         v2.5.1  修改正文底部 私信求帮助 按钮样式, 使其仅在 hover 状态下可见, 屏蔽底部 copyright 和 原皮肤信息
// @note         v2.5.0  增加 iteye.com 样式兼容, 使用 GM_setValue 实现跨域共享本地存储数据
// @note         v2.4.1  修复设置弹窗在特定页面下的宽度异常问题, 增加底部推荐文章 hover 效果
// @note         v2.4.0  增加隐藏设置按钮选项; 修复自定义链接取值错误的问题
// @note         v2.3.0  显示当前背景图名称, 完善自定义图片; 删除 `最近使用` 图片类目
// @note         v2.2.1  屏蔽 side toolbar 中的广告 icon
// @note         v2.2.0  增加设置入口 icon timeout
// @note         v2.1    修改脚本加载时机, 不会再出现先加载广告后屏蔽的情况了
// @note         v2.0    增加背景图设置入口按钮, 扩展 bottom tool bar
// @note         v1.11   更新 bbs.csdn.net 过滤规则; 增加底部 "底线" 描述
// @note         v1.10   增加 ask.csdn.net 支持
// @note         v1.9    解除跳转拦截; 增加新的广告过滤规则
// @note         v1.8    移除点击文章中的链接拦截, 直接跳转到目标链接, 建议使用鼠标中键在新窗口打开链接!; 更新右侧 toolkit 按钮组的屏蔽规则
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://*.blog.csdn.net/article/details/*
// @require      https://unpkg.com/a-color-picker@1.2.1/dist/acolorpicker.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/round-slider@1.6.1/dist/roundslider.min.js
// @include      https://bbs.csdn.net/topics/*
// @include      https://*.iteye.com/blog/*
// @include      https://*.iteye.com/news/*
// @include      https://ask.csdn.net/questions/*
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @run-at       document-start
// @match        <$URL$>
// ==/UserScript==

(function () {
    'use strict';
    (() => {
        // 爬到的所有现在可访问的背景图ID
        // const IMG_CATEGORYS = { "热门": [887, 886, 883, 882, 881, 880, 879, 878, 877, 876, 874, 875, 872, 873, 859, 832, 833, 834, 827, 828, 829, 830, 831, 817, 818, 819, 820, 821, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 796, 797, 798, 799, 800, 801, 802, 803, 804, 776, 777, 778, 781, 784, 765, 767, 768, 766, 611, 610, 608, 720], "冒险岛2": [860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871], "守望先锋": [835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846], "魔兽世界": [721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732], "炉石传说": [733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744], "风暴英雄": [660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671], "暗黑破坏神Ⅲ": [672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683], "星际争霸II": [684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695], "冷兔": [749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760], "阿狸": [521, 114, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532], "炮炮兵": [540, 534, 535, 536, 537, 538, 539, 533, 541, 542, 543, 544], "林心如": [437, 438, 440, 439, 441, 443, 447, 444, 445, 446, 442, 448], "郑爽": [509, 510, 511, 512, 515, 514, 513, 516, 517, 518, 519, 520], "戚薇": [449, 456, 451, 452, 453, 454, 455, 450, 457, 459, 458, 460], "佟丽娅": [485, 486, 490, 488, 489, 487, 491, 492, 493, 494, 495, 496], "Angelababy": [400, 401, 402, 403, 407, 405, 406, 410, 404, 409, 408, 411], "唐嫣": [473, 474, 475, 482, 480, 478, 479, 477, 476, 481, 483, 484], "李冰冰": [424, 425, 427, 430, 426, 429, 428, 431, 432, 433, 434, 435], "高圆圆": [412, 413, 418, 415, 416, 417, 414, 419, 420, 421, 422, 423], "孙俪": [461, 462, 463, 464, 471, 466, 468, 467, 469, 470, 465, 472], "姚晨": [497, 498, 499, 506, 502, 501, 503, 504, 505, 507, 500, 508], "杨幂": [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211], "刘诗诗": [273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283], "胡歌": [260, 261, 262, 263, 628, 629, 630, 631, 268, 269, 270, 271], "邓紫棋": [320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331], "赵丽颖": [249, 2481, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259], "马天宇": [284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295], "陈晓": [233, 225, 226, 227, 228, 229, 230, 231, 232, 224, 234, 235], "陈伟霆": [308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319], "柳岩": [236, 2371, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247], "吴奇隆": [297, 298, 299, 300, 301, 302, 304, 296, 305, 306, 307], "风景": [822, 823, 824, 825, 826, 54, 62, 5, 37, 115, 116, 117, 118, 120, 122, 123, 49, 25, 121, 26, 43, 45, 48, 51, 70, 4, 10, 11, 17, 23, 6, 28, 38, 16, 31, 42, 163, 164, 165, 166, 167, 168, 170, 171, 172, 174, 175, 177, 178, 179, 180, 181, 182, 184, 185, 186, 69, 57, 13, 67], "简约": [12, 111, 114, 53, 27, 33, 41, 35, 2, 14, 44, 21, 36, 8, 150, 125, 1, 169, 173, 176, 183, 46, 61, 47, 52, 64, 24, 58, 18, 59, 55, 9, 20], "小清新": [74, 71, 113, 119, 124, 29, 65, 32, 34, 39, 40, 50, 60, 73, 30, 63, 126, 128, 66, 19, 112, 22, 68, 7, 15, 3, 56] }
        // const IMG_MAP = { "1": "原野 全景图片", "2": "银汉迢迢 全景图片", "3": "紫色郁金香 百度相册", "4": "飞瀑如练 全景图片", "5": "梦里水乡 探摄小子", "6": "长天一色 全景图片", "7": "春意浓 sprint207", "8": "暮色四合 探摄小子", "9": "出水芙蓉 探摄小子", "10": "壁立千仞 全景图片", "11": "廊桥遗梦 探摄小子", "12": "寥落星河 全景图片", "13": "层林尽染 全景图片", "14": "晨曦 探摄小子", "15": "早梅争春 探摄小子", "16": "千山雪 刘霄", "17": "海之梦 全景图片", "18": "白色飞羽 sprint207", "19": "在路上 jesse2young", "20": "锦鲤 sprint207", "21": "雨夜 yunxiaoqian", "22": "水墨江南 戈斯拉918", "23": "城市之光 戈斯拉918", "24": "三叶草 wanzathe", "25": " 全景图片", "26": " 全景图片", "27": " 全景图片", "28": " 全景图片", "29": " 全景图片", "30": " 全景图片", "31": " 全景图片", "32": " 全景图片", "33": " 全景图片", "34": " 全景图片", "35": " 全景图片", "36": " 全景图片", "37": " 全景图片", "38": " 全景图片", "39": " 全景图片", "40": " 全景图片", "41": " 全景图片", "42": " 全景图片", "43": " 全景图片", "44": " 全景图片", "45": " 全景图片", "46": " 全景图片", "47": " 全景图片", "48": " 全景图片", "49": " 全景图片", "50": " 全景图片", "51": " 全景图片", "52": " 全景图片", "53": " ranklau", "54": " silsnow", "55": " weifengqingyu", "56": " 张云洁01", "57": " tiffanywangbei", "58": " ying_ok_delang", "59": " sherry_dundun", "60": " 源形毕露", "61": " 路璐", "62": " richard-wang", "63": " 源形毕露", "64": " 圣名若瑟", "65": " 米壹映画", "66": " 米壹映画", "67": " 路璐", "68": " 路璐", "69": " 毛嘉文", "70": " richard-wang", "71": " fish,胡子鱼", "73": " fish,胡子鱼", "74": " fish,胡子鱼", "111": " 全景图片", "112": " fish，胡子鱼", "113": " fish，胡子鱼", "114": " 全景图片", "115": " 彼岸Claire", "116": " 落绪纷飞", "117": " 魔神咒", "118": " lemonchen07", "119": " 决明", "120": " 长老亮", "121": " 蓝月玩转西部", "122": " 小pie", "123": " woodfishbbi", "124": " 早川", "125": "波涛汹涌 全景", "126": "火车飞驰 全景", "128": "演唱会 全景", "150": "激情世界杯 ", "163": " shenmishashou", "164": " 我叫孟夕", "165": " 穷游晓明", "166": " 1024小虎牙", "167": " shenmishashou", "168": " shenmishashou", "169": " 0535xiaoyudi", "170": " 穷游晓明", "171": " 西西里玩不停", "172": " 西西里玩不停", "173": " 1024小虎牙", "174": " shenmishashou", "175": " 穷游晓明", "176": " 1024小虎牙", "177": " 我叫孟夕", "178": " 1024小虎牙", "179": " shenmishashou", "180": " 西西里玩不停", "181": " 我叫孟夕", "182": " 蓝色呓语", "183": " 西西里玩不停", "184": " 西西里玩不停", "185": " 我叫孟夕", "186": " 西西里玩不停", "200": "杨幂0", "201": "杨幂1", "202": "杨幂2", "203": "杨幂3", "204": "杨幂4", "205": "杨幂5", "206": "杨幂6", "207": "杨幂7", "208": "杨幂8", "209": "杨幂9", "210": "杨幂10", "211": "杨幂11", "224": "陈晓9", "225": "陈晓1", "226": "陈晓2", "227": "陈晓3", "228": "陈晓4", "229": "陈晓5", "230": "陈晓6", "231": "陈晓7", "232": "陈晓8", "233": "陈晓0", "234": "陈晓10", "235": "陈晓11", "236": "柳岩0", "238": "柳岩2", "239": "柳岩3", "240": "柳岩4", "241": "柳岩5", "242": "柳岩6", "243": "柳岩7", "244": "柳岩8", "245": "柳岩9", "246": "柳岩10", "247": "柳岩11", "249": "赵丽颖0", "250": "赵丽颖2", "251": "赵丽颖3", "252": "赵丽颖4", "253": "赵丽颖5", "254": "赵丽颖6", "255": "赵丽颖7", "256": "赵丽颖8", "257": "赵丽颖9", "258": "赵丽颖10", "259": "赵丽颖11", "260": "胡歌0", "261": "胡歌1", "262": "胡歌2", "263": "胡歌3", "268": "胡歌8", "269": "胡歌9", "270": "胡歌10", "271": "胡歌11", "273": "刘诗诗0", "274": "刘诗诗1", "275": "刘诗诗2", "276": "刘诗诗3", "277": "刘诗诗4", "278": "刘诗诗5", "279": "刘诗诗6", "280": "刘诗诗7", "281": "刘诗诗8", "282": "刘诗诗9", "283": "刘诗诗10", "284": "马天宇0", "285": "马天宇1", "286": "马天宇2", "287": "马天宇3", "288": "马天宇4", "289": "马天宇5", "290": "马天宇6", "291": "马天宇7", "292": "马天宇8", "293": "马天宇9", "294": "马天宇10", "295": "马天宇11", "296": "吴奇隆7", "297": "吴奇隆0", "298": "吴奇隆1", "299": "吴奇隆2", "300": "吴奇隆3", "301": "吴奇隆4", "302": "吴奇隆5", "304": "吴奇隆6", "305": "吴奇隆8", "306": "吴奇隆9", "307": "吴奇隆10", "308": "陈伟霆0", "309": "陈伟霆1", "310": "陈伟霆2", "311": "陈伟霆3", "312": "陈伟霆4", "313": "陈伟霆5", "314": "陈伟霆6", "315": "陈伟霆7", "316": "陈伟霆8", "317": "陈伟霆9", "318": "陈伟霆10", "319": "陈伟霆11", "320": "邓紫棋0", "321": "邓紫棋1", "322": "邓紫棋2", "323": "邓紫棋3", "324": "邓紫棋4", "325": "邓紫棋5", "326": "邓紫棋6", "327": "邓紫棋7", "328": "邓紫棋8", "329": "邓紫棋9", "330": "邓紫棋10", "331": "邓紫棋11", "400": "Angelababy0", "401": "Angelababy1", "402": "Angelababy2", "403": "Angelababy3", "404": "Angelababy8", "405": "Angelababy5", "406": "Angelababy6", "407": "Angelababy4", "408": "Angelababy10", "409": "Angelababy9", "410": "Angelababy7", "411": "Angelababy11", "412": "高圆圆0", "413": "高圆圆1", "414": "高圆圆6", "415": "高圆圆3", "416": "高圆圆4", "417": "高圆圆5", "418": "高圆圆2", "419": "高圆圆7", "420": "高圆圆8", "421": "高圆圆9", "422": "高圆圆10", "423": "高圆圆11", "424": "李冰冰0", "425": "李冰冰1", "426": "李冰冰4", "427": "李冰冰2", "428": "李冰冰6", "429": "李冰冰5", "430": "李冰冰3", "431": "李冰冰7", "432": "李冰冰8", "433": "李冰冰9", "434": "李冰冰10", "435": "李冰冰11", "437": "林心如0", "438": "林心如1", "439": "林心如3", "440": "林心如2", "441": "林心如4", "442": "林心如10", "443": "林心如5", "444": "林心如7", "445": "林心如8", "446": "林心如9", "447": "林心如6", "448": "林心如11", "449": "戚薇0", "450": "戚薇7", "451": "戚薇2", "452": "戚薇3", "453": "戚薇4", "454": "戚薇5", "455": "戚薇6", "456": "戚薇1", "457": "戚薇8", "458": "戚薇10", "459": "戚薇9", "460": "戚薇11", "461": " 陈漫", "462": "孙俪1", "463": "孙俪2", "464": "孙俪3", "465": "孙俪10", "466": "孙俪5", "467": "孙俪7", "468": " 陈漫", "469": " 陈漫", "470": "孙俪9", "471": "孙俪4", "472": "孙俪11", "473": "唐嫣0", "474": "唐嫣1", "475": "唐嫣2", "476": "唐嫣8", "477": "唐嫣7", "478": "唐嫣5", "479": "唐嫣6", "480": "唐嫣4", "481": "唐嫣9", "482": "唐嫣3", "483": "唐嫣10", "484": "唐嫣11", "485": "佟丽娅0", "486": "佟丽娅1", "487": "佟丽娅5", "488": "佟丽娅3", "489": "佟丽娅4", "490": "佟丽娅2", "491": "佟丽娅6", "492": "佟丽娅7", "493": "佟丽娅8", "494": "佟丽娅9", "495": "佟丽娅10", "496": "佟丽娅11", "497": "姚晨0", "498": "姚晨1", "499": "姚晨2", "500": "姚晨10", "501": "姚晨5", "502": "姚晨4", "503": "姚晨6", "504": "姚晨7", "505": "姚晨8", "506": "姚晨3", "507": "姚晨9", "508": "姚晨11", "509": "郑爽0", "510": "郑爽1", "511": "郑爽2", "512": "郑爽3", "513": "郑爽6", "514": "郑爽5", "515": "郑爽4", "516": "郑爽7", "517": "郑爽8", "518": "郑爽9", "519": "郑爽10", "520": "郑爽11", "521": "阿狸0", "523": "阿狸2", "524": "阿狸3", "525": "阿狸4", "526": "阿狸5", "527": "阿狸6", "528": "阿狸7", "529": "阿狸8", "530": "阿狸9", "531": "阿狸10", "532": "阿狸11", "533": "炮炮兵7", "534": "炮炮兵1", "535": "炮炮兵2", "536": "炮炮兵3", "537": "炮炮兵4", "538": "炮炮兵5", "539": "炮炮兵6", "540": "炮炮兵0", "541": "炮炮兵8", "542": "炮炮兵9", "543": "炮炮兵10", "544": "炮炮兵11", "608": "热门60", "610": "热门59", "611": "热门58", "628": "胡歌4", "629": "胡歌5", "630": "胡歌6", "631": "胡歌7", "660": "风暴英雄0", "661": "风暴英雄1", "662": "风暴英雄2", "663": "风暴英雄3", "664": "风暴英雄4", "665": "风暴英雄5", "666": "风暴英雄6", "667": "风暴英雄7", "668": "风暴英雄8", "669": "风暴英雄9", "670": "风暴英雄10", "671": "风暴英雄11", "672": "暗黑破坏神Ⅲ0", "673": "暗黑破坏神Ⅲ1", "674": "暗黑破坏神Ⅲ2", "675": "暗黑破坏神Ⅲ3", "676": "暗黑破坏神Ⅲ4", "677": "暗黑破坏神Ⅲ5", "678": "暗黑破坏神Ⅲ6", "679": "暗黑破坏神Ⅲ7", "680": "暗黑破坏神Ⅲ8", "681": "暗黑破坏神Ⅲ9", "682": "暗黑破坏神Ⅲ10", "683": "暗黑破坏神Ⅲ11", "684": "星际争霸II0", "685": "星际争霸II1", "686": "星际争霸II2", "687": "星际争霸II3", "688": "星际争霸II4", "689": "星际争霸II5", "690": "星际争霸II6", "691": "星际争霸II7", "692": "星际争霸II8", "693": "星际争霸II9", "694": "星际争霸II10", "695": "星际争霸II11", "720": "热门61", "721": "魔兽世界0", "722": "魔兽世界1", "723": "魔兽世界2", "724": "魔兽世界3", "725": "魔兽世界4", "726": "魔兽世界5", "727": "魔兽世界6", "728": "魔兽世界7", "729": "魔兽世界8", "730": "魔兽世界9", "731": "魔兽世界10", "732": "魔兽世界11", "733": "炉石传说0", "734": "炉石传说1", "735": "炉石传说2", "736": "炉石传说3", "737": "炉石传说4", "738": "炉石传说5", "739": "炉石传说6", "740": "炉石传说7", "741": "炉石传说8", "742": "炉石传说9", "743": "炉石传说10", "744": "炉石传说11", "749": "冷兔0", "750": "冷兔1", "751": "冷兔2", "752": "冷兔3", "753": "冷兔4", "754": "冷兔5", "755": "冷兔6", "756": "冷兔7", "757": "冷兔8", "758": "冷兔9", "759": "冷兔10", "760": "冷兔11", "765": "热门54", "766": "热门57", "767": "热门55", "768": "热门56", "776": " 光线影业", "777": " 光线影业", "778": " 光线影业", "781": " 光线影业", "784": " 枫海影业", "796": " 欢瑞世纪", "797": " 欢瑞世纪", "798": " 欢瑞世纪", "799": " 欢瑞世纪", "800": " 欢瑞世纪", "801": " 欢瑞世纪", "802": " 恒业影业", "803": " 周迅工作室", "804": " 华映传媒", "805": " 爱奇艺", "806": " 爱奇艺", "807": " 爱奇艺", "808": " 世纪长龙", "809": " 世纪长龙", "810": " 世纪长龙", "811": " 嘉映影业", "812": " 林心如工作室", "813": " 环球影业", "814": " 环球影业", "815": " 环球影业", "816": " 环球影业", "817": " 环球影业", "818": " 环球影业", "819": " 派拉蒙影业", "820": " 派拉蒙影业", "821": " 黄子韬工作室", "822": " 高品图像", "823": " 高品图像", "824": " 高品图像", "825": " 高品图像", "826": " 高品图像", "827": " 爱奇艺影业", "828": " 爱奇艺影业", "829": " 优酷", "830": " 基美影业", "831": " 基美影业", "832": " 魔威映画", "833": " 亚洲星光娱乐", "834": " 周冬雨工作室", "835": "守望先锋0", "836": "守望先锋1", "837": "守望先锋2", "838": "守望先锋3", "839": "守望先锋4", "840": "守望先锋5", "841": "守望先锋6", "842": "守望先锋7", "843": "守望先锋8", "844": "守望先锋9", "845": "守望先锋10", "846": "守望先锋11", "859": " 记忆大师", "860": "冒险岛20", "861": "冒险岛21", "862": "冒险岛22", "863": "冒险岛23", "864": "冒险岛24", "865": "冒险岛25", "866": "冒险岛26", "867": "冒险岛27", "868": "冒险岛28", "869": "冒险岛29", "870": "冒险岛210", "871": "冒险岛211", "872": " 天龙八部", "873": " 天龙八部", "874": " 变形金刚ol", "875": " 变形金刚ol", "876": " 一品芝麻狐", "877": " 一品芝麻狐", "878": " 一品芝麻狐", "879": " 一品芝麻狐", "880": " 一品芝麻狐", "881": " 一品芝麻狐", "882": " 白敬亭", "883": " 剑灵", "886": " 最强nba", "887": " 最强nba", "2371": "柳岩1", "2481": "赵丽颖1" }
        // const LOCAL_STORAGE_PREFIX = '$CSDNCleaner_'
        // /**
        //  * 设置按钮 SVG 图标
        //  */
        // const SETTING_SVG_ICON = '<svg class="icon" style="width: 27px;height: 27px;vertical-align: middle;fill: #999aaa;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2365"><path d="M548.867967 1023.560304l-73.930219 0c-37.624653 0-68.23974-30.58441-68.23974-68.168161l0-44.240538c0-6.667013-6.973777-16.161371-13.3238-18.129776l-2.597272-0.930519-65.095405-26.90835c-1.80991-0.976533-4.550339-1.544047-7.525953-1.544047-6.396038 0-11.764415 2.449002-14.044697 4.729284l-31.545605 31.525154c-12.83809 12.843203-29.95043 19.914122-48.182461 19.914122-18.232031 0-35.349484-7.070919-48.202912-19.914122l-52.364682-52.339118c-26.443091-26.662939-26.437978-69.870704-0.076691-96.416049l31.560943-31.530267c4.678157-4.647481 6.339797-16.125582 3.221026-21.984782l-1.303749-2.76088-26.519782-64.579018c-1.958179-6.329572-11.426974-13.303349-18.093987-13.313575l-44.307004 0c-37.609315 0-68.209063-30.609974-68.209063-68.244852L0.086917 474.799704c0-37.604202 30.599748-68.193725 68.209063-68.193725l44.383695 0.046015c6.631224 0 16.120469-6.989115 18.099099-13.349364l0.945857-2.61261 26.846997-64.870444c3.103433-5.762058 1.400891-17.183919-3.236364-21.810948l-31.468914-31.53538c-26.560684-26.545346-26.565797-69.809351 0.015338-96.426275l52.272653-52.277766c12.878992-12.853428 29.991332-19.919235 48.228476-19.919235 18.232031 0 35.349484 7.076032 48.192686 19.919235l31.530267 31.422899c2.372311 2.377424 7.776477 4.846877 14.21853 4.846877 3.011404 0 5.80296-0.572627 7.66911-1.569611l2.878473-1.354876 64.538116-26.417527c6.334685-1.958179 13.298237-11.442312 13.298237-18.11955l0-44.368357c0-37.61954 30.615087-68.224401 68.23974-68.224401l73.930219 0c37.583751 0 68.14771 30.604861 68.14771 68.224401l0 44.368357c0 6.6619 6.999341 16.151145 13.374928 18.124663l2.633061 0.956082 64.660822 26.800983c1.876376 1.00721 4.68327 1.579837 7.699786 1.579837 6.498292 0 11.907571-2.474566 14.192966-4.770186l31.514929-31.504703c12.909668-12.853428 30.032234-19.914122 48.254039-19.914122 18.242256 0 35.369935 7.065807 48.208025 19.909009l52.32378 52.272653c12.884105 12.863654 19.970362 29.996445 19.970362 48.254039 0 18.247369-7.070919 35.395498-19.955024 48.259152l-31.499591 31.448463c-4.586128 4.601466-6.283557 16.08468-3.19035 21.867189l1.365102 2.878473 26.391963 64.466538c1.999081 6.390925 11.493439 13.405604 18.155339 13.405604l44.383695 0c37.568413 0 68.137485 30.589523 68.137485 68.193725l0 73.991572c0 37.609315-30.569072 68.209063-68.137485 68.209063l-44.383695 0c-6.6619 0-16.171596 6.999341-18.155339 13.390266l-0.930519 2.541032-26.806095 64.722175c-3.108546 5.843862-1.446905 17.337301 3.185237 21.969443l31.468914 31.438238c12.868766 12.83809 19.970362 29.955543 19.970362 48.213137 0.015338 18.242256-7.070919 35.400611-19.955024 48.279603l-52.32378 52.32378c-12.853428 12.858541-29.975994 19.914122-48.223363 19.924347-18.221805 0-35.344371-7.055581-48.213137-19.878333l-31.422899-31.612071c-2.208704-2.198478-7.653772-4.678157-14.131613-4.678157-3.021629 0-5.813185 0.562401-7.653772 1.574724l-3.006291 1.411116-64.502327 26.376625c-6.390925 1.999081-13.405604 11.493439-13.405604 18.145114l0 44.240538C617.015678 992.975894 586.451719 1023.560304 548.867967 1023.560304zM413.375247 833.867428c31.898384 10.675401 55.764654 43.601446 55.764654 77.284176l0 44.240538c0 3.093208 2.653512 5.721156 5.792734 5.721156l73.930219 0c3.031855 0 5.700705-2.66885 5.700705-5.721156l0-44.240538c0-33.636716 23.876495-66.567874 55.785105-77.284176l59.542969-24.454235c10.619161-5.378602 22.910188-8.216173 35.686925-8.216173 22.378463 0 43.632122 8.369555 58.300573 22.991991l31.422899 31.606958c2.561483 2.515468 5.399053 2.658625 8.129256-0.076691l52.308442-52.308442c1.385553-1.385553 1.676979-2.990953 1.66164-4.100417 0-1.099239-0.281201-2.684188-1.646302-4.039065l-31.484252-31.468914c-23.815142-23.799804-30.078249-63.883685-14.939426-93.977272l24.50025-59.573645c10.736754-31.847257 43.662799-55.693076 77.279064-55.693076l44.383695 0c3.036968 0 5.69048-2.699527 5.69048-5.762058L961.184877 474.799704c0-3.062531-2.658625-5.751832-5.69048-5.751832l-44.383695 0c-33.631603 0-66.562761-23.861157-77.279064-55.754429l-24.50025-59.548082c-15.108146-29.996445-8.875716-70.034311 14.862735-93.88013l31.560943-31.499591c1.354876-1.365102 1.646302-2.975615 1.646302-4.085079 0-1.099239-0.281201-2.699527-1.646302-4.064628l-52.32378-52.277766c-2.730203-2.730203-5.475744-2.689301-8.231511 0.030676l-31.422899 31.422899c-14.607098 14.663338-35.906772 23.099359-58.397715 23.099359-12.710271 0-24.975734-2.812007-35.58467-8.144595l-59.445827-24.495137c-31.90861-10.685626-55.785105-43.611671-55.785105-77.273951l0-44.368357c0-3.026742-2.714865-5.772283-5.700705-5.772283l-73.930219 0c-3.088095 0-5.792734 2.694414-5.792734 5.772283l0 44.368357c0 33.698069-23.861157 66.624114-55.754429 77.284176l-59.512293 24.484911c-10.59871 5.3377-22.843722 8.144595-35.553993 8.144595-22.444928 0-43.719039-8.430908-58.377264-23.145374l-31.484252-31.38711c-2.791556-2.765992-5.450181-2.730203-8.159933-0.015338L168.055761 220.19037c-2.203591 2.203591-2.218929 5.941004-0.005113 8.144595l31.422899 31.499591c23.845819 23.75379 30.15494 63.827445 14.954764 93.926145L189.933175 413.334345c-10.695852 31.903497-43.621897 55.764654-77.284176 55.764654l-44.383695-0.046015c-3.093208 0-5.731381 2.633061-5.731381 5.751832l0 73.925106c0 3.082982 2.689301 5.797847 5.756945 5.797847l44.353019 0c33.677618 0.046015 66.54231 23.907172 77.202373 55.754429l24.582053 59.542969c15.154161 30.165165 8.819476 70.284836-15.051906 94.023287l-31.422899 31.412674c-2.116674 2.132013-2.101336 6.022808 0.107368 8.241737l52.247089 52.236864c2.663737 2.66885 5.399053 2.699527 8.103693 0l31.530267-31.514929c14.612211-14.622436 35.835194-23.022668 58.203431-23.022668 12.751173 0 25.026862 2.842683 35.630684 8.216173L413.375247 833.867428zM511.969324 727.752511c-119.142178 0-216.074614-96.906872-216.074614-216.033712 0-119.121727 96.927323-216.028599 216.074614-216.028599 119.116614 0 216.043938 96.906872 216.043938 216.028599C728.013261 630.845639 631.085938 727.752511 511.969324 727.752511zM511.969324 358.142318c-84.707875 0-153.622496 68.889058-153.622496 153.576481 0 84.682311 68.914621 153.581594 153.622496 153.581594 84.687424 0 153.59182-68.899283 153.59182-153.581594C665.561143 427.031375 596.66186 358.142318 511.969324 358.142318z" p-id="2366"></path></svg>'
        // const Toolkit = {
        //     delay(timeout) {
        //         return new Promise(resolve => setTimeout(resolve, timeout))
        //     },
        //     // 通过 LocalStorage / GM_getValue 赋值
        //     setValue(key, value) {
        //         localStorage.setItem(LOCAL_STORAGE_PREFIX + key, value)
        //         GM_setValue(LOCAL_STORAGE_PREFIX + key, value)
        //     },
        //     getValue(key, defaultValue = null) {
        //         return localStorage.getItem(LOCAL_STORAGE_PREFIX + key) || GM_getValue(LOCAL_STORAGE_PREFIX + key, defaultValue)
        //     },
        //     showDom(selector, isShow) {
        //         const domList = document.querySelectorAll(selector)
        //         if (!domList || !domList.length) return
        //         const method = isShow ? 'remove' : 'add'
        //         for (const d of domList) {
        //             d.classList[method]('d-none')
        //         }
        //     }
        // }
        const BackgroundImageRange = {
            // idOrUrl: null, // 当前 image ID / 自定义 url, 用于标记当前显示的图片
            // get currentUrl() {
            //     const result = { url: null, name: null, category: null, html: null }
            //     if (!this.idOrUrl) return result
            //     // window.$CSDNCleaner.BackgroundImageRange.range.bgColor
            //     //     ? `<span>${window.$CSDNCleaner.BackgroundImageRange.range.bgColor}</span>`
            //     //     : `<a class="link" target="_blank" href="${url}">${category ? '<' + category + '> ' : ''}${name}</a>`
            //     if (typeof this.idOrUrl === 'string') {
            //         result.url = this.idOrUrl
            //         result.name = '自定义图片'
            //         result.html = `<span>自定义图片</span>`
            //     } else if (this.range.bgColor) {
            //         result.name = this.range.bgColor
            //         result.html = `<span>${this.range.bgColor}</span>`
            //     } else {
            //         result.url = this.toBaiduUrl({ id: this.idOrUrl, cssWrap: false })
            //         for (const categoryName in IMG_CATEGORYS) {
            //             if (IMG_CATEGORYS[categoryName].includes(this.idOrUrl)) {
            //                 result.category = categoryName
            //             }
            //         }
            //         // result.category
            //         result.name = IMG_MAP[this.idOrUrl.toString()]
            //         result.html = `<a class="link" target="_blank" href="${result.url}">${result.category ? '<' + result.category + '> ' : ''}${result.name}</a>`
            //     }
            //     return result
            // },
            // STATE_SELECTED_CATEGORY: 'STATE_SELECTED_CATEGORY',
            // range: {
            //     categorys: [],              // 类目集合
            //     imgs: [],                   // 图片集合
            //     customUrl: '',              // 自定义链接
            //     bgColor: '',                // 纯色背景
            //     defaultHideMenu: false,     // 默认是否隐藏设置按钮
            //     hideRecommendBox: false,    // 默认是否隐藏底部推荐文章
            //     hideCopyright: false,       // 默认是否隐藏底部版权信息
            //     showCatalogue: false,       // 默认是否显示目录栏
            //     showSourceLink: true,       // 是否匹配原文链接
            //     articleWeightRate: '',      // 文章宽度百分比
            // },
            // init() {
            //     const range = Toolkit.getValue('background_ranges')
            //     if (range) {
            //         try {
            //             const _range = JSON.parse(range)
            //             if (!_range || typeof _range !== 'object') throw new Error('range data error')
            //             Object.assign(this.range, _range)
            //         } catch (err) {
            //             console.error(err)
            //         }
            //     }
            // },
            toCategoryHTML() {
                let html = ''
                for (const categoryName in IMG_CATEGORYS) {
                    html += `<div class="category ${this.range.categorys.includes(categoryName) ? this.STATE_SELECTED_CATEGORY : ''}" data-key="${categoryName}">${categoryName}</div>\n`
                }
                return html
            },
            save() {
                console.warn(`%c[${window.$CSDNCleaner.NAME}] 保存配置: `, 'color: teal', this)
                for (const optName in window.$CSDNCleaner.BackgroundImageRange.range) {
                    const syncMethodName = 'sync' + optName[0].toUpperCase() + optName.substr(1)
                    if (typeof window.$CSDNCleaner.BackgroundImageRange[syncMethodName] === 'function') window.$CSDNCleaner.BackgroundImageRange[syncMethodName]()
                }
                Toolkit.setValue('background_ranges', JSON.stringify(window.$CSDNCleaner.BackgroundImageRange.range))
            },
            // getImgUrl() {
            //     const customUrl = this.range.customUrl
            //     let url = null
            //     let id = null
            //     if (customUrl) {
            //         url = `url(${customUrl})`
            //         this.idOrUrl = customUrl
            //     } else if (this.range.categorys && this.range.categorys.length) {
            //         const idList = this._getAllImgIdsByCategorys()
            //         const index = this.getRandomInterger(idList.length)
            //         id = idList[index.toString()]
            //         url = this.toBaiduUrl({ id })
            //         this.idOrUrl = id || this.toBaiduUrl({ id, cssWrap: false })
            //     } else {
            //         const allImgs = Object.keys(IMG_MAP).map(img => Number(img))
            //         const index = this.getRandomInterger(allImgs.length)
            //         id = allImgs[index.toString()]
            //         url = this.toBaiduUrl({ id })
            //         this.idOrUrl = id || this.toBaiduUrl({ id, cssWrap: false })
            //     }
            //     return url
            // },
            // toBaiduUrl({ id, cssWrap = true }) {
            //     const url = `https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/${id}.jpg`
            //     return cssWrap ? `url(${url})` : url
            // },
            // _getAllImgIdsByCategorys() {
            //     const idList = []
            //     for (const categoryName in this.range.categorys) {
            //         if (Array.isArray(IMG_CATEGORYS[this.range.categorys[categoryName]])) idList.push(...IMG_CATEGORYS[this.range.categorys[categoryName]])
            //     }
            //     return idList
            // },
            // getRandomInterger(size) {
            //     return Math.ceil(Math.random() * size) - 1
            // },
            syncDefaultHideMenu() {
                const menu = document.querySelector('[data-type="$setting"]')
                if (!menu || !menu.classList) return
                const method = window.$CSDNCleaner.BackgroundImageRange.range.defaultHideMenu ? 'add' : 'remove'
                menu.classList[method]('defaultHideMenu')
            },
            getSourceLinkDisplay() {
                return this.range.showSourceLink ? 'inline-flex' : 'none'
            },
            getArticleWeight() {
                const weight = Number(this.range.articleWeightRate)
                return (weight || 100) + '%'
            },
            setBgColor(color) {
                this.range.bgColor = color || ''
                this.save()
                document.body.style.setProperty('--background-color', color || '#EAEAEA')
                this.updateBgImage(null, !!color)
            },
            // get recommendBoxDisplayAttributes() { return ['--display-recommend-box', this.range.hideRecommendBox ? 'none' : 'block'] },
            // syncHideRecommendBox() {
            //     document.body.style.setProperty(...this.recommendBoxDisplayAttributes)
            // },
            // get copyrightDisplayAttributes() { return ['--display-copyright', this.range.hideCopyright ? 'none' : 'block'] },
            // syncHideCopyright() {
            //     document.body.style.setProperty(...this.copyrightDisplayAttributes)
            // },
            // get catalogueDisplayAttributes() { return ['--display-catalogue', this.range.showCatalogue ? 'block' : 'none'] },
            syncShowCatalogue() {
                document.body.style.setProperty(...this.catalogueDisplayAttributes)
                if (this.range.showCatalogue && document.getElementById('groupfile')) {
                    document.body.setAttribute('show-catalogue', '')
                    if (window.$csdn && window.$csdn.fixedSidebar) {
                        window.$csdn.fixedSidebar({
                            targetBox: $(".blog_container_aside"),
                            mainBox: $("main"),
                            sidebar: $(".blog_container_aside"),
                            direction: "left",
                            position: "fixed",
                            bottom: 0,
                            zIndex: 99,
                            sidebarRightMargin: 8,
                            sidebarLeftMargin: 8
                        })
                    }
                } else {
                    document.body.removeAttribute('show-catalogue')
                }
            },
            setArticleWeight(weight) {
                this.range.articleWeightRate = Number(weight) || 100
                this.save()
                document.body.style.setProperty('--article-weight', this.range.articleWeightRate + '%')
            },
            updateBgImage(url, disabled) {
                let imgUrl = url || window.$CSDNCleaner.BackgroundImageRange.getImgUrl()
                if (imgUrl.indexOf('url(') === -1) imgUrl = `url(${imgUrl})`
                document.body.style.setProperty('--background-image', disabled ? 'none' : imgUrl)
                const labelEl = document.getElementById('setting-background-label')
                labelEl.innerHTML = this.currentUrl.html
            }
        }
        window.$CSDNCleaner = {
            NAME: 'CSDN 去广告沉浸阅读模式',
            BackgroundImageRange,
            options: [],
            launch() {
                console.log(`%c[${window.$CSDNCleaner.NAME}] 感谢支持, 欢迎反馈: https://greasyfork.org/zh-CN/scripts/373457/feedback`, 'color: teal')
                window.addEventListener('DOMContentLoaded', window.$CSDNCleaner.onLoad)
                return this
            },
            init() {
                BackgroundImageRange.init() // 从本地存储中获取配置
                window.$CSDNCleaner
                    .initSettings() // 初始化按钮组
                    .appendSheets() // 添加样式
                    .cleanCopy() // 解禁复制功能
                    .removeSkinCss() // 移除黑色背景色的皮肤样式 css 文件
                    .launch() // DOM 初始化
                    .disabledDarkSkin() // 禁用 dark skin
                    .interceptCSDN() // 拦截 csdn 对象的赋值操作
            },
            removeSkinCss() {
                const linkElements = document.getElementsByTagName('link')
                if (linkElements && linkElements.length) {
                    for (let linkIndex = linkElements.length; linkIndex--;) {
                        const link = linkElements[linkIndex]
                        if (link.href && link.href.indexOf('/themesSkin/') !== -1) {
                            link.remove()
                        }
                    }
                }
                return this
            },
            /**
             * 拦截源码中对于 `window.csdn` 的赋值操作
             * @description 由于 `TamperMonkey` 中获取的 `window` 对象并不是真正的 `window` 对象, 所以不能直接 `Object.defineProperty(window, 'scdn')`
             * @description 所以用 `<script>` 注入的方式执行绑定拦截器的代码
             */
            interceptCSDN() {
                const script = document.createElement('script')
                script.innerText = `window.$csdn=window.csdn||{$intercept: true};$handleInterceptCSDN=0;Object.defineProperty(window, 'csdn', { set(val) { typeof window.$handleInterceptCSDN === 'function' ? window.$handleInterceptCSDN(val) : window.$csdn = val; }, get() { return window.$csdn } });`
                document.querySelector('head').appendChild(script)
                $handleInterceptCSDN = val => {
                    $csdn = val // 使用直接赋值的方式, 防止因某些属性无法遍历导致未赋值的情况
                    $csdn.$intercept = true // 标记为已启用拦截
                    $csdn.middleJump = null // 移除跳转链接时的事件绑定函数
                }
            },
            /** 生成 sheets */
            _getSheets() {
                // 若设置了背景色, 则使用纯色, 否则使用自定义图片或随机图片背景
                const bgColor = window.$CSDNCleaner.BackgroundImageRange.range.bgColor
                const imgUrl = window.$CSDNCleaner.BackgroundImageRange.getImgUrl()
                const catalogSheets = `
                    opacity: 0.75;
                    z-index: 233;
                    border-radius: 10px;
                    overflow: hidden;
                    transition: 0.2s opacity ease-in-out;
                `
                const catalogHoverSheets = `
                    opacity: 0.825;
                `
                const catalogTitleSheets = `
                    margin-bottom: 0;
                    background-image: none;
                    background-color: #FFF;
                    border-bottom: 1px solid #EAEAEA;
                    color: #222;
                `
                const rightCatalogueSheets = `
                    body[show-catalogue] aside.recommend-right_aside > #recommend-right > div:not(#groupfile) {
                        display: none !important;
                    }
                    body[show-catalogue] aside.recommend-right_aside > #recommend-right > #groupfile {
                        ${catalogSheets}
                        margin-top: 20px;
                    }
                    body[show-catalogue] aside.recommend-right_aside > #recommend-right > #groupfile > .groupfile-div {
                        max-height: 90vh;
                    }
                    body[show-catalogue] aside.recommend-right_aside > #recommend-right > #groupfile:hover {
                        ${catalogHoverSheets}
                    }
                    body[show-catalogue] aside.recommend-right_aside > #recommend-right > #groupfile > .groupfile-div > h3  {
                        ${catalogTitleSheets}
                    }
                    body[show-catalogue] aside.recommend-right_aside > #recommend-right > #groupfile ol > li {}
                `
                const leftCatalogueSheets = `
                    /* 除目录外的其他 card */
                    body[show-catalogue] #mainBox aside.blog_container_aside > div:not(#asidedirectory) {
                        display: none !important;
                        height: 0;
                        z-index: -32;
                        opacity: 0;
                        margin: 0;
                        visibility: hidden;
                    }
                    body[show-catalogue] #mainBox aside.blog_container_aside > div#asidedirectory {
                        ${catalogSheets}
                    }
                    body[show-catalogue] #mainBox aside.blog_container_aside > div#asidedirectory > .groupfile-div {
                        max-height: 90vh;
                    }
                    body[show-catalogue] #mainBox aside.blog_container_aside > div#asidedirectory:hover {
                        ${catalogHoverSheets}
                    }
                    body[show-catalogue] #mainBox aside.blog_container_aside > div#asidedirectory > #directory > h3 {
                        ${catalogTitleSheets}
                    }
                    body[show-catalogue] #mainBox aside.blog_container_aside > div#asidedirectory > #directory ol > li {}
                `
                const sheets = `
                    body {
                        --comments-avatar-size: 50px;
                        --source-link-wrapper-display: ${window.$CSDNCleaner.BackgroundImageRange.getSourceLinkDisplay()};
                        --background-color: ${bgColor || '#EAEAEA'};
                        --background-image: ${bgColor ? 'none' : imgUrl};
                        --article-weight: ${window.$CSDNCleaner.BackgroundImageRange.getArticleWeight()};
                        ${window.$CSDNCleaner.BackgroundImageRange.recommendBoxDisplayAttributes.join(': ')};
                        ${window.$CSDNCleaner.BackgroundImageRange.copyrightDisplayAttributes.join(': ')};
                        ${window.$CSDNCleaner.BackgroundImageRange.catalogueDisplayAttributes.join(': ')};
                    }
                    /* 修复文章内容部分显示多余的 margin-right 的问题 */
                    @media screen and (min-width: 1550px) {
                        body:not([show-catalogue]) #mainBox {
                            margin-right: 0;
                        }
                    }
                    /* 修复与 dark reader 一起使用时背景图片被遮挡的问题 */
                    html[data-darkreader-scheme] body {
                        height: auto;
                    }
                    body:not(.clean-mode) { background-color: var(--background-color) !important; background-image: var(--background-image) !important; background-attachment: fixed !important;background-size: cover; background-repeat: no-repeat; }
                    body>#page>#content, body>.container.container-box,main,body>.main.clearfix { opacity: 0.9; }
                    main {margin: 20px;}
                    #local { position: fixed; left: -99999px }
                    .recommend-item-box .content,.post_feed_box,.topic_r,#bbs_title_bar,#bbs_detail_wrap,#left-box {width: 100% !important;}
                    #toolbarBox, .csdn-side-toolbar > div, .btn-side-chatdoc-contentbox, #remuneration, .recommend-ask-box, .write-guide-buttom-box, .tool-active-list, .sidetool-writeguide-box, .passport-auto-tip-login-container, .passport-login-tip-container, .hide-preCode-box,.passport-login-container,.csdn-common-logo-advert,#recommendNps,.reward-box-new,.csdn-redpack-lottery-btn-box,#csdn-shop-window-top,#csdn-shop-window,.csdn-redpack-time, #csdn-redpack, .recommend-item-box.type_other, .triplet-prompt, .column-advert-box, .comment-sofa-flag, #article_content .more-toolbox, .blog-content-box a[data-report-query],main .template-box, .blog-content-box>.postTime,.post_body div[data-pid],#unlogin-tip-box,.t0.clearfix,.recommend-item-box.recommend-recommend-box,.csdn-side-toolbar>a[data-type]:not([data-type=gotop]):not([data-type="$setting"]),a[href^="https://edu.csdn.net/topic"],.adsbygoogle,.mediav_ad,.bbs_feed_ad_box,.bbs_title_h,.title_bar_fixed,#adContent,.crumbs,#page>#content>#nav,#local,#reportContent,.comment-list-container>.opt-box.text-center,.type_hot_word,.blog-expert-recommend-box,.login-mark,#passportbox,.recommend-download-box,.recommend-ad-box,#dmp_ad_58,.blog_star_enter,#header,.blog-sidebar,#new_post.login,.mod_fun_wrap,.hide_topic_box,.bbs_bread_wrap,.news-nav,#rightList.right-box,aside,aside .aside-box.kind_person,#kp_box_476,.tool-box,.pulllog-box,.adblock,.fourth_column,.hide-article-box,#csdn-toolbar
                        {display: none !important;}
                    main div.blog-content-box pre.set-code-hide,.hide-main-content,#blog_content,#bbs_detail_wrap,.article_content {height: auto !important;}
                    .comment-list-box,#bbs_detail_wrap {max-height: none !important;}
                    #main {width: 100% !important;}
                    #page {width: 80vw !important;}
                    #bbs_title_bar {margin-top: 20px;}
                    #page>#content {margin-top: 0 !important;}
                    #content_views, #content_views * { user-select: auto !important; }

                    body > .container-box .container_main.clearfix { width: 100% !important; }
                    .csdn_main_container > .container_main > #left-box { width: 100% !important; }
                    #bbs_detail_wrap > .paginate_box { width: 100% !important; }
                    .mod_topic_wrap { width: 100% !important; }
                    .container_main > .mod_topic_wrap > .post_feed_box { width: 100% !important; }
                    .bbs-common-footer { width: 100% !important; }
                    .csdn_main_container > #navs { display: none; }

                    /* 文中代码块解除选择禁用 | 2021-09-06 16:32:55 */
                    pre, pre code, #article_content pre.prettyprint, #article_content pre.prettyprint code {
                        user-select: auto !important;
                    }

                    /* 文章正文底部作者信息 footer fixed 定位改回 relative; 屏蔽打赏 box */
                    .more-toolbox-new > .left-toolbox {
                        position: relative !important;
                        left: 0 !important;
                    }
                    /* 推荐文章 hover 不改变标题颜色 */
                    .recommend-box .recommend-item-box .title-box .tit:hover {
                        color: inherit !important;
                    }
                    /* 图片预览底色 */
                    .imgViewDom.disnone { background-color: rgba(0, 0, 0, 0.5); }
                    /* 控制目录是否显示 */
                    /* .recommend-right,aside.recommend-right_aside { display: var(${window.$CSDNCleaner.BackgroundImageRange.catalogueDisplayAttributes[0]}) !important; } */
                    body[show-catalogue] .recommend-right .flex-column.aside-box {}
                    /* 在宽屏下显示在文章右侧 */
                    @media screen and (min-width: 1550px) {
                        body[show-catalogue] .nodata.recommend-right, aside.recommend-right_aside {
                            display: var(${window.$CSDNCleaner.BackgroundImageRange.catalogueDisplayAttributes[0]}) !important;
                        }
                        ${rightCatalogueSheets}
                        body[show-catalogue] #mainBox aside.blog_container_aside {
                            display: none !important;
                        }
                    }
                    /* 在小屏下显示在文章左侧 */
                    @media screen and (min-width: 1380px) and (max-width: 1550px) {
                        body[show-catalogue] #mainBox aside.blog_container_aside { display: var(${window.$CSDNCleaner.BackgroundImageRange.catalogueDisplayAttributes[0]}) !important; }
                    }
                    /* 在小屏下显示在文章左侧 */
                    @media screen and (max-width: 1380px) {
                        body[show-catalogue] #mainBox aside.blog_container_aside {
                            display: var(${window.$CSDNCleaner.BackgroundImageRange.catalogueDisplayAttributes[0]}) !important;
                        }
                        body[show-catalogue] .main_father > .container#mainBox > main {
                            float: right !important;
                        }
                    }
                    @media screen and (max-width: 1549px) and (min-width: 1380px) {
                        body[show-catalogue] .main_father > .container#mainBox > main {
                            float: right !important;
                        }
                    }
                    @media screen and (min-width: 0px) and (max-width: 1550px) {
                        /* aside */
                        body[show-catalogue] #mainBox aside.blog_container_aside {
                            position: fixed !important;
                            top: 28px !important;
                        }
                        ${leftCatalogueSheets}
                    }
                    body:not([show-catalogue]) .main_father > #mainBox > aside { display: none !important; }
                    body:not([show-catalogue]) .recommend-right { display: none !important; }

                    /* 复制按钮增加 !important, 修复在某些页面下样式被覆盖的问题 | 2021-01-23 13:12:57 */
                    /* 重写登录后复制按钮样式 | 2021-01-01 10:45:03 */
                    .hljs-button.signin[data-title="登录后复制"] { font-size: 0 !important; }
                    .hljs-button.signin[data-title="登录后复制"]:before { content: "一键复制"; font-size: 14px; vertical-align: middle; }
                    /* 增加隐藏底部推荐文章和版权信息功能 | 2020-11-11 21:03:10 */
                    .recommend-box { display: var(${window.$CSDNCleaner.BackgroundImageRange.recommendBoxDisplayAttributes[0]}) !important; }
                    .blog-footer-bottom { display: var(${window.$CSDNCleaner.BackgroundImageRange.copyrightDisplayAttributes[0]}) !important; }
                    /* 增加 round-slider 组件 | 2020-08-20 20:29:05 */
                    .round-slider-wrapper { margin: 15px auto !important; }
                    .round-slider-wrapper .rs-handle { background-color: transparent; border: 8px solid transparent; border-right-color: black; margin: -6px 0px 0px 14px !important; border-width: 6px 104px 6px 4px; }
                    .round-slider-wrapper .rs-handle:before { display: block; content: " "; position: absolute; height: 22px; width: 22px; background: black; right: -11px; bottom: -11px; border-radius: 100px; }
                    .round-slider-wrapper .rs-tooltip { top: 75% !important; font-size: 11px; }
                    .round-slider-wrapper .rs-full.rs-tooltip { top: 75% !important; }
                    .round-slider-wrapper .rs-tooltip > div { text-align: center; background: orange; color: white; border-radius: 4px; padding: 1px 5px 2px; margin-top: 4px; }
                    .round-slider-wrapper .rs-range-color { background-color: #DB5959; }
                    .round-slider-wrapper .rs-path-color { background-color: #F0C5C5; }
                    .color-picker-container { margin-left: 50%; transform: translateX(-50%); }
                    /* 评论区每行增加 hover 效果 | 2020-05-17 18:32:22 */
                    .comment-box { background-color: rgba(255,255,255,0.9) !important; }
                    .comment-list-box { padding: 0 !important; }
                    .comment-list-box > .comment-list { padding: 0 24px; margin-top: 0 !important; padding-top: 16px; }
                    .comment-list-box .comment-list { transition: all .2s ease-in-out; }
                    .comment-list-box > .comment-list:hover { background-color: rgba(255,255,255,0.7); }
                    .comment-list-box .comment-line-box:hover img.avatar { border-color: rgb(255, 198, 198, 0.95); }
                    /* 屏蔽固定在页面底部的 toolbox | 2020-05-17 18:28:03 */
                    .more-toolbox > .left-toolbox { position: relative !important; left: 0 !important; }
                    /* 底部作者信息右侧按钮只显示关注 | 2020-05-17 18:26:52 */
                    .right-message > a:not(.personal-watch) { display: none; }
                    /* 评论区输入框交叉轴对齐 | 2020-05-17 18:25:54 */
                    .comment-edit-box { display: flex; align-items: center; }
                    /* 原文链接样式 | 2020-05-17 17:41:11 */
                    .source-link-wrapper { display: var(--source-link-wrapper-display); align-items: center; vertical-align: top; }
                    .source-link-wrapper > .source-link-icon { margin-right: 5px; }
                    .source-link-wrapper > .source-link-label { }
                    .source-link-wrapper > .source-link-link {
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        width: 20vw;
                        max-width: 30vw;
                        min-width: 15vw;
                    }
                    .source-link-wrapper > .source-link-link:hover { color: #008eff !important; }
                    /* 防止网页主体内容被黑白处理, 适用于特殊日期; CSDN 真是太蠢了，只有 CSDN 把文章内容中的图片都显示成黑白的了, 严重影响阅读! | 2020-04-04 13:17:48 */
                    /* 经测试, firefox 下会导致子元素的 fixed 定位失效, 故将其改为 none */
                    html { filter: none !important; }
                    /* 评论区评论内容强制换行以保持一致性 | 2020-02-19 08:58:33 */
                    .comment-box .comment-list-container .comment-list .new-comment { display: block !important; }
                    /* 覆盖所有 media query 样式以防止原有的自适应样式导致布局错乱 | 2020-02-19 08:28:52 */
                    @media screen and (max-width: 1320px) {
                        .main_father > .container#mainBox > main, body:not([show-catalogue]) > .container-box.csdn_main_container {  float: none; margin: 0 auto !important; margin-top: 20px !important; }
                        body:not([show-catalogue]) > .container-box.csdn_main_container { width: var(--article-weight) !important; }
                        body > .container-box.csdn_main_container { width: calc(var(--article-weight) - 30%) !important; }
                    }
                    @media screen and (max-width: 1379px) and (min-width: 1320px) {
                        .main_father > .container#mainBox > main, body:not([show-catalogue]) > .container-box.csdn_main_container {  float: none; margin: 0 auto !important; margin-top: 20px !important; }
                        body:not([show-catalogue]) > .container-box.csdn_main_container { width: var(--article-weight) !important; }
                        body > .container-box.csdn_main_container { width: calc(var(--article-weight) - 30%) !important; }
                    }
                    @media screen and (max-width: 1699px) and (min-width: 1550px) {
                        .main_father > .container#mainBox > main, body:not([show-catalogue]) > .container-box.csdn_main_container { width: var(--article-weight) !important; float: none; margin: 0 auto !important; margin-top: 20px !important; }
                        /* body:not([show-catalogue]) > .container-box.csdn_main_container { width: var(--article-weight) !important; } */
                        body > .container-box.csdn_main_container { width: calc(var(--article-weight) - 30%) !important; }
                    }
                    @media screen and (max-width: 1549px) and (min-width: 1380px) {
                        .main_father > .container#mainBox > main, body:not([show-catalogue]) > .container-box.csdn_main_container {  float: none; margin: 0 auto !important; margin-top: 20px !important; }
                        body:not([show-catalogue]) > .container-box.csdn_main_container { width: var(--article-weight) !important; }
                        body > .container-box.csdn_main_container { width: calc(var(--article-weight) - 30%) !important; }
                    }
                    @media screen and (min-width: 1700px) {
                        .main_father > .container#mainBox > main, body:not([show-catalogue]) > .container-box.csdn_main_container { width: var(--article-weight) !important; float: none; margin: 0 auto !important; margin-top: 20px !important; }
                        /* body:not([show-catalogue]) > .container-box.csdn_main_container { width: var(--article-weight) !important; } */
                        body > .container-box.csdn_main_container { width: calc(var(--article-weight) - 30%) !important; }
                    }
                    /* 评论区样式重写 | 2019-12-27 21:32:24 */
                    .comment-list-container img.avatar {
                        width: var(--comments-avatar-size) !important;
                        height: var(--comments-avatar-size) !important;
                        margin-top: 4px;
                        margin-right: 15px !important;
                        border: 3px solid rgba(215, 215, 205, 0.7);
                        transition: border-color .2s ease-in-out;
                    }
                    .comment-edit-box img.show_loginbox {
                        width: var(--comments-avatar-size) !important;
                        height: var(--comments-avatar-size) !important;
                    }
                    /* 防止原有的自适应样式导致布局错乱 | 2019-12-27 21:08:09 */
                    @media screen and (min-width: 1700px) {
                        .recommend-right.align-items-stretch { color: teal; display: var(${window.$CSDNCleaner.BackgroundImageRange.catalogueDisplayAttributes[0]}) !important; }
                    }
                    /* 隐藏底部 more-toolbox 按钮组 ~~和底部作者 row 中的其他信息~~; 还是保留这一行吧 ... 以后可能会把更多对文章和作者的操作放到这里面 | 2019-12-17 22:18:16 */
                    /* 修改底部 私信求帮助 按钮样式 | 2019-11-23 17:37:52 */
                    .reward-user-box .reward-fexd { width: 100px !important; }
                    .reward-user-box .reward-word { display: none !important; }
                    .reward-user-box .reward-fexd { border: none !important; background: transparent !important; color: #B4B4B4 !important; font-size: 14px !important; line-height: 21px !important; height: 30px !important }
                    .reward-user-box .reward-fexd > div { color: transparent; }
                    .reward-user-box:hover .reward-fexd > div { color: #B4B4B4; }
                    /* iteye 样式重构 | 2019-11-02 11:19:43 */
                    body>#page>#content, body>#page>#content>#main .blog_comment { width: auto; }
                    body>#page>#content>#main .blog_bottom { height: 30px; }
                    body>#page>#content>#main .blog_comment .comment_content { background-color: rgba(255, 214, 173, 0.2); }
                    body>#page>#content, body>#page>#content>#main { border: none; }
                    body>#page>#content>#main #bottoms, body>#page>#content>#main .blog_nav { display: none; }
                    body>#page>#content>#main .blog_title h3 { font-size: 24px; word-wrap: break-word; margin-bottom: 25px; }
                    body>#page>#content>#main, #bbs_title_bar > .owner_top,.blog-content-box { border-top-left-radius: 8px !important; border-top-right-radius: 8px !important; }
                    body > div#page {background-color: transparent}
                    .dl_no_more:after { content: "上边是原话, 脚本作者原本想屏蔽这段话, 但是 CSDN 从未找到自己的底线;\\A 从阅读更多必须注册, 到验证手机号必须关注公众号, 再到大尺度H广告, 严重影响了用户体验;\\A 自从 CSDN 使用明文密码被脱库之后我就不再使用 CSDN 账号, 为了继续阅读 CSDN 内容我写了这个脚本  "; color: teal; display: block; width: 60%; margin: auto; white-space: pre; }
                    .recommend-box>.recommend-item-box { transition: all .2s ease-in-out; }
                    .recommend-box>.recommend-item-box:hover { background-color: rgba(255,255,255,0.8); }
                    /* 脚本设置弹窗 */
                    a.option-box[data-type="$setting"] > svg {
                        -webkit-transform: rotate(360deg);
                        animation: rotation 2.5s linear 1;
                        -moz-animation: rotation 2.5s linear 1;
                        -webkit-animation: rotation 2.5s linear 1;
                        -o-animation: rotation 2.5s linear 1;
                    }
                    a.option-box[data-type=gotop] + a.option-box[data-type="$setting"] {
                        display: flex;
                    }
                    a.go-top-hide.option-box[data-type=gotop] + a.defaultHideMenu.option-box[data-type="$setting"] {
                        display: none;
                    }
                    #setting-dialog {
                        z-index: 244;
                        display: block;
                        position: fixed;
                        top: 20vh;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        transform: translateY(0) translateX(0) scale(1) skew(0);
                        transition: 0.65s all ease-in-out;
                    }
                    #setting-dialog button {
                        border: 2px solid #DADADA;
                    }
                    #setting-dialog.display-none {
                        transform: translateY(80vh) translateX(90vw) scale(0) skew(50deg, 10deg) !important;
                        display: flex !important;
                    }
                    #setting-dialog section {
                        opacity: 1;
                        transition: 0.25s opacity ease-in-out;
                    }
                    #setting-dialog section header {
                        max-width: 550px;
                        height: 50px;
                        font-size: 20px;
                        background: none;
                        padding: 0 15px;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 15px;
                        align-items: center;
                        border-bottom: 1px solid #EEE;
                    }
                    #setting-dialog section header .icon-close > img {
                        width: 20px;
                        cursor: pointer;
                    }
                    #setting-dialog section article .row {
                        margin: 0;
                        margin-bottom: 10px;
                    }
                    #setting-dialog section article .row .color-picker-box {
                        margin-bottom: 10px;
                    }
                    #setting-dialog section article .row > label {
                        font-weight: bold;
                    }
                    #setting-dialog section article button { color: #409EFF; background-color: #FAFAFA; padding: 4px; margin: 2.5px; border: 1px solid: #EEE; border-radius: 3px; }
                    #setting-dialog section article button:hover { background-color: #EEE; }
                    #setting-dialog section article button#btn-clear-bg { color: #F56C6C; }
                    #setting-dialog section article button#btn-clear-bgColor { color: #F56C6C; }
                    #setting-dialog section article button#btn-update-bg { color: #E6A23C; }
                    /* #setting-dialog section article button#btn-use-current { color: #909399; } */
                    /* 链接输入框 */
                    #custom-bg-url {
                        width: 100%;
                        margin-right: 10px;
                        height: 25px;
                        border-radius: 3px;
                        border: 2px solid #DDD;
                    }
                    #setting-dialog section article .row#defaultHideMenu-wrap > .content > label {
                        cursor: pointer;
                        margin-right: 15px;
                    }
                    #setting-dialog section article .row#defaultHideMenu-wrap > .content > label >input {
                        vertical-align: middle;
                    }
                    #setting-dialog section article .row > .content {
                        display: flex;
                        width: 500px;
                        flex-wrap: wrap;
                        align-items: center;
                    }
                    #setting-dialog section article .row > .content > div {
                        color: grey;
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    #setting-dialog section article .row > .content > div:hover {
                        color: #000;
                    }
                    #setting-dialog section article .row > .content > div.STATE_SELECTED_CATEGORY {
                        color: #F60;
                        font-size: 20px;
                        letter-spacing: 1px;
                    }
                    #setting-dialog section article {
                        max-width: 550px;
                        padding: 20px;
                        height: calc(100% - 50px);
                        overflow: auto;
                    }
                    #setting-dialog section article::-webkit-scrollbar {/*滚动条整体样式*/
                        width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
                        height: 6px;
                    }
                    #setting-dialog section article::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                        border-radius: 10%;
                        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
                        background: rgba(0,0,0,0.3);
                    }
                    #setting-dialog section article::-webkit-scrollbar-track {/*滚动条里面轨道*/
                        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
                        border-radius: 0;
                        background: rgba(0,0,0,0.1);
                    }
                    /* 弹窗内部样式 */
                    #setting-dialog section {
                        min-width: 500px;
                        height: 75vh;
                        max-height: 520px;
                        min-height: 370px;
                        /* overflow: auto; */
                        background-color: #FFF;
                        /* border-radius: 5px; */
                        border: 2px solid #EEE;
                    }
                    /* 自定义补充样式 */
                    .display-none {display: none !important;}
                    #setting-dialog .tips-line { color: grey; font-size: 12px }
                    #setting-dialog .link { color: blue; }
                    @-webkit-keyframes rotation{
                        from {-webkit-transform: rotate(0deg);}
                        to {-webkit-transform: rotate(360deg);}
                    }
                `
                return sheets
            },
            // 通过注入 css 实现隐藏广告并固定布局
            appendSheets() {
                const sheet = document.createTextNode(this._getSheets())
                const el = document.createElement('style')
                el.id = 'CSDM-cleaner-sheets'
                el.appendChild(sheet)
                document.getElementsByTagName('head')[0].appendChild(el)
                return this
            },
            // injectScriptElement(id, scriptCode) {
            //     const existsScript = document.getElementById(id)
            //     if (existsScript) existsScript.remove()
            //     const head = document.querySelector('head')
            //     const script = document.createElement('script')
            //     // script.innerText = scriptCode
            //     script.id = id
            //     const code = document.createTextNode(scriptCode)
            //     script.appendChild(code)
            //     head.appendChild(script)
            // },
            // // 复制功能
            // cleanCopy() {
            //     try {
            //         window.$CSDNCleaner.injectScriptElement('clean-copy-script', `
            //             /** 解禁复制功能 - ${window.$CSDNCleaner.NAME} */
            //             try { if (window.hljs) window.hljs.signin = window.hljs.copyCode } catch(err) {};
            //             try { if (window.mdcp) window.mdcp.signin = window.mdcp.copyCode } catch(err) {};
            //             /** 将 copyright 改为不可写, 防止添加复制事件 */
            //             if (window.csdn) {
            //                 try {
            //                     Object.defineProperty(window.csdn.copyright, 'init', {
            //                         value: function() {
            //                             $("#content_views").unbind("copy");
            //                         },
            //                         writable: false,
            //                     })
            //                     Object.defineProperty(window.csdn.copyright, 'textData', {
            //                         value: '',
            //                         writable: false,
            //                     })
            //                 } catch (err) {}
            //                 $("#content_views").bind('click', function() {
            //                     $("#content_views").unbind("copy");
            //                 });
            //             }
            //         `)
            //     } catch(err) {
            //         console.log('cleanCopy() failed: ', err)
            //     }
            //     return this
            // },
            onLoad() {
                /** 初始化目录 attribute */
                window.$CSDNCleaner.BackgroundImageRange.syncShowCatalogue()
                // 图片下的底色
                // document.body.setAttribute('style', 'background-color:#EAEAEA !important')
                // 解除跳转拦截
                $ && $("#content_views") && $("#content_views").off('click')
                // 初始化右侧 bottom menu tool bar
                window.$CSDNCleaner._loadSettings()
                window.$CSDNCleaner.cleanCopy() // 解禁复制功能
                window.$CSDNCleaner._launchPagintion() // 解禁并初始化分页组件
                window.$CSDNCleaner.showSourceLink() // 转载的文章显示原文链接
                window.$CSDNCleaner.loadColorPicker() // 加载 color picker
                window.$CSDNCleaner.disabledDarkSkin() // 禁用暗黑系 css 样式
                window.$CSDNCleaner.loadRoundSliderResources() // 加载 color picker
                    .then(() => {
                        window.$CSDNCleaner.initRoundSlider() // 加载 round slider
                    })
            },
            _launchPagintion() {
                // 监听数据层变动并动态控制分页组件显示
                if (!csdn.comments) return
                Object.defineProperty(csdn.comments, 'pageCount', {
                    get() { return this._$pageCount || 1 },
                    set(v) {
                        console.log('set pageCount: ', v)
                        this._$pageCount = v // 先保存页数
                        Toolkit.showDom('#commentPage', v > 1) // 1. 控制分页组件显示
                        window.$CSDNCleaner._initPagintion() // 2. 重构评论区样式
                    }
                })
            },
            _initPagintion() {
                // to bo continue ...
            },
            // 初始化 Options
            initSettings() {
                return this
            },
            async _loadSettings() {
                const settingOption = this._fetchSettingOption()
                for (let times = 20; times--;) {
                    await Toolkit.delay(300)
                    const wrapper = document.querySelector('.csdn-side-toolbar')
                    if (!wrapper) continue
                    wrapper.appendChild(settingOption)
                }
            },
            _fetchSettingOption() {
                const opt = this._getOption({ dataType: '$setting', img: SETTING_SVG_ICON, name: '脚本<br>设置' })
                // const opt = this._getOption({ dataType: '$setting', img: 'https://images.gitbook.cn/FuMNvLb25yJ4RiEg_2OnS8jpI8aB', name: '脚本<br>设置' })
                if (window.$CSDNCleaner.BackgroundImageRange.range.defaultHideMenu) opt.classList.add('defaultHideMenu')
                opt.addEventListener('click', evt => {
                    this.toggleDialog()
                })
                this._fetchSettingDialog()._bindDialogEvents()
                return opt
            },
            _fetchSettingDialog() {
                const settingDialog = document.createElement('div')
                settingDialog.id = 'setting-dialog'
                settingDialog.classList.add('display-none')
                const categorys = BackgroundImageRange.toCategoryHTML()
                const { url, name, category, html } = window.$CSDNCleaner.BackgroundImageRange.currentUrl
                const currentBackgroundHTML = html
                settingDialog.innerHTML = `
                    <section>
                        <header>
                            <div>
                                <span class="title">脚本设置</span>
                                <!-- <span> - </span> -->
                                <!-- <span class="script-name">[${this.NAME}]</span> -->
                            </div>
                            <div class="icon-close">
                                <img src="https://csdnimg.cn//cdn/content-toolbar/guide-close-btn.png">
                            </div>
                        </header>
                        <article>
                            <div class="row">
                                <label>当前背景图: </label>
                                <div class="content" id="setting-background-label">
                                    ${currentBackgroundHTML}
                                </div>
                                <button type="reset" id="btn-update-bg">刷新背景图片</button>
                            </div>
                            <div class="row">
                                <label>背景图片类目范围(点选): </label>
                                <div class="content">
                                    ${categorys}
                                </div>
                            </div>
                            <div class="row">
                                <label>自定义背景图片链接(固定使用此链接): </label>
                                <div class="tips-line">您可以选择上传百度首页自定义背景图片, 然后将链接填入</div>
                                <div class="content">
                                    <input id="custom-bg-url" value="${BackgroundImageRange.range.customUrl}"/>
                                    <button type="reset" id="btn-clear-bg">清除</button>
                                    <button type="button" id="btn-save-bg">保存</button>
                                    <button type="button" id="btn-use-current">使用当前图片</button>
                                </div>
                            </div>
                            <div class="row">
                                <label>文章宽度: </label>
                                <div class="color-picker-box">
                                    <div class="tips-line">
                                        <span>
                                            宽度基于源码中的
                                            <code>.container</code>
                                            的宽度, 详见
                                            <a href="https://github.com/SublimeCT/greasy_monkey_scripts/issues/4#issuecomment-675349913">#4</a>
                                        </span>
                                    </div>
                                    <div id="weight-slider" class="round-slider-wrapper"></div>
                                </div>
                            </div>
                            <div class="row">
                                <label>纯色背景(优先使用): </label>
                                <div class="color-picker-box">
                                    <div class="tips-line">
                                        <span>优先级高于自定义图片, 选择纯色背景将覆盖已添加的背景图片链接</span>
                                        <button type="reset" id="btn-clear-bgColor">清除</button>
                                    </div>
                                    <div class="content">
                                        <div class="color-picker-container"
                                            acp-palette="PALETTE_MATERIAL_CHROME"
                                            acp-palette-editable
                                            acp-color="${BackgroundImageRange.range.bgColor}"></div>
                                    </div>
                                </div
                            </div>
                            <div class="row" id="showSourceLink-wrap">
                                <label>是否显示 原文链接: </label>
                                <div class="tips-line">原文链接从顶部文章信息或原文中提取, 若作者直接文中写入原文链接(未在文章信息中标注), 有可能会匹配错误</div>
                                <div class="content">
                                    <label style="margin-right: 15px;">
                                        <input type="radio" value="0" ${BackgroundImageRange.range.showSourceLink ? '' : 'checked'} class="radio-showSourceLink" name="showSourceLink" />
                                        <span>隐藏</span>
                                    </label>
                                    <label style="margin-right: 15px;">
                                        <input type="radio" value="1" ${BackgroundImageRange.range.showSourceLink ? 'checked' : ''} class="radio-showSourceLink" name="showSourceLink" />
                                        <span>显示</span>
                                    </label>
                                </div>
                            </div>
                            <div class="row" id="defaultHideMenu-wrap">
                                <label>是否隐藏 设置(小齿轮)按钮: </label>
                                <div class="tips-line">隐藏之后设置(小齿轮)按钮会与回到顶部按钮同步显示和隐藏</div>
                                <div class="content">
                                    <label style="margin-right: 15px;">
                                        <input type="radio" value="1" ${BackgroundImageRange.range.defaultHideMenu ? 'checked' : ''} class="radio-defaultHideMenu" name="defaultHideMenu" />
                                        <span>隐藏</span>
                                    </label>
                                    <label>
                                        <input type="radio" value="0" ${BackgroundImageRange.range.defaultHideMenu ? '' : 'checked'} class="radio-defaultHideMenu" name="defaultHideMenu" />
                                        <span>显示</span>
                                    </label>
                                </div>
                            </div>
                            <div class="row" id="hideRecommendBox-wrap">
                                <label>是否隐藏所有 推荐文章: </label>
                                <div class="tips-line">隐藏之后将不会显示底部的推荐文章列表</div>
                                <div class="content">
                                    <label style="margin-right: 15px;">
                                        <input type="radio" value="1" ${BackgroundImageRange.range.hideRecommendBox ? 'checked' : ''} class="radio-hideRecommendBox" name="hideRecommendBox" />
                                        <span>隐藏</span>
                                    </label>
                                    <label>
                                        <input type="radio" value="0" ${BackgroundImageRange.range.hideRecommendBox ? '' : 'checked'} class="radio-hideRecommendBox" name="hideRecommendBox" />
                                        <span>显示</span>
                                    </label>
                                </div>
                            </div>
                            <div class="row" id="hideCopyright-wrap">
                                <label>是否隐藏最底部 csdn版权信息: </label>
                                <div class="tips-line">隐藏之后将不会显示页面最底部的 footer</div>
                                <div class="content">
                                    <label style="margin-right: 15px;">
                                        <input type="radio" value="1" ${BackgroundImageRange.range.hideCopyright ? 'checked' : ''} class="radio-hideCopyright" name="hideCopyright" />
                                        <span>隐藏</span>
                                    </label>
                                    <label>
                                        <input type="radio" value="0" ${BackgroundImageRange.range.hideCopyright ? '' : 'checked'} class="radio-hideCopyright" name="hideCopyright" />
                                        <span>显示</span>
                                    </label>
                                </div>
                            </div>
                            <div class="row" id="showCatalogue-wrap">
                                <label>是否显示目录栏: </label>
                                <div class="tips-line">开启之后会显示文章目录(若存在)</div>
                                <div class="content">
                                    <label style="margin-right: 15px;">
                                        <input type="radio" value="0" ${BackgroundImageRange.range.showCatalogue ? '' : 'checked'} class="radio-showCatalogue" name="showCatalogue" />
                                        <span>隐藏</span>
                                    </label>
                                    <label>
                                        <input type="radio" value="1" ${BackgroundImageRange.range.showCatalogue ? 'checked' : ''} class="radio-showCatalogue" name="showCatalogue" />
                                        <span>显示</span>
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <label>联系作者: </label>
                                <div class="content">
                                    <div class="tips-line">源码:</div>
                                    <div class="tips-line">
                                        <a class="link" href="https://github.com/SublimeCT/greasy_monkey_scripts" target="_blank">Github</a>
                                    </div>
                                </div>
                                <div class="content">
                                    <div class="tips-line">反馈:</div>
                                    <div class="tips-line">
                                        <a class="link" href="https://greasyfork.org/zh-CN/scripts/373457-csdn-%E5%8E%BB%E5%B9%BF%E5%91%8A%E6%B2%89%E6%B5%B8%E9%98%85%E8%AF%BB%E6%A8%A1%E5%BC%8F/feedback" target="_blank">greasyfork page</a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                `
                document.body.appendChild(settingDialog)
                return this
            },
            _bindDialogEvents() {
                const dialogWrapper = document.getElementById('setting-dialog')
                const urlInput = document.getElementById('custom-bg-url')
                const saveUrlBtn = document.getElementById('btn-save-bg')
                const updateBgImageBtn = document.getElementById('btn-update-bg')
                const clearBgColorBtn = document.getElementById('btn-clear-bgColor')
                const saveCurrentImgBtn = document.getElementById('btn-use-current')
                const clearUrlBtn = document.getElementById('btn-clear-bg')
                const hideMenuWrap = document.getElementById('defaultHideMenu-wrap')
                const hideRecommendBox = document.getElementById('hideRecommendBox-wrap')
                const hideCopyright = document.getElementById('hideCopyright-wrap')
                const showCatalogue = document.getElementById('showCatalogue-wrap')
                const showSourceLinkWrap = document.getElementById('showSourceLink-wrap')
                if (!dialogWrapper) { console.error(`[${window.$CSDNCleaner.NAME}] Internal error. dialog init failed.`); return }
                dialogWrapper.addEventListener('click', evt => {
                    if (evt.target.id === 'setting-dialog' || evt.target.classList.contains('icon-close') || evt.target.parentNode.classList.contains('icon-close')) { // 关闭弹窗
                        window.$CSDNCleaner.toggleDialog()
                    } else if (evt.target.classList.contains('category')) { // 选择背景图片类目
                        const key = evt.target.attributes.getNamedItem('data-key').value
                        let existsIndex = -1
                        if (BackgroundImageRange.range.categorys.length > 0) {
                            for (let cIndex = BackgroundImageRange.range.categorys.length; cIndex--;) {
                                if (BackgroundImageRange.range.categorys[cIndex] === key) {
                                    existsIndex = cIndex
                                    break
                                }
                            }
                        }
                        if (existsIndex === -1) {
                            BackgroundImageRange.range.categorys.push(key)
                            evt.target.classList.add('STATE_SELECTED_CATEGORY')
                        } else {
                            BackgroundImageRange.range.categorys.splice(existsIndex, 1)
                            evt.target.classList.remove('STATE_SELECTED_CATEGORY')
                        }
                        BackgroundImageRange.save()
                    }
                })
                // urlInput.addEventListener('input', evt => {
                //     saveUrlBtn.setAttribute('disabled', urlInput.value != BackgroundImageRange.range.customUrl)
                // })
                saveUrlBtn.addEventListener('click', evt => {
                    if (urlInput.value && !/^http(s)?\:.+/.test(urlInput.value)) {
                        alert('请输入正确的图片链接')
                        return false
                    }
                    BackgroundImageRange.range.customUrl = urlInput.value
                    BackgroundImageRange.save()
                })
                saveCurrentImgBtn.addEventListener('click', evt => {
                    const { url } = window.$CSDNCleaner.BackgroundImageRange.currentUrl
                    if (!url) return false
                    urlInput.value = url
                    BackgroundImageRange.range.customUrl = url
                    BackgroundImageRange.save()
                    BackgroundImageRange.updateBgImage(url)
                })
                clearUrlBtn.addEventListener('click', evt => {
                    urlInput.value = BackgroundImageRange.range.customUrl = ''
                    BackgroundImageRange.save()
                })
                clearBgColorBtn.addEventListener('click', evt => {
                    BackgroundImageRange.setBgColor()
                })
                updateBgImageBtn.addEventListener('click', evt => {
                    BackgroundImageRange.updateBgImage(null, !!BackgroundImageRange.range.bgColor)
                })
                hideMenuWrap.addEventListener('change', evt => {
                    const dom = evt.target
                    if (!dom || !dom.classList || !dom.classList.contains('radio-defaultHideMenu')) return
                    const val = !!Number(dom.value)
                    urlInput.defaultHideMenu = BackgroundImageRange.range.defaultHideMenu = val
                    BackgroundImageRange.save()
                })
                hideRecommendBox.addEventListener('change', evt => {
                    const dom = evt.target
                    if (!dom || !dom.classList || !dom.classList.contains('radio-hideRecommendBox')) return
                    const val = !!Number(dom.value)
                    urlInput.hideRecommendBox = BackgroundImageRange.range.hideRecommendBox = val
                    BackgroundImageRange.save()
                })
                hideCopyright.addEventListener('change', evt => {
                    const dom = evt.target
                    if (!dom || !dom.classList || !dom.classList.contains('radio-hideCopyright')) return
                    const val = !!Number(dom.value)
                    urlInput.hideCopyright = BackgroundImageRange.range.hideCopyright = val
                    BackgroundImageRange.save()
                })
                showCatalogue.addEventListener('change', evt => {
                    const dom = evt.target
                    if (!dom || !dom.classList || !dom.classList.contains('radio-showCatalogue')) return
                    const val = !!Number(dom.value)
                    BackgroundImageRange.range.showCatalogue = val
                    BackgroundImageRange.save()
                })
                showSourceLinkWrap.addEventListener('change', evt => {
                    const dom = evt.target
                    if (!dom || !dom.classList || !dom.classList.contains('radio-showSourceLink')) return
                    const val = !!Number(dom.value)
                    // console.log('>>>', val, urlInput.showSourceLink, dom)
                    BackgroundImageRange.range.showSourceLink = val
                    document.body.style.setProperty('--source-link-wrapper-display', window.$CSDNCleaner.BackgroundImageRange.getSourceLinkDisplay())
                    BackgroundImageRange.save()
                })
            },
            toggleDialog() {
                const dialog = document.getElementById('setting-dialog')
                if (!dialog) throw new Error('dialog not found')
                dialog.classList.toggle('display-none')
            },
            _getOption({ dataType, img, name }) {
                const option = document.createElement('a')
                option.classList.add('option-box')
                option.setAttribute('data-type', dataType)
                const imgNode = document.createElement('img')
                if (img.indexOf('<svg') !== 0) {
                    imgNode.src = img
                }
                const optionName = document.createElement('span')
                optionName.classList.add('show-txt')
                optionName.innerHTML = name
                option.appendChild(imgNode)
                if (img.indexOf('<svg') === 0) {
                    imgNode.outerHTML = img
                }
                option.appendChild(optionName)
                return option
            },
            _sourceLinkKeywords: ['转载自', '转自', '原文地址', '原文链接', '转载地址', '转载链接', '原文:', '原文：'],
            _getSourceLink(row) {
                for (const keyword of this._sourceLinkKeywords) {
                    if (row.indexOf(keyword) === -1) continue
                    // 1. 尝试从 <a> 标签中获取链接
                    const attrMatchRes = row.match(/href="(.*?)"/)
                    const attr = attrMatchRes && attrMatchRes[1]
                    if (attr) return attr
                    // 2. 尝试获取整段链接内容
                    const partMatchRes = row.replace(/<\/?[\w|\d]+>/g, '').match(/(https?:\/\/.*)\s?.*$/)
                    const part = partMatchRes && partMatchRes[1]
                    if (part) return part
                }
            },
            showSourceLink() {
                const sourceDom = document.querySelector('.article-source-link')
                let sourceLink = ''
                if (sourceDom) { // 从顶部折叠面板中获取
                    let hasSourceLink = false
                    for (const keyword of this._sourceLinkKeywords) {
                        if (sourceDom.innerHTML.indexOf(keyword) !== -1) {
                            hasSourceLink = true
                            break
                        }
                    }
                    if (hasSourceLink) {
                        const linkDom = sourceDom.querySelector('a')
                        if (linkDom) sourceLink = linkDom && linkDom.innerText
                    }
                } else {
                    // 从文中匹配, 从文末取 _sourceLinkCheckLineSize 行, 若包含 _sourceLinkKeywords 中的内容则使用正则匹配该行中包含的链接
                    if (!document.getElementById('article_content')) return false
                    const articleRaw = document.getElementById('article_content').innerHTML
                    const articleLastLines = articleRaw.split('\n')
                    // 倒序遍历, 优先取文末的原文链接
                    for (const row of articleLastLines) {
                        const link = this._getSourceLink(row)
                        if (link) {
                            sourceLink = link
                            break
                        }
                    }
                }
                if (!sourceLink) return
                this.appendSourceLinkDom(sourceLink)
                console.log(`%c[${window.$CSDNCleaner.NAME}] 当前文章可能是转载的, 匹配到原文链接: ${sourceLink}`, 'color: teal')
            },
            appendSourceLinkDom(link) {
                const sourceLinkLabelWrapperDom = document.createElement('div')
                const sourceLinkIconDom = document.createElement('img')
                const sourceLinkLabelDom = document.createElement('span')
                const sourceLinkLinkDom = document.createElement('a')
                sourceLinkLabelWrapperDom.classList.add('source-link-wrapper')
                sourceLinkIconDom.classList.add('article-heard-img')
                sourceLinkIconDom.classList.add('source-link-icon')
                sourceLinkIconDom.setAttribute('src', 'https://csdnimg.cn/release/phoenix/template/new_img/shareWhite.png')
                sourceLinkLabelDom.classList.add('source-link-label')
                sourceLinkLabelDom.innerText = '转载自:'
                sourceLinkLinkDom.classList.add('follow-nickName')
                sourceLinkLinkDom.classList.add('source-link-link')
                sourceLinkLinkDom.innerText = link
                sourceLinkLinkDom.setAttribute('href', link)
                sourceLinkLinkDom.setAttribute('title', link)
                sourceLinkLinkDom.setAttribute('target', '_blank')

                sourceLinkLabelWrapperDom.appendChild(sourceLinkIconDom)
                sourceLinkLabelWrapperDom.appendChild(sourceLinkLabelDom)
                sourceLinkLabelWrapperDom.appendChild(sourceLinkLinkDom)
                // 插入页面中
                const wrapper = document.querySelector('.bar-content')
                // console.log(wrapper)
                if (wrapper) wrapper.appendChild(sourceLinkLabelWrapperDom)
            },
            loadColorPicker() {
                if (!window.AColorPicker) return
                window.AColorPicker.from('div.color-picker-container')
                    .on('change', (picker, color) => {
                        BackgroundImageRange.setBgColor(color)
                    })
            },
            disabledDarkSkin() {
                const sheets = document.querySelectorAll('link')
                for (const sheet of Array.from(sheets)) {
                    if (sheet.href.indexOf('template/themes_skin/skin-') > 0) {
                        sheet.setAttribute('disabled', 'disabled')
                    }
                }
                return this
            },
            async loadRoundSliderResources() {
                await this.loadResourcesFiles('link', 'https://cdn.jsdelivr.net/npm/round-slider@1.6.1/dist/roundslider.min.css')
                // await this.loadResourcesFiles('script', 'https://cdn.jsdelivr.net/npm/round-slider@1.6.1/dist/roundslider.min.js')
            },
            loadResourcesFiles(tagName = 'link', href, wait = true) {
                const tag = document.createElement(tagName)
                let hrefAttr = 'href'
                switch (tagName) {
                    case 'link':
                        tag.setAttribute('rel', 'stylesheet')
                        break;
                    case 'script':
                        hrefAttr = 'src'
                        break;
                }
                tag.setAttribute(hrefAttr, href)
                document.head.appendChild(tag)
                return new Promise((resolve, reject) => {
                    tag.addEventListener('load', evt => resolve(tag))
                    tag.addEventListener('error', evt => reject(tag))
                })
            },
            initRoundSlider() {
                if (!window.changeTooltip) window.changeTooltip = this.changeTooltip
                $('#weight-slider').roundSlider({
                    sliderType: 'min-range',
                    editableTooltip: false,
                    radius: 105,
                    width: 16,
                    value: window.$CSDNCleaner.BackgroundImageRange.range.articleWeightRate || 100,
                    handleSize: 0,
                    handleShape: 'square',
                    circleShape: 'pie',
                    startAngle: 315,
                    tooltipFormat: 'changeTooltip',
                    update: this.onUpdateRoundSlider
                })
            },
            onUpdateRoundSlider(evt) {
                window.$CSDNCleaner.BackgroundImageRange.setArticleWeight(evt.value)
            },
            changeTooltip(e) {
                const val = e.value
                let speed = '';
                if (val < 40) speed = 'Slow';
                else if (val < 65) speed = 'Normal';
                else if (val < 90) speed = 'Speed';
                else speed = 'Very Speed';

                return val + '%' + '<div>' + speed + '<div>';
            }
        }
        window.$CSDNCleaner.init()
    })()
})();