import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Flex, Button, Text } from '@chakra-ui/react';

const ADD_EVENT = gql`
  mutation addEvent($date: Date, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const buttonStyles = {
  border: 'none',
  marginTop: '0.5rem',
};

const buttonContainerStyles = {
  marginRight: '10px',
  '&:last-child': {
    marginRight: 0,
  },
  textAlign: 'center',
};

const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID, $habitId: ID) {
    removeEvent(eventId: $eventId, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitButton = ({ date, habitId, events }) => {
  const [addEvent] = useMutation(ADD_EVENT, {
    refetchQueries: ['getHabits'],
  });
  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: ['getHabits'],
  });
  const foundDate = events.find((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === date.getDate();
  });

  return (
    // Temporary usage until linked to DB
    <Flex flexDirection="column" sx={{ ...buttonContainerStyles }}>
      <Text as="span">
        {date.getMonth() + 1}/{date.getDate()}
      </Text>
      {foundDate ? (
        <Button
          onClick={() =>
            removeEvent({
              variables: {
                habitId,
                eventId: foundDate._id,
              },
            })
          }
          sx={{ ...buttonStyles }}
        >
          X
        </Button>
      ) : (
        <Button
          onClick={() =>
            addEvent({
              variables: {
                habitId,
                date,
              },
            })
          }
          sx={{ ...buttonStyles }}
        >
          O
        </Button>
      )}
    </Flex>
  );
};

export default HabitButton;
