// TODO: change this to your domain
const HOST = process.env.NEXT_PUBLIC_APP_URL

export const generateUniqueLink = (name: string) => {
    
    if(!name){
      name = 'my-business'
    }

    name = name.replace(/\s+/g, '-').toLowerCase();
    console.log("unique link", `${HOST}/${name}`)
    return `${HOST}/${name}`
  }