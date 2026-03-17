import {Difficulty} from "@/types/difficulty";

type Props = {
    textContent: string
    onClick?: () => void
    type: "main" | Difficulty | "friend"

}

export function Button(props: Props){
    let btnClass = ""

    switch (props.type){
        case "main": {
            btnClass = "from-(--neon-blue) to-(--neon-purple) py-6 px-12"
            break
        }
        case "friend": {
            btnClass = "from-(--neon-blue) to-(--neon-purple) py-4 px-10"
            break
        }
        case "easy": {
            btnClass = "from-(--easy-color) to-(--neon-blue) py-4 px-10"
            break
        }
        case "normal": {
            btnClass = "from-(--neon-blue) to-(--normal-color) py-4 px-10"
            break
        }
        case "hard": {
            btnClass = "from-(--normal-color) to-(--hard-color) py-4 px-10"
            break
        }
        case "custom": {
            btnClass = "from-(--neon-blue) to-(--neon-purple) py-4 px-10"
            break
        }
    }

    return (
        <button
            className={`bg-linear-45 shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full ${btnClass}`}
            onClick={props.onClick}>
            {props.textContent}
        </button>
    );
}