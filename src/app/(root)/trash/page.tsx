import FileList from "../_components/FileList";

export default function Trash() {
  return (
    <section className="p-8 container min-h-full">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Trash</h1>
      </div>

      <FileList type="trash" />

    </section>
  )
}