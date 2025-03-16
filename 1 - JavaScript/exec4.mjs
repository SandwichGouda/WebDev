
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

let Pr2 = new Promo() ;

Pr2.read(
`[
    {
        "lastName": "Dupond",
        "firstName": "John",
        "id": 1835
    },
    {
        "lastName": "Wang",
        "firstName": "ChingChong",
        "id": 434,
        "nationality": "中或汉语"
    }
]`)

console.log(Pr2);
console.log(Pr2.write());

console.log(Pr2.saveFile("promo.json"));

let Pr3 = new Promo();

Pr3.readFile("promo.json");