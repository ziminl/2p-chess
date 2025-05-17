import type React from 'react';
import { cn } from '@/lib/utils';
import type { Piece } from '@/types/chess';

interface IconProps {
  className?: string;
  colorOverride?: string;
}

const DefaultPieceColor = ({ pieceColor, overrideColor }: {pieceColor: 'white' | 'black', overrideColor?: string}) => {
  if (overrideColor) return overrideColor;
  return pieceColor === 'white' ? '#FFF' : '#333';
};

const DefaultStrokeColor = ({ pieceColor }: {pieceColor: 'white' | 'black'}) => {
  return pieceColor === 'white' ? '#333' : '#CCC';
};

export const WhitePawnIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'white', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'white'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 9c-1.657 0-3 2.686-3 6s1.343 6 3 6 3-2.686 3-6-1.343-6-3-6z" />
      <path d="M22.5 15v8M17.5 23h10L25 28h-5l-2.5-5z" strokeLinejoin="miter" />
      <path d="M15 30v2h15v-2M12.5 35.5h20v2.5h-20z" />
    </g>
  </svg>
);

export const BlackPawnIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'black', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'black'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 9c-1.657 0-3 2.686-3 6s1.343 6 3 6 3-2.686 3-6-1.343-6-3-6z" />
      <path d="M22.5 15v8M17.5 23h10L25 28h-5l-2.5-5z" strokeLinejoin="miter" />
      <path d="M15 30v2h15v-2M12.5 35.5h20v2.5h-20z" />
    </g>
  </svg>
);

export const WhiteRookIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'white', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'white'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 36v-4h27v4H9zM12.5 32V12.5h20V32h-20zM12.5 12.5H9.5v-3h30v3H32.5M12.5 12.5H32.5M9.5 9.5l3-3h20l3 3H9.5z" strokeLinejoin="miter"/>
      <path d="M12 12.5V9.5l3-3M33 12.5V9.5l-3-3M12 12.5h21" fill="none" strokeLinejoin="miter"/>
    </g>
  </svg>
);

export const BlackRookIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
     <g fill={DefaultPieceColor({pieceColor: 'black', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'black'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 36v-4h27v4H9zM12.5 32V12.5h20V32h-20zM12.5 12.5H9.5v-3h30v3H32.5M12.5 12.5H32.5M9.5 9.5l3-3h20l3 3H9.5z" strokeLinejoin="miter"/>
      <path d="M12 12.5V9.5l3-3M33 12.5V9.5l-3-3M12 12.5h21" fill="none" strokeLinejoin="miter"/>
    </g>
  </svg>
);

export const WhiteKnightIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'white', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'white'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 36H9.5V31c0-2.5 1.5-4 3.5-5.5 2-1.5 3-2.5 3-4.5 0-1.5-1-3.5-2.5-3.5-1 0-1.5.5-2.5 1.5M11 29.5c2.5-1 3.5-2.5 3.5-5S12.5 20 11 20M22.5 36H35.5V31c0-2.5-1.5-4-3.5-5.5-2-1.5-3-2.5-3-4.5 0-1.5 1-3.5 2.5-3.5 1 0 1.5.5 2.5 1.5M34 29.5c-2.5-1-3.5-2.5-3.5-5S32.5 20 34 20" stroke="none"/>
      <path d="m 22,10 c -1.5,0 -2.5,1.5 -2.5,3 0,1.5 1,2 1,3.5 0,1.5 0,2.5 -0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 C 18.5,26 19.5,28 22,28 c 2.5,0 3.5,-2 3.5,-4.5 0,0 0,-1.5 -1.5,-2.5 C 23.5,20 23.5,19 23.5,17.5 23.5,16 23.5,14.5 22,10 Z"/>
      <path d="M 9.5,25.5 A 1,1 0 0 0 18,20.5 L 24.5,22.5 L 26,20 C 26,20 23.5,14 23.5,12.5 C 23.5,10.5 24.5,10 24.5,10 L 22.5,7.5 L 20.5,10 C 20.5,10 18.5,10.5 18.5,12.5 C 18.5,14.5 10,25 10,25 L 9.5,25.5 Z" />
    </g>
  </svg>
);

export const BlackKnightIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'black', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'black'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
       <path d="M22.5 36H9.5V31c0-2.5 1.5-4 3.5-5.5 2-1.5 3-2.5 3-4.5 0-1.5-1-3.5-2.5-3.5-1 0-1.5.5-2.5 1.5M11 29.5c2.5-1 3.5-2.5 3.5-5S12.5 20 11 20M22.5 36H35.5V31c0-2.5-1.5-4-3.5-5.5-2-1.5-3-2.5-3-4.5 0-1.5 1-3.5 2.5-3.5 1 0 1.5.5 2.5 1.5M34 29.5c-2.5-1-3.5-2.5-3.5-5S32.5 20 34 20" stroke="none"/>
      <path d="m 22,10 c -1.5,0 -2.5,1.5 -2.5,3 0,1.5 1,2 1,3.5 0,1.5 0,2.5 -0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 C 18.5,26 19.5,28 22,28 c 2.5,0 3.5,-2 3.5,-4.5 0,0 0,-1.5 -1.5,-2.5 C 23.5,20 23.5,19 23.5,17.5 23.5,16 23.5,14.5 22,10 Z"/>
      <path d="M 9.5,25.5 A 1,1 0 0 0 18,20.5 L 24.5,22.5 L 26,20 C 26,20 23.5,14 23.5,12.5 C 23.5,10.5 24.5,10 24.5,10 L 22.5,7.5 L 20.5,10 C 20.5,10 18.5,10.5 18.5,12.5 C 18.5,14.5 10,25 10,25 L 9.5,25.5 Z" />
    </g>
  </svg>
);

