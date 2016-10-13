/**
 * 
 * @authors Liyp (you@example.org)
 * @date    2016-09-02 14:47:46
 * @version 1.0.0
 * @function 公用类库依赖jquery
 */

"use strict";

/**
 * @function 定义全局变量
 * @param 
 * @return {}
 */

var Util = Util || {}; // 公用方法对象

var lib = lib || {}; // 主要提供移动端

var storage = window.localStorage;

var session = window.sessionstorage;

var Brower = new Object(); // 获取浏览器类型

Brower.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument != 'undefined');
Brower.isIE = window.ActiveXObject ? true : false;
Brower.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") != -1);
Brower.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != -1);
Brower.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);

/**
 * 
 * @param  rootPath
 * @function 获取网站根目录
 */

var rootPath = location.pathname.substr(0, location.pathname.lastIndexOf('/') + 1);

function getRootPath() {

	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
}


/*(function() {
    var global = window;
    lib.namespace = function(nsStr) {
        var parts = nsStr.split("."),
            root = global,
            max,
            i;
        for (i = 0, max = parts.length; i < max; i++) {
            //如果不存在，就创建一个属性
            if (typeof root[parts[i]] === "undefined") {
                root[parts[i]] = {};
            }
            root = root[parts[i]];
        }
        return root;
    };

})();
 */

/**
 * @function 定义移动端库--获取是否支持触摸
 * @param 
 * @return {} true false
 */
lib.isSupportTouch = function() {
	return "ontouched" in document ? true : false;
}


/**
 * @function 定义移动端库--获取滑动方向
 * @param elm
 * @return {} 
 */
lib.sliderDec = function(elm) {
	return function(elm) {

	}
}

/**
 * @function 移动端动态显示 引自 https://segmentfault.com/a/1190000003690140#articleHeader0
 * @param elm
 * @return {} 
 */
lib.setRem = false;
if (lib.setRem) {
	! function(win, lib) {
		var timer,
			doc = win.document,
			docElem = doc.documentElement,

			vpMeta = doc.querySelector('meta[name="viewport"]'),
			flexMeta = doc.querySelector('meta[name="flexible"]'),

			dpr = 0,
			scale = 0,

			flexible = lib.flexible || (lib.flexible = {});

		// 设置了 viewport meta
		if (vpMeta) {

			var initial = vpMeta.getAttribute("content").match(/initial\-scale=([\d\.]+)/);

			if (initial) {
				scale = parseFloat(initial[1]); // 已设置的 initialScale
				dpr = parseInt(1 / scale); // 设备像素比 devicePixelRatio
			}

		}
		// 设置了 flexible Meta
		else if (flexMeta) {
			var flexMetaContent = flexMeta.getAttribute("content");
			if (flexMetaContent) {

				var initial = flexMetaContent.match(/initial\-dpr=([\d\.]+)/),
					maximum = flexMetaContent.match(/maximum\-dpr=([\d\.]+)/);

				if (initial) {
					dpr = parseFloat(initial[1]);
					scale = parseFloat((1 / dpr).toFixed(2));
				}

				if (maximum) {
					dpr = parseFloat(maximum[1]);
					scale = parseFloat((1 / dpr).toFixed(2));
				}
			}
		}

		// viewport 或 flexible
		// meta 均未设置
		if (!dpr && !scale) {
			var u = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi)),
				_dpr = win.devicePixelRatio;

			dpr = u ? ((_dpr >= 3 && (!dpr || dpr >= 3)) ? 3 : (_dpr >= 2 && (!dpr || dpr >= 2)) ? 2 : 1) : 1;

			scale = 1 / dpr;
		}

		docElem.setAttribute("data-dpr", dpr);

		// 插入 viewport meta
		if (!vpMeta) {
			vpMeta = doc.createElement("meta");

			vpMeta.setAttribute("name", "viewport");
			vpMeta.setAttribute("content",
				"initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no");

			if (docElem.firstElementChild) {
				docElem.firstElementChild.appendChild(vpMeta)
			} else {
				var div = doc.createElement("div");
				div.appendChild(vpMeta);
				doc.write(div.innerHTML);
			}
		}

		// 1rem = 10px
		function setFontSize() {
			var winWidth = window.innerWidth;
			var size = (winWidth / 640) * 10;
			doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px';
		}


		// 调整窗口时重置
		win.addEventListener("resize", function() {
			clearTimeout(timer);
			timer = setTimeout(setFontSize, 300);
		}, false);


		// 这一段是我自己加的
		// orientationchange 时也需要重算下吧
		win.addEventListener("orientationchange", function() {
			clearTimeout(timer);
			timer = setTimeout(setFontSize, 300);
		}, false);


		// pageshow
		// keyword: 倒退 缓存相关
		win.addEventListener("pageshow", function(e) {
			if (e.persisted) {
				clearTimeout(timer);
				timer = setTimeout(setFontSize, 300);
			}
		}, false);

		// 设置基准字体
		if ("complete" === doc.readyState) {
			doc.body.style.fontSize = 12 * dpr + "px";
		} else {
			doc.addEventListener("DOMContentLoaded", function() {
				doc.body.style.fontSize = 12 * dpr + "px";
			}, false);
		}

		setFontSize();

		flexible.dpr = win.dpr = dpr;

		flexible.refreshRem = setFontSize;

		flexible.rem2px = function(d) {
			var c = parseFloat(d) * this.rem;
			if ("string" == typeof d && d.match(/rem$/)) {
				c += "px";
			}
			return c;
		};

		flexible.px2rem = function(d) {
			var c = parseFloat(d) / this.rem;

			if ("string" == typeof d && d.match(/px$/)) {
				c += "rem";
			}
			return c;
		}
	}(window, window.lib || (window.lib = {}));

}



