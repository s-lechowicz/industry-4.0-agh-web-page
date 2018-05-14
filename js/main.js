function updateButton() {
    var statusText = document.getElementById("status").innerText;

    if (statusText == "0") {
        document.getElementById("submit-button").disabled = false;
        document.getElementById("submit-button").style.cursor = "pointer";
        document.getElementById("status").style.color = "#0F0";
    } else {
        document.getElementById("submit-button").style.cursor = "not-allowed";
        document.getElementById("submit-button").disabled = true;
        document.getElementById("status").style.color = "#F00";
    }
}

$(document).ready(function () {
    updateButton();
    $(window).on("scroll", function () {
        shrinkNavbar($(window).scrollTop() >= 100);
        makeNavbarDark($(window).scrollTop() >= 100);
        shrinkNavbarVertical($(this).width() < 640 && $(window).scrollTop() < 100);
    });

    $(window).on('resize', function () {
        shrinkNavbarVertical($(this).width() < 640 && $(window).scrollTop() < 100);
    });

    shrinkNavbar($(window).scrollTop() >= 100);
    makeNavbarDark($(window).scrollTop() >= 100);
    shrinkNavbarVertical($(this).width() < 640 && $(window).scrollTop() < 100);
});

$(document).ready(function () {
    $.ajaxSetup({cache: false});
    setInterval(function () {
        for (var [tag, page] of pageByTagIdOutputMap) {
            getIO(tag, page);
        }
        updateButton();
    }, 1000);
});

function getIO(id, page) {
    $.get(page, function (result) {
        var textFromPage = htmlDecode(result.trim());
        if (textFromPage[0] == "'" && textFromPage.length > 3) {
            textFromPage = textFromPage.substring(1, textFromPage.length - 1);
        }
        $('#' + id).text(textFromPage);
    });
}

function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function shrinkNavbar(shrink) {
    if (shrink) {
        $(".navbar-brand").addClass("shrink");
    } else {
        $(".navbar-brand").removeClass("shrink");
    }
}

function shrinkNavbarVertical(shrink) {
    if (shrink) {
        $(".navbar-brand").addClass("shrink-v");
    } else {
        $(".navbar-brand").removeClass("shrink-v");
    }
}

function makeNavbarDark(bool) {
    if (bool) {
        $(".navbar").addClass("bg-dark");
    } else {
        $(".navbar").removeClass("bg-dark");
    }
}