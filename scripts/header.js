var IautosPC = {};
var window_height = window.screen.availHeight;
var uniformResourceLocator = window.location.href;
var fastLoginPhoneRight;
var fastLoginCodeRight;
var passwordLoginUserNameRight;
var passwordLoginPasswordRight;
var passwordLoginImgCodeRight;

IautosPC.ua = window.navigator.userAgent.toLowerCase();
IautosPC.config = {
    host: 'http://' + window.location.host,
    address: {
        is_login: '/index.php?c=ajax&a=getUser',
        pb_logout: '/user/logout/?ajax=1',
        password_login: '/index.php?c=user&a=ajax_login',
        fast_login: '/user/flogin/',
        fast_sendCode: '/user/flogin_sendcode/',
        pp_getSeries: '/pinggu/ajaxSeries/',
        pp_getYears: '/pinggu/ajaxYears/',
        pp_getTrims: '/pinggu/ajaxTrims/',
        pp_sendCode: '/sell/ajax_send_carcode/',
        pp_areaCities: '/index.php?c=area&a=get_city',
        pp_sendForm: '/index.php?c=sell&a=ajax_save_sendcar',
        pp_getPicFromMobile: '/sell/fast_sendcar_getpic/',
        os_phone: '/index.php?c=ajax&a=shopclue'
    }
};

Function.prototype.addMethod = function(name, func) {
    this.prototype[name] = func;
    return this;
};

var CheckTags = new Function();
var checkTags = new CheckTags();

CheckTags.addMethod('checkAds', function(ele) {
    $('.' + ele).each(function() {
        var that = this;

        if ( $(that).find('div').height() == 0 || $(that).children('div').length == 0 || !$(that).find('iframe').contents().find('body').html() ) {
            $(that).hide();
        }
    });
}).addMethod('checkDocument', function (windowHeight, documentHeight, body, footer) {
    if (windowHeight > documentHeight) {
        $('body').css({
            'height': windowHeight + 'px'
        });

        if (footer) {
            $('#' + footer).css({
                'position': 'absolute',
                'bottom': 0 + 'px',
                'width': '100%'
            });
        }
    }
});

var AjaxFunctions = new Function();
var ajaxFunctions = new AjaxFunctions();

AjaxFunctions.addMethod('getData', function(dirStr, args, isSync, successCallback, errorCallback) {
    var ajax_url = IautosPC.config.host + dirStr + args;

    $.ajax({
        cache: false,
        type: 'GET',
        async: isSync,
        url: ajax_url,
        dataType: 'json',
        success: function(returnData) {
            successCallback(returnData);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            errorCallback(XMLHttpRequest, textStatus, errorThrown);
        }
    });
}).addMethod('postData', function(dirStr, args, isSync, successCallback, errorCallback) {
    var ajax_url = IautosPC.config.host + dirStr;

    $.ajax({
        cache: false,
        type: 'POST',
        async: isSync,
        url: ajax_url,
        dataType: 'json',
        data: args,
        success: function(returnData) {
            successCallback(returnData);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            errorCallback(XMLHttpRequest, textStatus, errorThrown);
        }
    });
});

var CheckFunctions = new Function();
var checkFunctions = new CheckFunctions();

CheckFunctions.addMethod('checkMile', function(mile) {
    return (/^0\.000[1-9]$/.test(mile) || /^0\.00[1-9][0-9]?$/.test(mile) || /^0\.0[1-9][0-9]{0,2}$/.test(mile) || /^0\.[1-9][0-9]{0,3}$/.test(mile) || /^0[1-9](\.[0-9]{1,4})?$/.test(mile) || /^[1-9][0-9]?(\.[0-9]{1,4})?$/.test(mile));
}).addMethod('checkPrice', function(price) {
    return (/^0\.0[1-9]$/.test(price) || /^0\.[1-9][0-9]?$/.test(price) || /^0[1-9][0-9]{0,2}(\.[0-9]{1,2})?$/.test(price) || /^[1-9][0-9]{0,3}(\.[0-9]{1,2})?$/.test(price));
}).addMethod('checkMobile', function(phoneNum) {
    return (/^1[34578]\d{9}$/.test(phoneNum));
}).addMethod('checkCode', function(code) {
    return (/^[0-9]{6}$/.test(code));
}).addMethod('checkImgCode', function(imgCode) {
    return (/^.{4}$/.test(imgCode));
}).addMethod('checkInput', function(value, placeholder) {
    
    if (value && (value !== placeholder)) {
        return true;
    } else {
        return false;
    }
});

var GoogleAnalytics = new Function();
var googleAnalytics = new GoogleAnalytics();

GoogleAnalytics.addMethod('sendGA', function(drei, vier, funf, sechs) {

    if (sechs) {
        sechs = Math.round(sechs);
    }

    ga('send', 'event', drei, vier, funf, sechs);
}).addMethod('setGA', function(eins, zwei, drei) {
    ga(eins, zwei, drei);
});

function sendGA(ec, el, callback) {
    try {
        ga('send', 'event',  ec, 'click', el);
    } catch(e) {}
}

