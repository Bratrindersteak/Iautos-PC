var ForeignCooperation = {};

ForeignCooperation.currentYear = new Date().getFullYear();
ForeignCooperation.areaLetter = ['a', 'b', 'c', 'f', 'g', 'h', 'j', 'l', 'n', 'q', 's', 't', 'x', 'y', 'z'];
ForeignCooperation.checkLists = ['carSeries', 'brandTimeText', 'mileAge', 'carLocation'];
ForeignCooperation.cleanLists = ['carLocation', 'carSeries'];
ForeignCooperation.areaLocation = [];
ForeignCooperation.areaLocationId = [];
ForeignCooperation.areaLocationIdSubstitute = [];
ForeignCooperation.carSeriesId = [];
ForeignCooperation.carSeriesIdSubstitute = [];
ForeignCooperation.carSeriesModelId = [];
ForeignCooperation.carSeriesName = [];
ForeignCooperation.registrationYear = '';
ForeignCooperation.purchaseDate = '';
ForeignCooperation.listCount = 0;
ForeignCooperation.i;
ForeignCooperation.j;
ForeignCooperation.k;

$(document).ready(function() {
	// 初始化Swiper插件.
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		autoplay: 3000,
		autoplayDisableOnInteraction: false,
		pagination: '.swiper-pagination',
		paginationClickable: true
	});

	// 初始化lazyload.
	$('img.lazy').lazyload({
	    effect: 'fadeIn',
	    threshold: 200
	});

	// 厂商认证模块初始随机指定展示logo.
	var randomNum = $('#factoryId').val();

	$('.confirm-cars [data-mode=' + randomNum + ']').addClass('active');

	// 地区切换初始化字母处理.
	for (ForeignCooperation.i = 0; ForeignCooperation.i < ForeignCooperation.areaLetter.length; ForeignCooperation.i += 1) {

		for (ForeignCooperation.j = 1; ForeignCooperation.j < $('[data-letter=province-' + ForeignCooperation.areaLetter[ForeignCooperation.i] + ']').length; ForeignCooperation.j += 1) {
			$('[data-letter=province-' + ForeignCooperation.areaLetter[ForeignCooperation.i] + ']').eq(ForeignCooperation.j).find('.province-letter').remove();
		}
	}

	// 车系选择框初始化.
	$('#carBrandBox .brand-lists').eq(0).show();
	$('#carBrandLetterBox li').eq(0).addClass('active');

	// 评估表单初始化清空.
	for (ForeignCooperation.k = 0; ForeignCooperation.k < ForeignCooperation.cleanLists.length; ForeignCooperation.k += 1) {
		$('#' + ForeignCooperation.cleanLists[ForeignCooperation.k]).val('');
	}

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

	// Firefox & IE 兼容.
	$('a').on('focus', function () {
		this.blur();
	});

	// 切换地区 hover 事件.
	$('#areaChangeBtn').hover(function () {
		$(this).addClass('act');
		$('#areaBox, #areaLink').show();
	}, function () {
		$(this).removeClass('act');
		$('#areaBox, #areaLink').hide();
	});

	$('#areaLetterList').on('click', 'li', function () {
		var letter = $(this).data('letter');

		$(this).addClass('active').siblings('li').removeClass('active');

		if (letter === 'all') {
			$('.normal-cities').show();
		} else {
			$('.normal-cities').hide();
			$('[data-letter=province-' + letter + ']').show();
		}
	});

	// 切换地区关闭按钮事件.
	$('#areaCloseBtn').on('click', function () {
		$('#areaBox, #areaLink').hide();
	});

	// 新闻列表项 hover 事件.
	$('#newsList').on('mouseenter', 'li', function () {
		var src = $(this).data('src');
		var href = $(this).find('a').prop('href');

		$('#newsImage').find('img').prop('src', src);
		$('#newsImage').find('a').prop('href', href);
	});

	// 身边好车tags hover 事件.
	$('#goodCarNav').on('mouseenter', 'li', function () {
		var that = this;
		var mode = $(that).data('mode');
		var ename = $('#areaLocation').data('pinyin') + '-' + $(that).data('ename');
		var hasLists = sessionStorage.getItem(ename);

		$(that).addClass('active').siblings('li').removeClass('active');

		if (!hasLists) {
			ajaxFunctions.getData('/index.php?a=ajax_good_car', '&mode=' + mode, false, function (returnData) {
				var i;
				var temp = '';

				for (i = 0; i < returnData.length; i += 1) {
					temp += '<li><a onclick="ga("send", "event", "good-cars", "click", ' + mode + ' - ' + (i + 1) + ');" href="' + returnData[i].url + '"target="_blank"><div class="img"><img src="' + returnData[i].pic + '"width="100%"/></div><div class="info"><h6 class="tit">' + returnData[i].title_s + '</h6><div class="mid"><span class="price">￥<b class="num">' + returnData[i].price + '</b><b>万</b></span></div><div class="bottom"> <span class="time">'+ returnData[i].reg_date + '</span><span class="time">' + returnData[i].km + '万公里</span></div></div></a></li>';
				}

				$('#goodCarList').empty().append(temp);

				sessionStorage.setItem(ename, temp);
			}, function () {});
		} else {
			$('#goodCarList').empty().append(hasLists);
		}

		// 车源图片图片处理暂行办法
		var timer = setTimeout(function () {
			$("#goodCarList li img").each(function (index, ele) {
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
		},300);
	});

	// 厂商认证logo hover 事件.
	$('.brand-ico').on('mouseenter', 'li', function () {
		var that = this;
		var mode = $(that).data('mode');
		var ename = $('#areaLocation').data('pinyin') + '-' + $(that).data('pinyin');
		var location = $('#areaLocation').data('pinyin');
		var hasLists = sessionStorage.getItem(ename);

		$('.brand-ico li').removeClass('active active-bro');
		$(this).addClass('active').siblings('li').addClass('active-bro');

		if (!hasLists) {
			ajaxFunctions.getData('/index.php?a=ajax', '&mode=' + mode + '&earea=' + location + '&num=' + '4', false, function (returnData) {
				var i;
				var temp = '';

				for (i = 0; i < returnData.length; i += 1) {
					temp += '<li><a onclick="ga("send", "event", "confirm-cars", "click", ' + mode + '-' + (i + 1) + ');"  target="_blank" href="' + returnData[i].url + '"><div class="img">';

	                if(mode == 37) {
	                    temp += '<i class="lexus-fixed"></i>';
	                }

	                if(mode == 40) {
	                    temp += '<i class="porsche-fixed"></i>';
	                }

	                temp += '<img src="' + returnData[i].pic + '" width="100%" /></div><div class="info"><h6 class="tit">'+ returnData[i].title + '</h6><div class="mid"><span class="price">￥<b class="num">'+ returnData[i].price + '</b><b>万</b></span></div><div class="bottom"><span class="time">' + returnData[i].reg_date + '</span><span class="time">' + returnData[i].km + '万公里</span></div></div></a></li>';
	            }
	            
				$('#confirmedCarList').empty().append(temp);

				sessionStorage.setItem(ename, temp);
			}, function () {});
		} else {
			$('#confirmedCarList').empty().append(hasLists);
		}

		// 车源图片图片处理暂行办法
		var timer = setTimeout(function () {
			$("#confirmedCarList li img").each(function (index, ele) {
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
		},300);
	});

	// 搜索框获取以及失去焦点事件.
	$('#searchText').on('focus', function () {
		var that = this;

		if (/msie 8\.0/.test(IautosPC.ua)) {
			ForeignCooperation.IEtimer = setInterval(function () {
				ajaxFunctions.getData('/index.php?a=autocomplete', '&q=' + encodeURIComponent(that.value), false, function(returnData) {
					var i;
					var temp = '';

					for (i = 0; i < returnData.length; i += 1) {
						temp += '<li>' + returnData[i].name + '</li>'	
					}
					
					$('#searchList').empty().append(temp);
				}, function () {});
			}, 150);
		}

		if (that.value) {
			ajaxFunctions.getData('/index.php?a=autocomplete', '&q=' + encodeURIComponent(that.value), false, function(returnData) {
				var i;
				var temp = '';

				for (i = 0; i < returnData.length; i += 1) {
					temp += '<li>' + returnData[i].name + '</li>'	
				}
				
				$('#searchList').empty().append(temp);
			}, function () {});
		} else {
			ajaxFunctions.getData('/index.php?a=autocomplete&q=&_=1480581374345', '', false, function(returnData) {
				var i;
				var temp = '';

				for (i = 0; i < returnData.length; i += 1) {
					temp += '<li>' + returnData[i].name + '</li>'	
				}
				
				$('#searchList').empty().append(temp);
			}, function () {});
		}

		$(that).parent().addClass('active');
		$('#searchList').show();
	}).on('blur', function () {
		var that = this;
		var timer = setTimeout(function () {
			$(that).parent().removeClass('active');
			$('#searchList').hide();
		}, 150);

		if (/msie 8\.0/.test(IautosPC.ua)) {
			clearInterval(ForeignCooperation.IEtimer);
		}
	}).on('input', function () {
		var that = this;
		var timer = setTimeout(function () {
		var text = $(that).val();

		ajaxFunctions.getData('/index.php?a=autocomplete', '&q=' + encodeURIComponent(text), false, function(returnData) {
			var i;
			var temp = '';
			
			for (i = 0; i < returnData.length; i += 1) {
				temp += '<li>' + returnData[i].name + '</li>'
			}
			
			$('#searchList').empty().append(temp);
		}, function () {});
		}, 150);
	});

	// 搜索按钮点击事件.
	$('#searchBtn').on('click', function () {
		window.open('http://so.iautos.cn/' + $('#areaLocation').data('pinyin') + '/?kw=' + encodeURIComponent($('#searchText').val()));
	});

	// 搜索下拉列表点击事件.
	$('#searchList').on('click', 'li', function () {
		var that = this;

		$('#searchText').val($(that).text());

		window.open('http://so.iautos.cn/' + $('#areaLocation').data('pinyin') + '/?kw=' + encodeURIComponent($(that).text()));
	});

	// 搜索下拉列表 keydown 事件.
	$(window).keydown(function(event) {

		if ($('#searchList').css('display') === 'block') {

			if (event.keyCode === 38) {
				if (ForeignCooperation.listCount > 1) {
					ForeignCooperation.listCount -= 1;
				} else {
					ForeignCooperation.listCount = $('#searchList li').length;
				}
				
			}

			if (event.keyCode === 40) {
				if (ForeignCooperation.listCount < $('#searchList li').length - 1) {
					ForeignCooperation.listCount += 1;	
				} else {
					ForeignCooperation.listCount = 0;
				}
				
			}

			if (event.keyCode === 13) {
				window.open('http://so.iautos.cn/' + $('#areaLocation').data('pinyin') + '/?kw=' + ($('#searchList .active').text() ? $('#searchList .active').text() : $('#searchText').val()));
			}

			$('#searchList li').eq(ForeignCooperation.listCount - 1).addClass('active').siblings('li').removeClass('active');
		}
	});

	// Car area event group start.
	$('#carLocation').on('click', function() {
		if ($('#ppAreaSelectBox').css('display') === 'none') {
			$('#ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox').hide();
			$('#ppAreaSelectBox, #ppAreaSelectProvincesBox').show();
		} else {
			$('#ppAreaSelectBox, #ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox').hide();
			$('#ppAreaSelectProvincesBox').show();
		}

	});

	$('#ppAreaSelectBox').parent().on('blur', function() {

		if ($('#ppAreaSelectBox').css('display') === 'block') {
			$('#ppAreaSelectBox, #ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox').hide();
			$('#ppAreaSelectProvincesBox').show();
		}
	});

	$('#ppAreaSelectProvincesBox').on('click', 'li', function() {
		var that = this;
		var i;
		var current;
		var next;

		ForeignCooperation.locationEname = $(that).data('pinyin');

		var hasLists = sessionStorage.getItem(ForeignCooperation.locationEname);

		ForeignCooperation.areaLocationIdSubstitute[0] = that.id;
		ForeignCooperation.areaLocation[0] = $(that).text();

		current = 'Provinces';
		next = 'Cities';

		if (!hasLists) {
			ajaxFunctions.getData(IautosPC.config.address.pp_areaCities, '&city_id=' + that.id, false, function(returnData) {
				if (returnData.status === 1) {
					var temp = '';

					for (city in returnData.data) {
						temp += '<li id="' + returnData.data[city].id + '" data-pinyin ="' + returnData.data[city].earea + '"><span class="c">' + returnData.data[city].area + '</span></li>';
					}

					$('#ppAreaSelect' + next + 'Box .inside-citys-wrap').empty().append(temp);
					sessionStorage.setItem(ForeignCooperation.locationEname, temp);
				} else {

					for (i = 0; i < ForeignCooperation.areaLocationIdSubstitute.length; i += 1) {
						ForeignCooperation.areaLocationId[i] = ForeignCooperation.areaLocationIdSubstitute[i];
					}

					$('#carLocation').text(ForeignCooperation.areaLocation.join(' ').replace(/\s$/, ''));
					$('#ppAreaSelectBox, #ppAreaSelectCitiesBox').hide();
					$('#ppAreaSelectProvincesBox').show();

					if ($('#assessErrorInfo').css('display') === 'block') {
						$('#assessErrorInfo').hide();
					}

					ForeignCooperation.areaLocation.splice(0, ForeignCooperation.areaLocation.length);
				}
			}, function() {});
		} else {
			$('#ppAreaSelect' + next + 'Box .inside-citys-wrap').empty().append(hasLists);
		}

		$('#ppAreaSelect' + current + 'Box').hide();
		$('#ppAreaSelect' + next + 'Box').show();
	});

	$('#ppAreaSelectCitiesBox').on('click', 'li', function() {
		var i;

		ForeignCooperation.areaLocation[1] = $(this).text();
		ForeignCooperation.areaLocationIdSubstitute[1] = this.id;

		for (i = 0; i < ForeignCooperation.areaLocationIdSubstitute.length; i += 1) {
			ForeignCooperation.areaLocationId[i] = ForeignCooperation.areaLocationIdSubstitute[i];
			ForeignCooperation.areaLocationIdSubstitute[i] = '';
		}

		$('#carLocation').text(ForeignCooperation.areaLocation.join(' '));
		$('#ppAreaSelectBox, #ppAreaSelectCitiesBox').hide();
		$('#ppAreaSelectProvincesBox').show();

		if ($('#assessErrorInfo').css('display') === 'block') {
			$('#assessErrorInfo').hide();
		}

		ForeignCooperation.areaLocation.splice(0, ForeignCooperation.areaLocation.length);
	});

	$('#ppAreaSelectBox').on('click', '.return', function() {
		var currentBox = $(this).data('this');
		var previousBox = $(this).data('return');

		$('#' + currentBox).hide();
		$('#' + previousBox).show();
	});
	// Car area event group end.

	// Car series select button click event.
	$('#carSeriesBtn').on('click', function() {
		$('#carSeriesBoxes, #carBrandBox, #alphaLayer').show();
	});

	$('#carBrandLetterBox').on('click', 'li', function() {
		var that = this;
		var hasActive = $(that).hasClass('active');
		var letter = $(that).text();

		if (!hasActive) {
			$(that).addClass('active').siblings('li').removeClass('active');
		}

		$('#carBrandBox .letter-' + letter).show().siblings('.brand-lists').hide();
	});

	$('#carBrandBox').on('click', '.brand-lists-wrap li', function() {
		ajaxFunctions.postData(IautosPC.config.address.pp_getSeries, 'brand_name=' + this.id, false, function(returnData) {
			var i;
			var j;
			var temp = '';
			var i_length = returnData.length;

			for (i = 0; i < i_length; i += 1) {
				var j_length = returnData[i].car_series.length;

				temp += '<li><h4 class="t">' + returnData[i].car_mfrs.iautos_name + '</h4><div class="style-lists-wrap">';

				for (j = 0; j < j_length; j += 1) {
					temp += '<span id="' + returnData[i].car_series[j].id + '" class="n">' + returnData[i].car_series[j].name_show + '</span>';
				}

				temp += '</div></li>';
			}

			$('#carStyleBox .style-lists').empty().append(temp);
			$('#carBrandBox').hide();
			$('#carStyleBox').show();
		}, function() {});

		ForeignCooperation.carSeriesName[0] = $(this).text().trim();
		ForeignCooperation.carSeriesIdSubstitute[0] = this.id;
	});

	$('#carStyleBox').on('click', '.n', function() {
		var that = this;

		ajaxFunctions.postData(IautosPC.config.address.pp_getYears, 'series_id=' + that.id, false, function(returnData) {
			var i;
			var temp = '';
			var i_length = returnData.length;

			for (i = 0; i < i_length; i += 1) {
				temp += '<li id="' + that.id + '" data-sid="' + returnData[i].year + '"><span class="n">' + returnData[i].year + '</span></li>';
			}

			$('#carYearBox .year-lists').empty().append(temp);
			$('#carStyleBox').hide();
			$('#carYearBox').show();
		}, function() {});

		ForeignCooperation.carSeriesName[1] = $(that).text();
		ForeignCooperation.carSeriesIdSubstitute[1] = that.id;
	});

	$('#carYearBox').on('click', 'li', function() {
		var that = this;
		var i;

		ForeignCooperation.purchaseDate = Number($(that).text());

		ajaxFunctions.postData(IautosPC.config.address.pp_getTrims, 'series_id=' + that.id + '&year_id=' + $(that).data('sid'), false, function(returnData) {
			var year;
			var item;
			var tem = '';
			var temp = '';
			var yearArray = [];

			for (year in returnData.model) {
				if (returnData.model.hasOwnProperty(year)) {
					tem += '<li data-year="series' + year + '">' + year + '款</li>';
					temp += '<div class="type-lists-shell series' + year + '"><h3 class="t">' + year + '款</h3><ul class="type-lists-wrap"><li class="line"></li>';

					for (item in returnData.model[year]) {
						temp += '<li id="' + returnData.model[year][item].id + '" data-model="' + returnData.model[year][item].model_id + '" class="i"><span class="n">' + returnData.model[year][item].displacement + ' ' + (returnData.model[year][item].is_turbo === "1" ? 'T' : 'L') + ' ' + returnData.model[year][item].transmission_name + ' ' + returnData.model[year][item].name + '</span><span class="p">￥' + returnData.model[year][item].new_price + '万</span></li>';
					}

					temp += '</ul></div>';
					yearArray.push(year);
				}
			}

			if (yearArray.length === 1) {
				tem = '<li class="active" data-year="series' + year + '">' + year + '款</li>';
			}

			$('#carSeriesYearBox').empty().append(tem);
			$('#carSeriesSeriesBox').empty().append(temp);
			$('#carYearBox').hide();
			$('#carSeriesBox').show();
		}, function() {});

		ForeignCooperation.carSeriesName[2] = $(that).text() + '款';
		ForeignCooperation.carSeriesIdSubstitute[2] = $(that).data('sid');
	});

	$('#carSeriesYearBox').on('click', 'li', function() {
		var year = $(this).data('year');

		$(this).addClass('active').siblings('li').removeClass('active');
		$('#carSeriesSeriesBox').find('.' + year).show().siblings().hide();
	});

	$('#carSeriesSeriesBox').on('click', 'li', function() {
		var i;

		if ($('#carSeriesErrorInfo').parent().css('display') === 'block') {
			$('#carSeriesErrorInfo').parent().hide();
		}

		ForeignCooperation.carSeriesName[3] = $(this).find('.n').text();
		ForeignCooperation.carSeriesIdSubstitute[3] = this.id;
		ForeignCooperation.carSeriesModelId[0] = $(this).data('model');

		for (i = 0; i < ForeignCooperation.carSeriesIdSubstitute.length; i += 1) {
			ForeignCooperation.carSeriesId[i] = ForeignCooperation.carSeriesIdSubstitute[i];
		}

		$('#carSeries').val(ForeignCooperation.carSeriesName.join(' '));
		$('#brandTimeText').text('上牌时间');
		$('#carSeriesBoxes, #carSeriesBox, #alphaLayer').hide();

		if (ForeignCooperation.currentYear - ForeignCooperation.purchaseDate <= 4) {
			for (i = ForeignCooperation.purchaseDate - 1; i <= ForeignCooperation.currentYear; i += 1) {
				ForeignCooperation.registrationYear += '<li><span class="year">' + i + '年</span></li>';
			}
		} else {
			for (i = ForeignCooperation.purchaseDate - 1; i <= ForeignCooperation.purchaseDate + 4; i += 1) {
				ForeignCooperation.registrationYear += '<li><span class="year">' + i + '年</span></li>';
			}
		}

		$('#brandTimeList').empty().html(ForeignCooperation.registrationYear);

		ForeignCooperation.carSeriesName.splice(0, ForeignCooperation.carSeriesName.length);
		ForeignCooperation.registrationYear = '';
	});

	$('#carSeriesBoxes').on('click', '.return-btn', function() {
		var currentBox = $(this).data('this');
		var previousBox = $(this).data('return');

		$('#' + currentBox).hide();
		$('#' + previousBox).show();
	});

	$('#carSeriesBoxes').on('click', '.choose-boxes-close', function() {
		$('#carBrandBox .brand-lists').eq(0).show().siblings('.brand-lists').hide();
		$('#carBrandLetterBox li').eq(0).addClass('active').siblings('li').removeClass('active');
		$('#carSeriesBoxes, #carBrandBox, #carStyleBox, #carYearBox, #carSeriesBox, #alphaLayer').hide();
	});

	// 评估选择框上牌时间.
	$('#brandTimeText').parent().on('click', function () {

		if ($('#brandTimeList').css('display') === 'none') {
			if ($('#brandTimeList').html()) {
				$('#brandTimeList').show();
			}
		} else {
			$('#brandTimeList').hide();
		}
	});

	$('#brandTimeList').on('click', 'li', function () {
		$('#brandTimeText').text($(this).text());
		$('#brandTimeList').hide();

		if ($('#assessErrorInfo').css('display') === 'block') {
			$('#assessErrorInfo').hide();
		}
	});

	$('#mileAge').on('blur', function () {

		if (!/^[0-9]$/.test(this.value) && !/^[1-9][0-9]$/.test(this.value) && !/^100$/.test(this.value)) {

			if (!/行驶里数/.test(this.value)) {
				$('#assessErrorInfo').text('请填写正确的行驶里程').show();
			}
		} else {
			$('#assessErrorInfo').text('').hide();
		}
	});

	// 评估框表单提交.
	$('#assessSubmit').on('click', function() {
		var that = this;
		var i;
		var errorInfo;
		var hasError = $('#assessErrorInfo').css('display');
		var errorHint = $('#assessErrorInfo');

		for (i = 0; i < ForeignCooperation.checkLists.length; i += 1) {

			if (ForeignCooperation.checkLists[i] === 'carSeries') {
				
				if (!checkFunctions.checkInput($('#' + ForeignCooperation.checkLists[i]).val(), $('#' + ForeignCooperation.checkLists[i]).attr('placeholder'))) {
					errorInfo = '请选择车型';
					errorHint.text(errorInfo).show();

					return false;
				}
			} else if (ForeignCooperation.checkLists[i] === 'brandTimeText') {

				if ($('#' + ForeignCooperation.checkLists[i]).text() === '上牌时间') {
					errorInfo = '请选择上牌时间';
					errorHint.text(errorInfo).show();

					return false;
				}
			} else if (ForeignCooperation.checkLists[i] === 'mileAge') {

				if (!/^[0-9]$/.test($('#' + ForeignCooperation.checkLists[i]).val()) && !/^[1-9][0-9]$/.test($('#' + ForeignCooperation.checkLists[i]).val()) && !/^100$/.test($('#' + ForeignCooperation.checkLists[i]).val())) {

					if ($('#' + ForeignCooperation.checkLists[i]).val()) {
						errorInfo = '请填写正确的行驶里程';
					} else {
						errorInfo = '请填写行驶里程';
					}

					errorHint.text(errorInfo).show();

					return false;
				}

				if (hasError === 'block') {

					return false;
				}
			} else if (ForeignCooperation.checkLists[i] === 'carLocation') {

				if (!checkFunctions.checkInput($('#' + ForeignCooperation.checkLists[i]).text(), $('#' + ForeignCooperation.checkLists[i]).attr('placeholder'))) {
					errorInfo = '请选择地区';
					errorHint.text(errorInfo).show();

					return false;
				}
			}
		}

		// 新打开到评估结果页面.
		window.open('/pinggu/' + (ForeignCooperation.locationEname ? ForeignCooperation.locationEname : $('#areaLocation').data('pinyin')) + '/' + ForeignCooperation.carSeriesModelId[0] + '.html?purchase_year=' + ForeignCooperation.purchaseDate + '&distance=' + $('#mileAge').val() + '&fr_time=' + $('#brandTimeText').text().split('年')[0] + (checkFunctions.checkMobile($('#phoneNum').val()) ? '&isphone=1' : ''));

		// 提交评估表单数据到后台.
		if (checkFunctions.checkMobile($('#phoneNum').val())) {
			ForeignCooperation.assessForm = {
				'model_id': ForeignCooperation.carSeriesModelId[0],
	            'phone': $('#phoneNum').val(),
	            'province_cname': ForeignCooperation.areaLocation[0],
	            'province_id': ForeignCooperation.areaLocationIdSubstitute[0],
	            'city_cname': ForeignCooperation.areaLocation[2],
	            'city_id': ForeignCooperation.areaLocationIdSubstitute[2],
	            'area': $('#areaLocation').data('pinyin'),
	            'fr_time': $('#brandTimeText').text().split('年')[0],
	            'distance': $('#mileAge').val(),
	            'purchase_year': ForeignCooperation.purchaseDate,
	            'source': '2345'
			};

			ajaxFunctions.postData('/index.php?c=pinggu&a=ajaxPingguSave', ForeignCooperation.assessForm, false, function() {}, function () {});
		}

		// 提交评估表单GA.
		googleAnalytics.sendGA('expert-ping', '快速评估', ForeignCooperation.carSeriesName.join(' ') + ' ' + ForeignCooperation.areaLocation[2], '');

		$(that).parent().addClass('unsubmit');

		var timer = setTimeout(function() {
			$(that).parent().removeClass('unsubmit');
		}, 3000);
	});

	// 底部 link hover 框切换事件.
	$('.link-nav').on('mouseenter', 'li', function () {
		var list = $(this).data('name');

		$(this).addClass('active').siblings('li').removeClass('active');
		$('.' + list).show().siblings('.link-list').hide();
	});
});

window.onload = function () {
    // 车源图片图片处理暂行办法
    $(".lists li img").each(function (index, ele) {
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