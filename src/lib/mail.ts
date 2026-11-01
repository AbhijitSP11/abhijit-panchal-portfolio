import type { MouseEvent } from "react";
import { profile } from "./resume";

const SUBJECT = "Hello Abhijit — saw your portfolio";

export const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(SUBJECT)}`;

const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email
)}&su=${encodeURIComponent(SUBJECT)}`;

/**
 * `mailto:` does nothing on a desktop with no mail app set up, so on a mouse
 * device the click opens a Gmail compose window instead. Touch devices keep
 * the plain mailto link, which hands off to the phone's mail app.
 */
export function openMail(e: MouseEvent<HTMLAnchorElement>) {
  if (typeof window === "undefined") return;
  if (!window.matchMedia("(pointer: fine)").matches) return;
  e.preventDefault();
  window.open(gmailHref, "_blank", "noopener,noreferrer");
}
