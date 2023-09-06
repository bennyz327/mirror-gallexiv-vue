$(function(){
	var delParent;
	var defaults = {
		fileType         : ["jpg","png","bmp","jpeg"],   // 上傳圖片類型
		fileSize         : 1024 * 1024 * 10                  // 上傳圖片大小 10MB
	};

	// 	點選圖片的外框時
	$(".file").change(function(){
		var idFile = $(this).attr("id");
		var file = document.getElementById(idFile);
		var imgContainer = $(this).parents(".z_photo"); //存放圖片的父元素
		var fileList = file.files; //獲取圖片檔案
		var input = $(this).parent(); //獲取文本框
		var imgArr = [];

		//遍歷

		var numUp = imgContainer.find(".up-section").length;
		var totalNum = numUp + fileList.length;  //總數量
		if(fileList.length > 20 || totalNum > 20 ){
			alert("上傳圖片不可超過20張");
		}
		else if(numUp <= 20){
			fileList = validateUp(fileList);
			for(var i = 0;i<fileList.length;i++){
			 var imgUrl = window.URL.createObjectURL(fileList[i]);
			     imgArr.push(imgUrl);
			 var $section = $("<section class='up-section fl loading'>");
			     imgContainer.append($section);
			 var $span = $("<span class='up-span'>");
			     $span.appendTo($section);

		     var $img0 = $("<img class='close-upimg'>").on("click",function(event){
				    event.preventDefault();
					event.stopPropagation();
					$(".works-mask").show();
					delParent = $(this).parent();
				});
				$img0.attr("src","/src/assets/Picture/upload/deleteButton.png").appendTo($section);
		     const $img = $("<img class='up-img up-opcity'>");
		         $img.attr("src",imgArr[i]);
		         $img.appendTo($section);
		     var $p = $("<p class='img-name-p'>");
		         $p.html(fileList[i].name).appendTo($section);
		     var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
		         $input.appendTo($section);
		     var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
		         $input2.appendTo($section);

		   }
		}
		setTimeout(function(){
             $(".up-section").removeClass("loading");
		 	 $(".up-img").removeClass("up-opcity");
		 },450);
		 numUp = imgContainer.find(".up-section").length;
		if(numUp > 20){
			$(this).parent().hide();
		}
	});



    $(".z_photo").delegate(".close-upimg","click",function(){
     	  $(".works-mask").show();
     	  delParent = $(this).parent();
	});

	$(".wsdel-ok").click(function(){
		$(".works-mask").hide();
		var numUp = delParent.siblings().length;
		if(numUp < 20){
			delParent.parent().find(".z_file").show();
		}
		 delParent.remove();
	});

	$(".wsdel-no").click(function(){
		$(".works-mask").hide();
	});

		function validateUp(files){
			var arrFiles = [];//替換文件陣列
			for(var i = 0, file; file = files[i]; i++){
				//名稱上傳的後綴名稱
				var newStr = file.name.split("").reverse().join("");
				if(newStr.split(".")[0] != null){
						var type = newStr.split(".")[0].split("").reverse().join("");
						console.log(type+"===type===");
						if(jQuery.inArray(type, defaults.fileType) > -1){
							// 類型符合才可上傳
							if (file.size >= defaults.fileSize) {
								alert(file.size);
								alert('檔案名稱: "'+ file.name +'"的項目太大');
							} else {
								// 判斷所有文件
								arrFiles.push(file);	
							}
						}else{
							alert('檔案名稱: "'+ file.name +'"上傳類型不符合');
						}
					}else{
						alert('檔案名稱: "'+ file.name +'"類型無法識別');
					}
			}
			return arrFiles;
		}
})
