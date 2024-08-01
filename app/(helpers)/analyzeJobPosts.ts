import { pipeline } from '@xenova/transformers';

// Define the structure of the analysis results
interface AnalysisResults {
  experience: Record<number, number>;
  skills: Record<string, number>;
  jobTitles: Record<string, number>;
  locations: Record<string, number>;
  salaries: Record<string, number>;
  education: Record<string, number>;
}

// Load the NLP pipeline for named entity recognition (NER)
const loadNERModel = async () => {
  const ner = await pipeline('ner', 'dbmdz/bert-large-cased-finetuned-conll03-english');
  return ner;
};

const analyzeJobPosts = async (posts: string[]): Promise<AnalysisResults> => {
  const results: AnalysisResults = {
    experience: {},
    skills: {},
    jobTitles: {},
    locations: {},
    salaries: {},
    education: {}
  };

  const ner = await loadNERModel();

  // Define lists of entities to look for (can be expanded as needed)
  const skillsList = ["javascript", "python", "java", "c++", "sql", "react", "node.js", "angular", "aws", "docker", "kubernetes"];
  const jobTitlesList = ["software engineer", "developer", "data scientist", "project manager", "designer"];
  const locationsList = ["new york", "san francisco", "remote", "los angeles", "chicago"];
  const educationList = ["bachelor's", "master's", "phd", "diploma", "degree"];

  for (const post of posts) {
    // Analyze the post using the NLP model
    const entities = await ner(post);

    for (const entity of entities) {
      const entityText = (entity as any).word.toLowerCase();
      const entityType = (entity as any).entity_group;

      // Classify entities into categories
      if (entityType === "ORG" && /\d+/.test(entityText)) {
        // Extract years of experience
        const years = parseInt(entityText.replace(/\D/g, ''), 10);
        if (!isNaN(years)) {
          if (!results.experience[years]) {
            results.experience[years] = 0;
          }
          results.experience[years] += 1;
        }
      } else if (skillsList.includes(entityText)) {
        // Extract skills
        if (!results.skills[entityText]) {
          results.skills[entityText] = 0;
        }
        results.skills[entityText] += 1;
      } else if (jobTitlesList.includes(entityText)) {
        // Extract job titles
        if (!results.jobTitles[entityText]) {
          results.jobTitles[entityText] = 0;
        }
        results.jobTitles[entityText] += 1;
      } else if (locationsList.includes(entityText)) {
        // Extract locations
        if (!results.locations[entityText]) {
          results.locations[entityText] = 0;
        }
        results.locations[entityText] += 1;
      } else if (/^\$\d+(?:,\d{3})*(?:\.\d{2})?$/.test(entityText)) {
        // Extract salaries
        if (!results.salaries[entityText]) {
          results.salaries[entityText] = 0;
        }
        results.salaries[entityText] += 1;
      } else if (educationList.includes(entityText)) {
        // Extract education requirements
        if (!results.education[entityText]) {
          results.education[entityText] = 0;
        }
        results.education[entityText] += 1;
      }
    }
  }

  return results;
};

export default analyzeJobPosts;
