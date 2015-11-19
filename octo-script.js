$(document).ready(function() {
    
    globals = {
        image_folder : 'imgs',
        container : '.slide-container',
        last_slide : null,
        before_last_slide : null,
        cycle_time : 3000,
        slide_speed : 500
    }
    img_arrays = {
        bg_array : [],
        bg_array_on : [],
        bg_array_off : []
    }
    
    init();
    if(img_arrays.bg_array.length > 5) {
        setInterval(function() {
            picture_switcher();
        }, globals.cycle_time);
    }
    
    
    // ----- Functions ----- //
    
    // Picture Change function
    function picture_switcher() {
        var seesaw_to_change = choose_seesaw();
        var new_image = choose_new_img();
        append_new_img();
        slide();
        
        function choose_seesaw() {
            var random = Math.floor(Math.random() * 5); // random number from 0 to 4
            while(random === globals.last_slide || random === globals.before_last_slide) {
                random = Math.floor(Math.random() * 5);
            }
            globals.before_last_slide = globals.last_slide;
            globals.last_slide = random;
            return '#window' + random;
        }
        
        function choose_new_img() {
            var random = Math.floor(Math.random() * (img_arrays.bg_array_off.length - 1));
            var new_img = img_arrays.bg_array_off.splice(random, 1);
            img_arrays.bg_array_on.push(new_img[0]);
            return new_img;
        }
        
        function turn_off_old_img() {
            var el_to_remove_img = $(seesaw_to_change + ' div').css('background-image').match(img_RegEx);
            
            // remove img from bg_array_on to bg_array_off
            img_arrays.bg_array_on.splice(img_arrays.bg_array_on.indexOf(el_to_remove_img[0]), 1);
            img_arrays.bg_array_off.push(el_to_remove_img[0]);
            
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
            }, globals.slide_speed, function() {
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
        html_contents += '<div class="box slider-large-container">';
        html_contents += '<div class="large">';
        html_contents += '<div id="window0" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + img_arrays.bg_array_on[0] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '<div class="box slider-small-container">';
        html_contents += '<div class="small">';
        html_contents += '<div id="window1" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + img_arrays.bg_array_on[1] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '<div class="small">';
        html_contents += '<div id="window2" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + img_arrays.bg_array_on[2] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '<div class="box slider-small-container">';
        html_contents += '<div class="small">';
        html_contents += '<div id="window3" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + img_arrays.bg_array_on[3] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '<div class="small">';
        html_contents += '<div id="window4" class="seesaw">';
        html_contents += '<div class="small-img" style="background-image: url(\'' + img_arrays.bg_array_on[4] + '\')"></div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        html_contents += '</div>';
        
        $(globals.container).html(html_contents);
        $(globals.container).removeClass('hidden');
    }
    
    // populate bg_array
    function populate_bg_array() {
        
        // get images from container class
        $.each($(globals.container + ' img'), function() {
            img_arrays.bg_array.push($(this).attr('src'));
        });
        
    }
    
    // populate bg_array_on
    // first 4 objects in ob_array
    function populate_bg_array_on() {
        for( var i = 0; i < 5; i++ ) {
            img_arrays.bg_array_on.push(img_arrays.bg_array[i]);
        }
    }
    
    // poulate bg_array_off
    // all objects in bg_array not in bg_array_on
    function populate_bg_array_off() {
        for( var i = 0; i < img_arrays.bg_array.length; i++ ) {
             if( ($.inArray(img_arrays.bg_array[i], img_arrays.bg_array_on)) === -1 ) img_arrays.bg_array_off.push(img_arrays.bg_array[i]);
        }
    }
    
    // build RegEx to filter image src
    function create_img_RegEx(folder) {
        folder = '(' + folder + '\/)(.*)(jpg|JPG|jpeg|gif|png)';
        img_RegEx = new RegExp(folder)
    }
    
    // init
    function init() {
        create_img_RegEx(globals.image_folder);
        populate_bg_array();
//        choose_lg_img();
        populate_bg_array_on();
        populate_bg_array_off();
        buildInitHTMl();
    }
    
});