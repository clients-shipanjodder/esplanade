(function($) {
    'use strict';

    var hotelRoomCart = {};
    eltd.modules.hotelRoomCart = hotelRoomCart;

    hotelRoomCart.eltdOnDocumentReady = eltdOnDocumentReady;
    hotelRoomCart.eltdOnWindowLoad = eltdOnWindowLoad;
    hotelRoomCart.eltdOnWindowResize = eltdOnWindowResize;
    hotelRoomCart.eltdOnWindowScroll = eltdOnWindowScroll;

    hotelRoomCart.eltdInitHotelRoomCartUpdateSession = eltdInitHotelRoomCartUpdateSession ;

    $(document).ready(eltdOnDocumentReady);
    $(window).on('load', eltdOnWindowLoad);
    $(window).resize(eltdOnWindowResize);
    $(window).scroll(eltdOnWindowScroll);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function eltdOnDocumentReady() {
        eltdInitHotelRoomCartUpdateSession();


    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function eltdOnWindowLoad() {
    }

    /*
     All functions to be called on $(window).resize() should be in this function
     */
    function eltdOnWindowResize() {

    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function eltdOnWindowScroll() {

    }

    function eltdInitHotelRoomCartUpdateSession(){
        var wooCommerceCheckout = $('.woocommerce-checkout');

        function updateSessionTrigger() {


            var ajaxData = {
                action: 'check_hotel_room_session_update',
            };

            $.ajax({
                type: 'POST',
                data: ajaxData,
                url: eltdGlobalVars.vars.eltdAjaxUrl,

                success: function (data) {
                    return true;
                }
            });
        }

        if(wooCommerceCheckout.length) {
            updateSessionTrigger();
        }
      
    }

    

})(jQuery);
(function($) {
    'use strict';

    var hotelRoomSingle = {};
    eltd.modules.hotelRoomSingle = hotelRoomSingle;

    hotelRoomSingle.eltdOnDocumentReady = eltdOnDocumentReady;
    hotelRoomSingle.eltdOnWindowLoad = eltdOnWindowLoad;
    hotelRoomSingle.eltdOnWindowResize = eltdOnWindowResize;
    hotelRoomSingle.eltdOnWindowScroll = eltdOnWindowScroll;

    hotelRoomSingle.eltdInitHotelRoomSingleTabs = eltdInitHotelRoomSingleTabs;
    hotelRoomSingle.eltdHotelRoomTabsMapTrigger = eltdHotelRoomTabsMapTrigger;
    hotelRoomSingle.eltdHotelRoomReviewsInit = eltdHotelRoomReviewsInit;
    hotelRoomSingle.eltdInitHotelRoomSingleSlider = eltdInitHotelRoomSingleSlider;

    $(document).ready(eltdOnDocumentReady);
    $(window).on('load', eltdOnWindowLoad);
    $(window).resize(eltdOnWindowResize);
    $(window).scroll(eltdOnWindowScroll);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function eltdOnDocumentReady() {
        if(typeof eltd === 'undefined' || typeof eltd === '' ){
            //if theme is not installed, generate single items manualy
            eltdInitHotelRoomSingleTabs();
        }

        if(typeof eltd !== 'undefined' ){
            //if theme is installed, trigger google map loading on location tab on single pages
            eltdHotelRoomTabsMapTrigger();

        }

        // For now, regardless of whether the theme is installed, initiate reviews
        eltdHotelRoomReviewsInit();


    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function eltdOnWindowLoad() {
        eltdInitHotelRoomSingleReservation();
        eltdInitHotelRoomSingleSlider();
    }

    /*
     All functions to be called on $(window).resize() should be in this function
     */
    function eltdOnWindowResize() {

    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function eltdOnWindowScroll() {

    }

    function eltdInitHotelRoomSingleTabs(){
        var holder = $('.eltd-hotel-room-single-outer');
        var roomNavItems = holder.find('.eltd-hr-item-wrapper ul li a');
        var roomSectionsItems  = holder.find('.eltd-hr-item-section');
        roomNavItems.first().addClass('eltd-active-item');

        roomNavItems.on('click', function(e){

            e.preventDefault();

            roomNavItems.removeClass('eltd-active-item');

            var thisNavItem  = $(this);

            var thisNavItemId = thisNavItem.attr('href');
            thisNavItem.addClass('eltd-active-item');

            if( roomSectionsItems.length ){
                roomSectionsItems.each(function(){

                    var thisSectionItem = $(this);

                    if('#'+thisSectionItem.attr('id') === thisNavItemId){
                        thisSectionItem.show();
                        if(thisNavItemId === '#eltd_hotel_room_tab_id_location'){
                            eltdHotelRoomReInitGoogleMap();
                        }
                    }else{
                        thisSectionItem.hide();
                    }
                });
            }
        });
    }

    function eltdHotelRoomTabsMapTrigger(){
        var holder = $('.eltd-hotel-room-single-outer');
        var hotelRoomNavItems = holder.find('.eltd-hr-item-wrapper ul li a');
        hotelRoomNavItems.on('click', function(e){

            e.preventDefault();

            var thisNavItem  = $(this);
            var thisNavItemId = thisNavItem.attr('href');

            if(thisNavItemId === '#eltd_hotel_room_tab_id_location'){
                eltdHotelRoomReInitGoogleMap();
            }
        });
    }

    function eltdHotelRoomReInitGoogleMap(){

        if(typeof eltd !== 'undefined'){
            eltd.modules.googleMap.eltdShowGoogleMap();
        }
    }

    function eltdHotelRoomReviewsInit() {
        var reviewWrappers = $('.eltd-hr-item-reviews-input-wrapper');
        if (reviewWrappers.length) {

            var emptyStarClass = 'icon_star_alt',
                fullStarClass = 'icon_star';

            var setCriteriaCommands = function(criteriaHolder) {
                criteriaHolder.find('.eltd-hr-item-reviews-star-holder')
                    .mouseenter(function () {
                        $(this).add($(this).prevAll()).find('.eltd-hr-item-reviews-star').removeClass(emptyStarClass).addClass(fullStarClass);
                        $(this).nextAll().find('.eltd-hr-item-reviews-star').removeClass(fullStarClass).addClass(emptyStarClass);
                    })
                    .click(function() {
                        criteriaHolder.find('.eltd-hr-item-reviews-hidden-input').val($(this).index()+1);
                    });

                criteriaHolder.find('.eltd-hr-item-reviews-rating-holder')
                    .mouseleave(function() {
                        var inputValue = criteriaHolder.find('.eltd-hr-item-reviews-hidden-input').val();
                        inputValue = inputValue === "" ? 0 : parseInt(inputValue,10);
                        $(this).find('.eltd-hr-item-reviews-star-holder').each(function(i) {
                            $(this).find('.eltd-hr-item-reviews-star').removeClass((i < inputValue) ? emptyStarClass : fullStarClass).addClass((i < inputValue) ? fullStarClass : emptyStarClass);
                        });
                    }).trigger('mouseleave');
            };

            reviewWrappers.each(function() {

                var reviewWrapper = $(this);
                var criteriaHolders = reviewWrapper.find('.eltd-hr-item-reviews-criteria-holder');

                criteriaHolders.each(function() {
                    setCriteriaCommands($(this));
                });
            });
        }
    }

    function eltdInitHotelRoomSingleReservation() {
        var reservation = $('.eltd-hotel-room-reservation');
        if (reservation.length) {

            reservation.each(function() {
                var thisReservation = $(this),
                    allInputs               = thisReservation.find('input, select'),
                    thisReservationHolder   = thisReservation.parents('.eltd-hotel-room-reservation-holder'),
                    finishForm              = thisReservation.find('.eltd-buy-item-form .eltd-hotel-room-single-res-button'), // form that is enabled after validation
                    relocationButton        = thisReservation.find('.eltd-hotel-room-reservation-similar'), // button for relocation
                    form                    = thisReservation.find('#eltd-hotel-room-form'), // initial form
                    checkButton             = form.find('.eltd-hotel-room-single-res-check'), // check button
                    checkButtonChecking     = form.find('.eltd-hotel-room-single-res-checking'), // check button
                    initialPrice            = thisReservation.find('.eltd-res-initial-price .eltd-res-price-number'), // initial price
                    endPrice                = thisReservation.find('.eltd-res-end-price .eltd-res-price-number'), // end price after activated extra services
                    roomNumber              = thisReservation.find('.eltd-res-rooms-number'),
                    adults                  = thisReservation.find('.eltd-res-adults'),
                    children                = thisReservation.find('.eltd-res-children'),
                    minDate                 = thisReservation.find('.eltd-res-min-date'),
                    maxDate                 = thisReservation.find('.eltd-res-max-date'),
                    formValidation          = thisReservation.find('#reservation-validation-messages-holder');

                //INIT ROOMS FIELD

                var selectRoomNumber = roomNumber;
                if(selectRoomNumber.length) {
                    selectRoomNumber.select2({
                        minimumResultsForSearch: -1
                    });
                }

                //INIT ADULTS FIELD

                var selectAdults = adults;
                if(selectAdults.length) {
                    selectAdults.select2({
                        minimumResultsForSearch: -1
                    });
                }

                //INIT ADULTS FIELD

                var selectChildren = children;
                if(selectChildren.length) {
                    selectChildren.select2({
                        minimumResultsForSearch: -1
                    });
                }


                //INIT DATE CHECK-IN FIELD
                if(minDate.length) {
                    minDate.datepicker({
                        minDate : '0',
                        dateFormat: 'yy-mm-dd'
                    })
                }

                //INIT DATE CHECK-OUT FIELD
                if(maxDate.length) {
                    maxDate.datepicker({
                        minDate : '+1d',
                        dateFormat: 'yy-mm-dd'
                    })
                }

                allInputs.change(function() {
                    // reset buttons on reservation form when something is changed
                    finishForm.addClass('eltd-disable-hotel-room-single-btn');
                    relocationButton.addClass('eltd-disable-hotel-room-single-btn');
                });

                form.on('submit', function(e) {

                    var thisForm = $(this);

                    // remove check -> checking
                    checkButton.addClass('eltd-disable-hotel-room-single-btn');
                    checkButtonChecking.removeClass('eltd-disable-hotel-room-single-btn');

                    e.preventDefault();
                    e.stopPropagation();

                    var ajaxData = {
                        action: 'check_hotel_room_booking'
                    };

                    // get all inputs
                    ajaxData.fields = thisForm.serialize();

                    $.ajax({
                        type: 'POST',
                        data: ajaxData,
                        url: eltdGlobalVars.vars.eltdAjaxUrl,

                        success: function (data) {

                            var response = $.parseJSON(data);

                            if(!response.status) {
                                updateValidationTemplate(formValidation, response.messages);

                                finishForm.addClass('eltd-disable-hotel-room-single-btn');

                                if(response.relocation === 'hotel_search') {
                                    // enable relocation
                                    relocationButton.removeClass('eltd-disable-hotel-room-single-btn');
                                }
                                else {
                                    // leave only check reservation
                                    relocationButton.addClass('eltd-disable-hotel-room-single-btn');
                                }

                            } else {

                                // reset all messages
                                updateValidationTemplate(formValidation, []);

                                // enable add to cart
                                relocationButton.addClass('eltd-disable-hotel-room-single-btn');

                                finishForm.removeClass('eltd-disable-hotel-room-single-btn');

                                if(response.newPrice !== '') {
                                    // set new price
                                    endPrice.html(response.newPrice);
                                }

                            }

                            // added to reservation holder data
                            setDataForBooking(thisReservationHolder, thisForm);

                            // remove checking -> check
                            checkButtonChecking.addClass('eltd-disable-hotel-room-single-btn');
                            checkButton.removeClass('eltd-disable-hotel-room-single-btn');
                        }
                    });
                });

                relocationButton.click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var thisButton = $(this);
                    var data = thisReservationHolder.data();

                    var searchLink = thisButton.attr('href');

                    var i = 0;
                    // creating link and 'get' data
                    $.each(data, function(index, value) {
                        if(i++ === 0) {
                            searchLink+= '?';
                        } else {
                            searchLink+= '&';
                        }
                        searchLink += index + '=' + value;
                    });

                    // redirect to search page
                    window.location = searchLink;

                })

            });

        }


        var updateValidationTemplate = function (formValidation, messages) {
            var html = '';

            for(var i = 0; i < messages.length; i++) {
                html += '<div class="eltd-reservation-messages">' + messages[i] + '</div>';
            }

            formValidation.html(html);

        };

        var setDataForBooking = function (holder, form) {
            holder.data('min_date', form.find('input[name="room_min_date"]').val());
            holder.data('max_date', form.find('input[name="room_max_date"]').val());
            holder.data('rooms_number', form.find('select[name="room_number"]').val());
            holder.data('adults', form.find('select[name="room_adults"]').val());
            holder.data('children', form.find('select[name="room_children"]').val());
        }

    }

    function eltdInitHotelRoomSingleSlider() {
        var sliders = $('.eltd-hotel-room-single-holder .eltd-owl-slider, .eltd-hotel-room-single-holder .eltd-slider-thumbnail');

        if(sliders.length) {
            sliders.addClass('eltd-hotel-single-slider-show');
        }
    }



})(jQuery);
(function($) {
    'use strict';

    var hotelRoomFilter = {};
    eltd.modules.hotelRoomFilter = hotelRoomFilter;

    hotelRoomFilter.eltdOnDocumentReady = eltdOnDocumentReady;
    hotelRoomFilter.eltdOnWindowLoad = eltdOnWindowLoad;
    hotelRoomFilter.eltdOnWindowResize = eltdOnWindowResize;
    hotelRoomFilter.eltdOnWindowScroll = eltdOnWindowScroll;

    $(document).ready(eltdOnDocumentReady);
    $(window).on('load', eltdOnWindowLoad);
    $(window).resize(eltdOnWindowResize);
    $(window).scroll(eltdOnWindowScroll);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function eltdOnDocumentReady() {
        eltdInitHotelRoomFilter();
    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function eltdOnWindowLoad() {
    }

    /*
     All functions to be called on $(window).resize() should be in this function
     */
    function eltdOnWindowResize() {

    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function eltdOnWindowScroll() {
    }

    function eltdInitHotelRoomFilter() {
        var filters = $('.eltd-hotel-filters');
        if (filters.length) {

            filters.each(function () {
                var filter = $(this),
                    roomNumber = filter.find('.eltd-filter-rooms-number'),
                    location = filter.find('.eltd-filter-location'),
                    adults = filter.find('.eltd-filter-adults'),
                    children = filter.find('.eltd-filter-children'),
                    minDate = filter.find('.eltd-filter-min-date'),
                    maxDate = filter.find('.eltd-filter-max-date');

                //INIT ROOMS FIELD

                var selectRoomNumber = roomNumber;
                if (selectRoomNumber.length) {
                    selectRoomNumber.select2({
                        minimumResultsForSearch: -1
                    }).on('select2:select', function (e) {
                    });
                }

                //INIT LOCATION FIELD

                var selectLocation = location;
                if (selectLocation.length) {
                    selectLocation.select2({
                        minimumResultsForSearch: -1
                    }).on('select2:select', function (e) {
                    });
                }

                //INIT ADULTS FIELD

                var selectAdults = adults;
                if (selectAdults.length) {
                    selectAdults.select2({
                        minimumResultsForSearch: -1
                    }).on('select2:select', function (e) {
                    });
                }


                //INIT ADULTS FIELD

                var selectChildren = children;
                if (selectChildren.length) {
                    selectChildren.select2({
                        minimumResultsForSearch: -1
                    }).on('select2:select', function (e) {
                    });
                }


                //INIT DATE CHECK-IN FIELD
                if (minDate.length) {
                    minDate.datepicker({
                        minDate: '0',
                        dateFormat: 'yy-mm-dd'
                    }).change(function (e) {
                    })
                }

                //INIT DATE CHECK-OUT FIELD
                if (maxDate.length) {
                    maxDate.datepicker({
                        minDate: '+1d',
                        dateFormat: 'yy-mm-dd'
                    }).change(function (e) {
                    })
                }
            });

        }
    }


})(jQuery);
(function($) {
    'use strict';

    var hotelRoomList = {};
    eltd.modules.hotelRoomList = hotelRoomList;

    hotelRoomList.eltdOnDocumentReady = eltdOnDocumentReady;
    hotelRoomList.eltdOnWindowLoad = eltdOnWindowLoad;
    hotelRoomList.eltdOnWindowResize = eltdOnWindowResize;
    hotelRoomList.eltdOnWindowScroll = eltdOnWindowScroll;

    $(document).ready(eltdOnDocumentReady);
    $(window).on('load', eltdOnWindowLoad);
    $(window).resize(eltdOnWindowResize);
    $(window).scroll(eltdOnWindowScroll);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function eltdOnDocumentReady() {
        eltdInitRangeSlider();

    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function eltdOnWindowLoad() {
        eltdInitHotelRoomListFilter();
        eltdInitHotelRoomListPagination().init();
    }

    /*
     All functions to be called on $(window).resize() should be in this function
     */
    function eltdOnWindowResize() {

    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function eltdOnWindowScroll() {
        eltdInitHotelRoomListPagination().scroll();
    }

    function eltdInitHotelRoomListAnimation(thisHotelRoomListInner) {
        setTimeout(function () {
            thisHotelRoomListInner.find('article').addClass('eltd-hrl-item-showed');
        }, 100); // fake animation

    }

    function eltdInitRangeSlider(){

        var selectorHolder =  $('.eltd-hrl-filter-part .eltd-filter-price-holder');
        var slider = selectorHolder.find('.eltd-range-slider');
        var outputMin = selectorHolder.find('#eltd-min-price-value');
        var valueMin = outputMin.data('min-price');
        var outputMax = selectorHolder.find('#eltd-max-price-value');
        var valueMax = outputMax.data('max-price');
        var currency = selectorHolder.data('currency');

        var maxPriceSetting = selectorHolder.data('max-price-setting');

        // Basic rangeslider initialization

        slider.slider({
            range: true,
            animate: true,
            min: 0,
            max: maxPriceSetting,
            step: 25,
            values: [ valueMin, valueMax],
            create: function() {

            },
            slide: function( event, ui ) {
                outputMin.html(currency + "" + ui.values[0] );
                outputMax.html(currency + "" + ui.values[1] );
            },
            change: function( event, ui ) {
                outputMin.data('min-price', ui.values[0] );
                outputMax.data('max-price', ui.values[1] );
            }
        });
    }

    function eltdInitHotelRoomListFilter() {
        var hotelRoomListHolder = $('.eltd-hrl-holder');
        if (hotelRoomListHolder.length) {
            hotelRoomListHolder.each(function () {
                var thisHotelRoomList = $(this),
                    thisFilter = $(this).find('.eltd-hrl-filter-part'),
                    thisSorter = $(this).find('.eltd-hrl-sort-part'),
                    button = '', // this will be used for filter
                    sortItems = ''; // this will be used for sorting

                if (thisFilter.length) {

                    var location = thisFilter.find('.eltd-filter-location-holder'),
                        numberOfRooms = thisFilter.find('.eltd-filter-room-count-holder'),
                        minPrice = thisFilter.find('#eltd-min-price-value'),
                        maxPrice = thisFilter.find('#eltd-max-price-value'),
                        minDate = thisFilter.find('.eltd-min-date'),
                        maxDate = thisFilter.find('.eltd-max-date'),
                        adults = thisFilter.find('.eltd-filter-adults-count-holder'),
                        children = thisFilter.find('.eltd-filter-children-count-holder');

                    button = thisFilter.find('.eltd-hr-filter-button');

                    //INIT LOCATION FIELD
                    var selectLocation = location.find('select');
                    if (selectLocation.length) {
                        selectLocation.select2({
                            minimumResultsForSearch: -1
                        }).on('select2:select', function (e) {
                            var selectedElement = $(e.currentTarget);
                            var selectVal = selectedElement.val();
                            location.data('location', selectVal);
                        });
                    }

                    //INIT NUMBER OF ROOMS FIELD
                    var selectNumberOfRooms = numberOfRooms.find('select');
                    if (selectNumberOfRooms.length) {
                        selectNumberOfRooms.select2({
                            minimumResultsForSearch: -1
                        }).on('select2:select', function (e) {
                            var selectedElement = $(e.currentTarget);
                            var selectVal = selectedElement.val();
                            numberOfRooms.data('room-count', selectVal);
                        });
                    }

                    //INIT ADULTS FIELD
                    var selectAdults = adults.find('select');
                    if (selectAdults.length) {
                        selectAdults.select2({
                            minimumResultsForSearch: -1
                        }).on('select2:select', function (e) {
                            var selectedElement = $(e.currentTarget);
                            var selectVal = selectedElement.val();
                            adults.data('adults', selectVal);
                        });
                    }

                    //INIT ADULTS FIELD
                    var selectChildren = children.find('select');
                    if (selectChildren.length) {
                        selectChildren.select2({
                            minimumResultsForSearch: -1
                        }).on('select2:select', function (e) {
                            var selectedElement = $(e.currentTarget);
                            var selectVal = selectedElement.val();
                            children.data('children', selectVal);
                        });
                    }

                    //INIT DATE CHECK-IN FIELD
                    if (minDate.length) {
                        minDate.datepicker({
                            minDate: '0',
                            dateFormat: 'yy-mm-dd'
                        }).change(function (e) {
                            var selectedElement = $(e.currentTarget);
                            var selectVal = selectedElement.val();
                            minDate.data('min-date', selectVal);
                        })
                    }

                    //INIT DATE CHECK-OUT FIELD
                    if (maxDate.length) {
                        maxDate.datepicker({
                            minDate: '+1d',
                            dateFormat: 'yy-mm-dd'
                        }).change(function (e) {
                            var selectedElement = $(e.currentTarget);
                            var selectVal = selectedElement.val();
                            maxDate.data('max-date', selectVal);
                        })
                    }

                    // call ajax in case if filter button is clicked
                    button.click(function () {

                        sortItems = thisHotelRoomList.find('.eltd-hrl-sort-part-item');
                        sortItems.removeClass('eltd-hrl-sort-part-item-active');
                        thisHotelRoomList.find('.eltd-hrl-sort-part-item:first-child').addClass('eltd-hrl-sort-part-item-active');

                        var locationValue = location.data('location'),
                            numberOfRoomsValue = numberOfRooms.data('room-count'),
                            minPriceValue = minPrice.data('min-price'),
                            maxPriceValue = maxPrice.data('max-price'),
                            minDateValue = minDate.val(),
                            maxDateValue = maxDate.val(),
                            adultsValue = adults.data('adults'),
                            childrenValue = children.data('children'),
                            amenities = [],
                            extraServices = [],
                            order = '',
                            orderBy = '';

                        $("input[name='eltd-amenities[]']:checked").each(function () {
                            amenities.push(parseInt($(this).data('id')));
                        });
                        amenities = amenities.join(',');


                        $("input[name='eltd-extra-services[]']:checked").each(function () {
                            extraServices.push(parseInt($(this).data('id')));
                        });
                        extraServices = extraServices.join(',');

                        thisHotelRoomList.data('room-location', locationValue);
                        thisHotelRoomList.data('room-number-of-rooms', numberOfRoomsValue);
                        thisHotelRoomList.data('room-min-price', minPriceValue);
                        thisHotelRoomList.data('room-max-price', maxPriceValue);
                        thisHotelRoomList.data('room-min-date', minDateValue);
                        thisHotelRoomList.data('room-max-date', maxDateValue);
                        thisHotelRoomList.data('room-adults', adultsValue);
                        thisHotelRoomList.data('room-children', childrenValue);
                        thisHotelRoomList.data('room-amenities', amenities);
                        thisHotelRoomList.data('room-extra-services', extraServices);
                        thisHotelRoomList.data('order', order);
                        thisHotelRoomList.data('order-by', orderBy);

                        eltdInitHotelRoomListPagination().getMainPagFunction(thisHotelRoomList, 1, true);

                    });
                }

                if (thisSorter.length) {

                    sortItems = thisHotelRoomList.find('.eltd-hrl-sort-part-item');

                    var sortOption;

                    // call ajax in case if sort items is change
                    sortItems.click(function () {
                        sortItems.removeClass('eltd-hrl-sort-part-item-active');
                        $(this).addClass('eltd-hrl-sort-part-item-active');

                        sortOption = $(this).data('sort');

                        thisHotelRoomList.data('sort-option', sortOption);

                        eltdInitHotelRoomListPagination().getMainPagFunction(thisHotelRoomList, 1);

                    });
                }
            });

        }
    }


    /**
     * Initializes property list pagination functions
     */
    function eltdInitHotelRoomListPagination(){
        var hotelRoomList = $('.eltd-hrl-holder');
        eltdInitHotelRoomListAnimation( hotelRoomList.find('.eltd-hrl-inner'));

        var initStandardPagination = function(thisHotelRoomList) {
            var standardLink = thisHotelRoomList.find('.eltd-hrl-standard-pagination li');

            if(standardLink.length) {
                standardLink.each(function(){
                    var thisLink = $(this).children('a'),
                        pagedLink = 1;

                    thisLink.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
                            pagedLink = thisLink.data('paged');
                        }

                        initMainPagFunctionality(thisHotelRoomList, pagedLink);
                    });
                });
            }
        };

        var initLoadMorePagination = function(thisHotelRoomList) {
            var loadMoreButton = thisHotelRoomList.find('.eltd-hrl-load-more a');

            loadMoreButton.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                initMainPagFunctionality(thisHotelRoomList);
            });
        };

        var initInifiteScrollPagination = function(thisHotelRoomList) {

            var hotelRoomListHeight = thisHotelRoomList.outerHeight(),
                hotelRoomListTopOffest = thisHotelRoomList.offset().top,
                hotelRoomListPosition = hotelRoomListHeight + hotelRoomListTopOffest - eltdGlobalVars.vars.eltdAddForAdminBar,
                hotelRoomListInfinityError = 200;

            if(!thisHotelRoomList.hasClass('eltd-hrl-infinite-scroll-started') && eltd.scroll + eltd.windowHeight > (hotelRoomListPosition - hotelRoomListInfinityError)) {
                initMainPagFunctionality(thisHotelRoomList);
            }
        };

        var initMainPagFunctionality = function(thisHotelRoomList, pagedLink, newPagination) {


            var thisHotelRoomListInner = thisHotelRoomList.find('.eltd-hrl-inner'),
                nextPage,
                maxNumPages,
                thisHotelRoomPagination = thisHotelRoomList.find('.eltd-hrl-pagination-holder');
            if (typeof thisHotelRoomList.data('max-num-pages') !== 'undefined' && thisHotelRoomList.data('max-num-pages') !== false) {
                maxNumPages = thisHotelRoomList.data('max-num-pages');
            }

            if(thisHotelRoomList.hasClass('eltd-hrl-pag-standard')) {
                thisHotelRoomList.data('next-page', pagedLink);
            }

            if(thisHotelRoomList.hasClass('eltd-hrl-pag-infinite-scroll')) {
                thisHotelRoomList.addClass('eltd-hrl-infinite-scroll-started');
            }

            if(pagedLink == 1) {
                thisHotelRoomList.data('next-page', pagedLink);
            }

            var loadMoreDatta = eltd.modules.common.getLoadMoreData(thisHotelRoomList),
                loadingItem = thisHotelRoomList.find('.eltd-hrl-loading');

            nextPage = loadMoreDatta.nextPage;

            if(nextPage <= maxNumPages || maxNumPages === 0){
                if(thisHotelRoomList.hasClass('eltd-hrl-pag-standard')) {
                    loadingItem.addClass('eltd-showing eltd-standard-pag-trigger');
                    thisHotelRoomList.addClass('eltd-hrl-pag-standard-animate');
                } else {
                    loadingItem.addClass('eltd-showing');
                }

                var ajaxData = eltd.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'eltd_hotel_room_hrl_ajax_load_more');

                if(newPagination === true) {
                    ajaxData['newPagination'] = 'yes';
                }

                $.ajax({
                    type: 'POST',
                    data: ajaxData,
                    url: eltdGlobalVars.vars.eltdAjaxUrl,
                    success: function (data) {
                        if(!thisHotelRoomList.hasClass('eltd-hrl-pag-standard')) {
                            nextPage++;
                        }

                        thisHotelRoomList.data('next-page', nextPage);

                        var response = $.parseJSON(data),
                            responseHtml =  response.html;

                        if(thisHotelRoomList.hasClass('eltd-hrl-pag-standard') || pagedLink == 1) {
                            eltdInitStandardPaginationLinkChanges(thisHotelRoomList, maxNumPages, nextPage);

                            thisHotelRoomList.waitForImages(function(){
                                eltdInitHtmlGalleryNewContent(thisHotelRoomList, thisHotelRoomListInner, loadingItem, responseHtml);

                            });
                        } else {
                            thisHotelRoomList.waitForImages(function(){
                                eltdInitAppendGalleryNewContent(thisHotelRoomList, thisHotelRoomListInner, loadingItem, responseHtml);
                            });
                        }


                        if(newPagination === true) {
                            if(thisHotelRoomPagination.length) {
                                eltdInitAppendPaginationContent(thisHotelRoomList, thisHotelRoomPagination, response.pagination);
                            }
                        }

                        if(thisHotelRoomList.hasClass('eltd-hrl-infinite-scroll-started')) {
                            thisHotelRoomList.removeClass('eltd-hrl-infinite-scroll-started');
                        }
                    }
                });
            }

            if(pagedLink == 1) {
                thisHotelRoomList.find('.eltd-hrl-load-more-holder').show();
            }

            if(nextPage === maxNumPages){
                thisHotelRoomList.find('.eltd-hrl-load-more-holder').hide();
            }
        };

        var eltdInitStandardPaginationLinkChanges = function(thisHotelRoomList, maxNumPages, nextPage) {
            var standardPagHolder = thisHotelRoomList.find('.eltd-hrl-standard-pagination'),
                standardPagNumericItem = standardPagHolder.find('li.eltd-hrl-pag-number'),
                standardPagPrevItem = standardPagHolder.find('li.eltd-hrl-pag-prev a'),
                standardPagNextItem = standardPagHolder.find('li.eltd-hrl-pag-next a');

            standardPagNumericItem.removeClass('eltd-hrl-pag-active');
            standardPagNumericItem.eq(nextPage-1).addClass('eltd-hrl-pag-active');

            standardPagPrevItem.data('paged', nextPage-1);
            standardPagNextItem.data('paged', nextPage+1);

            if(nextPage > 1) {
                standardPagPrevItem.css({'opacity': '1'});
            } else {
                standardPagPrevItem.css({'opacity': '0'});
            }

            if(nextPage === maxNumPages) {
                standardPagNextItem.css({'opacity': '0'});
            } else {
                standardPagNextItem.css({'opacity': '1'});
            }
        };

        var eltdInitHtmlGalleryNewContent = function(thisHotelRoomList, thisHotelRoomListInner, loadingItem, responseHtml) {
            loadingItem.removeClass('eltd-showing eltd-standard-pag-trigger');
            thisHotelRoomList.removeClass('eltd-hrl-pag-standard-animate');
            thisHotelRoomListInner.html(responseHtml);

            eltdInitHotelRoomListAnimation(thisHotelRoomListInner);
            eltd.modules.common.eltdInitParallax();
        };

        var eltdInitAppendGalleryNewContent = function(thisHotelRoomList, thisHotelRoomListInner, loadingItem, responseHtml) {
            loadingItem.removeClass('eltd-showing');
            thisHotelRoomListInner.append(responseHtml);

            eltdInitHotelRoomListAnimation(thisHotelRoomListInner);
            eltd.modules.common.eltdInitParallax();
        };

        var eltdInitAppendPaginationContent = function(thisHotelRoomList, thisHotelRoomPagination, pagination) {
            thisHotelRoomPagination.html(pagination.paginationHtml);
            thisHotelRoomList.data('max-num-pages', pagination.maxNumPages)

            eltdInitHotelRoomListPagination().init();
        };

        return {
            init: function() {
                if(hotelRoomList.length) {
                    hotelRoomList.each(function() {
                        var thisHotelRoomList = $(this);

                        if(thisHotelRoomList.hasClass('eltd-hrl-pag-standard')) {
                            initStandardPagination(thisHotelRoomList);
                        }

                        if(thisHotelRoomList.hasClass('eltd-hrl-pag-load-more')) {
                            initLoadMorePagination(thisHotelRoomList);
                        }

                        if(thisHotelRoomList.hasClass('eltd-hrl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHotelRoomList);
                        }
                    });
                }
            },
            scroll: function() {

                if(hotelRoomList.length) {
                    hotelRoomList.each(function() {
                        var thisHotelRoomList = $(this);

                        if(thisHotelRoomList.hasClass('eltd-hrl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHotelRoomList);
                        }
                    });
                }
            },
            getMainPagFunction: function(thisHotelRoomList, paged, newPagination) {
                initMainPagFunctionality(thisHotelRoomList, paged, newPagination);
            }
        };

    }


})(jQuery);
(function($) {
    'use strict';

    var hotelRoomPair = {};
    eltd.modules.hotelRoomPair = hotelRoomPair;

    hotelRoomPair.eltdOnDocumentReady = eltdOnDocumentReady;
    hotelRoomPair.eltdOnWindowLoad = eltdOnWindowLoad;
    hotelRoomPair.eltdOnWindowResize = eltdOnWindowResize;
    hotelRoomPair.eltdOnWindowScroll = eltdOnWindowScroll;

    $(document).ready(eltdOnDocumentReady);
    $(window).on('load', eltdOnWindowLoad);
    $(window).resize(eltdOnWindowResize);
    $(window).scroll(eltdOnWindowScroll);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function eltdOnDocumentReady() {
    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function eltdOnWindowLoad() {
        eltdParallaxElements();

    }

    /*
     All functions to be called on $(window).resize() should be in this function
     */
    function eltdOnWindowResize() {

    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function eltdOnWindowScroll() {
    }

    /**
     * Parallax Elements Instances
     */
    function eltdParallaxElements() {
        var parallaxElements = $('.eltd-hrp-inner');

        if (parallaxElements.length && !eltd.htmlEl.hasClass('touch')) {
            parallaxElements.each(function(){
                var parallaxElement = $(this),
                    randCoeff = (Math.floor(Math.random() * 2) + 1 ) * 0.1,
                    delta = -Math.round(parallaxElement.height() * randCoeff),
                    dataParallax = '{"y":'+delta+', "smoothness":20}';

                parallaxElement.attr('data-parallax', dataParallax);
            });

            setTimeout(function(){
                ParallaxScroll.init(); //initialzation removed from plugin js file to have it run only on non-touch devices
            }, 100); //wait for calcs
        }
    }


})(jQuery);
