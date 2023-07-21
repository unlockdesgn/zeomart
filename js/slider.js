/*
 * Owl carousel
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this.drag=a.extend({},m),this.state=a.extend({},n),this.e=a.extend({},o),this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._invalidated={},this._pipe=[],a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a[0].toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Pipe,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}function f(a){if(a.touches!==d)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(a.touches===d){if(a.pageX!==d)return{x:a.pageX,y:a.pageY};if(a.pageX===d)return{x:a.clientX,y:a.clientY}}}function g(a){var b,d,e=c.createElement("div"),f=a;for(b in f)if(d=f[b],"undefined"!=typeof e.style[d])return e=null,[d,b];return[!1]}function h(){return g(["transition","WebkitTransition","MozTransition","OTransition"])[1]}function i(){return g(["transform","WebkitTransform","MozTransform","OTransform","msTransform"])[0]}function j(){return g(["perspective","webkitPerspective","MozPerspective","OPerspective","MsPerspective"])[0]}function k(){return"ontouchstart"in b||!!navigator.msMaxTouchPoints}function l(){return b.navigator.msPointerEnabled}var m,n,o;m={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,offsetX:0,offsetY:0,distance:null,startTime:0,endTime:0,updatedX:0,targetEl:null},n={isTouch:!1,isScrolling:!1,isSwiping:!1,direction:!1,inMotion:!1},o={_onDragStart:null,_onDragMove:null,_onDragEnd:null,_transitionEnd:null,_resizer:null,_responsiveCall:null,_goToLoop:null,_checkVisibile:null},e.Defaults={items:3,loop:!1,center:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,responsiveClass:!1,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",themeClass:"owl-theme",baseClass:"owl-carousel",itemClass:"owl-item",centerClass:"center",activeClass:"active"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Plugins={},e.Pipe=[{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){var a=this._clones,b=this.$stage.children(".cloned");(b.length!==a.length||!this.settings.loop&&a.length>0)&&(this.$stage.children(".cloned").remove(),this._clones=[])}},{filter:["items","settings"],run:function(){var a,b,c=this._clones,d=this._items,e=this.settings.loop?c.length-Math.max(2*this.settings.items,4):0;for(a=0,b=Math.abs(e/2);b>a;a++)e>0?(this.$stage.children().eq(d.length+c.length-1).remove(),c.pop(),this.$stage.children().eq(0).remove(),c.pop()):(c.push(c.length/2),this.$stage.append(d[c[c.length-1]].clone().addClass("cloned")),c.push(d.length-1-(c.length-1)/2),this.$stage.prepend(d[c[c.length-1]].clone().addClass("cloned")))}},{filter:["width","items","settings"],run:function(){var a,b,c,d=this.settings.rtl?1:-1,e=(this.width()/this.settings.items).toFixed(3),f=0;for(this._coordinates=[],b=0,c=this._clones.length+this._items.length;c>b;b++)a=this._mergers[this.relative(b)],a=this.settings.mergeFit&&Math.min(a,this.settings.items)||a,f+=(this.settings.autoWidth?this._items[this.relative(b)].width()+this.settings.margin:e*a)*d,this._coordinates.push(f)}},{filter:["width","items","settings"],run:function(){var b,c,d=(this.width()/this.settings.items).toFixed(3),e={width:Math.abs(this._coordinates[this._coordinates.length-1])+2*this.settings.stagePadding,"padding-left":this.settings.stagePadding||"","padding-right":this.settings.stagePadding||""};if(this.$stage.css(e),e={width:this.settings.autoWidth?"auto":d-this.settings.margin},e[this.settings.rtl?"margin-left":"margin-right"]=this.settings.margin,!this.settings.autoWidth&&a.grep(this._mergers,function(a){return a>1}).length>0)for(b=0,c=this._coordinates.length;c>b;b++)e.width=Math.abs(this._coordinates[b])-Math.abs(this._coordinates[b-1]||0)-this.settings.margin,this.$stage.children().eq(b).css(e);else this.$stage.children().css(e)}},{filter:["width","items","settings"],run:function(a){a.current&&this.reset(this.$stage.children().index(a.current))}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children("."+this.settings.activeClass).removeClass(this.settings.activeClass),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass(this.settings.activeClass),this.settings.center&&(this.$stage.children("."+this.settings.centerClass).removeClass(this.settings.centerClass),this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))}}],e.prototype.initialize=function(){if(this.trigger("initialize"),this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl",this.settings.rtl),this.browserSupport(),this.settings.autoWidth&&this.state.imagesLoaded!==!0){var b,c,e;if(b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e)return this.preloadAutoWidthImages(b),!1}this.$element.addClass("owl-loading"),this.$stage=a("<"+this.settings.stageElement+' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this._width=this.$element.width(),this.refresh(),this.$element.removeClass("owl-loading").addClass("owl-loaded"),this.eventsCall(),this.internalEvents(),this.addTriggerableEvents(),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),delete e.responsive,e.responsiveClass&&this.$element.attr("class",function(a,b){return b.replace(/\b owl-responsive-\S+/g,"")}).addClass("owl-responsive-"+d)):e=a.extend({},this.options),(null===this.settings||this._breakpoint!==d)&&(this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}}))},e.prototype.optionsLogic=function(){this.$element.toggleClass("owl-center",this.settings.center),this.settings.loop&&this._items.length<this.settings.items&&(this.settings.loop=!1),this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.settings.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={}},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){if(0===this._items.length)return!1;(new Date).getTime();this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$stage.addClass("owl-refresh"),this.update(),this.$stage.removeClass("owl-refresh"),this.state.orientation=b.orientation,this.watchVisibility(),this.trigger("refreshed")},e.prototype.eventsCall=function(){this.e._onDragStart=a.proxy(function(a){this.onDragStart(a)},this),this.e._onDragMove=a.proxy(function(a){this.onDragMove(a)},this),this.e._onDragEnd=a.proxy(function(a){this.onDragEnd(a)},this),this.e._onResize=a.proxy(function(a){this.onResize(a)},this),this.e._transitionEnd=a.proxy(function(a){this.transitionEnd(a)},this),this.e._preventClick=a.proxy(function(a){this.preventClick(a)},this)},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this.e._onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.trigger("resize").isDefaultPrevented()?!1:(this._width=this.$element.width(),this.invalidate("width"),this.refresh(),void this.trigger("resized")):!1},e.prototype.eventsRouter=function(a){var b=a.type;"mousedown"===b||"touchstart"===b?this.onDragStart(a):"mousemove"===b||"touchmove"===b?this.onDragMove(a):"mouseup"===b||"touchend"===b?this.onDragEnd(a):"touchcancel"===b&&this.onDragEnd(a)},e.prototype.internalEvents=function(){var c=(k(),l());this.settings.mouseDrag?(this.$stage.on("mousedown",a.proxy(function(a){this.eventsRouter(a)},this)),this.$stage.on("dragstart",function(){return!1}),this.$stage.get(0).onselectstart=function(){return!1}):this.$element.addClass("owl-text-select-on"),this.settings.touchDrag&&!c&&this.$stage.on("touchstart touchcancel",a.proxy(function(a){this.eventsRouter(a)},this)),this.transitionEndVendor&&this.on(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd,!1),this.settings.responsive!==!1&&this.on(b,"resize",a.proxy(this.onThrottledResize,this))},e.prototype.onDragStart=function(d){var e,g,h,i;if(e=d.originalEvent||d||b.event,3===e.which||this.state.isTouch)return!1;if("mousedown"===e.type&&this.$stage.addClass("owl-grab"),this.trigger("drag"),this.drag.startTime=(new Date).getTime(),this.speed(0),this.state.isTouch=!0,this.state.isScrolling=!1,this.state.isSwiping=!1,this.drag.distance=0,g=f(e).x,h=f(e).y,this.drag.offsetX=this.$stage.position().left,this.drag.offsetY=this.$stage.position().top,this.settings.rtl&&(this.drag.offsetX=this.$stage.position().left+this.$stage.width()-this.width()+this.settings.margin),this.state.inMotion&&this.support3d)i=this.getTransformProperty(),this.drag.offsetX=i,this.animate(i),this.state.inMotion=!0;else if(this.state.inMotion&&!this.support3d)return this.state.inMotion=!1,!1;this.drag.startX=g-this.drag.offsetX,this.drag.startY=h-this.drag.offsetY,this.drag.start=g-this.drag.startX,this.drag.targetEl=e.target||e.srcElement,this.drag.updatedX=this.drag.start,("IMG"===this.drag.targetEl.tagName||"A"===this.drag.targetEl.tagName)&&(this.drag.targetEl.draggable=!1),a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",a.proxy(function(a){this.eventsRouter(a)},this))},e.prototype.onDragMove=function(a){var c,e,g,h,i,j;this.state.isTouch&&(this.state.isScrolling||(c=a.originalEvent||a||b.event,e=f(c).x,g=f(c).y,this.drag.currentX=e-this.drag.startX,this.drag.currentY=g-this.drag.startY,this.drag.distance=this.drag.currentX-this.drag.offsetX,this.drag.distance<0?this.state.direction=this.settings.rtl?"right":"left":this.drag.distance>0&&(this.state.direction=this.settings.rtl?"left":"right"),this.settings.loop?this.op(this.drag.currentX,">",this.coordinates(this.minimum()))&&"right"===this.state.direction?this.drag.currentX-=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length):this.op(this.drag.currentX,"<",this.coordinates(this.maximum()))&&"left"===this.state.direction&&(this.drag.currentX+=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length)):(h=this.coordinates(this.settings.rtl?this.maximum():this.minimum()),i=this.coordinates(this.settings.rtl?this.minimum():this.maximum()),j=this.settings.pullDrag?this.drag.distance/5:0,this.drag.currentX=Math.max(Math.min(this.drag.currentX,h+j),i+j)),(this.drag.distance>8||this.drag.distance<-8)&&(c.preventDefault!==d?c.preventDefault():c.returnValue=!1,this.state.isSwiping=!0),this.drag.updatedX=this.drag.currentX,(this.drag.currentY>16||this.drag.currentY<-16)&&this.state.isSwiping===!1&&(this.state.isScrolling=!0,this.drag.updatedX=this.drag.start),this.animate(this.drag.updatedX)))},e.prototype.onDragEnd=function(b){var d,e,f;if(this.state.isTouch){if("mouseup"===b.type&&this.$stage.removeClass("owl-grab"),this.trigger("dragged"),this.drag.targetEl.removeAttribute("draggable"),this.state.isTouch=!1,this.state.isScrolling=!1,this.state.isSwiping=!1,0===this.drag.distance&&this.state.inMotion!==!0)return this.state.inMotion=!1,!1;this.drag.endTime=(new Date).getTime(),d=this.drag.endTime-this.drag.startTime,e=Math.abs(this.drag.distance),(e>3||d>300)&&this.removeClick(this.drag.targetEl),f=this.closest(this.drag.updatedX),this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(f),this.invalidate("position"),this.update(),this.settings.pullDrag||this.drag.updatedX!==this.coordinates(f)||this.transitionEnd(),this.drag.distance=0,a(c).off(".owl.dragEvents")}},e.prototype.removeClick=function(c){this.drag.targetEl=c,a(c).on("click.preventClick",this.e._preventClick),b.setTimeout(function(){a(c).off("click.preventClick")},300)},e.prototype.preventClick=function(b){b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation&&b.stopPropagation(),a(b.target).off("click.preventClick")},e.prototype.getTransformProperty=function(){var a,c;return a=b.getComputedStyle(this.$stage.get(0),null).getPropertyValue(this.vendorName+"transform"),a=a.replace(/matrix(3d)?\(|\)/g,"").split(","),c=16===a.length,c!==!0?a[4]:a[12]},e.prototype.closest=function(b){var c=-1,d=30,e=this.width(),f=this.coordinates();return this.settings.freeDrag||a.each(f,a.proxy(function(a,g){return b>g-d&&g+d>b?c=a:this.op(b,"<",g)&&this.op(b,">",f[a+1]||g-e)&&(c="left"===this.state.direction?a+1:a),-1===c},this)),this.settings.loop||(this.op(b,">",f[this.minimum()])?c=b=this.minimum():this.op(b,"<",f[this.maximum()])&&(c=b=this.maximum())),c},e.prototype.animate=function(b){this.trigger("translate"),this.state.inMotion=this.speed()>0,this.support3d?this.$stage.css({transform:"translate3d("+b+"px,0px, 0px)",transition:this.speed()/1e3+"s"}):this.state.isTouch?this.$stage.css({left:b+"px"}):this.$stage.animate({left:b},this.speed()/1e3,this.settings.fallbackEasing,a.proxy(function(){this.state.inMotion&&this.transitionEnd()},this))},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(a){this._invalidated[a]=!0},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(b,c){var e=c?this._items.length:this._items.length+this._clones.length;return!a.isNumeric(b)||1>e?d:b=this._clones.length?(b%e+e)%e:Math.max(this.minimum(c),Math.min(this.maximum(c),b))},e.prototype.relative=function(a){return a=this.normalize(a),a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=0,f=this.settings;if(a)return this._items.length-1;if(!f.loop&&f.center)b=this._items.length-1;else if(f.loop||f.center)if(f.loop||f.center)b=this._items.length+f.items;else{if(!f.autoWidth&&!f.merge)throw"Can not detect maximum absolute position.";for(revert=f.rtl?1:-1,c=this.$stage.width()-this.$element.width();(d=this.coordinates(e))&&!(d*revert>=c);)b=++e}else b=this._items.length-f.items;return b},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c=null;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[b-1]||0))/2*(this.settings.rtl?-1:1)):c=this._coordinates[b-1]||0,c)},e.prototype.duration=function(a,b,c){return Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(c,d){if(this.settings.loop){var e=c-this.relative(this.current()),f=this.current(),g=this.current(),h=this.current()+e,i=0>g-h?!0:!1,j=this._clones.length+this._items.length;h<this.settings.items&&i===!1?(f=g+this._items.length,this.reset(f)):h>=j-this.settings.items&&i===!0&&(f=g-this._items.length,this.reset(f)),b.clearTimeout(this.e._goToLoop),this.e._goToLoop=b.setTimeout(a.proxy(function(){this.speed(this.duration(this.current(),f+e,d)),this.current(f+e),this.update()},this),30)}else this.speed(this.duration(this.current(),c,d)),this.current(c),this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.transitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.state.inMotion=!1,void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)},this)),this.reset(a.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(a,b){b=b===d?this._items.length:this.normalize(b,!0),this.trigger("add",{content:a,position:b}),0===this._items.length||b===this._items.length?(this.$stage.append(a),this._items.push(a),this._mergers.push(1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)):(this._items[b].before(a),this._items.splice(b,0,a),this._mergers.splice(b,0,1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)),this.invalidate("items"),this.trigger("added",{content:a,position:b})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.addTriggerableEvents=function(){var b=a.proxy(function(b,c){return a.proxy(function(a){a.relatedTarget!==this&&(this.suppress([c]),b.apply(this,[].slice.call(arguments,1)),this.release([c]))},this)},this);a.each({next:this.next,prev:this.prev,to:this.to,destroy:this.destroy,refresh:this.refresh,replace:this.replace,add:this.add,remove:this.remove},a.proxy(function(a,c){this.$element.on(a+".owl.carousel",b(c,a+".owl.carousel"))},this))},e.prototype.watchVisibility=function(){function c(a){return a.offsetWidth>0&&a.offsetHeight>0}function d(){c(this.$element.get(0))&&(this.$element.removeClass("owl-hidden"),this.refresh(),b.clearInterval(this.e._checkVisibile))}c(this.$element.get(0))||(this.$element.addClass("owl-hidden"),b.clearInterval(this.e._checkVisibile),this.e._checkVisibile=b.setInterval(a.proxy(d,this),500))},e.prototype.preloadAutoWidthImages=function(b){var c,d,e,f;c=0,d=this,b.each(function(g,h){e=a(h),f=new Image,f.onload=function(){c++,e.attr("src",f.src),e.css("opacity",1),c>=b.length&&(d.state.imagesLoaded=!0,d.initialize())},f.src=e.attr("src")||e.attr("data-src")||e.attr("data-src-retina")})},e.prototype.destroy=function(){this.$element.hasClass(this.settings.themeClass)&&this.$element.removeClass(this.settings.themeClass),this.settings.responsive!==!1&&a(b).off("resize.owl.carousel"),this.transitionEndVendor&&this.off(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd);for(var d in this._plugins)this._plugins[d].destroy();(this.settings.mouseDrag||this.settings.touchDrag)&&(this.$stage.off("mousedown touchstart touchcancel"),a(c).off(".owl.dragEvents"),this.$stage.get(0).onselectstart=function(){},this.$stage.off("dragstart",function(){return!1})),this.$element.off(".owl"),this.$stage.children(".cloned").remove(),this.e=null,this.$element.removeData("owlCarousel"),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.unwrap()},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d){var e={item:{count:this._items.length,index:this.current()}},f=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),g=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},e,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(g)}),this.$element.trigger(g),this.settings&&"function"==typeof this.settings[f]&&this.settings[f].apply(this,g)),g},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.browserSupport=function(){if(this.support3d=j(),this.support3d){this.transformVendor=i();var a=["transitionend","webkitTransitionEnd","transitionend","oTransitionEnd"];this.transitionEndVendor=a[h()],this.vendorName=this.transformVendor.replace(/Transform/i,""),this.vendorName=""!==this.vendorName?"-"+this.vendorName.toLowerCase()+"-":""}this.state.orientation=b.orientation},a.fn.owlCarousel=function(b){return this.each(function(){a(this).data("owlCarousel")||a(this).data("owlCarousel",new e(this,b))})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b){var c=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,d=c.center&&Math.ceil(c.items/2)||c.items,e=c.center&&-1*d||0,f=(b.property&&b.property.value||this._core.current())+e,g=this._core.clones().length,h=a.proxy(function(a,b){this.load(b)},this);e++<d;)this.load(g/2+this._core.relative(f)),g&&a.each(this._core.clones(this._core.relative(f++)),h)},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this._core.$element.on(this._handlers)};c.Defaults={lazyLoad:!1},c.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},c.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=c}(window.Zepto||window.jQuery,window,document),function(a){var b=function(c){this._core=c,this._handlers={"initialized.owl.carousel":a.proxy(function(){this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass)===this._core.$stage.children().eq(this._core.current())&&this.update()},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this._core.$element.on(this._handlers)};b.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},b.prototype.update=function(){this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)},b.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=b}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this._core=b,this._videos={},this._playing=null,this._fullscreen=!1,this._handlers={"resize.owl.carousel":a.proxy(function(a){this._core.settings.video&&!this.isInFullScreen()&&a.preventDefault()},this),"refresh.owl.carousel changed.owl.carousel":a.proxy(function(){this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))},this)},this._core.options=a.extend({},d.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};d.Defaults={video:!1,videoHeight:!1,videoWidth:!1},d.prototype.fetch=function(a,b){var c=a.attr("data-vimeo-id")?"vimeo":"youtube",d=a.attr("data-vimeo-id")||a.attr("data-youtube-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else{if(!(d[3].indexOf("vimeo")>-1))throw new Error("Video URL not supported.");c="vimeo"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},d.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="http://img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type&&a.ajax({type:"GET",url:"http://vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}))},d.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null},d.prototype.play=function(b){this._core.trigger("play",null,"video"),this._playing&&this.stop();var c,d,e=a(b.target||b.srcElement),f=e.closest("."+this._core.settings.itemClass),g=this._videos[f.attr("data-video")],h=g.width||"100%",i=g.height||this._core.$stage.height();"youtube"===g.type?c='<iframe width="'+h+'" height="'+i+'" src="http://www.youtube.com/embed/'+g.id+"?autoplay=1&v="+g.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===g.type&&(c='<iframe src="http://player.vimeo.com/video/'+g.id+'?autoplay=1" width="'+h+'" height="'+i+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),f.addClass("owl-video-playing"),this._playing=f,d=a('<div style="height:'+i+"px; width:"+h+'px" class="owl-video-frame">'+c+"</div>"),e.after(d)},d.prototype.isInFullScreen=function(){var d=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return d&&a(d).parent().hasClass("owl-video-frame")&&(this._core.speed(0),this._fullscreen=!0),d&&this._fullscreen&&this._playing?!1:this._fullscreen?(this._fullscreen=!1,!1):this._playing&&this._core.state.orientation!==b.orientation?(this._core.state.orientation=b.orientation,!1):!0},d.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=d}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){this.swapping="translated"==a.type},this),"translate.owl.carousel":a.proxy(function(){this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&this.core.support3d){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c)),f&&e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.transitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this.core=b,this.core.options=a.extend({},d.Defaults,this.core.options),this.handlers={"translated.owl.carousel refreshed.owl.carousel":a.proxy(function(){this.autoplay()
},this),"play.owl.autoplay":a.proxy(function(a,b,c){this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(){this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.autoplay()},this)},this.core.$element.on(this.handlers)};d.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},d.prototype.autoplay=function(){this.core.settings.autoplay&&!this.core.state.videoPlay?(b.clearInterval(this.interval),this.interval=b.setInterval(a.proxy(function(){this.play()},this),this.core.settings.autoplayTimeout)):b.clearInterval(this.interval)},d.prototype.play=function(){return c.hidden===!0||this.core.state.isTouch||this.core.state.isScrolling||this.core.state.isSwiping||this.core.state.inMotion?void 0:this.core.settings.autoplay===!1?void b.clearInterval(this.interval):void this.core.next(this.core.settings.autoplaySpeed)},d.prototype.stop=function(){b.clearInterval(this.interval)},d.prototype.pause=function(){b.clearInterval(this.interval)},d.prototype.destroy=function(){var a,c;b.clearInterval(this.interval);for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=d}(window.Zepto||window.jQuery,window,document),function(a){"use strict";var b=function(c){this._core=c,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"add.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.splice(b.position,0,a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"remove.owl.carousel prepared.owl.carousel":a.proxy(function(a){this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"change.owl.carousel":a.proxy(function(a){if("position"==a.property.name&&!this._core.state.revert&&!this._core.settings.loop&&this._core.settings.navRewind){var b=this._core.current(),c=this._core.maximum(),d=this._core.minimum();a.data=a.property.value>c?b>=c?d:c:a.property.value<d?c:a.property.value}},this),"changed.owl.carousel":a.proxy(function(a){"position"==a.property.name&&this.draw()},this),"refreshed.owl.carousel":a.proxy(function(){this._initialized||(this.initialize(),this._initialized=!0),this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation")},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this.$element.on(this._handlers)};b.Defaults={nav:!1,navRewind:!0,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotData:!1,dotsSpeed:!1,dotsContainer:!1,controlsClass:"owl-controls"},b.prototype.initialize=function(){var b,c,d=this._core.settings;d.dotsData||(this._templates=[a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]),d.navContainer&&d.dotsContainer||(this._controls.$container=a("<div>").addClass(d.controlsClass).appendTo(this.$element)),this._controls.$indicators=d.dotsContainer?a(d.dotsContainer):a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container),this._controls.$indicators.on("click","div",a.proxy(function(b){var c=a(b.target).parent().is(this._controls.$indicators)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(c,d.dotsSpeed)},this)),b=d.navContainer?a(d.navContainer):a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container),this._controls.$next=a("<"+d.navElement+">"),this._controls.$previous=this._controls.$next.clone(),this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click",a.proxy(function(){this.prev(d.navSpeed)},this)),this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click",a.proxy(function(){this.next(d.navSpeed)},this));for(c in this._overrides)this._core[c]=a.proxy(this[c],this)},b.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},b.prototype.update=function(){var a,b,c,d=this._core.settings,e=this._core.clones().length/2,f=e+this._core.items().length,g=d.center||d.autoWidth||d.dotData?1:d.dotsEach||d.items;if("page"!==d.slideBy&&(d.slideBy=Math.min(d.slideBy,d.items)),d.dots||"page"==d.slideBy)for(this._pages=[],a=e,b=0,c=0;f>a;a++)(b>=g||0===b)&&(this._pages.push({start:a-e,end:a-e+g-1}),b=0,++c),b+=this._core.mergers(this._core.relative(a))},b.prototype.draw=function(){var b,c,d="",e=this._core.settings,f=(this._core.$stage.children(),this._core.relative(this._core.current()));if(!e.nav||e.loop||e.navRewind||(this._controls.$previous.toggleClass("disabled",0>=f),this._controls.$next.toggleClass("disabled",f>=this._core.maximum())),this._controls.$previous.toggle(e.nav),this._controls.$next.toggle(e.nav),e.dots){if(b=this._pages.length-this._controls.$indicators.children().length,e.dotData&&0!==b){for(c=0;c<this._controls.$indicators.children().length;c++)d+=this._templates[this._core.relative(c)];this._controls.$indicators.html(d)}else b>0?(d=new Array(b+1).join(this._templates[0]),this._controls.$indicators.append(d)):0>b&&this._controls.$indicators.children().slice(b).remove();this._controls.$indicators.find(".active").removeClass("active"),this._controls.$indicators.children().eq(a.inArray(this.current(),this._pages)).addClass("active")}this._controls.$indicators.toggle(e.dots)},b.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotData?1:c.dotsEach||c.items)}},b.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,function(a){return a.start<=b&&a.end>=b}).pop()},b.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},b.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},b.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},b.prototype.to=function(b,c,d){var e;d?a.proxy(this._overrides.to,this._core)(b,c):(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c))},a.fn.owlCarousel.Constructor.Plugins.Navigation=b}(window.Zepto||window.jQuery,window,document),function(a,b){"use strict";var c=function(d){this._core=d,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(){"URLHash"==this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");this._hashes[c]=b.content},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(){var a=b.location.hash.substring(1),c=this._core.$stage.children(),d=this._hashes[a]&&c.index(this._hashes[a])||0;return a?void this._core.to(d,!1,!0):!1},this))};c.Defaults={URLhashListener:!1},c.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=c}(window.Zepto||window.jQuery,window,document);

/* ----- Range Slider With Tooltip Start "Simple Animated Slider Control Plugin With jQuery - addSlider"  ----- */
function generateGUID(){do var e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random()|0,t="x"==e?n:3&n|8;return t.toString(16)});while(GUIDList.indexOf(e)>-1);return e}function toFunc(e){if("function"==typeof e)return e;if("string"==typeof e){if(void 0!=window[e]&&"function"==typeof window[e])return window[e];try{return new Function(e)}catch(n){}}return function(){return e}}function Obj(){this._parent=null,this._handlers=[],this._onceHandlers=[],this._elements=$(),this.guid=generateGUID(),this.on=function(e,n){"function"==typeof e&&void 0===n&&(n=e,e="all"),e=e.toLowerCase().split(" ");for(var t=0;t<e.length;t++)this._handlers.push({event:e[t],handler:n});return this},this.once=function(e,n){"function"==typeof e&&void 0===n&&(n=e,e="all"),e=e.toLowerCase().split(" ");for(var t=0;t<e.length;t++)this._onceHandlers.push({event:e[t],handler:n});return this},this.off=function(e,n){if(void 0===n&&"function"==typeof e)for(var n=e,t=0;t<this._handlers.length;t++)this._handlers[t].handler==n&&this._handlers.splice(t--,1);else if(void 0===n&&"string"==typeof e){e=e.toLowerCase().split(" ");for(var t=0;t<this._handlers.length;t++)e.indexOf(this._handlers[t].event)>-1&&this._handlers.splice(t--,1)}else{e=e.toLowerCase().split(" ");for(var t=0;t<this._handlers.length;t++)e.indexOf(this._handlers[t].event)>-1&&this._handlers[t].handler==n&&this._handlers.splice(t--,1)}return this},this.offOnce=function(e,n){if(void 0===n&&"function"==typeof e)for(var n=e,t=0;t<this._onceHandlers.length;t++)this._onceHandlers[t].handler==n&&this._onceHandlers.splice(t--,1);else if(void 0===n&&"string"==typeof e){e=e.toLowerCase().split(" ");for(var t=0;t<this._onceHandlers.length;t++)e.indexOf(this._onceHandlers[t].event)>-1&&this._onceHandlers.splice(t--,1)}else{e=e.toLowerCase().split(" ");for(var t=0;t<this._onceHandlers.length;t++)e.indexOf(this._onceHandlers[t].event)>-1&&this._onceHandlers[t].handler==n&&this._onceHandlers.splice(t--,1)}return this},this.trigger=function(e,n){e=e.toLowerCase().split(" ");for(var t=0;t<this._handlers.length;t++)(e.indexOf(this._handlers[t].event)>-1||"all"==this._handlers[t].event)&&toFunc(this._handlers[t].handler).call(this,this._handlers[t].event,n);for(var t=0;t<this._onceHandlers.length;t++)(e.indexOf(this._onceHandlers[t].event)>-1||"all"==this._handlers[t].event)&&(toFunc(this._onceHandlers[t].handler).call(this,this._onceHandlers[t].event,n),this._onceHandlers.splice(t--,1));return this},this.renderer=function(){return $("<div class='Obj'></div>")},this.refresher=function(e){return this.renderer.apply(this)},this.destroyer=function(e){},this.render=function(e,n){var t=this;if(void 0===e)var e="body";if(void 0===n)var n="replace";else n=n.toLowerCase();var i=[].slice.call(arguments,2),r=this;return $(e).each(function(e,s){s=$(s);var h=$(t.renderer.apply(t,i));h.attr("guid",t.guid),t._elements=t._elements.add(h),"append"==n?s.append(h):"prepend"==n?s.prepend(h):"after"==n?s.after(h):"before"==n?s.before(h):"return"==n?r=h:"none"==n||(s.after(h),s.remove())}),this.trigger("render"),r},this.refresh=function(){for(var e=$(),n=0;n<this._elements.length;n++){var t=this._elements.eq(n),i=this.refresher.call(this,t);i?(i.attr("guid",this.guid),this._elements=this._elements.not(t),t.after(i),t.remove(),e=e.add(i)):e=e.add(t)}return this._elements=e,this},this.destroy=function(){var e=this;return this._elements.each(function(n,t){var i=$(t);e.destroyer.call(e,i)}),this._elements.remove(),this._elements=$(),delete Objs[this.guid],this},Objs[this.guid]=this}var GUIDList=[],Objs={};
if($add===undefined)var $add={version:{},auto:{disabled:false}};
$add.version.Slider = "2.0.1";
$add.SliderObj = function(settings){
  Obj.apply(this);
  
  function toNearest(num, x){
    return (Math.round(num * (1/x)) / (1/x));
  }
  function betterParseFloat(t){return isNaN(parseFloat(t))&&t.length>0?betterParseFloat(t.substr(1)):parseFloat(t)};
  
  this._settings = {
    direction: "horizontal",
    min: 0,
    max: 100000,
    step: 0.1,
    value: 50,
    fontsize: 18,
    formatter: function(x){
      if((this._settings.step+"").indexOf(".")>-1)
        var digits = (this._settings.step+"").split(".").pop().length;
      else
        var digits = 0;
      v = betterParseFloat(x);
      if(x<0){
        var neg = true;
        x = 0 - x;
      } else {
        var neg = false;
      }
      if(isNaN(x)){
        return "NaN";
      }
      var whole = Math.floor(x);
      var dec = (x - whole);
      dec = Math.round(dec * Math.pow(10, digits));
      dec = dec+"";
      while(dec.length<digits){
        dec = "0" + dec;
      }
      return ((neg)?"-":"")+whole+((digits>0)?"."+dec:"");
    },
    timeout: 2000,
    range: false,
    id: false,
    name: "",
    class: ""
  };
  Object.defineProperty(this, "settings", {
    get: function(){
      this.trigger("getsetting settings", this._settings);
      return this._settings;
    },
    set: function(newSettings){
      this._settings = $.extend(this._settings, settings);
      this.trigger("setsettings settings", this._settings);
      this.refresh();
    }
  });
  Object.defineProperty(this, "value", {
    get: function(){
      this.trigger("getvalue value", this._settings.value);
      return this._settings.value;
    },
    set: function(newVal){
      var self = this;
      this._settings.value = newVal;
      
      this._elements.find(".addui-slider-input").val(this._settings.value);
      if(!this._settings.range){
        var offset = betterParseFloat(this._settings.value) - this._settings.min;
        var per = (toNearest(offset, this._settings.step) / (this._settings.max - this._settings.min))  * 100;
        if(this._settings.direction == "vertical"){
          this._elements.find(".addui-slider-handle").css("bottom", per+"%");
          this._elements.find(".addui-slider-range").css("height", per+"%");
          this._elements.find(".addui-slider-range").css("bottom", "0%");
        } else {
          this._elements.find(".addui-slider-handle").css("left", per+"%");
          this._elements.find(".addui-slider-range").css("width", per+"%");
        }
        this._elements.find(".addui-slider-value span").html(toFunc(this._settings.formatter).call(this, this._settings.value));
      } else {
        var l = (toNearest(parseFloat(this._settings.value.split(",")[0]), this._settings.step));
        var h = (toNearest(parseFloat(this._settings.value.split(",")[1]), this._settings.step));
        var range = this._settings.max - this._settings.min;
        var offsetL = l - this._settings.min;
        var offsetH = h - this._settings.min;
        var lPer = (offsetL / range) * 100;
        var hPer = (offsetH / range) * 100;
        this._elements.each(function(i,el){
          var $el = $(el);
          if(self._settings.direction == "vertical"){
            $el.find(".addui-slider-handle").eq(0).css("bottom", lPer+"%");
            $el.find(".addui-slider-handle").eq(1).css("bottom", hPer+"%");
            $el.find(".addui-slider-range").css("bottom", lPer+"%").css("height", (hPer-lPer)+"%");
          } else {
            $el.find(".addui-slider-handle").eq(0).css("left", lPer+"%");
            $el.find(".addui-slider-handle").eq(1).css("left", hPer+"%");
            $el.find(".addui-slider-range").css("left", lPer+"%").css("width", (hPer-lPer)+"%");
          }
          $el.find(".addui-slider-handle").eq(0).find(".addui-slider-value span").html(toFunc(self._settings.formatter).call(self, l));
          $el.find(".addui-slider-handle").eq(1).find(".addui-slider-value span").html(toFunc(self._settings.formatter).call(self, h));
        });
      }
    }
  });
  
  this.renderer = function(){
    var self = this;
    var $slider = $("<div class='addui-slider addui-slider-"+this._settings.direction+((this._settings.range)?" addui-slider-isrange":"")+" "+this._settings.class+"' "+((this._settings.id)?"id='"+this._settings.id+"'":"")+"></div>");
    var $input = $("<input class='addui-slider-input' type='hidden' name='"+this._settings.name+"' value='"+this._settings.value+"' />").appendTo($slider);
    var $track = $("<div class='addui-slider-track'></div>").appendTo($slider);
    var $range = $("<div class='addui-slider-range'></div>").appendTo($track);
    
    if(!this._settings.range){
      var $handle = $("<div class='addui-slider-handle'><div class='addui-slider-value'><span style='font-size: "+this._settings.fontsize+"px'></span></div></div>").appendTo($track);
      var activeTimer = null;
      function dragHandler(e){
        e.preventDefault();
        if(self._settings.direction == "vertical"){
          if(e.type == "touchmove")
            var y = e.originalEvent.changedTouches[0].pageY;
          else
            var y = e.pageY;
          var sliderY = $slider.offset().top + $slider.height();
          var offsetY = sliderY - y;
          var offsetPer = (offsetY / $slider.height()) * 100;
        } else {
          if(e.type == "touchmove")
            var x = e.originalEvent.changedTouches[0].pageX;
          else
            var x = e.pageX;
          var sliderX = $slider.offset().left;
          var offsetX = x - sliderX;
          var offsetPer = (offsetX / $slider.width()) * 100;
        }
        
        var val = toNearest((offsetPer / 100) * (self._settings.max - self._settings.min), self._settings.step) + self._settings.min;
        val = Math.min(self._settings.max,Math.max(self._settings.min,val));
        self.value = toNearest(val, self._settings.step);
      };
      function dragStopHandler(e){
        $(window).off("mousemove touchmove", dragHandler);
        activeTimer = setTimeout(function(){
          $handle.removeClass("addui-slider-handle-active");
        }, self._settings.timeout);
      };
      $handle.on("mousedown touchstart", function(e){
        clearTimeout(activeTimer);
        $handle.addClass("addui-slider-handle-active");
        $(window).on("mousemove touchmove dragmove", dragHandler);
        $(window).one("mouseup touchend", dragStopHandler);
      });
      $slider.on("click", function(e){
        e.preventDefault();
        
        if(self._settings.direction == "vertical"){
          if(e.type == "touchmove")
            var y = e.originalEvent.changedTouches[0].pageY;
          else
            var y = e.pageY;
          var sliderY = $slider.offset().top + $slider.height();
          var offsetY = sliderY - y;
          var offsetPer = (offsetY / $slider.height()) * 100;
        } else {
          if(e.type == "touchmove")
            var x = e.originalEvent.changedTouches[0].pageX;
          else
            var x = e.pageX;
          var sliderX = $slider.offset().left;
          var offsetX = x - sliderX;
          var offsetPer = (offsetX / $slider.width()) * 100;
        }
        
        var val = toNearest((offsetPer / 100) * (self._settings.max - self._settings.min), self._settings.step) + self._settings.min;
        val = Math.min(self._settings.max,Math.max(self._settings.min,val));
        clearTimeout(activeTimer);
        $handle.addClass("addui-slider-handle-active");
        activeTimer = setTimeout(function(){
          $handle.removeClass("addui-slider-handle-active");
        }, self._settings.timeout);
        self.value = val;
      });
    } else {
      var $handle1 = $("<div class='addui-slider-handle addui-slider-handle-l'><div class='addui-slider-value'><span style='font-size: "+this._settings.fontsize+"px'></span></div></div>").appendTo($track);
      var activeTimer1 = null;
      
      
      function dragHandler1(e){
        e.preventDefault();
        if(self._settings.direction == "vertical"){
          if(e.type == "touchmove")
            var y = e.originalEvent.changedTouches[0].pageY;
          else
            var y = e.pageY;
          var sliderY = $slider.offset().top + $slider.height();
          var offsetY = sliderY - y;
          var range = self._settings.max - self._settings.min;
          var offsetPer = (offsetY / $slider.height()) * 100;
        } else {
          if(e.type == "touchmove")
            var x = e.originalEvent.changedTouches[0].pageX;
          else
            var x = e.pageX;
          var sliderX = $slider.offset().left;
          var offsetX = x - sliderX;
          var range = self._settings.max - self._settings.min;
          var offsetPer = (offsetX / $slider.width()) * 100;
        }
        var offsetVal = offsetPer / 100 * range;
        var val = toNearest(offsetVal + self._settings.min, self._settings.step);
        val = Math.min(self._settings.max, Math.max(self._settings.min, val));
        var higherVal = toNearest(betterParseFloat(self._settings.value.split(',')[1]), self._settings.step);
        if(higherVal < val)
          higherVal = val;
        self.value = val+","+higherVal;
      };
      
      
      function dragStopHandler1(e){
        $(window).off("mousemove touchmove", dragHandler1);
        activeTimer1 = setTimeout(function(){
          $handle1.removeClass("addui-slider-handle-active");
        }, self._settings.timeout);
      };
      $handle1.on("mousedown touchstart", function(e){
        clearTimeout(activeTimer1);
        $handle1.addClass("addui-slider-handle-active");
        $(window).on("mousemove touchmove dragmove", dragHandler1);
        $(window).one("mouseup touchend", dragStopHandler1);
      });
      
      var $handle2 = $("<div class='addui-slider-handle addui-slider-handle-h'><div class='addui-slider-value'><span style='font-size: "+this._settings.fontsize+"px'></span></div></div>").appendTo($track);
      var activeTimer2 = null;
      
      
      function dragHandler2(e){
        e.preventDefault();
        if(self._settings.direction == "vertical"){
          if(e.type == "touchmove")
            var y = e.originalEvent.changedTouches[0].pageY;
          else
            var y = e.pageY;
          var sliderY = $slider.offset().top + $slider.height();
          var offsetY = sliderY - y;
          var offsetPer = (offsetY / $slider.height()) * 100;
        } else {
          if(e.type == "touchmove")
            var x = e.originalEvent.changedTouches[0].pageX;
          else
            var x = e.pageX;
          var sliderX = $slider.offset().left;
          var offsetX = x - sliderX;
          var offsetPer = (offsetX / $slider.width()) * 100;
        }
        var range = self._settings.max - self._settings.min;
        var offsetVal = offsetPer / 100 * range;
        var val = toNearest(offsetVal + self._settings.min, self._settings.step);
        val = Math.min(self._settings.max, Math.max(self._settings.min, val));
        var lowerVal = toNearest(betterParseFloat(self._settings.value.split(',')[0]), self._settings.step);
        if(lowerVal > val)
          lowerVal = val;
        self.value = lowerVal+","+val;
      };
      
      
      function dragStopHandler2(e){
        $(window).off("mousemove touchmove", dragHandler2);
        activeTimer2 = setTimeout(function(){
          $handle2.removeClass("addui-slider-handle-active");
        }, self._settings.timeout);
      };
      $handle2.on("mousedown touchstart", function(e){
        clearTimeout(activeTimer2);
        $handle2.addClass("addui-slider-handle-active");
        $(window).on("mousemove touchmove dragmove", dragHandler2);
        $(window).one("mouseup touchend", dragStopHandler2);
      });
    }
    return $slider;
  };
  
  this.init = function(settings){
    var self = this;
    this.settings = settings;
    if(!this._settings.range){
      this._settings.value = Math.max(this._settings.min, Math.min(this._settings.max, betterParseFloat(this._settings.value)));
    } else {
      var val = this._settings.value+"";
      if(val.indexOf(",") > -1){ // Already has two values
        var values = val.split(",");
        var v1 = betterParseFloat(values[0]);
        v1 = Math.min(this._settings.max, Math.max(this._settings.min, v1));
        v1 = toNearest(v1, this._settings.step);
        
        var v2 = betterParseFloat(values[1]);
        v2 = Math.min(this._settings.max, Math.max(this._settings.min, v2));
        v2 = toNearest(v2, this._settings.step);
      } else { // Only has one value
        var val = toNearest(Math.max(this._settings.min, Math.min(this._settings.max, betterParseFloat(this._settings.value))), this._settings.step);
        var middle = (this._settings.max - this._settings.min) / 2;
        if(val < middle){
          var v1 = val;
          var v2 = this._settings.max - val;
        } else {
          var v2 = val;
          var v1 = this._settings.min + val;
        }
      }
      if(v1<v2)
        this._settings.value = v1+","+v2;
      else
        this._settings.value = v2+","+v1;
    }
    this.on("render", function(){
      self.value = self._settings.value;
    })
    this.trigger("init", {
      settings: this._settings
    });
  };
  this.init.apply(this, arguments);
};
$add.Slider = function(selector, settings){
  var o = $(selector).each(function(i,el){
    var $el = $(el);
    var s = {};
    if($el.attr("name"))
      s.name = $el.attr("name");
    if($el.attr("class"))
      s.class = $el.attr("class");
    if($el.attr("id"))
      s.id = $el.attr("id");
    if($el.attr("value"))
      s.value = $el.attr("value");
    if($el.attr("min"))
      s.min = $el.attr("min");
    if($el.attr("max"))
      s.max = $el.attr("max");
    if($el.attr("step"))
      s.step = $el.attr("step");
    settings = $.extend(s, $el.data(), settings);
    var S = new $add.SliderObj(settings);
    S.render($el, "replace");
    return S;
  });
  return (o.length == 0)?null:(o.length==1)?o[0]:o;
};
$.fn.addSlider = function(settings){
  $add.Slider(this, settings);
};
$add.auto.Slider = function(){
  if(!$add.auto.disabled)
    $("[data-addui=slider]").addSlider();
};
$(function(){
  $add.auto.Slider();
});

