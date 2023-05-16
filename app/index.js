import { Redirect } from "expo-router";
import Login from "./login"

export default function Index() {
    return <Redirect href="/login"/>;
}