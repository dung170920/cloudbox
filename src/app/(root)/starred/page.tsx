import FileList from "../_components/FileList";

export default function Starred() {
  return (
    <section className="p-8 container min-h-full">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Starred</h1>
      </div>

      <FileList type="starred" />

    </section>
  )
}