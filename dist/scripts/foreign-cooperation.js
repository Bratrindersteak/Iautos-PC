var ForeignCooperation={};ForeignCooperation.currentYear=(new Date).getFullYear(),ForeignCooperation.areaLetter=["a","b","c","f","g","h","j","l","n","q","s","t","x","y","z"],ForeignCooperation.checkLists=["carSeries","brandTimeText","mileAge","carLocation"],ForeignCooperation.cleanLists=["carLocation","carSeries"],ForeignCooperation.areaLocation=[],ForeignCooperation.areaLocationId=[],ForeignCooperation.areaLocationIdSubstitute=[],ForeignCooperation.carSeriesId=[],ForeignCooperation.carSeriesIdSubstitute=[],ForeignCooperation.carSeriesModelId=[],ForeignCooperation.carSeriesName=[],ForeignCooperation.registrationYear="",ForeignCooperation.purchaseDate="",ForeignCooperation.listCount=0,ForeignCooperation.i,ForeignCooperation.j,ForeignCooperation.k,$(document).ready(function(){new Swiper(".swiper-container",{loop:!0,autoplay:3e3,autoplayDisableOnInteraction:!1,pagination:".swiper-pagination",paginationClickable:!0});$("img.lazy").lazyload({effect:"fadeIn",threshold:200});var e=$("#factoryId").val();for($(".confirm-cars [data-mode="+e+"]").addClass("active"),ForeignCooperation.i=0;ForeignCooperation.i<ForeignCooperation.areaLetter.length;ForeignCooperation.i+=1)for(ForeignCooperation.j=1;ForeignCooperation.j<$("[data-letter=province-"+ForeignCooperation.areaLetter[ForeignCooperation.i]+"]").length;ForeignCooperation.j+=1)$("[data-letter=province-"+ForeignCooperation.areaLetter[ForeignCooperation.i]+"]").eq(ForeignCooperation.j).find(".province-letter").remove();for($("#carBrandBox .brand-lists").eq(0).show(),$("#carBrandLetterBox li").eq(0).addClass("active"),ForeignCooperation.k=0;ForeignCooperation.k<ForeignCooperation.cleanLists.length;ForeignCooperation.k+=1)$("#"+ForeignCooperation.cleanLists[ForeignCooperation.k]).val("");"placeholder"in document.createElement("input")||$("[placeholder]").focus(function(){var e=$(this);e.val()===e.attr("placeholder")&&(e.val(""),e.removeClass("placeholder"))}).blur(function(){var e=$(this);""!==e.val()&&e.val()!==e.attr("placeholder")||(e.addClass("placeholder"),e.val(e.attr("placeholder")))}).blur(),$("a").on("focus",function(){this.blur()}),$("#areaChangeBtn").hover(function(){$(this).addClass("act"),$("#areaBox, #areaLink").show()},function(){$(this).removeClass("act"),$("#areaBox, #areaLink").hide()}),$("#areaLetterList").on("click","li",function(){var e=$(this).data("letter");$(this).addClass("active").siblings("li").removeClass("active"),"all"===e?$(".normal-cities").show():($(".normal-cities").hide(),$("[data-letter=province-"+e+"]").show())}),$("#areaCloseBtn").on("click",function(){$("#areaBox, #areaLink").hide()}),$("#newsList").on("mouseenter","li",function(){var e=$(this).data("src"),o=$(this).find("a").prop("href");$("#newsImage").find("img").prop("src",e),$("#newsImage").find("a").prop("href",o)}),$("#goodCarNav").on("mouseenter","li",function(){var e=this,o=$(e).data("mode"),i=$("#areaLocation").data("pinyin")+"-"+$(e).data("ename"),a=sessionStorage.getItem(i);$(e).addClass("active").siblings("li").removeClass("active"),a?$("#goodCarList").empty().append(a):ajaxFunctions.getData("/index.php?a=ajax_good_car","&mode="+o,!1,function(e){var a,t="";for(a=0;a<e.length;a+=1)t+='<li><a onclick="ga("send", "event", "good-cars", "click", '+o+" - "+(a+1)+');" href="'+e[a].url+'"target="_blank"><div class="img"><img src="'+e[a].pic+'"width="100%"/></div><div class="info"><h6 class="tit">'+e[a].title_s+'</h6><div class="mid"><span class="price">￥<b class="num">'+e[a].price+'</b><b>万</b></span></div><div class="bottom"> <span class="time">'+e[a].reg_date+'</span><span class="time">'+e[a].km+"万公里</span></div></div></a></li>";$("#goodCarList").empty().append(t),sessionStorage.setItem(i,t)},function(){});setTimeout(function(){$("#goodCarList li img").each(function(e,o){var i=this,a=i.height,t=$(i).parent().height();a>t?$(i).css({position:"absolute",top:"50%","margin-top":"-"+a/2+"px"}):a<t&&$(i).removeAttr("width").attr("height","100%").css({position:"absolute",left:"50%","margin-left":"-"+i.width/2+"px"})})},300)}),$(".brand-ico").on("mouseenter","li",function(){var e=this,o=$(e).data("mode"),i=$("#areaLocation").data("pinyin")+"-"+$(e).data("pinyin"),a=$("#areaLocation").data("pinyin"),t=sessionStorage.getItem(i);$(".brand-ico li").removeClass("active active-bro"),$(this).addClass("active").siblings("li").addClass("active-bro"),t?$("#confirmedCarList").empty().append(t):ajaxFunctions.getData("/index.php?a=ajax","&mode="+o+"&earea="+a+"&num=4",!1,function(e){var a,t="";for(a=0;a<e.length;a+=1)t+='<li><a onclick="ga("send", "event", "confirm-cars", "click", '+o+"-"+(a+1)+');"  target="_blank" href="'+e[a].url+'"><div class="img">',37==o&&(t+='<i class="lexus-fixed"></i>'),40==o&&(t+='<i class="porsche-fixed"></i>'),t+='<img src="'+e[a].pic+'" width="100%" /></div><div class="info"><h6 class="tit">'+e[a].title+'</h6><div class="mid"><span class="price">￥<b class="num">'+e[a].price+'</b><b>万</b></span></div><div class="bottom"><span class="time">'+e[a].reg_date+'</span><span class="time">'+e[a].km+"万公里</span></div></div></a></li>";$("#confirmedCarList").empty().append(t),sessionStorage.setItem(i,t)},function(){});setTimeout(function(){$("#confirmedCarList li img").each(function(e,o){var i=this,a=i.height,t=$(i).parent().height();a>t?$(i).css({position:"absolute",top:"50%","margin-top":"-"+a/2+"px"}):a<t&&$(i).removeAttr("width").attr("height","100%").css({position:"absolute",left:"50%","margin-left":"-"+i.width/2+"px"})})},300)}),$("#searchText").on("focus",function(){var e=this;/msie 8\.0/.test(IautosPC.ua)&&(ForeignCooperation.IEtimer=setInterval(function(){ajaxFunctions.getData("/index.php?a=autocomplete","&q="+encodeURIComponent(e.value),!1,function(e){var o,i="";for(o=0;o<e.length;o+=1)i+="<li>"+e[o].name+"</li>";$("#searchList").empty().append(i)},function(){})},150)),e.value?ajaxFunctions.getData("/index.php?a=autocomplete","&q="+encodeURIComponent(e.value),!1,function(e){var o,i="";for(o=0;o<e.length;o+=1)i+="<li>"+e[o].name+"</li>";$("#searchList").empty().append(i)},function(){}):ajaxFunctions.getData("/index.php?a=autocomplete&q=&_=1480581374345","",!1,function(e){var o,i="";for(o=0;o<e.length;o+=1)i+="<li>"+e[o].name+"</li>";$("#searchList").empty().append(i)},function(){}),$(e).parent().addClass("active"),$("#searchList").show()}).on("blur",function(){var e=this;setTimeout(function(){$(e).parent().removeClass("active"),$("#searchList").hide()},150);/msie 8\.0/.test(IautosPC.ua)&&clearInterval(ForeignCooperation.IEtimer)}).on("input",function(){var e=this;setTimeout(function(){var o=$(e).val();ajaxFunctions.getData("/index.php?a=autocomplete","&q="+encodeURIComponent(o),!1,function(e){var o,i="";for(o=0;o<e.length;o+=1)i+="<li>"+e[o].name+"</li>";$("#searchList").empty().append(i)},function(){})},150)}),$("#searchBtn").on("click",function(){window.open("http://so.iautos.cn/"+$("#areaLocation").data("pinyin")+"/?kw="+encodeURIComponent($("#searchText").val()))}),$("#searchList").on("click","li",function(){var e=this;$("#searchText").val($(e).text()),window.open("http://so.iautos.cn/"+$("#areaLocation").data("pinyin")+"/?kw="+encodeURIComponent($(e).text()))}),$(window).keydown(function(e){"block"===$("#searchList").css("display")&&(38===e.keyCode&&(ForeignCooperation.listCount>1?ForeignCooperation.listCount-=1:ForeignCooperation.listCount=$("#searchList li").length),40===e.keyCode&&(ForeignCooperation.listCount<$("#searchList li").length-1?ForeignCooperation.listCount+=1:ForeignCooperation.listCount=0),13===e.keyCode&&window.open("http://so.iautos.cn/"+$("#areaLocation").data("pinyin")+"/?kw="+($("#searchList .active").text()?$("#searchList .active").text():$("#searchText").val())),$("#searchList li").eq(ForeignCooperation.listCount-1).addClass("active").siblings("li").removeClass("active"))}),$("#carLocation").on("click",function(){"none"===$("#ppAreaSelectBox").css("display")?($("#ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox").hide(),$("#ppAreaSelectBox, #ppAreaSelectProvincesBox").show()):($("#ppAreaSelectBox, #ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox").hide(),$("#ppAreaSelectProvincesBox").show())}),$("#ppAreaSelectBox").parent().on("blur",function(){"block"===$("#ppAreaSelectBox").css("display")&&($("#ppAreaSelectBox, #ppAreaSelectCitiesBox, #ppAreaSelectCountiesBox").hide(),$("#ppAreaSelectProvincesBox").show())}),$("#ppAreaSelectProvincesBox").on("click","li",function(){var e,o,i,a=this;ForeignCooperation.locationEname=$(a).data("pinyin");var t=sessionStorage.getItem(ForeignCooperation.locationEname);ForeignCooperation.areaLocationIdSubstitute[0]=a.id,ForeignCooperation.areaLocation[0]=$(a).text(),o="Provinces",i="Cities",t?$("#ppAreaSelect"+i+"Box .inside-citys-wrap").empty().append(t):ajaxFunctions.getData(IautosPC.config.address.pp_areaCities,"&city_id="+a.id,!1,function(o){if(1===o.status){var a="";for(city in o.data)a+='<li id="'+o.data[city].id+'" data-pinyin ="'+o.data[city].earea+'"><span class="c">'+o.data[city].area+"</span></li>";$("#ppAreaSelect"+i+"Box .inside-citys-wrap").empty().append(a),sessionStorage.setItem(ForeignCooperation.locationEname,a)}else{for(e=0;e<ForeignCooperation.areaLocationIdSubstitute.length;e+=1)ForeignCooperation.areaLocationId[e]=ForeignCooperation.areaLocationIdSubstitute[e];$("#carLocation").text(ForeignCooperation.areaLocation.join(" ").replace(/\s$/,"")),$("#ppAreaSelectBox, #ppAreaSelectCitiesBox").hide(),$("#ppAreaSelectProvincesBox").show(),"block"===$("#assessErrorInfo").css("display")&&$("#assessErrorInfo").hide(),ForeignCooperation.areaLocation.splice(0,ForeignCooperation.areaLocation.length)}},function(){}),$("#ppAreaSelect"+o+"Box").hide(),$("#ppAreaSelect"+i+"Box").show()}),$("#ppAreaSelectCitiesBox").on("click","li",function(){var e;for(ForeignCooperation.areaLocation[1]=$(this).text(),ForeignCooperation.areaLocationIdSubstitute[1]=this.id,e=0;e<ForeignCooperation.areaLocationIdSubstitute.length;e+=1)ForeignCooperation.areaLocationId[e]=ForeignCooperation.areaLocationIdSubstitute[e],ForeignCooperation.areaLocationIdSubstitute[e]="";$("#carLocation").text(ForeignCooperation.areaLocation.join(" ")),$("#ppAreaSelectBox, #ppAreaSelectCitiesBox").hide(),$("#ppAreaSelectProvincesBox").show(),"block"===$("#assessErrorInfo").css("display")&&$("#assessErrorInfo").hide(),ForeignCooperation.areaLocation.splice(0,ForeignCooperation.areaLocation.length)}),$("#ppAreaSelectBox").on("click",".return",function(){var e=$(this).data("this"),o=$(this).data("return");$("#"+e).hide(),$("#"+o).show()}),$("#carSeriesBtn").on("click",function(){$("#carSeriesBoxes, #carBrandBox, #alphaLayer").show()}),$("#carBrandLetterBox").on("click","li",function(){var e=this,o=$(e).hasClass("active"),i=$(e).text();o||$(e).addClass("active").siblings("li").removeClass("active"),$("#carBrandBox .letter-"+i).show().siblings(".brand-lists").hide()}),$("#carBrandBox").on("click",".brand-lists-wrap li",function(){ajaxFunctions.postData(IautosPC.config.address.pp_getSeries,"brand_name="+this.id,!1,function(e){var o,i,a="",t=e.length;for(o=0;o<t;o+=1){var n=e[o].car_series.length;for(a+='<li><h4 class="t">'+e[o].car_mfrs.iautos_name+'</h4><div class="style-lists-wrap">',i=0;i<n;i+=1)a+='<span id="'+e[o].car_series[i].id+'" class="n">'+e[o].car_series[i].name_show+"</span>";a+="</div></li>"}$("#carStyleBox .style-lists").empty().append(a),$("#carBrandBox").hide(),$("#carStyleBox").show()},function(){}),ForeignCooperation.carSeriesName[0]=$(this).text().trim(),ForeignCooperation.carSeriesIdSubstitute[0]=this.id}),$("#carStyleBox").on("click",".n",function(){var e=this;ajaxFunctions.postData(IautosPC.config.address.pp_getYears,"series_id="+e.id,!1,function(o){var i,a="",t=o.length;for(i=0;i<t;i+=1)a+='<li id="'+e.id+'" data-sid="'+o[i].year+'"><span class="n">'+o[i].year+"</span></li>";$("#carYearBox .year-lists").empty().append(a),$("#carStyleBox").hide(),$("#carYearBox").show()},function(){}),ForeignCooperation.carSeriesName[1]=$(e).text(),ForeignCooperation.carSeriesIdSubstitute[1]=e.id}),$("#carYearBox").on("click","li",function(){var e=this;ForeignCooperation.purchaseDate=Number($(e).text()),ajaxFunctions.postData(IautosPC.config.address.pp_getTrims,"series_id="+e.id+"&year_id="+$(e).data("sid"),!1,function(e){var o,i,a="",t="",n=[];for(o in e.model)if(e.model.hasOwnProperty(o)){a+='<li data-year="series'+o+'">'+o+"款</li>",t+='<div class="type-lists-shell series'+o+'"><h3 class="t">'+o+'款</h3><ul class="type-lists-wrap"><li class="line"></li>';for(i in e.model[o])t+='<li id="'+e.model[o][i].id+'" data-model="'+e.model[o][i].model_id+'" class="i"><span class="n">'+e.model[o][i].displacement+" "+("1"===e.model[o][i].is_turbo?"T":"L")+" "+e.model[o][i].transmission_name+" "+e.model[o][i].name+'</span><span class="p">￥'+e.model[o][i].new_price+"万</span></li>";t+="</ul></div>",n.push(o)}1===n.length&&(a='<li class="active" data-year="series'+o+'">'+o+"款</li>"),$("#carSeriesYearBox").empty().append(a),$("#carSeriesSeriesBox").empty().append(t),$("#carYearBox").hide(),$("#carSeriesBox").show()},function(){}),ForeignCooperation.carSeriesName[2]=$(e).text()+"款",ForeignCooperation.carSeriesIdSubstitute[2]=$(e).data("sid")}),$("#carSeriesYearBox").on("click","li",function(){var e=$(this).data("year");$(this).addClass("active").siblings("li").removeClass("active"),$("#carSeriesSeriesBox").find("."+e).show().siblings().hide()}),$("#carSeriesSeriesBox").on("click","li",function(){var e;for("block"===$("#carSeriesErrorInfo").parent().css("display")&&$("#carSeriesErrorInfo").parent().hide(),ForeignCooperation.carSeriesName[3]=$(this).find(".n").text(),ForeignCooperation.carSeriesIdSubstitute[3]=this.id,ForeignCooperation.carSeriesModelId[0]=$(this).data("model"),e=0;e<ForeignCooperation.carSeriesIdSubstitute.length;e+=1)ForeignCooperation.carSeriesId[e]=ForeignCooperation.carSeriesIdSubstitute[e];if($("#carSeries").val(ForeignCooperation.carSeriesName.join(" ")),$("#brandTimeText").text("上牌时间"),$("#carSeriesBoxes, #carSeriesBox, #alphaLayer").hide(),ForeignCooperation.currentYear-ForeignCooperation.purchaseDate<=4)for(e=ForeignCooperation.purchaseDate-1;e<=ForeignCooperation.currentYear;e+=1)ForeignCooperation.registrationYear+='<li><span class="year">'+e+"年</span></li>";else for(e=ForeignCooperation.purchaseDate-1;e<=ForeignCooperation.purchaseDate+4;e+=1)ForeignCooperation.registrationYear+='<li><span class="year">'+e+"年</span></li>";$("#brandTimeList").empty().html(ForeignCooperation.registrationYear),ForeignCooperation.carSeriesName.splice(0,ForeignCooperation.carSeriesName.length),ForeignCooperation.registrationYear=""}),$("#carSeriesBoxes").on("click",".return-btn",function(){var e=$(this).data("this"),o=$(this).data("return");$("#"+e).hide(),$("#"+o).show()}),$("#carSeriesBoxes").on("click",".choose-boxes-close",function(){$("#carBrandBox .brand-lists").eq(0).show().siblings(".brand-lists").hide(),$("#carBrandLetterBox li").eq(0).addClass("active").siblings("li").removeClass("active"),$("#carSeriesBoxes, #carBrandBox, #carStyleBox, #carYearBox, #carSeriesBox, #alphaLayer").hide()}),$("#brandTimeText").parent().on("click",function(){"none"===$("#brandTimeList").css("display")?$("#brandTimeList").html()&&$("#brandTimeList").show():$("#brandTimeList").hide()}),$("#brandTimeList").on("click","li",function(){$("#brandTimeText").text($(this).text()),$("#brandTimeList").hide(),"block"===$("#assessErrorInfo").css("display")&&$("#assessErrorInfo").hide()}),$("#mileAge").on("blur",function(){/^[0-9]$/.test(this.value)||/^[1-9][0-9]$/.test(this.value)||/^100$/.test(this.value)?$("#assessErrorInfo").text("").hide():/行驶里数/.test(this.value)||$("#assessErrorInfo").text("请填写正确的行驶里程").show()}),$("#assessSubmit").on("click",function(){var e,o,i=this,a=$("#assessErrorInfo").css("display"),t=$("#assessErrorInfo");for(e=0;e<ForeignCooperation.checkLists.length;e+=1)if("carSeries"===ForeignCooperation.checkLists[e]){if(!checkFunctions.checkInput($("#"+ForeignCooperation.checkLists[e]).val(),$("#"+ForeignCooperation.checkLists[e]).attr("placeholder")))return o="请选择车型",t.text(o).show(),!1}else if("brandTimeText"===ForeignCooperation.checkLists[e]){if("上牌时间"===$("#"+ForeignCooperation.checkLists[e]).text())return o="请选择上牌时间",t.text(o).show(),!1}else if("mileAge"===ForeignCooperation.checkLists[e]){if(!/^[0-9]$/.test($("#"+ForeignCooperation.checkLists[e]).val())&&!/^[1-9][0-9]$/.test($("#"+ForeignCooperation.checkLists[e]).val())&&!/^100$/.test($("#"+ForeignCooperation.checkLists[e]).val()))return o=$("#"+ForeignCooperation.checkLists[e]).val()?"请填写正确的行驶里程":"请填写行驶里程",t.text(o).show(),!1;if("block"===a)return!1}else if("carLocation"===ForeignCooperation.checkLists[e]&&!checkFunctions.checkInput($("#"+ForeignCooperation.checkLists[e]).text(),$("#"+ForeignCooperation.checkLists[e]).attr("placeholder")))return o="请选择地区",t.text(o).show(),!1;window.open("/pinggu/"+(ForeignCooperation.locationEname?ForeignCooperation.locationEname:$("#areaLocation").data("pinyin"))+"/"+ForeignCooperation.carSeriesModelId[0]+".html?purchase_year="+ForeignCooperation.purchaseDate+"&distance="+$("#mileAge").val()+"&fr_time="+$("#brandTimeText").text().split("年")[0]+(checkFunctions.checkMobile($("#phoneNum").val())?"&isphone=1":"")),checkFunctions.checkMobile($("#phoneNum").val())&&(ForeignCooperation.assessForm={model_id:ForeignCooperation.carSeriesModelId[0],phone:$("#phoneNum").val(),province_cname:ForeignCooperation.areaLocation[0],province_id:ForeignCooperation.areaLocationIdSubstitute[0],city_cname:ForeignCooperation.areaLocation[2],city_id:ForeignCooperation.areaLocationIdSubstitute[2],area:$("#areaLocation").data("pinyin"),fr_time:$("#brandTimeText").text().split("年")[0],distance:$("#mileAge").val(),purchase_year:ForeignCooperation.purchaseDate,source:"2345"},ajaxFunctions.postData("/index.php?c=pinggu&a=ajaxPingguSave",ForeignCooperation.assessForm,!1,function(){},function(){})),googleAnalytics.sendGA("expert-ping","快速评估",ForeignCooperation.carSeriesName.join(" ")+" "+ForeignCooperation.areaLocation[2],""),$(i).parent().addClass("unsubmit");setTimeout(function(){$(i).parent().removeClass("unsubmit")},3e3)}),$(".link-nav").on("mouseenter","li",function(){var e=$(this).data("name");$(this).addClass("active").siblings("li").removeClass("active"),$("."+e).show().siblings(".link-list").hide()})}),window.onload=function(){$(".lists li img").each(function(e,o){var i=this,a=i.height,t=$(i).parent().height();a>t?$(i).css({position:"absolute",top:"50%","margin-top":"-"+a/2+"px"}):a<t&&$(i).removeAttr("width").attr("height","100%").css({position:"absolute",left:"50%","margin-left":"-"+i.width/2+"px"})})};