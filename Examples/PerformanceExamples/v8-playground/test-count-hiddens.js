// use node --allow-natives-syntax .\test-count-hiddens.js to run this example

const {fnames,lnames} = require("./names");

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


const nicePeople = getNicePeople();
const badPeople = getBadPeople();
const awfulPeople = getAwfulPeople();

// very dirty function to attempt to get the number of distict hidden classes
const countTypes = (array) => {
    const typePatterns = [];
    for (const item of array) {
        const existing = typePatterns.some(pattern => %HaveSameMap(item, pattern));
        if (!existing) {
            typePatterns.push(item);
        }
    }
    return typePatterns.length;
}

console.log(`The nice people have a total of ${countTypes(nicePeople)} different hidden classes`);
console.log(`The bad people have a total of ${countTypes(badPeople)} different hidden classes`);
console.log(`The awful people have a total of ${countTypes(awfulPeople)} different hidden classes`);
