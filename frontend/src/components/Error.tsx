import { Box, Typography } from "@mui/material";
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';

const Error = () => (
    <Box textAlign="center" alignContent="center" height="inherit">
        <Typography
            color="primary"
            variant="h1"
            component={SentimentVeryDissatisfiedOutlinedIcon}
        >
        </Typography>
        <Typography
            color="primary"
            variant="h3"
            component="div"
        >
            Looks like something went wrong!
        </Typography>
        <Typography
            color="textSecondary"
            variant="h5"
            component="div"
        >
            We are working to find the issue, <br />please try again later.
        </Typography>
    </Box>
);

export default Error;