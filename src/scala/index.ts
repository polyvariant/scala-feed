import { allHashTags } from "./hashtags";
import { scalaRelatedOrganizationProfiles } from "./accounts";

function containsRelevantHashtag(text: string): boolean {
  const input = text.toLowerCase();
  const textWords = input.split(/\s+/);
  return allHashTags.map(v => v.toLowerCase()).some(tag => textWords.includes(tag));
}

function postedByScalaOrgAccount(author: string): boolean {
  return scalaRelatedOrganizationProfiles.includes(author);
}

export function isAboutScala(author: string, text: string): boolean {
  return postedByScalaOrgAccount(author) || containsRelevantHashtag(text);
}

