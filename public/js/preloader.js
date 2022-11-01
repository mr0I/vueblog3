import $ from "jquery";
import Switchery from "switchery";

$(document).ready(function () {
    $('input#check').change(function() {
        let state = $(this).prop('checked');
        if (state) {
            $('nav.navigation').animate({right: '0'}, 'fast');
            $('ul.menu').removeClass('hidden').animate({width:'100%'}, 'fast');
            $('section.panel_content').css({
                'margin-right': '22%',
                'width': '76%'
            });
        }else{
            $('nav.navigation').animate({right: '-20%'}, 'fast');
            $('ul.submenu').addClass('hidden').css('height', '0');
            $('section.panel_content').css({
                'margin-right': '0',
                'width': '100%'
            });
        }
    });


    $('[data-plugin="switchery"]').each(function () {
        new Switchery($(this)[0], $(this).data());
    })

});
