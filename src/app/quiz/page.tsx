"use client";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BgWrapper from "@/components/BgWrapper"; // путь под себя

type LevelData = {
  id: number;
  name: string;
  video: string;
  place: number;
};

function SortableLevel({ level, index }: { level: LevelData; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: level.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
        <iframe
          className="w-full h-full"
          src={level.video.replace("watch?v=", "embed/")}
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [levels, setLevels] = useState<LevelData[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api.demonlist.org/levels/classic"
      );
      const data = await res.json();
      const random10 = data.data.sort(() => 0.5 - Math.random()).slice(0, 10);
      setLevels(random10);
    };
    fetchLevels();
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = levels.findIndex((lvl) => lvl.id === active.id);
      const newIndex = levels.findIndex((lvl) => lvl.id === over.id);
      setLevels((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("gdquiz_levels", JSON.stringify(levels));
  };

  return (
    <>
      <BgWrapper />
      <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          Перетащи уровни по сложности
        </h1>
        <p className="text-center text-sm text-gray-400 mb-6">
          Сверху — самый сложный, снизу — самый лёгкий
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={levels.map((lvl) => lvl.id)}
            strategy={verticalListSortingStrategy}
          >
            {levels.map((level, index) => (
              <SortableLevel key={level.id} level={level} index={index} />
            ))}
          </SortableContext>
        </DndContext>

        <button
          onClick={handleSubmit}
          className="mt-6 px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:shadow-xl transition block mx-auto"
        >
          <a href="/result">Отправить топ</a>
        </button>
      </div>
    </>
  );
}
