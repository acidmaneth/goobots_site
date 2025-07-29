# Game Export and Integration Instructions

## Step 1: Export Game from GameMaker Studio

### In GameMaker Studio:
1. Open your "Attack of the Goobots" project
2. Go to **Build** → **Create Executable**
3. Select **Opera GX** as the target platform
4. Set the export location to: `/Users/acidman/GameMakerProjects/Goobots Site/public/game/`
5. Click **Create** to export

### Expected Export Files:
After export, you should have these files in `/public/game/`:
- `index.html` (main game file)
- `game.js` (game logic)
- `game.wasm` (WebAssembly file)
- `game.data` (game assets)
- Other supporting files

## Step 2: Replace Placeholder Files

### Replace the placeholder HTML:
1. **Backup** the current `/public/game/index.html` (our placeholder)
2. **Copy** the exported `index.html` from GameMaker to `/public/game/index.html`
3. **Copy** all other exported files to `/public/game/`

### Update the GameMaker HTML (if needed):
If the GameMaker export doesn't include mobile optimizations, you may need to add these to the exported `index.html`:

```html
<!-- Add to the <head> section -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!-- Add to the <style> section -->
<style>
/* Mobile optimizations */
@media (max-width: 768px) {
    canvas {
        width: 100vw !important;
        height: 100vh !important;
        object-fit: contain;
    }
}

/* Prevent zoom on mobile */
* {
    touch-action: manipulation;
}
</style>
```

## Step 3: Test the Integration

### Local Testing:
1. Start the development server: `npm run dev`
2. Navigate to your website
3. Click "Start Game Demo"
4. Test on both desktop and mobile devices

### Mobile Testing Checklist:
- [ ] Game loads properly on mobile
- [ ] Touch controls work correctly
- [ ] Fullscreen mode works
- [ ] Game scales appropriately
- [ ] No horizontal scrolling issues
- [ ] Performance is acceptable

## Step 4: GitHub Setup

### For the Website Repository:
1. Create a new GitHub repository named `goobots-website` or similar
2. Add the remote origin:
```bash
cd "/Users/acidman/GameMakerProjects/Goobots Site"
git remote add origin https://github.com/yourusername/goobots-website.git
git push -u origin main
```

### For the Game Repository:
Your game is already backed up at: `https://github.com/acidmaneth/aotg.git`

## Step 5: Deployment

### Using Replit:
1. Push your website code to GitHub
2. Connect the repository to Replit
3. Set the run command to: `npm run dev`
4. Deploy the project

### Alternative: Vercel/Netlify:
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

## Troubleshooting

### Common Issues:

1. **Game doesn't load:**
   - Check browser console for errors
   - Verify all game files are in `/public/game/`
   - Ensure CORS headers are set correctly

2. **Mobile touch issues:**
   - Add `touch-action: manipulation` CSS
   - Check for conflicting touch event handlers
   - Test on actual mobile devices

3. **Fullscreen not working:**
   - Ensure HTTPS is enabled (required for fullscreen)
   - Check browser permissions
   - Test on different browsers

4. **Performance issues:**
   - Optimize game assets
   - Consider reducing game resolution
   - Implement loading screens

### File Structure After Export:
```
Goobots Site/
├── public/
│   └── game/
│       ├── index.html (GameMaker export)
│       ├── game.js
│       ├── game.wasm
│       ├── game.data
│       └── [other game files]
├── client/
│   └── src/
│       ├── components/
│       │   └── GameEmbed.tsx
│       └── pages/
│           └── home.tsx
└── [other website files]
```

## Mobile Optimization Notes

The website is already configured for mobile with:
- Responsive design
- Touch-friendly controls
- Fullscreen support
- Proper viewport settings
- Mobile-specific CSS classes

The GameMaker game should include:
- Touch controls for mobile
- Proper scaling for different screen sizes
- Optimized performance for mobile devices

## Next Steps

1. Export the game from GameMaker Studio
2. Replace the placeholder files
3. Test thoroughly on mobile devices
4. Deploy to your hosting platform
5. Share your game with the world! 🎮