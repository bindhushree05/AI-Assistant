import { useState } from 'react'

function makeCard(front, back, acceptedAnswers) {
	return { front, back, acceptedAnswers }
}

const initialDecks = [
	{
		id: 'biology', title: 'Cell Biology', subject: 'Biology', studied: 'Today', color: 'deck-green',
		cards: [
			makeCard('What is the primary role of mitochondria?', 'They produce most of the energy a cell needs through cellular respiration.', ['produce energy', 'cellular respiration']),
			makeCard('What surrounds and protects a plant cell?', 'The cell wall, a rigid layer outside the cell membrane.', ['cell wall']),
			makeCard('Where does photosynthesis happen?', 'In chloroplasts, which contain the pigment chlorophyll.', ['chloroplasts', 'chloroplast']),
			makeCard('What does the cell membrane do?', 'It forms a selectively permeable boundary that controls what enters and leaves the cell.', ['controls what enters and leaves the cell', 'selectively permeable']),
			makeCard('What is one key difference between prokaryotic and eukaryotic cells?', 'Eukaryotic cells have a membrane-bound nucleus; prokaryotic cells do not.', ['eukaryotic cells have a nucleus', 'prokaryotes do not have a nucleus']),
			makeCard('What is the role of ribosomes?', 'They build proteins by joining amino acids according to genetic instructions.', ['build proteins', 'protein synthesis']),
			makeCard('Where is most of a eukaryotic cell’s DNA stored?', 'In the nucleus.', ['nucleus']),
			makeCard('What moves across a membrane during osmosis?', 'Water moves across a selectively permeable membrane.', ['water moves across a selectively permeable membrane', 'water']),
			makeCard('What does mitosis produce?', 'Two genetically identical daughter cells.', ['two genetically identical daughter cells', 'two identical cells']),
			makeCard('What does homeostasis mean in a living organism?', 'Maintaining stable internal conditions.', ['stable internal conditions', 'maintaining internal balance']),
		],
	},
	{
		id: 'math', title: 'Quadratic Equations', subject: 'Mathematics', studied: 'Yesterday', color: 'deck-yellow',
		cards: [
			makeCard('What is the quadratic formula?', 'For ax² + bx + c = 0: x = (-b ± √(b² - 4ac)) / 2a.', ['negative b plus or minus the square root of b squared minus four a c over two a', 'quadratic formula']),
			makeCard('What does the discriminant tell you?', 'The number and type of roots. It is the value b² - 4ac.', ['number and type of roots', 'nature and number of roots']),
			makeCard('Solve x² - 5x + 6 = 0.', 'Factor it as (x - 2)(x - 3) = 0, so x = 2 or x = 3.', ['x equals 2 or x equals 3', '2 and 3']),
			makeCard('Where is the vertex of y = ax² + bx + c?', 'Its x-coordinate is -b/(2a); substitute that value into the equation to find y.', ['x coordinate is negative b over two a', 'negative b over two a']),
			makeCard('What does a discriminant of zero mean?', 'The quadratic has one repeated real root.', ['one repeated real root', 'one real double root']),
			makeCard('For ax² + bx + c = 0, what are the sum and product of its roots?', 'The sum is -b/a and the product is c/a.', ['sum is negative b over a and product is c over a', 'negative b over a and c over a']),
			makeCard('What is the axis of symmetry of y = ax² + bx + c?', 'The vertical line x = -b/(2a).', ['x equals negative b over two a', 'negative b over two a']),
			makeCard('When does a parabola open upward?', 'When its leading coefficient a is positive.', ['a is positive', 'leading coefficient is positive']),
			makeCard('What is the zero-product property?', 'If a product equals zero, at least one of its factors must equal zero.', ['at least one factor equals zero', 'a factor must equal zero']),
		],
	},
	{
		id: 'geography', title: 'Climate Systems', subject: 'Geography', studied: 'Sep 28', color: 'deck-coral',
		cards: [
			makeCard('What drives large-scale ocean currents?', 'Prevailing winds, water density differences, and Earth’s rotation.', ['prevailing winds and water density differences', 'winds and water density']),
			makeCard('What is the greenhouse effect?', 'Warming that happens when atmospheric gases absorb and re-emit heat.', ['gases absorb and re emit heat', 'atmospheric gases trap heat']),
			makeCard('What does albedo measure?', 'The proportion of incoming sunlight a surface reflects.', ['proportion of sunlight reflected', 'sunlight a surface reflects']),
			makeCard('What causes the seasons on Earth?', 'Earth’s tilted axis changes the angle and duration of sunlight during its orbit around the Sun.', ['earth axis tilt', 'tilt of earth axis']),
			makeCard('What is a rain shadow?', 'A dry area on the leeward side of a mountain, where descending air has lost much of its moisture.', ['dry area on the leeward side of a mountain', 'dry side of a mountain']),
			makeCard('How do ocean currents affect nearby coastal climates?', 'Warm currents tend to warm nearby coasts; cold currents tend to cool them.', ['warm currents warm and cold currents cool nearby coasts', 'warm currents warm coasts']),
			makeCard('How are climate and weather different?', 'Weather describes short-term atmospheric conditions; climate describes long-term patterns.', ['weather is short term and climate is long term', 'long term patterns versus short term conditions']),
			makeCard('What is El Niño?', 'A periodic warming of surface waters in the central and eastern tropical Pacific.', ['warming of the central and eastern tropical pacific', 'warming of pacific surface waters']),
			makeCard('What does the Coriolis effect describe?', 'The apparent deflection of moving air and water caused by Earth’s rotation.', ['deflection of moving air and water due to earth rotation', 'apparent deflection caused by earth rotation']),
		],
	},
]

