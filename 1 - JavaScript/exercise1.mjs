"use strict";

// programming with a loop
export function fiboIt(n) {
    let a = 0;
    let b = 1;
    let c = 0;
    for (let k = 0 ; k < n ; k++) {
        c = a
        a = b
        b = c + b
    }
    return a
}

// recursive function
export function fibo_rec(n) {
    if (n === 0 || n === 1) {
        return n
    } else {
        return fibo_rec(n-1) + fibo_rec(n-2)
    }
}

// process array with a loop
export function fiboArr(t) {
    let arr = []
    let n = t.length
    for (let k of t) {
        arr.push(fibo_rec(k))
    }
    return arr
}

export function fiboArr2(t) {
    let arr = []
    for (let k of t) {
        arr.push(fibo_rec(k))
    }
    return arr
}

// using map
export function fibMap(t) {
    return t.map(fibo_rec)
}
