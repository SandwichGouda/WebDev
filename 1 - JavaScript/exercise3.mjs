"use strict";


export class Stud {
    constructor(lastName, firstName, id) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.id = id;
    }

    toString() {
        return "student: "+this.lastName+", "+this.firstName+", "+this.id
    }
}
