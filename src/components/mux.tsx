'use client'

import { cn } from '@/lib/utils'
import getVideo from '@/utils/getVideo'
import MuxPlayer from '@mux/mux-player-react'
import { useQuery } from '@tanstack/react-query'
import ErrorBoundary from './error-boundary'

export default function MuxVideo({
  assetKey,
  className
}: {
  assetKey: string;
  className?: string;
}) {
  const { isPending, error, data } = useQuery({ queryFn: async () => getVideo(assetKey), queryKey: [`asset-${assetKey}`] })
  if (isPending || !!error || !data) return <>{data || "data"}</>
  return (
    <ErrorBoundary
      fallback={
        null
      }
    >
      <div className="flex w-full justify-center my-8">
        <div className={cn(className, "[filter:url(#glow)] rounded-xl overflow-hidden", `aspect-[${data.video.asset.data.aspect_ratio.replace(":", " / ")}]`)}>
          <MuxPlayer playbackId={data.video.asset.playbackId} />
        </div>
      </div>
    </ErrorBoundary>
  )
}