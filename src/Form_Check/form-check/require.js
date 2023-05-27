class Require {
      static requirements = {}
      constructor() {}

      //k: The name of the requirement
      //v: The function used to validate the requirement
      static add(k, v) {
            this.requirements[k] = v
      }

      static run(k, value) {
            //Access the requirement and pass in the value
            return this.requirements[k](value)
      } 
}