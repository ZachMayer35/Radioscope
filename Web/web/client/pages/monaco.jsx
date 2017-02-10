'use strict';

import React, { Component } from 'react';
import MonacoEditor from './components/monacoEditor';
import Loader from '../app/components/common/loader';

class MonacoPage extends Component {
    constructor (props) {
        super(props);        
        this.state = { 
            loading: true
        };    
        this.tempEditorDidMount = this.tempEditorDidMount.bind(this);
    }
    componentDidMount () {

    }
    render () {
        const editor = (<MonacoEditor 
                            width='100%'
                            height='500'
                            language='javascript'
                            theme='vs-dark'
                            value={`alert('hello world!');`}
                            options={{ selectOnLineNumbers: true }}
                            onChange={this.onChange}
                            editorDidMount={this.editorDidMount}
                            />);
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
    onChange (newValue, e) {
        console.log('onChange', newValue, e);
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
