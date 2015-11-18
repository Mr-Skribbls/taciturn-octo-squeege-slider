$(document).ready(function() {
    
    var image_folder = 'imgs', container = '.slide-container'; 
    var lg_cycle_time = 15000, sm_cycle_time = 5000, slide_speed = 10, remove_old_delay = 3000;
    
    var bg_array = [], bg_array_on = [], bg_array_off = [], lg_img = [];
    
    init();
    setInterval(function() {
        picture_switcher();
    }, sm_cycle_time);
    setInterval(function() {
//        lg_picture_switcher();
    }, lg_cycle_time);
    
    
    // ----- Functions ----- //
    
    // Picture Change function
    function picture_switcher() {
        var seesaw_to_change = choose_seesaw();
        var new_image = choose_new_img();
        var seesaw_top = 0;
        append_new_img();
        slide();
        
        function choose_seesaw() {
            var random = Math.floor((Math.random() * 4) + 1); // random number from 1 to 4
            return '#window' + random;
        }
        
        function choose_new_img() {
            var random = Math.floor(Math.random() * (bg_array_off.length - 1));
            var new_img = bg_array_off.splice(random, 1);
            bg_array_on.push(new_img[0]);
            return new_img;
        }
        
        function turn_off_old_img() {
            var el_to_remove_img = $(seesaw_to_change + ' div').css('background-image').match(img_RegEx);
            
            // remove img from bg_array_on to bg_array_off
            bg_array_on.splice(bg_array_on.indexOf(el_to_remove_img[0]), 1);
            bg_array_off.push(el_to_remove_img[0]);
            
            // remove img from html
            $.each($(seesaw_to_change + ' div'), function() {
                if( $(this).css('background-image').match(img_RegEx)[0] === el_to_remove_img[0] ) {
                    $(this).remove();
                }
            })
            
        }
        
        function append_new_img() {
            $(seesaw_to_change).append('<div class="small-img" style="background-image: url(\'' + new_image[0] + '\')"></div>');
        }
        
        function slide() {
            $(seesaw_to_change).animate({
                top: "-=100%"
            }, 500, function() {
                turn_off_old_img();
                reset();
            });
        }
        
        function reset() {
            $(seesaw_to_change).css('top', '0px');
        }

    }
    
    function lg_picture_switcher() {
        var new_image = choose_new_img();
        var seesaw_top = 0;
        append_new_img();
        slide();
        
        function choose_new_img() {
            var random = Math.floor(Math.random() * (bg_array_off.length - 1));
            var new_img = bg_array_off.splice(random, 1);
            bg_array_on.push(new_img[0]);
            return new_img;
        }
        
        function turn_off_old_img() {
            var el_to_remove_img = $('large').css('background-image').match(img_RegEx);
            
            // remove img from bg_array_on to bg_array_off
            bg_array_on.splice(bg_array_on.indexOf(el_to_remove_img[0]), 1);
            bg_array_off.push(el_to_remove_img[0]);
            
            // remove img from html
            $.each($(seesaw_to_change + ' div'), function() {
                if( $(this).css('background-image').match(img_RegEx)[0] === el_to_remove_img[0] ) {
                    $(this).remove();
                }
            })
            
        }
        
        function append_new_img() {
            $(seesaw_to_change).append('<div class="small-img" style="background-image: url(\'' + new_image[0] + '\')"></div>');
        }
        
        function slide() {
            $(seesaw_to_change).animate({
                top: "-=100%"
            }, 500, function() {
                turn_off_old_img();
                reset();
            });
        }
        
        function reset() {
            $(seesaw_to_change).css('top', '0px');
        }
    }
    
    // build initial html
    function buildInitHTMl() {
        var html_contents = '';
        html_contents += '<div class="slider-row">';
        html_contents += '<div class="slider">';
        html_contents += '<div class="box large" style="background-image: url(\'' + lg_img[0] + '\')"></div>';
        html_contents += '<div class="box slider-small-container">';
        html_contents += '<div class="small">';
        html_contents += '<div id="window1" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + bg_array_on[0] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '<div class="small">';
        html_contents += '<div id="window2" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + bg_array_on[1] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '<div class="box slider-small-container">';
        html_contents += '<div class="small">';
        html_contents += '<div id="window3" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + bg_array_on[2] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '<div class="small">';
        html_contents += '<div id="window4" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + bg_array_on[3] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        
        $(container).html(html_contents);
        $(container).removeClass('hidden');
    }
    
    // populate bg_array
    function populate_bg_array() {
        
        // get images from html slider-container class
        $.each($(container + ' img'), function() {
            bg_array.push($(this).attr('src'));
        });
        
    }
    
    // choose a image for the large window
    function choose_lg_img() {
        // random index of bg_array
        var random = Math.floor(Math.random() * (bg_array.length - 1));
        lg_img = bg_array.splice(random, 1);
    }
    
    // change large image
    function change_lg_img() {
        
    }
    
    // populate bg_array_on
    // first 4 objects in ob_array
    function populate_bg_array_on() {
        for( var i = 0; i < 4; i++ ) {
            bg_array_on.push(bg_array[i]);
        }
    }
    
    // poulate bg_array_off
    // all objects in bg_array not in bg_array_on
    function populate_bg_array_off() {
        for( var i = 0; i < bg_array.length; i++ ) {
             if( ($.inArray(bg_array[i], bg_array_on)) === -1 ) bg_array_off.push(bg_array[i]);
        }
    }
    
    // build RegEx to filter image src
    function create_img_RegEx(folder) {
        folder = '(' + folder + '\/)(.*)(jpg|JPG|jpeg|gif|png)';
        img_RegEx = new RegExp(folder)
    }
    
    // init
    function init() {
        create_img_RegEx(image_folder);
        populate_bg_array();
        choose_lg_img();
        populate_bg_array_on();
        populate_bg_array_off();
        buildInitHTMl();
    }
    
    // check if an object is set
    function isset() {
        var a = arguments,
            l = a.length,
            i = 0,
            undef;

          if (l === 0)
          {
            throw new Error('Empty isset');
          }

          while (i !== l)
          {
            if (a[i] === undef || a[i] === null)
            {
              return false;
            }
            i++;
          }
          return true;
    }
    
});