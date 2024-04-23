export const CustomCheckBox = ({ _id, setCheckBox, checkBox }:
  {
    _id: string, checkBox: string[],
    setCheckBox: React.Dispatch<React.SetStateAction<string[]>>
  }) => {
  setCheckBox(prev => {
    const checked = checkBox.includes(_id)
    if (checked) {
      return prev.filter(item => item !== _id)
    } else {
      return [...prev, _id]
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomCheckAll = ({ checkBox, setCheckBox, data }: { checkBox: string[], setCheckBox: React.Dispatch<React.SetStateAction<string[]>>, data: any[] }) => {
  if (data.length === checkBox.length && data.length !== 0) {
    setCheckBox([])
  } else {
    setCheckBox(data.map(item => item?._id))
  }
}