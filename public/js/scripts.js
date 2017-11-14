    $(document).ready(function () {
      $('.fancybox').fancybox({
        helpers: {
          overlay: {
            locked: true
          }
        }
      });

      //Mobile nav toggle
      $(document).on('click', '.nav-toggle', function () {
        $('.wrapper').toggleClass('nav-opened');
      });
      $('.nav').swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
          $('.wrapper').removeClass('nav-opened');
        }
      });
    });