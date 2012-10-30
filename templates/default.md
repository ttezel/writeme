#{{{dirname}}}
##{{{filename}}}

{{#doxOut}}
###{{ctx.string}}
{{{description.summary}}}
{{#tags}}
{{type}} `{{name}}` {{#types}}**{{.}}** {{/types}} {{description}}
{{/tags}}
{{/doxOut}}