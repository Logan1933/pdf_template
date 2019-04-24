
$(function(){ 
	if('post'==$('#search_model').val())
	{
		$('.cearch_button').unbind('click').bind('click',cearch_button_search);//查询数据  
	}else if('auction'==$('#search_model').val()){
		$('.cearch_button').unbind('click').bind('click',tabQuery);//查询数据  
	}else if('trade'==$('#search_model').val()){
		$('.cearch_button').unbind('click').bind('click',queryData);//查询数据  
	}
	shop_message_search();
});

cearch_button_search=function(){ 
	$("#formsearch").submit();  
}
//购物车数量查询
shop_message_search=function(){ 
	$.ajax({
		url:CONTEXT_PATH+'/index/emall/storeShopSum',
		data:null,
		type:"post",
		dataType:"text",
		success:function(data){
			if(data!=0){
				$('#bid_count').addClass("pop_num_r");
				$('#bid_count').html(data);
				$('#shopCar_count').addClass("tab-sub J-count");
				$('#shopCar_count').html(data);
			}/*else{ 
				$('.pop_num_r').remove();
			}*/
		},
		error:function(){ 
			/*$('#bid_count').html("");*/
		}
	});
}