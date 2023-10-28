import React, {useMemo, useState, FocusEvent} from 'react';
import {MarkdownEditor, MarkdownView, EditorValue} from "@d4us1/remawy";
import styles from './App.module.css'
import {EzOnRailsAuthInfo, LoginForm, EzOnRailsIntegrations, EzOnRails} from "@d4us1/ez-on-rails-react";

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

        return new EzOnRailsIntegrations.remawy.uploader('http://localhost:3000', authInfo, '1.0')
    }, [authInfo])

    const initialValue: EditorValue | undefined = useMemo(() => {
        const editorValue = localStorage.getItem("editorValue");
        if (!editorValue) return undefined;

        return JSON.parse(editorValue);
    }, []);

    const onBlur = (event: FocusEvent<HTMLDivElement>, value: EditorValue) => {
        localStorage.setItem("editorValue", JSON.stringify(value))
    }

    return (
        <EzOnRails apiVersion={'1.0'} backendUrl={'http://localhost:3000'}>
            <div className={styles.container}>
                <div>
                    <span>Editor: </span>
                    <MarkdownEditor customStyle={{
                        editor: {
                            editorContainerClassName: styles.editorContainer
                        }
                    }}
                                    initialValue={initialValue}
                                    defaultText='Default Text'
                                    onBlur={onBlur}
                                    uploadInfo={uploader ? {
                                        uploader: uploader
                                    } : undefined}/>
                </div>

                <div>
                    <span>View: </span>
                    { initialValue && <MarkdownView value={initialValue} /> }
                </div>

                { !authInfo && (
                    <LoginForm onLoginSuccess={onLoginSuccess}
                               onLoginError={onLoginError} />
                )}
            </div>
        </EzOnRails>
    );
}

export default App;
