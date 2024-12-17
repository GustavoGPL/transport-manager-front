import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonChart() {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[180px] w-[180px] rounded-full" />
		</div>
	);
}
