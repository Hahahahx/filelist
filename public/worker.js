
this.onmessage = function (event) {
    console.log('Received message ' + event.data);
    doSomething();
}

function doSomething() {
    // 执行任务
    this.postMessage('Work done!');
}