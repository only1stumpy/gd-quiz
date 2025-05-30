"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ILevelData } from "@/types/level";
import getVideoId from "@/functions/getVideoId";

export default function SortableLevel({
  level,
  index,
}: {
  level: ILevelData;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: level.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const videoId = getVideoId(level.video);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[var(--card-bg)] p-4 mb-4 rounded-xl border border-white/10 text-white backdrop-blur-lg cursor-move"
    >
      <div className="text-sm opacity-70 mb-1">#{index + 1}</div>
      <p className="font-semibold mb-2">{level.name}</p>
      <div className="aspect-video w-full rounded-md overflow-hidden border border-white/10">
        {videoId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
