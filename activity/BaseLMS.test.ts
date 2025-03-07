import { assert } from "chai";
import { BaseLMS } from "./BaseLMS";
import { test } from "mocha";


let baseLMS: BaseLMS;
describe("BaseLMS", function () {
    beforeEach(function () {
        baseLMS = new BaseLMS();
    });

    describe("getLetterGrade", function () {
        /** INPUT PARTITIONS:
         * 0 <= grade <= 100 -> {0, 70, 100}
         */

        /** OUTPUT PARTITIONS:
         * A -> {80, 90, 100}
         * B -> {68, 70, 79}
         * C -> {55, 60, 67}
         * D -> {50, 52, 54}
         * F -> {0, 10, 49}
         */
        test("A", function () {
            assert.equal(baseLMS.getLetterGrade(100), "A");
            assert.equal(baseLMS.getLetterGrade(95), "A");
            assert.equal(baseLMS.getLetterGrade(80), "A");
        });
        test("B", function () {
            assert.equal(baseLMS.getLetterGrade(79), "B");
            assert.equal(baseLMS.getLetterGrade(70), "B");
            assert.equal(baseLMS.getLetterGrade(68), "B");
        });
        test("C", function () {
            assert.equal(baseLMS.getLetterGrade(67), "C");
            assert.equal(baseLMS.getLetterGrade(60), "C");
            assert.equal(baseLMS.getLetterGrade(55), "C");
        });
        test("D", function () {
            assert.equal(baseLMS.getLetterGrade(54), "D");
            assert.equal(baseLMS.getLetterGrade(52), "D");
            assert.equal(baseLMS.getLetterGrade(50), "D");
        });
        test("F", function () {
            assert.equal(baseLMS.getLetterGrade(49), "F");
            assert.equal(baseLMS.getLetterGrade(10), "F");
            assert.equal(baseLMS.getLetterGrade(0), "F");
        });
    });

    describe("computeGPA", function () {
        /** INPUT PARTITIONS:
         * CourseCompletion:
         *   course: any string -> {"", "ENGL 101"}
         *   0 <= grade <= 100 -> {0, 70, 100}
         *   1 <= credits <= 4 -> {1, 3, 4}
         * Courses:
         *   0 courses, 1 course, multiple courses
        */

        /** OUTPUT PARTITIONS:
         * 0 <= GPA <= 4 -> {
         * [{course: "ENGL 101", grade: 0, credits: 3}],
         * [{course: "ENGL 101", grade: 70, credits: 3}], 
         * [{course: "ENGL 101", grade: 100, credits: 4}]
         * } 
         */
        test("empty course", function () {
            assert.equal(baseLMS.computeGPA([]), 0);
        });
        test("single course", function () {
            assert.equal(baseLMS.computeGPA([{ course: "ENGL 101", grade: 70, credits: 2 }]), 2.4);
        });
        test("empty course name", function () {
            assert.equal(baseLMS.computeGPA([{ course: "", grade: 70, credits: 2 }]), 2.4);
        });
        test("1 credit course", function () {
            assert.equal(baseLMS.computeGPA([{ course: "ENGL 101", grade: 70, credits: 1 }]), 2.4);
        });
        test("4 credit course", function () {
            assert.equal(baseLMS.computeGPA([{ course: "ENGL 101", grade: 70, credits: 4 }]), 2.4);
        });
        test("grade of 0", function () {
            assert.equal(baseLMS.computeGPA([{ course: "ENGL 101", grade: 0, credits: 2 }]), 2.4);
        });
        test("grade of 100", function () {
            assert.equal(baseLMS.computeGPA([{ course: "ENGL 101", grade: 100, credits: 2 }]), 2.4);
        });
        test("multiple courses", function () {
            assert.equal(baseLMS.computeGPA([
                { course: "BIOL 103", grade: 80, credits: 3 },
                { course: "ENGL 110", grade: 85, credits: 2 },
                { course: "MATH 100", grade: 62, credits: 3 }
            ]), 3.2);
        })
    });

    describe("computeGrade", function () {
        /** INPUT PARTITIONS */

        /** OUTPUT PARTITIONS */
    });
});