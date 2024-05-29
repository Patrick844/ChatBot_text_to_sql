import { createServerClient } from "@supabase/ssr";
import axios from "axios";
import { cookies } from "next/headers";
import {
  PostgrestClient,
  PostgrestFilterBuilder,
  PostgrestQueryBuilder
} from "@supabase/postgrest-js";
let supabase: any = "";

export async function POST(request: Request) {
  // Simulate delay using setTimeout
  const c = cookies();
  const urlDB: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonkey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  supabase = createServerClient(urlDB, anonkey, {
    cookies: {
      get(name: string) {
        return c.get(name)?.value;
      }
    }
  });
  // const sqlQuery =
  //   "SELECT lname, fname FROM job_reactive WHERE status = 'open'";
  // const supabaseQuery = convertSqlToSupabase(sqlQuery);
  // console.log(supabaseQuery.toString()); // This will print the Supabase query

  // return Response.json({ result: "blabla" });
  const url = "https://ideal-amoeba-specially.ngrok-free.app/";
  const chat = { question: "", answer: "" };

  const query = await request.json();
  chat.question = query.query;
  console.log("----- input sent to google colab ------  ");
  const textToSql = await axios.post(
    url + "query",
    { input: chat.question }, // Send query as JSON data
    { headers: { "Content-Type": "application/json" } } // Set Content-Type header
  );

  chat.answer = textToSql.data.query;
  console.log("query recieved");
  return Response.json({ result: chat.answer });
}



/* 

Chaining supabase

  const fromQuery = supabase.from("company");
  // Chain the select('*') method and store it in another variable
  const selectQuery = fromQuery.select("*");
  const { data, error } = await selectQuery;
  console.log(data);
  
  */

/*

  //Getting data from google colab

  const url = "https://ideal-amoeba-specially.ngrok-free.app/";
const chat = { question: "", answer: "" };

const query = await request.json();
chat.question = query.query;
console.log("----- input sent to google colab ------  ");
const textToSql = await axios.post(
  url + "query",
  { input: chat.question }, // Send query as JSON data
  { headers: { "Content-Type": "application/json" } } // Set Content-Type header
);

chat.answer = textToSql.data.query;
  console.log("query recieved");
  const result = parseSQLQuery(
    "SELECT d.dedde, f.dedkeldek, f.dkjdekdje FROM job_reactive d WHERE status = 'open'"
  );
  console.log(result);
  return Response.json({ result: "chat.answer" });
}
  
  
  */
