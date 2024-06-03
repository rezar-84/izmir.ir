(function ($){

    $(document).ready(function(){
      $('.listing-nav a[href*="#"]:not([href="#"]), .listing-action a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
          if (target.length) {
            $("html, body").animate({
              scrollTop: target.offset().top - 150
            }, 600);
            return false;
          }
        }
      });
    });

})(jQuery);
