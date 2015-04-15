// ==UserScript==
// @name        Better UT-mate
// @namespace   http://d-poppo.nazo.cc/
// @include     https://ut-gakumu.adm.u-tokyo.ac.jp/websys/campus
// @version     1
// ==/UserScript==

window.addEventListener('load',function(){
  function getElementByXPath(x,root) {
    var r = document.evaluate(x,root||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    return r.snapshotItem(0);
  }

  var a = getElementByXPath(".//a[@href='JavaScript:login();']")
  if (!a) {
    return;
  }
  var b = document.createElement("button");
  b.setAttribute("type","submit");
  b.style.display='none';
  a.parentNode.insertBefore(b,a);
},false);
