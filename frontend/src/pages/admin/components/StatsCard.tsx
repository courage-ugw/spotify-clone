import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"


interface StatsCardProps {
    icon: React.ElementType
    label: string
    value: string
    bgColor: string
    iconColor: string
}
const StatsCard = ({label, icon: Icon, value, bgColor, iconColor }: StatsCardProps) => {
  return (
    <div className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <Card className='bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors'>
			<CardContent className='p-6'>
				<div className='flex items-center gap-4'>
					<div className={`p-3 rounded-lg ${bgColor}`}>
						<Icon className={`size-6 ${iconColor}`} /> {/* Icon coming as a prop and used as a component */}
					</div>
					<div>
						<p className='text-sm text-zinc-400'>{label}</p>
						<p className='text-2xl font-bold'>{value}</p>
					</div>
				</div>
			</CardContent>
		</Card>
    </div>
  )
}

export default StatsCard