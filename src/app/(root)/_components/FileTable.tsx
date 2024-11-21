"use client";
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import { Doc, Id } from '../../../../convex/_generated/dataModel';
import { formatRelative } from "date-fns";
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FileActions from './FileActions';

function OwnerCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: userId,
  });
  return (
    <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
      <Avatar className="w-6 h-6">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
}

const columns: ColumnDef<Doc<"files"> & { url: string; isFavorited: boolean }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      if (!row.original.userId) return;
      return <OwnerCell userId={row.original.userId} />;
    },
  },
  // {
  //   accessorKey: "size",
  //   header: "File size",
  // },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return (
        <div>
          {formatRelative(new Date(row.original._creationTime), new Date())}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div>
          <FileActions file={row.original} />
        </div>
      );
    },
  },
];

type File = Doc<"files"> & { url: string; isFavorited: boolean };

type Props = {
  files: File[]
}

const FileTable = ({ files }: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={files} />
    </div>
  )
}

export default FileTable