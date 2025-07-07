"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    // Generate breadcrumbs based on current path
    const generateBreadcrumbs = () => {
        const segments = pathname.split('/').filter(Boolean)
        const breadcrumbs = []

        // Always start with Dashboard
        breadcrumbs.push({
            label: "Dashboard",
            href: "/dashboard",
            isLast: segments.length === 1
        })

        // Add subsequent segments
        if (segments.length > 1) {
            for (let i = 1; i < segments.length; i++) {
                const segment = segments[i]
                const href = "/" + segments.slice(0, i + 1).join("/")
                const isLast = i === segments.length - 1

                // Format segment name
                const label = segment.charAt(0).toUpperCase() + segment.slice(1)

                breadcrumbs.push({
                    label,
                    href,
                    isLast
                })
            }
        }

        return breadcrumbs
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col min-h-screen">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumb className="ml-4">
                        <BreadcrumbList>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <div key={breadcrumb.href} className="flex items-center">
                                    {index > 0 && <BreadcrumbSeparator />}
                                    <BreadcrumbItem>
                                        {breadcrumb.isLast ? (
                                            <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={breadcrumb.href}>
                                                {breadcrumb.label}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className="flex items-center gap-3 rounded-xl ">
                            <Avatar className="h-10 w-10 ring-2 ring-slate-600">
                                <AvatarImage src="/avatars/bokamoso-laka.jpg" alt="Bokamoso Laka" />
                                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold">BL</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">Bokamoso Laka</p>
                                <p className="text-xs text-slate-400">Super Admin</p>
                            </div>
                            {/* <ChevronDown className="h-4 w-4 text-slate-400" /> */}
                        </div>
                    </div>
                </header>
                <div className="flex-1 space-y-4 p-4 pt-6">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
} 