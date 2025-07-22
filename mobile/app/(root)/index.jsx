import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTransactions } from "../../hooks/useTransaction";
import { useEffect } from "react";
import { SignOutButton } from "@/components/SignOutButton";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import BalanceCard from "../../components/BalanceCard";

export default function Page() {
  const { user } = useUser();

  const { transactions, summary, isLoading, loadData, deleteTransactions } =
    useTransactions(user?.id);

  useEffect(() => {
    loadData();
  }, [user?.id]);

  // console.log('====================================');
  // console.log(JSON.stringify(user, null, 2));
  // console.log('====================================');

  if (isLoading) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {/* Left */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome, </Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/* Right */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={20} color={"#ffff"} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
      </View>
      {/* Balance Card */}
      <BalanceCard summary={summary} />

      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>
    </View>
  );
}
