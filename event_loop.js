// taks queue: https://www.w3.org/TR/html5/webappapis.html#task-queues
// event-loops-processing-model: https://www.w3.org/TR/html5/webappapis.html#event-loops-processing-model

new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(() => {
    	console.log(2)
    })
	  Promise.resolve({ then (resolve) {resolve(3)} }).then(() => {
    	console.log(3)
    })
    console.log(4)
}).then(t => {
	console.log(t)
});

new Promise((res) => {
  console.log(5)
  res({ then (resolve) {resolve(5)} })
  // res()
}).then(() => {
  console.log(6)
})