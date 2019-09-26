// basic use

const target = {
  x: 10,
  y: 10,
}

const handler = {
  get(obj, prop) {
    console.log(obj, prop)
    return 'A'
  }
}

const t = new Proxy(target, handler)

console.log(t.x)

// negative array

const negativeArray = arr => new Proxy(arr, {
  get: (arr, index) => +index < 0 ? arr[arr.length + (+index)] : arr[index]
})

const unicorn = negativeArray(['🐴', '🎂', '🌈'])

console.log(unicorn[-1]) // '🌈'