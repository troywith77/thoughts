// an infinite iterator to get random numbers
const random  = {
  [Symbol.iterator]: () => ({
    next: () => ({ value: Math.random() })
  })
}

// *take* receives two arguments, the first is another object that has an Symbol.iterator, the second is the amount that the iterator should run.
// *take* returns a new iterator
function take(sequence, amount) {
  return {
    [Symbol.iterator]: () => {
      // grab the iterator
      const iterator = sequence[Symbol.iterator]()
      return {
        next: () => {
          // if amount is less that 1, end the iteration
          if (amount-- < 1) return { done: true }
          // else return the result that the original iterator returned before
          return iterator.next()
        }
      }
    }
  }
}

console.log([...take(random, 2)])

function range(sequence, low, high) {
  const iterator = sequence[Symbol.iterator]()
  return {
    [Symbol.iterator]: () => {
      return {
        next: () => {
          const item = iterator.next()
          if (item.value < low || item.value > high) return { done: true }
          return item
        }
      }
    }
  }
}

console.log(...range(random, 0, 0.9))

const arr = [10, 100, 1000]

function repeat(sequence, times) {
  return {
    [Symbol.iterator]: () => {
      let key = 0
      return {
        next: () => {
          if (key >= sequence.length) {
            key = 0
            times--
          }
          if (times < 1) return { done: true }
          const item = sequence[key]
          key++
          return { value: item, done: false }
        }
      }
    }
  }
}

console.log(...repeat(arr, 3))

// infinite iterator
function* fib1() {
  let previous = 0
  let current = 1
  while (true) {
    yield current
    let next = previous + current
    previous = current
    current = next
  }
}

const fib2 = {
  [Symbol.iterator]() {
    let previous = 0
    let current = 1
    return {
      next: () => {
        let next = previous + current
        let value = current
        previous = current
        current = next
        return { value, done: false }
      }
    }
  }
}

const fib3 = {
  * [Symbol.iterator]() {
    let previous = 0
    let current = 1
    while (true) {
      yield current
      let next = previous + current
      previous = current
      current = next
    }
  }
}

g1 = fib1()
console.log(g1.next())
console.log(g1.next())
console.log(g1.next())
console.log(g1.next())
console.log(g1.next())
console.log(g1.next())

g2 = fib2[Symbol.iterator]()
console.log(g2.next())
console.log(g2.next())
console.log(g2.next())
console.log(g2.next())
console.log(g2.next())
console.log(g2.next())

g3 = fib3[Symbol.iterator]()
console.log(g3.next())
console.log(g3.next())
console.log(g3.next())
console.log(g3.next())
console.log(g3.next())
console.log(g3.next())