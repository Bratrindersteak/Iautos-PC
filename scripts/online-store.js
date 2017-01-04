var OnlineStore = {};

$(document).ready(function () {

	// 关于我们轮播图插件初始化.
	if ($('.os-about-us').length > 0) {

		// 关于我们轮播图插件初始化.
		if ($('.os-about-us .swiper-slide').length > 1) {
			$('.swiper-container').append('<i id="paginationPrev" class="pagination-prev"></i><i id="paginationNext" class="pagination-next"></i>');

			var mySwiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay: 3000,
				speed: 800,
				preloadImages: true,
				autoplayDisableOnInteraction: false
			});

			$('#paginationPrev, #paginationNext').on('click', function() {
				var that = this;

				if (that.id === 'paginationPrev') {
					mySwiper.swipePrev();
				} else {
					mySwiper.swipeNext();
				}
			});
		}

		// 关于我们地图插件初始化.
		if ($('#mapContainer').length > 0) {
			OnlineStore.latitude = $('#latitude').val() ? Number($('#latitude').val()) : 0;
			OnlineStore.longitude = $('#longitude').val() ? Number($('#longitude').val()) : 0;

			var map = new BMap.Map("mapContainer");
			var point = new BMap.Point(OnlineStore.longitude, OnlineStore.latitude);
			var marker = new BMap.Marker(point);

			map.centerAndZoom(point, 15);
			map.addOverlay(marker);
			map.addEventListener('dragend', function() {
				setTimeout(function() {
					map.panTo(point);
				}, 3000);
			});
			map.addEventListener('click', function() {
				window.open('http://api.map.baidu.com/geocoder?location=' + OnlineStore.latitude + ',' + OnlineStore.longitude + '&coord_type=gcj02&output=html');
			});
		}
	}

	$('.brand-lists').eq(0).show();
	$('.letter-lists li').eq(0).addClass('active');

	$('#osMoreBrandBtn, #osMoreseriesBtn').on('click', function () {
		var that = this;

		if ($(that).siblings('.more-item-lists').css('display') === 'none') {
			$(that).addClass('unfold').siblings('.more-item-lists').show();
		} else {
			$(that).removeClass('unfold').siblings('.more-item-lists').hide();
		}
	});

	$('.letter-lists').on('mouseenter', 'li', function () {
		var index = $(this).index();

		$(this).addClass('active').siblings('li').removeClass('active');
		$('.brand-lists').eq(index).show().siblings('.brand-lists').hide();
	});

	$('.more-item-wrapper').on('blur', function () {
		var that = this;
		var timer = setTimeout(function () {
			$(that).find('.more-item').removeClass('unfold');
			$(that).find('.more-item-lists').hide();
		}, 150);
	});

	// 隐藏选择框事件.
	$('.online-store').on('click', '.select', function() {
		var that = this;

		if ($(that).siblings('.selest-lists').css('display') === 'none') {
			$(that).parent().addClass('selected');
			$(that).addClass('unfold').siblings('.selest-lists').show();
		} else {
			$(that).parent().removeClass('selected');
			$(that).removeClass('unfold').siblings('.selest-lists').hide();
		}
	});

	$('.select-wrapper').on('blur', function() {
		var that = this;
		var timer = setTimeout(function () {
			$(that).removeClass('selected');
			$(that).find('.selest-lists').hide();
			$(that).find('.select').removeClass('unfold');
		}, 150);
	});

	$('.online-store').on('click', '.selest-lists li', function() {
		var that = this;
		var selectValue = $(that).text();
		
		$(that).parents('.select-wrapper').addClass('selected');
		$(that).parent().siblings('.select').addClass('unfold').text(selectValue);
	});

	// 价格输入框事件.
	if (/[0-9]{1,4}/.test($('#osStartPrice').val()) || /[0-9]{1,4}/.test($('#osEndPrice').val())) {
		$('#osPriceBtn').parent().removeClass('disabled');
	}

	$('#osStartPrice, #osEndPrice').on('input', function () {
		var broVal = '';

		this.value = this.value.replace(/[^0-9]/, '');

		if (this.id === 'osStartPrice') {
			broVal = $('#osStartPrice').val();
		} else {
			broVal = $('#osEndPrice').val();
		}

		if (/[0-9]{1,4}/.test(this.value) && /[0-9]{1,4}/.test(broVal)) {
			$('#osPriceBtn').parent().removeClass('disabled');
		} else {
			$('#osPriceBtn').parent().addClass('disabled');
		}
	});

	$('#osPriceBtn').on('click', function () {
		var startPrice = $('#osStartPrice').val() ? $('#osStartPrice').val() : 0;
		var endPrice = $('#osEndPrice').val() ? $('#osEndPrice').val() : 0;

		if (/price=/.test(window.location.href)) {
			window.location.href = window.location.href.split('price=')[0] + 'price=' + startPrice + '_' + endPrice;
		} else {
			window.location.href += (/html$/.test(window.location.href) ? '?' : '&') + 'price=' + startPrice + '_' + endPrice;
		}
	});

	$(window).keydown(function(event) {

		if (event.keyCode === 13 && !$('#osPriceBtn').parent().hasClass('disabled')) {
			var startPrice = $('#osStartPrice').val() ? $('#osStartPrice').val() : 0;
			var endPrice = $('#osEndPrice').val() ? $('#osEndPrice').val() : 0;

			window.location.href += (/html$/.test(window.location.href) ? '?' : '&') + 'price=' + startPrice + '_' + endPrice;
		}
	});

	// 电话线索提交.
	$('#osPhoneSubmit').on('click', function () {
		var that = this;
		
		if (!checkFunctions.checkMobile($('#osPhoneText').val())) {
			$('#osPhoneFail').find('span').text('请输入正确的手机号码');
			$('#osPhoneFail').show();

			var timer = setTimeout(function () {
				$('#osPhoneFail').hide();
			}, 3000);

			googleAnalytics.sendGA('我们帮您找', '网店买车页', '提交确定', '0');

			return false;
		}

		ajaxFunctions.postData(IautosPC.config.address.os_phone, 'shop_id=' + $("#shopId").val() + '&area_id=' + $("#area_id").val() + '&type_id=' + $("#typeid").val() + '&referurl_position=' + $("#referurl_position").val() + '&contact_phone=' + $("#osPhoneText").val(), false, function (returnData) {
			$(that).parent().addClass('unclick');

			if (returnData.type === 1) {
				$('#osPhoneSussess').show();

				googleAnalytics.sendGA('我们帮您找', '网店买车页', '提交确定', '1');
			} else {
				$('#osPhoneFail').find('span').text(returnData.msg);
				$('#osPhoneFail').show();

				googleAnalytics.sendGA('我们帮您找', '网店买车页', '提交确定', '0');
			}

			var timer = setTimeout(function () {
				$('.os-hint-box').hide();
				$(that).parent().removeClass('unclick');
			}, 3000);
		}, function () {});
	});
});