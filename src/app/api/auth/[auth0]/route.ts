// import {
//   handleAuth,
//   handleCallback,
//   handleLogin,
//   handleLogout,
// } from "@auth0/nextjs-auth0";
// import { type NextApiHandler } from "next";

// export const GET = handleAuth({
//   login: handleLogin({
//     returnTo: "/",
//   }),
//   signup: handleLogin({
//     authorizationParams: {
//       screen_hint: "signup",
//     },
//     returnTo: "/",
//   }),
//   logout: handleLogout({
//     returnTo: "/",
//   }),
//   callback: handleCallback({
//     authorizationParams: {
//       login_hint: "login",
//     },
//     redirectUri: "http://localhost:3000",
//   }),
// }) as NextApiHandler;
