
# AI Pet Fit Finder

This project is a small web application that helps users find a pet that best fits their lifestyle.  
The user answers a short quiz, and the app recommends a pet with an explanation, a challenge, and a care tip.

The goal of this project is to demonstrate clean frontend structure, clear decision logic, and how an AI-style system can be built step by step without complexity.

---

## What the App Does

1. The user answers questions about:
   - living environment
   - energy level
   - social preference
   - noise tolerance
   - daily time availability
   - allergies

2. After the quiz:
   - the app shows a loading screen
   - a recommendation is generated
   - the result screen explains why that pet fits the user

---

## How the Project Is Structured

The project is intentionally split into clear layers so each part has one responsibility.

### Frontend (UI)
- Built using React + TypeScript
- Components handle only rendering and user interaction
- Main screens:
  - Quiz
  - Loading
  - Result

### Types
- Shared data types live in `src/types/quiz.ts`
- This keeps the data model consistent across the app

### Logic Layer
- Pet matching logic lives in `src/logic/petMatcher.ts`
- Uses a scoring-based approach
- Each quiz answer adds or subtracts points for different pets
- The pet with the highest score is selected

This keeps the logic:
- deterministic
- easy to understand
- easy to extend

### API / Backend Simulation
- A mock API exists in `src/mock-api/recommendation.ts`
- The frontend calls this function asynchronously
- The response includes:
  - the recommendation result
  - a model version
  - a confidence value

This simulates how a real backend or AI service would behave without requiring a server.

---

## Why This Approach Was Used

- Keeps the UI clean and simple
- Separates decision logic from rendering
- Makes behavior transparent and explainable
- Allows future replacement of the logic with:
  - a machine learning model
  - an LLM-backed service
  - or a real backend API

The focus is correctness, clarity, and structure rather than complexity.

---

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS

---


  Run `npm run dev` to start the development server.
  