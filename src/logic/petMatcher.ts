
/**
 * Recommendation logic implemented using explicit scoring rules.
 * Kept simple and interpretable so behavior is easy to reason about
 * and swap out later if needed.
 */

import type { QuizAnswers, PetMatch } from '../types/quiz';

type PetScore = PetMatch & { score: number };

function addScore(scores: PetScore[], name: PetMatch['name'], points: number) {
  const item = scores.find((p) => p.name === name);
  if (item) item.score += points;
}

export function calculatePetMatch(answers: QuizAnswers): PetMatch {
  const scores: PetScore[] = [
    {
      name: 'Cat',
      score: 0,
      explanation:
        "A cat fits you well. Cats thrive indoors, handle quiet routines, and suit people who prefer an independent companion with lower daily time needs.",
      challenge:
        "Cats can be selective about affection and may scratch furniture if they don't have proper outlets.",
      careTip:
        'Keep the litter box clean daily, provide scratching posts, and do 10–15 minutes of interactive play to prevent boredom.',
    },
    {
      name: 'Dog',
      score: 0,
      explanation:
        'A dog matches an active, social routine. Dogs reward consistency, love companionship, and fit people who can commit time for walks, training, and play.',
      challenge:
        "Dogs don't do well with long isolation and need daily exercise, attention, and structure.",
      careTip:
        'Create a daily routine: walk, short training, and one longer activity window. Consistency improves behavior and wellbeing.',
    },
    {
      name: 'Fish',
      score: 0,
      explanation:
        'Fish suit a low-noise, low-time lifestyle. They add a calming presence without requiring constant interaction, practical for busy schedules or allergy constraints.',
      challenge:
        'Water parameters must stay stable; tank maintenance is essential for healthy fish.',
      careTip:
        'Test water weekly, do regular partial water changes, and avoid overfeeding (it quickly degrades water quality).',
    },
    {
      name: 'Bird',
      score: 0,
      explanation:
        'A bird fits a balanced social style. Birds are engaging and intelligent and can thrive indoors with daily interaction and enrichment.',
      challenge:
        'Birds can be messy and many species are vocal, especially morning and evening.',
      careTip:
        'Provide enrichment (foraging toys), rotate toys weekly, and do daily social interaction to prevent stress behaviors.',
    },
    {
      name: 'Rabbit',
      score: 0,
      explanation:
        'A rabbit suits moderate energy and moderate daily time. Rabbits are gentle, can be social, and do best with a safe indoor area and consistent care.',
      challenge:
        'Rabbits chew and need rabbit-proofing; they can destroy cords fast.',
      careTip:
        'Unlimited hay, fresh greens, and at least an hour of supervised exercise outside the enclosure each day.',
    },
    {
      name: 'Reptile (Gecko or Bearded Dragon)',
      score: 0,
      explanation:
        'A reptile suits low-interaction preferences and allergy constraints. They are quiet, fascinating, and don’t require constant attention.',
      challenge:
        'Habitat setup matters: temperature gradient, humidity, and UV (for many species) must be correct.',
      careTip:
        'Use a thermometer at warm/cool zones, maintain UV/heat schedule, and follow species-specific diet and supplementation.',
    },
  ];

  if (answers.environment === 'indoor') {
    addScore(scores, 'Cat', 3);
    addScore(scores, 'Fish', 2);
    addScore(scores, 'Bird', 2);
    addScore(scores, 'Rabbit', 2);
    addScore(scores, 'Reptile (Gecko or Bearded Dragon)', 2);
  }
  if (answers.environment === 'outdoor') addScore(scores, 'Dog', 3);

  if (answers.energy === 'high') addScore(scores, 'Dog', 4);
  if (answers.energy === 'medium') {
    addScore(scores, 'Rabbit', 2);
    addScore(scores, 'Bird', 2);
    addScore(scores, 'Cat', 1);
  }
  if (answers.energy === 'low') {
    addScore(scores, 'Fish', 3);
    addScore(scores, 'Cat', 2);
    addScore(scores, 'Reptile (Gecko or Bearded Dragon)', 2);
  }

  if (answers.social === 'social') addScore(scores, 'Dog', 3);
  if (answers.social === 'balanced') {
    addScore(scores, 'Bird', 2);
    addScore(scores, 'Rabbit', 2);
    addScore(scores, 'Cat', 1);
  }
  if (answers.social === 'independent') {
    addScore(scores, 'Cat', 3);
    addScore(scores, 'Fish', 2);
    addScore(scores, 'Reptile (Gecko or Bearded Dragon)', 2);
  }

  if (answers.noise === 'low') {
    addScore(scores, 'Fish', 3);
    addScore(scores, 'Cat', 2);
    addScore(scores, 'Reptile (Gecko or Bearded Dragon)', 2);
    addScore(scores, 'Bird', -1);
  }
  if (answers.noise === 'high') {
    addScore(scores, 'Dog', 1);
    addScore(scores, 'Bird', 1);
  }

  if (answers.time === '<30 min') {
    addScore(scores, 'Fish', 4);
    addScore(scores, 'Cat', 2);
    addScore(scores, 'Reptile (Gecko or Bearded Dragon)', 2);
  }
  if (answers.time === '30–60 min') {
    addScore(scores, 'Cat', 2);
    addScore(scores, 'Rabbit', 2);
    addScore(scores, 'Bird', 2);
  }
  if (answers.time === '60+ min') addScore(scores, 'Dog', 4);

  if (answers.allergies === 'yes') {
    addScore(scores, 'Fish', 3);
    addScore(scores, 'Reptile (Gecko or Bearded Dragon)', 3);
    addScore(scores, 'Cat', -2);
    addScore(scores, 'Dog', -2);
    addScore(scores, 'Rabbit', -2);
  }

  scores.sort((a, b) => b.score - a.score);
  return scores[0];
}
