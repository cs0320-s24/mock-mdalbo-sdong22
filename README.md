> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

Project Name: Mock
Team Members: Manuel Dal Bo, Simeon Dong
Total Estimated Time:
Repo: https://github.com/cs0320-s24/mock-mdalbo-sdong22

The goal of this project was to make a mock front end for a REPL which takes user inputted commands and returns the result back to the user
interface after execution. There are several built in commands such as mode, load, view, and search. The mode command allows users to toggle
between brief and verbose outputs. Brief output simply returns the result of a command while verbose mode returns both the user's inputted
command and the result.

The main logic of our project is contained mostly in the REPLInput and REPLHistory files. REPLInput handles user input and handles functionality
for when the submit button is pressed. REPLHistory provides the logic for rendering the correct results to the user interface. We also have an
additional file named Commands in which the functionality for all possible commands that can be performed are defined. Commands returns a map of
command name to a REPLFunction function. If a developer wanted to add their own commands, they can implement the command while conforming to
the REPLFunction interface and then add the desired command name and its corresponding function to the map which will be outputted.

We update the history state by calling the corresponding function in the map returned by commands, and then use a state modifier to update the
state to the returned output. We have another state called isVerbose which determines brief or verbose mode. There is also a currCSV state
to ensure that only one CSV file is ever loaded at a time.

# Design Choices

We made several key design choices.

The biggest one was implementing a currying strategy in order to change REPLInput states from a different file containing all the different
commands/functions. To do this, we created a function in a file named Commands which take in the necessary state variables in order to change them, and then returns a map of of the command to function. By returning a map of all the commands, it allows for REPLInput to simply search the map
for a user's inputted command and if it exists, the command's returned result is added to history and rendered.

Another design choice we made is that we decided to define history as an array of tuples of string or string number arrays. In turn, all of our functions deal with strings or a 2d array of strings and numbers. This allows for history to be altered very easily. However, to put the 2d array
nicely into the actual webpage, we wrote a helper funtion in REPLHistory that takes a 2d array of numbers and strings and then converts them into a
nice html table. In order to deal with both numbers and strings, we changed the REPLFunction interface to return string or (string or number) 2d
array.

# Errors/Bugs

To our knowledge, there are no errors/bugs currently present. We encountered several erros when attempting to aggregate commands into a single file
without using currying. Furthermore, we found an error when mode was pressed and an empty result would be recorded in history. These errors have
since been resolved.

# Tests

We split the major end to end tests into five different categories: mode, search, load, view, and app. The search testing file deals with all the different cases of possible searches, and returns the given value. The load, mode, and view files similarly deal with different cases for their
respective commands. The app testing suite tests basic app functionality as well containing integration tests for when we use search, load, view,
and mode. We test the functionality of mode in a seperete mode testing file, but we also test it within every other search, load, and view test
where we test for both verbose and brief mode.

# How to

To run the code simply run npm start.
Before viewing or searching a csv, you must enter: load FILENAME
To view the loaded file you can enter: view
To search a loaded file you can enter search <column> <target>
To toggle the mode between verbose and brief you can enter: mode

In order to add your own function, you can alter the commands file by adding your own function that implements REPLFunction and then add it to the
nameToFunction map. Once this is done, you command will be able to be accessed given the name that you specified. One thing to note: we don't parse
the command string into more than 5 different strings, so you will have a maximum of 5 arguments. If not, the last argument will apear as a bunch
of arguments together.

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
