import { Toolkit } from "../utils/Toolkit"
import { config } from "../State"
import ImageWorker from './Image.worker?worker&inline'
import type { CustomRequestOptions, SettledFileInfo } from "naive-ui/es/upload/src/interface"
import { ref } from "vue"
import { DB, DBTable } from "./AppStorage"
import { WorkerMessageMethod } from "./WorkerTypes"

export class BackgroundImage {
  /** 爬到的所有现在可访问的背景图ID */
  static readonly IMG_CATEGORYS: Record<string, Array<number>> = { "热门": [887, 886, 883, 882, 881, 880, 879, 878, 877, 876, 874, 875, 872, 873, 859, 832, 833, 834, 827, 828, 829, 830, 831, 817, 818, 819, 820, 821, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 796, 797, 798, 799, 800, 801, 802, 803, 804, 776, 777, 778, 781, 784, 765, 767, 768, 766, 611, 610, 608, 720], "冒险岛2": [860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871], "守望先锋": [835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846], "魔兽世界": [721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732], "炉石传说": [733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744], "风暴英雄": [660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671], "暗黑破坏神Ⅲ": [672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683], "星际争霸II": [684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695], "冷兔": [749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760], "阿狸": [521, 114, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532], "炮炮兵": [540, 534, 535, 536, 537, 538, 539, 533, 541, 542, 543, 544], "林心如": [437, 438, 440, 439, 441, 443, 447, 444, 445, 446, 442, 448], "郑爽": [509, 510, 511, 512, 515, 514, 513, 516, 517, 518, 519, 520], "戚薇": [449, 456, 451, 452, 453, 454, 455, 450, 457, 459, 458, 460], "佟丽娅": [485, 486, 490, 488, 489, 487, 491, 492, 493, 494, 495, 496], "Angelababy": [400, 401, 402, 403, 407, 405, 406, 410, 404, 409, 408, 411], "唐嫣": [473, 474, 475, 482, 480, 478, 479, 477, 476, 481, 483, 484], "李冰冰": [424, 425, 427, 430, 426, 429, 428, 431, 432, 433, 434, 435], "高圆圆": [412, 413, 418, 415, 416, 417, 414, 419, 420, 421, 422, 423], "孙俪": [461, 462, 463, 464, 471, 466, 468, 467, 469, 470, 465, 472], "姚晨": [497, 498, 499, 506, 502, 501, 503, 504, 505, 507, 500, 508], "杨幂": [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211], "刘诗诗": [273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283], "胡歌": [260, 261, 262, 263, 628, 629, 630, 631, 268, 269, 270, 271], "邓紫棋": [320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331], "赵丽颖": [249, 2481, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259], "马天宇": [284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295], "陈晓": [233, 225, 226, 227, 228, 229, 230, 231, 232, 224, 234, 235], "陈伟霆": [308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319], "柳岩": [236, 2371, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247], "吴奇隆": [297, 298, 299, 300, 301, 302, 304, 296, 305, 306, 307], "风景": [822, 823, 824, 825, 826, 54, 62, 5, 37, 115, 116, 117, 118, 120, 122, 123, 49, 25, 121, 26, 43, 45, 48, 51, 70, 4, 10, 11, 17, 23, 6, 28, 38, 16, 31, 42, 163, 164, 165, 166, 167, 168, 170, 171, 172, 174, 175, 177, 178, 179, 180, 181, 182, 184, 185, 186, 69, 57, 13, 67], "简约": [12, 111, 114, 53, 27, 33, 41, 35, 2, 14, 44, 21, 36, 8, 150, 125, 1, 169, 173, 176, 183, 46, 61, 47, 52, 64, 24, 58, 18, 59, 55, 9, 20], "小清新": [74, 71, 113, 119, 124, 29, 65, 32, 34, 39, 40, 50, 60, 73, 30, 63, 126, 128, 66, 19, 112, 22, 68, 7, 15, 3, 56] }
  /** 每张图片的名称 */
  static readonly IMG_MAP: Record<number, string> = { "1": "原野 全景图片", "2": "银汉迢迢 全景图片", "3": "紫色郁金香 百度相册", "4": "飞瀑如练 全景图片", "5": "梦里水乡 探摄小子", "6": "长天一色 全景图片", "7": "春意浓 sprint207", "8": "暮色四合 探摄小子", "9": "出水芙蓉 探摄小子", "10": "壁立千仞 全景图片", "11": "廊桥遗梦 探摄小子", "12": "寥落星河 全景图片", "13": "层林尽染 全景图片", "14": "晨曦 探摄小子", "15": "早梅争春 探摄小子", "16": "千山雪 刘霄", "17": "海之梦 全景图片", "18": "白色飞羽 sprint207", "19": "在路上 jesse2young", "20": "锦鲤 sprint207", "21": "雨夜 yunxiaoqian", "22": "水墨江南 戈斯拉918", "23": "城市之光 戈斯拉918", "24": "三叶草 wanzathe", "25": " 全景图片", "26": " 全景图片", "27": " 全景图片", "28": " 全景图片", "29": " 全景图片", "30": " 全景图片", "31": " 全景图片", "32": " 全景图片", "33": " 全景图片", "34": " 全景图片", "35": " 全景图片", "36": " 全景图片", "37": " 全景图片", "38": " 全景图片", "39": " 全景图片", "40": " 全景图片", "41": " 全景图片", "42": " 全景图片", "43": " 全景图片", "44": " 全景图片", "45": " 全景图片", "46": " 全景图片", "47": " 全景图片", "48": " 全景图片", "49": " 全景图片", "50": " 全景图片", "51": " 全景图片", "52": " 全景图片", "53": " ranklau", "54": " silsnow", "55": " weifengqingyu", "56": " 张云洁01", "57": " tiffanywangbei", "58": " ying_ok_delang", "59": " sherry_dundun", "60": " 源形毕露", "61": " 路璐", "62": " richard-wang", "63": " 源形毕露", "64": " 圣名若瑟", "65": " 米壹映画", "66": " 米壹映画", "67": " 路璐", "68": " 路璐", "69": " 毛嘉文", "70": " richard-wang", "71": " fish,胡子鱼", "73": " fish,胡子鱼", "74": " fish,胡子鱼", "111": " 全景图片", "112": " fish，胡子鱼", "113": " fish，胡子鱼", "114": " 全景图片", "115": " 彼岸Claire", "116": " 落绪纷飞", "117": " 魔神咒", "118": " lemonchen07", "119": " 决明", "120": " 长老亮", "121": " 蓝月玩转西部", "122": " 小pie", "123": " woodfishbbi", "124": " 早川", "125": "波涛汹涌 全景", "126": "火车飞驰 全景", "128": "演唱会 全景", "150": "激情世界杯 ", "163": " shenmishashou", "164": " 我叫孟夕", "165": " 穷游晓明", "166": " 1024小虎牙", "167": " shenmishashou", "168": " shenmishashou", "169": " 0535xiaoyudi", "170": " 穷游晓明", "171": " 西西里玩不停", "172": " 西西里玩不停", "173": " 1024小虎牙", "174": " shenmishashou", "175": " 穷游晓明", "176": " 1024小虎牙", "177": " 我叫孟夕", "178": " 1024小虎牙", "179": " shenmishashou", "180": " 西西里玩不停", "181": " 我叫孟夕", "182": " 蓝色呓语", "183": " 西西里玩不停", "184": " 西西里玩不停", "185": " 我叫孟夕", "186": " 西西里玩不停", "200": "杨幂0", "201": "杨幂1", "202": "杨幂2", "203": "杨幂3", "204": "杨幂4", "205": "杨幂5", "206": "杨幂6", "207": "杨幂7", "208": "杨幂8", "209": "杨幂9", "210": "杨幂10", "211": "杨幂11", "224": "陈晓9", "225": "陈晓1", "226": "陈晓2", "227": "陈晓3", "228": "陈晓4", "229": "陈晓5", "230": "陈晓6", "231": "陈晓7", "232": "陈晓8", "233": "陈晓0", "234": "陈晓10", "235": "陈晓11", "236": "柳岩0", "238": "柳岩2", "239": "柳岩3", "240": "柳岩4", "241": "柳岩5", "242": "柳岩6", "243": "柳岩7", "244": "柳岩8", "245": "柳岩9", "246": "柳岩10", "247": "柳岩11", "249": "赵丽颖0", "250": "赵丽颖2", "251": "赵丽颖3", "252": "赵丽颖4", "253": "赵丽颖5", "254": "赵丽颖6", "255": "赵丽颖7", "256": "赵丽颖8", "257": "赵丽颖9", "258": "赵丽颖10", "259": "赵丽颖11", "260": "胡歌0", "261": "胡歌1", "262": "胡歌2", "263": "胡歌3", "268": "胡歌8", "269": "胡歌9", "270": "胡歌10", "271": "胡歌11", "273": "刘诗诗0", "274": "刘诗诗1", "275": "刘诗诗2", "276": "刘诗诗3", "277": "刘诗诗4", "278": "刘诗诗5", "279": "刘诗诗6", "280": "刘诗诗7", "281": "刘诗诗8", "282": "刘诗诗9", "283": "刘诗诗10", "284": "马天宇0", "285": "马天宇1", "286": "马天宇2", "287": "马天宇3", "288": "马天宇4", "289": "马天宇5", "290": "马天宇6", "291": "马天宇7", "292": "马天宇8", "293": "马天宇9", "294": "马天宇10", "295": "马天宇11", "296": "吴奇隆7", "297": "吴奇隆0", "298": "吴奇隆1", "299": "吴奇隆2", "300": "吴奇隆3", "301": "吴奇隆4", "302": "吴奇隆5", "304": "吴奇隆6", "305": "吴奇隆8", "306": "吴奇隆9", "307": "吴奇隆10", "308": "陈伟霆0", "309": "陈伟霆1", "310": "陈伟霆2", "311": "陈伟霆3", "312": "陈伟霆4", "313": "陈伟霆5", "314": "陈伟霆6", "315": "陈伟霆7", "316": "陈伟霆8", "317": "陈伟霆9", "318": "陈伟霆10", "319": "陈伟霆11", "320": "邓紫棋0", "321": "邓紫棋1", "322": "邓紫棋2", "323": "邓紫棋3", "324": "邓紫棋4", "325": "邓紫棋5", "326": "邓紫棋6", "327": "邓紫棋7", "328": "邓紫棋8", "329": "邓紫棋9", "330": "邓紫棋10", "331": "邓紫棋11", "400": "Angelababy0", "401": "Angelababy1", "402": "Angelababy2", "403": "Angelababy3", "404": "Angelababy8", "405": "Angelababy5", "406": "Angelababy6", "407": "Angelababy4", "408": "Angelababy10", "409": "Angelababy9", "410": "Angelababy7", "411": "Angelababy11", "412": "高圆圆0", "413": "高圆圆1", "414": "高圆圆6", "415": "高圆圆3", "416": "高圆圆4", "417": "高圆圆5", "418": "高圆圆2", "419": "高圆圆7", "420": "高圆圆8", "421": "高圆圆9", "422": "高圆圆10", "423": "高圆圆11", "424": "李冰冰0", "425": "李冰冰1", "426": "李冰冰4", "427": "李冰冰2", "428": "李冰冰6", "429": "李冰冰5", "430": "李冰冰3", "431": "李冰冰7", "432": "李冰冰8", "433": "李冰冰9", "434": "李冰冰10", "435": "李冰冰11", "437": "林心如0", "438": "林心如1", "439": "林心如3", "440": "林心如2", "441": "林心如4", "442": "林心如10", "443": "林心如5", "444": "林心如7", "445": "林心如8", "446": "林心如9", "447": "林心如6", "448": "林心如11", "449": "戚薇0", "450": "戚薇7", "451": "戚薇2", "452": "戚薇3", "453": "戚薇4", "454": "戚薇5", "455": "戚薇6", "456": "戚薇1", "457": "戚薇8", "458": "戚薇10", "459": "戚薇9", "460": "戚薇11", "461": " 陈漫", "462": "孙俪1", "463": "孙俪2", "464": "孙俪3", "465": "孙俪10", "466": "孙俪5", "467": "孙俪7", "468": " 陈漫", "469": " 陈漫", "470": "孙俪9", "471": "孙俪4", "472": "孙俪11", "473": "唐嫣0", "474": "唐嫣1", "475": "唐嫣2", "476": "唐嫣8", "477": "唐嫣7", "478": "唐嫣5", "479": "唐嫣6", "480": "唐嫣4", "481": "唐嫣9", "482": "唐嫣3", "483": "唐嫣10", "484": "唐嫣11", "485": "佟丽娅0", "486": "佟丽娅1", "487": "佟丽娅5", "488": "佟丽娅3", "489": "佟丽娅4", "490": "佟丽娅2", "491": "佟丽娅6", "492": "佟丽娅7", "493": "佟丽娅8", "494": "佟丽娅9", "495": "佟丽娅10", "496": "佟丽娅11", "497": "姚晨0", "498": "姚晨1", "499": "姚晨2", "500": "姚晨10", "501": "姚晨5", "502": "姚晨4", "503": "姚晨6", "504": "姚晨7", "505": "姚晨8", "506": "姚晨3", "507": "姚晨9", "508": "姚晨11", "509": "郑爽0", "510": "郑爽1", "511": "郑爽2", "512": "郑爽3", "513": "郑爽6", "514": "郑爽5", "515": "郑爽4", "516": "郑爽7", "517": "郑爽8", "518": "郑爽9", "519": "郑爽10", "520": "郑爽11", "521": "阿狸0", "523": "阿狸2", "524": "阿狸3", "525": "阿狸4", "526": "阿狸5", "527": "阿狸6", "528": "阿狸7", "529": "阿狸8", "530": "阿狸9", "531": "阿狸10", "532": "阿狸11", "533": "炮炮兵7", "534": "炮炮兵1", "535": "炮炮兵2", "536": "炮炮兵3", "537": "炮炮兵4", "538": "炮炮兵5", "539": "炮炮兵6", "540": "炮炮兵0", "541": "炮炮兵8", "542": "炮炮兵9", "543": "炮炮兵10", "544": "炮炮兵11", "608": "热门60", "610": "热门59", "611": "热门58", "628": "胡歌4", "629": "胡歌5", "630": "胡歌6", "631": "胡歌7", "660": "风暴英雄0", "661": "风暴英雄1", "662": "风暴英雄2", "663": "风暴英雄3", "664": "风暴英雄4", "665": "风暴英雄5", "666": "风暴英雄6", "667": "风暴英雄7", "668": "风暴英雄8", "669": "风暴英雄9", "670": "风暴英雄10", "671": "风暴英雄11", "672": "暗黑破坏神Ⅲ0", "673": "暗黑破坏神Ⅲ1", "674": "暗黑破坏神Ⅲ2", "675": "暗黑破坏神Ⅲ3", "676": "暗黑破坏神Ⅲ4", "677": "暗黑破坏神Ⅲ5", "678": "暗黑破坏神Ⅲ6", "679": "暗黑破坏神Ⅲ7", "680": "暗黑破坏神Ⅲ8", "681": "暗黑破坏神Ⅲ9", "682": "暗黑破坏神Ⅲ10", "683": "暗黑破坏神Ⅲ11", "684": "星际争霸II0", "685": "星际争霸II1", "686": "星际争霸II2", "687": "星际争霸II3", "688": "星际争霸II4", "689": "星际争霸II5", "690": "星际争霸II6", "691": "星际争霸II7", "692": "星际争霸II8", "693": "星际争霸II9", "694": "星际争霸II10", "695": "星际争霸II11", "720": "热门61", "721": "魔兽世界0", "722": "魔兽世界1", "723": "魔兽世界2", "724": "魔兽世界3", "725": "魔兽世界4", "726": "魔兽世界5", "727": "魔兽世界6", "728": "魔兽世界7", "729": "魔兽世界8", "730": "魔兽世界9", "731": "魔兽世界10", "732": "魔兽世界11", "733": "炉石传说0", "734": "炉石传说1", "735": "炉石传说2", "736": "炉石传说3", "737": "炉石传说4", "738": "炉石传说5", "739": "炉石传说6", "740": "炉石传说7", "741": "炉石传说8", "742": "炉石传说9", "743": "炉石传说10", "744": "炉石传说11", "749": "冷兔0", "750": "冷兔1", "751": "冷兔2", "752": "冷兔3", "753": "冷兔4", "754": "冷兔5", "755": "冷兔6", "756": "冷兔7", "757": "冷兔8", "758": "冷兔9", "759": "冷兔10", "760": "冷兔11", "765": "热门54", "766": "热门57", "767": "热门55", "768": "热门56", "776": " 光线影业", "777": " 光线影业", "778": " 光线影业", "781": " 光线影业", "784": " 枫海影业", "796": " 欢瑞世纪", "797": " 欢瑞世纪", "798": " 欢瑞世纪", "799": " 欢瑞世纪", "800": " 欢瑞世纪", "801": " 欢瑞世纪", "802": " 恒业影业", "803": " 周迅工作室", "804": " 华映传媒", "805": " 爱奇艺", "806": " 爱奇艺", "807": " 爱奇艺", "808": " 世纪长龙", "809": " 世纪长龙", "810": " 世纪长龙", "811": " 嘉映影业", "812": " 林心如工作室", "813": " 环球影业", "814": " 环球影业", "815": " 环球影业", "816": " 环球影业", "817": " 环球影业", "818": " 环球影业", "819": " 派拉蒙影业", "820": " 派拉蒙影业", "821": " 黄子韬工作室", "822": " 高品图像", "823": " 高品图像", "824": " 高品图像", "825": " 高品图像", "826": " 高品图像", "827": " 爱奇艺影业", "828": " 爱奇艺影业", "829": " 优酷", "830": " 基美影业", "831": " 基美影业", "832": " 魔威映画", "833": " 亚洲星光娱乐", "834": " 周冬雨工作室", "835": "守望先锋0", "836": "守望先锋1", "837": "守望先锋2", "838": "守望先锋3", "839": "守望先锋4", "840": "守望先锋5", "841": "守望先锋6", "842": "守望先锋7", "843": "守望先锋8", "844": "守望先锋9", "845": "守望先锋10", "846": "守望先锋11", "859": " 记忆大师", "860": "冒险岛20", "861": "冒险岛21", "862": "冒险岛22", "863": "冒险岛23", "864": "冒险岛24", "865": "冒险岛25", "866": "冒险岛26", "867": "冒险岛27", "868": "冒险岛28", "869": "冒险岛29", "870": "冒险岛210", "871": "冒险岛211", "872": " 天龙八部", "873": " 天龙八部", "874": " 变形金刚ol", "875": " 变形金刚ol", "876": " 一品芝麻狐", "877": " 一品芝麻狐", "878": " 一品芝麻狐", "879": " 一品芝麻狐", "880": " 一品芝麻狐", "881": " 一品芝麻狐", "882": " 白敬亭", "883": " 剑灵", "886": " 最强nba", "887": " 最强nba", "2371": "柳岩1", "2481": "赵丽颖1" }

