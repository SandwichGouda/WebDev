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

