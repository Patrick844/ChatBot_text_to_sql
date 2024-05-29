import { createServerClient } from "@supabase/ssr";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = "https://ideal-amoeba-specially.ngrok-free.app/";
  console.log("----- Loading model ------  ");
  const loadModel = await axios.get(url + "load");
  const message = loadModel.data.message;
  console.log("Success  ");
  return Response.json({ message: message });
}
