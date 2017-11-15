function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;    //<-- This is for putting the clock in the HTML. 
    var t = setTimeout(startTime, 500);  //whatever this is, the clock stops without it.
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

/*
Many thanks to w3Schools, this clock comes from an example on their site.

<body onload="startTime()">
Is is how the example triggered this.

Notes: Line 2 has "new Date", make sure this doesn't conflict with
the new date already being used.

Line 8 is the code that puts the clock into the HTML. It'll need to
be updated with the ID of the correct place for the clock. In jQuery, 
it's probably written:
$("#txt").html(h + ":" + m + ":" + s);