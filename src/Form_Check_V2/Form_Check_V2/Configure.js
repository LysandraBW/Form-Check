// Configuring Requirements: 
// A string is linked to a function. 
// If the input's requirement contains one of these strings, said function will be called to verify the input.
Require.add("name", Check.Name)
Require.add("email", Check.Email)
Require.add("phone", Check.Phone)
Require.add("contactPreference", Check.ContactPreference)
Require.add("vin", Check.VIN)
Require.add("make", Check.Make)
Require.add("model", Check.Model)
Require.add("year", Check.Year)
Require.add("services", Check.Services)
Require.add("length", Check.Length)

// Configuring Comparisons:
// For the inputs that must have their value compared to credible values.
// This is just so the example can work though.
Compare.ContactPreference = ["Call", "Text", "Email"]
Compare.Make = ["Make1", "Make2", "Make3"]
Compare.Model = ["Model1", "Model2", "Model3"],
Compare.Year = ["Year1", "Year2", "Year3"]
Compare.Services = ["Service1", "Service2", "Service3"]

// Configuring Constants:
// Creating constants via the object ERROR (located in Error.js)
con("Type_State")
con("Type_Blank")
con("Type_Inclusion")
con("Type_Exclusion")
con("Type_Unselected")

con("Code_Symbols")
con("Code_Numbers")
con("Code_Invalid_VIN")
con("Code_Invalid_Email")
con("Code_Invalid_Phone")
con("Code_Invalid_Selection")
con("Code_Invalid_Selections")

// Configuring Error Messages:
// I'm not sure what to say here. An error type (fundamentally a string) is attached to a function which essentially generates an error message.
Error.ConfigureErrorMessage(ERROR.Type_Inclusion, (inputLabel, keywords) => `${inputLabel} must include ${Functions.Join(keywords)}.`)
Error.ConfigureErrorMessage(ERROR.Type_Exclusion, (inputLabel, keywords) => `${inputLabel} musn't include ${Functions.Join(keywords)}.`)
Error.ConfigureErrorMessage(ERROR.Type_State, (inputLabel) => `${inputLabel} is invalid.`)
Error.ConfigureErrorMessage(ERROR.Type_Blank, (inputLabel) => `${inputLabel} is blank. Please enter input.`)
Error.ConfigureErrorMessage(ERROR.Type_Unselected, (inputLabel, keywords) => `Make sure to select ${keywords}.`)

// Configuring Error Codes:
// The functions used for the requirements return error codes so that error messages can be generated.
Error.ConfigureErrorCode(ERROR.Type_Blank, ERROR.Type_Blank)
Error.ConfigureErrorCode(ERROR.Code_Invalid_VIN, ERROR.Type_State, "VIN")
Error.ConfigureErrorCode(ERROR.Code_Symbols, ERROR.Type_Exclusion, "symbols")
Error.ConfigureErrorCode(ERROR.Code_Numbers, ERROR.Type_Exclusion, "numbers")
Error.ConfigureErrorCode(ERROR.Code_Invalid_Email, ERROR.Type_State, "email")
Error.ConfigureErrorCode(ERROR.Code_Invalid_Phone, ERROR.Type_State, "phone")
Error.ConfigureErrorCode(ERROR.Code_Invalid_Selection, ERROR.Type_Unselected, "a valid option")
Error.ConfigureErrorCode(ERROR.Code_Invalid_Selections, ERROR.Type_Unselected, "only valid options")

// Configuring Form Check:
// Forms may be different, so you can work the ways of O' Form Check to suit your form.

const FC = new FormCheck()
FC.FCIdentifier = ".check"
FC.getName = (element) => element.getAttribute("name")
FC.getData = (name) => $(`[name=${name}]`).val()
FC.getRequirements = (element) => element.getAttribute("requirements")
FC.getLabel = (name) => $(`[name=${name}]`).attr("inputLabel")
FC.delError = (name) => $(`[name='${name}']`).parents(".inputField").removeClass("error")
FC.addError = (name, label, error) => {
      let inputField = $(`[name='${name}']`).parents(".inputField")
      inputField.addClass("error")
      inputField.children(".errorMessage").text(Error.ErrorMessage(label, error))
}