// Generated by CoffeeScript 1.3.1
(function(){var _this=this;window.Session=function(a){var b,c,d,e,f,g,h,i,j,k,l,m=this;this.id=ko.observable((b=a!=null?a.id:void 0)!=null?b:"");this.favorite=ko.observable((c=a!=null?a.favorite:void 0)!=null?c:"");this.title=ko.observable((e=a!=null?a.title:void 0)!=null?e:"");this.time=ko.observable((f=a!=null?a.time:void 0)!=null?f:"");this.description=ko.observable((g=a!=null?a.description:void 0)!=null?g:" ");this.room=ko.observable((h=a!=null?a.room:void 0)!=null?h:"");this.presenters_name=ko.observable((i=a!=null?a.presenters_name:void 0)!=null?i:"");this.presenters_bio=ko.observable((j=a!=null?a.presenters_bio:void 0)!=null?j:"");this.presenters_blog=ko.observable((k=a!=null?a.presenters_blog:void 0)!=null?k:"");this.presenters_twitter=ko.observable((l=a!=null?a.presenters_twitter:void 0)!=null?l:"");this.time_sort=ko.observable((d=a!=null?a.time_sort:void 0)!=null?d:"");this.showSpeakerInfo=function(){$(this.speaker_info_href()).fadeToggle();return!1};this.favorite.subscribe(function(){return amplify.store("localStorageSessions_",ko.toJS(viewModel.timeSlots))});this.presenters_bio_formatted=ko.computed(function(){return m.presenters_bio().replace("\n","")});this.speaker_info_id=ko.computed(function(){return"session-"+m.id()});this.speaker_info_href=ko.computed(function(){return"#session-"+m.id()});this.twitter_url=ko.computed(function(){return"http://twitter.com/"+m.presenters_twitter()});this.twitter_name=ko.computed(function(){return"@"+m.presenters_twitter()});this.blog_url=ko.computed(function(){return"http://"+m.presenters_blog()});return this};window.TimeSlot=function(a,b,c){this.id=ko.observable(a.replace(/\D/g,""));this.title=ko.observable(a);this.html_id=ko.observable(a.replace(/\D/g,"")+"time_slot");this.category=ko.observable(c);this.sessions=ko.observableArray(b);return this};window.viewModel={timeSlots:ko.observableArray([]),show_full_descr:!0,favorites:ko.observableArray(),selectedFilter:ko.observable(),is_favs_only:ko.observable(!1),favs_text:ko.observable("Show Only My Favorites"),has_fav:ko.observable(!1),startup:function(){var dataToLoad;window.localStorageSessions_=amplify.store("localStorageSessions_");if(typeof localStorageSessions_!="undefined"){dataToLoad=eval(localStorageSessions_);return _.each(dataToLoad,function(a){var b,c,d;c=a.title;b=a.category;d=[];_.each(a.sessions,function(a){d.push(new Session(a));if(!viewModel.has_fav()&&a.favorite)return viewModel.has_fav(!0)});return viewModel.timeSlots.push(new TimeSlot(c,d,b))})}return _.each(sessionsData,function(a){var b,c,d;c=a[0].time;b=a[0].time_sort;d=[];_.each(a,function(a){return d.push(new Session(a))});viewModel.timeSlots.push(new TimeSlot(c,d,b));return amplify.store("localStorageSessions_",ko.toJS(viewModel.timeSlots))})},toggleFullDescriptions:function(){event.preventDefault();viewModel.show_full_descr=!viewModel.show_full_descr;$(".full_descr").toggle(viewModel.show_full_descr);$(window).scrollTop($(window).scrollTop()-1);return $(window).scrollTop($(window).scrollTop()+1)},viewAll:function(){event.preventDefault();return!1},showFavsOnly:function(){this.is_favs_only(!this.is_favs_only());if(this.is_favs_only()){this.favs_text("Show All \nSessions");$(".nonfav").hide()}else{this.favs_text("Show Only My Favorites");$(".nonfav").show()}return setTimeout(function(){$(window).scrollTop($("#top").position().top+330);$(window).scrollTop($(window).scrollTop()-1);return $(window).scrollTop($(window).scrollTop()+1)},200)}};viewModel.selectedFilter.subscribe(function(){var a;a=viewModel.selectedFilter().id();return $(window).scrollTop($("#"+a+"time_slot").position().top+330)},this);$(function(){var a,b;viewModel.startup();ko.applyBindings(viewModel);a=$("#sortable_sessions");b=$("#options").outerHeight()-26;jQuery(".mobile-menu").mobileMenu();$("select").customSelect();$("#sortable_sessions .highlight").sticky({offset:b,stopper:".highlight"});$("#options").sticky({offset:0});$('input[type="checkbox"]').ezMark();$("a[rel*=leanModal]").leanModal();setTimeout(function(){$(window).scrollTop($(window).scrollTop()-1);return $(window).scrollTop($(window).scrollTop()+1)},200);return this})}).call(this);