
import {ForeignStud, Stud} from "./exercise3.mjs"

var student = new Stud("Dupond", "John", 1835);

console.log(student)
console.log(student.toString())

var Fstudent = new ForeignStud("Wang", "ChingChong", 434, "中文汉语");


console.log(Fstudent)
console.log(Fstudent.toString())