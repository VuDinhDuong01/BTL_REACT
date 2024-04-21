
import { NavigateFunction, createSearchParams } from "react-router-dom";
import { QueryType } from "~/hook";
import omit from 'lodash/omit'
import { PostType } from "~/types/post.types";

export const customHandle = ({ name, page, query, navigate, pathname, order, sort_by }: { name: string, page: string, query: QueryType, navigate: NavigateFunction, pathname: string, sort_by?: string, order?: string }) => {

  const navigateWithParams = () => {
    if (sort_by) {
      navigate({
        pathname,
        search: createSearchParams(omit({
          ...query,
          order,
          sort_by
        }, [name])).toString()
      })
    } else {
      navigate({
        pathname,
        search: createSearchParams({
          ...query,
          name,
          page
        }).toString()
      })
    }
  }
  return navigateWithParams
}

export const handleCheckAll = ({ dataPost, checkBox, setCheckBox }: { dataPost: PostType[], checkBox: string[], setCheckBox: React.Dispatch<React.SetStateAction<string[]>> }) => {
  if (dataPost.length === checkBox.length && dataPost.length !== 0) {
    setCheckBox([])
  } else {
    setCheckBox(dataPost.map(item => item._id))
  }
}
