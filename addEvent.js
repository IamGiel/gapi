

var sum = $("#eventName").val().trim(); //IDs are for theoretical inputs in a form.
var loc = $("#location").val().trim();
var sTime = $("#startTime").val().trim();//needs to have date added to it- reconcile with our "day" variable?
var eTime = $("#endTime").val().trim(); //needs to have date attached, Google wants datetime.
//var tZone = 'America/New_York'; I'm not sure about this one. Could we
//grab the user's time zone? It's here because it's in the example. I 
//put it in so that we could hard set it for demonstration but if we can
//grab the user's time zone that would be preferable.




$("#newEvent").on("click", function execute() {
	return gapi.client.calendar.events.insert({
	  "calendarId": "primary",
	  "sendNotifications": "false",
	  "supportsAttachments": "false",
	  "resource": {
	    "location": loc,
	    "summary": sum,
	    "start": {
	      "dateTime": sTime
	    },
	    "end": {
	      "dateTime": eTime
		} //end close
		},  // resource close
	  "alt": "json",
      "prettyPrint": "true"
	});  //return insert close

	.then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
    }, function(error) {
          console.error("Execute error", error);
    });

    gapi.load("client:auth2", function() {
    	gapi.auth2.init({client_id: YOUR_CLIENT_ID});
  	});

		

});// onClick close

/* Needed as of 11/14 9:32 pm: client ID needs to be pasted into line 42.

 lines 34-43: code needs to be entered to display these responses into the HTML.

 date/dateTime needs to be worked out- I only got it to work in the API explorer when I input start and end as dateTime, 
 using the UNIX format. Start and End TIMES are mandatory. I bet UNIX deals with timezone as well. How is dateTime/timezone
 being dealt with in other areas? Do we want to assume only single day events are being put in? Events for the date 
 displayed only?

This is based on an onClick, assuming there would be a form/modal with a button that could trigger all of this.
Form would need 4 fields: name, location, startTime, endTime.
I am assuming "summary" = "event name", as there didnt' seem to be a "name of event" otherwise.
Names and other notes are with the the variables at the top of the page. 
