/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "inverse-on-surface": "#f2f1ec",
        "surface-container-low": "#f5f3ee",
        surface: "#fbf9f4",
        "surface-container-highest": "#e4e2dd",
        "on-secondary": "#ffffff",
        "outline-variant": "#d4c3be",
        primary: "#442a22",
        "on-primary": "#ffffff",
        "surface-dim": "#dbdad5",
        "on-secondary-fixed-variant": "#773203",
        "on-tertiary": "#ffffff",
        "error-container": "#ffdad6",
        "on-primary-container": "#d4ada1",
        "inverse-surface": "#30312e",
        "on-tertiary-container": "#e0ad49",
        "on-tertiary-fixed-variant": "#5e4200",
        "surface-container-lowest": "#ffffff",
        "on-background": "#1b1c19",
        background: "#fbf9f4",
        "on-tertiary-fixed": "#271900",
        "inverse-primary": "#e7bdb1",
        "primary-fixed-dim": "#e7bdb1",
        "surface-variant": "#e4e2dd",
        outline: "#827470",
        "on-error": "#ffffff",
        "on-surface": "#1b1c19",
        "surface-container-high": "#eae8e3",
        "on-primary-fixed": "#2c160e",
        secondary: "#95491a",
        "tertiary-container": "#5e4200",
        "primary-fixed": "#ffdbd0",
        "on-secondary-fixed": "#341100",
        "on-secondary-container": "#753101",
        "on-surface-variant": "#504441",
        "on-primary-fixed-variant": "#5d4037",
        error: "#ba1a1a",
        "surface-tint": "#77574d",
        "tertiary-fixed": "#ffdea6",
        "primary-container": "#5d4037",
        "secondary-fixed-dim": "#ffb690",
        "surface-bright": "#fbf9f4",
        "secondary-container": "#fd9b65",
        "surface-container": "#f0eee9",
        "on-error-container": "#93000a",
        "secondary-fixed": "#ffdbca",
        tertiary: "#412d00",
        "tertiary-fixed-dim": "#f3be58"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        "grid-2-col": "calc(50% - 6px)",
        "grid-3-col": "calc(33.33% - 8px)",
        "section-gap": "32px",
        unit: "4px",
        gutter: "12px",
        "container-padding": "16px"
      },
      fontFamily: {
        "body-md": ["Be Vietnam Pro"],
        "headline-md": ["Be Vietnam Pro"],
        "headline-lg": ["Be Vietnam Pro"],
        "headline-lg-mobile": ["Be Vietnam Pro"],
        "body-lg": ["Be Vietnam Pro"],
        "display-lg": ["Be Vietnam Pro"],
        "label-md": ["Be Vietnam Pro"]
      },
      fontSize: {
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "headline-lg": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-lg-mobile": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "display-lg": ["42px", { lineHeight: "52px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }]
      }
    }
  },
  plugins: []
};