function betterParseFloat(x){
  if(isNaN(parseFloat(x)) && x.length > 0)
    return betterParseFloat(x.substr(1));
    return parseFloat(x);
}
function usd(x){
  x = betterParseFloat(x);
  if(isNaN(x))
    return "$0.00";
  var dollars = Math.floor(x);
  var cents = Math.round((x - dollars) * 100) + "";
  if(cents.length==1)cents = "0";
  return "$"+dollars;
}
/* ----- Range Slider With Tooltip END with jQuery UI Touch Punch 0.2.3  ----- */



/**
* asRange v0.3.4
* https://github.com/amazingSurge/jquery-asRange
*
* Copyright (c) amazingSurge
* Released under the LGPL-3.0 license
*/
!function(t,e){if("function"==typeof define&&define.amd)define(["jquery"],e);else if("undefined"!=typeof exports)e(require("jquery"));else{e(t.jQuery),t.jqueryAsRangeEs={}}}(this,function(t){"use strict";var e,i=(e=t)&&e.__esModule?e:{default:e};var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),o={namespace:"asRange",skin:null,max:100,min:0,value:null,step:10,limit:!0,range:!1,direction:"h",keyboard:!0,replaceFirst:!1,tip:!0,scale:!0,format:function(t){return t}};function r(t){var e=t.originalEvent;return e.touches&&e.touches.length&&e.touches[0]&&(e=e.touches[0]),e}var u,l=function(){function t(e,s,a){n(this,t),this.$element=e,this.uid=s,this.parent=a,this.options=i.default.extend(!0,{},this.parent.options),this.direction=this.options.direction,this.value=null,this.classes={active:this.parent.namespace+"-pointer_active"}}return a(t,[{key:"mousedown",value:function(t){var e=this.parent.direction.axis,s=this.parent.direction.position,n=this.parent.$wrap.offset();this.$element.trigger(this.parent.namespace+"::moveStart",this),this.data={},this.data.start=t[e],this.data.position=t[e]-n[s];var a=this.parent.getValueFromPosition(this.data.position);return this.set(a),i.default.each(this.parent.pointer,function(t,e){e.deactive()}),this.active(),this.mousemove=function(t){var i=r(t),s=this.parent.getValueFromPosition(this.data.position+(i[e]||this.data.start)-this.data.start);return this.set(s),t.preventDefault(),!1},this.mouseup=function(){return(0,i.default)(document).off(".asRange mousemove.asRange touchend.asRange mouseup.asRange touchcancel.asRange"),this.$element.trigger(this.parent.namespace+"::moveEnd",this),!1},(0,i.default)(document).on("touchmove.asRange mousemove.asRange",i.default.proxy(this.mousemove,this)).on("touchend.asRange mouseup.asRange",i.default.proxy(this.mouseup,this)),!1}},{key:"active",value:function(){this.$element.addClass(this.classes.active)}},{key:"deactive",value:function(){this.$element.removeClass(this.classes.active)}},{key:"set",value:function(t){this.value!==t&&(this.parent.step&&(t=this.matchStep(t)),!0===this.options.limit?t=this.matchLimit(t):(t<=this.parent.min&&(t=this.parent.min),t>=this.parent.max&&(t=this.parent.max)),this.value=t,this.updatePosition(),this.$element.focus(),this.$element.trigger(this.parent.namespace+"::move",this))}},{key:"updatePosition",value:function(){var t={};t[this.parent.direction.position]=this.getPercent()+"%",this.$element.css(t)}},{key:"getPercent",value:function(){return(this.value-this.parent.min)/this.parent.interval*100}},{key:"get",value:function(){return this.value}},{key:"matchStep",value:function(t){var e=this.parent.step,i=e.toString().split(".")[1];return t=Math.round(t/e)*e,i&&(t=t.toFixed(i.length)),parseFloat(t)}},{key:"matchLimit",value:function(t){var e=void 0,i=void 0,s=this.parent.pointer;return t<=(e=1===this.uid?this.parent.min:s[this.uid-2].value)&&(t=e),t>=(i=s[this.uid]&&null!==s[this.uid].value?s[this.uid].value:this.parent.max)&&(t=i),t}},{key:"destroy",value:function(){this.$element.off(".asRange"),this.$element.remove()}}]),t}(),h={defaults:{scale:{valuesNumber:3,gap:1,grid:5}},init:function(t){var e=i.default.extend({},this.defaults,t.options.scale).scale;e.values=[],e.values.push(t.min);for(var s=(t.max-t.min)/(e.valuesNumber-1),n=1;n<=e.valuesNumber-2;n++)e.values.push(s*n);e.values.push(t.max);var a={scale:t.namespace+"-scale",lines:t.namespace+"-scale-lines",grid:t.namespace+"-scale-grid",inlineGrid:t.namespace+"-scale-inlineGrid",values:t.namespace+"-scale-values"},o=e.values.length,r=((e.grid-1)*(e.gap+1)+e.gap)*(o-1)+o,u=100/(r-1),l=100/(o-1);this.$scale=(0,i.default)("<div></div>").addClass(a.scale),this.$lines=(0,i.default)("<ul></ul>").addClass(a.lines),this.$values=(0,i.default)("<ul></ul>").addClass(a.values);for(var h=0;h<r;h++){(0===h||h===r||h%((r-1)/(o-1))==0?(0,i.default)('<li class="'+a.grid+'"></li>'):h%e.grid==0?(0,i.default)('<li class="'+a.inlineGrid+'"></li>'):(0,i.default)("<li></li>")).css({left:u*h+"%"}).appendTo(this.$lines)}for(var p=0;p<o;p++)(0,i.default)("<li><span>"+e.values[p]+"</span></li>").css({left:l*p+"%"}).appendTo(this.$values);this.$lines.add(this.$values).appendTo(this.$scale),this.$scale.appendTo(t.$wrap)},update:function(t){this.$scale.remove(),this.init(t)}},p={defaults:{},init:function(t){var e=this;if(this.$arrow=(0,i.default)("<span></span>").appendTo(t.$wrap),this.$arrow.addClass(t.namespace+"-selected"),!1===t.options.range&&t.p1.$element.on(t.namespace+"::move",function(t,i){e.$arrow.css({left:0,width:i.getPercent()+"%"})}),!0===t.options.range){var s=function(){var i=t.p2.getPercent()-t.p1.getPercent(),s=void 0;i>=0?s=t.p1.getPercent():(i=-i,s=t.p2.getPercent()),e.$arrow.css({left:s+"%",width:i+"%"})};t.p1.$element.on(t.namespace+"::move",s),t.p2.$element.on(t.namespace+"::move",s)}}},c={defaults:{active:"always"},init:function(t){var e=this,n=i.default.extend({},this.defaults,t.options.tip);this.opts=n,this.classes={tip:t.namespace+"-tip",show:t.namespace+"-tip-show"},i.default.each(t.pointer,function(n,a){var o=(0,i.default)("<span></span>").appendTo(t.pointer[n].$element);o.addClass(e.classes.tip),"onMove"===e.opts.active&&(o.css({display:"none"}),a.$element.on(t.namespace+"::moveEnd",function(){return e.hide(o),!1}).on(t.namespace+"::moveStart",function(){return e.show(o),!1})),a.$element.on(t.namespace+"::move",function(){var e=void 0;if(e=t.options.range?t.get()[n]:t.get(),"function"==typeof t.options.format)if(t.options.replaceFirst&&"number"!=typeof e){if("string"==typeof t.options.replaceFirst&&(e=t.options.replaceFirst),"object"===s(t.options.replaceFirst))for(var i in t.options.replaceFirst)Object.hasOwnProperty(t.options.replaceFirst,i)&&(e=t.options.replaceFirst[i])}else e=t.options.format(e);return o.text(e),!1})})},show:function(t){t.addClass(this.classes.show),t.css({display:"block"})},hide:function(t){t.removeClass(this.classes.show),t.css({display:"none"})}},d={},f=function(){function t(e,s){var a=this;n(this,t);var r={};if(this.element=e,this.$element=(0,i.default)(e),this.$element.is("input")){var u=this.$element.val();"string"==typeof u&&(r.value=u.split(",")),i.default.each(["min","max","step"],function(t,e){var i=parseFloat(a.$element.attr(e));isNaN(i)||(r[e]=i)}),this.$element.css({display:"none"}),this.$wrap=(0,i.default)("<div></div>"),this.$element.after(this.$wrap)}else this.$wrap=this.$element;if(this.options=i.default.extend({},o,s,this.$element.data(),r),this.namespace=this.options.namespace,this.components=i.default.extend(!0,{},d),this.options.range&&(this.options.replaceFirst=!1),this.value=this.options.value,null===this.value&&(this.value=this.options.min),this.options.range?i.default.isArray(this.value)?1===this.value.length&&(this.value[1]=this.value[0]):this.value=[this.value,this.value]:i.default.isArray(this.value)&&(this.value=this.value[0]),this.min=this.options.min,this.max=this.options.max,this.step=this.options.step,this.interval=this.max-this.min,this.initialized=!1,this.updating=!1,this.disabled=!1,"v"===this.options.direction?this.direction={axis:"pageY",position:"top"}:this.direction={axis:"pageX",position:"left"},this.$wrap.addClass(this.namespace),this.options.skin&&this.$wrap.addClass(this.namespace+"_"+this.options.skin),this.max<this.min||this.step>=this.interval)throw new Error("error options about max min step");this.init()}return a(t,[{key:"init",value:function(){this.$wrap.append('<div class="'+this.namespace+'-bar" />'),this.buildPointers(),this.components.selected.init(this),!1!==this.options.tip&&this.components.tip.init(this),!1!==this.options.scale&&this.components.scale.init(this),this.set(this.value),this.bindEvents(),this._trigger("ready"),this.initialized=!0}},{key:"_trigger",value:function(t){for(var e=arguments.length,i=Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];var n=[this].concat(i);this.$element.trigger(this.namespace+"::"+t,n);var a="on"+(t=t.replace(/\b\w+\b/g,function(t){return t.substring(0,1).toUpperCase()+t.substring(1)}));"function"==typeof this.options[a]&&this.options[a].apply(this,i)}},{key:"buildPointers",value:function(){this.pointer=[];var t=1;this.options.range&&(t=2);for(var e=1;e<=t;e++){var s=(0,i.default)('<div class="'+this.namespace+"-pointer "+this.namespace+"-pointer-"+e+'"></div>').appendTo(this.$wrap),n=new l(s,e,this);this.pointer.push(n)}this.p1=this.pointer[0],this.options.range&&(this.p2=this.pointer[1])}},{key:"bindEvents",value:function(){var t=this,e=this;this.$wrap.on("touchstart.asRange mousedown.asRange",function(t){if(!0!==e.disabled){if((t=r(t)).which?3===t.which:2===t.button)return!1;var i=e.$wrap.offset(),s=t[e.direction.axis]-i[e.direction.position];return e.getAdjacentPointer(s).mousedown(t),!1}}),this.$element.is("input")&&this.$element.on(this.namespace+"::change",function(){var e=t.get();t.$element.val(e)}),i.default.each(this.pointer,function(i,s){s.$element.on(t.namespace+"::move",function(){return e.value=e.get(),!(!e.initialized||e.updating)&&(e._trigger("change",e.value),!1)})})}},{key:"getValueFromPosition",value:function(t){return t>0?this.min+t/this.getLength()*this.interval:0}},{key:"getAdjacentPointer",value:function(t){var e=this.getValueFromPosition(t);if(this.options.range){var i=this.p1.value,s=this.p2.value,n=Math.abs(i-s);return i<=s?e>i+n/2?this.p2:this.p1:e>s+n/2?this.p1:this.p2}return this.p1}},{key:"getLength",value:function(){return"v"===this.options.direction?this.$wrap.height():this.$wrap.width()}},{key:"update",value:function(t){var e=this;this.updating=!0,i.default.each(["max","min","step","limit","value"],function(i,s){t[s]&&(e[s]=t[s])}),(t.max||t.min)&&this.setInterval(t.min,t.max),t.value||(this.value=t.min),i.default.each(this.components,function(t,i){"function"==typeof i.update&&i.update(e)}),this.set(this.value),this._trigger("update"),this.updating=!1}},{key:"get",value:function(){var t=[];if(i.default.each(this.pointer,function(e,i){t[e]=i.get()}),this.options.range)return t;if(t[0]===this.options.min&&("string"==typeof this.options.replaceFirst&&(t[0]=this.options.replaceFirst),"object"===s(this.options.replaceFirst)))for(var e in this.options.replaceFirst)Object.hasOwnProperty(this.options.replaceFirst,e)&&(t[0]=e);return t[0]}},{key:"set",value:function(t){if(this.options.range){if("number"==typeof t&&(t=[t]),!i.default.isArray(t))return;i.default.each(this.pointer,function(e,i){i.set(t[e])})}else this.p1.set(t);this.value=t}},{key:"val",value:function(t){return t?(this.set(t),this):this.get()}},{key:"setInterval",value:function(t,e){this.min=t,this.max=e,this.interval=e-t}},{key:"enable",value:function(){return this.disabled=!1,this.$wrap.removeClass(this.namespace+"_disabled"),this._trigger("enable"),this}},{key:"disable",value:function(){return this.disabled=!0,this.$wrap.addClass(this.namespace+"_disabled"),this._trigger("disable"),this}},{key:"destroy",value:function(){i.default.each(this.pointer,function(t,e){e.destroy()}),this.$wrap.destroy(),this._trigger("destroy")}}],[{key:"registerComponent",value:function(t,e){d[t]=e}},{key:"setDefaults",value:function(t){i.default.extend(o,i.default.isPlainObject(t)&&t)}}]),t}();f.registerComponent("scale",h),f.registerComponent("selected",p),f.registerComponent("tip",c),(u=(0,i.default)(document)).on("asRange::ready",function(t,e){var s=void 0,n={keys:{UP:38,DOWN:40,LEFT:37,RIGHT:39,RETURN:13,ESCAPE:27,BACKSPACE:8,SPACE:32},map:{},bound:!1,press:function(t){var e=t.keyCode||t.which;if(e in n.map&&"function"==typeof n.map[e])return n.map[e](t),!1},attach:function(t){var e=void 0,i=void 0;for(e in t)t.hasOwnProperty(e)&&((i=e.toUpperCase())in n.keys?n.map[n.keys[i]]=t[e]:n.map[i]=t[e]);n.bound||(n.bound=!0,u.bind("keydown",n.press))},detach:function(){n.bound=!1,n.map={},u.unbind("keydown",n.press)}};!0===e.options.keyboard&&i.default.each(e.pointer,function(t,i){s=e.options.step?e.options.step:1;var a=function(){var t=i.value;i.set(t-s)},o=function(){var t=i.value;i.set(t+s)};i.$element.attr("tabindex","0").on("focus",function(){return n.attach({left:a,right:o}),!1}).on("blur",function(){return n.detach(),!1})})});var v="asRange",m=i.default.fn.asRange;function g(t){for(var e=arguments.length,s=Array(e>1?e-1:0),n=1;n<e;n++)s[n-1]=arguments[n];if("string"==typeof t){var a=t;if(/^_/.test(a))return!1;if(!(/^(get)$/.test(a)||"val"===a&&0===s.length))return this.each(function(){var t=i.default.data(this,v);t&&"function"==typeof t[a]&&t[a].apply(t,s)});var o=this.first().data(v);if(o&&"function"==typeof o[a])return o[a].apply(o,s)}return this.each(function(){(0,i.default)(this).data(v)||(0,i.default)(this).data(v,new f(this,t))})}i.default.fn.asRange=g,i.default.asRange=i.default.extend({setDefaults:f.setDefaults,noConflict:function(){return i.default.fn.asRange=m,g}},{version:"0.3.4"})});