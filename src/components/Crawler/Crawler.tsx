import {
    Confirm,
    SimpleForm,
    SelectInput,
    TextInput,
    NumberInput,
    required,
    Toolbar,
    SaveButton
} from 'react-admin';
import Grid from '@mui/material/Grid';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import { LinearProgressWithLabel } from '../LinearProgressWithLabel';
import { useCrawler } from './useCrawler';
import { CRAWLER_DATA_TYPE_CHOICES, CRAWLER_DATA_TYPE_INCREMENTAL } from '../../constants';

const CrawlerToolbar = () => (
    <Toolbar>
        <SaveButton alwaysEnable label="start.crawler" icon={<ArrowCircleDownOutlinedIcon />}  />
    </Toolbar>
);

export const Crawler = () => {
    const { open, startCrawler, plan, handleConfirm, handleDialogClose } = useCrawler();

    return (
        <>
            <Confirm
                isOpen={open}
                loading={!open}
                title="Crawler Process"
                content={<>
                    <p>current: {plan?.url} {plan?.completed && 'success'}</p>
                    <LinearProgressWithLabel index={plan?.index} total={plan?.total} />
                    </>}
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
            <SimpleForm
                toolbar={<CrawlerToolbar />}
                onSubmit={startCrawler}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SelectInput
                            variant="outlined"
                            defaultValue={CRAWLER_DATA_TYPE_INCREMENTAL}
                            source="type"
                            choices={CRAWLER_DATA_TYPE_CHOICES}
                            validate={required()}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextInput source="linkSelector" margin="normal" variant="outlined" validate={required()} defaultValue="a[href]" fullWidth />
                    </Grid>

                    <Grid item md={4}>
                        <NumberInput source="concurrency" margin="normal" variant="outlined" validate={required()} max={3} min={1} defaultValue={1} fullWidth />
                    </Grid>
                    <Grid item md={4}>
                        <NumberInput source="maxConnections" margin="normal" variant="outlined" validate={required()} min={1} max={100} defaultValue={10} fullWidth />
                    </Grid>
                </Grid>
            </SimpleForm>
        </>
 
    );
};
