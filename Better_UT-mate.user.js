// ==UserScript==
// @name        Better UT-mate
// @namespace   http://d-poppo.nazo.cc/
// @include     https://ut-gakumu.adm.u-tokyo.ac.jp/websys/campus*
// @version     4
// @grant       none
// ==/UserScript==

window.addEventListener('load',function(){
  function getElementByXPath(x,root) {
    var r = document.evaluate(x,root||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    return r.snapshotItem(0);
  }

  // 「ログイン」
  var e = getElementByXPath(".//a[@href='JavaScript:login();']")
  if (e) {
    var b = document.createElement("button");
    b.setAttribute("type","submit");
    b.style.display='none';
    e.parentNode.insertBefore(b,e);
  }

  //// func=function.syllabus.refer

  // 「授業科目決定」
  var e = getElementByXPath(".//form[@name='InputForm']//input[@type='button' and @onclick='noInput()']");
  if (e) {
    e.type="submit";
  }

  // 「検索開始」
  var e = getElementByXPath(".//form[@name='SearchForm']//input[@type='button' and @onclick=\"func.value='function.syllabus.refer.search';submit();\"]");
  if (e) {
    e.type="submit";
  }

  //// func=function.seiseki.refer.span or func=function.seiseki.tani.span

  // 「過去を含めた全成績」
  var e = getElementByXPath(".//form[@name='InputForm']//input[@type='radio' and @name='out_range' and @value='1']");
  if (e) {
    var parent = e.parentNode;
    var label = document.createElement("label");
    var text = e.nextSibling; // 「過去を含めた全成績」
    parent.insertBefore(label, e);
    label.appendChild(parent.removeChild(e));
    label.appendChild(parent.removeChild(text));
  }

  // 「対象年度・学期の成績のみ→」
  var out_range_2 = getElementByXPath(".//form[@name='InputForm']//input[@type='radio' and @name='out_range' and @value='2']");
  if (e) {
    var parent = out_range_2.parentNode;
    var label = document.createElement("label");
    var text = out_range_2.nextSibling; // 「対象年度・学期の成績のみ→」
    parent.insertBefore(label, out_range_2);
    label.appendChild(parent.removeChild(out_range_2));
    label.appendChild(parent.removeChild(text));

    // 「年度」
    var nendo = getElementByXPath(".//form[@name='InputForm']//input[@type='text' and @name='nendo']");
    if (nendo) {
      nendo.addEventListener("focus", function() {
        out_range_2.checked = true;
      }, false);
    }

    // 学期
    var gakki = getElementByXPath(".//form[@name='InputForm']//select[@name='term']");
    if (gakki) {
      gakki.addEventListener("focus", function() {
        out_range_2.checked = true;
      }, false);
    }
  }

  if (window.name === "topmenu") {
    // セッションのタイムアウトを阻止（25分ごとにリロード）
    setTimeout(function() {
      location.reload();
    }, 25*60*1000 /* 25 minutes */);
  }

},false);
