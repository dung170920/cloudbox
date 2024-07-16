import FileList from "../_components/FileList";
import UploadButton from "../_components/UploadButton"

export default async function Home() {
  return (
    <section className="p-8 container min-h-full">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">All Files</h1>
        <UploadButton />
      </div>

      <FileList />

    </section>
  );
}
