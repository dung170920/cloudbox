"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  };

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');
  // const createFile = useMutation(api.files.createFile);

  return (
    <section className="">

    </section>
  );
}
