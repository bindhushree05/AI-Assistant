import { useEffect, useState } from 'react'

const startingTasks = [
	{ id: 1, title: 'Review cell structure notes', subject: 'Biology', done: true },
	{ id: 2, title: 'Complete quadratic equations set', subject: 'Mathematics', done: false },
	{ id: 3, title: 'Read chapter 04: The atmosphere', subject: 'Geography', done: false },
]

const schedule = [
	{ time: '09:30', title: 'Organic chemistry', detail: 'Chapter 6 · 45 min', color: 'mint' },
	{ time: '11:00', title: 'Math problem set', detail: 'Quadratic equations · 30 min', color: 'yellow' },
	{ time: '14:15', title: 'World geography', detail: 'Climate systems · 50 min', color: 'rose' },
]

const todayLabel = new Intl.DateTimeFormat('en-US', {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
	year: 'numeric',
}).format(new Date()).toUpperCase()

function formatTime(seconds) {
	return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

function Dashboard() {
	const [tasks, setTasks] = useState(startingTasks)
	const [secondsLeft, setSecondsLeft] = useState(25 * 60)
	const [isRunning, setIsRunning] = useState(false)
	const [query, setQuery] = useState('')
	const completedTasks = tasks.filter((task) => task.done).length
	const visibleTasks = tasks.filter((task) => `${task.title} ${task.subject}`.toLowerCase().includes(query.toLowerCase()))

	useEffect(() => {
		if (!isRunning || secondsLeft === 0) return undefined

		const intervalId = window.setInterval(() => {
			if (secondsLeft <= 1) setIsRunning(false)
			setSecondsLeft((remaining) => Math.max(remaining - 1, 0))
		}, 1000)

		return () => window.clearInterval(intervalId)
	}, [isRunning, secondsLeft])

	function toggleTask(taskId) {
		setTasks((currentTasks) => currentTasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task))
	}

	function addTask() {
		setTasks((currentTasks) => [...currentTasks, { id: Date.now(), title: 'New study task', subject: 'General', done: false }])
	}

	function resetTimer() {
		setIsRunning(false)
		setSecondsLeft(25 * 60)
	}

	return (
			<main className="main-content" id="dashboard">
				<header className="topbar">
					<div className="breadcrumb">Workspace <span>/</span> <strong>Overview</strong></div>
					<div className="topbar-actions">
						<label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search tasks" placeholder="Search anything..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label>
						<button className="icon-button notification-button" type="button" aria-label="Notifications">♧<span /></button><span className="top-avatar">A</span>
					</div>
				</header>

				<div className="dashboard-content">
					<section className="welcome-row" aria-labelledby="welcome-title">
						<div><div className="eyebrow"><span className="sun-mark">✳</span> {todayLabel}</div><h1 id="welcome-title">Good morning, Alex<span>.</span></h1><p className="welcome-subtitle">A fresh day to make progress. Here's your study snapshot.</p></div>
						<button className="primary-button" type="button" onClick={() => document.getElementById('focus')?.scrollIntoView({ behavior: 'smooth' })}><span>＋</span> Plan a study session</button>
					</section>

					<section className="stat-grid" aria-label="Study statistics">
						<article className="stat-card"><div className="stat-heading">STUDY TIME <span className="stat-icon green-icon">◷</span></div><div className="stat-value">3.5 <small>hrs</small></div><div className="stat-foot"><span className="trend-up">↗ 12%</span><span>vs. last week</span></div><div className="mini-bars" aria-label="Study time over the last seven days">{[32, 48, 40, 68, 52, 82, 59].map((height, index) => <i key={index} style={{ height: `${height}%` }} className={index === 5 ? 'bar-current' : ''} />)}</div></article>
						<article className="stat-card"><div className="stat-heading">TASKS COMPLETED <span className="stat-icon yellow-icon">✓</span></div><div className="stat-value">{completedTasks}<small> / {tasks.length}</small></div><div className="stat-foot"><span>{tasks.length - completedTasks} left</span><span>for today's plan</span></div><div className="completion-track"><span style={{ width: `${tasks.length ? (completedTasks / tasks.length) * 100 : 0}%` }} /></div></article>
						<article className="stat-card streak-card"><div className="stat-heading">CURRENT STREAK <span className="stat-icon coral-icon">✳</span></div><div className="stat-value">4 <small>days</small></div><div className="stat-foot"><span>One more day to beat your record!</span></div><div className="streak-days"><span className="day-done">M</span><span className="day-done">T</span><span className="day-done">W</span><span className="day-done">T</span><span>F</span><span>S</span><span>S</span></div></article>
					</section>

					<div className="dashboard-grid">
						<section className="panel tasks-panel" id="my-tasks" aria-labelledby="tasks-title">
							<div className="panel-heading"><div><div className="section-kicker">YOUR CHECKLIST</div><h2 id="tasks-title">Today's tasks <span className="heading-count">{tasks.length}</span></h2></div><button className="text-button" type="button" onClick={addTask}>＋ Add task</button></div>
							<div className="task-list">{visibleTasks.length ? visibleTasks.map((task) => <label className={`task-row${task.done ? ' task-done' : ''}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} /><span className="custom-check" aria-hidden="true">✓</span><span className="task-copy"><strong>{task.title}</strong><small>{task.subject}</small></span><button className="task-menu" type="button" aria-label={`Remove ${task.title}`} onClick={(event) => { event.preventDefault(); setTasks((currentTasks) => currentTasks.filter((item) => item.id !== task.id)) }}>×</button></label>) : <p className="empty-state">No tasks match “{query}”.</p>}</div>
							<div className="tasks-footer"><span>Keep your momentum going</span><span className="footer-spark">✳</span></div>
						</section>

						<section className="panel focus-panel" id="focus" aria-labelledby="focus-title">
							<div className="panel-heading focus-heading"><div><div className="section-kicker">MAKE IT COUNT</div><h2 id="focus-title">Focus session</h2></div><button className="quiet-icon" type="button" aria-label="Reset focus timer" onClick={resetTimer}>↻</button></div>
							<div className="timer-wrap"><div className="timer-ring"><div className="timer-inner"><span>{formatTime(secondsLeft)}</span><small>{secondsLeft === 0 ? 'COMPLETE' : 'FOCUS TIME'}</small></div></div></div>
							<div className="timer-caption">One thing at a time. You've got this.</div>
							<div className="timer-controls"><button type="button" className="timer-start" onClick={() => { if (secondsLeft === 0) setSecondsLeft(25 * 60); setIsRunning((running) => !running) }}>{isRunning ? 'Pause session' : secondsLeft === 0 ? 'Start again' : 'Start focusing'} <span>{isRunning ? 'Ⅱ' : '→'}</span></button></div>
							<div className="focus-subject"><span className="subject-dot biology" /><span>Up next</span><strong>Biology review</strong><button type="button" aria-label="Change focus subject">⌄</button></div>
						</section>

						<section className="panel schedule-panel" id="today" aria-labelledby="schedule-title">
							<div className="panel-heading"><div><div className="section-kicker">YOUR DAY, AT A GLANCE</div><h2 id="schedule-title">On the schedule</h2></div><button className="quiet-icon" type="button" aria-label="View full planner">↗</button></div>
							<div className="schedule-list">{schedule.map((item) => <article className="schedule-item" key={item.time}><time>{item.time}</time><span className={`schedule-dot ${item.color}`} /><div><strong>{item.title}</strong><small>{item.detail}</small></div></article>)}</div>
							<button className="schedule-link" type="button" onClick={() => window.alert('Your full planner is coming soon.')}>Open full planner <span>→</span></button>
						</section>

						<section className="quote-panel"><span className="quote-mark">“</span><blockquote>Small steps every day add up to big change.</blockquote><span className="quote-credit">YOUR STUDYSPACE REMINDER</span><span className="quote-decoration" aria-hidden="true">✳</span></section>
					</div>
					<footer className="page-footer">Made for your next small win <span>✳</span></footer>
				</div>
			</main>
	)
}

export default Dashboard
