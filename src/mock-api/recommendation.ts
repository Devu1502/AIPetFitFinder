import type { QuizAnswers } from '../types/quiz';
import { calculatePetMatch } from '../logic/petMatcher';

export async function recommendPetAPI(answers: QuizAnswers) {
  return {
    modelVersion: 'rule-v1',
    confidence: 0.78,
    result: calculatePetMatch(answers),
  };
}
