console.log("Test");

$(document).ready(function () {
    $(".nav-link").click(function (e) {
        $(".nav-link").removeClass("activeNav");
        $(this).addClass("activeNav");
    });
  });