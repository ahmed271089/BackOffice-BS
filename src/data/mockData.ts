export const platformStats = {
  totalSolved: 124802,
  expertsVerified: 8431,
  successRate: '94.2%',
  activeProblems: 156,
};

export const moderationQueue = [
  {
    id: 'r1',
    type: 'POST',
    title: 'GPU Power Delivery Failure',
    reason: 'Spam — repeated promotional links',
    reportedBy: 'system_filter',
    submittedBy: 'driveby_user_22',
    createdAt: '12 min ago',
  },
  {
    id: 'r2',
    type: 'COMMENT',
    title: "Comment on 'Car Brake Squealing'",
    reason: 'Misleading solution — could damage the vehicle',
    reportedBy: 'verified_mechanic_88',
    submittedBy: 'random_fixer_3',
    createdAt: '38 min ago',
  },
  {
    id: 'r3',
    type: 'POST',
    title: 'Broken Washing Machine LG Turbo',
    reason: 'Duplicate post, already solved',
    reportedBy: 'mod_jenna',
    submittedBy: 'newuser_204',
    createdAt: '1h ago',
  },
];

export const categoryHealth = [
  { id: 'c1', name: 'Tech & Electronics', openCount: 412, solvedRate: 91, color: '#3B82F6' },
  { id: 'c2', name: 'Automotive', openCount: 318, solvedRate: 88, color: '#F59E0B' },
  { id: 'c3', name: 'Home Repair', openCount: 276, solvedRate: 95, color: '#22C55E' },
  { id: 'c4', name: 'Gardening', openCount: 94, solvedRate: 97, color: '#84CC16' },
];

export const platformLoadSeries = [
  { day: 'Mon', posts: 320 },
  { day: 'Tue', posts: 410 },
  { day: 'Wed', posts: 380 },
  { day: 'Thu', posts: 460 },
  { day: 'Fri', posts: 520 },
  { day: 'Sat', posts: 300 },
  { day: 'Sun', posts: 270 },
];

export const leaderboard = [
  { id: 'u1', name: 'Marcus Sutton', points: 15280, rank: 1, category: 'Tech & Electronics' },
  { id: 'u2', name: 'DevsHope', points: 14102, rank: 2, category: 'Automotive' },
  { id: 'u3', name: 'WrenchFix', points: 12550, rank: 3, category: 'Home Repair' },
  { id: 'u4', name: 'GreenThumb_K', points: 9820, rank: 4, category: 'Gardening' },
];

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED';

export const users = [
  { id: 'u1', name: 'Alex Rivera', email: 'alex.rivera@example.com', status: 'ACTIVE' as UserStatus, reputation: 14809, isVerified: true, joined: '2025-02-14' },
  { id: 'u2', name: 'Jordan D.', email: 'jordan.d@example.com', status: 'ACTIVE' as UserStatus, reputation: 8421, isVerified: false, joined: '2025-05-02' },
  { id: 'u3', name: 'driveby_user_22', email: 'driveby22@example.com', status: 'SUSPENDED' as UserStatus, reputation: 12, isVerified: false, joined: '2026-06-01' },
  { id: 'u4', name: 'Marie L.', email: 'marie.l@example.com', status: 'ACTIVE' as UserStatus, reputation: 5310, isVerified: true, joined: '2024-11-20' },
  { id: 'u5', name: 'spam_bot_990', email: 'spam990@example.com', status: 'BANNED' as UserStatus, reputation: 0, isVerified: false, joined: '2026-06-18' },
];

export const categoriesList = [
  { id: 'c1', name: 'Tech & Electronics', slug: 'technology', icon: '💻', postsCount: 4120 },
  { id: 'c2', name: 'Automotive', slug: 'cars', icon: '🚗', postsCount: 3180 },
  { id: 'c3', name: 'Home Repair', slug: 'home-repair', icon: '🔧', postsCount: 2760 },
  { id: 'c4', name: 'Gardening', slug: 'gardening', icon: '🌱', postsCount: 940 },
];
