import {LevelData} from "@/types/level";
import {Button} from "@/components/ui/Button";

type Props = {
    locale: (key: string) => string
    handlePlay: () => void
    handleCopy: () => void
    selectedLevels: LevelData[]
    searchTerm: string
    setSearchTerm: (term: string) => void
    handleLevelSelect: (level: LevelData) => void
    filteredLevels: LevelData[]
}

export function FriendMode(props: Props) {

    return(
        <>
            <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
                🎮 Friend Game
            </h1>

            {/* Добавленный поиск уровней */}
            <div className="w-full max-w-md mb-8 animate-[slideUp_1s_ease-out_0.5s_both]">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={
                            props.locale("mode.search")
                        }
                        value={props.searchTerm}
                        onChange={(e) => props.setSearchTerm(e.target.value)}
                        className="w-full rounded-lg bg-black/20 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-(--neon-blue) focus:border-transparent"
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                        {props.selectedLevels.length}/{props.filteredLevels.length}{" "}
                        {props.locale("mode.selected")}
                    </div>
                </div>

                <div className="mt-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--neon-purple)] scrollbar-track-transparent">
                    {props.filteredLevels.length === 0
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="p-3 mb-2 rounded-lg bg-black/20 animate-pulse"
                            >
                                <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                                <div className="flex justify-between">
                                    <div className="h-3 bg-white/20 rounded w-1/4"></div>
                                    <div className="h-3 bg-white/20 rounded w-1/4"></div>
                                </div>
                                <div className="h-3 bg-white/20 rounded w-1/2 mt-2"></div>
                            </div>
                        ))
                        : props.filteredLevels.map((level) => (
                            <div
                                key={level.id}
                                onClick={() => props.handleLevelSelect(level)}
                                className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                                    props.selectedLevels.some((l) => l.id === level.id)
                                        ? "bg-linear-to-r from-(--neon-blue) to-(--neon-purple) text-gray-900"
                                        : "bg-black/20 hover:bg-black/30"
                                }`}
                            >
                                <div className="font-bold">{level.name}</div>
                                <div className="flex justify-between text-sm">
                                    <span>#{level.placement}</span>
                                    <span>{level.holder}</span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="grid gap-4 w-full">
                <div className="flex gap-4 mt-8 justify-center">
                    <Button
                        onClick={props.handlePlay}
                        type="main"
                        textContent={props.locale("mode.playButton")}
                    />
                    <Button
                        onClick={props.handleCopy}
                        type="main"
                        textContent={props.locale("mode.copyButton")}
                    />
                </div>
            </div>
        </>
    )
}