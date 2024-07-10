import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import Post from "../../../components/post/Post";
import { Feather } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/globalProvider";
import TabsDisplay from "../../../components/TabsDisplay";
import { getCurrentUser } from "../../../lib/firebase";
import {
  getUserAttributes,
  getPostByAuthor,
  getPostsByTime,
  getGroupById
} from "../../../lib/useFirebase";

const tabs = ["Following", "Community"];

export default function Home() {
  // auth stuff and orgId
  const { loading, isLogged, isVerified, orgId } = useGlobalContext();
  /*console.log("Loading: ", loading);
  console.log("Logged In: ", isLogged);
  console.log("Verified: ", isVerified);
  */
  if (!loading && isLogged && isVerified) {
  } else {
    router.replace("//index");
  }

  // tab functionality

  const [activeTab, setActiveTab] = useState(tabs[0]);

  // get current user info
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUserInfo = await getCurrentUser();
        const currentUser = await getUserAttributes(currentUserInfo.uid);
        setCurrentUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  // fetch posts
  const [posts, setPosts] = useState([]);

  // get posts for following tab
  // const getFollowingPosts = async () => {
  //   try {
  //     // store all posts for following
  //     const posts = [];

  //     // stores all the users that the current user is following
  //     const followingUsers = currentUser.orgs[orgId].social.following;
  //     if (followingUsers && followingUsers.length > 0) {
  //       // fetch posts from the followed users and push to post array
  //       await Promise.all(
  //         followingUsers.map(async (uid) => {
  //           try {
  //             const user = await getUserAttributes(uid);
  //             const userPosts = await getPostByAuthor(uid, orgId);
  //             // Iterate through userPosts and add fullName property
  //             const postsWithFullName = userPosts.map((post) => ({
  //               ...post,
  //               authorFullName: user.fullName,
  //               authorRole: user.orgs[orgId].role
  //             }));

  //             posts.push(...postsWithFullName);
  //           } catch (error) {
  //             console.error(`Failed to fetch posts for user ${uid}:`, error);
  //           }
  //         })
  //       );
  //     }

  //     setPosts(posts);
  //   } catch (error) {
  //     console.error("An error occurred while getting following posts:", error);
  //   }
  // };

  // fetching community posts
  const getCommunityPosts = async () => {
    try {
      const posts = [];

      // get latest posts from org
      const communityPosts = await getPostsByTime(orgId);

      // fetches author info for each post
      for (const post of communityPosts) {

        // will execute if author type is user
        if (post.authorType === "user") {
          const user = await getUserAttributes(post.author);

          // adds author info along with post object
          const postWithAuthorInfo = {
            ...post,
            type: "user",
            authorName: user.fullName,
            authorId: user.id,
            authorType: user.orgs[orgId].role
          }

          // pushes newly created post object to posts
          posts.push(postWithAuthorInfo)
        } else if (post.authorType === "group") { // will execute if author type is group
          const group = await getGroupById(post.author, orgId)
          
          const postWithAuthorInfo = {
            ...post, 
            type: "group",
            authorName: group.name,
            authorId: group.id,
            authorType: group.category
          }

          posts.push(postWithAuthorInfo)
        } else {
          return null;
        }

      }
      setPosts(posts);
    } catch (error) {}
  };

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      if (activeTab === "Following") {
        setPosts([])
      } else if (activeTab === "Community") {
        getCommunityPosts();
      } else {
        return null;
      }
    }
  }, [activeTab, currentUser]);

  return (
    <SafeAreaView className="h-full bg-secondary">
      {/* Header */}
      <Header title="Home" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3"
          textStyles="text-base"
          tabBarStyles="w-10/12"
        />
        <ScrollView showsVerticalScrollIndicator={false} className="mt-3">
          {posts.map((post, index) => (
            <Post
              key={index}
              containerStyles="w-10/12 mx-auto mb-10"
              post={post}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.9}
          onPress={() => router.push("/post/create")}
          className="shadow-lg"
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
