# JS基础

## 数据类型

js数据类型主要分为： `基础数据类型`、 `引用数据类型`

基础类型数据：number、string、boolean、undefined、null、symbol、bigint

引用类型数据：object (array，date，function等类型都属于引用类型数据)



**Symbol：创建一个独一无二且不可变的数据类型，常用于定义对象的特定的私有属性和方法**



**BigInt：可以表示任意精度的整数，即使这个数已经超出了Number能够表示的范围**



## 数据类型检测的方式

对于基本数据类型，可以用最简单的 **typeof**

```
typeof 2//number
typeof 'str' //string
typeof true//boolean
typeof []//object
typeof null//object
typeof function//function
typeof undefined//undefined
```

typeof null为object是因为js的历史遗留问题，js存储数据是以二进制开头的，比如number类型是001，而object和null都是以000开头的，因此就认为typeof null是object



**对于引用类型数据，可以使用instanceof**

> instanceof原理：判断构造函数的原型是否在实例对象的原型链上。

但是注意，对于基本类型数据会报错。

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false 

console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true

```





## This指向问题

最基础的理解，**this永远指向调用者**。

```
function foo() {
  console.log(this.a)
}
var a = 1
foo()  //window

const obj = {
  a: 2,
  foo: foo
}
obj.foo()  //obj

const c = new foo()  //this指向c
```

### `箭头函数中的this`

箭头函数是没有自己的this指向的，它的this指向**定义箭头函数时，箭头函数所在环境中的this**



**call、apply、bind**

如果第一个参数不传，或者传入null，那么this指向为window

如果我们连续bind多次，`fn` 中的 `this` 永远由第一次 `bind` 决定

```
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?  window
```



**总结**

- 在浏览器里，在全局范围内this 指向window对象；
- 在函数中，this永远指向最后调用他的那个对象；
- 构造函数中，this指向new出来的那个新的对象；
- `call、apply、bind`中的this被强绑定在指定的那个对象上(且是**第一个绑定的对象**)；
- 箭头函数中this比较特殊,箭头函数this为父作用域的this，不是调用时的this.要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的this指向是静态的,声明的时候就确定了下来；



### **自定义bind、call、apply函数**

```js
            Function.prototype.myCall = function (...context) {
                //这个this指向函数
                let obj = context[0] || window
                obj.fn = this
                let arg = context.slice(1)
                let result = obj.fn(...arg)
                delete obj.fn
                return result
            }
            function fn() {
                console.log(this)
            }
            fn.myCall({ name: 'zds' }, '2', '3')
```



```js
            Function.prototype.myBind = function (...context) {
                let obj = context[0]
                let arg = context.slice(1)
                let _this = this
                console.log(_this)
                return function () {
                    return _this.apply(obj, arg)
                }
            }
            function fn(...args) {
                console.log(...args)
                console.log(this)
            }
            fn.myBind({ name: 'obj' }, [1, 2])()
```





## 变量提升

js代码在执行时，其实分为了两个阶段。第一个阶段是声明阶段，它会把用var声明的变量和声明式函数提升到最前面，并且赋值为undefined。第二个阶段才是真正的执行阶段。函数声明提升的优先级高于变量提升。



## 执行上下文

js代码执行时，首先会创建执行上下文。执行上下文分为三种

- 全局执行上下文
- 函数执行上下文
- eval执行上下文

`每个执行上下文都有三个非常重要的属性，变量对象VO或者AO、词法作用域(即作用域)，this`

他们是通过执行上下文栈来执行的。

首先创建全局执行上下文，推入执行上下文栈，并执行。遇到函数时，会创建一个函数执行上下文推入执行上下文栈中执行。当函数执行完毕后，执行上下文会从栈中弹出。继续执行全局执行上下文。



## 作用域

概念：作用域`可以理解为变量的可访问性`，js采用的是词法作用域，这意味着**作用域是在代码编写时就确定了**，而不是执行过程中确定

作用域可分为三种：

- 全局作用域

  在全局作用域下定义的变量，无论什么地方都可以访问

- 函数作用域

  在函数中定义的变量，只能在当前函数中访问

- let和const声明的块级作用域

  let和const声明的变量只能在{}对应的块级作用域中访问 。即if语句和循环语句中的{}



### 作用域链

作用域链：在js中作用域链其实是一种机制，它决定了`变量的查找顺序`。当一个作用域内访问一个变量时，js首先会在当前作用域中查找，如果查找不到，就会向上一级作用域中查找，直到全局作用域，这样层层的查找形成了一种链式结构，被称为了作用域链



## 闭包

闭包：可以简单理解为`一个可以访问父级函数内部变量的函数`。创建闭包的最常见方式：函数套函数，内部函数调用了外部函数的变量，当外部函数被调用，就形成了一个闭包。

**闭包的本质：`外界环境中存在指向父级作用域的引用`**



**闭包的作用：**创建私有变量。比如循环时用var定义i，与setTimeout(()=>{})结合，解决异步问题

```js
for (var i = 0; i < 5; i++) {
    (function(index) {
        setTimeout(function() {
            console.log("Index: " + index);
        }, 1000 * index);
    })(i); //如果没用闭包，直接setTimeout()会每秒输出一个5。这是因为每次for循环会创建一个定时器任务，1s后输出i，2s后输出i
    		//然而这个i存在变量提升，其实就是全局的i  最后结果是5个5。用了闭包或者let就是每秒输出0 1 2 3 4
}
```



## new

**new的原理：**

①创建出一个空对象。②空对象的__ proto __属性指向构造函数的原型对象。③执行构造函数，并将构造函数内部的this指向空对象，为其添加属性方法④最后返回该对象

```js
            function myNew(fn, ...args) {
                let obj = Object.create(fn.prototype)
                fn.apply(obj, args)
                return obj
            }
```



## 原型和原型链

构造函数中默认有一个prototype属性，它指向一个Object空对象，该对象称为原型对象。通过构造函数创建出来的实例也有一个__proto__属性，它也指向该原型对象。当实例对象调用属性或方法时，首先会从当前对象中查找，如果查找不到，就会通过__ proto __向原型查找，如果还查找不到，再向原型的原型查找，直至原型链的尽头null

![image-20231216163137560](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231216163137560.png) 



## 继承

![image-20231216163240045](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231216163240045.png) 

### 组合式继承

即原型链继承和构造函数继承的组合：

思路：让`子对象的原型指向父构造函数的实例对象`。同时在子构造函数中调用父构造函数，并修改this指向

```js
            function Parent(value) {
                this.value = value
            }
            Parent.prototype.getValue = function () {
                return this.value
            }
            function Child(...args) {
                Parent.apply(this, value)
            }
            Child.prototype = new Parent()
            Child.prototype.constructor = Child
```

缺点：在子继承的时候，通过new 重复调用了父构造函数，可能会导致子实例对象多了一些不必要的属性和方法。

### 寄生组合式继承

组合式继承的缺点就是在继承时，通过new 重复调用了父构造函数，只需要解决这点就可以了。

```js
 function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
  }
  function Child5() {
    Parent5.call(this);
    this.type = 'child5';
  }
  Child5.prototype = Object.create(Parent5.prototype);
  Child5.prototype.constructor = Child5;
```

ES6中class类继承其实就是用的这种方式



