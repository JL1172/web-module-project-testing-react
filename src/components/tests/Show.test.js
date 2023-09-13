import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event';
import Episode from '../Episode';


test('renders without errors', () => { 
    const mockSelectedSeason = "none"; 
    render(<Show show = {showStructure} selectedSeason = {mockSelectedSeason} />)
});

test('renders Loading component when prop show is null', () => {
    const show = null;
    render(<Show show = {show}/>);
    const loadingComponent = screen.getByTestId("loading-container");
    expect(loadingComponent).toHaveTextContent(/Fetching data.../i)
    expect(loadingComponent).toBeTruthy();
 });

test('renders same number of options seasons are passed in', () => { 
    render(<Show show = {showStructure} selectedSeason = {"none"}/>)
    const options = screen.getAllByTestId("season-option");
    expect(options).toHaveLength(showStructure.seasons.length); 
});

test('handleSelect is called when an season is selected', () => { 
    const mockHandleSelect = jest.fn(()=> {});
    render(<Show show = {showStructure} selectedSeason = {"none"} handleSelect = {mockHandleSelect}/>);
    const dropDown = screen.getByTestId("combox");
    //* console.log(dropDown.nodeName)
    fireEvent.change(dropDown, {target : {value : "0"}})
    const options = screen.getAllByTestId("season-option")
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(mockHandleSelect).toBeCalled(); 
    expect(mockHandleSelect.mock.calls).toHaveLength(1); 
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show = {showStructure} selectedSeason = {"none"} />)
    // const select = screen.getByLabelText(/select a season/i);
    // fireEvent.change(select, {target : {value : "0"}});
    let episodes = screen.queryByTestId("episodes-container")
    expect(episodes).not.toBeInTheDocument();
    rerender(<Show show = {showStructure} selectedSeason = {"1"} />)
    episodes = screen.queryByTestId("episodes-container")
    expect(episodes).toBeInTheDocument(); 
})


const showStructure = {
    name : "test show",
    summary : "test summary",
    seasons : [
        {id : 0, name : "season 1", episodes : []},
        {id : 1, name : "season 2", episodes : []},
        {id : 2, name : "season 3", episodes : []}
    ],
}
