//REQUIRE
//Linking the requirement name (LH-arg) to the given function (RH-arg)
Require.add("vin", CHECK.VIN)
Require.add("name", CHECK.Name)
Require.add("year", CHECK.Year)
Require.add("make", CHECK.Make)
Require.add("email", CHECK.Email)
Require.add("phone", CHECK.Phone)
Require.add("model", CHECK.Model)
Require.add("services", CHECK.Services)
Require.add("contactPreference", CHECK.ContactPreference)

//ERROR
//Creating Constants
Error.const("State")
Error.const("Blank")
Error.const("Symbols")
Error.const("Numbers")
Error.const("Inclusion")
Error.const("Exclusion")
Error.const("Unselected")
Error.const("Invalid_VIN")
Error.const("Invalid_Email")
Error.const("Invalid_Phone")
Error.const("Invalid_Selection")
Error.const("Invalid_Selections")

//Configuring the Error Types
Error.configureType(ERR.Inclusion, (inputLabel, e) => {
      return `${inputLabel} must include ${FUNCT.Join(e)}.`
})

Error.configureType(ERR.Exclusion, (inputLabel, e) => {
      return `${inputLabel} musn't include ${FUNCT.Join(e)}.`
})

Error.configureType(ERR.State, (inputLabel) => {
      return `${inputLabel} is invalid.`
})

Error.configureType(ERR.Blank, (inputLabel) => {
      return `${inputLabel} is blank. Please enter input.`
})

Error.configureType(ERR.Unselected, (inputLabel, word) => {
      return `Make sure to select ${word}.`
})

//Configuring the Error Codes
Error.configureCode(ERR.Blank, ERR.Blank)
Error.configureCode(ERR.Invalid_VIN, ERR.State, "VIN")
Error.configureCode(ERR.Symbols, ERR.Exclusion, "symbols")
Error.configureCode(ERR.Numbers, ERR.Exclusion, "numbers")
Error.configureCode(ERR.Invalid_Email, ERR.State, "email")
Error.configureCode(ERR.Invalid_Phone, ERR.State, "phone")
Error.configureCode(ERR.Invalid_Selection, ERR.Unselected, "a valid option")
Error.configureCode(ERR.Invalid_Selections, ERR.Unselected, "only valid options")