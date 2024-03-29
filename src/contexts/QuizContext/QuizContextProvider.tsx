import { QuizContext } from './QuizContext';
import { PropsWithChildren, useState } from 'react';
import { PossibleQuizNames } from '@/types/SupabaseTypes';

export const QuizContextProvider = ({ children }: PropsWithChildren) => {
    const [currentQuizName, setCurrentQuizName] = useState<PossibleQuizNames>('');

    const stopQuiz = () => setCurrentQuizName('');

    const updateCurrentQuizName = (quizName: PossibleQuizNames) => {
        setCurrentQuizName(quizName);
    };

    return (
        <QuizContext.Provider
            value={{
                isQuizStarted: !!currentQuizName,
                currentQuizName,
                updateCurrentQuizName,
                stopQuiz
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
