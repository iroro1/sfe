import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherCardSearch from '@/components/WeatherCardSearch';

describe('WeatherCardSearch Component', () => {
  const mockData = {
    location: {
      country: 'Test Country',
      name: 'Test City',
    },
    current: {
      condition: {
        text: 'Test Condition',
      },
      temp_c: 25,
      condition: {
        icon: 'http://test-icon-url.com/test-icon.png',
      },
    };

  it('renders the loading section when "load" is true', () => {
    render(<WeatherCardSearch data={mockData} load={true} />);

    // Check if the loading section is displayed
    const loadingSection = screen.getByTestId('loading-section');
    expect(loadingSection).toBeInTheDocument();
  });

  it('renders the search weather card when "load" is false', () => {
    render(<WeatherCardSearch data={mockData} load={false} />);

    // Check if the search weather card elements are displayed
    const country = screen.getByText('Test Country');
    const city = screen.getByText('Test City');
    const condition = screen.getByText('Test Condition');
    const temperature = screen.getByText('25℃');

    expect(country).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(condition).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });

  it('calls the provided functions when clicked', () => {
    const onClick = jest.fn();
    const deleteClick = jest.fn();

    render(
      <WeatherCardSearch
        data={mockData}
        load={false}
        onClick={onClick}
        deleteClick={deleteClick}
      />
    );

    // Click the elements that trigger functions
    const cityElement = screen.getByText('Test City');
    const deleteButton = screen.getByTestId('delete-button');

    fireEvent.click(cityElement);
    fireEvent.click(deleteButton);

    // Check if the functions are called
    expect(onClick).toHaveBeenCalled();
    expect(deleteClick).toHaveBeenCalled();
  });

  // You can add more test cases to cover other aspects of the component
});
