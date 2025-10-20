export type ThemeColors = {
    background: string;
    text: string;
    primary: string;
    secondary: string;
};

//------Thème Clair --------
export const LightColors: ThemeColors = {
    background : '#ffffff',
    text: '#000000',
    primary: '#4b4b4b',
    secondary: '#dedede',
}
//------Thème Clair --------
export const DarkColors: ThemeColors = {
    background : '#3f3f3f',
    text: '#d9d9d9',
    primary: '#757575',
    secondary: '#bebebe',
}

export const getThemeColors =
    (scheme: 'light' | 'dark' | undefined): ThemeColors => {
        return scheme === 'dark' ? DarkColors : LightColors;
    };