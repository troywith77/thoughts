function* foo() {
  let res1 = yield '2 + 2 = ?'
  console.log(res1)
}

f = foo()
console.log(f.next())
console.log(f.next(4))