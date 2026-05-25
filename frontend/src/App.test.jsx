import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// Mock axios globally
jest.mock('axios');

const mockTodos = [
  {
    _id: '1',
    title: 'First Test Task',
    description: 'Learn Jest and RTL',
    dueDate: '2026-06-01T00:00:00.000Z',
    completed: false,
    createdAt: '2026-05-25T10:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Second Test Task',
    description: 'Build MERN App',
    dueDate: '2026-05-30T00:00:00.000Z',
    completed: true,
    createdAt: '2026-05-25T09:00:00.000Z'
  }
];

describe('MERN Todo App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header titles and connects to mock database', async () => {
    axios.get.mockResolvedValueOnce({ data: mockTodos });

    render(<App />);

    // Check loading indicator first
    expect(screen.getByText(/Connecting to database/i)).toBeInTheDocument();

    // Wait for the loader to clear and todos to render
    await waitFor(() => {
      expect(screen.queryByText(/Connecting to database/i)).not.toBeInTheDocument();
    });

    // Verify main headers are present
    expect(screen.getByText('TaskSphere')).toBeInTheDocument();
    expect(screen.getByText(/A premium workspace to organize and track your goals/i)).toBeInTheDocument();

    // Verify todo items rendered from mock response
    expect(screen.getByText('First Test Task')).toBeInTheDocument();
    expect(screen.getByText('Second Test Task')).toBeInTheDocument();
  });

  test('calculates and renders overall stats correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: mockTodos });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('First Test Task')).toBeInTheDocument();
    });

    // Total: 2, Completed: 1, Pending: 1
    // Stats elements checks
    expect(screen.getAllByText('2')[0]).toBeInTheDocument(); // Total value
    expect(screen.getAllByText('1')[0]).toBeInTheDocument(); // Completed value
    expect(screen.getAllByText('1')[1]).toBeInTheDocument(); // Pending value

    // Verify progress math (1/2 = 50%)
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('validates form fields and displays error on empty submit', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText(/Connecting to database/i)).not.toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: /Add Task/i });
    fireEvent.click(submitButton);

    // Should show error validation message
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  test('successfully submits a new todo through form', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    
    const newTodo = {
      _id: '3',
      title: 'Add new task via test',
      description: 'Integrate front-to-back',
      dueDate: null,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    axios.post.mockResolvedValueOnce({ data: newTodo });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText(/Connecting to database/i)).not.toBeInTheDocument();
    });

    // Type in fields
    const titleInput = screen.getByPlaceholderText(/e.g., Design UI mockups/i);
    const descInput = screen.getByPlaceholderText(/Describe the details of this task.../i);
    
    fireEvent.change(titleInput, { target: { value: 'Add new task via test' } });
    fireEvent.change(descInput, { target: { value: 'Integrate front-to-back' } });

    const submitButton = screen.getByRole('button', { name: /Add Task/i });
    fireEvent.click(submitButton);

    // Verify API POST triggered with clean data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          title: 'Add new task via test',
          description: 'Integrate front-to-back',
          dueDate: null
        })
      );
    });

    // Verify the new todo renders in the list
    expect(screen.getByText('Add new task via test')).toBeInTheDocument();
    expect(screen.getByText('Integrate front-to-back')).toBeInTheDocument();
  });

  test('toggles active and completed filter tabs correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: mockTodos });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('First Test Task')).toBeInTheDocument();
    });

    // Both are initially visible in 'All'
    expect(screen.getByText('First Test Task')).toBeInTheDocument();
    expect(screen.getByText('Second Test Task')).toBeInTheDocument();

    // Click Active filter
    const activeFilterButton = screen.getByRole('button', { name: /^Active$/ });
    fireEvent.click(activeFilterButton);

    // Incomplete should remain, completed should be hidden
    expect(screen.getByText('First Test Task')).toBeInTheDocument();
    expect(screen.queryByText('Second Test Task')).not.toBeInTheDocument();

    // Click Completed filter
    const completedFilterButton = screen.getByRole('button', { name: /^Completed$/ });
    fireEvent.click(completedFilterButton);

    // Completed should be visible, active hidden
    expect(screen.queryByText('First Test Task')).not.toBeInTheDocument();
    expect(screen.getByText('Second Test Task')).toBeInTheDocument();
  });
});
