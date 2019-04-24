// JavaScript Document
 //平台QQ咨询
 function openPageChatPlatForm(){
	var url="http://wpa.b.qq.com/cgi/wpa.php?ln=1";
	var zurlKey='&key=XzgwMDA0NDc3Nl80MzgyMzZfODAwMDQ0Nzc2XzJf';
	url=url+zurlKey;
	window.open(url);
  }
 //平台QQ投诉与 咨询
 function openPageChatToushuPlatForm(){
	var url="http://wpa.b.qq.com/cgi/wpa.php?ln=1";
	var zurlKey='&key=XzgwMDA0NDc3Nl80NTM2MTNfODAwMDQ0Nzc2XzJf';
	url=url+zurlKey;
	window.open(url);
  }
/**
 * @autor zhanglaibin add 2016-7-13 16:18:17
 * @param name input框的名称
 * @param val  input的值
 * @param readOnly 选择框是否只读，ture为只读状态不可选。
 */
function setSelectDefaultValue(name,val,readOnly){
	if(readOnly==true){
		$("input=[name='"+name+"']").parent("div").removeClass("no_select");
		$("input=[name='"+name+"']").parent("div").addClass("no_select");
	}
	$("input=[name='"+name+"']").val(val);
	var obj= $("input=[name='"+name+"']").parent().find('a');
	$(obj).each(function(){
	    var zydata=$(this).attr("zydata");
	    //alert($(this).attr("zydata"));
	    if(zydata==val){
	    	$("input=[name='"+name+"']").parent().find('p').text($(this).text());
	    }
	 });
}
$(function(){
	$('body').css('width',$(document).width());
	$('.banner_img').css('width',$(document).width());
	 /*--------------------简单chekedBox---------------------*/
	 //初始化
	 $('.zy_label').each(function(){
		var $checkbox_lable=$('<input type="hidden" zyData="'+$(this).attr('zyData')+'" value="'+$(this).attr("onOff")+'" name="'+$(this).attr('name')+'" />');						        $(this).append($checkbox_lable);
	 	if($(this).attr('onOff')=='true')
		{
			$(this).find('img').show();
		}
	 });

	 $('body').delegate('.zy_label','click',function(){
		 if($(this).hasClass('no_check')){return false}
     	//点击事件
		if($(this).attr('onOff')=='true')
		{
			$(this).find('img').hide();
			$(this).attr('onOff','false');
			$(this).find('input[type="hidden"]').val('false');
		}
		else{
			$(this).find('img').show();
			$(this).attr('onOff','true');
			$(this).find('input[type="hidden"]').val('true');
		}
	 });
	/*--------------------简单chekedBox---------------------*/
	/*--------------------简单radio---------------------*/
	//初始化
	$('.zy_radio').each(function(){
		var radio_name=$(this).attr('name');
		if($(this).attr('onOff')=='true')
		{
			$(this).find('span').addClass('te');
			var ids=$(this).attr('id');
			if(null!=ids&&ids!=''&&ids!=undefined){
				$(this).after('<input type="hidden" id="'+ids+'" value="'+$(this).attr('zyData')+'" name="'+radio_name+'" />');
			}else{
				$(this).after('<input type="hidden" value="'+$(this).attr('zyData')+'" name="'+radio_name+'" />');
			}
		}
	});
	$('body').delegate('.zy_radio','click',function(){
		var radio_name=$(this).attr('name');
		if($(this).attr('onOff')!='true')
		{
			var ids=$(this).attr('id');
			if(null!=ids&&ids!=''&&ids!=undefined){
				$('.zy_radio').filter('[id='+ids+']').find('span').removeClass('te').end().attr('onOff','false');
				$(this).find('span').addClass('te');
				$(this).attr('onOff','true');
				$('input[id="'+ids+'"]').val($(this).attr('zyData'));
			}else{
				$('.zy_radio').filter('[name='+radio_name+']').find('span').removeClass('te').end().attr('onOff','false');
				$(this).find('span').addClass('te');
				$(this).attr('onOff','true');
				$('input[name="'+radio_name+'"]').val($(this).attr('zyData'));
			}
		}
	});
	/*--------------------简单select---------------------*/
	
	/*-----------------------------select start--------------------------------*/
	//初始化  select
	$('.zy_select').each(function(i,elem){
		if($(this).find('li:eq(0)').text()=='请选择')return false;//slc add 
		var $li=$('<li><a href="#" zyData="">请选择</a></li>');
		//$('.zy_select').find('ul').eq(0)
		if($(elem).find('li:first').length>0){
			$(elem).find('li:first').before($li);
		}
		else{
			$(elem).find('ul').append($li);
		}
		var zy_checkBox_str=$(elem).find('input[type="hidden"]').val();
		if(zy_checkBox_str==''||zy_checkBox_str==null||zy_checkBox_str==undefined){return true}
		var zy_checkBox_arr=[];
		//var zy_checkBox_onoff=true;
		$(elem).find('a').each(function(){
			zy_checkBox_arr.push($(this).attr('zyData'));
		});
		$.each(zy_checkBox_arr,function(i,val){
			if(zy_checkBox_str==val)
			{
				$(elem).find('p').html($(elem).find('a').eq(i).html());
				//zy_checkBox_onoff=false;
			}
		});
		/*if(zy_checkBox_onoff)
		{
			zy_checkBox_none=$(this).find('input[type="hidden"]').val();
			var zy_checkBox_val='<li><a href="#" zyData="'+zy_checkBox_none+'">'+zy_checkBox_none+'</a></li>';
			$(this).find('ul').append(zy_checkBox_val);
			$(this).find('p').html(zy_checkBox_none);
		}*/
	})
	
	
	
	
	//伸缩展示切换
	$('body').delegate('.zy_select','click',function(){
		if($(this).hasClass('no_select'))return false;
		$('.zy_select').find('ul:visible').stop().slideUp();
		$(this).find('ul').stop().slideToggle(function(){
			$(this).css({'overflow':'auto','overflow-x':'hidden'});
		});
		$('.zy_select').css({'z-index':2});
		$(this).css({'z-index':3});
		return false;
	})
	//点击复制文字
	$('body').delegate('.zy_select li','click',function(){
		$(this).parents('.zy_select').find('p').html($(this).children("a").html());
		$(this).parent().stop().slideUp();
		if($(this).parents('.zy_select').hasClass('select_city'))return false
		$(this).parents('.zy_select').find('input[type="hidden"]').val($(this).children("a").attr('zyData')); //数据
		return false;
	})
	//点击document 隐藏
	$(document).on('click',function(){
		$('.zy_select').find('ul:visible').stop().slideUp();
	});
	/*-----------------------------select end--------------------------------*/
	
	/*-----------------------------checkBox start--------------------------------*/
	//初始化
	$('.zyCheckBox').each(function(){
		var checkBox_str=$(this).find('.zyData').val();
		if(checkBox_str==''){return false}
		checkBoxArr=checkBox_str.split(',');
		$.each(checkBoxArr,function(i){
			var zhi=checkBoxArr[i];
			$('.zy_checkBox p').find('input[type="hidden"]').each(function(i,ele){
				if(zhi==$(ele).attr('zyData')){
					$(ele).next().addClass('te');
					$(ele).attr('value',true);
				}
			})	
		})
	})

	$('.zy_checkBox p').unbind().bind('click',function(){
		var zy_checkBox_str=$(this).parents('.zy_checkBox').find('.zyData').val();
		if($(this).find('img').is(":hidden")){
			$(this).find('img').addClass('te');
			$(this).find('input[type="hidden"]').val('true'); // 传值 真和假  数据1 只有真和假         -------第一种数据 
			if(zy_checkBox_str=='')
			{
				zy_checkBox_str+=$(this).find('input[type="hidden"]').attr('zyData');
			}
			else{
				zy_checkBox_str+=','+$(this).find('input[type="hidden"]').attr('zyData');
			}
			$(this).parents('.zy_checkBox').find('.zyData').val(zy_checkBox_str);   // 传值 zyData的数据  有多个值      -------第二种数据
		}
		else{
			$(this).find('img').removeClass('te');
			$(this).find('input[type="hidden"]').val('false');// 传值 真和假    数据
			var strAttr=$(this).find('input[type="hidden"]').attr('zyData');

			var arrAttr=zy_checkBox_str.split(','); //
			var that=$(this);
			$.each(arrAttr,function(i){
				if(arrAttr[i]==strAttr)
				{	
					arrAttr.splice(i,1);
					zy_checkBox_str=arrAttr.length==1?arrAttr.join(''):zy_checkBox_str=arrAttr.join(',');
					that.parents('.zy_checkBox').find('.zyData').val(zy_checkBox_str);
				}
			});
			zy_checkBox_str+=','+$(this).find('input[type="hidden"]').attr('zyData');
		}
	});
	
	
	<!--后台传值处-->
	function zyCheckBox(obj){
		var checkBox_str=obj.find('.zyData').val();
		checkBoxArr=checkBox_str.split(',');
		$.each(checkBoxArr,function(i){
			var zhi=checkBoxArr[i];
			$('.zy_checkBox p').find('input[type="hidden"]').each(function(i,ele){
				if(zhi==$(ele).attr('zyData')){
					$(ele).next().addClass('te');
					$(ele).attr('value',true);
				}
			})	
		})
	}
	//zyCheckBox($('.zyCheckBox'));  // 这个函数为了后台传值  初始化
	<!--后台传值处-->
	
	$('.all_te').unbind().bind('click',function(){   // 全选
		if($(this).find('img').is(":hidden"))
		{
			$(this).closest('.zy_checkBox').find('img').addClass('te');
			$(this).closest('.zy_checkBox').find('input[type="hidden"]').val('true');
		}
		else{
			$(this).closest('.zy_checkBox').find('img').removeClass('te');
			$(this).closest('.zy_checkBox').find('input[type="hidden"]').val('false');
		}
	})
	/*-----------------------------checkBox end--------------------------------*/
	
	
	/*--------------------------radiu start-----------------*/
	
	$('.radio_box').each(function(){
		//初始化数据
		var radio_str=$(this).find('input[type="hidden"]').val();
		var radio_onoff=true;
		if(radio_str!=''||radio_str!=null||radio_str!=undefined)
		{
			$(this).find('span[zyData]').each(function(i,elem){
				if($(this).attr('zyData')==radio_str)
				{
					$(this).addClass('te');
					radio_onoff=false;
				}
			})
			if(radio_onoff)
			{
				alert('你传的数据还未创建');
			}
		}
		var This=$(this);
		$(this).find('.radio').each(function(){
			$(this).unbind().bind('click',function(){
				This.find('.radio>span').removeClass('te');
				$(this).find('span').addClass('te');
				This.find('input[type="hidden"]').val($(this).find('span').attr('zyData'));   //  把选中的 数据  存到 input 隐藏域
			})
		})
	});
	
	<!--后台传值处-->
	function radioBox(obj){
		var radio_str=obj.find('.zyData').val();
		obj.find('.radio').find('span').each(function(i,ele){
			if(radio_str==$(ele).attr('zyData')){
				$(ele).addClass('te');
			}
		})
	}
	//radioBox($('.radio_box'));
	<!--后台传值处-->

	/*--------------------------radiu end-----------------*/

	$('.bink_fb').each(function(){
		input_val($(this));
	})
	$('.unbink_fb').off('focus blur');  //  移除焦点事件  只要在元素上加个类就好了
	
	//input的移入移出的焦点函数
	function input_val(obj){
		var $old_val=obj.val();
		obj.focus(function(){
			if(obj.val()==$old_val)obj.val('');
		}).blur(function(){
			if(obj.val()=='')obj.val($old_val);
		})
	}
	
	
	/*-----------------------模糊搜索--------------------------------------*/
	//初始化
function chushi(){ 
		
		$('.zy_mohu').each(function(){
			var This=this;
			if($(This).find('.data_mohu').val()!=''){
				$(This).find('.zy_mohu_ul').find('a').each(function(){
					if($(this).attr('zyData')==$(This).find('.data_mohu').val())
					{
						$(This).find('.zy_mohu_p').html($(this).html());
						$(This).find('.data_mohu').val($(this).attr('zyData'));
						$(This).find('.data_mohu').attr('zhi',$(this).attr('itm'));
					}
				})
			}
		})
		
		
	}

	chushi();
	
	//- 订单下发管理中公司名称只显示当前登录的公司

	$('.zy_mohu_p').each(function(){
		var parents=$(this).parent();
		$(this).unbind('click').bind('click',function(){
			$('.zy_mohu_p').next().next().hide();
			if($(this).next().next().is(':visible')){
				$(this).next().next().hide();
				return false;
			}
			var mohu_arr=[]; // 搜索关键字数据....
			parents.find('a').each(function(){
				mohu_arr.push($(this).text());
			});
			parents.find('.zy_mohu_bao').show().find('li').show();
			parents.find('.zy_mohu_input').focus();
			parents.find('.zy_mohu_input').on('input propertychange',function(){
				var mohu_str=$(this).val();
				$.each(mohu_arr,function(i,val){
					val.indexOf(mohu_str)==-1?parents.find('.zy_mohu_ul').find('li').eq(i).hide():parents.find('li').eq(i).show();
				})
			})
			return false;
		});
		parents.find('.zy_mohu_input').click(function(){return false});
		parents.find('.zy_mohu_ul').delegate('a','click',function(){
			parents.find('.zy_mohu_p').html($(this).html());
			parents.find('.data_mohu').attr('value',$(this).attr('zyData'));
			parents.find('.data_mohu').attr('zhi',$(this).attr('itm'));
		});
		$(document).click(function(){
			$('.zy_mohu_bao').hide();
		});
	});
	
	
	
	
	
/*-------------------施利超版本 radio checked  开始-----------------------*/
	//radio初始化
	$('.radio_wrap').each(function(){
		//$(this).attr('name',$(this).find('input').attr('name'));
		if($(this).find('input').attr('checked')=='checked')
		{
			$(this).addClass('radio_on');
		}
	});
	//radio点击事件
	$('body').delegate('.radio_wrap','click',function(){
		var name=$(this).find('input').attr('name');
		$('input[name="'+name+'"]').parents('.radio_wrap').removeClass('radio_on');
		$(this).addClass('radio_on');
	});
	
	
	//checkbox初始化
	$('.check_wrap').each(function(){
		$(this).find('input').attr('name',$(this).find('input').attr('name'));
		if($(this).find('input').attr('checked')=='checked')
		{
			$(this).addClass('check_on');
		}
	});
	//checkbox点击事件
	$('body').delegate('.check_wrap','click',function(){
		if($(this).hasClass('no_check'))return false;
		var name=$(this).attr('name');
		if($(this).hasClass('check_on')){
			$(this).removeClass('check_on');
		}
		else{
			$(this).addClass('check_on');
		}
		$('.check_wrap').each(function(i,elem){
			if($(elem).find('input[type="checkbox"]').is(":checked"))
			{
				$(elem).addClass('check_on');
			}
			else{
				$(elem).removeClass('check_on');
			}
		});
	});
	//checkbox点击事件
/*-------------------施利超版本 radio checked  结束-----------------------*/	
})