"use client";
import { useState, useEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LevelData } from "@/types/level";
import getVideoId from "@/functions/getVideoId";
import autoAnimate from "@formkit/auto-animate";
import {useLocales} from "@/hooks/useLocales";

type Props = {
  level: LevelData;
  index: number;
};

export default function SortableLevel(props: Props) {
  const {locale} = useLocales()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.level.id,
    });

  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = getVideoId(props.level.verification_url);

  useEffect(() => {
    if (containerRef.current) autoAnimate(containerRef.current);
  }, []);

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
      className="bg-(--card-bg) p-4 mb-4 rounded-xl border border-white/10 text-white backdrop-blur-lg"
    >
      <div
        className="text-sm opacity-70 mb-1 flex items-center cursor-move select-none"
        {...attributes}
        {...listeners}
        data-dnd-kit-drag-handle
        style={{
          touchAction: "none",
        }}
      >
        <div className="flex justify-between w-full">
          <p>#{props.index + 1}</p>
          <p>≡</p>
        </div>
      </div>

      <p className="font-semibold mb-2">{props.level.name}</p>

      <button
        onClick={toggle}
        className="flex items-center gap-1 text-sm text-(--neon-blue) mb-3 cursor-pointer select-none"
      >
        {expanded
          ? locale("video.hide")
          : locale("video.show")}
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
              title={props.level.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
