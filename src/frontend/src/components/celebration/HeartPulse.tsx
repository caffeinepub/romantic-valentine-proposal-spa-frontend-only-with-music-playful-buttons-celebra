export default function HeartPulse() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="heart-pulse-container">
        <div className="heart-pulse heart-pulse-1" />
        <div className="heart-pulse heart-pulse-2" />
        <div className="heart-pulse heart-pulse-3" />
      </div>
    </div>
  );
}
