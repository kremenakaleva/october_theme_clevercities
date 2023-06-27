var viewed = false;
var width = $(window).width();

$(document).ready(function() {
    // $("nav").removeClass("no-transition");
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line


	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    $("nav").removeClass("no-transition");

    $('.accordion').click(function(){
        var toggler = $(this).next('.panel');
        if ( toggler.is(':visible') ){
            toggler.slideUp('slow');
        }else{
            toggler.slideDown('slow');
        }
    });

    $("#filter-lessons-form").submit(function(){
        $("input, select").each(function(index, input){
            if($(input).val() == "") {
                $(input).remove();
            }
        });
    });


    if (width < 800) { // mobile
        $('#menuToggle input[type="checkbox"]').change(function(){
            var checked = $(this).is(":checked");
            if(checked){
                $('#menu').show("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('#menu, #menu *').css({
                    'visibility': 'visible'
                });
                $('body', 'html').css({
                    'overflow': 'hidden'
                });
            }else{
                $('#menu').hide("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('body', 'html').css({
                    'overflow': 'auto'
                });
            }
        });
    }

    $('.dropdown a').click(function(event) {

        if (location.href.indexOf("#") != -1) {
            var link = $(this).attr('href');
            var anchorId = link.substr(link.indexOf("#") + 1);
            if($("#"+anchorId).length>0){
                $('html, body').animate({
                    scrollTop: $("#"+anchorId).offset().top - 150
                }, 500);
            }else{
                // event.preventDefault();
                $("path[title='"+anchorId.toUpperCase()+"']").addClass('active_path');

                $('.accordion-border').each(function(){
                    var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
                    var toggler = $(this).find(".accordion-toggle");
                    if ( title.indexOf(anchorId.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                        $('html, body').animate({
                            scrollTop: toggler.parent().offset().top - 150
                        }, 500);
                        toggler.trigger( "click" );
                        event.preventDefault();
                    }
                });
            }
        }


    });


	onHashChange();
	$(window).on("hashchange", function() {
		onHashChange();
	});

	$('.nav.nav-pills').removeAttr('id');

	var count = $("h1").text().length;


});

function onHashChange(){
	$("path").removeClass('active_path');
	$(".accordion-content").hide();
	var caseStudiesHashTitle = location.hash;

	if(caseStudiesHashTitle){
		var caseStudiesTitle = caseStudiesHashTitle.substring(1, caseStudiesHashTitle.length);
		$("path[title='"+caseStudiesTitle.toUpperCase()+"']").addClass('active_path');

		$('.pilots .accordion-border').each(function(){
			var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
			var toggler = $(this).find(".accordion-toggle");
			if ( title.indexOf(caseStudiesTitle.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
				toggler.trigger( "click" );
			}
		});
	}
}


function appendSearchAndSocialMedia(){
	var liSearch = '<li class="nav-item search_field"><a href=\"javascript: void(0);\" onclick=\"showSearchForm();\" class="pr p-search medium"></a></li>';
	var liSocial = '<li class="nav-item social">' +
        '<a href=\"https://twitter.com/TRANSPATH_EU\" target=\"_blank\" class=\"pr p-twitter medium\" target=\"_blank\"></a>' +
        '<a href=\"https://www.linkedin.com/company/transpath-project/\" target=\"_blank\" class=\"pr p-linkedin medium\" target=\"_blank\"></a></li>';
	var menu = $('#menuToggle');
	menu.find('>ul').append(liSearch).append(liSocial);
}

function redirectAndRefresh(url){
	$(".tabs a").each(function() {
		this.href = window.location.hash;
	});
	window.open(url, '_blank');
	location.reload();
}

function GoToPage(page){
    window.open('/'+page, '_self');
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function showSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').toggle();
	$('#menu li').hide();
	$('nav a:not(.navbar-brand)').hide();
}

function hideSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').hide();
	$('#menu li').show();
    $('nav a').show();
}




function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
            }
        }
		appendSearchAndSocialMedia()

    });
}

init()
