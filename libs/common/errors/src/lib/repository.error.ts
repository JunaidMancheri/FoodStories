export class RepositoryError {
  constructor(public code: REPO_ERRORS, public details?: string) {}
}

export enum REPO_ERRORS {
  DUPLICATE_RECORD = 'Duplicate_RECORD',
}