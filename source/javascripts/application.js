//= require jquery
//= require bootstrap
//= require _headroom.min
//= require _jquery.headroom

(function() {
    var $window = $(window);
    var $hero = $('.hero');
    var $navbar = $('.navbar');
    var viewport = $window.height();
    var scrollTop = $(window).scrollTop();

    $(function() {
        $hero.height(viewport - 30);
        $('.js-full-height').height(viewport - 30);
    });

    $('.nav-side a').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });

    $.fn.detectSection = function(){
        var screen = {
            top : $(window).scrollTop(),
        };

        screen.bottom = screen.top + (viewport / 2);

        var bounds = this.offset();
        bounds.bottom = bounds.top + (this.outerHeight() / 2);

        return (!(screen.bottom < bounds.top || screen.top > bounds.bottom));
    };

    $(window).bind("scroll load", function () {
        $('.js-menu-section').each(function() {
            var $section = '#' + $(this).attr('id');
            var $sectionLink = $('.nav-list a[href$="' + $section + '"]');
            if ($($section).detectSection()) {
                $section === '#work' ? window.history.pushState({}, document.title, '/') : null;
                $('.nav-list a').removeClass('active');
                $($sectionLink).addClass('active');
            };
        });
    });

    $('.headroom').headroom();
}).call(this);
