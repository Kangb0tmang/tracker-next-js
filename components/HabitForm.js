import { Form, Field } from '@leveluptuts/fresh';

const HabitForm = ({ setHabits }) => {
  return (
    <Form
      onSubmit={(data) => {
        console.log(data);
        // data.habit is the label of <Field></Field>
        setHabits((prevState) => [...prevState, data.habit]);
      }}
    >
      <Field>Habit</Field>
    </Form>
  );
};

export default HabitForm;
