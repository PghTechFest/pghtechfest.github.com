/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function ($) {
  $('a[data-reveal-id]').live('click', function (event) {
    event.preventDefault();
    var modalLocation = $(this).attr('data-reveal-id');
    $('#' + modalLocation).reveal($(this).data());
  });

  $.fn.reveal = function (options) {
    var defaults = {
      animation: 'fadeAndPop',                // fade, fadeAndPop, none
      animationSpeed: 300,                    // how fast animtions are
      closeOnBackgroundClick: true,           // if you click background will modal close?
      dismissModalClass: 'close-reveal-modal' // the class of a button or element that will close an open modal
    };
    var options = $.extend({}, defaults, options);

    return this.each(function () {
      var modal    = $(this),
        topMeasure = parseInt(modal.css('top')),
        topOffset  = modal.height() + topMeasure,
        locked     = true,
        modalBg    = $('.reveal-modal-bg');

      if (modalBg.length == 0) {
        modalBg = $('<div class="reveal-modal-bg" />').insertAfter(modal);
        modalBg.fadeTo('fast', 0.8);
      }

      function openAnimation() {
        modalBg.unbind('click.modalEvent');
        $('.' + options.dismissModalClass).unbind('click.modalEvent');
        if (!locked) {
          lockModal();
          if (options.animation == "fadeAndPop") {
            console.log($(document).scrollTop());
            console.log(topOffset);
            modal.css({'top': $(document).scrollTop() - topOffset, 'opacity': 0, 'visibility': 'visible'});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "top": $(document).scrollTop() + topMeasure + 'px',
              "opacity": 1
            }, options.animationSpeed, unlockModal);
          }
          if (options.animation == "fade") {
            modal.css({'opacity': 0, 'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "opacity": 1
            }, options.animationSpeed, unlockModal);
          }
          if (options.animation == "none") {
            modal.css({'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.css({"display": "block"});
            unlockModal();
          }
        }
        modal.unbind('reveal:open', openAnimation);
      }
      modal.bind('reveal:open', openAnimation);

      function closeAnimation() {
        if (!locked) {
          lockModal();
          if (options.animation == "fadeAndPop") {
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);
            modal.animate({
              "top":  $(document).scrollTop() - topOffset + 'px',
              "opacity": 0
            }, options.animationSpeed / 2, function () {
              modal.css({'top': topMeasure, 'opacity': 1, 'visibility': 'hidden'});
              unlockModal();
            });
          }
          if (options.animation == "fade") {
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);
            modal.animate({
              "opacity" : 0
            }, options.animationSpeed, function () {
              modal.css({'opacity': 1, 'visibility': 'hidden', 'top': topMeasure});
              unlockModal();
            });
          }
          if (options.animation == "none") {
            modal.css({'visibility': 'hidden', 'top': topMeasure});
            modalBg.css({'display': 'none'});
          }
        }
        modal.unbind('reveal:close', closeAnimation);
      }
      modal.bind('reveal:close', closeAnimation);
      modal.trigger('reveal:open');

      var closeButton = $('.' + options.dismissModalClass).bind('click.modalEvent', function () {
        modal.trigger('reveal:close');
      });

      if (options.closeOnBackgroundClick) {
        modalBg.css({"cursor": "pointer"});
        modalBg.bind('click.modalEvent', function () {
          modal.trigger('reveal:close');
        });
      }

      $('body').keyup(function (event) {
        if (event.which === 27) { // 27 is the keycode for the Escape key
          modal.trigger('reveal:close');
        }
      });

      function unlockModal() {
        locked = false;
      }

      function lockModal() {
        locked = true;
      }
    });
  };
})(jQuery);/*
 * jQuery imageready Plugin
 * http://www.zurb.com/playground/
 *
 * Copyright 2011, ZURB
 * Released under the MIT License
 */
