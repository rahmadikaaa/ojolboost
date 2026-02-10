#!/bin/bash

echo "🔨 Building OjolBoost Dashboard..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Type check
echo "🔍 Type checking..."
npm run tsc -- --noEmit

# Build production
echo "🏗️ Building with Vite..."
npm run build

# Check build result
if [ -d "dist" ]; then
    echo "✅ Build berhasil!"
    echo "📍 Output: dist/"
    echo ""
    echo "Build stats:"
    du -sh dist/
    echo ""
    echo "Files created:"
    ls -la dist/
    echo ""
    echo "Untuk serve production locally:"
    echo "  npm run preview"
    echo ""
    echo "Untuk deploy ke server:"
    echo "  scp -r dist/* user@server:/var/www/html/"
else
    echo "❌ Build gagal!"
    exit 1
fi
