"use strict";

import {Stud, ForeignStud} from "./exercise3.mjs";
import fs from "fs";

export class Promo {
    constructor() {
        this.students = [];
    }

    add(student) {
        this.students.push(student);
    }

    size() {
        return this.students.length
    }

    get(i) {
        return this.students[i]
    }

    print() {
        let str = "";
        for (let student of this.students) {
            str += student.toString()+"\n";
        }
        str = str.slice(0,-1);
        console.log(str);
        return str
    }

    write() {
        return JSON.stringify(this.students, null, 2);
    }

    read(str) {
        this.students = [];
    
        let parsedArray = JSON.parse(str); // Parse JSON into an array of plain objects
    
        for (let obj of parsedArray) {
            let student;
            if (obj.nationality) { 
                student = new ForeignStud(obj.lastName, obj.firstName, obj.id, obj.nationality);
            } else {
                // Otherwise, it's a Stud
                student = new Stud(obj.lastName, obj.firstName, obj.id);
            }
            this.students.push(student); // Add the reconstructed student
        }
    }

    saveFile(fileName) {
        try {
            fs.writeFileSync(fileName, this.write(), "utf-8");
            console.log(`Promotion saved to ${fileName}`);
        } catch (error) {
            console.error(`Error saving file: ${error.message}`);
        }
    }

    readFile(fileName) {
        try {
            let data = fs.readFileSync(fileName, "utf-8");
            this.read(data);
            console.log(`Promotion loaded from ${fileName}`);
        } catch (error) {
            console.error(`Error reading file: ${error.message}`);
        }
    }
}