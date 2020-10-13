import { createMuiTheme } from '@material-ui/core/styles';

const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#009688',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ffdb07',
            contrastText: '#fff',
        }
    }
});

export default lightTheme;