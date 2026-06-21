// js/tailwind-config.js

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "surface-bright": "#393939",
                "error": "#ffb4ab",
                "primary-fixed-dim": "#c6c6c6",
                "error-container": "#93000a",
                "surface-variant": "#353535",
                "on-primary-fixed": "#1a1c1c",
                "on-surface-variant": "#c4c7c7",
                "surface-container-lowest": "#0e0e0e",
                "outline-variant": "#444748",
                "surface": "#131313",
                "on-tertiary-fixed": "#1b1c1c",
                "on-error": "#690005",
                "inverse-on-surface": "#303030",
                "on-secondary-fixed": "#1c1b1b",
                "tertiary-fixed-dim": "#c8c6c6",
                "on-surface": "#e5e2e1",
                "on-primary-fixed-variant": "#464747",
                "inverse-surface": "#e5e2e1",
                "on-tertiary-fixed-variant": "#474747",
                "surface-container-highest": "#353535",
                "primary-fixed": "#e3e2e2",
                "on-tertiary": "#303030",
                "secondary-container": "#4a4949",
                "surface-container-high": "#2a2a2a",
                "on-secondary": "#313030",
                "on-error-container": "#ffdad6",
                "primary-container": "#c0c0c0",
                "primary": "#dcdcdc",
                "surface-dim": "#131313",
                "tertiary": "#dedcdb",
                "on-primary-container": "#4d4e4f",
                "background": "#131313",
                "on-secondary-fixed-variant": "#474646",
                "surface-tint": "#c6c6c6",
                "tertiary-fixed": "#e4e2e2",
                "surface-container-low": "#1b1b1c",
                "secondary-fixed-dim": "#c8c6c5",
                "secondary": "#c8c6c5",
                "outline": "#8e9192",
                "on-background": "#e5e2e1",
                "surface-container": "#202020",
                "on-primary": "#2f3131",
                "inverse-primary": "#5d5e5f",
                "on-secondary-container": "#bab8b7",
                "tertiary-container": "#c1c0c0",
                "on-tertiary-container": "#4e4e4e",
                "secondary-fixed": "#e5e2e1"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "panel-gap": "1px",
                "gutter": "24px",
                "margin-desktop": "64px",
                "unit": "4px",
                "margin-mobile": "20px"
            },
            "fontFamily": {
                "label-caps": ["Geist"],
                "headline-lg-mobile": ["Hanken Grotesk"],
                "mono-technical": ["Geist"],
                "headline-xl": ["Hanken Grotesk"],
                "headline-lg": ["Hanken Grotesk"],
                "body-md": ["Inter"]
            },
            "fontSize": {
                "label-caps": ["12px", { "lineHeight": "1", "letterSpacing": "0.2em", "fontWeight": "500" }],
                "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "letterSpacing": "0.08em", "fontWeight": "600" }],
                "mono-technical": ["11px", { "lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "400" }],
                "headline-xl": ["48px", { "lineHeight": "1.1", "letterSpacing": "0.15em", "fontWeight": "700" }],
                "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "0.1em", "fontWeight": "600" }],
                "body-md": ["16px", { "lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400" }]
            }
        }
    }
};