"use client";
import { useState, useEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ILevelData } from "@/types/level";
import getVideoId from "@/functions/getVideoId";
import autoAnimate from "@formkit/auto-animate";
import useLanguageStore from "@/store/useLanguageStore";

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

  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = getVideoId(level.video);
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    if (containerRef.current) autoAnimate(containerRef.current);
  }, [containerRef]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setExpanded((prev) => !prev);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[var(--card-bg)] p-4 mb-4 rounded-xl border border-white/10 text-white backdrop-blur-lg"
    >
      <div
        className="text-sm opacity-70 mb-1 flex items-center cursor-move select-none"
        {...attributes}
        {...listeners}
        data-dnd-kit-drag-handle
        onTouchStart={(e) => e.preventDefault()}
        style={{
          touchAction: "none",
        }}
      >
        <div className="flex justify-between w-full">
          <p>#{index + 1}</p>
          <p>≡</p>
        </div>
      </div>

      <p className="font-semibold mb-2">{level.name}</p>

      <button
        onClick={toggle}
        className="flex items-center gap-1 text-sm text-[var(--neon-blue)] mb-3 cursor-pointer select-none"
      >
        {expanded
          ? language === "en"
            ? "Hide video"
            : "Скрыть видео"
          : language === "en"
          ? "Show video"
          : "Показать видео"}
        <span
          className={`transform transition-transform duration-300 ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      <div ref={containerRef}>
        {expanded && videoId && (
          <div className="aspect-video w-full rounded-md overflow-hidden border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
