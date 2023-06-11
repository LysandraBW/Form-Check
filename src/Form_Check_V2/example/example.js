

$(window).on("load", function() {
      //Segment Button Clicked
      $(".segmentButton").on("click", function(event) {
            event.preventDefault()

            let segmentButtons = $(this).parent().children()
            
            for (let i = 0; i < segmentButtons.length; i++) {
                  let segmentButton = segmentButtons.eq(i)
                  if (segmentButton.hasClass("selected"))
                        segmentButton.removeClass("selected")
            }

            $(this).addClass("selected")
            $(this).parent().next().val($(this).attr("value"))
      })

      //Checkbox Item Clicked
      $(".checkboxItem").on("click", function(event) {
            event.preventDefault()

            let checkboxValue = $(this).attr("value")
            let input = $(this).parent().next()
            let inputValue = input.attr("value")

            if (inputValue === "" || inputValue === undefined) {
                  input.val("[]")
                  inputValue = input.attr("value")
            }

            $(this).toggleClass("selected")

            let inputValueJSON = JSON.parse(inputValue)
            if (inputValueJSON.includes(checkboxValue))
                  inputValueJSON.splice(inputValueJSON.indexOf(checkboxValue), 1)
            else
                  inputValueJSON.push(checkboxValue)
            input.val(JSON.stringify(inputValueJSON))
      })

      $("button#submit").on("click", function(event) {
            event.preventDefault()
            FC.DOMLoad()
            FC.check({handleError: true})
      })
})