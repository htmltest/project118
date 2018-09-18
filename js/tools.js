$(document).ready(function() {

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.form-select-checkboxes-value', function() {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
            var api = curSelect.find('.form-select-checkboxes-list-scroll').data('jsp');
            if (api) {
                api.destroy();
            }
        } else {
            $('.form-select-checkboxes.open').removeClass('open');
            curSelect.addClass('open');
            var api = curSelect.find('.form-select-checkboxes-list-scroll').data('jsp');
            if (api) {
                api.destroy();
            }
            curSelect.find('.form-select-checkboxes-list-scroll').jScrollPane({showArrows: true});
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.form-select-checkboxes').length == 0) {
            $('.form-select-checkboxes.open').removeClass('open');
        }
    });

    $('.form-select-checkboxes').each(function() {
        var curSelect = $(this);
        var newValue = '';
        curSelect.find('.form-select-checkboxes-list input:checked').each(function() {
            if (newValue != '') {
                newValue += ', ';
            }
            newValue += $(this).parent().find('.form-select-checkbox-text').html();
        });
        if (newValue == '') {
            newValue = curSelect.find('.form-select-checkboxes-value').data('placeholder');
        }
        curSelect.find('.form-select-checkboxes-value-text').html(newValue);
    });

    $('body').on('change', '.form-select-checkboxes-list input', function() {
        var newValue = '';
        var curSelect = $(this).parents().filter('.form-select-checkboxes');
        curSelect.find('.form-select-checkboxes-list input:checked').each(function() {
            if (newValue != '') {
                newValue += ', ';
            }
            newValue += $(this).parent().find('.form-select-checkbox-text').html();
        });
        if (newValue == '') {
            newValue = curSelect.find('.form-select-checkboxes-value').data('placeholder');
        }
        curSelect.find('.form-select-checkboxes-value-text').html(newValue);
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('click', '.window-link-self', function(e) {
        windowOpenSelf($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('click', '.window-link-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.menu-mobile-link').click(function(e) {
        $('html').addClass('menu-mobile-open');
        e.preventDefault();
    });

    $('.menu-mobile-close').click(function(e) {
        $('html').removeClass('menu-mobile-open');
        e.preventDefault();
    });

    $('.menu-mobile-item-link').click(function() {
        var curItem = $(this).parents().filter('.menu-mobile-item');
        if (curItem.find('.menu-mobile-sub').length > 0) {
            curItem.toggleClass('open');
            e.preventDefault();
        }
    });

    $('.header-menu ul li a').click(function() {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            if (curLi.hasClass('open')) {
                curLi.removeClass('open');
            } else {
                $('.header-menu ul li.open').removeClass('open');
                curLi.addClass('open')
            }
            e.preventDefault();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-menu').length == 0) {
            $('.header-menu ul li.open').removeClass('open');
        }
    });

    $('body').on('click', '.header-nav-all-link', function(e) {
        $('html').toggleClass('header-nav-all-open');
        e.preventDefault();
    });

    $('body').on('click', '.header-nav-all-bg', function(e) {
        $('html').removeClass('header-nav-all-open');
    });

    $('body').on('click', '.filter-header-types ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curFilter = curLi.parents().filter('.filter');
            var curIndex = curFilter.find('.filter-header-types ul li').index(curLi);
            curFilter.find('.filter-header-types ul li.active').removeClass('active');
            curLi.addClass('active');
            curFilter.find('.filter-tab.active').removeClass('active');
            curFilter.find('.filter-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-similar-header-variants ul li a', function(e) {
        var curLi = $(this).parent();
        if (curLi.hasClass('active')) {
            curLi.removeClass('active');
            $('.catalogue-similar-tab.active').removeClass('active');
        } else {
            $('.catalogue-similar-header-variants ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.catalogue-similar-header-variants ul li').index(curLi);
            $('.catalogue-similar-tab.active').removeClass('active');
            $('.catalogue-similar-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-type-item a', function(e) {
        var curType = $(this).parent();
        if (!curType.hasClass('active')) {
            $('.catalogue-type-item.active').removeClass('active');
            curType.addClass('active');
            if (curType.find('.catalogue-type-icon-2').length > 0) {
                $('.catalogue').addClass('view-list');
            } else {
                $('.catalogue').removeClass('view-list');
            }
        }
        e.preventDefault();
    });

    $('body').on('click', '.detail-tabs-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.detail-tabs-menu ul li').index(curLi);
            $('.detail-tabs-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.detail-tabs-item.active').removeClass('active');
            $('.detail-tabs-item').eq(curIndex).addClass('active');
            $('.detail-tabs-menu-active a').html($(this).html());
        }
        $('.detail-tabs-menu.open').removeClass('open');
        e.preventDefault();
    });

    $('.detail-tabs-menu-active a').click(function(e) {
        var curMenu = $(this).parents().filter('.detail-tabs-menu');
        curMenu.toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.detail-text-more a', function(e) {
        $(this).parents().filter('.detail-text-wrap').toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.cart-item-count-field-inc', function(e) {
        var curField = $(this).parents().filter('.cart-item-count-field');
        var curValue = Number(curField.find('input').val());
        curValue++;
        curField.find('input').val(curValue);
        curField.find('.cart-item-count-field-value-text').html(curValue);
        recalcCart();
        e.preventDefault();
    });

    $('body').on('click', '.cart-item-count-field-dec', function(e) {
        var curField = $(this).parents().filter('.cart-item-count-field');
        var curValue = Number(curField.find('input').val());
        curValue--;
        if (curValue < 1) {
            curValue = 1;
        }
        curField.find('input').val(curValue);
        curField.find('.cart-item-count-field-value-text').html(curValue);
        recalcCart();
        e.preventDefault();
    });

    $('body').on('click', '.cart-item-del', function(e) {
        var curItem = $(this).parents().filter('.cart-item');
        curItem.remove();
        recalcCart();
        e.preventDefault();
    });

    $('.order-step-delivery-type .form-radio input').each(function() {
        var curItem = $(this).parents().filter('.form-radio');
        var curIndex = $('.order-step-delivery-type .form-radio').index(curItem);
        if (curItem.find('input').prop('checked')) {
            $('.order-step-delivery-tab.active').removeClass('active');
            $('.order-step-delivery-tab .required').prop('disabled', true);
            $('.order-step-delivery-tab').eq(curIndex).addClass('active');
            $('.order-step-delivery-tab').eq(curIndex).find('.required').prop('disabled', false);
        }
    });

    $('body').on('change', '.order-step-delivery-type .form-radio input', function(e) {
        var curItem = $(this).parents().filter('.form-radio');
        var curIndex = $('.order-step-delivery-type .form-radio').index(curItem);
        if (curItem.find('input').prop('checked')) {
            $('.order-step-delivery-tab.active').removeClass('active');
            $('.order-step-delivery-tab .required').prop('disabled', true);
            $('.order-step-delivery-tab').eq(curIndex).addClass('active');
            $('.order-step-delivery-tab').eq(curIndex).find('.required').prop('disabled', false);
        }
    });

    $('.order-step-customer .form-radio input').each(function() {
        var curItem = $(this).parents().filter('.form-radio');
        var curIndex = $('.order-step-customer .form-radio').index(curItem);
        if (curItem.find('input').prop('checked')) {
            $('.order-step-customer-tab.active').removeClass('active');
            $('.order-step-customer-tab .required').prop('disabled', true);
            $('.order-step-customer-tab').eq(curIndex).addClass('active');
            $('.order-step-customer-tab').eq(curIndex).find('.required').prop('disabled', false);
        }
    });

    $('body').on('change', '.order-step-customer .form-radio input', function(e) {
        var curItem = $(this).parents().filter('.form-radio');
        var curIndex = $('.order-step-customer .form-radio').index(curItem);
        if (curItem.find('input').prop('checked')) {
            $('.order-step-customer-tab.active').removeClass('active');
            $('.order-step-customer-tab .required').prop('disabled', true);
            $('.order-step-customer-tab').eq(curIndex).addClass('active');
            $('.order-step-customer-tab').eq(curIndex).find('.required').prop('disabled', false);
        }
    });

    $('.order-services .form-radio input').each(function(e) {
        if ($(this).prop('checked') && $(this).data('otherservice') == 'yes') {
            $('.order-step-delivery-service-other').addClass('active');
        } else {
            $('.order-step-delivery-service-other').removeClass('active');
        }
    });

    $('body').on('change', '.order-services .form-radio input', function(e) {
        if ($(this).prop('checked') && $(this).data('otherservice') == 'yes') {
            $('.order-step-delivery-service-other').addClass('active');
        } else {
            $('.order-step-delivery-service-other').removeClass('active');
        }
    });

    $('.detail-gallery-big-item a').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE   : 'Закрыть',
                NEXT    : 'Вперед',
                PREV    : 'Назад'
            }
        }
    });

    $('.detail-gallery-big-list').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.detail-gallery-preview-item.active').removeClass('active');
        $('.detail-gallery-preview-item').eq(nextSlide).addClass('active');
    });

    $('.detail-gallery-preview-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false
    });

    $('.detail-gallery-preview-item').eq(0).addClass('active');
    $('.detail-gallery-preview-item a').click(function(e) {
        var curIndex = $('.detail-gallery-preview-item').index($(this).parent());
        $('.detail-gallery-big-list').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.detail-other-list-inner').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1179,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('body').on('click', '.main-filter-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curFilter = curLi.parents().filter('.main-filter');
            var curIndex = curFilter.find('.main-filter-menu ul li').index(curLi);
            curFilter.find('.main-filter-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            curFilter.find('.main-filter-tab.active').removeClass('active');
            curFilter.find('.main-filter-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.slider-1-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    dots: false
                }
            }
        ]
    });

    $('.main-popular-scroll').jScrollPane({showArrows: true, autoReinitialise: true});

    $('.main-other-list-inner').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 767,
                settings: 'unslick'
            }
        ]
    });

    $('.main-other-more a').click(function(e) {
        $('.main-other-list-item:hidden').eq(0).addClass('visible');
        if ($('.main-other-list-item:hidden').length == 0) {
            $('.main-other-more').hide();
        }
        e.preventDefault();
    });

    $('.main-hot-list-inner').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 767,
                settings: 'unslick'
            }
        ]
    });

    $('.main-hot-more a').click(function(e) {
        $('.main-hot-list-item:hidden').eq(0).addClass('visible');
        if ($('.main-hot-list-item:hidden').length == 0) {
            $('.main-hot-more').hide();
        }
        e.preventDefault();
    });

    $('.slider-2-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false
                }
            }
        ]
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, hide_results_on_select: false, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, hide_results_on_select: false, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});

    curForm.find('input[type="reset"]').on('click', function(e) {
        window.setTimeout(function() {
            curForm.find('.form-select select').chosen('destroy');
            curForm.find('.form-select select').chosen({disable_search: true, hide_results_on_select: false, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
        }, 100);
    });

    if (curForm.hasClass('window-form')) {
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                windowOpen($(form).attr('action'), $(form).serialize());
            }
        });
    } else {
        curForm.validate({
            ignore: ''
        });
    }
}

