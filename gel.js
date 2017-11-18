      


      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      // ===================== MAP =======================
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('event-details'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
      infoWindow = new google.maps.InfoWindow;
      console.log(infoWindow);
      // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log("navigator");

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }  
 // ================================================================= 
      // Calls getWeather() when document is ready
       $( window ).on( "load", function(){

        getWeather(); 
        startTime();

       });


      //Google 0Auth
      //=========================

      // Client ID and API key from the Developer Console
      var CLIENT_ID = '908655633390-bipca08v5p9tkot7cjul1pgtcbd4ts10.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCcz_rY6GhH9tTnejrKQgbxXu7y8CM2Fjg';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      var event;

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);  
      }
      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }
      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listUpcomingEvents();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }
      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }
      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }
    
      // <div>
      //   <span id="event-time"></span>&nbsp|&nbsp<span id="event-title"></span>
      // </div>
      
      
      $("#time-now").html(new Date());//I added this to display current time     
       // ========= current hours momentJS formatting =========
      var currentHours = moment(new Date()).format("YYYY-MM-DDT01:mm:ssZ");
      console.log("MIN: " + currentHours);
      //==== API call for events at current time =======
      var s = moment(new Date()).format(" MMMM DD YYYY ");
      // console.log(formatDate(s)); 
      $("#display-date").text(s);
      $("<div class='timeHeader'></div>").prepend("<b>" + "Current Time " + "</b>" + moment(new Date()).format(" h : mm a"));//display the time on the header of each div-class header
      
      d = moment(new Date()).format("YYYY-MM-DDT23:59:ssZ");
      console.log("MAX: " + d)
      
      // ======== API CALLS for CURRENT EVENTS =========
      function listUpcomingEvents() {
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': currentHours,
        'timeMax': d,
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function(response) {
        events = response.result.items;
        console.log("ResponseResultItems: " + response.result.items[1]);
        console.log("Events: " + events[1]);
        console.log("Events-length: " + events.length);

        // appendPre(events);

        console.log("THIS IS EVENTS" + response);
        if (events.length > 0) {
          for (i = 0; i < events.length; i++) {
            event = events[i];//list of events for this date
            when = event.start.dateTime;//the time this event is scheduled
            console.log(event.summary);
            console.log(when);
            //====using momentJS time format======= 
            var eventHour = "<b>" + "This hour of " + "</b>" + "&nbsp" + moment(when).format(" hh : mm a");
            console.log("TIME THIS HAPPENS " + eventHour);
            //===========
            // $("#event-time").html(eventHour);//this displays the time of the scheduled event
              if (!when) {
              when = event.start.dateTime;           
            }
            appendPre(event.summary);
          }
        } else {
          appendPre('No upcoming events found.');
        }
        //======= append events to DOM here ============
        function appendPre(message) {
          console.log(message);
         
          var textContent = document.createTextNode(message);
          console.log(textContent);
          // pre.appendChild(textContent);
        $("#event-title").append("<div class='event'>" + "<div class='event-header'>"+ "<span>" + eventHour + "&nbsp|&#8594&nbsp" + message + "</span>" + "</div>" + "</div>");
        } 
      });
    }
    //Weather
    //https://home.openweathermap.org
    //=========================

    var ApiKeyOWM = "079b3bb7acbb509e98d70fdbdb2f77fd";

    //api.openweathermap.org/data/2.5/weather?q={city name},{country code}
    //api.openweathermap.org/data/2.5/weather?q=Raleigh,US&APPID=079b3bb7acbb509e98d70fdbdb2f77fd
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Raleigh,US" + "&APPID=" +  ApiKeyOWM;
    console.log(queryURL);

    //Stores OWM call information
    // var weatherObject = ;

    function getWeather() {
      console.log("inside getWeather");

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);
        console.log(response.weather[0].icon);
        console.log(response.main.temp);

        var imgDiv = "<img src='" + "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'" + ">";
        console.log(imgDiv);
        $("#weather-icon").empty();
        $("#weather-icon").append(imgDiv);
        $("#temp").empty();
        //Converts from Kelvin to F
        $("#temp").append((((9/5) * (response.main.temp - 273)) + 32).toPrecision(2) + "  F");
       
      });
    }

    //Time
    //=========================

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);

        $("#clock").text(h + ":" + m + ":" + s);
        var t = setTimeout(startTime, 500);  //whatever this is, the clock stops without it.
    }
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
    //================ ADD EVENT ===================
    //   $("#newEvent").on("click", function execute(event) {
    //   event.preventDefault();
    //   var sum = $("#eventName").val().trim(); //IDs are for theoretical inputs in a form.
    //   var loc = $("#location").val().trim();
    //   var sTime = $("#startTime").val().trim();//needs to have date added to it- reconcile with our "day" variable?
    //   var eTime = $("#endTime").val().trim(); //needs to have date attached, Google wants datetime.
    // //var tZone = 'America/New_York'; I'm not sure about this one. Could we
    // //grab the user's time zone? It's here because it's in the example. I 
    // //put it in so that we could hard set it for demonstration but if we can
    // //grab the user's time zone that would be preferable.
    //   console.log("name of event: " + sum);
    //   console.log("location: " + loc);
    //   console.log("sTime: ", sTime);
    //   console.log("eTime: ", eTime);
    //   return gapi.client.calendar.events.insert({
    //     "calendarId": "primary",
    //     "sendNotifications": "false",
    //     "supportsAttachments": "false",
    //     "resource": {
    //       "location": loc,
    //       "summary": sum,
    //       "start": {
    //         "dateTime": sTime
    //       },
    //       "end": {
    //         "dateTime": eTime
    //       } //end close
    //       },  // resource close
    //     "alt": "json",
    //     "prettyPrint": "true"
    //   });  //return insert close

    //   then(function(response) {
    //           // Handle the results here (response.result has the parsed body).
    //           console.log("Response", response);
    //     }, function(error) {
    //           console.error("Execute error", error);
    //     });

    //     gapi.load("client:auth2", function() {
    //       gapi.auth2.init({client_id: '957547373869-me0jf26toqdej2vbqaqcnb6v6r17r9qf.apps.googleusercontent.com'});
    //     });

        

    // });// onClick close   