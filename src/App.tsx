import { useState } from 'react';
import Quiz from './components/Quiz';
import Loading from './components/Loading';
import Result from './components/Result';

export type QuizAnswers = {
  environment?: string;
  energy?: string;
  social?: string;
  noise?: string;
  time?: string;
  allergies?: string;
};

export type PetMatch = {
  name: string;
  explanation: string;
  challenge: string;
  careTip: string;
};

export default function App() {
  const [screen, setScreen] = useState<'quiz' | 'loading' | 'result'>('quiz');
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [petMatch, setPetMatch] = useState<PetMatch | null>(null);

  const handleQuizComplete = (quizAnswers: QuizAnswers) => {
    setAnswers(quizAnswers);
    setScreen('loading');
    
    // Simulate AI processing
    setTimeout(() => {
      const match = calculatePetMatch(quizAnswers);
      setPetMatch(match);
      setScreen('result');
    }, 2000);
  };

  const handleRestart = () => {
    setAnswers({});
    setPetMatch(null);
    setScreen('quiz');
  };

  const calculatePetMatch = (answers: QuizAnswers): PetMatch => {
    const { environment, energy, social, noise, time, allergies } = answers;

    // Cat - good for indoor, independent, lower time commitment
    if (
      environment === 'indoor' &&
      social === 'independent' &&
      time === '<30 min'
    ) {
      return {
        name: 'Cat',
        explanation: 'A cat is perfect for you! Cats are independent, low-maintenance companions that thrive indoors. They match your lifestyle preference for quieter, more autonomous pets that don\'t require constant attention.',
        challenge: 'Cats can be aloof at times and may not always seek your affection on your schedule.',
        careTip: 'Provide a clean litter box daily and set aside 10-15 minutes for interactive play to keep them mentally stimulated.',
      };
    }

    // Dog - high energy, social, outdoor
    if (
      (energy === 'high' || energy === 'medium') &&
      social === 'social' &&
      time === '60+ min'
    ) {
      return {
        name: 'Dog',
        explanation: 'A dog is your ideal match! Dogs are social, energetic companions that love spending time with their humans. Your active lifestyle and availability make you well-suited for the commitment a dog requires.',
        challenge: 'Dogs need daily exercise, training, and companionship—they don\'t do well being left alone for long periods.',
        careTip: 'Establish a consistent daily routine for walks, feeding, and playtime to keep your dog happy and healthy.',
      };
    }

    // Fish - low time, low noise, indoor
    if (
      time === '<30 min' &&
      noise === 'low' &&
      (allergies === 'yes' || environment === 'indoor')
    ) {
      return {
        name: 'Fish',
        explanation: 'Fish are an excellent choice for you! They provide a calming presence without demanding much time or creating noise. Perfect for someone who wants the joy of caring for pets without the high maintenance.',
        challenge: 'Fish require careful attention to water quality and temperature—tank maintenance is crucial.',
        careTip: 'Test water parameters weekly and stick to a regular feeding schedule (once or twice daily, no overfeeding).',
      };
    }

    // Bird - social but moderate, indoor
    if (
      social === 'balanced' &&
      environment === 'indoor' &&
      noise === 'medium'
    ) {
      return {
        name: 'Bird',
        explanation: 'A bird suits you well! Birds are engaging, social creatures that can adapt to indoor living. They offer companionship without being overly demanding, fitting nicely into a balanced lifestyle.',
        challenge: 'Birds can be messy and some species are quite vocal, especially in the morning and evening.',
        careTip: 'Spend time daily talking to and interacting with your bird—they thrive on mental stimulation and social interaction.',
      };
    }

    // Rabbit - moderate energy, indoor/outdoor, moderate time
    if (
      energy === 'medium' &&
      time === '30–60 min' &&
      social === 'balanced'
    ) {
      return {
        name: 'Rabbit',
        explanation: 'A rabbit is a great fit for your lifestyle! Rabbits are gentle, moderately social pets that enjoy interaction but also appreciate their independence. They can adapt to both indoor and outdoor environments.',
        challenge: 'Rabbits need rabbit-proofed spaces and can be destructive chewers if not properly supervised.',
        careTip: 'Provide daily hay, fresh vegetables, and at least an hour of supervised exercise outside their enclosure.',
      };
    }

    // Reptile (Gecko/Bearded Dragon) - low energy, independent, allergies
    if (
      allergies === 'yes' &&
      (energy === 'low' || social === 'independent')
    ) {
      return {
        name: 'Reptile (Gecko or Bearded Dragon)',
        explanation: 'A reptile is perfect for you! Reptiles like geckos or bearded dragons are hypoallergenic, low-energy pets that don\'t require constant interaction. They\'re fascinating to observe and care for.',
        challenge: 'Reptiles need specific temperature and humidity levels—setup and equipment can be costly initially.',
        careTip: 'Maintain proper heat gradients and UV lighting, and research your specific reptile\'s dietary needs carefully.',
      };
    }

    // Default: Cat (most versatile pet)
    return {
      name: 'Cat',
      explanation: 'A cat is a wonderful match for you! Cats are adaptable, independent companions that fit well into various lifestyles. They offer affection on their terms and don\'t require as much daily commitment as some other pets.',
      challenge: 'Cats can be selective about affection and may scratch furniture if not provided with proper outlets.',
      careTip: 'Keep the litter box clean, provide scratching posts, and schedule annual vet checkups to ensure good health.',
    };
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
