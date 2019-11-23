// Main script used before any other
let btn2 = document.getElementById("color");
let btn3 = document.getElementById("hideShow");
let btn4 = document.getElementById("raf");
let element = document.getElementById("element");

function sayHello(name, isAlert){
    let text = `Hello ${name}`;
    if(isAlert === true) {
        alert(text);
        return;
    }
    console.log(text);
}

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