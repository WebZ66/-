self.importScripts('../spark-md5.js')

self.onmessage = function (event) {
    hash(event.data).then((v) => {
        self.postMessage(v)
    })
    function hash(chunks) {
        return new Promise((resolve) => {
            const spark = new SparkMD5()
            function _read(i) {
                if (i >= chunks.length) {
                    //读取了所有的块 需要调用spark.end(),返回的hash值
                    resolve(spark.end())
                    return
                }
                const reader = new FileReader()
                reader.readAsArrayBuffer(chunks[i])
                reader.onload = function (e) {
                    //读取到了对应块的字节
                    console.log('e', e)
                    let bytes = e.target.result
                    spark.append(bytes)
                    _read(i + 1)
                }
            }
            _read(0)
        })
    }
}
