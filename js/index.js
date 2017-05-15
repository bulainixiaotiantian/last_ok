// JavaScript Document


//首页轮播图-----------------------------------------------------
$(function(){
	anto();
	function anto(){
		var currentIndex=1;
		var currentPicIndex=0;
		var timer;
		var currtent="";
		var deplay=3000;

		$("#sliderA").hover(function(){
		   
		   clearInterval(timer);
		},function(){
		   timer=setInterval(palyBanner,deplay);
		   
		});


		//加载后让第一个图片显示的zindex值为1；
		$("#sliderA ul").find("li").first().css("zIndex",currentIndex);

		//动态生成span按钮
		$('#sliderA ul li').each(function(i){
			currtent+="<span>"+(i+1)+"</span>";
		});
		//让第一个按钮有current的class
		$("#banner-nav").html(currtent).find("span").first().removeClass().addClass("current");
		//遍历span对象集合绑定鼠标事件
		$("#banner-nav span").each(function(index){
			
			$(this).on("mouseenter",function(e){
				e.stopPropagation();
				$(this).removeClass().addClass("current").siblings().removeClass().addClass("normal");
				
				$("#sliderA ul").find("li").eq(index).css({"left":$("#sliderA ul").find("li").first().width(),"zIndex":currentIndex++}).animate({"left":0});
				currentPicIndex=index;
			});
		});

		clearInterval(timer);
		timer=setInterval(palyBanner,deplay);
		var num=$("#banner-nav").find("span").length;

		function palyBanner(){
			var curIndex=currentPicIndex+1;
			
			if(curIndex==num)curIndex=0;
			
			$("#banner-nav").find("span").eq(curIndex).trigger("mouseenter")
		};

	}
 //二级菜单--------------------------------------------------
      menu();
	function menu(){
		var timer;
		 
		 $("#ty").find("li").hover(
			 function(){
				 //获得id值
				 //移进每一个li时，先清除一下定时器
				 clearTimeout(timer);
				 var id=$(this).attr("data-index");
				 //alert(id)
				 //重置每一个li
				 $(this).removeClass().addClass("ac").siblings().removeClass();
				 $(".popup").show().find("#section"+id).show().siblings().hide(); 
			 },
			function(){
				//鼠标离开每一个li时，开启定时器
				clearTimeout(timer);
				timer=setTimeout(auto,200);
			}
		);

		function auto(){	
			$("#ty").find("li").removeClass();
			$(".popup").hide();	
		};
		$(".popup").hover(
			function(){
				clearTimeout(timer);
			},function(){
				console.log(auto);
				timer=setTimeout(auto,200);
			}
		);
	
	
	};
	 
	//楼层导航--------------------------------------
	
       
		

    $(window).scroll(function(){
		
		
		var scrotop=$(document).scrollTop();
		//当页面的scrolltop大于1400时，让楼层导航按钮显示
		if(scrotop>1400){	
		    $(".m_elevator").show();
			$(".m_elevator").find("li").eq(0).addClass("ac");
	    }else{
			$(".m_elevator").hide();
		};
		
		
		var atrr_show=[];
		
		$(".floor").each(function(index){
//当每个楼层出现在屏幕高度一半处时，将对应的下标塞进数组，
//反之从数组中删除该下标
			if($(this).offset().top-$(document).scrollTop()<$(window).height()/2){
				atrr_show.push(index)
			}else{
				atrr_show.splice(index,1)
			};
		});
		//始终让数组最后一个元素的下标成为变颜色的楼层按钮的索引
		var num=atrr_show.length-1;
		$(".m_elevator").find("li").eq(num).removeClass()
		.addClass("ac").siblings().removeClass();
		
		

	});
	
	$(".m_elevator").find("li").each(function(index){
			$(this).on("click",function(){
				$(this).removeClass().addClass("ac").siblings().removeClass();
			
				var scroll_flo=$(".floor").eq(index).offset().top;
				
				//window.scrollTo(0,scroll_flo)
				$("html,body").animate({
                        scrollTop:scroll_flo
                    },"slow")
			});
			
			
	});
	
	
	//选项内容切换
	
	 tabal("#first_floor_oul","#first_floor",".con");
	 tabal("#two_floor_oul","#two_floor",".con_b");
	function tabal(id,id2,con){
		$(id).find("li").each(function(index){
		
			$(this).mouseover(function(){
				$(this).addClass("aa").siblings().removeClass();
				$(id2).find(con).eq(index).show().siblings(con).hide();
				
			});
	    });
	};
	
	//详情页-------------
	//放大镜-------------------------------------
	
	$(".pic_list").find("li").each(function(index){
		$(this).on("mouseover",function(){
			$(this).removeClass().addClass("cc").siblings().removeClass();
			$(".shop_pic .pic").find("img").eq(index).show().siblings().hide();
			$(".big_pic").find("img").eq(index).show().siblings().hide();
		});
		

		$(".shop_pic .pic").mousemove(function(e){
			$(".move_box").show();
			$(".big_pic").show();
			
			var scrollY=$(document).scrollTop();
			
			var clienX=e.clientX;
			var clienY=e.clientY+scrollY;

			var disX=clienX-$(".shop_pic .pic").offset().left-($(".move_box").width()/2);
			var disY=clienY-$(".shop_pic .pic").offset().top-($(".move_box").height()/2);
			
			if(disX<0){
				disX=0;
			};
			if(disY<0){
				disY=0;
			};
			if(disX>$(".shop_pic .pic").width()-$(".move_box").width()){
				disX=$(".shop_pic .pic").width()-$(".move_box").width();
			};
			if(disY>$(".shop_pic .pic").height()-$(".move_box").height()){
				disY=$(".shop_pic .pic").height()-$(".move_box").height();
			};
			 $(".move_box").css({"left":disX,"top":disY});
			 
			rateX=disX/($(".shop_pic .pic").width()-$(".move_box").width());
			rateY=disY/($(".shop_pic .pic").height()-$(".move_box").height());
			
			bigX=rateX*($(".big_pic").width()-$(".big_pic").children().first().width());
			bigY=rateY*($(".big_pic").height()-$(".big_pic").children().first().height());
			
	       
			$(".big_pic").children().css({"left":bigX,"top":bigY});
			
			
			
  
		});
		
		$(".shop_pic .pic").mouseout(function(){
			$(".move_box").hide();
			$(".big_pic").hide();
			
		});
		
		
		
		
		
		
		
		
	});
	
	
	
	
	
	
	
	
	
	
	
	//切换样式-------------------------------------
	$(".sele_type").find("dd").each(function(index){
		$(this).on("click",function(){
			$(this).removeClass().addClass("sele_dd").siblings().removeClass();
		});
		
	});

	//数量加减-----------------------------------
	con_num();
	function con_num(){
		var n=0;
	//$(".con_num").text(n);
		$(".shop_num").find("span").each(function(index){
			$(this).on("click",function(){
				switch(index){
					case 0:
					n++;
					
					$(".con_num").html(n);
					break;
					case 1:
					n--;
					
					if(n<0){
						n=0;
					};
					$(".con_num").text(n);
					break;
				}
		
        	});
			
		});

	}
	

	
	//内容选项卡切换--
	$(".shop_bot_ti ul").find("li").each(function(index){
		$(this).on("click",function(){
			$(this).removeClass().addClass("shop").siblings().removeClass();
			var img=$(".shop_bot_text").find("img");
			var src=img.attr("src");
			if(src=="images/sss_03.png"){
				img.attr("src","images/sss_04.png");
			}else{
				img.attr("src","images/sss_03.png");
			};
			
		});
		
	});
	
	
	
	
	
});







