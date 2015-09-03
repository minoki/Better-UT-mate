// ==UserScript==
// @name        Better UT-mate
// @namespace   http://d-poppo.nazo.cc/
// @include     https://ut-gakumu.adm.u-tokyo.ac.jp/websys/campus*
// @version     5
// @grant       none
// @author      ARATA Mizuki
// @license     MIT http://opensource.org/licenses/mit-license.php
// ==/UserScript==

function getElementByXPath(x, root) {
    var r = document.evaluate(x, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    return r.singleNodeValue;
}
function getElementsByXPath(x, root) {
    var r = document.evaluate(x, root || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var a = new Array(r.snapshotLength);
    for (var i = 0; i < r.snapshotLength; ++i) {
        a[i] = r.snapshotItem(i);
    }
    return a;
}

// 「ログイン」
var e = getElementByXPath(".//a[@href='JavaScript:login();']");
if (e) {
    var b = document.createElement("button");
    b.setAttribute("type", "submit");
    b.style.display = 'none';
    e.parentNode.insertBefore(b, e);
}

//// func=function.syllabus.refer

// 「授業科目決定」
var e = getElementByXPath(".//form[@name='InputForm']//input[@type='button' and contains(@value, '授業科目決定')]");
if (e) {
    e.type = "submit";
}

var SearchForm = getElementByXPath(".//form[@name='SearchForm']");
// チェックボックス、ラジオボタンのラベル
getElementsByXPath(".//input[@type='checkbox' or @type='radio']", SearchForm).forEach(function(e) {
    if (e.labels.length === 0 && e.nextSibling.nodeType === Node.TEXT_NODE) {
        var parent = e.parentNode;
        var label = document.createElement("label");
        var text = e.nextSibling;
        var textContent = text.textContent;
        var m = text.textContent.match(/^(.*?)(\s*)$/);
        parent.insertBefore(label, e);
        label.appendChild(parent.removeChild(e));
        label.appendChild(document.createTextNode(m[1]));
        text.textContent = m[2];
    }
});

// 「検索開始」
var e = getElementByXPath(".//input[@type='button' and contains(@value, '検索開始')]", SearchForm);
if (e) {
    e.type = "submit";
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
    // セッションのタイムアウトを阻止（20分ごとにリロード）
    // UT-mateのタイムアウト時間は30分であり、残り時間が5分となった時にポップアップウインドウが出る。
    setTimeout(function() {
        location.reload();
    }, 20*60*1000 /* 20 minutes */);
}
