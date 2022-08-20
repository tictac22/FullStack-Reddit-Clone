import { useRouter } from "next/router"

import React, { useCallback, useEffect, useRef, useState } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { SelectComminity } from "@/components/submitpost/selectCommunity"
import { $api } from "@/utils/axios"
import { EditorState, convertToRaw } from "draft-js"

import { EditorDraft } from "./editor"
import { Loading } from "./isLoading"
import { Community } from "./types"

interface Props {
	disabled?: boolean
	data?: {
		subRedditId: number
		subRedditTitle: string
		image?: string
	}
}
export const PostForm: React.FC<Props> = ({ disabled, data }) => {
	const router = useRouter()
	const [title, setTitle] = useState("")
	const [community, setCommunity] = useState<Community>(data)
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [isSending, setIsSending] = useState(false)

	const onEditorStateChange = useCallback((editorState) => {
		setEditorState(editorState)
	}, [])

	const allowed = title && community && editorState.getCurrentContent().hasText() ? true : false
	const sendPost = async () => {
		if (!allowed) return
		setIsSending(true)

		const draftToHtml = (await import("draftjs-to-html")).default

		try {
			const response = await $api("/post/create", {
				method: "POST",
				data: {
					title,
					body: JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))),
					type: typeof community === "string" ? "USER" : "SUBREDDIT",
					subRedditId: typeof community === "string" ? null : community.subRedditId
				}
			})
			if (typeof community === "string") {
				router.push(`/user/${community}/comments/${response.data.id}`)
			} else {
				router.push(`/r/${community.subRedditTitle ?? community.subReddit?.title}/comments/${response.data.id}`)
			}
		} finally {
			setIsSending(false)
		}
	}
	const ref = useRef<HTMLTextAreaElement>()
	useEffect(() => {
		const tx = ref.current
		tx.addEventListener("input", OnInput, false)
		tx.setAttribute("style", "height:" + "39" + "px")
		function OnInput() {
			this.style.height = "auto"
			this.style.height = this.scrollHeight + "px"
		}
	}, [])
	return (
		<div className="flex-[40%]">
			<h1 className=" text-lg mb-4 pb-1 pl-2 border-b border-solid border-b-[#EDEFF1]">Create Post</h1>
			<SelectComminity community={community} setCommunity={setCommunity} disabled={disabled} />
			<textarea
				className="w-full resize-none overflow-y-hidden leading-[2] px-3 pb-3  mb-2 focus:outline-none     rounded-lg"
				placeholder="Title"
				value={title}
				maxLength={300}
				onChange={(e) => setTitle(e.target.value)}
				ref={ref}
			/>
			<EditorDraft editorState={editorState} onEditorStateChange={onEditorStateChange} />
			<button
				className={`ml-auto mt-2 ${
					allowed ? "text-white bg-cyan-400 cursor-pointer" : "text-[#bebebe] bg-[#848484] cursor-not-allowed"
				} py-1 px-4 rounded-full  block`}
				onClick={sendPost}
				disabled={isSending}
			>
				{isSending ? <Loading /> : "Post"}
			</button>
		</div>
	)
}
