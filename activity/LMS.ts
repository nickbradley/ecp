export interface Assessment {
    /** A unique identifier for the assessment. */
    id: string;
    /** Contribution of assessement to overall course grade. Value between 0 and 1. */
    weight: number;
    /** Points earned on the assessment. */
    points: number;
    /** Maximum points possible on the assessment. */
    maxPoints: number;
}

export interface CourseCompletion {
    /** A course identifier. */
    course: string;
    /** A natural number between 0 and 100 inclusive. */
    grade: number;
    /** A natural number between 1 and 4. */
    credits: number;
}

/**
 * A very basic Learning Management System (LMS).
 * These methods comprise the core functionality of the LMS.
 */
export interface LMS {
     /**
     * Computes a letter grade based on a percentage grade.
     * REQUIRES: A percentage grade between 0 and 100.
     * EFFECTS: Returns a letter grade based on the percentage grade.
     * A: 80--100, B: 68--79, C: 55--67, D: 50--54, F: 0--49
     */
     getLetterGrade(grade: number): string;

    /**
     * Computes a student's GPA based on a list of completed courses.
     * REQUIRES: A list of completed courses with grades between 0 and 100 and credits between 1 and 4.
     * EFFECTS: Returns a number between 0 and 4 representing the GPA.
     */
    computeGPA(completedCourses: CourseCompletion[]): number;

    /**
     * Computes a student's overall grade for a course based on a set of assessments.
     * REQUIRES: A list of assessments with non-negative weights that sum to 1.
     * EFFECTS: Returns a number between 0 and 100 representing the overall grade.
     *          Throws an error if points > maxPoints for any assessment.
     */
    computeGrade(assessments: Assessment[]): number;
}