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
        $hero.height(viewport - 10);

        $('.js-full-height').height(viewport);
    });
}).call(this);