/**
 * @function 浏览器回退没有即返回首页
 * @param 
 * @return {} 
 */


Util.Goback = function() {
	if (window.history.length > 0) {
		window.history.go(-1);
	} else {
		window.href = rootPath;
	}
};
/**
 * @function 检测数据类型
 * @param value
 * @return {} type
 */

Util.checkType = function(value) {
	return Object.prototype.toString.call(value).match(/\[object\s+(\w+)\]/i)[1].toLowerCase();
};


/**
 * @function 获取数据相关封装-验证
 * @param value
 * @return {} exports
 */

function variable(value) {
	this.value = value
}

variable.prototype.validator = function() {

}

/**
 * @function 图片加载失败监听
 * @param url 加载失败 默认图片地址
 * @return {} 
 */
function addErrorImg(obj, url) {
	$(obj).unbind('error').bind('error', function() {
		$(this).attr('src', url);
	});
};

/**
 * @function 图片预加载
 * @param listArr预加载数组 callback回调 error传进error对象
 * @return {} 
 */
Util.imgPreLoad = function(listArr, callback, error) {
	for (var i = 0; i < listArr.length; i++) {
		var img = new Image();
		img.src = listArr[i];
		if (img.complete) {
			callback.call(img);
		} else {
			if (callback) {
				img.onload = function() {
					callback.call(img);
				}
			}
			if (error) {
				img.onerror = function() {
					error.call(img);
					// 处理失败
					img.src = getRootPath() + "/images/ic_goods_default_bg.png";
				}
			}
		}
	}
};
/**
 * @function 加载效果 调用common.css 中类名 .spinner
 * @param parents根据父节点定位垂直居中 opt设置加载样式的大小和颜色 text在加载是否显示文字 opt配置例 
 * {
 *    height: "40px",
 *    width: "40px",
 *    color: "#000000"
 * }
 * @return {} 
 */
Util.Load = function(parents, opt, text) {

	return {
		init: function() {

		}
	}
};
/**
 * @function window窗体改变时
 * @param 
 * @return {} 
 */
Util.onresize = function(func) {
	if (typeof func === 'function') {
		$(window).on('resize', func);
		func();
	}
};

/**
 * @function 回车监听
 * @param {type} node
 * @param {type} callback
 * @returns {undefined}
 */
