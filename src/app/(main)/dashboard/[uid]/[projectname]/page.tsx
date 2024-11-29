"use client"

import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation"
import { auth } from "@/app/firebase/config"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload, FileText, Settings, Users, BarChart2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface ProjectProps {
  params: {
    uid: string
    projectname: string
  }
}

export default function Project({ params }: ProjectProps) {
  const { uid, projectname } = params
  const [user, loading] = useAuthState(auth)
  const { toast } = useToast()
  const router = useRouter()
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!loading && user?.uid !== uid) {
      router.push("/dashboard")
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You do not have permission to view this project.",
        duration: 4000,
      })
    }
  }, [user, loading, uid, router, toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || user.uid !== uid) {
    return null // Render nothing if not authorized
  }

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName)
    setIsMobileMenuOpen(false) // Close mobile menu after selection
    console.log(`${buttonName} button clicked`)
  }

  const sidebarButtons = [
    { name: "Upload Document", icon: Upload },
    { name: "View Documents", icon: FileText },
    { name: "Team Members", icon: Users },
    { name: "Analytics", icon: BarChart2 },
    { name: "Settings", icon: Settings },
  ]

  const SidebarContents = () => (
    <>
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2 text-white">{projectname}</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarButtons.map((button) => (
            <SidebarMenuItem key={button.name}>
              <SidebarMenuButton
                onClick={() => handleButtonClick(button.name)}
                isActive={activeButton === button.name}
                className=" text-white"
              >
                <button.icon className="mr-3 h-5 w-5 text-white" />
                {button.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  )

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-foreground">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex">
          <SidebarContents />
        </Sidebar>

        {/* Mobile Hamburger Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden fixed top-20 left-4 z-50">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[240px] sm:w-[300px] bg-zinc-900  border-r">
            <SidebarContents />
          </SheetContent>
        </Sheet>

        <main className="flex-1 overflow-y-auto p-6 pt-16 md:pt-6">
          <h1 className="text-3xl font-bold mb-6 text-white">Welcome to {projectname}</h1>
          {activeButton && (
            <Card>
              <CardHeader>
                <CardTitle>{activeButton}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Content for {activeButton} goes here.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </SidebarProvider>
  )
}