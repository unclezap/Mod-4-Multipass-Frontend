export type User = {
    username: string
    id: number
}

export type Quiz = {
    /** Text description of quiz created by user */
    description?: string
    /** ID of user that created quiz */
    userId: number
    /** Quizzes are sorted into different user-created categories */
    category?: string
    /** Quizzes can be set to private or public */
    private: boolean
    /** User-created title for quiz*/
    title: string
    /** ID generated at time of creation*/
    id: number
}

export type Score = {
    /**ID of user that scored this score */
    userId: number
    /**ID of quiz this score was created on */
    quizId: number
    /** Number of answers user got correct */
    score: number
    /** This own record's id */
    id: number
    /** Date this score's quiz was created by quiz author */
    date: string
}