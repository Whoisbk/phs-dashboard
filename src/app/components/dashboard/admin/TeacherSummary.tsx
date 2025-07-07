"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Users, BookOpen, Clock, TrendingUp, MoreHorizontal } from 'lucide-react'

// Mock data - replace with actual Firebase data
const teacherStats = {
    totalTeachers: 24,
    activeTeachers: 22,
    pendingGrades: 47,
    avgResponseTime: '2.3 days'
}

const topTeachers = [
    {
        id: '1',
        name: 'Dr. Sarah Mitchell',
        subject: 'Mathematics',
        avatar: '/avatars/sarah.jpg',
        studentsCount: 89,
        avgGrade: 3.7,
        responseTime: '1.2 days',
        pendingGrades: 3,
        performance: 95,
        status: 'excellent'
    },
    {
        id: '2',
        name: 'Prof. James Wilson',
        subject: 'English Literature',
        avatar: '/avatars/james.jpg',
        studentsCount: 76,
        avgGrade: 3.5,
        responseTime: '1.8 days',
        pendingGrades: 8,
        performance: 92,
        status: 'excellent'
    },
    {
        id: '3',
        name: 'Ms. Emily Chen',
        subject: 'Chemistry',
        avatar: '/avatars/emily.jpg',
        studentsCount: 54,
        avgGrade: 3.4,
        responseTime: '2.1 days',
        pendingGrades: 12,
        performance: 88,
        status: 'good'
    },
    {
        id: '4',
        name: 'Mr. David Rodriguez',
        subject: 'History',
        avatar: '/avatars/david.jpg',
        studentsCount: 67,
        avgGrade: 3.2,
        responseTime: '3.2 days',
        pendingGrades: 15,
        performance: 82,
        status: 'good'
    },
    {
        id: '5',
        name: 'Mrs. Lisa Thompson',
        subject: 'Biology',
        avatar: '/avatars/lisa.jpg',
        studentsCount: 43,
        avgGrade: 3.1,
        responseTime: '4.1 days',
        pendingGrades: 9,
        performance: 75,
        status: 'needs_attention'
    }
]

const statusConfig = {
    excellent: { color: 'bg-green-100 text-green-800', label: 'Excellent' },
    good: { color: 'bg-blue-100 text-blue-800', label: 'Good' },
    needs_attention: { color: 'bg-yellow-100 text-yellow-800', label: 'Needs Attention' }
}

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function getPerformanceColor(performance: number) {
    if (performance >= 90) return 'text-green-600'
    if (performance >= 80) return 'text-blue-600'
    if (performance >= 70) return 'text-yellow-600'
    return 'text-red-600'
}

export function TeacherSummary() {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            🧑‍🏫 Teacher Performance
                        </CardTitle>
                        <CardDescription>
                            Teacher metrics and pending grading overview
                        </CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                        View All Teachers
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{teacherStats.totalTeachers}</div>
                        <div className="text-sm text-blue-700">Total Teachers</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{teacherStats.activeTeachers}</div>
                        <div className="text-sm text-green-700">Active</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{teacherStats.pendingGrades}</div>
                        <div className="text-sm text-orange-700">Pending Grades</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{teacherStats.avgResponseTime}</div>
                        <div className="text-sm text-purple-700">Avg Response</div>
                    </div>
                </div>

                {/* Teacher List */}
                <div className="space-y-4">
                    {topTeachers.map((teacher) => {
                        const statusStyle = statusConfig[teacher.status as keyof typeof statusConfig]

                        return (
                            <div
                                key={teacher.id}
                                className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                            <AvatarFallback>{getInitials(teacher.name)}</AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <h4 className="font-semibold text-gray-900">{teacher.name}</h4>
                                            <p className="text-sm text-gray-600">{teacher.subject}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className={statusStyle.color}>
                                            {statusStyle.label}
                                        </Badge>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <div className="text-sm font-medium">{teacher.studentsCount}</div>
                                            <div className="text-xs text-gray-500">Students</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <div className="text-sm font-medium">{teacher.avgGrade}</div>
                                            <div className="text-xs text-gray-500">Avg GPA</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <div className="text-sm font-medium">{teacher.responseTime}</div>
                                            <div className="text-xs text-gray-500">Response Time</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <div className="text-sm font-medium">{teacher.pendingGrades}</div>
                                            <div className="text-xs text-gray-500">Pending</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-500">Performance Score</span>
                                        <span className={`text-xs font-medium ${getPerformanceColor(teacher.performance)}`}>
                                            {teacher.performance}%
                                        </span>
                                    </div>
                                    <Progress value={teacher.performance} className="h-2" />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-6 pt-4 border-t text-center">
                    <Button variant="ghost" className="w-full">
                        View Detailed Teacher Reports
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 