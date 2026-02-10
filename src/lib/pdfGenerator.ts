import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import type { ResumeData, WorkExperience, Project, Education, Language } from './resumeTypes.js';

// Color scheme matching website theme
const COLORS = {
  accent: '#f97316',       // Orange accent from website
  primary: '#171717',      // Dark text
  secondary: '#525252',    // Gray text
  border: '#d4d4d4'        // Light border
};

const FONTS = {
  regular: 'Helvetica',
  bold: 'Helvetica-Bold',
  italic: 'Helvetica-Oblique'
};

export async function generateResumePDF(
  data: ResumeData,
  outputPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    const stream = createWriteStream(outputPath);
    doc.pipe(stream);

    try {
      // Header Section
      renderHeader(doc, data);

      // Summary
      renderSection(doc, 'Summary', () => {
        doc.fontSize(10)
          .fillColor(COLORS.primary)
          .font(FONTS.regular)
          .text(data.summary, { align: 'justify', lineGap: 2 });
      });

      // Experience
      renderSection(doc, 'Experience', () => {
        data.experiences.forEach((exp, index) => {
          renderExperience(doc, exp);
          if (index < data.experiences.length - 1) {
            doc.moveDown(0.5);
          }
        });
      });

      // Projects
      if (data.projects.length > 0) {
        renderSection(doc, 'Projects', () => {
          data.projects.forEach((proj, index) => {
            renderProject(doc, proj);
            if (index < data.projects.length - 1) {
              doc.moveDown(0.5);
            }
          });
        });
      }

      // Skills
      renderSection(doc, 'Technical Skills', () => {
        Object.entries(data.skills).forEach(([category, skills]) => {
          renderSkillCategory(doc, category, skills);
        });
      });

      // Education
      renderSection(doc, 'Education', () => {
        data.education.forEach((edu, index) => {
          renderEducation(doc, edu);
          if (index < data.education.length - 1) {
            doc.moveDown(0.5);
          }
        });
      });

      // Languages
      if (data.languages.length > 0) {
        renderSection(doc, 'Languages', () => {
          renderLanguages(doc, data.languages);
        });
      }

      doc.end();

      stream.on('finish', resolve);
      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
}

function renderHeader(doc: PDFKit.PDFDocument, data: ResumeData): void {
  const { personal } = data;

  // Name in large orange bold
  doc.fontSize(22)
    .fillColor(COLORS.accent)
    .font(FONTS.bold)
    .text(personal.name.toUpperCase(), { align: 'center' });

  doc.moveDown(0.3);

  // Title
  doc.fontSize(11)
    .fillColor(COLORS.primary)
    .font(FONTS.regular)
    .text(personal.title, { align: 'center' });

  doc.moveDown(0.5);

  // Contact info
  const contact = `${personal.location} | ${personal.phone} | ${personal.email}`;
  doc.fontSize(9)
    .fillColor(COLORS.secondary)
    .text(contact, { align: 'center' });

  doc.moveDown(0.2);

  // Links
  const links = `GitHub: ${personal.github} | LinkedIn: ${personal.linkedin} | Portfolio: ${personal.portfolio}`;
  doc.fontSize(9)
    .fillColor(COLORS.secondary)
    .text(links, { align: 'center' });

  doc.moveDown(1.2);
}

function renderSection(
  doc: PDFKit.PDFDocument,
  title: string,
  contentFn: () => void
): void {
  // Check if we need a new page (less than 100 points remaining)
  if (doc.y > 700) {
    doc.addPage();
  }

  // Orange section heading
  doc.fontSize(13)
    .fillColor(COLORS.accent)
    .font(FONTS.bold)
    .text(title);

  // Orange underline
  const lineY = doc.y + 2;
  const pageWidth = doc.page.width;
  const margin = doc.page.margins.left;

  doc.moveTo(margin, lineY)
    .lineTo(pageWidth - margin, lineY)
    .strokeColor(COLORS.accent)
    .lineWidth(1.5)
    .stroke();

  doc.moveDown(0.7);

  // Render section content
  contentFn();

  doc.moveDown(0.8);
}

function renderExperience(doc: PDFKit.PDFDocument, exp: WorkExperience): void {
  // Company name and role on the same line
  doc.fontSize(11)
    .fillColor(COLORS.primary)
    .font(FONTS.bold)
    .text(exp.role, { continued: false });

  // Company and dates
  const dateStr = exp.endDate
    ? `${exp.startDate} - ${exp.endDate}`
    : `${exp.startDate} - Present`;

  doc.fontSize(10)
    .fillColor(COLORS.secondary)
    .font(FONTS.italic)
    .text(`${exp.company} | ${exp.location}`, { continued: true })
    .text(` | ${dateStr}`, { align: 'left' });

  doc.moveDown(0.3);

  // Description bullets
  if (exp.description) {
    const bullets = exp.description
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    bullets.forEach(bullet => {
      const bulletText = bullet.startsWith('-') ? bullet.substring(1).trim() : bullet;
      doc.fontSize(9)
        .fillColor(COLORS.primary)
        .font(FONTS.regular)
        .text(`• ${bulletText}`, { indent: 10, lineGap: 1 });
    });
  }

  doc.moveDown(0.3);
}

function renderProject(doc: PDFKit.PDFDocument, proj: Project): void {
  // Project title
  doc.fontSize(11)
    .fillColor(COLORS.primary)
    .font(FONTS.bold)
    .text(proj.title, { continued: false });

  // Tech stack
  if (proj.techStack) {
    doc.fontSize(9)
      .fillColor(COLORS.secondary)
      .font(FONTS.italic)
      .text(`Tech: ${proj.techStack}`);
  }

  doc.moveDown(0.2);

  // Description
  if (proj.description) {
    doc.fontSize(9)
      .fillColor(COLORS.primary)
      .font(FONTS.regular)
      .text(proj.description, { lineGap: 1 });
  }

  doc.moveDown(0.3);
}

function renderSkillCategory(
  doc: PDFKit.PDFDocument,
  category: string,
  skills: string[]
): void {
  // Category name in bold
  doc.fontSize(10)
    .fillColor(COLORS.primary)
    .font(FONTS.bold)
    .text(`${category}:`, { continued: true });

  // Skills as comma-separated list
  doc.fontSize(9)
    .fillColor(COLORS.secondary)
    .font(FONTS.regular)
    .text(` ${skills.join(', ')}`, { lineGap: 2 });

  doc.moveDown(0.4);
}

function renderEducation(doc: PDFKit.PDFDocument, edu: Education): void {
  // Institution and program
  doc.fontSize(11)
    .fillColor(COLORS.primary)
    .font(FONTS.bold)
    .text(`${edu.institution} - ${edu.program}`, { continued: false });

  // Period
  doc.fontSize(9)
    .fillColor(COLORS.secondary)
    .font(FONTS.italic)
    .text(edu.period);

  // Details
  if (edu.details) {
    doc.moveDown(0.2);
    doc.fontSize(9)
      .fillColor(COLORS.primary)
      .font(FONTS.regular)
      .text(edu.details, { lineGap: 1 });
  }

  doc.moveDown(0.3);
}

function renderLanguages(doc: PDFKit.PDFDocument, languages: Language[]): void {
  const languageText = languages
    .map(lang => `${lang.name} (${lang.proficiency})`)
    .join(', ');

  doc.fontSize(10)
    .fillColor(COLORS.primary)
    .font(FONTS.regular)
    .text(languageText);
}
