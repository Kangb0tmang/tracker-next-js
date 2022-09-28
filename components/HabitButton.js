import { useState } from 'react';

const HabitButton = ({ date }) => {
  const [complete, setComplete] = useState(false);

  return (
    // Temporary usage until linked to DB
    <span>
      {date.getMonth() + 1}/{date.getDate()}
      <button onClick={() => setComplete(!complete)}>
        {complete ? 'X' : 'O'}
      </button>
      {/* Does not support nested styles */}
      <style jsx>
        {`
          span {
            display: flex;
            flex-direction: column;
          }
          span + span {
            margin-left: 10px;
          }
          button {
            margin-top: 1rem;
            border: none;
            background-color: transparent;
          }
        `}
      </style>
    </span>
  );
};

export default HabitButton;