Util.keyEnter = function(node, callback) {
	$(node).bind('keydown', function(e) {
		var key = e.which;
		if (key === 13) {
			if (typeof callback == "function") {
				callback()
			} else {
				// 若无回调函数则禁用回车
				return false
			}
		}
	});
};
/**
 * @function 去Html格式
 * @param {type} text
 * @returns {undefined}
 */

Util.htmlEncode = function(text) {
	return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};


/**
 * @function 去空格
 * @param {type} text
 * @returns {undefined}
 */

Util.trim = function(text) {
	if (typeof(text) == "string") {
		return text.replace(/^\s*|\s*$/g, "");
	} else {
		return text
	}
};
/**
 * @function 是否为空
 * @param {type} val
 * @returns {true false}
 */
Util.isEmpty = function(val) {
	switch (typeof(val)) {
		case 'string':
			return Utils.trim(val).length == 0 ? true : false;
			break;
		case 'number':
			return val == 0;
			break;
		case 'object':
			return val == null;
			break;
		case 'array':
			return val.length == 0;
			break;
		default:
			return true;
	}
};
/**
 * @function 是否数字
 * @param {type} val
 * @returns {true false}
 */

Util.isNumber = function(val) {
	var reg = /^[\d|\.|,]+$/;
	return reg.test(val);
};

/**
 * @function 是否整数
 * @param {type} val
 * @returns {true false}
 */

Util.isInt = function(val) {
	if (val == "") {
		return false;
	}
	var reg = /\D+/;
	return !reg.test(val);
};

/**
 * @function 是否邮箱
 * @param {type} email
 * @returns {true false}
 */

Util.isEmail = function(email) {
		var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;

		return reg1.test(email);
	}
	/**
	 * @function 是否电话
	 * @param {type} tel
	 * @returns {true false}
	 */
Util.isTel = function(tel) {
		var reg = /^[\d|\-|\s|\_]+$/; //只允许使用数字-空格等

		return reg.test(tel);
	}
	/**
	 * @function 是否手机号
	 * @param {type} moblie
	 * @returns {true false}
	 */
Util.isMoblie = function(moblie) {
	var reg = /^1[34578]\\d{9}$/; //只允许1开头 第二位34578的十一位数字

	return reg.test(moblie);
};

/**
 * @function 是否window事件
 * @param {type} moblie
 * @returns {true false}
 */

Util.fixEvent = function(e) {
	var evt = (typeof e == "undefined") ? window.event : e;
	return evt;
};

/**
 * 
 * @param  center 是否开启中间的加载效果 top是否开启上面的加载效果 layout 遮罩层
 * @function 加载效果
 */

Util.layoutOn = function(center, top, layer) {
	var bg = '<div class="ui-app-loaddinglayout"></div>';
	var loadding = '<div class="spinner"><div class="spinner-container container1"><div class="circle1"></div>' + '<div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"> ' + '<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>' + '<div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div>' + '<div class="circle4"></div></div></div>'
	var loadding1 = '<div class="ui-app-loadding"><div class="preloader-wrapper small active ui-fn-hidden">' + '<div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch">' + '<div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>'
	if (top) {
		$('body').append(loadding1)
		document.ontouchmove = function(e) {
			e.preventDefault();
		};
		$('.ui-app-loadding').find('.preloader-wrapper').removeClass('ui-fn-hidden').animate({
			"top": "1.5rem"
		}, 200);
	}
	if (center) {
		$('body').append(loadding)
		$('.spinner').css({
			"left": ($('body').width() - $('.spinner').width()) / 2 + 'px',
			"top": ($(window).height() - $('.spinner').height()) / 2 - 80 + 'px',
			"z-index": "9999"
		})
	}
	if (layer) {
		$('body').append(bg)
		$('.ui-app-loaddinglayout').addClass('active')
	}

};
/**
 * 
 * @param opt需要关闭的加载效果 call关闭回调
 * @function 关闭加载效果
 */

