import React from 'react'
import matt from './images/matt.png'
import { useState } from 'react';

const GRID_SIZE = 4;
const CELL_SIZE = 55;

export default function Map() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0});

  const cells = [];

  for (let y=0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
        const isPlayerHere = playerPos.x === x && playerPos.y === y;
        
        cells.push(
            <div
                key={`${x}-${y}`}
                style={{
                    width: `calc(100vw / ${GRID_SIZE})`,
                    height: `calc(100vh / ${GRID_SIZE})`,
                    border: '1px solid #999',
                    backgroundColor: 'lightgrey',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {isPlayerHere && (
                    <img
                        src={matt}
                        alt="Player"
                        style={{ 
                            width: '90%', 
                            height: '90%', 
                            objectFit: 'contain',
                            imageRendering: 'pixelated',
                        }}
                    />
                )}
            </div>
        );
    }
  }
  
    return (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, calc(100vw / ${GRID_SIZE}))`,
            gridTemplateRows: `repeat(${GRID_SIZE}, calc(100vh / ${GRID_SIZE}))`,
            gap: 1,
        }}
    >
        {cells}
    </div>
  )
}

