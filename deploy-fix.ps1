# Quick Deploy Script for Payment Fix
# Run this to deploy the auto-capture fix

Write-Host "🚀 Deploying Payment Auto-Capture Fix..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Not in InterviewAI-Website directory" -ForegroundColor Red
    Write-Host "Please run: cd InterviewAI-Website" -ForegroundColor Yellow
    exit 1
}

# Git status
Write-Host "📋 Checking git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "📦 Adding files..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Fixed payment auto-capture - added payment_capture: 1"

Write-Host ""
Write-Host "🔄 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Click your project: inatance-ai-website" -ForegroundColor White
Write-Host "3. Click 'Redeploy' button" -ForegroundColor White
Write-Host "4. Wait 1-2 minutes for deployment" -ForegroundColor White
Write-Host "5. Test payment: https://inatance-ai-website.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Testing:" -ForegroundColor Cyan
Write-Host "- Login to website" -ForegroundColor White
Write-Host "- Click 'Test Payment - ₹1' button" -ForegroundColor White
Write-Host "- Complete payment" -ForegroundColor White
Write-Host "- Wait 3 seconds (page auto-refreshes)" -ForegroundColor White
Write-Host "- Check if time increased by 30 minutes" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "- Quick Guide: QUICK_DEPLOY.md" -ForegroundColor White
Write-Host "- Detailed Guide: DEPLOY_NOW.md" -ForegroundColor White
Write-Host "- Fix Summary: PAYMENT_FIX_SUMMARY.md" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Good luck!" -ForegroundColor Green
