import { FileArchive, FileAudio, FileBarChart2, FileCode, FileImage, FileSpreadsheet, FileText, FileVideo } from "lucide-react";

export const fileIcon: Record<string, { icon: any, color: string }> = {
  'pdf': {
    'icon': FileText,
    'color': '#00A3FF'
  },
  'doc': {
    'icon': FileText,
    'color': '#00A3FF'
  },
  'docx': {
    'icon': FileText,
    'color': '#00A3FF'
  },
  'xls': {
    'icon': FileSpreadsheet,
    'color': '#228B22'
  },
  'xlsx': {
    'icon': FileSpreadsheet,
    'color': '#228B22'
  },
  'ppt': {
    'icon': FileBarChart2,
    'color': '#FFA500'
  },
  'pptx': {
    'icon': FileBarChart2,
    'color': '#FFA500'
  },
  'txt': {
    'icon': FileText,
    'color': '#000000'
  },
  'jpg': {
    'icon': FileImage,
    'color': '#FFD700'
  },
  'jpeg': {
    'icon': FileImage,
    'color': '#FFD700'
  },
  'png': {
    'icon': FileImage,
    'color': '#00CED1'
  },
  'gif': {
    'icon': FileImage,
    'color': '#FF69B4'
  },
  'mp3': {
    'icon': FileAudio,
    'color': '#0000FF'
  },
  'wav': {
    'icon': FileAudio,
    'color': '#0000FF'
  },
  'mp4': {
    'icon': FileVideo,
    'color': '#7B61FF'
  },
  'avi': {
    'icon': FileVideo,
    'color': '#7B61FF'
  },
  'zip': {
    'icon': FileArchive,
    'color': '#808080'
  },
  'rar': {
    'icon': FileArchive,
    'color': '#808080'
  },
  'html': {
    'icon': FileCode,
    'color': '#FFA07A'
  },
  'css': {
    'icon': FileCode,
    'color': '#00FFFF'
  },
  'js': {
    'icon': FileCode,
    'color': '#FFD700'
  },
  'json': {
    'icon': FileCode,
    'color': '#4B0082'
  },
  'xml': {
    'icon': FileCode,
    'color': '#4B0082'
  }
}