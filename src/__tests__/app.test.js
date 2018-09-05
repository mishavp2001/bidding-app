jest.mock('../__mocks__/projects-api.js');

import React from 'react'
import renderer from 'react-test-renderer'

import App from '../client/app.js'

// Snapshot for CardComponent React Component
describe('>>>App --- Snapshot',()=>{
    it('+++capturing Snapshot of App', () => {
        const renderedValue =  renderer.create(<App />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

});
