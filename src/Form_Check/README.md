Form Check
Version 1

Imagine that you wanted to create an input where a user enters in their email. 
The user enters in their email and presses submit.
You are now to validate that input.
You could set the input's type to "email", and have the HTML Overlords work their magic.
However, to my knowledge, you wouldn't be able to manipulate or style the error message.
*sad trumpet noises*

Imagine that you wanted to create an input where a user enters in a password.
The user enters in their password and presses submit.
You are now to validate that input.
There's not a type you can set this input that can verify said input for you.
You'll have to go in there and do some digging. This input needs to be at least
8 characters long, have a symbol, and have a number.
*sad trumpet noises*

This isn't an impossible thing to implement, but now imagine this.

You have several inputs on your page that you need to verify. These functions aren't as
simple as a phone number or a name, or maybe you'd prefer your own error messages and error styling.

What can you possibly do?!

Introducing Form Check (Version 1)
  -Dependencies: jQuery
  
This was the first version before I created a new set of inputs and realized that
it was too restrictive/limiting. As aforementioned, it uses jQuery. This isn't bad,
but I'd prefer if it didn't have any dependencies (fixed in later version).

I'm going to explain the process of checking the form:

1. Loading the Inputs: loadInputs(form)

We must load the inputs to be checked first. 
Now had did Lysandra (2 weeks ago) implement this?

Well you pass in a jQuery element that is an ancestor of the inputs you want to be checked.
	a. You want all of the inputs on the page to be checked? Pass in $("body") as the form
	b. You want the inputs of a certain ancestor to be checked? Pass in a query matching that ancestor
		a. For example, I had previously sectioned off my form into <form-group> elements. The form group that was
			currently showing had a class of "display" (or something, I can't remember). Since I only
			wanted the inputs of the form group that was currently showing, I would pass in
			$("form-group.display") as the form.

Writing this is really hard and my brain is tired and I don't feeel like doing this!

You can load inputs and generate error messages. Furthermore, you can also implement certain functions
to make this work for your environment. For example, it's hard to generalize adding an error to an input
because how would I know what future me wants to do? So you can just override it to make it work with whatever.

You can also override the function that removes errors from an input. You can also set the identifiedckdn (currently sleeping).


<input autocomplete="off" class="check input" name="fName" inputLabel="First name" requirements="name" type="text">



