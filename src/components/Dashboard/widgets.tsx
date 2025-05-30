import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuLayoutDashboard, LuLogOut, LuNotebookText } from 'react-icons/lu'
import { BiChevronLeft, BiChevronRight, BiMenu } from 'react-icons/bi'
import { FaX } from 'react-icons/fa6'
import { logout } from '@/src/lib/auth'
import Button from '../ui/button'


export default function Widgets() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleLogout = async () => {
        try {
            await logout()
            window.location.href = "/"
        } catch (error: any) {
            console.error("Error logging out:", error)
            alert(error.message)
        }
    }

    const menuItems = [
        { href: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
        { href: "/dashboard/page2", label: "Page 2", icon: LuNotebookText },
    ]

    const toggleSidebar = () => setIsOpen(!isOpen)
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

    return (
        <>
            <div className={`fixed inset-y-0 right-0 z-40 ${isMobile ? (isMobileMenuOpen ? 'w-64' : 'w-0') : (isOpen ? 'w-64' : 'w-16')} bg-white border-r-2 rounded-xl my-2 shadow-md transition-all duration-300 ease-in-out ${isMobile ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto">
                        {!isMobile && (
                            <div className="p-4">
                                <Button onClick={toggleSidebar} className="w-full">
                                    {isOpen ? <BiChevronLeft className="h-4 w-4" /> : <BiChevronRight className="h-4 w-4" />}
                                </Button>
                            </div>
                        )}
                        <nav className="mt-2 px-2">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`group flex items-center ${isMobile || isOpen ? 'px-4' : 'justify-center'} py-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${isActive
                                            ? 'text-blue-600 bg-gray-100'
                                            : 'text-[#212121] hover:text-blue-400 hover:bg-gray-100'
                                            } ${isMobile && !isMobileMenuOpen ? 'hidden' : ''}`}
                                        onClick={() => isMobile && setIsMobileMenuOpen(false)}
                                    >
                                        <item.icon className={`${isMobile || isOpen ? 'mr-3' : ''} h-6 w-6 ${isActive ? 'text-blue-600' : 'text-[#212121] group-hover:text-blue-400'}`} />
                                        {(isMobile || isOpen) && <span className="font-semibold">{item.label}</span>}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                    <div className={`flex-shrink-0 flex flex-col border-t border-gray-200 p-4 ${isMobile && !isMobileMenuOpen ? 'hidden' : ''}`}>
                        <Button
                            className={`flex-shrink-0 group block ${!isOpen && !isMobile ? 'p-0 h-8 w-8 mx-auto' : 'w-full'}`}
                            onClick={handleLogout}
                        >
                            <div className={`flex items-center justify-center h-full ${isMobile || isOpen ? '' : 'w-full'}`}>
                                <LuLogOut className={`${isMobile || isOpen ? 'mr-1 h-5 w-5' : 'h-4 w-4'}`} />
                                {(isMobile || isOpen) && <span className="text-xs font-medium">Log out</span>}
                            </div>
                        </Button>
                    </div>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-16')} pb-16 md:pb-0`}>
            </div>

            <div className="md:hidden fixed top-0 right-0 z-50">
                <Button
                    onClick={toggleMobileMenu}
                    className="w-[30vw] rounded-tl-md h-16 flex items-center justify-center bg-white border-t border-l"
                >
                    {isMobileMenuOpen ? <FaX className="h-6 w-6" /> : <BiMenu className="h-6 w-6" />}
                    <span className="ml-2">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
                </Button>
            </div>
        </>
    )
}