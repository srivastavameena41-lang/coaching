export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  category: string;
  bio: string;
  image: string;
  tags: string[];
  qualifications?: string[];
  experience?: string;
}

export interface ProgramItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description?: string;
  specialNotice?: string;
  tags?: string[];
  targetExams?: {
    type: string;
    name: string;
  }[];
  footerNote: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  colorScheme: 'purple' | 'blue' | 'amber';
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
  color: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
}

export interface EnquiryFormData {
  studentName: string;
  parentName: string;
  program: string;
  phone: string;
  requirements: string;
}
