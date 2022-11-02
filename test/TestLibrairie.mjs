// @AUTHOR : Adrien Schloesser - Pruliere Justine - Chevaleyre Antoine - 2022
// @DATE : 2022-10-14

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

export function assertTrue(expected, message) {
    assert(expected === true, message + " : " + expected + " !== true");
}

export function assertFalse(expected, message) {
    assert(expected === false, message + " : " + expected + " !== false");
}

export function assertEquals(expected, actual, message) {
    assert(expected === actual, message + " : " + expected + " != " + actual);
}

export function assertNotEquals(expected, actual, message) {
    assert(expected !== actual, message + " : " + expected + " === " + actual);
}

export function assertJson(expected, actual, message) {
    assert(JSON.stringify(expected) === JSON.stringify(actual), message + " : " + JSON.stringify(expected) + " !== " + JSON.stringify(actual));
}

export function assertArray(expected, actual, message) {
    assert(expected.length === actual.length, message + " : " + expected.length + " !== " + actual.length);
    for (let i = 0; i < expected.length; i++) {
        assert(expected[i] === actual[i], message + " : " + expected + " !== " + actual);
    }
}

export function assertArrayJson(expected, actual, message) {
    assert(expected.length === actual.length, message + " : " + expected.length + " !== " + actual.length);
    for (let i = 0; i < expected.length; i++) {
        assert(JSON.stringify(expected[i]) === JSON.stringify(actual[i]), message + " : " + JSON.stringify(expected[i]) + " !== " + JSON.stringify(actual[i]));
    }
}

export function assertInArray(array, value , message) {
    assert(findInArray(value, array), message + " : " + value + " not in  " + JSON.stringify(array));
}

export function assertNotInArray(array, value , message) {
    assert(!findInArray(value, array), message + " : " + value + " in " + JSON.stringify(array));
}

export function assertEmptyArray(array, message) {
    assert(array.length === 0, message + " : " + array.length + " !== 0");
}

export function assertNotEmptyArray(array, message) {
    assert(array.length !== 0, message + " : " + array.length + " === 0");
}

export function assertNull(value, message) {
    assert(value === null, message + " : " + value + " !== null");
}

export function assertNotNull(value, message) {
    assert(value !== null, message + " : " + value + " === null");
}


export function launchTest(array){
    let tabReussis = [];
    let tabEchecs = [];

    array.forEach((func) => {
    try {
        func();
        tabReussis.push(func.name);
    } catch (e) {
        tabEchecs.push(func.name + " : " + e);
    }
    });

    let TestSuccess = tabReussis.join("\n ");
    let TestFail = tabEchecs.join("\n ");
    let phraseReussis = `✓ Test reussis:\n ${TestSuccess}`;
    let phraseEchecs = `✗ Test echecs:\n ${TestFail}`;
    if(tabEchecs.length > 0){
        console.log(phraseEchecs);
    }
    if(tabReussis.length > 0){
        console.log(phraseReussis);
    }
}

function findInArray(value, array) {
    for (let i = 0; i < array.length; i++) {
        if (JSON.stringify(array[i]) === JSON.stringify(value)) {
            return true;
        }
    }
    return false;
}