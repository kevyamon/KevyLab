/**
 * ============================================================================
 * KEVYLAB — CONTRATS DE DONNÉES SYNCHRONISÉS (FRONTEND)
 * ============================================================================
 * Source de vérité miroir des entités, énumérations et formats de réponses
 * garantissant l'intégrité de la communication avec l'API REST backend.
 * ============================================================================
 */

export enum EventType {
  APPATHON = 'APPATHON',
  HACKATHON = 'HACKATHON',
  CHALLENGE = 'CHALLENGE',
  CALL_FOR_PROJECTS = 'CALL_FOR_PROJECTS'
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  ANNOUNCED = 'ANNOUNCED',
  APPLICATIONS_OPEN = 'APPLICATIONS_OPEN',
  APPLICATIONS_CLOSED = 'APPLICATIONS_CLOSED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  RESULTS_PUBLISHED = 'RESULTS_PUBLISHED',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum SubmissionStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  NEEDS_INFORMATION = 'NEEDS_INFORMATION',
  SHORTLISTED = 'SHORTLISTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WINNER = 'WINNER',
  WITHDRAWN = 'WITHDRAWN',
  ARCHIVED = 'ARCHIVED'
}

export enum TechnicalProfileType {
  NON_TECHNICAL = 'NON_TECHNICAL',
  BEGINNER = 'BEGINNER',
  DEVELOPER = 'DEVELOPER',
  DESIGNER = 'DESIGNER',
  MIXED_TEAM = 'MIXED_TEAM',
  OTHER = 'OTHER'
}

export enum ProjectCategory {
  APPLICATION_MOBILE = 'APPLICATION_MOBILE',
  WEB = 'WEB',
  IA = 'IA',
  RD = 'R&D',
  EXPERIMENTAL = 'EXPERIMENTAL'
}

export enum ProjectStatus {
  RESEARCH = 'RESEARCH',
  PROTOTYPE = 'PROTOTYPE',
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  BETA = 'BETA',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER'
}

export enum ContactType {
  PARTNERSHIP = 'PARTNERSHIP',
  PROJECT = 'PROJECT',
  MEDIA = 'MEDIA',
  EVENT = 'EVENT',
  GENERAL = 'GENERAL',
  OTHER = 'OTHER'
}

export enum ContactStatus {
  NEW = 'NEW',
  READ = 'READ',
  REPLIED = 'REPLIED',
  ARCHIVED = 'ARCHIVED'
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  pagination?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown[];
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface IEvent {
  _id: string;
  name: string;
  slug: string;
  type: EventType;
  edition?: string;
  tagline?: string;
  description: string;
  status: EventStatus;
  applicationOpenAt?: string;
  applicationCloseAt?: string;
  reviewStartAt?: string;
  resultAt?: string;
  coverImageUrl?: string;
  rulesDocumentUrl?: string;
  isFeatured: boolean;
  resultsPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IEvaluationCriterion {
  _id: string;
  eventId: string;
  key: string;
  label: string;
  description?: string;
  maxScore: number;
  order: number;
  active: boolean;
}

export interface ISubmission {
  _id: string;
  reference: string;
  eventId: string;
  candidate: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    city?: string;
    teamType: 'SOLO' | 'TEAM';
    teamName?: string;
    teamMembers: Array<{ fullName: string; role?: string; email?: string }>;
  };
  project: {
    title: string;
    tagline?: string;
    problem: string;
    problemImportance?: string;
    solution: string;
    targetAudience: string;
    mvpFeatures: string[];
    prototypeExists: boolean;
    prototypeUrl?: string;
    githubUrl?: string;
  };
  technicalProfile: {
    level: TechnicalProfileType;
    experience?: string;
    technologies?: string[];
  };
  status: SubmissionStatus;
  ranking?: string;
  publicWinner: boolean;
  review?: {
    scores: Record<string, number>;
    totalScore: number;
    adminNotes?: string;
    reviewedAt?: string;
    reviewedBy?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ILabProject {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  problem?: string;
  solution?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  logoUrl?: string;
  coverImageUrl?: string;
  gallery: string[];
  platforms: string[];
  technologies: string[];
  playStoreUrl?: string;
  websiteUrl?: string;
  githubUrl?: string;
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AdminRole;
  permissions: string[];
}

export interface IPublicWinner {
  _id: string;
  reference: string;
  candidate: {
    fullName: string;
    country: string;
    teamType: 'SOLO' | 'TEAM';
    teamName?: string;
  };
  project: {
    title: string;
    tagline?: string;
    solution?: string;
    prototypeUrl?: string;
    githubUrl?: string;
  };
  ranking?: string;
  laureateProfile?: {
    photoUrl?: string;
    role?: string;
    bio?: string;
    distinction?: string;
    rank?: number;
  };
  createdAt: string;
}

