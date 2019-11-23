// Main script used before any other
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
