      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
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
      // Client ID and API key from the Developer Console
      var CLIENT_ID = '957547373869-me0jf26toqdej2vbqaqcnb6v6r17r9qf.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyAbFH5WoUBGwol0jmrhMD-vkxDKqSsffoU';
      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');
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
      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        //dynamically display events to DOM
        var newSpan = $("<span>");
        newSpan.attr("src", textContent);
        newSpan.attr("id", "event-time");
        $(".event-header").append(newSpan);

        var newSpanEvent = $("<span>");
        newSpanEvent.attr("src", textContent);
        newSpanEvent.attr("id", "event-title");
        $(".event-time").append(newSpanEvent);
        
        var textContent = document.createTextNode(message);
        // console.log(textContent);
        // pre.appendChild(textContent);

      $("#event-title").html(textContent);


      } 

      $("#time-now").html(new Date());//I added this to display
      // function listUpcomingEvents() {
      //   gapi.client.calendar.events.list({
      //     'calendarId': 'primary',
      //     'timeMin': (new Date()).toISOString(),
      //     'showDeleted': false,
      //     'singleEvents': true,
      //     'maxResults': 10,
      //     'orderBy': 'startTime'
      //   }).then(function(response) {
      //     var events = response.result.items;
      //     appendPre('Upcoming events:');
      //     if (events.length > 0) {
      //         for (i = 0; i < events.length; i++) {
      //           var event = events[i];
      //           var when = event.start.dateTime;
      //             if (!when) {
      //               when = event.start.date;
      //             }
      //           $("#events").text("Upcoming: " + event);
      //           }
      //         } else {
      //       appendPre('No upcoming events found.');
      //     }
      //   });
      // }
        //======= DATE MODIFIED =====
        function formatDate(date) {
          var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          return day + ' ' + monthNames[monthIndex] + ' ' + year;
        }
         // current hours
        var currentHours = moment(new Date()).format();
        console.log("Currently you are at " + currentHours);
        //==== API call for events at current time =======
        var s = new Date();//added this to retrieve events for one day
        console.log(formatDate(s)); 
        $("#display-date").text(formatDate(s));
        // s.setHours(currentHours);
        // s.setMinutes(0);
        // s.setSeconds(0);
        // console.log(s);
        // console.log("s " + s.toISOString());
        d = moment(new Date());
        year = d.get('year');
        month = d.get('month')+1;
        day = d.get('day')+12;
        hours = d.get('hour')+1;
        minutes = d.get('minute');
        seconds = d.get('second');
        MAX = year + "-" + month + "-" + day + "T" + 23 + ":" + minutes + ":" + seconds + "-05:00";
        console.log("MAX " + MAX);     
         function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': currentHours,
          'timeMax': MAX,
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 1,
          // 'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          console.log("THIS IS EVENTS" + events);
          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];//list of events for this date
              var when = event.start.dateTime;//the time this event is scheduled
              //====using momentJS time format======= 
              var eventHour = moment(when).format(" h : mm a");
              console.log("TIME NOW " + eventHour);
              //===========
              $("#event-time").html(eventHour);
              console.log("WHEN: " + when);
              console.log("EVENT: " + event);
              if (!when) {
                when = event.start.date;           
                console.log("second one "+when)
              }
              appendPre(event.summary);
              $("#time").html(when);
            }
          } else {
            appendPre('No upcoming events found.');
          }
        });
      }