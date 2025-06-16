import {PropsWithChildren} from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
    <head>
      <title>Mote</title>
      <link rel="icon" type="image/svg+xml" sizes="any" href="/mote.svg"/>
      <link rel="manifest" href="/manifest.json"/>
      <link rel="stylesheet" href="/app.css"/>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    </head>
    <body>{children}</body>
    </html>
  );
}
