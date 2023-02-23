import React, {useMemo, useState, FocusEvent} from 'react';
import {MarkdownEditor, MarkdownView, EditorValue} from "@d4us1/remawy";
import styles from './App.module.css'
import {EzOnRailsAuthInfo, LoginForm, EzOnRails} from "ez-on-rails-react";

function App() {
    // must be set before we update, hence the user needs to login first
    const [authInfo, setAuthInfo] = useState<EzOnRailsAuthInfo | null>(null)

    const onLoginError = (e: any) => {
        alert("Login nicht erfolgreich. Sind deine E-Mail und das Passwort korrekt?");
    }

    const onLoginSuccess = async (email: string, authInfo: EzOnRailsAuthInfo) => {
        setAuthInfo(authInfo);
    }

    const uploader = useMemo(() => {
        if (!authInfo) return undefined;

        return new EzOnRails.integrations.remawy.uploader('http://localhost:3000', authInfo, '1.0')
    }, [authInfo])

    const onBlur = (event: FocusEvent<HTMLDivElement>, values: EditorValue) => {
        console.log("onBlur", values);
    }

    return (
        <div className={styles.container}>
            <div>
                <span>Editor: </span>
                <MarkdownEditor customStyle={{
                                    editor: {
                                        editorContainerClassName: styles.editorContainer
                                    }
                                }}
                                initialValue={undefined}
                                defaultText='Default Text'
                                onBlur={onBlur}
                                uploadInfo={uploader ? {
                                    uploader: uploader
                                } : undefined}/>
            </div>

            <div>
                <span>View: </span>
                <MarkdownView markdown={''} />
            </div>

            { !authInfo && (
                <LoginForm onLoginSuccess={onLoginSuccess}
                           onLoginError={onLoginError} />
            )}
        </div>
    );
}

export default App;