  /** 当前 image ID / 自定义 url, 用于标记当前显示的图片 */
  static idOrUrl: string | number = ''

  /** 获取新的背景图片地址 */
  static getImgUrl() {
    const customUrl = config.customUrl
    let url = null
    let id = null
    if (customUrl) {
      url = `url(${customUrl})`
      BackgroundImage.idOrUrl = customUrl
    } else {
      const idList = BackgroundImage._getAllImgIdsByCategorys()
      const index = Toolkit.getRandomInterger(idList.length)
      id = idList[index]
      url = BackgroundImage._toBaiduUrl(id)
      BackgroundImage.idOrUrl = id || BackgroundImage._toBaiduUrl(id, false)
    }
    return url
  }

  /** 获取用户所选类目下的所有图片 id */
  private static _getAllImgIdsByCategorys(): Array<number> {
    // 未选择时使用所有背景图片
    if (config.categorys.length === 0) return Object.keys(BackgroundImage.IMG_MAP).map(img => Number(img))
    const idList: Array<number> = []
    for (const categoryName in config.categorys) {
      if (Array.isArray(BackgroundImage.IMG_CATEGORYS[config.categorys[categoryName]])) {
        idList.push(...BackgroundImage.IMG_CATEGORYS[config.categorys[categoryName]])
      }
    }
    return idList
  }

