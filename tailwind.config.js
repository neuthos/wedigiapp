/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Base brand colors (easily changeable for white-labeling)
        primary: {
          DEFAULT: "#b89f8d", // Main brown/nude color
          light: "#d6c7bb",
          dark: "#8a7567",
        },
        secondary: {
          DEFAULT: "#f5f0eb", // Light background color
          dark: "#e5dbd2",
        },
        text: {
          primary: "#3c3026", // Dark text on light backgrounds
          secondary: "#7a685a", // Medium text color
          light: "#f8f5f2", // Light text on dark backgrounds
        },
        ui: {
          success: "#83b58c", // Green for success states
          warning: "#e6c677", // Yellow for warnings
          error: "#d88878", // Red for errors
          info: "#86a1c3", // Blue for information
        },
        status: {
          highlight: "#86b893", // Green for highlights
          inactive: "#c4c4c4", // Gray for inactive items
          featured: "#e7d39b", // Yellow for featured content
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
        script: ["Dancing Script", "cursive"],
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 4px 15px rgba(0, 0, 0, 0.05)",
        button: "0 2px 8px rgba(0, 0, 0, 0.08)",
        dropdown: "0 10px 25px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    function ({addComponents, theme}) {
      const glassEffect = {
        ".glass": {
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(8px)",
          borderRadius: theme("borderRadius.lg"),
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
        },
        ".glass-primary": {
          backgroundColor: "rgba(184, 159, 141, 0.55)",
          backdropFilter: "blur(8px)",
          borderRadius: theme("borderRadius.lg"),
          border: "1px solid rgba(184, 159, 141, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
        },
        ".glass-dark": {
          backgroundColor: "rgba(58, 48, 41, 0.7)",
          backdropFilter: "blur(8px)",
          borderRadius: theme("borderRadius.lg"),
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
        },
        ".glass-light": {
          backgroundColor: "rgba(245, 240, 235, 0.7)",
          backdropFilter: "blur(8px)",
          borderRadius: theme("borderRadius.lg"),
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.05)",
        },
      };

      addComponents(glassEffect);
    },
    function ({addComponents, theme}) {
      const photoActions = {
        ".photo-action": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem",
          borderRadius: theme("borderRadius.full"),
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          transition: "all 0.3s ease",
          gap: "0.25rem",
          width: "4rem",
          height: "4rem",
        },
        ".photo-action-active": {
          backgroundColor: "rgba(184, 159, 141, 0.35)",
          boxShadow: "0 4px 12px rgba(184, 159, 141, 0.3)",
        },
        ".photo-action-inactive": {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          color: theme("colors.text.secondary"),
        },
      };

      addComponents(photoActions);
    },
    function ({addComponents, theme}) {
      const albumCards = {
        ".album-card": {
          overflow: "hidden",
          borderRadius: theme("borderRadius.xl"),
          height: "9rem",
          position: "relative",
          boxShadow: theme("boxShadow.card"),
        },
        ".album-card-content": {
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          padding: "0.75rem",
          backgroundColor: "rgba(245, 240, 235, 0.7)",
          backdropFilter: "blur(4px)",
          borderBottomLeftRadius: theme("borderRadius.xl"),
          borderBottomRightRadius: theme("borderRadius.xl"),
        },
      };

      addComponents(albumCards);
    },
  ],
};
