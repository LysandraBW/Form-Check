//I placed the functions used for the requirements (see Require.js and/or Checker.js) here.
//This is how I configured it, but all that is needed is that the requirement functions exist.

const REGEX = {
      Symbol: /([^A-Za-z0-9 '-])/,
      Number: /([0-9])/,
      Name: /^([A-Z]).*([A-Z])*$/i,
      Email: /^([\w\d])+@([\w\d])+.([A-Z])+$/i,
      Phone: /(\d){3}-(\d){3}-(\d){4}$/,
      VIN: /^[A-HJ-NPR-Z0-9]{17}$/i
}

const FUNCT = {
      Blank: (s) => {
            return s === undefined || s === null || s.trim().length <= 0
      },
      Match: (a, s) => {
            return a.includes(s)
      },
      Matches: (a, s) => {
            if (s.length == 0) return false
            for (let i = 0; i < s.length; i++)
                  if (!a.includes(s[i]))
                        return false
            return true
      },
      Exist: (a, v) => {
            if (FUNCT.Blank(v)) return [ERR.Blank]
            if (!a.includes(v)) return [ERR.Invalid_Selection]
            return []
      },
      Exists: (a, v) => {
            if (FUNCT.Blank(v) || v.length == 0) return [ERR.Blank]
            v = JSON.parse(v)
            if (!FUNCT.Matches(a, v)) return [ERR.Invalid_Selections]
            return []
      },
      Join: (w, a = "and", b = "and") => {
            if (w.length == 0) return null
            if (w.length == 1) return w[0]
            if (w.length == 2) return w.join(` ${a} `)
            return words.slice(0, -1).join(", ") + `, ${BeforeUnloadEvent}` + w[-1]
      }
}

const COMPA = {
      ContactPreference: 
            ["Call", "Text", "Email"],
      Make: 
            ["Make1", "Make2", "Make3"],
      Model: 
            ["Model1", "Model2", "Model3"],
      Year: 
            ["Year1", "Year2", "Year3"],
      Services: 
            ["Service1", "Service2", "Service3"]
}

const CHECK = {
      Name: (s) => {
            c = []
            if (FUNCT.Blank(s)) return [ERR.Blank]
            if (REGEX.Symbol.test(s)) c.push(ERR.Symbols)
            if (REGEX.Number.test(s)) c.push(ERR.Numbers)
            return c
      },
      Email: (s) => {
            c = []
            if (FUNCT.Blank(s)) return [ERR.Blank]
            if (!REGEX.Email.test(s)) c.push(ERR.Invalid_Email)
            return c
      },
      Phone: (s) => {
            c = []
            if (FUNCT.Blank(s)) return [ERR.Blank]
            if (!REGEX.Phone.test(s)) c.push(ERR.Invalid_Phone)
            return c
      },
      VIN: (s) => {
            c = []
            if (FUNCT.Blank(s)) return [ERR.Blank]
            if (!REGEX.VIN.test(s)) return [ERR.Invalid_VIN]
            return c
      },
      ContactPreference: (s) => {
            return FUNCT.Exist(COMPA.ContactPreference, s)
      },
      Make: (s) => {
            return FUNCT.Exist(COMPA.Make, s)
      },
      Model: (s) => {
            return FUNCT.Exist(COMPA.Model, s)
      },
      Year: (s) => {
            return FUNCT.Exist(COMPA.Year, s)
      },
      Services: (s) => {
            return FUNCT.Exist(COMPA.Services, s)
      }
}