  /**
   * 获取百度背景图
   * @param id 百度背景图片 ID
   * @param cssWrap 是否使用 url() 格式
   */
  private static  _toBaiduUrl(id: number, cssWrap: boolean = true) {
    const url = `https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/${id}.jpg`
    return cssWrap ? `url(${url})` : url
  }

  /**
   * 当前背景图
   * @deprecated
   */
  static get currentUrl(): BackgroundImageInfo  {
    const result: BackgroundImageInfo = { url: '', name: '', category: '', html: '' }
    if (!BackgroundImage.idOrUrl) return result
    if (typeof BackgroundImage.idOrUrl === 'string') {
      result.url = BackgroundImage.idOrUrl
      result.name = '自定义图片'
      result.html = `<span>自定义图片</span>`
    } else if (config.bgColor) {
      result.name = config.bgColor
      result.html = `<span>${config.bgColor}</span>`
    } else {
      result.url = BackgroundImage._toBaiduUrl(BackgroundImage.idOrUrl, false)
      for (const categoryName in BackgroundImage.IMG_CATEGORYS) {
        if (BackgroundImage.IMG_CATEGORYS[categoryName].includes(BackgroundImage.idOrUrl)) {
          result.category = categoryName
        }
      }
      result.name = BackgroundImage.IMG_MAP[BackgroundImage.idOrUrl]
      result.html = `<a class="link" target="_blank" href="${result.url}">${result.category ? '<' + result.category + '> ' : ''}${result.name}</a>`
    }
    return result
  }
}

