class Error {
      // k: Error Type
      // v: Error Function: This is used to generate error messages for said type.
      static ErrorMessageConfiguration = {}

      //k: Code Name
      //v[0]: Error Type
      //v[1]: External Information (Keywords): Used in error message generation.   
      static ErrorCodesConfiguration = {}
      
      constructor() {}
      
      static ConfigureErrorMessage(errorType, errorFunction) {
            Error.ErrorMessageConfiguration[errorType] = errorFunction
      }

      static ConfigureErrorCode(codeName, errorType, keywords = null) {
            Error.ErrorCodesConfiguration[codeName] = [errorType, keywords]
      }

      static ErrorMessage(inputLabel, errorCodes) {
            let errorMessage = ""
            let errors = {}

            errorCodes.forEach((code) => {
                  const [errorType, keywords] = Error.ErrorCodesConfiguration[code]

                  //Grouping the error codes by its type and storing its keyword(s)
                  if (!Object.hasOwn(errors, errorType))
                        errors[errorType] = []
                  errors[errorType].push(keywords)
            })

            for (const [errorType, keywords] of Object.entries(errors))
                  errorMessage += Error.ErrorMessageConfiguration[errorType](inputLabel, keywords)
            return errorMessage
      }
}

const ERROR = {}
function con(key, value = key) {
      ERROR[key] = value
}