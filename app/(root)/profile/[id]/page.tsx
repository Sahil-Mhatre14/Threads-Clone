import ThreadCard from "@/components/cards/ThreadCard";
import { Comment } from "@/components/forms/Comment";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();

  console.log("Current user", user);

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div>
      <ProfileHeader
        accountId={userInfo._id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.name}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs?.map((tab) => {
              return (
                <TabsTrigger key={tab.label} value={tab?.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>
                  {tab.label === "Threads" && (
                    <p className="ml-1 sounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                        {userInfo?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {
            profileTabs?.map((tab) => {
                return <TabsContent key={`content-${tab?.label}`} value={tab?.value}
                className="w-full text-light-1">
                    <ThreadsTab
                      currentUserId={user.id}
                      accountId={userInfo.id}
                      accountType="User"
                    />
                </TabsContent>
            })
          }
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