/** 背景样式信息 */
export interface BackgroundImageInfo {
  url: string
  name: string
  category: string
  html: string
}

export class ImageWorkerHandler {
  /** 最大线程数 */
  static readonly WORKER_MAX_COUNT = Math.max(navigator.hardwareConcurrency, 4)
  /** 创建用于处理图像的线程, 为了防止超过浏览器限制, 最大数量为 4 */
  static workers: Array<Worker> = []
  // static workers = Array.from({ length:  }).map(() => new ImageWorker())
  /** 当前使用的线程 key */
  static poolTaskCount: Array<number> = []
  /**
   * 从线程池中创建或获取线程
   * @description 这是一个简单的 **依次平均分配** 任务的线程获取函数
   */
  static getWorker() {
    if (ImageWorkerHandler.workers.length >= ImageWorkerHandler.WORKER_MAX_COUNT) { // 使用已有线程
      let targetIndex = 0
      for (let index = 0; index < ImageWorkerHandler.poolTaskCount.length; index++) {
        if (index === 0) continue
        if (ImageWorkerHandler.poolTaskCount[index] < ImageWorkerHandler.poolTaskCount[index - 1]) {
          targetIndex = index
          break
        }
      }
      ImageWorkerHandler.poolTaskCount[targetIndex]++
      console.log('getWorker: ', targetIndex, ImageWorkerHandler.poolTaskCount)
      return ImageWorkerHandler.workers[targetIndex]
    } else { // 创建新线程
      const worker = new ImageWorker()
      // 添加事件监听函数
      ImageWorkerHandler._listen(worker)
      // const worker = new Worker(ImageWorkerURL)
      ImageWorkerHandler.workers.push(worker)
      ImageWorkerHandler.poolTaskCount[ImageWorkerHandler.workers.length - 1] = 1
      return worker
    }
  }
  private static _listen(worker: Worker) {
    worker.addEventListener('error', (event) => ImageWorkerHandler._handleWorkerMessageEvent('error', event))
    worker.addEventListener('message', (event) => ImageWorkerHandler._handleWorkerMessageEvent('message', event))
    worker.addEventListener('messageerror', (event) => ImageWorkerHandler._handleWorkerMessageEvent('messageerror', event))
  }
  /**
   * 处理事件并触发已添加的事件函数
   * @param name 事件名称
   * @param event 事件返回值
   */
  private static async _handleWorkerMessageEvent(name: 'error' | 'message' | 'messageerror', event: MessageEvent | ErrorEvent) {
    const key = ImageWorkerHandler._getEventKey(name, event)
    if (typeof key === 'number') {
      if (ImageWorkerHandler._poolTaskEventMap[key]) {
        if (name === 'error') {
          await ImageWorkerHandler._poolTaskEventMap[key]!.onError(event as any)
        } else if (name === 'message') {
          await ImageWorkerHandler._poolTaskEventMap[key]!.onMessage(event as any)
        } else if (name === 'messageerror') {
          await ImageWorkerHandler._poolTaskEventMap[key]!.onError(event as any)
        }
        if (ImageWorkerHandler._poolTaskEventMap[key]!.once) {
          ImageWorkerHandler._poolTaskEventMap[key] = null
        }
      } else {
        console.warn('Missing Event listener - ' + name)
      }
    } else {
      if (name === 'message') {
        console.warn('message', event)
      } else {
        console.error(name, event)
      }
      throw new Error('Worker Internal Error: Unknow Message Key')
    }
  }
  private static _getEventKey(name: 'error' | 'message' | 'messageerror', event: MessageEvent | ErrorEvent) {
    if (name === 'error') {
      return (event as any).key
    } else {
      return (event as MessageEvent).data.key
    }
  }
  /**
   * 所有的 worker 的自增唯一 key
   * @description 每次向 worker 发送消息时会向其发送这个 key, 作为本次请求的唯一标识, 同时也作为事件监听函数 {@link _poolTaskEventMap} 的 key
   */
  private static _workerRequestIncromentKey: number = 0
  /** 事件监听函数数组 */
  private static _poolTaskEventMap: Array<null | { once: boolean, onMessage: (event: MessageEvent) => void, onError: (error: Error) => void }> = []
  /**
   * 向 web worker 进程发送一次消息
   * @param data 消息数据
   */
  static async request<T = any>(data: { method: string, key?: number, data: T }): Promise<any> {
    const worker = await ImageWorkerHandler.getWorker()
    if (!data.key) data.key = ImageWorkerHandler._workerRequestIncromentKey++
    // console.log('[web worker] message: ', data)
    worker.postMessage(data)
    return new Promise((resolve, reject) => {
      ImageWorkerHandler._poolTaskEventMap.push({
        once: true,
        onMessage(event: MessageEvent) {
          resolve(event)
        },
        onError(error) {
          reject(error)
        }
      })
    })
  }
}

