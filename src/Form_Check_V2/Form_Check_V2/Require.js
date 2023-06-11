class Require {
      static requirements = {}

      constructor() {}

      static add(reqName, fnc) {
            this.requirements[reqName] = fnc
      }

      static run(reqName, arg, dest = false) {
            if (dest)
                  return this.requirements[reqName](...arg)
            return this.requirements[reqName](arg)
      } 
}