Util.layoutOff = function(opt, call) {
	var argumentsArray = Array.prototype.slice.call(arguments, 0);
	var loadLayout_defaults = {
		topLoading: '.ui-app-loadding', // 主要用于下拉加载的效果
		centerLoading: '.spinner',
		layOut: '.ui-app-loaddinglayout',
		hideLayout: '.ui-fn-swrap-bg',
	}
	var loadLayout = loadLayout_defaults;
	argumentsArray.map(function(i) {
		if (Util.checkType(i) == "function") {
			i();
		}
		if (Util.checkType(i) == "object") {
			loadLayout = $.extend(true, {}, loadLayout_defaults, i);

		}
	})
	for (var i in loadLayout) {
		$(loadLayout[i]).fadeOut(function() {
			$(this).remove();
		});
	}


};

Util.srcElement = function(e) {
	if (typeof e == "undefined") e = window.event;
	var src = document.all ? e.srcElement : e.target;

	return src;
};
/**
 * @function 是否为时间格式 2012-05-12 15:15:15
 * @param {type} val
 * @returns {true false}
 */

Util.isTime = function(val) {
	var reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;

	return reg.test(val);
};
/**
 * @function 获取对象当前位置
 * @param {type} o
 * @returns {}
 */
Util.getPosition = function(o) {
	var t = o.offsetTop;
	var l = o.offsetLeft;
	while (o = o.offsetParent) {
		t += o.offsetTop;
		l += o.offsetLeft;
	}
	var pos = {
		top: t,
		left: l
	};
	return pos;
};
/**
 * @function 获取url参数 参数格式?xxxx=xxx.sss=sss
 * @param {type} o
 * @returns {}
 */
Util.getRequest = function() {
	var e = location.search,
		t = new Object;
	if (-1 != e.indexOf("?")) {
		var n = e.substr(1);
		var strs = n.split(".");
		for (var a = 0; a < strs.length; a++) t[strs[a].split("=")[0]] = unescape(strs[a].split("=")[1])
	}
	return t;
};
/**
 * @function 去重复json的键值，并添加 使用hash去重
 * @param {type} json
 * @returns {}
 */
Util.uniqueJson = function(json) {
	var obj = json;
	var hash = {},
		result = {};
	$.each(obj, function(i) {
		var key = obj[i];
		var value = i;
		if (!hash[key]) {
			for (var list in obj) {
				if (key === obj[list]) {
					result[key] = value;
					hash[key] = true;
				}
			}
		} else {
			result[key] += '.' + value;
		}
	});
	return result;
};

/**
 * @function json 去Null
 * @param {type} obj
 * @param {type} text
 * @returns {obj}
 */
Util.isNull = function(obj, text) {
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
	if (isjson) {
		for (var i in obj) {
			if (obj[i] === null) {
				obj[i] = text;
			}
		}
	} else {
		if (obj === null) {
			obj = text;
		}
	}
	return obj;

};
/**
 * @function 日期格式化
 * @param {type} data
 * @param {type} fmt
 * @returns {data}
 */
Util.fordate = function(data, fmt) {
	var $fmt = fmt;
	if (data == '') {
		return '';
	}
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	return (new Date(data)).Format($fmt);
};


/**
 * @function 数字加0
 * @param {type} value
 * @param {type} num
 * @returns {data}
 */

Util.formatnumber = function(value, num) {
	var tmp, idx, len, i
	tmp = value.toString();
	idx = tmp.indexOf('.');
	len = tmp.length;
	if (num == 0) {
		if (idx != -1)
			tmp = tmp.substring(0, idx);
	} else {
		if (idx == -1) {
			tmp = tmp + ".";
			for (i = 1; i <= num; i++)
				tmp = tmp + "0";
		} else {
			tmp = tmp.substring(0, idx + num + 1);
			for (i = len; i <= idx + num; i++)
				tmp = tmp + "0";

		}
	}
	return tmp
};


/**
 * @function 数据请求下来后操作
 * @param {type} data 请求的数据
 * @param {type} call 回调
 * @param {type} change 修改请求数据中的某个属性值
 * @returns {data}
 */

