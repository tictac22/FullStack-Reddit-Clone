import { useRouter } from "next/router"

import React, { useCallback, useState } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { $api } from "@/utils/axios"
import { capitalizeFirstLetter } from "@/utils/functions"
import { convertToRaw, EditorState } from "draft-js"

import { UsersCommunities } from "@/utils/types"
import { EditorDraft } from "./editor"
import { Loading } from "./isLoading"
import { SelectComminity } from "./selectCommunity"
import { Community } from "./types"

interface Props {
	disabled?: boolean
	data: UsersCommunities[] | Community
}
export const PostForm: React.FC<Props> = ({ disabled, data }) => {
	const router = useRouter()
	const [title, setTitle] = useState("")
	const [community, setCommunity] = useState<UsersCommunities>(data?.length ? data[0] : data)
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
					title: capitalizeFirstLetter(title),
					body: JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))),
					type: community?.username ? "USER" : "SUBREDDIT",
					subRedditId: community?.username ? null : community.subRedditId
				}
			})
			if (community?.username) {
				router.push(`/user/${community.username}/comments/${response.data.id}`)
			} else {
				router.push(
					`/r/${community.subReddit.title ?? community.subReddit?.title}/comments/${response.data.id}`
				)
			}
		} catch (e) {
			//console.log(e)
		} finally {
			setIsSending(false)
		}
	}
	return (
		<div className="flex-[40%]">
			<h1 className=" mb-4 border-b border-solid border-b-[#EDEFF1] pb-1 pl-2 text-lg dark:text-white">
				Create Post
			</h1>
			{
				<SelectComminity
					selectedCommuity={community}
					setCommunity={setCommunity}
					communities={data}
					disabled={disabled}
				/>
			}
			<textarea
				className="mb-2 h-[37px] max-h-[140px] min-h-[37px] w-full overflow-y-hidden rounded-lg px-3 pb-3 leading-[2]  focus:outline-none dark:bg-dark-100     dark:text-white"
				placeholder="Title"
				value={title}
				maxLength={300}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<EditorDraft editorState={editorState} onEditorStateChange={onEditorStateChange} />
			<button
				className={`ml-auto mt-2 ${
					allowed ? "cursor-pointer bg-cyan-400 text-white" : "cursor-not-allowed bg-[#848484] text-[#bebebe]"
				} block rounded-full py-1  px-4`}
				onClick={sendPost}
				disabled={isSending}
			>
				{isSending ? <Loading /> : "Post"}
			</button>
		</div>
	)
}
