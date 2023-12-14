import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import Form from '../../../components/Form/index';
import employeeDataSlice from '../../../store/employeeDataSlice';

// Mock Redux store
const mockStore = configureStore({ reducer: { employeeData: employeeDataSlice } });

describe('Form Component', () => {
  const mockSetModalIsOpen = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <Form setModalIsOpen={mockSetModalIsOpen} />
      </Provider>
    );
  });

  test('renders without crashing', () => {
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  });

  test('allows user to fill out form fields', async () => {
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/birth date/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/start date/i), '2020-01-01');
    await userEvent.type(screen.getByLabelText(/street/i), '123 Main St');
    await userEvent.type(screen.getByLabelText(/city/i), 'Anytown');
    await userEvent.type(screen.getByLabelText(/zip code/i), '12345');

    // Interact with react-select for state and department
    userEvent.click(screen.getByLabelText(/state/i));
    await waitFor(() => userEvent.click(screen.getByText('New York')));
    
    userEvent.click(screen.getByLabelText(/department/i));
    await waitFor(() => userEvent.click(screen.getByText('Engineering')));

    // Assertions for each field
    await waitFor(() => expect(screen.getByLabelText(/first name/i)).toHaveValue('John'));
    await waitFor(() => expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe'));
    await waitFor(() => expect(screen.getByLabelText(/birth date/i)).toHaveValue('1990-01-01'));
    await waitFor(() => expect(screen.getByLabelText(/start date/i)).toHaveValue('2020-01-01'));
    await waitFor(() => expect(screen.getByLabelText(/street/i)).toHaveValue('123 Main St'));
    await waitFor(() => expect(screen.getByLabelText(/city/i)).toHaveValue('Anytown'));
    await waitFor(() => expect(screen.getByLabelText(/zip code/i)).toHaveValue('12345'));
  });

  test('displays error messages for empty required fields', async () => {
    fireEvent.submit(screen.getByRole('button', { name: /create employee!/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/please provide this field/i)).toHaveLength(7);
    });
  });

  test('submits the form with correct data', async () => {
    // Fill out the form
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/birth date/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/start date/i), '2020-01-01');
    await userEvent.type(screen.getByLabelText(/street/i), '123 Main St');
    await userEvent.type(screen.getByLabelText(/city/i), 'Anytown');
    await userEvent.type(screen.getByLabelText(/zip code/i), '12345');
    userEvent.click(screen.getByLabelText(/state/i));
    await waitFor(() => userEvent.click(screen.getByText('New York')));
    userEvent.click(screen.getByLabelText(/department/i));
    await waitFor(() => userEvent.click(screen.getByText('Engineering')));

    fireEvent.submit(screen.getByRole('button', { name: /create employee!/i }));

    await waitFor(() => {
      expect(mockSetModalIsOpen).toHaveBeenCalledWith(true);
    });
  });
});
