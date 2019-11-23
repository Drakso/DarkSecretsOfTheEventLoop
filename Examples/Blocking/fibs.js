const fibonacci = (number) => {
    if (number < 2) {
        return number;
    }
    return fibonacci(number - 1) + fibonacci(number - 2);
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calc").addEventListener("click", () => {
        document.getElementById("result").textContent = fibonacci(43);
    });
})