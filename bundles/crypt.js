var crypt=function(){var r=["k","l","m","n"],t=["h","u","i","в","г","д","ж","я"],n=["v","w","t","g","j","з","ё","а","й"],o=function(){return!!Math.round(Math.random())},e=function(r,t){return Math.floor(Math.random()*r+(t||0))},u=function(r){return r.split("").reverse().join("")},a=function(r){var t=r[e(r.length-1)];return o()?t.toUpperCase():t},i=function(i){var c=i;o()?n.forEach(function(r){r.charCodeAt(0)==parseInt(i,16)&&(i=o()?r.toUpperCase():r)}):c=u(i)+a(t);for(var f=e(3,1),p=0;f>p;p++)c+=a(r),c=a(r)+c;return c},c=function(r){return r.toString().split("").map(function(r){return r.charCodeAt(0)})},f=function(r,t){return t.forEach(function(n){r^=n%t}),r},p=function(r,t){if(""===r)return Error("You must put message for right work");if(""===t)return Error("You must put key for right work");var n=c(t);return r.toString().split("").map(function(r){return r=f(r.charCodeAt(0),n),i(r.toString(16))}).join("")},h=function(r,o){if(void 0===o||""===o)return new Error("You must put key as second parameter");var e=new RegExp("[a-f]?(\\d+|[a-f]|["+n.join("")+"])([a-f"+t.join("")+"])?","gi"),a=new RegExp("["+t.join("")+"]","i"),i=new RegExp("["+n.join("")+"]","i"),p=c(o),h=r.match(e);return h?h.map(function(r){return r.match(a)&&(r=u(r.replace(a,""))),r.match(i)&&(r=r.toLowerCase().charCodeAt(0).toString(16)),r=f(parseInt(r,16),p),String.fromCharCode(r)}).join(""):r};return{create:p,parse:h}}();