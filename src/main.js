import { Client, Users,Databases } from 'node-appwrite';
import { Models } from "appwrite";

interface RequestBody extends Models.User<Models.Preferences> {
  targets: Models.Target[];
  accessedAt: string;
}
// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
   const data: RequestBody = req.bodyJson;
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);
 log(process.env.collection)
  try {
    const databases = new Databases(client);
     await databases.createDocument(
      process.env.db,
      process.env.collection,
      data.$id,
      {
        name: data.name,
      },
    );
    return res.json({name:1})
  } catch(err) {
    error("Could not list users: " + err.message);
  }

};
