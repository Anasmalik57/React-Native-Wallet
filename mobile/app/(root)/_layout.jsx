import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();
   // If clerk is not loaded please don't return anything
  if (!isLoaded) return null; // This is for a better UX
  if (!isSignedIn) return <Redirect href={"/sign-in"} />;
  
  return <Stack screenOptions={{ headerShown: false }} />;
}
