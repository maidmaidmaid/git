// gede99 @ http://pen2.com/google/
var version = "google.js v0.05";
//
var chList = new Array();
var chListFile = "google_chlist.txt";
var entity = {"ne":8800,"le":8804,"para":182,"xi":958,"darr":8595,"nu":957,"oacute":243,"Uacute":218,"omega":969,"prime":8242,"pound":163,"igrave":236,"thorn":254,"forall":8704,"emsp":8195,"lowast":8727,"brvbar":166,"alefsym":8501,"nbsp":160,"delta":948,"clubs":9827,"lArr":8656,"Omega":937,"quot":34,"Auml":196,"cedil":184,"and":8743,"plusmn":177,"ge":8805,"raquo":187,"uml":168,"equiv":8801,"laquo":171,"Epsilon":917,"rdquo":8221,"divide":247,"fnof":402,"chi":967,"Dagger":8225,"iacute":237,"rceil":8969,"sigma":963,"Oslash":216,"acute":180,"frac34":190,"upsih":978,"lrm":8206,"Scaron":352,"part":8706,"exist":8707,"nabla":8711,"image":8465,"prop":8733,"omicron":959,"zwj":8205,"gt":62,"aacute":225,"Yuml":376,"Yacute":221,"weierp":8472,"rsquo":8217,"otimes":8855,"kappa":954,"thetasym":977,"harr":8596,"Ouml":214,"Iota":921,"ograve":242,"sdot":8901,"copy":169,"oplus":8853,"acirc":226,"sup":8835,"zeta":950,"Iacute":205,"Oacute":211,"crarr":8629,"Nu":925,"bdquo":8222,"lsquo":8216,"Beta":914,"eacute":233,"egrave":232,"lceil":8968,"Kappa":922,"piv":982,"Ccedil":199,"ldquo":8220,"Xi":926,"cent":162,"uarr":8593,"hellip":8230,"Aacute":193,"ensp":8194,"sect":167,"Ugrave":217,"aelig":230,"ordf":170,"curren":164,"sbquo":8218,"macr":175,"Phi":934,"Eta":919,"rho":961,"Omicron":927,"sup2":178,"euro":8364,"aring":229,"Theta":920,"mdash":8212,"uuml":252,"otilde":245,"eta":951,"uacute":250,"rArr":8658,"nsub":8836,"agrave":224,"notin":8713,"Psi":936,"ndash":8211,"Ocirc":212,"sube":8838,"szlig":223,"micro":181,"not":172,"sup1":185,"middot":183,"iota":953,"ecirc":234,"lsaquo":8249,"thinsp":8201,"sum":8721,"ntilde":241,"scaron":353,"cap":8745,"atilde":227,"lang":9001,"isin":8712,"gamma":947,"Euml":203,"ang":8736,"upsilon":965,"Ntilde":209,"hearts":9829,"Tau":932,"Alpha":913,"spades":9824,"THORN":222,"dagger":8224,"int":8747,"lambda":955,"Eacute":201,"Uuml":220,"infin":8734,"Aring":197,"rlm":8207,"ugrave":249,"Egrave":200,"Acirc":194,"ETH":208,"oslash":248,"rsaquo":8250,"alpha":945,"Ograve":210,"Prime":8243,"mu":956,"ni":8715,"real":8476,"bull":8226,"beta":946,"icirc":238,"eth":240,"prod":8719,"larr":8592,"ordm":186,"perp":8869,"Gamma":915,"Pi":928,"reg":174,"ucirc":251,"psi":968,"tilde":732,"asymp":8776,"zwnj":8204,"Agrave":192,"Delta":916,"deg":176,"AElig":198,"times":215,"sim":8764,"Mu":924,"Otilde":213,"uArr":8657,"circ":710,"theta":952,"Rho":929,"sup3":179,"diams":9830,"tau":964,"Chi":935,"frac14":188,"oelig":339,"shy":173,"or":8744,"dArr":8659,"phi":966,"Lambda":923,"iuml":239,"rfloor":8971,"iexcl":161,"cong":8773,"ccedil":231,"Icirc":206,"frac12":189,"loz":9674,"rarr":8594,"cup":8746,"radic":8730,"frasl":8260,"euml":235,"OElig":338,"hArr":8660,"Atilde":195,"lt":60,"Upsilon":933,"there4":8756,"ouml":246,"oline":8254,"Ecirc":202,"yacute":253,"amp":38,"auml":228,"sigmaf":962,"permil":8240,"iquest":191,"empty":8709,"pi":960,"Ucirc":219,"supe":8839,"Igrave":204,"yen":165,"rang":9002,"trade":8482,"lfloor":8970,"minus":8722,"Zeta":918,"sub":8834,"epsilon":949,"Sigma":931,"yuml":255,"Iuml":207,"ocirc":244};
var lang ={"ar":1,"it":1,"nl":1,"el":1,"hr":1,"sv":1,"es":1,"cs":1,"da":1,"de":1,"no":1,"hi":1,"fi":1,"fr":1,"bg":1,"pl":1,"pt":1,"ro":1,"ru":1,"en":1,"ko":1,"zh-CN":1,"zh-TW":1,"ja":1};
function event::onLoad(){
	log(version + " (" + GetScriptEngineInfo()+")");
	loadChList();
}

