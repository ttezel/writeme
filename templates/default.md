#{{{dirname}}}

{{#doxArray}}
##File: {{{filename}}}

{{#doxOutput}}
{{#signature}}
###function {{signature}}
{{/signature}}
{{^signature}}
{{! if no signature present, just use the string representation }}
{{#ctx.string}}
###{{ctx.string}}
{{/ctx.string}}
{{/signature}}
{{#tags}}
{{! if type is return, there will be no name }}
{{type}} {{#name}}`{{name}}`{{/name}}: {{#types}}**{{.}}** {{/types}}  {{description}}
{{/tags}}
###Description
{{{description.full}}}

{{/doxOutput}}


{{/doxArray}}

{{^isPrivate}}
{{/isPrivate}}