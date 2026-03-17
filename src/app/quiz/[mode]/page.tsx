"use client";


import {useLocales} from "@/hooks/useLocales";
import {CustomMode} from "@/components/ui/CustomMode";
import {ErrorPage} from "@/components/ui/ErrorPage";
import {FriendMode} from "@/components/ui/FriendMode";
import {useMode} from "@/hooks/useMode";





export default function Mode() {
  const {locale} = useLocales()
  const {
    error,
    mode,
    count,
    low,
    high,
    pos,
    setCount,
    setLow,
    setHigh,
    handleStart,
    handlePlay,
    handleCopy,
    selectedLevels,
    searchTerm,
    setSearchTerm,
    handleLevelSelect,
    filteredLevels
  } = useMode()

  // Error Message
  if (error) return <ErrorPage locale={locale}/>


  if (mode !== "custom" && mode !== "friend")
    return (
      <h1 className="text-4xl font-bold mb-6 font-[Russo_One]">
        {locale("mode.noMode")}
      </h1>
    )

  return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white">
          {mode === "custom" && <CustomMode locale={locale} count={count} low={low} high={high} pos={pos}
                                            setCount={setCount} setLow={setLow} setHigh={setHigh}
                                            handleStart={handleStart}/>}
          {mode === "friend" && <FriendMode locale={locale} handlePlay={handlePlay} handleCopy={handleCopy}
                                            selectedLevels={selectedLevels}
                                            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                            handleLevelSelect={handleLevelSelect} filteredLevels={filteredLevels}/>}
        </div>
  );
}
