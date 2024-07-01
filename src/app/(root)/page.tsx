"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import UploadButton from "@/components/UploadButton"
import FileCard from "@/components/FileCard";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  };

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');

  return (
    <section className="p-8 container">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">All Files</h1>
        <UploadButton />
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 mt-6">
        {files?.map((file) => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>

    </section>
  );
}
