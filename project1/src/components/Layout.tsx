import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
    return (
        <>
            <Header />

            <main className="mx-auto max-w-6xl py-8">
                <div className="coins-list">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Layout