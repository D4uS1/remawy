import React, {useState} from 'react';
import {MarkdownEditor} from "@d4us1/remawy";
import {MarkdownView} from "@d4us1/remawy";
import styles from './App.module.css'

function App() {
    const [markdown, setMarkdown] = useState<string>('')

    return (
        <div className={styles.container}>
            <div>
                <span>Editor: </span>
                <MarkdownEditor markdown={markdown} onSubmit={setMarkdown} className={styles.editorContainer} />
            </div>

            <div>
                <span>View: </span>
                <MarkdownView markdown={markdown} />
            </div>
        </div>
    );
}

export default App;
