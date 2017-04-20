import AssetEditor from "./assetEditor"
import EnumEditor from "./enumEditor"
import MarkdownEditor from "./markdownEditor"
import NumberEditor from "./numberEditor"
import StringEditor from "./stringEditor"

export default {
  audio: AssetEditor,
  enum: EnumEditor,
  image: AssetEditor,
  file: AssetEditor,
  markdown: MarkdownEditor,
  number: NumberEditor,
  string: StringEditor,
  video: AssetEditor
}
