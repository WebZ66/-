/* 
依次顺序执行一系列任务
所有任务完成后可以得到每个任务的执行结果
需要返回两个方法，start用于启动任务，pause用于暂停任务
每个任务具有原子性，即不可中断，只能在两个任务之间进行中断
*/

function processTasks(...tasks) {
    let isRunning = false
    let result = []
    let i = 0
    return {
        start() {
            return new Promise(async (resolve, reject) => {
                if (isRunning) {
                    return
                }
                isRunning = true
                //依次执行任务
                while (i < tasks.length) {
                    console.log(`执行${i}任务`)
                    const r = await tasks[i]()
                    result.push(r)
                    console.log(`任务${i}执行结束`)
                    i++
                    if (!isRunning) {
                        //如果任务执行完后，调用了pause就结束剩余任务。再次调用start，从下一个任务重新开始执行
                        return
                    }
                }
                isRunning = false
                resolve(result)
            })
        },
        pause() {
            isRunning = false
        },
    }
}
