import { sectionWithParagraph } from "./sectionWithParagraph.js";
export function formatAndLettersDetailsComponent(job) {
     let format = sectionWithParagraph('format', 'Format', job.format_name);
     let letters = sectionWithParagraph('letters', 'Name', job.letters);
}