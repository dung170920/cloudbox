"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { GridIcon, Loader2, RowsIcon, } from "lucide-react";
import FileCard from './FileCard';
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useSearchParams } from 'next/navigation';
import FileTable from './FileTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Doc } from '../../../../convex/_generated/dataModel';

const FileList = ({ type }: { type?: 'starred' | 'trash' }) => {
  const searchParams = useSearchParams();
  const organization = useOrganization();
  const user = useUser();
  const [fileType, setFileType] = useState<Doc<"files">["type"] | "all">("all");

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  };

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query: searchParams.get('query') || '', type, fileType: fileType === "all" ? undefined : fileType, } : 'skip');
  const favorites = useQuery(api.files.getAllFavorites, orgId ? { orgId } : 'skip') || [];

  const updatedFiles = files?.map(file => ({
    ...file,
    isFavorited: favorites.some((favorite) => favorite.fileId === file._id),
    url: ''
  }));

  return (
    <Tabs defaultValue='grid'>
      <div className="flex justify-end items-center gap-3">
        <TabsList>
          <TabsTrigger value="grid"><GridIcon /></TabsTrigger>
          <TabsTrigger value="table"><RowsIcon /></TabsTrigger>
        </TabsList>

        <div className="flex gap-2 items-center">
          <Select
            value={fileType}
            onValueChange={(newType) => {
              setFileType(newType as any);
            }}
          >
            <SelectTrigger id="type-select" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {!updatedFiles ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Loader2 className="animate-spin h-32 w-32" />
          <p className="text-2xl mt-1 text-neutral-700">Loading...</p>
        </div>
      ) : (
        <>
          {updatedFiles.length > 0 ?
            (
              <>
                <TabsContent value="grid"><FileTable files={updatedFiles} /></TabsContent>
                <TabsContent value="table">
                  <div className="grid md:grid-cols-4 grid-cols-2">
                    {updatedFiles.map((file) => (
                      <FileCard key={file._id} file={file} />
                    ))}
                  </div>
                </TabsContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                <Image src={"/icons/empty-folder.svg"} width={300} height={300} alt="empty" />
                <h2 className="text-center text-2xl font-semibold">No Documents Available</h2>
                <p className="text-center text-lg text-neutral-700">Please upload a document to get started</p>
              </div>
            )}
        </>
      )}
    </Tabs>
  )
}

export default FileList