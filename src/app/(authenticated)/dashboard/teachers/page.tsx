"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Search,
    Filter,
    MoreHorizontal,
    Download,
    UserPlus,
    Calendar,
    Mail,
    Edit,
    Trash2,
    Eye
} from "lucide-react"


// Mock data for teachers
const teachersData = [
    {
        id: "T001",
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@school.edu",
        phone: "(555) 123-4567",
        department: "Mathematics",
        subjects: ["Algebra", "Calculus", "Statistics"],
        employeeId: "EMP001",
        hireDate: "2018-08-15",
        status: "Active",
        experience: 12,
        education: "Master's in Mathematics",
        salary: 65000,
        performanceRating: 4.8,
        classesAssigned: 5,
        totalStudents: 125,
        address: "123 Main St, Cityville, ST 12345",
        emergencyContact: "Jane Smith - (555) 987-6543",
        certifications: ["Teaching License", "Advanced Mathematics"],
        lastLogin: "2024-01-15 09:30:00"
    },
    {
        id: "T002",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@school.edu",
        phone: "(555) 234-5678",
        department: "English",
        subjects: ["Literature", "Creative Writing", "Grammar"],
        employeeId: "EMP002",
        hireDate: "2020-01-10",
        status: "Active",
        experience: 8,
        education: "Master's in English Literature",
        salary: 58000,
        performanceRating: 4.6,
        classesAssigned: 4,
        totalStudents: 96,
        address: "456 Oak Ave, Townsburg, ST 67890",
        emergencyContact: "Mike Johnson - (555) 876-5432",
        certifications: ["Teaching License", "ESL Certification"],
        lastLogin: "2024-01-15 08:45:00"
    },
    {
        id: "T003",
        firstName: "Michael",
        lastName: "Davis",
        email: "michael.davis@school.edu",
        phone: "(555) 345-6789",
        department: "Science",
        subjects: ["Physics", "Chemistry", "Environmental Science"],
        employeeId: "EMP003",
        hireDate: "2016-09-01",
        status: "Active",
        experience: 15,
        education: "PhD in Physics",
        salary: 72000,
        performanceRating: 4.9,
        classesAssigned: 6,
        totalStudents: 150,
        address: "789 Pine St, Villagetown, ST 11111",
        emergencyContact: "Lisa Davis - (555) 765-4321",
        certifications: ["Teaching License", "Lab Safety", "Advanced Physics"],
        lastLogin: "2024-01-15 07:20:00"
    },
    {
        id: "T004",
        firstName: "Emily",
        lastName: "Brown",
        email: "emily.brown@school.edu",
        phone: "(555) 456-7890",
        department: "History",
        subjects: ["World History", "American History", "Government"],
        employeeId: "EMP004",
        hireDate: "2019-02-15",
        status: "Active",
        experience: 10,
        education: "Master's in History",
        salary: 61000,
        performanceRating: 4.7,
        classesAssigned: 4,
        totalStudents: 108,
        address: "321 Elm St, Hamlet, ST 22222",
        emergencyContact: "David Brown - (555) 654-3210",
        certifications: ["Teaching License", "History Research"],
        lastLogin: "2024-01-14 16:30:00"
    },
    {
        id: "T005",
        firstName: "Robert",
        lastName: "Wilson",
        email: "robert.wilson@school.edu",
        phone: "(555) 567-8901",
        department: "Physical Education",
        subjects: ["Physical Education", "Health", "Sports Medicine"],
        employeeId: "EMP005",
        hireDate: "2021-08-20",
        status: "Active",
        experience: 6,
        education: "Bachelor's in Kinesiology",
        salary: 52000,
        performanceRating: 4.5,
        classesAssigned: 8,
        totalStudents: 200,
        address: "654 Maple Dr, Countryside, ST 33333",
        emergencyContact: "Carol Wilson - (555) 543-2109",
        certifications: ["Teaching License", "CPR/First Aid", "Athletic Training"],
        lastLogin: "2024-01-15 06:15:00"
    },
    {
        id: "T006",
        firstName: "Lisa",
        lastName: "Anderson",
        email: "lisa.anderson@school.edu",
        phone: "(555) 678-9012",
        department: "Foreign Languages",
        subjects: ["Spanish", "French", "Italian"],
        employeeId: "EMP006",
        hireDate: "2017-01-30",
        status: "On Leave",
        experience: 11,
        education: "Master's in Foreign Languages",
        salary: 59000,
        performanceRating: 4.6,
        classesAssigned: 0,
        totalStudents: 0,
        address: "987 Cedar Ln, Riverside, ST 44444",
        emergencyContact: "Tom Anderson - (555) 432-1098",
        certifications: ["Teaching License", "Bilingual Education", "TESOL"],
        lastLogin: "2024-01-10 14:22:00"
    }
]

