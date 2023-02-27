# React (Markdown) Wysiwyg Editor (ReMaWy)
A small customizable wysiwyg editor for react with the ability to use markdown shortcuts.
It also supports file uploads by providing an abstract class to implement the upload for your needs.

## Installation
Install the package using npm

```
npm install https://github.com/D4uS1/remawy#v0.1.0
```

or yarn.

```
yarn add https://github.com/D4uS1/remawy#v0.1.0
```

There is a branch for each released version. I recommend to use always the newest one.

## Usage
### Editor component
#### Example usage
```
import React, { FocusEvent } from 'react';
import { MarkdownEditor, EditorValue } from "@d4us1/remawy";

export const Editor = () => {
    return (
        <MarkdownEditor 
            defaultText='Create some content here.'
            initialValue={[]}
            onBlur={(event: FocusEvent<HTMLDivElement>, value: EditorValue) => {
                // save the value somewhere
            }}
          />
    );
}
```

#### Getting and setting the editor value
First of all, note that the editors value is the raw value from [Slate](https://github.com/ianstormtaylor/slate).
This is because getting the raw value and passing it to the editor does not require additional parsing.
If you want to get the markdown of the content, see the [Other methods](### Other methods) section.
Note that you can get the markdown value there, but you cannot pass it to the editor. The **initialValue** prop of the editor only accepts the slate value.
I recommend just to save the raw value somewhere.

You have two possibilities to receive the current value of the content.
1. Use the **onBlur** callback. The onBlur action receives the event and the current editors value. The function is triggered if the editor looses the focus. This has the advantage, that this action is not triggered on every change. Hence if you want to eg. save the value, this is the recommended hook because the save action is not triggered on every single change.
2. Use the **onChange** callback. The onChange action is triggered on every single change of the editors content. This can be useful if you want to manipulate the content. If you make use of this, i would recommend to have a separate submit button that saves the value only if it is submitted.

#### Available Props
* onChange - Callback that triggers on every change. Passes the current editor value.
* onBlur - Callback that triggers if the editor looses focus. Passes the event and the current editor value.
* initialValue - The initial value of the editors content.
* defaultText - The default text that is shown if no initial value is available or empty.
* customStyle - An object holding texts and css classes to customize the editor. See the [Customize](## Customize) section for details.
* uploadInfo - An object that defines information about the file object. File object is disabled if this is not passed. 
    * uploader - The uploader that is used to upload the file. See the [Image and File uploads](##Image and File uploads) section for more info.
    * acceptedFileTypes - The comma separated accepted mime types for file uploads.
    * maxFileSize - The maximum size of a file in bytes.

### Content View component
The **MarkdownView** component shows the markdown or raw value of some editor value that was created with the editor.

### Example usage
```
import React, { useMemo } from 'react';
import {MarkdownView} from "@d4us1/remawy";

export const View = () => {
  const initialValue: EditorValue | string = useMemo(() => {
      return 'Some markdown or initial raw editor value here';
  }, [])

  return (
      <MarkdownView value={initialValue} />
  )
}
```

The view accepts markdown or the raw editor value.

#### Available Props
* value - The raw editor value or some markdown to render.
* className - Optional css class name that is given to the views container, hence it can be restyled.

### Other methods
* toMarkdown - accepts an EditorValue and converts it to markdown. Can be imported from the package directly.

## Customize
Cou can make use of the **customStyle** prop of the MarkdownEditor to customize it.

Have a look at the CustomStyle interface [here](https://github.com/D4uS1/remawy/blob/main/src/shared/contexts/CustomStyle/Context.tsx) to see the possible texts and css classes.

You can change the style of the editor by passing the css classes for your needs.
You can also change the default texts for buttons eg.

## Image and File uploads
You can enable image upload by passing the **uploadInfo** prop that must provide an uploader.

The uploader must be implemented. Since uploads are managed very different depending on the technology stack of your choice, i decided not to provide some default upload functionality. 
But there is an abstract class that must be implemented.

See the following exemplary descriptions:
```
import { AbstractUploader } from '@d4us1/remawy';

class CustomUploader extends AbstractUploader {
    private someValue: string;

    /**
     * Pass and do whatever you need at initialization.
     * Since the concrete instance of an uploader must be passed to the editor, you can pass and use any variables here.
     */
    constructor(someValue: string) {
        super();
        
        this.someValue = someValue;
    }

    /**
     * Starts to upload the specified file. Expects a promise, because the upload should be asynchronous.
     *
     * @param file
     */
    public override startUpload(file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            // Start some upload
            
            // While uploading, you can give feedback about the upload progress
            // by calling onProgress. This method accepts a value between 0 and 1 as perecentage of 
            // the upload progress. The progress will be shown to the user in a progress bar.
            this.onProgress(event.loaded / event.total);
            
            // If the upload failed for some reason, you can call onError. 
            // This will show an error message to the user.
            this.onError(error);
            
            // If the upoad finished, you MUST call onFinish. This is necessary because this will cause
            // the editor to create the elements showing the uploaded content. The url is the target url to the
            // uploaded file. The file is the original file that was uploaded. This is used to eg. display the title of the
            // file as title of the target link. The metadata is some data of your choice that is appended to the raw 
            // node of the upload element in the editor value. You can make use of this if you want to perform operations
            // on the files after upload, like deletion or something else.
            this.onFinish(url, file, metadata);
        });
    }
}

export { CustomUploader };

```

Now you can use the uploader by passing an instance to the MarkdownEditors **uploadInfo** prop.
```
<MarkdownEditor 
    ...
    uploadInfo={
        ...
        uploader: new CustomUploader('Some value')
    } 
/>
```

This will enable uploads for images and files.

## Development
The test-app directory contains a react app where you can test the editor without the need to create a seperate repository.

Dont forget zu execute 
```
npm link test-app/node_modules/react
npm link test-app/node_modules/react-dom
```
from the root folder of the library. This prevents the test-app from using a second version of react, that would cause invalid hook call errors.

If you are using yarn, you have to do the following steps (from the root of the project):
```
cd test-app/node_modules/react
yarn link
cd ../react-dom
yarn link
cd ../../..
yarn link react
yarn link react-dom
```

Now start the test app.

```
cd test-app
npm start
```

If you visit *http://localhost:3001* you should see the test-app having the editor and markdown view.

If you changed something you can now call the build script in the root of the project.

```
./build.sh
```

If you refresh the page you should see your changes.

