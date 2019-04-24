// JavaScript Document
  //以后移除内容，首页楼层进行产品链接质控
  function removeHref(){
    $(".luara-0").next().find("li a").each(function(){
      $(this).attr("href","javascript:;");
    });
  }
// 所有页面效果


$(function(){
    removeHref();
	if($("#addmenu_box_show").length>0){
		var contextPath=$("#addmenu_box_show").attr("urlData");
		$.ajax({
		url:CONTEXT_PATH+'/index/emall/platProdTypeQueryView',
		data:{},
		type:"post",
		dataType:"text", 
		success:function(data){
			var datas=eval("("+data+")");
			var htmlstr=' <ul class="menu_title1">';
			$.each(datas.ptList1,function(n,value) { 
				if((n+1)<=4){
					htmlstr=htmlstr+'<li class>';
					htmlstr=htmlstr+'<a href="javascript:;"><span>';
					htmlstr=htmlstr+'<img src="'+RESOURCE_PATH+'base/images/png_icon0'+(n+1)+'.png"/>';
					htmlstr=htmlstr+'</span>'+value.productTypeName+'</a>';
					//二级菜单
					var countFlag=0;
					if(n<4){
						htmlstr=htmlstr+'<div class="cate_part">';
						$.each(datas.ptList2,function(i,vals) { 
							if(vals.prodtypePlatShow == 0){
								return true;
							}
							if(vals.upLevelId==value.productTypeId){
								if(countFlag==0){
									htmlstr=htmlstr+'<dl class="cate_detail_item cate_detail_item1">';
								}else{
									htmlstr=htmlstr+'<dl class="cate_detail_item">';
								}
								countFlag++;
								htmlstr=htmlstr+'<dt class="cate_detail_tit"><a class="cate_detail_tit_lk">'+vals.productTypeName+'</a>';
								htmlstr=htmlstr+'</dt>';
								//三级菜单读取
								htmlstr=htmlstr+'<dd class="cate_detail_con">';
								$.each(datas.ptList3,function(j,vals3) {
									if(vals3.prodtypePlatShow == 0){
										return true;
									}
									if(vals3.upLevelId==vals.productTypeId){
										//alert(vals3.prodtypeActiveType);
										if(vals3.prodtypeActiveType=='2'){
											htmlstr=htmlstr+'<a class="cate_detail_con_lk" href="'+contextPath+'/au/emall?productTypeNames='+vals3.productTypeName+'">'+vals3.productTypeName+'</a>';
										}else{
											htmlstr=htmlstr+'<a href="'+contextPath+'/emall/tradeHall/tradeHallList?prodTypeIds='+vals3.productTypeId+'" class="cate_detail_con_lk">'+vals3.productTypeName+'</a>';
										}
									}
								});
								htmlstr=htmlstr+'</dd>';
								htmlstr=htmlstr+'</dl>';
							}
						});
						htmlstr=htmlstr+'</div>';
					}
					htmlstr=htmlstr+'</li>';
				}
				
			});
			/*
			var name1 = "国Ⅴ 95# 汽油".replace(/\#/g,"%23");
			var name2 = "国Ⅳ 93# 汽油".replace(/\#/g,"%23");
			var name3 = "国Ⅳ 0# 柴油".replace(/\#/g,"%23");
			var name4 = "国Ⅴ 92# 汽油".replace(/\#/g,"%23");
			var name5 = "国Ⅴ 0# 柴油".replace(/\#/g,"%23");
			productName='+name1+'
			*/
			htmlstr=htmlstr+'</ul>'; 
			htmlstr=htmlstr+'<p class="p-menu_title11">热门商品</p>';
			htmlstr=htmlstr+' <ul class="menu_title11">';
			htmlstr=htmlstr+'<li style="background:none"><a href="'+contextPath+'/emall/tradeHall/tradeHallList?productName=&materialCode=000000001180300550,000000001180458844"><span><img src="'+RESOURCE_PATH+'base/images/png_icon01.png" /></span>国Ⅴ 95# 汽油</a></li>';
			htmlstr=htmlstr+'<li style="background:none"><a href="'+contextPath+'/emall/tradeHall/tradeHallList?productName=&materialCode=000000001180300549,000000001180454680"><span><img src="'+RESOURCE_PATH+'base/images/png_icon01.png" /></span>国Ⅴ 92# 汽油</a></li>';
			htmlstr=htmlstr+'<li style="background:none"><a href="'+contextPath+'/emall/tradeHall/tradeHallList?productName=&materialCode=000000001180128672,000000001180122847"><span><img src="'+RESOURCE_PATH+'base/images/png_icon01.png" /></span>国Ⅲ -10# 柴油</a></li>';
			htmlstr=htmlstr+'<li style="background:none"><a href="'+contextPath+'/emall/tradeHall/tradeHallList?productName=&materialCode=000000001180413148"><span><img src="'+RESOURCE_PATH+'base/images/png_icon01.png" /></span>国Ⅴ 0# 柴油</a></li>';
			htmlstr=htmlstr+'<li style="background:none"><a href="'+contextPath+'/emall/tradeHall/tradeHallList?productName=&materialCode=000000001180424502"><span><img src="'+RESOURCE_PATH+'base/images/png_icon01.png" /></span>国Ⅳ  0# 柴油</a></li>';
			htmlstr=htmlstr+'</ul>';
			
			/*htmlstr=htmlstr+'<div class="sy_popctn">';
			
			$.each(datas.ptList1,function(n,valList) { 
				var countFlag=0;
				if(n<4){
					htmlstr=htmlstr+'<div class="cate_part">';
					$.each(datas.ptList2,function(i,vals) { 
						if(vals.upLevelId==valList.productTypeId){
							if(countFlag==0){
								htmlstr=htmlstr+'<dl class="cate_detail_item cate_detail_item1">';
							}else{
								htmlstr=htmlstr+'<dl class="cate_detail_item">';
							}
							countFlag++;
							htmlstr=htmlstr+'<dt class="cate_detail_tit"><a class="cate_detail_tit_lk">'+vals.productTypeName+'</a>';
							htmlstr=htmlstr+'</dt>';
							//三级菜单读取
							htmlstr=htmlstr+'<dd class="cate_detail_con">';
							$.each(datas.ptList3,function(j,vals3) {
								if(vals3.upLevelId==vals.productTypeId){
									//alert(vals3.prodtypeActiveType);
									if(vals3.prodtypeActiveType=='2'){
										htmlstr=htmlstr+'<a class="cate_detail_con_lk" href="'+contextPath+'/au/emall?productTypeNames='+vals3.productTypeName+'">'+vals3.productTypeName+'</a>';
									}else{
										htmlstr=htmlstr+'<a href="'+contextPath+'/emall/tradeHall/tradeHallList?prodTypeIds='+vals3.productTypeId+'" class="cate_detail_con_lk">'+vals3.productTypeName+'</a>';
									}
								}
							});
							htmlstr=htmlstr+'</dd>';
							htmlstr=htmlstr+'</dl>';
						}
					});
					htmlstr=htmlstr+'</div>';
				}
			});
			htmlstr=htmlstr+'</div>';*/
			
		/*	htmlstr=htmlstr+'<h2 class="menu_h2_2">';
			htmlstr=htmlstr+'<span>没有找到想要的</span><br/>';
			htmlstr=htmlstr+'<a>发布采购需求</a></h2>';*/
		   $("#addmenu_box_show").prepend(htmlstr);
		   /*产品分类右侧菜单*/
			$(".menu_title1 li").hover(function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				var nli = $(this).index();
				$(this).children(".cate_part").css("display","block");
			},function(){
				$(this).removeClass("cur");
				$(this).children(".cate_part").css("display","none");
			});
		},
		error:function(){ 
			/*$.Bstatus({//公共弹出框
				html:'分类加载失败，请刷新！', 
						status:false,
						callback:function(){
							
						} 
					});*/
				}
			});	
		//首页-交易大厅-鼠标移动的效果
		/*$('.menu_title1>li,.menu_title2>li').each(function(){
			var menuTime=null;
			var This=$(this);
			$(this).mouseover(function(){
				menuTime=setTimeout(function(){
					This.animate({'paddingLeft':'50px'},400);
				},200)
			});
			$(this).mouseout(function(){
				clearTimeout(menuTime);
				$(this).animate({'paddingLeft':'9px'},400);
			});
		});*/
	}
	
	
	
	//首页-热门推荐-tab
	$('.rmtj_mene li').each(function(){
		$(this).click(function(){
			$(this).addClass('active').find('img').show().end().siblings().removeClass('active').find('img').hide();
			$('.rmtj_box>div').eq($(this).index()).show().siblings('div').hide();;
		});
	})
	
	//首页-图片移动
	$('.contian_two_ul>li').each(function(i,elem){
		$(elem).hover(function(){
			$(elem).animate({'top':'-6px'},200);
		},function(){
			$(elem).animate({'top':'0px'},100);
		})
	})
	
	//首页-交易大厅  展开 隐藏
	$('.menu_h2').click(function(){
		$('.menu_bao').slideToggle();
		$('.tip').slideToggle();
		$('.menu_h2 img').fadeToggle();
	})
	
	//首页-市场公告
	$('.banner_h2_close').click(function(){
		$('.banner_right').slideToggle(700);
	})
	//首页-顶部广告
	$('.adv_top_close').click(function(){
		$('.adv_top').slideToggle(700);
	})
	
	//首页-行业解决方案
	$('.jjfa_nr_ul>li').each(function(i,elem){
		$(this).click(function(){
			$(elem).addClass('active').siblings('li').removeClass('active');
			$('.jjfa_box>img').eq($(this).index()).fadeIn().siblings().fadeOut();
		})
	})
	
	//首页 -头部  -  下拉
	$('.select a').each(function(){
		if($(this).index()%2==0)
		{
			$(this).css({'paddingLeft':'25px'})
		}
	})
	$('.nav>li').each(function(){
		$(this).click(function(ev){
			if($(this).find('.select_bao').is(":visible"))
			{
				$(this).find('.select_bao').slideUp(200);
				$(this).find('.nav_img').css({'visibility':'visible'});
			}
			else{
				$(this).find('.select_bao').slideDown(200).end().siblings('li').find('.select_bao').slideUp(200);
				$(this).find('.nav_img').css({'visibility':'hidden'});
			};
			ev.stopPropagation();
		})
	})
	
	$(document).on('click',function(){
		$('.select_bao').slideUp(200);
		$('.nav_img').css({'visibility':'visible'});
	})
	
	//去掉内页表格最后一行的下划线
	$('.car_we_tab tr:last').find('td').css({'background':'none'});
	$('.show_table>tbody').find('tr:last').find('td').css({'background':'none'});
	
	$('.table_text').each(function(){
		$(this).hover(function(){
			if($(this).attr('disabled'))
			{
				return false;
			}
			$(this).prev().show();
		},function(){
			$(this).prev().hide();
		})
	})
	
	
	// 内页筛选条件的收缩展示按钮
	//var xuan_len=$('.car_xuan_ul>li').length;
	var xuan_hh=35;
	//add zhanglaibin for 默认把所有大厅分类进行收起  time 20170311
	if($('.car_up').length>0&&$('.car_xuan_box').height()>=xuan_hh*2){
		$('.car_xuan_ul>li:gt(1)').slideUp(300).end().parent()
		$('.car_xuan_box').animate({'height':'70px','overflow':'hidden'},300,function(){
			$('.car_xuan_ul>li:eq(1)').css({'background':'none'});
		});
		$('.car_xuan_ul').css({'height':'70px','overflow':'hidden'});
		$(".car_up").text('展开 ∨');
	}	
	$('.car_up').click(function(){
		if($(this).text()=='收起 ∧')
		{
			$('.car_xuan_ul>li:gt(1)').slideUp(300).end().parent()
			$('.car_xuan_box').animate({'height':'70px','overflow':'hidden'},300,function(){
				$('.car_xuan_ul>li:eq(1)').css({'background':'none'});
			});
			$('.car_xuan_ul').css({'height':'70px','overflow':'hidden'});
			$(this).text('展开 ∨');
		}
		else{
			$('.car_xuan_ul>li:gt(1)').slideDown(300);
			$('.car_xuan_box').animate({'height':'auto'},300);$('.car_xuan_box').attr("style",'auto');
			if($('.car_xuan_ul>li').length>2){$('.car_xuan_ul>li:eq(1)').attr("style","");};
			$('.car_xuan_ul').css({'height':'auto'});
			$(this).text('收起 ∧');
		}
	})
	
	//综合排序--店铺模式
	$('.select_onoff>a').each(function(){
		$(this).click(function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
	})
	
/*------------------------------------筛选开始--------------------------------------------*/	
	
	//筛选条件联动  点击小a 
	$('.car_xuan_ul').find("a").on('click',function(){
		if($(this).attr('class')=='active')  //如果当前选中
		{
			$(this).removeClass('active');
			//判断是否最后一个
			var a_cun=0;
			$(this).parent().find('a').each(function(){
				if($(this).attr('class')=='active')
				{
					a_cun++;
				}
			})
			if(a_cun==0)
			{
				$(this).parent().find('a:first').addClass('active');
			}
			
		}else{                               //如果当前未选中
			$(this).addClass('active');
			if($('.car_wen_h4_all').is(":hidden"))
			{
				$('.car_wen_h4_all').show();
			}
			$(this).parent().find('a:first').removeClass('active');
		}
	})
	
	//点击第一个  "全部"
	$('.car_xuan_ul>li').find('a:first').each(function(){
		$(this).click(function(){
			$(this).addClass('active').siblings('a').removeClass('active');
		})
	})
	
	
	//清除所有条件按钮
	$('.car_wen_h4_all').on('click',function(){
		//$('.span_add>a').remove();
		$(this).hide();
		$('.car_xuan_ul>li').find('a:first').addClass('active').end().find('a:not(:first)').removeClass('active');
	})
	
/*------------------------------------筛选结束--------------------------------------------*/
	$('.table_text').each(function(){
		$(this).focus(function(){
			if($(this).val()=='输入量')$(this).val('');
		})
		$(this).blur(function(){
			if($(this).val()=='')$(this).val('输入量');
		})
	})
	

	//二级页面
	var $car_menu_ul=$('.car_menu_bao').find('ul').eq(0);
	var $car_menu_li=$car_menu_ul.find('li');
	var $car_menu_ww=$car_menu_ul.find('li').eq(0).outerWidth();
	var $car_menu_len=$car_menu_ul.find('li').length;
	
	$car_menu_ul.css({'width':$car_menu_ww*$car_menu_len});
	var $car_menu_speed=0;
	
	$('.car_menu_click').click(function(){
		if($car_menu_speed==$car_menu_len-5)
		{
			$car_menu_speed=0;
		}
		else{
			$car_menu_speed++;
		}
		$car_menu_ul.animate({'left':-$car_menu_ww*$car_menu_speed},300);
	})
	
	
	//汽车展示 按钮
	$('.car_show_one>a.car_show_a,.car_show_two>a.car_show_a,.car_show_three>a.car_show_a,.car_show_four>a.car_show_a,.car_show_five>a.car_show_a').click(function(){
		if($(this).find('img').eq(0).is(':hidden'))
		{
			$(this).find('img').show();
			$(this).parent().find('span>img:eq(1)').show();
			$(this).parent().find('p').addClass('blue');
			$(this).parent().find('div').addClass('xian_kuan2');
			
			//增加到标题处
			var $a_add=$('<a>');
			$a_add.addClass('blue');
			$a_add.html($(this).parent().find('p:eq(0)').text()+'<img src="images/png_26.png" width="13" height="13" class="car_wen_h4_close">');
			$a_add.appendTo('.car_cui');
			
			//全部清除按钮
			$('.car_wen_h4_all2').show();
			
		}
		else{
			$(this).find('img').hide();
			$(this).parent().find('span>img:eq(1)').hide();
			$(this).parent().find('div').removeClass('xian_kuan2');
			$(this).parent().find('p').removeClass('blue');
			
			//增加到标题处
			var $old_text=$(this).parent().find('p:eq(0)').text();
			$('.car_cui>a').each(function(){
				if($(this).text()==$old_text)
				{
					$(this).remove();
				}
			})
			
			//全部清除按钮
			if($('.car_cui').find('a').length<=0)
			{
				$('.car_wen_h4_all2').hide();
			}
		}
	})
	
	// 标题与汽车展示的联动
	$('.car_cui').delegate('img','click',function(){
		$(this).parent().remove();
		var $old_wen=$(this).parent().text();
		$('.p_biao').each(function(){
			if($(this).text()==$old_wen)
			{
				$(this).parent().parent().find('span>img:eq(1)').hide();
				$(this).parent().parent().find('a').find('img').hide();
				$(this).parent().removeClass('xian_kuan2');
				$(this).removeClass('blue').siblings().removeClass('blue');
			}
		})
		//全部清除按钮
		if($('.car_cui').find('a').length<=0)
		{
			$('.car_wen_h4_all2').hide();
		}
	})
	
	
	
	//全部清除按钮
	$('.car_wen_h4_all2').click(function(){
		$('.car_cui>a').each(function(){
			var $old_text=$(this).text();
			$('.p_biao').each(function(){
				if($(this).text()==$old_text)
				{
					$(this).parent().parent().find('span>img:eq(1)').hide();
					$(this).parent().parent().find('a').find('img').hide();
					$(this).parent().removeClass('xian_kuan2');
					$(this).removeClass('blue').siblings().removeClass('blue');
				}
			})
			$(this).remove();
		});
		$(this).hide();
	})
	
	
	
	//6.3/6.2竞价出价  底部tabl
	$('.mx_tab_ul li').each(function(){
		$(this).on('click',function(){
			$(this).addClass('active').siblings().removeClass();
			$('.mx_tab_box>div').eq($(this).index()).show().siblings().hide();
		})
	})
	//6.3/6.2竞价出价 右侧滚动
	/*var $max_parent=$('.max_li tbody');
	var $max_length=$max_parent.find('tr').length;
	var $max_speed=0;
	var $max_hh=$max_parent.find('td').outerHeight(true);
	$max_parent.html($max_parent.html()+$max_parent.html());
	var $max_cun=$max_length*$max_hh;
	$max_parent.timr=setInterval($max_gun,30);
	$max_parent.hover(function(){
		clearInterval($max_parent.timr);
	},function(){
		$max_parent.timr=setInterval($max_gun,30);
	})
	function $max_gun(){
		$max_speed=='-'+$max_cun ? $max_speed=0: $max_speed--;
		$max_parent.parent().css({'top':$max_speed+'px'})
	}*/
	
	//6.3/6.2左侧倒计时
	/*var $djs_time=null;
	var t=0;
	function djsTime()
	{
		var iNow = new Date();
		var iNew = new Date( 'April 26,2016 23:5:0' ); //未来时间
		t = Math.floor((iNew - iNow)/1000);
		//if(t<=0){$('.aniu_chujia').addClass('aniu_chujia_hui');return false;}
		var str_day=Math.floor(t/86400);
			var str_hour=Math.floor(t%86400/3600);
			var str_minute=Math.floor(t%86400%3600/60);
			var str_second=t%60;
			$('.mx_ll_dao_box').find('span:eq(0)').html(addZero(str_hour));
			$('.mx_ll_dao_box').find('span:eq(1)').html(addZero(str_minute));
			$('.mx_ll_dao_box').find('span:eq(2)').html(addZero(str_second));
			$('.td_time').html(addZero(Math.floor(t/86400))+'天'+addZero(Math.floor(t%86400/3600))+'时'+addZero(+Math.floor(t%86400%3600/60))+'分'+addZero(t%60)+'秒');
	}
	djsTime();
	$djs_time=setInterval(function(){
		if(t<=0){
			clearInterval($djs_time);
			//$('.aniu_chujia').addClass('aniu_chujia_hui');
		}
		else{
			djsTime()
		}
	},1000)*/
	//6.3/6.2 f放大镜效果
	$('.mx_ll_one_has').on('mousemove',function(e){	
		var $drag=$(this).find('.file_move2');
		$drag.show();
		if($('.mx_big_img').length<=0)
		{
			var $div=$('<div>');
			$div.attr('class','mx_big_img');
			$div.html('<img src='+$(this).find('.mx_ll_one_img').attr('src') +' />');
			$div.appendTo($('.mx_ll'));
		}
		
		var speedX=e.pageX-$(this).offset().left-$drag.width()/2;
		var speedY=e.pageY-$(this).offset().top-$drag.height()/2;
		
		if(speedX<0){speedX=0;}
		else if(speedX>$(this).outerWidth()-$drag.outerWidth()){
			speedX=$(this).outerWidth()-$drag.outerWidth();
		}
		if(speedY<0){speedY=0;}
		else if(speedY>$(this).outerHeight()-$drag.outerHeight()){
			speedY=$(this).outerHeight()-$drag.outerHeight();
		}
		$drag.css({'left':speedX,'top':speedY});
		var biliX=speedX/($(this).width()-$drag.width());
		var biliY=speedY/($(this).height()-$drag.height());
		
		$('.mx_big_img').find('img').css('left',($('.mx_big_img').outerWidth(true)-$('.mx_big_img').find('img').outerWidth(true))*biliX);
		$('.mx_big_img').find('img').css('top',($('.mx_big_img').outerHeight(true)-$('.mx_big_img').find('img').outerHeight(true))*biliY);

	})
	$('.mx_ll_one_has').on('mouseout',function(){
		var $drag=$(this).find('.file_move2');
		$drag.hide();
		$('.mx_big_img').remove();
	})
	
	
/*---------------------------简单验证开始-------------------------------------*/	

	//会员注册页面的 前端简单验证
	$('.user_name').blur(function(){  //用户名框
		if($(this).val()=='' || $(this).val()=='凌风')
		{
			$(this).parent().find('.user_list_news').show();
		}
		else{
			$(this).parent().find('.user_list_news').hide();
		}
	})	
	
	$('.user_password').blur(function(){  //密码框
		if($(this).val()=='') 
		{
			$(this).parent().find('.user_list_news').show();
		}
		else{
			$(this).parent().find('.user_list_news').hide();
		}
	})
	
	$('.user_password_two').blur(function(){  //密码确认框
		if($(this).val()=='' || $(this).val() != $('.user_password').val()) // 密码为空时
		{
			$(this).parent().find('.user_list_news').show();
		}
		else{
			$(this).parent().find('.user_list_news').hide();
		}
	})
	
	$('.user_phone').blur(function(){   // 手机验证框
		if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test($(this).val()))
		{
			$(this).parent().find('.user_list_news').show();
		}
		else{
			$(this).parent().find('.user_list_news').hide();
		}
	})
	
	
	
	
	
	//点击提交按钮
	$('.tijiao').click(function(){
		//前面4个框验证
		$('.user_list_news').each(function(){
			if($(this).is(":visible"))
			{
				$(this).prev().focus();
				return false;
			}
		})
		
		//意向购买产品 验证 
		var $user_yxgmcp=true;
		$('.user_yxgmcp input[type="hidden"]').each(function(){
			if($(this).val()=='true'){
				$user_yxgmcp=false;
				return false;
			}
		})
		if($user_yxgmcp)
		{
			$('.user_list_news_kong').children().show();
		}
		else{
			$('.user_list_news_kong').children().hide();
		}

	})

/*---------------------------简单验证结束-------------------------------------*/	






/*--------------------------------会员页面开始-----------------------------------*/
	$('.member_nav_ul>li>a').each(function(i,elem){
		$(elem).click(function(){
			$(elem).next().slideToggle(300);
			//return false;
		})
	});
	$('.member_nav_ul p>a').each(function(i,elem){
		$(elem).click(function(){
			$('.member_nav_ul p>a').removeClass('active');
			$(this).addClass('active');
			//return false;
		})
	});
	
	//按钮控制
	$('.member_b_div').each(function(i){
		$(this).find('i').on('mousedown',function(ev){
			var This=$(this);
			var disX=ev.pageX-$(this).offset().left+$(this).parent().offset().left;
			var member_cun=0;
			$(document).on('mousemove.aniniu',function(ev){
				var speedX=ev.pageX-disX;
				if(speedX<5)
				{
					speedX=-5;
					This.offsetParent().removeClass('te');
					
				}
				else if(speedX>15)
				{
					speedX=25;
					This.offsetParent().addClass('te');
				}
				member_cun=speedX;
				This.css({'left':speedX});
			})
			
			$(document).on('mouseup.aniniu',function(){
				$(document).off('.aniniu');
				if(member_cun==-5)
				{
					This.closest('.member_a_ul').find('.member_a_p').find('p:eq(0)').animate({'marginTop':0},300);
				}
				else if(member_cun==25)
				{
					This.closest('.member_a_ul').find('.member_a_p').find('p:eq(0)').animate({'marginTop':-35},300);
				}
			})
			return false;
		})
	});
	

/*--------------------------------会员页面开始-----------------------------------*/


/*-----------上传图片-------------*/
	$('.file_inpt').each(function(i,elem){
		$(this).on('change',function(){
			var $url=getFileUrl($(this).get(0));
			$(elem).closest('.user_zoom').find('.input_text').val($(this).val());
			$(elem).closest('.user_zoom').find('.tb_img_small').html('<img src="'+$url+'" class="file_img" /><em class="file_move"></em>');
		})
	})
	
	   //放大镜
		$('.tb_img_small').each(function(){
			
			$(this).on('mousemove',function(e){
				
				if($(this).find('.yyzz_img').length>0)return false;
				
				
				var $drag=$(this).find('.file_move');
				$drag.show();
				
				if($('.tb_img_big').length<=0)
				{
					var $div=$('<div>');
					$div.attr('class','tb_img_big');
					$div.html('<img src='+$(this).find('img').eq(0).attr('src') +' />');
					$div.appendTo($(this));
				}
				
				var speedX=e.pageX-$(this).offset().left-$drag.width()/2;
				var speedY=e.pageY-$(this).offset().top-$drag.height()/2;
				
				if(speedX<0){speedX=0;}
				else if(speedX>$(this).outerWidth(true)-$drag.outerWidth(true)){
					speedX=$(this).outerWidth(true)-$drag.outerWidth(true)-2;
				}
				if(speedY<0){speedY=0;}
				else if(speedY>$(this).outerHeight(true)-$drag.outerHeight(true)){
					speedY=$(this).outerHeight(true)-$drag.outerHeight(true)-2;
				}
				$drag.css({'left':speedX,'top':speedY});

				var biliX=speedX/($(this).outerWidth(true)-$drag.outerWidth(true));
				var biliY=speedY/($(this).outerHeight(true)-$drag.outerHeight(true));
				$(this).find('.tb_img_big>img:eq(0)').css('left',($(this).find('.tb_img_big').outerWidth(true)-$(this).find('.tb_img_big>img:eq(0)').outerWidth(true))*biliX);
				$(this).find('.tb_img_big>img:eq(0)').css('top',($(this).find('.tb_img_big').outerHeight(true)-$(this).find('.tb_img_big>img:eq(0)').outerHeight(true))*biliY);

			})
			$(this).on('mouseout',function(){
				var $drag=$(this).find('.file_move');
				$drag.hide();
				$('.tb_img_big').remove();
			})
		})

	
/*-----------上传图片结束------------*/


/*--------列表页开始---------*/

	$('.list_search_a').on('click',function(){
		$('.list_search_showHide').stop().slideToggle(300);
	})
	$('.list_li tr:even').css({'background':'#f1f1f1'});
	$('.list_li tr:last').css({'border':'none'});
	
	//重置按钮
	$('.reseat_a').on('click',function(){
		$(this).parents('.list_search_showHide').find('input').val('');
		$(this).parents('.list_search_showHide').find('.zy_select').find('p').html('');
	})
	
	//点击删除
	/*$('.member_a').delegate('a[class*="shanchu"]','click',function(){
		if($(this).closest('tr').find('img').is(":visible"))
		{
			$(this).closest('tr').remove();
			
			$('.list_li').find('tbaody tr:even').css({'background':'#f1f1f1'});
			$('.list_li').find('tbaody tr:odd').css({'background':'#fff'});
		}
		else{
			alert('请勾选在删除');
		}
		return false;
	})*/
	
	
	
	//全选
	$('.list_all_checkbox input').on('click',function(){
		if($(this).is(':checked'))
		{
			$('.list_li').find('input[type="checkbox"]').prop('checked',true);
		}
		else{
			$('.list_li').find('input[type="checkbox"]').prop('checked',false);
		}
	})
	
	//点击新增按钮
	$('.lis_add').on('click',function(){
		var $tr=$('<tr>');
		$tr.html('<td><input name="" type="checkbox" value=""></td><td>'+$('input[name="gsjj"]').val()+'</td><td>'+$('input[name="cpmc"]').val()+'</td><td>'+'物料代码'+'</td><td>'+$('.cplx').html()+'</td><td>'+$('input[name="wlmc"]').val()+'</td><td>'+$('.jb').html()+'</td><td><a href="#" class="bianji_one list_anniu list_anniu_left">编辑</a><a href="#" class="shanchu_one list_anniu">删除</a></td>');
		$('.list_li').append($tr);
		
		$tr.css('background',$tr.index()%2?'#f1f1f1':'#fff');
		
		
		//新增之后 清楚填写的数据
		$('.list_search_div input').val('');
		$('.list_search_div').find('.select_val p').html('');
	})
	
	//列表页-订单列表
	$('.list_zy_h2 a:not(":last")').on('click',function(){
		$(this).addClass('active').parent().siblings().find('a').removeClass('active');
		return false;
	});
	
	
	//单选框
	$('.checkBox').on('click',function(){
		$(this).find('img').toggle();
	})
	
	
	
	
/*--------列表页结束---------*/






/*-------------权限组详细开始-------------*/

	$('.qingdan_left_box').delegate('input','click',function(){
		if($(this).get(0).checked)
		{
			if($(this).closest('li').find('.qingdan_left_ul_ul').length>0)
			{
				$(this).closest('li').find('.qingdan_left_ul_ul').slideDown();
			}
		}
		else{
			if($(this).closest('li').find('.qingdan_left_ul_ul').length>0)
			{
				$(this).closest('li').find('.qingdan_left_ul_ul').slideUp();
			}
		}
	});
	//隔行变色
	$('.list_li2 tr:last').css({'border':'none'});
	$('.list_li2 tr:odd').css({'background':'#f1f1f1'});
	//全选
	$('.list_all_checkbox input').on('click',function(){
		if($(this).is(':checked'))
		{
			$('.list_li2').find('input[type="checkbox"]').prop('checked',true);
		}
		else{
			$('.list_li2').find('input[type="checkbox"]').prop('checked',false);
		}
	})
	//新增
	$('.lis_add').on('click',function(){
		var $tr=$('<tr>');
		$tr.html('<td><input name="" type="checkbox" value=""></td><td>'+"页面代码"+'</td><td>'+"页面名称"+'</td><td>'+"按钮(URL)代码"+'</td><td>'+"按钮(URL)名称"+'</td><td>'+"按钮说明"+'</td>');
		$('.list_li2').append($tr);
		$tr.css('background',$tr.index()%2?'#f1f1f1':'#fff');
	})

/*-------------权限组详细结束-------------*/

/*-----------------------------------*/
	$('.xh_table_menu a').each(function(){
		$(this).on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.xh_table_box>div').eq($(this).index()).show().siblings('div').hide();
		})
	})

		
	
