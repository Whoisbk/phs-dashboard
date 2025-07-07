"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { AlertTriangle, UserX, TrendingDown, Clock, Eye, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with actual Firebase data
const alerts = [
    {
        id: '1',
        type: 'attendance',
        severity: 'high',
        title: 'Low Attendance Alert',
        message: 'Sarah Johnson has 65% attendance (below 70% threshold)',
        studentId: 'ST001',
        studentName: 'Sarah Johnson',
        grade: '10th',
        value: '65%',
        threshold: '70%',
        timestamp: '2024-03-10T09:30:00Z',
        isRead: false
    },
    {
        id: '2',
        type: 'grades',
        severity: 'high',
        title: 'At-Risk Student',
        message: 'Michael Chen has failing grades in 3 subjects',
        studentId: 'ST002',
        studentName: 'Michael Chen',
        grade: '11th',
        value: '3 failing',
        threshold: '2 subjects',
        timestamp: '2024-03-10T14:15:00Z',
        isRead: false
    },
    {
        id: '3',
        type: 'attendance',
        severity: 'medium',
        title: 'Attendance Warning',
        message: 'Class 10-A has 78% attendance this week',
        studentId: null,
        studentName: null,
        grade: '10-A',
        value: '78%',
        threshold: '80%',
        timestamp: '2024-03-09T16:45:00Z',
        isRead: true
    },
    {
        id: '4',
        type: 'behavior',
        severity: 'medium',
        title: 'Behavioral Concern',
        message: 'Emma Davis has 5 tardiness incidents this month',
        studentId: 'ST003',
        studentName: 'Emma Davis',
        grade: '9th',
        value: '5 incidents',
        threshold: '3 incidents',
        timestamp: '2024-03-08T11:20:00Z',
        isRead: true
    },
    {
        id: '5',
        type: 'grades',
        severity: 'low',
        title: 'Grade Improvement Needed',
        message: 'David Wilson\'s Math grade dropped to C-',
        studentId: 'ST004',
        studentName: 'David Wilson',
        grade: '12th',
        value: 'C-',
        threshold: 'C+',
        timestamp: '2024-03-07T13:10:00Z',
        isRead: true
    }
]

const alertConfig = {
    attendance: {
        icon: UserX,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
    },
    grades: {
        icon: TrendingDown,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
    },
    behavior: {
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    }
}

const severityConfig = {
    high: {
        badge: 'bg-red-100 text-red-800',
        border: 'border-l-red-500'
    },
    medium: {
        badge: 'bg-yellow-100 text-yellow-800',
        border: 'border-l-yellow-500'
    },
    low: {
        badge: 'bg-blue-100 text-blue-800',
        border: 'border-l-blue-500'
    }
}

function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
}

export function AlertsPanel() {
    const unreadCount = alerts.filter(alert => !alert.isRead).length
    const highPriorityCount = alerts.filter(alert => alert.severity === 'high').length

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            🚨 Active Alerts
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="ml-2">
                                    {unreadCount} new
                                </Badge>
                            )}
                        </CardTitle>
                        <CardDescription>
                            Attendance issues, at-risk students, and behavioral concerns
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                            Mark All Read
                        </Button>
                        <Button size="sm" variant="outline">
                            Settings
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
                        <div className="text-sm text-red-700">High Priority</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                            {alerts.filter(a => a.severity === 'medium').length}
                        </div>
                        <div className="text-sm text-yellow-700">Medium Priority</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {alerts.filter(a => a.severity === 'low').length}
                        </div>
                        <div className="text-sm text-blue-700">Low Priority</div>
                    </div>
                </div>

                {/* Alerts List */}
                <div className="space-y-3">
                    {alerts.slice(0, 5).map((alert) => {
                        const config = alertConfig[alert.type as keyof typeof alertConfig]
                        const severity = severityConfig[alert.severity as keyof typeof severityConfig]
                        const AlertIcon = config.icon

                        return (
                            <div
                                key={alert.id}
                                className={cn(
                                    "p-4 rounded-lg border-l-4 transition-all hover:shadow-md",
                                    severity.border,
                                    alert.isRead ? 'bg-gray-50' : 'bg-white shadow-sm'
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-3 flex-1">
                                        <div className={cn("p-2 rounded-full", config.bgColor)}>
                                            <AlertIcon className={cn("h-4 w-4", config.color)} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className={cn(
                                                    "font-semibold",
                                                    alert.isRead ? 'text-gray-700' : 'text-gray-900'
                                                )}>
                                                    {alert.title}
                                                </h4>
                                                <Badge variant="secondary" className={severity.badge}>
                                                    {alert.severity}
                                                </Badge>
                                                {!alert.isRead && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                )}
                                            </div>

                                            <p className={cn(
                                                "text-sm mb-2",
                                                alert.isRead ? 'text-gray-600' : 'text-gray-700'
                                            )}>
                                                {alert.message}
                                            </p>

                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {formatTimestamp(alert.timestamp)}
                                                </div>
                                                {alert.studentName && (
                                                    <div>
                                                        Student: <span className="font-medium">{alert.studentName}</span> ({alert.grade})
                                                    </div>
                                                )}
                                                <div>
                                                    Current: <span className="font-medium">{alert.value}</span> |
                                                    Threshold: <span className="font-medium">{alert.threshold}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 ml-2">
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {alerts.length > 5 && (
                    <div className="mt-6 pt-4 border-t text-center">
                        <Button variant="ghost">
                            View All {alerts.length} Alerts
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 