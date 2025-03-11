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

export class WrdLst {
    constructor(str) {
        this.str = str;
    }
    getWords() {
        let t = [];
        for (let word in wordc(this.str)) {
            if (!t.includes(word)) {
                t.push(word);
            }
        }
        t.sort();
        return t
    }

    maxCountWord() {
        let max = 0;
        let wc = wordc(this.str);
        for (let wd in wc) {
            if (wc[wd] > max) {
                max = wc[wd];
            }
        }
        
        let argmax = [];
        for (let wd in wc) {
            if (wc[wd] === max) {
                argmax.push(wd)
            }
        }
        argmax.sort();
        return argmax[0]
    }

    minCountWord() {
        let wc = wordc(this.str);
        
        let min = 0 ;
        for (let wd in wc) {
            min = wc[wd];
            break;
        }

        for (let wd in wc) {
            if (wc[wd] < min) {
                min = wc[wd];
            }
        }
        
        let argmin = [];
        for (let wd in wc) {
            if (wc[wd] === min) {
                argmin.push(wd)
            }
        }
        argmin.sort();
        return argmin[0]
    }

    getCount(word) {
        let wc = wordc(this.str);
        return wc[word]
    }

    applyWordFunc(f) {
        let wc = this.getWords();
        let t = [];
        for (let word of wc) {
            t.push(f(word))
        }
        return t
    }

    /*
    applyFunc(f) {
            let wc = this.getWords();
            let t = [];
            let n = wc.length;
            for (let k = 0 ; k < n ; k++) {
                t.push(f(wc[k]))
            }
            return t
        }
    */
}