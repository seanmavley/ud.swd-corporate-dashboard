$(document).ready(function() {
  $('select').material_select();

  $('.dropdown-button').dropdown({
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false // Displays dropdown below the button
  });

  $('.search-toggle').click(function() {
      if ($('.hiddensearch').css('display') == 'none')
          $('.hiddensearch').slideDown();
      else
          $('.hiddensearch').slideUp();
  });
});
