import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherCardUser from '@/components/WeatherCardUser';

describe('WeatherCardUser Component', () => {
  const mockData = {
    location: {
      country: 'Test Country',
      name: 'Test City',
    },
    current: {
      condition: {
        text: 'Test Condition',
        icon: 'http://test-icon-url.com/test-icon.png',
      },
      temp_c: 25,
    };

  it('renders the weather card with the provided data', () => {
    render(<WeatherCardUser data={mockData} />);

    // Check if the weather card elements are displayed with the provided data
    const country = screen.getByText('Test Country');
    const city = screen.getByText('Test City');
    const condition = screen.getByText('Test Condition');
    const temperature = screen.getByText('25℃');

    expect(country).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(condition).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });

  it('calls the provided function when the card is clicked', () => {
    const onClick = jest.fn();

    render(
      <WeatherCardUser data={mockData} onClick={onClick} />
    );

    // Click the card
    const weatherCard = screen.getByTestId('weather-card');
    fireEvent.click(weatherCard);

    // Check if the function is called
    expect(onClick).toHaveBeenCalled();
  });

  // You can add more test cases to cover other aspects of the component
});
