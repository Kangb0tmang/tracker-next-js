import { useState } from 'react';

const HabitButton = () => {
  const [complete, setComplete] = useState(false);

  return (
    // Temporary usage until linked to DB
    <button onClick={() => setComplete(!complete)}>
      {complete ? 'X' : 'O'}
    </button>
  );
};

export default HabitButton;
