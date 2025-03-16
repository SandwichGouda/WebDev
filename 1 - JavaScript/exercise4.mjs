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
}