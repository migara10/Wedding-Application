import { Preference, UserProfile } from '@prisma/client';
import { calculatePreferencesCompatibility } from './calculate-preference-compatibility';

export type UserProfileWithPreference = UserProfile & {
  preference: Preference;
};

// export function calculateCompatibility(
//   user1: UserProfileWithPreference,
//   user2: UserProfileWithPreference
// ) {
//   // Define weights for each criterion
//   const weights = {
//     age: 1,
//     location: 2,
//     interests: 3,
//     education: 2,
//     preference: 4, // Adjust the weight for preferences
//     // Add other criteria and adjust weights accordingly
//   };

//   // Calculate compatibility score
//   let score = 0;

//   // Age difference
//   score += weights.age * Math.abs(user1?.age - user2?.age);

//   // Location match
//   score +=
//     weights.location *
//     (user1?.city === user2?.city && user1?.state === user2?.state ? 1 : 0);

//   // Interests match (assuming interests are arrays of strings)
//   const commonInterests = user1?.hobbies?.filter((interest) =>
//     user2?.hobbies?.includes(interest)
//   ).length;

//   // Handle cases where commonInterests is undefined
//   if (commonInterests !== undefined) {
//     score += weights.interests * commonInterests;
//   } else {
//     console.error('commonInterests is undefined');
//   }

//   // Education match
//   score += weights.education * (user1?.education === user2?.education ? 1 : 0);

//   // Add more criteria based on your schema

//   return score;
// }

export function calculateCompatibility(
  user1: UserProfileWithPreference,
  user2: UserProfileWithPreference
) {
  // Define weights for each criterion
  const weights = {
    age: 1,
    location: 2,
    interests: 3,
    education: 2,
    preference: 4, // Adjust the weight for preferences
    // Add other criteria and adjust weights accordingly
  };

  // Calculate compatibility scores for each criterion
  const ageScore = weights.age * Math.abs(user1?.age! - user2?.age!);

  const locationScore =
    weights.location *
    (user1?.city === user2?.city && user1?.state === user2?.state ? 1 : 0);

  const commonInterests = user1?.hobbies?.filter((interest) =>
    user2?.hobbies?.includes(interest)
  ).length;
  
  const interestsScore = weights.interests * (commonInterests || 0);

  const educationScore =
    weights.education * (user1?.education === user2?.education ? 1 : 0);

  const preferencesScore = calculatePreferencesCompatibility(
    user1?.preference,
    user2?.preference
  );

  // Combine individual scores to get the overall compatibility score
  const totalScore =
    ageScore +
    locationScore +
    interestsScore +
    educationScore +
    preferencesScore;

  return totalScore;
}