/** 用户自定义图片 */
export class CustomBackgroundImage {
  id: string = ''
  name: string = ''
  batchId?: string | null | undefined
  percentage?: number | null | undefined
  status: "pending" | "uploading" | "finished" | "removed" | "error" = 'pending'
  url?: string | null | undefined
  file?: File | null | undefined
  thumbnailUrl?: string | null | undefined
  type?: string | null | undefined
  fullPath?: string | null | undefined

  constructor(info: CustomBackgroundImage) {
    Object.assign(this, info)
  }

  /**
   * 上传文件
   * 
   * 将用户上传的图片保存到 `indexeddb`, 但由于浏览器的同源策略, 无法适用于所有的文章页面, 因为域名可能是不一样的, 例如:
   * 
   * - https://csdnnews.blog.csdn.net/article/details/133896968
   * - https://blog.csdn.net/weixin_44769612/article/details/130941960
   * 
   * 但如果使用 `Tampermonkey` 的 `GM_setValue`, 在存储大量数据后, 会导致页面所有的脚本失效 😭
   * 
   * @param file 上传的文件
   */
  static async save(options: CustomRequestOptions) {
    if (!options.file.file) throw new Error("Missing file");
    console.log('save >>>>> ', options.file.id)
    try {
      // 1. 在 indexeddb 中保存图片信息
      const data: SettledFileInfo = { ...options.file, file: null }
      await DB.add(DBTable.BackgroundImages, data)

      console.time('上传文件: ' + options.file.id)
      options.onProgress({ percent: Math.max(30, Math.random() * 75) })
      // 2. 在 web worker 进程中将原图和缩略图的文件保存到 indexeddb 中
      if (import.meta.env.DEV) {
        console.warn('当前处于开发环境, 无法使用 Web Worker, 直接写入 IndexedDB')
        await Promise.all([
          // 保存原图
          DB.add(DBTable.BackgroundImageFiles, { id: options.file.id, file: options.file.file }),
          // 保存缩略图
          CustomBackgroundImage.convertImage(options.file.file, 150, false, true)
            .then(thumbResult => {
              if (!thumbResult.blob) throw new Error('To Blob Failed')
              // 保存缩略图 URL
              options.file.thumbnailUrl = thumbResult.url
              return DB.add(DBTable.BackgroundThumbImageFiles, { id: options.file.id, file: thumbResult.blob })
            })
        ])
      } else {
        await Promise.all([
          // 保存原图
          ImageWorkerHandler.request({ method: WorkerMessageMethod.saveImage, data: { id: options.file.id, file: options.file.file } }),
          // 保存缩略图
          CustomBackgroundImage.convertImage(options.file.file, 150, false, true)
            .then(thumbResult => {
              if (!thumbResult.blob) throw new Error('To Blob Failed')
              // 保存缩略图 URL
              options.file.thumbnailUrl = thumbResult.url
              return ImageWorkerHandler.request({
                method: WorkerMessageMethod.saveThumbImage,
                data: { id: options.file.id, file: thumbResult.blob }
              })
            })
        ])
      }

      // 3. 保存
      data.status = 'finished'
      // CustomBackgroundImage.images.push(data)

      console.timeEnd('上传文件: ' + options.file.id)
      options.onFinish()
    } catch (err) {
      options.onError()
      throw err
    }
  }

