class FormCheck {
      #inputs = {}

      //Inputs to be checked are identified with the FCII
      #FCII = ".check"
      
      //These inputs must have a "name" attribute, a "requirements" attribute (if they are to be checked),
      //an "inputLabel" attribute (used in error messages), along with the FCII identifier whether that's a class or other attribute.
      #addError = (name, errorType, errorDetails) => {
            let inputField = $(`[name='${name}']`).parents(".inputField")
            inputField.addClass("error")
            inputField.children(".errorMessage").text(Error.message(errorType, errorDetails))
      }

      //This function uses the name of an input, the type of error, and the
      //words used in creating the error message to remove an applicable error.
      //This function is used for flexibility. 
      //There will be different layouts of the HTML page and I didn't want this program to be
      //so fixed.
      #removeError = (name) => {
            $(`[name='${name}']`).parents(".inputField").removeClass("error")
      }

      //This function uses the name of an input to return the value of an input.
      //This function is also used for flexibility.
      //Ditto.
      #inputValue = (name) => {
            return $(`[name='${name}']`).val()
      }

      constructor() {}

      loadInputs(form) {
            //Pairing the input name with its requirements
            this.inputs = {}
            //Alternative to closure
            let load = (t = this) => {
                  //Inputs (that are successors of the form element) to be checked
                  form.find(t.#FCII).each(function() {
                        let name = $(this).attr("name") //Input name
                        let req = $(this).attr("requirements") //Input requirement(s)
      
                        if (req === "" || req === undefined) 
                              req = null
                        else
                              req = req.split(" ")
                        //Linking the array of requirements
                        t.#inputs[name] = req
                  })
            }
            load()
      }

      checkInputs() {
            //Links the input name to the error "codes" it received
            let errors = {}
            const T = this //Another alternative closure
            for (const [name, req] of Object.entries(this.#inputs)) {
                  if (req === null)
                        continue
                  req.forEach(function(r) {
                        let result
                        result = Require.run(r, T.#inputValue(name))

                        //No error means remove error
                        if (result.length == 0) {
                              T.#removeError(name)
                              return
                        }

                        //Error
                        if (!Object.hasOwn(errors, name)) errors[name] = [$(`[name='${name}']`).attr("inputLabel"), []]
                        result.forEach(function(res) {
                              //Adding each error "code" from requirement 
                              errors[name][1].push(res)
                        })
                  })
            }
            this.applyErrors(errors)
            //If the keys of the errors object has a length 0, 
            //all of the inputs have passed their requirements
            return [Object.keys(errors).length == 0, errors]
      }

      applyErrors(errors) {
            const T = this
            Object.keys(errors).forEach(function(name) {
                  T.#addError(name, errors[name][0], errors[name][1])
            })
      }

      //Override Mania

      overrideInputIdentifier(s) {
            this.#FCII = s;
      }

      overrideRemoveError(f) {
            this.#removeError = f
      }

      overrideAddError(f) {
            this.#addError = f
      }

      overrideInputValue(f) {
            this.#inputValue = f
      }
}