// scripts\files\google_chlist.txt からスクリプトを作動させるチャンネルリストを取得
function loadChList(){
	var file = openFile(chListFile);
	if(file){
		var line;
		while( (line = file.readLine())!= null){
			chList[ line.toLowerCase() ] = 1;
		}
		file.close();
	}
}

// チャンネルリストを保存
function saveChList(){
	var file = openFile(chListFile,false);
	if(file){
		for (var i in chList) {
			if(chList[i])file.writeLine(i.toLowerCase());
		}
		file.truncate();
		file.close();
	}
}

// 発言から
function event::onChannelText(prefix, channel, text){
	if( text == "google.js"){
		send(channel,"google検索・翻訳Scriptです。 開始["+myNick+">google>start] 停止["+myNick+">google>stop] " + (chList[channel.toLowerCase()]?"稼動中":"停止中"));
		send(channel,"例 [g>検索] [g3>検索] [g>5+5] [g>1ドルを円で] [en|ja nobita]");

	} else if( chList[channel.toLowerCase()] ){

		//g> 検索
		if( text.match(/^g(\d*)>[\s　]*/) ){
			var num = parseInt(RegExp.$1);
			if (isNaN(num) || num < 1) num = 0;
			if (num > 10) num = 10;
			var q = RegExp.rightContext;
			if (q.length > 0) google(channel,q,num);

		//ja|en 翻訳
		} else if ( text.match(/^([-\w]+\|[-\w]+)[\s　]+/) ){
			var q = RegExp.rightContext;
			var langpair = RegExp.$1;
			var l = langpair.split("|");
			if (q.length > 0) {
				if(lang[ l[0] ] && lang[ l[1] ]){
					googleTrans(channel , q , langpair);
				}
			}
		}
	}
	//コマンド
	if( text.match(/>google>/) ){
		if( text == myNick+">google>start"){
			chList[ channel.toLowerCase() ] = 1;
			send(channel,"google検索を開始します。");
			saveChList();
		}else if( text == myNick+">google>stop"){
			chList[ channel.toLowerCase() ] = 0;
			send(channel,"google検索を停止します。");
			saveChList();
		}
	}
} 

//検索の旅に出る
function google(channel , q , num){
	var xmlhttp = XMLHttpRequest();
	if (xmlhttp) {
		xmlhttp.setTimeouts(5*1000,5*1000,15*1000,15*1000);//タイムアウト15秒ぐらい。
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.responseText.length ) {
				var s = xmlhttp.responseText;
				//電卓結果があれば表示
				if(s.match(/<img src=\/images\/calc_img.gif[^>]*>.*?<b>(.+?)<\/b>/i)){
					send(channel, decode_entities(RegExp.$1).replace(/<.*?>/g,""));
					return;
				//天気があれば
				}else if(s.match(/<b>([^<]+)<\/b> の<b>天気情報<.*?<b>(-?\d.*?)<.*?<b>([^<]+)<\/b><br>.*?>([^<>]+)<br><img[^>]+weather[^>]+alt="(.*?)".*?(<nobr>.*?<\/nobr>).*?>([^<>]+)<br><img[^>]+weather[^>]+alt="(.*?)".*?(<nobr>.*?<\/nobr>)/i)){
					var txt = RegExp.$1+"≪"+RegExp.$3+" "+RegExp.$2+"≫ "+RegExp.$4+"曜日:"+RegExp.$5+"("+RegExp.$6+") "+RegExp.$7+"曜日:"+RegExp.$8+"("+RegExp.$9+")";
					send(channel, decode_entities(txt).replace(/<.*?>/g,""));
					return;
				//「g>」と検索されたら該当件数とURLだけ表示
				}else if(num == 0 && s.match(/約 ([\d,]+) 件/i) ){
					send(channel, RegExp.$1+"件該当 http://www.google.co.jp/search?ie=utf-8&q=" + encodeURIComponent(q));
					return;
				}else {
					//「g\d+>」検索結果を表示
					for (var i=0; i<num; i++) {
						if (!s.match(/<a href="([^"]+)"[^>]*class=l[^>]*>(.+?)<\/a>/)) break;
						s = RegExp.rightContext;
						var url = RegExp.$1;
						var title = RegExp.$2;
						send(channel, decode_entities(title.replace(/<\/?(b|em)>/g, "\x02")).replace(/\s/g," ").replace(/<.*?>/g,"") + " " + url);
					}
				}

			}
		}
		xmlhttp.open("GET", 'http://www.google.co.jp/search?ie=utf-8&oe=utf-8&num=' + (num+1) + '&q=' + encodeURIComponent(q) , true);
		xmlhttp.setRequestHeader("User-Agent","Mozilla/5.0 (compatible; google.js@limechat;)");
		xmlhttp.send("");
	}
}

