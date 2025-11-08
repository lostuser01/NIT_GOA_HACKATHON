# Animation QA Checklist - OurStreet

## Quick Visual Testing Guide

### 🎯 Test All Animations in 5 Minutes

---

## ✅ Page-by-Page Checklist

### 1. **Home Page** (`/`)

**Route**: `http://localhost:3000/`

- [ ] **Hero NeonGradientCard** (screenshot showcase)
  - Hover: Gradient follows mouse cursor
  - Hover: Card lifts slightly (translate-y)
  - Hover: Card scales up 2%
  - Hover: Shadow intensifies

- [ ] **4 Feature Cards** (Easy Reporting, Interactive Map, Real-Time Tracking, Transparency)
  - Hover: All show neon gradient border animation
  - Hover: Mouse tracking gradient effect works
  - Hover: Smooth 300ms transition
  - No jitter or layout shift

**Expected Behavior**: All NeonGradientCard instances should have smooth, synchronized animations with mouse-tracking gradient effects.

---

### 2. **Map Page** (`/map`)

**Route**: `http://localhost:3000/map`

#### **Top Stat Cards** (4 cards with BorderBeam)
- [ ] Total Issues card
- [ ] Open Issues card
- [ ] In Progress card
- [ ] Resolved Issues card

**For each card**:
- Hover: Scales up 3%
- Hover: Lifts up (translate-y: -4px)
- Hover: Shadow becomes XL
- BorderBeam animation visible (animated border)
- Cursor changes to pointer

