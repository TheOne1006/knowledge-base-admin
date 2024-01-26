import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { totalmem } from 'os';

export const LinearProgressWithLabel = (props: LinearProgressProps & { index: number, total: number }) => {
    const value = props.index / (props.total || 1) * 100;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} value={value}  />
            </Box>
            <Box sx={{ minWidth: 55 }}>
                <Typography variant="body2" color="text.secondary">{`${props.index} / ${props.total}`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.defaultProps = {
    index: 0,
    total: 0,
}