export const WhiteBishopIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'white', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'white'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 9c-.75 0-1.5.5-1.5 1.5S21.75 12 22.5 12s1.5-.5 1.5-1.5S23.25 9 22.5 9z"/>
      <path d="M22.5 12c-2.5 2.5-5 6.5-5 10.5 0 3 1 6.5 5 10 .5.5 1 1 1.5 1h.001c.5-.001 1-.5 1.5-1 4-3.5 5-7 5-10 0-4-2.5-8-5-10.5z"/>
      <path d="M17.5 22.5c0-4.5 2-7.5 4.5-9.5M27.5 22.5c0-4.5-2-7.5-4.5-9.5" fill="none"/>
      <path d="M15 32.5h15v2.5H15z"/>
    </g>
  </svg>
);

export const BlackBishopIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'black', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'black'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 9c-.75 0-1.5.5-1.5 1.5S21.75 12 22.5 12s1.5-.5 1.5-1.5S23.25 9 22.5 9z"/>
      <path d="M22.5 12c-2.5 2.5-5 6.5-5 10.5 0 3 1 6.5 5 10 .5.5 1 1 1.5 1h.001c.5-.001 1-.5 1.5-1 4-3.5 5-7 5-10 0-4-2.5-8-5-10.5z"/>
      <path d="M17.5 22.5c0-4.5 2-7.5 4.5-9.5M27.5 22.5c0-4.5-2-7.5-4.5-9.5" fill="none"/>
      <path d="M15 32.5h15v2.5H15z"/>
    </g>
  </svg>
);

export const WhiteQueenIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'white', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'white'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12.5" cy="10.5" r="2.5"/>
      <circle cx="22.5" cy="8.5" r="2.5"/>
      <circle cx="32.5" cy="10.5" r="2.5"/>
      <path d="M12.5 10.5s-.5 7.5 10 7.5 10-7.5 10-7.5"/>
      <path d="M12.5 18c-3 4.5-3 10 0 14.5h10M32.5 18c3 4.5 3 10 0 14.5h-10"/>
      <path d="M12.5 32.5h20V36h-20z"/>
    </g>
  </svg>
);

export const BlackQueenIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'black', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'black'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12.5" cy="10.5" r="2.5"/>
      <circle cx="22.5" cy="8.5" r="2.5"/>
      <circle cx="32.5" cy="10.5" r="2.5"/>
      <path d="M12.5 10.5s-.5 7.5 10 7.5 10-7.5 10-7.5"/>
      <path d="M12.5 18c-3 4.5-3 10 0 14.5h10M32.5 18c3 4.5 3 10 0 14.5h-10"/>
      <path d="M12.5 32.5h20V36h-20z"/>
    </g>
  </svg>
);

export const WhiteKingIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'white', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'white'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.5V6M20 8.5h5"/>
      <path d="M22.5 25s4.5-2 4.5-8.5a4.5 4.5 0 10-9 0c0 6.5 4.5 8.5 4.5 8.5z"/>
      <path d="M12.5 36v-7.5c0-3 2-7.5 10-7.5s10 4.5 10 7.5V36H12.5z"/>
    </g>
  </svg>
);

export const BlackKingIcon = ({ className, colorOverride }: IconProps) => (
  <svg viewBox="0 0 45 45" className={cn("w-full h-full transition-transform duration-200 group-hover:scale-110", className)} xmlns="http://www.w3.org/2000/svg">
    <g fill={DefaultPieceColor({pieceColor: 'black', overrideColor: colorOverride})} stroke={DefaultStrokeColor({pieceColor: 'black'})} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.5V6M20 8.5h5"/>
      <path d="M22.5 25s4.5-2 4.5-8.5a4.5 4.5 0 10-9 0c0 6.5 4.5 8.5 4.5 8.5z"/>
      <path d="M12.5 36v-7.5c0-3 2-7.5 10-7.5s10 4.5 10 7.5V36H12.5z"/>
    </g>
  </svg>
);


export const PieceIcon: React.FC<{ piece: Piece; className?: string, colorOverride?: string }> = ({ piece, className, colorOverride }) => {
  if (!piece) return null;

  const props = { className, colorOverride };

  if (piece.color === 'white') {
    switch (piece.type) {
      case 'P': return <WhitePawnIcon {...props} />;
      case 'R': return <WhiteRookIcon {...props} />;
      case 'N': return <WhiteKnightIcon {...props} />;
      case 'B': return <WhiteBishopIcon {...props} />;
      case 'Q': return <WhiteQueenIcon {...props} />;
      case 'K': return <WhiteKingIcon {...props} />;
      default: return null;
    }
  } else {
    switch (piece.type) {
      case 'P': return <BlackPawnIcon {...props} />;
      case 'R': return <BlackRookIcon {...props} />;
      case 'N': return <BlackKnightIcon {...props} />;
      case 'B': return <BlackBishopIcon {...props} />;
      case 'Q': return <BlackQueenIcon {...props} />;
      case 'K': return <BlackKingIcon {...props} />;
      default: return null;
    }
  }
};
