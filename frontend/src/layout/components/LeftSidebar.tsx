import { Link } from "react-router-dom"
import { HomeIcon, LibraryIcon, MessageCircleIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react"

const LeftSidebar = () => {
    const { albums, isLoading, fetchAlbums } = useMusicStore()

    useEffect(() => {
        fetchAlbums()
    }, [fetchAlbums])

  return (
    <div className="h-full flex flex-col gap-2">
        {/* Navigation menu */}
        <div className="rounded-lg bg-zinc-900 p-4">
            <div className="space-y-2">
                <Link to="/" className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start text-white hover:bg-zinc-800"
                )}>
                    <HomeIcon className="mr-2 size-5" />
                    <span className="hidden md:inline">Home</span>
                </Link>

                <SignedIn>
                    <Link to="/chat" className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full justify-start text-white hover:bg-zinc-800"
                    )}>
                        <MessageCircleIcon className="mr-2 size-5" />
                        <span className="hidden md:inline">Chat</span>
                    </Link>
                </SignedIn>
            </div>
        </div>

        {/* Library section */}
        <div className="rounded-lg bg-zinc-900 p-4 flex-1">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center text-white pt-2">
                <LibraryIcon className="size-5 mr-2" />
                <span className="hidden md:inline">Playlists</span>
               </div>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2">
                    {isLoading ? (
                        <PlaylistSkeleton />
                    ) : (
                        // TODO: Add playlists
                        albums.map((album) => (
                            <div key={album._id }>
                                <Link to={`/albums/${album._id}`} key={album._id} className={"p-2 rounded-md hover:bg-zinc-800 flex items-center gap-3 group cursor-pointer"}>
                                    <img src={album.imageUrl} alt={album.title} className="size-12 rounded-md flex-shrink-0 object-cover" />
                                    <div className="flex-1 min-w-0 hidden md:block">
                                        <p className="font-medium truncate">{album.title}</p>
                                        <p className="text-sm text-zinc-400 truncate">Album • {album.artist}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    </div>
  )
}

export default LeftSidebar