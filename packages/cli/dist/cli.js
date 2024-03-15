#!/usr/bin/env node

// src/cli.tsx
import { render } from "ink";
import meow from "meow";

// src/points/build.tsx
import { Text } from "ink";
import { jsx } from "react/jsx-runtime";
var Build = () => {
  return /* @__PURE__ */ jsx(Text, { children: "Build extension" });
};

// src/points/command-not-found.tsx
import { Text as Text2 } from "ink";
import { jsx as jsx2 } from "react/jsx-runtime";
var CommandNotFound = () => {
  return /* @__PURE__ */ jsx2(Text2, { children: "Command not found" });
};

// src/points/find.tsx
import { Text as Text3 } from "ink";
import { jsx as jsx3 } from "react/jsx-runtime";
var Find = () => {
  return /* @__PURE__ */ jsx3(Text3, { children: "Find extensions" });
};

// src/points/install.tsx
import { Text as Text4 } from "ink";
import { jsx as jsx4 } from "react/jsx-runtime";
var Install = () => {
  return /* @__PURE__ */ jsx4(Text4, { children: "Install new extension" });
};

// src/points/uninstall.tsx
import { Text as Text5 } from "ink";
import { jsx as jsx5 } from "react/jsx-runtime";
var Uninstall = () => {
  return /* @__PURE__ */ jsx5(Text5, { children: "Uninstall extension" });
};

// src/cli.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var cli = meow(
  `
	Usage
	  $ cli

	Options
		--name  Your name

	Examples
	  $ cli --name=Jane
	  Hello, Jane
`,
  {
    importMeta: import.meta,
    flags: {
      name: {
        type: "string"
      }
    }
  }
);
var pointsMap = {
  "find": /* @__PURE__ */ jsx6(Find, {}),
  "install": /* @__PURE__ */ jsx6(Install, {}),
  "build": /* @__PURE__ */ jsx6(Build, {}),
  "uninstall": /* @__PURE__ */ jsx6(Uninstall, {}),
  "command-not-found": /* @__PURE__ */ jsx6(CommandNotFound, {})
};
var command = cli.input?.[0] ?? "command-not-found";
var Component = pointsMap[command];
render(
  Component
);
