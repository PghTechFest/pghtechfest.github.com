// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.
(function(a){var b={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper"},c=a(window),d=a(document),e=[],f=c.height(),g=function(){var a=c.scrollTop(),b=d.height(),g=b-f,h=a>g?g-a:0;for(var i=0;i<e.length;i++){var j=e[i],k=j.stickyWrapper.offset().top,l=k-j.topSpacing-h;if(a<=l){if(j.currentTop!==null){j.stickyElement.css("position","").css("top","").removeClass(j.className);j.stickyElement.parent().removeClass(j.className);j.currentTop=null}}else{var m=b-j.stickyElement.outerHeight()-j.topSpacing-j.bottomSpacing-a-h;m<0?m+=j.topSpacing:m=j.topSpacing;if(j.currentTop!=m){j.stickyElement.css("position","fixed").css("top",m).addClass(j.className);j.stickyElement.parent().addClass(j.className);j.currentTop=m}}}},h=function(){f=c.height()},i={init:function(c){var d=a.extend(b,c);return this.each(function(){var b=a(this);stickyId=b.attr("id");wrapper=a("<div></div>").attr("id",stickyId+"-sticky-wrapper").addClass(d.wrapperClassName);b.wrapAll(wrapper);var c=b.parent();c.css("height","auto");e.push({topSpacing:d.topSpacing,bottomSpacing:d.bottomSpacing,stickyElement:b,currentTop:null,stickyWrapper:c,className:d.className})})},update:g};if(window.addEventListener){window.addEventListener("scroll",g,!1);window.addEventListener("resize",h,!1)}else if(window.attachEvent){window.attachEvent("onscroll",g);window.attachEvent("onresize",h)}a.fn.sticky=function(b){if(i[b])return i[b].apply(this,Array.prototype.slice.call(arguments,1));if(typeof b=="object"||!b)return i.init.apply(this,arguments);a.error("Method "+b+" does not exist on jQuery.sticky")};a(function(){setTimeout(g,0)})})(jQuery);