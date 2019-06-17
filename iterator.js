const range = {
  from: 0,
  to: 5,
  [Symbol.iterator]() {
    let { from, to } = this
    return {
      next() {
        if (from < to) return { value: from++, done: false }
        return { done: true }
      }
    }
  }
}

console.log([...range])

for (let i of range) {
  console.log(i)
}