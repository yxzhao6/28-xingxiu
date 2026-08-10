import { NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/today', label: '今日' },
  { to: '/draw', label: '问宿' },
  { to: '/gallery', label: '图鉴' },
] as const

export function BottomNav() {
  const location = useLocation()
  if (location.pathname.startsWith('/onboarding')) {
    return null
  }

  return (
    <nav className="bottom-nav" aria-label="主导航">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? 'bottom-nav__link is-active' : 'bottom-nav__link'
          }
          aria-current={
            location.pathname.startsWith(link.to) ? 'page' : undefined
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
