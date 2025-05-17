'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { PieceIcon } from './chess-piece-icon';
import type { BoardState, PieceColor, SquarePosition, Move, Piece, PieceSymbol } from '@/types/chess';
import {
  initialBoardSetup,
  getValidMoves,
  makeMove,
  isKingInCheck,
  isCheckmate,
  isStalemate,
  isInsufficientMaterial
} from '@/lib/chess-logic';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


interface ChessBoardProps {
  onPlayerChange: (player: PieceColor) => void;
  onGameEnd: (message: string) => void;
  onCheckStatus: (isCheck: boolean) => void;
  onMoveMade: (move: Move) => void;
  externalLastMove: Move | null;
  isGameOver: boolean;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ 
  onPlayerChange, onGameEnd, onCheckStatus, onMoveMade, externalLastMove, isGameOver 
}) => {
  const [board, setBoard] = useState<BoardState>(initialBoardSetup());
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [selectedSquare, setSelectedSquare] = useState<SquarePosition | null>(null);
  const [validMoves, setValidMoves] = useState<Move[]>([]);
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const [promotionMove, setPromotionMove] = useState<Move | null>(null);
  const [kingInCheckPos, setKingInCheckPos] = useState<SquarePosition | null>(null);

  const checkGameState = useCallback((currentBoard: BoardState, player: PieceColor, lastMoveMade: Move | null) => {
    const kingIsCurrentlyInCheck = isKingInCheck(currentBoard, player, lastMoveMade);
    onCheckStatus(kingIsCurrentlyInCheck);
    setKingInCheckPos(kingIsCurrentlyInCheck ? findKingPosition(currentBoard, player) : null);


    if (isCheckmate(currentBoard, player, lastMoveMade)) {
      onGameEnd(`Checkmate! ${player === 'white' ? 'Black' : 'White'} wins!`);
    } else if (isStalemate(currentBoard, player, lastMoveMade)) {
      onGameEnd('Stalemate! The game is a draw.');
    } else if (isInsufficientMaterial(currentBoard)) {
      onGameEnd('Draw due to insufficient material.');
    }
  }, [onGameEnd, onCheckStatus]);

  useEffect(() => {
    // Initial check on load (though typically no one is in check initially)
    checkGameState(board, currentPlayer, lastMove);
  }, []); // Only on mount

  useEffect(() => {
    setLastMove(externalLastMove); // Sync with parent if reset
  }, [externalLastMove]);


  const findKingPosition = (b: BoardState, color: PieceColor): SquarePosition | null => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = b[r][c];
        if (p && p.type === 'K' && p.color === color) return { row: r, col: c };
      }
    }
    return null;
  };
  
  const handleSquareClick = (row: number, col: number) => {
    if (isGameOver || promotionMove) return;

    const clickedPos = { row, col };
    const pieceAtClickedSquare = board[row][col];

    if (selectedSquare) {
      const move = validMoves.find(m => m.to.row === row && m.to.col === col);
      if (move) {
        // Check for pawn promotion
        const movingPiece = board[selectedSquare.row][selectedSquare.col];
        if (movingPiece?.type === 'P' && (row === 0 || row === 7)) {
          setPromotionMove(move); // Open promotion dialog
          return;
        }
        
        executeMove(move);

      } else {
        // Clicked on another piece of the same color or invalid square
        setSelectedSquare(null);
        setValidMoves([]);
        if (pieceAtClickedSquare && pieceAtClickedSquare.color === currentPlayer) {
          setSelectedSquare(clickedPos);
          setValidMoves(getValidMoves(board, clickedPos, currentPlayer, lastMove));
        }
      }
    } else {
      // No piece selected yet
      if (pieceAtClickedSquare && pieceAtClickedSquare.color === currentPlayer) {
        setSelectedSquare(clickedPos);
        setValidMoves(getValidMoves(board, clickedPos, currentPlayer, lastMove));
      }
    }
  };

  const executeMove = (move: Move) => {
    const { newBoard } = makeMove(board, move);
    setBoard(newBoard);
    
    const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
    setCurrentPlayer(nextPlayer);
    onPlayerChange(nextPlayer);
    
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(move);
    onMoveMade(move);

    // Check game state for the *next* player
    checkGameState(newBoard, nextPlayer, move);
  };

  const handlePromotionSelect = (pieceType: PieceSymbol) => {
    if (!promotionMove) return;
    const moveWithPromotion: Move = { ...promotionMove, promotion: pieceType };
    executeMove(moveWithPromotion);
    setPromotionMove(null);
  };

  const getSquareColor = (row: number, col: number) => {
    return (row + col) % 2 === 0 ? 'bg-[hsl(var(--board-light-square))]' : 'bg-[hsl(var(--board-dark-square))]';
  };

  const isSquareValidMove = (row: number, col: number) => {
    return validMoves.some(m => m.to.row === row && m.to.col === col);
  };
  
  const isLastMoveSquare = (row: number, col: number) => {
    if (!lastMove) return false;
    return (lastMove.from.row === row && lastMove.from.col === col) ||
           (lastMove.to.row === row && lastMove.to.col === col);
  };

  const isSelectedSquare = (row: number, col: number) => {
    return selectedSquare?.row === row && selectedSquare?.col === col;
  };

  const isKingInCheckSquare = (row: number, col: number) => {
    return kingInCheckPos?.row === row && kingInCheckPos?.col === col;
  }

  return (
    <div className="grid grid-cols-8 gap-0 w-[calc(min(90vw,90vh,600px))] aspect-square shadow-2xl rounded-md overflow-hidden border-4 border-card">
      {board.map((rowArr, rowIndex) =>
        rowArr.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              "flex items-center justify-center aspect-square cursor-pointer group relative",
              getSquareColor(rowIndex, colIndex),
              isSelectedSquare(rowIndex, colIndex) && "ring-4 ring-inset ring-[hsl(var(--board-selected-piece))]",
            )}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
            role="button"
            aria-label={`Square ${String.fromCharCode(97+colIndex)}${8-rowIndex}`}
          >
            {isLastMoveSquare(rowIndex, colIndex) && (
              <div className="absolute inset-0 bg-[hsl(var(--board-highlight-move))] opacity-30 pointer-events-none"></div>
            )}
             {isKingInCheckSquare(rowIndex, colIndex) && (
              <div className="absolute inset-0 bg-[hsl(var(--board-check-highlight))] opacity-40 pointer-events-none animate-pulse"></div>
            )}
            {piece && (
               <div className="w-4/5 h-4/5 transition-transform duration-150 ease-out">
                <PieceIcon piece={piece} />
              </div>
            )}
            {isSquareValidMove(rowIndex, colIndex) && (
              <div className={cn(
                "absolute w-1/3 h-1/3 rounded-full pointer-events-none",
                board[rowIndex][colIndex] ? "border-4 border-[hsl(var(--board-highlight-move))] opacity-70" : "bg-[hsl(var(--board-highlight-move))] opacity-50"
              )}></div>
            )}
          </div>
        ))
      )}
       {promotionMove && (
        <Dialog open={!!promotionMove} onOpenChange={() => setPromotionMove(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Promote Pawn</DialogTitle>
              <DialogDescription>Choose a piece to promote your pawn to.</DialogDescription>
            </DialogHeader>
            <RadioGroup defaultValue="Q" onValueChange={(value) => handlePromotionSelect(value as PieceSymbol)} className="my-4 grid grid-cols-2 gap-4">
              {(['Q', 'R', 'B', 'N'] as PieceSymbol[]).map(pType => (
                 <Label key={pType} htmlFor={`promote-${pType}`} className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:text-accent-foreground">
                  <RadioGroupItem value={pType} id={`promote-${pType}`} className="sr-only" />
                  <div className="w-12 h-12 mb-2">
                    <PieceIcon piece={{ type: pType, color: currentPlayer, hasMoved: true }} colorOverride={currentPlayer === 'white' ? '#000' : '#FFF'} />
                  </div>
                  {pType === 'Q' ? 'Queen' : pType === 'R' ? 'Rook' : pType === 'B' ? 'Bishop' : 'Knight'}
                </Label>
              ))}
            </RadioGroup>
            {/* Default action or close button handled by onOpenChange or clicking an option */}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
