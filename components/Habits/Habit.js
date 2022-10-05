import { Flex, Box, Heading, useTheme } from '@chakra-ui/react';
import HabitButton from './HabitButton';

const getLastFiveDays = () => {
  const dates = '01234'.split('').map((day) => {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - day);
    return tempDate;
  });
  return dates;
};

const Habit = ({ habit, index }) => {
  const dates = getLastFiveDays();
  const theme = useTheme();
  const borderColors = theme.borderColors.items;

  return (
    <Box
      p="20px"
      borderRadius="15px"
      boxShadow="2px 2px 15px rgba(0, 0, 0, 0.1)"
    >
      <Heading
        as="h3"
        mt="0"
        mb="10px"
        lineHeight="60px"
        borderBottomWidth={5}
        borderColor={borderColors[index]}
      >
        {habit.name}
      </Heading>
      <Flex>
        {dates.map((date) => (
          <HabitButton
            key={date.getTime()}
            date={date}
            habitId={habit._id}
            events={habit.events}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Habit;
