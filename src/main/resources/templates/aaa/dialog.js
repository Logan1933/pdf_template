;(function(){
	$.extend($,{
		AsyncDialogBox:function(options){//公共弹出框

			var defaults = {
				id:'ui-async-container-'+new Date().getTime(),
				isDrag:true,//是否拖拽
				url:null,//ajax地址
				param:null,//参数
				title:null,
				width:500,
				height:null,
				appendHTML:null,
				path:RESOURCE_PATH+'base/',
				isCloseButton:true,//是否有关闭按钮
				imgbox:{
					alphaBackground:'images/piel_master_1.png',
					loadBackground:'images/load.gif',
					closeBackground:'images/ico_2.png'
				},
				callback:function(){},
				closeCallBack:function(){}
			};
			
			var options  = $.extend(true,defaults,options);
			
			var S={
				init:function(){
					if($('#'+options.id).length<=0){
						var str='';
						str+=options.title==null?'':'<div class="ui-master-head">'+options.title+'</div>';
						str+=options.isCloseButton?'<div class="ui-master-close" style="background-image:url('+options.path+options.imgbox.closeBackground+');"></div>':'';
						$('body').append('<div id="'+options.id+'" class="ui-master-container"><div class="ui-master-content" id="zy">'+str+'<div class="ui-master-body" ></div></div></div>');
						var $obj=$('#'+options.id),
							$content=$obj.children(),
							T=options.title==null?0:49,
							W=$(window).width(),
							H=$(window).height(),
							tH=$(window).scrollTop(),
							bH=$('body').height(),
							h=$content.height();
						$obj.css({
							'z-index': new Date().getTime().toString().substr(9),
							'height':Math.max(H,bH),
							'background':'url('+options.path+options.imgbox.alphaBackground+') repeat'
						});
						
						$content.css({'display':'none'});
						
						if(options.isCloseButton){
							$('.ui-master-close',$obj).unbind('click').bind('click',S.removeDialogBox);	
							$(document).unbind('keypress',S.keyBoardClose).bind('keypress',S.keyBoardClose);		
						};
						if(options.title!=null&&options.isDrag){
							$obj.dragDialogBox({dragClassName:'ui-master-head',dragContent:$content});
						};
						function main(data){
							var $container=$('.ui-master-body',$obj);
							$container.append(data);
							$content.show();
							var zyHh=options.height==null? $("#zy").get(0).scrollHeight:options.height
							$content.css({
								'position':'fixed',
								'width':options.width,
								'height':options.height==null?'auto':options.height,
								'margin-left':-options.width*0.5,
								'overflow':'hidden'
							}).css({'top':($(window).height()-zyHh)/2});
						
							var $main=$container.children(':last')
								st=$content.offset().top,
								width=$main.outerWidth(true)+parseInt($container.css('padding-left'))+parseInt($container.css('padding-right')),
								height=$content.height(),
								ml=-width*0.5,
								mt=(height+10)>H?Math.max(H,bH)-st-height-10>=0?(options.height-H+T+50)*0.5:Math.max(H,bH)-st-height-30:(options.height+T-height)*0.5;
								//$content.css({'width':width,'margin-left':ml});
								
								$main.hide().css('visibility','visible').fadeIn(options.fadeSpeed,function(){
									$content.css({overflow:'visible'});
									options.callback($content,S.removeDialogBox);	
								});
							
						};	
						if(options.url==null){
							main(options.appendHTML);	
						}else{
							function ajax(status){
								$.ajax({
									url:options.url,
									data:options.param,
									type:"post",
									dataType:"text",
									success:function(data){
										main(data);
									},
									error:function(){
										if(status){
											setTimeout(function(){
												$('.ui-master-body',$obj).html('<div style="position:absolute;display:none;left:0px;top:50%;margin-top:-20px;width:100%;height:40px;font-size:18px;color:#666;line-height:40px; text-align:center;">服务器连接失败,<a href="javascript:;" class="ui-dialog-reload">点击刷新</div>').children().fadeIn(400);		
												$('.ui-dialog-reload',$obj).unbind('click').bind('click',function(){
													$('.ui-master-body',$obj).html('<img style="position:absolute;left:50%;top:50%;margin:-5px 0px 0px -12px;" src="'+options.path+options.imgbox.loadBackground+'" width="27" height="10" />');
													ajax(true);
												});	
											},100);
										}else{
											$('.ui-master-body',$obj).animate({'height':options.height+100},800,function(){
												$(this).html('<div style="position:absolute;display:none;left:0px;top:50%;margin-top:-20px;width:100%;height:40px;font-size:18px;color:#666;line-height:40px; text-align:center;">服务器连接失败,<a href="javascript:;" class="ui-dialog-reload">点击刷新</div>').children().fadeIn(400);		
											});
											$content.animate({'width':options.width+100,'margin-left':-(options.width+100)*0.5,'height':h+100,'margin-top':-50},800,'easeOutBack',function(){
												$('.ui-dialog-reload',$obj).unbind('click').bind('click',function(){
													$('.ui-master-body',$obj).html('<img style="position:absolute;left:50%;top:50%;margin:-5px 0px 0px -12px;" src="'+options.path+options.imgbox.loadBackground+'" width="27" height="10" />');
													ajax(true);
												});
											});	
										};
									}	
								});		
							};
							ajax();
						};
					};
				},
				removeDialogBox:function(){
					$('#'+options.id).fadeOut(300,function(){
						$(this).remove();
						options.closeCallBack();
					});
				},
				keyBoardClose:function(e){
					if(e.keyCode == 27){
						S.removeDialogBox();
					};		
				}	
			};
			S.init();
		},
		
		Bconfirm:function(options){//确认框  带ajax
			var defaults = {
				id:'ui-confirm-item'+new Date().getTime(),
				title:'警告',
				text:'请输入您的提示文字内容',
				sureBtnText:'确认',
				cancelBtnText:'关闭',
				isDrag:true,
				path:RESOURCE_PATH+'base/',
				width:330,
				speed:300,
				param:null, 
				url:null, 
				linkStatus:false, 
				sureButtonClass:'ui-confirm-sure-button',
				cancelButtonClass:'ui-confirm-close-button',
				imgbox:{
					alphaBackground:'images/piel_master_1.png'
				},
				callback:function(){}   //回调函数
			};
			var options  = $.extend(true,defaults,options); 	
			if($('#'+options.id).length<=0){ //添加demo
				$('body').append('<div class="ui-master-container" id="'+options.id+'"  ><div class="ui-confirm-container"><h3 class="ui-confirm-title">'+options.title+'</h3><div class="ui-confirm-content">'+options.text+'</div><div class="ui-confirm-button"><span class="blue '+options.sureButtonClass+'">'+options.sureBtnText+'</span><span class="white '+options.cancelButtonClass+'">'+options.cancelBtnText+'</span></div></div></div>');
				var $obj=$('#'+options.id),
					$content=$obj.children(),
					W=$(window).width(),
					H=$(window).height(),
					tH=$(window).scrollTop(),
					bH=$('body').height(),
					h=$content.height();
				$obj.css({
					'z-index':new Date().getTime(),
					'height':Math.max(H,bH),
					'background':'url('+options.path+options.imgbox.alphaBackground+') repeat'
				});
				$content.css({
					'position':'absolute',
					'opacity':0,
					'display':'none',
					'width':options.width,
					'margin-left':-options.width*0.5-50,
					'top':tH+(H-h)*0.5,
					'margin-top':-30
				}).show().animate({opacity:1,'margin-top':0},options.speed,function(){
					if(options.isDrag){
						$obj.dragDialogBox({dragClassName:'ui-confirm-title',dragContent:$content});
					};
					if(options.linkStatus){
						options.callback($content);
					}else{
						$('.'+options.cancelButtonClass,$obj).unbind('click').bind('click',closeContent);//关闭
						$(document).unbind('keypress',keyBoardClose).bind('keypress',keyBoardClose);//ESC键退出
						$('.'+options.sureButtonClass,$obj).unbind('click').bind('click',sureContent);//确认	
					};
					function keyBoardClose(e){
						if(e.keyCode == 27){
							closeContent();
						};		
					};
					function sureContent(){
						if(options.url==null){
							closeContent();
							options.callback();
						}else{
							var $target=$(this);
							if($target.data('click')==undefined){
								$.ajax({
									url:options.url,
									data:options.param,
									type:"post",
									dataType:"json",
									beforeSend:function(){
										$content.append('<div id="ui-master-loading" style="position:absolute;left:0px;right:0px;top:0px;bottom:0px;z-index:9999999999;"></div>');
									},
									success:function(data){
										closeContent();
										options.callback();
									},
									error: function(data){
										//以下为error状态下的提示
										/*$.Bstatus({
											title:'系统提示',
											html:'服务器故障，请稍后再试！',
											status:false,
											callback:function(){
												$('#ui-master-loading').remove();
											}
										});	*/
										
										//以下code放到success下
										closeContent();
										options.callback();
									}	
								});	
							};
						};
					};
					function closeContent(callback){   //关闭函数
						$obj.fadeOut(options.speed,function(){
							$obj.remove();
						});
						$content.stop().animate({opacity:0,'margin-top':30},options.speed);
					};
				});
			};
		},
		Bstatus:function(options){//提示状态框  alert
			var defaults = {
				title:'系统提示',
				html:'提示信息文字',
				status:true,
				width:415,
				speed:300,
				isCloseBtn:true,
				isDrag:true,
				//path:RESOURCE_PATH+'components/',
				id:'ui-status-'+new Date().getTime(),
				imgbox:{
					alphaBackground:RESOURCE_PATH+'base/images/piel_master_1.png',
					closeBackground:RESOURCE_PATH+'base/images/ico_2.png',
					trueBackground:RESOURCE_PATH+'base/images/ico14.png',
					errorBackground:RESOURCE_PATH+'base/images/ico13.png'
				},
				operate:{
					href:'javascript:;',
					closeClassName:'async-status-close',
					closeHTML:'关闭',
					callback:function(){}
				},
				isCloseContent:true,//回调是否默认关闭窗口再执行回调
				callback:function(){}
			};
			var options=$.extend(true,defaults,options); 
			if($('#'+options.id).length<=0){
				var str=options.isCloseBtn?'<div class="ui-master-close" style="background-image:url('+options.imgbox.closeBackground+');"></div>':'',
					spr=options.status?'<img src="'+options.imgbox.trueBackground+'" />':'<img src="'+options.imgbox.errorBackground+'" />';
				$('body').append('<div class="ui-master-container"id="'+options.id+'"><div class="ui-master-content"><div class="ui-master-head">'+options.title+'</div>'+str+'<div class="ui-master-body"><div class="async-status-container"><div class="async-status-content">'+spr+options.html+'</div><a href="'+options.operate.href+'"class="'+options.operate.closeClassName+'">'+options.operate.closeHTML+'</a></div></div></div></div>');
				var $obj=$('#'+options.id),
					$content=$obj.children(),
					W=$(window).width(),
					H=$(window).height(),
					tH=$(window).scrollTop(),
					bH=$('body').height(),
					h=$content.height();
				$obj.css({
					'z-index':new Date().getTime(),
					'height':Math.max(H,bH),
					'background':'url('+options.imgbox.alphaBackground+') repeat'
				});
				$content.css({
					'position':'absolute',
					'top':tH+(H-h)*0.5,
					'opacity':0,
					'display':'none',
					'width':options.width,
					'margin-left':-options.width*0.5,
					'margin-top':-30
				}).show().animate({opacity:1,'margin-top':0},options.speed,function(){
					if(options.isDrag){
						$obj.dragDialogBox({dragClassName:'ui-master-head',dragContent:$content});
					};
					if(options.isCloseBtn){
						$('.ui-master-close',$obj).unbind('click').bind('click',function(e){
							e.stopPropagation();
							closeContent();		
						});
						$(document).unbind('keypress',keyBoardClose).bind('keypress',keyBoardClose);		
					};
					if(options.operate.closeClassName!=''){
						$('.'+options.operate.closeClassName,$obj).unbind('click').bind('click',function(e){
							e.stopPropagation();
							options.isCloseContent?closeContent():options.operate.callback(closeContent);
						});		
					};
					function keyBoardClose(e){
						e.stopPropagation();	
						if(e.keyCode == 27){
							closeContent();
						};		
					};
					function closeContent(){
						$obj.fadeOut(options.speed,function(){
							$obj.remove();
							options.callback();	
						});
						$content.stop().animate({opacity:0,'margin-top':30},options.speed);
					};
				});
			};
		}
		
	});	
})(jQuery);