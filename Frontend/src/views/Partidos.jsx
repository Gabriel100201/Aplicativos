import { useState } from 'react';

export const LigaProfesional = () => {
  const [matches, setMatches] = useState([
    { team1: 'San Lorenzo', score1: 2, team2: 'Banfield', score2: 1, minute: 'Final', events: ['29\' I. Muniain (pen.)', '51\' I. Muniain', '45+3\' B. Sepulveda (pen.)'] },
    { team1: 'Estudiantes (LP)', score1: 1, team2: 'Def y Justicia', score2: 0, minute: '32\'', events: ['4\' G. Carrillo'] },
    { team1: 'Godoy Cruz', score1: 0, team2: 'Huracan', score2: 1, minute: '31\'', events: ['7\' F. Rasmussen (e.c.)'] }
  ]);

  const addMatch = () => {
    setMatches([...matches, { team1: 'Nuevo Equipo 1', score1: 0, team2: 'Nuevo Equipo 2', score2: 0, minute: '0\'', events: [] }]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-center text-2xl font-bold mb-6">🇦🇷 Liga Profesional 🇦🇷</h1>
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">{match.minute}</span>
              <div className="text-right">
                <p className="font-semibold">{match.team1} <span className="text-lg">{match.score1}</span></p>
                <p className="font-semibold">{match.team2} <span className="text-lg">{match.score2}</span></p>
              </div>
            </div>
            <ul className="text-xs text-gray-300">
              {match.events.map((event, idx) => (
                <li key={idx}>{event}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={addMatch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500"
        >
          Agregar Partido
        </button>
      </div>
    </div>
  );
};

export default LigaProfesional;
