// 强制转换成网格时间格式 MM/dd/YYYY
function dateFormat(str){
	var t_arr = str ? str.toString().split('-') : [];
	if(t_arr.length > 1){
		return fix(t_arr[1], 2) + '/' + fix(t_arr[2], 2) + '/' + t_arr[0];
	}else{
		var curTime = str ? new Date(str) : new Date();
		return  fix(curTime.getMonth() + 1, 2) + '/' + fix(curTime.getDate(), 2) + '/' + curTime.getFullYear();
	}
}
// 强制转化成两位整数，服务于dateFormat函数
function fix(str, fixLen) {
	str = ('' + str) || str.toString();
	var str_len = str.length;
	if(str_len < fixLen){
		return (new Array(fixLen - str_len + 1)).join('0') + str;
	}else{
		return str;
	}
}
// 数字转化成金额格式
function moneyFormat(floatNum, fixLen) //floatNum:传入的float数字 ，fixLen:希望返回小数点几位 isFloat:小数点后为0是否需要返回
{
	fixLen = fixLen > 0 && fixLen <= 20 ? fixLen : 2;
	floatNum = parseFloat((floatNum + "").replace(/[^\d\.-]/g, "")).toFixed(fixLen) + "";
	var l = floatNum.split(".")[0].split("").reverse(),
		r = floatNum.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	if(r == 0){
		return t.split("").reverse().join("");
	}else{
		return t.split("").reverse().join("") + "." + r;
	}
}
// 字符串转换成卡号格式
function cardFormat(str){
	return str.toString().replace(/(\d{4})(?=\d)/g,"$1"+" ");
}
// 金额格式转化成数字
function numFormat(str) 
{ 
	return parseFloat(str.replace(/[^\d\.-]/g, "")); 
}
// 网格筛选功能之时间控件
function pqDatePicker(ui) {
    var $this = $(this);
    $this
        .css({ zIndex: 3, position: "relative" })
        .datepicker({
            yearRange: "-5:+1", //20 years prior to present.
            changeYear: true,
            changeMonth: true,
            //showButtonPanel: true,
            onClose: function (evt, ui) {
                $(this).focus();
            }
        });
    //default From date
    $this.filter(".pq-from").datepicker("option", "defaultDate", new Date("01/01/2016"));
    //default To date
    $this.filter(".pq-to").datepicker("option", "defaultDate", new Date("12/31/2016"));
}
// 网格参数 对象处理与合并
function objectHandle(defaultObj, argArr, ui){
	var curArg,
		newObj = {},
		argArr = argArr || [],
		arg_len = argArr.length,
		tableData = tableData || {},
		defaultObj = defaultObj || {};
	if(argArr && arg_len){
		for(var iArg = 0; iArg < arg_len; iArg++){
			curArg = argArr[iArg];
			if(typeof curArg == 'object'){
				$.extend(true, newObj, curArg);
			}else if(typeof curArg == 'string'){
				newObj[curArg] = ui[curArg] || ui.rowData[curArg];
			}
		}
	}
	return $.extend(true, {}, defaultObj, newObj);
}
// 提示框封装	需要有jquery.js与lhgdialog.js做前提
function dialog_tip(argObj, time){
	var timer;
	$.dialog($.extend(true, {}, {
		lock: true,
	    background: '#000', /* 背景色 */
	    opacityName: 0.5,       /* 透明度 */
	    content: '提示内容',
	    width: '300px',
		height: 100,
	    init: function () {
	        var that = this, i = time || 3;
	        var fn = function () {
	            that.title(i + '秒后关闭');
	            !i && that.close();
	            i --;
	        };
	        timer = setInterval(fn, 1000);
	        fn();
	    },
	    close: function () {
	        clearInterval(timer);
	        if(dialog_api){
	        	dialog_api.unlock();
	        	dialog_api.lock();
	        	// setTimeout(dialog_api.lock,300);
	        }
	    }
	}, argObj || {}));
}
// 对话框重构	需要有jquery.js与lhgdialog.js做前提
$.dialog.prompt = function( content, yes, value, obj, parent )
	{
		value = value || '';
		var input;
		
		return lhgdialog($.extend(true, {}, {
			title: '提问',
			id: 'Prompt',
			// zIndex: _zIndex(),
			icon: 'prompt.gif',
			fixed: true,
			lock: true,
			parent: parent || null,
			content: [
				'<div style="margin-bottom:5px;font-size:12px">',
					content,
				'</div>',
				'<div>',
					'<input value="',
						value,
					'" style="width:18em;padding:6px 4px" />',
				'</div>'
				].join(''),
			init: function(){
				input = this.DOM.content[0].getElementsByTagName('input')[0];
				input.select();
				input.focus();
			},
			ok: function(here){
				return yes && yes.call(this, input.value, here);
			},
			cancel: true,
			close: function(){
				console.log('close');
				setTimeout(dialog_lock,250);
			}
		}, obj || {}));
	};
