
import {wordc,WrdLst} from "./exercise2.mjs"

console.log(wordc("fish bowl fish bowl fish"))

let a = new WrdLst("fish bowl fish bowl fish")
console.log(a.getWords())

console.log(a.maxCountWord())

console.log(a.minCountWord())

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
}