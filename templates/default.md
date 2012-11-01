#{{{dirname}}}
##{{{filename}}}

{{#doxOut}}
{{^isPrivate}}
{{#ctx.string}}
###{{ctx.string}}
{{/ctx.string}}
{{{description.full}}}
{{#tags}}
{{! if type is return, there will be no name }}
{{type}} {{#name}}`{{name}}`{{/name}}: {{#types}}**{{.}}** {{/types}} {{description}}<br/>
{{/tags}}
{{/isPrivate}}
{{/doxOut}}