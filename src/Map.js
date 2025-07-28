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
          setInventory(prevInv => {
            // Prevent duplicates
            if (prevInv.some(i => i.name === item.name)) {
              return prevInv;
            }
            return [...prevInv, { name: item.name, img: item.img }];
          });
          setItemList(prevItems => prevItems.filter(i => !(i.x === x && i.y === y)));
        }

        return { x, y };
      });
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [itemList]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid black',
          borderRadius: '6px',
          maxWidth: '150px',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          zIndex: 1000,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          minHeight: '40px',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', width: '100%', fontSize: '16px', textAlign: 'center', background: 'teal' }}>Inventory</h3>
        {inventory.length === 0 ? (
          <div><em>There is nothing in the inventory</em></div>
        ) : (
          inventory.map((item, index) => (
            <img
              key={index}
              src={item.img}
              alt={item.name}
              title={item.name}
              style={{ width: 30, height: 30, objectFit: 'contain' }}
            />
          ))
        )}
      </div>

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
    </>
  );
}
