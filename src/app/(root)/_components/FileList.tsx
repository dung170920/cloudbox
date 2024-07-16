"use client";
import React from 'react';
import Image from "next/image";
import { Loader2, } from "lucide-react";
import FileCard from './FileCard';
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useSearchParams } from 'next/navigation';

const FileList = ({ type }: { type?: 'starred' | 'trash' }) => {
  const searchParams = useSearchParams();
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  };

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query: searchParams.get('query') || '', type } : 'skip');
  const favorites = useQuery(api.files.getAllFavorites, orgId ? { orgId } : 'skip') || [];

  return (
    <>
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
                <FileCard key={file._id} file={file} favorites={favorites} />
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
    </>
  )
}

export default FileList