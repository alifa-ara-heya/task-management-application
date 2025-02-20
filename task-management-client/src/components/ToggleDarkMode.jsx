
const ToggleDarkMode = () => {
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
    };
    return (
        <button onClick={toggleDarkMode} className="p-2 bg-gray-700 text-white rounded">
            Toggle Dark Mode
        </button>
    );
};

export default ToggleDarkMode;