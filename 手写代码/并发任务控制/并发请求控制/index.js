function parallelTask(tasks, parallelCount = 2) {
    return new Promise((resolve, reject) => {
        if (tasks.length == 0) {
            resolve()
            return
        }
        //跟并发任务一样，依然是定义一个_run

        let nextIndex = 0
        let finishCount = 0
        function _run() {
            //运行下一个任务
            const task = tasks[nextIndex++]
            task().then(
                () => {
                    //运行下一个
                    if (nextIndex < tasks.length) {
                        _run()
                    } else if (finishCount == tasks.length) {
                        resolve()
                    }
                },
                () => {},
            )
        }

        for (let i = 0; i < parallelCount && i < tasks.length; i++) {
            _run()
        }
    })
}

export default parallelTask
