"use client"
import React, { useState } from 'react'
import { Doc } from '../../../../../convex/_generated/dataModel'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { CircleEllipsis, Download, Trash2 } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast'
import { fileIcon } from '@/constants'
import Image from 'next/image'

type Props = {
  file: Doc<"files">
}

const FileCard = ({ file }: Props) => {
  const deleteFile = useMutation(api.files.deleteFile);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();

  const fileExtension = file.type.split("/")[1];
  const fileType = fileIcon[fileExtension];

  function getFileUrl() {
    console.log(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${file.fileId}`);

    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${file.fileId}`
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
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => {
                // if (!file.url) return;
                // window.open(file.url, "_blank");
              }}>
                <Download className='h-4 w-4 mr-2' />
                <span className='text-sm'>Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem className='text-destructive' onClick={() => setIsConfirmOpen(true)}>
                <Trash2 className='h-4 w-4 mr-2' />
                <span className='text-sm'>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "success",
                  description: <div className="flex gap-2"><CheckCircledIcon height={20} width={20} />Deleted successfully</div>,
                });
              }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default FileCard