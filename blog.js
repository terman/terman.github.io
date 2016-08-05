$(document).ready(function () {
    $('body').each(function (index,body) {
        body = $(body);
        var div = $('<div class="page"></div>').append(body.html());
        body.empty().append(div);
    });

    $('.entry').each(function (index,div) {
        div = $(div);
        var txt = div.html();
        var title = div.attr('title');
        var locn = div.attr('location');
        var pix = div.attr('pix');
        div.empty();

        if (title) {
            div.append('<p><hr></p>');
            var t = $('<b></b>');
            t.append(title);
            if (locn) t.append(' &mdash; ',locn);
            div.append($('<p></p>').append(t));
        }
        if (txt) {
            div.append('<p><span id="caption">'+txt+'</span></p>');
        }
        $.each(pix.split(','),function (index,src) {
            div.append('<p><img class="photo" src="'+src+'"/ width="640"></p>');
        });
    });

    $('.blurb').each(function (index,div) {
        div = $(div);
        var txt = div.html();
        var title = div.attr('title');
        var pix = div.attr('pix');
        var url = div.attr('url');
        div.empty();

        div.append($('<img/>').attr('src',pix));
        var link = $('<a></a>').attr('href',url).append($('<b></b>').append(title));
        div.append(link);
        div.append($('<p></p>').append(txt));
    });

    var slide_number;
    var photos = $('.photo');
    var nphotos = photos.length;
    function show_slide() {
        var img = $(photos[slide_number]);
        var w = img[0].naturalWidth;
        var h = img[0].naturalHeight;
        var caption = $('#caption',img.parent().parent());
        $('.caption').html(caption.html());

        var frame = $('#frame');
        frame.empty();
        var scalew = frame.width()/w;
        var scaleh = frame.height()/h;
        var scale = Math.min(scalew,scaleh);
        frame.append($('<img/>').attr('src',img.attr('src'))
                     .css('width',scale*w)
                     .css('height',scale*h));
    }

    function start_slide_show() {
        $('.slides').show().focus();
        $('body').css('overflow','hidden');
        slide_number = 0;
        show_slide();
    }

    var slide_html = '<table class="slides" cellspacing="0" cellpadding="3">' +
            '<tr height="10"><td colspan="3" align="right"><div class="close"></div></td></tr>' +
            '<tr height="10" valign="top">' +
            '<td width="20" align="left"><div class="prev"></div></td>' +
            '<td width="*"><div class="caption"></div></td>' +
            '<td width="20" align="right"><div class="next"></div></td>' +
            '</tr><tr height="*"><td id="frame" colspan="3"><img class="pix"/></td></tr>' +
            '</table>';

    $('.slideshow').each(function (index,sdiv) {
        sdiv = $(sdiv);
        var b = $('<button>View as slide show</button>');
        sdiv.append(b,slides);
        b.on('click',function () {
            start_slide_show();
        });

        var slides = $(slide_html);

        function sclose() {
            $('.slides').hide();
            $('body').css('overflow','auto');
        }
        $('.close',slides).on('click',function (event) {
            sclose();
            event.preventDefault();
        });

        function nslide() {
            slide_number += 1;
            if (slide_number >= nphotos) slide_number = 0;
            show_slide();
        }
        $('.next',slides).on('click',function (event) {
            nslide();
            event.preventDefault();
        });

        function pslide() {
            slide_number -= 1;
            if (slide_number < 0) slide_number = nphotos-1;
            show_slide();
        }
        $('.prev',slides).on('click',function (event) {
            pslide();
            event.preventDefault();
        });

        $('body').append(slides);
        /*
        slides.on('keydown',function (event) {
            var key = event.keyCode;
            if (key == 32 || key == 37) nslide();
            else if (key == 39) pslide();
            else if (key == 27) sclose();
        });
         */
    });

});
