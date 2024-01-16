# React的特点

- 声明式编程(vue也是)。它允许我们只需要`维护自己的状态`，当状态改变时，会自动`重新渲染界面`
- 组件化开发。将复杂的页面拆分成一个个组件，可以方便的进行复用
- 多平台适配



##  React 依赖三个包

- `react`：包含react必须的核心代码
- `react-dom`：react渲染在不同平台所需要的核心代码
  - web端：react-dom会将jsx最终渲染成真实的DOM，显示在浏览器中
  - native端：react-dom会将jsx最终渲染成原生的控件（比如Android中的Buttom，iOS中的UIButton）
- `babel`：将jsx转换成React代码的工具。(因为浏览器只能识别js代码，需要将jsx转换成普通的js代码)





## Babel 和 React 的关系

- babel是什么？
  - 是目前前端使用非常广泛的**编译器、转移器**。
  - 比如当下很多浏览器并不支持ES6的语法，但是确实ES6的语法非常的简洁和方便，我们开发时希望使用它；那么编写源码时我们就可以使用ES6来编写，之后**通过Babel工具，将ES6转成大多数浏览器都支持的ES5的语法**
- React 和 Babel的关系
  - 默认情况下开发React其实可以不使用babel
  - 前提是我们自己使用 `React.createElement` 来编写源代码，但是它编写的代码非常的繁琐和可读性差。
  - 我们就可以直接编写jsx（JavaScript XML）的语法，并且让babel帮助我们转换成`React.createElement`。



## 数据依赖

- 在组件中的数据，我们可以分成两类：
  - **参与界面更新的数据**：当数据变量时，需要更新组件渲染的内容
  - **不参与界面更新的数据**：当数据变量时，不需要更新将组建渲染的内容
- 参与界面更新的数据我们也可以称之为是 `状态` ，这个数据是定义在当前对象的state中
  - 通过在构造函数中 this.state = {定义的数据}
  - 当数据发生变化时，可以调用 `this.setState` 来更新数据，并且`通知React进行update操作，重新调用render()函数`
    - 在进行update操作时，就会**重新调用render函数**，并且使用最新的数据，来渲染界面



```react
this.state={
	name:'zds',
	age:12
}
this.setState({age:23})
```

> this.setState做了两件事：1、将state中的age修改掉(不会影响到name，有点类似于Object.assign)。2、自动重新执行render()函数







# JSX的基本使用

JSX的顶层只能有一个根元素，所以很多时候**会在外层包裹一个div元素**（或者Fragment）

为了方便阅读，通常**会在jsx的外层包裹一个小括号()，将整个jsx当作一个整体**，这样jsx可以进行换行书写

JSX中的标签可以是单标签，也可以是双标签

- 注意：如果是单标签，必须以 **`/>`** 结尾



## JSX嵌入变量作为子元素

- 当变量是`Number、String、Array`类型时，**可以直接显示**
- 当变量是`null、undefined、Boolean`类型时，**内容为空**
  - 如果希望可以显示null、undefined、Boolean，那么**需要转成字符串**
  - 转换的方式有很多，比如toString方法、和空字符串拼接，String(变量)等方式
- **Object对象类型不能作为子元素（not valid as a React child）**





## JSX插入表达式

```react
// 1.定义App根组件
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: "kobe",
      lastName: "bryant",

      age: 20,

      movies: ["流浪地球", "星际穿越", "独行月球"]
    }
  }

  render() {
    const { firstName, lastName } = this.state
    const fullName = firstName + " " + lastName

    const { age } = this.state
    const ageText = age >= 18 ? "成年人": "未成年人"

    const liEls = this.state.movies.map(movie => <li>{movie}</li>)

    return (
      <div>
        <h2>{firstName + " " + lastName}</h2>
        <h2>{fullName}</h2>

        <h2>{ageText}</h2>
        <h2>{age > 18 ? "成年人" : "未成年人"}</h2>

        <ul>
          {liEls}
        </ul>

        <ul>{this.state.movies.map(movie => <li>{movie}</li>)}</ul>
        <ul>{this.getMovieEls()}</ul>  //jsx中执行一个函数，注意，这个函数并不是事件绑定函数，就是class中的方法。
      </div>
    )
  }

  // 在逻辑比较复杂的时候，推荐将其写入方法中
  getMovieEls() {
    return this.state.movies.map(movie => <li>{movie}</li>)
  }
}

// 2.创建root并且渲染App组件
const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App/>)

```





