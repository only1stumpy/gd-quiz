type Props = {
    href: string,
    children: React.ReactNode
}
export function ExternalLink(props: Props) {
    return (
            <a
                href={props.href}
                className="text-blue-300 underline cursor-pointer"
                rel="noopener noreferrer"
                target="_blank"
            >
                {props.children}
            </a>
    );
}