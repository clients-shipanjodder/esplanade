(function($){
    $(document).ready(function(){
        $('html body').on('click','#modula_albums_pro_check button.notice-dismiss',function(){
            var expires = new Date();
            expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
            document.cookie ='modula_albums_pro_check=true;expires='+expires.toUTCString();
        });
    });
})(jQuery);