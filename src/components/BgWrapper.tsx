export default function BgWrapper() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-linear-45 from-[#0a0a0f] from-0% via-[#1a1a2e] via-50% to-[#16213e] to-100% ">
      <div className="absolute w-full h-full overflow-hidden">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="absolute w-full h-full"></div>
    </div>
  );
}
