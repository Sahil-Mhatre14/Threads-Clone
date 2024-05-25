import { fetchCommunities } from "@/lib/actions/community.actions";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const RightSidebar = async () => {
  const user = await currentUser();
  if(!user) return null;
  
  const { communities } = await fetchCommunities({ pageSize: 5 });
  const { users } = await fetchUsers({ userId: user?.id, pageSize: 5 });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        <ul>
          {communities?.length > 0 &&
            communities?.map((community) => {
              return (
                <li className="mt-6 flex items-center justify-between mt-4 gap-6">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={community?.image}
                      alt="community-image"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <h5 className="text-base text-white">{community?.name}</h5>
                  </div>

                  <Link href={`/communities/${community?.id}`}>
                    <Button size="sm" className="community-card_btn">
                      View
                    </Button>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <ul>
          {users?.length > 0 &&
            users?.map((user) => {
              return (
                <li className="mt-6 flex items-center justify-between mt-4 gap-6">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={user?.image}
                      alt="user-image"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <h5 className="text-base text-white">{user?.name}</h5>
                  </div>

                  <Link href={`/profile/${user?.id}`}>
                    <Button size="sm" className="community-card_btn">
                      View
                    </Button>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default RightSidebar;
