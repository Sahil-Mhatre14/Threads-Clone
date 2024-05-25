import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  console.log("Current user", user);

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const results = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 10,
    sortBy: "desc",
  });

  return (
    <section>
      <h1 className="head-text text-left">Communities Page</h1>

      <div className="mt-14 flex flex-col gap-9">
        {results.communities.length === 0 ? (
          <p>No users found</p>
        ) : (
          <>
            {results.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
