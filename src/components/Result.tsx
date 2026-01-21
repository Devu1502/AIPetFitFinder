import { PetMatch } from '../App';

type ResultProps = {
  pet: PetMatch;
  onRestart: () => void;
};

export default function Result({ pet, onRestart }: ResultProps) {
  return (
    <div className="min-h-screen flex flex-col px-6 py-8 max-w-md mx-auto">
      {/* Pet Name */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4">{pet.name}</h1>
        <p className="text-neutral-700 leading-relaxed">{pet.explanation}</p>
      </div>

      {/* Challenge Section */}
      <div className="mb-6 p-5 bg-white rounded-xl border border-neutral-200">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
          Challenge
        </h2>
        <p className="text-neutral-700">{pet.challenge}</p>
      </div>

      {/* Care Tip Section */}
      <div className="mb-8 p-5 bg-white rounded-xl border border-neutral-200">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
          Care Tip
        </h2>
        <p className="text-neutral-700">{pet.careTip}</p>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-all mt-auto"
      >
        Restart Quiz
      </button>
    </div>
  );
}
