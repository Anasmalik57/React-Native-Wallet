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

  console.log("=====================================");
  console.log("userId 😃:===>", user.id);
  console.log("=====================================");
  console.log("Transactions: ==>", JSON.stringify(transactions, null, 2));
  console.log("Summary: ==>", JSON.stringify(summary, null, 2));

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text>Balance: {summary.balance}</Text>
        <Text>Income: {summary.income}</Text>
        <Text>Expenses: {summary.expenses}</Text>
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
