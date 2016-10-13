/**
 * 
 * @authors Liyp (you@example.org)
 * @date    2016-05-30 09:52:27
 * @version 1.0.0
 * @function 公用方法
 * 
 */


// function EventTarget() {
//     this.handlers = {};
// }
// EventTarget.prototype = {
//     constructor: EventTarget,
//     addHandler: function(type, handler) {
//         if (typeof this.handlers[type] == "undefined") {
//             this.handlers[type] = [];
//         }
//         this.handlers[type].push(handler);
//         console.log(this.handlers);
//     },
//     fire: function(event) {
//         if (!event.target) {
//             event.target = this;
//         }
//         if (this.handlers[event.type] instanceof Array) {
//             var handlers = this.handlers[event.type];
//             for (var i = 0, len = handlers.length; i < len; i++) {
//                 handlers[i](event);
//             }
//         }
//     },
//     removeHandler: function(type, handler) {
//         if (this.handlers[type] instanceof Array) {
//             var handlers = this.handlers[type];
//             for (var i = 0, len = handlers.length; i < len; i++) {
//                 if (handlers[i] === handler) {
//                     break;
//                 }
//             }
//             handlers.splice(i, 1);
//         }
//     },

// };


function getRootPath() {

    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0, pos);
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}


function loginout() {
    localStorage.setItem('H5historyurl', location.href)
    $.ajax({
        url: getRootPath() + '/rest/font/login/logout',
        type: "get",
        success: function(data) {
            if (Modernizr.touch) {
                location.href = getRootPath() + '/rest/h5/login'
            } else {
                location.href = getRootPath() + '/rest/font/login'
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
}
$('#loginout').on('click', loginout)


$('#goindex').on('click', function() {
    location.href = getRootPath() + '/rest/h5/index'
})

/*表单数据转为json格式*/
var CL = CL || {};
// 使用命名空间形式防止命名冲突

(function() {
    var global = window;
    /**
     * 
     * @param {} nsStr
     * @return {}
     */
    CL.namespace = function(nsStr) {
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



CL.namespace('CL.location');


// URL跳转传参简单混淆 获取url参数，设置获取cookie
CL.location = {
    is: false,
    status: true,
    URL: {
        detail: '',
    },
    cartData: {},
    postCart: {},
    showRight: false,
    showTittle: false,
    order: null, // 订单数量 传参
    init: function(url, type, id) {
        window.open(url + '?' + type + '=' + id);
    },
    // 获取url get请求数据
    getRequest: function() {
        var e = location.search,
            t = new Object;
        if (-1 != e.indexOf("?")) {
            var n = e.substr(1);
            strs = n.split(".");
            for (var a = 0; a < strs.length; a++) t[strs[a].split("=")[0]] = unescape(strs[a].split("=")[1])
        }
        return t;
    },
    getdatareturn: function(data) {
        this.order = data;
    },
    // 数据加密
    tranform: function(str) {
        return cryptico.b256to64(str);
    },
    // 解密
    getTranform: function(str) {
        return cryptico.b64to256(str);
    },
    getMax: function(data) {
        var max = 0
        for (var i in data) {

            if (max < parseInt(data[i].postage)) {
                max = parseInt(data[i].postage)
            }
        }
        return max
    },
    setCookie: function(name, value, time) {
        function getsec(str) {
            var str1 = str.substring(1, str.length) * 1;
            var str2 = str.substring(0, 1);
            if (str2 == "s") {
                return str1 * 1000;
            } else if (str2 == "h") {
                return str1 * 60 * 60 * 1000;
            } else if (str2 == "d") {
                return str1 * 24 * 60 * 60 * 1000;
            }
        }
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    headTittle: function() {
        var $self = this

        var title = '<div class="ui-title-container row bk-padding-off-right bk-margin-bottom-15">' + ' <a href="' + getRootPath() + '" class="ui-title-logo ui-app-hidden"><h1 class="pull-left">云返服饰</h1></a>' + '<div class="ui-title-search">' + '<div class="ui-title-searchgroup">' + '<input class="ui-title-searchinput" type="text" value="" placeholder=""><button class="ui-title-searchbtn">搜索</button>' + '</div>' + '</div>' + '<div class="ui-common-item pull-right ui-title-server ui-app-hidden">' + '<p><img src="' + getRootPath() + '/images/phone.png" class="bk-margin-right-15 ui-common-img" alt="" />020-2333-6788</p>' + '<p>扫一扫，加微信客服<img src="' + getRootPath() + '/images/phonedown.png" alt="" class="bk-margin-left-10 ui-common-img" /></p>' + '<div class="ui-title-weixin">' + '<img src="' + getRootPath() + '/images/appdowner.png" alt="" class="img-responsive" />' + '</div></div></div>'



        return title
    },
    head: function(data) {
        var $self = this;
        var $data = data;

        $.ajax({
            url: getRootPath() + '/rest/font/account/getAccountName',
            type: 'post',
            success: function(data) {
                var head = '<div class="container container-fluid">' + '<div class="row">' + '<div class="navbar-header">' + '<a class="navbar-brand ui-app-hidden" href="' + getRootPath() + '">首页</a><a class="navbar-brand ui-app-hidden" href="#">云返手机版</a>' + '</div><span class="orange ui-header-item pull-right ui-app-hidden">' + '<a href="' + getRootPath() + '/rest/font/car/car">' + '<img src="' + getRootPath() + '/images/shopcart.png" class="ui-common-img">' + '<span class="">购物车</span>';
                if ($data != null) {
                    head += '<span class="ui-header-number">' + $data + '</span>'
                }

                head += '</a>' + '</span>' + '<div class="collapse navbar-collapse bk-padding-off navbar-right bk-margin-off-right" id="nav">' + '<ul class="nav navbar-nav ui-app-textcenter">' + '<li><a href="' + getRootPath() + '/rest/font/account/collect">我的收藏</a></li>' + '<li><a href="' + getRootPath() + '/rest/font/account/account">我的订单</a></li>' + '<li><a href="' + getRootPath() + '/rest/font/account/info">个人中心</a></li>' + '</ul>' + '</div>';
                if (data.success) {
                    if (data.data != null) {
                        head += '<div class="bk-padding-off navbar-text navbar-right bk-margin-off ui-app-hidden" id="nav">' + '<div class="ui-header-item bk-margin-right-10">Hi,' + data.data + '</div><div class="ui-header-item bk-margin-right-10"><a class="ui-header-alink" id="loginout">【退出】</a></div>' + '</div></div></div>'
                    }
                }
                if (data.message == "未登录") {
                    head += '<div class="bk-padding-off navbar-text navbar-right bk-margin-off ui-app-hidden" id="nav">' + '<div class="ui-header-item bk-margin-right-10">你好，游客</div><div class="ui-header-item bk-margin-right-10"><a class="ui-header-alink" href="' + getRootPath() + '/rest/font/login">【登录】</a><a href="' + getRootPath() + '/rest/font/login/regist" class="ui-header-alink">【注册】</a></div>' + '</div></div></div>'
                }
                $('#header').append(head)
                $('#loginout').on('click', loginout)
                $self.active()
            }
        })



    },
    getPosition: function(obj) {
        return {
            x: obj.offset().left,
            y: obj.offset().top
        }
    },
    // 去重复json的键值，并添加
    uniqueJson: function(json) {
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
    },
    // 右侧菜单栏
    rightSilder: function() {
        var $self = this;
        var content = {};
        $.ajax({
            url: getRootPath() + '/rest/font/car/selectCount',
            type: 'post',
            success: function(data) {
                $self.head(data.data);
                if ($self.showTittle) {
                    $('#container').append($self.headTittle())
                    $(".ui-title-server").hover(function() {
                        $(this).find(".ui-title-weixin").stop(true, true).fadeIn(300);
                    }, function() {
                        $(this).find(".ui-title-weixin").stop(true, true).fadeOut(300);
                    });
                }
                if ($self.showRight) {
                    appendNav(data.data);
                }
            }
        });

        function getNavdata(type) {
            switch (type) {
                case 'user':
                    if (content.user != undefined) {
                        $('.ui-cart-pay').fadeOut();
                    } else {
                        $.ajax({
                            url: getRootPath() + '/rest/font/account/getAccount',
                            type: 'post',
                            timeout: 5000,
                            datatype: 'json',
                            beforeSend: function() {

                            },
                            success: function(data) {
                                if (data.success) {
                                    CL.location.accountInfo = data.data;
                                    content.user = '<div data-content="user" class="ui-fixright-content-head ui-content-item bk-avatar"><img class="bk-margin-top-10 bk-img-100 bk-round bk-box-shadow" src="' + getRootPath() + "/upload/account/head/" + data.data.headPic + '" alt="头像" title="' + data.data.nickName + '" />' + '<div class="ui-content-headInfo"><p class="text-center font-normal bk-margin-15 bk-margin-bottom-off bk-padding-bottom-15" style="border-bottom: 1px #ccc solid">你好,' + data.data.nickName + '</p>' + '<div class="ui-content-bMitems"><div class="ui-content-bMitem"></div></div>' + '</div></div>'
                                    $('.ui-cart-pay').fadeOut();
                                    $('[data-user-info]').append(content.user);
                                }
                            }
                        });
                    }

                    break;
                case 'cart':
                    if (content.cart != undefined) {
                        $('.ui-cart-pay').fadeIn();
                    } else {
                        $.ajax({
                            url: getRootPath() + '/rest/font/car/getCar',
                            type: 'post',
                            timeout: 5000,
                            datatype: 'json',
                            success: function(data) {
                                var sum = 0;
                                var count = 0;
                                if (data.success) {
                                    content.cart = '<div data-content="cart" class="ui-fixright-content-cart ui-content-item">' + '<div class="ui-cart-head"><input name="cart" data-all="sellectall" type="checkbox" checked id="all-sellect"> <label for="all-sellect">全选</label></div>';
                                    for (var i in data.data) {
                                        content.cart += '<div class="ui-cart-item">' + '<div class="ui-cart-item-head"><input type="checkbox" data-items="' + i + '" data-child="" checked name="cart"><label>' + data.data[i].brandName + '</label><div class=""pull-right></div></div>';
                                        for (var list in data.data[i].carVoList) {
                                            content.cart += '<div class="ui-cart-items"><input type="checkbox" data-check="' + data.data[i].carVoList[list].skuId + '" data-item="' + i + '" data-child="" name="cart" checked ><a class="bk-avatar ui-cart-link" href="' + getRootPath() + '/rest/font/product/detail?productId=' + data.data[i].carVoList[list].productId + '">' + '<img class="bk-img-50" src="' + getRootPath() + '/upload/product/' + data.data[i].carVoList[list].picturePath + '" alt="商品图片" title="' + data.data[i].carVoList[list].productName + '" /></a>' + '<div class="ui-cart-info"><p title="' + data.data[i].carVoList[list].productName + '">' + data.data[i].carVoList[list].productName + '</p><p title="' + data.data[i].carVoList[list].colorName + ' ' + data.data[i].carVoList[list].sizeName + '">' + data.data[i].carVoList[list].colorName + ' ' + data.data[i].carVoList[list].sizeName + '</p></div>' + '<div class="ui-cart-countNum"><a class="ui-cart-countItem" href="javascript:void(0);" data-reduce="' + data.data[i].carVoList[list].skuId + '">-</a><span class="ui-cart-num">' + data.data[i].carVoList[list].num + '</span><a class="ui-cart-countItem" href="javascript:void(0);" data-add="' + data.data[i].carVoList[list].skuId + '">+</a></div>' + '<div class="ui-cart-countAll"><a href="javascript:void(0);" class="ui-cart-delete " data-del="cart" title="删除" data-skuId="' + data.data[i].carVoList[list].skuId + '" data-spm="' + data.data[i].carVoList[list].carId + '">×</a><strong data-single=' + data.data[i].carVoList[list].skuId + '>￥ ' + CL.location.formatnumber(data.data[i].carVoList[list].price * data.data[i].carVoList[list].num, 2) + '</strong></div>' + '</div>'
                                            $self.cartData[data.data[i].carVoList[list].skuId] = {
                                                "num": data.data[i].carVoList[list].num,
                                                "price": data.data[i].carVoList[list].price,
                                                "productName": data.data[i].carVoList[list].productName,
                                                "path": data.data[i].carVoList[list].picturePath,
                                                "color": data.data[i].carVoList[list].colorName,
                                                "brandName": data.data[i].brandName,
                                                "productId": data.data[i].carVoList[list].productId,
                                                "size": data.data[i].carVoList[list].sizeName,
                                                "skuId": data.data[i].carVoList[list].skuId,
                                                "postage": data.data[i].carVoList[list].postage
                                            }
                                            sum = parseInt(sum) + parseInt(data.data[i].carVoList[list].price * data.data[i].carVoList[list].num);
                                        }
                                        count = parseInt(count) + parseInt(data.data[i].carVoList.length)
                                        content.cart += '</div>'
                                    }

                                    $('[data-user-info]').append(content.cart);
                                    $('.ui-fixright-nav').append('<div class="ui-cart-pay"><div class="ui-cart-payhead clearfix"><div class="pull-left font-normal">已选 <span data-numtotal="' + count + '">' + count + '</span> 件</div><div class="pull-right" style="color: #ed9513;" data-amount="' + CL.location.formatnumber(sum, 2) + '">￥ ' + CL.location.formatnumber(sum, 2) + '</div><a class="btn btn-full ui-cart-paybtn" src="javascript:void(0);">结算</a></div></div></div>');

                                    function isChecked() {
                                        var checkbox = $('input[name="cart"]'),
                                            index = {};
                                        checkbox.on('click', function() {
                                            $(this)[0].checked ? false : true
                                            var i = checkbox.index($(this))
                                            index[i] = {
                                                obj: $(this),
                                                is: $(this)[0].checked
                                            }
                                            if ($(this).data('all') != undefined) {
                                                var $this = this;
                                                $(this)[0].checked ? false : true
                                                $(this).attr('checked', $(this).checked)
                                                $('[data-child]').map(function() {
                                                    $(this).attr('checked', $this.checked)
                                                    $(this)[0].checked = $this.checked;
                                                    $this.checked ? $(this).parents('.ui-cart-items').removeClass('disabled') : $(this).parents('.ui-cart-items').addClass('disabled')
                                                })
                                            } else {
                                                actionCheck(index[i]);
                                            }
                                            countMoney()
                                        });

                                        return index;
                                    }

                                    function actionCheck(index) {
                                        if (index.is) {
                                            if ($(index.obj).data('item') != undefined) {
                                                var i = $(index.obj).data('item');
                                                if ($('[data-item="' + i + '"]').size() === $('[data-item="' + i + '"]:checked').length) {
                                                    $(index.obj).parents('.ui-cart-item').find('[data-items]').attr('checked', true)
                                                    $(index.obj).parents('.ui-cart-item').find('[data-items]')[0].checked = true
                                                }

                                                $(index.obj).attr('checked', true)
                                                $(index.obj).parents('.ui-cart-items').removeClass('disabled');

                                            } else {
                                                if ($(index.obj).data('items') != undefined) {
                                                    $(index.obj).parents('.ui-cart-item').find('.ui-cart-items input[name="cart"]').map(function() {
                                                        $(this)[0].checked = true;
                                                    }).attr('checked', true)
                                                    $(index.obj).parents('.ui-cart-item').find('.ui-cart-items').removeClass('disabled');
                                                }
                                            }
                                        } else {
                                            if ($(index.obj).data('item') != undefined) {
                                                $(index.obj).attr('checked', false)
                                                $(index.obj).parents('.ui-cart-items').addClass('disabled');
                                                $(index.obj).parents('.ui-cart-item').find('[data-items]').attr('checked', false)
                                                $(index.obj).parents('.ui-cart-item').find('[data-items]')[0].checked = false;
                                                $('[data-all]').attr('checked', false)
                                                $('[data-all]')[0].checked = false;
                                            } else {
                                                if ($(index.obj).attr('data-items') != undefined && !index.is) {
                                                    $(index.obj).parents('.ui-cart-item').find('.ui-cart-items input[name="cart"]').map(function() {
                                                        $(this)[0].checked = false
                                                        $(this).attr('checked', false)
                                                    })
                                                    $(index.obj).parents('.ui-cart-item').find('.ui-cart-items').addClass('disabled')
                                                }
                                            }
                                        }

                                        $('[data-all]').attr('checked', $('[data-child]').size() === $('[data-child]:checked').length)
                                        $('[data-all]')[0].checked = ($('[data-child]').size() === $('[data-child]:checked').length);
                                    }
                                    isChecked();
                                    // 单价
                                    function countsingleM(skuid) {
                                        var single = $self.cartData[skuid].num * $self.cartData[skuid].price
                                        $('[data-single="' + skuid + '"]').text('￥ ' + CL.location.formatnumber(single, 2))
                                    }
                                    // 总价
                                    function countMoney(argument) {
                                        var total = 0,
                                            length = 0;
                                        for (var i in $self.cartData) {
                                            if ($('[data-check="' + i + '"]').is(':checked')) {
                                                total = parseInt(total) + parseInt($self.cartData[i].num * $self.cartData[i].price)
                                                $self.postCart[i] = $self.cartData[i]
                                            } else {
                                                delete $self.postCart[i]

                                            }
                                        }
                                        $('[data-numtotal]').text($('[data-check]:checked').length);
                                        $('[data-amount]').text('￥ ' + CL.location.formatnumber(total, 2)).attr('data-amount', CL.location.formatnumber(total, 2));
                                    }
                                    $('[data-reduce]').on('click', function() {
                                        var $skuId = $(this).data('reduce');
                                        if (parseInt($self.cartData[$skuId].num) <= 1) {
                                            return false;
                                        } else {
                                            $self.cartData[$skuId].num = parseInt($self.cartData[$skuId].num) - parseInt(1)
                                            $(this).next('.ui-cart-num').text($self.cartData[$skuId].num)
                                            countMoney()
                                            countsingleM($skuId)
                                        }


                                    });
                                    $('[data-add]').on('click', function() {
                                        var $skuId = $(this).data('add'),
                                            $this = this;
                                        $.ajax({
                                            url: getRootPath() + '/rest/font/product/getNumBySku',
                                            type: 'get',
                                            data: {
                                                skuId: $skuId
                                            },
                                            success: function(data) {
                                                if (data.success) {
                                                    if (parseInt($self.cartData[$skuId].num) >= data.data) {
                                                        return false;
                                                    } else {
                                                        $self.cartData[$skuId].num = parseInt($self.cartData[$skuId].num) + parseInt(1)
                                                        $($this).prev('.ui-cart-num').text($self.cartData[$skuId].num)
                                                        countMoney()
                                                        countsingleM($skuId)
                                                    }

                                                }
                                            }
                                        });
                                    });
                                    $('[data-del="cart"]').on('click', function() {
                                        var $id = $(this).data('spm'),
                                            $this = this,
                                            $skuid = $(this).data('skuid');
                                        $.ajax({
                                            url: getRootPath() + '/rest/font/car/deleteCar',
                                            data: {
                                                json: '[{carId:' + $id + '}]'
                                            },
                                            type: 'post',
                                            success: function(data) {
                                                if (data.success) {
                                                    delete $self.cartData[$skuid]
                                                    countMoney();
                                                    $($this).parents('.ui-cart-items').css("position", "relative").animate({
                                                        "opacity": "0",
                                                        "top": "-10px"
                                                    }, 300)
                                                    var timer = setTimeout(function() {
                                                        if ($($this).parents('.ui-cart-item').find('.ui-cart-items').size() == 1) {
                                                            $($this).parents('.ui-cart-item').remove()
                                                        } else {
                                                            $($this).parents('.ui-cart-items').remove()
                                                        }
                                                        clearTimeout(timer);
                                                    }, 300)
                                                }
                                            }
                                        });
                                    });
                                    // 去支付
                                    $('.ui-cart-paybtn').on('click', function() {
                                        countMoney();
                                        var str = JSON.stringify($self.postCart)
                                        window.sessionStorage.postInfo = str;
                                        location.href = getRootPath() + '/rest/font/pay/toPay?spm=' + $self.encrypt('11')
                                    })
                                }
                            }
                        });
                    }
                    break;
                case '':
                    break;
                case '':
                    break;
                default:
                    break;
            }
        }

        function appendNav(data) {
            if (data != null) {
                var rightSilder = '<div class="ui-fixright-outer"><div class="ui-fixright-nav">' + '<div class="ui-content-tab" data-user-info=""></div></div>' + '<div class="ui-fixright-tabs">' + '<div class="ui-fixright-mask"><div class="ui-fixright-container">' + '<div class="ui-fixright-tab" data-nav="user"><div class="ui-fixright-avatar"><img class="ui-fixright-avatar-img" src="' + getRootPath() + "/upload/account/head/" + window.localStorage.headPic + '" alt="头像" /></div></div>' + '<div class="ui-fixright-tab ui-fixright-tab-cart" data-nav="cart"><i class="ui-car-icon"></i><span class="ui-car-text">购物车</span>' + '<div class="ui-car-num-bg"><div class="ui-car-num">' + data + '</div></div><div class="ui-fixright-cart-border"></div></div>' + '<div class="ui-fixright-tab ui-fixright-hover" data-nav="collect"><div class="ui-fixright-avatar"><img class="ui-fixright-avatar-img" src="" alt="头像" /></div></div>' + '<div class="ui-fixright-tab ui-fixright-hover" data-nav="order"><div class="ui-fixright-avatar"><img class="ui-fixright-avatar-img" src="" alt="头像" /></div></div>' + '<div class="ui-fixright-tab ui-fixright-hover" data-nav="xx"><div class="ui-fixright-avatar"><img class="ui-fixright-avatar-img" src="" alt="头像" /></div></div>' + '</div></div></div>' + '</div>';

                $('body').append(rightSilder);
                var $backToTopTxt = "TOP",
                    $backToTopEle = $('<div class="backToTop"></div>').appendTo($(".ui-fixright-container"))
                    .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
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
                var flag = true;

                $('[data-nav]').on('click', function() {
                    if (flag && $(this).hasClass('active')) {
                        $('.ui-content-item').addClass('scaleDownOut').removeClass('scaleDownIn').css('z-index', '0')
                        $('[data-nav]').removeClass('active');
                        $('.ui-fixright-outer').stop(true, true).animate({
                            "right": '0px'
                        }, 500);
                        $('.ui-fixright-nav').stop(true, true).animate({
                            "right": '-270px',
                            "visibility": 'hidden'
                        }, 500);
                        $('[data-content="' + $(this).data('nav') + '"]').removeClass('scaleDownOut').addClass('scaleDownIn').css('z-index', '99')
                        flag = false;
                    } else {
                        $('.ui-content-item').addClass('scaleDownOut').removeClass('scaleDownIn').css('z-index', '0')
                        $('[data-nav]').removeClass('active');
                        $('.ui-fixright-outer').stop(true, true).animate({
                            "right": '270px'
                        }, 500);
                        $('.ui-fixright-nav').css("visibility", 'visible').stop(true, true).animate({
                            "right": '0px'
                        }, 500);
                        $(this).addClass('active');
                        getNavdata($(this).data('nav'));
                        $('[data-content="' + $(this).data('nav') + '"]').removeClass('scaleDownOut').addClass('scaleDownIn').css('z-index', '99')
                        flag = true;
                    }

                });
                if ($(window).width() > 1200) {
                    var timer = setTimeout(function() {
                        $('.ui-fixright-tabs').animate({
                            left: '-35px'
                        }, 100);
                        clearTimeout(timer);
                    }, 1000);

                } else {
                    $('.ui-fixright-tabs').animate({
                        left: '0px'
                    }, 100)
                    $('.ui-fixright-outer').stop(true, true).animate({
                        "right": '0px'
                    }, 500);
                    $('.ui-fixright-nav').stop(true, true).animate({
                        "right": '-270px',
                        "visibility": 'hidden'
                    }, 500)
                    flag = true
                }
                $('.ui-fixright-mask').css({
                    "padding-top": ($(window).height() - $('.ui-fixright-container').height()) / 2 + 'px',
                    "height": $(window).height()
                })
                $(window).resize(function() {
                    $('.ui-fixright-mask').css({
                        "padding-top": ($(window).height() - $('.ui-fixright-container').height()) / 2 + 'px',
                        "height": $(window).height()
                    })
                    if ($(window).width() > 1200) {
                        $('.ui-fixright-tabs').animate({
                            left: '-35px'
                        }, 100)
                    } else {
                        $('.ui-fixright-tabs').animate({
                            left: '0px'
                        }, 100)
                        $('.ui-fixright-outer').stop(true, true).animate({
                            "right": '0px'
                        }, 100);
                        $('.ui-fixright-nav').stop(true, true).animate({
                            "right": '-270px',
                            "visibility": 'hidden'
                        }, 100)
                    }
                });

            }
        }
        return this

    },
    // 登录弹窗没做完,目前仅仅是一种登录模态框,后期须加上根据元素定位模态框，和其他样式的模态框
    loginModal: function() {
        var modalhtml = '<div class="modal  ui-login-modal">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '<h4 class="modal-title"></h4>' + '</div>' + '<div class="modal-body">' + '<form id="login-form" class="login-form active form-horizontal">' + '<div class="login-form-head" data-error="tip"><h3 class="h4">账户登录</h3></div>' + '<div class="form-group">' + '<div class="col-md-12">' + '<div class="input-group">' + '<label for="loginName" class="input-group-addon bk-noradius" style="background-color: #f7f7f7;"><i class="fa fa-user" style="color: #e1e1e1;"></i></label>' + '<input type="text" data-validator="moblie" data-unvalidator="true" id="loginName" name="loginName" class="form-control bk-noradius" placeholder="请输入账户">' + '</div></div></div>' + '<div class="form-group"><div class="col-md-12"><div class="input-group">' + '<label for="password" class="input-group-addon bk-noradius" style="background-color: #f7f7f7;"><i class="fa fa-lock" style="color: #e1e1e1;font-size: 17px;"></i></label>' + '<input type="text" data-validator="password" onfocus="this.type=\'password\'" id="password" name="password" class="form-control bk-noradius" placeholder="密码">' + '</div></div></div>' + '<div class="form-group">' + '<div class="col-xs-7"><input type="text" data-validator="code" id="checkcode" class="form-control bk-noradius" name="code" placeholder="验证码"></div>' + '<div class="col-xs-5 bk-padding-off"><img src="' + getRootPath() + '/rest/font/login/getValidateCode" alt="验证码" id="code"></div>' + '</div><div class="form-group">' + '<div class="col-md-12"><button class="btn btn-warning btn-lg bk-noradius btn-full" type="button" data-validator-button="submit">登录</button>' + '</div></div>' + '<div class="form-group">' + '<div class="col-md-5">' + '<div class="checkbox-custom checkbox-warning">' + '<input type="checkbox" checked="" id="isCheck">' + '<label for="isCheck">记住用户名</label></div></div>' + '<div class="col-md-7 text-right"><a href="http://localhost:8080/yffs/rest/font/login/resetPassWord" style="font-size: 12px;" class="font-normal">忘记密码？</a> | <a class="changeForm font-orange" href="http://localhost:8080/yffs/rest/font/login/regist">免费注册</a>' + '</div></div></form>' + '</div></div></div></div>';



        if (this.status) {
            $("body").append(modalhtml);
            $('.modal').modal('show');
            $("#code").click(function() {
                $("#code").attr('src', getRootPath() + '/rest/font/login/getValidateCode?' + Math.random());
            });
            $("#login-form").myValidator(getRootPath() + "/rest/font/login/login", "login", "modal");
            this.status = false;
        }
        this.loginModalClose();
    },
    // 登录弹窗关闭
    loginModalClose: function() {
        var $self = this;
        $('.modal').on('hidden.bs.modal', function() {
            $(this).remove();
            $self.status = true;
        })
    },
    isNull: function(obj) {
        var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        if (isjson) {
            for (var i in obj) {
                if (obj[i] === null) {
                    obj[i] = '';
                }
            }
        } else {
            if (obj === null) {
                obj = '';
            }
        }
        return obj;

    },
    fordate: function(data, fmt) {
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
    },
    getData: function() {
        var $param = CL.location.getRequest();
        if ($param) {
            $.ajax({
                data: $param,
                url: CL.location.URL.detail,
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    CL.detail.data = data;
                    CL.detail.init();
                }
            });
        }

    },
    // 滚动加载
    lazyLoading: function(status, callback) {
        var $self = this

        function getScrollHeight() {　　
            var scrollHeight = 0,
                bodyScrollHeight = 0,
                documentScrollHeight = 0;　　
            if (document.body) {　　　　
                bodyScrollHeight = document.body.scrollHeight;　　
            }　　
            if (document.documentElement) {　　　　
                documentScrollHeight = document.documentElement.scrollHeight;　　
            }　　
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
            return scrollHeight;
        }
        $(window).bind('scroll', function() {
            if ($(window).scrollTop() + $(window).height() > getScrollHeight() - 50) {
                if (typeof callback == 'function') {
                    if (status) {
                        callback()
                    }
                }

            }
        })

    },
    // 加密
    encrypt: function(str) {
        return ((parseInt(str) + parseInt((new Date()).getMonth())).toString() + '.' + (new Date()).getFullYear() + (new Date()).getDate() + '.pd.isOrder');
    },
    // 解密
    unencrypt: function(str) {

        var $str = str.toString().substring(0, str.indexOf('.'));

        return parseInt($str) - parseInt((new Date()).getMonth());
    },
    getCookie: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return (unescape(arr[2]));
        } else
            return null;
    },
    delCookie: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    active: function() {
        var URL = location.href;
        $('.navbar-nav').find('a').each(function() {
            if ($(this).attr('href') === URL) {
                $(this).parents('li').addClass('active');
            }

        });
    },
    remove: function() {

        var timer = setTimeout(function() {
            $('.ui-fn-loadding').remove();
            CL.location.is = false;
            clearTimeout(timer);
        }, 200);

    },
    gohistory: function(url, corrent, callback, message) {
        $.ajax({
            url: getRootPath() + '/rest/font/account/getAccountName',
            type: 'POST',
            success: function(data) {
                if (data.success && data.data != null) {
                    if (typeof callback == 'function') {
                        callback()
                    } else {
                        location.href = url

                    }

                } else {
                    if (typeof message == 'string') {
                        CL.location.tip(message, function() {
                            localStorage.setItem('H5historyurl', corrent)
                            location.href = getRootPath() + '/rest/h5/login'
                        })
                    } else {
                        CL.location.tip('您还未登录', function() {
                            if (typeof message == 'function') {
                                message()
                            } else {
                                localStorage.setItem('H5historyurl', corrent)
                                location.href = getRootPath() + '/rest/h5/login'
                            }

                        })
                    }

                }
            }
        })
    },
    loading: function() {
        var loading = '<div class="ui-fn-loadding"><img src="' + getRootPath() + '/images/ui-loadding.png" width="80" height="80" alt="加载中.." /></div>';
        if (CL.location.is) {

        } else {
            $('body').append(loading);
            CL.location.is = true;
        }
        $(window).resize(function() {
            $('.ui-fn-loadding').css({
                top: ($(window).height() - $('.ui-fn-loadding').height()) / 3 + $(window).scrollTop(),
                left: ($(window).width() - $('.ui-fn-loadding').width()) / 2,
            });
        });
        $('.ui-fn-loadding').css({
            'top': ($(window).height() - $('.ui-fn-loadding').height()) / 3 + $(window).scrollTop(),
            'left': ($(window).width() - $('.ui-fn-loadding').width()) / 2,
        });
    },
    // 检测是否为数字
    checkNumber: function(value) {
        var regex = '^[0-9]*[1-9][0-9]*$';
        if (new RegExp(regex).test(value.toString())) {
            return true;
        } else {
            return false;
        }
    },
    tip: function(message, callback) {
        var $self = this;
        var tip = '<div class="ui-app-tip"><p class="text-center">' + message + '</p></div>'

        $('body').append(tip)

        $('.ui-app-tip').css({
            'bottom': '3rem',
            'left': ($(window).width() - $('.ui-app-tip').innerWidth()) / 2
        }).stop(true, true).animate({
            'opacity': '1',
            'bottom': '4rem'
        }, 500)
        setTimeout(function() {
            $('.ui-app-tip').remove()
            if (typeof callback == 'function') {
                callback()
            }
        }, 700);

        return this;
    },
    formatnumber: function(value, num) {
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
    }
}

// var winHref = document.location.href,
//     Href = winHref.split("#")[1];
// Initialize(Href)

// function Initialize(obj) {
//     if (obj == undefined) {
//         return;
//     }
//     $.each($("[data-href]"), function(i, item) {
//         if ($(item).data("href").split("#")[1] == obj) {
//             $("html,body").stop().animate({
//                 scrollTop: [$(item).offset().top, 'easeInExpo']
//             }, 1000)
//         }
//     });
// };



if (Modernizr.touch) {
    // 移动端H5渲染待完成

} else {
    // PC端渲染
    CL.location.rightSilder();
};


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

//获取对象类型 

function type(obj) {
    //obj为null或者undefined时，直接返回'null'或'undefined'
    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
}

function isFunction(value) {
    return type(value) == "function"
}

function isWindow(obj) {
    return obj != null && obj == obj.window
}

function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE
}

function isObject(obj) {
    return type(obj) == "object"
}
//对于通过字面量定义的对象和new Object的对象返回true，new Object时传参数的返回false

function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype
}

function isArray(value) {
    return value instanceof Array
}
//类数组，比如nodeList，这个只是做最简单的判断，如果给一个对象定义一个值为数据的length属性，它同样会返回true

function likeArray(obj) {
    return typeof obj.length == 'number'
}


//清除给定的参数中的null或undefined，注意0==null,'' == null为false

function compact(array) {
    return [].filter.call(array, function(item) {
        return item != null
    })
}

var wait = 60;

function time(obj) {
    if (wait == 0) {
        obj.removeAttr("disabled").removeClass('disabled');
        obj.html("获取验证码");
        wait = 60;
    } else {
        obj.html("(" + wait + "s)");
        wait--;
        setTimeout(function() {
            time(obj);
        }, 1000);
    }
}


function Left(obj, status, distance, direction, time) {
    // status    状态 是否重置
    // distance  距离 
    // direction 方向
    // time      时间
    if (!status) {
        obj.css({
            left: distance,
            opacity: 0
        }).stop(true, true).animate({
            left: 0,
            opacity: 1
        }, time, "linear")
    } else {
        obj.stop(true, true).animate({
            left: 0,
            opacity: 1
        }, time, "linear")
    }
    if (direction == "prev") {
        if (obj.prev().length != 0) {
            var TIME = setTimeout(function() {
                Left(obj.prev(), status, distance, direction, time)
            }, time / 2)
        } else {
            clearTimeout(TIME)
        }
    } else {
        if (obj.next().length != 0) {
            var TIME = setTimeout(function() {
                Left(obj.next(), status, distance, direction, time)
            }, time / 2)
        } else {
            clearTimeout(TIME)
        }
    }

}