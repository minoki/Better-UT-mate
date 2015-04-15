// ==UserScript==
// @name        Better UT-mate
// @namespace   http://d-poppo.nazo.cc/
// @include     https://ut-gakumu.adm.u-tokyo.ac.jp/websys/campus*
// @version     2
// @grant       none
// ==/UserScript==

window.addEventListener('load',function(){
  function getElementByXPath(x,root) {
    var r = document.evaluate(x,root||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    return r.snapshotItem(0);
  }

  // 「ログイン」
  var a = getElementByXPath(".//a[@href='JavaScript:login();']")
  if (a) {
    var b = document.createElement("button");
    b.setAttribute("type","submit");
    b.style.display='none';
    a.parentNode.insertBefore(b,a);
  }

  //// func=function.syllabus.refer

  // 「授業科目決定」
  var b = getElementByXPath(".//form[@name='InputForm']//input[@type='button' and @onclick='noInput()']");
  if (b) {
    b.type="submit";
  }

  // 「検索開始」
  var b = getElementByXPath(".//form[@name='SearchForm']//input[@type='button' and @onclick=\"func.value='function.syllabus.refer.search';submit();\"]");
  if (b) {
    b.type="submit";
  }
},false);
