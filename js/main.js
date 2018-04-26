var statusText = document.getElementById("status").innerText;

if (statusText === "0") {
    document.getElementById("submit-button").disabled = false;
    document.getElementById("submit-button").style.cursor = "pointer";
    document.getElementById("status").style.color = "#0F0";
} else {
    document.getElementById("submit-button").style.cursor = "not-allowed";
    document.getElementById("submit-button").disabled = true;
    document.getElementById("status").style.color = "#F00";
}

$(document).ready(function () {
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= 100) {
            $(".navbar-brand").addClass("shrink");
            $(".navbar").addClass("shrink").addClass("bg-dark");
        } else {
            $(".navbar-brand").removeClass("shrink");
            $(".navbar").removeClass("bg-dark");
        }
    });
});

var pageByTagIdOutputMap = new Map();
var pageByTagIdPostMap = new Map();

// Output Map
pageByTagIdOutputMap.set("status", "IO/IO_isBusy.html");

// Form Post Map
pageByTagIdPostMap.set("nameInput", "IO/IO_user.name.html");
pageByTagIdPostMap.set("surnameInput", "IO/IO_user.surname.html");
pageByTagIdPostMap.set("selectedItem", "IO/IO_item.html");

$(document).ready(function () {
    $.ajaxSetup({cache: false});
    setInterval(function () {
        for (var [tag, page] of pageByTagIdOutputMap) {
            getIO(tag, page)
        }
    }, 1000);
});

function getIO(id, page) {
    $.get(page, function (result) {
        $('#' + id).text(result.trim());
    });
}

$("#submit-button").click(function () {
    for (var [tag, page] of pageByTagIdPostMap) {
        postIO(tag, page)
    }
});

function postIO(id, page) {
    var name = '"webdata".' + page.substring(4, page.length - 5);
    val = $('#' + id).val();
    sdata = escape(name) + '=' + val;
    $.post(page, sdata, function (result) {
    });
}
