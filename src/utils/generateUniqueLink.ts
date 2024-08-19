// TODO: change this to your domain

const HOSTNAME = "http://testiBoost.com"

export const generateUniqueLink = (name: string, id: string) => {
    
    if(!name){
      name = 'my-business'
    }

    name = name.replace(/\s+/g, '-').toLowerCase();
    return `${HOSTNAME}/${name}/${id}`
  }