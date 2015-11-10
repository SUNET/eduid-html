function isIE() { return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); }
var ie = isIE(),
    mobile = (/webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())),
    mobileSized = false,
    ipad = (/ipad/i.test(navigator.userAgent.toLowerCase()));



var Project = (function ($, window, document, undefined) {
    var isScrolling = false,
        body = $('body'),
        wrapper = $('#wrapper'),
        header = $('#header'),
        section = $('section'),
        sideNav = $('#side-nav'),
        isScrolling = false;

    function windowEvents() {
        
        $(window).on('orientationchange', function (event) {            
            
            // måste jag veta ens? 
            // vad är det som ska uppdateras?

            /*
             * .data-top måste uppdateras
             * den måste kolla om höjden på section är för hög för fönstret
             */

            // Måste ändra wrapper top om den är satt

            var h = 0,
               lastScrollTop = 0,
               section = $('section'),
               sectionLength = section.length,
               scrollSection,
               loopSection;

            if (parseInt($('#wrapper').css('top')) < 0) {
                var index = $('section.active').index();

                $('#wrapper').css({ 'top': -(index * $(window).height()) });
            }
            
            for (var i = 0; i < sectionLength; i++) {
                loopSection = $('section').eq(i);
                //h += $(window).outerHeight();
                var test = i * $(window).outerHeight();

                if (loopSection.attr('id') == 'footer') {
                    // $('#wrapper').css({ 'top': -(index * $(window).height()) });
                    test = test - $(window).outerHeight() + loopSection.outerHeight(true);
                }

                //$('<span class="data-top">' + test + '</span>').appendTo(loopSection);
               loopSection.find('> .data-top').html(test);

                if (loopSection.hasClass('active')) {
                    $('#wrapper').css({ 'top': -(loopSection.find('> .data-top').html()) });
                }

                if (loopSection.hasClass('div-overflow')) {
                    loopSection.removeClass('div-overflow');
                }

                if (loopSection.hasClass('horisontal-scroll')) {
                    //bilden måste laddas in först
                     //loopSection.css({ 'height': loopSection.find('.holder:first').height() + loopSection.find('.button-holder').height() });
                }

                if (loopSection.find('.container').length > 1) {
                    loopSection.find('.container').each(function () {

                        if ($(this).outerHeight() > $(window).height()) {
                            loopSection.addClass('div-overflow');
                        }
                    });
                } else {

                    if (loopSection.find('.container').outerHeight() > $(window).height()) {
                        loopSection.addClass('div-overflow');
                    }
                }

                //loopSection.find('.test').css({'height': loopSection.find('.holder').first().outerHeight()});

            }

        });

        if (mobile == false && $('#wrapper').width() > 767 && ipad == false) {
            
            $(window).resize(function () {
                    
            });
        }

        var currentSection,
            topHeight,
            bottomHeight;

        $(window).scroll(function () {
            // Change meny color and active state on sidenav
            for (var i = 0; i < section.length; i++) {
                currentSection = section.eq(i);
                topHeight = currentSection.offset().top - (header.outerHeight(true) / 2);
                bottomHeight = currentSection.offset().top + currentSection.outerHeight(true) - (header.outerHeight(true) / 2);

                // Change active section
                if (!currentSection.hasClass('active') && body.scrollTop() > topHeight - ($(window).height() / 3) && body.scrollTop() < bottomHeight && isScrolling == false ) {
                    currentSection.siblings('.active').removeClass('active');
                    currentSection.addClass('active');
                    sideNav.find('.active').removeClass('active');
                    sideNav.find('li:eq(' + i + ')').addClass('active');

                    if (sideNav.find('.no-show').length == 0) {
                        sideNav.find('li').addClass('no-show');
                    }
                }
                
                // Change menu color 
           /*     if (!header.find('nav').hasClass(wrapper.attr('class') + '-' + i) && body.scrollTop() > topHeight && body.scrollTop() < bottomHeight) {
                    header.find('nav').attr('class', '')
                    header.find('nav').addClass(wrapper.attr('class') + '-' + i);
                }*/
            }

            if (isScrolling == true) return;
            // Make footer the active one, when scrolled to the bottom
            if (body.scrollTop() + $(window).height() >= $(document).height()) {
                $('section.active').removeClass('active');
                section.last().addClass('active');
                sideNav.find('.active').removeClass('active');
                sideNav.find('li:last').addClass('active'); 
                return;
            }
        });
    }

    function scrollPage(position) {
        isScrolling = true;

        $('html,body').animate({
            scrollTop: position
        }, 400, function () {
            isScrolling = false;
        });
    }

    return {
        init: function () {
            var h = 0,
                lastScrollTop = 0,
                section = $('section'), 
                sectionLength = section.length,
                scrollSection, 
                loopSection;

            $("li > a[href=\"" + window.location.pathname + "\"]:parent").parent().addClass("current-menu-item");

            $('img.mobile-featured-image').each(function () {
                var _this = $(this),
                    mobileSrc = _this.data('mobile-src'),
                    nonMobileSrc = _this.data('src');

                if (mobile == true && $('#wrapper').width() < 768) {
                    // mobile
                    _this.attr({ 'src': mobileSrc });
                } else {
                    // non mobile
                    _this.attr({ 'src': nonMobileSrc });
                }

            });

            $('body').flowtype({
                minFont: 12,
                maxFont: 60
            });
            
            windowEvents();
            
            section.first().addClass('start active').find('.holder').addClass('active');
           // header.find('nav').addClass(wrapper.attr('class') + '-0');
   
            for (var i = 0; i < sectionLength; i++) {
                loopSection = $('section').eq(i);
               
                var li = $('<li><span></span><div><p>' + loopSection.find('.page-title').html() + '</p></div></li>');
                
                $('#side-nav ul').append(li);
            }

            $('#side-nav li:first').addClass('active');

            $('.button.scroll-down').off('click').on('click', function () {
                var _this = $(this),
                    section = _this.closest('section').next();

                scrollPage(section.offset().top);
            });

            $('.button.scroll-up').off('click').on('click', function () {
                scrollPage(0);
            });
            
            if (mobile == false && $('#wrapper').width() > 767) {
            
                $('#side-nav').css({ 'margin-top': -($('#side-nav').height() / 2) });

                // Desktop
                $('.no-touch #side-nav li').mouseenter(function () {
                    if (!$(this).siblings('li').hasClass('no-show')) {
                        $(this).parent().find('li').addClass('no-show');
                    }
                });

                $('.no-touch #side-nav li').off('click').on('click', function () {
                    var _this = $(this);

                    _this.siblings('.active').removeClass('active');
                    _this.addClass('active');

                    section.siblings('section').removeClass('active');

                    section.eq(_this.index()).addClass('active');
          
                    scrollPage(section.eq(_this.index()).offset().top);
                 
                });
                // iPad-fix
                $('.touch #side-nav li').off('click').on('click', function () {
                    // bara li med klass open får öppnas. 
                    // ge först klass open
                    // sen om den har klass open kan den scrolla. då tas även klass open bort
                    // har den inte klass open, ta bort

                    if (!$(this).siblings('li').hasClass('no-show')) {
                        $(this).parent().find('li').addClass('no-show');
                    }

                    var _this = $(this);

                    if (_this.hasClass('open')) {
                        _this.siblings('.active').removeClass('active');
                        _this.addClass('active');
                        _this.removeClass('open');

                        section.siblings('section').removeClass('active');

                        section.eq(_this.index()).addClass('active');

                        scrollPage(section.eq(_this.index()).offset().top);

                    } else {
                        _this.addClass('open');
                        _this.siblings('.open').removeClass('open');
                    }
                   
                });

                if ($('section.questions').length > 0) {
                    var index = $('section.questions').index();
                    $('#side-nav li').eq(index).addClass('faq');
                }
            } else {
                // Mobile
                $('#header nav').css({ 'height': $(window).height() - $('#header').height() });
                
                var mobileWrapperTop = 0;
                $('#mobile-nav').off('click').on('click', function () {

                    //$('#header nav').toggleClass('open');
                    if ($('#header nav').hasClass('open')) {
                        $('#header nav').removeClass('open').slideUp();
                        $('#wrapper').css({ 'position': 'static', 'top': 0 });
                        $(window).scrollTop(mobileWrapperTop);
                        $(this).removeClass('open');
                    } else {
                        $('#header nav').addClass('open').slideDown();
                        mobileWrapperTop = $(window).scrollTop();
                        $('#wrapper').css({ 'position': 'fixed', 'top': -(mobileWrapperTop) });
                        $(this).addClass('open');
                    }
                });

                $('#header nav li a').off('click').on('click', function (e) {
                    return;
                    // om den inte har klass active, ta bort .active från siblings och ge den klass active. preventdefault. 
                    // om den har klass active så ta den till sidan
                    // om den inte har ett ulsyskon ska den scrollas ner
                    // om den inte har ett ulsyskon och inte finns på den här sidan ska man öppna en ny sida INTE GJORT
                    e.preventDefault();

                    var _this = $(this),
                        li = _this.closest('li'),
                        href = _this.attr('href');

                    if (_this.siblings('ul').length == 0) {
                        // kod för scrollning ner på sidann
                        $('#header nav').removeClass('open').slideUp();
                        $('#wrapper').css({ 'position': 'static', 'top': 0 });
                        $(window).scrollTop(mobileWrapperTop);

                        var hrefL = href.length,
                            indexof = href.indexOf('#'),
                            content = href.substring(hrefL, indexof);
                        content = content.replace('#', '');
                        var anchor = $("a[name='" + content + "']");

                        scrollPage(anchor.offset().top - $('#header').height());
                       /* $('body').animate({
                            scrollTop: anchor.offset().top - $('#header').height()
                        }); */                          

                    } else {
                        if (li.hasClass('active')) {
                            location.href = href;
                        } else {
                            li.siblings('.active').removeClass('active');
                            li.addClass('active');
                        }
                    }
                });

            }

            $('.questions li h3').off('click').on('click', function (e) {
                var _this = $(this),
                    parent = _this.closest('li');

                if (parent.hasClass('active')) {
                    parent.removeClass('active');
                    parent.find('p').slideUp(200);
                } else {
                    parent.siblings('.active').removeClass('active').find('p').slideUp(200);
                    parent.addClass('active');
                    parent.find('p').slideDown(200);
                }
            });

        }
    }

})(jQuery, window, document);

