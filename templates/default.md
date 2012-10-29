#{{{dirname}}}

{{#doxOut}}
##{{{filename}}}
###{{ctx.string}}
{{{description.summary}}}
{{#tags}}
{{type}} `{{name}}` {{#types}}*{{.}}* {{/types}} {{description}}
{{/tags}}
{{/doxOut}}