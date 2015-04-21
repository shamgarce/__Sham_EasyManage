///------------------------------------------------前置运算

jsbasew	= "/M/";				//js基础地址

debug = false;
if(!debug)$.ajaxSetup({cache: true});	//加上getajax缓存

var arr_dialog_art=[];
//=======================================================	//独立函数 io / dorefresh

jQuery.extend({
/*
width: '100%',      
height: '100%',      
left: '0%',     
top: '0%',    
  
fixed: true,      
resize: false,      
drag: false,
lock: true,

background: '#600', // 背景色
opacity: 0.87,	// 透明度
icon: 'error',
*/		
	
	CK:function(option) {

		var getdefaults = {
			width 	: '',
			height 	: '',
			left 	: '',
			top 	: '',
			
			fixed 	: '',
			resize 	: '',
			drag 	: '',
			
			background :'',
			opacity : '',
			icon 	: '',
			//content: nrs,

			

			rndid	: '',
			url		: '',
			//==============================================
			//ok		: false,
			cancel	: false,

			buttonok:true,
			buttoncancel:false,
			callback:false,
			//==============================================
			rel		: '',
			id		: '',
			title	: '',
			lock	: true,
			style	: 'popup'
		};
		
		var getoption = function(option){
			if(!option.rel)	{console.log('miss rel');return false;}
			var now = new Date();
			var rndid = now.getTime() + 1000000000000 + Math.round(Math.random() * (9999999999999 - 1000000000000));   
			option.id = rndid;
			option.title 	= (option.title == null)? option.rel:option.title;
			option.lock 	= (option.lock == false || option.lock == '')	? false:true;
			option.style	= 'popup';
			return option
		}
		option = $.extend({}, getdefaults, getoption(option));
		arr_dialog_art.push(option.id);			//入栈
		
		//------------------------------------------------

		var okb = (option.buttonok == false || option.buttonok == null)?'':function () {
				if(typeof(this.opt) == 'object'){
					//------------------------------------------------
					var fun = this.opt.ok;
					if(typeof(fun) == 'function'){
						var result = this.opt.ok();
						if(typeof(result) == 'boolean'){
							if(!result)	return false;
						}
						if(typeof(result) == 'object'){
							if(result.code <0){
								if(result.msg)art.dialog(result.msg).time(0.5);
								return false;
							}else{
								if(result.msg) art.dialog(result.msg).time(0.5);
							}
						}
					}
					//------------------------------------------------
				}
				if(typeof(option.callback) == 'function')option.callback();
		}
		
		var htmlget = function(option){
			option.url = option.rel;
			options = {
				url : option.url,
				dataType: "html",
				async:false,
				cache:true
			};
			return $.ajax(options).responseText;
		}
		
		var dorefresh = function(option){
			var nr = Wr.htmlget(option);
			art.dialog.list[option.id].content(nr);
		};	
		
		var dopopup = function(option){
			
			var vdia = art.dialog({
//				id: option.id,
				lock:true,
				title: option.title,
	
//				width 	: option.width,
//				height 	: option.height,
//				left 	: option.left,
//				top 	: option.top,
				
//				fixed 	: option.fixed,
//				resize 	: option.resize,
//				drag 	: option.drag,
//				lock 	: option.lock,
				
//				background :option.background,
//				opacity : option.opacity,
//				icon 	: option.icon,
				//content: nrs,
				ok: okb,
				cancel:option.buttoncancel
			});
			
			var nrs = htmlget(option);
			vdia.content(nrs);			
			
		};
		
		_option = option;
		dopopup(option);
		
		//Wr.F(option);
	},
	

});