$(window).on('load resize', function() {
    $('.catalogue-inner').each(function() {
        var curList = $(this);

        curList.find('.catalogue-item-title').css({'min-height': '0px'});

        curList.find('.catalogue-item-title').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-title').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.catalogue-item-price').css({'min-height': '0px'});

        curList.find('.catalogue-item-price').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-price').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

    });

    $('.detail-text-wrap').each(function() {
        var curBlock = $(this);
        curBlock.removeClass('open');
        if (curBlock.find('.detail-text').outerHeight() < curBlock.find('.detail-text-inner').outerHeight()) {
            curBlock.addClass('detail-text-with-link');
        } else {
            curBlock.removeCass('detail-text-with-link');
        }
    });

});

function recalcCart() {
    var allSumm = 0;

    $('.cart-item').each(function() {
        var curItem = $(this);
        var curPrice = Number(curItem.find('.cart-item-price-value').eq(0).html().replace(/ /g, ''));
        var curCount = Number(curItem.find('.cart-item-count-field-value-text').html());
        var curSumm = curPrice * curCount;
        curItem.find('.cart-item-summ-value').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        allSumm += curSumm;
    });

    var couponDiscount = 0;
    if ($('.cart-coupon-value').length > 0) {
        couponDiscount = Number($('.cart-coupon-value').html().replace(/ /g, ''));
    }
    $('.cart-summ-temp-value').html(String(allSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $('.cart-summ-end-value').html(String(allSumm - couponDiscount).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}

function windowOpen(linkWindow, dataWindow) {
    $('html').addClass('window-open');

    if ($('.window').length > 0) {
        $('.window').remove();
    }

    $('.wrapper').append('<div class="window"><div class="window-loading"></div></div>')

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

            if ($('.window-container img').length > 0) {
                $('.window-container img').each(function() {
                    $(this).attr('src', $(this).attr('src'));
                });
                $('.window-container').data('curImg', 0);
                $('.window-container img').on('load', function() {
                    var curImg = $('.window-container').data('curImg');
                    curImg++;
                    $('.window-container').data('curImg', curImg);
                    if ($('.window-container img').length == curImg) {
                        $('.window-container').removeClass('window-container-load');
                        windowPosition();
                    }
                });
            } else {
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }

            $(window).resize(function() {
                windowPosition();
            });

            $('.window-close').click(function(e) {
                windowClose();
                e.preventDefault();
            });

            $('body').on('keyup', function(e) {
                if (e.keyCode == 27) {
                    windowClose();
                }
            });

            $('.window form').each(function() {
                initForm($(this));
            });

            $(document).click(function(e) {
                if ($(e.target).hasClass('window')) {
                    windowClose();
                }
            });
        }
    });
}

function windowOpenSelf(linkWindow) {
    $('html').addClass('window-open');

    if ($('.window').length > 0) {
        $('.window').remove();
    }

    $('.wrapper').append('<div class="window"><div class="window-loading"></div></div>')

    var html = $(linkWindow).html();
    if ($('.window').length > 0) {
        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').on('load', function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        $(window).resize(function() {
            windowPosition();
        });

        $('.window-close').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').on('keyup', function(e) {
            if (e.keyCode == 27) {
                windowClose();
            }
        });

        $('.window input[id]').each(function() {
            $(this).attr('id', $(this).attr('id') + '_window');
        });

        $('.window input[equalTo]').each(function() {
            $(this).attr('equalTo', $(this).attr('equalTo') + '_window');
        });

        $('.window form').each(function() {
            initForm($(this));
        });

        $(document).click(function(e) {
            if ($(e.target).hasClass('window')) {
                windowClose();
            }
        });
    }
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
    }
}