const departments = ["All Departments", "Mathematics", "English", "Science", "History", "Physical Education", "Foreign Languages", "Arts", "Computer Science"]

export default function TeachersPage() {
    const [teachers] = useState(teachersData)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
    const [selectedStatus, setSelectedStatus] = useState("All")
    const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
    const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false)

    // Filter teachers based on search and filters
    const filteredTeachers = teachers.filter(teacher => {
        const matchesSearch =
            teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesDepartment = selectedDepartment === "All Departments" || teacher.department === selectedDepartment
        const matchesStatus = selectedStatus === "All" || teacher.status === selectedStatus

        return matchesSearch && matchesDepartment && matchesStatus
    })

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedTeachers(filteredTeachers.map(teacher => teacher.id))
        } else {
            setSelectedTeachers([])
        }
    }

    const handleSelectTeacher = (teacherId: string, checked: boolean) => {
        if (checked) {
            setSelectedTeachers([...selectedTeachers, teacherId])
        } else {
            setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId))
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Active":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
            case "On Leave":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">On Leave</Badge>
            case "Inactive":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getPerformanceColor = (rating: number) => {
        if (rating >= 4.5) return "text-green-600"
        if (rating >= 4.0) return "text-blue-600"
        if (rating >= 3.5) return "text-yellow-600"
        return "text-red-600"
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
                    <p className="text-muted-foreground">
                        Manage teacher profiles, assignments, and performance
                    </p>
                </div>
                <div className="flex gap-2">

                    <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Add Teacher
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Teacher</DialogTitle>
                                <DialogDescription>
                                    Enter the teacher&apos;s information to create a new profile.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" placeholder="Enter first name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" placeholder="Enter last name" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="teacher@school.edu" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" placeholder="(555) 123-4567" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mathematics">Mathematics</SelectItem>
                                                <SelectItem value="english">English</SelectItem>
                                                <SelectItem value="science">Science</SelectItem>
                                                <SelectItem value="history">History</SelectItem>
                                                <SelectItem value="physical-education">Physical Education</SelectItem>
                                                <SelectItem value="foreign-languages">Foreign Languages</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="employeeId">Employee ID</Label>
                                        <Input id="employeeId" placeholder="EMP001" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                                    <Input id="subjects" placeholder="Algebra, Calculus, Statistics" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="education">Education</Label>
                                    <Input id="education" placeholder="Master&apos;s in Mathematics" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea id="address" placeholder="Full address" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddTeacherOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsAddTeacherOpen(false)}>
                                    Add Teacher
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>



            {/* Teachers Table */}
            <Card className="bg-slate-800/60 border border-slate-700/30 text-white">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white">Teachers Directory</CardTitle>
                            <CardDescription className="text-slate-400">
                                Manage and view all teacher information
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

                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search teachers by name, email, department, or subject..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Status</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="On Leave">On Leave</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedTeachers.length === filteredTeachers.length && filteredTeachers.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Teacher</TableHead>
                                    <TableHead>Employee ID</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Subjects</TableHead>
                                    <TableHead>Classes</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Performance</TableHead>
                                    <TableHead>Experience</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTeachers.map((teacher) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedTeachers.includes(teacher.id)}
                                                onCheckedChange={(checked) => handleSelectTeacher(teacher.id, checked as boolean)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.firstName} ${teacher.lastName}`} />
                                                    <AvatarFallback>{teacher.firstName[0]}{teacher.lastName[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{teacher.firstName} {teacher.lastName}</div>
                                                    <div className="text-sm text-muted-foreground">{teacher.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono text-sm">{teacher.employeeId}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{teacher.department}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="max-w-[200px]">
                                                <div className="flex flex-wrap gap-1">
                                                    {teacher.subjects.slice(0, 2).map((subject) => (
                                                        <Badge key={subject} variant="secondary" className="text-xs">
                                                            {subject}
                                                        </Badge>
                                                    ))}
                                                    {teacher.subjects.length > 2 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            +{teacher.subjects.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-center">
                                                <div className="font-medium">{teacher.classesAssigned}</div>
                                                <div className="text-xs text-muted-foreground">classes</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-center">
                                                <div className="font-medium">{teacher.totalStudents}</div>
                                                <div className="text-xs text-muted-foreground">students</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`font-medium ${getPerformanceColor(teacher.performanceRating)}`}>
                                                {teacher.performanceRating}/5
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm">{teacher.experience} years</span>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(teacher.status)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit Teacher
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        View Schedule
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Send Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Teacher
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredTeachers.length} of {teachers.length} teachers
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 