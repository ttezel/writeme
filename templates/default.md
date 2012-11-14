#{{{dirname}}}

{{#doxArray}}
##File: {{{filename}}}

{{#doxOutput}}
{{! if private, don't output anything for this doc block}}
{{^isPrivate}}
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
{{/isPrivate}}

{{/doxOutput}}


{{/doxArray}}

{{^isPrivate}}
{{/isPrivate}}