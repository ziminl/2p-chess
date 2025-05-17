import type { BoardState, Piece, PieceColor, PieceSymbol, SquarePosition, Move } from '@/types/chess';

export const initialBoardSetup = (): BoardState => {
  const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));

  const placePiece = (row: number, col: number, type: PieceSymbol, color: PieceColor, hasMoved = false) => {
    board[row][col] = { type, color, hasMoved };
  };

  // Pawns
  for (let i = 0; i < 8; i++) {
    placePiece(1, i, 'P', 'black');
    placePiece(6, i, 'P', 'white');
  }

  // Rooks
  placePiece(0, 0, 'R', 'black');
  placePiece(0, 7, 'R', 'black');
  placePiece(7, 0, 'R', 'white');
  placePiece(7, 7, 'R', 'white');

  // Knights
  placePiece(0, 1, 'N', 'black');
  placePiece(0, 6, 'N', 'black');
  placePiece(7, 1, 'N', 'white');
  placePiece(7, 6, 'N', 'white');

  // Bishops
  placePiece(0, 2, 'B', 'black');
  placePiece(0, 5, 'B', 'black');
  placePiece(7, 2, 'B', 'white');
  placePiece(7, 5, 'B', 'white');

  // Queens
  placePiece(0, 3, 'Q', 'black');
  placePiece(7, 3, 'Q', 'white');

  // Kings
  placePiece(0, 4, 'K', 'black');
  placePiece(7, 4, 'K', 'white');
  
  return board;
};

const isValidSquare = (row: number, col: number): boolean => row >= 0 && row < 8 && col >= 0 && col < 8;

const getPieceAt = (board: BoardState, pos: SquarePosition): Piece | null => {
  if (!isValidSquare(pos.row, pos.col)) return null;
  return board[pos.row][pos.col];
}

