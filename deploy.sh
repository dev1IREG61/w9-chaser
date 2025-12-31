#!/bin/bash

# Production Build & Deploy Script
# Run: chmod +x deploy.sh && ./deploy.sh

echo "🚀 Starting production build..."

# Clean previous build
rm -rf dist

# Build
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📦 Bundle sizes:"
    du -sh dist/
    echo ""
    echo "📊 Gzipped sizes:"
    find dist/assets -name "*.js" -exec gzip -c {} \; | wc -c | awk '{print $1/1024 " KB"}'
    echo ""
    echo "🎯 Next steps:"
    echo "1. Test locally: npm run preview"
    echo "2. Deploy dist/ folder to your hosting"
    echo "3. Run GTmetrix test on live site"
    echo ""
    echo "🌐 Deploy to:"
    echo "- Vercel: vercel --prod"
    echo "- Netlify: netlify deploy --prod"
    echo "- Custom: Upload dist/ folder"
else
    echo "❌ Build failed!"
    exit 1
fi
