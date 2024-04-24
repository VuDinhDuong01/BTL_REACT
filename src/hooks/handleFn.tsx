/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction, createSearchParams } from "react-router-dom";

export const customHandle = ({ name, page, query, navigate, pathname, order, sort_by }: { name?: string, page: number, query?: any, navigate: NavigateFunction, pathname: string, order?: string, sort_by?: string }) => {
  const navigateWithParams = () => {
    if (sort_by) {
      navigate({
        pathname,
        search: createSearchParams({
          ...query,
          sort_by,
          order,
          page
        }).toString()
      })
    } 
    if(name){
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


export const handleCheckAll = ({ dataPost, checkBox, setCheckBox }: { dataPost: any[], checkBox: string[], setCheckBox: React.Dispatch<React.SetStateAction<string[]>> }) => {
  if (dataPost.length === checkBox.length && dataPost.length !== 0) {
    setCheckBox([])
  } else {
    setCheckBox(dataPost.map(item => item._id))
  }
}
