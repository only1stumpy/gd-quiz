export default function BgWrapper() {
    return (
        <div className="fixed inset-0 z-[-1] bg-linear-45 from-[#0a0a0f] from-0% via-[#12121f] via-50% to-[#0f1620] to-100%">
            <div className="orb o1" />
            <div className="orb o2" />
            <div className="orb o3" />
            <div className="orb o4" />
            <div className="orb o5" />
            <div className="noise" />
        </div>
    );
}