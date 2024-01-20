import { ReactNode } from 'react'
import AppHeader from '../ui/dashboard/AppHeader'
import SideMenu from '../ui/dashboard/SideMenu'
import { Toaster } from 'react-hot-toast'
import '../ui/dashboard/dashboard.css'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="App">
            <Toaster />
            <AppHeader />
            <div className="SideMenuAndPageContent">
                <SideMenu />
                <div className="PageContent">
                    {children}
                </div>
            </div>
        </div>
    )
}