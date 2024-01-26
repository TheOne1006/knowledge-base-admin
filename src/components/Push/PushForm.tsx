import {
    Confirm,
    SimpleForm,
    // SelectInput,
    TextInput,
    // NumberInput,
    required,
    Toolbar,
    SaveButton,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LinearProgressWithLabel } from '../LinearProgressWithLabel';
import { usePush } from './usePush';

const PushToolbar = ({ startRunPush, clearAllPushMap }: {
    // eslint-disable-next-line no-unused-vars
    startRunPush: (_: any) => void, 
    // eslint-disable-next-line no-unused-vars
    clearAllPushMap: (_: any) => void,
}) => {
    const { getValues } = useFormContext();
    return (<Toolbar>
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined button group">
            <SaveButton 
                onClick={() => {
                    const val = getValues();
                    startRunPush(val);
                }}
                variant="outlined" 
                label="start.crawler" icon={<SendIcon />} />
            <SaveButton 
                onClick={() => {
                    const val = getValues();
                    clearAllPushMap(val);
                }}
                variant="outlined" 
                label="start.clearAll" icon={<DeleteForeverIcon />} />
        </ButtonGroup>
    </Toolbar>)
};

export const PushForm = () => {
    const { open, startRunPush, plan, handleConfirm, handleDialogClose, clearAllPushMap } = usePush();

    return (
        <>
            <Confirm
                isOpen={open}
                loading={false}
                title="push Process"
                content={<>
                    <p>current: {plan?.remoteId} </p>
                    <LinearProgressWithLabel index={plan?.index} total={plan?.total} />
                    </>}
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
            <SimpleForm
                toolbar={<PushToolbar 
                    startRunPush={startRunPush} 
                    clearAllPushMap={clearAllPushMap}
                />}
                // onSubmit={startRunPush}
                
            >
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <TextInput source="pushVersion" margin="normal" variant="outlined" validate={required()} defaultValue="" fullWidth />
                    </Grid>
                </Grid>
            </SimpleForm>
        </>
 
    );
};
