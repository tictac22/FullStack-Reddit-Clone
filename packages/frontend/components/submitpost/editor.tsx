import { memo, useEffect, useRef } from "react"
import { Editor } from "react-draft-wysiwyg"
import { BsBlockquoteLeft, BsCodeSlash } from "react-icons/bs"

import { $api } from "@/utils/axios"

import bold from "@/public/texteditor/bold.svg"
import gallery from "@/public/texteditor/gallery.svg"
import italic from "@/public/texteditor/italic.svg"
import link from "@/public/texteditor/link.svg"
import ordered from "@/public/texteditor/ordered.svg"
import strikeStrough from "@/public/texteditor/strikeStrough.svg"
import underline from "@/public/texteditor/underline.svg"
import unordered from "@/public/texteditor/unordered.svg"

const expression = new RegExp(/[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)?/gi)

const editorLabels = {
	"components.controls.blocktype.blockquote": (
		<div
			title="blockquote"
			className="group relative  flex h-[20px] w-[25px] items-center justify-center hover:bg-[#F1F1F1] dark:bg-dark-100 dark:hover:bg-[#323030]"
		>
			<BsBlockquoteLeft />
		</div>
	),
	"components.controls.blocktype.code": (
		<div
			title="Inline code"
			className="group relative  flex h-[20px] w-[25px] items-center justify-center hover:bg-[#F1F1F1] dark:bg-dark-100 dark:hover:bg-[#323030]"
		>
			<BsCodeSlash />
		</div>
	)
}

type Props = {
	editorState: null
	onEditorStateChange: null
}
export const EditorDraft = memo(({ editorState, onEditorStateChange }: Props) => {
	const uploadImageCallBack = async (file) => {
		const formData = new FormData()
		formData.append("file", file)

		const response = await $api("/post/image", {
			method: "PUT",
			data: formData
		})
		return new Promise((resolve, reject) => {
			resolve({ data: { link: response.data } })
		})
	}
	const ref = useRef()
	useEffect(() => {
		//const theme =
	}, [])
	return (
		<Editor
			ref={ref}
			className="dark:bg-dark-100"
			localization={{ locale: "en", translations: editorLabels }}
			editorState={editorState}
			wrapperClassName="demo-wrapper"
			editorClassName="demo-editor"
			onEditorStateChange={onEditorStateChange}
			editorStyle={{
				borderRadius: "2px",
				minHeight: "200px",
				padding: "0px 10px"
			}}
			embedded={true}
			toolbar={{
				options: ["link", "inline", "blockType", "list", "image"],
				inline: {
					inDropdown: false,
					className: undefined,
					component: undefined,
					options: ["bold", "italic", "underline", "strikethrough"],
					bold: { icon: bold.src, className: "bold-icon" },
					italic: { icon: italic.src, className: "bold-icon" },
					underline: { icon: underline.src, className: "bold-icon" },
					strikethrough: { icon: strikeStrough.src, className: "bold-icon" }
				},
				list: {
					inDropdown: false,
					options: ["unordered", "ordered"],
					unordered: { icon: unordered.src, className: "bold-icon" },
					ordered: { icon: ordered.src, className: "bold-icon" }
				},
				blockType: {
					inDropdown: false,
					options: ["Code", "Blockquote"]
				},
				link: {
					inDropdown: false,
					className: undefined,
					component: undefined,
					popupClassName: undefined,
					dropdownClassName: undefined,
					defaultTargetOption: "_self",
					link: { icon: link.src, className: "bold-icon" },
					options: ["link"],
					linkCallback: (link) => {
						if (!expression.test(link.target)) {
							const input = document.querySelector("#linkTarget") as HTMLInputElement
							input.classList.add("error")
							return
						}
						return link
					}
				},
				image: {
					icon: gallery.src,
					className: "bold-icon",
					component: undefined,
					popupClassName: undefined,
					urlEnabled: true,
					uploadEnabled: true,
					alignmentEnabled: true,
					uploadCallback: uploadImageCallBack,
					previewImage: true,
					inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
					alt: { present: false, mandatory: false },
					defaultSize: {
						height: "auto",
						width: "auto"
					}
				}
			}}
		/>
	)
})
