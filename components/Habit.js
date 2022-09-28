import HabitButton from './HabitButton';

const getLastFiveDays = () => {
  const dates = '01234'.split('').map((day) => {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - day);
    return tempDate;
  });

  return dates;
};

const Habit = ({ habit }) => {
  const dates = getLastFiveDays();
  console.log('dates', dates);

  return (
    <article>
      <h3>{habit}</h3>
      <div>
        {dates.map((date) => (
          <HabitButton key={date.getMilliseconds()} date={date} />
        ))}
      </div>
    </article>
  );
};

export default Habit;
