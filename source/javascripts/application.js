//= require jquery
//= require bootstrap

(function() {
    var $window = $(window);
    var $hero = $('.hero');
    var $navbar = $('.navbar');
    var viewport = $window.height();

    $('.navbar-toggle').click(function(){
        $('.nav-primary').toggleClass('hamburger-open');
    });

    $(function() {
        $hero.height(viewport - 30);
    });

    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });
}).call(this);