  /**
   * 将图片转换为指定高度并保持宽高比的Blob格式的URL和base64数据。
   * @description created by ChatGPT 😊
   * @param image 图片，可以是字符串类型的图片地址或File类型的图片。
   * @param targetHeight 目标高度，可选参数。如果提供了目标高度，则会根据目标高度调整图片大小并保持宽高比。
   * @param toBase64 是否生成 Base64 数据
   * @param convertToBlob 是否显示的将图片转为 Blob(在传入链接形式的图片时将会执行转换)
   * @returns 包含Blob格式的URL和base64数据的Promise。
   */
  static convertImage(image: string | File, targetHeight?: number, toBase64: boolean = true, convertToBlob: boolean = false): Promise<{ url: string, blob?: Blob, base64: string }> {
    let imageUrl: string;
  
    if (typeof image === 'string') {
      imageUrl = image;
    } else if (image instanceof File) {
      imageUrl = URL.createObjectURL(image);
    } else {
      throw new Error('Invalid image parameter');
    }
  
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        let canvas: HTMLCanvasElement | null = null;
        if (targetHeight) {
          const aspectRatio = img.width / img.height;
          const targetWidth = targetHeight * aspectRatio;
  
          canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
  
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);
        }
  
        if (canvas) {
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              if (toBase64) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve({
                    url: url,
                    blob,
                    base64: reader.result as string
                  });
                };
                reader.readAsDataURL(blob);
              } else {
                resolve({ url, blob, base64: '' })
              }
            } else {
              reject(new Error('Failed to create Blob.'));
            }
          });
        } else {
          if (convertToBlob && typeof image === 'string') {
            CustomBackgroundImage.urlToBlob(image)
              .then(blob => {
                if (toBase64) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    resolve({
                      url: imageUrl,
                      blob,
                      base64: reader.result as string
                    });
                  };
                  reader.readAsDataURL(blob);
                } else {
                  resolve({ url: imageUrl, blob, base64: '' })
                }
              })
          } else {
            const blob = image instanceof File ? image : undefined
            if (toBase64) {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  url: imageUrl,
                  blob: image as Blob,
                  base64: reader.result as string
                });
              };
              reader.readAsDataURL(image instanceof File ? image : new Blob([img.src]));
            } else {
              resolve({ url: imageUrl, blob, base64: '' })
            }
          }
        }
      };
  
      img.onerror = (error) => {
        reject(error);
      };
  
      img.src = imageUrl;
    });
  }

  /**
   * 将Base64格式的图片数据转换为Blob URL。
   * @param url 连接或 Base64 格式的图片数据。
   * @returns Blob URL。
   */
  static async urlToBlob(url: string | File): Promise<Blob> {
    if (url instanceof File) return url
    const response = await fetch(url);
    const blob = await response.blob();
    return blob
  }

  /**
   * 将Base64格式的图片数据转换为Blob URL。
   * @param url 连接或 Base64 格式的图片数据。
   * @returns Blob URL。
   */
  static async urlToBlobUrl(url: string): Promise<string> {
    const blob = await CustomBackgroundImage.urlToBlob(url);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }

  static images = ref<Array<CustomBackgroundImage>>([])

  static async getImages() {
    if (CustomBackgroundImage.images.value.length) return CustomBackgroundImage.images.value
    console.time('获取所有背景图片')
    // 1. 读取以保存的所有背景图片
    // console.time('GM_getValue("CustomBackgroundImage")')
    const _images = (await DB.getList<CustomBackgroundImage>(DBTable.BackgroundImages)).map(img => new CustomBackgroundImage(img))
    CustomBackgroundImage.images.value = _images
    // console.timeEnd('GM_getValue("CustomBackgroundImage")')
    // 2. 根据原图 File 生成缩略图, 并创建原图和缩略图的 Blob URL
    await Promise.all(CustomBackgroundImage.images.value.map(async img => {
      if (img.url) return // http* 链接格式的图片
      img.status = 'pending'
      if (import.meta.env.DEV) {
        console.warn('当前处于开发环境, 无法使用 Web Worker, 直接读 IndexedDB')
        const thumbnailUrl = await DB.get<{ file: File }>(DBTable.BackgroundThumbImageFiles, img.id)
        img.thumbnailUrl = URL.createObjectURL(thumbnailUrl.file)
        img.status = 'finished'
      } else {
        // console.log('获取缩略图并生成 Blob URL - ' + img.id)
        const thumbnailUrl = await ImageWorkerHandler.request({ method: WorkerMessageMethod.getThumbImageURL, data: { id: img.id } })
        img.thumbnailUrl = thumbnailUrl.data.url
        img.status = 'finished'
        // console.log('获取缩略图并生成 Blob URL - ' + img.id)
      }
    }))
    console.timeEnd('获取所有背景图片')
    return CustomBackgroundImage.images
  }
  static async remove(file: SettledFileInfo) {
    await DB.delete(DBTable.BackgroundImages, file.id)
    await DB.delete(DBTable.BackgroundImageFiles, file.id)
    await DB.delete(DBTable.BackgroundThumbImageFiles, file.id)
    const index = CustomBackgroundImage.images.value.findIndex(img => img.id === file.id)
    CustomBackgroundImage.images.value.splice(index, 1)
  }
  static async clear() {
    await Promise.all([
      DB.clear(DBTable.BackgroundImages),
      DB.clear(DBTable.BackgroundImageFiles),
      DB.clear(DBTable.BackgroundThumbImageFiles),
    ])
    CustomBackgroundImage.images.value = []
  }
}
