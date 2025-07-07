"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Users, TrendingUp, TrendingDown, AlertTriangle, GraduationCap } from 'lucide-react'


// Mock data - replace with actual Firebase data
const studentStats = {
    totalStudents: 487,
    activeStudents: 462,
    newEnrollments: 23,
    graduatingStudents: 89
}

const gradeBreakdown = [
    { grade: '9th', count: 132, percentage: 27, color: '#3b82f6' },
    { grade: '10th', count: 128, percentage: 26, color: '#10b981' },
    { grade: '11th', count: 118, percentage: 24, color: '#f59e0b' },
    { grade: '12th', count: 109, percentage: 23, color: '#ef4444' }
]

const performanceData = [
    { category: 'Excellent (A)', count: 145, percentage: 30 },
    { category: 'Good (B)', count: 167, percentage: 34 },
    { category: 'Average (C)', count: 112, percentage: 23 },
    { category: 'Below Average (D)', count: 41, percentage: 8 },
    { category: 'Failing (F)', count: 22, percentage: 5 }
]

const attendanceData = [
    { range: '95-100%', count: 312, color: '#10b981' },
    { range: '90-94%', count: 89, color: '#3b82f6' },
    { range: '85-89%', count: 45, color: '#f59e0b' },
    { range: '80-84%', count: 28, color: '#ef4444' },
    { range: 'Below 80%', count: 13, color: '#991b1b' }
]

const riskFactors = [
    { factor: 'Low Attendance', count: 41, severity: 'high' },
    { factor: 'Failing Grades', count: 22, severity: 'high' },
    { factor: 'Behavioral Issues', count: 15, severity: 'medium' },
    { factor: 'Academic Probation', count: 8, severity: 'high' }
]

function StudentSummary() {
    const atRiskStudents = riskFactors.reduce((sum, factor) => sum + factor.count, 0)
    const averageAttendance = 92.3

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            🎓 Student Overview
                        </CardTitle>
                        <CardDescription>
                            Student enrollment, performance, and risk assessment
                        </CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                        View All Students
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{studentStats.totalStudents}</div>
                        <div className="text-sm text-blue-700">Total Students</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{studentStats.activeStudents}</div>
                        <div className="text-sm text-green-700">Active</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{studentStats.newEnrollments}</div>
                        <div className="text-sm text-purple-700">New This Month</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{atRiskStudents}</div>
                        <div className="text-sm text-orange-700">At Risk</div>
                    </div>
                </div>

                {/* Grade Level Breakdown */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Grade Level Distribution
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {gradeBreakdown.map((grade) => (
                            <div key={grade.grade} className="p-3 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">{grade.grade} Grade</span>
                                    <Badge variant="secondary" style={{ backgroundColor: `${grade.color}20`, color: grade.color }}>
                                        {grade.percentage}%
                                    </Badge>
                                </div>
                                <div className="text-2xl font-bold" style={{ color: grade.color }}>
                                    {grade.count}
                                </div>
                                <Progress
                                    value={grade.percentage}
                                    className="h-2 mt-2"
                                    style={{ backgroundColor: `${grade.color}20` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance & Attendance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Academic Performance */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Academic Performance
                        </h4>
                        <div className="space-y-2">
                            {performanceData.map((item) => (
                                <div key={item.category} className="flex items-center justify-between p-2 rounded">
                                    <span className="text-sm">{item.category}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{item.count}</span>
                                        <div className="w-12 text-xs text-gray-500">{item.percentage}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Attendance Ranges */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Attendance Distribution
                        </h4>
                        <div className="space-y-2">
                            {attendanceData.map((item) => (
                                <div key={item.range} className="flex items-center justify-between p-2 rounded">
                                    <span className="text-sm">{item.range}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{item.count}</span>
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{averageAttendance}%</div>
                                <div className="text-sm text-gray-600">School Average Attendance</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Factors */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        Students at Risk
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {riskFactors.map((risk) => (
                            <div
                                key={risk.factor}
                                className={`p-3 rounded-lg border-l-4 ${risk.severity === 'high'
                                    ? 'border-l-red-500 bg-red-50'
                                    : 'border-l-yellow-500 bg-yellow-50'
                                    }`}
                            >
                                <div className="text-sm text-gray-600 mb-1">{risk.factor}</div>
                                <div className={`text-2xl font-bold ${risk.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                                    }`}>
                                    {risk.count}
                                </div>
                                <Badge
                                    variant="secondary"
                                    className={
                                        risk.severity === 'high'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }
                                >
                                    {risk.severity} risk
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    <Button variant="outline" className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Enroll Student
                    </Button>
                    <Button variant="outline" className="w-full">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        At-Risk Report
                    </Button>
                    <Button variant="outline" className="w-full">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Grade Reports
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export { StudentSummary } 