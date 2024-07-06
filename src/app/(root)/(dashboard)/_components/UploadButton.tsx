"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { CheckCircledIcon, CrossCircledIcon, UploadIcon, } from "@radix-ui/react-icons"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "convex/react"
import { api } from '../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
  file: z.custom<FileList>((file) => file instanceof FileList, "File is required.").refine((file) => file[0].size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
})

const UploadButton = () => {
  const organization = useOrganization();
  const user = useUser();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined
    },
  });
  const fileRef = form.register("file");
  const [dialogOpen, setDialogOpen] = useState(false);

  const createFile = useMutation(api.files.createFile);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!orgId) return;

    try {
      const postUrl = await generateUploadUrl();
      const fileType = values.file[0].type;

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": fileType },
        body: values.file[0],
      });

      const { storageId } = await result.json();

      await createFile({
        name: values.file[0].name,
        fileId: storageId,
        orgId,
        type: fileType
      });
      form.reset();
      toast({
        variant: "success",
        description: <div className="flex gap-2">
          <CheckCircledIcon height={20} width={20} />
          Uploaded successfully
        </div>,
      })
      setDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description: <div className="flex gap-2">
          <CrossCircledIcon height={20} width={20} />
          Uploaded failed
        </div>,
      })
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />Upload file
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your file</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Upload"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton