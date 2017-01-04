var PersonalPublich = {};

PersonalPublich.PICUPPERLIMIT = 30;
PersonalPublich.PICLOWERLIMIT = 2;

PersonalPublich.currentYear = new Date().getFullYear();
PersonalPublich.currentMonth = new Date().getMonth();
PersonalPublich.checkLists = ['ppCarLocation', 'ppCarSeries', 'ppBrandYear', 'ppTripDistance', 'ppExpectedPrice', 'ppCarColorLists', 'ppCarPictureList', 'ppOwnerDescription', 'ppPhoneNumber', 'ppCode'];
PersonalPublich.cleanLists = ['ppCarLocation', 'ppCarSeries', 'ppBrandYear'];
PersonalPublich.areaLocation = [];
PersonalPublich.areaLocationId = [];
PersonalPublich.areaLocationIdSubstitute = [];
PersonalPublich.carSeriesId = [];
PersonalPublich.carSeriesIdSubstitute = [];
PersonalPublich.carSeriesModelId = [];
PersonalPublich.carSeriesName = [];
PersonalPublich.uploadImages = [];
PersonalPublich.uploadImagesHash = [];
PersonalPublich.uploadImagesSrc = [];
PersonalPublich.registrationTime = [];
PersonalPublich.registrationYear = '';
PersonalPublich.purchaseDate = '';

