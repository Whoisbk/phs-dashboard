"use client"

import { usePathname } from "next/navigation"
import {
    GraduationCap,
    LayoutDashboard,
    Users,
    Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import PHSLogo from "../../public/phs-logo.png"
// Menu items based on the design
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Student",
        url: "/dashboard/students",
        icon: GraduationCap,
        badge: "36",
    },
    {
        title: "Teacher",
        url: "/dashboard/teachers",
        icon: Users,
    },
    {
        title: "Event",
        url: "/dashboard/events",
        icon: Calendar,
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    // Function to check if menu item is active based on current pathname
    const isItemActive = (itemUrl: string) => {
        if (itemUrl === "/dashboard") {
            return pathname === "/dashboard"
        }
        return pathname.startsWith(itemUrl)
    }

    return (
        <Sidebar className="border-r-0 bg-slate-900 text-white">
            <SidebarHeader className=" p-6 bg-slate-900">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">

                        <Image src={PHSLogo.src} alt="PHS Logo" fill className="rounded-xl shadow-lg object-cover" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">PHS Portal</h1>
                    </div>
                </div>


            </SidebarHeader>

            <SidebarContent className="px-4 bg-slate-900">
                <SidebarGroup>
                    <SidebarGroupContent>

                        <SidebarMenu className="space-y-1">
                            {items.map((item) => {
                                const isActive = isItemActive(item.url)
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`
                                                h-12 px-4 rounded-xl transition-all duration-200 group
                                                hover:bg-slate-800/60 hover:text-white
                                                data-[active=true]:bg-slate-800 data-[active=true]:text-white 
                                                data-[active=true]:shadow-lg data-[active=true]:border data-[active=true]:border-slate-700/50
                                                text-slate-300
                                            `}
                                        >
                                            <a href={item.url} className="flex items-center gap-3 w-full">
                                                <item.icon className="h-5 w-5 shrink-0" />
                                                <span className="font-medium">{item.title}</span>
                                                {item.badge && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="ml-auto bg-slate-700 text-slate-200 text-xs border-slate-600 hover:bg-slate-600"
                                                    >
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 bg-slate-900">
                {/* Footer content can be added here if needed */}
            </SidebarFooter>
        </Sidebar>
    )
} 