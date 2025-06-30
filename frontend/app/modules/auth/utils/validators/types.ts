export type ResponseType = {
    isValid: boolean,
    error: string
}

export type AuthInputType = {
    value: string,
    status: 'idle'|'error'|'valid',
    error: string
}