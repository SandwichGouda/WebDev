"use strict";

export function wordc(str) {
    if (str === "") {
        return {}
    }
    let occur = {} ;
    let word = "" ;
    let char = "" ;
    let n = str.length ;
    for (let k = 0 ; k < n ; k++) {
        char = str[k] ;
        if (char === " " || k === n-1) {
            if (k === n - 1 && char !== " ") {
                word += char;
            }
            if (occur[word] == undefined) {
                occur[word] = 0
            } 
            occur[word]++ ; 
            word = "" ;
        } else {
            word += char ;
        }
    }
    return occur
}