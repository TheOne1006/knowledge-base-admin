import { useRecordContext } from 'react-admin';
import get from 'lodash/get';
import { Chip, Avatar } from '@mui/material';

import { PUSH_TYPE_DIFY } from '../../../constants';


export const PushTypeField = (props: any) => {
    const record = useRecordContext(props);
    const val =  get(record, props.source);
    switch (val) {
        case PUSH_TYPE_DIFY:
            return (<Chip variant="outlined" 
                color="info" 
                size="small"
                label={val}
                avatar={<Avatar src="https://framerusercontent.com/images/xRJ6vNo9mUYeVNxt0KITXCXEuSk.png" />} 
            />);
    
        default:
            return (<Chip variant="outlined" label={`${val}`} />);
    }
}

PushTypeField.defaultProps = { label: 'type' }



