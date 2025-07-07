"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Users, BookOpen, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with actual Firebase data
const upcomingEvents = [
    {
        id: '1',
        title: 'Math Final Exam',
        type: 'exam',
        date: '2024-03-15',
        time: '09:00',
        location: 'Room 101',
        participants: 28,
        priority: 'high'
    },
    {
        id: '2',
        title: 'Parent-Teacher Conference',
        type: 'meeting',
        date: '2024-03-18',
        time: '14:00',
        location: 'Main Hall',
        participants: 45,
        priority: 'medium'
    },
    {
        id: '3',
        title: 'Science Fair',
        type: 'event',
        date: '2024-03-20',
        time: '10:00',
        location: 'Gymnasium',
        participants: 120,
        priority: 'medium'
    },
    {
        id: '4',
        title: 'Spring Term Ends',
        type: 'term',
        date: '2024-03-25',
        time: '15:30',
        location: 'School-wide',
        participants: 0,
        priority: 'high'
    },
    {
        id: '5',
        title: 'Staff Meeting',
        type: 'meeting',
        date: '2024-03-12',
        time: '16:00',
        location: 'Conference Room',
        participants: 15,
        priority: 'low'
    }
]

const eventTypeConfig = {
    exam: { icon: BookOpen, color: 'bg-red-100 text-red-800', label: 'Exam' },
    meeting: { icon: Users, color: 'bg-blue-100 text-blue-800', label: 'Meeting' },
    event: { icon: Calendar, color: 'bg-green-100 text-green-800', label: 'Event' },
    term: { icon: Calendar, color: 'bg-purple-100 text-purple-800', label: 'Term Date' }
}

const priorityConfig = {
    high: 'border-l-red-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-green-500'
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays < 7) return `In ${diffDays} days`

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    })
}

export function UpcomingEvents() {
    // Sort events by date
    const sortedEvents = upcomingEvents
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5) // Show only next 5 events

    return (
        <Card className="w-full h-fit">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            📅 Upcoming Events
                        </CardTitle>
                        <CardDescription>
                            Next exams, meetings, and important dates
                        </CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sortedEvents.map((event) => {
                        const EventIcon = eventTypeConfig[event.type as keyof typeof eventTypeConfig].icon
                        const eventColor = eventTypeConfig[event.type as keyof typeof eventTypeConfig].color
                        const eventLabel = eventTypeConfig[event.type as keyof typeof eventTypeConfig].label

                        return (
                            <div
                                key={event.id}
                                className={cn(
                                    "p-4 rounded-lg border-l-4 bg-white shadow-sm hover:shadow-md transition-shadow",
                                    priorityConfig[event.priority as keyof typeof priorityConfig]
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <EventIcon className="h-4 w-4 text-gray-600" />
                                            <Badge variant="secondary" className={eventColor}>
                                                {eventLabel}
                                            </Badge>
                                        </div>

                                        <h4 className="font-semibold text-gray-900 mb-1">
                                            {event.title}
                                        </h4>

                                        <div className="space-y-1 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3" />
                                                <span>{formatDate(event.date)}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3 w-3" />
                                                <span>{event.time}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="text-xs">📍</span>
                                                <span>{event.location}</span>
                                            </div>

                                            {event.participants > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-3 w-3" />
                                                    <span>{event.participants} participants</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-xs font-medium text-gray-500 uppercase">
                                            {event.priority} priority
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-6 pt-4 border-t">
                    <Button variant="ghost" className="w-full text-sm">
                        View All Events
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 