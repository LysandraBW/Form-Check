class FormCheck {
      #inputRequirements = {}

      #FCIdentifier = null
      #getData = (name) => {}
      #getName = (node) => {}
      #getRequirements = (node) => {}
      #getLabel = (name) => {}
      #addError = (name, label, error) => {}
      #delError = (name) => {}

      constructor() {}

      DOMLoad(p = {}) {
            this.#inputRequirements = {}

            let load = (T = this) => {
                  const parent = p.parent === undefined ? document : p.parent
                  const inputs = p.inputs === undefined ? parent.querySelectorAll(T.#FCIdentifier) : p.inputs

                  for (let i = 0; i < inputs.length; i++) {
                        let name = T.#getName(inputs[i])
                        let requirements = T.#getRequirements(inputs[i])
                        requirements = (requirements === "" || requirements === undefined || requirements === null) ? null : evaluateRequirements(requirements)
                        T.#inputRequirements[name] = requirements
                  }
            }
            load()
      }

      baseLoad(inputRequirements) {
            this.#inputRequirements = inputRequirements
      }

      check(p = {}) {
            const handleError = p.handleError === undefined ? false : p.handleError
            const inputRequirements = p.inputRequirements === undefined ? this.#inputRequirements : p.inputRequirements
            let inputData = p.inputData === undefined ? (name) => {return this.#getData(name)} : (name) => {return p.inputData[name]}

            const errors = {}

            for (const [name, requirements] of Object.entries(inputRequirements)) {
                  if (requirements === null) continue

                  requirements.forEach((requirement) => {
                        if (requirement === null) return

                        let result = Array.isArray(requirement) ? 
                              Require.run(requirement[0], [inputData(name)].concat(requirement[1]), true) : 
                              Require.run(requirement, inputData(name))

                        if (!Object.hasOwn(errors, name))
                              errors[name] = []
                        result.forEach(r => errors[name].push(r))
                  })
            }

            if (handleError) {
                  for (const [name, errorCodes] of Object.entries(errors)) {
                        if (errorCodes.length === 0)
                              this.#delError(name)
                        else
                              this.#addError(name, this.#getLabel(name), errorCodes)
                  }
            }

            return [Object.keys(errors).length == 0, errors]
      }      

      set FCIdentifier(identifier) {
            this.#FCIdentifier = identifier
      }

      set getData(f) {
            this.#getData = f
      }

      set getName(f) {
            this.#getName = f
      }

      set getRequirements(f) {
            this.#getRequirements = f
      }

      set getLabel(f) {
            this.#getLabel = f
      }

      set addError(f) {
            this.#addError = f
      }

      set delError(f) {
            this.#delError = f
      }
}

function evaluateRequirements(requirements) {
      requirements = requirements.split(" ")
      requirements = requirements.map(r => {
            r = r.replace(/\s/g, '');

            const leftParantheses = r.indexOf("(")
            const rightParentheses = r.indexOf(")")
            
            if (leftParantheses === -1 || rightParentheses === -1)
                  return r
            return [r.slice(0, leftParantheses), (r.slice(leftParantheses + 1, rightParentheses)).split(",")]
      })
      return requirements
}