var GoogleTranslateDialog = {

    init : function() {
        var selectedContent = tinyMCE.activeEditor.selection.getContent({format : 'text'});
        if (selectedContent == '') {
           selectedContent = tinyMCE.activeEditor.getContent(); /*{format : 'text'});*/
        }
        var el = document.getElementById('iframecontainer');
	 el.innerHTML = '<iframe id="iframe" frameBorder="0" style="border: 1px solid gray"></iframe>';
	 var ifr = document.getElementById('iframe');
        var doc = ifr.contentWindow.document;
        doc.open();
        doc.write(selectedContent);
	 doc.close();
        this.resize();
    },

    resize : function() {
        var vp = tinyMCEPopup.dom.getViewPort(window), el;
        el = document.getElementById('iframe');
        if (el) {
            el.style.width  = (vp.w - 25) + 'px';
            el.style.height = (vp.h - 110) + 'px';
        }
    },

    translateText : function(ln) {
        var selectedContent = '';
        var format = "";
        var prettyprint = "";
        var textonly = document.getElementById('textonly').checked;
        if (textonly) {
            selectedContent = tinyMCE.activeEditor.selection.getContent({format : 'text'});
            if (selectedContent == '') {
                selectedContent = tinyMCE.activeEditor.getContent({format : 'text'});
            }
            format = '&format=text';
            prettyprint = '&prettyprint=true';
        } else {
            selectedContent = tinyMCE.activeEditor.selection.getContent();
            if (selectedContent == '') {
                selectedContent = tinyMCE.activeEditor.getContent();
            }
            format = '&format=html';
            prettyprint = '&prettyprint=false';
        }
        var question = selectedContent.match( /[^\.!\?]+[\.!\?]+/g );
        if (question == null ) {
            question = [selectedContent];
        }
        var out = '';
        var source = '';
        var target = '&target=' + ln;
        var radios = document.getElementsByName('originallanguage');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                source = '&source=' + radios[i].id.substr(7);
                if (source == '&source=') {
                    source = '';
                }
                break;
            }
        }
        var url = 'https://www.googleapis.com/language/translate/v2?key=';
        var apikey = tinyMCE.activeEditor.getParam('googletranslate_apikey')
        if (apikey == '') {
            alert('Define your Google api key in config.php');
            tinyMCEPopup.close();
        }
        url = url + apikey + prettyprint + format + source + target;
        question.forEach(function(entry) {
            entry = entry.trim();
            var xmlHttp = new XMLHttpRequest();
            var theUrl = url + '&q=' + entry;
            xmlHttp.open( "GET", theUrl, false );
            xmlHttp.send( null );
            var txt = xmlHttp.responseText;
            var ans = JSON.parse(txt)
            txt = ans.data.translations[0].translatedText;
            /*txt = txt.replace(/\\u003c/gi, '<');
            txt = txt.replace(/\\u003e/gi, '>');
            txt = txt.replace(/\\u200e/gi, '');*/
            out += txt.trim() + ' ';
        });
        out = out.trim();
        var filt = document.getElementById('multifilter').checked;
        if (filt && !textonly) {
            var nl = [];
            var nod = tinyMCE.activeEditor.selection.getContent({format : 'text'});
            if (nod == '') {
                nod = tinyMCE.activeEditor.getBody();
            }
            var allTags = nod.getElementsByTagName("*");
            for (var i = 0, len = allTags.length; i < len; i++) {
                nl.push(allTags[i]);
            }
            tinymce.walk(nod, function(node) {
                // test for non-whitespace, non-block leaf nodes  
                if(node.childNodes.length == 0 &&  !(/[\s]/g.test(node.nodeValue))) {
                    // leaf node f
                    nl.push(node);
                }          
            }, "childNodes");
            var walker = document.createTreeWalker(nod, NodeFilter.SHOW_TEXT, null, false);
            walker.firstChild();
            var paratext = walker.currentNode.nodeValue;
            while (walker.nextSibling()){ 
                paratext+=walker.currentNode.nodeValue;
            }


        }
        tinyMCEPopup.editor.execCommand('mceInsertContent', true, out);
        tinyMCEPopup.close();

    }
};

tinyMCEPopup.onInit.add(GoogleTranslateDialog.init, GoogleTranslateDialog);
