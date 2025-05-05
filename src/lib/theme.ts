// Système de design Tabali
// Palette de couleurs inspirée de la Guinée avec des tons plus raffinés

export const theme = {
  colors: {
    // Couleurs principales
    primary: {
      50: '#e6f5ee',
      100: '#c2e5d3',
      200: '#9ad5b7',
      300: '#71c59b',
      400: '#48b47f',
      500: '#008751', // Vert guinéen principal
      600: '#007a49',
      700: '#006c41',
      800: '#005e39',
      900: '#004f31',
    },
    secondary: {
      50: '#fde8eb',
      100: '#fac5cd',
      200: '#f7a1af',
      300: '#f47d91',
      400: '#f15973',
      500: '#CE1126', // Rouge guinéen principal
      600: '#b80f22',
      700: '#a30d1e',
      800: '#8e0b1a',
      900: '#790916',
    },
    accent: {
      50: '#fef9e6',
      100: '#fdf0c2',
      200: '#fce799',
      300: '#fbde71',
      400: '#fad548',
      500: '#FCD116', // Jaune guinéen principal
      600: '#e3bc14',
      700: '#caa712',
      800: '#b1920f',
      900: '#987c0d',
    },
    neutral: {
      50: '#f8f9fa',
      100: '#f1f3f5',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#868e96',
      700: '#495057',
      800: '#343a40',
      900: '#212529',
    },
    // Couleurs sémantiques
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Typographie
  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans)',
      mono: 'var(--font-geist-mono)',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  // Espacement
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  
  // Ombres
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Rayons de bordure
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Transitions
  transitions: {
    DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  // Effets de glassmorphisme
  glass: {
    light: 'backdrop-filter: blur(8px); background-color: rgba(255, 255, 255, 0.7);',
    dark: 'backdrop-filter: blur(8px); background-color: rgba(0, 0, 0, 0.7);',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #008751 0%, #006c41 100%)',
    secondary: 'linear-gradient(135deg, #CE1126 0%, #a30d1e 100%)',
    accent: 'linear-gradient(135deg, #FCD116 0%, #caa712 100%)',
    guinean: 'linear-gradient(135deg, #008751 0%, #CE1126 50%, #FCD116 100%)',
  }
};

// Utilitaires de thème
export const getColor = (path: string): string => {
  const parts = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = theme.colors;
  
  for (const part of parts) {
    if (result[part] === undefined) {
      return '';
    }
    result = result[part];
  }
  
  return result;
};

// Mixins pour les composants
export const mixins = {
  // Effet de carte élégant
  elegantCard: `
    background: white;
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.md};
    transition: ${theme.transitions.DEFAULT};
    &:hover {
      box-shadow: ${theme.shadows.xl};
      transform: translateY(-4px);
    }
  `,
  
  // Bouton avec effet de hover élégant
  elegantButton: `
    font-weight: ${theme.typography.fontWeights.medium};
    transition: ${theme.transitions.DEFAULT};
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
    &:active {
      transform: translateY(0);
    }
  `,
  
  // Effet de glassmorphisme
  glassEffect: `
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `,
};