#### **Map Container Card**
- [ ] Hover: Shadow increases (no scale - it's large)
- [ ] Interactive map loads correctly
- [ ] BorderBeam animation on border

#### **Issues List Card**
- [ ] Hover: Shadow increases
- [ ] Individual issue items:
  - [ ] Hover: Scale 2%
  - [ ] Hover: Lift effect
  - [ ] Hover: Shadow increases
  - [ ] Selected state: Different background + shadow (no hover needed)

#### **Legend Card**
- [ ] Hover: Shadow increases subtly

**Expected Behavior**: Stat cards should "pop" on hover. Issue list items should feel clickable and responsive.

---

### 3. **Report Issue Page** (`/report`)

**Route**: `http://localhost:3000/report`

#### **Main Form Card**
- [ ] Hover: Shadow increases (subtle, no scale)
- [ ] All form inputs functional
- [ ] AI categorize button works

#### **Bottom Info Cards** (3 cards: AI Powered, Quick Response, Track Progress)
- [ ] Each card hovers with:
  - Scale: 3%
  - Lift: -4px
  - Shadow: XL
  - Cursor: pointer
- [ ] Animations are synchronized (same timing)
- [ ] No overlap or collision

**Expected Behavior**: Form card feels stable, info cards feel interactive and inviting.

---

### 4. **Dashboard** (`/dashboard`)

**Route**: `http://localhost:3000/dashboard`

#### **Top KPI Cards** (4 NeonGradientCard instances from SectionCards)
- [ ] Total Active Issues
- [ ] SLA Compliance Rate
- [ ] Average Resolution Time
- [ ] Citizen Satisfaction

**For each card**:
- Hover: Neon gradient effect
- Hover: Scale 2%
- Hover: Lift effect
- Hover: Shadow increases

#### **Chart Container**
- [ ] Hover: Subtle shadow increase
- [ ] Charts render correctly
- [ ] No animation on chart elements themselves

#### **Bottom Insight Cards** (3 NeonGradientCard instances)
- [ ] Recent Activity
- [ ] Predictive Insights
- [ ] Community Impact Assessment

**For each card**:
- Hover: Full neon gradient animation
- Hover: Mouse tracking works
- Content remains readable during animation

**Expected Behavior**: Dashboard feels polished with consistent card animations. KPI cards draw attention without being distracting.

---

### 5. **Issue Detail Page** (`/issues/[id]`)

**Route**: `http://localhost:3000/issues/1` (or any issue ID)

#### **Main Issue Card** (left column)
- [ ] Hover: Shadow increases
- [ ] Before/after photos display correctly
- [ ] No scale (prevents layout shift on large content)

#### **Comments Card**
- [ ] Hover: Shadow increases
- [ ] Comment form visible and functional

#### **Actions Card** (right sidebar)
- [ ] Hover: Shadow increases
- [ ] Vote button functional
- [ ] Share buttons functional

**Expected Behavior**: Subtle animations that don't distract from content reading. Cards feel cohesive.

---

### 6. **Admin Analytics** (`/admin/analytics`)

**Route**: `http://localhost:3000/admin/analytics`

#### **Summary Stat Cards** (4 cards at top)
- [ ] Total Issues
- [ ] Open Issues
- [ ] Resolved This Month
- [ ] Average Resolution Time

**For each card**:
- Hover: Scale 3%
- Hover: Lift -4px
- Hover: Shadow XL
- Cursor: pointer

#### **Large Analytics Cards**
- [ ] Ward-wise Performance Metrics
- [ ] Issue Hotspots
- [ ] Category Performance

**For each card**:
- Hover: Shadow increase (no scale)
- Charts render and update
- No animation interference with chart interactions

**Expected Behavior**: Quick stats feel interactive, large cards feel stable and professional.

---

### 7. **Transparency Page** (`/transparency`)

**Route**: `http://localhost:3000/transparency`

#### **Info Cards**
- [ ] Check various stat and information cards
- [ ] Hover effects consistent with rest of site

#### **CTA Button** (Join OurStreet Today)
- [ ] Button shows correct branding (not CityPulse)
- [ ] Hover effect works
- [ ] Links to `/signup`

**Expected Behavior**: Professional, government-facing presentation with subtle animations.

---

## 🎨 Cross-Browser Testing

Test in multiple browsers:

### Chrome/Edge
- [ ] All animations smooth
- [ ] GPU acceleration active (check Performance tab)
- [ ] No console warnings

### Firefox
- [ ] Animations work identically
- [ ] No performance issues

### Safari (Mac/iOS)
- [ ] Transform animations render correctly
- [ ] No flickering or artifacts

---

## 🌓 Dark Mode Testing

Toggle dark mode on each page:

- [ ] **Home**: NeonGradientCard effects visible
- [ ] **Map**: Shadows visible against dark background
- [ ] **Dashboard**: Card borders and shadows clear
- [ ] **All pages**: Text remains readable during animations

---

## 📱 Responsive Testing

### Mobile (< 768px)
- [ ] Animations don't cause horizontal scroll
- [ ] Touch states work (tap instead of hover)
- [ ] Cards resize without breaking animations
- [ ] Performance remains smooth

### Tablet (768px - 1024px)
- [ ] Grid layouts adapt properly
- [ ] Animations scale appropriately
- [ ] No overlap or collision

---

## ⚡ Performance Checklist

### With DevTools Open (Performance Tab)

1. **Hover rapidly over multiple cards**
   - [ ] No frame drops below 60fps
   - [ ] GPU layers composited correctly
   - [ ] No layout thrashing

2. **Scroll performance**
   - [ ] Smooth scrolling with animated elements
   - [ ] No jank or stuttering

3. **Memory usage**
   - [ ] No memory leaks after prolonged use
   - [ ] Animations clean up properly

---

## 🐛 Common Issues to Watch For

### Animation Conflicts
- ❌ Cards "jump" or have jittery movement
- ❌ Double shadows (conflicting CSS)
- ❌ Animations trigger on parent and child simultaneously

### Layout Issues
- ❌ Content shifts when hovering
- ❌ Scrollbars appear/disappear on hover
- ❌ Text becomes unreadable during animation

### Performance Issues
- ❌ Lag when hovering over cards
- ❌ Animations stutter or freeze
- ❌ Page becomes unresponsive

---

## ✨ Expected Animation Timing

All animations should use:
- **Duration**: 300ms
- **Easing**: ease-out
- **Properties**: transform, box-shadow (GPU accelerated)

---

## 🎬 Visual Reference

### Scale Values
- **1.02** = 2% larger (subtle, for list items)
- **1.03** = 3% larger (noticeable, for stat cards)

### Shadow Values
- **shadow-lg** = Standard depth
- **shadow-xl** = Enhanced depth
- **shadow-2xl** = Maximum depth (NeonGradientCard)

### Translate Values
- **-translate-y-1** = Move up 4px (0.25rem)

---

## 📊 Quick Pass/Fail

If you can answer **YES** to all these:

- [ ] All cards respond to hover within 300ms
- [ ] No jitter, flicker, or layout shift
- [ ] Animations feel smooth and natural
- [ ] Dark mode works perfectly
- [ ] Mobile/touch interactions work
- [ ] No console errors or warnings

**Result**: ✅ **PASS** - Animations working perfectly!

---

## 🔄 Quick Test Script

Run in browser console on any page:

```javascript
// Test all hover animations
document.querySelectorAll('[class*="hover:"]').forEach((el, i) => {
  console.log(`Element ${i}:`, el.className);
  el.style.outline = '2px solid red';
  setTimeout(() => el.style.outline = '', 1000);
});
```

This highlights all elements with hover states for 1 second each.

---

## 📝 Bug Report Template

If you find an issue:

```
**Page**: /map
**Element**: Top stat card (Total Issues)
**Issue**: Card doesn't scale on hover
**Browser**: Chrome 120
**Steps**: 
1. Navigate to /map
2. Hover over "Total Issues" card
3. No scale animation occurs

**Expected**: Card should scale to 1.03 and lift up
**Actual**: Only shadow changes
```

---

## ✅ Sign-Off

**Tester**: _______________  
**Date**: _______________  
**All Animations Working**: [ ] YES [ ] NO  
**Build Status**: [ ] PASS [ ] FAIL  
**Ready for Production**: [ ] YES [ ] NO

---

**Last Updated**: 2024  
**Version**: 1.0  
**Status**: Ready for QA