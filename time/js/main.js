var requestAnimationFrame = window.requestAnimationFrame || 
　　　　　　　　　　　　　　　　window.mozRequestAnimationFrame ||
                         　window.webkitRequestAnimationFrame || 
　　　　　　　　　　　　　　　　window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

var timer = document.getElementsByClassName("time")[0];

var fonts = ["", "DSEG7Classic-Bold", "DSEG14Classic-Bold", "k8x12", "misaki"];
var stylesheets = document.styleSheets.item(0);

var targetDate = new Date(getParam('date') + "T" + getParam('time') + ":00+09:00");

console.log(targetDate);

document.getElementsByClassName("title")[0].innerHTML = getParam('title');

stylesheets.cssRules[5].style.color = getParam('c0');
stylesheets.cssRules[6].style.color = getParam('c1');
stylesheets.cssRules[7].style.color = getParam('c2');

stylesheets.cssRules[5].style.fontFamily = fonts[getParam('f0')];
stylesheets.cssRules[6].style.fontFamily = fonts[getParam('f1')];
stylesheets.cssRules[7].style.fontFamily = fonts[getParam('f2')];

document.body.style.backgroundColor = getParam('c3');

window.requestAnimationFrame(loop);

function loop(){
    window.requestAnimationFrame(loop);
    var date = new Date();
    if (targetDate - date < 0) {
        timer.innerHTML = datedifY(targetDate, date) + "-" +
            zeroPadding(datedifYm(targetDate, date), 2) + "-" +
            zeroPadding(datedifDay(targetDate, date), 2) + "-" +
            zeroPadding(getHour(targetDate, date), 2) + ":" +
            zeroPadding(getMin(targetDate, date), 2) + ":" +
            zeroPadding(getSec(targetDate, date), 2) + "\." +
            zeroPadding(getMs(targetDate, date), 3) +
            " <br><span class=\"progress\">Progress</span>";
    } else {
        timer.innerHTML = datedifY(date, targetDate) + "-" +
            zeroPadding(datedifYm(date, targetDate), 2) + "-" +
            zeroPadding(datedifDay(date, targetDate), 2) + "-" +
            zeroPadding(getHour(date, targetDate), 2) + ":" +
            zeroPadding(getMin(date, targetDate), 2) + ":" +
            zeroPadding(getSec(date, targetDate), 2) + "\." +
            zeroPadding(getMs(date, targetDate), 3);
    }
}

function zeroPadding(NUM, LEN) {
    return (Array(LEN).join('0') + NUM).slice(-LEN);
}

/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getMs(start, end) {
    var differenceMs = end.getMilliseconds() - start.getMilliseconds();
    if (differenceMs < 0) {
        differenceMs = 1000 + differenceMs;
    }
    return differenceMs;
}

function getSec(start, end) {
    var differenceSec = end.getSeconds() - start.getSeconds();
    if (start.getMilliseconds() > end.getMilliseconds()) {
        --differenceSec;
    }
    if (differenceSec < 0) {
        differenceSec = 60 + differenceSec;
    }
    return differenceSec;
}

function getMin(start, end) {
    var differenceMin = end.getMinutes() - start.getMinutes();
    if (start.getSeconds() > end.getSeconds()) {
        --differenceMin;
    }
    if (differenceMin < 0) {
        differenceMin = 60 + differenceMin;
    }
    return differenceMin;
}

function getHour(start, end) {
    var differenceHour = end.getHours() - start.getHours();
    if (start.getMinutes() > end.getMinutes()) {
        --differenceHour;
    }
    if (differenceHour < 0) {
        differenceHour = 24 + differenceHour;
    }
    return differenceHour;
}

function datedifDay(start, end) {
    var differenceDay;
    if (start.getMonth() !== end.getMonth()) {
        var e1 = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        var e2 = new Date(end.getFullYear(), end.getMonth(), 1);
        differenceDay = (e2 - e1) / 86400000;
    } else {
        if (start.getDate() < end.getDate()) {
            differenceDay = end.getDate() - start.getDate();
        } else {
            differenceDay = start.getDate() - end.getDate();
        }
    }
    if (start.getHours() > end.getHours()) {
        --differenceDay;
    }
    if (differenceDay < 0) {
        e1.setDate(e1.getDate() - 1);
        differenceDay = e1.getDate();
    }
    return differenceDay;
}

function datedifYm(start, end) {
    var differenceMonth = end.getMonth() - start.getMonth();
    if (start.getDate() > end.getDate()) {
        --differenceMonth;
    }
    if (differenceMonth < 0) {
        differenceMonth = 12 + differenceMonth;
    }
    return differenceMonth;
}

function datedifY(start, end) {
    var differenceYear = end.getFullYear() - start.getFullYear();
    if (start.getMonth() > end.getMonth()) {
        --differenceYear;
    }
    return differenceYear;
}
