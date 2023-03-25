export type AnswersList = string[];

export interface Database {
    public: {
        Tables: {
            css_questions: {
                Row: {
                    answers: AnswersList | null;
                    correctAnswer: string | null;
                    question: string;
                };
                Insert: {
                    answers?: AnswersList | null;
                    correctAnswer?: string | null;
                    question: string;
                };
                Update: {
                    answers?: AnswersList | null;
                    correctAnswer?: string | null;
                    question?: string;
                };
            };
            html_questions: {
                Row: {
                    answers: AnswersList | null;
                    correctAnswer: string | null;
                    question: string;
                };
                Insert: {
                    answers?: AnswersList | null;
                    correctAnswer?: string | null;
                    question: string;
                };
                Update: {
                    answers?: AnswersList | null;
                    correctAnswer?: string | null;
                    question?: string;
                };
            };
            javascript_questions: {
                Row: {
                    answers: AnswersList | null;
                    correctAnswer: string | null;
                    question: string;
                };
                Insert: {
                    answers?: AnswersList | null;
                    correctAnswer?: string | null;
                    question: string;
                };
                Update: {
                    answers?: AnswersList | null;
                    correctAnswer?: string | null;
                    question?: string;
                };
            };
            sass_quiz: {
                Row: {
                    answers: AnswersList | null;
                    correctAnswer: string | null;
                    question: string;
                };
                Insert: {
                    answers?: AnswersList | null;
                    correctAnswer?: string | null;
                    question: string;
                };
                Update: {
                    answers?: AnswersList | null;
                    correctAnswer?: string | null;
                    question?: string;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
