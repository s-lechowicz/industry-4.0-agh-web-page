var statusText = document.getElementById("status").innerText;

if (statusText === "Available") {
    document.getElementById("submit-button").disabled = false;
    document.getElementById("submit-button").style.cursor = "pointer";
    document.getElementById("status").style.color = "#0F0";
} else {
    document.getElementById("submit-button").style.cursor = "not-allowed";
    document.getElementById("submit-button").disabled = true;
    document.getElementById("status").style.color = "#F00";
}

$(document).ready(function() {
    $(window).on("scroll", function() {
        if ($(window).scrollTop() >= 100) {
            $(".navbar-brand").addClass("shrink");
            $(".navbar").addClass("shrink").addClass("bg-dark");
        } else {
            $(".navbar-brand").removeClass("shrink");
            $(".navbar").removeClass("bg-dark");
        }
    });
});
