//接收一个promise数组，一个parallelCount限制。
/* 注意，finally会在then方法改变调用后，作为微任务推入到微任务队列种 */
class MyPromiseAll {
    constructor(promises, parallelCount = 2) {
        //待执行任务列表
        this._tasks = promises
        this._parallelCount = parallelCount
        this._runningCount = 0
        this.successArr = []
        this.failArr = []
    }
    _run({ resolve, reject }) {
        while (this._runningCount < this._parallelCount && this._tasks.length > 0) {
            let task = this._tasks.shift()
            this._runningCount++
            console.log('runningCount', this._runningCount)
            task.then(
                (v) => {
                    console.log('v', v)
                    this.successArr.push(v)
                    this._runningCount--
                    if (this._tasks.length == 0) {
                        resolve(this.successArr)
                    }
                },
                (r) => {
                    console.log('reason', r)
                    this.failArr.push(r)
                    if (this.failArr.length == this._parallelCount) {
                        reject(this.failArr)
                    }
                },
            ).finally(() => {
                console.log('finally')
                this._run({ resolve, reject })
            })
        }
    }
    run() {
        return new Promise((resolve, reject) => {
            this._run({ resolve, reject })
        })
    }
}

let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = Promise.resolve(3)
let p4 = Promise.resolve(4)

let p = new MyPromiseAll([p1, p2, p3, p4], 2)
p.run().then(
    (v) => {
        console.log(v)
    },
    (r) => {
        console.log(r)
    },
)
