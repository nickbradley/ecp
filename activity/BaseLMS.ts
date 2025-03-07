import { Assessment, CourseCompletion, LMS } from "./LMS";

export class BaseLMS implements LMS {
    getLetterGrade(grade: number): string {
        if (grade >= 0.8) {
            return "A";
        } else if (grade >= 0.68) {
            return "B";
        } else if (grade >= 0.55) {
            return "C";
        } else if (grade >= 0.5) {
            return "D";
        } else {
            return "F";
        }
    }
    
    computeGPA(completedCourses: CourseCompletion[]): number {
        let totalCredits = 0;
        let totalGradePoints = 0;
        for (let course of completedCourses) {
            totalCredits += course.credits;
            totalGradePoints += course.grade * course.credits;
        }
        return totalGradePoints / totalCredits;
    }

    computeGrade(assessments: Assessment[]): number {
        let totalPoints = 0;
        let totalMaxPoints = 0;
        for (let assessment of assessments) {
            totalPoints += assessment.points;
            totalMaxPoints += assessment.maxPoints;
        }
        return totalPoints / totalMaxPoints;
    }
}