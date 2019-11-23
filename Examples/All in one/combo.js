let btn1 = document.getElementById("block");
let btn2 = document.getElementById("color");
let btn3 = document.getElementById("hideShow");
let btn4 = document.getElementById("raf");
let btn5 = document.getElementById("promiseResolving");
let result = document.getElementById("result");
let element = document.getElementById("element");

// Example with blocking function
const fibonacci = (number) => {
    if (number < 2) {
        return number;
    }
    return fibonacci(number - 1) + fibonacci(number - 2);
}

btn1.addEventListener("click", function() {
    result.textContent = fibonacci(40);
});


// Example with render steps handling color changes
let red = _ => element.style.backgroundColor = "red";
let yellow = _ => element.style.backgroundColor = "yellow";
let green = _ => element.style.backgroundColor = "green";

btn2.addEventListener("click", function(){
    red();
    yellow();
    green();
});

// Example with render steps handling hide/show of element
btn3.addEventListener("click", function(){
    element.style.display="none";
    element.style.display="block";
    element.style.display="none";
    element.style.display="block";
    element.style.display="none";
    element.style.display="block";
    element.style.display="none";
    element.style.display="block";
    element.style.display="none";
    element.style.display="block";
});

// Example with request animation frame
btn4.addEventListener("click", function(){
    red();
    requestAnimationFrame(_ => element.style.backgroundColor="blue");
    yellow();
    green();
});

// Example with promises resolving

// 1. first annon gets in the microtask and to the stack
// 2. one function and second annon gets on the microtask queue
// 3. one is added to the stack and executed
// 4. annon is added to the stack and executed
// 5. two gets in the microtask queue
// 6. two is added in the stack and executed
btn5.addEventListener("click", function(){
    Promise.resolve()
    .then(function () {
      Promise.resolve().then(function one() {result.textContent = "Done with first"});
    })
    .then(function () {
      Promise.resolve().then(function two() {result.textContent += " / Done with second"});
    });
});
