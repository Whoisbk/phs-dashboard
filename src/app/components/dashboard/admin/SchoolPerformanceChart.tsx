"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

// Mock data - replace with actual Firebase data
const gradeDistributionData = [
    { grade: 'A', count: 45, percentage: 25 },
    { grade: 'B', count: 68, percentage: 38 },
    { grade: 'C', count: 42, percentage: 23 },
    { grade: 'D', count: 18, percentage: 10 },
    { grade: 'F', count: 7, percentage: 4 },
]

const attendanceData = [
    { month: 'Sep', attendance: 94 },
    { month: 'Oct', attendance: 92 },
    { month: 'Nov', attendance: 89 },
    { month: 'Dec', attendance: 87 },
    { month: 'Jan', attendance: 91 },
    { month: 'Feb', attendance: 93 },
]

const gpaData = [
    { subject: 'Math', gpa: 3.2 },
    { subject: 'English', gpa: 3.5 },
    { subject: 'Science', gpa: 3.1 },
    { subject: 'History', gpa: 3.4 },
    { subject: 'Art', gpa: 3.7 },
    { subject: 'PE', gpa: 3.8 },
]

const passFailData = [
    { name: 'Pass', value: 87, color: '#10b981' },
    { name: 'Fail', value: 13, color: '#ef4444' },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export function SchoolPerformanceChart() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    📊 School Performance Analytics
                </CardTitle>
                <CardDescription>
                    Comprehensive overview of academic performance and attendance trends
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="grades" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="grades">Grade Distribution</TabsTrigger>
                        <TabsTrigger value="gpa">GPA by Subject</TabsTrigger>
                        <TabsTrigger value="attendance">Attendance</TabsTrigger>
                        <TabsTrigger value="passfail">Pass/Fail Rate</TabsTrigger>
                    </TabsList>

                    <TabsContent value="grades" className="mt-6">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={gradeDistributionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="grade" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name) => [
                                            name === 'count' ? `${value} students` : `${value}%`,
                                            name === 'count' ? 'Students' : 'Percentage'
                                        ]}
                                    />
                                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-5 gap-4">
                            {gradeDistributionData.map((item, index) => (
                                <div key={item.grade} className="text-center">
                                    <div className="text-2xl font-bold" style={{ color: COLORS[index] }}>
                                        {item.count}
                                    </div>
                                    <div className="text-sm text-gray-600">Grade {item.grade}</div>
                                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="gpa" className="mt-6">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={gpaData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="subject" />
                                    <YAxis domain={[0, 4]} />
                                    <Tooltip formatter={(value) => [`${value} GPA`, 'Average GPA']} />
                                    <Bar dataKey="gpa" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="attendance" className="mt-6">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[80, 100]} />
                                    <Tooltip formatter={(value) => [`${value}%`, 'Attendance Rate']} />
                                    <Line
                                        type="monotone"
                                        dataKey="attendance"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">91.2%</div>
                            <div className="text-sm text-gray-600">Average Attendance Rate</div>
                        </div>
                    </TabsContent>

                    <TabsContent value="passail" className="mt-6">
                        <div className="h-80 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={passFailData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {passFailData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value}%`, 'Rate']} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {passFailData.map((item) => (
                                <div key={item.name} className="text-center">
                                    <div
                                        className="text-3xl font-bold"
                                        style={{ color: item.color }}
                                    >
                                        {item.value}%
                                    </div>
                                    <div className="text-sm text-gray-600">{item.name} Rate</div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
} 