Util.dataLoad = function() {
	var $self = this;
	var argumentsArry = Array.prototype.slice.call(arguments, 0);
	var $data = argumentsArry[0];
	if (Util.checkType(argumentsArry[1]) == "object") {
		Util.data = $.extend(true, {}, argumentsArry[0], argumentsArry[1]);
		for (var i in argumentsArry[1]) {
			if (Util.checkType(argumentsArry[1][i]) == "function") {
				event[argumentsArry[1][i]] = argumentsArry[1][i];
				argumentsArry[1][i]($self, Util.data);
			}

		}
	}
};
/**
 * @function 方法存数组循环调用
 * @returns {data}
 */
Util.callArry = function() {
	return parseInt(value) == 0 ? text : value;
};

/**
 * @function 等于0则替换文本
 * @returns {data}
 */

Util.postReplace = function(value, text) {
	return parseInt(value) == 0 ? text : value;
};

/**
 * @function 获取json数据中某属性的最大值
 * @returns {data}
 */

Util.postCount = function(obj, name) {
	var arryList = [];
	if (obj && name && Util.checkType(obj) == "object") {
		for (var i in obj) {
			for (var j in obj[i]) {
				if (obj[i][name])
					arryList.push(obj[i][name]);
			}
		}
	}
	return Math.Max.Apply(null, arryList.join(",").split(","));
};


/**
 * @function 获取表单数据转json
 * @param {type} 
 * @returns {data}
 */

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

/**
 * @function 返回顶部
 * @param {type} text显示的文字
 * @returns {data}
 */
Util.backTop = function(text) {
	var $backToTopTxt = text,
		$backToTopEle = $('<div class="ui-app-backtop"></div>').appendTo("body")
		.html($backToTopTxt).attr("title", $backToTopTxt).click(function() {
			$("html, body").animate({
				scrollTop: 0
			}, 300);
		}),

		$backToTopFun = function() {
			var st = $(document).scrollTop(),
				winh = $(window).height();
			(st - winh > 0) ? $backToTopEle.fadeIn(): $backToTopEle.fadeOut();
			if (!window.XMLHttpRequest) {
				$backToTopEle.css("top", st + winh - 166)
			}
		};
	$(window).bind("scroll", $backToTopFun);

	$(function() {
		$backToTopFun();
	});
};

/**
 * @function 给函数原型添加一个扩展方法
 * @param {type} 
 * @returns {data}
 */


Function.prototype.extend = function(fn) {
	if (Util.checkType(fn) == "object") {
		for (var i in fn) {
			this.prototype[i] = fn[i];
		}
	}
};

/**
 * @function 获取当前是否登录
 * @param {type} url 已经登陆的情况跳转url, corrent还未登录的情况下登录成功返回的url
 * @returns {data}
 */
Util.gohistory = function(opt, callback) {
	var defaults = {
		url: getRootPath() + '/rest/h5/login',
		corrent: location.href,
		message: "您还未登录",
		isJump: true // 还未登录是否提示完去登录
	};
	var option = $.extend(true, {}, defaults, opt);
	var status = true;
	if (status) {
		status = false;
		$.ajax({
			url: getRootPath() + '/rest/font/account/getAccountName',
			type: 'POST',
			success: function(data) {
				status = true;
				if (data.success && data.data != null) {
					if (Util.checkType(callback) == 'function') {
						callback()
					} else {
						storage.setItem('H5historyurl', option.corrent)
						location.href = option.url
					}
				} else {
					// 还未登录提示
					if (option.isJump) {
						Util.tip(option.message, function() {
							location.href = option.url;
						})
					} else {
						if (Util.checkType(callback) == "function") {
							Util.tip(option.message, callback)
						}
					}
				}
			}
		})
	} else {
		Util.tip("正在响应中...");
		return false;
	}
};
/**
 * @function 提示窗
 * @param {type} message 消息 callback回调
 * @returns {data}
 */
