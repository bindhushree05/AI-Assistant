import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest, saveSession } from '../lib/api.js'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(event) {
    event.preventDefault()

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    setError('')
    setIsLoading(true)
    try {
      const session = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      saveSession(session)
      saveSession(session)
      navigate('/dashboard')
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

        <div className="eyebrow">WELCOME BACK</div>

        <h1>
          Pick up where
          <br />
          you left off<span>.</span>
        </h1>

        <p>Your next small win is waiting.</p>

        <form className="auth-form" onSubmit={submit}>

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

          <input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="form-error">{error}</p>
          )}

          <button
            className="primary-button auth-submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in…' : 'Log in'} <span>→</span>
          </button>

        </form>

        <div className="auth-switch">
          New to Studyspace?{' '}
          <Link to="/signup">Create an account</Link>
        </div>

      </section>

      <Link className="auth-home" to="/welcome">
        ← Back to home
      </Link>

    </main>
  )
}

export default Login
