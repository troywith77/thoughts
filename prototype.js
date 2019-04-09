function Person (name) {
  this.name = name
}

Person.prototype.sayName = function () {
  console.log(this.name)
}

ray = new Person('ray')
ray
ray.sayName()

// 1. 实例的__proto__指向构造函数的prototype
// 2. 实例没有prototype
// 3. 构造函数才有prototype
// 4. 构造函数的prototype有一个constructor属性指向构造函数
// 5. 实例也可以访问constructor属性，实际上访问的是构造函数的prototype的constructor
// 6. 构造函数的prototype没有prototype
// 7. 构造函数的__proto__指向它继承的构造函数的prototype
// 8. __proto__永远指向构造函数的prototype，直到Object.prototype.__proto__ === null

console.log(ray.prototype)
console.log(ray.__proto__)
console.log(ray.__proto__.__proto__)
console.log(ray.__proto__ === Person.prototype)
console.log(ray.constructor)
console.log(ray.__proto__.constructor)
console.log(Person.prototype)
console.log(Person.prototype)
console.log(Person.prototype.constructor)
console.log(Person.prototype.__proto__)
console.log(Person.__proto__ === Function.prototype)
console.log(Person.__proto__.__proto__ === Object.prototype)
console.log(Person.__proto__.__proto__.__proto__)