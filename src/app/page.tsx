'use client';

import type React from 'react';
import { ChessBoard } from '@/components/chess-board';
import { GameStatus } from '@/components/game-status';
import type { PieceColor, Move } from '@/types/chess';
import { useState, useCallback } from 'react';

export default function Home() {
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const [key, setKey] = useState<number>(0); // Used to reset the board

  const handlePlayerChange = useCallback((player: PieceColor) => {
    setCurrentPlayer(player);
  }, []);

  const handleGameEnd = useCallback((message: string) => {
    setGameOverMessage(message);
  }, []);

  const handleCheckStatus = useCallback((checkStatus: boolean) => {
    setIsCheck(checkStatus);
  }, []);

  const handleMoveMade = useCallback((move: Move) => {
    setLastMove(move);
  }, []);

  const handleResetGame = () => {
    setCurrentPlayer('white');
    setGameOverMessage(null);
    setIsCheck(false);
    setLastMove(null);
    setKey(prevKey => prevKey + 1); // Change key to force re-mount ChessBoard
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-primary">ChessMate</h1>
        <p className="text-muted-foreground">The ultimate chess experience</p>
      </div>
      
      <GameStatus 
        currentPlayer={currentPlayer} 
        gameOverMessage={gameOverMessage}
        isCheck={isCheck}
      />
      
      <ChessBoard
        key={key} // Add key here
        onPlayerChange={handlePlayerChange}
        onGameEnd={handleGameEnd}
        onCheckStatus={handleCheckStatus}
        onMoveMade={handleMoveMade}
        externalLastMove={lastMove}
        isGameOver={!!gameOverMessage}
      />

      <button
        onClick={handleResetGame}
        className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Reset Game
      </button>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>ChessMate &copy; {new Date().getFullYear()}. Crafted with Next.js and Tailwind CSS.</p>
      </footer>
    </main>
  );
}
