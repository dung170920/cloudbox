import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { fileIcon } from '@/constants'
import Image from 'next/image'
import { Doc } from '../../../../convex/_generated/dataModel'
import FileActions from './FileActions'

type Props = {
  file: Doc<"files"> & { url: string; isFavorited: boolean },
}

const FileCard = ({ file }: Props) => {
  const fileExtension = file.type.split("/")[1];
  const fileType = fileIcon[fileExtension];

  return (
    <>
      <Card className='w-full'>
        <CardContent className='p-0'>
          <Image src={file.url} width={100} height={100} alt={file.name} className='w-full aspect-video' />
        </CardContent>
        <CardFooter className='justify-between gap-2 px-5 py-4'>
          <div className="flex gap-1 items-center truncate flex-1">
            <fileType.icon className={`h-6 w-6 flex-shrink-0`} style={{ color: fileType.color }} />
            <span className='text-sm truncate font-medium'>{file.name}</span>
          </div>
          <FileActions file={file} />
        </CardFooter>
      </Card>
    </>
  )
}

export default FileCard