import { readFileSync } from 'node:fs';

const paths = process.argv.slice(2);
const thresholds = {
  performance: 0.9,
  accessibility: 1,
  'best-practices': 1,
  seo: 1,
};

try {
  if (paths.length !== 3) {
    throw new Error('Exactly three Lighthouse reports are required.');
  }

  const reports = paths.map((path) => {
    const report = JSON.parse(readFileSync(path, 'utf8'));
    if (!report || typeof report !== 'object' || Array.isArray(report)) {
      throw new Error(`${path}: expected a Lighthouse report object.`);
    }
    if (report.runtimeError != null) {
      throw new Error(`${path}: Lighthouse reported a runtime error.`);
    }
    for (const category of Object.keys(thresholds)) {
      const score = report.categories?.[category]?.score;
      if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 1) {
        throw new Error(`${path}: ${category} must have a finite numeric score in [0,1].`);
      }
    }
    return report;
  });

  for (const [category, minimum] of Object.entries(thresholds)) {
    const scores = reports.map((report) => report.categories[category].score);
    const actual = category === 'performance'
      ? [...scores].sort((left, right) => left - right)[1]
      : Math.min(...scores);
    console.log(`${category}: ${scores.join(', ')} (enforced ${actual})`);
    if (actual < minimum) {
      throw new Error(`${category} score ${actual} is below ${minimum}.`);
    }
  }
  console.log('Lighthouse thresholds passed.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
