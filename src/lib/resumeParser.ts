import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getAllExperiences, getAllProjects, getSkillsByCategory } from './db.js';
import type { ResumeData, PersonalInfo, WorkExperience, Project, Education, Language } from './resumeTypes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function parseResumeData(): Promise<ResumeData> {
  // Read resume.md
  const resumeMdPath = join(__dirname, '../../resume.md');
  const markdown = readFileSync(resumeMdPath, 'utf-8');

  // Extract data from markdown
  const personal = extractContactInfo(markdown);
  const summary = extractSection(markdown, '## Summary');
  const education = parseEducation(markdown);
  const languages = parseLanguages(markdown);

  // Get data from database
  const dbExperiences = getAllExperiences();
  const dbProjects = getAllProjects();
  const dbSkills = getSkillsByCategory();

  // Transform database data to resume format
  const experiences: WorkExperience[] = dbExperiences.map(exp => ({
    company: exp.company,
    role: exp.role,
    location: exp.location || '',
    startDate: exp.start_date || '',
    endDate: exp.end_date,
    description: exp.description || ''
  }));

  const projects: Project[] = dbProjects.map(proj => ({
    title: proj.title,
    description: proj.description || '',
    techStack: proj.tech_stack || '',
    url: proj.live_url || proj.github_url || undefined
  }));

  // Transform skills to string arrays
  const skills: Record<string, string[]> = {};
  Object.entries(dbSkills).forEach(([category, skillList]) => {
    skills[category] = skillList.map(skill => skill.name);
  });

  return {
    personal,
    summary,
    experiences,
    projects,
    skills,
    education,
    languages
  };
}

function extractContactInfo(markdown: string): PersonalInfo {
  const lines = markdown.split('\n');

  // Line 1: Name
  const name = lines[0].replace(/^#\s+/, '').trim();

  // Line 3: Title (in **bold**)
  const title = lines[2].replace(/\*\*/g, '').trim();

  // Line 5: Location, phone, email
  const contactLine = lines[4];
  const contactParts = contactLine.split('|').map(p => p.trim());
  const location = contactParts[0] || 'Addis Ababa, Ethiopia';
  const phone = contactParts[1] || '';
  const email = contactParts[2] || '';

  // Line 7: GitHub, LinkedIn, Portfolio (markdown links)
  const linksLine = lines[6];
  const githubMatch = linksLine.match(/\[GitHub\]\((.*?)\)/);
  const linkedinMatch = linksLine.match(/\[LinkedIn\]\((.*?)\)/);
  const portfolioMatch = linksLine.match(/\[Portfolio\]\((.*?)\)/);

  return {
    name,
    title,
    location,
    phone,
    email,
    github: githubMatch ? githubMatch[1] : '',
    linkedin: linkedinMatch ? linkedinMatch[1] : '',
    portfolio: portfolioMatch ? portfolioMatch[1] : ''
  };
}

function extractSection(markdown: string, heading: string): string {
  const lines = markdown.split('\n');
  const startIndex = lines.findIndex(line => line.trim() === heading);

  if (startIndex === -1) return '';

  // Find the next section or end of file
  let endIndex = lines.length;
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith('##')) {
      endIndex = i;
      break;
    }
  }

  // Get content between heading and next section, skip empty lines
  const content = lines
    .slice(startIndex + 1, endIndex)
    .filter(line => line.trim() !== '' && line.trim() !== '---')
    .join(' ')
    .trim();

  return content;
}

function parseEducation(markdown: string): Education[] {
  const education: Education[] = [];
  const lines = markdown.split('\n');

  // Find Education section
  const startIndex = lines.findIndex(line => line.trim() === '## Education');
  if (startIndex === -1) return education;

  // Find next section
  let endIndex = lines.length;
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      endIndex = i;
      break;
    }
  }

  // Parse each education entry (starts with ###)
  let currentEdu: Partial<Education> | null = null;

  for (let i = startIndex + 1; i < endIndex; i++) {
    const line = lines[i].trim();

    if (line.startsWith('### ')) {
      // Save previous entry
      if (currentEdu && currentEdu.institution && currentEdu.program && currentEdu.period) {
        education.push(currentEdu as Education);
      }

      // Start new entry - parse "Institution - Program" format
      const title = line.replace(/^###\s+/, '');
      const parts = title.split(' - ');
      currentEdu = {
        institution: parts[0]?.trim() || title,
        program: parts[1]?.trim() || '',
        period: '',
        details: ''
      };
    } else if (line.startsWith('*') && currentEdu) {
      // Period line
      currentEdu.period = line.replace(/^\*/, '').replace(/\*$/, '').trim();
    } else if (line && !line.startsWith('---') && currentEdu) {
      // Details line
      if (currentEdu.details) {
        currentEdu.details += ' ' + line;
      } else {
        currentEdu.details = line;
      }
    }
  }

  // Save last entry
  if (currentEdu && currentEdu.institution && currentEdu.program && currentEdu.period) {
    education.push(currentEdu as Education);
  }

  return education;
}

function parseLanguages(markdown: string): Language[] {
  const languages: Language[] = [];
  const lines = markdown.split('\n');

  // Find Languages section
  const startIndex = lines.findIndex(line => line.trim() === '## Languages');
  if (startIndex === -1) return languages;

  // Find next section or end
  let endIndex = lines.length;
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      endIndex = i;
      break;
    }
  }

  // Parse language lines (format: "- **Language** - Proficiency")
  for (let i = startIndex + 1; i < endIndex; i++) {
    const line = lines[i].trim();
    if (line.startsWith('- ')) {
      // Remove leading "- " and split by " - "
      const content = line.substring(2);
      const parts = content.split(' - ');

      if (parts.length >= 2) {
        const name = parts[0].replace(/\*\*/g, '').trim();
        const proficiency = parts[1].trim();
        languages.push({ name, proficiency });
      }
    }
  }

  return languages;
}