## JSX属性绑定

基本属性

class属性

- 在JSX中使用**`className`**替代**class**
- 绑定写法
  - 字符串拼接
  - 将所有的 class 放入数组中
  - 使用第三方库，classNames（后续补充）类似于vue的动态绑定class

style属性

- 绑定对象类型
- **注意**：此处并非上述的**插入变量作为子元素**，所以能写入**对象**





## JSX事件绑定

原生DOM监听事件

- 获取DOM原生，添加监听事件
- 在HTML原生中，给button直接绑定onclick，事件触发后，事件的回调函数中的this指向该元素

在JSX中的事件监听

- 命名采用小驼峰式（camelCase），而不是纯小写 ，即onClick
- 需要通过 `{}` 传入一个事件处理函数，这个函数会在事件发生时被执行



### this指向

react默认情况下，事件绑定函数中的this指向`undefined`

```jsx
btnClick(){
	console.log(this)  //undefined
}
render() {
    const { message } = this.state
    return (
      <div>
        <button onClick={this.btnClick}>按钮3</button> //render函数中的this指向组件实例，看起来像是隐式绑定，但并没有调用，所以不是隐式绑定
      </div>
    )
  }

```

> 这种情况下this.btnClick并没有被调用，this只有当函数被调用时才能确定this指向。它类似于
>
> ```js
> const obj = {
>   name: "obj",
>   foo: function() {
>     console.log("foo:", this)
>   }
> }
> let click=obj.foo
> click() //指向的是window
> ```

在react中**，button元素只是react中的语法糖**，它并不是真实的DOM元素，也并不是原生的事件绑定。它会被转化为

```jsx
React.createElement('button',{onClick:this.btnClick})
```

当button被点击后，**react内部会帮助我们调用click事件**，类似于`直接调用函数(即上面的click())`,在这种直接调用的方式下，this应该指向window，又因为**class内部采用的是严格模式**，this就指向了undefined。(babel转化后也会自动开启严格模式)

****

**解决this指向问题**

- `bind`显示绑定**this**
- class Fields
- 传入一个`箭头函数`(推荐)

```jsx
// 1.定义App根组件
class App extends React.Component {
  // class fields
  name = "App"

  constructor() {
    super()
    this.state = {
      message: "Hello World",
      counter: 100
    }

    this.btn1Click = this.btn1Click.bind(this)
  }

  btn1Click() {
    console.log("btn1Click", this);
    this.setState({ counter: this.state.counter + 1 })
  }

  btn2Click = () => {
    console.log("btn2Click", this)  //很少用这种写法，因为这种不好传入参数
    this.setState({ counter: 1000 })
  }

  btn3Click() {
    console.log("btn3Click", this);
    this.setState({ counter: 9999 })
  }

  render() {
    const { message } = this.state

    return (
      <div>
        {/* 1. bind绑定 */}
        <button onClick={this.btn1Click}>按钮1</button>


        {/* 2. ES6 class fields */}
        <button onClick={this.btn2Click}>按钮2</button>


        {/* 3. 传入一个箭头函数(推荐) */}
        <button onClick={() => console.log("btn3Click")}>按钮3</button>

        <button onClick={() => this.btn3Click()}>按钮3</button>

      </div>
    )
  }
}


```



****

**传入更多参数**

```jsx
  {/* 额外参数的传递 */}
        <button onClick={this.btnClick.bind(this, "马蓝星", "28")}>按钮3(不推荐)</button>
        <button onClick={(e) => this.btnClick(e, "独孤月", "30")}>按钮4</button>

```





## JSX的本质

jsx仅仅是 `React.createElement(component,props,...children)`的语法糖。

**所有的jsx都会被转化成React.createElement的函数调用**



## 虚拟DOM

`React.createElement`创建出来的是一个 **ReactElement对象**，它其实就是一个虚拟节点。(**虚拟节点**本质上就是一个js对象，用js对象的形式来表示真实DOM结构，它拥有着节点类型、子节点、事件等等属性来描述真实DOM节点，节点与节点之间嵌套，最后形成一颗虚拟DOM树)





