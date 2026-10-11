import { useEffect, useRef, useState } from 'react'

const starterMessages = [
  {
    id: 1,
    role: 'assistant',
    text: "Hi Alex! 👋 I'm your Study Mate AI. I can explain concepts, create study plans, test your knowledge, or help you understand your notes. What are you studying today?",
    time: 'Just now',
  },
]

const quickPrompts = [
  {
    icon: '💡',
    title: 'Explain a topic',
    text: 'Explain photosynthesis in simple words',
  },
  {
    icon: '📅',
    title: 'Make a study plan',
    text: 'Help me create a study plan for today',
  },
  {
    icon: '🧠',
    title: 'Test my knowledge',
    text: 'Quiz me on quadratic equations',
  },
  {
    icon: '📝',
    title: 'Summarize notes',
    text: 'Summarize my notes into key points',
  },
]

function Chat() {
  const [messages, setMessages] = useState(starterMessages)
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [likedId, setLikedId] = useState(null)
  const [dislikedId, setDislikedId] = useState(null)

  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages, isTyping])

  function generateResponse(question) {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes('photosynthesis')) {
      return "Photosynthesis is the process plants use to make food. 🌱 Plants use sunlight, carbon dioxide, and water to produce glucose and oxygen."
    }

    if (lowerQuestion.includes('study plan')) {
      return "Here's a simple study session: 📚 25 minutes focused study → ☕ 5 minute break → 25 minutes practice → 🧠 10 minutes active recall → ✅ 5 minutes review."
    }

    if (
      lowerQuestion.includes('quiz') ||
      lowerQuestion.includes('test me')
    ) {
      return "Absolutely! 🧠 Let's start with one question: What is the value of x in the equation 2x + 6 = 14?"
    }

    if (
      lowerQuestion.includes('summarize') ||
      lowerQuestion.includes('summary')
    ) {
      return "I can help with that! 📖 Upload your notes or document and I'll turn the important information into concise key points and revision notes."
    }

    return "That's a great study question! 🤓 Try breaking the topic into smaller concepts first. I can explain it step-by-step, give you an example, or quiz you afterward."
  }

  function sendMessage(event) {
    event?.preventDefault()

    const question = draft.trim()

    if (!question || isTyping) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: question,
      time: 'Just now',
    }

    setMessages((items) => [...items, userMessage])
    setDraft('')
    setIsTyping(true)

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        text: generateResponse(question),
        time: 'Just now',
      }

      setMessages((items) => [...items, assistantMessage])
      setIsTyping(false)
    }, 900)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage(event)
    }
  }

  function usePrompt(prompt) {
    setDraft(prompt)
    textareaRef.current?.focus()
  }

  async function copyMessage(message, id) {
    try {
      await navigator.clipboard.writeText(message)
      setCopiedId(id)

      setTimeout(() => {
        setCopiedId(null)
      }, 1500)
    } catch {
      console.log('Unable to copy message')
    }
  }

  function clearChat() {
    setMessages(starterMessages)
    setDraft('')
    setLikedId(null)
    setDislikedId(null)
  }

  return (
    <main className="main-content">

      <header className="topbar">
        <div className="breadcrumb">
          Workspace
          <span>/</span>
          <strong>Study assistant</strong>
        </div>

        <div className="topbar-actions">
          <button
            type="button"
            className="clear-chat-button"
            onClick={clearChat}
          >
            🗑️ Clear chat
          </button>

          <span className="top-avatar">A</span>
        </div>
      </header>

      <div className="page-content tool-page">

        <section className="page-title-row">
          <div>
            <div className="eyebrow">
              YOUR STUDY COMPANION
            </div>

            <h1>
              Study assistant<span>.</span>
            </h1>

            <p className="welcome-subtitle">
              Ask questions, understand difficult concepts,
              and learn smarter with AI.
            </p>
          </div>

          <div className="assistant-status">
            <span className="status-dot"></span>
            AI is online
          </div>
        </section>

        <section className="chat-panel">

          <div className="chat-context">

            <div className="assistant-avatar-large">
              ✨
            </div>

            <div className="assistant-info">
              <div className="assistant-name-row">
                <strong>Study Mate AI</strong>
                <span className="verified-badge">✓</span>
              </div>

              <small>
                Your personal AI study companion
              </small>
            </div>

            <div className="chat-header-actions">
              <span className="online-label">
                <span className="status-dot"></span>
                Online
              </span>
            </div>

          </div>

          <div className="study-stats">

            <div className="study-stat">
              <span className="stat-icon">💬</span>
              <div>
                <strong>{messages.length}</strong>
                <small>Messages</small>
              </div>
            </div>

            <div className="study-stat">
              <span className="stat-icon">🧠</span>
              <div>
                <strong>AI</strong>
                <small>Study mode</small>
              </div>
            </div>

            <div className="study-stat">
              <span className="stat-icon">⚡</span>
              <div>
                <strong>Fast</strong>
                <small>Responses</small>
              </div>
            </div>

          </div>

          {messages.length <= 1 && (
            <div className="quick-start">

              <div className="quick-start-heading">
                <div>
                  <strong>
                    What would you like to do?
                  </strong>

                  <span>
                    Start with one of these
                  </span>
                </div>

                <span className="sparkle">✨</span>
              </div>

              <div className="quick-prompt-grid">

                {quickPrompts.map((prompt) => (
                  <button
                    type="button"
                    className="quick-prompt-card"
                    key={prompt.title}
                    onClick={() => usePrompt(prompt.text)}
                  >
                    <span className="quick-prompt-icon">
                      {prompt.icon}
                    </span>

                    <span className="quick-prompt-content">
                      <strong>{prompt.title}</strong>
                      <small>{prompt.text}</small>
                    </span>

                    <span className="prompt-arrow">
                      →
                    </span>
                  </button>
                ))}

              </div>
            </div>
          )}

          <div
            className="chat-messages"
            aria-live="polite"
          >

            {messages.map((message) => (
              <article
                className={`chat-message ${message.role}`}
                key={message.id}
              >

                <div className="chat-avatar">
                  {message.role === 'assistant'
                    ? '✨'
                    : 'A'}
                </div>

                <div className="message-content">

                  <div className="message-meta">
                    <strong>
                      {message.role === 'assistant'
                        ? 'Study Mate AI'
                        : 'You'}
                    </strong>

                    <span>
                      {message.time}
                    </span>
                  </div>

                  <div className="message-bubble">
                    <p>{message.text}</p>
                  </div>

                  {message.role === 'assistant' && (
                    <div className="message-actions">

                      <button
                        type="button"
                        onClick={() =>
                          copyMessage(
                            message.text,
                            message.id
                          )
                        }
                      >
                        {copiedId === message.id
                          ? '✓ Copied'
                          : '📋 Copy'}
                      </button>

                      <button
                        type="button"
                        className={
                          likedId === message.id
                            ? 'active'
                            : ''
                        }
                        onClick={() => {
                          setLikedId(message.id)
                          setDislikedId(null)
                        }}
                      >
                        👍
                      </button>

                      <button
                        type="button"
                        className={
                          dislikedId === message.id
                            ? 'active'
                            : ''
                        }
                        onClick={() => {
                          setDislikedId(message.id)
                          setLikedId(null)
                        }}
                      >
                        👎
                      </button>

                    </div>
                  )}

                </div>

              </article>
            ))}

            {isTyping && (
              <article className="chat-message assistant">

                <div className="chat-avatar">
                  ✨
                </div>

                <div className="message-content">

                  <div className="message-meta">
                    <strong>
                      Study Mate AI
                    </strong>

                    <span>
                      Thinking...
                    </span>
                  </div>

                  <div className="message-bubble typing-bubble">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                </div>

              </article>
            )}

            <div ref={messagesEndRef} />

          </div>

          <div className="prompt-chips">

            <span className="suggestion-label">
              Try asking
            </span>

            {[
              'Explain this simply',
              'Give me an example',
              'Quiz me',
            ].map((prompt) => (
              <button
                type="button"
                key={prompt}
                onClick={() => usePrompt(prompt)}
              >
                {prompt}
              </button>
            ))}

          </div>

          <form
            className="chat-form"
            onSubmit={sendMessage}
          >

            <div className="input-wrapper">

              <textarea
                ref={textareaRef}
                id="chat-draft"
                rows="2"
                maxLength="500"
                placeholder="Ask anything about your studies..."
                value={draft}
                onChange={(event) =>
                  setDraft(event.target.value)
                }
                onKeyDown={handleKeyDown}
              />

              <div className="input-footer">
                <span>
                  ↵ Enter to send · Shift + Enter for new line
                </span>

                <span>
                  {draft.length}/500
                </span>
              </div>

            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={!draft.trim() || isTyping}
            >
              {isTyping ? 'Thinking...' : 'Send'}
              <span>→</span>
            </button>

          </form>

          <div className="chat-note">
            <span>🔒</span>
            Study Mate AI can make mistakes. Check important
            facts against your course materials.
          </div>

        </section>

      </div>
    </main>
  )
}

export default Chat