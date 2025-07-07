
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your Phagameng dashboard
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-xl bg-slate-800/60 p-3 border border-slate-700/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">487</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-xl bg-slate-800/60 p-3 border border-slate-700/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            +2 new this month
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-xl bg-slate-800/60 p-3 border border-slate-700/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">
                            Across 4 grade levels
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-xl bg-slate-800/60 p-3 border border-slate-700/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.2%</div>
                        <p className="text-xs text-muted-foreground">
                            +0.8% from last week
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* School Performance and Upcoming Events Row */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* School Performance Section */}
                <Card className="lg:col-span-2 rounded-xl bg-slate-800/60 border border-slate-700/30">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-white">School Performance</CardTitle>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-blue-600 text-white">Students</Badge>
                                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                    <span className="text-sm text-slate-400">Teachers</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <span className="text-sm">This Month</span>
                                    <ChevronDown className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Chart Container */}
                        <div className="relative h-64 mb-4">
                            {/* Y-axis labels */}
                            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400">
                                <span>80</span>
                                <span>60</span>
                                <span>40</span>
                                <span>20</span>
                                <span>0</span>
                            </div>

                            {/* Chart area with simulated curves */}
                            <div className="ml-8 h-full relative">
                                {/* Grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="border-t border-slate-700/30"></div>
                                    ))}
                                </div>

                                {/* Simulated chart curves */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                                    {/* Students curve (blue) */}
                                    <path
                                        d="M0,80 Q50,40 80,50 Q120,60 160,30 Q200,40 240,45 Q280,20 320,35 Q360,50 400,45"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="3"
                                        className="drop-shadow-sm"
                                    />
                                    <path
                                        d="M0,80 Q50,40 80,50 Q120,60 160,30 Q200,40 240,45 Q280,20 320,35 Q360,50 400,45 L400,200 L0,200 Z"
                                        fill="url(#blueGradient)"
                                        opacity="0.3"
                                    />

                                    {/* Teachers curve (green) */}
                                    <path
                                        d="M0,120 Q50,100 80,110 Q120,90 160,85 Q200,80 240,75 Q280,70 320,160 Q360,170 400,175"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="3"
                                        className="drop-shadow-sm"
                                    />
                                    <path
                                        d="M0,120 Q50,100 80,110 Q120,90 160,85 Q200,80 240,75 Q280,70 320,160 Q360,170 400,175 L400,200 L0,200 Z"
                                        fill="url(#greenGradient)"
                                        opacity="0.3"
                                    />

                                    {/* Gradients */}
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                                            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
                                        </linearGradient>
                                        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
                                            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
                                        </linearGradient>
                                    </defs>

                                    {/* Data points */}
                                    <circle cx="240" cy="45" r="4" fill="#3b82f6" />
                                </svg>
                            </div>
                        </div>

                        {/* X-axis labels */}
                        <div className="flex justify-between text-xs text-slate-400 mb-4">
                            {['Week 01', 'Week 02', 'Week 03', 'Week 04', 'Week 05', 'Week 06', 'Week 07', 'Week 08', 'Week 09', 'Week 10'].map((week) => (
                                <span key={week}>{week}</span>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-400">January, 2022</div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <span className="text-2xl font-bold text-white">37</span>
                                    <span className="text-sm text-slate-400">Students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <span className="text-2xl font-bold text-white">2</span>
                                    <span className="text-sm text-slate-400">Teachers</span>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                <span className="text-sm text-slate-300">Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                <span className="text-sm text-slate-300">Teachers</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Events Section */}
                <Card className="rounded-xl bg-slate-800/60 border border-slate-700/30">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-white">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Event 1 */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">3</div>
                                <div className="text-xs text-slate-400">Wed</div>
                                <div className="w-2 h-2 rounded-full bg-blue-600 mx-auto mt-1"></div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-white text-sm">School Live Concert Chair</h4>
                                <p className="text-xs text-slate-400">Charity Event 2022</p>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-slate-500">Ticket Sold</span>
                                    <span className="text-xs text-slate-300">561/650</span>
                                </div>
                                <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
                                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: '86%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Event 2 */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">28</div>
                                <div className="text-xs text-slate-400">Fri</div>
                                <div className="w-2 h-2 rounded-full bg-green-600 mx-auto mt-1"></div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-white text-sm">The Story Of Danau Toba</h4>
                                <p className="text-xs text-slate-400">(Musical Drama)</p>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-slate-500">Ticket Sold</span>
                                    <span className="text-xs text-slate-300">650/650</span>
                                </div>
                                <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
                                    <div className="bg-green-600 h-1 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-700/50">
                            <span className="text-sm text-slate-400">5 events more</span>
                            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                View more
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                            +New Events
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* School Event Calendar */}
            <Card className="rounded-xl bg-slate-800/60 border border-slate-700/30">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold text-white">School Event Calendar</CardTitle>
                            <CardDescription className="text-slate-400 mt-1">
                                You have 245 Events
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-white">December 2024</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Days of Week Header */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, index) => (
                            <div
                                key={day}
                                className={`text-center py-2 px-3 rounded-lg text-sm font-medium ${index === 6 ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
                                    }`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                        {/* Calendar Days */}
                        {[
                            { day: 30, isOtherMonth: true },
                            { day: 1 },
                            { day: 2, hasEvent: true, isSelected: true },
                            { day: 3 },
                            { day: 4, hasEvent: true, isSelected: true },
                            { day: 5 },
                            { day: 6, isWeekend: true },
                            { day: 7 },
                            { day: 8 },
                            { day: 9 },
                            { day: 10 },
                            { day: 11 },
                            { day: 12 },
                            { day: 13, isWeekend: true },
                            { day: 14 },
                            { day: 15, hasEvent: true, isSelected: true, eventType: 'active' },
                            { day: 16 },
                            { day: 17 },
                            { day: 18 },
                            { day: 19 },
                            { day: 20, isWeekend: true },
                            { day: 21 },
                            { day: 22 },
                            { day: 23 },
                            { day: 24 },
                            { day: 25 },
                            { day: 26 },
                            { day: 27, isWeekend: true },
                            { day: 28 },
                            { day: 29 },
                            { day: 30 },
                            { day: 31 },
                            { day: 1, isOtherMonth: true },
                            { day: 2, isOtherMonth: true },
                            { day: 3, isOtherMonth: true },
                        ].map((date, index) => (
                            <div
                                key={index}
                                className={`
                                    aspect-square flex items-center justify-center text-sm relative rounded-lg cursor-pointer
                                    ${date.isOtherMonth ? 'text-slate-600' : 'text-slate-300 hover:bg-slate-700/50'}
                                    ${date.isWeekend && !date.isOtherMonth ? 'text-red-400' : ''}
                                    ${date.isSelected ? 'bg-slate-600 text-white font-medium' : ''}
                                `}
                            >
                                {date.day}
                                {date.hasEvent && (
                                    <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${date.eventType === 'active' ? 'bg-green-400' : 'bg-blue-400'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 