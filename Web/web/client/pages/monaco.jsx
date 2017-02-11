'use strict';

import React, { Component } from 'react';
import MonacoEditor from './components/monacoEditor';
import Loader from '../app/components/common/loader';

class MonacoPage extends Component {
    constructor (props) {
        super(props);        
        this.state = { 
            loading: true,
            log: [],
            code: `alert('hello world!');`
        };    
        this.tempEditorDidMount = this.tempEditorDidMount.bind(this);
        this.runCode = this.runCode.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount () {

    }
    render () {
        const { code, log } = this.state;
        const runCode = this.runCode;
        const editor = (
            <div>
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
                <br />
                <button className='btn btn-danger pull-right' onClick={runCode}>RUN</button>
                <br />
                <h3>Console Output</h3>
                <pre>{JSON.stringify(log, null, 2)}</pre>
            </div>
                            
        );
        return (
            <div className='flex-container'>
                <p className='-text'>Monaco Editor</p>
                <Loader loading={this.state.loading} element={editor} />
                {this.state.loading && 
                    <div style={{ display: 'none' }}>
                        <MonacoEditor editorDidMount={this.tempEditorDidMount} />
                    </div>
                }
            </div>
        );
    }
    runCode () {
        fetch(`${global.API_PATH}/run/js/${this.state.code}`, { headers: { queuename: '/run/js/' } })
            .then((response) => response.json())
            .then((response) => {
                this.setState({ log: [...this.state.log, ...response] });
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
