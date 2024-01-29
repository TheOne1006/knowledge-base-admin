import { FunctionField, Labeled } from 'react-admin';
import { Card, Stack } from '@mui/material';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';


export const TypescriptEditField = (props: any) => {
    return (
        <Card>
        <Stack>
            <Labeled label={props.label || props.source} fullWidth>
                <FunctionField
                    render={(record: any) => (
                        <AceEditor
                            mode="javascript"
                            theme="monokai"
                            name={props.label || props.source}
                            value={record[props.source]}
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


TypescriptEditField.defaultProps = {
    label: '',
    source: '',
}
