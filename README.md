# README #

This README documents whatever steps are necessary to get the application up and running.

### What is this repository for? ###

* ClubSpark Football API.
* 1.0.0

### How do I get set up? ###

* Assumes prior installation of "node.js" and "npm" and local TCP/IP ports 3000/3001 are available.
* Install necessary packages by running "npm install" on the command-line in both the client and server directories of this repository.
* Run the server by switching to the server directory on a command-line and supplying the command: "node ./index.js"
* A database will be created and data inserted from the supplied XLS spreadsheet the first time the server is run.
* Run server Jest-based tests in the server directory via the command "npm test". Please ensure the server is NOT running before commencing this test script.
* Run the client on a command-line in the client directory using the command: "npm start"
* Page will open in your default browser.
* Select a team in the "Team Listings Page" via the team name link to edit that team.
* In the "Team Details Page" any of "Name", "Country" and "Eliminated" can be modified and saved to the server using the "Save" button and selecting "Yes" on the "Confirm Save Changes" confirmation prompt. 
* The "Country" select option is searchable.
* Saving will return you to the "Team Listings Page" where the relevant team record will be noted to have been updated.
* Selecting "Back" in the "Team Details Page" will return you to the "Team Listings Page" and discard any team data changes.

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* R.Bellamy

