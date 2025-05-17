import type React from 'react';
import type { PieceColor } from '@/types/chess';

interface GameStatusProps {
  currentPlayer: PieceColor;
  gameOverMessage: string | null;
  isCheck: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({ currentPlayer, gameOverMessage, isCheck }) => {
  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl p-4 mb-4 text-center bg-card text-card-foreground rounded-lg shadow-lg">
      {gameOverMessage ? (
        <p className="text-2xl font-bold text-destructive">{gameOverMessage}</p>
      ) : (
        <>
          <p className="text-xl font-semibold">
            Turn: <span className={currentPlayer === 'white' ? 'text-primary-foreground bg-primary px-2 py-1 rounded' : 'text-primary-foreground bg-gray-700 px-2 py-1 rounded'}>
              {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
            </span>
          </p>
          {isCheck && <p className="text-lg font-medium text-destructive animate-pulse">Check!</p>}
        </>
      )}
    </div>
  );
};