Util.tip = function(opt, callback) {
	var argumentsArray = Array.prototype.slice.call(arguments, 0);
	var defaults = {
		type: 0, // 0为提示框 1为模态框
		message: "操作有误",
		timeout: 500,
		class: "ui-app-tip"
	};
	var option;
	if (Util.checkType(argumentsArray[0]) == "string") {
		option = $.extend(true, {}, defaults, {
			message: opt
		});
	} else if (Util.checkType(argumentsArray[0]) == "object") {
		option = $.extend(true, {}, defaults, opt);
	} else if (Util.checkType(argumentsArray[1]) == "function") {
		i();
	}
	if (option.type == 0) {
		var tip = '<div id="util_tip"><p class="text-center">' + option.message + '</p></div>'
		$('body').append(tip)
		$('#util_tip').addClass(option.class);
		$('#util_tip').css({
			'bottom': '3rem',
			'left': ($(window).width() - $('#util_tip').innerWidth()) / 2
		}).stop(true, true).animate({
			'opacity': '1',
			'bottom': '4rem'
		}, option.timeout)
		setTimeout(function() {
			$('#util_tip').remove();
			if (typeof callback == 'function') {
				callback()
			}
		}, option.timeout + 200);
	} else {
		Util.layoutOn()
	}
};

/**
 * @function 设置内容
 * @param {type} container 容器 content 内容 callback回调
 * @returns {data}
 */
Util.setContent = function(container, callback) {
	return function(content, callback) {
		if (Util.checkType(callback) == 'function') {
			$(container).html(callback());
		} else {
			if (content) {
				$(container).html(content);
			} else {
				$(container).html('<div class="ui-empty-commonts bk-padding-off"><img src="' + getRootPath() + '/images/ic-app-nodata.png" alt="" class="responsive-img"></div>');
			}
		}

	}
};
/**
 * @function 添加方法
 * @param {type} 
 * @returns {data}
 */
Util.addEvent = function() {
	var argumentsArray = Array.prototype.slice.call(arguments, 0);
	return function() {
		for (var i = 0; i < argumentsArray.length; i++) {
			if (Util.checkType(argumentsArray[i]) == 'function') {
				argumentsArray[i](argumentsArray[0]);
			}
		}
	}


};

/**
 * @function 图片适应容器
 * @param {type} 
 * @returns {data}
 */
Util.imgWrap = function(obj, img) {
	var _thisImg;
	for (var i = 0; i < $(img).length; i++) {
		if ($(img)[i].complete) {
			_thisImg = this;
			$(this).css({
				"-webkit-transform": "translateY(" + ($(obj).height() - $(_thisImg).height()) / 2 + ")",
				"-ms - transform": "translateY(" + ($(obj).height() - $(_thisImg).height()) / 2 + ")",
				"-o-transform": "translateY(" + ($(obj).height() - $(_thisImg).height()) / 2 + ")",
				"transform": "translateY(" + ($(obj).height() - $(_thisImg).height()) / 2 + ")",
			});
		} else {
			$($(img)[i]).on('load', function() {
				_thisImg = this;
				$(this).css({
					"-webkit-transform": "translateY(" + ($(obj).height() - $(_thisImg).height()) / 2 + "px)",
					"-ms - transform": "translateY(" + ($(obj).height() - $(_thisImg).height()) / 2 + "px)",
					"-o-transform": "translateY(" + ($(obj).height() - $(_thisImg).height()) / 2 + "px)",
					"transform": "translateY(" + ($(obj).height() - $(_thisImg).height()) / 2 + "px)",
				});
			});
		}
	}
};

/**
 * @function 观察者模式
 * @param {type} 
 * @returns {data}
 */
Util.events = function() {
	var listen, log, obj, one, remove, trigger, __this;

	obj = {};

	__this = this;

	listen = function(key, eventfn) {

		var stack, _ref;

		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];

		return stack.push(eventfn);

	};
	one = function(key, eventfn) {

		remove(key);

		return listen(key, eventfn);

	};

	remove = function(key) {

		var _ref;

		return (_ref = obj[key]) != null ? _ref.length = 0 : void 0;

	};

	trigger = function() { //

		var fn, stack, _i, _len, _ref, key;

		key = Array.prototype.shift.call(arguments);

		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];

		for (_i = 0, _len = stack.length; _i < _len; _i++) {

			fn = stack[_i];

			if (fn.apply(__this, arguments) === false) {

				return false;

			}

		};
	};

	return {

		listen: listen,

		one: one,

		remove: remove,

		trigger: trigger

	}
}