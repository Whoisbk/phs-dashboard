import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo and Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
              <span className="text-2xl font-bold text-white">AS</span>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white">Phagameng</h1>

            </div>
          </div>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive school management platform for administrators, teachers, and students.
            Streamline your educational operations with our powerful dashboard.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Student Management</CardTitle>
              <CardDescription className="text-slate-400">
                Track 9,825+ students with comprehensive profiles and academic records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-2">9,825</div>
              <p className="text-sm text-slate-500">Total Students</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Teacher Analytics</CardTitle>
              <CardDescription className="text-slate-400">
                Manage 653 teachers across multiple departments and subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400 mb-2">653</div>
              <p className="text-sm text-slate-500">Total Teachers</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Event Calendar</CardTitle>
              <CardDescription className="text-slate-400">
                Schedule and track 345+ school events and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400 mb-2">345</div>
              <p className="text-sm text-slate-500">Scheduled Events</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="pt-8">
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Access Dashboard
            </Button>
          </Link>
          <p className="text-slate-500 text-sm mt-3">
            Experience the full Phagameng management system
          </p>
        </div>

        {/* Footer */}
        <footer className="pt-12 pb-6">
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-500 text-sm">
              © 2024 Phagameng. Built with Next.js and shadcn/ui
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
