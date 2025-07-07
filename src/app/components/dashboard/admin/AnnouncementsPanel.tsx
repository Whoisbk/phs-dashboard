"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Megaphone, Plus, Eye, Edit, Trash2, Pin, Users, Calendar, Clock } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Mock data - replace with actual Firebase data
const announcements = [
    {
        id: '1',
        title: 'Spring Break Schedule Update',
        content: 'Please note that spring break has been extended by one day. Classes will resume on April 8th instead of April 7th. All students and staff should plan accordingly.',
        author: 'Principal Johnson',
        authorAvatar: '/avatars/principal.jpg',
        priority: 'high',
        audience: 'all',
        status: 'published',
        isPinned: true,
        createdAt: '2024-03-10T09:00:00Z',
        expiresAt: '2024-03-25T23:59:59Z',
        views: 342,
        category: 'schedule'
    },
    {
        id: '2',
        title: 'New Library Hours',
        content: 'Starting Monday, the library will be open until 8 PM on weekdays to provide additional study space for students preparing for final exams.',
        author: 'Ms. Davis',
        authorAvatar: '/avatars/davis.jpg',
        priority: 'medium',
        audience: 'students',
        status: 'published',
        isPinned: false,
        createdAt: '2024-03-09T14:30:00Z',
        expiresAt: '2024-04-15T23:59:59Z',
        views: 156,
        category: 'facilities'
    },
    {
        id: '3',
        title: 'Parent-Teacher Conference Reminder',
        content: 'Don\'t forget to sign up for parent-teacher conferences scheduled for March 18-19. Online booking is available through the parent portal.',
        author: 'Mrs. Thompson',
        authorAvatar: '/avatars/thompson.jpg',
        priority: 'high',
        audience: 'parents',
        status: 'published',
        isPinned: true,
        createdAt: '2024-03-08T11:15:00Z',
        expiresAt: '2024-03-19T23:59:59Z',
        views: 278,
        category: 'events'
    },
    {
        id: '4',
        title: 'Cafeteria Menu Changes',
        content: 'Due to supply chain issues, we will be offering alternative menu items this week. Please check the updated menu posted in the cafeteria.',
        author: 'Mr. Wilson',
        authorAvatar: '/avatars/wilson.jpg',
        priority: 'low',
        audience: 'all',
        status: 'published',
        isPinned: false,
        createdAt: '2024-03-07T16:45:00Z',
        expiresAt: '2024-03-14T23:59:59Z',
        views: 89,
        category: 'facilities'
    },
    {
        id: '5',
        title: 'Science Fair Winners Announced',
        content: 'Congratulations to all participants in this year\'s science fair! Winners will be announced at the assembly on Friday.',
        author: 'Dr. Chen',
        authorAvatar: '/avatars/chen.jpg',
        priority: 'medium',
        audience: 'students',
        status: 'draft',
        isPinned: false,
        createdAt: '2024-03-06T13:20:00Z',
        expiresAt: '2024-03-20T23:59:59Z',
        views: 0,
        category: 'academic'
    }
]

const priorityConfig = {
    high: { color: 'bg-red-100 text-red-800', label: 'High Priority' },
    medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium Priority' },
    low: { color: 'bg-blue-100 text-blue-800', label: 'Low Priority' }
}

const audienceConfig = {
    all: { color: 'bg-purple-100 text-purple-800', label: 'All' },
    students: { color: 'bg-green-100 text-green-800', label: 'Students' },
    parents: { color: 'bg-blue-100 text-blue-800', label: 'Parents' },
    staff: { color: 'bg-orange-100 text-orange-800', label: 'Staff' }
}

