
# Create the new directory structure for route groups and component organization
Write-Output "Creating new directory structure..."
New-Item -ItemType Directory -Path "app/(auth)/login" -Force
New-Item -ItemType Directory -Path "app/(dashboard)/student/dashboard" -Force
New-Item -ItemType Directory -Path "app/(dashboard)/student/apply" -Force
New-Item -ItemType Directory -Path "components/dashboard" -Force

# Move dashboard-related components into the new `components/dashboard` directory
Write-Output "Moving dashboard components..."
Move-Item -Path "components/ApplicationForm" -Destination "components/dashboard/"
Move-Item -Path "components/ApplicationTable" -Destination "components/dashboard/"
Move-Item -Path "components/AutoLogout" -Destination "components/dashboard/"
Move-Item -Path "components/DashboardPanel" -Destination "components/dashboard/"
Move-Item -Path "components/DetailsDialog" -Destination "components/dashboard/"
Move-Item -Path "components/SideNav" -Destination "components/dashboard/"

# Check for and remove the now-empty, old `components/index.js` if it exists and is empty or no longer relevant.
if (Test-Path "components/index.js") {
    Write-Output "Removing old components/index.js..."
    Remove-Item "components/index.js"
}

# Move the existing main page (which contains dashboard logic) to the new dashboard route
Write-Output "Moving existing dashboard page to its new route..."
Move-Item -Path "app/page.tsx" -Destination "app/(dashboard)/student/dashboard/page.tsx"

Write-Output "Restructuring complete. The new public landing page and dashboard layout will be created next."

