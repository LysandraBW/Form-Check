# Form Check <br>
## Version 2 <br>

### What's Changed <br>
Not much has changed, except I've tried my best to make the code look a lot better and readable. If I am being honest, I was trying to make my code look like the really smart people, so I made it very obscure and hard to understand by using one letter parameter identifiers and such. Fortunately, when I realized I didn't understand what my own code was doing, I knew I had made a mistake, and I worked on making the code more readable. The only exception is in the Checker.js file because who's going to stop me? Exactly! In reality, those functions weren't ** that ** important to make me want to do anything further, so I didn't.

** Adapting the Form Check **
Previously I had mentioned that there were default functions in the FormCheck class, and they would try and execute their mission. However, this would probably cause errors because not all HTML pages are the same, and not all elements are the same, and neither is the CSS for them.

So what do I do? I don't implement anything! There's still an identifier used to retrieve certain inputs/elements, a function to get the value/data of an input, ditto with the name of an input, but I do not implement them at all in the FormCheck class. You must configure those. It's for the best. Anyway, these are the functions/variables you can rewrite<br>

```
      #FCIdentifier = null<br>
      #getData = (name) => {}<br>
      #getName = (node) => {}<br>
      #getRequirements = (node) => {}<br>
      #getLabel = (name) => {}<br>
      #addError = (name, label, error) => {}<br>
      #delError = (name) => {}<br>
```

and you can rewrite them via these functions:<br>

```
      set FCIdentifier(identifier) {<br>
            this.#FCIdentifier = identifier<br>
      }<br>

      set getData(f) {<br>
            this.#getData = f<br>
      }<br>

      set getName(f) {<br>
            this.#getName = f<br>
      }<br>

      set getRequirements(f) {<br>
            this.#getRequirements = f<br>
      }<br>

      set getLabel(f) {<br>
            this.#getLabel = f<br>
      }<br>

      set addError(f) {<br>
            this.#addError = f<br>
      }<br>

      set delError(f) {<br>
            this.#delError = f<br>
      }<br>
```

** Loading the Inputs **
Previously on FormCheck, you'd pass in an element (of jQuery type), and we'd search for the inputs (that match the identifier) in said element. The same thing is still done here, except you don't have to pass in an element, jQuery is not used (I'm pretty sure jQuery is not used at all in the FormCheck system now), and you have other options too!<br>

Basically loadInputs(form) turned into DOMLoad(p = {}). p is an object with properties (maybe, maybe not). If p has a property with a key of "parent" (and it's not undefined), we search for the elements in the value corresponding to "parent". If it's undefined, we search for the elements in the document, it's essentially a basic document.querySelector(...) at that point.<br>

If<br>
```
{
	...
	"parent": undefined
}
```
we search for the inputs in the document element.<br>

If<br>
```
{
	...
	"parent": <insert_random_node>
}
```
we search for the inputs in the the random node.<br>

Now you can either supply the inputs for us to check or have us search for the inputs. This is akin to handing the cashier the exact amount for the cost so that they don't have to give you change and handing them a $20 and blah dee blah.<br>

If<br>
```
{
	...
	"inputs": undefined
}
```
we search for the inputs in the given parent (either it's the document or it's the one you provided).<br>

If<br>
```
{
	...
	"inputs": <insert_list_of_nodes>
}
```
we just use the given inputs.<br>

Keep in mind that I'm no longer using jQuery, so I am handling regular DOM elements here.<br>

Now that we have the inputs to evaluate, we go through each of them, and store its name and its requirements. Again you must implement the function that returns the name attribute of an element and the requirements attribute of an element.<br>

If you have an object where the keys are names of inputs and the values are the corresponding requirements (the requirements must be properly formatted, perhaps use the evaluateRequirement(...) function if you're ever in need), you can pass this object in, and consider the inputs loaded! Because that's all that loading the inputs really do. You're just attaching a name with requirements.

** Parameters/Arguments in the Requirement Function **
A problem I had previously remarked was the issue of not being able to pass in arguments to the requirement functions. For example, lets say you had a function length(string, number) which returned true if the string's length was the same as the number and false if not. Getting the string was easy enough because I send the value/data of the input as an argument to all of the requirement functions, but I hadn't set up a way to pass in optional parameters, but now I have!<br>

To keep it short and simple, lets say you wanted the input with a name of "password" to have a length of 20 characters. <br>
You could create a very specific requirement function that returns true if the given string has a length of 20.<br>
```
function lengthTwenty(inputData) {
	return inputData.length === 20
}
...
Require.add("lengthTwenty", lengthTwenty)
...
<input name="password" requirements="lengthTwenty">
```

Or you could create a reusable requirement function that returns true if the given string has a length of n.<br>
```
function length(inputData, len) {
	return inputData.length === len
}
...
Require.add("length", length)
...
<input name="password" requirements="length(20)">
```
The word "length" in "length(20)" refers to the name of the requirement, not the literal requirement function.<br>

And because it's reusable you could also ** reuse ** the function with different arguments/parameters.<br>
```
<input name="phone" requirements="phone length(13)">
```

The only thing to note here is that you cannot have extra spaces in the requirements attributes. Spaces are only to be used to delineate different requirement-function-names. This means that something like this would be ** WRONG AND CAUSE AN ERROR **
```
<input name="fname" requirements="name length( 20 )">
```
This will cause an error because I split the return value of the requirements attribute via spaces, so what I'm sure there's a way to overcome, but it's not that big of an issue, I personally don't consider it an issue.<br>

If you want to pass in multiple parameters/arguments, use commas (with no spaces).
```
<input name="fname" requirements="name rangeLength(10,50)">
```

When creating a requirement function that takes in these parameters/arguments, keep in mind that the input's data/value is passed in first, and the arguments/parameters are passed in afterwards, in the order that they are received.<br>

** Checking Inputs **

Previously on FormCheck, checkInputs() did not take any arguments, but check(p = {}) does! Well not exactly. If you don't supply it with any information whatsoever, it will run as it did in version 1, where it goes through the names, gets the data/values, runs the requirement functions, and so on and so forth.<br>

Here's a quick summary<br>

If<br>
```
{
	...
	"handleError": true
}
```
we handle the errors (meaning we run the addError and delError functions).<br>

If<br>
```
{
	...
	"handleError": false
}
```
we do not handle the errors (meaning we do not run the addError and delError functions).<br>

If<br>
```
{
	...
	"inputRequirements": undefined
}
```
we assume that the inputs have already been loaded and that the requirements of the inputs are stored (we use what we have).<br>

If<br>
```
{
	...
	"inputRequirements": <not null>
}
```
we use the requirements you give.<br>

The same goes for the property "inputData". If you don't give a value, we just find the data/values ourselves via the getData function ** that you must set **. If you do give us an object where the key is the name and the value is the value/data of the input, we just use that.

I haven't mentioned every little aspect of this system, but I think that's okay because I can just look at the code. I also made the code so yeah B)

