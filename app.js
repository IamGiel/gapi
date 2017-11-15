// Enter an API key from the Google API Console:
// https://console.developers.google.com/apis/credentials
var apiKey = 'AIzaSyCcz_rY6GhH9tTnejrKQgbxXu7y8CM2Fjg';
// Enter the API Discovery Docs that describes the APIs you want to
// access. In this example, we are accessing the People API, so we load
// Discovery Doc found here: https://developers.google.com/people/api/rest/
var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script.
var clientId = '908655633390-bipca08v5p9tkot7cjul1pgtcbd4ts10.apps.googleusercontent.com';
// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
//var scopes = 'profile';
var scopes = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/tasks.readonly';
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}
function initClient() {
  gapi.client.init({
      apiKey: apiKey,
      discoveryDocs: discoveryDocs,
      clientId: clientId,
      scope: scopes
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    $("#myModal").modal("toggle");
   // makeApiCall();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    $("#myModal").modal("toggle");
  }
}
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

// // Load the API and make an API call.  Display the results on the screen.
// function makeApiCall() {
//   gapi.client.people.people.get({
//     'resourceName': 'people/me',
//     'requestMask.includeField': 'person.names'
//   }).then(function(resp) {
//     var p = document.createElement('p');
//     var name = resp.result.names[0].givenName;
//     p.appendChild(document.createTextNode('Hello, '+name+'!'));
//     document.getElementById('content').appendChild(p);
//   }); 
// }

//********begin tasks section********
//sample function from documentation happens on a click:

/*
$("#apiButton").on("click", function() {
  authenticate();  //I realized I was calling multiple parts of the same 
 });                //function all at once. So as of task16 I'm just calling
                  // the first one. When that works I'll try calling the 2nd sample function.

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/tasks.readonly"})
        .then(function() {
          console.log("Sign-in successful");
        }), function(error) {
          console.error("Error signing in", error);
        };
  }
function loadClient() {
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/tasks/v1/rest")
      .then(function() {
        console.log("GAPI client loaded for API");
      }, function(error) {
        console.error("Error loading GAPI client for API");
      });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  console.log("gapi.client.tasks.tasklists: ", gapi.client.tasks.tasklists);
  return gapi.client.tasks.tasklists.list({
    "maxResults": "100",
    "pageToken": "1"
  })
      .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      }, function(error) {
        console.error("Execute error", error);
      });
}
  // gapi.load("client:auth2", function() {
  //   gapi.auth2.init({client_id: clientId});
  // });



/* --commented back out to just test the first part of this.
  function listTaskLists() {
          var optionalArgs = {
            maxResults: 10
          };
          var response = Tasks.Tasklists.list(optionalArgs);
          var taskLists = response.items;
          if (taskLists && taskLists.length > 0) {
            console.log('Task lists:');
            for (var i = 0; i < taskLists.length; i++) {
              var taskList = taskLists[i];
              console.log('%s (%s)', taskList.title, taskList.id);
              
            }
          } else {
            console.log('No task lists found.');

          }
        }

      }
*/
	

