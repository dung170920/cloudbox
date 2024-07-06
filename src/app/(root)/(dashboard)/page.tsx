"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import UploadButton from "./_components/UploadButton"
import FileCard from "./_components/FileCard";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState('query');

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  };

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : 'skip');

  return (
    <section className="p-8 container min-h-full">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">All Files</h1>
        <UploadButton />
      </div>
      {!files ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Loader2 className="animate-spin h-32 w-32" />
          <p className="text-2xl mt-1 text-neutral-700">Loading...</p>
        </div>
      ) : (
        <>
          {files.length > 0 ?
            (<div className="grid md:grid-cols-4 grid-cols-2">
              {files.map((file) => (
                <FileCard key={file._id} file={file} />
              ))}
            </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                <Image src={"/icons/empty-folder.svg"} width={300} height={300} alt="empty" />
                <h2 className="text-center text-2xl font-semibold">No Documents Available</h2>
                <p className="text-center text-lg text-neutral-700">Please upload a document to get started</p>
              </div>
            )}
        </>
      )}


    </section>
  );
}
