"use client"
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { CircleEllipsis, Download, Star, Trash2, Undo } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { CheckCircledIcon, CrossCircledIcon, StarFilledIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast'
import { fileIcon } from '@/constants'
import Image from 'next/image'
import { api } from '../../../../convex/_generated/api'
import { Doc, Id } from '../../../../convex/_generated/dataModel'
import { Protect } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

type Props = {
  file: Doc<"files">,
  favorites: Doc<"favorites">[],
}

const FileCard = ({ file, favorites }: Props) => {
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();

  const fileExtension = file.type.split("/")[1];
  const fileType = fileIcon[fileExtension];

  function getFileUrl() {
    console.log(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${file.fileId}`);

    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${file.fileId}`
  }

  function isFavorited(fileId: Id<"files">) {
    return favorites.some((favorite) => favorite.fileId === fileId);
  }

  return (
    <>
      <Card className='w-full'>
        <CardContent className='p-0'>
          <Image src={getFileUrl()} width={100} height={100} alt={file.name} className='w-full aspect-video' />
        </CardContent>
        <CardFooter className='justify-between gap-2 px-5 py-4'>
          <div className="flex gap-1 items-center truncate flex-1">
            <fileType.icon className={`h-6 w-6 flex-shrink-0`} style={{ color: fileType.color }} />
            <span className='text-sm truncate font-medium'>{file.name}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <CircleEllipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='min-w-[180px]'>
              <DropdownMenuItem onClick={() => {
                // window.open(getFileUrl(file.fileId, "_blank"))
              }}>
                <Download className='h-4 w-4 mr-2' />
                <span className='text-sm'>Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                toggleFavorite({
                  fileId: file._id,
                });
              }}>
                {isFavorited(file._id) ? (
                  <>
                    <StarFilledIcon className='h-4 w-4 mr-2 text-yellow-500' />
                    <span className='text-sm'>Unstarred</span>
                  </>
                ) :
                  (<>
                    <Star className='h-4 w-4 mr-2' />
                    <span className='text-sm'>Starred</span>
                  </>
                  )}
              </DropdownMenuItem>
              <Protect role={"org:admin"} fallback={<></>}>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={cn("", { 'text-destructive': !file.shouldDelete, "text-success": file.shouldDelete })}
                  onClick={() => {
                    if (file.shouldDelete) {
                      restoreFile({ fileId: file._id });
                    } else {
                      setIsConfirmOpen(true);
                    }
                  }}>
                  {file.shouldDelete ? (<>
                    <Undo className='h-4 w-4 mr-2' />
                    <span className='text-sm'>Restore</span>
                  </>) : (<>
                    <Trash2 className='h-4 w-4 mr-2' />
                    <span className='text-sm'>Remove</span>
                  </>)}
                </DropdownMenuItem>
              </Protect>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your file and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                try {
                  deleteFile({ fileId: file._id });
                  toast({
                    variant: "success",
                    description: <div className="flex gap-2"><CheckCircledIcon height={20} width={20} />Deleted successfully</div>,
                  });
                } catch (error) {
                  toast({
                    variant: "destructive",
                    description: <div className="flex gap-2"><CrossCircledIcon height={20} width={20} />Delete failed</div>,
                  });
                }
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default FileCard