# Changelog

All notable changes to the CityPulse project will be documented in this file.

## [Unreleased] - 2024-01-XX

### Changed

#### Navigation Redesign
- **Centered main navigation items**: Map, Dashboard, and Team buttons are now centered in the navigation bar for better visual hierarchy
- **Added dashboard icon**: Dashboard link now displays with a LayoutDashboard icon for consistency
- **Restructured layout**: 
  - Logo (CityPulse) positioned on the left
  - Main navigation (Map, Dashboard, Team) centered in the middle
  - Auth buttons (Login, Sign Up) and theme toggle positioned on the right
- **Enhanced Sign Up button**: Sign Up now has a primary button style (black bg in light mode, white bg in dark mode) to encourage user registration
- **Improved spacing**: Better gap spacing between navigation elements for cleaner appearance

#### Typography Overhaul
- **Replaced Geist fonts with Inter**: Switched from Geist Sans and Geist Mono to the modern, highly-readable Inter font
- **Font consistency**: Inter font now applied globally across the entire application
- **Better readability**: Inter provides superior legibility at all sizes, especially for UI elements
- **Professional appearance**: Matches design systems used by leading tech companies and modern web applications

#### Code Quality
- **Fixed Tailwind warnings**: Updated backdrop-filter support classes to use simplified syntax
- **Improved code organization**: Better comments and structure in navigation component
- **Consistent styling**: Added `font-medium` class to all navigation links for uniform weight

### Technical Details

**Modified Files:**
- `app/layout.tsx` - Updated to use Inter font from Google Fonts
- `app/globals.css` - Updated CSS custom properties to reference Inter font
- `components/navigation.tsx` - Complete navigation restructure with centered layout

**Font Configuration:**
```typescript
// Previous: Geist Sans + Geist Mono
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Current: Inter
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
```

**Navigation Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│ Logo          Map | Dashboard | Team          Login | Signup | Theme │
└─────────────────────────────────────────────────────────────┘
   Left                  Center                       Right
```

### Deployment
- Successfully committed and pushed to GitHub repository
- Commit hash: `deb1f3e`
- Repository: https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1.git

---

## Previous Updates

For previous changes and feature additions, see:
- `FEATURES.md` - Complete feature list
- `README_CITYPULSE.md` - Detailed project documentation
- `NAVIGATION.md` - Navigation usage guide