import { FacultyMember, ProgramItem, FacilityItem, JourneyStep, GalleryItem } from '../types';

export const CONTACT_INFO = {
  institutionName: "Shree Narayan Coaching Classes",
  shortName: "Shree Narayan",
  locationName: "Lohia Chauraha, Bahraich",
  fullAddress: "Lohia Chauraha, Bahraich, Uttar Pradesh, India",
  phoneDisplay: "+91 91250 45595",
  phoneRaw: "+919125045595",
  whatsappDisplay: "+91 95698 43242",
  whatsappRaw: "919569843242",
  timings: "Mon - Sat: 8:00 AM - 7:00 PM",
  heroEyebrow: "PLAY GROUP TO CLASS 10 • ACADEMIC SUPPORT • COMPETITIVE PREPARATION",
  motto: "Building a Strong Academic Foundation. Creating a Bright Future.",
  mottoLine1: "Building a Strong",
  mottoLine2: "Academic Foundation.",
  mottoLine3: "Creating a Bright Future.",
};

export const QUICK_METRICS = [
  {
    title: "Lohia Chauraha",
    subtitle: "Central Bahraich Campus",
    icon: "MapPin"
  },
  {
    title: "Small Batches",
    subtitle: "Individual Focus & Care",
    icon: "Users"
  },
  {
    title: "Daily Doubts",
    subtitle: "Continuous Assessment",
    icon: "CheckCircle2"
  }
];

export const STAGE_CARDS = [
  {
    id: "early-education",
    category: "EARLY EDUCATION",
    title: "Play Group – UKG",
    description: "Joyful Early Foundation & Phonics with warm activity-driven classroom sessions.",
    cta: "Active Learning",
    badgeColor: "purple",
    icon: "Baby",
  },
  {
    id: "primary-middle",
    category: "PRIMARY & MIDDLE",
    title: "Classes 1 – 8",
    description: "Core Concepts & School Syllabus reinforced through daily guided practice and clarity.",
    cta: "All Major Subjects",
    badgeColor: "blue",
    icon: "BookOpen",
  },
  {
    id: "secondary-stage",
    category: "SECONDARY STAGE",
    title: "Classes 9 – 10",
    description: "Secondary Board Academic Focus with dedicated special sessions in Mathematics & Science.",
    cta: "Board Mentorship",
    badgeColor: "indigo",
    icon: "GraduationCap",
  },
  {
    id: "aspirations",
    category: "ASPIRATIONS",
    title: "Competitive Preparation",
    description: "Navodaya Vidyalaya, KVS, Polytechnic & foundational JEE guidance for high ambition.",
    cta: "Foundation Track",
    badgeColor: "amber",
    icon: "Trophy",
  }
];

export const ABOUT_PILLARS = [
  {
    id: "concept-clarity",
    title: "Concept Clarity",
    description: "Root-level subject understanding that moves beyond rote memorization to instill true practical comprehension.",
    color: "purple",
    icon: "Lightbulb"
  },
  {
    id: "personal-attention",
    title: "Personal Attention",
    description: "Small batch cohorts and individual care ensure no student is left behind, regardless of their current learning pace.",
    color: "blue",
    icon: "Users"
  },
  {
    id: "focused-learning",
    title: "Focused Learning",
    description: "Structured daily practice, periodic evaluations, and gentle mentorship tailored toward academic excellence.",
    color: "amber",
    icon: "Target"
  }
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "geeta-srivastava",
    name: "Mrs. Geeta Srivastava",
    role: "Director",
    category: "LEADERSHIP & DIRECTION",
    bio: "With a strong focus on disciplined learning and the overall development of students, Mrs. Geeta Srivastava leads the institute with a commitment to creating a positive, supportive and focused learning environment.",
    image: "/photos/faculty_geeta-srivastava.jpg",
    tags: ["Institutional Vision", "Student Welfare", "Director"]
  },
  {
    id: "anushka-srivastava",
    name: "Anushka Srivastava",
    role: "Academic Faculty & Educator",
    category: "ACADEMIC FACULTY",
    bio: "Dedicated educator with 6 years of teaching experience, holding M.A, B.Ed, and D.El.Ed degrees, and qualified in both UPTET and CTET (Paper I & II). Passionate about fostering conceptual clarity, student confidence, and strong academic foundations through interactive and personalized pedagogy.",
    image: "/photos/faculty_anushka-srivastava.jpg",
    qualifications: [
      "M.A, B.Ed, D.El.Ed",
      "UPTET & CTET (Both Papers Qualified)"
    ],
    experience: "6 Years Experience",
    tags: [
      "M.A, B.Ed, D.El.Ed",
      "UPTET & CTET Qualified",
      "6 Years Experience",
      "Concept Clarity",
      "Student-Focused Teaching"
    ]
  }
];

