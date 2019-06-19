// !!! Promise 的 then 和 catch 每次都会返回一个新的 Promise !!!

p1 = Promise.resolve(true)
p2 = Promise.reject(new Error('ah!!!'))

// Promise 一旦创建不管是 resolve 还是 reject，status 就会确定为 resolved 或者 rejected

// p1 -> resolved, p2 -> rejected

p3 = p1
  .then(() => Promise.reject('233'))
  .catch(err => console.log(err))
  .then()

// p1 是 resolved 状态，所以给它添加 then 方法会执行，内部出现错误会返回一个 rejected 状态的新的 Promise
// rejected 状态的 Promise 被 catch 后会返回新的 resolved 状态的 Promise，所以可以使用 then 继续链式调用

p4 = p2
  .catch(() => 1)
  .then(res => console.log(res))

// p2 是 rejected 状态，添加 catch 方法在内部可以处理抛出的错误，继续返回一个 1 会被包装成 Promise.resolve(1)，
// 所以返回的 Promise 可以使用 then 方法

