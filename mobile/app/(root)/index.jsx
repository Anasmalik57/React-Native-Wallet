import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransaction";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();

  const { transactions, summary, isLoading, loadData, deleteTransactions } =
    useTransactions(user.id);

  useEffect(() => {
    loadData();
  }, [user?.id]);

  console.log("====================================");
  console.log("userId 😃:===>", user.id);
  console.log("====================================");
  // setTimeout(() => {
    console.log("Transactions: ==>", JSON.stringify(transactions, null, 2));
    console.log("Summary: ==>", JSON.stringify(summary, null, 2));
  // }, 2000)

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
