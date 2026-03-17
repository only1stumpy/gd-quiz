type Props = {
    badge: string,
    title: string,
    description: string
}


export function HomeCard(props: Props) {
    return(
        <div className="scroll-reveal bg-(--card-bg) border border-(--card-border) rounded-3xl p-12 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-linear-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100">
            <div className="text-5xl mb-8 bg-linear-45 from-(--neon-blue) to-(--neon-purple) bg-clip-text text-transparent">
                {props.badge}
            </div>
            <h3 className="text-2xl font-semibold mb-8 text-(--neon-blue)">
                {props.title}
            </h3>
            <p className="opacity-80">
                {props.description}
            </p>
        </div>
    )
}