$(document).ready(function() {
	var no_car_brand = document.getElementById('noCarBrand');
	var brand_year_text = document.getElementById('ppBrandYear');
	var brand_year_btn = document.getElementById('ppBrandYearBtn');
	var brand_year_lists = document.getElementById('ppBrandYearLists');
	var brand_year_lists_li = brand_year_lists.getElementsByTagName('li');
	var car_location_btn = document.getElementById('ppCarLocationBtn');
	var car_series_btn = document.getElementById('ppCarSeriesBtn');
	var car_series_boxes = document.getElementById('ppCarSeriesBoxes');
	var car_brand_box = document.getElementById('ppCarBrandBox');
	var car_brand_letter_box_li = document.getElementById('ppCarBrandLetterBox').getElementsByTagName('li');
	var car_brand_logo_box_li = document.getElementById('ppCarBrandLogoBox').getElementsByTagName('li');
	var car_style_box = document.getElementById('ppCarStyleBox');
	var car_style_box_span = car_style_box.getElementsByTagName('span');
	var car_year_box = document.getElementById('ppCarYearBox');
	var car_year_box_li = car_year_box.getElementsByTagName('li');
	var car_series_box = document.getElementById('ppCarSeriesBox');
	var car_series_year_li = document.getElementById('ppCarSeriesYearBox').getElementsByTagName('li');
	var car_series_series_li = document.getElementById('ppCarSeriesSeriesBox').getElementsByTagName('li');
	var car_color_lists_li = document.getElementById('ppCarColorLists').getElementsByTagName('li');
	var send_verification_code = document.getElementById('ppSendCodeBtn');
	var resend_verification_code = document.getElementById('ppResendCodeBtn');
	var fast_login_code = document.getElementById('fastLoginCode');

	$('#ppCarBrandBox .brand-lists').eq(0).show();
	$('#ppCarBrandLetterBox li').eq(0).addClass('active');

	for (PersonalPublich.i = 0; PersonalPublich.i < PersonalPublich.cleanLists.length; PersonalPublich.i += 1) {
		$('#' + PersonalPublich.cleanLists[PersonalPublich.i]).val('');
	}

	// upload picture events start.
	$('#ppCarPictureList').on('click', '.status', function () {
		var that = this;
		var loading = $(that).hasClass('loading');

		if (!loading) {
			$(that).addClass('cover').removeClass('setting-cover').html('<i>封面</i>');
			$(that).parent().addClass('cover-pic').siblings('li').removeClass('cover-pic').find('.status').removeClass('cover').empty();
		}
	});

	$('#ppCarPictureList').on('mouseenter', '.status', function () {
		var that = this;
		var isLoading = $(that).hasClass('loading');
		var isCover = $(that).hasClass('cover');

		if (!isLoading) {
			$(that).addClass('moving').siblings('.close').show();
		}

		if (!isLoading && !isCover) {
			$(that).addClass('setting-cover').html('<i>设为封面</i>');
		}
	}).on('mouseleave', '.status', function () {
		var that = this;
		var isCover = $(that).hasClass('cover');

		$(that).removeClass('setting-cover moving');

		if (isCover) {
			$(that).html('<i>封面</i>');
		} else {
			$(that).empty();
		}
	}).on('mouseleave', '.real', function () {
		$(this).find('.close').hide();
	});

	$('#ppCarPictureList').on('click', '.real .close', function () {
		var index = $(this).parent().index();

		uploader.files.splice(index, 1);
		PersonalPublich.uploadImages.splice(index, 1);
		PersonalPublich.uploadImagesHash.splice(index, 1);
		PersonalPublich.uploadImagesSrc.splice(index, 1);

		if ($('#ppCarPictureList .real').length === 0) {
			var i;
			var defaultPic = '';
			var defaultText = ['· 左前', '· 正前', '· 侧面', '· 正后', '· 中控', '· 座椅'];

			for (i = 0; i < 6; i += 1) {
				defaultPic += '<li><div class="image upload-default-' + (i + 1) + '"></div><h6 class="img-name">' + defaultText[i] + '</h6></li>';
			}

			$('#ppUploadPic').html('点击上传车辆实拍照片');
			$('#ppCarPictureList').empty().append(defaultPic);
		} else {
			$('#ppUploadPic .count').text(PersonalPublich.uploadImages.length);

			if ($('#ppCarPictureListErrorInfo').parent().css('display') === 'block' && !$('#ppCarPictureListErrorInfo').text().match(PersonalPublich.PICLOWERLIMIT)) {
				$('#ppCarPictureListErrorInfo').parent().hide();
			}
		}
		
		$(this).parent().remove();
	});

	var uploader = Qiniu.uploader({
		runtimes: 'html5, flash, silverlight, html4', // 上传模式，依次退化
		browse_button: 'ppUploadPic', // 上传选择的点选按钮，必需
		uptoken_url: '/index.php?c=qiniu&a=uptoken', // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
		get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的uptoken
		domain: 'http://qimg.iautos.cn', // bucket域名，下载资源时用到，必需
		container: 'ppCarPictures', // 上传区域DOM ID，默认是browser_button的父元素
		filters: {
			mime_types: [ //只允许上传图片和zip文件
				{
					title: "Image files",
					extensions: "jpg,jpeg,gif,png"
				}
			],
			max_file_size: '8mb', //最大只能上传400kb的文件
			prevent_duplicates: true //不允许选取重复文件
		},
		flash_swf_url: '/static2013/js/plupload/Moxie.swf', //引入flash，相对路径
		silverlight_xap_url: '/static2013/js/plupload/Moxie.xap',
		max_retries: 3, // 上传失败最大重试次数
		dragdrop: true, // 开启可拖曳上传
		drop_element: 'ppCarPictureList', // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
		chunk_size: '4mb', // 分块上传时，每块的体积
		auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
		prevent_duplicates: true,
		init: {
			'FilesAdded': function(up, files) {
				var i;
				var j;
				var temp = '';

				for (i = 0; i < uploader.files.length; i += 1) {
					uploader.files[i].index = Number(i);
					uploader.files[i].ordinal = Number(i) + 1;
				}

				for (j = 0; j < files.length; j += 1) {

					if ((PersonalPublich.uploadImages.length + j) < PersonalPublich.PICUPPERLIMIT) {
						temp += '<li class="real pc"><i class="close" data-index="' + files[j].index + '" style="display:none"></i><div class="status loading">0%</div><div class="image"><img src="" width="100%" /></div></li>';
					} else {
						uploader.files.splice((uploader.files.length - 1), 1);
					}
				}

				if ($('#ppCarPictureList .real').length === 0) {
					$('#ppCarPictureList').empty();
				}

				$('#ppCarPictureList').append(temp);

				if ((PersonalPublich.uploadImages.length + files.length) > PersonalPublich.PICUPPERLIMIT) {
					$('#ppCarPictureListErrorInfo').text('最多上传' + PersonalPublich.PICUPPERLIMIT + '张图片,已为您自动删除多余图片.').parent().show();

					var timer = setTimeout(function () {
						$('#ppCarPictureListErrorInfo').parent().hide();
					}, 3000);
				}
			},
			'BeforeUpload': function(up, file) {
				// 每个文件上传前，处理相关的事情
			},
			'UploadProgress': function(up, file) {
				// 每个文件上传时，处理相关的事情

				$('#ppCarPictureList .pc').eq(file.index).find('.loading').text(file.percent + '%');
			},
			'FileUploaded': function(up, file, info) {
				// 每个文件上传成功后，处理相关的事情
				// 其中info是文件上传成功后，服务端返回的json，形式如：

				var domain = up.getOption('domain');
				var picHash = JSON.parse(info).hash;
				var picSrc = domain + '/' + JSON.parse(info).key;

				if (PersonalPublich.uploadImages.length < PersonalPublich.PICUPPERLIMIT) {
					PersonalPublich.uploadImagesHash.push(picHash);
					PersonalPublich.uploadImagesSrc.push(picSrc);
				}

				PersonalPublich.uploadImages.push(file);

				$('#ppCarPictureList .pc').eq(file.index).find('.status').removeClass('loading').text('');
				$('#ppCarPictureList .pc').eq(file.index).find('img').prop('src', picSrc + '-mudiumpic');
				$('#ppUploadPic').html('已成功添加<i class="count">' + (PersonalPublich.uploadImages.length) + '</i>张照片');

				if ($('#ppCarPictureListErrorInfo').text().match(PersonalPublich.PICLOWERLIMIT)) {

					if ($('#ppCarPictureList .real').length >= PersonalPublich.PICLOWERLIMIT && !$('#ppCarPictureListErrorInfo').text().match(PersonalPublich.PICUPPERLIMIT)) {
						$('#ppCarPictureListErrorInfo').parent().hide();
					}
				} else if (!$('#ppCarPictureListErrorInfo').text().match(PersonalPublich.PICUPPERLIMIT)) {
					$('#ppCarPictureListErrorInfo').parent().hide();
				}

				if (PersonalPublich.uploadImages.length === PersonalPublich.PICUPPERLIMIT) {

					if ($('#ppCarPictureListErrorInfo').text().match(PersonalPublich.PICUPPERLIMIT)) {
						$('#ppCarPictureListErrorInfo').parent().hide();
					}
				}

				if (uploader.total.queued === 1) {
					$("#ppCarPictureList").dragsort({
						dragSelector: ".real",
						dragEnd: function() {},
						dragBetween: false,
						placeHolderTemplate: "<li style='border:1px dashed #cccccc'></li>"
					});
				}
			},
			'Error': function(up, file, err, errTip) {
				//上传出错时，处理相关的事情

				console.log(up);
				console.log(file);
				console.log(file.code);
				console.log(err);
				console.log(errTip);

				if (file.code === -600) {
					$('#ppCarPictureListErrorInfo').text('每张图片最大8M').parent().show();
				} else if (file.code === -602) {
					$('#ppCarPictureListErrorInfo').text('请勿上传重复图片').parent().show();
				}
			}
		}
	});
	// upload picture events end.

	// Car area event group start.
	$('#ppCarLocationBtn').on('click', function() {
		var that = this;

		if ($('#ppAreaSelectBox').css('display') === 'none') {
			$(that).addClass('unfold');
			$('#ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox').hide();
			$('#ppAreaSelectBox, #ppAreaSelectProvincesBox').show();
		} else {
			$(that).removeClass('unfold');
			$('#ppAreaSelectBox, #ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox').hide();
			$('#ppAreaSelectProvincesBox').show();
		}

	});

	$('#ppAreaSelectBox').parent().on('blur', function() {

		if ($('#ppAreaSelectBox').css('display') === 'block') {
			$('#ppAreaSelectBox, #ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox').hide();
			$('#ppAreaSelectProvincesBox').show();
			$('#ppCarLocationBtn').removeClass('unfold');
		}
	});

	$('#ppAreaSelectProvincesBox, #ppAreaSelectCitiesBox').on('click', 'li', function() {
		var that = this;
		var i;
		var current;
		var next;
		var pinyin = $(that).data('pinyin');
		var hasLists = sessionStorage.getItem(pinyin);

		if ($(that).parent().hasClass('provinces')) {
			PersonalPublich.areaLocationIdSubstitute[0] = that.id;
			PersonalPublich.areaLocation[0] = $(that).text();
		} else {
			PersonalPublich.areaLocationIdSubstitute[1] = that.id;
			PersonalPublich.areaLocation[1] = $(that).text();
		}

		if ($(that).parent().hasClass('provinces')) {
			current = 'Provinces';
			next = 'Cities';
		} else {
			current = 'Cities';
			next = 'Counties';
		}

		if (!hasLists) {

			if (that.id === '1' || that.id === '2' || that.id === '3' || that.id === '4') {
				ajaxFunctions.getData(IautosPC.config.address.pp_areaCities, '&city_id=' + (Number(that.id) + 827), false, function(returnData) {

					if (returnData.status === 1) {
						var temp = '';

						for (city in returnData.data) {
							temp += '<li id="' + returnData.data[city].id + '" data-pinyin ="' + returnData.data[city].earea + '"><span class="c">' + returnData.data[city].area + '</span></li>';
						}

						$('#ppAreaSelect' + next + 'Box .inside-citys-wrap').empty().append(temp);
						sessionStorage.setItem(pinyin, temp);
					} else {
						PersonalPublich.areaLocationId[0] = PersonalPublich.areaLocationIdSubstitute[0];

						$('#ppCarLocation').val(PersonalPublich.areaLocation.join(' ').replace(/\s$/, ''));
						$('#ppAreaSelectBox, #ppAreaSelectCitiesBox').hide();
						$('#ppAreaSelectProvincesBox').show();
						$('#ppCarLocationBtn').removeClass('unfold');

						if ($('#ppCarLocationErrorInfo').parent().css('display') === 'block') {
							$('#ppCarLocationErrorInfo').parent().hide();
						}
					}
				}, function(XMLHttpRequest, textStatus, errorThrown) {
					console.log( XMLHttpRequest );
					console.log( textStatus );
					console.log( errorThrown );
				});
			} else {
				ajaxFunctions.getData(IautosPC.config.address.pp_areaCities, '&city_id=' + that.id, false, function(returnData) {

					if (returnData.status === 1) {
						var temp = '';

						for (city in returnData.data) {
							temp += '<li id="' + returnData.data[city].id + '" data-pinyin ="' + returnData.data[city].earea + '"><span class="c">' + returnData.data[city].area + '</span></li>';
						}

						$('#ppAreaSelect' + next + 'Box .inside-citys-wrap').empty().append(temp);
						sessionStorage.setItem(pinyin, temp);
					} else {

						for (i = 0; i < PersonalPublich.areaLocationIdSubstitute.length; i += 1) {
							PersonalPublich.areaLocationId[i] = PersonalPublich.areaLocationIdSubstitute[i];
							PersonalPublich.areaLocationIdSubstitute[i] = '';
						}

						$('#ppCarLocation').val(PersonalPublich.areaLocation.join(' ').replace(/\s$/, ''));
						$('#ppAreaSelectBox, #ppAreaSelectCitiesBox').hide();
						$('#ppAreaSelectProvincesBox').show();
						$('#ppCarLocationBtn').removeClass('unfold');

						if ($('#ppCarLocationErrorInfo').parent().css('display') === 'block') {
							$('#ppCarLocationErrorInfo').parent().hide();
						}

						PersonalPublich.areaLocation.splice(0, PersonalPublich.areaLocation.length);
					}
				}, function() {});
			}
		} else {
			$('#ppAreaSelect' + next + 'Box .inside-citys-wrap').empty().append(hasLists);
		}

		$('#ppAreaSelect' + current + 'Box').hide();
		$('#ppAreaSelect' + next + 'Box').show();
	});

	$('#ppAreaSelectCountiesBox').on('click', 'li', function() {
		var i;

		PersonalPublich.areaLocation[2] = $(this).text();
		PersonalPublich.areaLocationIdSubstitute[2] = this.id;

		for (i = 0; i < PersonalPublich.areaLocationIdSubstitute.length; i += 1) {
			PersonalPublich.areaLocationId[i] = PersonalPublich.areaLocationIdSubstitute[i];
			PersonalPublich.areaLocationIdSubstitute[i] = '';
		}

		$('#ppCarLocation').val(PersonalPublich.areaLocation.join(' '));
		$('#ppAreaSelectBox, #ppAreaSelectCountiesBox').hide();
		$('#ppAreaSelectProvincesBox').show();
		$('#ppCarLocationBtn').removeClass('unfold');

		if ($('#ppCarLocationErrorInfo').parent().css('display') === 'block') {
			$('#ppCarLocationErrorInfo').parent().hide();
		}

		PersonalPublich.areaLocation.splice(0, PersonalPublich.areaLocation.length);
	});

	$('#ppAreaSelectBox').on('click', '.return', function() {
		var currentBox = $(this).data('this');
		var previousBox = $(this).data('return');

		$('#' + currentBox).hide();
		$('#' + previousBox).show();
	});
	// Car area event group end.

	// Car series select button click event.
	$('#ppCarSeriesBtn').on('click', function() {
		$('#ppCarSeriesBoxes, #ppCarBrandBox, #alphaLayer').show();

		if ($('#ppAreaSelectBox').css('display') === 'block') {
			$('#ppAreaSelectBox, #ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox').hide();
			$('#ppAreaSelectProvincesBox').show();
			$('#ppCarLocationBtn').removeClass('unfold');
		}

		if ($('#ppBrandYearLists').css('display') === 'block' || $('#ppBrandMonthLists').css('display') === 'block') {
			$('#ppBrandYearLists, #ppBrandMonthLists').hide();
			$('#ppBrandYearBtn').removeClass('unfold');
		}
	});

	$('#ppCarBrandLetterBox').on('click', 'li', function() {
		var that = this;
		var hasActive = $(that).hasClass('active');
		var letter = $(that).text();

		if (!hasActive) {
			$(that).addClass('active').siblings('li').removeClass('active');
		}

		$('#ppCarBrandBox .letter-' + letter).show().siblings('.brand-lists').hide();
	});

	$('#ppCarBrandBox').on('click', '.brand-lists-wrap li', function() {
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

			$('#ppCarStyleBox .style-lists').empty().append(temp);
			$('#ppCarBrandBox').hide();
			$('#ppCarStyleBox').show();
		}, function() {});

		PersonalPublich.carSeriesName[0] = $(this).text().trim();
		PersonalPublich.carSeriesIdSubstitute[0] = this.id;
	});

	$('#ppCarStyleBox').on('click', '.n', function() {
		var that = this;

		ajaxFunctions.postData(IautosPC.config.address.pp_getYears, 'series_id=' + that.id, false, function(returnData) {
			var i;
			var temp = '';
			var i_length = returnData.length;

			if (i_length === 1) {
				PersonalPublich.purchaseDate = Number(returnData[0].year);

				ajaxFunctions.postData(IautosPC.config.address.pp_getTrims, 'series_id=' + that.id + '&year_id=' + returnData[0].year, false, function(returnData) {
					var j;
					var item;
					var tem = '';
					var temp = '';
					var yearArray = [];

					for (j = 0; j < returnData.year_list.length; j += 1) {
						tem += '<li data-year="series' + returnData.year_list[j] + '">' + returnData.year_list[j] + '款</li>';
						temp += '<div class="type-lists-shell series' + returnData.year_list[j] + '"><h3 class="t">' + returnData.year_list[j] + '款</h3><ul class="type-lists-wrap"><li class="line"></li>';

						for (item in returnData.model[returnData.year_list[j]]) {
							temp += '<li id="' + returnData.model[returnData.year_list[j]][item].id + '" data-model="' + returnData.model[returnData.year_list[j]][item].model_id + '" class="i"><span class="n">' + returnData.model[returnData.year_list[j]][item].displacement + ' ' + (returnData.model[returnData.year_list[j]][item].is_turbo === "1" ? 'T' : 'L') + ' ' + returnData.model[returnData.year_list[j]][item].transmission_name + ' ' + returnData.model[returnData.year_list[j]][item].name + '</span><span class="p">￥' + returnData.model[returnData.year_list[j]][item].new_price + '万</span></li>';
						}

						temp += '</ul></div>';
						yearArray.push(returnData.year_list[j]);
					}
					
					if (yearArray.length === 1) {
						tem = '<li class="active" data-year="series' + returnData.year_list[0] + '">' + returnData.year_list[0] + '款</li>';
					}

					$('#ppCarSeriesYearBox').empty().append(tem);
					$('#ppCarSeriesSeriesBox').empty().append(temp);
					$('#ppCarStyleBox').hide();
					$('#ppCarSeriesBox').show();
				}, function() {});

				PersonalPublich.carSeriesName[2] = returnData[0].year + '款';
				PersonalPublich.carSeriesIdSubstitute[2] = returnData[0].year;
			} else {

				for (i = 0; i < i_length; i += 1) {
					temp += '<li id="' + that.id + '" data-sid="' + returnData[i].year + '"><span class="n">' + returnData[i].year + '</span></li>';
				}

				$('#ppCarYearBox .year-lists').empty().append(temp);
				$('#ppCarStyleBox').hide();
				$('#ppCarYearBox').show();
			}
			
		}, function() {});

		PersonalPublich.carSeriesName[1] = $(that).text();
		PersonalPublich.carSeriesIdSubstitute[1] = that.id;
	});

	$('#ppCarYearBox').on('click', 'li', function() {
		var that = this;

		PersonalPublich.purchaseDate = Number($(that).text());

		ajaxFunctions.postData(IautosPC.config.address.pp_getTrims, 'series_id=' + that.id + '&year_id=' + $(that).data('sid'), false, function(returnData) {
			var i;
			var item;
			var tem = '';
			var temp = '';
			var yearArray = [];

			for (i = 0; i < returnData.year_list.length; i += 1) {
				tem += '<li data-year="series' + returnData.year_list[i] + '">' + returnData.year_list[i] + '款</li>';
				temp += '<div class="type-lists-shell series' + returnData.year_list[i] + '"><h3 class="t">' + returnData.year_list[i] + '款</h3><ul class="type-lists-wrap"><li class="line"></li>';

				for (item in returnData.model[returnData.year_list[i]]) {
					temp += '<li id="' + returnData.model[returnData.year_list[i]][item].id + '" data-model="' + returnData.model[returnData.year_list[i]][item].model_id + '" class="i"><span class="n">' + returnData.model[returnData.year_list[i]][item].displacement + ' ' + (returnData.model[returnData.year_list[i]][item].is_turbo === "1" ? 'T' : 'L') + ' ' + returnData.model[returnData.year_list[i]][item].transmission_name + ' ' + returnData.model[returnData.year_list[i]][item].name + '</span><span class="p">￥' + returnData.model[returnData.year_list[i]][item].new_price + '万</span></li>';
				}

				temp += '</ul></div>';
				yearArray.push(returnData.year_list[i]);
			}

			if (yearArray.length === 1) {
				tem = '<li class="active" data-year="series' + returnData.year_list[0] + '">' + returnData.year_list[0] + '款</li>';
			}

			$('#ppCarSeriesYearBox').empty().append(tem);
			$('#ppCarSeriesSeriesBox').empty().append(temp);
			$('#ppCarYearBox').hide();
			$('#ppCarSeriesBox').show();
		}, function() {});

		PersonalPublich.carSeriesName[2] = $(that).text() + '款';
		PersonalPublich.carSeriesIdSubstitute[2] = $(that).data('sid');
	});

	$('#ppCarSeriesYearBox').on('click', 'li', function() {

		if ($(this).hasClass('active')) {
            return false;
        }

		var year = $(this).data('year');

		$(this).addClass('active').siblings('li').removeClass('active');
		$('#ppCarSeriesSeriesBox').find('.' + year).show().siblings().hide();
	});

	$('#ppCarSeriesSeriesBox').on('click', 'li', function() {
		var i;

		if ($('#ppCarSeriesErrorInfo').parent().css('display') === 'block') {
			$('#ppCarSeriesErrorInfo').parent().hide();
		}

		PersonalPublich.carSeriesName[3] = $(this).find('.n').text();
		PersonalPublich.carSeriesIdSubstitute[3] = this.id;
		PersonalPublich.carSeriesModelId[0] = $(this).data('model');

		for (i = 0; i < PersonalPublich.carSeriesIdSubstitute.length; i += 1) {
			PersonalPublich.carSeriesId[i] = PersonalPublich.carSeriesIdSubstitute[i];
		}

		$('#ppCarSeries').val(PersonalPublich.carSeriesName.join(' '));
		$('#ppBrandYear').val('');
		$('#ppCarSeriesBoxes, #ppCarSeriesBox, #alphaLayer').hide();

		if (PersonalPublich.currentYear - PersonalPublich.purchaseDate <= 4) {
			for (i = PersonalPublich.purchaseDate - 1; i <= PersonalPublich.currentYear; i += 1) {
				PersonalPublich.registrationYear += '<li class="selectable"><span class="year">' + i + '年</span></li>';
			}
		} else {
			for (i = PersonalPublich.purchaseDate - 1; i <= PersonalPublich.purchaseDate + 4; i += 1) {
				PersonalPublich.registrationYear += '<li class="selectable"><span class="year">' + i + '年</span></li>';
			}
		}

		$('#ppBrandYearLists').empty().html(PersonalPublich.registrationYear).siblings('div').removeClass('disabled');
		$('#noCarBrand').removeAttr('disabled checked');

		PersonalPublich.carSeriesName.splice(0, PersonalPublich.carSeriesName.length);
		PersonalPublich.registrationYear = '';
	});

	$('#ppCarSeriesBoxes').on('click', '.return-btn', function() {
		var currentBox = $(this).data('this');
		var previousBox = $(this).data('return');

		$('#' + currentBox).hide();

		if (previousBox === 'ppCarYearBox' && $('#' + previousBox).find('.year-lists li').length === 0) {
			$('#ppCarStyleBox').show();
		} else {
			$('#' + previousBox).show();
		}
	});

	$('#ppCarSeriesBoxes').on('click', '.choose-boxes-close', function() {
		$('#ppCarBrandBox .brand-lists').eq(0).show().siblings('.brand-lists').hide();
		$('#ppCarBrandLetterBox li').eq(0).addClass('active').siblings('li').removeClass('active');
		$('#ppCarSeriesBoxes, #ppCarBrandBox, #ppCarStyleBox, #ppCarYearBox, #ppCarSeriesBox, #alphaLayer').hide();
	});

	$('#ppBrandYearLists').parent().on('blur', function() {

		if ($('#ppBrandYearLists').css('display') === 'block' || $('#ppBrandMonthLists').css('display') === 'block') {
			$('#ppBrandYearLists, #ppBrandMonthLists').hide();
			$('#ppBrandYearBtn').removeClass('unfold');
		}
	});

	$('#ppBrandYearBtn').on('click', function() {

		if (!brand_year_lists.innerHTML) {
			return false;
		}

		var that = this;
		var disabled = $(that).hasClass('disabled');
		var lists_display = brand_year_lists.style.display;

		if (!disabled) {

			if (lists_display === 'none' && $('#ppBrandMonthLists').css('display') === 'none') {
				$('#ppBrandYearLists').show();
				$(that).addClass('unfold');
			} else {
				$('#ppBrandYearLists, #ppBrandMonthLists').hide();
				$(that).removeClass('unfold');
			}
		}
	});

	$('#ppBrandYearLists').on('click', '.selectable', function() {
		PersonalPublich.registrationTime[0] = $(this).text();

		$('#ppBrandYearLists').hide();

		$('#ppBrandMonthLists li').each(function () {
			var that = this;

			if (!$(that).hasClass('selectable')) {
				$(that).addClass('selectable');
			}
		});

		if ($(this).text().match(PersonalPublich.currentYear)) {
			var i;

			for (i = PersonalPublich.currentMonth; i < $('#ppBrandMonthLists li').length; i += 1) {
				$('#ppBrandMonthLists li').eq(i + 1).removeClass('selectable');
			}
		}

		$('#ppBrandMonthLists').show();
	});

	$('#ppBrandMonthLists').on('click', '.selectable', function() {
		var errorHint = $('#ppBrandYearErrorInfo').parent();

		PersonalPublich.registrationTime[1] = $(this).text();

		$('#ppBrandYear').val(PersonalPublich.registrationTime.join(' '));
		$('#ppBrandMonthLists').hide();
		$('#ppBrandYearBtn').removeClass('unfold');

		if (errorHint.css('display') === 'block') {
			errorHint.hide();
		}

		PersonalPublich.registrationTime.splice(0, PersonalPublich.registrationTime.length);
	});

	$('#noCarBrand').on('click', function() {
		var that = this;

		if (that.checked) {
			$(that).parent().addClass('selected');
			$('#ppBrandYearLists').siblings('div').addClass('disabled');

			if (brand_year_text.value) {
				brand_year_text.value = '';
			}

			if ($('#ppBrandYearErrorInfo').parent().css('display') === 'block') {
				$('#ppBrandYearErrorInfo').parent().hide();
			}
		} else {
			$(that).parent().removeClass('selected');

			if (brand_year_lists.innerHTML) {
				$('#ppBrandYearLists').siblings('div').removeClass('disabled');
			}
		}
	});

	// Text inputs box blur event.
	$('#ppTripDistance, #ppExpectedPrice, #ppPhoneNumber, #ppCode').on('blur', function() {
		var that = this;
		var valueRight;
		var errorInfo;

		if (that.id === 'ppTripDistance') {
			valueRight = checkFunctions.checkMile(that.value);
			errorInfo = '请填写正确的行驶里程';
		} else if (that.id === 'ppExpectedPrice') {
			valueRight = checkFunctions.checkPrice(that.value);
			errorInfo = '请填写正确的期望价格';
		} else if (that.id === 'ppPhoneNumber') {
			valueRight = checkFunctions.checkMobile(that.value);
			errorInfo = '请填写正确的联系电话';
		} else {
			$('#' + that.id + 'ErrorInfo').parent().removeClass('success');

			valueRight = checkFunctions.checkCode(that.value);
			errorInfo = '请填写正确的验证码';
		}

		if (!valueRight) {

			if (!that.value) {

				if (that.id === 'ppTripDistance') {
					errorInfo = '请填写行驶里程';
				} else if (that.id === 'ppExpectedPrice') {
					errorInfo = '请填写期望价格';
				} else if (that.id === 'ppPhoneNumber') {
					errorInfo = '请填写联系电话';
				} else {
					$('#' + that.id + 'ErrorInfo').parent().removeClass('success');

					errorInfo = '请填写验证码';
				}
			}

			$('#' + that.id + 'ErrorInfo').text(errorInfo).parent().show();
		} else {

			if ($('#' + that.id + 'ErrorInfo').parent().css('display') === 'block') {
				$('#' + that.id + 'ErrorInfo').parent().hide();
			}
		}
	});

	// Car color select event.
	$('#ppCarColorLists').on('click', 'li', function() {
		var that = this;
		var hasActive = $(that).hasClass('active');
		var hasError = $('#' + $(that).parent().attr('id') + 'ErrorInfo').parent();

		if (!hasActive) {
			$(that).addClass('active').siblings('li').removeClass('active');
		}

		if (hasError.css('display') === 'block') {
			hasError.hide();
		}
	});

	$('#ppOwnerDescription').on('input', function() {
		var that = this;

		$("#ppOwnerDescriptionNum").empty().text(that.value.length);
	}).on('blur', function() {
		var that = this;
		var valueLength = that.value.length;

		if (valueLength > 0 && valueLength < 10) {
			$('#' + that.id + 'ErrorInfo').parent().show();
		} else {
			$('#' + that.id + 'ErrorInfo').parent().hide();
		}
	});

	$('#ppSubmit, #ppSendCodeBtn').on('click', function() {
		var that = this;
		var i;
		var hasValue;
		var hasError;
		var errorOffset;
		var errorHint;
		var errorInfo;

		if (that.id === 'ppSubmit') {
			googleAnalytics.sendGA('信息提交', '个人发车页', '提交');
		}

		for (i = 0; i < PersonalPublich.checkLists.length; i += 1) {
			hasValue = checkFunctions.checkInput($('#' + PersonalPublich.checkLists[i]).val(), $('#' + PersonalPublich.checkLists[i]).attr('placeholder'));
			hasError = $('#' + PersonalPublich.checkLists[i] + 'ErrorInfo').parent().css('display');
			errorOffset = $('#' + PersonalPublich.checkLists[i] + 'ErrorInfo').parent().parent().offset().top;
			errorHint = $('#' + PersonalPublich.checkLists[i] + 'ErrorInfo');

			if (PersonalPublich.checkLists[i] === 'ppBrandYear' && no_car_brand.checked) {
				continue;
			}

			if (PersonalPublich.checkLists[i] === 'ppCarColorLists') {
				var hasActive = $('#ppCarColorLists li').hasClass('active');

				if (!hasActive) {
					errorHint.parent().show();

					$(window).scrollTop(errorOffset / 2);

					return false;
				}

				if (hasError === 'block') {
					$(window).scrollTop(errorOffset / 2);

					return false;
				}
			} else if (PersonalPublich.checkLists[i] === 'ppCarPictureList') {

				if (PersonalPublich.uploadImages.length < PersonalPublich.PICLOWERLIMIT) {
					errorInfo = '最少上传' + PersonalPublich.PICLOWERLIMIT + '张图片';

					if (PersonalPublich.uploadImages.length === 0) {
						errorInfo = '请选择车辆照片';
					}

					errorHint.text(errorInfo).parent().show();

					$(window).scrollTop(errorOffset / 2);

					return false;
				}
			} else if (PersonalPublich.checkLists[i] === 'ppOwnerDescription') {

				if (hasError === 'block') {
					return false;
				}
			} else if (PersonalPublich.checkLists[i] === 'ppCode') {

				if (that.id === 'ppSubmit') {

					if (!hasValue) {
						errorInfo = '请填写验证码';
						errorHint.text(errorInfo).parent().removeClass('success').show();

						return false;
					}

					if (hasError === 'block') {
						return false;
					}
				}
			} else {

				if (!hasValue) {
					$('#' + PersonalPublich.checkLists[i] + 'ErrorInfo').parent().show();

					if (PersonalPublich.checkLists[i] !== 'ppPhoneNumber') {
						$(window).scrollTop(errorOffset / 2);
					}

					return false;
				}

				if (hasError === 'block') {

					if (PersonalPublich.checkLists[i] !== 'ppPhoneNumber') {
						$(window).scrollTop(errorOffset / 2);
					}

					return false;
				}
			}
		}

		if (that.id === 'ppSubmit') {
			var result;
			var areaLocationId = PersonalPublich.areaLocationId;
			var carSeriesId = PersonalPublich.carSeriesId;
			var carSeriesModelId = PersonalPublich.carSeriesModelId;
			var carSeriesName = $('#ppCarSeries').val();
			var registrationTime = $('#ppBrandYear').val();
			var mileage = $('#ppTripDistance').val();
			var expectedPrice = $('#ppExpectedPrice').val();
			var bodyColorId = $('#ppCarColorLists .active').attr('id');
			var photoSrc = PersonalPublich.uploadImagesSrc;
			var photoHash = PersonalPublich.uploadImagesHash;
			var coverPhotoSrc = $('#ppCarPictureList .cover-pic').find('img').prop('src');
			var ownerNote = $('#ppOwnerDescription').val();
			var contactPhone = $('#ppPhoneNumber').val();
			var verificationCode = $('#ppCode').val();

			if (registrationTime) {
				registrationTime = registrationTime.replace(/\D\s/, '').replace(/\D$/, '');

				if (registrationTime.length === 5) {
					registrationTime = registrationTime.replace(/(\d)$/, '-0$1');
				} else {
					registrationTime = registrationTime.replace(/(\d{2})$/, '-$1');
				}
			}

			PersonalPublich.ppForm = {
				areaLocationId: areaLocationId,
				carSeriesId: carSeriesId,
				carSeriesModelId: carSeriesModelId,
				carSeriesName: carSeriesName,
				registrationTime: registrationTime ? registrationTime : '0000',
				mileage: mileage,
				expectedPrice: expectedPrice,
				bodyColorId: bodyColorId,
				photoSrc: photoSrc,
				photoHash: photoHash,
				coverPhotoSrc: coverPhotoSrc ? coverPhotoSrc.split('-smallpic')[0] : $('#ppCarPictureList').eq(0).find('img').prop('src').split('-smallpic')[0],
				ownerNote: ownerNote ? ownerNote : '车主未附言',
				contactPhone: contactPhone,
				verificationCode: verificationCode,
				_jupiter: $('#shop_token').val()
			};

			ajaxFunctions.postData(IautosPC.config.address.pp_sendForm, PersonalPublich.ppForm, false, function(returnData) {

				if (returnData.code === 'BU0001') {
					result = 'Error';

					$('#personalPublish' + result).find('.close').addClass('refresh');
					$('#personalPublish' + result).find('.tip-text').text(returnData.msg);
				} else {

					if (returnData.status === 1) {
						result = 'Success';

						$('#personalPublish' + result).find('.close').addClass('success');
						$('#personalPublishPhone').empty().text($('#ppPhoneNumber').val().replace(/\d{4}(?=\d{4}$)/, '****'));

						googleAnalytics.setGA('set', 'page', '/fast_sendcar_success.html');
					} else if (returnData.status === 0) {

						if (returnData.code === 'BSD004') {
							result = 'Fail';

							googleAnalytics.setGA('set', 'page', '/alreadyBusiness_message.html');
						} else if (returnData.code === 'BSD003') {
							result = 'Full';

							googleAnalytics.setGA('set', 'page', '/alreadyBusiness_message.html');
						} else {
							result = 'Error';

							$('#personalPublish' + result).find('.tip-text').text(returnData.msg);

							googleAnalytics.setGA('set', 'page', '/fast_sendcar_error/' + returnData.msg + '.html');
						}
					}
				}

				$(that).parent().addClass('unsubmit');

				var timer = setTimeout(function() {
					$(that).parent().removeClass('unsubmit');
				}, 3000);

				$('#personalPublish' + result + ',#alphaLayer').show();
			}, function() {});
		} else {
			ajaxFunctions.postData(IautosPC.config.address.pp_sendCode, 'mobile=' + $('#ppPhoneNumber').val() + '&_jupiter=' + $('#shop_token').val(), false, function(returnData) {
				var result;

				if (returnData.code === 'BU0001') {
					result = 'Error';

					$('#personalPublish' + result).find('.close').addClass('refresh');
					$('#personalPublish' + result).find('.tip-text').text(returnData.msg);
					$('#personalPublish' + result + ',#alphaLayer').show();
				} else {

					if (returnData.status === 1) {
						PersonalPublich.count = 58;

						$(that).hide();
						$('#ppResendCodeBtn').show();

						var timer = setInterval(function() {

							if (PersonalPublich.count === 0 || PersonalPublich.count === '0') {
								clearInterval(timer);
								$(that).show();
								$('#ppResendCodeBtn').hide();
								resend_verification_code.value = '重发（59）';
								return false;
							}

							if (PersonalPublich.count < 10) {
								PersonalPublich.count = '0' + PersonalPublich.count;
							}

							resend_verification_code.value = '重发（' + PersonalPublich.count + '）';
							PersonalPublich.count -= 1;
						}, 1000);

						$('#ppCodeErrorInfo').text('验证码发送成功!').parent().addClass('success').show();

						var successTimer = setTimeout(function () {
							$('#ppCodeErrorInfo').parent().removeClass('success').hide();
						}, 3000);
					} else if (returnData.status === 0) {

						if (returnData.code === 'BSD004') {
							result = 'Fail';

							googleAnalytics.setGA('set', 'page', '/alreadyBusiness_message.html');
						} else if (returnData.code === 'BSD003') {
							result = 'Full';

							googleAnalytics.setGA('set', 'page', '/alreadyBusiness_message.html');
						} else {
							result = 'Error';

							$('#personalPublish' + result).find('.tip-text').text(returnData.msg);

							googleAnalytics.setGA('set', 'page', '/fast_sendcar_error/' + returnData.msg + '.html');
						}

						$('#personalPublish' + result + ',#alphaLayer').show();
					}
				}

				$(that).parent().addClass('unclick');

				var timer = setTimeout(function() {
					$(that).parent().removeClass('unclick');
				}, 3000);
			}, function() {});
		}
	});

	// 个人发车表单提交成功后返回信息框关闭按钮.
	$('[id*=personalPublish]').on('click', '.close', function() {
		var parent = $(this).data('parent');

		if ($(this).hasClass('refresh')) {
			window.location.reload(true);
		} else if ($(this).hasClass('success')) {
			window.location.href = '/home/usedcar/manage/';
		} else {
			$('#' + parent + ', #alphaLayer').hide();
		}

		if (parent === 'personalPublishSuccess') {
			googleAnalytics.sendGA('成功发布更多按钮', '个人发车页', '查看和管理车源');
		}
	});

	// 去个人管理中心管理库存.
	$('#personalPublishFullLogin').on('click', function () {
		$('#personalPublishFull').hide();
		$('#personalLoginBox').show();
	});

	// 同步并展示M端页面上传的图片.
	PersonalPublich.timer = setInterval(function () {
		ajaxFunctions.getData(IautosPC.config.address.pp_getPicFromMobile, '?pic_key=' + $('#ppParameterFromMobile').val(), false, function(returnData) {

			if (returnData.status === 1) {
				var i;
				var temp = '';
				var maxWu = Math.round(Math.random() * 1000000000);

				if (PersonalPublich.uploadImages.length === 0) {
					$('#ppCarPictureList').empty();
				}

				if (PersonalPublich.uploadImages.length + returnData.data.length <= PersonalPublich.PICUPPERLIMIT) {

					for (i = 0; i < returnData.data.length; i += 1) {
						temp += '<li class="real"><i class="close" data-index="" style="display:none"></i><span class="status"></span><div class="image"><img src="' + returnData.data[i][0] + '-mudiumpic" width="100%" /></div></li>';

						PersonalPublich.uploadImages.push(i);
						PersonalPublich.uploadImagesHash.push(returnData.data[i][1]);
						PersonalPublich.uploadImagesSrc.push(returnData.data[i][0]);
					}

					$('#ppUploadPic').html('已成功添加<i class="count">' + (PersonalPublich.uploadImages.length) + '</i>张照片');
					$('#ppCarPictureList').append(temp);
				} else {

					if (PersonalPublich.uploadImages.length < PersonalPublich.PICUPPERLIMIT) {
						var enableNumber = PersonalPublich.PICUPPERLIMIT - PersonalPublich.uploadImages.length;

						for (i = 0; i < enableNumber; i += 1) {

							temp += '<li class="real"><i class="close" data-index="" style="display:none"></i><span class="status"></span><div class="image"><img src="' + returnData.data[i][0] + '-mudiumpic" width="100%" /></div></li>';

							PersonalPublich.uploadImages.push(i);
							PersonalPublich.uploadImagesHash.push(returnData.data[i][1]);
							PersonalPublich.uploadImagesSrc.push(returnData.data[i][0]);
						}

						$('#ppUploadPic').html('已成功添加<i class="count">' + PersonalPublich.PICUPPERLIMIT + '</i>张照片');
						$('#ppCarPictureList').append(temp);
					}

					$('#ppCarPictureListErrorInfo').text('最多上传' + PersonalPublich.PICUPPERLIMIT + '张图片,已为您自动删除多余图片.').parent().show();

					var timer = setTimeout(function () {
						$('#ppCarPictureListErrorInfo').parent().hide();
					}, 3000);
				}

				$('#qrCodeImg').prop('src', $('#qrCodeImg').prop('src') + '&maxwu=' + maxWu);

				$("#ppCarPictureList").dragsort({
					dragSelector: ".real",
					dragEnd: function() {},
					dragBetween: false,
					placeHolderTemplate: "<li style='border:1px dashed #cccccc'></li>"
				});
			}
		}, function () {});
	}, 6000);

	// Google Analytics for tooltips button.
	$('[id*=personalPublish]').on('click', 'a', function() {
		var boxId = $(this).parents('.tooltip').prop('id');

		if (boxId.match('Success')) {
			googleAnalytics.sendGA('成功发布更多按钮', '个人发车页', '查看和管理车源');
		} else if (boxId.match('Fail')) {
			googleAnalytics.sendGA('已是商户提示按钮', '个人发车页', '登录发车');
		} else if (boxId.match('Full')) {
			googleAnalytics.sendGA('库存已满页面个人中心按钮', '个人发车页', '去个人管理中心管理库存');
		}
	});
});