const getPseudoLegalMovesForPiece = (
  board: BoardState,
  from: SquarePosition,
  lastMove: Move | null // For en passant
): SquarePosition[] => {
  const piece = getPieceAt(board, from);
  if (!piece) return [];

  const moves: SquarePosition[] = [];
  const { row, col } = from;
  const color = piece.color;
  const opponentColor = color === 'white' ? 'black' : 'white';

  const addMove = (toRow: number, toCol: number, isCaptureOnly = false, isPawnMove = false) => {
    if (!isValidSquare(toRow, toCol)) return;
    const targetPiece = board[toRow][toCol];
    if (isPawnMove) { // Pawn forward move
      if (!targetPiece && !isCaptureOnly) moves.push({ row: toRow, col: toCol });
    } else if (isCaptureOnly) { // Pawn capture
      if (targetPiece && targetPiece.color === opponentColor) moves.push({ row: toRow, col: toCol });
    } else { // Other pieces
      if (!targetPiece) moves.push({ row: toRow, col: toCol });
      else if (targetPiece.color === opponentColor) moves.push({ row: toRow, col: toCol });
    }
  };
  
  const addSlidingPieceMoves = (directions: { dr: number, dc: number }[]) => {
    for (const { dr, dc } of directions) {
      for (let i = 1; i < 8; i++) {
        const toRow = row + dr * i;
        const toCol = col + dc * i;
        if (!isValidSquare(toRow, toCol)) break;
        const targetPiece = board[toRow][toCol];
        if (targetPiece) {
          if (targetPiece.color === opponentColor) moves.push({ row: toRow, col: toCol });
          break;
        }
        moves.push({ row: toRow, col: toCol });
      }
    }
  };

  switch (piece.type) {
    case 'P':
      const dir = color === 'white' ? -1 : 1;
      // Forward 1
      addMove(row + dir, col, false, true);
      // Forward 2 (initial move)
      if ((color === 'white' && row === 6) || (color === 'black' && row === 1)) {
        if (!board[row + dir][col] && !board[row + 2 * dir][col]) {
           addMove(row + 2 * dir, col, false, true);
        }
      }
      // Captures
      addMove(row + dir, col - 1, true);
      addMove(row + dir, col + 1, true);
      
      // En Passant
      if (lastMove && getPieceAt(board, lastMove.to)?.type === 'P' && Math.abs(lastMove.from.row - lastMove.to.row) === 2) {
        if (lastMove.to.row === row && Math.abs(lastMove.to.col - col) === 1) {
          moves.push({ row: row + dir, col: lastMove.to.col }); // Target square for en passant capture
        }
      }
      break;
    case 'N':
      const knightMoves = [
        { dr: -2, dc: -1 }, { dr: -2, dc: 1 }, { dr: -1, dc: -2 }, { dr: -1, dc: 2 },
        { dr: 1, dc: -2 }, { dr: 1, dc: 2 }, { dr: 2, dc: -1 }, { dr: 2, dc: 1 },
      ];
      knightMoves.forEach(m => addMove(row + m.dr, col + m.dc));
      break;
    case 'B':
      addSlidingPieceMoves([{ dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }]);
      break;
    case 'R':
      addSlidingPieceMoves([{ dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 }]);
      break;
    case 'Q':
      addSlidingPieceMoves([
        { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 },
        { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
      ]);
      break;
    case 'K':
      const kingMoves = [
        { dr: -1, dc: -1 }, { dr: -1, dc: 0 }, { dr: -1, dc: 1 },
        { dr: 0, dc: -1 },                 { dr: 0, dc: 1 },
        { dr: 1, dc: -1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 },
      ];
      kingMoves.forEach(m => addMove(row + m.dr, col + m.dc));
      // Castling
      if (!piece.hasMoved) {
        // Kingside
        const kingsideRook = board[row][7];
        if (kingsideRook && kingsideRook.type === 'R' && !kingsideRook.hasMoved) {
          if (!board[row][5] && !board[row][6]) {
             // Check if squares king passes through are attacked later
            moves.push({ row, col: col + 2});
          }
        }
        // Queenside
        const queensideRook = board[row][0];
        if (queensideRook && queensideRook.type === 'R' && !queensideRook.hasMoved) {
          if (!board[row][1] && !board[row][2] && !board[row][3]) {
            // Check if squares king passes through are attacked later
            moves.push({ row, col: col - 2});
          }
        }
      }
      break;
  }
  return moves;
};

export const makeMove = (
  board: BoardState,
  move: Move
): { newBoard: BoardState; capturedPiece: Piece | null } => {
  const newBoard = board.map(row => row.map(piece => piece ? { ...piece } : null));
  const pieceToMove = newBoard[move.from.row][move.from.col];
  let capturedPiece: Piece | null = getPieceAt(newBoard, move.to);

  if (!pieceToMove) return { newBoard: board, capturedPiece: null }; // Should not happen if move is valid

  // Handle en passant capture
  if (move.isEnPassant && pieceToMove.type === 'P') {
    const dir = pieceToMove.color === 'white' ? 1 : -1;
    capturedPiece = newBoard[move.to.row + dir][move.to.col];
    newBoard[move.to.row + dir][move.to.col] = null;
  }
  
  newBoard[move.to.row][move.to.col] = pieceToMove;
  newBoard[move.from.row][move.from.col] = null;
  pieceToMove.hasMoved = true;

  // Handle castling: move the rook
  if (move.isCastling) {
    if (move.to.col === 6) { // Kingside
      const rook = newBoard[move.from.row][7];
      if (rook) {
        newBoard[move.from.row][5] = rook;
        newBoard[move.from.row][7] = null;
        rook.hasMoved = true;
      }
    } else if (move.to.col === 2) { // Queenside
      const rook = newBoard[move.from.row][0];
      if (rook) {
        newBoard[move.from.row][3] = rook;
        newBoard[move.from.row][0] = null;
        rook.hasMoved = true;
      }
    }
  }

  // Handle pawn promotion
  if (pieceToMove.type === 'P' && (move.to.row === 0 || move.to.row === 7)) {
    pieceToMove.type = move.promotion || 'Q'; // Default to Queen
    pieceToMove.isPromotedPawn = true; 
  }

  return { newBoard, capturedPiece };
};

const findKingPosition = (board: BoardState, color: PieceColor): SquarePosition | null => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.type === 'K' && piece.color === color) {
        return { row: r, col: c };
      }
    }
  }
  return null;
};

export const isKingInCheck = (
  board: BoardState,
  kingColor: PieceColor,
  lastMove: Move | null // For en-passant checks by opponent
): boolean => {
  const kingPos = findKingPosition(board, kingColor);
  if (!kingPos) return false; // Should not happen

  const opponentColor = kingColor === 'white' ? 'black' : 'white';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === opponentColor) {
        const pseudoMoves = getPseudoLegalMovesForPiece(board, { row: r, col: c }, lastMove);
        if (pseudoMoves.some(m => m.row === kingPos.row && m.col === kingPos.col)) {
          return true;
        }
      }
    }
  }
  return false;
};


