// src/test/Navbar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom';

window.alert = jest.fn(); // Mock alert function for testing

test('renders header with correct elements, including buttons with icons', () => {
  render(<Navbar />);

  // Check if the header is rendered
  expect(screen.getByTestId('header')).toBeInTheDocument();
  
  // Check if the title is rendered
  expect(screen.getByTestId('title')).toHaveTextContent('LMC Simulator');
  
  // Check if the load button is rendered
  const loadButton = screen.getByTestId('load-button');
  expect(loadButton).toBeInTheDocument();
  expect(loadButton.querySelector('i.bx-upload')).toBeInTheDocument();
  
  // Check if the run button is rendered
  const runButton = screen.getByTestId('run-button');
  expect(runButton).toBeInTheDocument();
  expect(runButton.querySelector('i.bx-play')).toBeInTheDocument();
  
  // Check if the user icon is rendered and clickable
  const userIcon = screen.getByTestId('user-icon');
  expect(userIcon).toBeInTheDocument();
  fireEvent.click(userIcon);
  expect(window.alert).toHaveBeenCalledWith('User icon clicked!');

  // Check if the settings icon is rendered and clickable
  const settingsIcon = screen.getByTestId('settings-icon');
  expect(settingsIcon).toBeInTheDocument();
  fireEvent.click(settingsIcon);
  expect(window.alert).toHaveBeenCalledWith('Settings icon clicked!');
});
