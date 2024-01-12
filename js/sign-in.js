$(document).ready(function () {
    $("#do_login").click(function () {
        closeLoginInfo();
        var parent = $(this).parent();
        var span = parent.find('span');

        span.css("display", "none").removeClass("i-save i-warning i-close");

        var proceed = true;
        $("#login_form input").each(function () {
            var input = $(this);
            if (!$.trim(input.val())) {
                input.parent().find('span').addClass("i-warning").css("display", "block");
                proceed = false;
            }
        });

        if (proceed) {
            span.addClass("i-save").css("display", "block");
        }
    });

    // Reset previously results and hide all messages on .keyup()
    $("#login_form input").keyup(function () {
        $(this).parent().find('span').css("display", "none");
    });

    openLoginInfo();
    setTimeout(closeLoginInfo, 1000);
});

function openLoginInfo() {
    $('.b-form').css("opacity", "0.01");
    $('.box-form').css("left", "-37%");
    $('.box-info').css("right", "-37%");
}

function closeLoginInfo() {
    $('.b-form').css("opacity", "1");
    $('.box-form').css("left", "0px");
    $('.box-info').css("right", "-5px");
}

$(window).on('resize', function () {
    closeLoginInfo(); 
});

// Placeholder functions for the onclick events
function forgotPassword() {
    // Replace the alert with your logic for "Forgot Password?"
    alert("forgotPassword");
}

// function contactSupport() {
//     // Replace the alert with your logic for "Contact Support"
//     alert("contactSupport");
// }

// function createAccount() {
//     // Replace the alert with your logic for "CREATE ACCOUNT"
//     alert("CREATE ACCOUNT");
// }

function closeLoginInfo() {
    $ ('.b-form').css("opacity", "1");
}