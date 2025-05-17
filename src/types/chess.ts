export type PieceSymbol = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K';
export type PieceColor = 'white' | 'black';

export interface Piece {
  type: PieceSymbol;
  color: PieceColor;
  hasMoved?: boolean;
  isPromotedPawn?: boolean; // For special pawn rendering if needed
}

export interface SquarePosition {
  row: number;
  col: number;
}

export type BoardState = (Piece | null)[][];

export interface Move {
  from: SquarePosition;
  to: SquarePosition;
  promotion?: PieceSymbol; // For pawn promotion
  isCastling?: boolean;
  isEnPassant?: boolean;
}
