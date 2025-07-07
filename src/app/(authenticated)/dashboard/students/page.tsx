"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserPlus, Search, Filter, MoreHorizontal, Download, Edit, Trash2 } from "lucide-react"


// Mock student data
const studentsData = [
    {
        id: "ST001",
        name: "Alice Johnson",
        email: "alice.johnson@school.edu",
        grade: "12th",
        class: "12-A",
        status: "Active",
        gpa: 3.8,
        attendance: 95,
        phone: "+1 (555) 123-4567",
        guardianName: "Robert Johnson",
        guardianPhone: "+1 (555) 123-4568",
        enrolledDate: "2021-09-01",
        avatar: "/avatars/alice.jpg"
    },
    {
        id: "ST002",
        name: "Michael Chen",
        email: "michael.chen@school.edu",
        grade: "11th",
        class: "11-B",
        status: "Active",
        gpa: 3.2,
        attendance: 88,
        phone: "+1 (555) 234-5678",
        guardianName: "Lisa Chen",
        guardianPhone: "+1 (555) 234-5679",
        enrolledDate: "2022-09-01",
        avatar: "/avatars/michael.jpg"
    },
    {
        id: "ST003",
        name: "Sarah Williams",
        email: "sarah.williams@school.edu",
        grade: "10th",
        class: "10-A",
        status: "Active",
        gpa: 3.9,
        attendance: 97,
        phone: "+1 (555) 345-6789",
        guardianName: "David Williams",
        guardianPhone: "+1 (555) 345-6790",
        enrolledDate: "2023-09-01",
        avatar: "/avatars/sarah.jpg"
    },
    {
        id: "ST004",
        name: "James Rodriguez",
        email: "james.rodriguez@school.edu",
        grade: "12th",
        class: "12-B",
        status: "Inactive",
        gpa: 2.8,
        attendance: 72,
        phone: "+1 (555) 456-7890",
        guardianName: "Maria Rodriguez",
        guardianPhone: "+1 (555) 456-7891",
        enrolledDate: "2021-09-01",
        avatar: "/avatars/james.jpg"
    },
    {
        id: "ST005",
        name: "Emma Davis",
        email: "emma.davis@school.edu",
        grade: "9th",
        class: "9-A",
        status: "Active",
        gpa: 3.6,
        attendance: 92,
        phone: "+1 (555) 567-8901",
        guardianName: "Jennifer Davis",
        guardianPhone: "+1 (555) 567-8902",
        enrolledDate: "2024-09-01",
        avatar: "/avatars/emma.jpg"
    },
    {
        id: "ST006",
        name: "David Wilson",
        email: "david.wilson@school.edu",
        grade: "11th",
        class: "11-A",
        status: "Active",
        gpa: 3.4,
        attendance: 89,
        phone: "+1 (555) 678-9012",
        guardianName: "Mark Wilson",
        guardianPhone: "+1 (555) 678-9013",
        enrolledDate: "2022-09-01",
        avatar: "/avatars/david.jpg"
    },
]

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function getStatusColor(status: string) {
    switch (status) {
        case "Active": return "bg-green-100 text-green-800 border-green-200"
        case "Inactive": return "bg-red-100 text-red-800 border-red-200"
        case "Suspended": return "bg-yellow-100 text-yellow-800 border-yellow-200"
        default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
}

function getGpaColor(gpa: number) {
    if (gpa >= 3.5) return "text-green-600"
    if (gpa >= 3.0) return "text-yellow-600"
    return "text-red-600"
}

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [gradeFilter, setGradeFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedStudents, setSelectedStudents] = useState<string[]>([])

    // Filter students based on search and filters
    const filteredStudents = studentsData.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.id.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter
        const matchesStatus = statusFilter === "all" || student.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesGrade && matchesStatus
    })

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedStudents(filteredStudents.map(student => student.id))
        } else {
            setSelectedStudents([])
        }
    }

    const handleSelectStudent = (studentId: string, checked: boolean) => {
        if (checked) {
            setSelectedStudents([...selectedStudents, studentId])
        } else {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId))
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Students</h1>
                    <p className="text-slate-400 mt-1">
                        Manage student records and information
                    </p>
                </div>
                <div className="flex items-center gap-3">

                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Student
                    </Button>
                </div>
            </div>


            {/* Students Table */}
            <Card className="bg-slate-800/60 border border-slate-700/30 text-white">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white">Students Directory</CardTitle>
                            <CardDescription className="text-slate-400">
                                Manage and view all student information
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                                <Filter className="mr-2 h-4 w-4" />
                                Filters
                            </Button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex items-center gap-4 mt-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search students by name, email, or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                            />
                        </div>
                        <Select value={gradeFilter} onValueChange={setGradeFilter}>
                            <SelectTrigger className="w-32 bg-slate-800 border-slate-600 text-white">
                                <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                                <SelectItem value="all">All Grades</SelectItem>
                                <SelectItem value="9th">9th Grade</SelectItem>
                                <SelectItem value="10th">10th Grade</SelectItem>
                                <SelectItem value="11th">11th Grade</SelectItem>
                                <SelectItem value="12th">12th Grade</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-32 bg-slate-800 border-slate-600 text-white">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Bulk Actions */}
                    {selectedStudents.length > 0 && (
                        <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg mt-4">
                            <span className="text-sm text-slate-300">
                                {selectedStudents.length} student(s) selected
                            </span>
                            <Button size="sm" variant="outline" className="ml-auto border-slate-600 text-slate-300 hover:bg-slate-700">
                                Bulk Edit
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">
                                Delete Selected
                            </Button>
                        </div>
                    )}
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-700 hover:bg-slate-800/50">
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead className="text-slate-300">Student</TableHead>
                                <TableHead className="text-slate-300">Grade & Class</TableHead>
                                <TableHead className="text-slate-300">Status</TableHead>
                                <TableHead className="text-slate-300">GPA</TableHead>
                                <TableHead className="text-slate-300">Attendance</TableHead>
                                <TableHead className="text-slate-300">Guardian</TableHead>
                                <TableHead className="text-slate-300">Enrolled</TableHead>
                                <TableHead className="text-slate-300 w-12">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow key={student.id} className="border-slate-700 hover:bg-slate-800/50">
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedStudents.includes(student.id)}
                                            onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={student.avatar} alt={student.name} />
                                                <AvatarFallback className="bg-slate-700 text-slate-300">
                                                    {getInitials(student.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-white">{student.name}</div>
                                                <div className="text-sm text-slate-400">{student.email}</div>
                                                <div className="text-xs text-slate-500">{student.id}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-white">{student.grade}</div>
                                        <div className="text-sm text-slate-400">{student.class}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={getStatusColor(student.status)}>
                                            {student.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`font-medium ${getGpaColor(student.gpa)}`}>
                                            {student.gpa.toFixed(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white">{student.attendance}%</span>
                                            <div className="w-16 bg-slate-700 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${student.attendance >= 95 ? 'bg-green-500' :
                                                        student.attendance >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${student.attendance}%` }}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-white text-sm">{student.guardianName}</div>
                                        <div className="text-xs text-slate-400">{student.guardianPhone}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-white text-sm">
                                            {new Date(student.enrolledDate).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:bg-slate-800">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                                                <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <div className="text-sm text-slate-400">
                            Showing {filteredStudents.length} of {studentsData.length} students
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled className="border-slate-600 text-slate-400">
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                                1
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                                2
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 