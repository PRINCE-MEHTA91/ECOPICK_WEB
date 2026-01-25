// theme.js

// Function to apply the selected theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

// Function to toggle the theme
const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    updateToggleButton(newTheme);
};

// Function to update the toggle button's icon
const updateToggleButton = (theme) => {
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.innerHTML = theme === 'dark' 
            ? '☀️' // Sun icon for light mode
            : '🌙'; // Moon icon for dark mode
    }
};

// Immediately invoked function to set the theme on initial load
(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    // No need to update the button here, as the DOM may not be fully loaded.
    // We'll call updateToggleButton after the DOM is loaded.
})();

// Add event listener to the toggle button once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
    
    // Set the initial state of the toggle button
    const savedTheme = localStorage.getItem('theme') || 'light';
    updateToggleButton(savedTheme);
});
