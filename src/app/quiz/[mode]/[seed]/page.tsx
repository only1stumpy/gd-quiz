"use client";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableLevel from "@/components/ui/SortableLevel";
import HowToPlay from "@/components/ui/HowToPlay";
import {useLocales} from "@/hooks/useLocales";
import {ErrorPage} from "@/components/ui/ErrorPage";
import {Button} from "@/components/ui/Button";
import {useQuiz} from "@/hooks/useQuiz";


export default function QuizPage() {
  const {locale} = useLocales()
  const {
    error,
    showHowToPlay,
    handleShowHowToPlay,
    levelCount,
    isLoading,
    currentLevel,
    currentIndex,
    selectedLevels,
    videoId,
    handleNext,
    watchedLevels,
    sensors,
    handleDragEnd,
    handleSubmit
  } = useQuiz();

  if (error) return <ErrorPage locale={locale}/>

  return (
      <>
        {showHowToPlay && (
            <HowToPlay onClose={handleShowHowToPlay} num={levelCount}/>
        )}
        {isLoading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div
                    className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-(--neon-blue) mb-4"></div>
                <p className="text-white text-xl">
                  {locale("quiz.loading")}
                </p>
              </div>
            </div>
        ) : (
            <div
                className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white relative animate-[slideUp_1s_ease-out_0.5s_both]">
              <button
                  onClick={handleShowHowToPlay}
                  aria-label={locale("quiz.instructions")}
                  className="text-sm text-(--neon-blue) hover:underline cursor-pointer absolute top-10 right-4 font-semibold border border-(--neon-blue) rounded-full px-3 py-1 transition duration-300 ease-linear hover:bg-(--neon-blue) hover:text-white shadow-[0_0_10px_rgba(0,255,255,0.5)] z-10 hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] animate-[fadeIn_1s_ease-out_1s_both]"
              >
                i
              </button>
              <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
                {locale("quiz.title")}
              </h1>
              {currentLevel ? (
                  <div className="mb-8 animate-[slideUp_1s_ease-out_0.7s_both]">
                    <p className="text-center font-semibold mb-2">
                      {locale("quiz.level")}
                      {currentIndex + 1} / {selectedLevels.length} —{" "}
                      {currentLevel.name}
                    </p>
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                      <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`${currentLevel.name} - Geometry Dash level showcase`}
                          allowFullScreen
                          className="w-full h-full"
                      />
                    </div>
                    <div className="text-center mt-6">
                      <Button type="main"
                              onClick={handleNext}
                              textContent={currentIndex < levelCount - 1
                                  ? locale("quiz.next")
                                  : locale("quiz.top")}
                      />
                    </div>
                  </div>
              ) : null}

              {watchedLevels.length > 0 && (
                  <div className="animate-[slideUp_1s_ease-out_1s_both]">
                    <h2 className="text-xl font-semibold text-center mb-2">
                      {locale("quiz.topTitle")}
                    </h2>
                    <p className="text-center text-sm text-gray-400 mb-4">
                      {locale("quiz.topInstructions")}
                    </p>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                          items={watchedLevels.map((lvl) => lvl.id)}
                          strategy={verticalListSortingStrategy}
                      >
                        {watchedLevels.map((level, index) => (
                            <SortableLevel level={level} index={index} key={level.id}/>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
              )}

              {watchedLevels.length === levelCount && levelCount > 0 &&(
                  <div className="text-center mt-8">
                    <Button
                        onClick={handleSubmit}
                        type="main"
                        textContent={locale("quiz.submit")}
                    />
                  </div>
              )}
            </div>
        )}
      </>
  );
}
