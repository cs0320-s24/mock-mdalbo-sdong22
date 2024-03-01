> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

The main logic of our project consists mostly in the REPLInput and REPLHistory files. We also have an additional file named Commands in which all the different commands that can be performed are put. This is the file for which a
developer who wishes to import their own commands can do so. All they would have to do is write the command conforming to the REPLFunction interface, and then put it into the map that gets returned with whichever name they want.

We update the history by calling the corresponding in the map returned by commands, and then using a state modifier to update the state. We have another state called isVerbose which determines whether we show commands and results or just commands.

# Design Choices

We made several key design choices. The biggest one was deciding how to deal with the seperate file for all the different commands/functions. To do this we created a function in a file named Commands and what it does is take in the necessary state variables in order to change them, and then returns a map of of the command to function.

Another design choice we made is that we decided to keep everything as a string or a 2d array of strings and numbers. This allows for history to be altered very easily. However, to put the 2d array nicely into the actual webpage, we wrote a new funtion in REPLHistory that takes a 2d array of numbers and strings and then puts them into a nice html table. In order to deal with both numbers and strings, we changed the REPLFunction interface to return string or (string or number) 2d array.

# Errors/Bugs

# Tests

We split the major end to end tests into four different categories: search, load, view, and app. The search testing file deals with all the different cases of possible searches, and returns the given value. The load and view do similar things for their respective commands. The app testing suite tests basic app functionality as well containing integration tests for when we use search, load, view, and mode. We test the functionality of mode in a seperete mode testing file, but we also test it for every other search, load, and view test where we have a copy of each test in both verbose and brief mode.

# How to

To run the code simply run npm start.
Before viewing or searching a csv, you must enter: load FILENAME
To view the loaded file you can enter: view
To search a loaded file you can enter search <column> <target>

In order to add your own function, you can alter the commands file by adding your own function that implements REPLFunction and then add it to the nameToFunction map. Once this is done, you command will be able to be accessed given the name that you specified.
One thing to note: we don't parse the command string into more than 5 different strings, so you will have a maximum of 5 arguments. If not, the last argument will apear as a bunch of arguments together.

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