export const PROGRAMS_LIST: ProgramItem[] = [
  {
    id: "play-group-ukg",
    badge: "EARLY CHILDHOOD",
    badgeColor: "purple",
    title: "Play Group to UKG",
    subtitle: "Building a strong foundation through joyful learning.",
    tags: [
      "Rhymes Activities",
      "Reading Focus",
      "Phonics-Based Learning",
      "Oral Practice",
      "Activity-Based Learning",
      "Basic Communication Skills",
      "Foundation Learning"
    ],
    footerNote: "Careful, loving mentor supervision"
  },
  {
    id: "classes-1-to-8",
    badge: "PRIMARY & MIDDLE",
    badgeColor: "blue",
    title: "Classes 1st to 8th",
    subtitle: "Strong Academic Foundation.",
    tags: [
      "All Major Subjects",
      "Concept-Based Learning",
      "Regular Practice",
      "Doubt Clearing",
      "Homework Support",
      "Individual Attention",
      "Exam Preparation",
      "Academic Guidance"
    ],
    footerNote: "School syllabus synchronization"
  },
  {
    id: "classes-9-to-10",
    badge: "HIGH SCHOOL BOARD",
    badgeColor: "purple",
    title: "Classes 9th to 10th",
    subtitle: "Focused Secondary-Level Preparation.",
    specialNotice: "⭐ Special Focus: Mathematics & Science Specialized Batches",
    tags: [
      "Concept Clarity",
      "Problem Solving",
      "Practice Sessions",
      "Doubt Clearing",
      "Exam-Oriented Preparation"
    ],
    footerNote: "Board pattern mock tests"
  },
  {
    id: "competitive-preparation",
    badge: "COMPETITIVE WING",
    badgeColor: "amber",
    title: "Competitive Exam Preparation",
    subtitle: "Start preparing with the right foundation.",
    targetExams: [
      { type: "Target Exam", name: "Navodaya Vidyalaya" },
      { type: "Target Exam", name: "Kendriya Vidyalaya (KVS)" },
      { type: "Technical Entry", name: "Polytechnic Exam" }
    ],
    footerNote: "Aptitude & speed mastery"
  }
];

export const FACILITIES_LIST: FacilityItem[] = [
  {
    id: "fac-1",
    title: "Personal Attention",
    description: "Focused mentoring tailored to address individual student queries and pacing.",
    iconName: "UserCheck",
    colorScheme: "purple"
  },
  {
    id: "fac-2",
    title: "Concept-Based Teaching",
    description: "Deep grounding in theoretical and practical foundations rather than mechanical memorization.",
    iconName: "BrainCircuit",
    colorScheme: "blue"
  },
  {
    id: "fac-3",
    title: "Regular Practice",
    description: "Daily homework checks and scheduled practice worksheets to build consistency.",
    iconName: "ClipboardCheck",
    colorScheme: "amber"
  },
  {
    id: "fac-4",
    title: "Doubt Clearing",
    description: "Dedicated post-session windows where students resolve questions openly without hesitation.",
    iconName: "HelpCircle",
    colorScheme: "purple"
  },
  {
    id: "fac-5",
    title: "Reading Focus",
    description: "Guided reading habits that improve comprehension, vocabulary, and contextual understanding.",
    iconName: "BookOpenCheck",
    colorScheme: "blue"
  },
  {
    id: "fac-6",
    title: "Phonics Learning",
    description: "Systematic phonetic awareness helping primary and early learners articulate accurately.",
    iconName: "Volume2",
    colorScheme: "amber"
  },
  {
    id: "fac-7",
    title: "Activity-Based Learning",
    description: "Engaging hands-on exercises that translate abstract lessons into tangible learning moments.",
    iconName: "Puzzle",
    colorScheme: "purple"
  },
  {
    id: "fac-8",
    title: "Special Maths & Science Classes",
    description: "Targeted modules for Class 9 and 10 emphasizing numerical speed and scientific rigor.",
    iconName: "Binary",
    colorScheme: "blue"
  },
  {
    id: "fac-9",
    title: "Competitive Exam Preparation",
    description: "Structured mentorship preparing young students for Navodaya, KVS, and foundational STEM contests.",
    iconName: "Award",
    colorScheme: "amber"
  }
];

export const TRUST_POINTS = [
  {
    title: "Strong Conceptual Foundation",
    description: "Deep understanding that endures through board exams."
  },
  {
    title: "Personal Attention",
    description: "Every student is mentored with dedicated guidance."
  },
  {
    title: "Activity-Based Learning",
    description: "Joyful practical learning for holistic retention."
  },
  {
    title: "Reading & Phonics Focus",
    description: "Solid early language and reading comprehension."
  },
  {
    title: "Regular Practice",
    description: "Structured worksheets and routine evaluations."
  },
  {
    title: "Doubt Support",
    description: "Clear every confusion promptly every day."
  },
  {
    title: "Special Maths & Science Classes",
    description: "In-depth preparation for Classes 9 and 10."
  },
  {
    title: "Competitive Exam Preparation",
    description: "Navodaya, KVS, Polytechnic & JEE Foundation."
  }
];

export const LEARNING_STEPS: JourneyStep[] = [
  {
    step: "01",
    title: "UNDERSTAND",
    description: "Build clear and strong concepts right from the beginning through relatable examples.",
    color: "blue"
  },
  {
    step: "02",
    title: "PRACTICE",
    description: "Strengthen learning through regular practice worksheets and continuous exercise drills.",
    color: "indigo"
  },
  {
    step: "03",
    title: "IMPROVE",
    description: "Identify doubts and systematically improve weak areas with faculty personal feedback.",
    color: "purple"
  },
  {
    step: "04",
    title: "ACHIEVE",
    description: "Build confidence for academic goals, examinations, and competitive milestones.",
    color: "violet"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "snc-cultural-events",
    title: "Cultural events",
    tag: "Events & Celebrations",
    description: "Real learning and cultural celebration moments at Shree Narayan Coaching Classes, Lohia Chauraha, Bahraich.",
    image: "/photos/gallery_cultural_events.jpg"
  },
  {
    id: "snc-student-positions",
    title: "Students secures positions",
    tag: "Student Milestones",
    description: "Felicitation and recognition of students securing top academic positions in examinations.",
    image: "/photos/gallery_students_secures_positions.jpg"
  },
  {
    id: "snc-time-activities",
    title: "Time to time activities",
    tag: "Classroom Batches",
    description: "Active classroom learning, doubt solving, and practical skill sessions at our Lohia Chauraha campus.",
    image: "/photos/gallery_time_to_time_activities.jpg"
  }
];
