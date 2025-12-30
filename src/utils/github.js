// GitHub configuration
export const GITHUB = {
  username: "adam-ctrlc",
  repo: "places-near-you-frontend",

  // URLs
  get profileUrl() {
    return `https://github.com/${this.username}`;
  },
  get repoUrl() {
    return `https://github.com/${this.username}/${this.repo}`;
  },
  get issuesUrl() {
    return `${this.repoUrl}/issues`;
  },
  get pullsUrl() {
    return `${this.repoUrl}/pulls`;
  },
  get readmeUrl() {
    return `${this.repoUrl}#readme`;
  },
  get licenseUrl() {
    return `${this.repoUrl}/blob/main/LICENSE`;
  },
};
