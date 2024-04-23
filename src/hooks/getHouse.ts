export const getHouse = ( created_at?: Date ) => {
  if (created_at) {
    const now = new Date(created_at);
    const year = now.getFullYear();
    const month = now.getMonth() + 1; 
    const day = now.getDate();
    return  `${day}/${month}/${year}`
  } else {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return `${hours}:${minutes}  ${day}/${month}/${year}`
  }
}

export const getSlug=(string:string)=>{
  return string .toLowerCase() // Chuyển tất cả thành chữ thường
  .replace(/ /g, '-')
        .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
        .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
        .replace(/[ìíỉĩị]/g, 'i')
        .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
        .replace(/[ùúủũụưừứửữự]/g, 'u')
        .replace(/[ỳýỷỹỵ]/g, 'y')
        .replace(/đ/g, 'd') 
}