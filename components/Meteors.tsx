"use client";

export function Meteors() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div key={i} className={`meteor-${i + 1}`} />
      ))}
    </div>
  );
} 