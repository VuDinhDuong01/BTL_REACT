import { queryStringSearch } from "./useQuery"
import omitBy from "lodash/omitBy"
import isUndefined from "lodash/isUndefined"

const queryString = queryStringSearch()

export const queryList = omitBy({
    limit: queryString?.limit ?? "3",
    page: queryString?.page ?? "1",
    title: queryString?.title ?? 'Posts',
    title_tweet: queryString?.title_tweet ?? 'for_you',
    id_user:queryString?.id_user?? ''
}, isUndefined)


