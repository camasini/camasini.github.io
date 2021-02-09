// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Add your functions below:
const makeNumberFromString = (arr, item) => {
    for (i = 0; i < item.length; i++) {
        let numbers = Number(item[i]);
        arr.push(numbers);
    }
}

const makeArrClone = arr => {
    let newArr = [];
    if (arr.length === 1 && typeof arr[0] === 'string') {
        makeNumberFromString(newArr, arr[0]);
    } else if (arr.length === 1 && typeof arr[0] === 'number') {
        arr[0] = arr[0].toString();
        makeNumberFromString(newArr, arr[0]);
    }
    else {
        newArr = arr.map(item => Number(item));
    }
    return newArr;
}

const lastIndexIsEven = arr => {
    //We don't need reverse arr at return, we just cheking array backward
    for (i = arr.length - 1; i >= 0; i--) {
        if (i % 2 !== 0) {
            arr[i] *= 2;
            if (arr[i] > 9) {
                arr[i] -= 9;
            }
        }
    }
}

const lastIndexIsOdd = arr => {
    for (i = arr.length - 1; i >= 0; i--) {
        if (i % 2 === 0) {
            arr[i] *= 2;
            if (arr[i] > 9) {
                arr[i] -= 9;
            }
        }
    }
}

const validateCred = arr => {
    let arrClone = makeArrClone(arr);
    let value = 0;
    const lastIndex = arrClone.length - 1;
    if (arrClone[0] !== undefined) {
        if (lastIndex % 2 !== 0) {
            lastIndexIsOdd(arrClone);
        } else {
            lastIndexIsEven(arrClone);
        }
        value = (arrClone.reduce((acc, val) => acc + val)) % 10 === 0 ? true : false;
    }
    else {
        value = false;
    }
    return value;
}

console.log('');
console.log('Check all card numbers if there is valid: ', '\n');
console.log('valid1: ', validateCred(valid1));
console.log('valid2: ', validateCred(valid2));
console.log('valid3: ', validateCred(valid3));
console.log('valid4: ', validateCred(valid4));
console.log('valid5: ', validateCred(valid5), '\n');

console.log('invalid1: ', validateCred(invalid1));
console.log('invalid2: ', validateCred(invalid2));
console.log('invalid3: ', validateCred(invalid3));
console.log('invalid4: ', validateCred(invalid4));
console.log('invalid5: ', validateCred(invalid5), '\n');

console.log('mystery1: ', validateCred(mystery1));
console.log('mystery2: ', validateCred(mystery2));
console.log('mystery3: ', validateCred(mystery3));
console.log('mystery4: ', validateCred(mystery4));
console.log('mystery5: ', validateCred(mystery5), '\n');

const findInvalidCards = arr => {
    const checkForAll = arr.map(item => validateCred(item));
    const newInvalidArr = [];
    for (i = 0; i < checkForAll.length; i++) {
        if (!checkForAll[i]) {
            newInvalidArr.push(arr[i].join(''));
        }
    }
    return newInvalidArr;
}

console.log('Invalid cards numbers: ', findInvalidCards(batch), '\n');

const idInvalidCardCompanies = arr => {
    const newIdInvalidArr = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i][0] === '3') {
            if (newIdInvalidArr.indexOf("Amex") === -1) {
                newIdInvalidArr.push('Amex');
            }
        } else if (arr[i][0] === '4') {
            if (newIdInvalidArr.indexOf("Visa") === -1) {
                newIdInvalidArr.push('Visa');
            }
        } else if (arr[i][0] === '5') {
            if (newIdInvalidArr.indexOf("Mastercard") === -1) {
                newIdInvalidArr.push('Mastercard');
            }
        } else if (arr[i][0] === '6') {
            if (newIdInvalidArr.indexOf("Discover") === -1) {
                newIdInvalidArr.push('Discover');
            }
        }
    }
    return newIdInvalidArr;
}

console.log('Companies that have mailed out cards with invalid numbers: ', idInvalidCardCompanies(findInvalidCards(batch)), '\n');

const allNumsIsStringArr = ['4', '5', '3', '9', '6', '7', '7', '9', '0', '8', '0', '1', '6', '8', '0', '8'];
const numsAndStringsArr = [3, 7, '1', 6, '1', '2', '0', '1', 9, '9', 8, '5', 2, '3', '6'];
const numsIsOneStringArr = ['4539404967869666'];
const allNumsInArrIsOneNum = [6011144340682905];


const allNumsIsStringInvArr = ['5', '7', '9', '5', '5', '9', '3', '3', '9', '2', '1', '3', '4', '6', '4', '3'];
const numsAndStringsInvArr = [6, '0', 1, '1', '1', 2, 7, 9, '6', 1, 7, 7, 7, '9', '3', '5'];
const numsIsOneStringInvArr = ['5382019772883854'];
const allNumsInInvArrIsOneNum = [375796084459914];

const emptyArr = [];

console.log('Myself idea for extended edition of this task: ', '\n');
console.log('All numbers in array is string, card number is valid: ', validateCred(allNumsIsStringArr));
console.log('Some numbers in array is string, rest is numbers, card number is valid: ', validateCred(numsAndStringsArr));
console.log('Array have one number as string, card number is valid: ', validateCred(numsIsOneStringArr));
console.log('All numbers in array is one number, card number is valid: ', validateCred(allNumsInArrIsOneNum), '\n');

console.log('All numbers in array is string, card number is invalid: ', validateCred(allNumsIsStringInvArr));
console.log('Some numbers in array is string, rest is numbers, card number is invalid: ', validateCred(numsAndStringsInvArr));
console.log('Array have one number as string, card number is invalid: ', validateCred(numsIsOneStringInvArr));
console.log('All numbers in array is one number, card number is invalid: ', validateCred(allNumsInInvArrIsOneNum));
console.log('Array is empty, so valid will be false: ', validateCred(emptyArr));