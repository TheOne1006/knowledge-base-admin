import { Card, Stack } from '@mui/material';
import { useInput, FieldTitle, WrapperField, Labeled } from 'react-admin';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

export const TypescriptEditInput = (props: any) => {
    const { 
        id,
        field,
        fieldState,
        // formState,
        isRequired,
     } = useInput(props);
    return (
        <>
                <Labeled 
                    label={props.label || props.source} isRequired={isRequired}
                    fullWidth
                    >
                    <AceEditor
                        mode="javascript"
                        theme="monokai"
                        {...field}
                        name={id}
                        minLines={5}
                        maxLines={30}
                        editorProps={{ $blockScrolling: true }}
                        height="400px"
                        width="100%"
                    />
            </Labeled >
            {fieldState.error && <span>{fieldState.error.message}</span>}
        </>
    );
};


TypescriptEditInput.defaultProps = {
    label: '',
    source: '',
}
