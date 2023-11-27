/*
要求：任务队列里有且只有两个任务能同时执行，一个任务完成后，才能继续执行剩下的任务
比如 第一个任务耗时10s   
     第二个任务耗时5s 
     第三个任务耗时3s

效果： 10s后输出1   5s后输出2   8s后输出3

*/

class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount //并发任务数量
    this.tasks = [] //待执行的任务，即排队的任务
    this.runningCount = 0 //正在执行的任务数量
  }
  //接受一个任务，该任务一定是函数。添加任务后需要返回的是个promise
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject
      })
      this._run()
    })
  }
  //执行任务
  _run() {
    while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
      const { task, resolve, reject } = this.tasks.shift()
      this.runningCount++
      task()
        .then(() => resolve(), ()=>reject())
        .finally(() => {
          this.runningCount--
          this._run()
        })
    }
  }
}

//因为这题里要求的是add返回promise，控制add的promise状态
const superTask = new SuperTask()
function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`)
    })
}

function timeout(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

addTask(10000, 1)
addTask(5000, 2)
addTask(3000, 3)
