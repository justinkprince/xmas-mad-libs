# Christmas Mad Libs

A fun, interactive Christmas-themed Mad Libs game built with React, Vite, and Tailwind CSS.

## Development

```bash
# Install dependencies (using pnpm, but npm or yarn work too)
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deploying to GitHub Pages

1. **Update the base path** in `vite.config.ts` if needed:
   - If deploying to `https://username.github.io/`, set `base: '/'`
   - If deploying to `https://username.github.io/repo-name/`, set `base: '/repo-name/'`

2. **Build the project**:
   ```bash
   pnpm build
   ```

3. **Deploy the `dist` folder** to GitHub Pages:
   
   **Option A: Using gh-pages package**
   ```bash
   pnpm add -D gh-pages
   # Add to package.json scripts: "deploy": "gh-pages -d dist"
   pnpm deploy
   ```

   **Option B: Manual deployment**
   - Push the `dist` folder contents to the `gh-pages` branch
   - Enable GitHub Pages in repository settings, selecting the `gh-pages` branch

4. **Enable GitHub Pages** in your repository:
   - Go to Settings > Pages
   - Set source to `gh-pages` branch
   - Save

Your site will be live at `https://username.github.io/repo-name/`

## Project Structure

```
src/
├── components/       # Reusable components (Header)
├── data/            # Mad Libs templates (JSON)
├── lib/             # Utility functions and types
├── pages/           # Page components (Home, WordEntry, Results, NotFound)
├── App.tsx          # Main app component with routing
├── main.tsx         # Application entry point
└── index.css        # Global styles with Tailwind
```

## Adding New Mad Libs

Edit `src/data/madlibs.json` to add new templates. Each template needs:
- `id`: Unique identifier (used in URLs)
- `name`: Display name
- `description`: Short description
- `expectedWords`: Array of word prompts
- `template`: Story template with `{{word-id}}` placeholders

Use `\n` for line breaks and `\n\n` for paragraph breaks in templates.

## Features

- ✨ Multiple Christmas-themed stories
- 💾 Auto-save progress to localStorage
- 📱 Fully responsive design
- 🎨 Festive Christmas color scheme
- ♿ Accessible form inputs with examples
- 🔄 Reset functionality
- 📖 Read completed stories with highlighted words
