$(document).ready(function () {
popups.init();

});


var popups = (function() {
    var _self = {};
    var $items = $('#projects .item');
    var $popup = $('.popup');
    _self.position = {};
    
    _self.init = function () {
        _self.bindEvents();
    }
    _self.setPopupRect = function(){
        $popup.css(_self.position)
        console.log(_self.position)
    }
    _self.bindEvents=function () {
        $items.on('click',function () {
            _self.position = {
                left:$(this).offset().left,
                top:$(this).offset().top - $(document).scrollTop(),
                width:$(this)[0].getBoundingClientRect().width.toFixed(3),
                height:$(this)[0].getBoundingClientRect().height.toFixed(3)
            };
            _self.setPopupRect();
        });
    };
    return _self;
})()