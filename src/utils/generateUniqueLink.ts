// Ensure the domain is set correctly
const HOST = process.env.NEXT_PUBLIC_APP_URL; // Fallback to localhost if not provided
if(!HOST) {
  console.error('NEXT_PUBLIC_APP_URL is not set');
}



export const generateUniqueLink = (name: string) => {
  if (!name) {
    name = 'my-business'; // Default value if name is not provided
  }

  // Step 1: Replace multiple spaces with a single hyphen
  name = name.trim().replace(/\s+/g, '-').toLowerCase();

  // Step 2: Remove any characters that are not alphanumeric or hyphen
  name = name.replace(/[^a-z0-9-]/g, '');

  console.log("unique link", `${HOST}/${name}`);
  return `${HOST}/${name}`;
};

