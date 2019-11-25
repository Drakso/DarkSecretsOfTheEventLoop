// use node --allow-natives-syntax .\test-class-display.js to run this example

const display = (msg, a, b) => {
    console.log(msg);
    console.log(a, b, %HaveSameMap(a, b));
    console.log("--------------------------------------");
}

//all integers
(() => {
    const a = {
        x: 1,
        y: 2
    };

    const b = {
        x: 11,
        y: 22
    }

    display("Both a and b contain two integer values, in the same order", a, b);
})();

//mixed integer properties 
(() => {
    const a = {
        x: 1,
        y: 2
    };

    const b = {
        y: 2,
        x: 1,
    }

    display("Both a and b contain two integer values, but in the reverse order", a, b);
})();

// integers and reals
(() => {
    const a = {
        x: 1,
        y: 2
    };

    const b = {
        x: 11.1,
        y: 22
    }

    display("Both a and b contain the same properties in the same order, but b.x is a real number", a, b);
})();

// added prop
(() => {
    const a = {
        x: 1,
        y: 2
    };

    const b = {
        x: 11,
        y: 22
    }

    b.z = "eleven";

    display("a and b are created with the same number and type of properties, but b gets an extra property later", a, b);
})();

//null prop
(() => {
    const a = {
        x: 1,
        y: 2
    };

    const b = {
        x: 11,
        y: null
    }

    display("The b.y property is defined as null", a, b);
})();

//boolean prop
(() => {
    const a = {
        x: 1,
        y: 2
    };

    const b = {
        x: 11,
        y: true
    }

    display("The b.y property is set with an boolean value", a, b);
})();

//undefined prop
(() => {
    const a = {
        x: 1,
        y: 2
    };

    const b = {
        x: 11,
        y: undefined
    }

    display("The b.y property is defined as undefined", a, b);
})();

//missing prop
(() => {
    const a = {
        x: 1,
        y: 2
    };

    const b = {
        x: 11
    }

    display("The b.y property is not defined explicitly", a, b);
})();