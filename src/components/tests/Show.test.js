import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

test('renders without errors', () => { 
    const mockSelectedSeason = "none"; 
    const mockHandleSelect = jest.fn(()=> {})
    render(<Show show = {showStructure} selectedSeason = {mockSelectedSeason} />)
});

test('renders Loading component when prop show is null', () => {
    const show = null;
    render(<Show show = {show}/>);
    const loadingComponent = screen.getByTestId("loading-container");
    expect(loadingComponent).toHaveTextContent(/Fetching data.../i)
    expect(loadingComponent).toBeTruthy();
 });

test('renders same number of options seasons are passed in', () => { });

test('handleSelect is called when an season is selected', () => { });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { });


const showStructure = {
    name : "",
    summary : "",
    seasons : [
        {id : 0, name : "season 1", episodes : []},
        {id : 1, name : "season 2", episodes : []},
        {id : 2, name : "season 3", episodes : []}
    ],
}
console.log(showStructure.seasons[1].episodes)