// for SEEMS
{% capture layout_list %}{% include '/seems-layout-list' %}{% endcapture %}

{%- capture layout_each_variables -%}
{%- assign layouts_array = layout_list | split: ';' -%}
{%- for layout in layouts_array -%}
    {%- assign layout_attr = layout | split: ',' -%}

    {%- assign layout_name = layout_attr[0] | strip -%}
    {%- assign layout_items = layout_attr[2] | strip -%}

    {%- if layout_name != blank -%}
        {%- assign layout_name_var = layout_name | upcase | replace: '-','_' -%}
        {%- capture layout_name_include -%}/{{ layout_name }}{%- endcapture -%}
const {{ layout_name_var }} = `{% include layout_name_include %}`;
{% comment %}-{% endcomment %}
    {%- endif -%}

     {%- if layout_items != blank -%}
        {%- assign layout_items_var = layout_items | upcase | replace: '-','_' -%}
        {%- capture layout_items_include -%}/{{ layout_items }}{%- endcapture -%}
const {{ layout_items_var }} = `{% include layout_items_include %}`;
{% comment %}-{% endcomment %}
    {%- endif -%}

{%- endfor -%}
{%- endcapture -%}

{{ layout_each_variables }}

// Create an object to map option values to the variables
const layouts = {
{% comment %}-{% endcomment %}
{%- assign layouts_array = layout_list | split: ';' -%}
{%- for layout_string in layouts_array -%}

{%- assign layout_attributes = layout_string | split: ',' -%}
{%- assign layout_name = layout_attributes[0] | strip -%}
{%- assign layout_items = layout_attributes[2] | strip -%}
{%- assign layout_items_count = layout_attributes[3] | strip -%}

{%- assign layout_name_var = layout_name | upcase | replace: '-','_' -%}

{%- unless forloop.first -%}
,
{% endunless %}

{%- if layout_items != blank -%}
'{{ layout_name }}': {
    component: {{ layout_name_var }},
    component_items: {{ layout_items | upcase | replace: '-','_' }},
    component_items_count: {{ layout_items_count }}
}
{%- else -%}
'{{ layout_name }}': {{ layout_name_var }}
{%- endif -%}
{% comment %}-{% endcomment %}

{%- endfor -%}
{% comment %}-{% endcomment %}
};