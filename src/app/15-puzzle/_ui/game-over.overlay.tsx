type Props = {
  isOpen: boolean;
};

export function GameOverOverlay({ isOpen }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="absolute flex flex-col items-center justify-center gap-6
        w-full h-full p-5 rounded-lg text-white text-shadow-md bg-gray-800/80 backdrop-blur"
    >
      Чудово!
    </div>
  );
}
