ERR = {}

class Error {
      //The error's type describes the type of error (mind blown). 
      //For example, an error type of "inclusion" could mean that the errorneous input
      //included shabby characters.
      //The function connected to an error's type defines a way of generating an error
      //message for the error of said type.
      //k: Error Type
      //v: Error Function
      static TypeConfiguration = {}

      //t: Error Type
      //m: Error Function (used in error message creation)
      static configureType(t, f) {
            Error.TypeConfiguration[t] = f
      }

      //The codes object stores error codes which are used to
      //refer to both an error type and any keywords needed to generate
      //the error message.
      static Codes = {}

      //c: Code Name
      //t: Error Type
      //e: External Information (relating to error msg creation)
      static configureCode(c, t, e = null) {
            Error.Codes[c] = [t, e]
      }

      //Constants can make one's job easier
      static const(k, v = k) {
            ERR[k] = v
      }

      //Given an input's label (like "first name" or "email address") and the errors of an input,
      //you get an error message. How the error message is created is determined by its method.
      //l: Input's Label
      //e: Input's Errors
      static message(l, e) {
            let m = ""
            let errors = {}

            e.forEach(function(err) {
                  let type = Error.Codes[err][0]
                  let ext = Error.Codes[err][1]

                  if (!Object.hasOwn(errors, type)) errors[type] = []
                  errors[type].push(ext)
            })

            for (const [k, v] of Object.entries(errors))
                  m += Error.TypeConfiguration[k](l, v)

            return m
      }
}