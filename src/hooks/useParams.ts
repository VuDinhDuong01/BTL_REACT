import { queryStringSearch } from "./useQuery"
import omitBy from "lodash/omitBy"
import isUndefined from "lodash/isUndefined"

const queryString = queryStringSearch()

export const queryList = omitBy({
    limit: queryString?.limit ?? "3",
    page: queryString?.page ?? "1",
    title: queryString?.title ?? 'Posts',
    title_tweet: queryString?.title_tweet ?? 'for_you',
    id_user: queryString?.id_user ?? '',
    order: queryString?.order ?? 'desc',
    sort_by:queryString?.sort_by ??'name' ,
    name: queryString?.name   ?? ''
}, isUndefined)


