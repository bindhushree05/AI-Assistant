
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getSavedUser, signOut } from './lib/api.js'

function AppLayout() {
  const navigate = useNavigate()
  const user = getSavedUser()
  const displayName = user?.name || 'Alex Morgan'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        {/* Logo: click to return to the welcome page */}
        <NavLink
          className="brand"
          to="/welcome"
          aria-label="Study Mate AI home"
        >
          <span className="brand-mark">S</span>
          <span>
            studyspace<span className="brand-period">.</span>
          </span>
        </NavLink>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink
            className={({ isActive }) =>
              `nav-link${isActive ? ' active' : ''}`
            }
            to="/"
            end
          >
            <span className="nav-symbol">⌂</span>
            <span className="nav-label">Overview</span>
          </NavLink>

          <a className="nav-link" href="/#my-tasks">
            <span className="nav-symbol">✓</span>
            <span className="nav-label">My tasks</span>
            <span className="nav-count">2</span>
          </a>

          <NavLink
            className={({ isActive }) =>
              `nav-link${isActive ? ' active' : ''}`
            }
            to="/documents"
          >
            <span className="nav-symbol">▧</span>
            <span className="nav-label">Documents</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `nav-link${isActive ? ' active' : ''}`
            }
            to="/flashcards"
          >
            <span className="nav-symbol">▤</span>
            <span className="nav-label">Flashcards</span>
          </NavLink>

          <a className="nav-link" href="/#today">
            <span className="nav-symbol">▦</span>
            <span className="nav-label">Study planner</span>
          </a>

          <a className="nav-link" href="/#focus">
            <span className="nav-symbol">◷</span>
            <span className="nav-label">Focus room</span>
          </a>
        </nav>

        <NavLink
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
          to="/quiz"
        >
          <span className="nav-symbol">?</span>
          <span className="nav-label">Practice quiz</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
          to="/chat"
        >
          <span className="nav-symbol">✉</span>
          <span className="nav-label">Study assistant</span>
        </NavLink>

        <div className="sidebar-label subject-label">YOUR SUBJECTS</div>

        <div className="subject-list">
          <a href="/#my-tasks">
            <span className="subject-dot biology" />
            Biology
            <span className="subject-more">···</span>
          </a>

          <a href="/#my-tasks">
            <span className="subject-dot math" />
            Mathematics
            <span className="subject-more">···</span>
          </a>

          <a href="/#my-tasks">
            <span className="subject-dot geography" />
            Geography
            <span className="subject-more">···</span>
          </a>
        </div>

        <div className="sidebar-bottom">
          <div className="upgrade-box">
            <span className="upgrade-mark">✳</span>
            <strong>
              A little progress
              <br />
              goes a long way.
            </strong>
            <span>You're building a good habit.</span>
            <div className="upgrade-progress">
              <span />
            </div>
            <small>4 of 5 study days this week</small>
          </div>

          <button
            className="profile-button"
            type="button"
            aria-label="Sign out"
            title="Sign out"
            onClick={async () => {
              await signOut()
              navigate('/login')
            }}
          >
            <span className="avatar">
              {displayName.charAt(0).toUpperCase()}
            </span>

            <span className="profile-copy">
              <strong>{displayName}</strong>
              <small>{user?.email || 'Student plan'}</small>
            </span>

            <span className="profile-menu">↪</span>
          </button>
        </div>
      </aside>

      <Outlet />
    </div>
  )
}

export default AppLayout