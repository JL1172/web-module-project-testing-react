import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import userEvent from '@testing-library/user-event';
import mockFetchShow from '../../api/fetchShow';

jest.mock('../../api/fetchShow'); 

const showStructure = {
    name : "test show",
    summary : "test summary",
    seasons : [
        {id : 0, name : "season 1", episodes : []},
        {id : 1, name : "season 2", episodes : []},
        {id : 2, name : "season 3", episodes : []}
    ],
}

test('renders without errors with no props', async () => {
    render(<Display />); 
 });

test('renders Show component when the button is clicked ',async() => {
    render(<Display/>);
    mockFetchShow.mockResolvedValueOnce(showStructure)
    let button = screen.getByText(/press to get show data/i);
    fireEvent.click(button)
    await waitFor(()=> {
        let showComponent = screen.queryByTestId("show-container");
        expect(showComponent).toBeInTheDocument();
    })
 });

test('renders show season options matching your data when the button is clicked', async() => {
    const displayFunc = jest.fn();
    render(<Display displayFunc = {displayFunc}/>);
    mockFetchShow.mockResolvedValueOnce(showStructure)
    let button = screen.getByText(/press to get show data/i);
    fireEvent.click(button)
    await waitFor(()=> {
        const options = screen.getAllByTestId("season-option");
        expect(options).toHaveLength(showStructure.seasons.length)
        expect(displayFunc.mock.calls).toHaveLength(1); 
    })
 });
