import config from "@/config";

const HOST = config.appUrl;
if (!HOST) {
  console.error('NEXT_PUBLIC_APP_URL is not set');
}

export const generateUniqueLink = (name: string) => {
  if (!name) {
    name = 'my-business';
  }

  // Replace multiple spaces with a single hyphen
  name = name.trim().replace(/\s+/g, '-').toLowerCase();

  // Remove any characters that are not alphanumeric or hyphen
  name = name.replace(/[^a-z0-9-]/g, '');

  return `${HOST}/${name}`;
};

