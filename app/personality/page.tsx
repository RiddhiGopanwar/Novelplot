"use client";

import { useEffect, useRef, useState } from "react";
import {
  QUIZ_QUESTIONS,
  QUIZ_PERSONALITIES,
  QuizOption,
  computeQuizResult,
} from "@/lib/quiz";
import { getSavedPersonality, savePersonalityResult, SavedPersonality } from "@/lib/storage";

export default function PersonalityPage() {
  // -1 = quiz not started yet, 0..N-1 = current question index, N = finished.
  // Using -1 (instead of 0) as the "not started" sentinel matters: if this
  // started at 0, clicking "Start the Quiz" would call setStep(0) on an
  // already-0 value, which React treats as a no-op and never re-renders.
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [savedResult, setSavedResult] = useState<SavedPersonality | null>(null);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const hasSavedThisRun = useRef(false);

  const started = step >= 0;
  const finished = step >= QUIZ_QUESTIONS.length;

  useEffect(() => {
    getSavedPersonality().then((res) => {
      setSavedResult(res);
      setLoadingSaved(false);
    });
  }, []);

  // Save the freshly computed result to the logged-in user's profile as
  // soon as the quiz is finished, once per completed run.
  useEffect(() => {
    if (!finished || hasSavedThisRun.current) return;
    hasSavedThisRun.current = true;
    const { trait, reasons } = computeQuizResult(answers);
    savePersonalityResult(trait, reasons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function choose(option: QuizOption) {
    const next = [...answers, option];
    setAnswers(next);
    setStep(step + 1);
  }

  function restart() {
    setAnswers([]);
    setSavedResult(null);
    hasSavedThisRun.current = false;
    setStep(-1);
  }

  if (loadingSaved) {
    return null;
  }

  // A previously saved result, shown without retaking the quiz.
  if (savedResult && !started) {
    const personality = QUIZ_PERSONALITIES[savedResult.trait as keyof typeof QUIZ_PERSONALITIES];
    if (personality) {
      return (
        <div className="flex flex-col gap-10">
          <div>
            <span className="eyebrow">🔮 your result</span>
            <h1 className="font-display text-3xl font-bold text-plum">Reading Personality</h1>
          </div>

          <section className="paper-grid relative overflow-hidden rounded-cozy border-2 border-plum bg-coffee px-6 py-14 text-center shadow-pop sm:px-12">
            <div className="absolute left-8 top-6 h-20 w-20 animate-float rounded-full bg-cream/20 blur-lg" />
            <div className="absolute bottom-6 right-10 h-16 w-16 animate-drift rounded-full bg-cream/20 blur-lg" />
            <div className="relative mx-auto flex max-w-md flex-col items-center gap-3">
              <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-plum bg-cream text-5xl shadow-pop-sm">
                {personality.emoji}
              </span>
              <span className="eyebrow text-cream/80">you are...</span>
              <h2 className="font-display text-4xl font-black text-cream">
                {personality.name}
              </h2>
              <p className="text-sm text-cream/85">{personality.description}</p>
            </div>
          </section>

          {savedResult.reasons.length > 0 && (
            <section className="card flex flex-col gap-3 p-6">
              <h3 className="font-display text-lg font-semibold text-plum">
                Why you got this result
              </h3>
              <p className="text-sm text-plum-soft">
                A few of your answers pointed straight here:
              </p>
              <ul className="flex flex-col gap-2">
                {savedResult.reasons.map((r) => (
                  <li
                    key={r}
                    className="rounded-xl border-2 border-plum/15 bg-cream px-4 py-2 text-sm text-plum"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <button onClick={restart} className="btn-pill btn-pill-dot w-fit">
            Take the Quiz Again
          </button>

          <section className="flex flex-col gap-4">
            <h2 className="section-title">All reading personalities</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(Object.keys(QUIZ_PERSONALITIES) as (keyof typeof QUIZ_PERSONALITIES)[]).map(
                (key) => {
                  const p = QUIZ_PERSONALITIES[key];
                  return (
                    <div
                      key={key}
                      className={`card flex flex-col items-center gap-1.5 p-5 text-center ${
                        p.name === personality.name ? "ring-2 ring-red-deep" : ""
                      }`}
                    >
                      <span className="text-3xl">{p.emoji}</span>
                      <span className="font-display text-base text-plum">{p.name}</span>
                    </div>
                  );
                }
              )}
            </div>
          </section>
        </div>
      );
    }
  }

  if (finished) {
    const { personality, reasons } = computeQuizResult(answers);
    return (
      <div className="flex flex-col gap-10">
        <div>
          <span className="eyebrow">🔮 your result</span>
          <h1 className="font-display text-3xl font-bold text-plum">Reading Personality</h1>
        </div>

        <section className="paper-grid relative overflow-hidden rounded-cozy border-2 border-plum bg-coffee px-6 py-14 text-center shadow-pop sm:px-12">
          <div className="absolute left-8 top-6 h-20 w-20 animate-float rounded-full bg-cream/20 blur-lg" />
          <div className="absolute bottom-6 right-10 h-16 w-16 animate-drift rounded-full bg-cream/20 blur-lg" />
          <div className="relative mx-auto flex max-w-md flex-col items-center gap-3">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-plum bg-cream text-5xl shadow-pop-sm">
              {personality.emoji}
            </span>
            <span className="eyebrow text-cream/80">you are...</span>
            <h2 className="font-display text-4xl font-black text-cream">
              {personality.name}
            </h2>
            <p className="text-sm text-cream/85">{personality.description}</p>
          </div>
        </section>

        {reasons.length > 0 && (
          <section className="card flex flex-col gap-3 p-6">
            <h3 className="font-display text-lg font-semibold text-plum">
              Why you got this result
            </h3>
            <p className="text-sm text-plum-soft">
              A few of your answers pointed straight here:
            </p>
            <ul className="flex flex-col gap-2">
              {reasons.map((r) => (
                <li
                  key={r}
                  className="rounded-xl border-2 border-plum/15 bg-cream px-4 py-2 text-sm text-plum"
                >
                  {r}
                </li>
              ))}
            </ul>
          </section>
        )}

        <button onClick={restart} className="btn-pill btn-pill-dot w-fit">
          Take the Quiz Again
        </button>

        <section className="flex flex-col gap-4">
          <h2 className="section-title">All reading personalities</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(QUIZ_PERSONALITIES) as (keyof typeof QUIZ_PERSONALITIES)[]).map(
              (key) => {
                const p = QUIZ_PERSONALITIES[key];
                return (
                  <div
                    key={key}
                    className={`card flex flex-col items-center gap-1.5 p-5 text-center ${
                      p.name === personality.name ? "ring-2 ring-red-deep" : ""
                    }`}
                  >
                    <span className="text-3xl">{p.emoji}</span>
                    <span className="font-display text-base text-plum">{p.name}</span>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <span className="eyebrow">🔮 who are you as a reader</span>
          <h1 className="font-display text-3xl font-bold text-plum">Reading Personality</h1>
        </div>

        <section className="paper-grid relative flex flex-col items-center gap-5 overflow-hidden rounded-cozy border-2 border-plum bg-cream px-6 py-16 text-center shadow-pop sm:px-12">
          <span className="text-4xl">🪄</span>
          <h2 className="max-w-md font-display text-3xl font-black text-plum">
            Take the quiz to find your reading personality
          </h2>
          <p className="max-w-sm text-sm text-plum-soft">
            Five quick questions, no right answers. Just go with whatever
            sounds most like your kind of book night.
          </p>
          <button onClick={() => setStep(0)} className="btn-primary mt-2">
            Start the Quiz
          </button>
        </section>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[step];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="eyebrow">🔮 reading personality quiz</span>
        <h1 className="font-display text-3xl font-bold text-plum">
          Question {step + 1} of {QUIZ_QUESTIONS.length}
        </h1>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full border-2 border-plum bg-cream">
        <div
          className="h-full bg-red transition-all duration-500"
          style={{ width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <section className="paper-grid relative overflow-hidden rounded-cozy border-2 border-plum bg-coffee-soft px-6 py-12 shadow-pop sm:px-12">
        <h2 className="relative mb-6 text-center font-display text-2xl font-bold text-plum sm:text-3xl">
          {question.prompt}
        </h2>
        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
          {question.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => choose(opt)}
              className="card bg-cream p-5 text-left text-sm font-semibold text-plum transition-transform hover:-translate-y-1 hover:bg-red-soft"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
