
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonCard () {
    return (
        <div className="flex rounded bg-white items-center p-3 mb-5 shadow-sm">
            <div className="flex gap-3 items-center">
                <Skeleton height={`1.25rem`} width={`1.25rem`} />
                <Skeleton height={`1.25rem`} width={`38rem`} />
            </div>
        </div>
    )
}