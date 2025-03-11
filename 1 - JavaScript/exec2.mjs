
import {wordc,WrdLst} from "./exercise2.mjs"

console.log(wordc("fish bowl fish bowl fish"))

let a = new WrdLst("fish bowl fish bowl fish")
console.log(a.getWords())

console.log(a.maxCountWord())

console.log(a.minCountWord())

console.log(a.getCount("fish"))

console.log(a.getCount("bowl"))

console.log(a.applyFunc((x) => x[0]))