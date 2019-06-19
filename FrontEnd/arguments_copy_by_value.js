// 『JS中的参数都是按值传递的』- 高程

// 1. 日常中我们都知道如果参数是原始类型，函数内部会拷贝一份值，修改函数内的参数不会影响外层变量
var value = 1;
function foo(v) {
  v = 2;
  console.log(v); // 2
}
foo(value);
console.log(value) // 1

// 2. 如果参数是引用类型我们修改参数变量会导致传入的参数一起变化
var obj = {
  value: 1
};
function foo(o) {
  o.value = 2;
  console.log(o.value); // 2
}
foo(obj);
console.log(obj.value) // 2

// 3. 但是还有另外一种情况，这里参数是引用类型，但是修改参数变量并没有改变外部变量，
// 如果照（2）的情况，修改之后外部变量一起变化，这里个人理解是 o 在变量对象上是一个指针，指向了传入的参数 obj
// 而 o = 2 将 o 的指针指向了原始类型数字2，切断了与 obj 之间的联系，并没有对 obj 产生影响
var obj = {
  value: 1
};
function foo(o) {
  o = 2;
  console.log(o); // 2
}
foo(obj);
console.log(obj.value) // 1

// （3）的情况与这里应该是一样（or类似）的，b 指针指向了 a，修改 b.age 同时修改了 a 和 b 指向的对象，
// 但是如果将 b 赋新的值，只是切断了指针，并不会对 a 产生影响
var a = { age: 24 }
var b = a
b.age = 100
console.log(a, b) // { age: 100 } { age: 100}
b = 0
console.log(a, b) // { age: 100 } 0

// JS中基本类型存在栈内存中，传递的是值；引用类型也存在栈内存中，但是值是指向堆内存中的一个地址 (where it keeps its actual value) ，
// 传递的是指针