$(function () {
    Project.init();
});


var Helpers = (function ($) {

    return {
        transEndEventNames: {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd',
            msTransition: 'msTransitionEnd',
            transition: 'transitionEnd'
        },
        Transition: function (object, cssProperties, duration, ease, callback) {
            duration = duration || 500;

            var objects = [];

            if (object instanceof Array) {
                objects = object;
            } else if (typeof object === 'string') {
                objects.push($(object));
            } else {
                objects.push(object);
            }

            for (var i = 0; i < objects.length; i++) {
                objects[i].stop().animate(cssProperties, { duration: duration, easing: ease });
            }

            setTimeout(function () {
                if ($.isFunction(callback)) {
                    callback();
                }
            }, duration);

        },

        ElementInView: function (element) {


            var scrollTop = Paralax.WindowSize().scrollTop,
            breakPoint = Paralax.WindowSize().scrollTop + (Paralax.WindowSize().height - (Paralax.WindowSize().height * 0.1)),
            scrollBottom = (scrollTop + Paralax.WindowSize().height),
            element, elementTop, elementBottom;

            elementTop = element.offset().top;
            elementBottom = elementTop + element.height();

            if (elementTop != 0 && elementBottom != 0) {
                if (elementTop <= breakPoint) {
                    return true;
                } else if (scrollTop + Paralax.WindowSize().height > $(document).height() - 100) {
                    return true;
                }
            }

            return false;
        },

        Alert: function (message, click) {
        },

        LoadImage: function (element, src, callback) {
            
            var img = new Image();
            img.src = src;
           
            if (img.naturalWidth > 0) {
                callback(element);
                return;
            }

            img.onload = function () {
                callback(element);
            };
            
        },

        LoadBackgroundImage: function (element, src, callback) {

            for (var i = 0; i < element.length; i++) {

                if (src[i].indexOf('url(' > 0)) {
                    var url = src[i].replace('url(', '');
                    url = url.replace(')', '');
                } else {
                    url = src;
                }

                var img = new Image();
                img.onload = loadedImages;
                img.onerror = loadedImages;
                img.src = url;
            }
            var j = 0;
            function loadedImages() {
                j++;
                if (j == element.length) {
                    callback(element);
                }
            }
        },

        LoadImages: function (container, success) {
            var allImages = container.find("img[src]:not(data-preload),img[data-preload]:not(src)"),
            loadedImages = 0,
            _thisImage, _src;

            if (allImages.length == 0 && $.isFunction(success)) {
                success();
            }
           
            allImages.each(function (i, e) {
                _thisImage = $(e);

                if (_thisImage == undefined) {
                    return;
                }
                
                if (_thisImage.attr("data-preload")) {
                    _src = _thisImage.data("preload");

                } else {
                    _src = _thisImage.attr("src");
                }

                Helpers.LoadImage($(e), _src, function (element) {

                    if (element.attr("data-preload")) {
                        element.removeAttr("data-preload");
                        Helpers.Transition(element, { opacity: 1 }, 1000, "easeInOutCirc");
                    }

                    loadedImages++;

                    if (allImages.length === loadedImages && $.isFunction(success)) {

                        success();
                    }
                });
            });

        },

        OverlaySimple: function (holder, show, click) {
            var overlay;

            if (show) {
                var height = holder.height() > Paralax.WindowSize().height ? holder.height() : Paralax.WindowSize().height;

                var style = {};

                style[Modernizr.prefixed('transition')] = "opacity 450ms cubic-bezier(0.165, 0.84, 0.44, 1)";
                style["opacity"] = 0;
                style["height"] = height;

                overlay = $("<div class=\"content-overlay\"></div>").css(style).prependTo(holder);

                overlay.off("click").on("click", click);

                overlay.timer = setTimeout(function () {
                    overlay.css("opacity", 0.7);
                }, 1);

            }
            else {
                overlay = holder.find(".content-overlay").css({ opacity: 0 });

                try {
                    clearTimeout(overlay.timer);
                } catch (e) { }

                overlay.timer = setTimeout(function () {
                    overlay.remove();
                }, 450);
            }
        },

        Overlay: function (holder, show, delay, opacity, success, click) {
            var overlay;

            if (show) {
                var height = holder.height() > Paralax.WindowSize().height ? holder.height() : Paralax.WindowSize().height;

                var style = {};

                if (holder.is("body")) {
                    style["position"] = "fixed";
                    style["zIndex"] = 80000;
                }

                style[Modernizr.prefixed('transition')] = "opacity 450ms cubic-bezier(0.165, 0.84, 0.44, 1)";
                style["opacity"] = 0;

                if (delay == 0) {
                    style["opacity"] = 1;
                }

                style["height"] = height;

                overlay = (holder.find(".content-overlay").lenght > 0 ? holder.find(".content-overlay") : $("<div class=\"content-overlay\"></div>")).css(style).prependTo(holder);

                overlay.off("click").on("click", click);



                if (delay == 0) {
                    if ($.isFunction(success)) {
                        success();
                    }
                    return;
                }

                overlay.timer = setTimeout(function () {
                    overlay.css("opacity", opacity);

                    overlay.timer = setTimeout(function () {
                        if ($.isFunction(success)) {
                            success();
                        }
                    }, 450);

                }, delay);

            }
            else {
                overlay = holder.find(".content-overlay").css({ opacity: 0 });


                overlay.timer = setTimeout(function () {
                    try {
                        clearTimeout(overlay.timer);
                    } catch (e) { }

                    overlay.timer = setTimeout(function () {
                        overlay.remove();

                        if ($.isFunction(success)) {
                            success();
                        }
                    }, 450);

                }, delay);
            }
        },

        ScrollToPosition: function (position, success, stopped) {

            if (($(document).height() - Paralax.WindowSize().height) < (position))
                position = $(document).height() - Paralax.WindowSize().height;

            $('html, body').addClass('scrolling').stop().animate({
                scrollTop: position
            }, 500, "easeInOutExpo", function () {
                $('html, body').removeClass('scrolling');

                $(window).off("mousewheel");

                if ($.isFunction(success)) {
                    success();
                }
            });

            $(window).off("mousewheel").on("mousewheel", function () {
                $('html, body').stop().removeClass('scrolling');

                $(window).off("mousewheel");

                if ($.isFunction(success)) {
                    success();
                }
            });
        },

        OnDomLoaded: function (handler) {

            var called = false

            function ready() {
                if (called) return;
                called = true;
                handler();
            }

            if (document.addEventListener) { // native event
                document.addEventListener("DOMContentLoaded", ready, false);
            }
            else if (document.attachEvent) {  // IE

                try {
                    var isFrame = window.frameElement != null;
                } catch (e) { }

                // IE, the document is not inside a frame
                if (document.documentElement.doScroll && !isFrame) {

                    var tryScroll = function () {
                        if (called) return;
                        try {
                            document.documentElement.doScroll("left");
                            ready();
                        } catch (e) {
                            setTimeout(tryScroll, 10);
                        }
                    }

                    tryScroll();
                }

                // IE, the document is inside a frame
                document.attachEvent("onreadystatechange", function () {
                    if (document.readyState === "complete") {
                        ready();
                    }
                });
            }

            // Old browsers
            if (window.addEventListener)
                window.addEventListener('load', ready, false);
            else if (window.attachEvent)
                window.attachEvent('onload', ready);
            else {
                var fn = window.onload; // very old browser, copy old onload
                window.onload = function () { // replace by new onload and call the old one
                    fn && fn();
                    ready();
                };
            }
        }
    }
})(jQuery);