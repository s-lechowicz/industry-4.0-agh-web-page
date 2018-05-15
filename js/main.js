var tagToYpdateArray = ["status",
    "customerItem",
    "customerName",
    "customerSurname",
    "st10_msg",
    "st20_msg",
    "st30_msg",
    "st40_msg",
    "st50_msg",
    "st60_msg",
    "st70_msg",
    "st80_msg"];

function updateButton(statusText) {
    if (statusText == "0") {
        document.getElementById("submit-button").disabled = false;
        document.getElementById("submit-button").style.cursor = "pointer";
        document.getElementById("status").style.color = "#0F0";
        document.getElementById("status").innerText = "Available";
    } else {
        document.getElementById("submit-button").style.cursor = "not-allowed";
        document.getElementById("submit-button").disabled = true;
        document.getElementById("status").style.color = "#F00";
        document.getElementById("status").innerText = "Running...";
    }
}

$(document).ready(function () {
    updateButton("1");

    $(window).on("scroll", function () {
        updateNavbar();
    });

    $(window).on('resize', function () {
        updateNavbar();
    });

    updateNavbar();
});

$(document).ready(function () {
    $.ajaxSetup({cache: false});
    setInterval(function () {
        updateWebpage();
    }, 1000);
});

function updateNavbar() {
    shrinkNavbar($(window).scrollTop() >= 100);
    makeNavbarDark($(window).scrollTop() >= 100);
    shrinkNavbarVertical($(this).width() < 640 && $(window).scrollTop() < 100);
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

function updateWebpage() {
    // $.get("output-test.html", function (result) {
    $.get("output.html", function (result) {
        var output = JSON.parse(result);

        for (var tag of tagToYpdateArray) {
            var outputValue = htmlDecode(output[tag]).trim();

            if (tag == "status") {
                updateButton(outputValue);
                continue;
            }

            if (outputValue[0] == "'" && outputValue.length > 3) {
                outputValue = outputValue.substring(1, outputValue.length - 1);
            }
            $('#' + tag).text(outputValue);
        }
    });
}