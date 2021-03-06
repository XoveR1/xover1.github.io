(function($) {
    $.fn.customModal = function (options) {
        const MOBILE_WIDTH = 752;

        options = options || {};
        var modalTriggerSelector = this.selector;
        var modalSelector =  options.modalSelector || '.modal';
        var modalContainerSelector = options.modalContainerSelector || '.modal-container';
        var overlaySelector = options.overlaySelector || '.modal-overlay';
        var closeBtnSelector = options.closeBtnSelector || '.modal-close-btn';
        var modalDisableOverlay = options.modalDisableOverlay || '.modal-disable-overlay';
        var scrollableClass = options.scrollableClass || 'scrollable';

        var getModal = function($modalBtn){
            return $('#' + (options.modal_id || $modalBtn.data('modal-id')))
        };

        var stretchOverlay = function(){
            var $modal = $(modalSelector),
                $modalOverlay = $(overlaySelector),
                windowHeight = $(document).height();
            $modal.height(windowHeight);
            $modalOverlay.height(windowHeight);
        };

        var isMobileScreen = function(){
            return $('body').width() <= MOBILE_WIDTH;
        };

        var centreModal = function(){
            var $modalContainer = $(modalContainerSelector),
                $modalDisableOverlay = $modalContainer.find(modalDisableOverlay),
                modalWidth = $modalContainer.outerWidth(),
                modalHeight = $modalContainer.outerHeight(),
                windowHeight = $(window).height(),
                modalTBPadding = parseInt($modalContainer.css('paddingTop')) +
                    parseInt($modalContainer.css('paddingBottom'));

            if(isMobileScreen()){
                $modalContainer.addClass(scrollableClass).css({
                    marginTop: 0,
                    marginLeft: 0,
                    top: 0,
                    left: 0,
                    overflowX: 'none'
                });
                if(windowHeight < modalHeight) {
                    $modalContainer.css({
                        height: windowHeight - modalTBPadding,
                        overflowY: 'auto'
                    })
                } else {
                    $modalContainer.css({height: 'auto'})
                }
            } else if(windowHeight > modalHeight){
                $modalContainer.removeClass(scrollableClass).css({
                    marginTop: -modalHeight / 2,
                    marginLeft: -modalWidth / 2,
                    top: '50%',
                    left: '50%',
                    height: 'auto',
                    overflowY: 'visible',
                    overflowX: 'visible'
                });
            } else {
                $modalContainer.addClass(scrollableClass).css({
                    marginTop: 0,
                    marginLeft: -modalWidth / 2,
                    top: 0,
                    left: '50%',
                    height: windowHeight - modalTBPadding,
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                });
            }
            $modalDisableOverlay.css({height: modalHeight})
        };

        $(document).on('click', modalTriggerSelector, function(e){
            var $modal = getModal($(this));
            e.preventDefault();
            $modal.addClass('modal-open');
            centreModal();
            stretchOverlay();
        });

        $(document).on('click', overlaySelector + ',' + closeBtnSelector, function(){
            var $modal = getModal($(this));
            $modal.addClass('modal-close');
            setTimeout(function(){
                $modal.removeClass('modal-close');
                $modal.removeClass('modal-open');
            }, 300);
        });

        $(window).on('resize', function () {
            setTimeout(function(){
                centreModal();
                stretchOverlay();
            }, 220);
        });
    }
})(jQuery);

$(document).ready(function(){
    $('.references-articles article').customModal({
        modal_id : 'gallery-modal'
    });
    $('#feedBackBtn').customModal({
        modal_id : 'feedback-modal'
    });
});