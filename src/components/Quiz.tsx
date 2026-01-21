import { useState } from 'react';
import { QuizAnswers } from '../App';

type Question = {
  id: keyof QuizAnswers;
  question: string;
  options: { value: string; label: string }[];
};

const questions: Question[] = [
  {
    id: 'environment',
    question: 'Do you prefer indoor or outdoor activities?',
    options: [
      { value: 'indoor', label: 'Indoor' },
      { value: 'outdoor', label: 'Outdoor' },
    ],
  },
  {
    id: 'energy',
    question: 'What is your energy level?',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    id: 'social',
    question: 'How would you describe your social style?',
    options: [
      { value: 'independent', label: 'Independent' },
      { value: 'balanced', label: 'Balanced' },
      { value: 'social', label: 'Social' },
    ],
  },
  {
    id: 'noise',
    question: 'What is your noise tolerance level?',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    id: 'time',
    question: 'How much daily time can you dedicate to pet care?',
    options: [
      { value: '<30 min', label: 'Less than 30 minutes' },
      { value: '30–60 min', label: '30–60 minutes' },
      { value: '60+ min', label: '60+ minutes' },
    ],
  },
  {
    id: 'allergies',
    question: 'Do you have allergies to furry pets?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
];

type QuizProps = {
  onComplete: (answers: QuizAnswers) => void;
};

export default function Quiz({ onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleAnswer = (questionId: keyof QuizAnswers, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Auto-advance to next question
    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 200);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      onComplete(answers);
    }
  };

  const isComplete = Object.keys(answers).length === questions.length;
  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Find Your Best Pet Fit</h1>
        <p className="text-neutral-600">
          Answer a few questions about your lifestyle and personality
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-900 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-neutral-500 mt-2">
          {Object.keys(answers).length} of {questions.length} answered
        </p>
      </div>

      {/* Questions */}
      <div className="flex-1 space-y-8 mb-8">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`transition-opacity duration-300 ${
              index <= currentStep ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}
          >
            <h2 className="text-lg mb-4">{question.question}</h2>
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className={`w-full px-5 py-4 rounded-xl border-2 transition-all text-left ${
                    answers[question.id] === option.value
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`w-full py-4 rounded-xl font-medium transition-all ${
          isComplete
            ? 'bg-neutral-900 text-white hover:bg-neutral-800'
            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
        }`}
      >
        Get My Match
      </button>
    </div>
  );
}
