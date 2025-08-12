const fs = require('fs');
const path = require('path');

// Files that need API URL fixes
const filesToFix = [
  'client/src/containers/EnhancedBuilder.js',
  'client/src/containers/Builder.js',
  'client/src/containers/WorkingBuilder.js',
  'client/src/components/UserProfile.js',
  'client/src/components/PortfolioDashboard.js'
];

// Function to fix API URLs in a file
function fixApiUrls(filePath) {
  try {
    console.log(`🔧 Fixing API URLs in: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if API_BASE_URL is already imported
    if (!content.includes("import { API_BASE_URL }")) {
      // Find the last import statement and add API_BASE_URL import
      const importRegex = /import.*from.*['"];?\s*$/gm;
      const imports = content.match(importRegex);
      
      if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        const lastImportIndex = content.lastIndexOf(lastImport);
        const insertIndex = lastImportIndex + lastImport.length;
        
        content = content.slice(0, insertIndex) + 
                 "\nimport { API_BASE_URL } from '../utils/api';" + 
                 content.slice(insertIndex);
        modified = true;
        console.log("  ✅ Added API_BASE_URL import");
      }
    }
    
    // Fix relative API URLs
    const relativeApiRegex = /fetch\s*\(\s*['"`]\/api\//g;
    const matches = content.match(relativeApiRegex);
    
    if (matches) {
      content = content.replace(/fetch\s*\(\s*['"`](\/api\/[^'"`]+)['"`]/g, 
        'fetch(`${API_BASE_URL}$1`');
      modified = true;
      console.log(`  ✅ Fixed ${matches.length} API URL(s)`);
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  💾 Saved changes to ${filePath}`);
    } else {
      console.log(`  ℹ️  No changes needed for ${filePath}`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error fixing ${filePath}:`, error.message);
  }
}

// Fix all files
console.log("🚀 Starting API URL fixes...\n");

filesToFix.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fixApiUrls(fullPath);
  } else {
    console.log(`⚠️  File not found: ${fullPath}`);
  }
  console.log(); // Empty line for readability
});

console.log("✅ API URL fixes completed!");
console.log("\n🔄 Please restart your React development server for changes to take effect:");
console.log("   1. Stop the current server (Ctrl+C)");
console.log("   2. Run: npm start");