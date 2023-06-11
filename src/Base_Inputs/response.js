$(window).on("load", function() {
      //Segment Button Clicked
      $("button.segment").on("click", function(event) {
            event.preventDefault()

            $(this).parent().children().each(function() {
                  if ($(this).hasClass("selected") )
                        $(this).removeClass("selected")

            })
            $(this).addClass("selected")
            

            /*
            (Not dealing with this aspect here)
            $(this).parent().next().val($(this).attr("value"))
            */
      })

      //Checkbox Item Clicked
      $("button.checkbox-item").on("click", function(event) {
            event.preventDefault()
            $(this).toggleClass("selected")
            /*
            (Not dealing with this aspect here)
            let input = $(this).parent().next()
            let checkboxValue = $(this).attr("value")
            let inputValue = input.attr("value")
            if (inputValue === "" || inputValue === undefined) {
                  input.val("[]")
                  inputValue = input.attr("value")
            }

            let inputValueJSON = JSON.parse(inputValue)
            if (inputValueJSON.includes(checkboxValue))
                  inputValueJSON.splice(inputValueJSON.indexOf(checkboxValue), 1)
            else
                  inputValueJSON.push(checkboxValue)
            input.val(JSON.stringify(inputValueJSON))
            */
      })

})