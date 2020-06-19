export type TApi = {
	[key: string]: (params?:any) => Promise<any>
}