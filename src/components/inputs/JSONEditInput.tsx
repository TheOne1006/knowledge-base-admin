import { useInput, Labeled, required } from 'react-admin';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

export const JSONEditInput = (props: any) => {
    const { 
        id,
        field,
        fieldState,
        // formState,
        isRequired,
    } = useInput({
        ...props, 
        format(v: any) {
            if (typeof v === 'string') {
                return v;
            }
            return JSON.stringify(v, null, 2)
        },
        parse(value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        },
        validate(value) {
            // 校验 value 为 json
            const errors = {
                [props.source]: {
                    message: 'Must be a valid JSON',
                }
            };

            if (typeof value !== 'object') {
                return errors;
            }
        },
    });
    return (
        <>
                <Labeled 
                    label={props.label || props.source} isRequired={isRequired}
                    fullWidth
                    >
                    <AceEditor
                        mode="json"
                        theme="monokai"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        name={id}
                        minLines={5}
                        maxLines={30}
                        // editorProps={{ $blockScrolling: true }}
                        height="400px"
                        width="50%"
                    />
            </Labeled >
            {fieldState.error && <span>{fieldState.error.message}</span>}
        </>
    );
};


JSONEditInput.defaultProps = {
    label: '',
    source: '',
}
