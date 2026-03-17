import {Button} from "@/components/ui/Button";
import {RangeSlider} from "next-range-slider";

type Props = {
    locale: (key: string) => string
    count: number;
    setCount: (count: number) => void;
    low: number;
    setLow: (low: number) => void;
    high: number;
    setHigh: (high: number) => void;
    pos: number;
    handleStart: () => void;
};


export function CustomMode(props: Props) {
    return (
        <>
            <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
                🎮 Custom Game
            </h1>

            <div className="grid gap-4 w-full max-w-md animate-[slideUp_1s_ease-out_1s_both]">
                <label className="flex flex-col">
                  <span className="mb-1 text-sm text-gray-300">
                    {props.locale("quizPage.lvlNum")}
                      :
                  </span>
                    <input
                        type="number"
                        min={3}
                        value={props.count}
                        onChange={(e) => props.setCount(Number(e.target.value))}
                        className="rounded-lg bg-black/20 border border-white/10 px-4 py-2 text-white"
                    />
                </label>

                <label className="flex flex-col">
                  <span className="mb-1 text-sm text-gray-300">
                    {props.locale("mode.range")}:
                  </span>
                    {props.pos > 1 && (
                        <RangeSlider
                            min={1}
                            max={props.pos}
                            step={50}
                            options={{
                                leftInputProps: {
                                    value: props.low,
                                    onChange: (e) => props.setLow(Number(e.target.value)),
                                },
                                rightInputProps: {
                                    value: props.high,
                                    onChange: (e) => props.setHigh(Number(e.target.value)),
                                },
                            }}
                        />
                    )}
                </label>
                <Button
                    onClick={props.handleStart}
                    type="main"
                    textContent={props.locale("mode.playButton")}
                />
            </div>
        </>
    );
}