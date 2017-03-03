'use strict';

import React, { Component } from 'react';
import ErrorMessage from '../app/components/common/errorMessage';
import MonacoEditor from './components/monacoEditor';
import Loader from '../app/components/common/loader';
import stream from 'stream';

class MonacoPage extends Component {
    constructor (props) {
        super(props);        
        this.state = { 
            loading: true,
            fetching: false,
            streaming: false,
            log: [],
            editor: null,
            monaco: null,
            error: {},
            code: 
`const unsorted_array = ["b", "c", "a", "d", "i", "g", "f", "e", "h"];

const merge = (left, right) => {
    let result  = [],
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

const mergeSort = (items) => {

    // Terminal case: 0 or 1 item arrays don't need sorting
    if (items.length < 2) {
        return items;
    }

    const middle = Math.floor(items.length / 2),
          left   = items.slice(0, middle),
          right  = items.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

console.log("MergeSort");
console.log("Original: " + unsorted_array);
console.log("Merge_Sort: " + mergeSort(unsorted_array));
console.log("Original Unchanged: " + unsorted_array);`
        };    
        this.tempEditorDidMount = this.tempEditorDidMount.bind(this);
        this.runCode = this.runCode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearError = this.clearError.bind(this);
        this.clearConsole = this.clearConsole.bind(this);
        this.pump = this.pump.bind(this);
        this.trace = this.trace.bind(this);
        this.clearTrace = this.clearTrace.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
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
                <span>{log}</span>
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
                        ref={(input) => { this.Monaco = input; }}
                        width='100%'
                        height='500'
                        language='javascript'
                        theme='vs-dark'
                        value={code}
                        options={{ selectOnLineNumbers: true, folding: true }}
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
    trace (lineNum) {
        const { editor, monaco } = this.state;
        if (editor && monaco) {
            if (!editor.isFocused()) {
                editor.focus();
            }
            editor.revealLineInCenterIfOutsideViewport(lineNum);
            editor.setSelection(new monaco.Range(lineNum, 1, (lineNum + 1), -1));
        }
    }
    clearTrace () {
        const { editor, monaco } = this.state;
        if (editor && monaco) {
            const pos = editor.getPosition();
            editor.setSelection(new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column));
        }
    }
    pump (reader) {
        const pump = this.pump;
        if (!this.state.streaming) {
            reader.cancel();
        }
        reader.read().then((result) => {
          if (result.done) {
            setTimeout(() => { this.clearTrace(); }, 1000);
            return null;
          }

          let chunk = (new Buffer(result.value, 'ascii')).toString('utf-8');
          let chunks = [];        
          if (chunk.indexOf('%') >= 0) {
            chunk = chunk.replace('%', btoa('Done!'));
            this.setState({ streaming: false });
          }
          // update.
          try {
            chunks = chunk.split('|');
            chunks.forEach((c) => {
                if (c[0] === ':') {
                    // highlight line
                    const lineNum = parseInt(atob(c.replace(':', '')));                    
                    this.trace(lineNum);
                } else {
                    this.setState({ log: this.state.log + atob(c), fetching: false });
                }
            });            
          } catch (ex) {
            console.log(ex);
          }
          //console.log(reader);
          setTimeout(() => pump(reader), 0);
        });
    }
    runCode () {
        this.clearConsole();
        this.setState({ fetching: true });
        const pump = this.pump;
        fetch(`${global.API_PATH}/run/js`, { method: 'POST', body: JSON.stringify({ code: btoa(this.state.code) }), headers: { queuename: '/run/js', streaming: true } })            
            .then((response) => {
                this.setState({ streaming: true });
                return pump(response.body.getReader());
            });
    }
    onChange (newValue, e) {
        console.log('onChange', newValue, e);
        this.setState({ code: newValue });
    }
    editorDidMount (editor, monaco) {
        this.setState({ editor, monaco });
        editor.focus();
    }
    tempEditorDidMount () {
        this.setState({ loading: false });
    }
}
MonacoPage.pageName = 'Monaco';

export default MonacoPage;
