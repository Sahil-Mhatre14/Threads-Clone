import ThreadCard from "@/components/cards/ThreadCard";
import { Comment } from "@/components/forms/Comment";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";

const Page = async () => {
  const user = await currentUser();

  console.log("Current user", user);

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const results = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 10,
    sortBy: "desc",
  });

  return (
    <section>
      <h1>Search Page</h1>

      <div className="mt14 flex flex-col gap-9">
        {results.users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <>
            {results.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
