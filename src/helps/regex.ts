
export const regex = {
    blockSpace: /\s/g,
    checkNumber: /^\d*$/,
    checkHashtagOrMention:  /(?:^|\s)([#@]\w+)(?=\s|$)/g
} as const 