/*------------------页面所有 input的 鼠标移入 移出 焦点 -----开始------------------*/	
	$('.user_text_bg').each(function(){
		input_val($(this));
	})
	$('.user_text_sm').each(function(){
		input_val($(this));
	})
	input_val($('.search_text'));
	$('.tab_gsxx input[type="text"]').each(function(){
		input_val($(this));
	})
	
	/*$('.input_text').each(function(){
		input_val($(this));
	})*/
	input_val($('.list_search_one'));
	//$('.unbink_fb').off('focus blur');  //  移除焦点事件  只要在元素上加个类就好了
	
/*------------------页面所有 input的 鼠标移入 移出 焦点 -----结束------------------*/		
	
/*------------------------文字超出隐藏-----------------------------*/	
	$('.car_right_lit_wen i').each(function(){
		textNone($(this),8);
	})
	
	
	
	
	
	
	
/*--------------------以下公共函数   开始----------------------------------*/	
	//input的移入移出的焦点函数
	function input_val(obj){
		var $old_val=obj.val();
		obj.focus(function(){
			if(obj.val()==$old_val)obj.val('');
		}).blur(function(){
			if(obj.val()=='')obj.val($old_val);
		})
	}
	// 判断下划线 字母 数字----一般用于验证用户名
	 function test(str){
		var regex = /^[^_][A-Za-z]*[a-z0-9_]*$/ ;
		var ret = regex.test(str);
		if (ret == true){
			return true;
		} else {
			return false;
		}
	 }
	function getFileUrl(obj) { 
		var url; 
		if (navigator.userAgent.indexOf("MSIE")>=1)
		{
			url = obj.value; 
		}
		else if(navigator.userAgent.indexOf("Firefox")>0)
		{ 
			url = window.URL.createObjectURL(obj.files.item(0)); 
		}
		else if(navigator.userAgent.indexOf("Chrome")>0)
		{
			url = window.URL.createObjectURL(obj.files.item(0)); 
		} 
		return url; 
	} 
	
	function addZero(num)
	{
		return num<9 ? '0'+num : ''+num;
	}
	
	//文字超出隐藏
	function textNone(obj,textMun){
	　　if(obj.text().length>textMun)  
	　　{
	　　　obj.text(obj.text().substring(0,textMun));
	　　　obj.text(obj.text()+'...');
	　　}
	}
	
