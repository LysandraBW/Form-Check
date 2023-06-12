# Form Check <br>
## Version 3 <br>

### What's Changed <br>
Same old, same old. Slightly changing the code to make it look better to me. For example, I prefer inputData over inputValue even though inputValue makes more sense. It's just something about the roundness of inputData that makes me happy inside.


**Errors**
The structuring of the Error class hasn't changed. You configure error messages and error codes the same. However, using objects as parameters is more commonplace because it's easier to update. I was watching a video on Webpack and I saw that the person had inserted the actual input's data into the error message, and I was thinking how it would be cool if I could do that (but I couldn't do that in the prior version). Having objects means I don't have to explicitly state a variable, I could just reference it in the error function as if it was alwwways there!

Before:<br>
```
(inputLabel, keywords) => `${inputLabel} must include ${Functions.Join(keywords)}.`

```

After:<br>
```
({inputLabel, keywords}) => `${inputLabel} must include ${Functions.Join(keywords)}.`
```

With this new way (with objects instead of clearly defined), I won't have to define variables that I don't necessarily need in an errorTypeMessageFunction (just so I'm clear).
For example, with this line<br>
```
Error.ConfigureErrorMessage(ERROR.Type_Unselected, (inputLabel, keywords) => `Make sure to select ${keywords}.`)
```
"inputLabel" would go unused, and it would hurt my soul that it was there with no purpose. Fortunately, I can now do this<br>
```
Error.ConfigureErrorMessage(ERROR.Type_Unselected, ({keywords}) => `Make sure to select ${keywords}.`)
```

The usage of the objects can make the code slightly harder to understand and keep up with, so I hope it's worth it. I think I just need to get use to it.<br>

Duplicate error codes will no longer generate duplicate error messages now.<br>

There's some slight changing in the names, for example con(...) => link(...).<br>

**jQuery**
Other than implementing the custom input's functionality, jQuery is no longer needed! I appreciate jQuery, but I wanted to make this more accessible. I hope I don't have a random line of jQuery hiding somewhere.<br>

**Async Requirement Functions**
What if you needed to outsource to check the validity of an input. Well you'd probably need to use await/async/then and so and so forth right. Previously, attempting to throw in an async function would break the code because it wasn't equipped to handle that. I have now made it so that you can also use async functions for the requirement. Unfortunately, I don't really test this because I'm not sure how, so there could be a bad bug.<br>

I have an example shown for the "colors" input. The Check.Colors function fetches data from a site; this data is basically an array of objects representing colors. I filter that array into an array of color names (like your "Red" and "Periwinkle"). The given input's data is then checked to see if it exists in said array.
If it does, good. If it doesn't, bad.<br>

The only downside is that (in my knowledge) it still runs from A->Z, it doesn't jump around or run in parallel, because that would just not work for me or what I needed. As the array containing the color objects has a length of 30,000+, it does take time for the fetch to actually happen (this may be my slightly worse internet speed talking). Fortunately, once the data has loaded, I make it so that we don't have to load it again, which does save transaction time.<br>

Since the requirement functions can now be async, the check(...) function is also async, so you'll have to figure that out. It's not that bad.<br>

**Ending Note**
There may be bugs in my code, I am sorry if there is, or if something slipped my eye. It's 11:40 PM and I have been typing all day. My eyes are dry, my head is slowing down, and I yearn for sleep.
