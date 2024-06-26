import { FeedIcon } from "@renderer/components/feed-icon"
import { Image } from "@renderer/components/ui/image"
import dayjs from "@renderer/lib/dayjs"
import { cn } from "@renderer/lib/utils"
import { useEntry } from "@renderer/store/entry"

import { ReactVirtuosoItemPlaceholder } from "../ui/placeholder"
import type { UniversalItemProps } from "./types"

export function ArticleItem({ entryId, entryPreview }: UniversalItemProps) {
  const entry = useEntry(entryId) || entryPreview

  // NOTE: prevent 0 height element, react virtuoso will not stop render any more
  if (!entry) return <ReactVirtuosoItemPlaceholder />

  return (
    <div className="flex px-2 py-3">
      <FeedIcon feed={entry.feeds} />
      <div className="-mt-0.5 line-clamp-4 flex-1 text-sm leading-tight">
        <div className={cn("flex gap-1 text-[10px] font-bold", entry.read ? "text-zinc-400" : "text-zinc-500")}>
          <span className="truncate">{entry.feeds.title}</span>
          <span>·</span>
          <span className="shrink-0">
            {dayjs
              .duration(
                dayjs(entry.entries.publishedAt).diff(dayjs(), "minute"),
                "minute",
              )
              .humanize()}
          </span>
        </div>
        <div className={cn("relative my-0.5 break-words font-medium", !!entry.collections && "pr-4")}>
          {entry.entries.title}
          {!!entry.collections && (
            <i className="i-mingcute-star-fill absolute right-0 top-0.5 text-orange-400" />
          )}
        </div>
        <div className={cn("text-[13px]", entry.read ? "text-zinc-400" : "text-zinc-500")}>
          {entry.entries.description}
        </div>
      </div>
      {entry.entries.images?.[0] && (
        <Image
          src={entry.entries.images[0]}
          className="ml-2 size-20 shrink-0"
          loading="lazy"
          proxy={{
            width: 160,
            height: 160,
          }}
        />
      )}
    </div>
  )
}