(function(c){var b={};c.event.special.imageready={setup:function(f,e,d){b=f||b},add:function(d){var e=c(this),f;if(this.nodeType===1&&this.tagName.toLowerCase()==="img"&&this.src!==""){if(b.forceLoad){f=e.attr("src");e.attr("src","");a(this,d.handler);e.attr("src",f)}else{if(this.complete||this.readyState===4){d.handler.apply(this,arguments)}else{a(this,d.handler)}}}},teardown:function(d){c(this).unbind(".imageready")}};function a(d,f){var e=c(d);e.bind("load.imageready",function(){f.apply(d,arguments);e.unbind("load.imageready")})}}(jQuery));jQuery.foundation=jQuery.foundation||{};jQuery.foundation.customForms=jQuery.foundation.customForms||{};jQuery(document).ready(function(c){function b(d){c("form.custom input:"+d).each(function(){var f=c(this).hide(),e=f.next("span.custom."+d);if(e.length===0){e=c('<span class="custom '+d+'"></span>').insertAfter(f)}e.toggleClass("checked",f.is(":checked"));e.toggleClass("disabled",f.is(":disabled"))})}function a(f){var g=c(f),i=g.next("div.custom.dropdown"),d=g.find("option"),e=0,h;if(g.hasClass("no-custom")){return}if(i.length===0){$customSelectSize="";if(c(f).hasClass("small")){$customSelectSize="small"}else{if(c(f).hasClass("medium")){$customSelectSize="medium"}else{if(c(f).hasClass("large")){$customSelectSize="large"}else{if(c(f).hasClass("expand")){$customSelectSize="expand"}}}}i=c('<div class="custom dropdown '+$customSelectSize+'"><a href="#" class="selector"></a><ul></ul></div>"');d.each(function(){h=c("<li>"+c(this).html()+"</li>");i.find("ul").append(h)});i.prepend('<a href="#" class="current">'+d.first().html()+"</a>");g.after(i);g.hide()}else{i.find("ul").html("");d.each(function(){h=c("<li>"+c(this).html()+"</li>");i.find("ul").append(h)})}i.toggleClass("disabled",g.is(":disabled"));d.each(function(j){if(this.selected){i.find("li").eq(j).addClass("selected");i.find(".current").html(c(this).html())}});i.css("width","inherit");i.find("ul").css("width","inherit");i.find("li").each(function(){i.addClass("open");if(c(this).outerWidth()>e){e=c(this).outerWidth()}i.removeClass("open")});if(!i.is(".small, .medium, .large, .expand")){i.css("width",e+18+"px");i.find("ul").css("width",e+16+"px")}}c.foundation.customForms.appendCustomMarkup=function(){b("checkbox");b("radio");c("form.custom select").each(function(){a(this)})};c.foundation.customForms.appendCustomMarkup()});(function(c){function b(e){var f=0,g=e.next();$options=e.find("option");g.find("ul").html("");$options.each(function(){$li=c("<li>"+c(this).html()+"</li>");g.find("ul").append($li)});$options.each(function(h){if(this.selected){g.find("li").eq(h).addClass("selected");g.find(".current").html(c(this).html())}});g.removeAttr("style").find("ul").removeAttr("style");g.find("li").each(function(){g.addClass("open");if(c(this).outerWidth()>f){f=c(this).outerWidth()}g.removeClass("open")});g.css("width",f+18+"px");g.find("ul").css("width",f+16+"px")}function a(e){var g=e.prev(),f=g[0];if(false==g.is(":disabled")){f.checked=((f.checked)?false:true);e.toggleClass("checked");g.trigger("change")}}function d(e){var g=e.prev(),f=g[0];if(false==g.is(":disabled")){c('input:radio[name="'+g.attr("name")+'"]').each(function(){c(this).next().removeClass("checked")});f.checked=((f.checked)?false:true);e.toggleClass("checked");g.trigger("change")}}c("form.custom span.custom.checkbox").live("click",function(e){e.preventDefault();e.stopPropagation();a(c(this))});c("form.custom span.custom.radio").live("click",function(e){e.preventDefault();e.stopPropagation();d(c(this))});c("form.custom select").live("change",function(e){b(c(this))});c("form.custom label").live("click",function(f){var e=c("#"+c(this).attr("for")),h,g;if(e.length!==0){if(e.attr("type")==="checkbox"){f.preventDefault();h=c(this).find("span.custom.checkbox");a(h)}else{if(e.attr("type")==="radio"){f.preventDefault();g=c(this).find("span.custom.radio");d(g)}}}});c("form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector").live("click",function(f){var h=c(this),g=h.closest("div.custom.dropdown"),e=g.prev();f.preventDefault();if(false==e.is(":disabled")){g.toggleClass("open");if(g.hasClass("open")){c(document).bind("click.customdropdown",function(i){g.removeClass("open");c(document).unbind(".customdropdown")})}else{c(document).unbind(".customdropdown")}return false}});c("form.custom div.custom.dropdown li").live("click",function(h){var i=c(this),f=i.closest("div.custom.dropdown"),g=f.prev(),e=0;h.preventDefault();h.stopPropagation();i.closest("ul").find("li").removeClass("selected");i.addClass("selected");f.removeClass("open").find("a.current").html(i.html());i.closest("ul").find("li").each(function(j){if(i[0]==this){e=j}});g[0].selectedIndex=e;g.trigger("change")})})(jQuery);
/* http://mths.be/placeholder v1.8.7 by @mathias */
(function(o,m,r){var t="placeholder" in m.createElement("input"),q="placeholder" in m.createElement("textarea"),l=r.fn,k;if(t&&q){k=l.placeholder=function(){return this};k.input=k.textarea=true}else{k=l.placeholder=function(){return this.filter((t?"textarea":":input")+"[placeholder]").not(".placeholder").bind("focus.placeholder",s).bind("blur.placeholder",p).trigger("blur.placeholder").end()};k.input=t;k.textarea=q;r(function(){r(m).delegate("form","submit.placeholder",function(){var a=r(".placeholder",this).each(s);setTimeout(function(){a.each(p)},10)})});r(o).bind("unload.placeholder",function(){r(".placeholder").val("")})}function n(b){var c={},a=/^jQuery\d+$/;r.each(b.attributes,function(d,e){if(e.specified&&!a.test(e.name)){c[e.name]=e.value}});return c}function s(){var a=r(this);if(a.val()===a.attr("placeholder")&&a.hasClass("placeholder")){if(a.data("placeholder-password")){a.hide().next().show().focus().attr("id",a.removeAttr("id").data("placeholder-id"))}else{a.val("").removeClass("placeholder")}}}function p(){var d,e=r(this),c=e,a=this.id;if(e.val()===""){if(e.is(":password")){if(!e.data("placeholder-textinput")){try{d=e.clone().attr({type:"text"})}catch(b){d=r("<input>").attr(r.extend(n(this),{type:"text"}))}d.removeAttr("name").data("placeholder-password",true).data("placeholder-id",a).bind("focus.placeholder",s);e.data("placeholder-textinput",d).data("placeholder-id",a).before(d)}e=e.removeAttr("id").hide().prev().attr("id",a).show()}e.addClass("placeholder").val(e.attr("placeholder"))}else{e.removeClass("placeholder")}}}(this,document,jQuery));(function(c){var b={bodyHeight:0,pollInterval:1000};var a={init:function(d){return this.each(function(){var f=c(".has-tip"),e=c(".tooltip"),g=function(j,i){return'<span data-id="'+j+'" class="tooltip">'+i+'<span class="nub"></span></span>'},h=setInterval(a.isDomResized,b.pollInterval);if(e.length<1){f.each(function(k){var n=c(this),o="foundationTooltip"+k,l=n.attr("title"),j=n.attr("class");n.data("id",o);var m=c(g(o,l));m.addClass(j).removeClass("has-tip").appendTo("body");if(Modernizr.touch){m.append('<span class="tap-to-close">tap to close </span>')}a.reposition(n,m,j);m.fadeOut(150)})}c(window).resize(function(){var i=c(".tooltip");i.each(function(){var j=c(this).data();target=f=c(".has-tip"),tip=c(this),classes=tip.attr("class");f.each(function(){(c(this).data().id==j.id)?target=c(this):target=target});a.reposition(target,tip,classes)})});if(Modernizr.touch){c(".tooltip").live("click touchstart touchend",function(i){i.preventDefault();c(this).fadeOut(150)});f.live("click touchstart touchend",function(i){i.preventDefault();c(".tooltip").hide();c("span[data-id="+c(this).data("id")+"].tooltip").fadeIn(150);f.attr("title","")})}else{f.hover(function(){c("span[data-id="+c(this).data("id")+"].tooltip").fadeIn(150);f.attr("title","")},function(){c("span[data-id="+c(this).data("id")+"].tooltip").fadeOut(150)})}})},reposition:function(g,j,e){var d=g.data("width"),k=j.children(".nub"),h=k.outerHeight(),f=k.outerWidth();function i(n,q,o,m,p){n.css({top:q,bottom:m,left:p,right:o})}j.css({top:(g.offset().top+g.outerHeight()+10),left:g.offset().left,width:d});i(k,-h,"auto","auto",10);if(c(window).width()<767){var l=g.parents(".row");j.width(l.outerWidth()-20).css("left",l.offset().left).addClass("tip-override");i(k,-h,"auto","auto",g.offset().left)}else{if(e.indexOf("tip-top")>-1){j.css({top:g.offset().top-j.outerHeight()-h,left:g.offset().left,width:d}).removeClass("tip-override");i(k,"auto","auto",-h,"auto")}else{if(e.indexOf("tip-left")>-1){j.css({top:g.offset().top+(g.outerHeight()/2)-h,left:g.offset().left-j.outerWidth()-10,width:d}).removeClass("tip-override");i(k,(j.outerHeight()/2)-(h/2),-h,"auto","auto")}else{if(e.indexOf("tip-right")>-1){j.css({top:g.offset().top+(g.outerHeight()/2)-h,left:g.offset().left+g.outerWidth()+10,width:d}).removeClass("tip-override");i(k,(j.outerHeight()/2)-(h/2),"auto","auto",-h)}}}}},isDomResized:function(){$body=c("body");if(b.bodyHeight!=$body.height()){b.bodyHeight=$body.height();c(window).trigger("resize")}}};c.fn.tooltips=function(d){if(a[d]){return a[d].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof d==="object"||!d){return a.init.apply(this,arguments)}else{c.error("Method "+d+" does not exist on jQuery.tooltips")}}}})(jQuery);
