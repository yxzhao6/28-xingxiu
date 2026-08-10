import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="app-shell">
      <div className="app-shell__atmosphere" aria-hidden="true" />
      <div className="app-shell__column">
        <main className="app-shell__main">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
