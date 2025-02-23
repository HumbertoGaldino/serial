import { fetchUserProfile } from "../actions/fetchUserProfile";
import ProfileContent from "@/src/components/ProfileContent";

export default async function Profile() {
  const profileData = await fetchUserProfile();

  return <ProfileContent profileData={profileData} />;
}
