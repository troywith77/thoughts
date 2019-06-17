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
