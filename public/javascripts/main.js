function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/javascripts/skills.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function init() {
    console.log('happening');
    loadJSON(function (response) {

        // Parse JSON string into object
        skills = JSON.parse(response);

        console.log(skills);
    });
}


var skillChartAnim = null;
var sizeWatch = '';
var color_primary = "#3AA8DB";
var color_secondary = "#18465B";
var color_secondary_light = "#2E86AF";
var color_analog = "#CAA669";

$(document).ready(function(){

    var time = 0;
    var delayOffset = 0.3;
    $('#skills-edu .edu-panel .timeline .message-inner').each(function(){
            time = time + delayOffset;
            $(this).css({"transition": "all " + time +"s ease"});
    });

    time = 0;
    $('#exp .exp-timeline .timeline .message-inner').each(function(){
            time = time + delayOffset;
            $(this).css("transition", "background-color 0.5s ease, transform " + time +"s ease");
    });

    var pContainerHeight = $('.head-box').height();

    $(document).on('change', ':file', function() {
        var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $(':file').on('fileselect', function(event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( input.length ) {
            input.val(log);
        } 
        else {
            if( log ) alert(log);
        }

    });

    $(window).scroll(function () {
        var wScroll = $(this).scrollTop();

        if (wScroll <= pContainerHeight) {

            $('.head-hero').css({
                'transform': 'translate(0px, ' + wScroll / 4 + '%)'
            });

            $('.head-back-img').css({
                'transform': 'translate(0px, ' + wScroll / 4 + '%)'
            });

            $('.head-me-foreground').css({
                'transform': 'translate(0px, -' + wScroll / 12 + '%)'
            });
        };

        if(wScroll > ($('#intro').offset().top - $(window).height()/ 1.2))    {
            $('#intro .profile-pic').addClass('appear');
        }

        if (wScroll > ($('#intro .personal-info').offset().top - $(window).height()/ 1.2)){
            $('#intro .personal-info .round').each(function(){
                $(this).addClass('appear');
            });
        }

        if (wScroll > ($('#intro .lang-panel').offset().top - $(window).height()/ 1.2)){
            $('#intro .lang-panel .progress-bar').each(function(){
                $(this).width($(this).attr('aria-valuenow') + "%");
            });

            $('#intro .hobbies .round').each(function(){
                $(this).addClass('appear');
            });
        }

        if (wScroll > ($('#skills-edu').offset().top - $(window).height()/ 1.2)){
            //alert($('#skills-edu').offset().top);
            $('#skills-edu .edu-panel .timeline .message-inner').each(function(){
                $(this).addClass('slide');
            });

            $('.skillbar').each(function(){
                $(this).find('.skillbar-bar').animate({
                    width:$(this).attr('data-percent')
                },"slow");
            });
        }

        if (wScroll > ($('#exp').offset().top - $(window).height()/ 1.2)){
            //alert($('#exp .exp-timeline .timeline .message-inner').attr('class'));
            $('#exp .exp-timeline .timeline .message-inner').each(function(){
                $(this).addClass('slide');
            });
        }

        /*if (wScroll > ($('#skills-edu').offset().top - $(window).height()/ 1.2) 
            && $('#skills-edu #ms .skill-slideshow > .skill-set:first .chart-data .data-bar').first().height() == 0){
            
        }*/
    });

    $(window).resize(function() {
        skillChartSetup();
    });

    skillChartSetup();

    $('#skills-edu .skill-slideshow:first > .skill-set:gt(0)').hide();

   // alert($('#skills-edu .skills-chart .chart-title > li:first').html());
    /*$('#skills-edu .skills-chart .chart-title').width($('#skills-edu .skills-chart .chart-title > li:first').width());

    $('#skills-edu .skills-chart .chart-title').height($('#skills-edu .skills-chart .chart-title > li:first').height());
    */
    /*$('#skills-edu .skills-chart .chart-title ').on('mouseover', function(){
        $('#skills-edu .skills-chart .chart-title').animate({width: "100%"}, "slow");
    });*/

    $('#cfdi-upload').submit(function() {
        $(this).ajaxSubmit({
            error: function(err) {
                console.log('Something! --- ' + err.status);

                for(var i in err){
                    console.log(i + ' --- ' + err[i]);
                }

                alert('Error: ' + err.status);
            },

            success: function(res) {
                swal("Upload successful!", "CFDI xml uploaded successfuly", "success");
            }
         });
        return false;
    });

    $('#exp .timeline .message-inner').on('click', function(){
        $('#exp .timeline .message-item.active').removeClass('active');
        $('#exp .timeline .message-inner.active').removeClass('active');
        $(this).addClass('active');
        $(this).parent().addClass('active');

        $(this).removeClass('press');

    });


    $('#exp .timeline .message-inner').on('mousedown', function(){
        $(this).css("transition", "background-color 0.5s ease, transform 0.2s ease");
        $(this).addClass('press');
    });

    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('show.bs.dropdown', function (e) {
        $(this).find('.dropdown-toggle').css('background-color', color_secondary);
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function (e) {
        $(this).find('.dropdown-toggle').css('background-color', color_secondary_light);
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

    $("#skills-edu .dropdown .dropdown-menu li a").click(function(){
        $("#skills-edu .dropdown .dropdown-toggle").html($(this).html() + '<i class="fa fa-lg fa-angle-down"></i>');
    });

    $('#skills-edu .skills-chart .chart-title a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab

        if (skillChartAnim != null) {
            clearInterval(skillChartAnim);
        }

        if ($( target + " .skill-slideshow" ).length) {
            $('#skills-edu ' + target + ' .skill-slideshow > .skill-set:gt(0)').hide();
            if ($(window).width() > 1024) {
                $('#skills-edu ' + target + ' .skill-slideshow > .skill-set:first .chart-data .data-bar').each(function(){
                    $(this).animate({
                        height:$(this).attr('data-level')
                    },"slow");
                });
            
                skillChartAnim = setInterval(function() { 
                          $('#skills-edu ' + target + ' .skill-slideshow > .skill-set:first')
                            .fadeOut(1000, function(){
                                $(this).find('.chart-data .data-bar').each(function(){
                                    $(this).removeAttr('style');
                                });
                            })
                            .next()
                            .fadeIn(1000, function(){
                                $($(this).find(".chart-data .data-bar")).each(function(){
                                    $(this).animate({
                                        height:$(this).attr('data-level')
                                    },"slow");
                                });
                            })
                            .end()
                            .appendTo('#skills-edu ' + target + ' .skill-slideshow');
                        },  5000);
            }
            else{
                $('#skills-edu ' + target + ' .skill-slideshow > .skill-set:first .chart-data .data-bar').each(function(){
                    $(this).animate({
                        width:$(this).attr('data-level')
                    },"slow");
                });
            
                skillChartAnim = setInterval(function() { 
                          $('#skills-edu ' + target + ' .skill-slideshow > .skill-set:first')
                            .fadeOut(1000, function(){
                                $(this).find('.chart-data .data-bar').each(function(){
                                    //$(this).width(0);
                                    $(this).removeAttr('style');
                                });
                            })
                            .next()
                            .fadeIn(1000, function(){
                                $($(this).find(".chart-data .data-bar")).each(function(){
                                    $(this).animate({
                                        width:$(this).attr('data-level')
                                    },"slow");
                                });
                            })
                            .end()
                            .appendTo('#skills-edu ' + target + ' .skill-slideshow');
                        },  5000);
            }
        }
    });

    /*$('#skills-edu .skills-chart .chart-title a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
      var target = $(e.target).attr("href") // activated tab
      
      if ($( target + " .skill-slideshow").length) {
        $( target + " .skill-slideshow").toggle();
      }
    });*/

});

function setSkillChartLegend(){
    var list = $('#skills-edu .skills-chart ul.chart-legend');
    console.log(list.find("> li:first > .legend-label").text());
    var firstLegend = list.find("> li:first > .legend-label").text();
    if ((firstLegend == "Novice" && $(window).width() >= 1024) || (firstLegend != "Novice" && $(window).width() < 1024)) {
        console.log('Reversing');
        var listItems = list.children('li');
        list.append(listItems.get().reverse());
    }
    
}

function skillChartSetup(){
    if ($(window).width() >= 1024 && sizeWatch != "big") {
        sizeWatch = "big";

        if (skillChartAnim!= null) {
            clearInterval(skillChartAnim);
        }

        setSkillChartLegend();

        //$('#skills-edu').height($('#skills-edu').height() + 20);
        
        if ($("#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow").length) {
            $("#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow .data-bar").each(function(){
                $(this).removeAttr('style');
            });

            $("#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow .skill-set:first .data-bar").each(function(){
                $(this).animate({
                    height:$(this).attr('data-level')
                },"slow");
            });
        }

        skillChartAnim = setInterval(function() { 
              $('#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow > .skill-set:first')
                .fadeOut(1000, function(){
                    $(this).find('.chart-data .data-bar').each(function(){
                        $(this).removeAttr('style');
                    });
                })
                .next()
                .fadeIn(1000, function(){
                    $($(this).find(".chart-data .data-bar")).each(function(){
                        $(this).animate({
                            height:$(this).attr('data-level')
                        },"slow");
                    });
                })
                .end()
                .appendTo('#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow');
            },  5000);
    }
    else if($(window).width() < 1024 && sizeWatch != "small"){
        sizeWatch = "small";
        
        if (skillChartAnim!= null) {
            clearInterval(skillChartAnim);
        }

        setSkillChartLegend();

        //$('#skills-edu').height($('#skills-edu').height() + 20);

        if ($("#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow").length) {
            //console.log('Here');
            $("#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow .data-bar").each(function(){
                $(this).removeAttr('style');
            });

            $("#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow .skill-set:first .data-bar").each(function(){
                $(this).animate({
                    width:$(this).attr('data-level')
                },"slow");
            });
        }

        skillChartAnim = setInterval(function() { 
              $('#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow > .skill-set:first')
                .fadeOut(1000, function(){
                    console.log('small');
                    $(this).find('.chart-data .data-bar').each(function(){
                        $(this).removeAttr('style');
                    });
                })
                .next()
                .fadeIn(1000, function(){
                    $($(this).find(".chart-data .data-bar")).each(function(){
                        $(this).animate({
                            width:$(this).attr('data-level')
                        },"slow");
                    });
                })
                .end()
                .appendTo('#skills-edu .skills-chart .tab-content .tab-pane.active .skill-slideshow');
            },  5000);
    }
}