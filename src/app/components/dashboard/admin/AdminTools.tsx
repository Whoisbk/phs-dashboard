"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    FileText,
    Users,
    Settings,
    Download,
    Upload,
    Calendar,
    BarChart3,
    Shield,
    Mail,
    Database,
    Printer,
    Archive
} from 'lucide-react'
import Link from 'next/link'

// Admin tools configuration
const adminTools = [
    {
        id: 'reports',
        title: 'Generate Reports',
        description: 'Academic, attendance, and performance reports',
        icon: FileText,
        color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
        href: '/dashboard/admin/reports',
        badge: null,
        priority: 'high'
    },
    {
        id: 'users',
        title: 'Manage Users',
        description: 'Add, edit, and manage student/teacher accounts',
        icon: Users,
        color: 'bg-green-50 text-green-600 hover:bg-green-100',
        href: '/dashboard/admin/users',
        badge: '3 pending',
        priority: 'high'
    },
    {
        id: 'settings',
        title: 'School Settings',
        description: 'Configure school policies and system settings',
        icon: Settings,
        color: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
        href: '/dashboard/admin/settings',
        badge: null,
        priority: 'medium'
    },
    {
        id: 'export',
        title: 'Export Data',
        description: 'Download student records and academic data',
        icon: Download,
        color: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
        href: '/dashboard/admin/export',
        badge: null,
        priority: 'medium'
    },
    {
        id: 'import',
        title: 'Import Data',
        description: 'Bulk upload student and course information',
        icon: Upload,
        color: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
        href: '/dashboard/admin/import',
        badge: null,
        priority: 'medium'
    },
    {
        id: 'schedule',
        title: 'Manage Schedule',
        description: 'Create and modify class schedules',
        icon: Calendar,
        color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
        href: '/dashboard/admin/schedule',
        badge: null,
        priority: 'high'
    },
    {
        id: 'analytics',
        title: 'Analytics Dashboard',
        description: 'Detailed insights and performance metrics',
        icon: BarChart3,
        color: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
        href: '/dashboard/admin/analytics',
        badge: 'New',
        priority: 'medium'
    },
    {
        id: 'security',
        title: 'Security Center',
        description: 'User permissions and access control',
        icon: Shield,
        color: 'bg-red-50 text-red-600 hover:bg-red-100',
        href: '/dashboard/admin/security',
        badge: null,
        priority: 'high'
    },
    {
        id: 'communications',
        title: 'Communications',
        description: 'Email templates and notification settings',
        icon: Mail,
        color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
        href: '/dashboard/admin/communications',
        badge: null,
        priority: 'low'
    },
    {
        id: 'backup',
        title: 'Data Backup',
        description: 'Backup and restore school data',
        icon: Database,
        color: 'bg-gray-50 text-gray-600 hover:bg-gray-100',
        href: '/dashboard/admin/backup',
        badge: 'Last: 2h ago',
        priority: 'medium'
    },
    {
        id: 'print',
        title: 'Print Center',
        description: 'Generate printable documents and reports',
        icon: Printer,
        color: 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100',
        href: '/dashboard/admin/print',
        badge: null,
        priority: 'low'
    },
    {
        id: 'archive',
        title: 'Archive Management',
        description: 'Manage historical records and data',
        icon: Archive,
        color: 'bg-slate-50 text-slate-600 hover:bg-slate-100',
        href: '/dashboard/admin/archive',
        badge: null,
        priority: 'low'
    }
]

const priorityOrder = { high: 1, medium: 2, low: 3 }

export function AdminTools() {
    // Sort tools by priority
    const sortedTools = [...adminTools].sort((a, b) =>
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
    )

    const highPriorityTools = sortedTools.filter(tool => tool.priority === 'high')
    const otherTools = sortedTools.filter(tool => tool.priority !== 'high')

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    ⚙️ Admin Tools
                </CardTitle>
                <CardDescription>
                    Quick access to administrative functions and reports
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* High Priority Tools */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {highPriorityTools.map((tool) => {
                            const IconComponent = tool.icon

                            return (
                                <Link key={tool.id} href={tool.href}>
                                    <Button
                                        variant="ghost"
                                        className={`w-full h-auto p-4 justify-start ${tool.color} transition-colors`}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="p-2 rounded-lg bg-white/50">
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium">{tool.title}</span>
                                                    {tool.badge && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            {tool.badge}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs opacity-80">{tool.description}</p>
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Other Tools Grid */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">All Tools</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {otherTools.map((tool) => {
                            const IconComponent = tool.icon

                            return (
                                <Link key={tool.id} href={tool.href}>
                                    <Button
                                        variant="ghost"
                                        className={`w-full h-auto p-3 flex-col ${tool.color} transition-colors`}
                                    >
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <div className="p-2 rounded-lg bg-white/50">
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <span className="font-medium text-sm">{tool.title}</span>
                                                    {tool.badge && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            {tool.badge}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs opacity-80 line-clamp-2">{tool.description}</p>
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-lg font-bold text-blue-600">
                                {adminTools.filter(t => t.badge).length}
                            </div>
                            <div className="text-xs text-gray-600">Pending Actions</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-green-600">
                                {highPriorityTools.length}
                            </div>
                            <div className="text-xs text-gray-600">Priority Tools</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-purple-600">
                                {adminTools.length}
                            </div>
                            <div className="text-xs text-gray-600">Total Tools</div>
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">System Status: All systems operational</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                        Last backup: 2 hours ago | Database: Healthy | Server: Online
                    </p>
                </div>
            </CardContent>
        </Card>
    )
} 