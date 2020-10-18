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
        },
        color1: '#fff',
        color2: '#000',
        color3: '#607D8B',
        color4: '#808080',
        color5: '#78909C',
        color6: '#B0BEC5',
        color7: '#3edc8b',
        background1: '#fff',
        background2: '#90A4AE',
        background3: '#ECEFF1',
        background4: '#607D8B',
        background5: '#3edc8b',
        background6: '#B0BEC5',
        background7: '#455A64',
        border1: '#eee',
        border2: '#B0BEC5',
        gradient1: 'linear-gradient(315deg, #3edc8b 0%, #009688 74%)',
        highlight1: '#ffdb07'
    },
    shadow: {
        insetShadow1: 'inset 1px 1px 2px 1px rgb(0 0 0 / 0.3)'
    }
});

export default lightTheme;