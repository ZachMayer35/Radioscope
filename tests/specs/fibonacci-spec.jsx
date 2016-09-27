'use strict';

// In order for React to use our test DOM we need to require it before requiring React
require('../utils/test-dom')();

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('chai').expect;
var sinon = require('sinon');

var Fibonacci = require('../../src/components/fibonacci');

describe('When Fibonacci Component is displayed it', () => {

    var TestUtils = require('react-addons-test-utils');
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
            component = TestUtils.renderIntoDocument(<Fibonacci initial_N={initial_N} requestComplete={callback} />);
        } else {
            component = TestUtils.renderIntoDocument(<Fibonacci initial_N={initial_N} />);
        }
        requests[0].respond(200, {"Content-Type": "application/json"}, '123');
        requests = [];
        renderedDOMElement = ReactDOM.findDOMNode(component);
    }

    before(() => {        
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
        var nValue = component.state.n;
        var renderedDOMNumber_N = parseInt(renderedDOMElement.querySelector('.-number.n').textContent);

        expect(renderedDOMNumber_N).to.equal(nValue);
        done();
    });

    it('should render the Fibonacci Value from the ajax request', (done) => {
        var fibonacciValue = component.state.f;
        var renderedDOMNumber_F = parseInt(renderedDOMElement.querySelector('.-number.f').textContent);

        expect(renderedDOMNumber_F).to.equal(fibonacciValue);
        done();
    });


    it('should increment N when the `+` button is clicked', (done) => {
        var currentNValue = parseInt(renderedDOMElement.querySelector('.-number.n').textContent);
        expect(currentNValue).to.equal(20);
        var incrementButton = renderedDOMElement.querySelectorAll('.-button')[0];
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
        var decrementButton = renderedDOMElement.querySelectorAll('.-button')[1];
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
});