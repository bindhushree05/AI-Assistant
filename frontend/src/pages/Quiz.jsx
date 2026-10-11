import { useState } from 'react'

const questions = [
  // BIOLOGY
  {
    subject: 'Biology',
    question: 'Which organelle releases energy through cellular respiration?',
    choices: ['Ribosome', 'Mitochondrion', 'Vacuole', 'Cell wall'],
    answer: 1,
    note: 'Mitochondria release energy through cellular respiration.',
  },
  {
    subject: 'Biology',
    question: 'What is the basic unit of life?',
    choices: ['Tissue', 'Organ', 'Cell', 'Organism'],
    answer: 2,
    note: 'The cell is the basic unit of life.',
  },
  {
    subject: 'Biology',
    question: 'Which part of a plant absorbs water from the soil?',
    choices: ['Flower', 'Root', 'Stem', 'Leaf'],
    answer: 1,
    note: 'Roots absorb water and minerals from the soil.',
  },
  {
    subject: 'Biology',
    question: 'Which gas do plants absorb during photosynthesis?',
    choices: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
    answer: 2,
    note: 'Plants absorb carbon dioxide during photosynthesis.',
  },
  {
    subject: 'Biology',
    question: 'Which blood cells help fight infections?',
    choices: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
    answer: 1,
    note: 'White blood cells help fight infections.',
  },
  {
    subject: 'Biology',
    question: 'What molecule carries genetic information?',
    choices: ['ATP', 'DNA', 'Glucose', 'Protein'],
    answer: 1,
    note: 'DNA stores genetic information.',
  },

  // MATHEMATICS
  {
    subject: 'Mathematics',
    question: 'What are the solutions to x² − 5x + 6 = 0?',
    choices: ['x = 1 and 6', 'x = −2 and −3', 'x = 2 and 3', 'x = −1 and −6'],
    answer: 2,
    note: '(x − 2)(x − 3) = 0, so x = 2 and 3.',
  },
  {
    subject: 'Mathematics',
    question: 'What is 15 × 8?',
    choices: ['100', '110', '120', '130'],
    answer: 2,
    note: '15 × 8 = 120.',
  },
  {
    subject: 'Mathematics',
    question: 'What is the square root of 144?',
    choices: ['10', '11', '12', '14'],
    answer: 2,
    note: '12 × 12 = 144.',
  },
  {
    subject: 'Mathematics',
    question: 'What is the value of 2x + 4 when x = 3?',
    choices: ['8', '10', '12', '14'],
    answer: 1,
    note: '2(3) + 4 = 10.',
  },
  {
    subject: 'Mathematics',
    question: 'What is the area of a rectangle with length 8 cm and width 5 cm?',
    choices: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'],
    answer: 2,
    note: 'Area = 8 × 5 = 40 cm².',
  },
  {
    subject: 'Mathematics',
    question: 'What is 25% of 200?',
    choices: ['25', '40', '50', '75'],
    answer: 2,
    note: '25% of 200 = 50.',
  },

  // GEOGRAPHY
  {
    subject: 'Geography',
    question: 'What is a rain shadow?',
    choices: [
      'A wet region beside a river',
      'A dry area on the leeward side of a mountain',
      'A seasonal ocean current',
      'A cloud that forms over a forest',
    ],
    answer: 1,
    note: 'A rain shadow is a dry area on the leeward side of a mountain.',
  },
  {
    subject: 'Geography',
    question: 'Which is the largest continent?',
    choices: ['Africa', 'Asia', 'Europe', 'North America'],
    answer: 1,
    note: 'Asia is the largest continent.',
  },
  {
    subject: 'Geography',
    question: 'Which is the longest river in India?',
    choices: ['Yamuna', 'Ganga', 'Godavari', 'Narmada'],
    answer: 1,
    note: 'The Ganga is the longest river in India.',
  },
  {
    subject: 'Geography',
    question: 'Which layer of Earth do we live on?',
    choices: ['Core', 'Mantle', 'Crust', 'Outer core'],
    answer: 2,
    note: 'Humans live on the Earth’s crust.',
  },
  {
    subject: 'Geography',
    question: 'Which ocean is the largest?',
    choices: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    answer: 2,
    note: 'The Pacific Ocean is the largest ocean.',
  },
  {
    subject: 'Geography',
    question: 'What causes day and night?',
    choices: [
      "Earth's revolution",
      "Earth's rotation",
      "Moon's rotation",
      "Sun's movement",
    ],
    answer: 1,
    note: "Earth's rotation causes day and night.",
  },
]

function Quiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[index]

  function choose(choice) {
    if (selected !== null) return

    setSelected(choice)

    if (choice === question.answer) {
      setScore((value) => value + 1)
    }
  }

  function next() {
    if (index === questions.length - 1) {
      setFinished(true)
    } else {
      setIndex(index + 1)
      setSelected(null)
    }
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <main className="main-content">
      <header className="topbar">
        <div className="breadcrumb">
          Workspace <span>/</span> <strong>Practice quiz</strong>
        </div>

        <div className="topbar-actions">
          <span className="top-avatar">A</span>
        </div>
      </header>

      <div className="page-content tool-page">

        <section className="page-title-row">
          <div>
            <div className="eyebrow">QUICK KNOWLEDGE CHECK</div>

            <h1>
              Practice quiz<span>.</span>
            </h1>

            <p className="welcome-subtitle">
              Test yourself across Biology, Mathematics, and Geography.
            </p>
          </div>

          <span className="quiz-count">
            {questions.length} questions · 3 subjects
          </span>
        </section>

        <section className="quiz-card">

          {finished ? (
            <div className="quiz-finish">

              <span className="complete-mark">✳</span>

              <div className="section-kicker">
                QUIZ COMPLETE
              </div>

              <h2>
                {score} out of {questions.length} correct
              </h2>

              <p>
                {score === questions.length
                  ? 'Excellent work. You got everything right!'
                  : 'Nice effort. Review the explanations and try again.'}
              </p>

              <button
                className="primary-button"
                type="button"
                onClick={restart}
              >
                Try again <span>→</span>
              </button>

            </div>
          ) : (
            <>
              <div className="quiz-progress-row">

                <span>
                  QUESTION {index + 1} OF {questions.length}
                </span>

                <span className="quiz-subject">
                  {question.subject}
                </span>

              </div>

              <div className="quiz-progress">
                <span
                  style={{
                    width: `${((index + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              <h2 className="quiz-question">
                {question.question}
              </h2>

              <div className="quiz-choices">

                {question.choices.map((choice, choiceIndex) => (

                  <button
                    type="button"
                    key={choice}
                    className={`quiz-choice ${
                      selected === choiceIndex
                        ? choiceIndex === question.answer
                          ? 'correct'
                          : 'incorrect'
                        : ''
                    } ${
                      selected !== null &&
                      choiceIndex === question.answer
                        ? 'reveal-correct'
                        : ''
                    }`}
                    onClick={() => choose(choiceIndex)}
                  >

                    <span className="choice-letter">
                      {String.fromCharCode(65 + choiceIndex)}
                    </span>

                    {choice}

                    <span className="choice-mark">
                      {selected !== null &&
                      choiceIndex === question.answer
                        ? '✓'
                        : selected === choiceIndex
                        ? '×'
                        : ''}
                    </span>

                  </button>

                ))}

              </div>

              {selected !== null && (
                <div
                  className={`quiz-explanation ${
                    selected === question.answer ? 'right' : 'wrong'
                  }`}
                >
                  <strong>
                    {selected === question.answer
                      ? 'That’s right!'
                      : 'Not quite.'}
                  </strong>{' '}
                  {question.note}
                </div>
              )}

              <div className="quiz-footer">

                <span>
                  {score} correct so far
                </span>

                <button
                  className="primary-button"
                  type="button"
                  disabled={selected === null}
                  onClick={next}
                >
                  {index === questions.length - 1
                    ? 'See results'
                    : 'Next question'}

                  <span>→</span>
                </button>

              </div>
            </>
          )}

        </section>

        <footer className="page-footer">
          Practice makes progress <span>✳</span>
        </footer>

      </div>
    </main>
  )
}

export default Quiz