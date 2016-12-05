'use strict';
/* globals beforeAll */

// In order for React to use our test DOM we need to require it before requiring React
import testDom from '../utils/test-dom';
testDom();

import React from 'react';
import ReactDOM from 'react-dom';
import Redux from 'redux';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import sinon from 'sinon';

import Fibonacci from '../../web/client/app/combiners/fibonacci/Nth';
import store from '../../web/client/app/store';

import TestUtils from 'react-addons-test-utils';

describe('When Fibonacci Component is displayed it', () => {

    
    var Simulate = TestUtils.Simulate;

    var component;
    var renderedDOMElement;
    var initial_N = 20;
    var requests = [];

    var setupXHR = function() {
        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        requests = [];
        global.XMLHttpRequest.onCreate = function (xhr) {
            requests.push(xhr);
        };
    };

    var init = function(callback) {
        if(callback && typeof callback === "function"){
            component = TestUtils.renderIntoDocument(<Provider store={store}><Fibonacci n={initial_N} requestComplete={callback} /></Provider>);
        } else {
            component = TestUtils.renderIntoDocument(<Provider store={store}><Fibonacci n={initial_N} /></Provider>);
        }
        //requests[0].respond(200, {"Content-Type": "application/json"}, '123');
        requests = [];
        renderedDOMElement = ReactDOM.findDOMNode(component);
    }

    beforeAll(() => {        
        setupXHR();
        init();
    });
    beforeEach(() =>{
        setupXHR();
    });
    afterEach(() => {
        global.XMLHttpRequest.restore();
    });
    
    it('should render the correct N value', (done) => {
        var nValue = store.getState().fibonacci.n;
        var renderedDOMNumber_N = parseInt(renderedDOMElement.querySelector('.n').value);

        expect(renderedDOMNumber_N).to.equal(nValue);
        done();
    });
/*
    it('should render the Fibonacci Value from the ajax request', (done) => {
        console.log(store.getState());
        var fibonacciValue = store.getState().loading ? 'Loading...' : store.getState().fibonacci.f;
        var renderedDOMNumber_F = parseInt(renderedDOMElement.querySelector('.-number.f').textContent);
        console.log(renderedDOMNumber_F);
        expect(renderedDOMNumber_F).to.equal(fibonacciValue);
        done();
    });


    it('should increment N when the `+` button is clicked', (done) => {
        var currentNValue = parseInt(renderedDOMElement.querySelector('.-number.n').textContent);
        expect(currentNValue).to.equal(20);
        var incrementButton = renderedDOMElement.querySelectorAll('.btn')[0];
        Simulate.click(incrementButton);

        expect(requests.length).to.equal(1);
        requests[0].respond(200, {"Content-Type": "application/json"}, '123');

        var fibonacciValue = component.state.f;
        var renderedDOMNumber_F = parseInt(renderedDOMElement.querySelector('.-number.f').textContent);
        expect(renderedDOMNumber_F).to.equal(fibonacciValue);

        var incrementedValue = parseInt(renderedDOMElement.querySelector('.-number.n').textContent);
        expect(incrementedValue).to.equal(currentNValue + 1);  
        expect(incrementedValue).to.equal(21);          
        done();
    });


    it('should decrement N when the `-` button is clicked', (done) => {
        var currentNValue = parseInt(renderedDOMElement.querySelector('.-number.n').textContent);
        expect(currentNValue).to.equal(21);
        var decrementButton = renderedDOMElement.querySelectorAll('.btn')[1];
        Simulate.click(decrementButton);

        expect(requests.length).to.equal(1);
        requests[0].respond(200, {"Content-Type": "application/json"}, '123');

        var fibonacciValue = component.state.f;
        var renderedDOMNumber_F = parseInt(renderedDOMElement.querySelector('.-number.f').textContent);
        expect(renderedDOMNumber_F).to.equal(fibonacciValue);
        
        var decrementedValue = parseInt(renderedDOMElement.querySelector('.-number.n').textContent);
        expect(decrementedValue).to.equal(currentNValue - 1);
        expect(decrementedValue).to.equal(20);         
        done();
    });
    */
});