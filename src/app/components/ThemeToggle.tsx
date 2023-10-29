// import React from 'react';
// import { useRecoilState } from 'recoil';
// import { themeState } from './recoilState';
// import Switch from '@mui/material/Switch';
//
// export function ThemeToggle() {
//     const [theme, setTheme] = useRecoilState(themeState);
//
//     const toggleTheme = () => {
//         setTheme(theme === 'light' ? 'dark' : 'light');
//     };
//
//     return (
//         <div style={{
//             marginTop: 10
//         }}>
//             <Switch
//                 checked={theme === 'dark'}
//                 onChange={toggleTheme}
//                 name="themeSwitch"
//                 inputProps={{ 'aria-label': 'Toggle theme switch' }}
//             />
//             <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
//         </div>
//     );
// }
//