const subjects = ['All subjects', 'Biology', 'Mathematics', 'Geography']

function Flashcards() {
	const [decks] = useState(initialDecks)
	const [subject, setSubject] = useState('All subjects')
	const [query, setQuery] = useState('')
	const [deckId, setDeckId] = useState(null)
	const [cardIndex, setCardIndex] = useState(0)
	const [flipped, setFlipped] = useState(false)
	const [answerText, setAnswerText] = useState('')
	const [answerResult, setAnswerResult] = useState(null)
	const [knownCount, setKnownCount] = useState(0)
	const [complete, setComplete] = useState(false)
	const activeDeck = decks.find((deck) => deck.id === deckId)
	const activeCard = activeDeck?.cards[cardIndex]
	const visibleDecks = decks.filter((deck) => (subject === 'All subjects' || deck.subject === subject) && `${deck.title} ${deck.subject}`.toLowerCase().includes(query.toLowerCase()))
	const totalCards = decks.reduce((total, deck) => total + deck.cards.length, 0)

	function startDeck(id) {
		setDeckId(id)
		setCardIndex(0)
		setKnownCount(0)
		setFlipped(false)
		setAnswerText('')
		setAnswerResult(null)
		setComplete(false)
	}

	function checkAnswer(event) {
		event.preventDefault()
		const response = answerText.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
		const isCorrect = response.length >= 3 && activeCard.acceptedAnswers.some((answer) => {
			const expected = answer.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
			return response === expected || (response.length >= 5 && (expected.includes(response) || response.includes(expected)))
		})
		setAnswerResult(isCorrect ? 'correct' : 'incorrect')
		setFlipped(false)
	}

	function nextCard() {
		if (answerResult === 'correct') setKnownCount((count) => count + 1)
		setFlipped(false)
		setAnswerText('')
		setAnswerResult(null)
		if (cardIndex === activeDeck.cards.length - 1) setComplete(true)
		else setCardIndex((index) => index + 1)
	}

	function exitSession() {
		setDeckId(null)
		setComplete(false)
		setAnswerText('')
		setAnswerResult(null)
	}

	return (
		<main className="main-content">
			<header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>Flashcards</strong></div><div className="topbar-actions"><label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search flashcard decks" placeholder="Search decks..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><button className="icon-button notification-button" type="button" aria-label="Notifications">♧<span /></button><span className="top-avatar">A</span></div></header>
			<div className="page-content flashcards-page">
				{!activeDeck ? <>
					<section className="page-title-row"><div><div className="eyebrow"><span className="sun-mark">▤</span> ACTIVE RECALL</div><h1>Flashcards<span>.</span></h1><p className="welcome-subtitle">A quick review now makes remembering easier later.</p></div><div className="review-summary"><span className="review-summary-icon">✳</span><span><strong>{totalCards} cards</strong><small>across {decks.length} study decks</small></span></div></section>
					<section className="flashcard-toolbar"><div><div className="section-kicker">YOUR STUDY SETS</div><h2>Decks to review <span className="heading-count">{visibleDecks.length}</span></h2></div><div className="filter-control" role="group" aria-label="Filter by subject">{subjects.map((item) => <button type="button" key={item} className={subject === item ? 'selected' : ''} aria-pressed={subject === item} onClick={() => setSubject(item)}>{item}</button>)}</div></section>
					<section className="deck-grid" aria-label="Flashcard decks">{visibleDecks.map((deck) => <article className={`deck-card ${deck.color}`} key={deck.id}><div className="deck-card-top"><span className="deck-subject">{deck.subject}</span><span className="deck-card-icon">▤</span></div><h3>{deck.title}</h3><p>{deck.cards.length} cards <span>·</span> Reviewed {deck.studied}</p><div className="deck-card-bottom"><div className="deck-progress"><span /></div><button type="button" aria-label={`Study ${deck.title}`} onClick={() => startDeck(deck.id)}>Study deck <span>→</span></button></div></article>)}{visibleDecks.length === 0 && <p className="empty-library">No decks match that search.</p>}</section>
				</> : <section className="study-session" aria-labelledby="study-title">
					<div className="study-session-header"><button className="back-button" type="button" onClick={exitSession}>← <span>All decks</span></button><div className="session-deck-name"><span className={`subject-dot ${activeDeck.subject.toLowerCase()}`} />{activeDeck.title}</div><span className="session-progress-label">{complete ? activeDeck.cards.length : cardIndex + 1} / {activeDeck.cards.length}</span></div>
					<div className="session-progress"><span style={{ width: `${complete ? 100 : (cardIndex / activeDeck.cards.length) * 100}%` }} /></div>
					{complete ? <div className="session-complete"><span className="complete-mark">✳</span><div className="section-kicker">SESSION COMPLETE</div><h1 id="study-title">Nice work<span>.</span></h1><p>You answered {knownCount} of {activeDeck.cards.length} correctly.</p><button className="primary-button" type="button" onClick={exitSession}>Back to your decks <span>→</span></button></div> : <><div className="card-prompt"><span className="section-kicker">{flipped ? 'ANSWER' : 'QUESTION'}</span><h2 id="study-title">{answerResult === 'incorrect' && !flipped ? 'Not quite. Tap the question to reveal the answer.' : flipped ? 'Answer' : 'Write your answer below.'}</h2></div><button className={`study-card${flipped ? ' flipped' : ''}`} type="button" disabled={answerResult !== 'incorrect'} onClick={() => setFlipped((value) => !value)} aria-label={flipped ? 'Show question' : 'Reveal answer'}><span className="study-card-label">{flipped ? 'ANSWER' : 'QUESTION'}</span><span className="study-card-text">{flipped ? activeCard.back : activeCard.front}</span><span className="study-card-hint">{answerResult === 'incorrect' ? (flipped ? 'Tap to return to question' : 'Tap to reveal the answer') : 'Answer before revealing'}</span></button>{!flipped && <form className="answer-form" onSubmit={checkAnswer}><label htmlFor="flashcard-answer">Your answer</label><textarea id="flashcard-answer" rows="2" placeholder="Type what you remember..." value={answerText} onChange={(event) => { setAnswerText(event.target.value); setAnswerResult(null) }} /><div className="answer-form-footer"><p className={`answer-feedback${answerResult ? ` ${answerResult}` : ''}`} aria-live="polite">{answerResult === 'correct' ? 'Correct. Nice recall!' : answerResult === 'incorrect' ? 'That does not match. Try again or tap the question to reveal the answer.' : 'Your answer is checked against the key idea.'}</p><button className="primary-button answer-submit" type="submit" disabled={!answerText.trim()}>Check answer <span>✓</span></button></div></form>}{(answerResult === 'correct' || (answerResult === 'incorrect' && flipped)) && <div className="study-controls"><button className="review-known" type="button" onClick={nextCard}>{cardIndex === activeDeck.cards.length - 1 ? 'Finish review' : 'Next question'} <span>→</span></button></div>}</>}
				</section>}
				<footer className="page-footer">A little review goes a long way <span>✳</span></footer>
			</div>
		</main>
	)
}

export default Flashcards
