import {ForeignStud, Stud} from "./exercise3.mjs"
import {Promo} from "./exercise4.mjs"
import fs from "fs";


var student = new Stud("Dupond", "John", 1835);
var Fstudent = new ForeignStud("Wang", "ChingChong", 434, "中或汉语");

var Pr = new Promo ;

Pr.add(student);
Pr.add(Fstudent);
// console.log(Pr.size())
// console.log(Pr.get(1))
// console.log(Pr.get(2))
// console.log(Pr)
// Pr.print()
// console.log(Pr.print())
// console.log(Pr.write());