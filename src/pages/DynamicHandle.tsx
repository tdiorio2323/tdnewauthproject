import { useParams } from "react-router-dom";
import Cabana from "./Cabana";

export default function DynamicHandle() {
  // placeholder: render brand layout for now
  const { handle } = useParams();
  return <Cabana key={handle} />;
}