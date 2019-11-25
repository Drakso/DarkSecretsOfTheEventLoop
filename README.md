# Dark Secrets of the Event Loop 🚀
Nobody imagined that javascript would be this popular. 15 years ago the idea of javascript being one of the most popular language in the world as well as being processed by complex engines to enhance it and optimize it would be categorized in the nerd jokes section. However people put it, that reality is here and adapting to this idea is inevitable. This is why a better knowledge and understanding of the processes that go behind the scenes are crucial for creating solutions in modern javascript. Whether your code is executed in the browser or node.js it always has some extra help. This extra help comes from the environment itself by using an engine to execute and optimize code instead of interpreting it like it was meant at first and using APIs for specific operations.
## The stack 🥞
To look inside the inner works of a javascript execution we must ask our selves: We know that the code is executed line by line, but where are these instructions really executed? This would be the main stack of execution. This not only is the main stack of execution but the only one. Being the only stack means a few things:

* Tasks get executed with the Last In - First Out principle
* If some task takes a long time the stack would not be able to execute anything else Now you can imagine the shock that this stack had when he realized that it was invented to execute simple scripts and just help out here and there and now it needs a manager just to keep track of all the libraries, frameworks and dependencies. This stack DID NOT SIGN UP FOR THIS.

![panic](https://media2.giphy.com/media/Yl5aO3gdVfsQ0/giphy.gif?cid=790b76115423a538e397f1b783d0e8aa57851f6032865cd7&rid=giphy.gif)

### Functions in the stack
```js
function sayHello(name, isAlert){
    let text = `Hello ${name}`;
    if(isAlert === true) {
        alert(text);
        return;
    }
    console.log(text);
}
function first(){
    second();
}
function second(){
    third();
}
function third(){
    sayHello("Bob");
}

first();
```
![Example 1](https://github.com/Drakso/DarkSecretsOfTheEventLoop/blob/master/img/EventLoop01.gif?raw=true)
### Blocked stack
```js
function fibonacci(num){
    if (num < 2) return num;
    return fibonacci(num - 1) + fibonacci(num - 2);
}
function fibonacci(num){
    if (num < 2) return num;
    return fibonacci(num - 1) + fibonacci(num - 2);
}
function first(){
    second();
}
function second(){
    third();
}
function third(){
    fibonacci(40);
    sayHello("Bob");
}

first();
```
![Example 2](https://github.com/Drakso/DarkSecretsOfTheEventLoop/blob/master/img/EventLoop02.gif?raw=true)

As you saw the stack can get clogged pretty easily. Luckily we don't actually experience this in our day to day encounters on the internet. Developers realized how stressful the job of this stack is and tried to invent some systems to help him out and divert the blocking tasks out of the stack so normal execution can continue.

## APIs 🍫

One of the main features of modern browsers / node.js are Web/C++ APIs that are available for handling specific blocking tasks. These APIs are built around blocking tasks such as:

* Waiting with setTimeout()
* Executing on certain intervals with setInterval()
* Waiting for http requests

When the stack encounters some of these tasks the stack delegates them to the external APIs and out of the stack. The callback functions that are delegated are stored in the API until it is ready to be returned back to the stack for execution. This takes the load of waiting off the stack so it can do other tasks until the waiting is done and the callback is returned to the stack for execution.

## The task queue 🍡
When callbacks or tasks are returned in the stack they don't just appear and get executed. They go through a queuing system first. Every task that needs to enter the main stack needs to first enter the Task Queue. There, tasks waits until the stack is empty so the oldest task can be executed. This means that the tasks are queued by the First In - First Out system. So when a blocking task is in the stack, the callback is transferred to some API. The API then transfers it to the queue and there the task waits patiently until it is their turn to enter the stack. A task can't be transferred to the main stack if the stack still has some code to execute. The good news is that the event queue can have infinite tasks and the main stack will never be blocked. The bad news is that nothing in the stack gets exactly in time. All the setTimeout and setInterval and http requests are always coming a bit late since they have to wait in the queue before they can get executed.

#### Click Event
```js
btn.addEventListener("click", function(){
    console.log("Clicked the button");
});
btn.addEventListener("mouseover", function(){
    console.log("Mouse over the button!");
});
```

![Example 3](https://github.com/Drakso/DarkSecretsOfTheEventLoop/blob/master/img/EventLoop03.gif?raw=true)

#### Set Timeout
```js
let wait2s = _ => setTimeout(_ => console.log("After ~2 seconds"), 2000);
let wait3s = _ => setTimeout(_ => console.log("After ~3 seconds"), 3000);
let wait6s = _ => setTimeout(_ => console.log("After ~6 seconds"), 6000);
btn.addEventListener("click", function(){
    wait2s();
    wait3s();
    wait6s();
});
```

![Example 4](https://github.com/Drakso/DarkSecretsOfTheEventLoop/blob/master/img/EventLoop04.gif?raw=true)

## The Event Loop 🍩
Until this point we know tasks are delegated out of the main stack, stored in a queue and return back to the stack once it is done with all the work. Something that we didn't mention is the mastermind behind the organization and the managing of these processes. That is the event loop. The event loop is a system that manages every flow that is connected to execution. Everything goes through the event loop, including:

* Handling tasks from the task queue
* Handling microtasks from the microtask queue
* Creating the DOM tree in browsers
* Creating the CSSOM tree in browsers
* Creating render tree in browsers
* Paint screen in browsers

## Micro task queue 🍭
Now you might be wondering: Where are the promises at? There was no mention of them in the APIs section, nor in the event queue or the event loop. Well when we were given promises there was another cool thing added as well. A new task queue. But not just any task queue, but a micro tasks queue. This queue is dedicated to handle tasks that need executing without waiting for the event loop to go a full circle, such as resolving promises. The micro task queue is prompted to insert micro tasks on the main stack after the task queue has added a task on the stack. Unlike the task queue, the micro task queue adds micro tasks on the stack on the First in - First Out system until it runs out. This makes the micro task queue prone to some blocking issues if we are not careful with our promises, but it is also a relief to know that our promises will not wait for the event loop to come back just so it can execute the next micro task.

#### Fetch API 
```js
btn.addEventListener("click", function(){
    fetch('http://slowwly.robertomurray.co.uk/delay/6000/url/https://swapi.co/api/people/1')
    .then(function a() { console.log("Got it!")});
});
```

![Example 5](https://github.com/Drakso/DarkSecretsOfTheEventLoop/blob/master/img/EventLoop05.gif?raw=true)

#### Promise resolving
```js
let btn = document.getElementById("promiseResolving");

// Example with promises resolving

// 1. first annon gets in the microtask and to the stack
// 2. one function and second annon gets on the microtask queue
// 3. one is added to the stack and executed
// 4. annon is added to the stack and executed
// 5. two gets in the microtask queue
// 6. two is added in the stack and executed
btn.addEventListener("click", function(){
    Promise.resolve()
    .then(function () {
      Promise.resolve().then(function one() {console.log("Done with first")});
    })
    .then(function () {
      Promise.resolve().then(function two() {console.log("Done with second")});
    });
});
```

## Render steps 🧁
When we look at an example where we block the thread we can clearly see that not only our javascript code, but the whole web page is blocked and can't be used. We can't type, can't click on things, images are not loaded and GIFs are not playing. This is because, as mentioned above, the event loop is tasked with managing the rendering of the web page. This is usually tied with the refresh rate of the current display and depending on that, the event loop decides when to go through the render steps. A lot of extra steps that we would otherwise need to perform are saved this way. If the event loop went through the render steps on every cycle, it would have executed a lot of useless render steps updates since the monitor refresh rate is not fast enough to keep up with the event loop. When the event loop decides to execute the render steps it does few things;

* It maps the structure of the site and creates / updates the DOM tree
* It maps the styles applied and creates / updates the CSSOM tree
* DOM and CSSOM create a Render tree
* The screen is painted from the Render tree instructions

This means that when we manipulate CSS from our JavaScript code we are not really giving instructions directly to the render tree. The changes will happen when the event loop decides to do the render steps. So if we update the CSS of an element 3 times in our scripts at once it would not change 3 times as the code might suggest, but just paint the last change on that element. This can sometimes cause issues when we try to update more css styles by design and need them to execute one by one instead of just the last one. A method called requestAnimationFrame() exists that could help in situations like these. This method is called right before the next paint and can make sure that your code is applied just before the next paint, and not just overridden.

#### Multiple CSS changes in JavaScript
```js
let red = _ => element.style.backgroundColor = "red";
let yellow = _ => element.style.backgroundColor = "yellow";
let green = _ => element.style.backgroundColor = "green";
btn.addEventListener("click", function(){
    red();
    yellow();
    green();
});
```

![Example 6](https://github.com/Drakso/DarkSecretsOfTheEventLoop/blob/master/img/EventLoop06.gif?raw=true)

#### RAF called before executing something
```js
// Example with request animation frame
btn4.addEventListener("click", function(){
    red();
    requestAnimationFrame(_ => element.style.backgroundColor="blue");
    yellow();
    green();
});
```
## The V8 Engine 🍯
When executing JavaScript in Chrome or Node.js there is one engine that does all the work - V8. This engine has many features and it not only executes but compiles and optimizes our code while it is running. This engine, built in C++, transforms the javascript code and tries to do some organizing, type detection and prioritization while it is running the code. This is done through various systems. The most important systems are the JIT compiler and the Optimization compiler of this engine.

* JIT Compiler ( Currently: Ignition ) - While the code is executed this compiler takes the code and organizes it by how many times it is used before and if it is something that can be optimized if it's used often or not. If something is used often, it delegates it to the optimization compiler
* Optimization Compiler ( Currently: TurboFan ) - A compiler tasked with optimizing or deoptimizing parts of the code depending on their usage, type and range

## Optimizing code with V8 🍮
The story of optimizing javascript goes way back, and the V8 team tried different approaches to this issue. With the previous compiler for optimization Crankshaft, the ideas on how to build optimized code became sort of a standard for writing for that specific engine. That made the code not really that scalable and understandable. There was this even Crankshaftscript word that was made up for javascript that was written with these rules. But today we have two decoupled systems that work together to bring easier way to optimize javascript code. Some optimization tricks for javacript are:

* Try and match types as possible so that the compilers detect they are similar and finish them faster
* Don't mix and match property names in a different order ( it detects them as different objects )
* Try and leave undefined for properties that does not have any value instead of leaving them out ( it detects them as different objects )
* Use classes and constructors wherever possible instead of annonimous objects
* Declare classes in the script scope instead of a function scope

This means if we write code that is not organized well, the compilers will not be able to match the types and ranges, detect them as similar. This will result in not really optimized code.

#### Simple examples
A simple example of two identical pieces of code. The result is the same but one of them is optimized and the other is not

```js
// Not Optimized
// Average of 10 runs = 45.2ms

const orders = [];
orders.push({id: 1, product: "mouse", description: "Priority order"});
orders.push({id: 2, product: "mouse", discount: 20});
orders.push({id: 3, product: "mouse", description: "After holidays", discount: 10});
orders.push({id: 4, product: "keyboard", discount: 5, description: "Priority order"});
orders.push({id: 5, product: "keyboard"});
orders.push({id: 6, discount: 15, product: "keyboard"});
orders.push({id: 7, product: "monitor", description: "Fragile"});
orders.push({id: 8, product: "monitor HD", description: "Fragile", discount: 5});
orders.push({id: 9, product: "case"});
orders.push({id: 10, product: "cooler"});

for(const order of orders) {
    console.log(`Order: ${order.id}, 
product: ${order.product}
${order.description === undefined ? "No description" : order.description}`);
}
```

```js
// Optimized
// Average of 10 runs = 19.7ms

class Order {
    constructor(id, product, description, discount ) {
      this.id = id;
      this.product = product;
      this.description = description;
      this.discount = discount;
    }
  }

const orders = [];
orders.push(new Order(1,"mouse", "Priority order", undefined));
orders.push(new Order(2,"mouse", undefined, 20));
orders.push(new Order(3,"mouse", "After holidays", 10));
orders.push(new Order(4,"keyboard", "Priority order", 5));
orders.push(new Order(5,"keyboard", undefined, undefined));
orders.push(new Order(6,"keyboard", undefined , 15));
orders.push(new Order(7,"monitor", "Fragile", undefined));
orders.push(new Order(8,"monitor HD", "Fragile", 5));
orders.push(new Order(9,"case", undefined, undefined));
orders.push(new Order(10,"cooler", undefined, undefined));

for(const order of orders) {
    console.log(`Order: ${order.id}, 
product: ${order.product}
${order.description === undefined ? "No description" : order.description}`);
}
```

### Additional Examples

Additiona examples are available [here](Examples/PerformanceExamples/v8-playground).

You can see a list of the currently used functions of the V8 runtime [here](https://github.com/v8/v8/blob/master/src/runtime/runtime.h). Note that the `OptimizationStatus` enum is also in the same [file](https://github.com/v8/v8/blob/master/src/runtime/runtime.h#L799)


## Resources 📘
* [w3.org event loops](https://www.w3.org/TR/html52/webappapis.html#event-loops)
* [html.spec apis](https://html.spec.whatwg.org/dev/webappapis.html#webappapis)
* [html.spec event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)
* [System for visualizing javascript ( a bit older version but it works with ES5 )](http://latentflip.com/loupe)

## Special thanks 🎈
Special thanks to: 
* **Jovana Shishkovska** for the amazing designs
* **Dime Gjorgjievski** for the super awesome animations

Without them, this readme and the presentation would not be as nearly as awesome! 
