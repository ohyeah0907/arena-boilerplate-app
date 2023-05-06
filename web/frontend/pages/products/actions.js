export const filterValidOptions = (options) => {
  if (!options) return []
  return options.filter((item) => item.name && item.values.length > 0)
}

export const generateVariantsFromOptions = (options) => {
  let _options = filterValidOptions(options)

  let option1 = _options[0]
  let option2 = _options[1]
  let option3 = _options[2]

  let variants = []

  if (option1 && option2 && option3) {
    for (let i = 0; i < option1.values.length; i++) {
      for (let j = 0; j < option2.values.length; j++) {
        for (let k = 0; k < option3.values.length; k++) {
          variants.push({
            option1: option1.values[i],
            option2: option2.values[j],
            option3: option3.values[k],
          })
        }
      }
    }
  } else if (option1 && option2) {
    for (let i = 0; i < option1.values.length; i++) {
      for (let j = 0; j < option2.values.length; j++) {
        variants.push({
          option1: option1.values[i],
          option2: option2.values[j],
          option3: null,
        })
      }
    }
  } else {
    for (let i = 0; i < option1.values.length; i++) {
      variants.push({
        option1: option1.values[i],
        option2: null,
        option3: null,
      })
    }
  }

  return variants
}