$(document).ready(function () {
    var document_height = document.body.offsetHeight;
    var body = document.getElementsByTagName('body')[0];
    var footer = document.getElementById('footer');
    var alpha_layer = document.getElementById('alphaLayer');
    
    // Grey float layer`s height reset event.
    if (alpha_layer) {
        alpha_layer.style.height = document_height + 'px';    
    }

    // 页面文档不满屏处理.
    checkTags.checkDocument(window_height, document_height, body, footer);

    // 页面广告失效处理.
    checkTags.checkAds('ad');
    checkTags.checkAds('ads');

    // IE8及以下placeholder兼容.
    if (!('placeholder' in document.createElement('input'))) {
        $('[placeholder]').focus(function() {
            var input = $(this);

            if (input.val() === input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);

            if (input.val() === '' || input.val() === input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
    
    // Public login event group start.
    $('#headLoginBtn, #headLoginBox').hover(function() {
        var that = this;

        if (that.id === 'headLoginBtn') {
            $(that).addClass('active');
            $('#headLoginBox').show();
        } else {
            $('#headLoginBtn').addClass('active');
            $(that).show();
        }
    }, function() {
        var that = this;

        if (that.id === 'headLoginBtn') {
            $(that).removeClass('active');
            $('#headLoginBox').hide();
        } else {
            $('#headLoginBtn').removeClass('active');
            $(that).hide();
        }
    });

    $('#merchantLoginBtn').on('click', function () {
        $('#headLoginBtn').removeClass('active');
        $('#headLoginBox').hide();
    });

    $('#personalLoginBtn').on('click', function() {
        $('#personalLoginBox, #alphaLayer').show();
    });

    $('#personalLoginBox').on('click', '.close', function() {
        $('#personalLoginBox, #alphaLayer, #personalLoginBox .password-register').hide();
        $('#personalLoginBox .fast-register').show();
        $('#personalLoginBox input[type=text]').val('');
        $('#personalLoginBox .tab li').eq(0).addClass('active');
        $('#personalLoginBox .tab li').eq(1).removeClass('active');
        $('#fastLoginPhoneNumber, #fastLoginCode, #passwordLoginPassword, #passwordLoginImgCode').val('');
        $('#fastLoginErrorInfo, #passwordLoginErrorInfo').addClass('disappear');
    });

    $('#personalLoginBox .tab li').on('click', function() {
        var that = this;
        var classBox = $(that).data('tag');

        $(that).addClass('active').siblings('li').removeClass('active');
        $('.' + classBox).show().siblings('div').hide();

        if (classBox === 'fast-register') {
            $('#passwordForget').hide();
            $('#merchantEnter').show();
        } else {
            $('#merchantEnter').hide();
            $('#passwordForget').show();
        }
    });

    $('#fastLoginSendCode').on('click', function() {
        var that = this;

        fastLoginPhoneRight = checkFunctions.checkMobile($('#fastLoginPhoneNumber').val());

        if (!fastLoginPhoneRight) {
            $('#fastLoginErrorInfo').removeClass('success disappear').text('请输入正确的手机号！').show();
            return false;
        }

        ajaxFunctions.postData(IautosPC.config.address.fast_sendCode, 'mobile=' + $('#fastLoginPhoneNumber').val(), false, function(returnData) {

            if (returnData.code === 'BU0001') {
                window.location.reload(true);
            } else {

                if (returnData.status === 1) {
                    IautosPC.count = 58;

                    $(that).hide();
                    $('#fastLoginResendCode').show();

                    var timer = setInterval(function() {

                        if (IautosPC.count === 0 || IautosPC.count === '0') {
                            clearInterval(timer);
                            $(that).show();
                            $('#fastLoginResendCode').text('59秒后重发').hide();
                            return false;
                        }

                        if (IautosPC.count < 10) {
                            IautosPC.count = '0' + IautosPC.count;
                        }

                        $('#fastLoginResendCode').text(IautosPC.count + '秒后重发');
                        IautosPC.count -= 1;
                    }, 1000);

                    $('#fastLoginErrorInfo').addClass('success').removeClass('disappear').text('动态码发送成功！').show();

                    var successTimer = setInterval(function() {
                        $('#fastLoginErrorInfo').hide();
                    }, 3000);
                } else {
                    $('#fastLoginErrorInfo').removeClass('success disappear').text(returnData.msg).show();
                }
            }
        }, function() {});
    });

    $('#fastLoginSubmit').on('click', function() {
        var that = this;

        fastLoginPhoneRight = checkFunctions.checkMobile($('#fastLoginPhoneNumber').val());
        fastLoginCodeRight = checkFunctions.checkCode($('#fastLoginCode').val());

        if (!fastLoginPhoneRight) {
            $('#fastLoginErrorInfo').removeClass('success disappear').text('请输入正确的手机号！').show();
            return false;
        }

        if (!fastLoginCodeRight) {
            $('#fastLoginErrorInfo').removeClass('success disappear').text('请输入正确的动态码！').show();
            return false;
        }

        ajaxFunctions.postData(IautosPC.config.address.fast_login, 'mobile=' + $('#fastLoginPhoneNumber').val() + '&code=' + $('#fastLoginCode').val(), false, function(returnData) {
            
            if (returnData.status === 1) {

                if ($('#gotoPersonalCenter').val() === 'true') {
                    window.location.href = '/home/user/';
                } else {
                   window.location.reload(true);
                }
            } else {
                $('#fastLoginErrorInfo').removeClass('success disappear').text(returnData.msg).show();
                $(that).parent().addClass('unsubmit');

                var timer = setTimeout(function() {
                    $(that).parent().removeClass('unsubmit');
                }, 3000);
            }
        }, function() {});
    });

    $('#fastLoginCode').keydown(function(event) {

        if (event.keyCode === 13) {

            fastLoginPhoneRight = checkFunctions.checkMobile($('#fastLoginPhoneNumber').val());
            fastLoginCodeRight = checkFunctions.checkCode($('#fastLoginCode').val());

            if (!fastLoginPhoneRight) {
                $('#fastLoginErrorInfo').removeClass('success disappear').text('请输入正确的手机号！').show();
                return false;
            }

            if (!fastLoginCodeRight) {
                $('#fastLoginErrorInfo').removeClass('success disappear').text('请输入正确的动态码！').show();
                return false;
            }

            ajaxFunctions.postData(IautosPC.config.address.fast_login, 'mobile=' + $('#fastLoginPhoneNumber').val() + '&code=' + $('#fastLoginCode').val(), false, function(returnData) {
                
                if (returnData.status === 1) {

                    if ($('#gotoPersonalCenter').val() === 'true') {
                        window.location.href = '/home/user/';
                    } else {
                       window.location.reload(true);
                    }
                } else {
                    $('#fastLoginErrorInfo').removeClass('success disappear').text(returnData.msg).show();
                    $('#fastLoginSubmit').parent().addClass('unsubmit');

                    var timer = setTimeout(function() {
                        $('#fastLoginSubmit').parent().removeClass('unsubmit');
                    }, 3000);
                }
            }, function() {});
        }
    });

    $('#passwordLoginImgBtn').on('click', function() {
        var that = this;
        var maxWu = Math.round(Math.random() * 1000000000);
        
        this.src = '/index.php?c=usedcar&a=get_captcha_new&key=ajax_login&max_wu=' + maxWu;
        $(that).parent().addClass('unclick');

        var timer = setTimeout(function() {
            $(that).parent().removeClass('unclick');
        }, 1000);
    });

    $('#passwordLoginSubmit').on('click', function() {
        var that = this;

        passwordLoginUserNameRight = $('#passwordLoginUserName').val();
        passwordLoginPasswordRight = $('#passwordLoginPassword').val();
        passwordLoginImgCodeRight = checkFunctions.checkImgCode($('#passwordLoginImgCode').val());

        if (!passwordLoginUserNameRight) {
            $('#passwordLoginErrorInfo').removeClass('disappear').text('请输入正确的用户名！').show();
            return false;
        }

        if (!passwordLoginPasswordRight) {
            $('#passwordLoginErrorInfo').removeClass('disappear').text('请输入的密码！').show();
            return false;
        }

        if (!passwordLoginImgCodeRight) {
            $('#passwordLoginErrorInfo').removeClass('disappear').text('请输入正确的图片码！').show();
            return false;
        }

        ajaxFunctions.postData(IautosPC.config.address.password_login, '&username=' + $('#passwordLoginUserName').val() + '&password=' + $('#passwordLoginPassword').val() + '&validatecode=' + $('#passwordLoginImgCode').val(), false, function(returnData) {
            
            if (returnData.code === 'BU0001') {
                window.location.reload(true);
            } else {
                
                if (returnData.status === 1) {

                    if ($('#gotoPersonalCenter').val() === 'true') {
                        window.location.href = '/home/user/';
                    } else {
                        window.location.reload(true);
                    }
                } else {
                    $('#passwordLoginErrorInfo').removeClass('disappear').text(returnData.msg).show();
                    $(that).parent().addClass('unsubmit');

                    var timer = setTimeout(function() {
                        $(that).parent().removeClass('unsubmit');
                    }, 3000);
                }
            }
        }, function() {});
    });

    $('#passwordLoginImgCode').keydown(function(event) {

        if (event.keyCode === 13) {
            passwordLoginUserNameRight = $('#passwordLoginUserName').val();
            passwordLoginPasswordRight = $('#passwordLoginPassword').val();
            passwordLoginImgCodeRight = checkFunctions.checkImgCode($('#passwordLoginImgCode').val());

            if (!passwordLoginUserNameRight) {
                $('#passwordLoginErrorInfo').removeClass('disappear').text('请输入正确的用户名！').show();
                return false;
            }

            if (!passwordLoginPasswordRight) {
                $('#passwordLoginErrorInfo').removeClass('disappear').text('请输入的密码！').show();
                return false;
            }

            if (!passwordLoginImgCodeRight) {
                $('#passwordLoginErrorInfo').removeClass('disappear').text('请输入正确的图片码！').show();
                return false;
            }

            ajaxFunctions.postData(IautosPC.config.address.password_login, '&username=' + $('#passwordLoginUserName').val() + '&password=' + $('#passwordLoginPassword').val() + '&validatecode=' + $('#passwordLoginImgCode').val(), false, function(returnData) {
                
                if (returnData.code === 'BU0001') {
                    window.location.reload(true);
                } else {
                    
                    if (returnData.status === 1) {

                        if ($('#gotoPersonalCenter').val() === 'true') {
                            window.location.href = '/home/user/';
                        } else {
                            window.location.reload(true);
                        }
                    } else {
                        $('#passwordLoginErrorInfo').removeClass('disappear').text(returnData.msg).show();
                        $('#passwordLoginSubmit').parent().addClass('unsubmit');

                        var timer = setTimeout(function() {
                            $('#passwordLoginSubmit').parent().removeClass('unsubmit');
                        }, 3000);
                    }
                }
            }, function() {});
        }
    });
    // Public login event group end.

    // 公共顶部登录模块事件.
    $('#clientDownload, #personalRegister, #merchantRegister').on('mouseenter', function() {
        var that = this;

        $(that).addClass('active');

        if (that.id === 'personalRegister') {
            $('#personalUnregisterList, #personalRegisterList').show();
        } else if (that.id === 'merchantRegister') {
            $('#merchantUnregisterList, #merchantRegisterList').show();
        } else {
            $(that).find('.box').show();
        }
    });

    $('#clientDownload, #personalRegister, #merchantRegister').on('mouseleave', function() {
        var that = this;

        $(that).removeClass('active');

        if (that.id === 'personalRegister') {
            $('#personalUnregisterList, #personalRegisterList').hide();
        } else if (that.id === 'merchantRegister') {
            $('#merchantUnregisterList, #merchantRegisterList').hide();
        } else {
            $(that).find('.box').hide();
        }
    });

    $('#commonHeader').on('click', '#userExit', function () {
        ajaxFunctions.getData(IautosPC.config.address.pb_logout, '', false, function (returnData) {

            if (returnData.status === 1) {
                window.location.reload(true);
            }
        }, function (XMLHttpRequest, textStatus, errorThrown) {});
    });


    if (!uniformResourceLocator.match('/shop/')) {

        // 公共底部翻页事件.
        $('#newsPageInput').keydown(function(e) {
            var that = $(this);
            var _page = Number(that.val());
            var url = window.location.pathname;
            if (e.keyCode == 13) {
                if (isNaN(_page) || _page < 1) {
                    alert("请输入正确的页码");
                } else {
                    if (_page >0) {
                        if (/[0-9]\/$/.test(url)) {
                            url = url.replace(/[0-9]+\/$/, _page + '/');
                        } else {
                            url += 'p' + _page + '/';
                        }
                    }
                    window.location.href = url;
                }
            }
        });

        $('#newsPageConfirmBtn').on('click', function() {
            var _page = Number($('#newsPageInput').val());
            var url = window.location.pathname;
            if (isNaN(_page) || _page < 1) {
                alert("请输入正确的页码");
            } else {
                if (_page > 0) {
                    if (/[0-9]\/$/.test(url)) {
                        url = url.replace(/[0-9]+\/$/, _page + '/');
                    } else {
                        url += 'p' + _page + '/';
                    }
                }
                window.location.href = url;
            }
        });
    } else {

        // 公共底部翻页事件.
        $('#newsPageInput').keydown(function(e) {
            var that = $(this);
            var page = Number(that.val());

            if (e.keyCode == 13) {
                if (isNaN(page) || page < 1) {
                    alert("请输入正确的页码");
                } else {
                    if (page >0) {
                        window.location.href += (uniformResourceLocator.test(/html/) ? '?' : '&') + 'pageindex=' + page;
                    }
                }
            }
        });

        $('#newsPageConfirmBtn').on('click', function() {
            var page = Number($('#newsPageInput').val());

            if (isNaN(page) || page < 1) {
                alert("请输入正确的页码");
            } else {

                if (page > 0) {
                     window.location.href += (uniformResourceLocator.test(/html/) ? '?' : '&') + 'pageindex=' + page;
                }
            }
        });
    }
    
});

window.onload = function () {
    // 车源图片图片处理暂行办法
    $("img[name='carPicSmall'], img[name='tm-shopLogo']").each(function (index, ele) {
        var that = this;
        var height = that.height;
        var pheight = $(that).parent().height();

        if (height > pheight) {
            $(that).css({
                'position': 'absolute',
                'top': '50%',
                'margin-top': '-' + (height / 2) + 'px'
            });
        } else if (height < pheight) {
            $(that).removeAttr('width').attr('height', '100%').css({
                'position': 'absolute',
                'left': '50%',
                'margin-left': '-' + (that.width / 2) + 'px'
            });
        }
    });
};

$(document).ready(function(){
    app();
    headArea();
    myAsk();
    asklistShow();
    popup("glb_myAsk");
    popup("glb_wei_xin");
    mobile_val();
    settime();
    scroll_textarea();
    searchUnit();
    fixed_right();

    // Solution of IE8 do not discern function indexOf.
    if ( !Array.prototype.indexOf ) {
        Array.prototype.indexOf = function(elt/*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;

            from = (from < 0) ? Math.ceil(from) : Math.floor(from);

            if ( from < 0 ) {
                from += len;
            }

            for (; from < len; from++) {
                if ( from in this && this[from] === elt )
                    return from;
            }

            return -1;
        };
    }

    $("#textareaVal textarea").blur(function(){
        var val = $(this).val().length;
    });

    $("#areaOptionClose").on("click", function() {
        $("#areaOption").hide();
    });

    $(".head-area").hover(function() {
        $("#areaOption").show();
        $(this).find(".area-select").css("border-color", "#ccc");
        $(this).find(".area-select").css("border-bottom-color", "#fff");
        $(this).find('.glb-area').css({
            'transition': '0.5s',
            '-ms-transition': '0.5s',
            '-moz-transition': '0.5s',
            '-webkit-transition': '0.5s',
            '-o-transition': '0.5s',
            'transform': 'rotate(180deg)',
            '-ms-transform': 'rotate(180deg)',
            '-moz-transform': 'rotate(180deg)',
            '-webkit-transform': 'rotate(180deg)',
            '-o-transform': 'rotate(180deg)'
        });
    }, function() {
        $(".province-letter li").removeClass("active");
        $(".all-city-list").show();
        $("#areaOption").hide();
        $(this).find(".area-select").css("border-color", "#fff");
        $(this).find('.glb-area').css({
            'transition': '0.5s',
            '-ms-transition': '0.5s',
            '-moz-transition': '0.5s',
            '-webkit-transition': '0.5s',
            '-o-transition': '0.5s',
            'transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)'
        });
    });

    $(".glb-app").hover(function() {
        $(".app-popup").show();
    }, function() {
        $(".app-popup").hide();
    });

    $(".all-city .u").each(function() {
            if($(this).parent().index() > 0) {
                $(this).hide();
            }
        }
    );

    $(".province-letter").on("click","li", function() {
        var id = $(this).find("span").attr("id");

        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#S_" + id).show();
        $("#S_" + id).siblings().hide();
    });

    globalFixed();

    function globalFixed() {
        $(window).on("scroll",function() {
            var fixedVal = $(window).scrollTop();
            var returnTopBtnHeight = $('.return-top').outerHeight(true);

            if(fixedVal > 750){
                $(".global-fixed .return-top").fadeIn();
                $(".global-fixed").css({'bottom': '368px'});
            }else{
                $(".global-fixed").css({'bottom': 368 + returnTopBtnHeight + 'px'});
                $(".global-fixed .return-top").hide();
            }
        });
        $(document).on("click", ".return-top", function() {
            $("html,body").animate({scrollTop:0}, 200);
        });
    }

    $(".enter-close").on("click", function() {
        $(".sell-info-enter").hide();
    });

//    var windowWidth = $(window).width();
//
//    $(".sell-info-enter").css("right", (windowWidth - 1803) / 2);
    
});

function fixed_right(){
    var num =1;
    
    $(window).scroll(function() {
        var right_height = $(".ask-answer-sidebar").height(),
            body_top = $(window).scrollTop(),
            body = $(window.document).height(),
            footer = $(".footer").height();
        
        if(body_top > right_height && num==1){
            num = 2;
            $(".ask-answer-sidebar .ad").css({"z-index":"10","position":"fixed","top":"50px","opacity":"0"}).animate({opacity:"1",top:0},1000);
        }
        if(body_top < right_height){
            $(".ask-answer-sidebar .ad").css({"position":"static","opacity":"1"});
            num = 1;
        }
        if(body_top > body-footer -300){
            $(".ask-answer-sidebar .ad").css({"position":"static","opacity":"0"});
            num = 1;
        }
    })
}

searchVal();

function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; "); //notice the space after the ';'
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}

function getCookieTmp(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; "); //notice the space after the ';'
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}

function searchVal(){
    $(document).on("keyup","#search",function(){
        var val =$(this).val();
        //$.ajax
        $(".search-popup").fadeIn();
    });
    $(document).on("keydown",function(event){
        var keycode = event.which;
        if(keycode == 38 && $(".search-popup").css("display") != "none")
        {
            var totalNum = $(".search-popup li").length;
            var currentIndex = $(".search-popup li").index($(".search-popup").find("li[class='hover']"));
            var nextNum = currentIndex-1;
            if(nextNum < 0)
                nextNum = totalNum-1;
            $(".search-popup li").removeClass('hover');
            $($(".search-popup").find("li")[nextNum]).addClass('hover');
            var serVal = $($(".search-popup").find("li[class='hover']")).text();
            $("#search").attr("value",serVal);
        }
        else if (keycode == 40 && $(".search-popup").css("display") != "none")
        {
            var totalNum = $(".search-popup li").length;
            var currentIndex = $(".search-popup li").index($(".search-popup").find("li[class='hover']"));
            var nextNum = currentIndex-(-1);
            if(nextNum == totalNum)
                nextNum = 0;
            $(".search-popup li").removeClass('hover');
            $($(".search-popup").find("li")[nextNum]).addClass('hover');
            var serVal = $($(".search-popup").find("li[class='hover']")).text();
            $("#search").attr("value",serVal);
        }
    });
    $(document).on("click",".search-popup li",function(){
        //alert();
        $("#search").attr("value",$(this).text());
        $(".search-popup").hide();
    })
};

function scroll_textarea(){
    $(document).on("click",".ask-detail .reply",function(){
        var textarea_top = $("#textArea").offset().top-200;
        $("body").animate({scrollTop:textarea_top},500);
        $("#textArea").focus();
    });
}

function settime() {
    $(document).on("click","#countDown",function(){
        var countdown=60; 
        var name = $("#countDown");
        $(this).addClass("glb-btn-gy");
        $(this).prop("disabled", true);
        var miao = setInterval(function(){
                name.attr("value","重发" + countdown + "秒");
                countdown--;
                if(countdown == -1){
                    clearInterval(miao);
                    $("#countDown").removeClass("glb-btn-gy");
                    name.attr("value","重发");
                    $("#countDown").prop("disabled", false);
                }
            },1000);
    });
}

function mobile_val(text){
    
    $("#mobile_val .ask-ask-btn-small").click(function(){
        var mobile = $("#mobile_val #phoneVal").val();
        var reg = new RegExp(/^(\+86)?(1[3,4,5,7,8][0-9]{9})$/);
        if(mobile == ""){
            $("#mobile_val .glb-hint").text("请输入手机号码！").fadeIn();
        } else if(!reg.test(mobile)){
            $("#mobile_val .glb-hint").text("手机号码输入有误，请重试！").fadeIn();
        }else{
            $("#mobile_val .glb-hint").hide();
            $("#yanzhengma_code").animate({height:"40px"},500);

        }

    });

    $(document).on("click","#countDown",function(){
        var mobile = $("#mobile_val #phoneVal").val();
        $.ajax({
            type:   "POST",
            url:    "/index.php?c=pinggu&a=ajaxReg/",
            dataType:"json",
            data:{mobile:mobile},
            success:function(data) {
                if(data == 0) {
                    alert("验证码发送失败");
                } else {//if ( data == 1) {
                    $("#click_no1").hide();
                    $("#click_no3").show();
                }
            }
        });

    });



    $("#mobile_val #phoneVal").click(function(){
        $("#mobile_val .glb-hint").fadeOut();
    });


    $("#click_no3").click(function(){

        var textarea_up =  $("#assessDescribe").val();
        var textarea_down =  $("#write-t").attr("title");
        var test_code =  $("#codeText").val();
        var mobile = $("#mobile_val #phoneVal").val();

        var textarea = textarea_up + "  " + textarea_down;
        $.ajax({
            type: "POST",
            url: "/index.php?c=pinggu&a=ajaxRegSave",
            dataType: "json",
            data: {textarea: textarea, test_code: test_code, mobile: mobile},
            success: function (data) {
                if(data == 0) {
                    $("#mobile_val .glb-hint").text("验证码错误或未输入验证码，请重试！").fadeIn();
                } else if(data == 2 || data == 3) {
                    alert("数据录入错误");
                } else if(data == 1 ) {
                    $(".choose-boxes, .choose-boxes-alpha ,.choose-boxes-wrap, .submit-success").show();
                    $(".write-describe").hide();
                    $("#mobile_val").hide();
                } else if (data == 5) {


                }

            }
        });

    });


    //$("#searchBtn").click(function(){
    //
    //  var keywords = $(this).parent().find("#searchInput").val();
    //
    //  if(keywords == "搜索你喜欢的车型，如宝马") {
    //     alert(1);
    //  } else {
    //      alert(2);
    //  }
    //
    //});
}

function popup(id){
    var alpha = $(".glb-alpha");
    alpha.height( $('body').height() );
    $(".glb-popup").css({"position":"fixed"});
    //$(".glb-popup").css({"left":$(window).width()/2-$("."+id).width()/2,"top":$(window).height()/2-$("."+id).height()/2});

    $("#"+id).click(function(){
        alpha.show();
        $("."+id).fadeIn(400);
        if(this.id == "glb_myAsk"){
            $(".glb_myAsk textarea").focus();
        }
    });
    $(".glb-del").click(function(){
        $(".btn input").prop("disabled", false);
        $(this).closest(".glb-popup").fadeOut();
        $(this).closest(".glb-popup").find("#mytextarea").attr("value","");
        $(this).closest(".glb-popup").find("#phoneVal").attr("value","");
        if($(".glb_myAsk").css("display") =='block' && $(".glb_mobile").css("display") =='block'){

        }else{
            alpha.hide();
            return false;
        }
    });

    $(document).on("click",".glb-alpha",function() {
        $(this).fadeOut();
        $(".glb-popup").fadeOut();
        if ( $('.glb-wx-popup').css('display') == 'block' ) {
            $('.glb-wx-popup').fadeOut();
        }
    });

}

function app(){
    $(".app,.app-hover,.app-popup").mouseover(function(){
        $(".app-popup").show();
    }).mouseout(function(){
        $(".app-popup").hide();
    });
}

function headArea(){
    $(".head-area .area-til,.area-box,.area-main").mouseover(function(){
        $(".head-area .area-til .area-ico").css({"transition":"0.3s linear","transform":"rotate(180deg)"});
        $(".head-area .area-til").css("borderBottom","1px solid #fff")
        $(".area-main").show();
    }).mouseout(function(){
        $(".head-area .area-til .area-ico").css({"transform":"rotate(0deg)"});
        $(".head-area .area-til").css("borderBottom","1px solid #ccc")
        $(".area-main").hide();
    });
    
    $(".head-area .area-hot a").click(function(){
        $(".area-til .area-text").html($(this).text());
        $(".area-main").hide();
    })
};

function myAsk(){
    var li=$("#myAsk ul").find("li"),index = li.length,num = 3;
    li.hide().slice(0,num).show().eq(-1).addClass("last");
    if(index <= 3){
        $("#myAsk .btn-more").hide();
    }else{
        $("#myAsk .btn-more").click(function(){
            num+=10;
            li.siblings().removeClass("last").eq(num-1).addClass("last");
            li.each(function(){
                if($(this).css("display") =='none'){
                    $("#myAsk ul").find("li").slice(0,num).fadeIn(500);
                }
            });
            if(num>=index){
                $("#myAsk .btn-more").hide();
                li.siblings().removeClass("last").eq(-1).addClass("last");
            };          
        });
    }
};

function asklistShow(){
    $("#asklistShow .btn-more").on("click",function(){
        $(this).hide();
        $(".loading").show();
        $.ajax({
            type:   "GET",
            url:    "./temp/test.json",//url
            dataType:"json",
            success:function(data){
                var _html="";
                for(var i=0;i<data.length;i++){
                    _html += '<li><div class="date"><span class="ask-come">'+data[i].laizi+'</span><span class="date-num">'+data[i].date+'</span></div><h4 class="title"><a href="'+data[i].url+'">'+data[i].title+'</a></h4><div class="head-qq"><img src="'+data[i].imgUrl+'" width="40" height="40" alt="" /><div class="head-txt">'+data[i].name+'<p class="time">'+data[i].date1+'</p></div></div><div class="ask-text">'+data[i].text+'<a href="'+data[i].url+'">( 详细 )</a></div></li>';
                };
                $("#asklistShow ul").append(_html);
            }
        });
        $(".loading").hide();
        $("#asklistShow .btn-more").fadeIn();
    });
    $(document).on("click",".ask-answer-list .more",function(){
        $(this).hide();
        $(this).siblings(".ask-answer-list .unfold").fadeIn();
    })
};

/* 
function weibo(val){
    var text = $("."+val).text();
    window.open('http://v.t.sina.com.cn/share/share.php?title='+text);  
};

 */

function fenxiang(){
    var text = $(".title-txt").text(),str = text.substring(0,120),urlVal = document.URL,zf,reg=/[.。,，!！?？]/g,last=str.substr(str.length-1,str.length-1);
    if(text.length > 120){
        if(reg.exec(last)){
            str = text.substring(0,119);
            zf="...";
        }else{
            zf="...";
        }
    }else{
        zf="";
    }
    /* 
    code(urlVal);
    function code(urlVal){
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 300,height : 300
        });
        qrcode.makeCode(urlVal);
    };
     */
    window._bd_share_config = {
        common : {
            bdText : str+''+zf+''+'(分享自 @第一车网)',    
            bdDesc : '自定义分享摘要', 
            bdUrl : urlVal
            //, bdPic : '自定义分享图片'
        },
        share : [{
            "bdSize" : 16
        }]
        /*
        slide : [{     
            bdImg : 0,
            bdPos : "right",
            bdTop : 100
        }],
        image : [{
            viewType : 'list',
            viewPos : 'top',
            viewColor : 'black',
            viewSize : '16',
            viewList : ['qzone','tsina','huaban','tqq','renren']
        }],
        selectShare : [{
            "bdselectMiniList" : ['qzone','tqq','kaixin001','bdxc','tqf']
        }]
        */
    };
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
    
};

function searchUnit()
{
    var searchTimer = null;
    $("#searchInput").keyup(function(event){
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function(){
            if(event.keyCode == 38 || event.keyCode == 40) {
                return false;
            }
            var str = $("#searchInput").val().toString();
            if(str == "")
            {
                $("#searchTip").hide();
                $("#searchTip li").removeClass('hover');
            }
            else
            {
                //********************************************************这里是新增加的****日期：2013-02-22*by:wzg*****Begin**********************//
                $("#searchTip").show();
                $.getJSON("/index.php?a=autocomplete&q="+encodeURI(str), function(result){
                    var content = "<ul id='searchList'>";
                    $.each(result,function(i,item){
                        content += '<li style="cursor:default"><span class="left r">'+item.name+'</span>';
                        //content += '<span class="right">约<b>'+//item.count+'</b>个结果</span></li>';
                    })
                    content += '</ul>';
                    $("#searchTip").html(content);

                    $("#searchTip li").hover(
                        function(){
                            $("#searchTip li").removeClass('hover');
                            $(this).addClass('hover');

                        },
                        function(){
                        });

                    //这里是点击搜索框某一条数据时的事件：
                    $("#searchTip li").click(function(){
                        var serVal = $($(this).find("span")[0]).text();
                        $("#searchInput").attr("value",serVal);
                        $("#searchTip").hide();
                        $("#searchTip li").removeClass('hover');
                        $("#soForm").submit();
                    })

                    //以下是键盘向上、向下、回车的事件：
                    $(document).unbind("keydown");
                    $(document).keydown(function(event){

                        //向上箭头38:
                        if(event.keyCode == 38 && $("#searchTip").css("display") != "none")
                        {
                            var totalNum = $("#searchTip li").length;
                            var currentIndex = $("#searchTip li").index($("#searchTip").find("li[class='hover']"));
                            var nextNum = currentIndex-1;
                            if(nextNum < 0)
                                nextNum = totalNum-1;
                            $("#searchTip li").removeClass('hover');
                            $($("#searchTip").find("li")[nextNum]).addClass('hover');

                            var serVal = $($("#searchTip").find("li[class='hover']").find("span")[0]).text();
                            $("#searchInput").attr("value",serVal);


                        }//向下箭头40:
                        else if (event.keyCode == 40 && $("#searchTip").css("display") != "none")
                        {
                            var totalNum = $("#searchTip li").length;
                            var currentIndex = $("#searchTip li").index($("#searchTip").find("li[class='hover']"));
                            var nextNum = currentIndex-(-1);
                            if(nextNum == totalNum)
                                nextNum = 0;
                            $("#searchTip li").removeClass('hover');
                            $($("#searchTip").find("li")[nextNum]).addClass('hover');
                            var serVal = $($("#searchTip").find("li[class='hover']").find("span")[0]).text();
                            $("#searchInput").attr("value",serVal);

                        }//回车：
                    });

                    $(document).click(function(){
                        $("#searchTip").hide();
                        $("#searchTip li").removeClass('hover');
                    });
                    //********************************************************这里是新增加的****日期：2013-02-22*by:wzg*******End********************//
//
//                        var serachHeightCha = $("#searchBox").offset().top-$("#searchTip").height();
//                        alert(serachHeightCha);
//                        if(serachHeightCha < 100)
//                        {
//                            var scrol = 100-serachHeightCha;
//                            $(document).scrollTop(scrol);
//                        }
                })
            }
        });
    })

}

var swiperEvent = function() {
    this.autoSwiperTop = function(Vater, visibleCapacity, duration) {
        // swiper top auto
        var dealerListHeight = $( '.' + Vater ).eq(0).outerHeight(true);
        var dealerListNumber = $( '.' + Vater ).length;

        $( '.' + Vater ).each(function() {
            $(this).css({
                'top': ( dealerListHeight * $(this).index() ) + 'px'
            });
        });

        if ( dealerListNumber > visibleCapacity ) {
            var autoSwiperTop = setInterval(function() {
                var theLastList = $( '.' + Vater ).eq(dealerListNumber - 1);
                var theFirstListLeft = Number($( '.' + Vater ).eq(0).css('top').split('px')[0]);

                if ( theFirstListLeft == 0 ) {
                    theLastList.css({'top': - dealerListHeight + 'px'}).remove();
                    $( '.' + Vater ).parent().prepend(theLastList);
                }

                $( '.' + Vater ).each(function() {
                    $(this).animate({top: '+=' + dealerListHeight + 'px'}, duration);
                });
            }, duration * 6);
        }
    }
    this.liSwiperAuto = function(Vater, pageLeft, pageRight, visibleCapacity, duration) {
        // swiper eins once
        var dealerListWidth = $( '.' + Vater ).eq(0).outerWidth(true);
        var dealerListNumber = $( '.' + Vater ).length;

        $( '.' + Vater ).each(function() {
            $(this).css({
                'position': 'absolute',
                'top': 0,
                'left': ( dealerListWidth * $(this).index() ) + 'px'
            });
        });

        if ( dealerListNumber > visibleCapacity ) {
            var autoSwiper;

            autoSwiper = setInterval(function() {
                var theFirstList = $( '.' + Vater ).eq(0);
                var theLastListLeft = Number($( '.' + Vater ).eq(dealerListNumber - 1).css('left').split('px')[0]);

                if ( theLastListLeft == dealerListWidth * ( visibleCapacity - 1 ) ) {
                    theFirstList.css({'left': ( dealerListWidth * visibleCapacity ) + 'px'}).remove();
                    $( '.' + Vater ).parent().append(theFirstList);
                }

                $( '.' + Vater ).each(function() {
                    $(this).animate({left: '-=' + dealerListWidth + 'px'}, duration);
                });

            }, 3000);

            $('#' + pageLeft + ',' + '#' + pageRight).on('mouseover', function() {
                clearInterval(autoSwiper);
            });

            $('#' + pageLeft + ',' + '#' + pageRight).on('mouseout', function() {
                autoSwiper = setInterval(function() {
                    var theFirstList = $( '.' + Vater ).eq(0);
                    var theLastListLeft = Number($( '.' + Vater ).eq(dealerListNumber - 1).css('left').split('px')[0]);

                    if ( theLastListLeft == dealerListWidth * ( visibleCapacity - 1 ) ) {
                        theFirstList.css({'left': ( dealerListWidth * visibleCapacity ) + 'px'}).remove();
                        $( '.' + Vater ).parent().append(theFirstList);
                    }

                    $( '.' + Vater ).each(function() {
                        $(this).animate({left: '-=' + dealerListWidth + 'px'}, duration);
                    });

                }, 3000);
            });
        } else {
            $( '#' + pageLeft + ', #' + pageRight ).css({
                'cursor': 'default'
            });
        }
    }
    this.liSwiper = function(Vater, pageLeft, pageRight, eventLeft, eventRight, visibleCapacity, duration) {
        // swiper eins once
        var dealerListWidth = $( '.' + Vater ).eq(0).outerWidth(true);
        var dealerListNumber = $( '.' + Vater ).length;

        $( '.' + Vater ).each(function() {
            $(this).css({
                'position': 'absolute',
                'top': 0,
                'left': ( dealerListWidth * $(this).index() ) + 'px'
            });
        });

        if ( dealerListNumber > visibleCapacity ) {
            this.liSwiperLeft(Vater, pageLeft, eventLeft, visibleCapacity, duration, dealerListWidth, dealerListNumber);
            this.liSwiperRight(Vater, pageRight, eventRight, visibleCapacity, duration, dealerListWidth, dealerListNumber);
        } else {
            $( '#' + pageLeft + ', #' + pageRight ).css({
                'cursor': 'default'
            });
        }
    }
    this.liSwiperLeft = function(Vater, pageLeft, eventLeft, visibleCapacity, duration, dealerListWidth, dealerListNumber) {
        $( '#' + pageLeft ).on('click', eventLeft = function() {
            var theLastList = $( '.' + Vater ).eq(dealerListNumber - 1);
            var theFirstListLeft = Number($( '.' + Vater ).eq(0).css('left').split('px')[0]);

            $( '#' + pageLeft ).unbind('click', eventLeft);

            setTimeout(function() {
                $( '#' + pageLeft ).bind('click', eventLeft);
            }, duration + 10);

            if ( theFirstListLeft == 0 ) {
                theLastList.css({'left': - dealerListWidth + 'px'}).remove();
                $( '.' + Vater ).parent().prepend(theLastList);
            }

            $( '.' + Vater ).each(function() {
                $(this).animate({left: '+=' + dealerListWidth + 'px'}, duration);
            });
        });
    }
    this.liSwiperRight = function(Vater, pageRight, eventRight, visibleCapacity, duration, dealerListWidth, dealerListNumber) {
        $( '#' + pageRight ).on('click', eventRight = function() {
            var theFirstList = $( '.' + Vater ).eq(0);
            var theLastListLeft = Number($( '.' + Vater ).eq(dealerListNumber - 1).css('left').split('px')[0]);

            $( '#' + pageRight ).unbind('click', eventRight);

            setTimeout(function() {
                $( '#' + pageRight ).bind('click', eventRight);
            }, duration + 10);

            if ( theLastListLeft == dealerListWidth * ( visibleCapacity - 1 ) ) {
                theFirstList.css({'left': ( dealerListWidth * visibleCapacity ) + 'px'}).remove();
                $( '.' + Vater ).parent().append(theFirstList);
            }

            $( '.' + Vater ).each(function() {
                $(this).animate({left: '-=' + dealerListWidth + 'px'}, duration);
            });
        });
    }
};