const categoryConfig = {
    schedule: { icon: Calendar, label: 'Schedule' },
    events: { icon: Calendar, label: 'Events' },
    academic: { icon: Users, label: 'Academic' },
    facilities: { icon: Clock, label: 'Facilities' },
    general: { icon: Megaphone, label: 'General' }
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export function AnnouncementsPanel() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedTab, setSelectedTab] = useState<'published' | 'draft'>('published')

    const publishedAnnouncements = announcements.filter(a => a.status === 'published')
    const draftAnnouncements = announcements.filter(a => a.status === 'draft')
    const pinnedAnnouncements = publishedAnnouncements.filter(a => a.isPinned)

    const currentAnnouncements = selectedTab === 'published' ? publishedAnnouncements : draftAnnouncements

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            📝 School Announcements
                        </CardTitle>
                        <CardDescription>
                            Create and manage school-wide notices and communications
                        </CardDescription>
                    </div>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                New Announcement
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create New Announcement</DialogTitle>
                                <DialogDescription>
                                    Compose a new announcement for students, parents, or staff
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Title</label>
                                    <Input placeholder="Enter announcement title..." />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Content</label>
                                    <Textarea
                                        placeholder="Write your announcement content..."
                                        rows={4}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Priority</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="high">High Priority</SelectItem>
                                                <SelectItem value="medium">Medium Priority</SelectItem>
                                                <SelectItem value="low">Low Priority</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Audience</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select audience" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="students">Students</SelectItem>
                                                <SelectItem value="parents">Parents</SelectItem>
                                                <SelectItem value="staff">Staff</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Category</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="schedule">Schedule</SelectItem>
                                                <SelectItem value="events">Events</SelectItem>
                                                <SelectItem value="academic">Academic</SelectItem>
                                                <SelectItem value="facilities">Facilities</SelectItem>
                                                <SelectItem value="general">General</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Expires On</label>
                                        <Input type="date" />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                        Save as Draft
                                    </Button>
                                    <Button onClick={() => setIsCreateDialogOpen(false)}>
                                        Publish Now
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{publishedAnnouncements.length}</div>
                        <div className="text-sm text-blue-700">Published</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{draftAnnouncements.length}</div>
                        <div className="text-sm text-yellow-700">Drafts</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{pinnedAnnouncements.length}</div>
                        <div className="text-sm text-green-700">Pinned</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            {publishedAnnouncements.reduce((sum, a) => sum + a.views, 0)}
                        </div>
                        <div className="text-sm text-purple-700">Total Views</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <Button
                        variant={selectedTab === 'published' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTab('published')}
                    >
                        Published ({publishedAnnouncements.length})
                    </Button>
                    <Button
                        variant={selectedTab === 'draft' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTab('draft')}
                    >
                        Drafts ({draftAnnouncements.length})
                    </Button>
                </div>

                {/* Announcements List */}
                <div className="space-y-4">
                    {currentAnnouncements.map((announcement) => {
                        const priority = priorityConfig[announcement.priority as keyof typeof priorityConfig]
                        const audience = audienceConfig[announcement.audience as keyof typeof audienceConfig]
                        const CategoryIcon = categoryConfig[announcement.category as keyof typeof categoryConfig]?.icon || Megaphone

                        return (
                            <div
                                key={announcement.id}
                                className={cn(
                                    "p-4 rounded-lg border transition-all hover:shadow-md",
                                    announcement.isPinned && "border-blue-200 bg-blue-50",
                                    announcement.status === 'draft' && "border-yellow-200 bg-yellow-50"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {announcement.isPinned && (
                                                <Pin className="h-4 w-4 text-blue-600" />
                                            )}
                                            <CategoryIcon className="h-4 w-4 text-gray-600" />
                                            <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                                            <Badge variant="secondary" className={priority.color}>
                                                {priority.label}
                                            </Badge>
                                            <Badge variant="secondary" className={audience.color}>
                                                {audience.label}
                                            </Badge>
                                            {announcement.status === 'draft' && (
                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                    Draft
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                                            {announcement.content}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={announcement.authorAvatar} alt={announcement.author} />
                                                    <AvatarFallback className="text-xs">
                                                        {getInitials(announcement.author)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>{announcement.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(announcement.createdAt)}
                                            </div>
                                            {announcement.status === 'published' && (
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {announcement.views} views
                                                </div>
                                            )}
                                            <div>
                                                Expires: {formatDate(announcement.expiresAt)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 ml-4">
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <Pin className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {currentAnnouncements.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No {selectedTab} announcements found</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setIsCreateDialogOpen(true)}
                        >
                            Create Your First Announcement
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 