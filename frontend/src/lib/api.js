
const API_BASE = 'http://localhost:5000'

// Send requests to the backend
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('studyspace_token')

  let response

  try {
    response = await fetch(`${API_BASE}/api${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
  } catch (error) {
    console.error('API connection error:', error)

    throw new Error(
      'Cannot reach the server. Make sure the backend is running.'
    )
  }

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      result.message || result.error || 'Request failed. Please try again.'
    )
  }

  return result
}

// Save login or signup session
export function saveSession({ token, user }) {
  if (!token || !user) {
    throw new Error('Invalid login response from server.')
  }

  localStorage.setItem('studyspace_token', token)
  localStorage.setItem('studyspace_user', JSON.stringify(user))
}

// Get the currently saved user
export function getSavedUser() {
  try {
    return JSON.parse(
      localStorage.getItem('studyspace_user') || 'null'
    )
  } catch {
    return null
  }
}

// Sign out and clear the saved session
export async function signOut() {
  try {
    await apiRequest('/auth/logout', {
      method: 'POST',
    })
  } catch (error) {
    console.warn('Logout request failed:', error.message)
  } finally {
    localStorage.removeItem('studyspace_token')
    localStorage.removeItem('studyspace_user')
  }
}