export const workoutImageMap = {
  'push up': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  'pushup': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  'bench press': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
  'curl': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
  'run': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80',
  'jog': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80',
  'swim': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',
  'squat': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80',
  'deadlift': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80',
  'plank': 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80',
  'yoga': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
  'cycl': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'bike': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'pull up': 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&q=80',
  'pullup': 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&q=80',
  'jump rope': 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80',
  'hik': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80',
  'walk': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80',
  'stretch': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
  'pilates': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
  'box': 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80',
  'kick': 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80',
  'lift': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80',
  'weight': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80',
}

export const defaultWorkoutImage = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80'

export function getWorkoutImage(name) {
  if (!name) return defaultWorkoutImage
  const lower = name.toLowerCase()
  for (const key in workoutImageMap) {
    if (lower.includes(key)) return workoutImageMap[key]
  }
  return defaultWorkoutImage
}