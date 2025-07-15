import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { Pokemon } from './types';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleLike = (id: number) => {
    setPokemons(prev =>
      prev.map(p =>
        p.id === id ? { ...p, liked: !p.liked } : p
      )
    );
  };

  return (
    <Router>
  <nav
    style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
      marginBottom: '20px',
    }}
  >
    <button
      onClick={() => setShowFavoritesOnly(false)}
      style={{
        padding: '10px 20px',
        backgroundColor: !showFavoritesOnly ? '#4CAF50' : '#e0e0e0',
        color: !showFavoritesOnly ? 'white' : '#333',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s',
      }}
    >
      메인
    </button>

    <button
      onClick={() => setShowFavoritesOnly(true)}
      style={{
        padding: '10px 20px',
        backgroundColor: showFavoritesOnly ? '#2196F3' : '#e0e0e0',
        color: showFavoritesOnly ? 'white' : '#333',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s',
      }}
    >
      찜 목록
    </button>
  </nav>

  {/* 라우터 설정 */}
  <Routes>
    <Route
      path="/"
      element={
        <Home
          pokemons={pokemons}
          setPokemons={setPokemons}
          toggleLike={toggleLike}
          showFavoritesOnly={showFavoritesOnly}
        />
      }
    />
    <Route path="/detail/:id" element={<Detail />} />
  </Routes>
</Router>

  );
}

export default App;