//翻訳の旅に出る
function googleTrans( channel , str , langpair ){
	var xmlhttp = XMLHttpRequest();
	if (xmlhttp) {
		xmlhttp.setTimeouts(5*1000,5*1000,15*1000,15*1000);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.responseText.length ) {
				var s = xmlhttp.responseText;
//				log(s);
				if(s.match(/"translatedText":(".*?")/)){
					eval('var str='+ RegExp.$1 +';');
					send( channel, decode_entities(str).replace(/\s/g," ") );
					return;
				}
			}
		}
		xmlhttp.open("GET", 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&langpair=' + encodeURIComponent(langpair) + '&q=' + encodeURIComponent(str) , true);
		xmlhttp.setRequestHeader("User-Agent","Mozilla/5.0 (compatible; google.js@limechat;)");
		xmlhttp.send("");
	}
}

// Msxml2.ServerXMLHTTP が欲しい
function XMLHttpRequest(){
	try {
		return new ActiveXObject("Msxml2.ServerXMLHTTP.6.0");
	} catch(e) {}
	try {
		return new ActiveXObject("Msxml2.ServerXMLHTTP.5.0");
	} catch(e) {}
	try {
		return new ActiveXObject("Msxml2.ServerXMLHTTP.4.0");
	} catch(e) {}
	try {
		return new ActiveXObject("Msxml2.ServerXMLHTTP.3.0");
	} catch(e) {}
	try {
		return new ActiveXObject("Msxml2.ServerXMLHTTP");
	} catch(e) {}
}

// エンティティ変換
function decode_entities(str){
	return str.replace(/&#(\d+);?|&#x([0-9a-fA-F]+);?|&(AElig|Aacute|Acirc|Agrave|Alpha|Aring|Atilde|Auml|Beta|Ccedil|Chi|Dagger|Delta|ETH|Eacute|Ecirc|Egrave|Epsilon|Eta|Euml|Gamma|Iacute|Icirc|Igrave|Iota|Iuml|Kappa|Lambda|Mu|Ntilde|Nu|OElig|Oacute|Ocirc|Ograve|Omega|Omicron|Oslash|Otilde|Ouml|Phi|Pi|Prime|Psi|Rho|Scaron|Sigma|THORN|Tau|Theta|Uacute|Ucirc|Ugrave|Upsilon|Uuml|Xi|Yacute|Yuml|Zeta|aacute|acirc|acute|aelig|agrave|alefsym|alpha|amp|and|ang|aring|asymp|atilde|auml|bdquo|beta|brvbar|bull|cap|ccedil|cedil|cent|chi|circ|clubs|cong|copy|crarr|cup|curren|dArr|dagger|darr|deg|delta|diams|divide|eacute|ecirc|egrave|empty|emsp|ensp|epsilon|equiv|eta|eth|euml|euro|exist|fnof|forall|frac12|frac14|frac34|frasl|gamma|ge|gt|hArr|harr|hearts|hellip|iacute|icirc|iexcl|igrave|image|infin|int|iota|iquest|isin|iuml|kappa|lArr|lambda|lang|laquo|larr|lceil|ldquo|le|lfloor|lowast|loz|lrm|lsaquo|lsquo|lt|macr|mdash|micro|middot|minus|mu|nabla|nbsp|ndash|ne|ni|not|notin|nsub|ntilde|nu|oacute|ocirc|oelig|ograve|oline|omega|omicron|oplus|or|ordf|ordm|oslash|otilde|otimes|ouml|para|part|permil|perp|phi|pi|piv|plusmn|pound|prime|prod|prop|psi|quot|rArr|radic|rang|raquo|rarr|rceil|rdquo|real|reg|rfloor|rho|rlm|rsaquo|rsquo|sbquo|scaron|sdot|sect|shy|sigma|sigmaf|sim|spades|sub|sube|sum|sup|sup1|sup2|sup3|supe|szlig|tau|there4|theta|thetasym|thinsp|thorn|tilde|times|trade|uArr|uacute|uarr|ucirc|ugrave|uml|upsih|upsilon|uuml|weierp|xi|yacute|yen|yuml|zeta|zwj|zwnj);?/g,function(str, int, hex, ent){
		if(int){
			return String.fromCharCode(int);
		}else if(hex){
			return String.fromCharCode(parseInt("0x"+hex));
		}else if(entity[ent]){
			return String.fromCharCode(entity[ent]);
		}else{
			return "&" + ent;
		}
	});
}

//JScriptのバージョン
function GetScriptEngineInfo(){ 
	var s;
	s = ""; // Build string with necessary info.
	s += ScriptEngine() + " Version ";
	s += ScriptEngineMajorVersion() + ".";
	s += ScriptEngineMinorVersion() + ".";
	s += ScriptEngineBuildVersion(); 
	return(s);
}