/*--------------------以上公共函数   结束----------------------------------*/	




	$('.dp_ul_list>li').each(function(){
		$(this).hover(function(){
			$(this).addClass('te');
		},function(){
			$(this).removeClass('te');
		})
	})

	
	

})


//首页banner
window.onload=function(){
	var $banner_time=null;
	var $banner_speed=0;
	var $banner_speed2=0;
	var $banner_img=$('.banner_img');
	var $banner_ul=$('.banner_img>ul');
	var $banner_li=$banner_ul.find('li').eq(0);
	var $banner_len=$banner_ul.find('li').length;
	var $banner_Ww=$banner_li.width();
	$banner_ul.css({'width':$banner_Ww*$banner_len});
	
	$banner_li.each(function(){ //图片定位居中
		$(this).css({'marginLeft':($(window).width()-$(this).width())/2})
	})


	$('.banner_aniu a').each(function(i,elem){  //点击按钮运动
		$(elem).click(function(){
			$(elem).addClass('active').siblings().removeClass('active');
			$banner_ul.animate({'left':-$(this).index()*$banner_Ww},800);
			$banner_speed=$(this).index();
			$banner_speed2=$(this).index()
		})
	})
	
	setInterval(function(){
		if($banner_speed==$banner_img.find('li').length-1)
		{
			$banner_li.css({'position':'relative'});
			$banner_li.css({'left':$banner_Ww*$banner_img.find('li').length});
			$banner_speed=0;
		}
		else{
			$banner_speed++;
		}
		$banner_speed2++;
		$('.banner_aniu a').eq($banner_speed).addClass('active').siblings().removeClass('active');
		$banner_ul.animate({'left':-$banner_speed2*$banner_Ww},800,function(){
			if($banner_speed==0)
			{
				$banner_li.css({'position':'static'});
				$banner_ul.css({'left':0});
				$banner_speed2=0;
			}
		});
	},5000);
	
	/*banner右侧的新闻*/
	$(".nrcon_top").click(function(){
		$(this).parent(".banner_right_nrcon").addClass("cur").siblings().removeClass("cur");
	});
	/*首页分楼层的商品展示*/
	 //$('body,html').animate({ scrollTop: 0 }, 1000);//每次刷新都是滚动到顶部
	   var oNav = $('.LoutiNav');//导航壳
	   var aNav = oNav.find('li');//导航
	   var aDiv = $('.main .louceng');//楼层
	   var loucenNum=2;
		//回到顶部
		$(window).scroll(function(){
			 // 获得窗口滚动上去的距离
			var ling = $(document).scrollTop();
			var winH = $(window).height(); //可视窗口高度
			var bgH = $('.link_bg').offset().top-100;//底部的偏移高度
			// 在标题栏显示滚动的距离
			 if(ling>=700&&(ling+winH)<bgH){  //1楼顶部距离页面顶部的距离
				 oNav.fadeIn();
				 var index = Math.floor((ling-700)/350);   //  第一个数：1楼顶部距离页面顶部的距离/第二个数：每个楼层的高度
				 if(index<aNav.length){
					var htmstr=aDiv.eq(index+1).attr("read_init");
					if('false'==htmstr&&loucenNum<aNav.length){
						//alert("ok");
						//调用ajax刷新楼层信息
						loucenNum++;
						refreshLoucengMothed(loucenNum);
						aDiv.eq(index+1).attr("read_init",'true');
					}
					aNav.removeClass('active');
					aNav.eq(index).addClass('active');
				 }
			 }else{
				 oNav.fadeOut();
			 }
		});
		//刷新楼层信息ajax信息
		function refreshLoucengMothed(loucengNum){
				/*$.ajax({
					url : CONTEXT_PATH + '/index/emall/platlouCengQueryView',
					data : {'loucengNum' : loucengNum},
					success : function(html) {
						aDiv.eq(loucengNum-1).html(html);
					},
					error : function() {
						alert('加载页面时出错！');
					}
				});*/
		}
		//点击回到当前楼层
		aNav.click(function(){
			var t = aDiv.eq($(this).index()).offset().top;
			for(var i=0;i<=$(this).index();i++){
				var htmstr=aDiv.eq(i).attr("read_init");
				if('false'==htmstr){
					var loucengNum=i+1;
					//alert("ok");
					//调用ajax刷新楼层信息
					refreshLoucengMothed(loucengNum);
				}
			}
			
			$('body,html').animate({"scrollTop":t},500);
			$(this).addClass('active').siblings().removeClass('active');
		});
		/*楼层右侧店铺推荐*/
		var d = $(".hot-list");
		d.each(function() {
			var a = $(this);
			var c = a.find(".fore");
			if(c.length<=5){
				return;
			}
			c.bind("mouseenter", function() {
				a.find(".fore").removeClass("curr");
				$(this).addClass("curr");
				
			}).bind("mouseleave", function() {
				$(this).removeClass("curr");
				a.find(".fore1").addClass("curr");
			})
		}).bind("mouseleave", function() {
			$(this).find(".fore1").addClass("curr");
			//a.find(".fore").removeClass("curr");
		}); 
		/*固定在顶部的搜索框*/
		$(window).scroll(function(){
			var ju = $(document).scrollTop();
			if(ju>250){
				$(".top_search").fadeIn();
			}else{
				$(".top_search").fadeOut();
			}
		});
		/*店铺详情页内容显示与隐藏*/
		$(".dpxq_con h3").click(function(){
			$(this).toggleClass("close").siblings(".dpxq_conxx").slideToggle(1000);
		});
		/*主要应用于首页右侧导航栏 */
		$('.tbar-cart-item').hover(function (){ $(this).find('.p-del').show(); },function(){ $(this).find('.p-del').hide(); });
		$('.jth-item').hover(function (){ $(this).find('.add-cart-button').show(); },function(){ $(this).find('.add-cart-button').hide(); });
		$('.toolbar-tab').hover(function (){ $(this).find('.tab-text').addClass("tbar-tab-hover"); $(this).find('.footer-tab-text').addClass("tbar-tab-footer-hover"); $(this).addClass("tbar-tab-selected");},function(){ $(this).find('.tab-text').removeClass("tbar-tab-hover"); $(this).find('.footer-tab-text').removeClass("tbar-tab-footer-hover"); $(this).removeClass("tbar-tab-selected"); });
		
		/*推荐店铺详情页--公司公告一列的时候宽度调整*/
		var ndivgg_con = $(".dpxq_conxx .gg_con").length;
		if(ndivgg_con == 1){
			$(".dpxq_conxx .gg_con").css("width","99.9%");
		}
		 //回到顶部
	    $("#returnTop").click(function () {
	        var speed=1000;//滑动的速度
	        $('body,html').animate({ scrollTop: 0 }, speed);
	        return false;
	 });
}


/*
 *功能： 模拟form表单的提交
 *参数： URL 跳转地址 PARAMTERS 参数
 *返回值：
 *创建时间：20160713
 *创建人： 
 */
 function Post_forward_url(URL, PARAMTERS) {
     //创建form表单
     var temp_form = document.createElement("form");
     temp_form.action = URL;
     //如需打开新窗口，form的target属性要设置为'_blank'
     temp_form.target = "_self";
     temp_form.method = "post";
     temp_form.style.display = "none";
     //添加参数
     for (var item in PARAMTERS) {
         var opt = document.createElement("textarea");
         opt.name = PARAMTERS[item].name;
         opt.value = PARAMTERS[item].value;
         temp_form.appendChild(opt);
     }
     document.body.appendChild(temp_form);
     //提交数据
     temp_form.submit();
 }
