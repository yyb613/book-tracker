// Highlight selected nav item
$(document).ready(function () {
    $(".nav-link").click(function (e) {
        $(".nav-link").removeClass("activeNav");
        $(this).addClass("activeNav");
    });
});

/* Drag and Drop */
// Drag
function drag(event) {
    const cardObj = { // Object with card contents
        coverURL: event.target.querySelector('.card-img-top').src,  // Image
        title: event.target.querySelector('.card-title').innerHTML, // Title
        author: event.target.querySelector('#author').innerHTML,  // Author
        numPages: event.target.querySelector('#pages').innerHTML, // Pages
        origin: window.location.pathname.slice(1) // MySQl table origin
    }
    event.dataTransfer.setData("text", JSON.stringify(cardObj)); // Transfer object
}

// Allow Drop
function allowDrop(event) {
   event.preventDefault(); // Prevent Default
}

// Drop to Already Read
function dropAlready(event) {
    event.preventDefault(); // Prevent Default
    var data = event.dataTransfer.getData("text"); // Receive data
    cardObj = JSON.parse(data); // Parse data
    cardObj.destination = 'alreadyread'; // Add destination table

    console.log(cardObj);
    
    fetch('/alreadyreadDragged', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardObj)
    })
        .then(function (response) {
            if(response.ok){
                location.reload()
            }
        })
}

// Drop to Currently Reading
function dropCurrent(event) {
    event.preventDefault(); // Prevent Default
    var data = event.dataTransfer.getData("text"); // Receive data
    cardObj = JSON.parse(data); // Parse data
    cardObj.destination = 'currentlyreading'; // Add destination table

    console.log(cardObj);
    
    fetch('/currentlyDragged', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardObj)
    })
        .then(function (response) {
            if(response.ok){
                location.reload()
            }
        })
}

// Drop to Want to Read
function dropWant(event) {
    event.preventDefault(); // Prevent Default
    var data = event.dataTransfer.getData("text"); // Receive data
    cardObj = JSON.parse(data); // Parse data
    cardObj.destination = 'wanttoread'; // Add destination table

    console.log(cardObj);
    
    fetch('/wantDragged', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardObj)
    })
        .then(function (response) {
            if(response.ok){
                location.reload()
            }
        })
}