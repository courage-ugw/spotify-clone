import { Library } from "lucide-react";
import { PlayCircle, Users2 } from "lucide-react";
import { ListMusic } from "lucide-react"
import StatsCard from "./StatsCard"
import { useMusicStore } from "@/stores/useMusicStore"



const DashboardStats = () => {
    const { stats } = useMusicStore()

    const statsData = [
		{
			icon: ListMusic,
			label: "Total Songs",
			value: stats.totalSongs.toLocaleString(),
			bgColor: "bg-emerald-500/10",
			iconColor: "text-emerald-500",
		},
		{
			icon: Library,
			label: "Total Albums",
			value: stats.totalAlbums.toLocaleString(),
			bgColor: "bg-violet-500/10",
			iconColor: "text-violet-500",
		},
		{
			icon: Users2,
			label: "Total Artists",
			value: stats.totalArtists.toLocaleString(),
			bgColor: "bg-orange-500/10",
			iconColor: "text-orange-500",
		},
		{
			icon: PlayCircle,
			label: "Total Users",
			value: stats.totalUsers.toLocaleString(),
			bgColor: "bg-sky-500/10",
			iconColor: "text-sky-500",
		},
	]

	

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
        ))}
    </div>
  )
}

export default DashboardStats