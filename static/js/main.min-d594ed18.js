var ArticleSummaryHover=function(){function e(){var e,n;if(Helpers.getViewportWidth()>=l.onlyRunAbove&&(e=document.querySelectorAll(".article-summary")))for(var o=0;o<e.length;o++)n=e[o],n.addEventListener("mousemove",t),n.addEventListener("mouseenter",s),n.addEventListener("mouseleave",i)}function t(e){var t,s,i,a,l=e.pageX,c=e.pageY;t=this,s=this.getBoundingClientRect(),i=n(s,l),a=o(s,c),r(t,s,i,a)}function n(e,t){var n,o,r;return n=e.left,o=t-n,r=o/e.width,r=r.toFixed(2),r-=.5,r*=l.transformModX}function o(e,t,n){var o,r,s,i;return o=document.documentElement.scrollTop,r=o+e.top,s=t-r,i=s/e.height,i=i.toFixed(2),i-=.5,i*=l.transformModY,i*=-1}function r(e,t,n,o){var r,s,i;n>-.5*l.transformModX-1&&n<.5*l.transformModX+1&&o>-.5*l.transformModY-1&&o<.5*l.transformModY+1&&(r="perspective("+t.width/2+"px) ",r+="scale("+l.transformScale+") ",r+="rotateY("+n+"deg) ",r+="rotateX("+o+"deg)",e.style.transform=r),(s=e.querySelector(".article-summary__featured-image"))&&(i="scale(1.025) ",i+="translateX("+8*n*-1+"px) ",i+="translateY("+6*o+"px) ",s.style.transform=i)}function s(e){this.classList.add(l.mouseOverToggleClass)}function i(e){this.style.transform="",this.querySelector(".article-summary__featured-image").style.transform="",this.classList.remove(l.mouseOverToggleClass)}function a(){e()}var l={onlyRunAbove:992,transformModX:1.25,transformModY:2,transformPerspective:"600px",transformScale:1.02,mouseOverToggleClass:"-is-being-hovered"};return{init:a}}(),ExternalLinks=function(){function e(){for(var e=document.links,t=0,n=e.length;t<n;t++)e[t].hostname!=window.location.hostname&&(e[t].target="_blank")}function t(){e()}return{init:t}}(),HandleForms=function(){function e(){var e=document.querySelectorAll("input, select, textarea"),t=document.querySelectorAll(".form");if(e.length>0&&t.length>0)for(var n=0;n<e.length;n++)e[n].addEventListener("invalid",function(e){this.classList.add("-has-error"),this.parentElement.classList.add("-field-has-error")}),e[n].addEventListener("blur",function(e){this.checkValidity()})}function t(){var e=document.querySelectorAll('input[type="email"]');if(e.length>0)for(var t=0;t<e.length;t++)e[t].addEventListener("input",function(e){this.value.length>0?this.classList.add("-has-text"):this.classList.remove("-has-text")})}function n(){var e,t=document.querySelectorAll("select");if(t.length>0)for(var n=0;n<t.length;n++)t[n].addEventListener("focus",function(t){e=this.parentElement,e.classList.add("-has-focus")}),t[n].addEventListener("blur",function(t){e=this.parentElement,e.classList.remove("-has-focus")})}function o(){var e=document.querySelector(".form__contact");null!==e&&e.length>0&&e.addEventListener("submit",function(e){e.preventDefault();var t=this,n=t.action,o=document.querySelector(".form__field-name"),r=document.querySelector(".form__field-email"),s=document.querySelector(".form__field-message"),i=document.querySelector(".form__field-message"),a=o.value,l=r.value,c=s.value;i.value;t.classList.add("-is-sending");var u="?form-name=contact";u+="&name="+a,u+="&email="+l,u+="&message="+c;var d=n+u;d=encodeURI(d);var f=new XMLHttpRequest;f.open("POST",d,!0),f.onload=function(){f.status>=200&&f.status<400&&(setTimeout(function(){t.classList.add("-is-sent")},1e3),setTimeout(function(){t.classList.add("-is-done")},2e3),setTimeout(function(){t.classList.add("-is-thankful"),o.value="",r.value="",s.value="",r.classList.remove("-has-text")},3e3))},f.onerror=function(){},f.send()})}function r(){e(),t(),n(),o()}return{init:r}}(),Helpers=function(){function e(){return Math.max(document.documentElement.clientWidth,window.innerWidth||0)}return{getViewportWidth:e}}(),ToggleMobileMenu=function(){function e(){function e(){for(var e=!1,t=document.querySelector("body"),n=t.classList,o=0;o<n.length;o++)if("site-nav-is-open"==n[o]){e=!0;break}e?t.classList.remove("site-nav-is-open"):t.className+=" site-nav-is-open"}var t=document.querySelector(".site-nav__nav-toggle");t&&t.addEventListener("click",e,!1)}function t(){e()}return{init:t}}(),TableOfContents=function(){function e(){var e=document.querySelector(".table-of-contents"),t=document.querySelector(".table-of-contents__toggle");t&&t.addEventListener("click",function(t){e.classList.contains("-is-expanded")?e.classList.remove("-is-expanded"):e.classList.add("-is-expanded")})}function t(){e()}return{init:t}}();!function(){ToggleMobileMenu.init(),ExternalLinks.init(),HandleForms.init(),TableOfContents.init(),ArticleSummaryHover.init()}();