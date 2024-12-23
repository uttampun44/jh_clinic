import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: "var(--primary-font-family)"
            },
            backgroundColor: {
                mainbg:  "#F1F8FF" 
            },
            colors: {
                primary: "#3497F9",
                primarytextcolor: "#242222"
            }

        },
    },

    plugins: [forms],
};
