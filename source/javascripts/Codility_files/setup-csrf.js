// Requires $.cookie
(function() {
    // Set up CSRF handling for Ajax requests via jQuery
    // https://docs.djangoproject.com/en/1.5/ref/contrib/csrf/#ajax
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    if ($.cookie('csrftoken')) {
        $.ajaxSetup({
            crossDomain: false, // obviates need for sameOrigin test
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
                }
            }
        });
    }
})();
