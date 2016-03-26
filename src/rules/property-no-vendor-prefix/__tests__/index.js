import testRule from "../../../testUtils/testRule"

import rule, { ruleName, messages } from ".."

testRule(rule, {
  ruleName,
  config: [undefined],

  accept: [ {
    code: ":root { --foo-bar: 1px; }",
  }, {
    code: "a { color: pink; --webkit-transform: 1px; }",
  }, {
    code: "a { transform: scale(1); }",
  }, {
    code: "a { box-sizing: border-box; }",
  }, {
    code: "a { -webkit-font-smoothing: antialiased; }",
    description: "non-standard prefixed property",
  }, {
    code: "a { -webkit-touch-callout: none; }",
    description: "another non-standard prefixed property",
  } ],

  reject: [ {
    code: "a { -webkit-transform: scale(1); }",
    message: messages.rejected("-webkit-transform"),
    line: 1,
    column: 5,
  }, {
    code: "a { -webkit-transform: scale(1); transform: scale(1); }",
    message: messages.rejected("-webkit-transform"),
    line: 1,
    column: 5,
  }, {
    code: "a { transform: scale(1); -webkit-transform: scale(1); }",
    message: messages.rejected("-webkit-transform"),
    line: 1,
    column: 26,
  }, {
    code: "a { -moz-transition: all 3s; }",
    message: messages.rejected("-moz-transition"),
    line: 1,
    column: 5,
  }, {
    code: "a { -moz-columns: 2; }",
    message: messages.rejected("-moz-columns"),
    line: 1,
    column: 5,
  }, {
    code: "a { -o-columns: 2; }",
    description: "mistaken prefix",
    message: messages.rejected("-o-columns"),
    line: 1,
    column: 5,
  }, {
    code: "a { -ms-interpolation-mode: nearest-neighbor; }",
    description: "\"hack\" prefix",
    message: messages.rejected("-ms-interpolation-mode"),
    line: 1,
    column: 5,
  } ],
})
