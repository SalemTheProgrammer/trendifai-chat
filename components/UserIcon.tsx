"use client";

interface UserIconProps {
  letter: string;
}

export function UserIcon({ letter }: UserIconProps) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 
      flex items-center justify-center text-white font-medium text-sm
      shadow-lg shadow-purple-500/20">
      {letter}
    </div>
  );
} 