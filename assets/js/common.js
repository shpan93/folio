$(document).ready(function () {
    popups.init();

});
var project = {
    activia: {
        bg:'assets/images/projects/green-bg.jpg',
        
    }
    
}

var popups = (function () {
    var _self = {};
    var $items = $('#projects .item');
    var $popup = $('.popup');
    var $popupPseudo = $('.popup-pseudo');
    var $close = $('.close-icon');
    _self.position = {};
    _self.currentPopup = '';
    
    _self.init = function () {
        _self.bindEvents();
    }
    _self.setPopupRect = function () {
        //clip: rect(300px, 360px, 300px, 0);
        // var px = 'px ,'
        // var x1 = _self.position.left + px;
        // var x2 = (+_self.position.left + +_self.position.width) + px;
        // var y1 = (+_self.position.top + +_self.position.height) + px;
        // var y2 = (+_self.position.left) + 'px';
        $popupPseudo.css(_self.position);
        $popup.find('.project .wr.'+_self.currentPopup).addClass('active');
        setTimeout(function () {
            $popupPseudo.addClass('is-animated opened ' + _self.currentPopup);
             setTimeout(function () {
                $popup.addClass('active ' + _self.currentPopup); 
             },500);
        }, 10);
        console.log(_self.position)
    }
    _self.bindEvents = function () {
        $items.on('click', function () {
            _self.position = {
                left: $(this).offset().left,
                top: $(this).offset().top - $(document).scrollTop(),
                width: $(this)[0].getBoundingClientRect().width.toFixed(3),
                height: $(this)[0].getBoundingClientRect().height.toFixed(3)
            };
            _self.currentPopup = $(this).attr('class').replace(/(item)/, '').trim();
            _self.setPopupRect();
        });
        $close.on('click', function () {
              $popup.removeClass('active ' + _self.currentPopup); 
              $popupPseudo.removeClass('opened').addClass('fade-out');
               
              setTimeout(function(){
                  $popupPseudo.removeClass('is-animated fade-out ' + _self.currentPopup).attr('style','');
                  $popup.find('.project .wr').removeClass('active');
              },500);
            //   setTimeout(function (name)(params) {
                  
            //   })
        });
    };
    return _self;
})()