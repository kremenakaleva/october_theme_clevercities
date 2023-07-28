$(window).scroll(animateLogo);
var viewed = false;

var width = $(window).width();

var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};

$(document).ready(function() {
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

    if (width < 992) { // mobile
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
                // $(input).remove();
            }
        });
    });

     $('body').on('click', '.text-wrapper .accordion-toggle', function () {
        if ($(this).next(".accordion-content").is(':visible')) {
            $(this).next(".accordion-content").slideUp(300);
            $(this).children(".plusminus").html('<span class="plus"></span>');
        } else {
            $(this).next(".accordion-content").slideDown(300);
            $(this).children(".plusminus").html('<span class="minus"></span>');
        }
    });

	$('.nav.nav-pills').removeAttr('id');

	var count = $("h1").text().length;

	$('.category_1').wrapAll('<div class="lessons_wrapper cat1"></div>')
    $('.cat1').before('<h1 class="heading_svg lessons_cat1">Policy & planning</h1>');

    $('.category_2').wrapAll('<div class="lessons_wrapper cat2"></div>')
    $('.cat2').before('<h1 class="heading_svg lessons_cat2">Social impact</h1>');

    $('.category_3').wrapAll('<div class="lessons_wrapper cat3"></div>')
    $('.cat3').before('<h1 class="heading_svg lessons_cat3">Co-creation & empowerment</h1>');


});

function animateLogo(){
    var headernav = $('#headernavbar');
    if(documentHasScroll()){
        headernav.addClass('scrolled');
    }else{
        headernav.removeClass('scrolled');
    }
}
window.addEventListener('scroll', function (e) {
    var headernavbar = document.getElementById("headernavbar");
    if (window.scrollY > headernavbar.offsetHeight){
        headernavbar.classList.add('scrolled');
        // headernavbar.classList.add('fixed');

    }else{
        headernavbar.classList.remove('scrolled');
    }
});

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
