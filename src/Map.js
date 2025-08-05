import React, { useState, useEffect, useRef } from 'react';
import matt from './images/matt.png';
import fizz from './images/fizz.png';
import dumbbells from './images/dumbbells.png';
import xbox from './images/xbox.png';
import wife from './images/wife.jpg';
import enemy from './images/enemy.png';
import farm from './images/farm.jpg';
import grunt from './sounds/grunt.wav';
import locknload from './sounds/locknload.ogg';
import slurp from './sounds/slurp.wav';
import smooch from './sounds/smooch.wav';
import smallville from './sounds/smallville.wav';

const GRID_SIZE = 4;

export default function Map() {
  const initialItems = [
    { x: 1, y: 0, img: dumbbells, name: 'dumbbells', sound: grunt },
    { x: 3, y: 2, img: fizz, name: 'fizz', sound: slurp },
    { x: 2, y: 3, img: xbox, name: 'xbox', sound: locknload },
    { x: 3, y: 3, img: wife, name: 'wife', sound: smooch },
    { x: 1, y: 2, img: farm, name: 'farm', sound: smallville },
  ];

  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [inventory, setInventory] = useState([]);
  const [itemList, setItemList] = useState(initialItems);
  const [enemyPos, setEnemyPos] = useState({ x: 3, y: 0 });

  const cells = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const isPlayerHere = playerPos.x === x && playerPos.y === y;
      const itemHere = itemList.find(item => item.x === x && item.y === y);
      const isEnemyHere = enemyPos.x === x && enemyPos.y === y;

      cells.push(
        <div
          key={`${x}-${y}`}
          style={{
            // width: `calc(100vw / ${GRID_SIZE})`,
            // height: `calc(100vh / ${GRID_SIZE})`,
            width: '100%',
            height: '100%',
            border: '1px solid #f4a261',
            backgroundColor: '#f4a261',
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
                width: '100%',
                height: '100%',
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
          {isEnemyHere && (
            <img
              src={enemy}
              alt="Enemy"
              style={{
                position: 'absolute',
                width: '60%',
                height: '60%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                opacity: 0.8,
                zIndex: 1,
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
        
          // Play sound
          const audio = new Audio(item.sound);
          audio.play().catch(err => console.warn('Audio playback failed', err));

         // Stop sound after 2 seconds (2000 milliseconds)
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, 2000);

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

  useEffect(() => {
    const directions = [
      { x:0, y: -1 },
      { x:0, y: 1 },
      { x:-1, y: 0 },
      { x:1, y: 0 },
    ];

    const moveEnemy = () => {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      setEnemyPos(prev => {
        const newX = Math.max(0, Math.min(GRID_SIZE - 1, prev.x + dir.x));
        const newY = Math.max(0, Math.min(GRID_SIZE - 1, prev.y + dir.y));
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveEnemy, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button
        style={{
          position: 'fixed',
          top: 60,
          right: 10,
          padding: '6px 12px',
          backgroundColor: '#e76f51',
          border: 'none',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1001,
        }}
        onClick={() => setInventory([])}
      >
        Clear Inventory
      </button>

      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          background: `url(${farm})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
        <h3
          style={{
            margin: '0 0 8px 0',
            width: '100%',
            fontSize: '16px',
            textAlign: 'center',
            background: 'teal',
            color: 'white',
            padding: '4px 0',
            borderRadius: '4px',
          }}
        >
          Inventory
        </h3>
        {inventory.length === 0 ? (
          <div><em style={{ color: 'white' }}>There is nothing in the inventory</em></div>
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
