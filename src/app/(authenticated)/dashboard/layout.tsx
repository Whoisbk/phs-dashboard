import DashboardLayout from "@/app/layouts/dashboard/layout"

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
} 