$(document).ready(function () {
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
            div.append('<p>'+txt+'</p>');
        }
        $.each(pix.split(','),function (index,src) {
            div.append('<p><img src="'+src+'"/ width="640"></p>');
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

    $('body').each(function (index,body) {
        body = $(body);
        var div = $('<div class="page"></div>').append(body.html());
        body.empty().append(div);
    });
});