// 图片预加载
function imgBeforeLoad(str){
	var newImg = new Image();
	newImg.src = str;
}
// 返回数据处理	auditStatusAndTimeHandle 
function responeDataHanle(singleData){
	// 当前详情需要展示的字段数组
	var showStrArr = CONFIG.Current_Grid_Config.detail.showStrArr;
	// 对字段进行 字段转化 或 值处理
	$.each(singleData, function(k,v){
		// 当前字段的值
		var curStrVal = singleData[k];
		// 当前字段的配置
		var singleStrObj = $.extend(true, {}, CONFIG.Current_Model_Config[k]);
		
		if(singleStrObj.transferObj){
			var transferKey = singleStrObj.transferObj.key || k;
			var transferVal = singleStrObj.transferObj.value || '';
			singleData[transferKey] = transferVal ? transferVal[v] : v;
		}
		var strVal = singleData[k] == v ? v : singleData[k];
		switch(singleStrObj.showType){
			case 'Number':
				singleData[k] = Number(strVal);
				break;
			case 'Money':
				singleData[k] = moneyFormat(strVal);
				break;
			case 'Date':
				singleData[k] = dateFormat(strVal);
				break;
			case 'Rate':
				singleData[k] = (strVal * 100) + "%";
				break;
			case 'Image':
			case 'String':
				singleData[k] = strVal ? strVal.toString() : '';
				break;
			case 'CardNo':
				singleData[k] = cardFormat(strVal);
				break;
		}
		
	})
	return singleData; 
}
// 根据配置进行html插入
function detail_info_div_append(singleData){
	$('.dialog_con .mImg').html('');
	$('.dialog_con .detail_info').html('');
	// 当前详情需要展示的字段数组
	var showStrArr = CONFIG.Current_Grid_Config.detail.showStrArr;
	// 详情是否需要提供审核功能
	var isAudit = !!CONFIG.Current_Grid_Config.audit;

	var html = '';
	// 对展示数组元素，根据字段配置进行选择话输出html
	$.each(showStrArr, function(i, strKey) {
		// this; //this指向当前元素
		// i; //i表示Array当前下标
		// strKey; //strKey表示Array中的字段名


		// 当前字段的配置
		var singleStrObj = $.extend({}, CONFIG.Current_Model_Config[strKey]);
		if(singleStrObj.replaceStr && singleData[singleStrObj.replaceStr]){
			strKey = singleStrObj.replaceStr;
			singleStrObj = $.extend({}, CONFIG.Current_Model_Config[strKey]);
		}
		// 当前字段的值
		var curStrVal = singleData[strKey];
		if(singleStrObj.showType == 'Image'){
			if(curStrVal){
				// 图片预加载
				imgBeforeLoad(curStrVal);
				var imgHtml = '<img src="'+curStrVal+'" alt="'+singleStrObj.desc+'" class="'+strKey+'">';
				$('.dialog_con .mImg').append(imgHtml);
			}
		}else{
			html += '<div style="';
			if(singleStrObj.isBlock){
				html += 'width:100%;';
			}
			if(strKey.indexOf('Status') > -1 || singleStrObj.clearFloat){
				html += 'clear:both';
			}
			html += '"><label title="' + singleStrObj.desc + '" for="' + strKey + '">' + singleStrObj.title + ':</label>';
			if(isAudit && singleStrObj.includeInput){
				html += '<input type="text" class="' + strKey + '" id="' + strKey + '" + name="' + strKey + '" placeholder="' + singleStrObj.placeholder + '" />';
			}else{
				html += '<span class="' + strKey + '" style="display:inline;" title="'+curStrVal+'">';
				switch(singleStrObj.showType){
					case 'Number':
					case 'Rate':
					case 'Money':
						html += curStrVal || 0;
						break;
					case 'Date':
					case 'CardNo':
					case 'String':
						html += curStrVal || '';
						break;
				}
				html += '</span>';
			}
			html += '</div>';
		}
	});
	$('.dialog_con .detail_info').append(html);
	$(".dialog .mImg > img").on("click",dialog_img);
}
// 图片原图展示
function dialog_img(){
	var newImg = new Image(),
		imgSrc = this.src;
	newImg.src = imgSrc;
	var imgWidth = newImg.width,
		imgHeight = newImg.height,
		ratio = 0; 
	if(imgWidth >= imgHeight && imgWidth > 1024){
		ratio = Math.round((1024/imgWidth)*100)/100;
		imgWidth = 1024;
		imgHeight = Math.round(ratio*imgHeight);
	}else if(imgHeight >= imgWidth && imgWidth > 1024){
		ratio = Math.round((1024/imgHeight)*100)/100;
		imgHeight = 1024;
		imgWidth = Math.round(ratio*imgWidth);
	}
	$.dialog({
	    id: 'a15',
	    title: '照片原图',
	    lock: true,
	    content: '<img src="' + imgSrc + '" width="' + imgWidth + '" height="' + imgHeight + '" />',
	    padding: 0
	});
}
// 对象转换成url参数
var parseParam_obj2url=function(param, key){
	var paramStr="";
	if(param instanceof String||param instanceof Number||param instanceof Boolean){
		paramStr+="&"+key+"="+encodeURIComponent(param);
	}else{
		$.each(param,function(i){
			var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
			paramStr+='&'+parseParam_obj2url(this, k);
		});
	}
	return paramStr.substr(1);
};
// 注销函数
function logout(){
	$.ajax({
        type: 'POST',
        url: '/yunpay_v2/api/admin/administrator/logout',
        dataType: 'json',
        async: false,
        timeout: 8000, // 设置请求超时时间（毫秒）。此设置将覆盖全局设置
        data: {
        	
        },
        success: function (data) {
        	if (data.is) {
        		localStorage.setItem('loginStatus','');
                window.location.href = 'login.html';
            } else {
                dialog_tip({content:data.msg || '服务器繁忙,请稍后重试！'});
            }
        },
        error: function (xhr, textStatus, errorThrown) {
        	dialog_tip({content:"Connection error"});
        },
     	invalidHandler: function(form, validator) {  //不通过回调
       		return false;
      	}
	})
}
// 关闭所有在列弹出框
function dialog_close(id){
	var list = $.dialog.list;
	if(id){
		list[id].close();
	}else{
		for( var i in list ){
		    list[i].close();
		}
	}
}
// 在列弹出框锁屏
function dialog_lock(id){
	var list = $.dialog.list;
	if(id){
		list[id].lock();
	}else{
		var id = '', zIndex = 0;
		for( var i in list ){
		    if(list[i].config.zIndex > zIndex){
		    	zIndex = list[i].config.zIndex;
		    	id = i;
		    }
		}
		list[id].lock();

	}
}
