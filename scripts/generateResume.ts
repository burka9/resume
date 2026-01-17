import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';
import { parseResumeData } from '../src/lib/resumeParser.js';
import { generateResumePDF } from '../src/lib/pdfGenerator.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log('🔄 Generating resume PDF...\n');

  try {
    // Parse resume data from markdown and database
    console.log('📖 Parsing resume data...');
    const resumeData = await parseResumeData();
    console.log(`   ✓ Found ${resumeData.experiences.length} experiences`);
    console.log(`   ✓ Found ${resumeData.projects.length} projects`);
    console.log(`   ✓ Found ${Object.keys(resumeData.skills).length} skill categories`);
    console.log(`   ✓ Found ${resumeData.education.length} education entries\n`);

    // Ensure output directory exists
    const outputDir = join(__dirname, '../public');
    if (!existsSync(outputDir)) {
      console.log('📁 Creating output directory...');
      mkdirSync(outputDir, { recursive: true });
    }

    // Output path
    const outputPath = join(outputDir, 'resume.pdf');

    // Generate PDF
    console.log('🎨 Generating PDF with orange theme...');
    await generateResumePDF(resumeData, outputPath);

    console.log('\n✅ Resume PDF generated successfully!');
    console.log(`📄 Location: ${outputPath}`);
    console.log('🌐 Accessible at: /resume.pdf\n');
  } catch (error) {
    console.error('\n❌ Failed to generate resume PDF:');
    console.error(error);
    process.exit(1);
  }
}

main();
