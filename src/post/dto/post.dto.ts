export interface CreatePostDto {
  authorId: number
  title: string
  content : string

}

export interface UpdatePostDto {
  title?: string
  content?: string
}