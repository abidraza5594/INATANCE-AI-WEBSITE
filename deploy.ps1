# Vercel Deployment Script
Write-Host "Starting Vercel Deployment..." -ForegroundColor Green

# Deploy to Vercel
vercel --prod --yes

Write-Host "`nDeployment Complete!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Go to Vercel Dashboard: https://vercel.com/dashboard"
Write-Host "2. Select your project"
Write-Host "3. Go to Settings > Environment Variables"
Write-Host "4. Add these 4 variables:"
Write-Host "   - FIREBASE_PROJECT_ID"
Write-Host "   - FIREBASE_CLIENT_EMAIL"
Write-Host "   - FIREBASE_PRIVATE_KEY"
Write-Host "   - RAZORPAY_WEBHOOK_SECRET"
Write-Host "5. Redeploy the project"
Write-Host "`nSee VERCEL_DEPLOYMENT.md for detailed instructions"
