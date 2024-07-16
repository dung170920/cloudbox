import { create } from "zustand";
import { Doc } from "../../convex/_generated/dataModel";

interface FileStore {
  files: Doc<"files">[];
}

const useFileStore = create<FileStore>((set) => ({
  files: [],
  getFiles: (files: Doc<"files">[]) => set({ files }),
}));
