const Compare = {
      ContactPreference: null,
      Make: null,
      Model: null,
      Year: null,
      Services: null,
      Colors: null
}

const Regex = {
      Symbol: /([^A-Za-z0-9 '-])/,
      Number: /([0-9])/,
      Name: /^([A-Z]).*([A-Z])*$/i,
      Email: /^([\w\d])+@([\w\d])+.([A-Z])+$/i,
      Phone: /(\d){3}-(\d){3}-(\d){4}$/,
      VIN: /^[A-HJ-NPR-Z0-9]{17}$/i
}

const Functions = {
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
            if (Functions.Blank(v)) return [ERROR.Type_Blank]
            if (!a.includes(v)) return [ERROR.Code_Invalid_Selection]
            return []
      },
      Exists: (a, v) => {
            if (Functions.Blank(v) || v.length == 0) return [ERROR.Type_Blank]
            v = JSON.parse(v)
            if (!Functions.Matches(a, v)) return [ERROR.Code_Invalid_Selections]
            return []
      },
      Join: (w, a = "and", b = "and") => {
            if (w.length == 0) return null
            if (w.length == 1) return w[0]
            if (w.length == 2) return w.join(` ${a} `)
            return words.slice(0, -1).join(", ") + `, ${b}` + w[-1]
      }
}

const Check = {
      Name: (s) => {
            let c = []
            if (Functions.Blank(s)) return [ERROR.Type_Blank]
            if (Regex.Symbol.test(s)) c.push(ERROR.Code_Symbols)
            if (Regex.Number.test(s)) c.push(ERROR.Code_Numbers)
            return c
      },
      Email: (s) => {
            let c = []
            if (Functions.Blank(s)) return [ERROR.Type_Blank]
            if (!Regex.Email.test(s)) c.push(ERROR.Code_Invalid_Email)
            return c
      },
      Phone: (s) => {
            let c = []
            if (Functions.Blank(s)) return [ERROR.Type_Blank]
            if (!Regex.Phone.test(s)) c.push(ERROR.Code_Invalid_Phone)
            return c
      },
      VIN: (s) => {
            let c = []
            if (Functions.Blank(s)) return [ERROR.Type_Blank]
            if (!Regex.VIN.test(s)) return [ERROR.Code_Invalid_VIN]
            return c
      },
      ContactPreference: (s) => {
            return Functions.Exist(Compare.ContactPreference, s)
      },
      Make: (s) => {
            return Functions.Exist(Compare.Make, s)
      },
      Model: (s) => {
            return Functions.Exist(Compare.Model, s)
      },
      Year: (s) => {
            return Functions.Exist(Compare.Year, s)
      },
      Services: (s) => {
            return Functions.Exists(Compare.Services, s)
      },
      Length: (s, l) => {
            let c = []
            if (Functions.Blank(s)) return [ERROR.Type_Blank]
            if (s.length !== Number(l)) return [ERROR.Code_Numbers]
            return c
      },
      Colors: async (s) => {
            if (Functions.Blank(s)) return [ERROR.Type_Blank]
            if (Compare.Colors === null) {
                  const response = await fetch("https://color-names.herokuapp.com/v1/")
                  let colorData = await response.json()
                  Compare.Colors = colorData.colors.map(color => color.name)
            }
            return Functions.Exist(Compare.Colors, s)
      }
}