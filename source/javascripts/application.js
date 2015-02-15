//= require jquery
//= require bootstrap
//= require _jquery.cycle.all
//= require _headroom.min
//= require _jquery.headroom

(function() {
    var $window = $(window);
    var $hero = $('.hero');
    var $navbar = $('.navbar');
    var viewport = $window.height();

    $('.headroom').headroom();

    $('.navbar-toggle').click(function(){
        $('.nav-primary').toggleClass('hamburger-open');
    });

    $(function() {
        $hero.height(viewport - 30);
        $('.js-full-height').height(viewport);
    });

    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });
}).call(this);
