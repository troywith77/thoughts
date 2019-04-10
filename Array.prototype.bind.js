// MDN Array.prototype.bind polyfill

// Yes, it does work with `new funcA.bind(thisArg, args)`
// bind后返回的函数还可以作为构造函数使用，函数内的 this 会指向实例而不是 bind 时传的值
if (!Function.prototype.bind) (function(){
  // 获取 Array 原型上的 slice 方法
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function(otherThis) {
    // 确保调用 bind 方法的必须是函数
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    // baseArgs 是 bind 时传入的从第二个开始的参数
    var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
        // bind 时传入的参数的个数
        baseArgsLength = baseArgs.length,
        // fToBind 是调用 bind 函数的原始函数
        fToBind = this,
        // fNOP 是一个空的函数引用，这里使用一个空函数来做中转是为了防止以后修改 fBound.prototype 上的属性影响到原始函数的 prototype
        fNOP    = function() {},
        // fBound 是最终返回的新函数
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          // 返回的新函数的参数与原始参数拼接到一起
          baseArgs.push.apply(baseArgs, arguments);
          // 调用 apply 改变返回的函数的 this
          return fToBind.apply(
            // 这里先看下面一步的原型委托
            // 如果 fBound 是做构造函数调用的，那就用构造函数本身的 this，即返回的实例，否则使用原始传入的 otherThis
            fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      // 把原始函数原型上的属性委托到 fNOP 上 
      fNOP.prototype = this.prototype;
    }
    // 把FNOP原型上的属性委托到 fBound 上 
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
