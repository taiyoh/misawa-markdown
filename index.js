;(function(win, doc) {

function get_url(url) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange =  function() {
		//readyState値は4で受信完了
		if (xhr.readyState == 4){ 
        	//コールバック
	        on_loaded(xhr.responseText);
    	}
    };
    // Implemented elsewhere.
	xhr.open("GET", url, true);
	xhr.send();
}

function on_loaded(txt) {
    //レスポンスを取得
    var d = doc.implementation.createHTMLDocument(''),
        range = doc.createRange(),
        entry, title, img;

    range.selectNodeContents(d.documentElement);
    range.deleteContents();

    d.documentElement.appendChild(range.createContextualFragment(txt));
    entry = d.documentElement.querySelector('div.entry_area');
    title = entry.querySelector('h2').innerText.replace(/^惚れさせ.+\s+「(.+?)」/, '$1');
    img   = entry.querySelector('div.entry div.jgm_entry_desc_mark img').src;
 	//![代替テキスト](画像のURL)
 	doc.querySelector('.output').innerHTML = '<h4>' + title + '</h4>'
 		+ '<div class="image"><img src="'+img+'" height="240" /></div>'
 		+ '<div class="markdown">!['+title+']('+img+')</div>';
}

win.addEventListener('load', function() {

doc.getElementById('misawa').addEventListener('click', function() {
	var inputs = document.getElementsByTagName('input'),
	    i = 0, e, url = '';
	for (; e = inputs[i]; ++i) {
		if (e.type == 'text') {
			url = e.value;
			break;
		}
	}
	console.log("url", url);
	if (/^http:\/\/jigokuno/.test(url)) {
		get_url(url);
	}
});

doc.getElementById('clear').addEventListener('click', function() {
	doc.querySelector('.output').innerHTML = '';
});

chrome.tabs.getSelected(null, function(tab) {  
	if (tab.url.indexOf('http://jigokuno') == 0) {  
		doc.querySelector('#url').value = tab.url;
	}
	else {  
	    doc.querySelector('#url').value = 'http://jigokuno.com/';
	}
});

});

})(this, document);
