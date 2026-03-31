import {Metadata} from "next";
import QuizClient from "@/components/QuizClient";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.gdquiz.com/quiz',
  }
}

export default function Quiz(){
  return (
      <QuizClient />
  )
};
