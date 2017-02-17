'use strict';

import React, { Component } from 'react';
import ErrorMessage from '../app/components/common/errorMessage';
import MonacoEditor from './components/monacoEditor';
import Loader from '../app/components/common/loader';

class MonacoPage extends Component {
    constructor (props) {
        super(props);        
        this.state = { 
            loading: true,
            fetching: false,
            log: [],
            error: {},
            code: 
`let unsorted_array = ["b", "c", "a", "d", "i", "g", "f", "e", "h"];
var arr = unsorted_array.slice(0);

function merge(left, right){
    var result  = [],
        il      = 0,
        ir      = 0;

    while (il < left.length && ir < right.length){
        if (left[il] < right[ir]){
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}

function mergeSort(items){

    // Terminal case: 0 or 1 item arrays don't need sorting
    if (items.length < 2) {
        return items;
    }

    var middle = Math.floor(items.length / 2),
        left    = items.slice(0, middle),
        right   = items.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

let output = function(str){
    console.log(str);
}

output("MergeSort");
output("Original: " + arr);
output("Merge_Sort: " + mergeSort(arr));
output("Original Unchanged: " + arr);`
        };    
        this.tempEditorDidMount = this.tempEditorDidMount.bind(this);
        this.runCode = this.runCode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearError = this.clearError.bind(this);
        this.clearConsole = this.clearConsole.bind(this);
    }
    componentDidMount () {

    }
    render () {
        const { code, log, error } = this.state;
        const runCode = this.runCode;
        const clearError = this.clearError;
        const clearConsole = this.clearConsole;
        const output = (
            <div>
                {
                    log.map((line, i) => (
                        <span key={i}>{line}<br /></span>
                    ))
                }
            </div>
        );
        const editor = (
            <div>
                <div className='row'>
                    <div className='col-md-12' style={{ marginBottom: '10px' }}>
                        <button className='btn btn-danger pull-left' onClick={runCode}>RUN</button>
                        <button className='btn btn-default pull-right' onClick={clearConsole}>Clear Console</button>
                    </div>
                </div>      
                <div className='row'> 
                    <div className='col-md-6'>
                        <MonacoEditor 
                        width='100%'
                        height='500'
                        language='javascript'
                        theme='vs-dark'
                        value={code}
                        options={{ selectOnLineNumbers: true }}
                        onChange={this.onChange}
                        editorDidMount={this.editorDidMount}
                        />
                    </div>
                    <div className='col-md-6'>
                        <pre style={{ height: '500px', overflowY: 'auto', overflowX: 'none', whiteSpace: 'word-wrap' }}>
                            <Loader loading={this.state.fetching} element={output} />
                        </pre>
                    </div>  
                </div>              
            </div>
                            
        );
        return (
            <div className='flex-container'>
                <p className='-text'>Monaco Editor</p>
                <ErrorMessage name='Monaco' 
                      error={error.message ? error.error : error.statusCode}
                      message={error.message || error.error} 
                      dismiss={clearError}
                      />
                <Loader loading={this.state.loading} element={editor} />
                {this.state.loading && 
                    <div style={{ display: 'none' }}>
                        <MonacoEditor editorDidMount={this.tempEditorDidMount} />
                    </div>
                }
            </div>
        );
    }
    clearError () {        
        this.setState({ error: {} });
    }
    clearConsole () {
        this.setState({ log: [] });
    }
    runCode () {
        this.clearConsole();
        this.setState({ fetching: true });
        fetch(`${global.API_PATH}/run/js`, { method: 'POST', body: JSON.stringify({ code: btoa(this.state.code) }), headers: { queuename: '/run/js' } })
            .then((response) => response.json())
            .then((response) => {
                response.statusCode && response.statusCode !== '200' ? 
                    this.setState({ error: response, fetching: false  }) :
                    this.setState({ log: [...this.state.log, ...response], fetching: false });
            });
    }
    onChange (newValue, e) {
        console.log('onChange', newValue, e);
        this.setState({ code: newValue });
    }
    editorDidMount (editor, monaco) {
        editor.focus();
    }
    tempEditorDidMount () {
        this.setState({ loading: false });
    }
}
MonacoPage.pageName = 'Monaco';

export default MonacoPage;
