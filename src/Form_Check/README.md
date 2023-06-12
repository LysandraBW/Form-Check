# Form Check<br>
## Version 1<br>

Imagine that you wanted to create an input where a user enters in their email.<br>
The user enters in their email and presses submit.<br>
You are now to validate that input.<br>
You could set the input's type to "email", and have the HTML Overlords work their magic.
However, to my knowledge, you wouldn't be able to manipulate or style the error message.<br>

Imagine that you wanted to create an input where a user enters in a password.<br>
The user enters in their password and presses submit.<br>
You are now to validate that input.<br>
There's not a type you can set this input that can verify said input for you.<br>
You'll have to go in there and do some digging. This input needs to be at least
8 characters long, have a symbol, and have a number.<br>

This isn't an impossible thing to implement, but now imagine this.<br>

You have several inputs on your page that you need to verify.<br>These functions aren't as
simple as a phone number or a name, or maybe you'd prefer your own error messages and error styling.<br>

What can you possibly do?<br>
# Introducing Form Check (Version 1)<br>
  ### Dependencies: jQuery<br>
  
## 1 Loading Inputs <br>
We must first load the inputs to be checked via an identifier. By default, elements with a class of "check" (if I can remember correctly) will be checked. Furthermore, you must pass in a jQuery element that is an ancestor to the inputs you want to check. This is so you can target specific elements instead of every input on the entire page. You can set the identifier that is used to find the inputs (really elements) that are to be checked via the overrideInputIdentifier(s) function, where s is a query that can be used to find elements.

## 2 Checking Inputs <br>
To check the inputs, we need to get their value. There is a default way of getting an input's value, but this may not work under every context, so you can set the function that is used to find the input's value via the overrideInputValue(f) function, where f is a function that takes in a name and returns the value of the element with said name.

## 3 Errors <br>
Inputs that fail their requirements are said to have errors. To show this to the user, there is a type of styling elements with errors have (usually something red). There is a default way to add this error to an input and remove it from the input (given the name), but this only works under a specific structure. Therefore, you can also set these via the addError(name, errorType, errorDetails) and removeError(name) functions. I have not gotten into the error aspect of Form Check yet, so I won't be explaining those parameters yet.

## 4 Requirements <br>
```
<input class="check" name="fName" requirements="name">
```
This input has a class of "check", a name of "fName", and a requirements of "name".
The name attribute is used for a plethora of reasons, one of them being so that we can access this input's
value after we have loaded it. 
The requirements attribute is a list of strings (without the brackets and data type), and these words refer to actual functions. If you look in load.js, you'll see the line Require.add("name", CHECK.Name). What this line does is set a property of an object with the key of "name" and a value of CHECK.Name. CHECK.Name is a function (look in checker.js for more). 
Then, when we check our inputs, we know what functions we need to run on the input's value.
If you want multiple requirements, you can do that, but just add a space in between the requirement names.
How it's currently set up, you may have to be repetitive with the functions you use to check an input because I don't have a way to incorporate arguments (other than the input's value) into the requirement function.
For example, if you wanted a requirement called "length" that tests if the input is a certain length, but you also wanted to reuse this requirement throughout your page and with different lengths, you would just have to create multiple functions like lengthFive, lengthTwo, lengthFourtyFive, and so on. This is because I didn't have a way of evaluating parameters in this version. Ideally, you would be able to do something like lengths(5) in your requirements attribute, and it would run the function for the requirement "lengths" and pass in the value 5 (along with the value of the input).
Fortunately, this is fixed in version 2.

## 5 Error Handling <br>
The input fails a requirement, but how did it fail the requirement? Did it have too many letters? Did it not have a certain symbol? Was there no input to check? This is what error codes are used for. Error codes (in the context of Form Check) are a convenient way for me to bundle information about what went wrong in a requirement. An error code is really a string that is used to refer to a type of error and some keywords in said error.

For example:<br>
```
Error.configureCode("Numbers", "Inclusion", "numbers")<br>
```

This error code that goes by the name of "Numbers" tells us that it's of type "Inclusion" and it has a keyword of "numbers". <br>

"Inclusion" is an error type. I've said this a couple times now without explaining what it actually is. Basically this has to do with error message. This is best explained with an example.<br>

The error is that an input has a symbol (and it shouldn't).<br>

This is an error which can be categorized as an "inclusion" error (something I made up). These errors have messages of a certain format, for example "Name musn't include symbols" or "Password musn't contain first name".<br>

If "Name" and "Password" can be found through the input's label, and "symbols" and "name" are a keyword, we can make a function that reproduces error messages like those:<br>
```
function inclusionErrorMessage(inputLabel, keyword) {<br>
	return `${inputLabel} musn't include ${keyword}.`<br>
}
```
<br>

So now we have a type of error ("inclusion"), and a general way errors of that type should be formatted. What I've done is attach the two together. So any error code of type "inclusion" will have its error messages formatted in a certain way.<br>

This is done by the Error.configureType(errorTypeName, errorTypeErrorMessageFunction). As explained, errorTypeName is the name (something you can just create, name it anything you'd like) and errorTypeErrorMessageFunction (I know that it's wordy but I want this to make sense to my future self) is the function used to generate error message for that error type.<br>

Okay so now we know what "Inclusion" means in Error.configureCode("Numbers", "Inclusion", "numbers"). What is "numbers"? "numbers" is the keyword that is used in the error message creation.<br>

So if a function were to send the error code "Numbers", you would generate an error message like: "<inputLabel> musn't include numbers".<br>

If you go into checker.js, you'll see that the functions do return error codes. These error codes are then processed to make the error message, but I won't get into that.<br>

If you have multiple requirements that return overlapping error codes, you will get duplicate error messages shown. This is easily solved and is updated in version 3 (when I realized this could happen).<br>

To generate an error message given an array of error codes and the input's label (I will explain the importance of the label next), you can use the static message function of the Error class. You simply pass into the input's label and its error codes and it returns an error message which essentially combines all the error codes into one.<br>

You don't have to worry about generating the label and error codes to get an error message, these are provided to you already when you call the addError(...) function. Refer to the code for more.<br>

Why not use the input's name? What is the importance of a label?<br>

The name could be something loaded in from the back-end, and it could have a really odd look. For example, if your input's name was customer_cool_nameFIRST, you probably wouldn't want your input to be referred to as customer_cool_nameFIRST in the error message (or the literal label for the element). This is why I use a label attribute. The label attribute can be seen as something to communicate to the user what the input is meant to be. The label attribute is typically something simple like "First name" or "Email address". Keep in mind that this input label is used directly in the error message, so it should have the proper capitialization to match what's grammatically correct.<br>

This feature was added in a bit of a rush, so there's no way to override the way to get an input's label from its name, I hardcode that in. This is version 1 though, so expect the other versions to be much better equipped.<br>

As a short summary, these are the attributes an input will typically have:
	"requirements"
	"label"
	"name"

And for them to be checked, they need to have the class "check" (unless you set the identifier to something else).

This version is a good first attempt, but it could be a lot better. But this is a surprise! You must read the other versions to see what I improved on!
