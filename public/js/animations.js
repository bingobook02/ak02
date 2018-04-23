var firstScroll = false;

//Function which checks if user is scrolling the webpage
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

//Function which triggers typed.js if the user scrolls to #typed-strings
$(window).scroll(function() {
  if (isScrolledIntoView($('#typed-strings')) && firstScroll == false) {
      triggerTyped();
  }
});

//typed.js
function triggerTyped() {
  firstScroll = true;
  var typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  typeSpeed: 50,
  loop: false
  });
}

//Function to add another form row on addBtn click
$(document).ready(function() {
    var max_fields      = 4; //maximum input boxes allowed
    var wrapper         = $(".after"); //Fields wrapper
    var add_button      = $("#add_field_button"); //Add button ID
    var divStart = "<div class='form-group'>";
    var divEnd = "</div>";
    var count = 3;

    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        console.log('Button clicked!');
        count++;
        var content = "<label for='addressLabel'>Address "+count+"</label>"+
        "<input id='address' name='address"+count+"' class='form-control' type='text' />";
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append(divStart + content + divEnd); //add input box
        }
    });
});
