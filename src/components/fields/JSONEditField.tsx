import { FunctionField, Labeled } from 'react-admin';
import { Card, Stack } from '@mui/material';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';


export const JSONEditField = (props: any) => {
    return (
        <Card>
        <Stack>
            <Labeled label={props.label || props.source} >
                <FunctionField
                    render={(record: any) => (
                        <AceEditor
                            mode="json"
                            theme="monokai"
                            name={props.label || props.source}
                            value={JSON.stringify(record[props.source], null, 2)}
                            minLines={5}
                            maxLines={30}
                            editorProps={{ $blockScrolling: true }}
                            height="400px"
                            width="50%"
                            readOnly
                        />
                    
                    )}
                />
            </Labeled >
        </Stack>
        </Card>
    );
};


JSONEditField.defaultProps = {
    label: '',
    source: '',
}