export const getValidMoves = (
  board: BoardState,
  from: SquarePosition,
  currentPlayerColor: PieceColor,
  lastMove: Move | null
): Move[] => {
  const piece = getPieceAt(board, from);
  if (!piece || piece.color !== currentPlayerColor) return [];

  const pseudoLegalTargetSquares = getPseudoLegalMovesForPiece(board, from, lastMove);
  const validMoves: Move[] = [];

  for (const to of pseudoLegalTargetSquares) {
    const move: Move = { from, to };
    
    // Special move properties
    if (piece.type === 'K' && Math.abs(from.col - to.col) === 2) {
      move.isCastling = true;
    }
    if (piece.type === 'P' && to.col !== from.col && !getPieceAt(board, to)) {
        move.isEnPassant = true; // En passant implies target square is empty
    }
    if (piece.type === 'P' && (to.row === 0 || to.row === 7)) {
        move.promotion = 'Q'; // Default promotion
    }

    const { newBoard } = makeMove(board, move);
    if (!isKingInCheck(newBoard, currentPlayerColor, lastMove)) { // Use lastMove from current turn for checking legality
       // Additional castling checks: king must not pass through or land on an attacked square
      if (move.isCastling) {
        const kingRow = from.row;
        const kingCol = from.col;
        const targetCol = to.col;
        const inBetweenCol = kingCol + (targetCol > kingCol ? 1 : -1);
        
        // Check square king passes through
        const tempBoardPassThrough = makeMove(board, { from, to: {row: kingRow, col: inBetweenCol} }).newBoard;
        if (isKingInCheck(tempBoardPassThrough, currentPlayerColor, lastMove)) continue;

        // King is already checked for landing square by the main check.
      }
      validMoves.push(move);
    }
  }
  return validMoves;
};


export const getAllLegalMovesForPlayer = (
  board: BoardState,
  playerColor: PieceColor,
  lastMove: Move | null
): Move[] => {
  const allMoves: Move[] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === playerColor) {
        const moves = getValidMoves(board, { row: r, col: c }, playerColor, lastMove);
        allMoves.push(...moves);
      }
    }
  }
  return allMoves;
};

export const isCheckmate = (
  board: BoardState,
  playerColor: PieceColor,
  lastMove: Move | null
): boolean => {
  if (!isKingInCheck(board, playerColor, lastMove)) return false;
  const legalMoves = getAllLegalMovesForPlayer(board, playerColor, lastMove);
  return legalMoves.length === 0;
};

export const isStalemate = (
  board: BoardState,
  playerColor: PieceColor,
  lastMove: Move | null
): boolean => {
  if (isKingInCheck(board, playerColor, lastMove)) return false;
  const legalMoves = getAllLegalMovesForPlayer(board, playerColor, lastMove);
  return legalMoves.length === 0;
};

// Insufficient material (basic cases: K vs K, K vs K+N, K vs K+B)
export const isInsufficientMaterial = (board: BoardState): boolean => {
  const pieces: Piece[] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]) pieces.push(board[r][c] as Piece);
    }
  }

  if (pieces.length === 2 && pieces.every(p => p.type === 'K')) return true; // K vs K

  const whitePieces = pieces.filter(p => p.color === 'white');
  const blackPieces = pieces.filter(p => p.color === 'black');

  const isLoneKing = (arr: Piece[]) => arr.length === 1 && arr[0].type === 'K';
  const hasOnlyKingAndKnight = (arr: Piece[]) => arr.length === 2 && arr.some(p=>p.type==='K') && arr.some(p=>p.type==='N');
  const hasOnlyKingAndBishop = (arr: Piece[]) => arr.length === 2 && arr.some(p=>p.type==='K') && arr.some(p=>p.type==='B');
  
  // K vs K+N or K vs K+B
  if ( (isLoneKing(whitePieces) && (hasOnlyKingAndKnight(blackPieces) || hasOnlyKingAndBishop(blackPieces))) ||
       (isLoneKing(blackPieces) && (hasOnlyKingAndKnight(whitePieces) || hasOnlyKingAndBishop(whitePieces))) ) {
    return true;
  }
  
  // K+B vs K+B with same color bishops (more complex, omit for now for brevity)
  // This is a simplified check. Real insufficient material rules are more complex.
  return false;
};
