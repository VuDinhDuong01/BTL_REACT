/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from "react"

/**
 * Create mulit signature wallet function
 * @param arrayText {String} array text
 * @param char {String} @ or #
 * @returns {String} Return array hashtag or array mentions
 */

export const checkHashTagsOrMentions = ({ arrayText, char }: { arrayText: string, char: string }) => {
    return useMemo(() => {
        const arrayMentions = arrayText.split(/\s+/).filter((text: string) => {
            if (text.length >= 2 && text.charAt(0) === char && text.slice(1).split('').every(item => item !== char)) {
                return true;
            }
            return false;
        }).map(text => text.slice(1));

        return Array.from(new Set(arrayMentions));
    }, [arrayText, char]);
};