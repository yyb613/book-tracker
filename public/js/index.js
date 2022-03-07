// Highlight selected nav item
$(document).ready(function () {
    $(".nav-link").click(function (e) {
        $(".nav-link").removeClass("activeNav");
        $(this).addClass("activeNav");
    });
});

// Drag and Drop
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    console.log(event.target);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}