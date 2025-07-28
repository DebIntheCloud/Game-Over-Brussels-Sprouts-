import React, { useState, useEffect } from 'react';
import matt from './images/matt.png';
import fizz from './images/fizz.png';
import dumbbells from './images/dumbbells.png';
import xbox from './images/xbox.png';

const GRID_SIZE = 4;

export default function Map() {

    const initialItems = [
    { x: 1, y: 0, img: dumbbells, name: 'dumbbells' },
    { x: 3, y: 2, img: fizz, name: 'fizz' },
    { x: 2, y: 3, img: xbox, name: 'xbox' },
  ];

  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [inventory, setInventory] = useState([]);
  const [itemList, setItemList] = useState(initialItems);

  const cells = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const isPlayerHere = playerPos.x === x && playerPos.y === y;
      const itemHere = itemList.find(item => item.x === x && item.y === y);

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
            position: 'relative',
          }}
        >
          {itemHere && (
            <img
              src={itemHere.img}
              alt={itemHere.name}
              style={{
                position: 'absolute',
                width: '50%',
                height: '50%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
              }}
            />
          )}
          {isPlayerHere && (
            <img
              src={matt}
              alt="Player"
              style={{
                position: 'absolute',
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

  useEffect(() => {
    function handleKeyDown(e) {
      setPlayerPos(prev => {
        let { x, y } = prev;

        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            y = Math.max(0, y - 1);
            break;
          case 'ArrowDown':
          case 's':
          case 'S':
            y = Math.min(GRID_SIZE - 1, y + 1);
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            x = Math.max(0, x - 1);
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            x = Math.min(GRID_SIZE - 1, x + 1);
            break;
          default:
            return prev;
        }

        // Check for item at new location
        const item = itemList.find(i => i.x === x && i.y === y);
        if (item) {
            setInventory(prevInv => [...prevInv, item.name]); // Add to inventory
            setItemList(prevItems => prevItems.filter(i => !(i.x === x && i.y === y))); // Remove from grid
        }

        return { x, y };
      });
    }

    window.addEventListener('keydown', handleKeyDown); 
    //whenever any key is pressed anywhere on the page, run the function handleKeyDown
    return () => {
      window.removeEventListener('keydown', handleKeyDown); 
    //now stop listening for key presses.
    };
  }, []);

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
  );
}

