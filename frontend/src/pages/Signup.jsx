import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest, saveSession } from '../lib/api.js'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function submit(event) {
    event.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const session = await apiRequest('/auth/signup', {
  method: 'POST',
  body: JSON.stringify({ name, email, password }),
})

saveSession(session)
navigate('/dashboard', { replace: true })
      saveSession(session)
      navigate('/')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">

      <Link className="brand" to="/welcome">
        <span className="brand-mark">S</span>
        studyspace<span className="brand-period">.</span>
      </Link>

      <section className="auth-card">

        <div className="eyebrow">CREATE YOUR ACCOUNT</div>

        <h1>
          Make space
          <br />
          to grow<span>.</span>
        </h1>

        <p>Create your free student workspace.</p>

        <form className="auth-form" onSubmit={submit}>

          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            placeholder="Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>

          <div className="password-box">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button
            className="primary-button auth-submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account…' : 'Create my account'} <span>→</span>
          </button>

        </form>

        <div className="auth-switch">
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </div>

      </section>

      <Link className="auth-home" to="/welcome">
        ← Back to home
      </Link>

    </main>
  )
}

export default Signup
