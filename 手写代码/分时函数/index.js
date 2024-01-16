/* 
有一个需要执行很多次的任务，比如撒1000个点，如果全部执行完，就会导致其余任务阻塞，出现卡顿现象
解决思路：将任务分块，每一块执行一部分，每执行完一部分任务，将剩余时间给浏览器进行渲染

*/

const btn = document.querySelector('.btn')
const datas = new Array(100000).fill(0).map((_, i) => i)
btn.onclick = () => {
    const consumer = (item) => {
        //撒点动作
        const div = document.createElement('div')
        div.textContent = item
        document.body.appendChild(div)
    }
    performChunk(datas, consumer)
}

function performChunk(datas, consumer) {
    if (datas.length == 0) {
        return
    }
    //依次取出任务执行
    let i = 0
    //执行一块任务
    _run()
    function _run() {
        if (i == datas.length) {
            return
        }
        //浏览器渲染帧为16.6ms一次，会在每一帧里进行渲染工作，如果任务完成，还有空余时间，就会自动调用requestIdleCallback方法
        requestIdleCallback((idle) => {
            //获取一帧中的空闲时间。如果timeRemaining不支持safrai浏览器，可以通过Date.now()获取时间，判断是否<16.6
            while (idle.timeRemaining() > 0 && i < datas.length) {
                const item = datas[i]
                consumer(item, i)
                i++
            }
            //循环结束，说明这一帧中没有剩余时间执行任务，再次调用_run()，进入下一帧
            _run()
        })
    }
}
