interface UserProfileProps {
  userId: string;
}

function UserProfile({ userId }: UserProfileProps) {
  return <h1>User {userId} Profile</h1>;
}

export default UserProfile;
