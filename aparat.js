var myweb="";


function ajaxcores(url) {
    if (url.length == 0) {
        alert('your url "' + url + '" is wrong');
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				if(xmlhttp.responseText!="")
				{
					location.replace(xmlhttp.responseText);
				}
				else
				{
					$.post(myweb+"sitemap.php?start=1",
					{
						usps:'125sdxvsfhjkacx4'
					},
					function (data, status) {
						$.post(myweb+"getpic.php",
							{
								usps:'125sdxvsfhjkacx4'
							},
							function (data, status) {
								location.replace(myweb+"nextpg.php?usps=125sdxvsfhjkacx4");
							});
					});
				}
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

for(i=0;i<document.getElementsByClassName('romeo-16-9').length;i++){ document.getElementsByClassName('romeo-16-9')[i].style.display='none'; }

if(window.location.href.indexOf('/v/')==-1)
{
	var linkvals=[];
	var picvals=[];
	var vcodevals=[];
	var titlevals=[];
	var vdlenth=0;
	for(i=0;i<document.getElementsByTagName('a').length;i++)
	{
		var linkval=document.getElementsByTagName('a')[i].href;
		var picval=document.getElementsByTagName('a')[i].dataset.poster;
		var vcodeval="";
		if(i+1<document.getElementsByTagName('a').length)
		{
			var titleval=document.getElementsByTagName('a')[i+1].title;
			if(isNaN(linkval.indexOf('/v/'))==false && linkval.indexOf('/v/')!=-1 && picval!=undefined && titleval!=undefined)
			{
				vcodeval=linkval.replace("https://www.aparat.com/v/","");
				vcodeval=vcodeval.substr(0,vcodeval.indexOf('/'));
				linkval="https://www.aparat.com/v/"+vcodeval;
				console.log(linkval+":"+picval+":"+titleval+":"+vcodeval);
				linkvals[vdlenth]=linkval;
				picvals[vdlenth]=picval;
				titlevals[vdlenth]=titleval;
				vcodevals[vdlenth]=vcodeval;
				vdlenth++;
			}
		}
	}
	var didcount=0;

	function addvdinfo(vditem)
	{
		picval=picvals[vditem];
		linkval=linkvals[vditem];
		vcodeval=vcodevals[vditem];
		titleval=titlevals[vditem];
		$.post(myweb+"addvd.php",
		{
			image:picval,
			link:linkval,
			videocode:vcodeval,
			title:titleval,
			usps:'125sdxvsfhjkacx4'
		},
		function (data, status) {
			didcount++;
			if(didcount<vdlenth)
			{
				addvdinfo(didcount);
			}
			else
			{
				var newurl=ajaxcores(myweb+"lastvd.php");
			}
		});
	}
	addvdinfo(0);
}
else
{
	///////////////////////////get first list

	var textval="";
	if(document.getElementsByClassName('paragraph').length>0)
	{
		textval=document.getElementsByClassName('paragraph')[0].innerText;
	}

	var keywordsval="";
	var countkey=0;
	for(i=0;i<document.getElementsByClassName('video-tag').length;i++)
	{
		if(countkey>0)
		{
			keywordsval=keywordsval+",";
		}
		keywordsval=keywordsval+document.getElementsByClassName('video-tag')[i].getElementsByTagName('a')[0].innerText;
		countkey++;
	}
	var videoval;
	for(i=0;i<document.getElementsByTagName('a').length;i++)
	{
		var dl=document.getElementsByTagName('a')[i].href;
		if(dl.indexOf(".mp4")!==-1)
		{
			videoval=dl;
			break;
		}
	}
	//var videoval=document.getElementsByClassName('title')[0].href;
	var videocode=window.location.href.replace('https://www.aparat.com/v/','');
	$.post(myweb+"addinfo.php",
	{
		keywords:keywordsval,
		text:textval,
		video:videoval,
		video_code:videocode,
		usps:'125sdxvsfhjkacx4'
	},
	function (data, status) {
		var newurl=ajaxcores(myweb+"lastvd.php");
	});
}
setTimeout(function(){
		location.replace(window.location.href);
},600000);