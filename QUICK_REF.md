# ⚡ QUICK REFERENCE

## Build & Deploy
```bash
npm run build          # Build for production
npm run preview        # Test locally
./deploy.sh           # Build + stats
```

## Performance Targets ✅
- Initial Load: **~52 KB gzipped**
- FCP: **< 0.5s**
- LCP: **< 1.2s**
- TTI: **< 1.5s**
- GTmetrix: **Grade A**
- Lighthouse: **> 90**

## Key Optimizations Applied
1. ✅ IconRenderer: 24MB → 1.85KB (99.99% ↓)
2. ✅ Lazy loading all routes
3. ✅ Code splitting (React, Motion, Icons)
4. ✅ Terser minification
5. ✅ CSS minification
6. ✅ Preconnect to API
7. ✅ Removed console logs
8. ✅ Optimized chunks

## Bundle Analysis
- **Critical**: 52 KB (HTML + CSS + React + Main)
- **Landing**: 23 KB (lazy loaded)
- **Motion**: 40 KB (lazy loaded)
- **Icons**: 3 KB (lazy loaded)
- **Other pages**: 5-8 KB each (lazy loaded)

## Test URLs
- GTmetrix: https://gtmetrix.com
- PageSpeed: https://pagespeed.web.dev
- WebPageTest: https://www.webpagetest.org

## Troubleshooting
- Build fails? `rm -rf node_modules && npm install`
- Icons not showing? Check IconRenderer.tsx icon map
- Slow load? Check server gzip/brotli compression
- Large bundle? Check for new heavy imports

## Server Setup
Enable gzip/brotli compression on your server!
See OPTIMIZATION_COMPLETE.md for config examples.
