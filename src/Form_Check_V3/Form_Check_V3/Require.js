class Require {
      static requirements = {}

      constructor() {}

      static add(reqName, reqFunction) {
            this.requirements[reqName] = reqFunction
      }

      static async run(reqName, args, destructure = false) {
            if (destructure)
                  return await this.requirements[reqName](...args)
            return await this.requirements[reqName](args)
      } 
}