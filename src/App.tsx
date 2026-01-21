import { useState } from 'react';
import Quiz from './components/Quiz';
import Loading from './components/Loading';
import Result from './components/Result';

import type { QuizAnswers, PetMatch } from './types/quiz';
import { recommendPetAPI } from './mock-api/recommendation';

export default function App() {
  const [screen, setScreen] = useState<'quiz' | 'loading' | 'result'>('quiz');
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [petMatch, setPetMatch] = useState<PetMatch | null>(null);

  const handleQuizComplete = async (quizAnswers: QuizAnswers) => {
    setAnswers(quizAnswers);
    setScreen('loading');

    const response = await recommendPetAPI(quizAnswers);

    setPetMatch(response.result);
    setScreen('result');
  };

  const handleRestart = () => {
    setAnswers({});
    setPetMatch(null);
    setScreen('quiz');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {screen === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {screen === 'loading' && <Loading />}
      {screen === 'result' && petMatch && (
        <Result pet={petMatch} onRestart={handleRestart} />
      )}
    </div>
  );
}
