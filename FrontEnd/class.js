// Class is a syntax sugar for JavaScript prototype, but it is not just a syntax sugar.

class User {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`)
  }
}

const user = new User('Ray')
user.sayHi()

// The snippet above could also be written in prototype.

function User(name) {
  this.name = name
}

User.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`)
}

const user = new User('Ray')
user.sayHi()

// But as I said, they looks similar in many aspects, but internally they are different.

// To name a few
// Firstly, Class methods are non-enumerable. the `enumerable` flag of all Class methods have been set to false.
// Secondly, Classes always use strict, so we should take care of every `this` in class method.
// Thirdly, Classes cannot be invoked without `new` keyword.

// Class Property
class User {
  name = 'Anonymous';
  sayHi() {
    console.log('hi')
  }
}
// Class Property are set to instances, not on prototype.

// Class constructor
class Animal {
  constructor(name) {
    this.speed = 0
    this.name = name
  }
  sayHi() {
    console.log(`Hi, I'm ${this.name}`)
  }
}

class Rabbit extends Animal {
  state = {};
  // Note: if you don't declare a constructor in a child Class,
  // then the child Class would use its parent's constructor to initiate itself.
  constructor(name, earLength) {
    super(name)
    // `super` is a keyword for calling parent Class in child Class.
    // We must call super before using this in constructor.
    //
    this.earLength = earLength
  }
  sayHi() {
    // There is a internal property `[[homeObject]]` in Class methods,
    // `super` uses it to track which parent Class should it use.
    super.sayHi()
    console.log('Nice to meet you.')
  }
}

r = new Rabbit('r', 2)
r.sayHi()

// Class static
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  // static properties and methods are created directly in constructor function itself,
  // it works because functions are object in JavaScript.
  static type = 'Homo'
  static isSameAge(a, b) {
    return a.age === b.age
  }
}

// static properties and methods are just like this
function Person() {}
Person.isSameAge = function () {}

ray = new Person('ray', 2)
tom = new Person('tom', 3)
Person.isSameAge(ray, tom)