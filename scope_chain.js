// scope chain 是在函数定义时创建的

function foo() {
  var a = 1
	function bar() {
    var b = 2
    function baz() {
	    console.log(bar, a, b)
    }
    baz()
    console.dir(baz)
    // [[Scope]]
    // [Closure(bar), Closure(foo), Global]
    // Closure(foo): {
    //   b: 2
    // }
    // Closure(foo): {
    //   a: 1,
    //   bar()
    // }
  }
  bar()
  console.dir(bar)
  // [[Scope]]
  // [Closure(foo), Global]
  // Closure(foo): {
  //   a: 1,
  //   bar()
  // }
}
foo()

// 执行foo，定义了a和bar
// 执行bar，定义了b和baz
// baz里用到了bar，a和b，在函数作用域内没有声明过，所以会沿着作用域链向上查找，自然形成了一个闭包，
// 这时的baz的[[Scope]]内会形成两个Closure，一个是bar，一个是foo，最外层是Global