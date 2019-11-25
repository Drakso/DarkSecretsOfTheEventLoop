document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calculate").addEventListener("click", () => {
        runCalculations();
    })
})

// generates a random number from zero to the number parameter, exclusive
const randTo = (number) => (Math.random() * number) | 0;

// a quick and dirty generator for a random permutation of three elements
const getOrder = () => {
    const index = randTo(6);
    return [
        [0, 1, 2],
        [0, 2, 1],
        [1, 0, 2],
        [1, 2, 0],
        [2, 0, 1],
        [2, 1, 0]
    ][index];
}

// generates fnames.length * lnames.lenght people (400.000 objects)
// the objects are created in one call, and have predictable property order
const getNicePeople = () => {
    const label = "Generating nice people";
    console.time(label);
    const persons = [];

    for (const fname of fnames) {
        for (const lname of lnames) {
            persons.push({
                firstName: fname,
                lastName: lname,
                age: randTo(100)
            });
        }
    }
    console.timeEnd(label);
    return persons;
}

// generates fnames.length * lnames.lenght people (400.000 objects)
// the objects are created piecemeal, and have random property order
const getBadPeople = () => {
    const label = "Generating bad people";
    console.time(label);
    const persons = [];

    for (const fname of fnames) {
        for (const lname of lnames) {
            const order = getOrder();
            const person = {};
            for (const index of order) {
                if (index === 0) person.firstName = fname;
                if (index === 1) person.lastName = lname;
                if (index === 2) person.age = randTo(100);
            }

            persons.push(person);
        }
    }
    console.timeEnd(label);
    return persons;
}

// generates fnames.length * lnames.lenght people (400.000 objects)
// the objects are created piecemeal, and have random property order AND random property names
const getAwfulPeople = () => {
    const label = "Generating awful people";
    console.time(label);
    const persons = [];
    const propsNames = {
        firstName: ["firstName", "fname", "fName", "firstname", "name"],
        lastName: ["lastName", "lname", "lName", "lastname", "sname", "surname"]
    };

    for (const fname of fnames) {
        for (const lname of lnames) {
            const order = getOrder();
            const person = {};
            for (const index of order) {
                if (index === 0) {
                    person[propsNames.firstName[randTo(propsNames.firstName.length)]] = fname;
                }
                if (index === 1) {
                    person[propsNames.lastName[randTo(propsNames.lastName.length)]] = lname;
                }
                if (index === 2) person.age = randTo(100);
            }
            persons.push(person);
        }
    }
    console.timeEnd(label);
    return persons;
}

// calculates average of an array of persons. It only accesses the age property
const getAverageAge = (persons) => {
    const label = "Calculating average age"
    console.time(label);
    let totalAge = 0;
    for (const person of persons) {
        totalAge += person.age;
    }
    const result = totalAge / persons.length;
    console.timeEnd(label);
}

const runCalculations = () => {
    const nice = getNicePeople();
    const bad = getBadPeople();
    const awful = getAwfulPeople();
    getAverageAge(nice);
    getAverageAge(bad);
    getAverageAge(awful);
}

// compares generating of full objects in one expression, and piecemeal generation of the same objects
const constructionDifferences = () => {
    (() => {
        const label = "Creating with full objects";
        console.time(label);
        const persons = [];

        for (const fname of fnames) {
            for (const lname of lnames) {
                const person = {
                    firstName: fname,
                    lastName: lname,
                    age: randTo(100),
                }
                persons.push(person);
            }
        }
        console.timeEnd(label);
    })();

    (() => {
        const label = "Creating with property settings";
        console.time(label);
        const persons = [];

        for (const fname of fnames) {
            for (const lname of lnames) {
                const person = {};
                person.firstName = fname;
                person.lastName = lname;
                person.age = randTo(100);
                persons.push(person);
            }
        }
        console.timeEnd(label);
    })();
}

// compares execution with a single all-purpose method vs execution by separate method per data type
// note that this example needs to run warm vis-a-vis the getNicePeople call
// otherwise the optimization of that call will heavily skew the results
const morphicDemos = () => {
    (() => {
        const label = "Polymorphic add";
        console.time(label);
        // just one function for adding all types of data
        const add = (x, y) => x + y;
        const nices = getNicePeople();
        const results = nices.map(p => ({
            fullName: add(p.firstName, p.lastName),
            nextAge: add(p.age, 1)
        }));
        console.timeEnd(label);
    })();

    (() => {
        const label = "Monomorphic add";
        console.time(label);
        // identical functions, but one is ONLY used to add numbers, and the other is used to add strings
        const addNumber = (x, y) => x + y;
        const addString = (x, y) => x + y;
        const nices = getNicePeople();
        const results = nices.map(p => ({
            fullName: addString(p.firstName, p.lastName),
            nextAge: addNumber(p.age, 1)
        }));
        console.timeEnd(label);
    })();
}