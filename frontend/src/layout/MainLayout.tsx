import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar"
import FriendsActivity from "./components/FriendsActivity"
import AudioPlayer from "./components/AudioPlayer"
import PlaybackControls from "./components/PlaybackControls"
import { useEffect, useState } from "react"

const MainLayout = () => {
    // TODO: Add mobile state to the store
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    },[])

  return (
    <div className="flex flex-col h-screen bg-black text-white">
        <ResizablePanelGroup direction={"horizontal"} className="flex-1 flex h-full overflow-hidden p-2">
            <AudioPlayer />

            {/* Left Sidebar */} 
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={isMobile ? 20 : 30}>
                <LeftSidebar />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-color" />

            {/* Main Content */}
            <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                <Outlet />
            </ResizablePanel>

            {!isMobile && (
                <>
                    <ResizableHandle className="w-2 bg-black rounded-lg transition-color" />

                    {/* Right Sidebar */}
                    <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                        <FriendsActivity />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>

        <PlaybackControls />

    </div>
  )
}

export default MainLayout